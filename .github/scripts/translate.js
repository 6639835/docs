#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');

// Configuration
const CONFIG_PATH = '.github/translation-config.json';
const CACHE_DIR = '.github/translation-cache';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000;

class TranslationManager {
  constructor() {
    this.apiKeys = [];
    this.genAIs = [];
    this.primaryModels = [];
    this.fallbackModels = [];
    this.currentKeyIndex = 0;
    this.keyUsageCount = new Map();
    this.keyErrorCount = new Map();
    this.config = null;
    this.cache = new Map();
    this.stats = {
      translated: 0,
      skipped: 0,
      errors: 0,
      cached: 0
    };
  }

  async initialize() {
    // Parse API keys - support both single key and multiple keys
    const apiKeyEnv = process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEYS;
    if (!apiKeyEnv) {
      throw new Error('GEMINI_API_KEY or GEMINI_API_KEYS environment variable is required');
    }

    // Split by comma for multiple keys, or use single key
    this.apiKeys = apiKeyEnv.includes(',') ? 
      apiKeyEnv.split(',').map(key => key.trim()).filter(key => key) : 
      [apiKeyEnv.trim()];

    console.log(`🔑 Initialized with ${this.apiKeys.length} API key(s)`);

    // Initialize Google AI instances and models for each API key
    for (let i = 0; i < this.apiKeys.length; i++) {
      const apiKey = this.apiKeys[i];
      const genAI = new GoogleGenerativeAI(apiKey);
      
      this.genAIs.push(genAI);
      this.primaryModels.push(genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }));
      this.fallbackModels.push(genAI.getGenerativeModel({ model: 'gemini-2.0-flash' }));
      
      // Initialize usage counters
      this.keyUsageCount.set(i, 0);
      this.keyErrorCount.set(i, 0);
    }

    // Load configuration
    this.config = await this.loadConfig();
    
    // Load translation cache
    await this.loadCache();

    console.log('🚀 Translation Manager initialized');
    console.log(`📋 Target languages: ${this.config.targetLanguages.join(', ')}`);
  }

  // Select the best API key based on usage and error rates
  selectBestApiKey() {
    let bestKeyIndex = 0;
    let lowestScore = Infinity;

    for (let i = 0; i < this.apiKeys.length; i++) {
      const usageCount = this.keyUsageCount.get(i) || 0;
      const errorCount = this.keyErrorCount.get(i) || 0;
      
      // Score based on usage count and error rate (lower is better)
      const errorRate = usageCount > 0 ? errorCount / usageCount : 0;
      const score = usageCount + (errorRate * 10); // Weight errors heavily
      
      if (score < lowestScore) {
        lowestScore = score;
        bestKeyIndex = i;
      }
    }

    return bestKeyIndex;
  }

  // Get the next API key using round-robin with smart fallback
  getNextApiKey() {
    if (this.apiKeys.length === 1) {
      return 0;
    }

    // Use smart selection based on usage and errors
    const bestKey = this.selectBestApiKey();
    
    // If the best key has too many recent errors, try round-robin
    const bestKeyErrors = this.keyErrorCount.get(bestKey) || 0;
    const bestKeyUsage = this.keyUsageCount.get(bestKey) || 1;
    const errorRate = bestKeyErrors / bestKeyUsage;
    
    if (errorRate > 0.5) { // If error rate > 50%, try round-robin
      this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
      return this.currentKeyIndex;
    }
    
    return bestKey;
  }

  // Record API key usage
  recordApiKeyUsage(keyIndex, success = true) {
    const currentUsage = this.keyUsageCount.get(keyIndex) || 0;
    this.keyUsageCount.set(keyIndex, currentUsage + 1);
    
    if (!success) {
      const currentErrors = this.keyErrorCount.get(keyIndex) || 0;
      this.keyErrorCount.set(keyIndex, currentErrors + 1);
    }
  }

  // Get current models for a specific API key
  getCurrentModels(keyIndex, useFallback = false) {
    const primaryModel = this.primaryModels[keyIndex];
    const fallbackModel = this.fallbackModels[keyIndex];
    return useFallback ? fallbackModel : primaryModel;
  }

  async loadConfig() {
    try {
      const configData = await fs.readFile(CONFIG_PATH, 'utf8');
      return JSON.parse(configData);
    } catch (error) {
      console.warn('⚠️  Using default configuration');
      return {
        targetLanguages: ['en', 'ja', 'ko', 'fr', 'de', 'es'],
        sourceLanguage: 'zh',
        excludePatterns: ['**/node_modules/**', '**/dist/**', '**/build/**', '**/.git/**', '**/i18n/**'],
        includePatterns: ['docs/**/*.md'],
        outputDir: 'i18n',
        preserveCodeBlocks: true,
        preserveLinks: true,
        maxConcurrentTranslations: 3,
        retryAttempts: 3,
        delayBetweenRequests: 1000
      };
    }
  }

  async loadCache() {
    try {
      await fs.mkdir(CACHE_DIR, { recursive: true });
      const cacheFile = path.join(CACHE_DIR, 'translations.json');
      
      try {
        const cacheData = await fs.readFile(cacheFile, 'utf8');
        const cacheObj = JSON.parse(cacheData);
        this.cache = new Map(Object.entries(cacheObj));
        console.log(`📦 Loaded ${this.cache.size} cached translations`);
      } catch (error) {
        console.log('📦 No translation cache found, starting fresh');
      }
    } catch (error) {
      console.warn('⚠️  Could not create cache directory:', error.message);
    }
  }

  async saveCache() {
    try {
      const cacheFile = path.join(CACHE_DIR, 'translations.json');
      const cacheObj = Object.fromEntries(this.cache);
      await fs.writeFile(cacheFile, JSON.stringify(cacheObj, null, 2));
      console.log(`💾 Saved ${this.cache.size} translations to cache`);
    } catch (error) {
      console.warn('⚠️  Could not save cache:', error.message);
    }
  }

  generateCacheKey(content, targetLang) {
    const hash = crypto.createHash('md5').update(content + targetLang).digest('hex');
    return `${targetLang}_${hash}`;
  }

  async translateText(text, targetLanguage, context = '') {
    const cacheKey = this.generateCacheKey(text, targetLanguage);
    
    // Check cache first
    if (this.cache.has(cacheKey) && !process.env.FORCE_TRANSLATE) {
      this.stats.cached++;
      return this.cache.get(cacheKey);
    }

    const languageNames = {
      'en': 'English',
      'ja': 'Japanese',
      'ko': 'Korean',
      'fr': 'French',
      'de': 'German',
      'es': 'Spanish',
      'it': 'Italian',
      'pt': 'Portuguese',
      'ru': 'Russian',
      'ar': 'Arabic'
    };

    const targetLangName = languageNames[targetLanguage] || targetLanguage;

    const prompt = `You are a professional technical translator specializing in aviation and flight simulation documentation.

Translate the following Chinese text to ${targetLangName}. 

IMPORTANT RULES:
1. Preserve ALL markdown formatting (headers, links, code blocks, lists, tables, etc.)
2. Keep code blocks, file paths, and technical commands EXACTLY as they are
3. Preserve HTML tags and markdown syntax
4. Keep URLs and links unchanged
5. Maintain the same structure and formatting
6. For technical terms, use industry-standard translations
7. Keep emoji and special characters as they are
8. If you encounter technical terms that should remain in English (like software names, API names), keep them in English
9. Translate naturally while maintaining technical accuracy

${context ? `Context: This text is from ${context}` : ''}

Text to translate:
${text}

Translated text:`;

    let lastError;
    let currentKeyIndex = this.getNextApiKey();
    let usingFallback = false;
    let keyRotationAttempts = 0;
    const maxKeyRotations = this.apiKeys.length * 2; // Try each key twice
    
    for (let attempt = 1; attempt <= this.config.retryAttempts; attempt++) {
      try {
        const model = this.getCurrentModels(currentKeyIndex, usingFallback);
        const modelName = usingFallback ? 'gemini-2.0-flash' : 'gemini-2.5-flash';
        const keyLabel = `Key-${currentKeyIndex + 1}`;
        
        console.log(`🔄 Translating to ${targetLanguage} using ${modelName} with ${keyLabel} (attempt ${attempt}/${this.config.retryAttempts})`);
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const translatedText = response.text();

        // Record successful usage
        this.recordApiKeyUsage(currentKeyIndex, true);

        // Cache the translation
        this.cache.set(cacheKey, translatedText);
        this.stats.translated++;
        
        // Add delay between requests to avoid rate limiting
        if (this.config.delayBetweenRequests > 0) {
          await new Promise(resolve => setTimeout(resolve, this.config.delayBetweenRequests));
        }

        return translatedText;
      } catch (error) {
        lastError = error;
        const isServiceOverloaded = error.message.includes('503') || error.message.includes('overloaded');
        const isQuotaExceeded = error.message.includes('quota') || error.message.includes('429') || error.message.includes('rate limit');
        
        // Record failed usage
        this.recordApiKeyUsage(currentKeyIndex, false);
        
        console.error(`❌ Translation attempt ${attempt} failed with ${`Key-${currentKeyIndex + 1}`}:`, error.message);
        
        // If quota exceeded or rate limited, try a different API key
        if ((isQuotaExceeded || isServiceOverloaded) && keyRotationAttempts < maxKeyRotations) {
          const oldKeyIndex = currentKeyIndex;
          currentKeyIndex = this.getNextApiKey();
          
          // Make sure we actually switched to a different key
          if (currentKeyIndex === oldKeyIndex && this.apiKeys.length > 1) {
            currentKeyIndex = (currentKeyIndex + 1) % this.apiKeys.length;
          }
          
          console.log(`🔄 Switching to API Key-${currentKeyIndex + 1} due to quota/rate limit`);
          keyRotationAttempts++;
          usingFallback = false; // Reset fallback when switching keys
          
          // Don't count key rotation as a retry attempt
          attempt--;
          continue;
        }
        
        // If service is overloaded and we haven't tried fallback model yet, switch to it
        if (isServiceOverloaded && !usingFallback) {
          console.log(`🔄 Switching to fallback model (gemini-2.0-flash) due to service overload`);
          usingFallback = true;
          
          // Don't count this as a retry attempt, just switch models
          attempt--;
          continue;
        }
        
        if (attempt < this.config.retryAttempts) {
          // Exponential backoff with jitter for service overload errors
          const baseDelay = (isServiceOverloaded || isQuotaExceeded) ? 5000 : RETRY_DELAY;
          const delay = baseDelay * Math.pow(2, attempt - 1) + Math.random() * 1000;
          console.log(`⏳ Retrying in ${Math.round(delay)}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    this.stats.errors++;
    throw new Error(`Translation failed after ${this.config.retryAttempts} attempts: ${lastError.message}`);
  }

  async findMarkdownFiles() {
    const files = [];
    
    async function scanDirectory(dir) {
      try {
        const entries = await fs.readdir(dir, { withFileTypes: true });
        
        for (const entry of entries) {
          const fullPath = path.join(dir, entry.name);
          
          if (entry.isDirectory()) {
            // Skip i18n directories to avoid translating already translated files
            if (entry.name === 'i18n') continue;
            await scanDirectory(fullPath);
          } else if (entry.isFile() && entry.name.endsWith('.md')) {
            files.push(fullPath);
          }
        }
      } catch (error) {
        console.warn(`⚠️  Could not scan directory ${dir}:`, error.message);
      }
    }

    await scanDirectory('docs');
    return files;
  }

  async shouldTranslateFile(filePath) {
    // Check if forced translation is enabled
    if (process.env.FORCE_TRANSLATE === 'true') {
      return true;
    }

    // Check git status to see if file has been modified
    try {
      const { execSync } = require('child_process');
      const gitStatus = execSync('git status --porcelain', { encoding: 'utf8' });
      const modifiedFiles = gitStatus.split('\n')
        .filter(line => line.trim())
        .map(line => line.substring(3)); // Remove git status prefix
      
      return modifiedFiles.some(modFile => path.resolve(modFile) === path.resolve(filePath));
    } catch (error) {
      console.warn('⚠️  Could not check git status, translating all files');
      return true;
    }
  }

  async translateFile(filePath) {
    try {
      console.log(`\n📄 Processing: ${filePath}`);
      
      // Check if file should be translated
      if (!(await this.shouldTranslateFile(filePath))) {
        console.log(`⏭️  Skipping ${filePath} (no changes detected)`);
        this.stats.skipped++;
        return;
      }

      const content = await fs.readFile(filePath, 'utf8');
      const relativePath = path.relative('docs', filePath);
      const fileDir = path.dirname(filePath);
      const fileName = path.basename(filePath, '.md');

      // Create i18n directory
      const i18nDir = path.join(fileDir, this.config.outputDir);
      await fs.mkdir(i18nDir, { recursive: true });

      // Get target languages from environment or config
      const targetLanguages = process.env.TARGET_LANGUAGES 
        ? process.env.TARGET_LANGUAGES.split(',').map(lang => lang.trim())
        : this.config.targetLanguages;

      // Translate to each target language
      const translationPromises = targetLanguages.map(async (lang) => {
        const outputPath = path.join(i18nDir, `${fileName}.${lang}.md`);
        
        try {
          // Check if translation already exists and is newer than source
          try {
            const [sourceStat, targetStat] = await Promise.all([
              fs.stat(filePath),
              fs.stat(outputPath)
            ]);
            
            if (targetStat.mtime > sourceStat.mtime && process.env.FORCE_TRANSLATE !== 'true') {
              console.log(`✅ ${lang}: Up to date`);
              return;
            }
          } catch (error) {
            // File doesn't exist, proceed with translation
          }

          console.log(`🌐 Translating to ${lang}...`);
          const translatedContent = await this.translateText(content, lang, relativePath);
          
          await fs.writeFile(outputPath, translatedContent, 'utf8');
          console.log(`✅ ${lang}: Saved to ${outputPath}`);
          
        } catch (error) {
          console.error(`❌ ${lang}: Translation failed -`, error.message);
          // Don't throw error for individual language failures, just log and continue
          this.stats.errors++;
        }
      });

      // Process translations with concurrency limit
      const concurrency = this.config.maxConcurrentTranslations;
      for (let i = 0; i < translationPromises.length; i += concurrency) {
        const batch = translationPromises.slice(i, i + concurrency);
        await Promise.all(batch);
      }

    } catch (error) {
      console.error(`❌ Failed to process ${filePath}:`, error.message);
      this.stats.errors++;
      // Don't throw error, let the main process handle it
    }
  }

  async run() {
    try {
      console.log('🌐 Starting documentation translation...\n');
      
      await this.initialize();
      
      const markdownFiles = await this.findMarkdownFiles();
      console.log(`📚 Found ${markdownFiles.length} markdown files`);

      if (markdownFiles.length === 0) {
        console.log('ℹ️  No markdown files found to translate');
        return;
      }

      // Process files sequentially to avoid overwhelming the API
      const failedFiles = [];
      for (const file of markdownFiles) {
        try {
          await this.translateFile(file);
        } catch (error) {
          console.error(`💥 Failed to process ${file}:`, error.message);
          failedFiles.push({ file, error: error.message });
          // Continue with other files instead of failing completely
        }
      }
      
      // Report failed files
      if (failedFiles.length > 0) {
        console.log(`\n⚠️  ${failedFiles.length} files failed to translate:`);
        failedFiles.forEach(({ file, error }) => {
          console.log(`   ❌ ${file}: ${error}`);
        });
      }

      // Save cache
      await this.saveCache();

      // Print summary
      console.log('\n📊 Translation Summary:');
      console.log(`✅ Translated: ${this.stats.translated} files`);
      console.log(`📦 From cache: ${this.stats.cached} files`);
      console.log(`⏭️  Skipped: ${this.stats.skipped} files`);
      console.log(`❌ Errors: ${this.stats.errors} files`);
      
      // Print API key usage statistics
      if (this.apiKeys.length > 1) {
        console.log('\n🔑 API Key Usage Statistics:');
        for (let i = 0; i < this.apiKeys.length; i++) {
          const usage = this.keyUsageCount.get(i) || 0;
          const errors = this.keyErrorCount.get(i) || 0;
          const successRate = usage > 0 ? ((usage - errors) / usage * 100).toFixed(1) : '0.0';
          console.log(`   Key-${i + 1}: ${usage} requests, ${errors} errors (${successRate}% success)`);
        }
      }

      // Only exit with error if ALL translations failed
      const totalAttempted = this.stats.translated + this.stats.errors;
      if (this.stats.errors > 0 && this.stats.translated === 0 && totalAttempted > 0) {
        console.log('💥 All translation attempts failed, exiting with error');
        process.exit(1);
      } else if (this.stats.errors > 0) {
        console.log('⚠️  Some translations failed, but continuing (partial success)');
      }

    } catch (error) {
      console.error('💥 Translation process failed:', error.message);
      process.exit(1);
    }
  }
}

// Run the translation manager
if (require.main === module) {
  const manager = new TranslationManager();
  manager.run().catch(error => {
    console.error('💥 Unexpected error:', error);
    process.exit(1);
  });
}

module.exports = TranslationManager;

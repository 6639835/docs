import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

// https://vitepress.dev/reference/site-config
export default withMermaid(defineConfig({
  title: "Nav-data",
  description: "高质量飞行模拟导航数据 - 专业的航空导航数据转换工具",
  
  // URL重写配置，让英文作为默认路径
  rewrites: {
    'en/:rest*': ':rest*'
  },
  
  // 国际化配置
  locales: {
    root: { 
      label: 'English', 
      lang: 'en-US', 
      dir: 'ltr'
    },
    zh: { 
      label: '简体中文', 
      lang: 'zh-CN', 
      dir: 'ltr',
      themeConfig: {
        nav: [
          { text: '🏠 首页', link: '/zh/' },
          { text: '🛩️ PMDG', link: '/zh/PMDG/guide/index' },
          { text: '✈️ iniBuilds', link: '/zh/iniBuilds/guide/index' },
          { text: '🛫 X-Plane', link: '/zh/X-Plane/guide/index' },
          { text: '✈️ iFly', link: '/zh/iFly/guide/index' },
          { text: '🚁 TFDI', link: '/zh/TFDI/guide/index' },
          { 
            text: '📖 关于', 
            items: [
              { text: '🎯 关于我们', link: '/zh/Introduction/about' },
              { text: '🤝 如何加入', link: '/zh/Introduction/join' }
            ]
          }
        ],
        sidebar: {
          '/zh/Introduction/': [
            {
              text: '简介',
              items: [
                { text: '关于我们', link: '/zh/Introduction/about' },
                { text: '如何加入', link: '/zh/Introduction/join' },
              ],
            },
          ],
          '/zh/PMDG/': [
            {
              text: 'PMDG',
              items: [
                {
                  text: '指南',
                  link: '/zh/PMDG/guide/index',
                  collapsed: false,
                  items: [
                    { text: '安装指南', link: '/zh/PMDG/guide/installation' },
                    { text: '配置说明', link: '/zh/PMDG/guide/configuration' },
                    { text: '使用说明', link: '/zh/PMDG/guide/usage' },
                  ],
                },
                { text: '常见问题', link: '/zh/PMDG/faq' },
                { text: '故障排除', link: '/zh/PMDG/troubleshooting' },
                { text: '架构说明', link: '/zh/PMDG/architecture' },
                { text: '贡献指南', link: '/zh/PMDG/contributing' },
                { text: '更新日志', link: '/zh/PMDG/changelog' },
                { text: '许可证', link: '/zh/PMDG/license' },
              ],
            },
          ],
          '/zh/iniBuilds/': [
            {
              text: 'iniBuilds',
              items: [
                {
                  text: '指南',
                  link: '/zh/iniBuilds/guide/index',
                  collapsed: false,
                  items: [
                    { text: '安装指南', link: '/zh/iniBuilds/guide/installation' },
                    { text: '配置说明', link: '/zh/iniBuilds/guide/configuration' },
                    { text: '使用说明', link: '/zh/iniBuilds/guide/usage' },
                  ]
                },
                { text: '常见问题', link: '/zh/iniBuilds/faq' },
                { text: '故障排除', link: '/zh/iniBuilds/troubleshooting' },
                { text: '架构说明', link: '/zh/iniBuilds/architecture' },
                { text: '贡献指南', link: '/zh/iniBuilds/contributing' },
                { text: '更新日志', link: '/zh/iniBuilds/changelog' },
                { text: '许可证', link: '/zh/iniBuilds/license' },
              ],
            },
          ],
          '/zh/X-Plane/': [
            {
              text: 'X-Plane',
              items: [
                { text: '指南', link: '/zh/X-Plane/guide/index', 
                  collapsed: false, items: [
                  { text: '安装指南', link: '/zh/X-Plane/guide/installation' },
                  { text: '配置说明', link: '/zh/X-Plane/guide/configuration' },
                  { text: '使用说明', link: '/zh/X-Plane/guide/usage' },
                ] },
                { text: '常见问题', link: '/zh/X-Plane/faq' },
                { text: '故障排除', link: '/zh/X-Plane/troubleshooting' },
                { text: '架构说明', link: '/zh/X-Plane/architecture' },
                { text: '贡献指南', link: '/zh/X-Plane/contributing' },
                { text: '更新日志', link: '/zh/X-Plane/changelog' },
                { text: '许可证', link: '/zh/X-Plane/license' },
              ],
            },
          ],
          '/zh/iFly/': [
            {
              text: 'iFly',
              items: [
                {
                  text: '指南',
                  link: '/zh/iFly/guide/index',
                  collapsed: false,
                  items: [
                    { text: '安装指南', link: '/zh/iFly/guide/installation' },
                    { text: '配置说明', link: '/zh/iFly/guide/configuration' },
                    { text: '使用说明', link: '/zh/iFly/guide/usage' },
                  ],
                },
                { text: '常见问题', link: '/zh/iFly/faq' },
                { text: '故障排除', link: '/zh/iFly/troubleshooting' },
                { text: '架构说明', link: '/zh/iFly/architecture' },
                { text: '贡献指南', link: '/zh/iFly/contributing' },
                { text: '更新日志', link: '/zh/iFly/changelog' },
                { text: '许可证', link: '/zh/iFly/license' },
              ],
            },
          ],
          '/zh/TFDI/': [
            {
              text: 'TFDI',
              items: [
                {
                  text: '指南',
                  link: '/zh/TFDI/guide/index',
                  collapsed: false,
                  items: [
                    { text: '安装指南', link: '/zh/TFDI/guide/installation' },
                    { text: '配置说明', link: '/zh/TFDI/guide/configuration' },
                    { text: '使用说明', link: '/zh/TFDI/guide/usage' },
                  ],
                },
                { text: '常见问题', link: '/zh/TFDI/faq' },
                { text: '故障排除', link: '/zh/TFDI/troubleshooting' },
                { text: '架构说明', link: '/zh/TFDI/architecture' },
                { text: '贡献指南', link: '/zh/TFDI/contributing' },
                { text: '更新日志', link: '/zh/TFDI/changelog' },
                { text: '许可证', link: '/zh/TFDI/license' },
              ],
            },
          ],
        },
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        outline: {
          label: '页面导航'
        },
        lastUpdated: {
          text: '最后更新于',
          formatOptions: {
            dateStyle: 'short',
            timeStyle: 'medium'
          }
        },
        returnToTopLabel: '返回顶部',
        sidebarMenuLabel: '菜单',
        darkModeSwitchLabel: '主题',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式'
      }
    },
    de: { label: 'Deutsch', lang: 'de-DE', dir: 'ltr' },
    es: { label: 'Español', lang: 'es-ES', dir: 'ltr' },
    fr: { label: 'Français', lang: 'fr-FR', dir: 'ltr' },
    ja: { label: '日本語', lang: 'ja-JP', dir: 'ltr' },
    ko: { label: '한국어', lang: 'ko-KR', dir: 'ltr' }
  },
  head: [
    ['meta', { name: 'theme-color', content: '#1e40af' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:title', content: 'Nav-data | 航空导航数据转换工具' }],
    ['meta', { property: 'og:site_name', content: 'Nav-data' }],
    ['meta', { property: 'og:image', content: '/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // Enhanced favicon configuration
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=3' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.svg?v=3' }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    // Custom fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap', rel: 'stylesheet' }]
  ],
  
  // 主题外观配置
  appearance: 'dark', // 支持深色模式切换
  
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    
    // 添加logo到头部
    logo: '/favicon.svg',
    
    // 英文导航 (root locale)
    nav: [
      { text: '🏠 Home', link: '/' },
      { text: '🛩️ PMDG', link: '/PMDG/guide/index' },
      { text: '✈️ iniBuilds', link: '/iniBuilds/guide/index' },
      { text: '🛫 X-Plane', link: '/X-Plane/guide/index' },
      { text: '✈️ iFly', link: '/iFly/guide/index' },
      { text: '🚁 TFDI', link: '/TFDI/guide/index' },
      { 
        text: '📖 About', 
        items: [
          { text: '🎯 About Us', link: '/Introduction/about' },
          { text: '🤝 Join Us', link: '/Introduction/join' }
        ]
      }
    ],

    // 英文侧边栏 (root locale)
    sidebar: {
      '/Introduction/': [
        {
          text: 'Introduction',
          items: [
            { text: 'About Us', link: '/Introduction/about' },
            { text: 'Join Us', link: '/Introduction/join' },
          ],
        },
      ],
      '/PMDG/': [
        {
          text: 'PMDG',
          items: [
            {
              text: 'Guide',
              link: '/PMDG/guide/index',
              collapsed: false,
              items: [
                { text: 'Installation', link: '/PMDG/guide/installation' },
                { text: 'Configuration', link: '/PMDG/guide/configuration' },
                { text: 'Usage', link: '/PMDG/guide/usage' },
              ],
            },
            { text: 'FAQ', link: '/PMDG/faq' },
            { text: 'Troubleshooting', link: '/PMDG/troubleshooting' },
            { text: 'Architecture', link: '/PMDG/architecture' },
            { text: 'Contributing', link: '/PMDG/contributing' },
            { text: 'Changelog', link: '/PMDG/changelog' },
            { text: 'License', link: '/PMDG/license' },
          ],
        },
      ],
      '/iniBuilds/': [
        {
          text: 'iniBuilds',
          items: [
            {
              text: 'Guide',
              link: '/iniBuilds/guide/index',
              collapsed: false,
              items: [
                { text: 'Installation', link: '/iniBuilds/guide/installation' },
                { text: 'Configuration', link: '/iniBuilds/guide/configuration' },
                { text: 'Usage', link: '/iniBuilds/guide/usage' },
              ]
            },
            { text: 'FAQ', link: '/iniBuilds/faq' },
            { text: 'Troubleshooting', link: '/iniBuilds/troubleshooting' },
            { text: 'Architecture', link: '/iniBuilds/architecture' },
            { text: 'Contributing', link: '/iniBuilds/contributing' },
            { text: 'Changelog', link: '/iniBuilds/changelog' },
            { text: 'License', link: '/iniBuilds/license' },
          ],
        },
      ],
      '/X-Plane/': [
        {
          text: 'X-Plane',
          items: [
            { text: 'Guide', link: '/X-Plane/guide/index', 
              collapsed: false, items: [
              { text: 'Installation', link: '/X-Plane/guide/installation' },
              { text: 'Configuration', link: '/X-Plane/guide/configuration' },
              { text: 'Usage', link: '/X-Plane/guide/usage' },
            ] },
            { text: 'FAQ', link: '/X-Plane/faq' },
            { text: 'Troubleshooting', link: '/X-Plane/troubleshooting' },
            { text: 'Architecture', link: '/X-Plane/architecture' },
            { text: 'Contributing', link: '/X-Plane/contributing' },
            { text: 'Changelog', link: '/X-Plane/changelog' },
            { text: 'License', link: '/X-Plane/license' },
          ],
        },
      ],
      '/iFly/': [
        {
          text: 'iFly',
          items: [
            {
              text: 'Guide',
              link: '/iFly/guide/index',
              collapsed: false,
              items: [
                { text: 'Installation', link: '/iFly/guide/installation' },
                { text: 'Configuration', link: '/iFly/guide/configuration' },
                { text: 'Usage', link: '/iFly/guide/usage' },
              ],
            },
            { text: 'FAQ', link: '/iFly/faq' },
            { text: 'Troubleshooting', link: '/iFly/troubleshooting' },
            { text: 'Architecture', link: '/iFly/architecture' },
            { text: 'Contributing', link: '/iFly/contributing' },
            { text: 'Changelog', link: '/iFly/changelog' },
            { text: 'License', link: '/iFly/license' },
          ],
        },
      ],
      '/TFDI/': [
        {
          text: 'TFDI',
          items: [
            {
              text: 'Guide',
              link: '/TFDI/guide/index',
              collapsed: false,
              items: [
                { text: 'Installation', link: '/TFDI/guide/installation' },
                { text: 'Configuration', link: '/TFDI/guide/configuration' },
                { text: 'Usage', link: '/TFDI/guide/usage' },
              ],
            },
            { text: 'FAQ', link: '/TFDI/faq' },
            { text: 'Troubleshooting', link: '/TFDI/troubleshooting' },
            { text: 'Architecture', link: '/TFDI/architecture' },
            { text: 'Contributing', link: '/TFDI/contributing' },
            { text: 'Changelog', link: '/TFDI/changelog' },
            { text: 'License', link: '/TFDI/license' },
          ],
        },
      ],
    },

    // 搜索功能
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search'
              },
              modal: {
                displayDetails: 'Display detailed list',
                resetButtonTitle: 'Reset search',
                backButtonTitle: 'Back to search',
                noResultsText: 'No results found',
                footer: {
                  selectText: 'Select',
                  navigateText: 'Navigate',
                  closeText: 'Close'
                }
              }
            }
          },
          zh: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                displayDetails: '显示详细列表',
                resetButtonTitle: '清除查询条件',
                backButtonTitle: '返回搜索',
                noResultsText: '无法找到相关结果',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },

    // 社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/nav-data' }
    ],

    // 页脚
    footer: {
      message: '基于 MIT 许可发布',
      copyright: 'Copyright © 2025 Nav-data Team'
    },

    // 编辑链接
    editLink: {
      pattern: 'https://github.com/nav-data/docs/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页面'
    },

    // 最后更新时间
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    // 文档页面导航
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },

    // 大纲标题
    outline: {
      label: '页面导航'
    },

    // 返回顶部
    returnToTopLabel: '返回顶部',

    // 侧边栏菜单标签
    sidebarMenuLabel: '菜单',

    // 深色模式切换标签
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式'
  },

  // 构建配置
  cleanUrls: true,
  metaChunk: true,
  
  // 开发服务器配置
  vite: {
    server: {
      host: true,
      port: 5173
    }
  },

  // Mermaid configuration
  mermaid: {
    theme: 'default',
    themeVariables: {
      primaryColor: '#1e40af',
      primaryTextColor: '#fff',
      primaryBorderColor: '#3b82f6',
      lineColor: '#374151',
      secondaryColor: '#e5e7eb',
      tertiaryColor: '#f3f4f6'
    }
  }
}))

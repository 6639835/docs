---
title: Guide de dépannage
description: Diagnostic et solutions systématiques des pannes du système Nav-data
---

# Guide de dépannage

Ce document fournit des méthodes de diagnostic et des solutions systématiques pour aider les utilisateurs à identifier et à résoudre rapidement les problèmes rencontrés lors de l'utilisation de Nav-data.

## 🔍 Processus de diagnostic rapide

### Première étape : Vérification de l'environnement
```bash
# 1. Vérifier la version de Python
python --version
# Doit afficher la version Python 3.6+

# 2. Vérifier l'installation des packages de dépendances
pip list | grep -E "(pandas|numpy|pdfplumber|tqdm|colorama|geopy)"

# 3. Vérifier le répertoire de travail
ls -la
# Doit afficher la structure des fichiers du projet

# 4. Vérifier les ressources système
df -h          # Espace disque
free -h        # Mémoire (Linux/macOS)
# Windows : Vérifier dans le Gestionnaire des tâches
```

### Deuxième étape : Analyse des logs
```bash
# Activer les logs détaillés
export NAV_DATA_DEBUG=1  # Linux/macOS
set NAV_DATA_DEBUG=1     # Windows

# Afficher les logs d'erreurs récents
tail -n 50 logs/nav-data.log
```

### Troisième étape : Validation des fichiers de données
```bash
# Vérifier le fichier d'entrée
file -I input_file.csv   # Vérifier l'encodage
head -n 5 input_file.csv # Afficher les premières lignes

# Valider l'intégrité du fichier
wc -l input_file.csv     # Comptage des lignes
```

## 🚨 Modes d'erreurs courants

### Classification des types d'erreurs

#### A. Erreurs de configuration de l'environnement
- Version de Python incompatible
- Packages de dépendances manquants ou conflits de versions
- Erreur de configuration de chemin
- Problèmes de permissions

#### B. Erreurs de format de données
- Problème d'encodage CSV
- Format PDF non supporté
- Champs manquants ou format incorrect
- Problème de format de coordonnées

#### C. Problèmes de ressources système
- Mémoire insuffisante
- Espace disque insuffisant
- Limite de descripteurs de fichiers dépassée
- Problème de connexion réseau

#### D. Erreurs de traitement logique
- Échec de la validation des données
- Erreurs dans les règles de conversion
- Format de sortie incorrect
- Conflits de traitement concurrent

## 🔧 Dépannage détaillé

### 1. Problèmes d'installation et d'environnement

#### Problème : ModuleNotFoundError
```
Message d'erreur : ModuleNotFoundError: No module named 'pandas'
```

**Étapes de diagnostic :**
```bash
# 1. Confirmer l'environnement Python actuel
which python
python -c "import sys; print(sys.path)"

# 2. Vérifier l'état de l'environnement virtuel
echo $VIRTUAL_ENV  # Doit afficher le chemin de l'environnement virtuel

# 3. Vérifier l'installation du package
pip show pandas
```

**Solutions :**
```bash
# Solution 1 : Réinstaller les dépendances
pip install -r requirements.txt

# Solution 2 : Créer un nouvel environnement virtuel
python -m venv nav-data-env-new
source nav-data-env-new/bin/activate
pip install -r requirements.txt

# Solution 3 : Utiliser un environnement conda
conda create -n nav-data python=3.8
conda activate nav-data
pip install -r requirements.txt
```

#### Problème : Permission Denied
```
Message d'erreur : PermissionError: [Errno 13] Permission denied
```

**Étapes de diagnostic :**
```bash
# 1. Vérifier les permissions du fichier
ls -la target_file

# 2. Vérifier les permissions du répertoire
ls -ld target_directory

# 3. Vérifier l'utilisateur actuel
whoami
groups
```

**Solutions :**
```bash
# Solution 1 : Modifier les permissions du fichier
chmod 644 target_file    # Permissions du fichier
chmod 755 target_dir     # Permissions du répertoire

# Solution 2 : Changer le propriétaire (si nécessaire)
sudo chown $USER:$USER target_file

# Solution 3 : Utiliser le répertoire utilisateur
mkdir ~/nav-data-workspace
cd ~/nav-data-workspace
```

#### Problème : Conflit de version Python
```
Message d'erreur : SyntaxError: invalid syntax (Python 2.7 detected)
```

**Étapes de diagnostic :**
```bash
# Vérifier toutes les versions de Python
python --version
python3 --version
which python
which python3

# Vérifier le Python par défaut
ls -la /usr/bin/python*
```

**Solutions :**
```bash
# Solution 1 : Appeler explicitement python3
python3 script.py

# Solution 2 : Créer un alias
echo "alias python=python3" >> ~/.bashrc
source ~/.bashrc

# Solution 3 : Mettre à jour la valeur par défaut du système (procéder avec prudence)
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### 2. Problèmes de traitement des données

#### Problème : Erreur d'encodage CSV
```
Message d'erreur : UnicodeDecodeError: 'utf-8' codec can't decode
```

**Script de diagnostic :**
```python
#!/usr/bin/env python3
"""
Outil de diagnostic d'encodage CSV
"""
import chardet
import pandas as pd
from pathlib import Path

def diagnose_csv_encoding(file_path):
    """Diagnostique l'encodage d'un fichier CSV"""
    file_path = Path(file_path)
    
    print(f"🔍 Diagnostic du fichier : {file_path}")
    
    # 1. Informations de base sur le fichier
    print(f"Taille du fichier : {file_path.stat().st_size} bytes")
    
    # 2. Détection automatique de l'encodage
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)  # Lit les 10 premiers Ko
        encoding_info = chardet.detect(raw_data)
        print(f"Encodage détecté : {encoding_info}")
    
    # 3. Essayer différents encodages
    encodings = ['utf-8', 'gbk', 'gb2312', 'utf-16', 'latin1']
    
    for encoding in encodings:
        try:
            df = pd.read_csv(file_path, encoding=encoding, nrows=5)
            print(f"✅ {encoding}: Lecture réussie {len(df)} lignes")
            print(f"   Noms de colonnes : {list(df.columns)}")
            break
        except Exception as e:
            print(f"❌ {encoding}: {str(e)[:50]}...")
    
    return encoding_info['encoding']

# Exemple d'utilisation
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnosed_encoding = diagnose_csv_encoding(sys.argv[1])
        print(f"\n💡 Encodage suggéré : {diagnosed_encoding}")
```

**Solutions :**
```python
# Solution 1 : Spécifier l'encodage correct
import pandas as pd
df = pd.read_csv('file.csv', encoding='gbk')

# Solution 2 : Convertir l'encodage du fichier
import codecs
with codecs.open('input.csv', 'r', 'gbk') as f_in:
    with codecs.open('output.csv', 'w', 'utf-8') as f_out:
        f_out.write(f_in.read())

# Solution 3 : Détecter automatiquement l'encodage
import chardet
with open('file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']
df = pd.read_csv('file.csv', encoding=encoding)
```

#### Problème : Échec de l'analyse PDF
```
Message d'erreur : PDFSyntaxError: No /Root object found
```

**Outil de diagnostic :**
```python
#!/usr/bin/env python3
"""
Outil de diagnostic de fichier PDF
"""
import pdfplumber
from pathlib import Path

def diagnose_pdf_file(file_path):
    """Diagnostique les problèmes d'un fichier PDF"""
    file_path = Path(file_path)
    
    print(f"🔍 Diagnostic du fichier PDF : {file_path}")
    
    # 1. Informations de base sur le fichier
    print(f"Taille du fichier : {file_path.stat().st_size} bytes")
    
    # 2. Essayer d'ouvrir le PDF
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"✅ Ouverture du PDF réussie")
            print(f"Nombre de pages : {len(pdf.pages)}")
            
            # Vérifier la première page
            if pdf.pages:
                first_page = pdf.pages[0]
                print(f"Dimensions de la première page : {first_page.width} x {first_page.height}")
                
                # Test d'extraction de texte
                text = first_page.extract_text()
                if text:
                    print(f"Extraction de texte réussie, 100 premiers caractères : {text[:100]}...")
                else:
                    print("⚠️  Impossible d'extraire le texte, il pourrait s'agir d'un PDF scanné")
                
                # Vérifier les tableaux
                tables = first_page.extract_tables()
                print(f"Détecté {len(tables)} tableaux")
                
                # Vérifier les images
                images = first_page.images
                print(f"Détecté {len(images)} images")
                
    except Exception as e:
        print(f"❌ Échec de l'ouverture du PDF : {e}")
        
        # Suggestions de réparation
        print("\n💡 Suggestions de réparation :")
        print("1. Vérifier si le fichier PDF est corrompu")
        print("2. Tenter de l'ouvrir avec Adobe Reader pour vérification")
        print("3. Utiliser un outil de réparation PDF")
        print("4. Télécharger ou obtenir à nouveau le fichier PDF")

# Exemple d'utilisation
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnose_pdf_file(sys.argv[1])
```

**Solutions :**
```python
# Solution 1 : Utiliser des options d'analyse plus souples
import pdfplumber
try:
    with pdfplumber.open(pdf_file, password="") as pdf:
        # Logique de traitement
        pass
except Exception as e:
    print(f"Échec de l'analyse PDF : {e}")

# Solution 2 : Essayer d'autres bibliothèques PDF
import pypdf2
try:
    with open(pdf_file, 'rb') as f:
        reader = pypdf2.PdfFileReader(f)
        # Logique de traitement
except Exception as e:
    print(f"Échec de la bibliothèque PDF alternative : {e}")

# Solution 3 : Pré-traiter le PDF
# Utiliser un outil externe comme pdftk pour réparer le PDF
import subprocess
subprocess.run(['pdftk', 'broken.pdf', 'output', 'fixed.pdf'])
```

#### Problème : Erreur de conversion de coordonnées
```
Message d'erreur : ValueError: invalid literal for float()
```

**Outil de diagnostic :**
```python
#!/usr/bin/env python3
"""
Outil de diagnostic des données de coordonnées
"""
import re

def diagnose_coordinate_data(text):
    """Diagnostique le format des données de coordonnées"""
    print(f"🔍 Diagnostic des données de coordonnées : {text[:50]}...")
    
    # Modèles de format de coordonnées courants
    patterns = {
        'decimal': r'[+-]?\d+\.\d+',
        'dms_with_symbols': r'\d+°\d+′\d+″',
        'dms_with_letters': r'\d+[°]\d+[\']\d+["]',
        'dms_spaces': r'\d+\s+\d+\s+\d+',
        'chinese_format': r'北纬|南纬|东经|西经',
    }
    
    found_patterns = []
    for name, pattern in patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            found_patterns.append((name, matches[:3]))  # Afficher les 3 premières correspondances
    
    print("Formats de coordonnées détectés :")
    for name, matches in found_patterns:
        print(f"  {name}: {matches}")
    
    # Extraire les coordonnées possibles
    coord_candidates = re.findall(r'\d+[°′″\s\'"]+\d+[°′″\s\'"]*\d*', text)
    print(f"Candidats aux coordonnées : {coord_candidates[:5]}")
    
    return found_patterns

def test_coordinate_conversion(coord_string):
    """Teste la conversion de coordonnées"""
    print(f"\n🧪 Test de conversion : {coord_string}")
    
    try:
        # Essayer différentes méthodes de conversion
        
        # Méthode 1 : Conversion directe en nombre flottant
        try:
            result = float(coord_string)
            print(f"  Conversion directe : {result}")
            return result
        except ValueError:
            pass
        
        # Méthode 2 : Conversion degrés-minutes-secondes
        dms_pattern = r'(\d+)[°]\s*(\d+)[′\']\s*(\d+(?:\.\d+)?)[″"]?'
        match = re.search(dms_pattern, coord_string)
        if match:
            degrees, minutes, seconds = map(float, match.groups())
            decimal = degrees + minutes/60 + seconds/3600
            print(f"  Conversion DMS : {decimal}")
            return decimal
        
        # Méthode 3 : Conversion après nettoyage des caractères spéciaux
        cleaned = re.sub(r'[^\d\.]', '', coord_string)
        if cleaned:
            result = float(cleaned)
            print(f"  Conversion après nettoyage : {result}")
            return result
            
        print(f"  ❌ Échec de la conversion")
        return None
        
    except Exception as e:
        print(f"  ❌ Exception de conversion : {e}")
        return None

# Exemple d'utilisation
if __name__ == "__main__":
    test_data = "北纬39°48'35.6\" 东经116°34'46.7\""
    diagnose_coordinate_data(test_data)
    test_coordinate_conversion("39°48'35.6\"")
```

### 3. Problèmes de ressources système

#### Problème : Mémoire insuffisante
```
Message d'erreur : MemoryError: Unable to allocate array
```

**Script de surveillance de la mémoire :**
```python
#!/usr/bin/env python3
"""
Outil de surveillance de l'utilisation de la mémoire
"""
import psutil
import gc
import os
from functools import wraps

def monitor_memory(func):
    """Décorateur de surveillance de la mémoire"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Obtenir l'état initial de la mémoire
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"🔍 Mémoire avant exécution : {initial_memory:.2f} MB")
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Forcer le nettoyage de la mémoire
            gc.collect()
            
            # Obtenir l'état final de la mémoire
            final_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_delta = final_memory - initial_memory
            
            print(f"🔍 Mémoire après exécution : {final_memory:.2f} MB")
            print(f"🔍 Changement de mémoire : {memory_delta:+.2f} MB")
            
            # Avertissement de mémoire
            if final_memory > 1000:  # Plus de 1 Go
                print("⚠️  Utilisation élevée de la mémoire, optimisation recommandée")
    
    return wrapper

def check_system_memory():
    """Vérifie l'état de la mémoire système"""
    memory = psutil.virtual_memory()
    
    print("💾 État de la mémoire système :")
    print(f"  Mémoire totale : {memory.total / 1024**3:.2f} GB")
    print(f"  Mémoire disponible : {memory.available / 1024**3:.2f} GB")
    print(f"  Utilisation : {memory.percent:.1f}%")
    
    if memory.percent > 80:
        print("⚠️  Taux d'utilisation de la mémoire système trop élevé")
        return False
    return True

# Fonction de traitement de données optimisée pour la mémoire
@monitor_memory
def memory_efficient_csv_processing(file_path, chunk_size=1000):
    """Traitement CSV économe en mémoire"""
    import pandas as pd
    
    results = []
    
    # Lire les gros fichiers par blocs
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Traiter le bloc de données
        processed_chunk = process_data_chunk(chunk)
        results.append(processed_chunk)
        
        # Nettoyer la mémoire
        del chunk
        gc.collect()
    
    return pd.concat(results, ignore_index=True)

def process_data_chunk(chunk):
    """Traite un seul bloc de données"""
    # Logique de traitement des données réelle
    return chunk  # Exemple simplifié
```

**Solutions :**
```python
# Solution 1 : Traitement par blocs
def process_large_file_in_chunks(file_path, chunk_size=1000):
    import pandas as pd
    
    processed_data = []
    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Traiter un seul bloc
        processed_chunk = your_processing_function(chunk)
        processed_data.append(processed_chunk)
        
        # Libérer la mémoire
        del chunk
        gc.collect()
    
    return pd.concat(processed_data, ignore_index=True)

# Solution 2 : Utiliser un générateur
def data_generator(file_path):
    """Générateur de données, économise de la mémoire"""
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

# Solution 3 : Augmenter la mémoire virtuelle
# Linux/macOS:
# sudo fallocate -l 4G /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
```

#### Problème : Espace disque insuffisant
```
Message d'erreur : OSError: [Errno 28] No space left on device
```

**Script de vérification de l'espace disque :**
```python
#!/usr/bin/env python3
"""
Outil de surveillance de l'espace disque
"""
import shutil
import os
from pathlib import Path

def check_disk_space(path="."):
    """Vérifie l'espace disque"""
    total, used, free = shutil.disk_usage(path)
    
    print(f"💽 État de l'espace disque ({path}):")
    print(f"  Espace total : {total / 1024**3:.2f} GB")
    print(f"  Utilisé : {used / 1024**3:.2f} GB")
    print(f"  Espace disponible : {free / 1024**3:.2f} GB")
    print(f"  Utilisation : {used/total*100:.1f}%")
    
    # Avertissement d'espace insuffisant
    if free < 1024**3:  # Moins de 1 Go
        print("⚠️  Espace disque insuffisant !")
        return False
    
    return True

def cleanup_temp_files():
    """Nettoie les fichiers temporaires"""
    temp_patterns = [
        "*.tmp",
        "*.temp", 
        "*.cache",
        "*.log",
        "__pycache__",
        ".pytest_cache"
    ]
    
    current_dir = Path(".")
    total_cleaned = 0
    
    for pattern in temp_patterns:
        for file_path in current_dir.rglob(pattern):
            try:
                if file_path.is_file():
                    size = file_path.stat().st_size
                    file_path.unlink()
                    total_cleaned += size
                    print(f"Fichier supprimé : {file_path}")
                elif file_path.is_dir():
                    import shutil
                    size = sum(f.stat().st_size for f in file_path.rglob('*') if f.is_file())
                    shutil.rmtree(file_path)
                    total_cleaned += size
                    print(f"Répertoire supprimé : {file_path}")
            except Exception as e:
                print(f"Impossible de supprimer {file_path}: {e}")
    
    print(f"💾 Total nettoyé {total_cleaned / 1024**2:.2f} MB")

def estimate_output_size(input_file):
    """Estime la taille du fichier de sortie"""
    input_size = Path(input_file).stat().st_size
    
    # Estimation basée sur le type de traitement (estimation simplifiée ici)
    estimated_multiplier = {
        '.csv': 1.2,    # CSV vers DAT est généralement légèrement plus grand
        '.pdf': 0.1,    # L'extraction de texte PDF est généralement beaucoup plus petite
        '.dat': 1.0,    # La réparation du format DAT ne change pas la taille
    }
    
    suffix = Path(input_file).suffix.lower()
    multiplier = estimated_multiplier.get(suffix, 1.0)
    
    estimated_size = input_size * multiplier
    print(f"📊 Taille de sortie estimée : {estimated_size / 1024**2:.2f} MB")
    
    return estimated_size
```

### 4. Dépannage de l'optimisation des performances

#### Problème : Vitesse de traitement trop lente

**Outil d'analyse des performances :**
```python
#!/usr/bin/env python3
"""
Outil d'analyse des performances
"""
import time
import cProfile
import pstats
from functools import wraps

def profile_performance(func):
    """Décorateur d'analyse des performances"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Créer un profileur de performances
        pr = cProfile.Profile()
        
        # Commencer l'analyse
        pr.enable()
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Arrêter l'analyse
            end_time = time.time()
            pr.disable()
            
            # Afficher le rapport de performances
            print(f"⏱️  Temps d'exécution : {end_time - start_time:.2f} secondes")
            
            # Enregistrer le rapport détaillé
            stats = pstats.Stats(pr)
            stats.sort_stats('cumulative')
            
            print("\n🔍 Points chauds de performance (10 premières fonctions) :")
            stats.print_stats(10)
            
            # Enregistrer le rapport dans un fichier
            stats.dump_stats(f'performance_profile_{int(time.time())}.prof')
    
    return wrapper

# Exemple d'utilisation
@profile_performance
def slow_function():
    """Exemple de fonction lente"""
    import pandas as pd
    
    # Simuler une opération lente
    data = []
    for i in range(100000):
        data.append({'id': i, 'value': i**2})
    
    df = pd.DataFrame(data)
    return df.groupby('id').sum()

def benchmark_different_approaches():
    """Compare les performances de différentes approches d'implémentation"""
    import pandas as pd
    
    # Données de test
    test_data = list(range(10000))
    
    # Méthode 1 : Boucle normale
    start_time = time.time()
    result1 = []
    for i in test_data:
        result1.append(i * 2)
    time1 = time.time() - start_time
    
    # Méthode 2 : Compréhension de liste
    start_time = time.time()
    result2 = [i * 2 for i in test_data]
    time2 = time.time() - start_time
    
    # Méthode 3 : NumPy
    import numpy as np
    start_time = time.time()
    result3 = (np.array(test_data) * 2).tolist()
    time3 = time.time() - start_time
    
    print("🏃 Comparaison des performances :")
    print(f"  Boucle normale : {time1:.4f} secondes")
    print(f"  Compréhension de liste : {time2:.4f} secondes")
    print(f"  NumPy : {time3:.4f} secondes")
    
    # Trouver la méthode la plus rapide
    times = {'Boucle normale': time1, 'Compréhension de liste': time2, 'NumPy': time3}
    fastest = min(times, key=times.get)
    print(f"🏆 Méthode la plus rapide : {fastest}")
```

## 🔬 Outils de diagnostic avancés

### Script de diagnostic complet

Créer `diagnose_nav_data.py` :

```python
#!/usr/bin/env python3
"""
Outil de diagnostic complet Nav-data
"""
import sys
import os
import subprocess
import platform
from pathlib import Path
import importlib

class NavDataDiagnostic:
    """Classe d'outil de diagnostic Nav-data"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.info = []
    
    def log_issue(self, message):
        """Enregistrer un problème"""
        self.issues.append(message)
        print(f"❌ {message}")
    
    def log_warning(self, message):
        """Enregistrer un avertissement"""
        self.warnings.append(message)
        print(f"⚠️  {message}")
    
    def log_info(self, message):
        """Enregistrer une information"""
        self.info.append(message)
        print(f"ℹ️  {message}")
    
    def check_python_environment(self):
        """Vérifie l'environnement Python"""
        print("\n🐍 Vérification de l'environnement Python :")
        
        # Version de Python
        version = sys.version_info
        version_str = f"{version.major}.{version.minor}.{version.micro}"
        print(f"  Version de Python : {version_str}")
        
        if version.major < 3 or (version.major == 3 and version.minor < 6):
            self.log_issue(f"Version de Python trop ancienne ({version_str}), nécessite 3.6+")
        else:
            self.log_info(f"La version de Python est conforme ({version_str})")
        
        # Environnement virtuel
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            self.log_info("Environnement virtuel en cours d'utilisation")
        else:
            self.log_warning("Environnement virtuel non utilisé, son utilisation est recommandée")
        
        # Chemin Python
        print(f"  Chemin Python : {sys.executable}")
        print(f"  Chemins de recherche de packages : {len(sys.path)} chemins")
    
    def check_dependencies(self):
        """Vérifie les packages de dépendances"""
        print("\n📦 Vérification des packages de dépendances :")
        
        required_packages = {
            'pandas': '1.3.0',
            'numpy': '1.21.0',
            'pdfplumber': '0.7.0',
            'tqdm': '4.60.0',
            'colorama': '0.4.4',
            'geopy': '2.2.0'
        }
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                version = getattr(module, '__version__', 'Inconnu')
                print(f"  ✅ {package}: {version}")
                
                # TODO: Logique de comparaison des versions
                
            except ImportError:
                self.log_issue(f"Package de dépendance manquant : {package}")
    
    def check_system_resources(self):
        """Vérifie les ressources système"""
        print("\n💻 Vérification des ressources système :")
        
        # Système d'exploitation
        system_info = platform.system()
        print(f"  Système d'exploitation : {system_info} {platform.release()}")
        
        # Vérification de la mémoire
        try:
            import psutil
            memory = psutil.virtual_memory()
            print(f"  Mémoire totale : {memory.total / 1024**3:.2f} GB")
            print(f"  Mémoire disponible : {memory.available / 1024**3:.2f} GB")
            
            if memory.available < 2 * 1024**3:  # Moins de 2 Go
                self.log_warning("Peu de mémoire disponible, peut affecter le traitement des gros fichiers")
        except ImportError:
            self.log_warning("Impossible de vérifier l'état de la mémoire (psutil manquant)")
        
        # Espace disque
        try:
            import shutil
            total, used, free = shutil.disk_usage('.')
            print(f"  Espace disque : {free / 1024**3:.2f} GB disponible")
            
            if free < 1024**3:  # Moins de 1 Go
                self.log_warning("Espace disque insuffisant")
        except Exception as e:
            self.log_warning(f"Impossible de vérifier l'espace disque : {e}")
    
    def check_project_structure(self):
        """Vérifie la structure du projet"""
        print("\n📁 Vérification de la structure du projet :")
        
        required_dirs = [
            'Airway',
            'PDF extract', 
            'Terminal Patch',
            'X-Plane CIFP'
        ]
        
        for dirname in required_dirs:
            if Path(dirname).exists():
                print(f"  ✅ {dirname}/")
            else:
                self.log_issue(f"Répertoire manquant : {dirname}/")
        
        # Vérifier les fichiers clés
        key_files = [
            'Airway/airway.py',
            'PDF extract/utils.py',
            'Terminal Patch/terminal_encoder.py',
        ]
        
        for filepath in key_files:
            if Path(filepath).exists():
                print(f"  ✅ {filepath}")
            else:
                self.log_issue(f"Fichier manquant : {filepath}")
    
    def check_common_issues(self):
        """Vérifie les problèmes courants"""
        print("\n🔍 Vérification des problèmes courants :")
        
        # Vérifier l'encodage des fichiers
        csv_files = list(Path('.').glob('**/*.csv'))
        if csv_files:
            print(f"  Détecté {len(csv_files)} fichiers CSV")
            # TODO: Vérification de l'encodage
        
        # Vérifier les fichiers de log
        log_files = list(Path('.').glob('**/*.log'))
        if log_files:
            print(f"  Détecté {len(log_files)} fichiers de log")
            
            # Vérifier les erreurs récentes
            for log_file in log_files[-3:]:  # Vérifier les 3 derniers logs
                try:
                    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        error_lines = [line for line in lines[-50:] if 'ERROR' in line.upper()]
                        if error_lines:
                            print(f"    ⚠️  {log_file} : {len(error_lines)} erreurs trouvées")
                except Exception as e:
                    print(f"    Impossible de lire {log_file} : {e}")
    
    def generate_report(self):
        """Génère un rapport de diagnostic"""
        print("\n" + "="*50)
        print("📋 Résumé du rapport de diagnostic")
        print("="*50)
        
        print(f"Problèmes graves : {len(self.issues)}")
        for issue in self.issues:
            print(f"  ❌ {issue}")
        
        print(f"\nAvertissements : {len(self.warnings)}")
        for warning in self.warnings:
            print(f"  ⚠️  {warning}")
        
        print(f"\nInformations : {len(self.info)}")
        for info in self.info:
            print(f"  ℹ️  {info}")
        
        # État général
        if not self.issues:
            if not self.warnings:
                print("\n🎉 Le système est en bon état !")
            else:
                print("\n✅ Le système est globalement normal, il est recommandé de prêter attention aux avertissements")
        else:
            print("\n🚨 Des problèmes graves ont été détectés, nécessitent une réparation pour une utilisation normale")
        
        # Enregistrer le rapport
        report_file = f"diagnostic_report_{int(time.time())}.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("Rapport de diagnostic Nav-data\n")
            f.write("="*50 + "\n\n")
            
            f.write("Problèmes graves :\n")
            for issue in self.issues:
                f.write(f"- {issue}\n")
            
            f.write("\nAvertissements :\n")
            for warning in self.warnings:
                f.write(f"- {warning}\n")
            
            f.write("\nInformations :\n")
            for info in self.info:
                f.write(f"- {info}\n")
        
        print(f"\n📄 Rapport détaillé enregistré dans : {report_file}")
    
    def run_full_diagnostic(self):
        """Exécute un diagnostic complet"""
        print("🔬 Diagnostic du système Nav-data")
        print("="*50)
        
        self.check_python_environment()
        self.check_dependencies()
        self.check_system_resources()
        self.check_project_structure()
        self.check_common_issues()
        self.generate_report()

def main():
    """Fonction principale"""
    diagnostic = NavDataDiagnostic()
    
    try:
        diagnostic.run_full_diagnostic()
    except KeyboardInterrupt:
        print("\n\nDiagnostic interrompu par l'utilisateur")
    except Exception as e:
        print(f"\n\nException lors du diagnostic : {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import time
    main()
```

### Utilisation de l'outil de diagnostic

```bash
# Exécuter le diagnostic complet
python diagnose_nav_data.py

# Afficher le rapport de diagnostic
cat diagnostic_report_*.txt

# Agir en fonction des résultats du diagnostic
# Si des problèmes graves sont présents, réparer selon les recommandations du rapport
# Si seulement des avertissements sont présents, l'utilisation peut continuer mais une optimisation est recommandée
```

## 📞 Obtenir de l'aide

### Lors du signalement d'un problème, veuillez fournir :

1. **Le message d'erreur complet**
2. **Les informations sur l'environnement système** (obtenues en exécutant l'outil de diagnostic)
3. **Les étapes de reproduction**
4. **Un échantillon des données d'entrée** (si partageable)
5. **Les résultats attendus vs les résultats réels**

### Canaux de contact :
- [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- [Documentation FAQ](./faq.md)
- [Discussions communautaires](https://github.com/your-repo/nav-data/discussions)

---

**N'oubliez pas : la plupart des problèmes ont une solution !** 🛠️ 

Grâce à un diagnostic et un dépannage systématiques, vous pouvez résoudre rapidement les problèmes rencontrés lors de l'utilisation de Nav-data. Si le problème persiste, n'hésitez pas à demander de l'aide à la communauté.
# 🔧 Guide d'installation du convertisseur de données de navigation TFDI

Ce guide détaille comment installer et configurer le convertisseur de données de navigation TFDI, afin de garantir que votre environnement système puisse exécuter le convertisseur sans problème.

## 📋 Configuration requise

### 💻 Configuration matérielle requise
| Composant | Minimum requis | Configuration recommandée |
|------|----------|----------|
| **Processeur** | Double cœur 2.0GHz | Quad-cœur 3.0GHz+ |
| **Mémoire vive (RAM)** | 4GB RAM | 8GB+ RAM |
| **Stockage** | 1GB d'espace disponible | 5GB+ d'espace disponible |
| **Réseau** | Uniquement requis pour le téléchargement | Connexion réseau stable |

### 🖥️ Systèmes d'exploitation pris en charge
- **Windows**: Windows 10 (2004+) / Windows 11
- **macOS**: macOS 10.15 Catalina ou version ultérieure
- **Linux**: Ubuntu 18.04+, CentOS 8+, ou d'autres distributions majeures

### 🐍 Configuration requise pour l'environnement Python
- **Version de Python**: 3.8.0 ou version ultérieure
- **Versions recommandées**: Python 3.9.x ou 3.10.x
- **Gestionnaire de paquets**: pip 21.0+ (généralement installé avec Python)

## 🚀 Installation rapide

### Utilisateurs Windows

#### 1️⃣ Installer Python

**Méthode 1 : Microsoft Store (Recommandée)**
```bash
# 1. Ouvrir le Microsoft Store
# 2. Rechercher "Python 3.10"
# 3. Cliquer sur installer Python 3.10
# 4. Vérifier l'installation
python --version
pip --version
```

**Méthode 2 : Téléchargement depuis le site officiel**
```bash
# 1. Accéder à https://www.python.org/downloads/windows/
# 2. Télécharger Python 3.10.x (64-bit)
# 3. Exécuter l'installateur
#    ✅ Cocher "Add Python to PATH"
#    ✅ Cocher "Install pip"
# 4. Vérifier l'installation
python --version
```

#### 2️⃣ Installer les dépendances du convertisseur

```bash
# Ouvrir l'invite de commande ou PowerShell
# Mettre à jour pip
python -m pip install --upgrade pip

# Installer les dépendances requises
pip install rich pandas py7zr

# Vérifier l'installation
python -c "import rich, pandas, py7zr; print('✅ Toutes les dépendances sont installées avec succès !')"
```

#### 3️⃣ Télécharger le convertisseur

```bash
# Méthode 1 : Télécharger le paquet de publication
# Accéder à la page GitHub Releases pour télécharger la dernière version

# Méthode 2 : Cloner le code source (nécessite Git)
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Vérifier le convertisseur
python Fenix2TFDINavDataConverter.py --help
```

### Utilisateurs macOS

#### 1️⃣ Installer Python

**Méthode 1 : Homebrew (Recommandée)**
```bash
# Installer Homebrew (si ce n'est pas déjà fait)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Python
brew install python@3.10

# Vérifier l'installation
python3 --version
pip3 --version

# Créer des liens symboliques (facultatif)
ln -sf $(which python3) /usr/local/bin/python
ln -sf $(which pip3) /usr/local/bin/pip
```

**Méthode 2 : Téléchargement depuis le site officiel**
```bash
# 1. Accéder à https://www.python.org/downloads/macos/
# 2. Télécharger Python 3.10.x pour macOS
# 3. Installer le fichier .pkg
# 4. Vérifier l'installation
python3 --version
```

#### 2️⃣ Installer les dépendances du convertisseur

```bash
# Mettre à jour pip
python3 -m pip install --upgrade pip

# Installer les dépendances
pip3 install rich pandas py7zr

# Vérifier l'installation
python3 -c "import rich, pandas, py7zr; print('✅ Dépendances installées !')"
```

#### 3️⃣ Télécharger et configurer le convertisseur

```bash
# Télécharger le convertisseur
curl -L -o tfdi-converter.zip https://github.com/your-org/tfdi-converter/archive/main.zip
unzip tfdi-converter.zip
cd tfdi-converter-main

# Ou utiliser Git
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Vérifier l'installation
python3 Fenix2TFDINavDataConverter.py --version
```

### Utilisateurs Linux

#### 1️⃣ Installer Python

**Ubuntu/Debian:**
```bash
# Mettre à jour la liste des paquets
sudo apt update

# Installer Python 3.10 et les outils associés
sudo apt install python3.10 python3.10-pip python3.10-venv python3.10-dev

# Installer build-essential (certains paquets nécessitent une compilation)
sudo apt install build-essential

# Créer des liens symboliques
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3.10 1

# Vérifier l'installation
python --version
pip --version
```

**CentOS/RHEL 8+:**
```bash
# Activer le dépôt PowerTools
sudo dnf config-manager --set-enabled powertools

# Installer Python 3.10
sudo dnf install python3.10 python3.10-pip python3.10-devel

# Installer les outils de développement
sudo dnf groupinstall "Development Tools"

# Vérifier l'installation
python3.10 --version
pip3.10 --version
```

**Arch Linux:**
```bash
# Installer Python
sudo pacman -S python python-pip

# Installer les outils de développement
sudo pacman -S base-devel

# Vérifier l'installation
python --version
pip --version
```

#### 2️⃣ Installer les dépendances du convertisseur

```bash
# Mettre à jour pip
python -m pip install --upgrade pip

# Installer les dépendances
pip install rich pandas py7zr

# En cas de problème de permission, installer pour l'utilisateur
pip install --user rich pandas py7zr

# Vérifier l'installation
python -c "import rich, pandas, py7zr; print('✅ Dépendances installées avec succès !')"
```

#### 3️⃣ Télécharger le convertisseur

```bash
# Télécharger avec wget
wget https://github.com/your-org/tfdi-converter/archive/main.zip
unzip main.zip
cd tfdi-converter-main

# Ou utiliser git
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Définir les permissions d'exécution
chmod +x Fenix2TFDINavDataConverter.py

# Vérifier l'installation
python Fenix2TFDINavDataConverter.py --version
```

## 📦 Détails des dépendances

### Paquets de dépendances clés

| Nom du paquet | Version requise | Utilisation | Commande d'installation |
|------|----------|------|----------|
| **rich** | ≥ 12.0.0 | Interface CLI moderne | `pip install rich` |
| **pandas** | ≥ 1.3.0 | Traitement et analyse de données | `pip install pandas` |
| **py7zr** | ≥ 0.18.0 | Traitement des fichiers compressés 7z | `pip install py7zr` |

### Dépendances de la bibliothèque standard (aucune installation supplémentaire requise)

| Module | Utilisation |
|------|------|
| **sqlite3** | Accès à la base de données SQLite |
| **json** | Sérialisation des données JSON |
| **pathlib** | Gestion des chemins de fichiers |
| **logging** | Journalisation |
| **dataclasses** | Support des classes de données |
| **concurrent.futures** | Traitement concurrentiel |

### Dépendances optionnelles

```bash
# Dépendances de développement (pour les développeurs uniquement)
pip install pytest flake8 mypy black pre-commit

# Dépendances de surveillance des performances
pip install psutil

# Amélioration de la barre de progression
pip install tqdm
```

## 🔍 Vérification de l'installation

### Script de vérification complet

Créer le script de vérification `verify_tfdi_installation.py` :

```python
#!/usr/bin/env python3
"""
Script de vérification de l'installation du convertisseur de données de navigation TFDI
Vérifie l'environnement système, les paquets de dépendances et la fonctionnalité du convertisseur
"""

import sys
import importlib
import platform
from pathlib import Path

def check_python_version():
    """Vérifie la version de Python"""
    version = sys.version_info
    print(f"🐍 Version de Python: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ La version de Python est conforme aux exigences (>= 3.8)")
        return True
    else:
        print("❌ Version de Python trop ancienne, nécessite 3.8 ou une version ultérieure")
        print("   Veuillez mettre à jour Python et réessayer")
        return False

def check_dependencies():
    """Vérifie les paquets de dépendances requis"""
    required_packages = {
        'rich': 'Interface CLI moderne',
        'pandas': 'Bibliothèque de traitement de données',
        'py7zr': 'Gestion de la compression 7z'
    }
    
    print("\n📦 Vérification des dépendances :")
    all_ok = True
    
    for package, description in required_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"❌ {package:<10} Non installé        ({description})")
            all_ok = False
        except Exception as e:
            print(f"⚠️ {package:<10} Erreur: {e}")
            all_ok = False
    
    return all_ok

def check_optional_dependencies():
    """Vérifie les dépendances optionnelles"""
    optional_packages = {
        'psutil': 'Surveillance système',
        'tqdm': 'Amélioration de la barre de progression'
    }
    
    print("\n🔧 Vérification des dépendances optionnelles :")
    for package, description in optional_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"⚪ {package:<10} Non installé        ({description}) - Facultatif")

def check_system_resources():
    """Vérifie les ressources système"""
    print("\n💾 Vérification des ressources système :")
    
    try:
        import psutil
        
        # Vérifier la mémoire
        memory = psutil.virtual_memory()
        memory_gb = memory.total // (1024**3)
        print(f"💿 Mémoire totale: {memory_gb} GB")
        
        if memory_gb >= 4:
            print("✅ Mémoire suffisante (>= 4GB)")
        else:
            print("⚠️ Mémoire potentiellement insuffisante, 4 Go+ recommandés")
        
        # Vérifier l'espace disque
        disk = psutil.disk_usage('.')
        free_gb = disk.free // (1024**3)
        print(f"💿 Espace disque disponible: {free_gb} GB")
        
        if free_gb >= 1:
            print("✅ Espace disque suffisant (>= 1GB)")
        else:
            print("⚠️ Espace disque insuffisant, au moins 1 Go requis")
            
    except ImportError:
        print("⚪ Impossible de vérifier les ressources système (psutil non installé)")

def check_converter_accessibility():
    """Vérifie l'accessibilité des fichiers du convertisseur"""
    print("\n🔧 Vérification des fichiers du convertisseur :")
    
    converter_files = [
        'Fenix2TFDINavDataConverter.py',
        'README.md'
    ]
    
    for file_name in converter_files:
        file_path = Path(file_name)
        if file_path.exists():
            size_kb = file_path.stat().st_size // 1024
            print(f"✅ {file_name:<35} ({size_kb} KB)")
        else:
            print(f"⚠️ {file_name:<35} Fichier non trouvé")

def test_basic_functionality():
    """Teste les fonctionnalités de base"""
    print("\n🧪 Test des fonctionnalités de base :")
    
    try:
        # Tester l'interface Rich
        from rich.console import Console
        console = Console()
        console.print("✅ Test de l'interface Rich", style="green")
        
        # Tester le traitement de données Pandas
        import pandas as pd
        df = pd.DataFrame({'test': [1, 2, 3]})
        assert len(df) == 3
        print("✅ Test de traitement de données Pandas réussi")
        
        # Tester la fonctionnalité de compression py7zr
        import py7zr
        print("✅ Fonctionnalité de compression py7zr disponible")
        
        # Tester la connexion SQLite
        import sqlite3
        conn = sqlite3.connect(':memory:')
        conn.close()
        print("✅ Test de connexion à la base de données SQLite réussi")
        
        return True
        
    except Exception as e:
        print(f"❌ Échec du test des fonctionnalités: {e}")
        return False

def main():
    """Fonction de vérification principale"""
    print("🔍 Vérification de l'installation du convertisseur de données de navigation TFDI")
    print("=" * 60)
    
    # Liste des vérifications
    checks = [
        ("Version Python", check_python_version),
        ("Dépendances requises", check_dependencies),
        ("Dépendances optionnelles", check_optional_dependencies),
        ("Ressources système", check_system_resources),
        ("Fichiers du convertisseur", check_converter_accessibility),
        ("Fonctionnalités de base", test_basic_functionality),
    ]
    
    all_passed = True
    critical_passed = True
    
    for name, check_func in checks:
        try:
            result = check_func()
            if name in ["Version Python", "Dépendances requises", "Fonctionnalités de base"]:
                if not result:
                    critical_passed = False
                    all_passed = False
            elif result is False:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} vérification échouée: {e}")
            if name in ["Version Python", "Dépendances requises"]:
                critical_passed = False
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if critical_passed:
        if all_passed:
            print("🎉 Toutes les vérifications sont passées ! Le convertisseur peut être utilisé normalement.")
            print("\n📝 Prochaine étape :")
            print("   1. Préparer le fichier de base de données de navigation Fenix (nd.db3)")
            print("   2. Exécuter le convertisseur : python Fenix2TFDINavDataConverter.py")
            return 0
        else:
            print("✅ Les fonctionnalités de base sont disponibles, mais certaines fonctionnalités optionnelles peuvent être limitées.")
            print("   Le convertisseur peut être utilisé normalement, il est recommandé d'installer les dépendances optionnelles manquantes.")
            return 0
    else:
        print("❌ Les vérifications critiques ont échoué. Veuillez résoudre les problèmes ci-dessus et réessayer.")
        print("\n🔧 Solutions courantes :")
        print("   • Mettre à jour la version de Python : https://python.org/downloads")
        print("   • Installer les dépendances : pip install rich pandas py7zr")
        print("   • Vérifier la connexion réseau et les paramètres de permission")
        return 1

if __name__ == "__main__":
    exit(main())
```

Exécuter le script de vérification :
```bash
python verify_tfdi_installation.py
```

### Commandes de vérification rapide

```bash
# 1. Vérifier la version de Python
python --version

# 2. Vérifier la version de pip  
pip --version

# 3. Vérifier les dépendances clés
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import py7zr; print(f'py7zr: {py7zr.__version__}')"

# 4. Tester l'interface Rich
python -c "from rich.console import Console; Console().print('🎉 Test Rich réussi !', style='bold green')"

# 5. Tester le démarrage du convertisseur
python Fenix2TFDINavDataConverter.py --version
```

## 🔧 Problèmes d'installation courants

### Problème 1 : Version de Python trop ancienne

**Symptôme :**
```
SyntaxError: invalid syntax (utilisation de nouvelles fonctionnalités syntaxiques)
TypeError: 'type' object is not subscriptable
```

**Solution :**
```bash
# Vérifier la version actuelle
python --version

# Si la version est < 3.8, une mise à jour est nécessaire
# Windows: Télécharger une nouvelle version depuis python.org
# macOS: brew upgrade python  
# Linux: Se référer au guide d'installation ci-dessus pour la mise à jour
```

### Problème 2 : Échec de l'installation de pip

**Symptôme :**
```
ERROR: Could not find a version that satisfies the requirement
WARNING: Retrying... Connection broken
```

**Solution :**
```bash
# Mettre à jour pip
python -m pip install --upgrade pip

# Utiliser une source miroir
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas py7zr

# Vider le cache et réessayer
pip cache purge
pip install rich pandas py7zr

# Vérifier la connexion réseau
ping pypi.org
```

### Problème 3 : Erreur de permission

**Symptôme :**
```
PermissionError: [Errno 13] Permission denied
Could not install packages due to an PermissionError
```

**Solution :**
```bash
# Windows: Exécuter en tant qu'administrateur
# Clic droit sur l'invite de commande → "Exécuter en tant qu'administrateur"

# macOS/Linux: Installer pour l'utilisateur
pip install --user rich pandas py7zr

# Ou utiliser sudo (non recommandé)
sudo pip install rich pandas py7zr
```

### Problème 4 : Erreur de compilation

**Symptôme :**
```
error: Microsoft Visual C++ 14.0 is required
error: building wheel for package failed
```

**Solution :**

**Windows :**
```bash
# Installer les outils de build Microsoft C++
# Accéder à : https://visualstudio.microsoft.com/visual-cpp-build-tools/
# Télécharger et installer "Build Tools for Visual Studio"

# Ou utiliser des paquets précompilés
pip install --only-binary=all rich pandas py7zr
```

**Linux :**
```bash
# Ubuntu/Debian
sudo apt install build-essential python3-dev

# CentOS/RHEL
sudo dnf groupinstall "Development Tools"
sudo dnf install python3-devel
```

### Problème 5 : Conflit de dépendances

**Symptôme :**
```
ERROR: pip's dependency resolver does not currently support multiple versions
```

**Solution :**
```bash
# Créer un environnement virtuel
python -m venv tfdi_env

# Activer l'environnement virtuel
# Windows:
tfdi_env\Scripts\activate
# macOS/Linux:
source tfdi_env/bin/activate

# Installer dans l'environnement virtuel
pip install rich pandas py7zr

# Vérifier l'installation
python -c "import rich, pandas, py7zr; print('Installation réussie !')"
```

## 🎯 Prochaines étapes après l'installation

### 1. Configuration de l'environnement

#### Variables d'environnement Windows (Facultatif)
```batch
# Ajouter le répertoire Python Scripts au PATH
set PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\Python\Python310\Scripts

# Définir le répertoire du convertisseur
set TFDI_CONVERTER_HOME=C:\Users\%USERNAME%\tfdi-converter
```

#### Variables d'environnement macOS/Linux (Facultatif)
```bash
# Ajouter à ~/.bashrc ou ~/.zshrc
export TFDI_CONVERTER_HOME="$HOME/tfdi-converter"
export PATH="$PATH:$TFDI_CONVERTER_HOME"

# Recharger la configuration
source ~/.bashrc  # ou source ~/.zshrc
```

### 2. Préparer les fichiers de données

```bash
# Vérifier l'emplacement de la base de données Fenix
# Chemin courant sous Windows :
dir "%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320" /s | findstr nd.db3

# macOS/Linux:
find ~ -name "nd.db3" 2>/dev/null
```

### 3. Créer un répertoire de travail

```bash
# Créer un répertoire de travail dédié
mkdir ~/tfdi-conversion-workspace
cd ~/tfdi-conversion-workspace

# Créer des sous-répertoires
mkdir input output logs backups

# Copier le convertisseur dans le répertoire de travail (facultatif)
cp /path/to/Fenix2TFDINavDataConverter.py .
```

### 4. Premier test d'exécution

```bash
# Exécuter l'aide du convertisseur
python Fenix2TFDINavDataConverter.py --help

# Exécuter le test de base (si des données de test sont disponibles)
python Fenix2TFDINavDataConverter.py --test

# Afficher les informations de version
python Fenix2TFDINavDataConverter.py --version
```

## 📚 Prochaines étapes

Une fois l'installation terminée, veuillez lire :

1.  **[Instructions de configuration](configuration.md)** - Comprendre les options de configuration du convertisseur
2.  **[Instructions d'utilisation](usage.md)** - Commencer votre première conversion de données
3.  **[Dépannage](../troubleshooting.md)** - À consulter en cas de problème

### Liste de vérification rapide

- [ ] ✅ Python 3.8+ installé
- [ ] ✅ Dépendances requises installées (rich, pandas, py7zr)
- [ ] ✅ Fichiers du convertisseur téléchargés
- [ ] ✅ Vérification de l'installation réussie
- [ ] ✅ Fichier de base de données Fenix préparé
- [ ] ✅ TFDI MD-11 installé dans MSFS

---

**Installation terminée !** 🎉 

Vous pouvez maintenant commencer à utiliser le convertisseur de données de navigation TFDI. Si vous rencontrez des problèmes, veuillez consulter le [guide de dépannage](../troubleshooting.md) ou demander de l'aide sur GitHub Issues. 🚁✨
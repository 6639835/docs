# 🔧 Guide d'installation du convertisseur de données de navigation iFly

Ce guide vous accompagnera tout au long du processus d'installation du convertisseur de données de navigation iFly, en veillant à ce que votre environnement système soit correctement configuré et que toutes les dépendances soient installées.

## 📋 Configuration système requise

### 💻 Exigences matérielles
| Composant | Configuration minimale requise | Configuration recommandée |
|------|----------|----------|
| **Processeur** | Double cœur 2.0GHz | Quadri-cœur 3.0GHz+ |
| **RAM** | 4GB RAM | 8GB+ RAM |
| **Stockage** | 500MB d'espace disponible | 2GB+ d'espace disponible |
| **Réseau** | Aucune connexion réseau requise | Nécessaire pour télécharger les dépendances |

### 🖥️ Systèmes d'exploitation pris en charge
- **Windows**: Windows 10 (1909+) / Windows 11
- **macOS**: macOS 10.15 Catalina ou version ultérieure
- **Linux**: Ubuntu 18.04+, CentOS 7+, ou autres distributions majeures

### 🐍 Exigences relatives à l'environnement Python
- **Version de Python**: 3.8.0 ou version ultérieure
- **Version recommandée**: Python 3.9.x ou 3.10.x
- **Gestionnaire de paquets**: pip 21.0+ (généralement installé avec Python)

## 🚀 Installation rapide

### Utilisateurs Windows

#### 1️⃣ Installer Python

**Méthode 1 : Télécharger depuis le site officiel (recommandé)**
```bash
# 1. Visitez https://www.python.org/downloads/
# 2. Téléchargez la dernière version de Python 3.9+
# 3. Exécutez le programme d'installation, assurez-vous de cocher "Add Python to PATH"
# 4. Vérifiez l'installation
python --version
pip --version
```

**Méthode 2 : Utiliser le Microsoft Store**
```bash
# 1. Ouvrez le Microsoft Store
# 2. Recherchez "Python 3.9" ou "Python 3.10"
# 3. Cliquez sur Installer
# 4. Vérifiez l'installation
python --version
```

#### 2️⃣ Installer les dépendances du convertisseur

```bash
# Ouvrez l'invite de commande ou PowerShell
# Installez toutes les dépendances requises
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# Vérifiez l'installation
python -c "import rich, pandas, pygeomag; print('Dépendances installées avec succès !')"
```

### Utilisateurs macOS

#### 1️⃣ Installer Python

**Méthode 1 : Utiliser Homebrew (recommandé)**
```bash
# Installez Homebrew (s'il n'est pas déjà installé)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installez Python
brew install python@3.9

# Vérifiez l'installation
python3 --version
pip3 --version
```

**Méthode 2 : Télécharger depuis le site officiel**
```bash
# 1. Visitez https://www.python.org/downloads/macos/
# 2. Téléchargez le paquet d'installation de Python pour macOS
# 3. Exécutez le fichier .pkg pour l'installation
# 4. Vérifiez l'installation
python3 --version
```

#### 2️⃣ Installer les dépendances du convertisseur

```bash
# Utilisez pip3 pour installer les dépendances
pip3 install rich pathlib typing pygeomag pandas tqdm geographiclib

# Vérifiez l'installation
python3 -c "import rich, pandas, pygeomag; print('Dépendances installées avec succès !')"
```

### Utilisateurs Linux

#### 1️⃣ Installer Python

**Ubuntu/Debian:**
```bash
# Mettre à jour la liste des paquets
sudo apt update

# Installer Python 3.9 et pip
sudo apt install python3.9 python3.9-pip python3.9-dev

# Créer des liens symboliques (facultatif)
sudo ln -sf /usr/bin/python3.9 /usr/bin/python
sudo ln -sf /usr/bin/pip3.9 /usr/bin/pip

# Vérifier l'installation
python --version
pip --version
```

**CentOS/RHEL:**
```bash
# Installer le dépôt EPEL
sudo yum install epel-release

# Installer Python 3.9
sudo yum install python39 python39-pip

# Vérifier l'installation
python3.9 --version
pip3.9 --version
```

**Arch Linux:**
```bash
# Installer Python et pip
sudo pacman -S python python-pip

# Vérifier l'installation
python --version
pip --version
```

#### 2️⃣ Installer les dépendances du convertisseur

```bash
# Installer les paquets de dépendances
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# Si vous rencontrez des problèmes de permissions, utilisez l'installation utilisateur
pip install --user rich pathlib typing pygeomag pandas tqdm geographiclib

# Vérifier l'installation
python -c "import rich, pandas, pygeomag; print('Dépendances installées avec succès !')"
```

## 📦 Description détaillée des dépendances

### Paquets de dépendances principaux

| Nom du paquet | Version requise | Utilisation | Licence |
|------|----------|------|--------|
| **rich** | ≥ 12.0.0 | Interface CLI modernisée | MIT |
| **pandas** | ≥ 1.3.0 | Traitement et analyse de données | BSD-3 |
| **pygeomag** | ≥ 0.4.2 | Calcul de la déclinaison magnétique | MIT |
| **tqdm** | ≥ 4.60.0 | Affichage des barres de progression | MPL-2.0 |
| **geographiclib** | ≥ 1.52 | Calcul de coordonnées géographiques | MIT |

### Dépendances de la bibliothèque standard (aucune installation requise)

| Module | Utilisation |
|------|------|
| **pathlib** | Traitement des chemins de fichiers |
| **typing** | Prise en charge des annotations de type |
| **sqlite3** | Accès à la base de données SQLite |
| **csv** | Traitement des fichiers CSV |
| **datetime** | Traitement des dates et heures |
| **logging** | Enregistrement des journaux |

## 🔍 Vérification de l'installation

### Script de vérification complet

Créez un script de vérification `verify_installation.py` :

```python
#!/usr/bin/env python3
"""
Script de vérification d'installation du convertisseur de données de navigation iFly
"""

import sys
import importlib
from pathlib import Path

def check_python_version():
    """Vérifie la version de Python"""
    version = sys.version_info
    print(f"🐍 Version de Python: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ La version de Python est conforme aux exigences")
        return True
    else:
        print("❌ La version de Python est trop ancienne, nécessite 3.8 ou une version ultérieure")
        return False

def check_dependencies():
    """Vérifie les paquets de dépendances"""
    dependencies = [
        'rich',
        'pandas', 
        'pygeomag',
        'tqdm',
        'geographiclib'
    ]
    
    all_ok = True
    print("\n📦 Vérification des paquets de dépendances:")
    
    for dep in dependencies:
        try:
            module = importlib.import_module(dep)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {dep}: {version}")
        except ImportError:
            print(f"❌ {dep}: Non installé")
            all_ok = False
    
    return all_ok

def check_system_resources():
    """Vérifie les ressources système"""
    import shutil
    
    print("\n💾 Vérification des ressources système:")
    
    # Vérifier l'espace disque
    total, used, free = shutil.disk_usage(Path.home())
    free_gb = free // (1024**3)
    print(f"📁 Espace disque disponible: {free_gb} Go")
    
    if free_gb >= 1:
        print("✅ Espace disque suffisant")
        disk_ok = True
    else:
        print("⚠️ Espace disque insuffisant, au moins 1 Go est recommandé")
        disk_ok = False
    
    return disk_ok

def main():
    """Fonction principale de vérification"""
    print("🔍 Vérification de l'installation du convertisseur de données de navigation iFly")
    print("=" * 50)
    
    # Éléments à vérifier
    checks = [
        ("Version de Python", check_python_version),
        ("Paquets de dépendances", check_dependencies),
        ("Ressources système", check_system_resources),
    ]
    
    all_passed = True
    for name, check_func in checks:
        try:
            result = check_func()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ Échec de la vérification {name}: {e}")
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 Toutes les vérifications ont réussi ! Vous pouvez commencer à utiliser le convertisseur.")
        return 0
    else:
        print("⚠️ Certaines vérifications ont échoué, veuillez résoudre les problèmes selon les indications ci-dessus.")
        return 1

if __name__ == "__main__":
    exit(main())
```

Exécutez le script de vérification :
```bash
python verify_installation.py
```

### Étapes de vérification manuelle

```bash
# 1. Vérifiez la version de Python
python --version

# 2. Vérifiez la version de pip
pip --version

# 3. Vérifiez les dépendances principales
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import pygeomag; print('PyGeoMag: OK')"

# 4. Testez l'interface Rich
python -c "from rich.console import Console; Console().print('Hello, World!', style='bold green')"

# 5. Testez le calcul de la déclinaison magnétique
python -c "from pygeomag import GeoMag; gm = GeoMag(); print(f'Calcul de déclinaison magnétique OK: {gm.GeoMag(39.9, 116.4, 0, 2024)}')"
```

## 🔧 Problèmes d'installation courants

### Problème 1: Version de Python trop ancienne

**Symptômes:**
```
SyntaxError: invalid syntax
```

**Solution:**
```bash
# Vérifiez la version actuelle
python --version

# Si la version est < 3.8, veuillez mettre à niveau
# Windows: Téléchargez une nouvelle version depuis python.org
# macOS: brew upgrade python
# Linux: Référez-vous au guide d'installation ci-dessus
```

### Problème 2: Échec de l'installation de pip

**Symptômes:**
```
ERROR: Could not find a version that satisfies the requirement
```

**Solution:**
```bash
# Mettez à niveau pip
python -m pip install --upgrade pip

# Utilisez un miroir national (chinois)
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Effacez le cache et réessayez
pip cache purge
pip install rich pandas pygeomag tqdm geographiclib
```

### Problème 3: Erreur de permission

**Symptômes:**
```
PermissionError: [Errno 13] Permission denied
```

**Solution:**
```bash
# Windows: Exécutez l'invite de commande en tant qu'administrateur
# macOS/Linux: Utilisez l'installation utilisateur
pip install --user rich pandas pygeomag tqdm geographiclib

# Ou utilisez sudo (non recommandé)
sudo pip install rich pandas pygeomag tqdm geographiclib
```

### Problème 4: Problème de connexion réseau

**Symptômes:**
```
WARNING: Retrying... Connection broken
```

**Solution:**
```bash
# Utilisez un miroir national (chinois)
pip install -i https://mirrors.aliyun.com/pypi/simple/ rich pandas pygeomag tqdm geographiclib

# Ou le miroir Tsinghua
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Configurez un miroir permanent
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 🎯 Prochaines étapes de l'installation

### 1. Préparer les fichiers nécessaires
- **Base de données Fenix**: Obtenez le fichier `nd.db3`
- **Données NAIP**: Téléchargez les données de route `RTE_SEG.csv`
- **Installation iFly**: Confirmez que iFly 737 MAX 8 est installé

### 2. Créer un répertoire de travail
```bash
# Créez un répertoire dédié
mkdir ~/ifly-converter
cd ~/ifly-converter

# Téléchargez le script du convertisseur
# (Obtenez main.py depuis le dépôt du projet)
```

### 3. Effectuer un premier test
```bash
# Exécutez le convertisseur
python main.py

# Suivez les instructions à l'écran
```

## 📚 Étapes suivantes

Après l'installation, veuillez continuer à lire :

1.  **[Instructions de configuration](configuration.md)** - Pour comprendre les options de configuration détaillées
2.  **[Instructions d'utilisation](usage.md)** - Pour commencer votre première conversion de données
3.  **[Dépannage](../troubleshooting.md)** - À consulter si vous rencontrez des problèmes

---

**Installation terminée !** 🎉 Vous pouvez maintenant commencer à utiliser le convertisseur de données de navigation iFly. Si vous rencontrez des problèmes, veuillez consulter le [Guide de dépannage](../troubleshooting.md) ou demander de l'aide sur les GitHub Issues.
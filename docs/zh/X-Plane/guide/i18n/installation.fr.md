# Guide d'installation

Ce guide vous aidera à installer et configurer correctement l'outil Nav-data sur différents systèmes d'exploitation.

## 📋 Exigences système

### Exigences système minimales
- **Système d'exploitation** : Windows 10/11, macOS 10.15+, Ubuntu 18.04+ ou autre distribution Linux majeure
- **Version de Python** : Python 3.6 ou version ultérieure
- **Mémoire** : 4 Go de RAM ou plus recommandé
- **Espace de stockage** : Au moins 2 Go d'espace disque disponible
- **Réseau** : Pour le téléchargement des paquets de dépendances et la mise à jour des données

### Configuration système recommandée
- **Version de Python** : Python 3.8+
- **Mémoire** : 8 Go de RAM ou plus
- **Espace de stockage** : 10 Go+ de stockage SSD
- **Processeur** : CPU multicœur (pour le traitement par lots de fichiers volumineux)

## 🔧 Étapes d'installation

### 1. Installation de l'environnement Python

#### Système Windows
1. Accédez au [site officiel de Python](https://www.python.org/downloads/) pour télécharger la dernière version
2. Exécutez l'installateur, **assurez-vous de cocher "Add Python to PATH"**
3. Vérifiez l'installation :
   ```cmd
   python --version
   pip --version
   ```

#### Système macOS
Utilisez Homebrew (recommandé) :
```bash
# Installer Homebrew (si non installé)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Python
brew install python

# Vérifier l'installation
python3 --version
pip3 --version
```

#### Système Linux (Ubuntu/Debian)
```bash
# Mettre à jour le gestionnaire de paquets
sudo apt update

# Installer Python et pip
sudo apt install python3 python3-pip python3-venv

# Vérifier l'installation
python3 --version
pip3 --version
```

### 2. Récupération du code source du projet

#### Méthode 1 : Clonage Git (recommandé)
```bash
# Cloner le dépôt du projet
git clone https://github.com/your-repo/nav-data.git

# Accéder au répertoire du projet
cd nav-data
```

#### Méthode 2 : Téléchargement de l'archive ZIP
1. Accédez à la page GitHub du projet
2. Cliquez sur "Code" → "Download ZIP"
3. Extrayez vers le répertoire cible

### 3. Création de l'environnement virtuel (recommandé)

Créez un environnement virtuel Python indépendant pour éviter les conflits de dépendances :

```bash
# Créer un environnement virtuel
python -m venv nav-data-env

# Activer l'environnement virtuel
# Windows:
nav-data-env\Scripts\activate

# macOS/Linux:
source nav-data-env/bin/activate

# Vérifier l'environnement virtuel
which python  # Devrait afficher le chemin de l'environnement virtuel
```

### 4. Installation des paquets de dépendances

#### Dépendances principales
```bash
# Installer les dépendances de base
pip install -r requirements.txt
```

#### Installation manuelle des dépendances (si `requirements.txt` est absent)
```bash
# Lié au traitement des données
pip install pandas numpy

# Traitement PDF
pip install pdfplumber

# Barre de progression et interface utilisateur
pip install tqdm colorama

# Calcul géographique
pip install geopy

# Traitement du chinois (si nécessaire)
pip install pypinyin

# Autres boîtes à outils
pip install typing-extensions dataclasses
```

#### Dépendances facultatives
```bash
# Support Jupyter Notebook (analyse de données)
pip install jupyter

# Cadre de test
pip install pytest pytest-cov

# Formatage du code
pip install black flake8
```

## 🗂️ Configuration de la structure des répertoires

### Disposition standard des répertoires
```
nav-data/
├── Airway/                 # Module de traitement des données de routes aériennes
│   ├── airway.py          # Script de conversion principal
│   └── README.md          # Description du module
├── PDF extract/           # Module d'extraction de données PDF
│   ├── 1_terminal_pdf.py  # Extraction PDF brute
│   ├── 2_terminal_encode.py # Encodage des données
│   ├── 3_terminal_db.py   # Génération de base de données
│   ├── waypoint_1_pdf.py  # Extraction de points de cheminement
│   └── utils.py           # Fonctions utilitaires
├── Terminal Patch/        # Module de correction de données
│   ├── terminal_encoder.py # Encodeur de programme
│   └── terminal_reencode.py # Correction de format
├── X-Plane CIFP/         # Traitement X-Plane CIFP
│   ├── 1_navaid.py       # Traitement des aides à la navigation
│   ├── 2_waypoint.py     # Traitement des points de cheminement
│   ├── 3_terminal.py     # Traitement des procédures terminales
│   └── utils.py          # Fonctions utilitaires
├── docs/                  # Documentation du projet
├── requirements.txt       # Liste des dépendances
└── README.md             # Description du projet
```

### Création des répertoires de travail
```bash
# Créer le répertoire d'entrée des données
mkdir -p data/input/{csv,pdf,raw}

# Créer le répertoire de sortie des données
mkdir -p data/output/{dat,txt,processed}

# Créer le répertoire de journaux
mkdir -p logs

# Créer le répertoire de configuration
mkdir -p config
```

## ⚙️ Configuration des variables d'environnement

### Création du fichier de configuration de l'environnement
Créez le fichier `.env` (les utilisateurs Windows doivent créer `.env.txt` puis le renommer) :

```bash
# Chemin d'installation de X-Plane
XPLANE_PATH=/path/to/X-Plane

# Chemin des fichiers de données
DATA_INPUT_PATH=./data/input
DATA_OUTPUT_PATH=./data/output

# Configuration des journaux
LOG_LEVEL=INFO
LOG_FILE=./logs/nav-data.log

# Configuration du traitement
BATCH_SIZE=1000
ENABLE_PROGRESS_BAR=true

# Codes d'espace aérien chinois (personnalisables)
CHINA_AREAS=ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU
```

### Configuration des variables d'environnement pour Windows
1. Clic droit sur "Ce PC" → "Propriétés" → "Paramètres système avancés"
2. Cliquez sur "Variables d'environnement"
3. Dans "Variables utilisateur", ajoutez :
   - Nom de la variable : `NAV_DATA_HOME`
   - Valeur de la variable : Chemin d'installation du projet

### Configuration des variables d'environnement pour macOS/Linux
Ajoutez ceci à `~/.bashrc` ou `~/.zshrc` :
```bash
export NAV_DATA_HOME="/path/to/nav-data"
export PATH="$NAV_DATA_HOME:$PATH"
```

## 🧪 Vérification de l'installation

### 1. Test des fonctionnalités de base
```bash
# Accéder au répertoire du projet
cd nav-data

# Tester le module Airway
python -c "import Airway.airway; print('Airway module loaded successfully')"

# Tester le module de traitement PDF
python -c "import sys; sys.path.append('PDF extract'); import utils; print('PDF module loaded successfully')"

# Tester le module Terminal Patch
python -c "import sys; sys.path.append('Terminal Patch'); print('Terminal Patch module available')"
```

### 2. Script de vérification des dépendances
Créez `check_installation.py` :
```python
#!/usr/bin/env python3
"""
Script de vérification de l'installation de Nav-data
"""
import sys
import importlib
import os

def check_python_version():
    """Vérifie la version de Python"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 6):
        print("❌ Version de Python trop ancienne, 3.6+ requise")
        return False
    print(f"✅ Version de Python: {version.major}.{version.minor}.{version.micro}")
    return True

def check_dependencies():
    """Vérifie les paquets de dépendances"""
    required_packages = [
        'pandas', 'numpy', 'pdfplumber', 'tqdm',
        'colorama', 'geopy', 'typing_extensions'
    ]

    missing_packages = []
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - Non installé")
            missing_packages.append(package)

    return len(missing_packages) == 0, missing_packages

def check_directories():
    """Vérifie la structure des répertoires"""
    required_dirs = [
        'Airway', 'PDF extract', 'Terminal Patch', 'X-Plane CIFP'
    ]

    missing_dirs = []
    for dirname in required_dirs:
        if os.path.exists(dirname):
            print(f"✅ {dirname}/")
        else:
            print(f"❌ {dirname}/ - Répertoire manquant")
            missing_dirs.append(dirname)

    return len(missing_dirs) == 0, missing_dirs

def main():
    print("🔍 Vérification de l'installation de Nav-data")
    print("=" * 40)

    # Vérifier la version de Python
    print("\n📍 Vérification de la version de Python:")
    python_ok = check_python_version()

    # Vérifier les dépendances
    print("\n📍 Vérification des paquets de dépendances:")
    deps_ok, missing_deps = check_dependencies()

    # Vérifier les répertoires
    print("\n📍 Vérification de la structure des répertoires:")
    dirs_ok, missing_dirs = check_directories()

    # Résumé
    print("\n" + "=" * 40)
    if python_ok and deps_ok and dirs_ok:
        print("🎉 Vérification de l'installation réussie ! Nav-data est prêt.")
        return 0
    else:
        print("⚠️  La vérification de l'installation a trouvé des problèmes :")
        if missing_deps:
            print(f"   Dépendances manquantes: {', '.join(missing_deps)}")
            print(f"   Commande d'installation: pip install {' '.join(missing_deps)}")
        if missing_dirs:
            print(f"   Répertoires manquants: {', '.join(missing_dirs)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

Exécutez la vérification :
```bash
python check_installation.py
```

## 🔥 Problèmes d'installation courants

### Problème 1 : Compatibilité de la version de Python
**Symptômes** : Erreurs de syntaxe ou erreurs d'importation de module lors de l'exécution
**Solution** :
```bash
# Vérifier la version de Python
python --version

# Si la version est trop basse, mettez à jour Python
# Windows: Télécharger à nouveau la nouvelle version
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### Problème 2 : L'installation du paquet de dépendances a échoué
**Symptômes** : La commande `pip install` a échoué
**Solution** :
```bash
# Mettre à jour pip
python -m pip install --upgrade pip

# Utiliser une source miroir nationale
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# Vider le cache et réessayer
pip cache purge
pip install package_name
```

### Problème 3 : Problèmes d'environnement virtuel
**Symptômes** : L'environnement virtuel ne peut pas être activé ou les paquets sont introuvables
**Solution** :
```bash
# Supprimer l'ancien environnement virtuel
rm -rf nav-data-env

# Recréer
python -m venv nav-data-env

# Activer et installer les dépendances
source nav-data-env/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

### Problème 4 : Problèmes de permissions de fichiers (Linux/macOS)
**Symptômes** : Impossible de créer des fichiers ou des répertoires
**Solution** :
```bash
# Modifier les permissions du répertoire
chmod -R 755 nav-data/

# Ou utiliser sudo (non recommandé)
sudo python script.py
```

### Problème 5 : Problèmes du module de traitement PDF
**Symptômes** : L'installation ou l'utilisation de pdfplumber a échoué
**Solution** :
```bash
# Installer les dépendances système (Ubuntu/Debian)
sudo apt-get install python3-dev libpoppler-cpp-dev

# Réinstaller pdfplumber
pip uninstall pdfplumber
pip install pdfplumber
```

## 🚀 Installation terminée

Une fois l'installation terminée, vous pouvez :

1.  **Exécuter un test rapide** :
    ```bash
    python check_installation.py
    ```

2.  **Afficher l'aide** :
    ```bash
    python Airway/airway.py --help
    ```

3.  **Commencer la conversion des données** :
    Consultez les [Instructions d'utilisation](./usage.md) pour la première conversion de données

## 🔄 Mise à jour et niveau supérieur

### Mettre à jour le code du projet
```bash
# Si vous utilisez Git
git pull origin main

# Ou téléchargez à nouveau la dernière version
```

### Mettre à jour les paquets de dépendances
```bash
# Activer l'environnement virtuel
source nav-data-env/bin/activate

# Mettre à jour tous les paquets
pip install --upgrade -r requirements.txt

# Ou mettez à jour manuellement des paquets spécifiques
pip install --upgrade package_name
```

### Mise à jour des fichiers de données
Vérifiez et mettez à jour régulièrement les sources de données NAIP pour garantir l'actualité des données de navigation.

---

**Installation terminée !** 🎉 Vous pouvez maintenant commencer à utiliser Nav-data pour la conversion des données de navigation. En cas de problème, veuillez consulter la section [Dépannage](#problèmes-dinstallation-courants) ou soumettre un ticket GitHub.
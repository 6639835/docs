# 📥 Guide d'installation

Ce guide détaillera comment installer et configurer l'outil de conversion de données de navigation Nav-data sur différents systèmes d'exploitation.

## 🔧 Exigences système

### Configuration minimale
- **Python**: 3.8 ou version ultérieure
- **Mémoire vive**: 4 Go de RAM
- **Stockage**: 2 Go d'espace disponible
- **Réseau**: Connexion Internet stable (pour le téléchargement des dépendances)

### Configuration recommandée
- **Python**: 3.9+ (3.11 recommandé)
- **Mémoire vive**: 8 Go de RAM ou plus
- **Stockage**: 5 Go d'espace disponible
- **Processeur**: Processeur multi-cœur (pour le traitement parallèle)

### Systèmes d'exploitation pris en charge
- **Windows**: Windows 10/11 (64 bits)
- **macOS**: macOS 10.15 Catalina ou version ultérieure
- **Linux**: Ubuntu 18.04+, CentOS 7+, ou autres distributions compatibles

## 📋 Préparation

### 1. Installation de Python

#### Windows
1. Visitez le [site officiel de Python](https://www.python.org/downloads/windows/)
2. Téléchargez la dernière version de Python 3.11.x
3. Exécutez l'installateur, assurez-vous de cocher "Add Python to PATH"
4. Vérifiez l'installation :
```cmd
python --version
pip --version
```

#### macOS
Utilisez Homebrew (recommandé) :
```bash
# Installez Homebrew (si ce n'est pas déjà fait)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installez Python
brew install python@3.11

# Vérifiez l'installation
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# Mettez à jour le gestionnaire de paquets
sudo apt update

# Installez Python et pip
sudo apt install python3.11 python3.11-pip python3.11-venv

# Vérifiez l'installation
python3.11 --version
pip3.11 --version
```

### 2. Récupérer le code du projet

#### Méthode A: Utilisation de Git (recommandé)
```bash
# Clonez le dépôt
git clone https://github.com/Nav-data/docs.git

# Accédez au répertoire du projet
cd docs
```

#### Méthode B: Téléchargement de l'archive ZIP
1. Accédez à la page du dépôt GitHub
2. Cliquez sur "Code" > "Download ZIP"
3. Décompressez dans le répertoire cible

## 🐍 Configuration de l'environnement Python

### 1. Création de l'environnement virtuel

#### Windows
```cmd
# Accédez au répertoire du projet
cd Nav-data

# Créez l'environnement virtuel
python -m venv nav-data-env

# Activez l'environnement virtuel
nav-data-env\Scripts\activate

# Vérifiez l'environnement virtuel
where python
```

#### macOS/Linux
```bash
# Accédez au répertoire du projet
cd Nav-data

# Créez l'environnement virtuel
python3 -m venv nav-data-env

# Activez l'environnement virtuel
source nav-data-env/bin/activate

# Vérifiez l'environnement virtuel
which python
```

### 2. Installation des dépendances du projet

```bash
# Assurez-vous que l'environnement virtuel est activé
# Mettez à jour pip
pip install --upgrade pip

# Installez les dépendances du projet
pip install -r requirements.txt
```

### 3. Vérification de l'installation des dépendances

```python
# Exécutez Python et testez l'importation
python -c "
import pandas as pd
import sqlite3
import pygeomag
import tqdm
import chardet
print('Tous les paquets de dépendances ont été installés avec succès !')
"
```

## 📁 Configuration des sources de données

### 1. Création de la structure des répertoires de données

```bash
# Créez les répertoires de données
mkdir -p data/input/{naip,xplane,cifp}
mkdir -p data/output
mkdir -p logs
```

La structure des répertoires devrait être la suivante :
```
Nav-data/
├── data/
│   ├── input/
│   │   ├── naip/          # Fichiers de données CSV NAIP
│   │   ├── xplane/        # Fichiers DAT X-Plane
│   │   └── cifp/          # Fichiers de données de procédure CIFP
│   └── output/            # Fichiers de base de données générés
├── logs/                  # Fichiers journaux
└── ...
```

### 2. Configuration des chemins de fichiers

Copiez et modifiez le fichier de configuration (facultatif) :
```bash
# Copiez l'exemple de fichier de configuration
cp config/paths.example.py config/paths.py

# Modifiez le fichier de configuration
nano config/paths.py  # Linux/macOS
notepad config/paths.py  # Windows
```

## 🛠️ Configuration pour Microsoft Flight Simulator

### 1. Localisation du dossier Community de MSFS

#### Version Microsoft Store
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### Version Steam
```
C:\Users\[用户名]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

#### Version Xbox Game Pass
```
C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

### 2. Vérification de l'installation des avions PMDG

Confirmez que les répertoires suivants existent :
```
[Community文件夹]/
├── pmdg-aircraft-737/     # PMDG 737
├── pmdg-aircraft-738/     # PMDG 737-800
├── pmdg-aircraft-77w/     # PMDG 777-300ER
└── ...
```

### 3. Sauvegarde des données de navigation existantes

```bash
# Sauvegardez les données existantes pour chaque avion PMDG
# Exemple : PMDG 737-800
cd "C:\Users\[用户名]\...\Community\pmdg-aircraft-738\Config"
rename Navdata Navdata_backup_original
```

## ✅ Validation de l'installation

### 1. Exécution des tests de base

```bash
# Activez l'environnement virtuel
source nav-data-env/bin/activate  # macOS/Linux
# Ou nav-data-env\Scripts\activate  # Windows

# Exécutez les tests de base
python -c "
import sys
print(f'Version de Python: {sys.version}')

# Test des dépendances clés
import pandas as pd
print(f'Version de Pandas: {pd.__version__}')

import sqlite3
print('SQLite3: Disponible')

import pygeomag
print('PyGeoMag: Disponible')

print('✅ Tous les composants ont été installés avec succès !')
"
```

### 2. Vérification de la création de la base de données

```bash
# Testez la fonctionnalité de création de base de données
python -c "
import sqlite3
import os

# Créez une base de données de test
test_db = 'data/output/test.s3db'
os.makedirs(os.path.dirname(test_db), exist_ok=True)

conn = sqlite3.connect(test_db)
cursor = conn.cursor()
cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY)')
conn.close()

print('✅ La fonctionnalité de création de base de données fonctionne correctement')
os.remove(test_db)
"
```

### 3. Vérification des permissions de fichiers

#### Windows
Assurez-vous d'avoir les permissions d'écriture pour les répertoires suivants :
- Le répertoire du projet et ses sous-répertoires
- Le dossier Community de MSFS
- Le répertoire de cache de MSFS

#### macOS/Linux
```bash
# Vérifiez les permissions du répertoire du projet
ls -la Nav-data/

# Si des modifications de permissions sont nécessaires
chmod -R 755 Nav-data/
```

## 🔍 Dépannage

### Problèmes courants et solutions

#### 1. Version de Python incompatible
**Problème**: "python: command not found" ou version trop ancienne
**Solution**:
- Confirmez que Python 3.8+ est correctement installé
- Sur certains systèmes, utilisez `python3` au lieu de `python`

#### 2. Échec de l'installation des dépendances pip
**Problème**: Erreurs de compilation lors de l'installation des dépendances
**Solution**:
```bash
# Mettez à niveau les outils de construction
pip install --upgrade pip setuptools wheel

# Pour les problèmes avec un paquet spécifique
pip install --no-cache-dir --force-reinstall [包名]
```

#### 3. Problèmes d'installation de pygeomag
**Problème**: Échec de la compilation de pygeomag
**Solution**:
```bash
# Windows: Installez Microsoft C++ Build Tools
# macOS: Installez Xcode Command Line Tools
xcode-select --install

# Linux: Installez les dépendances de compilation
sudo apt install build-essential python3-dev
```

#### 4. Problèmes de permissions
**Problème**: Impossible d'écrire dans le répertoire MSFS
**Solution**:
- Exécutez en tant qu'administrateur (Windows)
- Vérifiez les permissions du répertoire (macOS/Linux)
- Désactivez temporairement la protection en temps réel de votre logiciel antivirus

#### 5. Mémoire insuffisante
**Problème**: Mémoire insuffisante lors du traitement de fichiers de données volumineux
**Solution**:
- Augmentez la mémoire virtuelle/l'espace d'échange
- Fermez les autres applications
- Traitez les fichiers de données par lots

### Emplacement des fichiers journaux

En cas de problème, veuillez vérifier les journaux suivants :
- `logs/PMDG_*.log` - Journaux de traitement des modules
- `logs/db_validation.log` - Journal de validation de la base de données
- `data/output/missing_airports_data.txt` - Enregistrement des données manquantes

## 📞 Obtenir de l'aide

Si vous rencontrez des problèmes pendant l'installation :

1. **Consultez les messages d'erreur** - Lisez attentivement les messages d'erreur affichés dans le terminal
2. **Vérifiez les exigences système** - Assurez-vous que votre système répond aux exigences minimales
3. **Consultez la documentation** - Référez-vous à la section de dépannage de ce guide
4. **Soumettez une Issue** - Soumettez un rapport de problème détaillé dans le dépôt GitHub

---

**Étape suivante**: Continuez à lire les [instructions de configuration](configuration.md) pour apprendre comment configurer les sources de données.
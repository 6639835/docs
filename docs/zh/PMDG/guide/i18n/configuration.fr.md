# ⚙️ Instructions de configuration

Ce guide détaille comment configurer les sources de données, les chemins de fichiers et les paramètres de traitement de Nav-data, afin de garantir que l'outil puisse traiter correctement vos données de navigation aérienne.

## 📋 Aperçu de la configuration

Nav-data nécessite la configuration des types de sources de données suivants :
- **Données NAIP** - Données du système de traitement d'informations de l'aviation civile chinoise (format CSV)
- **Données X-Plane** - Fichiers de données de navigation X-Plane (format DAT)
- **Données CIFP** - Données des procédures de vol aux instruments codées (format DAT)
- **Configuration de la sortie** - Emplacement de la base de données et des fichiers journaux générés

## 🗂️ Détails des sources de données

### 1. Source de données NAIP (Données de l'aviation civile chinoise)

Les données NAIP (National Aeronautical Information Processing) contiennent les informations aéronautiques officielles de la région chinoise :

#### Liste des fichiers requis
```
data/input/naip/
├── AD_HP.csv              # Données de base des aéroports (position de l'aéroport, déclinaison magnétique)
├── RWY_DIRECTION.csv      # Informations de direction de piste
├── RWY.csv                # Détails des pistes (longueur, largeur, surface)
└── RTE_SEG.csv            # Données de segments de route aérienne
```

#### Exigences de format de fichier
- **Encodage**: Latin-1 (ISO-8859-1)
- **Séparateur**: Virgule (,)
- **Saut de ligne**: Windows (CRLF) ou Unix (LF)

#### Description des champs clés

**AD_HP.csv** - Données d'aéroport:
- `CODE_ID`: Code OACI à 4 lettres (ex: ZBAA)
- `GEO_LAT_ACCURACY`: Latitude (format DMS: N390308.00)
- `GEO_LONG_ACCURACY`: Longitude (format DMS: E1162930.00)
- `VAL_MAG_VAR`: Valeur de la déclinaison magnétique

**RWY.csv** - Données de piste:
- `CODE_ID`: Code OACI de l'aéroport
- `TXT_DESIG`: Identifiant de piste (ex: 18L/36R)
- `VAL_LEN`: Longueur de piste (mètres)
- `VAL_WID`: Largeur de piste (mètres)

**RTE_SEG.csv** - Données de routes aériennes:
- `TXT_DESIG`: Identifiant de route aérienne (ex: A1, G212)
- `CODE_POINT_START`: Identifiant du point de départ
- `CODE_TYPE_START`: Type de point (DESIGNATED_POINT, VORDME, NDB)
- `VAL_MAG_TRACK`: Cap magnétique (degrés)
- `VAL_LEN`: Longueur du segment (kilomètres)

### 2. Source de données X-Plane

X-Plane fournit des données de navigation de haute qualité, supportant une couverture mondiale :

#### Fichiers requis
```
data/input/xplane/
├── earth_fix.dat          # Données mondiales de points de cheminement
└── earth_nav.dat          # Données VOR/DME/NDB/ILS
```

#### Description du format des données

**earth_fix.dat** format:
```
Latitude Longitude Identifiant Code régional Code OACI Type
39.051639 116.497222 ADNAP ZZZZ ZB DESIGNATED_POINT
```

**earth_nav.dat** format:
```
Type Latitude Longitude Altitude Fréquence Portée Déclinaison magnétique Identifiant Code régional Code OACI Nom Type d'équipement
3 39.051639 116.497222 35 11030 130 -6.0 BJK ENRT ZB BEIJING VOR/DME
```

#### Codes régionaux OACI pris en charge
```python
# Codes régionaux chinois actuellement pris en charge
VALID_ICAO_CODES = {
    'ZB',  # Région Chine du Nord
    'ZG',  # Région de Guangzhou  
    'ZS',  # Région de Shanghai
    'ZJ',  # Région du Xinjiang
    'ZY',  # Région Chine du Centre-Sud
    'ZL',  # Région de Lanzhou
    'ZH',  # Région du Heilongjiang
    'ZU',  # Région d'Urumqi
    'ZP',  # Région de Kunming
    'ZW'   # Région du Tibet
}
```

### 3. Source de données CIFP (Procédures de vol)

CIFP (Coded Instrument Flight Procedures) contient les procédures de vol aux instruments standard :

#### Structure des fichiers
```
data/input/cifp/
├── ZBAA.dat              # Procédures de l'aéroport international de Pékin-Capitale
├── ZSPD.dat              # Procédures de l'aéroport international de Shanghai-Pudong
├── ZGGG.dat              # Procédures de l'aéroport international de Guangzhou-Baiyun
└── [Code OACI de l'aéroport].dat     # Autres fichiers de procédures d'aéroport
```

#### Types de procédures
- **SID** - Procédures de départ aux instruments standard
- **STAR** - Procédures d'arrivée terminales standard
- **APPCH** - Procédures d'approche aux instruments

#### Exemple de format de données
```
SID:010,D,ABING1,T,ZBAA,ABING,ZB,001,IF,L,0.30,IF,,-6.0,ZBAA,0,0,0,270.0,0,D,+,1700,,,,,0.0,,ABING,,J
```

### 4. Fichiers de données de référence

#### Fichier de recherche des noms d'aéroport
```
data/input/Airport.dat

Format :
ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL
ZGGG GUANGZHOU/BAIYUN INTL
```

## 🔧 Paramètres de configuration des fichiers

### 1. Configuration des chemins d'accès

Chaque module Python contient une configuration de chemin, qui doit être ajustée en fonction de votre environnement réel :

#### Exemple de configuration PMDG_APT.py
```python
# Configuration du traitement des données d'aéroport
csv_file_path = r'/path/to/naip/AD_HP.csv'
lookup_txt_file_path = r'/path/to/Airport.dat'
output_db_path = r'/path/to/output/e_dfd_PMDG.s3db'
missing_airports_path = r'/path/to/logs/missing_airports_data.txt'
```

#### Exemple de configuration PMDG_RUNWAY.py
```python
# Configuration du traitement des données de piste
path_to_first_csv = r'/path/to/naip/RWY_DIRECTION.csv'
path_to_second_csv = r'/path/to/naip/RWY.csv'
path_to_magvar_csv = r'/path/to/naip/AD_HP.csv'
output_db3_path = r'/path/to/output/e_dfd_PMDG.s3db'
earth_nav_dat_path = r'/path/to/xplane/earth_nav.dat'
```

#### Exemple de configuration des données de procédure
```python
# Configuration des procédures SID/STAR/APPCH
source_dat_directory = '/path/to/cifp/'
earth_fix_path = '/path/to/xplane/earth_fix.dat'
earth_nav_path = '/path/to/xplane/earth_nav.dat'
db_path = '/path/to/output/e_dfd_PMDG.s3db'
```

### 2. Création d'un script de gestion de configuration

Pour faciliter la gestion, il est recommandé de créer un fichier de configuration unifié :

```python
# config/paths.py
import os

# Chemin de base
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INPUT_DIR = os.path.join(DATA_DIR, 'input')
OUTPUT_DIR = os.path.join(DATA_DIR, 'output')
LOGS_DIR = os.path.join(BASE_DIR, 'logs')

# Chemins des données NAIP
NAIP_DIR = os.path.join(INPUT_DIR, 'naip')
NAIP_FILES = {
    'airports': os.path.join(NAIP_DIR, 'AD_HP.csv'),
    'runway_direction': os.path.join(NAIP_DIR, 'RWY_DIRECTION.csv'),
    'runway_data': os.path.join(NAIP_DIR, 'RWY.csv'),
    'route_segments': os.path.join(NAIP_DIR, 'RTE_SEG.csv')
}

# Chemins des données X-Plane
XPLANE_DIR = os.path.join(INPUT_DIR, 'xplane')
XPLANE_FILES = {
    'waypoints': os.path.join(XPLANE_DIR, 'earth_fix.dat'),
    'navigation': os.path.join(XPLANE_DIR, 'earth_nav.dat')
}

# Chemins des données CIFP
CIFP_DIR = os.path.join(INPUT_DIR, 'cifp')

# Chemin du fichier de sortie
OUTPUT_DATABASE = os.path.join(OUTPUT_DIR, 'e_dfd_PMDG.s3db')

# Fichiers de référence
AIRPORT_LOOKUP = os.path.join(INPUT_DIR, 'Airport.dat')

# Chemins des fichiers journaux
LOG_FILES = {
    'missing_airports': os.path.join(LOGS_DIR, 'missing_airports_data.txt'),
    'ils_processing': os.path.join(LOGS_DIR, 'PMDG_ILS.log'),
    'airway_processing': os.path.join(LOGS_DIR, 'PMDG_AWY_NEW.log'),
    'validation': os.path.join(LOGS_DIR, 'db_validation.log')
}

# Chemins d'installation MSFS (doit être personnalisé par l'utilisateur)
MSFS_COMMUNITY_PATHS = {
    'microsoft_store': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community',
    'steam': r'C:\Users\{username}\AppData\Roaming\Microsoft Flight Simulator\Packages\Community',
    'xbox_gamepass': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community'
}
```

## ⚡ Configuration des performances

### 1. Paramètres d'optimisation de la mémoire

Pour les grands ensembles de données, la taille du lot peut être ajustée :

```python
# Configuration du traitement par lot dans PMDG_TMA_WAYPOINT.py
BATCH_SIZE = 1000  # Taille de lot par défaut
MAX_MEMORY_MB = 2048  # Utilisation maximale de la mémoire (MB)

# Ajuster en fonction de la mémoire disponible
import psutil
available_memory = psutil.virtual_memory().available / (1024 * 1024)
if available_memory > 8192:  # 8GB+
    BATCH_SIZE = 5000
elif available_memory > 4096:  # 4GB+
    BATCH_SIZE = 2000
```

### 2. Configuration du traitement concurrent

```python
# Paramètres de concurrence dans PMDG_AWY_FINAL.py
MAX_WORKERS = 50  # Nombre maximum de threads concurrents

# Ajuster en fonction du nombre de cœurs CPU
import multiprocessing
cpu_count = multiprocessing.cpu_count()
MAX_WORKERS = min(50, cpu_count * 2)
```

### 3. Paramètres d'optimisation de la base de données

```python
# Paramètres d'optimisation des performances SQLite
DATABASE_PRAGMAS = {
    'journal_mode': 'DELETE',    # Mode compatible
    'synchronous': 'FULL',       # Synchronisation complète
    'foreign_keys': 'ON',        # Activer les contraintes de clé étrangère
    'cache_size': 10000,         # Nombre de pages en cache
    'temp_store': 'MEMORY'       # Les tables temporaires sont stockées en mémoire
}
```

## 🗺️ Configuration du système de coordonnées géographiques

### 1. Conversion du format de coordonnées

Nav-data prend en charge la conversion de plusieurs formats de coordonnées :

```python
# Configuration de la conversion du format DMS (Degrés Minutes Secondes)
DMS_FORMATS = {
    'latitude': 'NDDMMSS.ss',   # Ex: N390308.00
    'longitude': 'EDDDMMSS.ss'  # Ex: E1162930.00
}

# Configuration de la précision
COORDINATE_PRECISION = 8  # Nombre de décimales
```

### 2. Configuration du calcul de la déclinaison magnétique

```python
# Configuration du modèle de déclinaison magnétique
MAGNETIC_MODEL = {
    'coefficients_file': 'wmm/WMMHR_2025.COF',
    'high_resolution': True,
    'epoch': 2025.0
}
```

## 📊 Configuration de la validation des données

### 1. Vérification de la qualité des données

```python
# Configuration de la validation des données
VALIDATION_CONFIG = {
    'check_duplicates': True,    # Vérifier les doublons
    'validate_coordinates': True, # Valider les coordonnées
    'check_icao_codes': True,    # Vérifier les codes OACI
    'verify_references': True,   # Vérifier les références
    'generate_reports': True     # Générer des rapports
}

# Validation du code OACI
VALID_ICAO_PATTERN = r'^Z[BGJLHUPYW][A-Z]{2}$'

# Validation de la plage de coordonnées (région chinoise)
COORDINATE_BOUNDS = {
    'latitude': {'min': 15.0, 'max': 55.0},   # 15°-55° de latitude Nord
    'longitude': {'min': 70.0, 'max': 140.0}  # 70°-140° de longitude Est
}
```

### 2. Configuration de la gestion des erreurs

```python
# Stratégie de gestion des erreurs
ERROR_HANDLING = {
    'missing_data': 'log',      # journaliser | ignorer | lever
    'invalid_coordinates': 'skip',
    'duplicate_records': 'log',
    'reference_not_found': 'log'
}
```

## 🔍 Configuration du débogage

### 1. Paramètres du niveau de journalisation

```python
# Configuration de la journalisation
LOGGING_CONFIG = {
    'level': 'INFO',            # DEBUG | INFO | WARNING | ERROR
    'format': '%(asctime)s - %(levelname)s - %(message)s',
    'file_size_mb': 10,         # Taille du fichier journal individuel
    'backup_count': 5,          # Nombre de fichiers de sauvegarde à conserver
    'encoding': 'utf-8'
}
```

### 2. Configuration de l'affichage de la progression

```python
# Configuration de la barre de progression
PROGRESS_CONFIG = {
    'enable_progress_bar': True,
    'update_interval': 100,     # Intervalle de mise à jour (nombre d'enregistrements)
    'show_eta': True,           # Afficher le temps estimé d'achèvement
    'show_rate': True           # Afficher le taux de traitement
}
```

## ✅ Validation de la configuration

Créez un script de validation de la configuration pour vérifier l'exactitude de la configuration :

```python
# scripts/validate_config.py
import os
import sys
from config.paths import *

def validate_config():
    """Valide l'intégrité et l'exactitude des fichiers de configuration"""
    
    print("🔍 Vérification de la configuration...")
    
    # Vérification des répertoires requis
    required_dirs = [DATA_DIR, INPUT_DIR, OUTPUT_DIR, LOGS_DIR]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ Répertoire manquant: {dir_path}")
            return False
        print(f"✅ Répertoire existant: {dir_path}")
    
    # Vérification des fichiers d'entrée requis
    required_files = []
    required_files.extend(NAIP_FILES.values())
    required_files.extend(XPLANE_FILES.values())
    required_files.append(AIRPORT_LOOKUP)
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✅ Fichier existant: {os.path.basename(file_path)}")
    
    if missing_files:
        print(f"❌ Fichiers requis manquants:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ Validation de la configuration réussie !")
    return True

if __name__ == "__main__":
    if not validate_config():
        sys.exit(1)
```

## 📞 Dépannage de la configuration

### Problèmes de configuration courants

1.  **Problèmes de séparateur de chemin**
    -   Windows: Utilisez la barre oblique inverse `\` ou une chaîne brute `r'path'`
    -   macOS/Linux: Utilisez la barre oblique `/`

2.  **Problèmes d'encodage de fichier**
    -   Fichiers CSV: Assurez-vous d'utiliser l'encodage Latin-1
    -   Fichiers DAT: Généralement encodés en UTF-8

3.  **Problèmes de permissions**
    -   Assurez-vous d'avoir les permissions de lecture et d'écriture pour tous les chemins de configuration
    -   Windows: Peut nécessiter des droits d'administrateur

4.  **Limite de longueur de chemin**
    -   Windows: La longueur totale du chemin ne dépasse pas 260 caractères
    -   Utilisez des chemins relatifs pour réduire la longueur

---

**Étape suivante**: Lisez les [Instructions d'utilisation](usage.md) pour savoir comment exécuter le processus de conversion des données.
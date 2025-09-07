# Instructions de configuration

Ce document détaille les options de configuration et les paramètres de chaque module Nav-data.

## 📋 Aperçu des fichiers de configuration

### Fichiers de configuration principaux
```
config/
├── main.conf           # Fichier de configuration principal
├── airway.conf         # Configuration du traitement des routes aériennes
├── pdf_extract.conf    # Configuration de l'extraction PDF
├── terminal.conf       # Configuration du programme terminal
└── paths.conf          # Configuration des chemins
```

### Configuration des variables d'environnement
```bash
# Exemple de fichier .env
NAV_DATA_HOME=/path/to/nav-data
XPLANE_PATH=/path/to/X-Plane
LOG_LEVEL=INFO
```

## 🛣️ Configuration du module de routes aériennes (Airway)

### Fichier de configuration : `config/airway.conf`

```ini
[General]
# Activer la journalisation détaillée
verbose_logging = true

# Affichage de la barre de progression
show_progress = true

# Taille du lot
batch_size = 1000

[Input]
# Chemin du fichier d'entrée CSV
csv_file = RTE_SEG.csv

# Fichiers de données de référence X-Plane
earth_fix_file = earth_fix.dat
earth_nav_file = earth_nav.dat
earth_awy_file = earth_awy.dat

[Output]
# Encodage du fichier de sortie
output_encoding = utf-8

# Sauvegarder les fichiers originaux
create_backup = true

# Suffixe des fichiers de sauvegarde
backup_suffix = .backup

[Filtering]
# Codes de région d'espace aérien à exclure (séparés par des virgules)
excluded_areas = ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU

# Longueur minimale du segment de route aérienne (milles nautiques)
min_segment_length = 0.1

# Longueur maximale du segment de route aérienne (milles nautiques)
max_segment_length = 999.9

[Validation]
# Activer la validation des données
enable_validation = true

# Tolérance de point de navigation (degrés)
coordinate_tolerance = 0.001

# Validation des codes de région
validate_area_codes = true

[AIRAC]
# Calcul automatique du cycle AIRAC
auto_calculate_cycle = true

# Spécifier manuellement le cycle AIRAC (format : AA MM)
manual_cycle = 

# Date de référence AIRAC (format ISO)
reference_date = 2025-01-23

# Cycle de référence
reference_cycle = 2501
```

### Options de configuration dans le code

#### Configuration du script principal de traitement des routes aériennes
```python
# Exemple de configuration pour Airway/airway.py

# Configuration des codes d'espace aérien chinois
CHINA_AREAS = {
    'ZB',  # Région d'information de vol de Pékin
    'ZG',  # Région d'information de vol de Guangzhou
    'ZY',  # Région d'information de vol de Shenyang
    'ZS',  # Région d'information de vol de Shanghai
    'ZW',  # Région d'information de vol d'Urumqi
    'ZJ',  # Région d'information de vol de Sanya
    'ZP',  # Région d'information de vol de Lanzhou
    'ZL',  # Région d'information de vol de Kunming
    'ZH',  # Région d'information de vol de Wuhan
    'ZU'   # Région d'information de vol de Chengdu
}

# Configuration des chemins de fichiers
FILE_PATHS = {
    'csv_input': 'RTE_SEG.csv',
    'earth_fix': 'earth_fix.dat',
    'earth_nav': 'earth_nav.dat',
    'earth_awy': 'earth_awy.dat'
}

# Mappage des types de points de navigation
NAVIGATION_TYPES = {
    'DESIGNATED_POINT': {'code': 'DESIGNATED_POINT', 'type_code': '11'},
    'VORDME': {'code': 'VORDME', 'type_code': '3'},
    'NDB': {'code': 'NDB', 'type_code': '2'}
}
```

## 📄 Configuration du module d'extraction PDF

### Fichier de configuration : `config/pdf_extract.conf`

```ini
[General]
# Mode de traitement : auto (automatique), manual (manuel)
processing_mode = auto

# Format de sortie : txt, json, csv
output_format = txt

# Encodage des caractères
encoding = utf-8

[PDF_Processing]
# Moteur d'analyse PDF : pdfplumber, pypdf2
pdf_engine = pdfplumber

# Marges de recadrage de la page (pixels)
crop_margin_top = 50
crop_margin_bottom = 50
crop_margin_left = 30
crop_margin_right = 30

# Seuil d'extraction de texte
text_confidence_threshold = 0.8

# Seuil de détection de ligne
line_detection_threshold = 5

[Coordinate_Extraction]
# Validation du format de coordonnées
coordinate_format_strict = true

# Précision des coordonnées (nombre de décimales)
coordinate_precision = 8

# Validation de la plage de coordonnées (région chinoise)
latitude_min = 15.0
latitude_max = 55.0
longitude_min = 70.0
longitude_max = 140.0

[Error_Handling]
# Continuer le traitement en cas d'erreur
continue_on_error = true

# Niveau de détail des journaux d'erreurs
error_detail_level = high

# Correction automatique des erreurs courantes
auto_fix_common_errors = true

[Output]
# Modèle de nommage des fichiers de sortie
# Variables : {airport}, {type}, {timestamp}
filename_pattern = {airport}_{type}.txt

# Créer les répertoires de sortie
create_output_dirs = true

# Écraser les fichiers existants
overwrite_existing = false
```

### Exemple de configuration dans le code

#### Configuration du traitement PDF
```python
# Configuration pour PDF extract/utils.py

# Définition des catégories de points de cheminement
WAYPOINT_CATEGORIES = {
    'ENRT': 1,      # Point de cheminement
    'VHF': 2,       # Balise de navigation VHF
    'NDB': 3,       # Balise de navigation NDB
    'TERMINAL': 4   # Point de cheminement de zone terminale
}

# Précision de traitement des coordonnées
COORDINATE_PRECISION = 8

# Table de conversion des codes de région
AREA_CODE_TRANSLATION = {
    'KA': 'K1'  # Conversion de code de région spécial
}

# Configuration des couleurs des messages d'erreur (utilisant colorama)
COLOR_CONFIG = {
    'error': Fore.RED,
    'warning': Fore.YELLOW,
    'info': Fore.GREEN,
    'debug': Fore.CYAN
}
```

#### Configuration de l'extraction de coordonnées
```python
# Configuration pour PDF extract/waypoint_1_pdf.py

# Paramètres de traitement de page
PAGE_PROCESSING = {
    'enable_text_lines': True,
    'debug_output': False,
    'max_lines_per_page': 1000
}

# Paramètres de calcul de coordonnées
COORDINATE_CALCULATION = {
    'precision_digits': 8,
    'handle_number_prefix': True,
    'auto_format_detection': True
}

# Paramètres de traitement des caractères
CHARACTER_PROCESSING = {
    'degree_symbol_replacement': '°',
    'minute_symbol_replacement': "'",
    'second_symbol_replacement': '"',
    'special_char_mapping': {"¡ã": '°'}
}
```

## 🔧 Configuration du programme terminal (Terminal Patch)

### Fichier de configuration : `config/terminal.conf`

```ini
[Encoder]
# Chemin d'entrée par défaut
default_input_path = PDF extract/public

# Chemin de sortie par défaut
default_output_path = PDF extract/output

# Encodage des fichiers
file_encoding = utf-8

# Activer la validation de l'encodage
enable_encoding_validation = true

[Processing_Rules]
# Règles d'identification des points IF
if_point_markers = c

# Règles d'encodage
encoding_rules = {
    'if_line': 'E  A',
    'transition_middle': 'E   ',
    'transition_end': 'EE B',
    'main_approach_if': 'E  B',
    'faf_point': 'E  F',
    'missed_approach': 'E M ',
    'procedure_end': 'EE  ',
    'holding_end': 'EE H'
}

[ReEncoder]
# Préfixes de code d'aéroport pris en charge
supported_airport_prefixes = ZB,ZG,ZL,ZU,ZW,ZY,ZJ,ZS,ZH,ZP

# Détection de l'encodage des fichiers
auto_detect_encoding = true

# Règles de correction de l'encodage
fix_rules = {
    'appch_gy_m_rule': true,
    'pure_alpha_rule': true,
    'sid_runway_rule': true,
    'procedure_end_rule': true
}

[Validation]
# Validation du format
validate_format = true

# Validation des identificateurs de piste
validate_runway_identifiers = true

# Validation des types de procédure
validate_procedure_types = true
```

### Exemple de configuration de l'encodeur

```python
# Configuration pour Terminal Patch/terminal_encoder.py

# Identificateurs de type de procédure
PROCEDURE_MARKERS = {
    'approach': 'c',
    'departure': 'd',
    'arrival': 'a'
}

# Mappages d'encodage
ENCODING_MAPPINGS = {
    'IF_LINE': 'E  A',
    'TRANSITION_MIDDLE': 'E   ',
    'TRANSITION_END': 'EE B',
    'MAIN_APPROACH_IF': 'E  B', 
    'FAF_POINT': 'E  F',
    'MISSED_APPROACH_FIRST': 'E M ',
    'PROCEDURE_END': 'EE  ',
    'HOLDING_END': 'EE H'
}

# Paramètres de traitement des fichiers
FILE_PROCESSING = {
    'batch_mode': True,
    'show_progress': True,
    'create_backup': False,
    'output_encoding': 'utf-8'
}
```

## 🛩️ Configuration du module X-Plane CIFP

### Fichier de configuration : `config/cifp.conf`

```ini
[General]
# Compatibilité de la version X-Plane
xplane_version = 12

# Version du format de données CIFP
cifp_format_version = 1101

[Paths]
# Chemin des données d'entrée
input_path = /Users/lujuncheng/Downloads/XP导航数据/编码重构

# Dossier de sortie
output_folder = /Users/lujuncheng/Downloads/XP导航数据/CIFP

# Chemin d'installation X-Plane
xplane_path = /Users/lujuncheng/Downloads/xplane12_native_2502

# Dossier des données CSV
csv_folder = /Users/lujuncheng/Downloads/NAIP2502

[Processing]
# Types de procédure à traiter
process_departures = true
process_arrivals = true
process_approaches = true

# Traitement des informations de piste
generate_runway_info = true

# Mode de mélange de procédures
enable_procedure_mixing = true

[NavAid_Processing]
# Fichier de données VOR
vor_data_file = VOR.csv

# Fichier de données NDB  
ndb_data_file = NDB.csv

# Traitement des fréquences
frequency_conversion = true

# Conversion d'unité d'altitude (mètres en pieds)
altitude_conversion_factor = 3.28

[Waypoint_Processing]
# Codage du type de point de cheminement
waypoint_type_coding = true

# Compatibilité ARINC 424
arinc424_compatibility = true

# Traitement des codes de zone
process_area_codes = true

[Validation]
# Tolérance de validation des coordonnées
coordinate_tolerance = 0.2

# Validation des identificateurs de point de cheminement
validate_identifiers = true

# Vérification de l'intégrité des procédures
validate_procedure_integrity = true
```

### Configuration du système de points de cheminement

```python
# Configuration pour X-Plane CIFP/utils.py

# Définition des catégories de points de cheminement
WAYPOINT_CATEGORIES = {
    'UNAVAILABLE': -1,  # Statut indisponible
    'WAYPOINT': 1,      # Point de cheminement
    'VHF_NAVAID': 2,    # Équipement de navigation VHF
    'NDB_NAVAID': 3     # Équipement de navigation NDB
}

# Tolérance de comparaison des coordonnées (degrés)
COORDINATE_TOLERANCE = 0.2

# Mappage des codes de région
AREA_CODE_MAPPING = {
    # Codes FIR chinois
    'ZBPE': 'ZB',  # Pékin
    'ZGZU': 'ZG',  # Guangzhou
    'ZYSH': 'ZY',  # Shenyang
    'ZSHA': 'ZS',  # Shanghai
    'ZWUQ': 'ZW',  # Urumqi
    'ZJSA': 'ZJ',  # Sanya
    'ZLHW': 'ZL',  # Lanzhou
    'ZUCK': 'ZU',  # Chengdu
    'ZHWH': 'ZH'   # Wuhan
}
```

## 📊 Configuration du traitement des données

### Configuration des données CSV

```python
# Configuration générale du traitement CSV
CSV_CONFIG = {
    'encoding': 'gbk',          # Les fichiers CSV chinois utilisent généralement l'encodage GBK
    'delimiter': ',',
    'quotechar': '"',
    'skipinitialspace': True,
    'na_values': ['', 'N/A', 'NULL', '0.0']
}

# Champs CSV requis
REQUIRED_CSV_FIELDS = {
    'airway': [
        'CODE_POINT_START', 'CODE_TYPE_START',
        'CODE_POINT_END', 'CODE_TYPE_END', 
        'CODE_DIR', 'TXT_DESIG'
    ],
    'airport': [
        'CODE_AIRPORT', 'GEO_LAT', 'GEO_LONG', 
        'ELEVATION', 'TXT_NAME'
    ],
    'runway': [
        'CODE_AIRPORT', 'TXT_DESIG', 'GEO_LAT_START',
        'GEO_LONG_START', 'GEO_LAT_END', 'GEO_LONG_END'
    ]
}
```

### Configuration de la base de données
```python
# Configuration pour X-Plane CIFP/database.py

DATABASE_CONFIG = {
    'connection_timeout': 30,
    'auto_commit': True,
    'encoding': 'utf-8',
    'journal_mode': 'WAL',  # Optimisation SQLite
    'synchronous': 'NORMAL'
}

# Schémas de table de données
TABLE_SCHEMAS = {
    'waypoints': {
        'id': 'INTEGER PRIMARY KEY',
        'ident': 'TEXT NOT NULL',
        'latitude': 'REAL NOT NULL', 
        'longitude': 'REAL NOT NULL',
        'type': 'INTEGER',
        'airport': 'TEXT',
        'area': 'TEXT'
    }
}
```

## 🔧 Configuration de la journalisation

### Fichier de configuration de la journalisation : `config/logging.conf`

```ini
[loggers]
keys=root,airway,pdf_extract,terminal,cifp

[handlers] 
keys=consoleHandler,fileHandler,rotatingFileHandler

[formatters]
keys=standardFormatter,detailedFormatter

[logger_root]
level=INFO
handlers=consoleHandler,rotatingFileHandler

[logger_airway]
level=DEBUG
handlers=fileHandler
qualname=airway
propagate=0

[logger_pdf_extract]
level=INFO
handlers=fileHandler
qualname=pdf_extract
propagate=0

[logger_terminal]
level=INFO
handlers=fileHandler
qualname=terminal
propagate=0

[logger_cifp]
level=DEBUG
handlers=fileHandler
qualname=cifp
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=standardFormatter
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=detailedFormatter
args=('logs/nav-data.log', 'a')

[handler_rotatingFileHandler]
class=handlers.RotatingFileHandler
level=INFO
formatter=standardFormatter
args=('logs/nav-data-rotating.log', 'a', 10485760, 5)

[formatter_standardFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=%Y-%m-%d %H:%M:%S

[formatter_detailedFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(funcName)s() - %(message)s
datefmt=%Y-%m-%d %H:%M:%S
```

### Exemple de configuration de journalisation Python

```python
import logging
import logging.config
from pathlib import Path

# Charger la configuration de la journalisation
def setup_logging(config_path='config/logging.conf'):
    """Configure la journalisation"""
    if Path(config_path).exists():
        logging.config.fileConfig(config_path)
    else:
        # Configuration par défaut
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('logs/nav-data.log')
            ]
        )

# Loggers pour chaque module
def get_logger(name):
    """Récupère le logger dédié au module"""
    return logging.getLogger(name)

# Exemple d'utilisation
logger = get_logger('airway')
logger.info('Début du traitement des routes aériennes')
```

## ⚙️ Configuration d'optimisation des performances

### Configuration de la gestion de la mémoire
```python
# Optimisation de l'utilisation de la mémoire
MEMORY_CONFIG = {
    'chunk_size': 10000,        # Taille de traitement par blocs
    'max_memory_usage': '2GB',  # Utilisation maximale de la mémoire
    'garbage_collection': True, # Activer le ramasse-miettes
    'buffer_size': 8192        # Tampon de lecture de fichier
}

# Configuration du traitement concurrent
CONCURRENCY_CONFIG = {
    'max_workers': 4,           # Nombre maximal de threads de travail
    'enable_multiprocessing': False, # Traitement multiprocessus
    'thread_pool_size': 2       # Taille du pool de threads
}
```

### Configuration du cache
```python
# Paramètres du cache
CACHE_CONFIG = {
    'enable_cache': True,
    'cache_size': 1000,
    'cache_ttl': 3600,          # Durée de vie du cache (secondes)
    'cache_directory': 'cache/'
}
```

## 🔍 Validation de la configuration

### Script de validation de la configuration

Créer `validate_config.py` :

```python
#!/usr/bin/env python3
"""
Script de validation des fichiers de configuration
"""
import configparser
import os
import sys
from pathlib import Path

def validate_airway_config(config_file):
    """Valide la configuration du module de routes aériennes"""
    config = configparser.ConfigParser()
    config.read(config_file)
    
    errors = []
    
    # Vérifier les sections requises
    required_sections = ['General', 'Input', 'Output', 'Filtering']
    for section in required_sections:
        if section not in config:
            errors.append(f"Section de configuration manquante : [{section}]")
    
    # Vérifier les chemins de fichiers
    if 'Input' in config:
        for key in ['csv_file', 'earth_fix_file', 'earth_nav_file']:
            if key in config['Input']:
                file_path = config['Input'][key]
                if not os.path.exists(file_path):
                    errors.append(f"Fichier introuvable : {file_path}")
    
    return errors

def validate_all_configs():
    """Valide tous les fichiers de configuration"""
    config_dir = Path('config')
    if not config_dir.exists():
        print("❌ Répertoire de configuration introuvable")
        return False
    
    config_files = {
        'airway.conf': validate_airway_config,
        # D'autres fonctions de validation de configuration peuvent être ajoutées
    }
    
    all_valid = True
    for config_file, validator in config_files.items():
        config_path = config_dir / config_file
        if config_path.exists():
            errors = validator(str(config_path))
            if errors:
                print(f"❌ Erreur de configuration pour {config_file} :")
                for error in errors:
                    print(f"   - {error}")
                all_valid = False
            else:
                print(f"✅ Configuration de {config_file} correcte")
        else:
            print(f"⚠️  Fichier de configuration {config_file} introuvable (valeurs par défaut utilisées)")
    
    return all_valid

if __name__ == "__main__":
    if validate_all_configs():
        print("\n🎉 Toutes les configurations ont été validées avec succès !")
        sys.exit(0)
    else:
        print("\n❌ Échec de la validation de la configuration. Veuillez corriger les problèmes ci-dessus.")
        sys.exit(1)
```

## 📚 Bonnes pratiques de configuration

### 1. Gestion des fichiers de configuration
- Gérer les fichiers de configuration avec le contrôle de version
- Créer des fichiers de configuration différents pour différents environnements
- Sauvegarder régulièrement les configurations importantes

### 2. Considérations de sécurité
- Ne pas stocker d'informations sensibles dans les fichiers de configuration
- Utiliser des variables d'environnement pour stocker des informations variables comme les chemins
- Définir des permissions de fichiers appropriées

### 3. Optimisation des performances
- Ajuster la taille des lots en fonction des ressources système
- Définir des limites d'utilisation de la mémoire appropriées
- Activer des mécanismes de cache appropriés

### 4. Gestion des erreurs
- Définir des valeurs par défaut pour toutes les options de configuration critiques
- Implémenter un mécanisme de validation de la configuration
- Fournir des messages d'erreur clairs

---

**Configuration terminée !** 🎯 Vous pouvez maintenant ajuster les paramètres de configuration de chaque module selon vos besoins spécifiques. Il est recommandé d'exécuter le script de validation de la configuration avant la première utilisation pour s'assurer que les réglages sont corrects.
# ⚙️ Guide de configuration du convertisseur de données de navigation iFly

Ce guide détaille les différentes options de configuration du convertisseur de données de navigation iFly, vous aidant à optimiser le processus de conversion selon vos besoins.

## 🎯 Aperçu de la configuration

Le convertisseur offre un système de configuration flexible, prenant en charge :
- **📁 Configuration des chemins** - Personnalisation des chemins d'entrée et de sortie
- **📊 Paramètres de traitement** - Ajustement de la précision et de la portée du traitement des données
- **⚡ Optimisation des performances** - Optimisation de la mémoire et de la vitesse de traitement
- **🔍 Options de validation** - Paramètres de validation de l'intégrité des données

## 📋 Méthodes de configuration

### 1. Configuration interactive (recommandée)
```bash
# Exécuter le convertisseur et configurer selon les invites
python main.py
```

### 2. Fichier de configuration
Créer le fichier `config.json` :
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "ifly_path": "/path/to/ifly-aircraft-737max8",
    "terminal_id_start": 1000,
    "coordinate_precision": 8,
    "enable_validation": true
}
```

### 3. Variables d'environnement
```bash
export IFLY_FENIX_DB="/path/to/nd.db3"
export IFLY_CSV_FILE="/path/to/RTE_SEG.csv"
export IFLY_INSTALL_PATH="/path/to/ifly-aircraft-737max8"
```

## 🔧 Options de configuration principales

### Configuration des chemins de fichiers

#### Chemin de la base de données Fenix
**Nom du paramètre**: `fenix_db_path`  
**Description**: Emplacement du fichier de la base de données de navigation du Fenix A320  
**Valeur par défaut**: Détection automatique  

**Emplacements courants :**
```bash
# Windows
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Exemple de chemin personnalisé
/Users/username/Documents/Fenix/navdata/nd.db3
```

**Méthode de validation :**
```python
import sqlite3
def validate_fenix_db(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        required_tables = ['Airports', 'Runways', 'Waypoints', 'Terminals']
        return all(table in tables for table in required_tables)
    except Exception as e:
        print(f"Échec de la validation de la base de données : {e}")
        return False
```

#### Chemin du fichier CSV NAIP
**Nom du paramètre**: `csv_file_path`  
**Description**: Fichier de données des segments de route de l'aviation civile chinoise  
**Exigences de format**: Fichier CSV encodé en UTF-8  

**Exemple de structure de fichier :**
```csv
ROUTE_ID,SEQUENCE_NUMBER,WAYPOINT_ID,LATITUDE,LONGITUDE,MAG_VARIATION
A1,1,ZSAM,39.916667,116.383333,7.2
A1,2,VOR01,39.833333,116.500000,7.1
```

**Colonnes requises :**
- `WAYPOINT_ID`: Identifiant de point de cheminement
- `LATITUDE`: Latitude (degrés décimaux)
- `LONGITUDE`: Longitude (degrés décimaux)
- `ROUTE_ID`: Identifiant de route

#### Chemin d'installation iFly
**Nom du paramètre**: `ifly_path`  
**Description**: Répertoire d'installation de l'iFly 737 MAX 8  
**Détection automatique**: Prise en charge  

**Ordre de détection :**
1. Package Community : `Community\ifly-aircraft-737max8\`
2. Package Official : `Official\asobo-aircraft-ifly-737max8\`
3. Chemin spécifié manuellement

## ⚙️ Configuration des paramètres de traitement

### Plage d'ID de programme de terminal

#### Réglage de l'ID de début
**Nom du paramètre**: `terminal_id_start`  
**Description**: Numéro d'ID de début du programme de terminal  
**Valeur par défaut**: `1000`  
**Plage**: `1 - 9999`  

**Suggestions de réglage :**
```python
# Régler en fonction du nombre d'aéroports
small_airports = 1000   # < 50 aéroports
medium_airports = 2000  # 50-200 aéroports  
large_airports = 5000   # > 200 aéroports
```

#### Stratégie d'attribution d'ID
```python
def calculate_terminal_ids(airport_count, start_id=1000):
    """Calcul de l'attribution des ID de programme de terminal"""
    # Réserver 20 ID par aéroport
    id_per_airport = 20
    total_ids_needed = airport_count * id_per_airport
    
    if start_id + total_ids_needed > 9999:
        print("⚠️ Avertissement : la plage d'ID pourrait être insuffisante")
        return start_id, 9999
    
    return start_id, start_id + total_ids_needed
```

### Configuration de la précision des coordonnées

#### Réglage de la précision
**Nom du paramètre**: `coordinate_precision`  
**Description**: Nombre de décimales pour les coordonnées  
**Valeur par défaut**: `8`  
**Plage**: `4 - 12`  

**Comparaison des précisions :**
| Précision   | Marge d'erreur   | Scénarios applicables         |
|-------------|------------------|-------------------------------|
| 4 décimales | ~11 mètres       | Navigation de base            |
| 6 décimales | ~1.1 mètres      | Navigation standard           |
| 8 décimales | ~1.1 centimètre  | Navigation de haute précision |
| 10 décimales| ~1.1 millimètre  | Très haute précision          |

**Exemple de réglage :**
```python
# Exemple de coordonnées avec différentes précisions
coord_4 = 39.9167  # Précision à 4 décimales
coord_6 = 39.916667  # Précision à 6 décimales  
coord_8 = 39.91666700  # Précision à 8 décimales
```

### Configuration du calcul de la déclinaison magnétique

#### Paramètres du modèle WMM
**Version du modèle**: WMM-2025  
**Fréquence de mise à jour**: Tous les 5 ans  
**Précision de calcul**: 0.1 degré  

**Paramètres de calcul :**
```python
{
    "model_year": 2025,
    "altitude": 0,  # Altitude au niveau de la mer (mètres)
    "calculation_date": "auto",  # Utiliser automatiquement la date actuelle
    "use_local_time": true  # Utiliser l'heure locale
}
```

#### Validation de la déclinaison magnétique
```python
def validate_magnetic_declination(declination):
    """Valider la pertinence de la valeur de déclinaison magnétique"""
    # La plage mondiale de déclinaison magnétique est d'environ -30° à +30°
    if -30.0 <= declination <= 30.0:
        return True
    else:
        print(f"⚠️ Valeur de déclinaison magnétique anormale : {declination}°")
        return False
```

## 🚀 Configuration de l'optimisation des performances

### Gestion de la mémoire

#### Taille du lot de traitement
**Nom du paramètre**: `batch_size`  
**Description**: Nombre d'enregistrements par lot de traitement unique  
**Valeur par défaut**: `1000`  
**Réglages suggérés :**

```python
# Ajuster en fonction de la mémoire disponible
import psutil

def get_optimal_batch_size():
    available_memory = psutil.virtual_memory().available
    memory_gb = available_memory / (1024**3)
    
    if memory_gb < 4:
        return 500   # Moins de 4 Go
    elif memory_gb < 8:
        return 1000  # 4-8 Go
    else:
        return 2000  # Plus de 8 Go
```

#### Surveillance de la mémoire
```python
def monitor_memory_usage():
    """Surveiller l'utilisation de la mémoire"""
    import psutil
    memory = psutil.virtual_memory()
    print(f"Utilisation de la mémoire : {memory.percent}%")
    print(f"Mémoire disponible : {memory.available / (1024**2):.1f} Mo")
```

### Configuration du traitement concurrent

#### Réglage du nombre de threads
**Nom du paramètre**: `max_workers`  
**Description**: Nombre maximal de threads concurrents  
**Valeur par défaut**: Nombre de cœurs CPU  

**Stratégie de réglage :**
```python
import os

def get_optimal_workers():
    cpu_count = os.cpu_count()
    
    # Réserver un cœur pour le système
    if cpu_count <= 2:
        return 1
    elif cpu_count <= 4:
        return cpu_count - 1
    else:
        return min(cpu_count - 2, 8)  # Maximum 8 threads
```

#### Optimisation I/O
```python
{
    "use_ssd_optimization": true,    # Optimisation SSD
    "buffer_size": 8192,            # Taille du tampon (octets)
    "enable_compression": false,     # Compression des fichiers temporaires
    "temp_dir": "/tmp"              # Répertoire temporaire
}
```

## 🔍 Validation et contrôle qualité

### Configuration de la validation des données

#### Niveau de validation
**Nom du paramètre**: `validation_level`  
**Description**: Intensité de la validation des données  
**Options**: `basic`, `standard`, `strict`  

**Contenu de la validation :**
```python
validation_levels = {
    "basic": [
        "file_existence",
        "basic_format_check"
    ],
    "standard": [
        "file_existence", 
        "format_validation",
        "coordinate_range_check",
        "database_integrity"
    ],
    "strict": [
        "file_existence",
        "format_validation", 
        "coordinate_range_check",
        "database_integrity",
        "data_consistency_check",
        "cross_reference_validation"
    ]
}
```

#### Stratégie de gestion des erreurs
**Nom du paramètre**: `error_handling`  
**Options**: `stop`, `skip`, `fix`  

```python
error_strategies = {
    "stop": "Arrêter immédiatement en cas d'erreur",
    "skip": "Ignorer les enregistrements erronés et continuer le traitement", 
    "fix": "Tenter de corriger automatiquement les erreurs"
}
```

### Contrôle qualité de la sortie

#### Règles de nommage des fichiers
```python
output_naming = {
    "use_timestamp": true,          # Utiliser l'horodatage
    "include_version": true,        # Inclure le numéro de version
    "airac_suffix": true,          # Ajouter le suffixe AIRAC
    "backup_original": true        # Sauvegarder le fichier original
}

# Exemples de noms de fichiers générés :
# WPNAVRTE_2024-12-15_v2.0_2508.txt
# FMC_Ident_2024-12-15_v2.0_2508.txt
```

## 📅 Configuration du cycle AIRAC

### Réglages de calcul automatique
**Nom du paramètre**: `airac_auto_calculate`  
**Valeur par défaut**: `true`  
**Fuseau horaire**: UTC+8 (Heure de Pékin)  

```python
airac_config = {
    "auto_calculate": true,
    "timezone": "Asia/Shanghai",
    "reference_date": "2024-01-11",  # Date de début de l'AIRAC 2401
    "cycle_days": 28,                # Nombre de jours du cycle standard
    "format": "YYWW"                # Format : AnnéeAnnéeSemaineSemaine
}
```

### Réglage manuel
```python
# Spécifier manuellement le cycle AIRAC
manual_airac = {
    "cycle": "2508",
    "effective_date": "2025-02-20",
    "expiry_date": "2025-03-19"
}
```

## 🎛️ Configuration avancée

### Configuration des logs
```python
logging_config = {
    "level": "INFO",               # DEBUG, INFO, WARNING, ERROR
    "file": "converter.log",       # Nom du fichier de log
    "max_size": "10MB",           # Taille maximale du fichier
    "backup_count": 3,            # Nombre de fichiers de sauvegarde
    "format": "%(asctime)s - %(levelname)s - %(message)s"
}
```

### Configuration de l'interface utilisateur
```python
ui_config = {
    "theme": "dark",              # Thème : dark, light, auto
    "progress_style": "bar",      # Style de la barre de progression : bar, spinner
    "color_scheme": "rich",       # Schéma de couleurs
    "show_details": true,         # Afficher les détails
    "animation": true            # Activer les effets d'animation
}
```

### Configuration de débogage
```python
debug_config = {
    "enable_debug": false,        # Activer le mode débogage
    "save_intermediate": false,   # Enregistrer les résultats intermédiaires
    "verbose_logging": false,     # Journalisation détaillée
    "performance_profiling": false, # Profilage des performances
    "memory_tracking": false     # Suivi de la mémoire
}
```

## 📝 Modèles de fichiers de configuration

### Exemple de configuration complète
```json
{
    "paths": {
        "fenix_db_path": "auto_detect",
        "csv_file_path": "./data/RTE_SEG.csv",
        "ifly_path": "auto_detect",
        "output_backup_dir": "./backup"
    },
    "processing": {
        "terminal_id_start": 1000,
        "coordinate_precision": 8,
        "batch_size": 1000,
        "max_workers": 4
    },
    "magnetic": {
        "model_year": 2025,
        "altitude": 0,
        "use_local_time": true
    },
    "airac": {
        "auto_calculate": true,
        "timezone": "Asia/Shanghai",
        "format": "YYWW"
    },
    "validation": {
        "validation_level": "standard",
        "error_handling": "skip",
        "enable_validation": true
    },
    "output": {
        "use_timestamp": true,
        "include_version": true,
        "airac_suffix": true,
        "backup_original": true
    },
    "logging": {
        "level": "INFO",
        "file": "converter.log",
        "max_size": "10MB",
        "backup_count": 3
    },
    "ui": {
        "theme": "dark",
        "progress_style": "bar",
        "show_details": true,
        "animation": true
    }
}
```

### Exemple de configuration minimale
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "terminal_id_start": 1000
}
```

## 🛠️ Outils de configuration

### Script de validation de la configuration
```python
def validate_config(config_path):
    """Valider la validité du fichier de configuration"""
    import json
    import jsonschema
    
    # Schéma de configuration
    schema = {
        "type": "object",
        "properties": {
            "fenix_db_path": {"type": "string"},
            "csv_file_path": {"type": "string"},
            "terminal_id_start": {"type": "integer", "minimum": 1, "maximum": 9999}
        },
        "required": ["fenix_db_path", "csv_file_path"]
    }
    
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        jsonschema.validate(config, schema)
        print("✅ Validation de la configuration réussie")
        return True
    except Exception as e:
        print(f"❌ Échec de la validation de la configuration : {e}")
        return False
```

### Générateur de configuration
```python
def generate_config_template():
    """Générer un modèle de configuration"""
    template = {
        "fenix_db_path": "Veuillez entrer le chemin de la base de données Fenix",
        "csv_file_path": "Veuillez entrer le chemin du fichier CSV", 
        "ifly_path": "auto_detect",
        "terminal_id_start": 1000,
        "coordinate_precision": 8
    }
    
    with open('config_template.json', 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)
    
    print("Modèle de configuration généré : config_template.json")
```

---

**Étape suivante**: Une fois la configuration terminée, veuillez consulter les [instructions d'utilisation](usage.md) pour commencer votre première conversion de données ! 🚀
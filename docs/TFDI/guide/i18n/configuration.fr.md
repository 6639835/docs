# ⚙️ Guide de configuration du convertisseur de données de navigation TFDI

Ce guide détaille les diverses options de configuration du convertisseur de données de navigation TFDI, vous aidant à optimiser le processus de conversion et les résultats de sortie en fonction de vos besoins.

## 🎯 Aperçu de la configuration

Le convertisseur TFDI utilise un système de configuration flexible, offrant :
- **📁 Configuration de la sortie** - Personnalisation du répertoire de sortie et du format des fichiers
- **📊 Paramètres de traitement des données** - Ajustement de la précision des coordonnées et du filtrage des données
- **⚡ Optimisation des performances** - Gestion de la mémoire et réglage de la vitesse de traitement
- **🔍 Options de validation** - Paramètres d'intégrité des données et de contrôle qualité

## 📋 Méthodes de configuration

### 1. Configuration par défaut (Recommandé pour les débutants)
```python
# Exécuter avec la configuration par défaut
python Fenix2TFDINavDataConverter.py
# Le convertisseur utilisera la configuration optimale prédéfinie
```

### 2. Configuration dans le code
```python
from dataclasses import dataclass

@dataclass
class ConverterConfig:
    """Classe de configuration du convertisseur"""
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs" 
    archive_name: str = "Primary.7z"
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
```

### 3. Configuration interactive
```python
# Configuration interactive lors de l'exécution du convertisseur
# L'utilisateur peut définir les paramètres clés pendant l'exécution
```

## 🔧 Options de configuration principales

### Configuration des chemins de sortie

#### Réglage du répertoire de sortie
**Nom du paramètre**: `output_dir`  
**Valeur par défaut**: `"Primary"`  
**Description**: Répertoire de sortie pour tous les fichiers JSON

**Exemple d'utilisation :**
```python
config = ConverterConfig(
    output_dir="TFDI_NavData",  # Nom du répertoire de sortie personnalisé
)
```

**Structure du répertoire :**
```
TFDI_NavData/           # Répertoire de sortie principal
├── Airports.json       # Données d'aéroports
├── Runways.json        # Données de pistes
├── Waypoints.json      # Données de waypoints
├── ...                 # Autres fichiers JSON
└── ProcedureLegs/      # Sous-répertoire des segments de procédure
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

#### Répertoire des segments de procédure
**Nom du paramètre**: `procedure_legs_dir`  
**Valeur par défaut**: `"Primary/ProcedureLegs"`  
**Description**: Répertoire de sortie pour les fichiers des segments de procédure terminale

**Exemple de configuration :**
```python
config = ConverterConfig(
    output_dir="NavData",
    procedure_legs_dir="NavData/Procedures",  # Répertoire des segments de procédure personnalisé
)
```

#### Nom de l'archive compressée
**Nom du paramètre**: `archive_name`  
**Valeur par défaut**: `"Primary.7z"`  
**Description**: Nom du fichier de l'archive compressée générée

**Conventions de nommage :**
```python
# Nommage incluant un horodatage
import datetime
now = datetime.datetime.now()
config = ConverterConfig(
    archive_name=f"TFDI_NavData_{now.strftime('%Y%m%d_%H%M')}.7z"
)

# Nommage incluant des informations de version
config = ConverterConfig(
    archive_name="TFDI_NavData_v1.0.7z"
)
```

### Configuration du traitement des données

#### Réglage de la précision des coordonnées
**Nom du paramètre**: `coordinate_precision`  
**Valeur par défaut**: `8`  
**Plage**: `4 - 12`  
**Description**: Nombre de décimales pour les coordonnées géographiques

**Tableau comparatif des précisions :**
| Précision   | Marge d'erreur     | Scénario applicable      | Impact sur la taille du fichier |
|-------------|--------------------|--------------------------|---------------------------------|
| 4 décimales | ~11 mètres         | Navigation de base       | Minimal                         |
| 6 décimales | ~1.1 mètre         | Navigation standard      | Faible                          |
| 8 décimales | ~1.1 centimètre    | Navigation haute précision | Par défaut                      |
| 10 décimales| ~1.1 millimètre    | Très haute précision     | Élevé                           |
| 12 décimales| ~0.1 millimètre    | Précision de niveau topographique | Maximal                         |

**Exemple de configuration :**
```python
# Configuration haute précision (recommandée)
config = ConverterConfig(coordinate_precision=8)

# Configuration équilibrée (taille de fichier réduite)
config = ConverterConfig(coordinate_precision=6)

# Configuration très haute précision (taille de fichier plus importante)
config = ConverterConfig(coordinate_precision=10)
```

#### Réglage du seuil VNAV
**Nom du paramètre**: `vnav_threshold`  
**Valeur par défaut**: `2.5`  
**Unité**: Degrés  
**Description**: Seuil d'angle VNAV pour la détection des points FAF

**Signification du seuil :**
```python
# Détection FAF stricte (moins de points FAF, mais plus précis)
config = ConverterConfig(vnav_threshold=2.0)

# Détection FAF standard (équilibre entre précision et couverture)
config = ConverterConfig(vnav_threshold=2.5)

# Détection FAF souple (plus de points FAF, peut inclure des faux positifs)
config = ConverterConfig(vnav_threshold=3.0)
```

**Logique de détection FAF :**
```python
def is_faf_point(vnav_angle: float, vnav_threshold: float) -> bool:
    """Détermine si un point est un FAF"""
    return (vnav_angle is not None and 
            vnav_angle <= vnav_threshold and 
            vnav_angle > 0)
```

## 🚀 Configuration des performances

### Optimisation de la base de données SQLite

#### Paramètres de connexion à la base de données
```python
# Configuration d'optimisation des performances SQLite
sqlite_pragmas = {
    "journal_mode": "WAL",          # Mode journalisation avant écriture
    "synchronous": "NORMAL",        # Équilibre entre performance et sécurité
    "cache_size": "10000",          # Nombre de pages en cache (environ 40 Mo)
    "temp_store": "MEMORY",         # Stockage des données temporaires en mémoire
    "mmap_size": "268435456",       # Taille de la mémoire mappée (256 Mo)
}

def optimize_database_connection(conn):
    """Optimise la connexion à la base de données"""
    for pragma, value in sqlite_pragmas.items():
        conn.execute(f"PRAGMA {pragma}={value}")
```

#### Paramètres de traitement par lots
**Paramètre**: Taille du lot  
**Valeur par défaut**: `1000`  
**Description**: Nombre d'enregistrements traités en une seule fois

**Stratégie de configuration :**
```python
import psutil

def get_optimal_batch_size():
    """Ajuste automatiquement la taille du lot en fonction de la mémoire système"""
    available_memory_gb = psutil.virtual_memory().available / (1024**3)
    
    if available_memory_gb < 4:
        return 500      # Système à faible mémoire
    elif available_memory_gb < 8:
        return 1000     # Configuration standard
    else:
        return 2000     # Système à haute mémoire

# Exemple d'utilisation
batch_size = get_optimal_batch_size()
```

### Configuration de la gestion de la mémoire

#### Paramètres de surveillance de la mémoire
```python
class MemoryMonitor:
    """Configuration de la surveillance de la mémoire"""
    
    def __init__(self):
        self.memory_limit_gb = 6        # Limite d'utilisation de la mémoire
        self.warning_threshold = 0.8    # Seuil d'avertissement (80%)
        self.critical_threshold = 0.9   # Seuil critique (90%)
    
    def check_memory_usage(self):
        """Vérifie l'utilisation de la mémoire"""
        memory = psutil.virtual_memory()
        usage_ratio = memory.used / memory.total
        
        if usage_ratio > self.critical_threshold:
            return "CRITICAL"
        elif usage_ratio > self.warning_threshold:
            return "WARNING"
        else:
            return "NORMAL"
```

#### Configuration du ramasse-miettes
```python
import gc

def configure_garbage_collection():
    """Configure le ramasse-miettes"""
    # Définit les seuils du ramasse-miettes
    gc.set_threshold(700, 10, 10)
    
    # Active le débogage du ramasse-miettes (à utiliser uniquement lors du débogage)
    # gc.set_debug(gc.DEBUG_STATS)

def force_cleanup():
    """Force le nettoyage de la mémoire"""
    gc.collect()
    gc.collect()  # Exécuter deux fois pour assurer un nettoyage complet
    gc.collect()
```

## 🔍 Validation et contrôle qualité

### Configuration de la validation des données

#### Réglage du niveau de validation
```python
class ValidationConfig:
    """Configuration de la validation des données"""
    
    def __init__(self, level="standard"):
        self.level = level
        self.checks = self._get_checks_for_level(level)
    
    def _get_checks_for_level(self, level):
        """Obtient les éléments de vérification en fonction du niveau"""
        base_checks = [
            "file_exists",
            "database_format", 
            "required_tables"
        ]
        
        if level == "basic":
            return base_checks
        
        elif level == "standard":
            return base_checks + [
                "coordinate_ranges",
                "data_types",
                "foreign_keys"
            ]
        
        elif level == "strict":
            return base_checks + [
                "coordinate_ranges",
                "data_types", 
                "foreign_keys",
                "data_consistency",
                "duplicate_detection",
                "business_rules"
            ]
```

#### Configuration de la validation des coordonnées
```python
class CoordinateValidator:
    """Configuration de la validation des coordonnées"""
    
    def __init__(self):
        # Plage de coordonnées valides
        self.lat_min = -90.0
        self.lat_max = 90.0
        self.lon_min = -180.0
        self.lon_max = 180.0
        
        # Plage de coordonnées suspectes (peut s'agir de données erronées)
        self.suspicious_zones = [
            {"lat": (0, 0), "lon": (0, 0)},      # Les coordonnées à l'origine peuvent être erronées
            {"lat": (90, 90), "lon": (0, 0)},    # Les coordonnées polaires nécessitent une vérification spéciale
        ]
    
    def validate_coordinate(self, lat, lon):
        """Valide une seule coordonnée"""
        # Vérifie la plage de base
        if not (self.lat_min <= lat <= self.lat_max):
            return False, f"Latitude hors plage: {lat}"
        
        if not (self.lon_min <= lon <= self.lon_max):
            return False, f"Longitude hors plage: {lon}"
        
        # Vérifie les coordonnées suspectes
        for zone in self.suspicious_zones:
            if (zone["lat"][0] <= lat <= zone["lat"][1] and 
                zone["lon"][0] <= lon <= zone["lon"][1]):
                return True, f"Coordonnée suspecte: ({lat}, {lon})"
        
        return True, "Coordonnée valide"
```

### Contrôle qualité de la sortie

#### Validation du format des fichiers
```python
import json

class OutputValidator:
    """Configuration de la validation des fichiers de sortie"""
    
    def __init__(self):
        self.required_files = [
            "Airports.json",
            "Runways.json", 
            "Waypoints.json",
            "Navaids.json",
            "Airways.json",
            "AirwayLegs.json",
            "Terminals.json",
            "ILSes.json"
        ]
        
        self.min_file_sizes = {
            "Airports.json": 1024,      # Au moins 1 Ko
            "Waypoints.json": 10240,    # Au moins 10 Ko
        }
    
    def validate_json_file(self, file_path):
        """Valide le format du fichier JSON"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, (dict, list)):
                return False, "L'objet racine JSON doit être un dictionnaire ou une liste"
            
            if isinstance(data, dict) and len(data) == 0:
                return False, "L'objet JSON est vide"
            
            return True, "Format JSON valide"
            
        except json.JSONDecodeError as e:
            return False, f"Erreur de format JSON: {e}"
        except Exception as e:
            return False, f"Erreur de lecture du fichier: {e}"
```

## 🎛️ Configuration avancée

### Configuration des journaux

#### Niveau et format des journaux
```python
import logging
from rich.logging import RichHandler

class LoggingConfig:
    """Classe de configuration des journaux"""
    
    def __init__(self, level="INFO"):
        self.level = level
        self.format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        self.file_name = "tfdi_converter.log"
        self.max_file_size = 10 * 1024 * 1024  # 10 Mo
        self.backup_count = 3
    
    def setup_logging(self):
        """Configure le système de journalisation"""
        # Crée le logger
        logger = logging.getLogger("TFDIConverter")
        logger.setLevel(getattr(logging, self.level))
        
        # Gestionnaire de console Rich
        console_handler = RichHandler(rich_tracebacks=True)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter("%(message)s")
        console_handler.setFormatter(console_formatter)
        
        # Gestionnaire de fichiers
        from logging.handlers import RotatingFileHandler
        file_handler = RotatingFileHandler(
            self.file_name, 
            maxBytes=self.max_file_size,
            backupCount=self.backup_count,
            encoding='utf-8'
        )
        file_handler.setLevel(logging.DEBUG)
        file_formatter = logging.Formatter(self.format)
        file_handler.setFormatter(file_formatter)
        
        # Ajoute les gestionnaires
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)
        
        return logger
```

### Configuration de la compression

#### Réglage du niveau de compression
```python
import py7zr

class CompressionConfig:
    """Classe de configuration de la compression"""
    
    def __init__(self):
        self.compression_level = 5      # Niveau de compression (1-9)
        self.method = "LZMA2"          # Algorithme de compression
        self.solid = True              # Compression solide
        self.multi_threading = True    # Compression multi-thread
    
    def create_archive(self, source_dir, archive_path):
        """Crée une archive compressée"""
        filters = [
            {"id": py7zr.FILTER_LZMA2, "preset": self.compression_level}
        ]
        
        with py7zr.SevenZipFile(
            archive_path, 
            'w', 
            filters=filters,
            mp=self.multi_threading
        ) as archive:
            archive.writeall(source_dir, ".")
```

### Configuration de débogage

#### Réglage du mode de débogage
```python
class DebugConfig:
    """Classe de configuration de débogage"""
    
    def __init__(self, debug_mode=False):
        self.debug_mode = debug_mode
        self.save_intermediate_files = debug_mode
        self.verbose_logging = debug_mode
        self.performance_profiling = debug_mode
        self.memory_tracking = debug_mode
    
    def enable_debug_features(self):
        """Active les fonctionnalités de débogage"""
        if self.debug_mode:
            # Active la journalisation détaillée
            logging.getLogger().setLevel(logging.DEBUG)
            
            # Active le profilage des performances
            if self.performance_profiling:
                import cProfile
                self.profiler = cProfile.Profile()
                self.profiler.enable()
            
            # Active le suivi de la mémoire
            if self.memory_tracking:
                import tracemalloc
                tracemalloc.start()
```

## 📝 Exemples de configuration complète

### Exemple de configuration de base
```python
# Configuration simple pour les débutants
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8,
    vnav_threshold=2.5
)
```

### Exemple de configuration haute performance
```python
# Configuration optimisée pour le matériel haut de gamme
config = ConverterConfig(
    output_dir="Primary_HighPerf",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# Associée aux paramètres d'optimisation des performances
batch_size = 2000
memory_limit_gb = 8
enable_multi_threading = True
```

### Exemple de configuration haute qualité
```python
# Adaptée aux scénarios exigeant une qualité de données très élevée
config = ConverterConfig(
    output_dir="Primary_HighQuality", 
    coordinate_precision=10,        # Plus haute précision
    vnav_threshold=2.0             # Détection FAF plus stricte
)

# Associée à une validation stricte
validation_level = "strict"
enable_duplicate_detection = True
enable_consistency_check = True
```

### Exemple de configuration de débogage
```python
# Configuration pour le développement et le débogage
config = ConverterConfig(
    output_dir="Debug_Output",
    coordinate_precision=6,         # Réduction de la précision pour accélérer le traitement
    vnav_threshold=3.0             # Seuil plus souple pour faciliter le débogage
)

# Options de débogage
debug_config = DebugConfig(debug_mode=True)
save_intermediate_files = True
verbose_logging = True
```

## 🔧 Gestion des fichiers de configuration

### Format du fichier de configuration
```python
# config.py
from dataclasses import dataclass, asdict
import json

@dataclass 
class TFDIConverterConfig:
    """Configuration complète du convertisseur TFDI"""
    # Configuration de la sortie
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs"
    archive_name: str = "Primary.7z"
    
    # Configuration du traitement des données
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
    
    # Configuration des performances
    batch_size: int = 1000
    memory_limit_gb: int = 6
    
    # Configuration de la validation
    validation_level: str = "standard"
    enable_coordinate_check: bool = True
    
    # Configuration des journaux
    log_level: str = "INFO"
    log_file: str = "tfdi_converter.log"
    
    def save_to_file(self, file_path: str):
        """Enregistre la configuration dans un fichier"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(asdict(self), f, indent=2)
    
    @classmethod
    def load_from_file(cls, file_path: str):
        """Charge la configuration depuis un fichier"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls(**data)
```

### Modèles de configuration
```python
# Crée des modèles de configuration
def create_config_templates():
    """Crée divers modèles de configuration"""
    
    # Configuration par défaut
    default_config = TFDIConverterConfig()
    default_config.save_to_file("config_default.json")
    
    # Configuration haute performance
    performance_config = TFDIConverterConfig(
        batch_size=2000,
        memory_limit_gb=8,
        coordinate_precision=6
    )
    performance_config.save_to_file("config_performance.json")
    
    # Configuration haute qualité
    quality_config = TFDIConverterConfig(
        coordinate_precision=10,
        vnav_threshold=2.0,
        validation_level="strict"
    )
    quality_config.save_to_file("config_quality.json")

# Utiliser la configuration
config = TFDIConverterConfig.load_from_file("config_performance.json")
```

---

**Étape suivante** : Une fois la configuration terminée, veuillez consulter [les instructions d'utilisation](usage.md) pour démarrer votre conversion de données TFDI ! 🚁✨
# ⚙️ TFDI Navigationsdatenkonverter Konfigurationsleitfaden

Dieser Leitfaden beschreibt detailliert die verschiedenen Konfigurationsoptionen des TFDI Navigationsdatenkonverters, um Ihnen zu helfen, den Konvertierungsprozess und die Ausgabenergebnisse entsprechend Ihren Anforderungen zu optimieren.

## 🎯 Konfigurationsübersicht

Der TFDI Konverter verwendet ein flexibles Konfigurationssystem, das Folgendes unterstützt:
- **📁 Ausgabekonfiguration** – Benutzerdefinierte Ausgabeordner und Dateiformate
- **📊 Datenverarbeitungsparameter** – Anpassung der Koordinatengenauigkeit und Datenfilterung
- **⚡ Leistungsoptimierung** – Speicherverwaltung und Feinabstimmung der Verarbeitungsgeschwindigkeit
- **🔍 Validierungsoptionen** – Einstellungen für Datenintegrität und Qualitätskontrolle

## 📋 Konfigurationsmethoden

### 1. Standardkonfiguration (Empfohlen für Anfänger)
```python
# Mit Standardkonfiguration ausführen
python Fenix2TFDINavDataConverter.py
# Der Konverter verwendet die voreingestellte optimale Konfiguration
```

### 2. In-Code-Konfiguration
```python
from dataclasses import dataclass

@dataclass
class ConverterConfig:
    """Konverter-Konfigurationsklasse"""
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs" 
    archive_name: str = "Primary.7z"
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
```

### 3. Interaktive Konfiguration
```python
# Interaktive Konfiguration während der Ausführung des Konverters
# Benutzer können während des Prozesses wichtige Parameter festlegen
```

## 🔧 Kernkonfigurationsoptionen

### Ausgabepfadkonfiguration

#### Einstellung des Ausgabeverzeichnisses
**Parametername**: `output_dir`  
**Standardwert**: `"Primary"`  
**Beschreibung**: Ausgabeverzeichnis für alle JSON-Dateien

**Anwendungsbeispiel:**
```python
config = ConverterConfig(
    output_dir="TFDI_NavData",  # Benutzerdefinierter Name des Ausgabeverzeichnisses
)
```

**Verzeichnisstruktur:**
```
TFDI_NavData/           # Hauptausgabeverzeichnis
├── Airports.json       # Flughafendaten
├── Runways.json        # Landebahndaten
├── Waypoints.json      # Wegpunktdaten
├── ...                 # Weitere JSON-Dateien
└── ProcedureLegs/      # Unterverzeichnis für Prozedursegmente
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

#### Verzeichnis für Prozedursegmente
**Parametername**: `procedure_legs_dir`  
**Standardwert**: `"Primary/ProcedureLegs"`  
**Beschreibung**: Ausgabeverzeichnis für Terminal-Prozedursegmentdateien

**Konfigurationsbeispiel:**
```python
config = ConverterConfig(
    output_dir="NavData",
    procedure_legs_dir="NavData/Procedures",  # Benutzerdefiniertes Verzeichnis für Prozedursegmente
)
```

#### Name des Kompressionsarchivs
**Parametername**: `archive_name`  
**Standardwert**: `"Primary.7z"`  
**Beschreibung**: Dateiname des schließlich generierten Kompressionsarchivs

**Namenskonventionen:**
```python
# Benennung mit Zeitstempel
import datetime
now = datetime.datetime.now()
config = ConverterConfig(
    archive_name=f"TFDI_NavData_{now.strftime('%Y%m%d_%H%M')}.7z"
)

# Benennung mit Versionsinformationen
config = ConverterConfig(
    archive_name="TFDI_NavData_v1.0.7z"
)
```

### Datenverarbeitungskonfiguration

#### Einstellung der Koordinatengenauigkeit
**Parametername**: `coordinate_precision`  
**Standardwert**: `8`  
**Bereich**: `4 - 12`  
**Beschreibung**: Anzahl der Dezimalstellen für geografische Koordinaten

**Vergleichstabelle der Genauigkeit:**
| Genauigkeit | Fehlerbereich | Anwendungsbereich | Einfluss auf die Dateigröße |
|------|----------|----------|--------------|
| 4 位 | ~11 Meter | Basisnavigation | Minimal |
| 6 位 | ~1.1 Meter | Standardnavigation | Klein |
| 8 位 | ~1.1 Zentimeter | Hochpräzisionsnavigation | Standard |
| 10 位 | ~1.1 Millimeter | Extrem hohe Genauigkeit | Groß |
| 12 位 | ~0.1 Millimeter | Vermessungsgenauigkeit | Maximal |

**Konfigurationsbeispiel:**
```python
# Hochpräzisionskonfiguration (Empfohlen)
config = ConverterConfig(coordinate_precision=8)

# Ausgewogene Konfiguration (Kleinere Dateien)
config = ConverterConfig(coordinate_precision=6)

# Extrem hochpräzise Konfiguration (Größere Dateien)
config = ConverterConfig(coordinate_precision=10)
```

#### Einstellung des VNAV-Schwellenwerts
**Parametername**: `vnav_threshold`  
**Standardwert**: `2.5`  
**Einheit**: Grad  
**Beschreibung**: VNAV-Winkelschwellenwert für die FAF-Punkterkennung

**Bedeutung des Schwellenwerts:**
```python
# Strenge FAF-Erkennung (weniger, aber genauere FAF-Punkte)
config = ConverterConfig(vnav_threshold=2.0)

# Standard-FAF-Erkennung (Ausgleich von Genauigkeit und Abdeckung)
config = ConverterConfig(vnav_threshold=2.5)

# Lockere FAF-Erkennung (mehr FAF-Punkte, möglicherweise mit Fehlern)
config = ConverterConfig(vnav_threshold=3.0)
```

**FAF-Erkennungslogik:**
```python
def is_faf_point(vnav_angle: float, vnav_threshold: float) -> bool:
    """Prüft, ob es sich um einen FAF-Punkt handelt"""
    return (vnav_angle is not None and 
            vnav_angle <= vnav_threshold and 
            vnav_angle > 0)
```

## 🚀 Leistungskonfiguration

### SQLite-Datenbankoptimierung

#### Datenbankverbindungseinstellungen
```python
# SQLite Leistungsoptimierungskonfiguration
sqlite_pragmas = {
    "journal_mode": "WAL",          # Write-Ahead Logging-Modus
    "synchronous": "NORMAL",        # Ausgleich von Leistung und Sicherheit
    "cache_size": "10000",          # Anzahl der Cache-Seiten (ca. 40 MB)
    "temp_store": "MEMORY",         # Temporäre Daten im Speicher speichern
    "mmap_size": "268435456",       # Größe der Speicherzuordnung (256 MB)
}

def optimize_database_connection(conn):
    """Datenbankverbindung optimieren"""
    for pragma, value in sqlite_pragmas.items():
        conn.execute(f"PRAGMA {pragma}={value}")
```

#### Stapelverarbeitungseinstellungen
**Parameter**: Stapelgröße  
**Standardwert**: `1000`  
**Beschreibung**: Anzahl der in einem Durchgang verarbeiteten Datensätze

**Konfigurationsstrategie:**
```python
import psutil

def get_optimal_batch_size():
    """Stapelgröße automatisch an den Systemspeicher anpassen"""
    available_memory_gb = psutil.virtual_memory().available / (1024**3)
    
    if available_memory_gb < 4:
        return 500      # Systeme mit wenig Speicher
    elif available_memory_gb < 8:
        return 1000     # Standardkonfiguration
    else:
        return 2000     # Systeme mit viel Speicher

# Anwendungsbeispiel
batch_size = get_optimal_batch_size()
```

### Speicherverwaltungskonfiguration

#### Speicherüberwachungseinstellungen
```python
class MemoryMonitor:
    """Speicherüberwachungskonfiguration"""
    
    def __init__(self):
        self.memory_limit_gb = 6        # Speicherverbrauchslimit
        self.warning_threshold = 0.8    # Warnschwelle (80%)
        self.critical_threshold = 0.9   # Kritische Schwelle (90%)
    
    def check_memory_usage(self):
        """Speicherverbrauch prüfen"""
        memory = psutil.virtual_memory()
        usage_ratio = memory.used / memory.total
        
        if usage_ratio > self.critical_threshold:
            return "CRITICAL"
        elif usage_ratio > self.warning_threshold:
            return "WARNING"
        else:
            return "NORMAL"
```

#### Garbage Collection-Konfiguration
```python
import gc

def configure_garbage_collection():
    """Garbage Collection konfigurieren"""
    # Garbage Collection-Schwellenwerte festlegen
    gc.set_threshold(700, 10, 10)
    
    # Garbage Collection-Debugging aktivieren (nur für Debugging)
    # gc.set_debug(gc.DEBUG_STATS)

def force_cleanup():
    """Speicherbereinigung erzwingen"""
    gc.collect()
    gc.collect()  # Zweimal ausführen, um eine gründliche Bereinigung zu gewährleisten
    gc.collect()
```

## 🔍 Validierung und Qualitätskontrolle

### Datenvalidierungskonfiguration

#### Einstellung der Validierungsstufe
```python
class ValidationConfig:
    """Datenvalidierungskonfiguration"""
    
    def __init__(self, level="standard"):
        self.level = level
        self.checks = self._get_checks_for_level(level)
    
    def _get_checks_for_level(self, level):
        """Prüfpunkte basierend auf der Stufe abrufen"""
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

#### Koordinatenvalidierungskonfiguration
```python
class CoordinateValidator:
    """Koordinatenvalidierungskonfiguration"""
    
    def __init__(self):
        # Gültiger Koordinatenbereich
        self.lat_min = -90.0
        self.lat_max = 90.0
        self.lon_min = -180.0
        self.lon_max = 180.0
        
        # Verdächtiger Koordinatenbereich (möglicherweise fehlerhafte Daten)
        self.suspicious_zones = [
            {"lat": (0, 0), "lon": (0, 0)},      # Nullkoordinaten könnten fehlerhaft sein
            {"lat": (90, 90), "lon": (0, 0)},    # Polarkoordinaten erfordern eine besondere Prüfung
        ]
    
    def validate_coordinate(self, lat, lon):
        """Einzelne Koordinate validieren"""
        # Grundbereich prüfen
        if not (self.lat_min <= lat <= self.lat_max):
            return False, f"Breitengrad außerhalb des Bereichs: {lat}"
        
        if not (self.lon_min <= lon <= self.lon_max):
            return False, f"Längengrad außerhalb des Bereichs: {lon}"
        
        # Verdächtige Koordinaten prüfen
        for zone in self.suspicious_zones:
            if (zone["lat"][0] <= lat <= zone["lat"][1] and 
                zone["lon"][0] <= lon <= zone["lon"][1]):
                return True, f"Verdächtige Koordinate: ({lat}, {lon})"
        
        return True, "Koordinate ist gültig"
```

### Ausgabequalitätskontrolle

#### Dateiformatvalidierung
```python
import json

class OutputValidator:
    """Konfiguration der Ausgabedateivalidierung"""
    
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
            "Airports.json": 1024,      # Mindestens 1 KB
            "Waypoints.json": 10240,    # Mindestens 10 KB
        }
    
    def validate_json_file(self, file_path):
        """JSON-Dateiformat validieren"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, (dict, list)):
                return False, "JSON-Root-Objekt muss ein Dictionary oder eine Liste sein"
            
            if isinstance(data, dict) and len(data) == 0:
                return False, "JSON-Objekt ist leer"
            
            return True, "JSON-Format ist gültig"
            
        except json.JSONDecodeError as e:
            return False, f"JSON-Formatfehler: {e}"
        except Exception as e:
            return False, f"Dateilesefehler: {e}"
```

## 🎛️ Erweiterte Konfiguration

### Protokollierungskonfiguration

#### Protokollierungsstufe und -format
```python
import logging
from rich.logging import RichHandler

class LoggingConfig:
    """Protokollierungskonfigurationsklasse"""
    
    def __init__(self, level="INFO"):
        self.level = level
        self.format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        self.file_name = "tfdi_converter.log"
        self.max_file_size = 10 * 1024 * 1024  # 10MB
        self.backup_count = 3
    
    def setup_logging(self):
        """Protokollierungssystem einrichten"""
        # Logger erstellen
        logger = logging.getLogger("TFDIConverter")
        logger.setLevel(getattr(logging, self.level))
        
        # Rich-Konsolen-Handler
        console_handler = RichHandler(rich_tracebacks=True)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter("%(message)s")
        console_handler.setFormatter(console_formatter)
        
        # Dateihandler
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
        
        # Handler hinzufügen
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)
        
        return logger
```

### Kompressionskonfiguration

#### Einstellung der Kompressionsstufe
```python
import py7zr

class CompressionConfig:
    """Kompressionskonfigurationsklasse"""
    
    def __init__(self):
        self.compression_level = 5      # Kompressionsstufe (1-9)
        self.method = "LZMA2"          # Kompressionsalgorithmus
        self.solid = True              # Solide Kompression
        self.multi_threading = True    # Multithread-Kompression
    
    def create_archive(self, source_dir, archive_path):
        """Archiv erstellen"""
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

### Debugging-Konfiguration

#### Einstellung des Debug-Modus
```python
class DebugConfig:
    """Debugging-Konfigurationsklasse"""
    
    def __init__(self, debug_mode=False):
        self.debug_mode = debug_mode
        self.save_intermediate_files = debug_mode
        self.verbose_logging = debug_mode
        self.performance_profiling = debug_mode
        self.memory_tracking = debug_mode
    
    def enable_debug_features(self):
        """Debugging-Funktionen aktivieren"""
        if self.debug_mode:
            # Detaillierte Protokollierung aktivieren
            logging.getLogger().setLevel(logging.DEBUG)
            
            # Leistungsanalyse aktivieren
            if self.performance_profiling:
                import cProfile
                self.profiler = cProfile.Profile()
                self.profiler.enable()
            
            # Speicherverfolgung aktivieren
            if self.memory_tracking:
                import tracemalloc
                tracemalloc.start()
```

## 📝 Vollständige Konfigurationsbeispiele

### Grundlegendes Konfigurationsbeispiel
```python
# Einfache Konfiguration für Anfänger
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8,
    vnav_threshold=2.5
)
```

### Hochleistungs-Konfigurationsbeispiel
```python
# Leistungsoptimierte Konfiguration für High-End-Hardware
config = ConverterConfig(
    output_dir="Primary_HighPerf",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# In Verbindung mit Leistungsoptimierungseinstellungen
batch_size = 2000
memory_limit_gb = 8
enable_multi_threading = True
```

### Hochqualitatives Konfigurationsbeispiel
```python
# Geeignet für Szenarien mit extrem hohen Anforderungen an die Datenqualität
config = ConverterConfig(
    output_dir="Primary_HighQuality", 
    coordinate_precision=10,        # Höhere Genauigkeit
    vnav_threshold=2.0             # Strengere FAF-Erkennung
)

# In Verbindung mit strenger Validierung
validation_level = "strict"
enable_duplicate_detection = True
enable_consistency_check = True
```

### Debugging-Konfigurationsbeispiel
```python
# Konfiguration für Entwicklung und Debugging
config = ConverterConfig(
    output_dir="Debug_Output",
    coordinate_precision=6,         # Reduzierte Genauigkeit zur Beschleunigung der Verarbeitung
    vnav_threshold=3.0             # Lockere Schwelle zur Erleichterung des Debuggings
)

# Debugging-Optionen
debug_config = DebugConfig(debug_mode=True)
save_intermediate_files = True
verbose_logging = True
```

## 🔧 Konfigurationsdateiverwaltung

### Konfigurationsdateiformat
```python
# config.py
from dataclasses import dataclass, asdict
import json

@dataclass 
class TFDIConverterConfig:
    """TFDI Konverter vollständige Konfiguration"""
    # Ausgabekonfiguration
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs"
    archive_name: str = "Primary.7z"
    
    # Datenverarbeitungskonfiguration
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
    
    # Leistungskonfiguration
    batch_size: int = 1000
    memory_limit_gb: int = 6
    
    # Validierungskonfiguration
    validation_level: str = "standard"
    enable_coordinate_check: bool = True
    
    # Protokollierungskonfiguration
    log_level: str = "INFO"
    log_file: str = "tfdi_converter.log"
    
    def save_to_file(self, file_path: str):
        """Konfiguration in Datei speichern"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(asdict(self), f, indent=2)
    
    @classmethod
    def load_from_file(cls, file_path: str):
        """Konfiguration aus Datei laden"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls(**data)
```

### Konfigurationsvorlagen
```python
# Konfigurationsvorlagen erstellen
def create_config_templates():
    """Verschiedene Konfigurationsvorlagen erstellen"""
    
    # Standardkonfiguration
    default_config = TFDIConverterConfig()
    default_config.save_to_file("config_default.json")
    
    # Hochleistungskonfiguration
    performance_config = TFDIConverterConfig(
        batch_size=2000,
        memory_limit_gb=8,
        coordinate_precision=6
    )
    performance_config.save_to_file("config_performance.json")
    
    # Hochqualitative Konfiguration
    quality_config = TFDIConverterConfig(
        coordinate_precision=10,
        vnav_threshold=2.0,
        validation_level="strict"
    )
    quality_config.save_to_file("config_quality.json")

# Konfiguration verwenden
config = TFDIConverterConfig.load_from_file("config_performance.json")
```

---

**Nächster Schritt**: Nach Abschluss der Konfiguration lesen Sie bitte die [Nutzungshinweise](usage.md), um Ihre TFDI-Datenkonvertierung zu starten! 🚁✨
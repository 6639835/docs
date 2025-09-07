# Konfigurationsbeschreibung

Dieses Dokument beschreibt detailliert die Konfigurationsoptionen und Parametereinstellungen der einzelnen Nav-data-Module.

## 📋 Konfigurationsdateien – Übersicht

### Hauptkonfigurationsdateien
```
config/
├── main.conf           # Hauptkonfigurationsdatei
├── airway.conf         # Konfiguration der Flugwegverarbeitung
├── pdf_extract.conf    # Konfiguration der PDF-Extraktion
├── terminal.conf       # Konfiguration des Terminal-Programms
└── paths.conf          # Pfadkonfiguration
```

### Umgebungsvariablen-Konfiguration
```bash
# .env-Datei Beispiel
NAV_DATA_HOME=/path/to/nav-data
XPLANE_PATH=/path/to/X-Plane
LOG_LEVEL=INFO
```

## 🛣️ Flugwegmodul-Konfiguration (Airway)

### Konfigurationsdatei: `config/airway.conf`

```ini
[General]
# Detaillierte Protokollierung aktivieren
verbose_logging = true

# Fortschrittsbalken anzeigen
show_progress = true

# Batch-Größe
batch_size = 1000

[Input]
# CSV-Eingabedateipfad
csv_file = RTE_SEG.csv

# X-Plane Referenzdatendateien
earth_fix_file = earth_fix.dat
earth_nav_file = earth_nav.dat
earth_awy_file = earth_awy.dat

[Output]
# Ausgabedatei-Kodierung
output_encoding = utf-8

# Originaldateien sichern
create_backup = true

# Backup-Dateisuffix
backup_suffix = .backup

[Filtering]
# Ausgeschlossene Luftraumcodes (durch Komma getrennt)
excluded_areas = ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU

# Minimale Flugwegsegmentlänge (Seemeilen)
min_segment_length = 0.1

# Maximale Flugwegsegmentlänge (Seemeilen)
max_segment_length = 999.9

[Validation]
# Datenvalidierung aktivieren
enable_validation = true

# Navigationspunkt-Toleranz (Grad)
coordinate_tolerance = 0.001

# Gebietscode-Validierung
validate_area_codes = true

[AIRAC]
# AIRAC-Zyklus automatisch berechnen
auto_calculate_cycle = true

# AIRAC-Zyklus manuell festlegen (Format: JJMM)
manual_cycle = 

# AIRAC Referenzdatum (ISO-Format)
reference_date = 2025-01-23

# Referenzzyklus
reference_cycle = 2501
```

### Konfigurationsoptionen im Code

#### Konfiguration des Hauptskripts zur Flugwegverarbeitung
```python
# Airway/airway.py Konfigurationsbeispiel

# Codes für chinesischen Luftraum – Konfiguration
CHINA_AREAS = {
    'ZB',  # Peking FIR
    'ZG',  # Guangzhou FIR
    'ZY',  # Shenyang FIR
    'ZS',  # Shanghai FIR
    'ZW',  # Urumqi FIR
    'ZJ',  # Sanya FIR
    'ZP',  # Lanzhou FIR
    'ZL',  # Kunming FIR
    'ZH',  # Wuhan FIR
    'ZU'   # Chengdu FIR
}

# Dateipfadkonfiguration
FILE_PATHS = {
    'csv_input': 'RTE_SEG.csv',
    'earth_fix': 'earth_fix.dat',
    'earth_nav': 'earth_nav.dat',
    'earth_awy': 'earth_awy.dat'
}

# Navigationspunkt-Typzuordnung
NAVIGATION_TYPES = {
    'DESIGNATED_POINT': {'code': 'DESIGNATED_POINT', 'type_code': '11'},
    'VORDME': {'code': 'VORDME', 'type_code': '3'},
    'NDB': {'code': 'NDB', 'type_code': '2'}
}
```

## 📄 Konfiguration des PDF-Extraktionsmoduls

### Konfigurationsdatei: `config/pdf_extract.conf`

```ini
[General]
# Verarbeitungsmodus: auto (automatisch), manual (manuell)
processing_mode = auto

# Ausgabeformat: txt, json, csv
output_format = txt

# Zeichenkodierung
encoding = utf-8

[PDF_Processing]
# PDF-Analyse-Engine: pdfplumber, pypdf2
pdf_engine = pdfplumber

# Seitenbeschnittränder (Pixel)
crop_margin_top = 50
crop_margin_bottom = 50
crop_margin_left = 30
crop_margin_right = 30

# Textextraktions-Schwellenwert
text_confidence_threshold = 0.8

# Linienerkennungs-Schwellenwert
line_detection_threshold = 5

[Coordinate_Extraction]
# Koordinatenformat-Validierung
coordinate_format_strict = true

# Koordinatengenauigkeit (Dezimalstellen)
coordinate_precision = 8

# Koordinatenbereichsvalidierung (Region China)
latitude_min = 15.0
latitude_max = 55.0
longitude_min = 70.0
longitude_max = 140.0

[Error_Handling]
# Bei Fehlern weiterverarbeiten
continue_on_error = true

# Fehlerprotokoll-Detaillierungsgrad
error_detail_level = high

# Häufige Fehler automatisch beheben
auto_fix_common_errors = true

[Output]
# Ausgabedatei-Benennungsmuster
# Variablen: {airport}, {type}, {timestamp}
filename_pattern = {airport}_{type}.txt

# Ausgabeverzeichnisse erstellen
create_output_dirs = true

# Bestehende Dateien überschreiben
overwrite_existing = false
```

### Code-Konfigurationsbeispiel

#### PDF-Verarbeitungskonfiguration
```python
# PDF extract/utils.py Konfiguration

# Wegpunktkategoriedefinition
WAYPOINT_CATEGORIES = {
    'ENRT': 1,      # Wegpunkt
    'VHF': 2,       # VHF-Navigationsfunkfeuer
    'NDB': 3,       # NDB-Navigationsfunkfeuer
    'TERMINAL': 4   # Terminalbereichs-Wegpunkt
}

# Koordinatenverarbeitungsgenauigkeit
COORDINATE_PRECISION = 8

# Gebietscode-Umwandlungstabelle
AREA_CODE_TRANSLATION = {
    'KA': 'K1'  # Spezielle Gebietscode-Umwandlung
}

# Fehlermeldungs-Farbkonfiguration (mit colorama)
COLOR_CONFIG = {
    'error': Fore.RED,
    'warning': Fore.YELLOW,
    'info': Fore.GREEN,
    'debug': Fore.CYAN
}
```

#### Koordinatenextraktions-Konfiguration
```python
# PDF extract/waypoint_1_pdf.py Konfiguration

# Seitenverarbeitungseinstellungen
PAGE_PROCESSING = {
    'enable_text_lines': True,
    'debug_output': False,
    'max_lines_per_page': 1000
}

# Koordinatenberechnungseinstellungen
COORDINATE_CALCULATION = {
    'precision_digits': 8,
    'handle_number_prefix': True,
    'auto_format_detection': True
}

# Zeichenverarbeitungseinstellungen
CHARACTER_PROCESSING = {
    'degree_symbol_replacement': '°',
    'minute_symbol_replacement': "'",
    'second_symbol_replacement': '"',
    'special_char_mapping': {"¡ã": '°'}
}
```

## 🔧 Terminalprogramm-Konfiguration (Terminal Patch)

### Konfigurationsdatei: `config/terminal.conf`

```ini
[Encoder]
# Standard-Eingabepfad
default_input_path = PDF extract/public

# Standard-Ausgabepfad
default_output_path = PDF extract/output

# Dateikodierung
file_encoding = utf-8

# Kodierungsvalidierung aktivieren
enable_encoding_validation = true

[Processing_Rules]
# IF-Punkt-Erkennungsregeln
if_point_markers = c

# Kodierungsregeln
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
# Unterstützte Flughafen-Code-Präfixe
supported_airport_prefixes = ZB,ZG,ZL,ZU,ZW,ZY,ZJ,ZS,ZH,ZP

# Dateikodierungs-Erkennung
auto_detect_encoding = true

# Kodierungs-Reparaturregeln
fix_rules = {
    'appch_gy_m_rule': true,
    'pure_alpha_rule': true,
    'sid_runway_rule': true,
    'procedure_end_rule': true
}

[Validation]
# Formatvalidierung
validate_format = true

# Landebahn-Bezeichner-Validierung
validate_runway_identifiers = true

# Verfahrenstyp-Validierung
validate_procedure_types = true
```

### Encoder-Konfigurationsbeispiel

```python
# Terminal Patch/terminal_encoder.py Konfiguration

# Verfahrenstyp-Bezeichner
PROCEDURE_MARKERS = {
    'approach': 'c',
    'departure': 'd',
    'arrival': 'a'
}

# Kodierungszuordnungen
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

# Dateiverarbeitungseinstellungen
FILE_PROCESSING = {
    'batch_mode': True,
    'show_progress': True,
    'create_backup': False,
    'output_encoding': 'utf-8'
}
```

## 🛩️ X-Plane CIFP Modul-Konfiguration

### Konfigurationsdatei: `config/cifp.conf`

```ini
[General]
# X-Plane Versionskompatibilität
xplane_version = 12

# CIFP Datenformatversion
cifp_format_version = 1101

[Paths]
# Eingabedatenpfad
input_path = /Users/lujuncheng/Downloads/XP导航数据/编码重构

# Ausgabeordner
output_folder = /Users/lujuncheng/Downloads/XP导航数据/CIFP

# X-Plane Installationspfad
xplane_path = /Users/lujuncheng/Downloads/xplane12_native_2502

# CSV-Datenordner
csv_folder = /Users/lujuncheng/Downloads/NAIP2502

[Processing]
# Verfahrenstypen verarbeiten
process_departures = true
process_arrivals = true
process_approaches = true

# Landebahn-Informationsverarbeitung
generate_runway_info = true

# Verfahrens-Mischmodus
enable_procedure_mixing = true

[NavAid_Processing]
# VOR-Datendatei
vor_data_file = VOR.csv

# NDB-Datendatei  
ndb_data_file = NDB.csv

# Frequenzverarbeitung
frequency_conversion = true

# Höheneinheitenumrechnung (Meter in Fuß)
altitude_conversion_factor = 3.28

[Waypoint_Processing]
# Wegpunkttyp-Kodierung
waypoint_type_coding = true

# ARINC 424 Kompatibilität
arinc424_compatibility = true

# Gebietscode-Verarbeitung
process_area_codes = true

[Validation]
# Koordinatenvalidierungs-Toleranz
coordinate_tolerance = 0.2

# Wegpunkt-Bezeichner-Validierung
validate_identifiers = true

# Verfahrens-Integritätsprüfung
validate_procedure_integrity = true
```

### Wegpunktsystem-Konfiguration

```python
# X-Plane CIFP/数据库.py Konfiguration

# Wegpunktkategoriedefinition
WAYPOINT_CATEGORIES = {
    'UNAVAILABLE': -1,  # Status nicht verfügbar
    'WAYPOINT': 1,      # Wegpunkt
    'VHF_NAVAID': 2,    # VHF-Navigationsgerät
    'NDB_NAVAID': 3     # NDB-Navigationsgerät
}

# Koordinatenvergleichstoleranz (Grad)
COORDINATE_TOLERANCE = 0.2

# Gebietscode-Zuordnung
AREA_CODE_MAPPING = {
    # Codes für chinesische Fluginformationsgebiete
    'ZBPE': 'ZB',  # Peking
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

## 📊 Datenverarbeitungskonfiguration

### CSV-Datenkonfiguration

```python
# Allgemeine CSV-Verarbeitungskonfiguration
CSV_CONFIG = {
    'encoding': 'gbk',          # Chinesische CSV-Dateien verwenden oft GBK-Kodierung
    'delimiter': ',',
    'quotechar': '"',
    'skipinitialspace': True,
    'na_values': ['', 'N/A', 'NULL', '0.0']
}

# Erforderliche CSV-Felder
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

### Datenbankkonfiguration
```python
# X-Plane CIFP/数据库.py 配置

DATABASE_CONFIG = {
    'connection_timeout': 30,
    'auto_commit': True,
    'encoding': 'utf-8',
    'journal_mode': 'WAL',  # SQLite-Optimierung
    'synchronous': 'NORMAL'
}

# Datenbanktabellenstruktur
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

## 🔧 Protokollierungskonfiguration

### Protokolldatei: `config/logging.conf`

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

### Python Protokollierungskonfigurationsbeispiel

```python
import logging
import logging.config
from pathlib import Path

# Protokollierungskonfiguration laden
def setup_logging(config_path='config/logging.conf'):
    """Protokollierungskonfiguration einrichten"""
    if Path(config_path).exists():
        logging.config.fileConfig(config_path)
    else:
        # Standardkonfiguration
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('logs/nav-data.log')
            ]
        )

# Logger für jedes Modul
def get_logger(name):
    """Modulspezifischen Logger abrufen"""
    return logging.getLogger(name)

# Anwendungsbeispiel
logger = get_logger('airway')
logger.info('Flugwegverarbeitung beginnt')
```

## ⚙️ Leistungsoptimierungskonfiguration

### Speicherverwaltungskonfiguration
```python
# Speichernutzungsoptimierung
MEMORY_CONFIG = {
    'chunk_size': 10000,        # Blockverarbeitungsgröße
    'max_memory_usage': '2GB',  # Maximaler Speicherverbrauch
    'garbage_collection': True, # Garbage Collection aktivieren
    'buffer_size': 8192        # Dateilesepuffer
}

# Parallelverarbeitungskonfiguration
CONCURRENCY_CONFIG = {
    'max_workers': 4,           # Maximale Anzahl Worker-Threads
    'enable_multiprocessing': False, # Multiprocessing aktivieren
    'thread_pool_size': 2       # Thread-Pool-Größe
}
```

### Cache-Konfiguration
```python
# Cache-Einstellungen
CACHE_CONFIG = {
    'enable_cache': True,
    'cache_size': 1000,
    'cache_ttl': 3600,          # Cache-Lebensdauer (Sekunden)
    'cache_directory': 'cache/'
}
```

## 🔍 Konfigurationsvalidierung

### Konfigurationsvalidierungsskript

Erstellen Sie `validate_config.py`:

```python
#!/usr/bin/env python3
"""
Konfigurationsdateien-Validierungsskript
"""
import configparser
import os
import sys
from pathlib import Path

def validate_airway_config(config_file):
    """Flugwegmodul-Konfiguration validieren"""
    config = configparser.ConfigParser()
    config.read(config_file)
    
    errors = []
    
    # Erforderliche Abschnitte prüfen
    required_sections = ['General', 'Input', 'Output', 'Filtering']
    for section in required_sections:
        if section not in config:
            errors.append(f"Fehlender Konfigurationsabschnitt: [{section}]")
    
    # Dateipfade prüfen
    if 'Input' in config:
        for key in ['csv_file', 'earth_fix_file', 'earth_nav_file']:
            if key in config['Input']:
                file_path = config['Input'][key]
                if not os.path.exists(file_path):
                    errors.append(f"Datei existiert nicht: {file_path}")
    
    return errors

def validate_all_configs():
    """Alle Konfigurationsdateien validieren"""
    config_dir = Path('config')
    if not config_dir.exists():
        print("❌ Konfigurationsverzeichnis existiert nicht")
        return False
    
    config_files = {
        'airway.conf': validate_airway_config,
        # Weitere Konfigurationsvalidierungsfunktionen können hinzugefügt werden
    }
    
    all_valid = True
    for config_file, validator in config_files.items():
        config_path = config_dir / config_file
        if config_path.exists():
            errors = validator(str(config_path))
            if errors:
                print(f"❌ {config_file} Konfigurationsfehler:")
                for error in errors:
                    print(f"   - {error}")
                all_valid = False
            else:
                print(f"✅ {config_file} Konfiguration korrekt")
        else:
            print(f"⚠️  {config_file} Konfigurationsdatei existiert nicht (Standardwerte werden verwendet)")
    
    return all_valid

if __name__ == "__main__":
    if validate_all_configs():
        print("\n🎉 Alle Konfigurationen erfolgreich validiert!")
        sys.exit(0)
    else:
        print("\n❌ Konfigurationsvalidierung fehlgeschlagen, bitte beheben Sie die oben genannten Probleme")
        sys.exit(1)
```

## 📚 Bewährte Konfigurationspraktiken

### 1. Konfigurationsdateiverwaltung
- Konfigurationsdateien mit Versionskontrolle verwalten
- Für unterschiedliche Umgebungen separate Konfigurationsdateien erstellen
- Wichtige Konfigurationen regelmäßig sichern

### 2. Sicherheitsaspekte
- Keine sensiblen Informationen in Konfigurationsdateien speichern
- Umgebungsvariablen für Pfade und andere variable Informationen verwenden
- Geeignete Dateiberechtigungen festlegen

### 3. Leistungsoptimierung
- Batch-Größe an Systemressourcen anpassen
- Speichernutzungsbeschränkungen sinnvoll festlegen
- Geeignete Cache-Mechanismen aktivieren

### 4. Fehlerbehandlung
- Standardwerte für alle kritischen Konfigurationselemente festlegen
- Einen Konfigurationsvalidierungsmechanismus implementieren
- Klare Fehlermeldungen bereitstellen

---

**Konfiguration abgeschlossen!** 🎯 **Sie können nun die Konfigurationsparameter der einzelnen Module an Ihre spezifischen Anforderungen anpassen. Es wird empfohlen, vor der ersten Verwendung das Konfigurationsvalidierungsskript auszuführen, um sicherzustellen, dass die Einstellungen korrekt sind.**
# ⚙️ iFly Navigationsdatenkonverter Konfigurationsanleitung

Dieser Leitfaden beschreibt detailliert die verschiedenen Konfigurationsoptionen des iFly Navigationsdatenkonverters, um Ihnen zu helfen, den Konvertierungsprozess entsprechend Ihren Anforderungen zu optimieren.

## 🎯 Konfigurationsübersicht

Der Konverter bietet ein flexibles Konfigurationssystem, das Folgendes unterstützt:
- **📁 Pfadkonfiguration** - Anpassen von Eingabe- und Ausgabepfaden
- **📊 Verarbeitungsparameter** - Anpassen der Datenverarbeitungsgenauigkeit und des Bereichs
- **⚡ Leistungsoptimierung** - Optimierung von Speicher und Verarbeitungsgeschwindigkeit
- **🔍 Validierungsoptionen** - Einstellungen zur Datenintegritätsprüfung

## 📋 Konfigurationsmethoden

### 1. Interaktive Konfiguration (Empfohlen)
```bash
# Konverter ausführen, nach Aufforderung konfigurieren
python main.py
```

### 2. Konfigurationsdatei
Erstellen Sie eine `config.json` Datei:
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

### 3. Umgebungsvariablen
```bash
export IFLY_FENIX_DB="/path/to/nd.db3"
export IFLY_CSV_FILE="/path/to/RTE_SEG.csv"
export IFLY_INSTALL_PATH="/path/to/ifly-aircraft-737max8"
```

## 🔧 Kernkonfigurationsoptionen

### Dateipfad-Konfiguration

#### Fenix Datenbankpfad
**Parametername**: `fenix_db_path`  
**Beschreibung**: Speicherort der Fenix A320 Navigationsdatenbankdatei  
**Standardwert**: Automatische Erkennung  

**Häufige Speicherorte:**
```bash
# Windows
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Beispiel eines benutzerdefinierten Pfades
/Users/username/Documents/Fenix/navdata/nd.db3
```

**Validierungsmethode:**
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
        print(f"Datenbankvalidierung fehlgeschlagen: {e}")
        return False
```

#### NAIP CSV-Dateipfad
**Parametername**: `csv_file_path`  
**Beschreibung**: Datei mit Daten für chinesische Zivilluftfahrt-Streckenabschnitte  
**Formatanforderungen**: UTF-8-kodierte CSV-Datei  

**Beispiel einer Dateistruktur:**
```csv
ROUTE_ID,SEQUENCE_NUMBER,WAYPOINT_ID,LATITUDE,LONGITUDE,MAG_VARIATION
A1,1,ZSAM,39.916667,116.383333,7.2
A1,2,VOR01,39.833333,116.500000,7.1
```

**Erforderliche Spalten:**
- `WAYPOINT_ID`: Wegpunkt-Identifikator
- `LATITUDE`: Breitengrad (Dezimalgrad)
- `LONGITUDE`: Längengrad (Dezimalgrad)
- `ROUTE_ID`: Routen-Identifikator

#### iFly Installationspfad
**Parametername**: `ifly_path`  
**Beschreibung**: iFly 737 MAX 8 Installationsverzeichnis  
**Automatische Erkennung**: Unterstützt  

**Erkennungsreihenfolge:**
1. Community-Paket: `Community\ifly-aircraft-737max8\`
2. Offizielles Paket: `Official\asobo-aircraft-ifly-737max8\`
3. Manuell angegebener Pfad

## ⚙️ Konfiguration der Verarbeitungsparameter

### Bereich der Terminal-Prozedur-ID

#### Start-ID-Einstellung
**Parametername**: `terminal_id_start`  
**Beschreibung**: Start-ID-Nummer für Terminal-Prozeduren  
**Standardwert**: `1000`  
**Bereich**: `1 - 9999`  

**Einstellungsempfehlung:**
```python
# Einstellung nach Anzahl der Flughäfen
small_airports = 1000   # < 50 Flughäfen
medium_airports = 2000  # 50-200 Flughäfen
large_airports = 5000   # > 200 Flughäfen
```

#### ID-Zuweisungsstrategie
```python
def calculate_terminal_ids(airport_count, start_id=1000):
    """Berechnung der ID-Zuweisung für Terminal-Prozeduren"""
    # Pro Flughafen werden 20 IDs reserviert
    id_per_airport = 20
    total_ids_needed = airport_count * id_per_airport
    
    if start_id + total_ids_needed > 9999:
        print("⚠️ Warnung: ID-Bereich könnte unzureichend sein")
        return start_id, 9999
    
    return start_id, start_id + total_ids_needed
```

### Konfiguration der Koordinatengenauigkeit

#### Genauigkeitseinstellungen
**Parametername**: `coordinate_precision`  
**Beschreibung**: Anzahl der Dezimalstellen für Koordinaten  
**Standardwert**: `8`  
**Bereich**: `4 - 12`  

**Genauigkeitsvergleich:**
| Genauigkeit | Fehlerbereich | Anwendbares Szenario |
|------|----------|----------|
| 4 Stellen | ~11 Meter | Grundnavigation |
| 6 Stellen | ~1.1 Meter | Standardnavigation |
| 8 Stellen | ~1.1 Zentimeter | Hochpräzise Navigation |
| 10 Stellen | ~1.1 Millimeter | Extrem hohe Präzision |

**Beispiel einer Einstellung:**
```python
# Koordinatenbeispiele mit unterschiedlicher Genauigkeit
coord_4 = 39.9167  # 4-stellige Genauigkeit
coord_6 = 39.916667  # 6-stellige Genauigkeit
coord_8 = 39.91666700  # 8-stellige Genauigkeit
```

### Konfiguration der Missweisungsberechnung

#### WMM-Modellparameter
**Modellversion**: WMM-2025  
**Aktualisierungsfrequenz**: Alle 5 Jahre  
**Berechnungsgenauigkeit**: 0.1 Grad  

**Berechnungsparameter:**
```python
{
    "model_year": 2025,
    "altitude": 0,  # Höhe über dem Meeresspiegel (Meter)
    "calculation_date": "auto",  # Automatisches Verwenden des aktuellen Datums
    "use_local_time": true  # Verwenden der lokalen Zeit
}
```

#### Missweisungsvalidierung
```python
def validate_magnetic_declination(declination):
    """Überprüfung der Plausibilität des Missweisungswertes"""
    # Der globale Missweisungsbereich liegt bei etwa -30° bis +30°
    if -30.0 <= declination <= 30.0:
        return True
    else:
        print(f"⚠️ Anormaler Missweisungswert: {declination}°")
        return False
```

## 🚀 Konfiguration zur Leistungsoptimierung

### Speicherverwaltung

#### Stapelgröße
**Parametername**: `batch_size`  
**Beschreibung**: Anzahl der Datensätze, die in einem Stapel verarbeitet werden  
**Standardwert**: `1000`  
**Empfohlene Einstellung:**

```python
# Anpassung basierend auf dem verfügbaren Speicher
import psutil

def get_optimal_batch_size():
    available_memory = psutil.virtual_memory().available
    memory_gb = available_memory / (1024**3)
    
    if memory_gb < 4:
        return 500   # Unter 4 GB
    elif memory_gb < 8:
        return 1000  # 4-8 GB
    else:
        return 2000  # Über 8 GB
```

#### Speicherüberwachung
```python
def monitor_memory_usage():
    """Überwachung der Speichernutzung"""
    import psutil
    memory = psutil.virtual_memory()
    print(f"Speichernutzungsrate: {memory.percent}%")
    print(f"Verfügbarer Speicher: {memory.available / (1024**2):.1f} MB")
```

### Konfiguration der Parallelverarbeitung

#### Einstellung der Thread-Anzahl
**Parametername**: `max_workers`  
**Beschreibung**: Maximale Anzahl gleichzeitiger Threads  
**Standardwert**: Anzahl der CPU-Kerne  

**Einstellungsstrategie:**
```python
import os

def get_optimal_workers():
    cpu_count = os.cpu_count()
    
    # Einen Kern für das System reservieren
    if cpu_count <= 2:
        return 1
    elif cpu_count <= 4:
        return cpu_count - 1
    else:
        return min(cpu_count - 2, 8)  # Maximal 8 Threads
```

#### E/A-Optimierung
```python
{
    "use_ssd_optimization": true,    # SSD-Optimierung
    "buffer_size": 8192,            # Puffergröße (Bytes)
    "enable_compression": false,     # Komprimierung von temporären Dateien
    "temp_dir": "/tmp"              # Temporäres Verzeichnis
}
```

## 🔍 Validierung und Qualitätssicherung

### Konfiguration der Datenvalidierung

#### Validierungsstufe
**Parametername**: `validation_level`  
**Beschreibung**: Intensität der Datenvalidierung  
**Optionen**: `basic`, `standard`, `strict`  

**Validierungsinhalt:**
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

#### Fehlerbehandlungsstrategie
**Parametername**: `error_handling`  
**Optionen**: `stop`, `skip`, `fix`  

```python
error_strategies = {
    "stop": "Bei Fehlern sofort stoppen",
    "skip": "Fehlerhafte Datensätze überspringen und weiterverarbeiten", 
    "fix": "Versuchen, Fehler automatisch zu beheben"
}
```

### Ausgabequalitätskontrolle

#### Dateibenennungsregeln
```python
output_naming = {
    "use_timestamp": true,          # Zeitstempel verwenden
    "include_version": true,        # Versionsnummer einschließen
    "airac_suffix": true,          # AIRAC-Suffix hinzufügen
    "backup_original": true        # Originaldatei sichern
}

# Beispiel für generierte Dateinamen:
# WPNAVRTE_2024-12-15_v2.0_2508.txt
# FMC_Ident_2024-12-15_v2.0_2508.txt
```

## 📅 AIRAC-Zykluskonfiguration

### Einstellungen für die automatische Berechnung
**Parametername**: `airac_auto_calculate`  
**Standardwert**: `true`  
**Zeitzone**: UTC+8 (Peking-Zeit)  

```python
airac_config = {
    "auto_calculate": true,
    "timezone": "Asia/Shanghai",
    "reference_date": "2024-01-11",  # AIRAC 2401 Startdatum
    "cycle_days": 28,                # Standard-Zyklustage
    "format": "YYWW"                # Format: JJWW
}
```

### Manuelle Einstellungen
```python
# AIRAC-Zyklus manuell angeben
manual_airac = {
    "cycle": "2508",
    "effective_date": "2025-02-20",
    "expiry_date": "2025-03-19"
}
```

## 🎛️ Erweiterte Konfiguration

### Protokollierungskonfiguration
```python
logging_config = {
    "level": "INFO",               # DEBUG, INFO, WARNING, ERROR
    "file": "converter.log",       # Protokolldateiname
    "max_size": "10MB",           # Maximale Dateigröße
    "backup_count": 3,            # Anzahl der Sicherungsdateien
    "format": "%(asctime)s - %(levelname)s - %(message)s"
}
```

### Benutzeroberflächenkonfiguration
```python
ui_config = {
    "theme": "dark",              # Thema: dark, light, auto
    "progress_style": "bar",      # Fortschrittsbalken-Stil: bar, spinner
    "color_scheme": "rich",       # Farbschema
    "show_details": true,         # Details anzeigen
    "animation": true            # Animationseffekte aktivieren
}
```

### Debugging-Konfiguration
```python
debug_config = {
    "enable_debug": false,        # Debug-Modus aktivieren
    "save_intermediate": false,   # Zwischenergebnisse speichern
    "verbose_logging": false,     # Detaillierte Protokollierung
    "performance_profiling": false, # Performance-Analyse
    "memory_tracking": false     # Speicherverfolgung
}
```

## 📝 Konfigurationsdateivorlage

### Vollständiges Konfigurationsbeispiel
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

### Minimales Konfigurationsbeispiel
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "terminal_id_start": 1000
}
```

## 🛠️ Konfigurationstools

### Konfigurationsvalidierungsskript
```python
def validate_config(config_path):
    """Überprüfung der Gültigkeit der Konfigurationsdatei"""
    import json
    import jsonschema
    
    # Konfigurationsschema
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
        print("✅ Konfigurationsvalidierung erfolgreich")
        return True
    except Exception as e:
        print(f"❌ Konfigurationsvalidierung fehlgeschlagen: {e}")
        return False
```

### Konfigurationsgenerator
```python
def generate_config_template():
    """Generierung der Konfigurationsvorlage"""
    template = {
        "fenix_db_path": "Bitte geben Sie den Fenix-Datenbankpfad ein",
        "csv_file_path": "Bitte geben Sie den CSV-Dateipfad ein", 
        "ifly_path": "auto_detect",
        "terminal_id_start": 1000,
        "coordinate_precision": 8
    }
    
    with open('config_template.json', 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)
    
    print("Konfigurationsvorlage wurde generiert: config_template.json")
```

---

**Nächster Schritt**: Nach Abschluss der Konfiguration, sehen Sie bitte die [Nutzungsanleitung](usage.md), um Ihre erste Datenkonvertierung zu starten! 🚀

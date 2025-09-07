# ⚙️ Konfigurationsanleitung

Diese Anleitung beschreibt detailliert, wie Sie die Datenquellen, Dateipfade und Verarbeitungsparameter von Nav-data konfigurieren, um sicherzustellen, dass das Tool Ihre Luftnavigationsdaten korrekt verarbeiten kann.

## 📋 Konfigurationsübersicht

Nav-data erfordert die Konfiguration der folgenden Datentypen:
- **NAIP-Daten** - Daten des chinesischen Zivilluftfahrt-Informationsverarbeitungssystems (CSV-Format)
- **X-Plane-Daten** - X-Plane Navigationsdatendateien (DAT-Format)
- **CIFP-Daten** - Kodierte Instrumentenflugverfahrensdaten (DAT-Format)
- **Ausgabekonfiguration** - Speicherort der generierten Datenbank- und Logdateien

## 🗂️ Details der Datenquellen

### 1. NAIP-Datenquellen (Daten der chinesischen Zivilluftfahrt)

NAIP (National Aeronautical Information Processing) Daten enthalten offizielle Luftfahrtinformationen für die Region China:

#### Liste der erforderlichen Dateien
```
data/input/naip/
├── AD_HP.csv              # Flughafen-Basisdaten (Flughafenstandort, magnetische Deklination)
├── RWY_DIRECTION.csv      # Landebahn-Richtungsinformationen
├── RWY.csv                # Landebahn-Detailinformationen (Länge, Breite, Oberfläche)
└── RTE_SEG.csv            # Luftstraßenabschnittsdaten
```

#### Anforderungen an das Dateiformat
- **Kodierung**: Latin-1 (ISO-8859-1)
- **Trennzeichen**: Komma (,)
- **Zeilenumbruchzeichen**: Windows (CRLF) oder Unix (LF)

#### Beschreibung der Schlüsselfelder

**AD_HP.csv** - Flughafendaten:
- `CODE_ID`: 4-stelliger ICAO-Code (z.B. ZBAA)
- `GEO_LAT_ACCURACY`: Breitengrad (DMS-Format: N390308.00)
- `GEO_LONG_ACCURACY`: Längengrad (DMS-Format: E1162930.00)
- `VAL_MAG_VAR`: Magnetische Deklination

**RWY.csv** - Landebahndaten:
- `CODE_ID`: Flughafen-ICAO-Code
- `TXT_DESIG`: Landebahn-Kennung (z.B. 18L/36R)
- `VAL_LEN`: Landebahnlänge (Meter)
- `VAL_WID`: Landebahnbreite (Meter)

**RTE_SEG.csv** - Luftstraßendaten:
- `TXT_DESIG`: Luftstraßen-Kennung (z.B. A1, G212)
- `CODE_POINT_START`: Startpunkt-Kennung
- `CODE_TYPE_START`: Punkttyp (DESIGNATED_POINT, VORDME, NDB)
- `VAL_MAG_TRACK`: Magnetischer Kurs (Grad)
- `VAL_LEN`: Segmentlänge (Kilometer)

### 2. X-Plane-Datenquellen

X-Plane bietet hochwertige Navigationsdaten, die weltweit unterstützt werden:

#### Erforderliche Dateien
```
data/input/xplane/
├── earth_fix.dat          # Globale Wegpunktdaten
└── earth_nav.dat          # VOR/DME/NDB/ILS-Daten
```

#### Erläuterung des Datenformats

**earth_fix.dat** Format:
```
纬度 经度 标识符 地区代码 ICAO代码 类型
39.051639 116.497222 ADNAP ZZZZ ZB DESIGNATED_POINT
```

**earth_nav.dat** Format:
```
类型 纬度 经度 高程 频率 航程 磁差 标识符 地区代码 ICAO代码 名称 设备类型
3 39.051639 116.497222 35 11030 130 -6.0 BJK ENRT ZB BEIJING VOR/DME
```

#### Unterstützte ICAO-Regionscodes
```python
# Derzeit unterstützte chinesische Regionscodes
VALID_ICAO_CODES = {
    'ZB',  # Region Nordchina
    'ZG',  # Region Guangzhou  
    'ZS',  # Region Shanghai
    'ZJ',  # Region Xinjiang
    'ZY',  # Region Zentral-Südchina
    'ZL',  # Region Lanzhou
    'ZH',  # Region Heilongjiang
    'ZU',  # Region Ürümqi
    'ZP',  # Region Kunming
    'ZW'   # Region Tibet
}
```

### 3. CIFP-Datenquellen (Flugverfahren)

CIFP (Coded Instrument Flight Procedures) enthält standardisierte Instrumentenflugverfahren:

#### Dateistruktur
```
data/input/cifp/
├── ZBAA.dat              # Verfahren für den Flughafen Peking Capital
├── ZSPD.dat              # Verfahren für den Flughafen Shanghai Pudong
├── ZGGG.dat              # Verfahren für den Flughafen Guangzhou Baiyun
└── [Flughafen-ICAO-Code].dat     # Andere Flughafenverfahrensdateien
```

#### Verfahrenstypen
- **SID** - Standard Instrument Departure
- **STAR** - Standard Terminal Arrival Route  
- **APPCH** - Instrument Approach

#### Beispiel für das Datenformat
```
SID:010,D,ABING1,T,ZBAA,ABING,ZB,001,IF,L,0.30,IF,,-6.0,ZBAA,0,0,0,270.0,0,D,+,1700,,,,,0.0,,ABING,,J
```

### 4. Referenzdatendateien

#### Datei für Flughafennamen-Nachschlagevorgänge
```
data/input/Airport.dat

Format:
ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL
ZGGG GUANGZHOU/BAIYUN INTL
```

## 🔧 Konfigurationsdatei-Einstellungen

### 1. Pfadkonfiguration

Jedes Python-Modul enthält Pfadkonfigurationen, die an Ihre tatsächliche Umgebung angepasst werden müssen:

#### Beispielkonfiguration PMDG_APT.py
```python
# Konfiguration der Flughafendatenverarbeitung
csv_file_path = r'/path/to/naip/AD_HP.csv'
lookup_txt_file_path = r'/path/to/Airport.dat'
output_db_path = r'/path/to/output/e_dfd_PMDG.s3db'
missing_airports_path = r'/path/to/logs/missing_airports_data.txt'
```

#### Beispielkonfiguration PMDG_RUNWAY.py
```python
# Konfiguration der Landebahndatenverarbeitung
path_to_first_csv = r'/path/to/naip/RWY_DIRECTION.csv'
path_to_second_csv = r'/path/to/naip/RWY.csv'
path_to_magvar_csv = r'/path/to/naip/AD_HP.csv'
output_db3_path = r'/path/to/output/e_dfd_PMDG.s3db'
earth_nav_dat_path = r'/path/to/xplane/earth_nav.dat'
```

#### Beispielkonfiguration der Verfahrensdaten
```python
# SID/STAR/APPCH Verfahrenskonfiguration
source_dat_directory = '/path/to/cifp/'
earth_fix_path = '/path/to/xplane/earth_fix.dat'
earth_nav_path = '/path/to/xplane/earth_nav.dat'
db_path = '/path/to/output/e_dfd_PMDG.s3db'
```

### 2. Erstellung eines Konfigurationsverwaltungs-Skripts

Zur Vereinfachung der Verwaltung wird empfohlen, eine zentrale Konfigurationsdatei zu erstellen:

```python
# config/paths.py
import os

# Basispfade
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INPUT_DIR = os.path.join(DATA_DIR, 'input')
OUTPUT_DIR = os.path.join(DATA_DIR, 'output')
LOGS_DIR = os.path.join(BASE_DIR, 'logs')

# NAIP-Datenpfade
NAIP_DIR = os.path.join(INPUT_DIR, 'naip')
NAIP_FILES = {
    'airports': os.path.join(NAIP_DIR, 'AD_HP.csv'),
    'runway_direction': os.path.join(NAIP_DIR, 'RWY_DIRECTION.csv'),
    'runway_data': os.path.join(NAIP_DIR, 'RWY.csv'),
    'route_segments': os.path.join(NAIP_DIR, 'RTE_SEG.csv')
}

# X-Plane-Datenpfade
XPLANE_DIR = os.path.join(INPUT_DIR, 'xplane')
XPLANE_FILES = {
    'waypoints': os.path.join(XPLANE_DIR, 'earth_fix.dat'),
    'navigation': os.path.join(XPLANE_DIR, 'earth_nav.dat')
}

# CIFP-Datenpfade
CIFP_DIR = os.path.join(INPUT_DIR, 'cifp')

# Ausgabedateipfade
OUTPUT_DATABASE = os.path.join(OUTPUT_DIR, 'e_dfd_PMDG.s3db')

# Referenzdateien
AIRPORT_LOOKUP = os.path.join(INPUT_DIR, 'Airport.dat')

# Logdateipfade
LOG_FILES = {
    'missing_airports': os.path.join(LOGS_DIR, 'missing_airports_data.txt'),
    'ils_processing': os.path.join(LOGS_DIR, 'PMDG_ILS.log'),
    'airway_processing': os.path.join(LOGS_DIR, 'PMDG_AWY_NEW.log'),
    'validation': os.path.join(LOGS_DIR, 'db_validation.log')
}

# MSFS-Installationspfade (Benutzeranpassung erforderlich)
MSFS_COMMUNITY_PATHS = {
    'microsoft_store': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community',
    'steam': r'C:\Users\{username}\AppData\Roaming\Microsoft Flight Simulator\Packages\Community',
    'xbox_gamepass': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community'
}
```

## ⚡ Leistungskonfiguration

### 1. Speicheroptimierungseinstellungen

Für große Datensätze kann die Batch-Größe angepasst werden:

```python
# Batch-Konfiguration in PMDG_TMA_WAYPOINT.py
BATCH_SIZE = 1000  # Standard-Batch-Größe
MAX_MEMORY_MB = 2048  # Maximaler Speicherverbrauch (MB)

# Anpassung basierend auf dem verfügbaren Speicher
import psutil
available_memory = psutil.virtual_memory().available / (1024 * 1024)
if available_memory > 8192:  # 8GB+
    BATCH_SIZE = 5000
elif available_memory > 4096:  # 4GB+
    BATCH_SIZE = 2000
```

### 2. Konfiguration der parallelen Verarbeitung

```python
# Parallelitätseinstellungen in PMDG_AWY_FINAL.py
MAX_WORKERS = 50  # Maximale Anzahl paralleler Threads

# Anpassung basierend auf der Anzahl der CPU-Kerne
import multiprocessing
cpu_count = multiprocessing.cpu_count()
MAX_WORKERS = min(50, cpu_count * 2)
```

### 3. Datenbankoptimierungseinstellungen

```python
# SQLite Leistungsoptimierungseinstellungen
DATABASE_PRAGMAS = {
    'journal_mode': 'DELETE',    # Kompatibilitätsmodus
    'synchronous': 'FULL',       # Volle Synchronisierung
    'foreign_keys': 'ON',        # Fremdschlüsselbeschränkungen aktivieren
    'cache_size': 10000,         # Anzahl der Cache-Seiten
    'temp_store': 'MEMORY'       # Temporäre Tabellen im Speicher speichern
}
```

## 🗺️ Geographische Koordinatensystem-Konfiguration

### 1. Koordinatenformatkonvertierung

Nav-data unterstützt die Konvertierung verschiedener Koordinatenformate:

```python
# Konfiguration der DMS (Grad, Minute, Sekunde) Formatkonvertierung
DMS_FORMATS = {
    'latitude': 'NDDMMSS.ss',   # Z.B.: N390308.00
    'longitude': 'EDDDMMSS.ss'  # Z.B.: E1162930.00
}

# Präzisionskonfiguration
COORDINATE_PRECISION = 8  # Anzahl der Nachkommastellen
```

### 2. Konfiguration der magnetischen Deklinationsberechnung

```python
# Konfiguration des magnetischen Deklinationsmodells
MAGNETIC_MODEL = {
    'coefficients_file': 'wmm/WMMHR_2025.COF',
    'high_resolution': True,
    'epoch': 2025.0
}
```

## 📊 Datenvalidierungskonfiguration

### 1. Datenqualitätsprüfung

```python
# Datenvalidierungskonfiguration
VALIDATION_CONFIG = {
    'check_duplicates': True,
    'validate_coordinates': True,
    'check_icao_codes': True,
    'verify_references': True,
    'generate_reports': True
}

# ICAO-Code-Validierung
VALID_ICAO_PATTERN = r'^Z[BGJLHUPYW][A-Z]{2}$'

# Koordinatenbereichsvalidierung (China-Region)
COORDINATE_BOUNDS = {
    'latitude': {'min': 15.0, 'max': 55.0},   # 15°-55° Nordbreite
    'longitude': {'min': 70.0, 'max': 140.0}  # 70°-140° Ostlänge
}
```

### 2. Fehlerbehandlungskonfiguration

```python
# Fehlerbehandlungsstrategie
ERROR_HANDLING = {
    'missing_data': 'log',      # log | skip | raise
    'invalid_coordinates': 'skip',
    'duplicate_records': 'log',
    'reference_not_found': 'log'
}
```

## 🔍 Debug-Konfiguration

### 1. Einstellung der Protokollierungsebene

```python
# Protokollierungskonfiguration
LOGGING_CONFIG = {
    'level': 'INFO',            # DEBUG | INFO | WARNING | ERROR
    'format': '%(asctime)s - %(levelname)s - %(message)s',
    'file_size_mb': 10,         # Größe einer einzelnen Protokolldatei
    'backup_count': 5,          # Anzahl der zu speichernden Sicherungsdateien
    'encoding': 'utf-8'
}
```

### 2. Konfiguration der Fortschrittsanzeige

```python
# Konfiguration der Fortschrittsanzeige
PROGRESS_CONFIG = {
    'enable_progress_bar': True,
    'update_interval': 100,     # Aktualisierungsintervall (Anzahl der Datensätze)
    'show_eta': True,           # Geschätzte Abschlusszeit anzeigen
    'show_rate': True           # Verarbeitungsrate anzeigen
}
```

## ✅ Konfigurationsvalidierung

Erstellen Sie ein Konfigurationsvalidierungsskript, um die Korrektheit der Konfiguration zu überprüfen:

```python
# scripts/validate_config.py
import os
import sys
from config.paths import *

def validate_config():
    """Überprüft die Vollständigkeit und Korrektheit der Konfigurationsdatei."""
    
    print("🔍 Konfigurationsdateien werden validiert...")
    
    # Erforderliche Verzeichnisse prüfen
    required_dirs = [DATA_DIR, INPUT_DIR, OUTPUT_DIR, LOGS_DIR]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ Verzeichnis fehlt: {dir_path}")
            return False
        print(f"✅ Verzeichnis vorhanden: {dir_path}")
    
    # Erforderliche Eingabedateien prüfen
    required_files = []
    required_files.extend(NAIP_FILES.values())
    required_files.extend(XPLANE_FILES.values())
    required_files.append(AIRPORT_LOOKUP)
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✅ Datei vorhanden: {os.path.basename(file_path)}")
    
    if missing_files:
        print(f"❌ Erforderliche Dateien fehlen:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ Konfigurationsvalidierung erfolgreich!")
    return True

if __name__ == "__main__":
    if not validate_config():
        sys.exit(1)
```

## 📞 Fehlerbehebung bei Konfigurationsproblemen

### Häufige Konfigurationsprobleme

1.  **Problem mit Pfadtrennzeichen**
    - Windows: Verwenden Sie den Backslash `\` oder Rohstrings `r'path'`
    - macOS/Linux: Verwenden Sie den Schrägstrich `/`

2.  **Problem mit Dateikodierung**
    - CSV-Dateien: Stellen Sie sicher, dass Latin-1-Kodierung verwendet wird
    - DAT-Dateien: Normalerweise UTF-8-Kodierung

3.  **Berechtigungsprobleme**
    - Stellen Sie sicher, dass Sie Lese- und Schreibberechtigungen für alle Konfigurationspfade haben
    - Windows: Administratorrechte können erforderlich sein

4.  **Pfadlängenbeschränkung**
    - Windows: Die Gesamtlänge des Pfades darf 260 Zeichen nicht überschreiten
    - Verwenden Sie relative Pfade, um die Länge zu reduzieren

---

**Nächster Schritt**: Lesen Sie die [Nutzungsanleitung](usage.md), um zu erfahren, wie Sie den Datenkonvertierungsprozess ausführen.
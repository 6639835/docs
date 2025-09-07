# ⚙️ Configuration Instructions

This guide details how to configure Nav-data's data sources, file paths, and processing parameters, ensuring the tool can correctly process your aeronautical navigation data.

## 📋 Configuration Overview

Nav-data requires configuration of the following types of data sources:
- **NAIP Data** - China Civil Aviation Information Processing System Data (CSV format)
- **X-Plane Data** - X-Plane Navigation Data Files (DAT format)
- **CIFP Data** - Coded Instrument Flight Procedure Data (DAT format)
- **Output Configuration** - Location of generated database and log files

## 🗂️ Detailed Data Sources

### 1. NAIP Data Source (China Civil Aviation Data)

NAIP (National Aeronautical Information Processing) data contains official aeronautical information for the China region:

#### Required Files List
```
data/input/naip/
├── AD_HP.csv              # Airport Basic Data (Airport Location, Magnetic Variation)
├── RWY_DIRECTION.csv      # Runway Direction Information
├── RWY.csv                # Runway Details (Length, Width, Surface)
└── RTE_SEG.csv            # Route Segment Data
```

#### File Format Requirements
- **Encoding**: Latin-1 (ISO-8859-1)
- **Delimiter**: Comma (,)
- **Line Endings**: Windows (CRLF) or Unix (LF)

#### Key Field Descriptions

**AD_HP.csv** - Airport Data:
- `CODE_ID`: 4-letter ICAO code (e.g.: ZBAA)
- `GEO_LAT_ACCURACY`: Latitude (DMS format: N390308.00)
- `GEO_LONG_ACCURACY`: Longitude (DMS format: E1162930.00)
- `VAL_MAG_VAR`: Magnetic Variation Value

**RWY.csv** - Runway Data:
- `CODE_ID`: Airport ICAO Code
- `TXT_DESIG`: Runway Identifier (e.g.: 18L/36R)
- `VAL_LEN`: Runway Length (meters)
- `VAL_WID`: Runway Width (meters)

**RTE_SEG.csv** - Airway Data:
- `TXT_DESIG`: Airway Identifier (e.g.: A1, G212)
- `CODE_POINT_START`: Start Point Identifier
- `CODE_TYPE_START`: Point Type (DESIGNATED_POINT, VORDME, NDB)
- `VAL_MAG_TRACK`: Magnetic Track (degrees)
- `VAL_LEN`: Segment Length (kilometers)

### 2. X-Plane Data Source

X-Plane provides high-quality navigation data with global coverage:

#### Required Files
```
data/input/xplane/
├── earth_fix.dat          # Global Waypoint Data
└── earth_nav.dat          # VOR/DME/NDB/ILS Data
```

#### Data Format Description

**earth_fix.dat** format:
```
Latitude Longitude Identifier Region Code ICAO Code Type
39.051639 116.497222 ADNAP ZZZZ ZB DESIGNATED_POINT
```

**earth_nav.dat** format:
```
Type Latitude Longitude Elevation Frequency Range Magnetic Variation Identifier Region Code ICAO Code Name Device Type
3 39.051639 116.497222 35 11030 130 -6.0 BJK ENRT ZB BEIJING VOR/DME
```

#### Supported ICAO Region Codes
```python
# Currently supported China region codes
VALID_ICAO_CODES = {
    'ZB',  # North China Region
    'ZG',  # Guangzhou Region  
    'ZS',  # Shanghai Region
    'ZJ',  # Xinjiang Region
    'ZY',  # Central South Region
    'ZL',  # Lanzhou Region
    'ZH',  # Heilongjiang Region
    'ZU',  # Urumqi Region
    'ZP',  # Kunming Region
    'ZW'   # Tibet Region
}
```

### 3. CIFP Data Source (Flight Procedures)

CIFP (Coded Instrument Flight Procedures) contains standard instrument flight procedures:

#### File Structure
```
data/input/cifp/
├── ZBAA.dat              # Beijing Capital Airport Procedures
├── ZSPD.dat              # Shanghai Pudong Airport Procedures
├── ZGGG.dat              # Guangzhou Baiyun Airport Procedures
└── [Airport ICAO Code].dat     # Other Airport Procedure Files
```

#### Procedure Types
- **SID** - Standard Instrument Departure Procedures
- **STAR** - Standard Terminal Arrival Procedures  
- **APPCH** - Instrument Approach Procedures

#### Data Format Example
```
SID:010,D,ABING1,T,ZBAA,ABING,ZB,001,IF,L,0.30,IF,,-6.0,ZBAA,0,0,0,270.0,0,D,+,1700,,,,,0.0,,ABING,,J
```

### 4. Reference Data Files

#### Airport Name Lookup File
```
data/input/Airport.dat

Format:
ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL
ZGGG GUANGZHOU/BAIYUN INTL
```

## 🔧 Configuration File Settings

### 1. Path Configuration

Each Python module contains path configurations that need to be adjusted according to your actual environment:

#### PMDG_APT.py Configuration Example
```python
# Airport data processing configuration
csv_file_path = r'/path/to/naip/AD_HP.csv'
lookup_txt_file_path = r'/path/to/Airport.dat'
output_db_path = r'/path/to/output/e_dfd_PMDG.s3db'
missing_airports_path = r'/path/to/logs/missing_airports_data.txt'
```

#### PMDG_RUNWAY.py Configuration Example
```python
# Runway data processing configuration
path_to_first_csv = r'/path/to/naip/RWY_DIRECTION.csv'
path_to_second_csv = r'/path/to/naip/RWY.csv'
path_to_magvar_csv = r'/path/to/naip/AD_HP.csv'
output_db3_path = r'/path/to/output/e_dfd_PMDG.s3db'
earth_nav_dat_path = r'/path/to/xplane/earth_nav.dat'
```

#### Procedure Data Configuration Example
```python
# SID/STAR/APPCH Procedure configuration
source_dat_directory = '/path/to/cifp/'
earth_fix_path = '/path/to/xplane/earth_fix.dat'
earth_nav_path = '/path/to/xplane/earth_nav.dat'
db_path = '/path/to/output/e_dfd_PMDG.s3db'
```

### 2. Creating a Configuration Management Script

For easier management, it is recommended to create a unified configuration file:

```python
# config/paths.py
import os

# Base path
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INPUT_DIR = os.path.join(DATA_DIR, 'input')
OUTPUT_DIR = os.path.join(DATA_DIR, 'output')
LOGS_DIR = os.path.join(BASE_DIR, 'logs')

# NAIP Data Paths
NAIP_DIR = os.path.join(INPUT_DIR, 'naip')
NAIP_FILES = {
    'airports': os.path.join(NAIP_DIR, 'AD_HP.csv'),
    'runway_direction': os.path.join(NAIP_DIR, 'RWY_DIRECTION.csv'),
    'runway_data': os.path.join(NAIP_DIR, 'RWY.csv'),
    'route_segments': os.path.join(NAIP_DIR, 'RTE_SEG.csv')
}

# X-Plane Data Paths
XPLANE_DIR = os.path.join(INPUT_DIR, 'xplane')
XPLANE_FILES = {
    'waypoints': os.path.join(XPLANE_DIR, 'earth_fix.dat'),
    'navigation': os.path.join(XPLANE_DIR, 'earth_nav.dat')
}

# CIFP Data Paths
CIFP_DIR = os.path.join(INPUT_DIR, 'cifp')

# Output File Paths
OUTPUT_DATABASE = os.path.join(OUTPUT_DIR, 'e_dfd_PMDG.s3db')

# Reference File
AIRPORT_LOOKUP = os.path.join(INPUT_DIR, 'Airport.dat')

# Log File Paths
LOG_FILES = {
    'missing_airports': os.path.join(LOGS_DIR, 'missing_airports_data.txt'),
    'ils_processing': os.path.join(LOGS_DIR, 'PMDG_ILS.log'),
    'airway_processing': os.path.join(LOGS_DIR, 'PMDG_AWY_NEW.log'),
    'validation': os.path.join(LOGS_DIR, 'db_validation.log')
}

# MSFS Installation Paths (User-defined)
MSFS_COMMUNITY_PATHS = {
    'microsoft_store': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community',
    'steam': r'C:\Users\{username}\AppData\Roaming\Microsoft Flight Simulator\Packages\Community',
    'xbox_gamepass': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community'
}
```

## ⚡ Performance Configuration

### 1. Memory Optimization Settings

For large datasets, batch size can be adjusted:

```python
# Batch processing configuration in PMDG_TMA_WAYPOINT.py
BATCH_SIZE = 1000  # Default batch size
MAX_MEMORY_MB = 2048  # Maximum memory usage (MB)

# Adjust based on available memory
import psutil
available_memory = psutil.virtual_memory().available / (1024 * 1024)
if available_memory > 8192:  # 8GB+
    BATCH_SIZE = 5000
elif available_memory > 4096:  # 4GB+
    BATCH_SIZE = 2000
```

### 2. Concurrent Processing Configuration

```python
# Concurrency settings in PMDG_AWY_FINAL.py
MAX_WORKERS = 50  # Maximum concurrent threads

# Adjust based on CPU core count
import multiprocessing
cpu_count = multiprocessing.cpu_count()
MAX_WORKERS = min(50, cpu_count * 2)
```

### 3. Database Optimization Settings

```python
# SQLite performance optimization settings
DATABASE_PRAGMAS = {
    'journal_mode': 'DELETE',    # Compatibility mode
    'synchronous': 'FULL',       # Full synchronous
    'foreign_keys': 'ON',        # Enable foreign key constraints
    'cache_size': 10000,         # Cache page count
    'temp_store': 'MEMORY'       # Temporary tables stored in memory
}
```

## 🗺️ Geographic Coordinate System Configuration

### 1. Coordinate Format Conversion

Nav-data supports conversion of multiple coordinate formats:

```python
# DMS (Degrees Minutes Seconds) format conversion configuration
DMS_FORMATS = {
    'latitude': 'NDDMMSS.ss',   # e.g.: N390308.00
    'longitude': 'EDDDMMSS.ss'  # e.g.: E1162930.00
}

# Precision configuration
COORDINATE_PRECISION = 8  # Number of decimal places
```

### 2. Magnetic Variation Calculation Configuration

```python
# Magnetic model configuration
MAGNETIC_MODEL = {
    'coefficients_file': 'wmm/WMMHR_2025.COF',
    'high_resolution': True,
    'epoch': 2025.0
}
```

## 📊 Data Validation Configuration

### 1. Data Quality Checks

```python
# Data validation configuration
VALIDATION_CONFIG = {
    'check_duplicates': True,
    'validate_coordinates': True,
    'check_icao_codes': True,
    'verify_references': True,
    'generate_reports': True
}

# ICAO code validation
VALID_ICAO_PATTERN = r'^Z[BGJLHUPYW][A-Z]{2}$'

# Coordinate range validation (China region)
COORDINATE_BOUNDS = {
    'latitude': {'min': 15.0, 'max': 55.0},   # 15°-55° North Latitude
    'longitude': {'min': 70.0, 'max': 140.0}  # 70°-140° East Longitude
}
```

### 2. Error Handling Configuration

```python
# Error handling strategy
ERROR_HANDLING = {
    'missing_data': 'log',      # log | skip | raise
    'invalid_coordinates': 'skip',
    'duplicate_records': 'log',
    'reference_not_found': 'log'
}
```

## 🔍 Debugging Configuration

### 1. Log Level Settings

```python
# Logging configuration
LOGGING_CONFIG = {
    'level': 'INFO',            # DEBUG | INFO | WARNING | ERROR
    'format': '%(asctime)s - %(levelname)s - %(message)s',
    'file_size_mb': 10,         # Single log file size
    'backup_count': 5,          # Number of backup files to keep
    'encoding': 'utf-8'
}
```

### 2. Progress Display Configuration

```python
# Progress bar configuration
PROGRESS_CONFIG = {
    'enable_progress_bar': True,
    'update_interval': 100,     # Update interval (number of records)
    'show_eta': True,           # Show estimated time of arrival (ETA)
    'show_rate': True           # Show processing rate
}
```

## ✅ Configuration Validation

Create a configuration validation script to check the correctness of the configuration:

```python
# scripts/validate_config.py
import os
import sys
from config.paths import *

def validate_config():
    """Validates the completeness and correctness of configuration files"""
    
    print("🔍 Validating configuration files...")
    
    # Check required directories
    required_dirs = [DATA_DIR, INPUT_DIR, OUTPUT_DIR, LOGS_DIR]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ Missing directory: {dir_path}")
            return False
        print(f"✅ Directory exists: {dir_path}")
    
    # Check required input files
    required_files = []
    required_files.extend(NAIP_FILES.values())
    required_files.extend(XPLANE_FILES.values())
    required_files.append(AIRPORT_LOOKUP)
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✅ File exists: {os.path.basename(file_path)}")
    
    if missing_files:
        print(f"❌ Missing required files:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ Configuration validation passed!")
    return True

if __name__ == "__main__":
    if not validate_config():
        sys.exit(1)
```

## 📞 Configuration Troubleshooting

### Common Configuration Issues

1.  **Path Separator Issues**
    - Windows: Use backslash `\` or raw string `r'path'`
    - macOS/Linux: Use forward slash `/`

2.  **File Encoding Issues**
    - CSV files: Ensure Latin-1 encoding is used
    - DAT files: Typically UTF-8 encoding

3.  **Permission Issues**
    - Ensure read/write permissions for all configured paths
    - Windows: Administrator privileges may be required

4.  **Path Length Limitations**
    - Windows: Total path length should not exceed 260 characters
    - Use relative paths to reduce length

---

**Next Steps**: Read [Usage Instructions](usage.md) to learn how to run the data conversion process.
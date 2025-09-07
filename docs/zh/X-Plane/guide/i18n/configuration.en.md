# Configuration Instructions

This document details the configuration options and parameter settings for each Nav-data module.

## 📋 Configuration File Overview

### Main Configuration Files
```
config/
├── main.conf           # Main configuration file
├── airway.conf         # Airway processing configuration
├── pdf_extract.conf    # PDF extraction configuration
├── terminal.conf       # Terminal program configuration
└── paths.conf          # Path configuration
```

### Environment Variable Configuration
```bash
# .env file example
NAV_DATA_HOME=/path/to/nav-data
XPLANE_PATH=/path/to/X-Plane
LOG_LEVEL=INFO
```

## 🛣️ Airway Module Configuration (Airway)

### Configuration File: `config/airway.conf`

```ini
[General]
# Enable verbose logging
verbose_logging = true

# Show progress bar
show_progress = true

# Batch size
batch_size = 1000

[Input]
# CSV input file path
csv_file = RTE_SEG.csv

# X-Plane reference data files
earth_fix_file = earth_fix.dat
earth_nav_file = earth_nav.dat
earth_awy_file = earth_awy.dat

[Output]
# Output file encoding
output_encoding = utf-8

# Create backup of original file
create_backup = true

# Backup file suffix
backup_suffix = .backup

[Filtering]
# Excluded airspace area codes (comma-separated)
excluded_areas = ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU

# Minimum segment length (nautical miles)
min_segment_length = 0.1

# Maximum segment length (nautical miles)
max_segment_length = 999.9

[Validation]
# Enable data validation
enable_validation = true

# Waypoint coordinate tolerance (degrees)
coordinate_tolerance = 0.001

# Area code validation
validate_area_codes = true

[AIRAC]
# Automatically calculate AIRAC cycle
auto_calculate_cycle = true

# Manually specify AIRAC cycle (format: YYMM)
manual_cycle = 

# AIRAC reference date (ISO format)
reference_date = 2025-01-23

# Reference cycle
reference_cycle = 2501
```

### Configuration Options in Code

#### Airway Processing Main Script Configuration
```python
# Airway/airway.py configuration example

# China airspace codes configuration
CHINA_AREAS = {
    'ZB',  # Beijing Flight Information Region
    'ZG',  # Guangzhou Flight Information Region
    'ZY',  # Shenyang Flight Information Region
    'ZS',  # Shanghai Flight Information Region
    'ZW',  # Urumqi Flight Information Region
    'ZJ',  # Sanya Flight Information Region
    'ZP',  # Lanzhou Flight Information Region
    'ZL',  # Kunming Flight Information Region
    'ZH',  # Wuhan Flight Information Region
    'ZU'   # Chengdu Flight Information Region
}

# File path configuration
FILE_PATHS = {
    'csv_input': 'RTE_SEG.csv',
    'earth_fix': 'earth_fix.dat',
    'earth_nav': 'earth_nav.dat',
    'earth_awy': 'earth_awy.dat'
}

# Waypoint type mapping
NAVIGATION_TYPES = {
    'DESIGNATED_POINT': {'code': 'DESIGNATED_POINT', 'type_code': '11'},
    'VORDME': {'code': 'VORDME', 'type_code': '3'},
    'NDB': {'code': 'NDB', 'type_code': '2'}
}
```

## 📄 PDF Extraction Module Configuration

### Configuration File: `config/pdf_extract.conf`

```ini
[General]
# Processing mode: auto, manual
processing_mode = auto

# Output format: txt, json, csv
output_format = txt

# Character encoding
encoding = utf-8

[PDF_Processing]
# PDF parsing engine: pdfplumber, pypdf2
pdf_engine = pdfplumber

# Page cropping margins (pixels)
crop_margin_top = 50
crop_margin_bottom = 50
crop_margin_left = 30
crop_margin_right = 30

# Text extraction threshold
text_confidence_threshold = 0.8

# Line detection threshold
line_detection_threshold = 5

[Coordinate_Extraction]
# Coordinate format validation
coordinate_format_strict = true

# Coordinate precision (decimal places)
coordinate_precision = 8

# Coordinate range validation (China region)
latitude_min = 15.0
latitude_max = 55.0
longitude_min = 70.0
longitude_max = 140.0

[Error_Handling]
# Continue processing on error
continue_on_error = true

# Error log detail level
error_detail_level = high

# Automatically fix common errors
auto_fix_common_errors = true

[Output]
# Output file naming pattern
# Variables: {airport}, {type}, {timestamp}
filename_pattern = {airport}_{type}.txt

# Create output directories
create_output_dirs = true

# Overwrite existing files
overwrite_existing = false
```

### Code Configuration Example

#### PDF Processing Configuration
```python
# PDF extract/utils.py configuration

# Waypoint category definitions
WAYPOINT_CATEGORIES = {
    'ENRT': 1,      # Enroute waypoint
    'VHF': 2,       # VHF navaid
    'NDB': 3,       # NDB navaid
    'TERMINAL': 4   # Terminal area waypoint
}

# Coordinate processing precision
COORDINATE_PRECISION = 8

# Area code translation table
AREA_CODE_TRANSLATION = {
    'KA': 'K1'  # Special area code conversion
}

# Error message color configuration (using colorama)
COLOR_CONFIG = {
    'error': Fore.RED,
    'warning': Fore.YELLOW,
    'info': Fore.GREEN,
    'debug': Fore.CYAN
}
```

#### Coordinate Extraction Configuration
```python
# PDF extract/waypoint_1_pdf.py configuration

# Page processing settings
PAGE_PROCESSING = {
    'enable_text_lines': True,
    'debug_output': False,
    'max_lines_per_page': 1000
}

# Coordinate calculation settings
COORDINATE_CALCULATION = {
    'precision_digits': 8,
    'handle_number_prefix': True,
    'auto_format_detection': True
}

# Character processing settings
CHARACTER_PROCESSING = {
    'degree_symbol_replacement': '°',
    'minute_symbol_replacement': "'",
    'second_symbol_replacement': '"',
    'special_char_mapping': {"¡ã": '°'}
}
```

## 🔧 Terminal Program Configuration (Terminal Patch)

### Configuration File: `config/terminal.conf`

```ini
[Encoder]
# Default input path
default_input_path = PDF extract/public

# Default output path
default_output_path = PDF extract/output

# File encoding
file_encoding = utf-8

# Enable encoding validation
enable_encoding_validation = true

[Processing_Rules]
# IF point identification rules
if_point_markers = c

# Encoding rules
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
# Supported airport code prefixes
supported_airport_prefixes = ZB,ZG,ZL,ZU,ZW,ZY,ZJ,ZS,ZH,ZP

# File encoding detection
auto_detect_encoding = true

# Encoding fix rules
fix_rules = {
    'appch_gy_m_rule': true,
    'pure_alpha_rule': true,
    'sid_runway_rule': true,
    'procedure_end_rule': true
}

[Validation]
# Format validation
validate_format = true

# Runway identifier validation
validate_runway_identifiers = true

# Procedure type validation
validate_procedure_types = true
```

### Encoder Configuration Example

```python
# Terminal Patch/terminal_encoder.py configuration

# Procedure type markers
PROCEDURE_MARKERS = {
    'approach': 'c',
    'departure': 'd',
    'arrival': 'a'
}

# Encoding mappings
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

# File processing settings
FILE_PROCESSING = {
    'batch_mode': True,
    'show_progress': True,
    'create_backup': False,
    'output_encoding': 'utf-8'
}
```

## 🛩️ X-Plane CIFP Module Configuration

### Configuration File: `config/cifp.conf`

```ini
[General]
# X-Plane version compatibility
xplane_version = 12

# CIFP data format version
cifp_format_version = 1101

[Paths]
# Input data path
input_path = /Users/lujuncheng/Downloads/XP导航数据/编码重构

# Output folder
output_folder = /Users/lujuncheng/Downloads/XP导航数据/CIFP

# X-Plane installation path
xplane_path = /Users/lujuncheng/Downloads/xplane12_native_2502

# CSV data folder
csv_folder = /Users/lujuncheng/Downloads/NAIP2502

[Processing]
# Process procedure types
process_departures = true
process_arrivals = true
process_approaches = true

# Generate runway information
generate_runway_info = true

# Procedure mixing mode
enable_procedure_mixing = true

[NavAid_Processing]
# VOR data file
vor_data_file = VOR.csv

# NDB data file  
ndb_data_file = NDB.csv

# Frequency processing
frequency_conversion = true

# Altitude unit conversion (meters to feet)
altitude_conversion_factor = 3.28

[Waypoint_Processing]
# Waypoint type coding
waypoint_type_coding = true

# ARINC 424 compatibility
arinc424_compatibility = true

# Process area codes
process_area_codes = true

[Validation]
# Coordinate validation tolerance
coordinate_tolerance = 0.2

# Waypoint identifier validation
validate_identifiers = true

# Procedure integrity check
validate_procedure_integrity = true
```

### Waypoint System Configuration

```python
# X-Plane CIFP/utils.py configuration

# Waypoint category definitions
WAYPOINT_CATEGORIES = {
    'UNAVAILABLE': -1,  # Status unavailable
    'WAYPOINT': 1,      # Waypoint
    'VHF_NAVAID': 2,    # VHF Navaid
    'NDB_NAVAID': 3     # NDB Navaid
}

# Coordinate comparison tolerance (degrees)
COORDINATE_TOLERANCE = 0.2

# Area code mapping
AREA_CODE_MAPPING = {
    # China Flight Information Region codes
    'ZBPE': 'ZB',  # Beijing
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

## 📊 Data Processing Configuration

### CSV Data Configuration

```python
# General CSV processing configuration
CSV_CONFIG = {
    'encoding': 'gbk',          # Chinese CSV usually uses GBK encoding
    'delimiter': ',',
    'quotechar': '"',
    'skipinitialspace': True,
    'na_values': ['', 'N/A', 'NULL', '0.0']
}

# Required CSV fields
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

### Database Configuration
```python
# X-Plane CIFP/database.py configuration

DATABASE_CONFIG = {
    'connection_timeout': 30,
    'auto_commit': True,
    'encoding': 'utf-8',
    'journal_mode': 'WAL',  # SQLite optimization
    'synchronous': 'NORMAL'
}

# Table schemas
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

## 🔧 Logging Configuration

### Logging Configuration File: `config/logging.conf`

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

### Python Logging Configuration Example

```python
import logging
import logging.config
from pathlib import Path

# Load logging configuration
def setup_logging(config_path='config/logging.conf'):
    """Set up logging configuration"""
    if Path(config_path).exists():
        logging.config.fileConfig(config_path)
    else:
        # Default configuration
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('logs/nav-data.log')
            ]
        )

# Loggers for each module
def get_logger(name):
    """Get module-specific logger"""
    return logging.getLogger(name)

# Usage example
logger = get_logger('airway')
logger.info('Airway processing started')
```

## ⚙️ Performance Optimization Configuration

### Memory Management Configuration
```python
# Memory usage optimization
MEMORY_CONFIG = {
    'chunk_size': 10000,        # Chunk processing size
    'max_memory_usage': '2GB',  # Maximum memory usage
    'garbage_collection': True, # Enable garbage collection
    'buffer_size': 8192        # File read buffer size
}

# Concurrency processing configuration
CONCURRENCY_CONFIG = {
    'max_workers': 4,           # Maximum worker threads
    'enable_multiprocessing': False, # Enable multiprocessing
    'thread_pool_size': 2       # Thread pool size
}
```

### Caching Configuration
```python
# Cache settings
CACHE_CONFIG = {
    'enable_cache': True,
    'cache_size': 1000,
    'cache_ttl': 3600,          # Cache Time-To-Live (seconds)
    'cache_directory': 'cache/'
}
```

## 🔍 Configuration Validation

### Configuration Validation Script

Create `validate_config.py`:

```python
#!/usr/bin/env python3
"""
Configuration File Validation Script
"""
import configparser
import os
import sys
from pathlib import Path

def validate_airway_config(config_file):
    """Validate airway module configuration"""
    config = configparser.ConfigParser()
    config.read(config_file)
    
    errors = []
    
    # Check for required sections
    required_sections = ['General', 'Input', 'Output', 'Filtering']
    for section in required_sections:
        if section not in config:
            errors.append(f"Missing configuration section: [{section}]")
    
    # Check for file paths
    if 'Input' in config:
        for key in ['csv_file', 'earth_fix_file', 'earth_nav_file']:
            if key in config['Input']:
                file_path = config['Input'][key]
                if not os.path.exists(file_path):
                    errors.append(f"File does not exist: {file_path}")
    
    return errors

def validate_all_configs():
    """Validate all configuration files"""
    config_dir = Path('config')
    if not config_dir.exists():
        print("❌ Configuration directory does not exist")
        return False
    
    config_files = {
        'airway.conf': validate_airway_config,
        # Can add more configuration validation functions
    }
    
    all_valid = True
    for config_file, validator in config_files.items():
        config_path = config_dir / config_file
        if config_path.exists():
            errors = validator(str(config_path))
            if errors:
                print(f"❌ {config_file} configuration errors:")
                for error in errors:
                    print(f"   - {error}")
                all_valid = False
            else:
                print(f"✅ {config_file} configuration is correct")
        else:
            print(f"⚠️  {config_file} configuration file does not exist (using default values)")
    
    return all_valid

if __name__ == "__main__":
    if validate_all_configs():
        print("\n🎉 All configurations validated successfully!")
        sys.exit(0)
    else:
        print("\n❌ Configuration validation failed, please fix the issues above")
        sys.exit(1)
```

## 📚 Configuration Best Practices

### 1. Configuration File Management
- Use version control to manage configuration files
- Create different configuration files for different environments
- Regularly back up important configurations

### 2. Security Considerations
- Do not store sensitive information in configuration files
- Use environment variables to store variable information such as paths
- Set appropriate file permissions

### 3. Performance Optimization
- Adjust batch size according to system resources
- Set reasonable memory usage limits
- Enable appropriate caching mechanisms

### 4. Error Handling
- Set default values for all critical configuration items
- Implement a configuration validation mechanism
- Provide clear error messages

---

**Configuration complete!** 🎯 You can now adjust the configuration parameters for each module according to your specific needs. It is recommended to run the configuration validation script before first use to ensure correct settings.
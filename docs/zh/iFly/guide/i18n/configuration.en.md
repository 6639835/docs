# ⚙️ iFly Navigation Data Converter Configuration Guide

This guide details the various configuration options for the iFly Navigation Data Converter, helping you optimize the conversion process according to your needs.

## 🎯 Configuration Overview

The converter provides a flexible configuration system that supports:
- **📁 Path Configuration** - Customizing input and output paths
- **📊 Processing Parameters** - Adjusting data processing precision and scope
- **⚡ Performance Optimization** - Memory and processing speed optimization
- **🔍 Validation Options** - Data integrity validation settings

## 📋 Configuration Methods

### 1. Interactive Configuration (Recommended)
```bash
# Run the converter and configure as prompted
python main.py
```

### 2. Configuration File
Create a `config.json` file:
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

### 3. Environment Variables
```bash
export IFLY_FENIX_DB="/path/to/nd.db3"
export IFLY_CSV_FILE="/path/to/RTE_SEG.csv"
export IFLY_INSTALL_PATH="/path/to/ifly-aircraft-737max8"
```

## 🔧 Core Configuration Options

### File Path Configuration

#### Fenix Database Path
**Parameter Name**: `fenix_db_path`  
**Description**: Location of the Fenix A320 navigation database file  
**Default Value**: Auto-detect  

**Common Locations:**
```bash
# Windows
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Custom path example
/Users/username/Documents/Fenix/navdata/nd.db3
```

**Validation Method:**
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
        print(f"Database validation failed: {e}")
        return False
```

#### NAIP CSV File Path
**Parameter Name**: `csv_file_path`  
**Description**: Chinese Civil Aviation Route Segment Data File  
**Format Requirements**: UTF-8 encoded CSV file  

**File Structure Example:**
```csv
ROUTE_ID,SEQUENCE_NUMBER,WAYPOINT_ID,LATITUDE,LONGITUDE,MAG_VARIATION
A1,1,ZSAM,39.916667,116.383333,7.2
A1,2,VOR01,39.833333,116.500000,7.1
```

**Required Columns:**
- `WAYPOINT_ID`: Waypoint Identifier
- `LATITUDE`: Latitude (Decimal Degrees)
- `LONGITUDE`: Longitude (Decimal Degrees)
- `ROUTE_ID`: Route Identifier

#### iFly Installation Path
**Parameter Name**: `ifly_path`  
**Description**: iFly 737 MAX 8 Installation Directory  
**Auto-detection**: Supported  

**Detection Order:**
1. Community Package: `Community\ifly-aircraft-737max8\`
2. Official Package: `Official\asobo-aircraft-ifly-737max8\`
3. Manually specified path

## ⚙️ Processing Parameter Configuration

### Terminal Procedure ID Range

#### Starting ID Setting
**Parameter Name**: `terminal_id_start`  
**Description**: Starting ID number for terminal procedures  
**Default Value**: `1000`  
**Range**: `1 - 9999`  

**Suggested Settings:**
```python
# Set according to airport count
small_airports = 1000   # < 50 airports
medium_airports = 2000  # 50-200 airports  
large_airports = 5000   # > 200 airports
```

#### ID Assignment Strategy
```python
def calculate_terminal_ids(airport_count, start_id=1000):
    """Calculate terminal procedure ID assignment"""
    # Reserve 20 IDs per airport
    id_per_airport = 20
    total_ids_needed = airport_count * id_per_airport
    
    if start_id + total_ids_needed > 9999:
        print("⚠️ Warning: ID range may be insufficient")
        return start_id, 9999
    
    return start_id, start_id + total_ids_needed
```

### Coordinate Precision Configuration

#### Precision Setting
**Parameter Name**: `coordinate_precision`  
**Description**: Number of decimal places for coordinates  
**Default Value**: `8`  
**Range**: `4 - 12`  

**Precision Comparison:**
| Precision | Error Range | Applicable Scenario |
|-----------|-------------|---------------------|
| 4 digits  | ~11 meters  | Basic Navigation    |
| 6 digits  | ~1.1 meters | Standard Navigation |
| 8 digits  | ~1.1 cm     | High-Precision Navigation |
| 10 digits | ~1.1 mm     | Ultra-High Precision|

**Setting Example:**
```python
# Coordinate examples with different precisions
coord_4 = 39.9167  # 4-digit precision
coord_6 = 39.916667  # 6-digit precision  
coord_8 = 39.91666700  # 8-digit precision
```

### Magnetic Declination Calculation Configuration

#### WMM Model Parameters
**Model Version**: WMM-2025  
**Update Frequency**: Every 5 years  
**Calculation Precision**: 0.1 degrees  

**Calculation Parameters:**
```python
{
    "model_year": 2025,
    "altitude": 0,  # Sea level altitude (meters)
    "calculation_date": "auto",  # Automatically use current date
    "use_local_time": true  # Use local time
}
```

#### Magnetic Declination Validation
```python
def validate_magnetic_declination(declination):
    """Validate the reasonableness of magnetic declination value"""
    # Global magnetic declination range is approximately -30° to +30°
    if -30.0 <= declination <= 30.0:
        return True
    else:
        print(f"⚠️ Abnormal magnetic declination value: {declination}°")
        return False
```

## 🚀 Performance Optimization Configuration

### Memory Management

#### Batch Size
**Parameter Name**: `batch_size`  
**Description**: Number of records processed in a single batch  
**Default Value**: `1000`  
**Suggested Settings:**

```python
# Adjust based on available memory
import psutil

def get_optimal_batch_size():
    available_memory = psutil.virtual_memory().available
    memory_gb = available_memory / (1024**3)
    
    if memory_gb < 4:
        return 500   # Below 4GB
    elif memory_gb < 8:
        return 1000  # 4-8GB
    else:
        return 2000  # Above 8GB
```

#### Memory Monitoring
```python
def monitor_memory_usage():
    """Monitor memory usage"""
    import psutil
    memory = psutil.virtual_memory()
    print(f"Memory usage: {memory.percent}%")
    print(f"Available memory: {memory.available / (1024**2):.1f} MB")
```

### Concurrent Processing Configuration

#### Thread Count Setting
**Parameter Name**: `max_workers`  
**Description**: Maximum number of concurrent threads  
**Default Value**: Number of CPU cores  

**Setting Strategy:**
```python
import os

def get_optimal_workers():
    cpu_count = os.cpu_count()
    
    # Reserve one core for the system
    if cpu_count <= 2:
        return 1
    elif cpu_count <= 4:
        return cpu_count - 1
    else:
        return min(cpu_count - 2, 8)  # Maximum 8 threads
```

#### I/O Optimization
```json
{
    "use_ssd_optimization": true,    # SSD optimization
    "buffer_size": 8192,            # Buffer size (bytes)
    "enable_compression": false,     # Temporary file compression
    "temp_dir": "/tmp"              # Temporary directory
}
```

## 🔍 Validation and Quality Control

### Data Validation Configuration

#### Validation Level
**Parameter Name**: `validation_level`  
**Description**: Data validation intensity  
**Options**: `basic`, `standard`, `strict`  

**Validation Content:**
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

#### Error Handling Strategy
**Parameter Name**: `error_handling`  
**Options**: `stop`, `skip`, `fix`  

```python
error_strategies = {
    "stop": "Stop immediately upon error",
    "skip": "Skip erroneous records and continue processing", 
    "fix": "Attempt to automatically fix errors"
}
```

### Output Quality Control

#### File Naming Rules
```python
output_naming = {
    "use_timestamp": true,          # Use timestamp
    "include_version": true,        # Include version number
    "airac_suffix": true,          # Add AIRAC suffix
    "backup_original": true        # Backup original file
}

# Example generated filenames:
# WPNAVRTE_2024-12-15_v2.0_2508.txt
# FMC_Ident_2024-12-15_v2.0_2508.txt
```

## 📅 AIRAC Cycle Configuration

### Automatic Calculation Settings
**Parameter Name**: `airac_auto_calculate`  
**Default Value**: `true`  
**Timezone**: UTC+8 (Beijing Time)  

```python
airac_config = {
    "auto_calculate": true,
    "timezone": "Asia/Shanghai",
    "reference_date": "2024-01-11",  # AIRAC 2401 start date
    "cycle_days": 28,                # Standard cycle days
    "format": "YYWW"                # Format: YearYearWeekWeek
}
```

### Manual Setting
```python
# Manually specify AIRAC cycle
manual_airac = {
    "cycle": "2508",
    "effective_date": "2025-02-20",
    "expiry_date": "2025-03-19"
}
```

## 🎛️ Advanced Configuration

### Logging Configuration
```python
logging_config = {
    "level": "INFO",               # DEBUG, INFO, WARNING, ERROR
    "file": "converter.log",       # Log file name
    "max_size": "10MB",           # Maximum file size
    "backup_count": 3,            # Number of backup files
    "format": "%(asctime)s - %(levelname)s - %(message)s"
}
```

### UI Configuration
```python
ui_config = {
    "theme": "dark",              # Theme: dark, light, auto
    "progress_style": "bar",      # Progress bar style: bar, spinner
    "color_scheme": "rich",       # Color scheme
    "show_details": true,         # Show details
    "animation": true            # Enable animation effects
}
```

### Debug Configuration
```python
debug_config = {
    "enable_debug": false,        # Enable debug mode
    "save_intermediate": false,   # Save intermediate results
    "verbose_logging": false,     # Verbose logging
    "performance_profiling": false, # Performance profiling
    "memory_tracking": false     # Memory tracking
}
```

## 📝 Configuration File Templates

### Complete Configuration Example
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

### Minimal Configuration Example
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "terminal_id_start": 1000
}
```

## 🛠️ Configuration Tools

### Configuration Validation Script
```python
def validate_config(config_path):
    """Validate configuration file validity"""
    import json
    import jsonschema
    
    # Configuration schema
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
        print("✅ Configuration validation passed")
        return True
    except Exception as e:
        print(f"❌ Configuration validation failed: {e}")
        return False
```

### Configuration Generator
```python
def generate_config_template():
    """Generate configuration template"""
    template = {
        "fenix_db_path": "Please enter Fenix database path",
        "csv_file_path": "Please enter CSV file path", 
        "ifly_path": "auto_detect",
        "terminal_id_start": 1000,
        "coordinate_precision": 8
    }
    
    with open('config_template.json', 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)
    
    print("Configuration template generated: config_template.json")
```

---

**Next Steps**: After completing the configuration, please refer to the [Usage Instructions](usage.md) to start your first data conversion! 🚀
# ⚙️ TFDI Navdata Converter Configuration Guide

This guide details the various configuration options for the TFDI Navdata Converter, helping you optimize the conversion process and output results according to your needs.

## 🎯 Configuration Overview

The TFDI Converter employs a flexible configuration system that supports:
- **📁 Output Configuration** - Customize output directory and file format
- **📊 Data Processing Parameters** - Adjust coordinate precision and data filtering
- **⚡ Performance Optimization** - Memory management and processing speed tuning
- **🔍 Validation Options** - Data integrity and quality control settings

## 📋 Configuration Methods

### 1. Default Configuration (Recommended for Novices)
```python
# Run with default configuration
python Fenix2TFDINavDataConverter.py
# The converter will use the preset optimal configuration
```

### 2. In-Code Configuration
```python
from dataclasses import dataclass

@dataclass
class ConverterConfig:
    """Converter Configuration Class"""
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs" 
    archive_name: str = "Primary.7z"
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
```

### 3. Interactive Configuration
```python
# Interactive configuration during converter runtime
# Users can set key parameters during the execution process
```

## 🔧 Core Configuration Options

### Output Path Configuration

#### Output Directory Settings
**Parameter Name**: `output_dir`  
**Default Value**: `"Primary"`  
**Description**: Output directory for all JSON files

**Usage Example:**
```python
config = ConverterConfig(
    output_dir="TFDI_NavData",  # Custom output directory name
)
```

**Directory Structure:**
```
TFDI_NavData/           # Main output directory
├── Airports.json       # Airport data
├── Runways.json        # Runway data
├── Waypoints.json      # Waypoint data
├── ...                 # Other JSON files
└── ProcedureLegs/      # Procedure leg subdirectory
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

#### Procedure Leg Directory
**Parameter Name**: `procedure_legs_dir`  
**Default Value**: `"Primary/ProcedureLegs"`  
**Description**: Output directory for terminal procedure leg files

**Configuration Example:**
```python
config = ConverterConfig(
    output_dir="NavData",
    procedure_legs_dir="NavData/Procedures",  # Custom procedure leg directory
)
```

#### Archive Name
**Parameter Name**: `archive_name`  
**Default Value**: `"Primary.7z"`  
**Description**: Filename for the final generated archive

**Naming Convention:**
```python
# Naming with timestamp
import datetime
now = datetime.datetime.now()
config = ConverterConfig(
    archive_name=f"TFDI_NavData_{now.strftime('%Y%m%d_%H%M')}.7z"
)

# Naming with version information
config = ConverterConfig(
    archive_name="TFDI_NavData_v1.0.7z"
)
```

### Data Processing Configuration

#### Coordinate Precision Settings
**Parameter Name**: `coordinate_precision`  
**Default Value**: `8`  
**Range**: `4 - 12`  
**Description**: Number of decimal places for geographical coordinates

**Precision Comparison Table:**
| Precision | Error Range | Applicable Scenarios | File Size Impact |
|-----------|-------------|----------------------|------------------|
| 4 digits  | ~11 meters  | Basic Navigation     | Minimum          |
| 6 digits  | ~1.1 meters | Standard Navigation  | Small            |
| 8 digits  | ~1.1 cm     | High Precision Nav.  | Default          |
| 10 digits | ~1.1 mm     | Ultra-High Precision | Large            |
| 12 digits | ~0.1 mm     | Survey-Grade Precision | Maximum          |

**Configuration Example:**
```python
# High precision configuration (Recommended)
config = ConverterConfig(coordinate_precision=8)

# Balanced configuration (Smaller file size)
config = ConverterConfig(coordinate_precision=6)

# Ultra-high precision configuration (Larger file size)
config = ConverterConfig(coordinate_precision=10)
```

#### VNAV Threshold Setting
**Parameter Name**: `vnav_threshold`  
**Default Value**: `2.5`  
**Unit**: Degrees  
**Description**: VNAV angle threshold for FAF point detection

**Threshold Meaning:**
```python
# Strict FAF detection (Fewer but more accurate FAF points)
config = ConverterConfig(vnav_threshold=2.0)

# Standard FAF detection (Balances accuracy and coverage)
config = ConverterConfig(vnav_threshold=2.5)

# Lenient FAF detection (More FAF points, possibly including false positives)
config = ConverterConfig(vnav_threshold=3.0)
```

**FAF Detection Logic:**
```python
def is_faf_point(vnav_angle: float, vnav_threshold: float) -> bool:
    """Determines if it is an FAF point"""
    return (vnav_angle is not None and 
            vnav_angle <= vnav_threshold and 
            vnav_angle > 0)
```

## 🚀 Performance Configuration

### SQLite Database Optimization

#### Database Connection Settings
```python
# SQLite performance optimization configuration
sqlite_pragmas = {
    "journal_mode": "WAL",          # Write-Ahead Logging mode
    "synchronous": "NORMAL",        # Balances performance and safety
    "cache_size": "10000",          # Number of cache pages (approx. 40MB)
    "temp_store": "MEMORY",         # Temporary data stored in memory
    "mmap_size": "268435456",       # Memory-mapped size (256MB)
}

def optimize_database_connection(conn):
    """Optimizes database connection"""
    for pragma, value in sqlite_pragmas.items():
        conn.execute(f"PRAGMA {pragma}={value}")
```

#### Batch Processing Settings
**Parameter**: Batch Size  
**Default Value**: `1000`  
**Description**: Number of records processed in a single batch

**Configuration Strategy:**
```python
import psutil

def get_optimal_batch_size():
    """Automatically adjusts batch size based on system memory"""
    available_memory_gb = psutil.virtual_memory().available / (1024**3)
    
    if available_memory_gb < 4:
        return 500      # Low-memory system
    elif available_memory_gb < 8:
        return 1000     # Standard configuration
    else:
        return 2000     # High-memory system

# Usage example
batch_size = get_optimal_batch_size()
```

### Memory Management Configuration

#### Memory Monitoring Settings
```python
class MemoryMonitor:
    """Memory Monitoring Configuration"""
    
    def __init__(self):
        self.memory_limit_gb = 6        # Memory usage limit
        self.warning_threshold = 0.8    # Warning threshold (80%)
        self.critical_threshold = 0.9   # Critical threshold (90%)
    
    def check_memory_usage(self):
        """Checks memory usage"""
        memory = psutil.virtual_memory()
        usage_ratio = memory.used / memory.total
        
        if usage_ratio > self.critical_threshold:
            return "CRITICAL"
        elif usage_ratio > self.warning_threshold:
            return "WARNING"
        else:
            return "NORMAL"
```

#### Garbage Collection Configuration
```python
import gc

def configure_garbage_collection():
    """Configures garbage collection"""
    # Set garbage collection thresholds
    gc.set_threshold(700, 10, 10)
    
    # Enable garbage collection debugging (use only for debugging)
    # gc.set_debug(gc.DEBUG_STATS)

def force_cleanup():
    """Forces memory cleanup"""
    gc.collect()
    gc.collect()  # Run twice to ensure thorough cleanup
    gc.collect()
```

## 🔍 Validation and Quality Control

### Data Validation Configuration

#### Validation Level Settings
```python
class ValidationConfig:
    """Data Validation Configuration"""
    
    def __init__(self, level="standard"):
        self.level = level
        self.checks = self._get_checks_for_level(level)
    
    def _get_checks_for_level(self, level):
        """Gets check items based on level"""
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

#### Coordinate Validation Configuration
```python
class CoordinateValidator:
    """Coordinate Validation Configuration"""
    
    def __init__(self):
        # Valid coordinate range
        self.lat_min = -90.0
        self.lat_max = 90.0
        self.lon_min = -180.0
        self.lon_max = 180.0
        
        # Suspicious coordinate range (possibly erroneous data)
        self.suspicious_zones = [
            {"lat": (0, 0), "lon": (0, 0)},      # Origin coordinates might be incorrect
            {"lat": (90, 90), "lon": (0, 0)},    # Polar coordinates require special check
        ]
    
    def validate_coordinate(self, lat, lon):
        """Validates a single coordinate"""
        # Check basic range
        if not (self.lat_min <= lat <= self.lat_max):
            return False, f"Latitude out of range: {lat}"
        
        if not (self.lon_min <= lon <= self.lon_max):
            return False, f"Longitude out of range: {lon}"
        
        # Check suspicious coordinates
        for zone in self.suspicious_zones:
            if (zone["lat"][0] <= lat <= zone["lat"][1] and 
                zone["lon"][0] <= lon <= zone["lon"][1]):
                return True, f"Suspicious coordinate: ({lat}, {lon})"
        
        return True, "Coordinate valid"
```

### Output Quality Control

#### File Format Validation
```python
import json

class OutputValidator:
    """Output File Validation Configuration"""
    
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
            "Airports.json": 1024,      # At least 1KB
            "Waypoints.json": 10240,    # At least 10KB
        }
    
    def validate_json_file(self, file_path):
        """Validates JSON file format"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, (dict, list)):
                return False, "JSON root object must be a dictionary or a list"
            
            if isinstance(data, dict) and len(data) == 0:
                return False, "JSON object is empty"
            
            return True, "JSON format is valid"
            
        except json.JSONDecodeError as e:
            return False, f"JSON format error: {e}"
        except Exception as e:
            return False, f"File read error: {e}"
```

## 🎛️ Advanced Configuration

### Logging Configuration

#### Log Level and Format
```python
import logging
from rich.logging import RichHandler

class LoggingConfig:
    """Logging Configuration Class"""
    
    def __init__(self, level="INFO"):
        self.level = level
        self.format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        self.file_name = "tfdi_converter.log"
        self.max_file_size = 10 * 1024 * 1024  # 10MB
        self.backup_count = 3
    
    def setup_logging(self):
        """Sets up the logging system"""
        # Create logger
        logger = logging.getLogger("TFDIConverter")
        logger.setLevel(getattr(logging, self.level))
        
        # Rich console handler
        console_handler = RichHandler(rich_tracebacks=True)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter("%(message)s")
        console_handler.setFormatter(console_formatter)
        
        # File handler
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
        
        # Add handlers
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)
        
        return logger
```

### Compression Configuration

#### Compression Level Settings
```python
import py7zr

class CompressionConfig:
    """Compression Configuration Class"""
    
    def __init__(self):
        self.compression_level = 5      # Compression level (1-9)
        self.method = "LZMA2"          # Compression algorithm
        self.solid = True              # Solid compression
        self.multi_threading = True    # Multi-threading compression
    
    def create_archive(self, source_dir, archive_path):
        """Creates an archive"""
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

### Debugging Configuration

#### Debug Mode Settings
```python
class DebugConfig:
    """Debugging Configuration Class"""
    
    def __init__(self, debug_mode=False):
        self.debug_mode = debug_mode
        self.save_intermediate_files = debug_mode
        self.verbose_logging = debug_mode
        self.performance_profiling = debug_mode
        self.memory_tracking = debug_mode
    
    def enable_debug_features(self):
        """Enables debugging features"""
        if self.debug_mode:
            # Enable verbose logging
            logging.getLogger().setLevel(logging.DEBUG)
            
            # Enable performance profiling
            if self.performance_profiling:
                import cProfile
                self.profiler = cProfile.Profile()
                self.profiler.enable()
            
            # Enable memory tracking
            if self.memory_tracking:
                import tracemalloc
                tracemalloc.start()
```

## 📝 Full Configuration Examples

### Basic Configuration Example
```python
# Simple configuration suitable for novices
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8,
    vnav_threshold=2.5
)
```

### High-Performance Configuration Example
```python
# Performance optimized configuration suitable for high-end hardware
config = ConverterConfig(
    output_dir="Primary_HighPerf",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# Coupled with performance optimization settings
batch_size = 2000
memory_limit_gb = 8
enable_multi_threading = True
```

### High-Quality Configuration Example
```python
# Suitable for scenarios with extremely high data quality requirements
config = ConverterConfig(
    output_dir="Primary_HighQuality", 
    coordinate_precision=10,        # Higher precision
    vnav_threshold=2.0             # Stricter FAF detection
)

# Coupled with strict validation
validation_level = "strict"
enable_duplicate_detection = True
enable_consistency_check = True
```

### Debugging Configuration Example
```python
# Configuration for development and debugging
config = ConverterConfig(
    output_dir="Debug_Output",
    coordinate_precision=6,         # Reduced precision to speed up processing
    vnav_threshold=3.0             # Lenient threshold for easier debugging
)

# Debugging options
debug_config = DebugConfig(debug_mode=True)
save_intermediate_files = True
verbose_logging = True
```

## 🔧 Configuration File Management

### Configuration File Format
```python
# config.py
from dataclasses import dataclass, asdict
import json

@dataclass 
class TFDIConverterConfig:
    """Complete TFDI Converter Configuration"""
    # Output Configuration
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs"
    archive_name: str = "Primary.7z"
    
    # Data Processing Configuration
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
    
    # Performance Configuration
    batch_size: int = 1000
    memory_limit_gb: int = 6
    
    # Validation Configuration
    validation_level: str = "standard"
    enable_coordinate_check: bool = True
    
    # Logging Configuration
    log_level: str = "INFO"
    log_file: str = "tfdi_converter.log"
    
    def save_to_file(self, file_path: str):
        """Saves configuration to file"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(asdict(self), f, indent=2)
    
    @classmethod
    def load_from_file(cls, file_path: str):
        """Loads configuration from file"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls(**data)
```

### Configuration Templates
```python
# Create configuration templates
def create_config_templates():
    """Creates various configuration templates"""
    
    # Default configuration
    default_config = TFDIConverterConfig()
    default_config.save_to_file("config_default.json")
    
    # High-performance configuration
    performance_config = TFDIConverterConfig(
        batch_size=2000,
        memory_limit_gb=8,
        coordinate_precision=6
    )
    performance_config.save_to_file("config_performance.json")
    
    # High-quality configuration
    quality_config = TFDIConverterConfig(
        coordinate_precision=10,
        vnav_threshold=2.0,
        validation_level="strict"
    )
    quality_config.save_to_file("config_quality.json")

# Use configuration
config = TFDIConverterConfig.load_from_file("config_performance.json")
```

---

**Next Steps**: Once configured, please refer to the [Usage Instructions](usage.md) to begin your TFDI data conversion! 🚁✨

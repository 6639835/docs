# 🚀 TFDI Navigation Data Converter User Guide

This guide will detail how to use the TFDI Navigation Data Converter, from basic operations to advanced features, to help you successfully complete the navigation data conversion from Fenix to TFDI.

## 🎯 Preparation Before Use

### 1. Environment Checklist

Before starting the conversion, please confirm the following environment requirements:

- ✅ **Python Environment**: 3.8+ installed and configured
- ✅ **Dependencies**: rich, pandas, py7zr installed
- ✅ **System Resources**: At least 4GB RAM, 1GB available disk space
- ✅ **Fenix Database**: nd.db3 file ready
- ✅ **TFDI MD-11**: Installed in Microsoft Flight Simulator

### 2. File Preparation

#### Fenix Database Location
```bash
# Common Windows Path
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Verify file existence
python -c "import pathlib; print('Database exists' if pathlib.Path('nd.db3').exists() else 'Database does not exist')"
```

#### File Integrity Check
```python
import sqlite3
import os

def check_database_file(db_path):
    """Checks the integrity of a database file"""
    print(f"🔍 Checking database: {db_path}")
    
    # Check file existence
    if not os.path.exists(db_path):
        print("❌ File does not exist")
        return False
    
    # Check file size
    size_mb = os.path.getsize(db_path) / (1024 * 1024)
    print(f"📁 File size: {size_mb:.1f} MB")
    
    if size_mb < 10:
        print("⚠️ File may be too small")
    
    # Check database connection
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        conn.close()
        
        print(f"✅ Contains {len(tables)} tables")
        return True
        
    except sqlite3.Error as e:
        print(f"❌ Database error: {e}")
        return False

# Usage example
check_database_file("path/to/nd.db3")
```

## 🖥️ Interactive Usage

### Launching the Converter

```bash
# Basic launch
python Fenix2TFDINavDataConverter.py

# Launch with debug information
python Fenix2TFDINavDataConverter.py --debug

# View help information
python Fenix2TFDINavDataConverter.py --help
```

### Welcome Screen

After the converter starts, you will see a professional welcome screen:

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 Environment check...
✅ Python 3.9.16
✅ Rich 12.6.0
✅ Pandas 1.5.3
✅ py7zr 0.20.2
✅ System Memory: 16 GB
✅ Available Disk: 128 GB

🚀 Ready to start conversion...
```

## 📋 Detailed Conversion Process

### Step One: Database File Selection

```
╭─────────────────────────────────────── 📂 Select Database File ───────────────────────────────────────╮
│                                                                                                │
│ Please enter the Fenix navigation database file path:                                          │
│                                                                                                │
│ 💡 Tip: You can drag and drop the file to the terminal, or enter the full path                 │
│                                                                                                │
│ Common locations:                                                                              │
│ • %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\...\navdata\nd.db3              │
│                                                                                                │
╰────────────────────────────────────────────────────────────────────────────────────────────────╯

Please enter the file path: 
```

**Input Methods:**
```bash
# Method 1: Directly enter the path
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Method 2: Drag and drop the file to the terminal window
# (The system will automatically fill in the path)

# Method 3: Use a relative path (if the file is in the current directory)
./nd.db3
```

### Step Two: Database Validation

```
╭─────────────────────────────────────── 🔍 Validate Database ─────────────────────────────────────────╮
│                                                                                              │
│ Validating database file...                                                                  │
│                                                                                              │
│ ✅ File exists: nd.db3 (142.5 MB)                                                            │
│ ✅ Database format: SQLite 3.x                                                               │
│ ✅ Encoding format: UTF-8                                                                    │
│                                                                                              │
│ 🔍 Checking database table structure...                                                      │
│ ████████████████████████████████████████ 12/12 (100%)                                      │
│                                                                                              │
│ ✅ All required tables exist                                                                 │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

**Validation Items:**
- ✅ File existence and readability
- ✅ SQLite database format
- ✅ Integrity of required table structure
- ✅ Correctness of data encoding
- ✅ Foreign key relationship integrity

### Step Three: Terminal ID Configuration

```
╭─────────────────────────────────────── ⚙️ Configure Conversion Parameters ───────────────────────────────────────╮
│                                                                                              │
│ Terminal Procedure Start ID Setting                                                          │
│                                                                                              │
│ 💡 Description: Terminal IDs are used to identify terminal procedures within the TFDI system │
│                                                                                              │
│ 📊 Recommended Values:                                                                       │
│ • Small datasets (< 50 airports): 1000                                                       │
│ • Medium datasets (50-200 airports): 2000                                                    │
│ • Large datasets (> 200 airports): 5000                                                      │
│                                                                                              │
│ ⚠️ Note: Avoid conflicts with existing TFDI data                                             │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯

Please enter the starting Terminal ID [Default: 1000]: 
```

**Configuration Considerations:**
```python
def calculate_terminal_id_range(airport_count, start_id=1000):
    """Calculates the terminal ID range"""
    # Number of IDs reserved per airport
    ids_per_airport = 20
    
    # Calculate total number of IDs needed
    total_ids_needed = airport_count * ids_per_airport
    
    # Add buffer (20%)
    buffer = int(total_ids_needed * 0.2)
    total_with_buffer = total_ids_needed + buffer
    
    end_id = start_id + total_with_buffer
    
    print(f"📊 ID Allocation Estimate:")
    print(f"   Number of airports: {airport_count}")
    print(f"   Start ID: {start_id}")
    print(f"   End ID: {end_id}")
    print(f"   Available range: {total_with_buffer} IDs")
    
    return start_id, end_id
```

### Step Four: Conversion Confirmation

```
┌─────────────────────────────────────── ✅ Conversion Configuration Confirmation ───────────────────────────────────────┐
│                                                                                             │
│ 📂 Input File                                                                               │
│ └─ Database: nd.db3 (142.5 MB)                                                              │
│                                                                                             │
│ 📁 Output Configuration                                                                     │
│ ├─ Output Directory: Primary/                                                               │
│ ├─ Procedure Legs Directory: Primary/ProcedureLegs/                                         │
│ └─ Archive: Primary.7z                                                                      │
│                                                                                             │
│ ⚙️ Conversion Parameters                                                                     │
│ ├─ Starting Terminal ID: 1000                                                               │
│ ├─ Coordinate Precision: 8 decimal places                                                   │
│ ├─ VNAV Threshold: 2.5°                                                                     │
│ └─ FAF Detection: Enabled                                                                   │
│                                                                                             │
│ 📊 Estimated Processing                                                                      │
│ ├─ Number of Tables: 12                                                                     │
│ ├─ Estimated Records: ~156,000                                                              │
│ ├─ Estimated Time: 5-8 minutes                                                              │
│ └─ Output Size: ~15-25 MB                                                                   │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

Confirm start conversion? [Y/n]: 
```

## 🔄 Conversion Progress Monitoring

### Database Connection and Optimization

```
╭─────────────────────────────────────── 🔗 Database Connection ─────────────────────────────────────────╮
│                                                                                              │
│ Connecting to database...                                                                    │
│                                                                                              │
│ 🔧 Applying SQLite optimization settings:                                                    │
│ ├─ journal_mode = WAL                                                                        │
│ ├─ synchronous = NORMAL                                                                      │
│ ├─ cache_size = 10000                                                                        │
│ ├─ temp_store = MEMORY                                                                       │
│ └─ mmap_size = 256MB                                                                         │
│                                                                                              │
│ ✅ Database connection successful, performance optimization enabled                          │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Standard Data Table Processing

```
╭─────────────────────────────────────── 📊 Exporting Standard Data Tables ────────────────────────────────────────╮
│                                                                                               │
│ Processing standard data tables...                                                            │
│                                                                                               │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                             │
│                                                                                               │
│ 📋 Completed:                                                                                 │
│ ✅ AirportLookup     (2,456 records) → AirportLookup.json     (156 KB)                      │
│ ✅ Airports          (15,234 records) → Airports.json          (2.3 MB)                      │
│ ✅ Runways          (28,456 records) → Runways.json           (3.1 MB)                       │
│ ✅ Waypoints        (89,123 records) → Waypoints.json         (8.7 MB)                       │
│ ✅ WaypointLookup   (89,123 records) → WaypointLookup.json    (4.2 MB)                      │
│ ✅ Navaids         (12,345 records) → Navaids.json           (1.8 MB)                        │
│ ✅ NavaidLookup     (12,345 records) → NavaidLookup.json     (685 KB)                        │
│ ✅ Airways          (1,234 records) → Airways.json            (145 KB)                       │
│                                                                                               │
│ 🔄 Currently processing: AirwayLegs → Converting airway leg data                              │
│                                                                                               │
╰───────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Terminal Procedure Processing

```
╭─────────────────────────────────────── 🎯 Processing Terminal Procedures ───────────────────────────────────────╮
│                                                                                              │
│ Processing terminal procedure data...                                                        │
│                                                                                              │
│ ████████████████████████████████████████ 245/350 (70%) ⏱️ 0:02:18                         │
│                                                                                              │
│ 📊 Processing Statistics:                                                                    │
│ ├─ Number of Airports: 145                                                                   │
│ ├─ Terminal Procedures: 245                                                                  │
│ ├─ SID Procedures: 89                                                                        │
│ ├─ STAR Procedures: 76                                                                       │
│ ├─ APP Procedures: 80                                                                        │
│ └─ FAF Points Detected: 234                                                                  │
│                                                                                              │
│ 🔄 Currently processing: ZBAA (Beijing Capital) → SHUAY1A SID                                │
│ 📁 Output: ProcedureLegs/TermID_1245.json                                                   │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Data Validation

```
╭─────────────────────────────────────── 🔍 Data Validation ───────────────────────────────────────────╮
│                                                                                              │
│ Validating conversion results...                                                             │
│                                                                                              │
│ ████████████████████████████████████████ 11/11 (100%) ⏱️ 0:00:45                          │
│                                                                                              │
│ ✅ JSON Format Validation                                                                    │
│ ├─ All file formats are correct                                                              │
│ ├─ Character Encoding: UTF-8                                                                │
│ └─ Syntax check passed                                                                      │
│                                                                                              │
│ ✅ Data Integrity Validation                                                                 │
│ ├─ Coordinate range check: Passed                                                           │
│ ├─ Foreign key relationship check: Passed                                                   │
│ ├─ Duplicate data check: 3 duplicates found (removed)                                       │
│ └─ Business rule check: Passed                                                              │
│                                                                                              │
│ ✅ FAF Point Validation                                                                      │
│ ├─ 234 FAF points detected                                                                  │
│ ├─ VNAV angle validation: Passed                                                            │
│ └─ Approach procedure association: Passed                                                   │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### File Compression and Packaging

```
╭─────────────────────────────────────── 📦 Creating Archive ─────────────────────────────────────────╮
│                                                                                              │
│ Creating 7z archive...                                                                       │
│                                                                                              │
│ 🗜️ Compression Settings:                                                                    │
│ ├─ Algorithm: LZMA2                                                                          │
│ ├─ Level: 5 (Standard)                                                                      │
│ ├─ Solid: Enabled                                                                           │
│ └─ Multithreading: Enabled                                                                  │
│                                                                                              │
│ ████████████████████████████████████████ 22.4/22.4 MB (100%) ⏱️ 0:01:23                   │
│                                                                                              │
│ ✅ Compression complete: Primary.7z                                                         │
│ 📊 Compression Statistics:                                                                   │
│ ├─ Original Size: 22.4 MB                                                                   │
│ ├─ Compressed: 15.6 MB                                                                      │
│ ├─ Compression Ratio: 69.6%                                                                 │
│ └─ Number of Files: 145                                                                     │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

## ✅ Conversion Complete

### Success Summary

```
╔══════════════════════════════════════════════════════════════╗
║                          Conversion Successful                   ║
║                                                              ║
║  ✓ Data conversion successfully completed!                   ║
║                                                              ║
║  📊 Processing Statistics:                                   ║
║  • Exported Tables: 11                                       ║
║  • Processed Records: 156,789                                ║
║  • Terminal Procedures: 350                                  ║
║  • FAF Points: 234                                           ║
║  • Number of Airports: 145                                   ║
║                                                              ║
║  📁 Output File: Primary.7z (15.6 MB)                        ║
║  🕒 Total Time: 6 minutes 32 seconds                          ║
║                                                              ║
║  This file can be used for navigation in the TFDI MD-11.     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

📋 Generated File List:
┌─────────────────────────────────────────┬─────────────┬─────────────┐
│ Filename                                │ Size        │ Records     │
├─────────────────────────────────────────┼─────────────┼─────────────┤
│ Primary.7z                              │ 15.6 MB     │ -           │
│ ├─ AirportLookup.json                   │ 156 KB      │ 2,456       │
│ ├─ Airports.json                        │ 2.3 MB      │ 15,234      │
│ ├─ AirwayLegs.json                      │ 4.2 MB      │ 23,456      │
│ ├─ Airways.json                         │ 145 KB      │ 1,234       │
│ ├─ Ilses.json                           │ 892 KB      │ 5,678       │
│ ├─ NavaidLookup.json                    │ 685 KB      │ 12,345      │
│ ├─ Navaids.json                         │ 1.8 MB      │ 12,345      │
│ ├─ Runways.json                         │ 3.1 MB      │ 28,456      │
│ ├─ Terminals.json                       │ 1.2 MB      │ 8,945       │
│ ├─ WaypointLookup.json                  │ 4.2 MB      │ 89,123      │
│ ├─ Waypoints.json                       │ 8.7 MB      │ 89,123      │
│ └─ ProcedureLegs/ (145 procedure files) │ 2.1 MB      │ 12,340      │
└─────────────────────────────────────────┴─────────────┴─────────────┘

🔄 Next Steps:
1. Unzip Primary.7z file
2. Install the JSON files into the TFDI MD-11 navigation data directory
3. Test navigation functionality in the simulator
4. Back up original files for recovery

📝 Instructions:
• Copy the archive contents to the TFDI MD-11 navigation data directory
• Restart Microsoft Flight Simulator
• Verify the new navigation data in the TFDI MD-11
```

## 💻 Programmatic Usage

### Basic Usage Example

```python
from Fenix2TFDINavDataConverter import FenixToTFDIConverter, ConverterConfig

# Create configuration
config = ConverterConfig(
    output_dir="TFDI_NavData",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# Initialize converter
converter = FenixToTFDIConverter(config)

# Execute conversion
try:
    result = converter.convert(
        database_path="path/to/fenix_navdata.db3",
        start_terminal_id=1000
    )
    
    if result.success:
        print(f"✅ Conversion successful!")
        print(f"📁 Output file: {result.output_archive}")
        print(f"📊 Processed records: {result.total_records}")
        print(f"⏱️ Time taken: {result.duration:.2f} seconds")
    else:
        print(f"❌ Conversion failed: {result.error_message}")
        
except Exception as e:
    print(f"💥 An error occurred during conversion: {e}")
```

### Advanced Configuration Example

```python
# Custom configuration
custom_config = ConverterConfig(
    output_dir="Custom_Output",
    procedure_legs_dir="Custom_Output/Procedures",
    archive_name="TFDI_MD11_NavData_20241224.7z",
    coordinate_precision=10,        # High precision coordinates
    vnav_threshold=2.0              # Strict FAF detection
)

# Conversion with callbacks
def progress_callback(step, progress, message):
    """Callback function for conversion progress"""
    print(f"[{step}] {progress:.1f}% - {message}")

def validation_callback(validation_type, result, details):
    """Callback function for validation results"""
    status = "✅" if result else "❌"
    print(f"{status} {validation_type}: {details}")

converter = FenixToTFDIConverter(
    config=custom_config,
    progress_callback=progress_callback,
    validation_callback=validation_callback
)

result = converter.convert(
    database_path="fenix_navdata.db3",
    start_terminal_id=2000,
    validate_output=True,          # Enable output validation
    cleanup_temp_files=True        # Clean up temporary files
)
```

### Batch Processing Example

```python
import os
from pathlib import Path

def batch_convert_databases():
    """Batch converts multiple databases"""
    
    database_files = [
        "fenix_navdata_2508.db3",
        "fenix_navdata_2509.db3", 
        "fenix_navdata_2510.db3"
    ]
    
    base_config = ConverterConfig(coordinate_precision=8)
    
    for i, db_file in enumerate(database_files):
        print(f"\n🔄 Processing database {i+1}/{len(database_files)}: {db_file}")
        
        # Create a separate output directory for each database
        airac_cycle = db_file.split('_')[-1].replace('.db3', '')
        output_config = ConverterConfig(
            output_dir=f"TFDI_NavData_{airac_cycle}",
            archive_name=f"TFDI_MD11_{airac_cycle}.7z",
            coordinate_precision=base_config.coordinate_precision,
            vnav_threshold=base_config.vnav_threshold
        )
        
        converter = FenixToTFDIConverter(output_config)
        
        try:
            result = converter.convert(
                database_path=db_file,
                start_terminal_id=1000 + (i * 1000)  # Avoid ID conflicts
            )
            
            if result.success:
                print(f"✅ {db_file} Conversion successful")
            else:
                print(f"❌ {db_file} Conversion failed: {result.error_message}")
                
        except Exception as e:
            print(f"💥 An error occurred while processing {db_file}: {e}")

# Execute batch conversion
batch_convert_databases()
```

## 🧪 Validation and Testing

### Output File Validation

```python
def verify_conversion_output(archive_path):
    """Verifies conversion output"""
    import py7zr
    import json
    
    print(f"🔍 Verifying archive: {archive_path}")
    
    try:
        # Verify archive integrity
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            file_list = archive.getnames()
            
        print(f"✅ Archive contains {len(file_list)} files")
        
        # Verify required files
        required_files = [
            "Airports.json", "Runways.json", "Waypoints.json",
            "Navaids.json", "Airways.json", "AirwayLegs.json",
            "Terminals.json", "ILSes.json"
        ]
        
        missing_files = []
        for required_file in required_files:
            if required_file not in file_list:
                missing_files.append(required_file)
        
        if missing_files:
            print(f"❌ Missing required files: {missing_files}")
            return False
        else:
            print("✅ All required files exist")
        
        # Validate JSON format
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            for file_name in required_files:
                try:
                    file_data = archive.read([file_name])
                    json_content = json.loads(file_data[file_name].read())
                    print(f"✅ {file_name}: JSON format valid")
                except json.JSONDecodeError as e:
                    print(f"❌ {file_name}: JSON format error - {e}")
                    return False
        
        print("🎉 Output file validation passed!")
        return True
        
    except Exception as e:
        print(f"❌ Validation failed: {e}")
        return False

# Usage example
verify_conversion_output("Primary.7z")
```

### TFDI Compatibility Test

```python
def test_tfdi_compatibility(json_file_path):
    """Tests TFDI compatibility"""
    import json
    
    print(f"🧪 Testing TFDI compatibility: {json_file_path}")
    
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # Check data structure
        if isinstance(data, dict):
            print(f"✅ Data structure: Dictionary ({len(data)} entries)")
            
            # Check coordinate format (e.g., for Waypoints)
            if "Waypoints" in json_file_path or any(key for key in data.keys() if "latitude" in str(data[key]).lower()):
                coord_issues = []
                for key, value in list(data.items())[:5]:  # Check the first 5 entries
                    if isinstance(value, dict):
                        if "Latitude" in value and "Longitude" in value:
                            lat = value["Latitude"]
                            lon = value["Longitude"]
                            
                            if not (-90 <= lat <= 90):
                                coord_issues.append(f"{key}: Latitude out of range ({lat})")
                            if not (-180 <= lon <= 180):
                                coord_issues.append(f"{key}: Longitude out of range ({lon})")
                
                if coord_issues:
                    print(f"⚠️ Coordinate issues: {coord_issues}")
                else:
                    print("✅ Coordinate format check passed")
        
        elif isinstance(data, list):
            print(f"✅ Data structure: List ({len(data)} elements)")
        
        else:
            print(f"⚠️ Unknown data structure: {type(data)}")
        
        print("✅ TFDI compatibility test passed")
        return True
        
    except Exception as e:
        print(f"❌ Compatibility test failed: {e}")
        return False

# Test all output files
output_files = [
    "Primary/Airports.json",
    "Primary/Waypoints.json", 
    "Primary/Navaids.json"
]

for file_path in output_files:
    test_tfdi_compatibility(file_path)
```

## ⚠️ Notes and Best Practices

### Important Reminders

1. **Data Backup**: Back up original Fenix data and TFDI data before conversion
2. **Version Compatibility**: Ensure Fenix, TFDI, and converter versions are compatible
3. **System Resources**: Large database conversions require sufficient RAM and disk space
4. **Permission Check**: Ensure sufficient file read/write permissions

### Performance Optimization Suggestions

```python
# System optimization check
def check_system_optimization():
    """Checks system optimization status"""
    import psutil
    
    print("🔧 System optimization check:")
    
    # Check memory
    memory = psutil.virtual_memory()
    if memory.available < 4 * 1024**3:  # 4GB
        print("⚠️ Insufficient available memory, consider closing other programs")
    else:
        print("✅ Sufficient memory")
    
    # Check disk available space
    disk_info = psutil.disk_usage('.')
    print(f"💿 Available disk space: {disk_info.free // 1024**3} GB")
    
    # Check CPU
    cpu_count = psutil.cpu_count()
    print(f"🖥️ CPU Cores: {cpu_count}")
    
    if cpu_count >= 4:
        print("✅ Multithreading recommended")
    else:
        print("⚠️ Single-core processing, conversion may be slow")

check_system_optimization()
```

### Troubleshooting Checklist

- [ ] ✅ Python Version ≥ 3.8
- [ ] ✅ All dependencies installed
- [ ] ✅ Fenix database file is intact and readable
- [ ] ✅ Sufficient available memory (4GB+)
- [ ] ✅ Sufficient disk space (1GB+)
- [ ] ✅ Output directory has write permissions
- [ ] ✅ TFDI MD-11 correctly installed

---

**Congratulations on completing this guide!** 🎉

You have now mastered the complete usage of the TFDI Navigation Data Converter. If you encounter any issues, please refer to the [Troubleshooting Guide](../troubleshooting.md) or [FAQ](../faq.md).

Happy flying! 🚁✨
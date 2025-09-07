# 🛠️ TFDI Navigation Data Converter Troubleshooting

## 🚨 Common Errors and Solutions

### 1. Environment and Installation Issues

#### ❌ Python Environment Issues

**Error Message:**
```
ModuleNotFoundError: No module named 'rich'
ImportError: No module named 'pandas'
```

**Solution:**
```bash
# 1. Verify Python version
python --version  # Ensure ≥ 3.8

# 2. Upgrade pip
python -m pip install --upgrade pip

# 3. Install dependencies
pip install -r requirements.txt

# 4. Verify installation
python -c "import rich, pandas; print('Dependencies installed successfully')"
```

#### ❌ Permission Error

**Error Message:**
```
PermissionError: [Errno 13] Permission denied
Cannot create output directory
```

**Solution:**
```bash
# Windows - Run as administrator
# Right-click Command Prompt → "Run as administrator"

# macOS/Linux - Use sudo or modify permissions
sudo python converter.py
# Or
chmod 755 /path/to/output/directory
```

### 2. Database Access Issues

#### ❌ Database File Not Found

**Error Message:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
Fenix database file not found
```

**Solution:**
1.  **Check Fenix Installation**:
    ```bash
    # Common path
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\
    ```

2.  **Manually locate file**:
    ```bash
    # Windows
    dir /s nd.db3
    
    # macOS/Linux
    find ~ -name "nd.db3" 2>/dev/null
    ```

3.  **Regenerate Database**:
    *   Start MSFS
    *   Load Fenix A320
    *   Wait for navigation data to load

#### ❌ Database Corruption

**Error Message:**
```
sqlite3.DatabaseError: database disk image is malformed
Database file is corrupted
```

**Diagnosis Method:**
```python
import sqlite3

def check_database_integrity(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        if result[0] == "ok":
            print("✅ Database integrity is OK")
        else:
            print(f"❌ Database corrupted: {result[0]}")
    except Exception as e:
        print(f"❌ Unable to access database: {e}")
    finally:
        conn.close()
```

**Repair Solution:**
```bash
# 1. Back up the corrupted database
cp nd.db3 nd.db3.backup

# 2. Attempt SQLite repair
sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3

# 3. If repair fails, re-acquire database
# Delete file and restart Fenix
```

#### ❌ Database Table Schema Incompatibility

**Error Message:**
```
sqlite3.OperationalError: no such table: Terminals
Database is missing required tables
```

**Validation Script:**
```python
def validate_database_schema(db_path):
    required_tables = [
        'Airports', 'Runways', 'Waypoints', 'Navaids',
        'Airways', 'AirwayLegs', 'Terminals', 'TerminalLegs',
        'ILSes', 'AirportLookup', 'NavaidLookup', 'WaypointLookup'
    ]
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = {row[0] for row in cursor.fetchall()}
    
    missing_tables = set(required_tables) - existing_tables
    if missing_tables:
        print(f"❌ Missing tables: {missing_tables}")
        return False
    
    print("✅ Database schema validation passed")
    return True
```

### 3. Memory and Performance Issues

#### ❌ Out of Memory

**Error Message:**
```
MemoryError: Unable to allocate array
Insufficient memory to process data
```

**Monitor Memory Usage:**
```python
import psutil
import gc

def monitor_memory_usage():
    memory = psutil.virtual_memory()
    print(f"Total Memory: {memory.total // 1024**3} GB")
    print(f"Used Memory: {memory.used // 1024**3} GB")
    print(f"Available Memory: {memory.available // 1024**3} GB")
    print(f"Usage Rate: {memory.percent}%")

def optimize_memory():
    # Force garbage collection
    gc.collect()
    
    # Clear pandas cache
    import pandas as pd
    pd.reset_option('all')
```

**Solution:**
```python
# 1. Reduce batch size
config = ConverterConfig(
    batch_size=500,  # Reduce from default 1000
    coordinate_precision=6  # Lower precision
)

# 2. Enable streaming
def process_large_table_streaming(table_name):
    chunk_size = 1000
    offset = 0
    
    while True:
        query = f"""
        SELECT * FROM {table_name} 
        LIMIT {chunk_size} OFFSET {offset}
        """
        
        chunk = pd.read_sql_query(query, conn)
        if chunk.empty:
            break
            
        process_chunk(chunk)
        del chunk  # Free memory
        gc.collect()
        
        offset += chunk_size
```

#### ❌ Slow Processing Speed

**Symptoms:** Conversion process remains stuck at a certain step for a long time

**Performance Diagnosis:**
```python
import time
import cProfile

def profile_conversion():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # Execute conversion
    converter.convert(db_path, terminal_id)
    
    profiler.disable()
    profiler.dump_stats('conversion_profile.prof')

# Analyze performance bottlenecks
# python -m cProfile -o profile.prof converter.py
# python -c "import pstats; pstats.Stats('profile.prof').sort_stats('cumulative').print_stats(10)"
```

**Optimization Suggestions:**
```python
# 1. SQLite performance optimization
def optimize_sqlite_connection(conn):
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA cache_size=10000")
    conn.execute("PRAGMA temp_store=MEMORY")

# 2. Parallel processing
from concurrent.futures import ThreadPoolExecutor

def parallel_table_processing():
    tables = ['Airports', 'Runways', 'Waypoints', 'Navaids']
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for table in tables:
            future = executor.submit(process_table, table)
            futures.append(future)
        
        # Wait for all tasks to complete
        for future in futures:
            future.result()
```

### 4. Data Conversion Issues

#### ❌ Abnormal Coordinate Data

**Error Message:**
```
ValueError: Invalid coordinate value: latitude=91.5
Coordinates out of valid range
```

**Validation and Repair:**
```python
def validate_and_fix_coordinates(df):
    """Validates and fixes coordinate data"""
    initial_count = len(df)
    
    # Check latitude range [-90, 90]
    invalid_lat = (df['Latitude'] < -90) | (df['Latitude'] > 90)
    if invalid_lat.any():
        print(f"Found {invalid_lat.sum()} invalid latitude values")
        df = df[~invalid_lat]
    
    # Check longitude range [-180, 180]
    invalid_lon = (df['Longitude'] < -180) | (df['Longitude'] > 180)
    if invalid_lon.any():
        print(f"Found {invalid_lon.sum()} invalid longitude values")
        df = df[~invalid_lon]
    
    removed_count = initial_count - len(df)
    if removed_count > 0:
        print(f"⚠️ Removed {removed_count} invalid coordinate records")
    
    return df
```

#### ❌ JSON Serialization Failure

**Error Message:**
```
TypeError: Object of type 'datetime' is not JSON serializable
JSON serialization error
```

**Solution:**
```python
import json
from datetime import datetime
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """Custom JSON encoder"""
    
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# Use custom encoder
def safe_json_dump(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=CustomJSONEncoder, 
                 ensure_ascii=False, indent=2)
```

#### ❌ Character Encoding Issues

**Error Message:**
```
UnicodeDecodeError: 'utf-8' codec can't decode byte
Character encoding error
```

**Solution:**
```python
import chardet

def detect_and_convert_encoding(file_path):
    """Detects and converts file encoding"""
    # Detect encoding
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        encoding = chardet.detect(raw_data)['encoding']
    
    print(f"Detected encoding: {encoding}")
    
    # Convert to UTF-8
    with open(file_path, 'r', encoding=encoding) as f:
        content = f.read()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def safe_string_handling(text):
    """Safe string handling"""
    if isinstance(text, bytes):
        # Try multiple encodings
        for encoding in ['utf-8', 'gbk', 'latin1']:
            try:
                return text.decode(encoding)
            except UnicodeDecodeError:
                continue
        # If all fail, use error handling
        return text.decode('utf-8', errors='replace')
    return str(text)
```

### 5. Output File Issues

#### ❌ Archive Creation Failed

**Error Message:**
```
py7zr.exceptions.Bad7zFile: not a 7z file
Archive creation failed
```

**Solution:**
```python
import py7zr
import shutil
from pathlib import Path

def safe_create_archive(source_dir, archive_path):
    """Safely creates an archive"""
    try:
        # Ensure source directory exists
        if not Path(source_dir).exists():
            raise FileNotFoundError(f"Source directory does not exist: {source_dir}")
        
        # Delete existing archive
        if Path(archive_path).exists():
            Path(archive_path).unlink()
        
        # Create archive
        with py7zr.SevenZipFile(archive_path, 'w') as archive:
            archive.writeall(source_dir, ".")
        
        print(f"✅ Archive created successfully: {archive_path}")
        return True
        
    except Exception as e:
        print(f"❌ Archive creation failed: {e}")
        
        # Fallback solution: Create ZIP file
        try:
            shutil.make_archive(
                str(Path(archive_path).with_suffix('')), 
                'zip', 
                source_dir
            )
            print("✅ ZIP format backup file created")
            return True
        except Exception as zip_error:
            print(f"❌ ZIP creation also failed: {zip_error}")
            return False
```

#### ❌ Abnormal File Size

**Symptoms:** Output files are too small or too large

**Check Method:**
```python
def validate_output_files(output_dir):
    """Validates output files"""
    expected_files = [
        'Airports.json', 'Runways.json', 'Waypoints.json',
        'Navaids.json', 'Airways.json', 'AirwayLegs.json',
        'Terminals.json', 'ILSes.json'
    ]
    
    file_info = {}
    for file_name in expected_files:
        file_path = Path(output_dir) / file_name
        if file_path.exists():
            size = file_path.stat().st_size
            file_info[file_name] = {
                'exists': True,
                'size_mb': size / 1024 / 1024,
                'empty': size == 0
            }
        else:
            file_info[file_name] = {'exists': False}
    
    # Print file information
    print("📁 Output File Check:")
    for file_name, info in file_info.items():
        if info['exists']:
            if info.get('empty', False):
                print(f"⚠️ {file_name}: Empty file")
            else:
                print(f"✅ {file_name}: {info['size_mb']:.2f} MB")
        else:
            print(f"❌ {file_name}: File missing")
    
    return file_info
```

## 🔍 Diagnostic Tools

### 1. System Environment Check

```python
def system_diagnostics():
    """System environment diagnostics"""
    import platform
    import sys
    import psutil
    
    print("🔍 System Environment Diagnostics")
    print("=" * 50)
    
    # Operating System Information
    print(f"Operating System: {platform.system()} {platform.release()}")
    print(f"Architecture: {platform.machine()}")
    
    # Python Environment
    print(f"Python Version: {sys.version}")
    print(f"Python Path: {sys.executable}")
    
    # Hardware Information
    print(f"CPU Cores: {psutil.cpu_count()}")
    memory = psutil.virtual_memory()
    print(f"Total Memory: {memory.total // 1024**3} GB")
    print(f"Available Memory: {memory.available // 1024**3} GB")
    
    # Disk Space
    disk = psutil.disk_usage('.')
    print(f"Total Disk Space: {disk.total // 1024**3} GB")
    print(f"Available Disk Space: {disk.free // 1024**3} GB")
```

### 2. Dependency Verification

```python
def verify_dependencies():
    """Verifies dependency packages"""
    required_packages = [
        'rich', 'pandas', 'py7zr', 'sqlite3'
    ]
    
    print("📦 Dependency Package Verification")
    print("=" * 30)
    
    for package in required_packages:
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package}: {version}")
        except ImportError:
            print(f"❌ {package}: Not installed")
        except Exception as e:
            print(f"⚠️ {package}: Error - {e}")
```

### 3. Performance Monitoring Tools

```python
import time
import threading
from contextlib import contextmanager

class PerformanceMonitor:
    """Performance monitor"""
    
    def __init__(self):
        self.metrics = {}
        self.monitoring = False
    
    @contextmanager
    def measure(self, operation_name):
        """Measures operation duration"""
        start_time = time.time()
        start_memory = psutil.virtual_memory().used
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.virtual_memory().used
            
            self.metrics[operation_name] = {
                'duration': end_time - start_time,
                'memory_delta': end_memory - start_memory
            }
    
    def start_monitoring(self):
        """Starts real-time monitoring"""
        self.monitoring = True
        
        def monitor():
            while self.monitoring:
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                
                print(f"\r🔄 CPU: {cpu_percent:5.1f}% | "
                      f"Memory: {memory.percent:5.1f}% | "
                      f"Available: {memory.available//1024**2:,} MB", 
                      end='', flush=True)
                
                time.sleep(1)
        
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def stop_monitoring(self):
        """Stops monitoring"""
        self.monitoring = False
        print()  # Newline
    
    def print_summary(self):
        """Prints performance summary"""
        print("\n📊 Performance Summary:")
        print("-" * 40)
        
        for operation, metrics in self.metrics.items():
            duration = metrics['duration']
            memory_mb = metrics['memory_delta'] / 1024 / 1024
            
            print(f"{operation:20s}: {duration:8.2f}s | "
                  f"{memory_mb:+8.1f}MB")

# Usage example
monitor = PerformanceMonitor()
monitor.start_monitoring()

with monitor.measure("Database Validation"):
    validate_database(db_path)

with monitor.measure("Data Conversion"):
    convert_data()

monitor.stop_monitoring()
monitor.print_summary()
```

## 📋 Troubleshooting Checklist

### 🔧 Pre-Conversion Checks
- [ ] Python version ≥ 3.8
- [ ] All dependency packages installed and versions correct
- [ ] Fenix database file exists and is intact
- [ ] Sufficient available memory (4GB+ recommended)
- [ ] Sufficient disk space (1GB+ recommended)
- [ ] Output directory has write permissions

### 📊 Conversion Process Checks
- [ ] Database connection successful
- [ ] All required tables exist
- [ ] Coordinate data within valid range
- [ ] Memory usage within reasonable limits
- [ ] No permission errors occurred
- [ ] Temporary files created correctly

### 📁 Post-Conversion Validation
- [ ] All JSON files generated
- [ ] File sizes are reasonable (not empty or abnormally large)
- [ ] JSON format is valid
- [ ] Archive created successfully
- [ ] Temporary files cleaned up
- [ ] Logs show no critical errors

## 🆘 Getting Help

### Self-Diagnosis
1.  **Run diagnostic tools**:
    ```python
    from tfdi_converter.diagnostics import run_full_diagnostics
    run_full_diagnostics()
    ```

2.  **View detailed logs**:
    ```bash
    tail -f converter.log
    grep -i error converter.log
    ```

3.  **Check system resources**:
    ```bash
    # Windows
    taskmgr
    
    # macOS
    activity monitor
    
    # Linux
    top
    htop
    ```

### Community Support
- **GitHub Issues**: Report bugs and technical issues
- **GitHub Discussions**: Usage questions and experience sharing
- **Project Documentation**: Refer to the complete user guide

### When reporting an issue, please provide:
- **Complete error log**
- **System environment information**
- **Converter version**
- **Database information** (size, AIRAC, etc.)
- **Reproduction steps**
- **Relevant configuration files**

---

**Encountered an unresolved issue?** 

Please create a new issue in [GitHub Issues](https://github.com/your-org/tfdi-converter/issues), and we will assist you as soon as possible!🚁✨
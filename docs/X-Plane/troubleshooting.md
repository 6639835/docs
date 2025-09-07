---
title: Troubleshooting Guide
description: Systematic Troubleshooting and Solutions for Nav-data Issues
---

# Troubleshooting Guide

This document provides systematic troubleshooting methods and solutions to help users quickly identify and resolve issues encountered during Nav-data usage.

## 🔍 Quick Diagnostic Process

### Step One: Environment Check
```bash
# 1. Check Python Version
python --version
# Should display Python 3.6+ version

# 2. Check Dependency Package Installation
pip list | grep -E "(pandas|numpy|pdfplumber|tqdm|colorama|geopy)"

# 3. Check Working Directory
ls -la
# Should display project file structure

# 4. Check System Resources
df -h          # Disk Space
free -h        # Memory (Linux/macOS)
# Windows: View in Task Manager
```

### Step Two: Log Analysis
```bash
# Enable detailed logging
export NAV_DATA_DEBUG=1  # Linux/macOS
set NAV_DATA_DEBUG=1     # Windows

# View recent error logs
tail -n 50 logs/nav-data.log
```

### Step Three: Data File Validation
```bash
# Check input file
file -I input_file.csv   # Check encoding
head -n 5 input_file.csv # View first few lines

# Verify file integrity
wc -l input_file.csv     # Line count
```

## 🚨 Common Error Patterns

### Error Type Classification

#### A. Environment Configuration Errors
- Incompatible Python version
- Missing dependency packages or version conflicts
- Incorrect path configuration
- Permission issues

#### B. Data Format Errors
- CSV encoding issues
- Unsupported PDF format
- Missing fields or incorrect format
- Coordinate format issues

#### C. System Resource Issues
- Insufficient memory
- Insufficient disk space
- Exceeded file handles
- Network connection issues

#### D. Logic Processing Errors
- Data validation failed
- Incorrect conversion rules
- Incorrect output format
- Concurrent processing conflicts

## 🔧 Detailed Troubleshooting

### 1. Installation and Environment Issues

#### Problem: ModuleNotFoundError
```
Error Message: ModuleNotFoundError: No module named 'pandas'
```

**Diagnostic Steps:**
```bash
# 1. Confirm current Python environment
which python
python -c "import sys; print(sys.path)"

# 2. Check virtual environment status
echo $VIRTUAL_ENV  # Should display virtual environment path

# 3. Verify package installation
pip show pandas
```

**Solutions:**
```bash
# Solution 1: Reinstall dependencies
pip install -r requirements.txt

# Solution 2: Create a new virtual environment
python -m venv nav-data-env-new
source nav-data-env-new/bin/activate
pip install -r requirements.txt

# Solution 3: Use a conda environment
conda create -n nav-data python=3.8
conda activate nav-data
pip install -r requirements.txt
```

#### Problem: Permission Denied
```
Error Message: PermissionError: [Errno 13] Permission denied
```

**Diagnostic Steps:**
```bash
# 1. Check file permissions
ls -la target_file

# 2. Check directory permissions
ls -ld target_directory

# 3. Check current user
whoami
groups
```

**Solutions:**
```bash
# Solution 1: Modify file permissions
chmod 644 target_file    # File permissions
chmod 755 target_dir     # Directory permissions

# Solution 2: Change owner (if necessary)
sudo chown $USER:$USER target_file

# Solution 3: Use user directory
mkdir ~/nav-data-workspace
cd ~/nav-data-workspace
```

#### Problem: Python Version Conflict
```
Error Message: SyntaxError: invalid syntax (Python 2.7 detected)
```

**Diagnostic Steps:**
```bash
# Check all Python versions
python --version
python3 --version
which python
which python3

# Check default Python
ls -la /usr/bin/python*
```

**Solutions:**
```bash
# Solution 1: Explicitly call with python3
python3 script.py

# Solution 2: Create an alias
echo "alias python=python3" >> ~/.bashrc
source ~/.bashrc

# Solution 3: Update system default (use with caution)
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### 2. Data Processing Issues

#### Problem: CSV Encoding Error
```
Error Message: UnicodeDecodeError: 'utf-8' codec can't decode
```

**Diagnostic Script:**
```python
#!/usr/bin/env python3
"""
CSV Encoding Diagnostic Tool
"""
import chardet
import pandas as pd
from pathlib import Path

def diagnose_csv_encoding(file_path):
    """Diagnoses CSV file encoding"""
    file_path = Path(file_path)
    
    print(f"🔍 Diagnosing file: {file_path}")
    
    # 1. File basic information
    print(f"File size: {file_path.stat().st_size} bytes")
    
    # 2. Auto-detect encoding
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)  # Read first 10KB
        encoding_info = chardet.detect(raw_data)
        print(f"Detected encoding: {encoding_info}")
    
    # 3. Attempt different encodings
    encodings = ['utf-8', 'gbk', 'gb2312', 'utf-16', 'latin1']
    
    for encoding in encodings:
        try:
            df = pd.read_csv(file_path, encoding=encoding, nrows=5)
            print(f"✅ {encoding}: Successfully read {len(df)} rows")
            print(f"   Columns: {list(df.columns)}")
            break
        except Exception as e:
            print(f"❌ {encoding}: {str(e)[:50]}...")
    
    return encoding_info['encoding']

# Usage example
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnosed_encoding = diagnose_csv_encoding(sys.argv[1])
        print(f"\n💡 Suggested encoding: {diagnosed_encoding}")
```

**Solutions:**
```python
# Solution 1: Specify correct encoding
import pandas as pd
df = pd.read_csv('file.csv', encoding='gbk')

# Solution 2: Convert file encoding
import codecs
with codecs.open('input.csv', 'r', 'gbk') as f_in:
    with codecs.open('output.csv', 'w', 'utf-8') as f_out:
        f_out.write(f_in.read())

# Solution 3: Auto-detect encoding
import chardet
with open('file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']
df = pd.read_csv('file.csv', encoding=encoding)
```

#### Problem: PDF Parsing Failed
```
Error Message: PDFSyntaxError: No /Root object found
```

**Diagnostic Tool:**
```python
#!/usr/bin/env python3
"""
PDF File Diagnostic Tool
"""
import pdfplumber
from pathlib import Path

def diagnose_pdf_file(file_path):
    """Diagnoses PDF file issues"""
    file_path = Path(file_path)
    
    print(f"🔍 Diagnosing PDF file: {file_path}")
    
    # 1. File basic information
    print(f"File size: {file_path.stat().st_size} bytes")
    
    # 2. Attempt to open PDF
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"✅ PDF opened successfully")
            print(f"Number of pages: {len(pdf.pages)}")
            
            # Check first page
            if pdf.pages:
                first_page = pdf.pages[0]
                print(f"First page dimensions: {first_page.width} x {first_page.height}")
                
                # Text extraction test
                text = first_page.extract_text()
                if text:
                    print(f"Text extraction successful, first 100 characters: {text[:100]}...")
                else:
                    print("⚠️  Unable to extract text, possibly a scanned PDF")
                
                # Check tables
                tables = first_page.extract_tables()
                print(f"Detected {len(tables)} tables")
                
                # Check images
                images = first_page.images
                print(f"Detected {len(images)} images")
                
    except Exception as e:
        print(f"❌ PDF failed to open: {e}")
        
        # Attempt repair suggestions
        print("\n💡 Repair Suggestions:")
        print("1. Check if the PDF file is corrupted")
        print("2. Try opening with Adobe Reader for verification")
        print("3. Use a PDF repair tool")
        print("4. Re-download or obtain the PDF file again")

# Usage example
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnose_pdf_file(sys.argv[1])
```

**Solutions:**
```python
# Solution 1: Use more lenient parsing options
import pdfplumber
try:
    with pdfplumber.open(pdf_file, password="") as pdf:
        # Processing logic
        pass
except Exception as e:
    print(f"PDF parsing failed: {e}")

# Solution 2: Try other PDF libraries
import pypdf2
try:
    with open(pdf_file, 'rb') as f:
        reader = pypdf2.PdfFileReader(f)
        # Processing logic
except Exception as e:
    print(f"Alternative PDF library also failed: {e}")

# Solution 3: Pre-process PDF
# Use external tools like pdftk to repair PDF
import subprocess
subprocess.run(['pdftk', 'broken.pdf', 'output', 'fixed.pdf'])
```

#### Problem: Coordinate Conversion Error
```
Error Message: ValueError: invalid literal for float()
```

**Diagnostic Tool:**
```python
#!/usr/bin/env python3
"""
Coordinate Data Diagnostic Tool
"""
import re

def diagnose_coordinate_data(text):
    """Diagnoses coordinate data format"""
    print(f"🔍 Diagnosing coordinate data: {text[:50]}...")
    
    # Common coordinate format patterns
    patterns = {
        'decimal': r'[+-]?\d+\.\d+',
        'dms_with_symbols': r'\d+°\d+′\d+″',
        'dms_with_letters': r'\d+[°]\d+[\']\d+["]',
        'dms_spaces': r'\d+\s+\d+\s+\d+',
        'chinese_format': r'北纬|南纬|东经|西经', # This pattern is for matching Chinese characters
    }
    
    found_patterns = []
    for name, pattern in patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            found_patterns.append((name, matches[:3]))  # Display first 3 matches
    
    print("Detected coordinate formats:")
    for name, matches in found_patterns:
        print(f"  {name}: {matches}")
    
    # Extract possible coordinates
    coord_candidates = re.findall(r'\d+[°′″\s\'"]+\d+[°′″\s\'"]*\d*', text)
    print(f"Coordinate candidates: {coord_candidates[:5]}")
    
    return found_patterns

def test_coordinate_conversion(coord_string):
    """Tests coordinate conversion"""
    print(f"\n🧪 Testing conversion: {coord_string}")
    
    try:
        # Attempt different conversion methods
        
        # Method 1: Convert directly to float
        try:
            result = float(coord_string)
            print(f"  Direct conversion: {result}")
            return result
        except ValueError:
            pass
        
        # Method 2: Degrees-Minutes-Seconds conversion
        dms_pattern = r'(\d+)[°]\s*(\d+)[′\']\s*(\d+(?:\.\d+)?)[″"]?'
        match = re.search(dms_pattern, coord_string)
        if match:
            degrees, minutes, seconds = map(float, match.groups())
            decimal = degrees + minutes/60 + seconds/3600
            print(f"  DMS conversion: {decimal}")
            return decimal
        
        # Method 3: Convert after cleaning special characters
        cleaned = re.sub(r'[^\d\.]', '', coord_string)
        if cleaned:
            result = float(cleaned)
            print(f"  Conversion after cleaning: {result}")
            return result
            
        print(f"  ❌ Conversion failed")
        return None
        
    except Exception as e:
        print(f"  ❌ Conversion exception: {e}")
        return None

# Usage example
if __name__ == "__main__":
    test_data = "North Latitude 39°48'35.6\" East Longitude 116°34'46.7\""
    diagnose_coordinate_data(test_data)
    test_coordinate_conversion("39°48'35.6\"")
```

### 3. System Resource Issues

#### Problem: Insufficient Memory
```
Error Message: MemoryError: Unable to allocate array
```

**Memory Monitoring Script:**
```python
#!/usr/bin/env python3
"""
Memory Usage Monitoring Tool
"""
import psutil
import gc
import os
from functools import wraps

def monitor_memory(func):
    """Memory monitoring decorator"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Get initial memory status
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"🔍 Memory before execution: {initial_memory:.2f} MB")
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Force garbage collection
            gc.collect()
            
            # Get final memory status
            final_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_delta = final_memory - initial_memory
            
            print(f"🔍 Memory after execution: {final_memory:.2f} MB")
            print(f"🔍 Memory change: {memory_delta:+.2f} MB")
            
            # Memory warning
            if final_memory > 1000:  # Over 1GB
                print("⚠️  High memory usage, optimization recommended")
    
    return wrapper

def check_system_memory():
    """Checks system memory status"""
    memory = psutil.virtual_memory()
    
    print("💾 System Memory Status:")
    print(f"  Total memory: {memory.total / 1024**3:.2f} GB")
    print(f"  Available memory: {memory.available / 1024**3:.2f} GB")
    print(f"  Usage: {memory.percent:.1f}%")
    
    if memory.percent > 80:
        print("⚠️  System memory usage is too high")
        return False
    return True

# Memory-optimized data processing function
@monitor_memory
def memory_efficient_csv_processing(file_path, chunk_size=1000):
    """Memory-friendly CSV processing"""
    import pandas as pd
    
    results = []
    
    # Read large files in chunks
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Process data chunk
        processed_chunk = process_data_chunk(chunk)
        results.append(processed_chunk)
        
        # Clean up memory
        del chunk
        gc.collect()
    
    return pd.concat(results, ignore_index=True)

def process_data_chunk(chunk):
    """Processes a single data chunk"""
    # Actual data processing logic
    return chunk  # Simplified example
```

**Solutions:**
```python
# Solution 1: Process in chunks
def process_large_file_in_chunks(file_path, chunk_size=1000):
    import pandas as pd
    
    processed_data = []
    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Process single chunk
        processed_chunk = your_processing_function(chunk)
        processed_data.append(processed_chunk)
        
        # Release memory
        del chunk
        gc.collect()
    
    return pd.concat(processed_data, ignore_index=True)

# Solution 2: Use generators
def data_generator(file_path):
    """Data generator, saves memory"""
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

# Solution 3: Increase virtual memory
# Linux/macOS:
# sudo fallocate -l 4G /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
```

#### Problem: Insufficient Disk Space
```
Error Message: OSError: [Errno 28] No space left on device
```

**Disk Space Check Script:**
```python
#!/usr/bin/env python3
"""
Disk Space Monitoring Tool
"""
import shutil
import os
from pathlib import Path

def check_disk_space(path="."):
    """Checks disk space"""
    total, used, free = shutil.disk_usage(path)
    
    print(f"💽 Disk Space Status ({path}):")
    print(f"  Total space: {total / 1024**3:.2f} GB")
    print(f"  Used: {used / 1024**3:.2f} GB")
    print(f"  Available space: {free / 1024**3:.2f} GB")
    print(f"  Usage: {used/total*100:.1f}%")
    
    # Low space warning
    if free < 1024**3:  # Less than 1GB
        print("⚠️  Insufficient disk space!")
        return False
    
    return True

def cleanup_temp_files():
    """Cleans up temporary files"""
    temp_patterns = [
        "*.tmp",
        "*.temp", 
        "*.cache",
        "*.log",
        "__pycache__",
        ".pytest_cache"
    ]
    
    current_dir = Path(".")
    total_cleaned = 0
    
    for pattern in temp_patterns:
        for file_path in current_dir.rglob(pattern):
            try:
                if file_path.is_file():
                    size = file_path.stat().st_size
                    file_path.unlink()
                    total_cleaned += size
                    print(f"Deleting file: {file_path}")
                elif file_path.is_dir():
                    import shutil
                    size = sum(f.stat().st_size for f in file_path.rglob('*') if f.is_file())
                    shutil.rmtree(file_path)
                    total_cleaned += size
                    print(f"Deleting directory: {file_path}")
            except Exception as e:
                print(f"Unable to delete {file_path}: {e}")
    
    print(f"💾 Total cleaned: {total_cleaned / 1024**2:.2f} MB")

def estimate_output_size(input_file):
    """Estimates output file size"""
    input_size = Path(input_file).stat().st_size
    
    # Estimate based on processing type (simplified estimation here)
    estimated_multiplier = {
        '.csv': 1.2,    # CSV to DAT is usually slightly larger
        '.pdf': 0.1,    # PDF text extraction is usually much smaller
        '.dat': 1.0,    # DAT format repair size unchanged
    }
    
    suffix = Path(input_file).suffix.lower()
    multiplier = estimated_multiplier.get(suffix, 1.0)
    
    estimated_size = input_size * multiplier
    print(f"📊 Estimated output size: {estimated_size / 1024**2:.2f} MB")
    
    return estimated_size
```

### 4. Performance Optimization Troubleshooting

#### Problem: Processing Speed Too Slow

**Performance Analysis Tool:**
```python
#!/usr/bin/env python3
"""
Performance Analysis Tool
"""
import time
import cProfile
import pstats
from functools import wraps

def profile_performance(func):
    """Performance profiling decorator"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Create profiler
        pr = cProfile.Profile()
        
        # Start profiling
        pr.enable()
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Stop profiling
            end_time = time.time()
            pr.disable()
            
            # Output performance report
            print(f"⏱️  Execution time: {end_time - start_time:.2f} seconds")
            
            # Save detailed report
            stats = pstats.Stats(pr)
            stats.sort_stats('cumulative')
            
            print("\n🔍 Performance Hotspots (Top 10 functions):")
            stats.print_stats(10)
            
            # Save report to file
            stats.dump_stats(f'performance_profile_{int(time.time())}.prof')
    
    return wrapper

# Usage example
@profile_performance
def slow_function():
    """Example slow function"""
    import pandas as pd
    
    # Simulate slow operation
    data = []
    for i in range(100000):
        data.append({'id': i, 'value': i**2})
    
    df = pd.DataFrame(data)
    return df.groupby('id').sum()

def benchmark_different_approaches():
    """Compares performance of different implementation approaches"""
    import pandas as pd
    
    # Test data
    test_data = list(range(10000))
    
    # Method 1: Regular loop
    start_time = time.time()
    result1 = []
    for i in test_data:
        result1.append(i * 2)
    time1 = time.time() - start_time
    
    # Method 2: List comprehension
    start_time = time.time()
    result2 = [i * 2 for i in test_data]
    time2 = time.time() - start_time
    
    # Method 3: NumPy
    import numpy as np
    start_time = time.time()
    result3 = (np.array(test_data) * 2).tolist()
    time3 = time.time() - start_time
    
    print("🏃 Performance Comparison:")
    print(f"  Regular loop: {time1:.4f} seconds")
    print(f"  List comprehension: {time2:.4f} seconds")
    print(f"  NumPy: {time3:.4f} seconds")
    
    # Find the fastest method
    times = {'Regular loop': time1, 'List comprehension': time2, 'NumPy': time3}
    fastest = min(times, key=times.get)
    print(f"🏆 Fastest method: {fastest}")
```

## 🔬 Advanced Diagnostic Tools

### Comprehensive Diagnostic Script

Create `diagnose_nav_data.py`:

```python
#!/usr/bin/env python3
"""
Nav-data Comprehensive Diagnostic Tool
"""
import sys
import os
import subprocess
import platform
from pathlib import Path
import importlib

class NavDataDiagnostic:
    """Nav-data Diagnostic Tool Class"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.info = []
    
    def log_issue(self, message):
        """Logs an issue"""
        self.issues.append(message)
        print(f"❌ {message}")
    
    def log_warning(self, message):
        """Logs a warning"""
        self.warnings.append(message)
        print(f"⚠️  {message}")
    
    def log_info(self, message):
        """Logs information"""
        self.info.append(message)
        print(f"ℹ️  {message}")
    
    def check_python_environment(self):
        """Checks Python environment"""
        print("\n🐍 Python Environment Check:")
        
        # Python version
        version = sys.version_info
        version_str = f"{version.major}.{version.minor}.{version.micro}"
        print(f"  Python version: {version_str}")
        
        if version.major < 3 or (version.major == 3 and version.minor < 6):
            self.log_issue(f"Python version too low ({version_str}), 3.6+ required")
        else:
            self.log_info(f"Python version meets requirements ({version_str})")
        
        # Virtual environment
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            self.log_info("Using virtual environment")
        else:
            self.log_warning("Not using a virtual environment, recommend using one")
        
        # Python path
        print(f"  Python path: {sys.executable}")
        print(f"  Package search paths: {len(sys.path)} paths")
    
    def check_dependencies(self):
        """Checks dependency packages"""
        print("\n📦 Dependency Package Check:")
        
        required_packages = {
            'pandas': '1.3.0',
            'numpy': '1.21.0',
            'pdfplumber': '0.7.0',
            'tqdm': '4.60.0',
            'colorama': '0.4.4',
            'geopy': '2.2.0'
        }
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                version = getattr(module, '__version__', '未知')
                print(f"  ✅ {package}: {version}")
                
                # TODO: Version comparison logic
                
            except ImportError:
                self.log_issue(f"Missing dependency package: {package}")
    
    def check_system_resources(self):
        """Checks system resources"""
        print("\n💻 System Resource Check:")
        
        # Operating system
        system_info = platform.system()
        print(f"  Operating system: {system_info} {platform.release()}")
        
        # Memory check
        try:
            import psutil
            memory = psutil.virtual_memory()
            print(f"  Total memory: {memory.total / 1024**3:.2f} GB")
            print(f"  Available memory: {memory.available / 1024**3:.2f} GB")
            
            if memory.available < 2 * 1024**3:  # Less than 2GB
                self.log_warning("Low available memory, may affect large file processing")
        except ImportError:
            self.log_warning("Unable to check memory status (psutil missing)")
        
        # Disk space
        try:
            import shutil
            total, used, free = shutil.disk_usage('.')
            print(f"  Disk space: {free / 1024**3:.2f} GB available")
            
            if free < 1024**3:  # Less than 1GB
                self.log_warning("Insufficient disk space")
        except Exception as e:
            self.log_warning(f"Unable to check disk space: {e}")
    
    def check_project_structure(self):
        """Checks project structure"""
        print("\n📁 Project Structure Check:")
        
        required_dirs = [
            'Airway',
            'PDF extract', 
            'Terminal Patch',
            'X-Plane CIFP'
        ]
        
        for dirname in required_dirs:
            if Path(dirname).exists():
                print(f"  ✅ {dirname}/")
            else:
                self.log_issue(f"Missing directory: {dirname}/")
        
        # Check key files
        key_files = [
            'Airway/airway.py',
            'PDF extract/utils.py',
            'Terminal Patch/terminal_encoder.py',
        ]
        
        for filepath in key_files:
            if Path(filepath).exists():
                print(f"  ✅ {filepath}")
            else:
                self.log_issue(f"Missing file: {filepath}")
    
    def check_common_issues(self):
        """Checks common issues"""
        print("\n🔍 Common Issues Check:")
        
        # Check file encoding
        csv_files = list(Path('.').glob('**/*.csv'))
        if csv_files:
            print(f"  Found {len(csv_files)} CSV files")
            # TODO: Encoding check
        
        # Check log files
        log_files = list(Path('.').glob('**/*.log'))
        if log_files:
            print(f"  Found {len(log_files)} log files")
            
            # Check recent errors
            for log_file in log_files[-3:]:  # Check last 3 logs
                try:
                    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        error_lines = [line for line in lines[-50:] if 'ERROR' in line.upper()]
                        if error_lines:
                            print(f"    ⚠️  Found {len(error_lines)} errors in {log_file}")
                except Exception as e:
                    print(f"    Unable to read {log_file}: {e}")
    
    def generate_report(self):
        """Generates diagnostic report"""
        print("\n" + "="*50)
        print("📋 Diagnostic Report Summary")
        print("="*50)
        
        print(f"Critical Issues: {len(self.issues)}")
        for issue in self.issues:
            print(f"  ❌ {issue}")
        
        print(f"\nWarning Messages: {len(self.warnings)}")
        for warning in self.warnings:
            print(f"  ⚠️  {warning}")
        
        print(f"\nInformational Messages: {len(self.info)}")
        for info in self.info:
            print(f"  ℹ️  {info}")
        
        # Overall Status
        if not self.issues:
            if not self.warnings:
                print("\n🎉 System status is good!")
            else:
                print("\n✅ System is generally normal, consider addressing warnings")
        else:
            print("\n🚨 Critical issues found, needs to be fixed before normal use")
        
        # Save report
        report_file = f"diagnostic_report_{int(time.time())}.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("Nav-data Diagnostic Report\n")
            f.write("="*50 + "\n\n")
            
            f.write("Critical Issues:\n")
            for issue in self.issues:
                f.write(f"- {issue}\n")
            
            f.write("\nWarning Messages:\n")
            for warning in self.warnings:
                f.write(f"- {warning}\n")
            
            f.write("\nInformational Messages:\n")
            for info in self.info:
                f.write(f"- {info}\n")
        
        print(f"\n📄 Detailed report saved to: {report_file}")
    
    def run_full_diagnostic(self):
        """Runs full diagnostic"""
        print("🔬 Nav-data System Diagnostic")
        print("="*50)
        
        self.check_python_environment()
        self.check_dependencies()
        self.check_system_resources()
        self.check_project_structure()
        self.check_common_issues()
        self.generate_report()

def main():
    """Main function"""
    diagnostic = NavDataDiagnostic()
    
    try:
        diagnostic.run_full_diagnostic()
    except KeyboardInterrupt:
        print("\n\nDiagnostic interrupted by user")
    except Exception as e:
        print(f"\n\nAn exception occurred during diagnosis: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import time
    main()
```

### Using the Diagnostic Tool

```bash
# Run full diagnostic
python diagnose_nav_data.py

# View diagnostic report
cat diagnostic_report_*.txt

# Take action based on diagnostic results
# If critical issues exist, fix according to report suggestions
# If only warnings exist, you can continue using but optimization is recommended
```

## 📞 Seeking Help

### When reporting an issue, please provide:

1.  **Complete error message**
2.  **System environment information** (obtained by running the diagnostic tool)
3.  **Steps to reproduce**
4.  **Sample input data** (if shareable)
5.  **Expected results vs. actual results**

### Contact Channels:
- [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- [FAQ Document](./faq.md)
- [Community Discussions](https://github.com/your-repo/nav-data/discussions)

---

**Remember: Most problems have solutions!** 🛠️ 

Through systematic diagnosis and troubleshooting, you can quickly resolve issues encountered during Nav-data usage. If problems persist, do not hesitate to seek help from the community.
---
title: Frequently Asked Questions
description: Common issues and solutions for Nav-data users
---

# Frequently Asked Questions (FAQ)

This document collects the most frequently encountered issues and their solutions for users during Nav-data usage.

## 🚀 Quick Answers

### Q: What is Nav-data?
**A:** Nav-data is an open-source aviation navigation data conversion tool specifically designed to convert NAIP data from Chinese Civil Aviation into a format usable by the X-Plane flight simulator. It consists of four main modules: Airway Processing, PDF Extraction, Terminal Procedure Repair, and X-Plane CIFP Generation.

### Q: What do I need to use Nav-data?
**A:** You will need:
- Python 3.6+ environment
- Corresponding navigation data source files (CSV, PDF, etc.)
- X-Plane flight simulator (to use the converted data)
- Basic command-line operation knowledge

### Q: Is Nav-data free?
**A:** Yes, Nav-data is licensed under the MIT open-source license and is completely free to use, including for commercial purposes.

## 📦 Installation Related Issues

### Q: What to do if "Python version is too low" is prompted during installation?
**A:** Nav-data requires Python 3.6 or higher. Solutions:

```bash
# Check current version
python --version

# If the version is too low, please:
# Windows: Download the latest version from python.org
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### Q: What to do if the pip install command fails?
**A:** Common solutions:

```bash
# 1. Upgrade pip
python -m pip install --upgrade pip

# 2. Use a domestic mirror
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# 3. Clear cache
pip cache purge

# 4. Use a virtual environment
python -m venv nav-data-env
source nav-data-env/bin/activate  # Linux/macOS
# Or nav-data-env\Scripts\activate  # Windows
```

### Q: Dependency package installation fails, prompting "permission denied"?
**A:** Solutions:

```bash
# Solution 1: User installation (recommended)
pip install --user package_name

# Solution 2: Use a virtual environment (most recommended)
python -m venv nav-data-env
source nav-data-env/bin/activate
pip install package_name

# Solution 3: Use sudo (not recommended)
sudo pip install package_name
```

### Q: Installing pdfplumber fails on Windows?
**A:** This is usually due to missing the Visual C++ build environment:

1. Install Microsoft Visual C++ Build Tools
2. Or use a pre-compiled version:
   ```cmd
   pip install --only-binary=all pdfplumber
   ```

## 🗂️ Data Processing Issues

### Q: CSV file cannot be read, prompting encoding error?
**A:** This is a common issue with Chinese CSV files:

```python
# Check file encoding
import chardet
with open('your_file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())
    print(encoding)

# Convert encoding
iconv -f gbk -t utf-8 input.csv > output.csv
```

### Q: Incomplete data after airway conversion?
**A:** Check the following items:

1.  **CSV File Format**: Ensure it contains the required fields
    ```
    CODE_POINT_START, CODE_TYPE_START, CODE_POINT_END, 
    CODE_TYPE_END, CODE_DIR, TXT_DESIG
    ```
2.  **Area Filtering Settings**: Check if required data was accidentally filtered out
    ```python
    # Check area settings in airway.py
    china_areas = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW', 'ZJ', 'ZP', 'ZL', 'ZH', 'ZU'}
    ```
3.  **Reference Data Files**: Ensure earth_fix.dat and earth_nav.dat exist and are complete

### Q: PDF extracted coordinates are not precise enough?
**A:** Try the following solutions:

1.  **Use manual extraction mode**:
    ```bash
    python waypoint_2_edge.py
    ```
2.  **Adjust processing parameters**:
    ```python
    # Modify precision settings in the script
    COORDINATE_PRECISION = 8
    crop_margin = 50  # Increase crop margin
    ```
3.  **Pre-process PDF files**:
    - Ensure the PDF is in text format, not a scanned image
    - Use tools like Adobe Acrobat to optimize the PDF

### Q: Incorrect coordinate conversion result?
**A:** Check coordinate format and conversion settings:

```python
# Validate coordinate range (China region)
LAT_MIN, LAT_MAX = 15.0, 55.0
LON_MIN, LON_MAX = 70.0, 140.0

# Check Degrees-Minutes-Seconds (DMS) conversion
def dms_to_decimal(degrees, minutes, seconds):
    return degrees + minutes/60 + seconds/3600
```

## 🔧 Program Repair Issues

### Q: Terminal procedure encoding format is incorrect after encoding?
**A:** Check encoding rule configuration:

```python
# Confirm encoding rule settings
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
```

### Q: Some files fail during batch processing?
**A:** Use fault-tolerant processing mode:

```python
# Modify processing script to add exception handling
try:
    process_single_file(file_path)
    print(f"✅ Successfully processed: {file_path}")
except Exception as e:
    print(f"❌ Processing failed: {file_path} - {e}")
    continue  # Continue processing the next file
```

### Q: Repair rules are not taking effect?
**A:** Confirm the priority and matching conditions of the repair rules:

```python
# Check rule matching conditions
def check_rule_match(line, pattern):
    import re
    return re.search(pattern, line) is not None

# Test specific line
test_line = "APPCH RW25L ABC123 GY M"
print(check_rule_match(test_line, r"APPCH.*GY M"))
```

## 🛩️ X-Plane Integration Issues

### Q: X-Plane cannot recognize the converted data?
**A:** Check the following items:

1.  **Correct File Path**:
    ```bash
    # X-Plane 11
    /path/to/X-Plane/Custom Data/
    
    # X-Plane 12
    /path/to/X-Plane/Output/FMS plans/
    ```
2.  **File Format Integrity**:
    ```bash
    # Check if the file ends with "99"
    tail -n 5 earth_awy.dat
    ```
3.  **Encoding Format**:
    ```bash
    # Ensure file encoding is UTF-8
    file -I earth_awy.dat
    ```

### Q: CIFP data displays abnormally in X-Plane?
**A:** Validate CIFP format specifications:

```python
# Check CIFP line format
def validate_cifp_line(line):
    parts = line.split()
    if line.startswith(('SID', 'STAR', 'APPCH')):
        return len(parts) >= 15  # CIFP standard number of fields
    return True

# Batch validation
with open('airport.dat', 'r') as f:
    for i, line in enumerate(f, 1):
        if not validate_cifp_line(line.strip()):
            print(f"Line {i} format error: {line.strip()}")
```

### Q: Procedure cannot be selected in X-Plane?
**A:** Check procedure naming and runway identifier:

1.  **Runway Identifier Format**: Ensure compliance with ICAO standards (e.g., RW25L, RW03R)
2.  **Procedure Name**: Avoid special characters and overly long names
3.  **Airport Code**: Ensure the correct ICAO four-letter code is used

## ⚡ Performance Issues

### Q: Slow processing speed when dealing with large files?
**A:** Optimize processing performance:

```python
# 1. Increase batch size
BATCH_SIZE = 5000  # Default 1000

# 2. Use multiprocessing
from multiprocessing import Pool
with Pool(processes=4) as pool:
    results = pool.map(process_function, file_list)

# 3. Enable progress caching
USE_CACHE = True
CACHE_DIR = "cache/"
```

### Q: High memory usage?
**A:** Memory optimization strategies:

```python
# 1. Process large files in chunks
def process_large_file_chunked(file_path, chunk_size=1000):
    chunk = []
    with open(file_path, 'r') as f:
        for line in f:
            chunk.append(line)
            if len(chunk) >= chunk_size:
                yield process_chunk(chunk)
                chunk.clear()
                gc.collect()  # Force garbage collection

# 2. Release unnecessary variables
del large_data_structure
gc.collect()

# 3. Use generators instead of lists
def data_generator():
    for item in data_source:
        yield process_item(item)
```

## 🐛 Error Troubleshooting

### Q: Program crashes unexpectedly during runtime?
**A:** Collect debugging information:

```python
# 1. Enable detailed logging
import logging
logging.basicConfig(level=logging.DEBUG)

# 2. Use exception handling
try:
    main_processing_function()
except Exception as e:
    import traceback
    print(f"Error details: {e}")
    print(f"Call stack: {traceback.format_exc()}")

# 3. Check system resources
import psutil
print(f"Memory usage: {psutil.virtual_memory().percent}%")
print(f"Disk space: {psutil.disk_usage('/').percent}%")
```

### Q: Output result does not match expectations?
**A:** Step-by-step debugging process:

```python
# 1. Add intermediate output
def debug_process_step(data, step_name):
    print(f"=== {step_name} ===")
    print(f"Number of data rows: {len(data)}")
    print(f"Sample data: {data[:3]}")
    return data

# 2. Compare input and output
print("Input data statistics:")
analyze_data(input_data)
print("Output data statistics:")
analyze_data(output_data)

# 3. Validate key steps
assert len(processed_data) > 0, "Processed data is empty"
assert all(validate_item(item) for item in processed_data), "Data validation failed"
```

## 🌐 Platform-Specific Issues

### Q: Windows path contains spaces causing errors?
**A:** Correctly handle file paths:

```python
import os
from pathlib import Path

# Use pathlib (recommended)
file_path = Path("C:/Program Files/Nav Data/input.csv")
if file_path.exists():
    process_file(str(file_path))

# Or use quotes
import subprocess
subprocess.run(['python', 'script.py', '"C:/path with spaces/file.csv"'])
```

### Q: Permission denied on macOS?
**A:** Fix permission issues:

```bash
# 1. Modify file permissions
chmod +x script.py
chmod 755 nav-data-directory/

# 2. Use user directory
mkdir ~/nav-data
cd ~/nav-data

# 3. Avoid using sudo
# Don't: sudo python script.py
# Use: python script.py
```

### Q: Missing system dependencies on Linux?
**A:** Install necessary system packages:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3-dev libpoppler-cpp-dev

# CentOS/RHEL
sudo yum install python3-devel poppler-cpp-devel

# Or use conda
conda install -c conda-forge pdfplumber
```

## 🔄 Data Update Issues

### Q: How to get the latest NAIP data?
**A:** Data update process:

1.  **Data Source**: Obtain the latest NAIP data from the official website of the Civil Aviation Administration
2.  **AIRAC Cycle**: Ensure the data corresponds to the correct AIRAC cycle
3.  **Format Validation**: New data may require format adjustments

```python
# Check AIRAC cycle
from datetime import datetime
def get_current_airac():
    # AIRAC calculation logic
    base_date = datetime(2025, 1, 23)  # Base date
    current_date = datetime.now()
    days_diff = (current_date - base_date).days
    cycle_number = (days_diff // 28) + 2501  # One cycle every 28 days
    return cycle_number
```

### Q: What to do if the converted data is expired?
**A:** Regularly update data:

1.  **Set up update reminders**: Check for new AIRAC data every 28 days
2.  **Back up old data**: Back up currently available data before updating
3.  **Phased update**: Test new data first, then perform a full update once confirmed to be correct

## 📞 Get More Help

### Q: Where can I get technical support?
**A:** Multiple ways to get help:

1.  **Documentation Resources**:
    - [Usage Guide](./guide/usage.md)
    - [Troubleshooting](./troubleshooting.md)
    - [Architecture Description](./architecture.md)
2.  **Community Support**:
    - [GitHub Issues](https://github.com/your-repo/nav-data/issues)
    - [GitHub Discussions](https://github.com/your-repo/nav-data/discussions)
    - Flight simulation community forums
3.  **Direct Contact**:
    - Submit a detailed Bug report
    - Include error logs and system information
    - Provide sample data that can reproduce the issue

### Q: How to report issues or suggest improvements?
**A:** An effective issue report includes:

```markdown
**Issue Description**: Briefly describe the encountered issue
**Steps to Reproduce**: 
1. Commands or operations used
2. Input data files
3. Expected result vs. Actual result

**Environment Information**:
- Operating System: Windows 10 / macOS 12 / Ubuntu 20.04
- Python Version: 3.9.7
- Nav-data Version: v2.1.0

**Additional Information**:
- Error logs
- Related screenshots  
- Sample data files (if shareable)
```

### Q: Want to contribute code or documentation?
**A:** Welcome to contribute to project development!

1.  **Check contribution guidelines**：[contributing.md](./contributing.md)
2.  **Understand project architecture**：[architecture.md](./architecture.md)
3.  **Follow coding standards**：PEP 8 + project-specific standards
4.  **Submit a Pull Request**：Submit your contribution via GitHub

---

## 💡 Useful Tips

### Quick Diagnostic Commands
```bash
# Environment check
python --version
pip list | grep -E "(pandas|pdfplumber|tqdm|colorama)"

# Data file check
ls -la *.csv *.dat *.pdf
file -I input_file.csv

# System resource check
df -h  # Disk space
free -h  # Memory usage (Linux)
```

### Debug Switch
Add debug mode to the script:
```python
DEBUG = True  # Set to True to enable debug output

if DEBUG:
    print(f"Processing file: {file_path}")
    print(f"Number of data rows: {len(data)}")
    print(f"Processing time: {elapsed_time:.2f}s")
```

**If your issue is not listed above, please don't hesitate to open a new issue via GitHub Issues!** We will continuously update this FAQ document to better serve the community. ✈️ 

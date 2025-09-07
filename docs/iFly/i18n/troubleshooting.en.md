# 🛠️ iFly Navigation Data Converter Troubleshooting

## 🚨 Common Errors and Solutions

### 1. Installation and Environment Issues

#### ❌ Incompatible Python Version

**Error Message:**
```
SyntaxError: invalid syntax
TypeError: 'type' object is not subscriptable
```

**Solution:**
1.  **Check Python Version**:
    ```bash
    python --version
    ```
2.  **Upgrade to Python 3.8+**:
    *   Windows: Download the latest version from python.org
    *   macOS: `brew install python`
    *   Linux: `sudo apt-get install python3.9`

#### ❌ Dependency Package Installation Failed

**Error Message:**
```
ERROR: Could not find a version that satisfies the requirement
ModuleNotFoundError: No module named 'rich'
```

**Solution:**
1.  **Upgrade pip**:
    ```bash
    python -m pip install --upgrade pip
    ```
2.  **Clear Cache and Reinstall**:
    ```bash
    pip cache purge
    pip install -r requirements.txt --no-cache-dir
    ```
3.  **Use a Domestic Mirror Source**:
    ```bash
    pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
    ```

### 2. File and Path Issues

#### ❌ Fenix Database File Not Found

**Error Message:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
数据库文件不存在或路径错误
```

**Solution:**
1.  **Confirm File Location**:
    ```bash
    # Common Location
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\
    ```
2.  **Use Absolute Path**: Enter the full file path
3.  **Check File Permissions**: Ensure the file is readable

#### ❌ iFly Installation Path Detection Failed

**Error Message:**
```
未找到 iFly 737 MAX 8 安装路径
请手动指定 iFly 安装目录
```

**Solution:**
1.  **Manually Enter Path**:
    ```
    # Community Version
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Community\ifly-aircraft-737max8\
    
    # Marketplace Version
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Official\asobo-aircraft-ifly-737max8\
    ```
2.  **Verify Path Structure**: Confirm it contains the `Data\navdata\` directory

#### ❌ Insufficient File Write Permissions

**Error Message:**
```
PermissionError: [Errno 13] Permission denied
无法写入文件
```

**Solution:**
1.  **Run as Administrator**:
    *   Windows: Right-click → "Run as administrator"
    *   macOS/Linux: `sudo python main.py`
2.  **Modify File Permissions**:
    ```bash
    chmod 755 /path/to/ifly/directory
    ```
3.  **Check if the file is in use**: Close MSFS and other related programs

### 3. Data Processing Issues

#### ❌ CSV File Format Error

**Error Message:**
```
pandas.errors.EmptyDataError: No columns to parse from file
UnicodeDecodeError: 'utf-8' codec can't decode
```

**Solution:**
1.  **Check File Encoding**:
    ```python
    # Convert to UTF-8
    import chardet
    with open('file.csv', 'rb') as f:
        encoding = chardet.detect(f.read())['encoding']
    ```
2.  **Validate CSV Format**: Ensure it contains the necessary columns
3.  **Redownload Data**: Obtain new NAIP data files

#### ❌ Magnetic Declination Calculation Failed

**Error Message:**
```
geomag.GeomagnticCalculationError: Invalid date or coordinates
磁偏角计算出现异常
```

**Solution:**
1.  **Check Coordinate Range**:
    *   Latitude: -90° to +90°
    *   Longitude: -180° to +180°
2.  **Update pygeomag**:
    ```bash
    pip install --upgrade pygeomag
    ```
3.  **Validate Date Validity**: Ensure the AIRAC date is within a reasonable range

#### ❌ AIRAC Cycle Calculation Error

**Error Message:**
```
ValueError: Invalid AIRAC cycle calculation
AIRAC 周期计算失败
```

**Solution:**
1.  **Check System Time**: Ensure the system time is correct
2.  **Manually Set Cycle**:
    ```python
    # Manually specify AIRAC cycle
    airac_cycle = "2508"
    ```
3.  **Update Timezone Information**: Ensure correct timezone settings

### 4. Memory and Performance Issues

#### ❌ Insufficient Memory

**Error Message:**
```
MemoryError: Unable to allocate array
内存不足，无法处理大型数据文件
```

**Solution:**
1.  **Increase Virtual Memory**:
    *   Windows: Control Panel → System → Advanced System Settings → Performance Settings → Virtual Memory
2.  **Process in Batches**:
    ```python
    # Read data in chunks
    chunk_size = 1000
    for chunk in pd.read_csv(file, chunksize=chunk_size):
        process_chunk(chunk)
    ```
3.  **Close Other Programs**: Free up system memory

#### ❌ Processing Speed Too Slow

**Phenomenon:** Magnetic declination calculation takes too long

**Optimization Solutions:**
1.  **Hardware Optimization**:
    *   Use SSD hard drive
    *   Increase RAM to 8GB+
    *   Use multi-core CPU
2.  **Software Optimization**:
    ```python
    # Parallel processing
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = executor.map(calculate_declination, coordinates)
    ```
3.  **Reduce Data Volume**: Filter unnecessary waypoints

### 5. Output and Verification Issues

#### ❌ Converted Data Not Displayed in iFly

**Possible Causes:**
-   Incorrect file format
-   Data overwrite rule issues
-   iFly cache not cleared

**Solution:**
1.  **Validate File Format**:
    ```bash
    # Check file content
    head -n 10 WPNAVRTE.txt
    ```
2.  **Clear iFly Cache**:
    ```bash
    # Delete cache files
    rm -rf "%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_*\LocalCache\*ifly*"
    ```
3.  **Restart Simulator**: Fully exit and restart MSFS

#### ❌ Waypoint Display Anomaly in FMC

**Phenomenon:** Waypoint coordinates offset or type incorrect

**Check Steps:**
1.  **Validate Coordinate Format**:
    ```
    # Correct format
    123.45678  # Longitude (°)
    -12.34567  # Latitude (°)
    ```
2.  **Check Waypoint Type**:
    ```
    11 - DESIGNATED_POINT (指定点)
    3  - VOR/DME
    2  - NDB
    ```
3.  **Validate Magnetic Declination Value**:
    ```
    # Reasonable range
    -30.0 到 +30.0 度
    ```

## 🔍 Diagnostic Tools

### 1. Log Analysis

**View Detailed Logs:**
```bash
# View latest logs
tail -f converter.log

# Search for error messages
grep "ERROR" converter.log
grep "Exception" converter.log
```

**Log Level Description:**
-   `DEBUG`: Detailed debugging information
-   `INFO`: General information
-   `WARNING`: Warning information
-   `ERROR`: Error information
-   `CRITICAL`: Critical error

### 2. Data Validation Script

**Create Validation Script:**
```python
import pandas as pd
import sqlite3

def validate_database(db_path):
    """Validates database integrity"""
    conn = sqlite3.connect(db_path)
    
    # Check required tables
    required_tables = [
        'Airports', 'Runways', 'Navaids', 
        'Waypoints', 'Terminals', 'TerminalLegs'
    ]
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    missing_tables = set(required_tables) - set(tables)
    if missing_tables:
        print(f"Missing tables: {missing_tables}")
        return False
    
    print("Database validation passed")
    return True

# Usage example
validate_database("path/to/nd.db3")
```

### 3. System Information Collection

**Create System Information Report:**
```python
import platform
import sys
import pkg_resources

def generate_system_report():
    """Generates a system information report"""
    report = []
    
    # System Information
    report.append("=== System Information ===")
    report.append(f"Operating System: {platform.system()} {platform.release()}")
    report.append(f"Architecture: {platform.machine()}")
    report.append(f"Python Version: {sys.version}")
    
    # Installed Packages
    report.append("\n=== Installed Packages ===")
    installed_packages = [d for d in pkg_resources.working_set]
    for package in sorted(installed_packages, key=lambda x: x.key):
        report.append(f"{package.key}: {package.version}")
    
    return "\n".join(report)

# Generate report
print(generate_system_report())
```

## 📋 Troubleshooting Checklist

### 🔧 Basic Checks
-   [ ] Python version ≥ 3.8
-   [ ] All dependency packages installed
-   [ ] Fenix database file exists and is readable
-   [ ] iFly 737 MAX 8 correctly installed
-   [ ] Sufficient disk space (≥ 100MB)
-   [ ] Sufficient memory (≥ 4GB)

### 📁 Path Verification
-   [ ] Fenix database path is correct
-   [ ] iFly installation path is correct
-   [ ] CSV data file path is correct
-   [ ] Output directory has write permissions

### 📊 Data Checks
-   [ ] CSV file format is correct (UTF-8 encoding)
-   [ ] Database table structure is complete
-   [ ] Coordinate data is within the valid range
-   [ ] AIRAC cycle calculation is correct

### 🔄 Processing Verification
-   [ ] Log file has no ERROR level messages
-   [ ] Output file has been generated
-   [ ] File size is reasonable (not 0)
-   [ ] Data correctly displayed in iFly

## 🆘 Getting Help

### Self-Help
1.  **Consult Documentation**: Read the complete user guide
2.  **Search Logs**: Look for specific error messages
3.  **Check FAQ**: Review frequently asked questions
4.  **Reproduce Issue**: Confirm the problem is reproducible

### Community Support
1.  **GitHub Issues**: Report technical issues
2.  **Discussion Forums**: Participate in community discussions
3.  **QQ Group/WeChat Group**: Real-time communication and answers

### When reporting an issue, please provide:
-   **Error Logs**: Complete error messages
-   **System Information**: OS, Python version, etc.
-   **Reproduction Steps**: Detailed operating steps
-   **File Information**: Size and path of relevant files
-   **Screenshots**: Provide interface screenshots if necessary

---

**Remember: Most problems have solutions!**

When encountering difficulties, take a deep breath, then follow this guide to troubleshoot step-by-step. 🔧✨
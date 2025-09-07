# 🔧 Troubleshooting Guide

This guide covers common issues that may arise when using the Nav-data PMDG conversion tool and their solutions. It is categorized by issue type for quick identification and resolution.

---

## 🚨 Installation Issues

### ❌ Python Environment Issues

#### **Issue**: `python: command not found` or `'python' is not recognized as an internal or external command`
**Symptoms**:
```bash
'python' is not recognized as an internal or external command
```

**Solution**:
```bash
# 1. Verify Python installation
python --version
# or
python3 --version

# 2. Check PATH environment variable
echo $PATH  # Linux/macOS
echo %PATH%  # Windows

# 3. Reinstall Python (recommended to download from official website)
# https://www.python.org/downloads/
```

#### **Issue**: Dependency package installation failed
**Symptoms**:
```bash
ERROR: Could not find a version that satisfies the requirement
```

**Solution**:
```bash
# 1. Update pip
python -m pip install --upgrade pip

# 2. Use domestic mirror source (for Chinese users)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 3. Clear pip cache
pip cache purge

# 4. Use a virtual environment
python -m venv nav_data_env
source nav_data_env/bin/activate  # Linux/macOS
nav_data_env\Scripts\activate     # Windows
```

### ❌ Permission Issues

#### **Issue**: Access to MSFS directory denied
**Symptoms**:
```
PermissionError: [Errno 13] Permission denied
```

**Solution**:
```bash
# Windows users
# 1. Run Command Prompt as administrator
# 2. Or modify directory permissions
icacls "C:\Users\[username]\AppData\Local\Packages" /grant Users:F /T

# Check MSFS directory permissions
# Right-click directory -> Properties -> Security -> Edit -> Add Full Control permissions
```

---

## 🔄 Conversion Issues

### ❌ Data File Issues

#### **Issue**: AIRAC data file not found
**Symptoms**:
```
FileNotFoundError: AIRAC data file not found
```

**Diagnostic Steps**:
```bash
# 1. Verify file path
ls -la ./input/AIRAC2024-01/  # Linux/macOS
dir .\input\AIRAC2024-01\     # Windows

# 2. Check file permissions
ls -la *.dat *.txt *.xml      # Check data files
```

**Solution**:
```bash
# 1. Confirm data file format and location
mkdir -p ./input/AIRAC2024-01
# Place AIRAC data files in the correct directory

# 2. Verify file integrity
python validate_data.py --check-integrity --input-dir=./input/AIRAC2024-01
```

#### **Issue**: Incompatible data format
**Symptoms**:
```
ValueError: Unsupported data format or corrupted file
```

**Solution**:
```bash
# 1. Check supported formats
python converter.py --list-supported-formats

# 2. Convert data format
python format_converter.py --input=old_format.dat --output=new_format.xml --format=ARINC424

# 3. Use debug mode for detailed information
python converter.py --debug --verbose --input=problematic_file.dat
```

### ❌ Conversion Process Errors

#### **Issue**: Out of memory error
**Symptoms**:
```
MemoryError: Unable to allocate array
```

**Solution**:
```bash
# 1. Process large datasets in chunks
python converter.py --batch-size=1000 --memory-limit=4GB

# 2. Enable data streaming
python converter.py --streaming-mode --temp-dir=/tmp/nav_data

# 3. Increase virtual memory (Windows)
# Control Panel -> System -> Advanced system settings -> Virtual memory

# 4. Optimize system resources
# Close unnecessary programs
# Clean temporary files
```

#### **Issue**: Coordinate conversion error
**Symptoms**:
```
CoordinateTransformError: Invalid coordinate conversion
```

**Solution**:
```bash
# 1. Verify coordinate system settings
python converter.py --coordinate-system=WGS84 --verify-coordinates

# 2. Use an alternative conversion method
python converter.py --coordinate-method=alternative --precision=8

# 3. Check magnetic declination settings
python converter.py --magnetic-model=WMM2020 --declination-check
```

---

## ⚙️ Configuration Issues

### ❌ PMDG Integration Issues

#### **Issue**: PMDG aircraft cannot recognize navigation data
**Symptoms**: FMC displays "NAV DATA NOT FOUND" or navigation points fail to load

**Diagnostic Steps**:
```bash
# 1. Check PMDG data directory
dir "C:\Users\%USERNAME%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\PMDG\"

# 2. Verify database files
python verify_pmdg_db.py --check-tables --check-indexes
```

**Solution**:
```bash
# 1. Confirm PMDG data path
python converter.py --pmdg-path="C:\Users\[username]\AppData\Local\Packages\Microsoft.FlightSimulator_[ID]\LocalCache\PMDG"

# 2. Regenerate database indexes
python rebuild_indexes.py --database=pmdg_nav.db

# 3. Check file permissions
icacls "PMDG data directory" /grant Users:F /T

# 4. Restart MSFS and PMDG aircraft
```

#### **Issue**: Data version mismatch
**Symptoms**: PMDG displays an old AIRAC cycle or data is not updated

**Solution**:
```bash
# 1. Force AIRAC identifier update
python converter.py --force-airac-update --airac-cycle=2024-01

# 2. Clear cache
python clear_cache.py --pmdg-cache --nav-cache

# 3. Verify AIRAC cycle
python verify_airac.py --current-cycle --check-validity
```

---

## 🚀 Performance Issues

### ❌ Slow Conversion Speed

#### **Issue**: Conversion process is unusually slow
**Possible causes**:
- Hard disk I/O bottleneck
- Insufficient memory
- Low CPU utilization
- Network latency (online validation)

**Optimization Solutions**:
```bash
# 1. Enable multiprocessing
python converter.py --parallel=4 --workers=auto

# 2. Use SSD for temporary directory
python converter.py --temp-dir="D:\SSD_Temp" --keep-temp-files=false

# 3. Disable unnecessary validation
python converter.py --skip-validation --no-online-check

# 4. Optimize I/O operations
python converter.py --buffer-size=64MB --async-io
```

### ❌ High Memory Usage

#### **Issue**: Conversion process consumes large amounts of memory
**Monitor memory usage**:
```bash
# Windows
tasklist /fi "imagename eq python.exe"

# Linux/macOS  
top -p $(pgrep python)
```

**Solution**:
```bash
# 1. Enable streaming
python converter.py --streaming --chunk-size=10MB

# 2. Limit memory usage
python converter.py --max-memory=2GB --gc-threshold=100MB

# 3. Process in stages
python converter.py --process-by-region --region-size=small
```

---

## 🔍 Data Validation Issues

### ❌ Data Integrity Check Failed

#### **Issue**: Validation tool reports incomplete data
**Symptoms**:
```
ValidationError: Missing required navigation points
```

**Diagnostic Tools**:
```bash
# 1. Run comprehensive validation
python validate_data.py --comprehensive --output-report=validation_report.html

# 2. Check specific data types
python validate_data.py --check-airports --check-navaids --check-airways

# 3. Compare with reference data
python compare_data.py --reference=official_data.xml --current=converted_data.db
```

**Repair Solutions**:
```bash
# 1. Redownload source data
# Ensure AIRAC data is complete and up-to-date

# 2. Use repair tool
python repair_data.py --fix-missing --interpolate-gaps

# 3. Manually supplement missing data
python manual_fix.py --add-missing-waypoints --config=fixes.json
```

### ❌ Coordinate Precision Issues

#### **Issue**: Navigation point position inaccurate
**Checking Methods**:
```bash
# 1. Verify specific waypoint coordinates
python check_waypoint.py --icao=ZSPD --waypoint=SASAN

# 2. Compare multiple data sources
python compare_coordinates.py --sources=navigraph,aerosoft --output=coordinate_diff.csv

# 3. Generate deviation report
python deviation_report.py --threshold=0.001 --output=deviations.html
```

---

## 📊 Log Analysis

### 🔍 Understanding Log Files

#### **Log Level Description**:
- **DEBUG**: Detailed debug information
- **INFO**: General processing information
- **WARNING**: Warning messages, do not affect functionality
- **ERROR**: Error messages, require attention
- **CRITICAL**: Critical errors, processing interrupted

#### **Common Log Patterns**:
```bash
# Find error logs
grep "ERROR\|CRITICAL" converter.log

# Count warnings
grep -c "WARNING" converter.log

# Analyze processing time
grep "Processing time" converter.log | tail -10
```

### 🔧 Log Configuration

#### **Increase Log Detail Level**:
```bash
# Enable detailed logs
python converter.py --log-level=DEBUG --log-format=detailed

# Separate different log types
python converter.py --log-split --error-log=errors.log --debug-log=debug.log
```

---

## 🆘 Emergency Fixes

### 🚨 Data Corruption Recovery

#### **Step 1**: Immediate Backup
```bash
# Backup current state
cp -r ./output ./backup_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
xcopy .\output .\backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E /I  # Windows
```

#### **Step 2**: Restore from Backup
```bash
# Restore the most recent valid backup
python restore_backup.py --list-backups
python restore_backup.py --restore=backup_20240115_1430 --target=./output
```

#### **Step 3**: Verify Restoration
```bash
# Verify restored data
python validate_data.py --quick-check --report-only-errors
```

### 🚨 Reset to Default State

#### **Full Reset**:
```bash
# Warning: This will delete all converted data
python reset_tool.py --full-reset --confirm

# Redownload default configuration
python setup.py --download-config --reset-settings

# Rerun initialization
python init.py --first-time-setup
```

---

## 📞 Getting Further Help

### 📝 When reporting issues, please provide

1.  **System Information**:
    ```bash
    python --version
    python system_info.py --full-report
    ```

2.  **Error Logs**:
    - Full error stack trace
    - Relevant warning messages
    - Log snippets before and after processing

3.  **Environment Information**:
    - Operating system version
    - MSFS version and installation method
    - PMDG aircraft version
    - Data source and AIRAC cycle

4.  **Reproduction Steps**:
    - Detailed operating steps
    - Input commands and parameters
    - Expected results vs. actual results

### 🔗 Contact Information

- **GitHub Issues**: [Submit an issue report](https://github.com/nav-data/docs/issues/new)
- **Community Forum**: [Participate in discussions](https://github.com/nav-data/docs/discussions)
- **Emergency Support**: support@nav-data.org

---

## 🔄 Preventative Measures

### ✅ Best Practices Checklist

- [ ] **Regularly back up** data and configuration
- [ ] **Use the latest version** of the conversion tool
- [ ] **Validate data** after each conversion
- [ ] **Monitor logs** for potential issues
- [ ] **Keep environment** clean and updated
- [ ] **Document** custom configurations

### 📅 Maintenance Schedule

- **Weekly**: Check log files, clean temporary files
- **Monthly**: Update AIRAC data, verify tool version
- **Quarterly**: Full system check, performance optimization
- **Upon major updates**: Full backup, cautious upgrade

Remember: Prevention is better than cure! Regular maintenance can prevent most issues from occurring.
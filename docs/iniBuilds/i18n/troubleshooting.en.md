# 🔧 Troubleshooting Guide

This guide covers common issues and their solutions that you might encounter when using the Nav-data iniBuilds Converter tool. It is categorized by severity and type of issue for quick diagnosis and resolution.

---

## 🚨 Critical Issues

### ❌ Converter Tool Fails to Launch

#### **Issue**: Python Environment Problems Preventing Tool Execution
**Symptoms**:
```bash
ModuleNotFoundError: No module named 'converter'
ImportError: cannot import name 'XP2INI_Converter'
```

**Immediate Solutions**:
```bash
# 1. Verify Python environment
python --version  # Should display 3.8+

# 2. Reinstall dependencies
pip uninstall -r requirements.txt -y
pip install -r requirements.txt --force-reinstall

# 3. Check working directory
pwd  # Linux/macOS
echo %cd%  # Windows

# 4. Re-clone repository (last resort)
git clone https://github.com/nav-data/converter.git
cd converter
python setup.py install
```

#### **Issue**: Missing Critical Files
**Symptoms**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'XP2INI_NDB_Converter.py'
```

**Immediate Solutions**:
```bash
# 1. Verify file integrity
ls -la *.py  # Linux/macOS
dir *.py     # Windows

# 2. Re-download missing files
wget https://raw.githubusercontent.com/nav-data/converter/main/XP2INI_NDB_Converter.py

# 3. Check permissions
chmod +x *.py  # Linux/macOS
```

---

## ⚠️ High Priority

### ❌ A350 Data Integration Failure

#### **Issue**: iniBuilds A350 Cannot Recognize Navigation Data
**Symptoms**: MCDU displays "NO NAV DATA" or AIRAC is shown as empty

**Diagnosis Steps**:
```bash
# 1. Check A350 installation path
find /c/Users -name "*inibuilds*" -type d 2>/dev/null  # Windows (Git Bash)
find /Users -name "*inibuilds*" -type d 2>/dev/null    # macOS
find /home -name "*inibuilds*" -type d 2>/dev/null     # Linux

# 2. Verify community folder
ls "$MSFS_COMMUNITY_PATH/inibuilds-aircraft-a350/SimObjects/Airplanes/iniBuilds_A350_900/"

# 3. Check data files
ls -la *.db *.sqlite *.json  # In A350 data directory
```

**Solutions**:
```bash
# 1. Relocate A350 installation
python converter.py --detect-aircraft --scan-community-folder

# 2. Manually specify path
python converter.py --a350-path="/path/to/inibuilds-aircraft-a350" --force-install

# 3. Fix file permissions
# Windows
icacls "A350 Data Directory" /grant Users:F /T

# Linux/macOS  
chmod -R 755 /path/to/inibuilds-aircraft-a350/
chown -R $USER:$USER /path/to/inibuilds-aircraft-a350/

# 4. Verify installation
python verify_installation.py --aircraft=a350 --verbose
```

#### **Issue**: AIRAC Cycle Mismatch
**Symptoms**: A350 displays an old or incorrect AIRAC cycle

**Solutions**:
```bash
# 1. Force update AIRAC identifier
python converter.py --force-airac --cycle=2024-01 --aircraft=a350

# 2. Clear A350 cache
# Delete A350 cache files
rm -f "$A350_PATH/work/NavData/cache/*"  # Linux/macOS
del "%A350_PATH%\work\NavData\cache\*"   # Windows

# 3. Rebuild navigation database
python rebuild_navdb.py --aircraft=a350 --clean-rebuild

# 4. Verify AIRAC cycle
python check_airac.py --aircraft=a350 --expected-cycle=2024-01
```

---

## 🔄 Installation and Configuration Issues

### ❌ Dependency Package Installation Failure

#### **Issue**: Specific Package Installation Fails
**Common Errors**:
```bash
# Math library dependency issue
ERROR: Failed building wheel for numpy
ERROR: Failed building wheel for pandas

# Compiler issue
Microsoft Visual C++ 14.0 is required
error: Microsoft Visual Studio 14.0 is required
```

**Solutions by Platform**:

**Windows**:
```bash
# 1. Install Visual Studio Build Tools
# Download and install: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# 2. Use pre-compiled packages
pip install numpy pandas -f https://www.lfd.uci.edu/~gohlke/pythonlibs/

# 3. Use conda (recommended)
conda install numpy pandas sqlite3 lxml
```

**macOS**:
```bash
# 1. Install Xcode Command Line Tools
xcode-select --install

# 2. Install dependencies using Homebrew
brew install python@3.9 sqlite3

# 3. Reinstall Python packages
pip3 install -r requirements.txt
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3-dev python3-pip build-essential libsqlite3-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel sqlite-devel

# Reinstall packages
pip3 install -r requirements.txt
```

### ❌ Data Source Configuration Issues

#### **Issue**: Unable to Connect to Data Source
**Symptoms**:
```
ConnectionError: Failed to download AIRAC data
TimeoutError: Data source unreachable
```

**Network Diagnosis**:
```bash
# 1. Test network connection
ping navigraph.com
nslookup navigraph.com

# 2. Check proxy settings
echo $HTTP_PROXY $HTTPS_PROXY  # Linux/macOS
echo %HTTP_PROXY% %HTTPS_PROXY%  # Windows

# 3. Test port connectivity
telnet navigraph.com 443
nc -zv navigraph.com 443  # Linux/macOS
```

**Solutions**:
```bash
# 1. Configure proxy (if needed)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# Windows
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=https://proxy.company.com:8080

# 2. Use offline mode
python converter.py --offline --local-data=/path/to/airac/data

# 3. Change data source
python converter.py --data-source=backup --mirror=asia
```

---

## 📊 Data Processing Issues

### ❌ Memory-Related Errors

#### **Issue**: Insufficient Memory Leading to Conversion Failure
**Symptoms**:
```
MemoryError: Unable to allocate memory
MemoryError: cannot allocate memory for array
OSError: [Errno 12] Cannot allocate memory
```

**Memory Monitoring**:
```bash
# Monitor memory usage in real-time
# Linux
free -h
htop

# macOS
vm_stat
activity monitor

# Windows
tasklist /fi "imagename eq python.exe"
wmic process get name,processid,workingsetsize
```

**Optimization Solutions**:
```bash
# 1. Enable streaming mode
python converter.py --streaming --chunk-size=512KB --memory-limit=2GB

# 2. Process by region
python converter.py --region=ZSPD --process-incrementally
python converter.py --region=ZBAA --process-incrementally  
python converter.py --region=ZGGG --process-incrementally

# 3. Optimize system memory
# Close unnecessary applications
# Increase virtual memory/swap space

# Linux - Increase swap space
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. Use low memory mode
python converter.py --low-memory --disable-cache --temp-cleanup
```

### ❌ Data Format Errors

#### **Issue**: Incompatible Input Data Format
**Symptoms**:
```
ValueError: Invalid ARINC 424 format
ParseError: Malformed XML data
UnicodeDecodeError: codec can't decode byte
```

**Data Validation**:
```bash
# 1. Check file encoding
file input_data.dat
hexdump -C input_data.dat | head

# 2. Verify file integrity
md5sum input_data.dat  # Linux/macOS
certUtil -hashfile input_data.dat MD5  # Windows

# 3. Check file format
python validate_format.py --input=input_data.dat --format=arinc424
```

**Repair Solutions**:
```bash
# 1. Convert file encoding
iconv -f ISO-8859-1 -t UTF-8 input_data.dat > input_data_utf8.dat  # Linux/macOS

# Windows (PowerShell)
Get-Content input_data.dat -Encoding Default | Set-Content input_data_utf8.dat -Encoding UTF8

# 2. Use format converter
python format_converter.py --input=input_data.dat --from=legacy --to=arinc424

# 3. Manually fix common issues
python repair_data.py --fix-encoding --fix-line-endings --input=input_data.dat
```

---

## 🚀 Performance Issues

### ❌ Slow Conversion Speed

#### **Issue**: Conversion Process is Exceptionally Slow
**Possible Causes Analysis**:
- Disk I/O bottleneck (HDD vs SSD)
- Low CPU utilization (single-threaded processing)
- Insufficient memory leading to frequent swapping
- Network latency (online validation)

**Performance Diagnosis**:
```bash
# 1. Monitor system resources
# Linux
iostat -x 1    # I/O statistics
top -p $(pgrep python)  # CPU and memory

# macOS
iostat 1       # I/O statistics  
top -pid $(pgrep python)  # Process monitoring

# Windows
perfmon        # Performance Monitor
wmic process get name,processid,percentprocessortime
```

**Performance Optimization**:
```bash
# 1. Enable multiprocessing
python converter.py --parallel=auto --workers=$(nproc)

# 2. Use faster storage
python converter.py --temp-dir=/path/to/ssd/temp --output-dir=/path/to/ssd/output

# 3. Disable unnecessary checks
python converter.py --skip-validation --no-backup --fast-mode

# 4. Memory-mapped mode (large files)
python converter.py --memory-map --buffer-size=64MB

# 5. Compress output (reduce I/O)
python converter.py --compress-output --compression=lz4
```

### ❌ High CPU Usage

#### **Issue**: Conversion Process Reaches 100% CPU Usage, System Becomes Unresponsive
**Solutions**:
```bash
# 1. Limit CPU usage
python converter.py --cpu-limit=75 --nice=10

# 2. Reduce parallelism
python converter.py --parallel=2 --throttle=1000ms

# 3. Use priority control
# Linux/macOS
nice -n 19 python converter.py  # Lowest priority

# Windows  
start /low python converter.py
```

---

## 🔍 iniBuilds A350 Specific Issues

### ❌ MCDU Navigation Data Display Issues

#### **Issue**: Navigation Data in MCDU is Incorrect or Incomplete
**Symptoms**:
- Waypoints not found
- Missing SID/STAR procedures
- Incorrect frequency information
- Coordinate offset

**Diagnosis Tools**:
```bash
# 1. Check A350 database integrity
python check_a350_db.py --comprehensive --report=detailed

# 2. Verify specific navigation point
python verify_waypoint.py --icao=ZSPD --waypoint=SASAN --aircraft=a350

# 3. Compare data consistency
python compare_data.py --source=navigraph --target=a350_db --threshold=0.001

# 4. Generate difference report
python diff_report.py --original=source_data --converted=a350_data --format=html
```

**Repair Steps**:
```bash
# 1. Rebuild navigation database
python rebuild_navdb.py --aircraft=a350 --source=latest_airac

# 2. Manually fix critical waypoints
python manual_fix.py --waypoints=critical_fixes.json --aircraft=a350

# 3. Update frequency data
python update_frequencies.py --aircraft=a350 --source=official

# 4. Validate repair results
python validate_fix.py --aircraft=a350 --quick-test
```

### ❌ FMS Route Planning Issues

#### **Issue**: A350 FMS Cannot Plan Routes Correctly
**Symptoms**:
- "NO ROUTE FOUND" error
- Disconnected route segments
- Altitude restriction errors

**Resolution Steps**:
```bash
# 1. Check airway connectivity
python check_airways.py --from=ZSPD --to=ZBAA --aircraft=a350

# 2. Validate waypoint connections
python validate_connections.py --airway=A461 --aircraft=a350

# 3. Repair disconnected airways
python repair_airways.py --auto-fix --aircraft=a350 --region=china

# 4. Rebuild airway network
python rebuild_airways.py --aircraft=a350 --optimize-paths
```

---

## 📋 Log Analysis and Diagnosis

### 🔍 Understanding Error Logs

#### **Common Error Patterns and Meanings**:

**Data Conversion Errors**:
```bash
# Coordinate transformation issue
ERROR: CoordinateTransformError: Invalid coordinate format
# -> Check the coordinate format of the input data

# Database write failure  
ERROR: DatabaseError: database is locked
# -> Close other programs accessing the database

# File permission issue
ERROR: PermissionError: [Errno 13] Permission denied
# -> Use administrator privileges or modify file permissions
```

**Network Connection Errors**:
```bash
# Connection timeout
ERROR: ConnectionTimeout: Failed to connect within 30 seconds
# -> Check network connection, increase timeout

# DNS resolution failed
ERROR: socket.gaierror: [Errno -2] Name or service not known  
# -> Check DNS settings, use alternate DNS server
```

#### **Detailed Log Levels**:
- **CRITICAL**: Severe error that prevents the program from continuing execution
- **ERROR**: Feature execution failed, but the program can continue
- **WARNING**: Potential issue, does not affect current execution
- **INFO**: General information, processing progress, etc.
- **DEBUG**: Detailed debugging information, used for problem diagnosis

### 🛠️ Advanced Debugging Techniques

#### **Enable Detailed Debugging**:
```bash
# 1. Most detailed logs
python converter.py --log-level=DEBUG --verbose --trace --profile

# 2. Separate different types of logs
python converter.py --log-split \
  --error-log=errors.log \
  --warning-log=warnings.log \
  --debug-log=debug.log \
  --info-log=info.log

# 3. Monitor logs in real-time
tail -f converter.log | grep -E "(ERROR|CRITICAL)"  # Linux/macOS
```

#### **Performance Analysis**:
```bash
# 1. Enable performance profiling
python -m cProfile -o profile_output.prof converter.py

# 2. Analyze performance bottlenecks
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"

# 3. Analyze memory usage
python -m memory_profiler converter.py --memory-profile
```

---

## 🆘 Emergency Recovery Procedures

### 🚨 Data Corruption Recovery

#### **Quick Recovery Steps**:
```bash
# 1. Immediately stop all related processes
pkill -f "python.*converter"  # Linux/macOS
taskkill /f /im python.exe    # Windows

# 2. Create a snapshot of the current state
cp -r output_data recovery_snapshot_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
robocopy output_data recovery_snapshot_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E  # Windows

# 3. Restore from the latest backup
python restore_backup.py --list-available
python restore_backup.py --restore=latest --confirm --target=output_data

# 4. Verify the recovered data
python verify_data_integrity.py --comprehensive --fix-minor-issues
```

### 🔄 Complete Reset Procedure

#### **When all other methods fail**:
```bash
# WARNING: This will delete all converted data and configurations
echo "This will delete all converted data. Continue? (yes/no)"
read confirmation
if [ "$confirmation" = "yes" ]; then
    # 1. Back up user configuration
    cp config.json config_backup_$(date +%Y%m%d).json
    
    # 2. Complete cleanup
    python cleanup_all.py --nuclear-option --confirm-delete
    
    # 3. Reinitialize
    python setup.py --fresh-install --default-config
    
    # 4. Restore user configuration
    python merge_config.py --base=config.json --user=config_backup_*.json
fi
```

---

## 📞 Obtaining Professional Support

### 📝 Preparing a Support Request

**Before contacting support, please gather the following information**:

```bash
# 1. System information report
python system_report.py --full > system_info.txt

# 2. Error log (last 100 lines)
tail -100 converter.log > recent_errors.log  # Linux/macOS
powershell "Get-Content converter.log -Tail 100" > recent_errors.log  # Windows

# 3. Configuration file
cp config.json config_for_support.json

# 4. Version information
python --version > version_info.txt
python converter.py --version >> version_info.txt
git log --oneline -5 >> version_info.txt
```

### 🔗 Support Channels

#### **Choose by Urgency**:

**🚨 Urgent (Affects flight within 24 hours)**:
- 📧 **Urgent Email**: emergency@nav-data.org
- 📱 **Urgent Contact**: WeChat group "Nav-data Emergency Support"

**⚠️ Important (Reply within 1-3 days)**:
- 🐛 **GitHub Issues**: [Create a detailed issue report](https://github.com/nav-data/docs/issues/new?template=bug_report.md)
- 📧 **Technical Support**: technical@nav-data.org

**💬 General Questions (Reply within 1 week)**:
- 🗣️ **Community Discussion**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 📧 **General Support**: support@nav-data.org

#### **Support Request Template**:
```
Subject: [iniBuilds] Concise Description of Issue - Impact Level

Environment Information:
- Operating System: Windows 11 / macOS 12.6 / Ubuntu 22.04
- Python Version: 3.9.7
- Tool Version: v2.1.3
- iniBuilds A350 Version: v1.2.0
- MSFS Version: 2024

Problem Description:
[Detailed description of the issue]

Steps to Reproduce:
1. First step...
2. Second step...
3. Issue occurs

Expected Outcome:
[Describe the expected correct behavior]

Actual Outcome:
[Describe the actual erroneous behavior]

Solutions Already Attempted:
- Attempted solution A, result...
- Attempted solution B, result...

Attachments:
- system_info.txt
- recent_errors.log
- config_for_support.json
```

---

## 🔄 Preventive Maintenance

### ✅ Regular Maintenance Checklist

#### **Weekly Checks**:
- [ ] Review log files to identify potential issues
- [ ] Clear temporary files and cache
- [ ] Verify A350 data loads correctly
- [ ] Check disk space usage

```bash
# Automate weekly checks
python weekly_maintenance.py --clean-temp --check-logs --verify-data --disk-usage
```

#### **Monthly Checks**:
- [ ] Update AIRAC data
- [ ] Back up important configurations and data
- [ ] Check for tool version updates
- [ ] Performance benchmarking

```bash
# Automate monthly maintenance
python monthly_maintenance.py --update-airac --backup-data --check-updates --benchmark
```

#### **Before Major Updates**:
- [ ] Full data backup
- [ ] Test environment validation
- [ ] Version compatibility check
- [ ] Rollback plan preparation

### 📊 Monitoring and Alerting

#### **Set Up Automatic Monitoring**:
```bash
# 1. Create monitoring script
python create_monitor.py --check-interval=1h --alert-email=admin@your-domain.com

# 2. Set up system service (Linux)
sudo systemctl enable nav-data-monitor
sudo systemctl start nav-data-monitor

# 3. Set up scheduled task (Windows)
schtasks /create /tn "Nav-Data Monitor" /tr "python monitor.py" /sc hourly
```

Remember: Proactive maintenance and monitoring can prevent the vast majority of problems from occurring, and is more efficient than reactive fixes!

---

**Last Updated**: January 15, 2024  
**Document Version**: v2.1  
**Applicable Tool Version**: v2.1.0+
# 🔄 Usage Guide

This guide will walk you through the complete usage workflow of the Nav-data tool, from data conversion to final deployment to your aircraft add-ons.

## 🚀 Quick Start

### ⚡ One-Click Conversion

If you have already completed the configuration, you can directly run the main program:

```bash
python XP2INI_NDB_Converter.py
```

The program will automatically guide you through the entire conversion process.

## 📝 Detailed Workflow

### 🎯 Step One: Data Preparation and Validation

Before starting the conversion, ensure all required data files are in place:

```bash
# Verify data file integrity
python -c "
import os
files = [
    'NAIP/AD_HP.csv',
    'NAIP/RWY.csv', 
    'NAIP/RWY_DIRECTION.csv',
    'NAIP/RTE_SEG.csv',
    'X-Plane/earth_fix.dat',
    'X-Plane/earth_nav.dat',
    'NDBs/nd.db3'
]
for f in files:
    print(f'✅ {f}' if os.path.exists(f) else f'❌ {f}')
"
```

### 🔧 Step Two: Launch Conversion Program

Run the main conversion program and follow the prompts:

```bash
python XP2INI_NDB_Converter.py
```

### 📂 Step Three: Path Configuration Wizard

The program will guide you through the path configuration:

#### 3.1 Base Directory Setup
```
Please enter the base directory path (containing NAIP, NDBs, and XP_Data folders): 
> C:\NavData\Workspace
```

#### 3.2 Automatic Path Detection
The program will automatically scan and display the detected files:

```
================= Starting Path Configuration =================
✅ NAIP_PATH: C:\NavData\Workspace\NAIP
✅ DB_OUTPUT_PATH: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
✅ FNX_NDB_PATH: C:\NavData\Workspace\NDBs\nd.db3
✅ CIFP_PATH: C:\NavData\Workspace\CIFP
✅ PATH_TO_FIX_DAT: C:\NavData\Workspace\X-Plane\earth_fix.dat
✅ PATH_TO_NAV_DAT: C:\NavData\Workspace\X-Plane\earth_nav.dat
✅ LOOKUP_TXT_PATH: C:\NavData\Workspace\ICAO.txt
```

#### 3.3 Path Confirmation
```
Are all the above paths correct? (Y/N): Y
```

### ⚙️ Step Four: Data Processing Workflow

The conversion program will process various data types in the following order:

#### 4.1 Airport Data Processing
```
Starting airport data processing...
📍 Parsing basic airport information
🧭 Calculating airport magnetic variation data
✅ Airport data processing complete (156 airports processed)
```

#### 4.2 Runway Data Processing
```
Starting runway data processing...
🛬 Processing runway information
📐 Calculating runway directions and coordinates
✅ Runway data processing complete (312 runways processed)
```

#### 4.3 VHF Navaid Processing
```
Starting VHF data processing...
📡 Processing VOR/DME navaids
🔢 Calculating navaid frequencies and coverage
✅ VHF data processing complete (89 navaids processed)
```

#### 4.4 GS Landing System
```
Starting GS data processing...
🛬 Processing ILS landing systems
📐 Calculating glide slope and position
✅ GS data processing complete
```

#### 4.5 NDB Navaid Processing
```
Starting NDB data processing...
📻 Processing Non-Directional Beacons (NDBs)
🧭 Calculating NDB magnetic variation
✅ NDB data processing complete (45 NDBs processed)
```

#### 4.6 Waypoint Data Processing
```
Starting waypoint data processing...
🗺️ Processing enroute waypoints
✅ Waypoint data processing complete (2,453 points processed)
```

#### 4.7 Terminal Waypoint Processing
```
Starting terminal point data processing...
🏢 Processing terminal area waypoints
✅ Terminal point data processing complete (876 points processed)
```

#### 4.8 SID Departure Procedure Processing
```
Starting departure procedure processing...
🛫 Processing SID procedures
📋 Parsing procedure waypoints and restrictions
✅ Departure procedure processing complete (234 procedures processed)
```

#### 4.9 STAR Arrival Procedure Processing
```
Starting arrival procedure processing...
🛬 Processing STAR procedures
📋 Parsing procedure waypoints and restrictions
✅ Arrival procedure processing complete (198 procedures processed)
```

#### 4.10 IAP Approach Procedure Processing
```
Starting approach procedure processing...
🎯 Processing approach procedures
📋 Parsing approach waypoints and restrictions
✅ Approach procedure processing complete (445 procedures processed)
```

#### 4.11 Airway Data Processing
```
Starting airway data processing...
🛣️ Processing high and low altitude airways
🔗 Establishing waypoint connections
✅ Airway data processing complete (167 airways processed)
```

#### 4.12 Database Optimization
```
🗜️ Compressing database...
📊 Deleting temporary indices...
✅ Database optimization complete
```

### ⏱️ Step Five: Processing Complete

```
=====================================
🎉 Data processing complete, time taken: 127.3 seconds
📄 Output file: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
📊 Database size: 15.6 MB
📈 Processing statistics:
   - Airports: 156
   - Runways: 312
   - VHF Navaids: 89
   - NDB Navaids: 45
   - Waypoints: 3,329
   - SID Procedures: 234
   - STAR Procedures: 198
   - Approach Procedures: 445
   - Airways: 167
=====================================
Press Enter to exit...
```

## 🚁 Data Deployment Guide

### 📁 Target Aircraft Identification

Select the corresponding deployment path based on the aircraft add-on you are using:

#### iniBuilds A350 Series
```
[MSFS Community Folder]\inibuilds-aircraft-a350\work\NavigationData\
```

#### PMDG 737 Series
```
[MSFS Community Folder]\pmdg-aircraft-737\Config\Navdata\
[MSFS Community Folder]\pmdg-aircraft-738\Config\Navdata\
[MSFS Community Folder]\pmdg-aircraft-739\Config\Navdata\
```

#### PMDG 777 Series
```
[MSFS Community Folder]\pmdg-aircraft-77w\Config\Navdata\
[MSFS Community Folder]\pmdg-aircraft-77f\Config\Navdata\
```

### 🔄 Deployment Process

#### Step 1: Back Up Existing Data

**IMPORTANT**: Always create a backup before deploying new data!

```powershell
# Back up existing navigation data
$targetDir = "C:\...\pmdg-aircraft-77w\Config\Navdata"
$backupDir = "$targetDir" + "_backup_" + (Get-Date -Format "yyyyMMdd")
Copy-Item $targetDir $backupDir -Recurse
Write-Host "Backup created: $backupDir"
```

#### Step 2: Clear Cache Directory

Clear the MSFS navigation data cache:

**MSFS 2020 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2020 (Steam)** 
```
%APPDATA%\Microsoft Flight Simulator\Packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalState\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Steam)**
```
%APPDATA%\Microsoft Flight Simulator 2024\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

#### Step 3: Deploy New Data

Copy the converted database file to the target location:

```bash
# Copy database file
copy "C:\NavData\Workspace\Output\e_dfd_PMDG.s3db" "[Target Navigation Data Directory]\"
```

#### Step 4: Verify Deployment

Launch MSFS and load the aircraft, then check the following items:

- [ ] FMC starts normally and without database errors
- [ ] Able to query airport information (ICAO code)
- [ ] Able to plan routes (origin to destination)
- [ ] SID/STAR procedures are available and complete
- [ ] Approach procedures are selectable and data is correct

## 🔧 Advanced Usage Tips

### 📊 Batch Processing Script

Create a batch script to automate operations:

```batch
@echo off
echo ======================================
echo     Nav-data Automatic Conversion Script
echo ======================================

cd /d "C:\NavData\iniBuilds"

echo 1. Starting data conversion...
python XP2INI_NDB_Converter.py

echo 2. Backing up existing data...
set BACKUP_DIR=C:\NavData\Backup\%date:~0,4%%date:~5,2%%date:~8,2%
mkdir "%BACKUP_DIR%"
xcopy "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData" "%BACKUP_DIR%" /E /I

echo 3. Clearing cache...
del /Q "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\*"

echo 4. Deploying new data...
copy "Output\e_dfd_PMDG.s3db" "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\"

echo 5. Complete!
pause
```

### 🔄 Scheduled Update Workflow

Set up an automatic update process:

```python
#!/usr/bin/env python3
"""Automatic update workflow"""

import schedule
import time
import subprocess
from datetime import datetime

def update_navdata():
    """Performs navigation data update"""
    print(f"🔄 Starting navigation data update - {datetime.now()}")
    
    try:
        # Run the conversion program
        result = subprocess.run(['python', 'XP2INI_NDB_Converter.py'], 
                              capture_output=True, text=True)
        
        if result.returncode == 0:
            print("✅ Navigation data updated successfully!")
            # Automatic deployment logic can be added here
        else:
            print("❌ Update failed:", result.stderr)
            
    except Exception as e:
        print(f"❌ Update exception: {e}")

# Run every 28 days (AIRAC cycle)
schedule.every(28).days.do(update_navdata)

# Keep the script running
print("📅 Navigation data automatic update scheduler started")
while True:
    schedule.run_pending()
    time.sleep(3600)  # Check every hour
```

### 🔍 Data Quality Validation

Create a validation script to check output data quality:

```python
#!/usr/bin/env python3
"""Data quality validation script"""

import sqlite3
import os

def validate_database(db_path):
    """Validates database integrity and data quality"""
    
    if not os.path.exists(db_path):
        print(f"❌ Database file does not exist: {db_path}")
        return False
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Check table structure
    tables = [
        'tbl_airports',
        'tbl_runways', 
        'tbl_d_vhfnavaids',
        'tbl_db_enroute_ndbnavaids',
        'tbl_ea_enroute_waypoints',
        'tbl_pc_terminal_waypoints',
        'tbl_pd_sids',
        'tbl_er_enroute_airways'
    ]
    
    print("🔍 Database Validation Report")
    print("=" * 40)
    
    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"✅ {table}: {count} records")
        except sqlite3.OperationalError as e:
            print(f"❌ {table}: Table does not exist or query failed")
    
    # Check data quality
    print("\n📊 Data Quality Check")
    print("=" * 40)
    
    # Check for null coordinates
    cursor.execute("""
        SELECT COUNT(*) FROM tbl_airports 
        WHERE airport_latitude IS NULL OR airport_longitude IS NULL
    """)
    null_coords = cursor.fetchone()[0]
    
    if null_coords == 0:
        print("✅ Airport coordinates: No null values")
    else:
        print(f"⚠️ Airport coordinates: {null_coords} null values")
    
    conn.close()
    return True

if __name__ == "__main__":
    validate_database("Output/e_dfd_PMDG.s3db")
```

## 🚨 Common Usage Issues

### Conversion Process Issues

#### Issue: Program stops midway
```bash
# Reason: Data file corrupted or incorrect path
# Solution: Check the integrity of all input files
python -c "
import os
for f in ['NAIP/AD_HP.csv', 'X-Plane/earth_fix.dat']:
    if os.path.exists(f):
        print(f'{f}: {os.path.getsize(f)} bytes')
    else:
        print(f'{f}: File does not exist')
"
```

#### Issue: Insufficient Memory Error
```python
# Solution: Reduce batch size
# Set a smaller BATCH_SIZE in the configuration
BATCH_SIZE = 500  # Reduce to 500
```

#### Issue: Database Locking Error
```bash
# Reason: Another program is using the database
# Solution: Close all related programs and rerun
taskkill /f /im "FlightSimulator.exe"
```

### Deployment Issues

#### Issue: FMC displays "DB OUT OF DATE"
```bash
# Reasons:
# 1. Database file not copied correctly
# 2. MSFS cache not cleared
# 3. AIRAC cycle mismatch

# Solution steps:
# 1. Confirm database file exists in the correct location
# 2. Completely delete the contents of the NavigationData cache folder
# 3. Restart MSFS
```

#### Issue: Missing Waypoints or Procedures
```bash
# Reason: Incomplete CIFP data
# Solution:
# 1. Re-download the complete CIFP data package
# 2. Confirm the procedure files for the target airport exist
# 3. Check if the ICAO region code is within the supported range
```

## 📈 Performance Optimization

### 🚀 Improve Conversion Speed

```python
# Enable multiprocessing
MULTIPROCESS_WORKERS = 8  # Adjust according to CPU core count

# Use SSD storage
# Setting the working directory on an SSD can significantly improve I/O performance

# Increase available memory
# Close unnecessary programs, ensure at least 8GB of free memory
```

### 📊 Monitor Resource Usage

```python
import psutil
import time

def monitor_performance():
    """Monitors system resource usage"""
    while True:
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        disk = psutil.disk_usage('.').percent
        
        print(f"CPU: {cpu}% | Memory: {memory}% | Disk: {disk}%")
        time.sleep(5)

# Run monitoring during conversion
monitor_performance()
```

---

Congratulations! You have now mastered the complete usage workflow for the Nav-data tool.
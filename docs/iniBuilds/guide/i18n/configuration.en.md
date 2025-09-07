# ⚙️ Configuration Guide

This guide will detail how to configure the Nav-data conversion tool's data sources, path settings, and AIRAC cycle management.

## 📊 Data Source Overview

The Nav-data tool supports various industry-standard aviation navigation data sources, ensuring the authority and accuracy of the data.

### 🔄 Supported Data Formats

| Data Format | Source | Purpose | Standard |
|-------------|--------|---------|----------|
| **NAIP CSV** | Navigraph/Aerosoft | Airports, Runways, Airway Routes | ARINC 424 |
| **X-Plane DAT** | X-Plane 11/12 | Waypoints, Navaids | X-Plane Format |
| **CIFP** | Official Procedure Data | SID/STAR/Approach | ARINC 424 |
| **SQLite DB** | Fenix A320 | NDB Reference Data | Custom Format |

## 🗃️ Required Data Files

### 📁 Basic Directory Structure

Create the following directory structure to organize your navigation data:

```
NavData_Workspace/
├── NAIP/                    # NAIP CSV file directory
│   ├── AD_HP.csv           # Airport Basic Data
│   ├── RWY.csv             # Runway Information
│   ├── RWY_DIRECTION.csv   # Runway Direction Data
│   └── RTE_SEG.csv         # Route Segment Data
│
├── X-Plane/                 # X-Plane data files
│   ├── earth_fix.dat       # Waypoint Data
│   └── earth_nav.dat       # Navaid Data
│
├── CIFP/                    # CIFP procedure data directory
│   ├── ZBAA.dat            # Beijing Capital Airport
│   ├── ZSSS.dat            # Shanghai Pudong Airport
│   └── [Other Airport].dat # Procedure files for various airports
│
├── NDBs/                    # NDB database
│   └── nd.db3              # Fenix Navigation Database
│
└── Output/                  # Output directory
    └── e_dfd_PMDG.s3db     # Converted database
```

## 🌐 Data Source Acquisition Guide

### 1️⃣ Navigraph Data (Recommended)

**Acquisition Steps:**
1.  Visit the [Navigraph official website](https://navigraph.com/) and register an account
2.  Subscribe to Navigraph Unlimited or Charts + Data service
3.  Download Navigraph FMS Data Manager
4.  Select "Generic" format in FMS Data Manager
5.  Download and unzip the NAIP data package

**NAIP File Acquisition:**
```
Navigraph FMS Data Manager → 
Generic → 
NAIP Format → 
Download Current AIRAC Cycle
```

### 2️⃣ Aerosoft NavDataPro

**Acquisition Steps:**
1.  Purchase [Aerosoft NavDataPro](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/)
2.  Download the NavDataPro application
3.  Log in and download NAIP format data
4.  Unzip to the NAIP directory

### 3️⃣ X-Plane Data Files

**Source Options:**
-   **Option A**: Copy from X-Plane 11/12 installation directory
    ```
    [X-Plane Installation Directory]/Resources/default data/earth_fix.dat
    [X-Plane Installation Directory]/Resources/default data/earth_nav.dat
    ```

-   **Option B**: Obtain from this project's sample data
    ```
    [Project Directory]/sample_data/earth_fix.dat
    [Project Directory]/sample_data/earth_nav.dat
    ```

### 4️⃣ CIFP Procedure Data

**Acquisition Methods:**
-   **Official Channels**: Free download from FAA official website
-   **Third-party**: CIFP data included in Navigraph
-   **Project Provided**: Pre-processed CIFP files for the China region

### 5️⃣ NDB Database

**Acquisition Path:**
```bash
# Copy from Fenix A320 installation directory
[MSFS Community]/fenix-a320/Resources/NavData/nd.db3
```

## 🛠️ Path Configuration Wizard

### Automatic Configuration Mode

When running the conversion tool, the program will guide you through the path configuration:

```bash
python XP2INI_NDB_Converter.py
```

**Configuration Process:**
1.  **Base Directory Selection**: Select the root directory containing all data files
2.  **Automatic Detection**: The program automatically scans and verifies various data files
3.  **Path Confirmation**: Displays detected file paths for your confirmation
4.  **Manual Supplement**: Manually specify paths for files not found

### 🔍 Path Validation Checklist

| Data Type | File Path | Validation Status |
|-----------|-----------|-------------------|
| NAIP Airport Data | `NAIP/AD_HP.csv` | ✅ |
| NAIP Runway Data | `NAIP/RWY.csv` | ✅ |
| NAIP Runway Direction | `NAIP/RWY_DIRECTION.csv` | ✅ |
| NAIP Route Data | `NAIP/RTE_SEG.csv` | ✅ |
| X-Plane Waypoints | `X-Plane/earth_fix.dat` | ✅ |
| X-Plane Navaids | `X-Plane/earth_nav.dat` | ✅ |
| CIFP Procedure Directory | `CIFP/` | ✅ |
| NDB Database | `NDBs/nd.db3` | ✅ |
| ICAO Lookup Table | `ICAO.txt` | ✅ |

## 📅 AIRAC Cycle Management

### 🗓️ AIRAC Cycle Description

**AIRAC (Aeronautical Information Regulation And Control)** is a 28-day aeronautical information update cycle established by the International Civil Aviation Organization (ICAO).

-   **Update Frequency**: Every 28 days
-   **Global Synchronization**: Unified update time worldwide
-   **Importance**: Ensures pilots and controllers use the same navigation data

### 📊 Current Cycle Query

```python
# Query current AIRAC cycle
import datetime

def get_current_airac():
    # AIRAC 2023 Reference Date: January 5, 2023
    base_date = datetime.date(2023, 1, 5)
    today = datetime.date.today()
    
    days_diff = (today - base_date).days
    cycle_number = (days_diff // 28) + 1
    
    return f"AIRAC {today.year}{cycle_number:02d}"

print(f"Current Cycle: {get_current_airac()}")
```

### 🔄 Data Update Strategy

#### Real-time Update Users
-   **Update Frequency**: Every AIRAC cycle
-   **Recommended Source**: Navigraph (automatic update)
-   **Applicable Scenarios**: Online flight, professional use

#### Casual Users
-   **Update Frequency**: 3-6 months
-   **Recommended Source**: Aerosoft NavDataPro
-   **Applicable Scenarios**: Offline flight, recreational use

## 🎛️ Advanced Configuration Options

### 📍 Region Filtering Configuration

Customize data processing scope for different regions:

```python
# Configure ICAO region codes to process
SUPPORTED_ICAO_REGIONS = {
    'ZB',  # Northern China Region
    'ZS',  # Eastern China Region  
    'ZG',  # Southern China Region
    'ZJ',  # East China Region
    'ZY',  # Central China Region
    'ZL',  # Southwest China Region
    'ZU',  # Western China Region
    'ZW',  # Northwest China Region
    'ZP',  # North China Region
    'ZH',  # South China Region
    'VM',  # Vietnam Region
    'VH',  # Hong Kong Region
    'RK'   # Korea Region
}
```

### 🎯 Precision Configuration

Set coordinate and calculation precision:

```python
# Coordinate precision configuration
COORDINATE_PRECISION = 8  # Decimal places
MAGNETIC_VARIATION_PRECISION = 1  # Magnetic variation precision

# Distance unit conversion
NM_TO_KM = 1.852  # Nautical miles to kilometers
KM_TO_NM = 0.539957  # Kilometers to nautical miles
```

### ⚡ Performance Optimization Configuration

```python
# Parallel processing configuration
MULTIPROCESS_WORKERS = 4  # Number of parallel processes
BATCH_SIZE = 1000  # Batch size
DATABASE_TIMEOUT = 30  # Database timeout (seconds)

# Memory optimization
ENABLE_CACHE = True  # Enable coordinate caching
CACHE_SIZE_LIMIT = 10000  # Cache size limit
```

## 🔧 Configuration File Template

Create a `config.json` file to save common configurations:

```json
{
  "data_sources": {
    "naip_path": "C:/NavData/NAIP",
    "xplane_path": "C:/NavData/X-Plane", 
    "cifp_path": "C:/NavData/CIFP",
    "ndb_path": "C:/NavData/NDBs/nd.db3",
    "icao_txt": "C:/NavData/ICAO.txt"
  },
  "output": {
    "database_path": "C:/NavData/Output/e_dfd_PMDG.s3db"
  },
  "processing": {
    "regions": ["ZB", "ZS", "ZJ", "ZG", "ZY", "ZL", "ZU", "ZW", "ZP", "ZH"],
    "coordinate_precision": 8,
    "enable_multiprocessing": true,
    "workers": 4
  },
  "airac": {
    "current_cycle": "2410",
    "auto_update_check": true
  }
}
```

## ✅ Configuration Validation

### 🔍 Configuration Check Script

```python
#!/usr/bin/env python3
"""Configuration validation script"""

import os
import json
from pathlib import Path

def validate_config():
    """Validate the integrity of configuration files"""
    
    required_files = {
        'NAIP/AD_HP.csv': 'Airport Data',
        'NAIP/RWY.csv': 'Runway Data', 
        'NAIP/RWY_DIRECTION.csv': 'Runway Direction',
        'NAIP/RTE_SEG.csv': 'Route Data',
        'X-Plane/earth_fix.dat': 'Waypoint Data',
        'X-Plane/earth_nav.dat': 'Navaid Data',
        'NDBs/nd.db3': 'NDB Database'
    }
    
    print("🔍 Starting configuration validation...")
    
    for file_path, description in required_files.items():
        if os.path.exists(file_path):
            print(f"✅ {description}: {file_path}")
        else:
            print(f"❌ {description}: {file_path} (File not found)")
    
    print("🔍 Validation complete!")

if __name__ == "__main__":
    validate_config()
```

## 🚨 Common Configuration Issues

### Path Issues
```bash
# Problem: Path containing Chinese characters causes encoding errors
# Solution: Use English paths, avoid special characters

# Incorrect Path Example
C:/导航数据/NAIP/

# Correct Path Example  
C:/NavData/NAIP/
```

### File Permission Issues
```powershell
# Problem: No read permission
# Solution: Run as administrator or modify file permissions
icacls "C:\NavData" /grant Everyone:F /T
```

### Data Integrity Issues
```bash
# Problem: Incomplete NAIP files
# Solution: Re-download the complete AIRAC data package
# Ensure all CSV files exist and are not empty
```

---

Configuration complete! Next, please see the [**Usage Instructions**](./usage.md) to execute the data conversion process.
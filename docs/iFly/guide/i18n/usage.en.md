# 🚀 iFly Navdata Converter User Guide

This guide provides a detailed introduction to using the iFly Navdata Converter, from basic operations to advanced features, helping you smoothly convert navigation data from Fenix to iFly.

## 🎯 Preparations Before Use

### 1. File Preparation Checklist

Before starting the conversion, please confirm that you have the following files ready:

- ✅ **Fenix Navigation Database** (`nd.db3`)
  ```
  Location: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  Size: Typically 50-200MB
  Format: SQLite database file
  ```

- ✅ **NAIP Route Data** (`RTE_SEG.csv`)
  ```
  Source: CAAC Data Service Website
  Encoding: UTF-8
  Size: Typically 5-20MB
  Format: CSV file, containing route segment information
  ```

- ✅ **iFly 737 MAX 8** installed and running correctly

### 2. Environment Verification

Run the environment check script:
```bash
# Verify Python environment
python --version  # Should display 3.8 or higher

# Verify dependencies
python -c "import rich, pandas, pygeomag; print('Environment verification passed!')"

# Check available memory
python -c "import psutil; print(f'Available Memory: {psutil.virtual_memory().available // (1024**3)} GB')"
```

## 🖥️ Interactive Usage

### Launch Converter

```bash
# Enter project directory
cd /path/to/ifly-converter

# Launch converter
python main.py
```

### Welcome Interface

After launching the converter, you will see a modern welcome interface:

```
╔═══════════════════════════════════════ 🛩️  Aviation Navdata Converter Tool  ✈️ ═══════════════════════════════════════╗
║                                                                                                          ║
║                                      Fenix to iFly Aviation Navdata Converter                                       ║
║                                          High-Quality, Modern Conversion Experience                                         ║
║                                                                                                          ║
╚═══════════════════════════════════════ Powered by Rich • Version 2.0 ═══════════════════════════════════════╝

🔍 System check...
✅ Python Environment: 3.9.16
✅ Dependencies: All installed
✅ Available Memory: 8.2 GB
✅ Disk Space: 125 GB

Ready to start conversion process...
```

## 📋 Detailed Conversion Steps

### Step 1: Connect Fenix Database

```
╭─────────────────────────────────────────────── 🔄 Step 1/4 ────────────────────────────────────────────────╮
│ Connect Fenix Database                                                                                        │
│ Please select the Fenix A320 navigation database file (nd.db3)                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Please enter Fenix database file path:
```

**Input Example:**
```bash
# Windows Path
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Or press Enter to use auto-detection
[Press Enter to use auto-detection]
```

**Verification Process:**
```
🔍 Verifying database...
✅ File exists and is readable
✅ Database format is correct
✅ Required tables complete (11/11)
📊 Data statistics:
   • Airports: 15,234
   • Runways: 28,456
   • Waypoints: 156,789
   • Terminal Procedures: 8,945
```

### Step 2: Select CSV File

```
╭─────────────────────────────────────────────── 🔄 Step 2/4 ────────────────────────────────────────────────╮
│ Select NAIP Route Data                                                                                        │
│ Please select the CAAC RTE_SEG.csv file                                                                       │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Please enter CSV file path:
```

**Verification Process:**
```
🔍 Verifying CSV file...
✅ File encoding: UTF-8
✅ Format verification passed
✅ Required columns exist
📊 Data preview:
   • Total records: 12,456
   • Number of routes: 345
   • Coverage area: Mainland China, Hong Kong, Macau
   • Data validity: AIRAC 2508
```

### Step 3: Locate iFly Installation

```
╭─────────────────────────────────────────────── 🔄 Step 3/4 ────────────────────────────────────────────────╮
│ Locate iFly Installation                                                                                    │
│ Searching for iFly 737 MAX 8 installation location...                                                         │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

🔍 Scanning common installation locations...
✅ iFly installation found: Community\ifly-aircraft-737max8\
📁 Installation path: C:\Users\Username\AppData\Local\Packages\Microsoft.FlightSimulator_xxx\LocalCache\Packages\Community\ifly-aircraft-737max8\
📋 Directory structure verification:
   ✅ Data\navdata\Permanent\
   ✅ Data\navdata\Supplemental\
   ✅ Write permissions normal
```

If auto-detection fails, the system will prompt for manual input:
```
❌ Auto-detection failed
Please manually enter the iFly 737 MAX 8 installation path:
```

### Step 4: Configure Conversion Options

```
╭─────────────────────────────────────────────── 🔄 Step 4/4 ────────────────────────────────────────────────╮
│ Configure Conversion Options                                                                                │
│ Set terminal procedure processing parameters                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Terminal Procedure ID Start Value [Default: 1000]:
```

**Configuration Options Explanation:**
```
📊 Terminal Procedure ID Configuration:
   • Start ID: 1000 (Recommended)
   • Estimated usage range: 1000-3500
   • Total available IDs: 9000
   • Recommended buffer: 20%

⚙️ Other Options:
   • Coordinate precision: 8 decimal places (Default)
   • Magnetic declination calculation: WMM-2025 Model
   • AIRAC cycle: Auto-calculated
```

## 🔄 Conversion Process

### Configuration Confirmation

Before starting the conversion, the system will display a complete configuration summary:

```
┌────────────────────────────────── ✅ Conversion Configuration Confirmation ──────────────────────────────────┐
│                                                                                                           │
│  📂 Data Source Configuration                                                                              │
│  ├─ Fenix Database: .../navdata/nd.db3 (142.5 MB)                                                          │
│  ├─ NAIP CSV File: .../RTE_SEG.csv (8.2 MB)                                                                │
│  └─ iFly Installation Path: .../ifly-aircraft-737max8/                                                     │
│                                                                                                           │
│  ⚙️ Processing Parameters                                                                                   │
│  ├─ Terminal Procedure Start ID: 1000                                                                      │
│  ├─ Coordinate Precision: 8 decimal places                                                                 │
│  ├─ Magnetic Declination Model: WMM-2025                                                                   │
│  └─ AIRAC Cycle: 2508 (Auto-calculated)                                                                    │
│                                                                                                           │
│  📊 Estimated Processing                                                                                    │
│  ├─ Waypoints: ~12,456                                                                                     │
│  ├─ Terminal Procedures: ~350                                                                             │
│  └─ Estimated Time: 5-10 minutes                                                                          │
│                                                                                                           │
└───────────────────────────────────────────────────────────────────────────────────────────────────────────┘

Confirm start conversion? [Y/n]:
```

### Route Data Processing

```
╭─────────────────────────────────────────── 🛣️ Processing Route Data ───────────────────────────────────────────╮
│                                                                                                      │
│ Processing NAIP route segment data...                                                                │
│                                                                                                      │
│ ████████████████████████████████████████ 12,456/12,456 (100%) ⏱️ 0:03:45                         │
│                                                                                                      │
│ Currently processing: A1 Route → ZSAM-VOR01 Segment                                                  │
│ Magnetic declination calculation: 39.917°N, 116.383°E → +7.2°                                        │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Route Processing Statistics:
✅ Successfully processed: 12,456 waypoints
✅ Magnetic declination calculated: 12,456 times (avg. 0.02s/time)
✅ Output file: WPNAVRTE.txt (increased by 2.3 MB)
⚠️ Skipped records: 23 (coordinate anomaly)
```

### Terminal Procedure Processing

```
╭─────────────────────────────────────────── 🏢 Processing Terminal Procedures ───────────────────────────────────────────╮
│                                                                                                      │
│ Converting terminal procedure data...                                                                │
│                                                                                                      │
│ ████████████████████████████████████████ 350/350 (100%) ⏱️ 0:02:15                               │
│                                                                                                      │
│ Currently processing: ZBAA (Beijing Capital) → SID SHUAY1A                                           │
│ Procedure Type: Standard Instrument Departure Procedure                                              │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Terminal Procedure Statistics:
✅ Airports processed: 145
✅ SID Procedures: 234
✅ STAR Procedures: 198  
✅ Approach Procedures: 312
✅ New files added: 89
✅ Files updated: 56
```

### AIRAC Cycle Management

```
╭─────────────────────────────────────────── 📅 AIRAC Cycle Management ───────────────────────────────────────────╮
│                                                                                                      │
│ Calculating and setting AIRAC cycle...                                                               │
│                                                                                                      │
│ 🗓️ Calculation Information                                                                           │
│ ├─ Base Date: 2024-01-11 (AIRAC 2401)                                                                 │
│ ├─ Current Date: 2024-12-24                                                                           │
│ ├─ Days elapsed: 348 days                                                                             │
│ ├─ Cycles elapsed: 12.43 → 12 full cycles                                                            │
│ └─ Current cycle: 2508                                                                                │
│                                                                                                      │
│ 📋 Cycle Details                                                                                     │
│ ├─ AIRAC Identifier: 2508                                                                             │
│ ├─ Effective Date: 2024-12-19                                                                         │
│ ├─ Expiry Date: 2025-01-16                                                                            │
│ └─ Days remaining: 23 days                                                                           │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

✅ AIRAC file generated: FMC_Ident.txt
```

## ✅ Conversion Complete

### Success Summary

```
┌─────────────────────────────────────────── ✅ Conversion Complete ───────────────────────────────────────────────┐
│                                                                                                        │
│  🎉 Congratulations! Navigation data conversion completed successfully                                 │
│                                                                                                        │
│  📊 Processing Statistics                                                                                │
│  ├─ 🛣️ Route Data: 12,456 waypoints                                                                      │
│  ├─ 🏢 Terminal Procedures: 350 procedures (145 airports)                                               │
│  ├─ 📅 AIRAC Cycle: 2508                                                                               │
│  └─ ⏱️ Total Time: 6 minutes 32 seconds                                                                │
│                                                                                                        │
│  📁 Output Files                                                                                        │
│  ├─ WPNAVRTE.txt: Route data (updated)                                                                  │
│  ├─ FMC_Ident.txt: AIRAC Identifier file                                                              │
│  ├─ Supplemental: 89 new procedure files                                                               │
│  └─ Conversion Log: converter.log                                                                     │
│                                                                                                        │
│  🔄 Next Steps Recommended                                                                              │
│  1. Restart Microsoft Flight Simulator                                                                 │
│  2. Load iFly 737 MAX 8                                                                                │
│  3. Verify new routes and procedures in the FMC                                                        │
│  4. Save backup files for recovery                                                                     │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### File Location Explanation

After conversion, files will be placed in the following location:

```
📁 iFly Navdata Directory:
Community\ifly-aircraft-737max8\Data\navdata\

├── Permanent\
│   ├── WPNAVRTE.txt        # Route data (updated)
│   └── Other original files...
│
├── Supplemental\
│   ├── ZBAA\              # Beijing Capital Airport
│   │   ├── SID\           # Standard Instrument Departure
│   │   ├── STAR\          # Standard Terminal Arrival
│   │   └── APP\           # Approach Procedures
│   ├── ZSPD\              # Shanghai Pudong Airport
│   └── ...Other airports
│
└── FMC_Ident.txt          # AIRAC Identifier file
```

## 🧪 Verify Conversion Results

### 1. File Verification

```bash
# Check if files are generated
ls -la "Community\ifly-aircraft-737max8\Data\navdata\"

# Check file size (should be larger than before conversion)
du -h "Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt"

# Verify AIRAC identifier
cat "Community\ifly-aircraft-737max8\Data\navdata\FMC_Ident.txt"
```

### 2. Simulator Verification

1.  **Restart MSFS**: Completely exit and restart the simulator
2.  **Load iFly 737**: Select iFly 737 MAX 8
3.  **Check FMC**:
    ```
    FMC Main Page → INIT REF → View AIRAC Cycle
    Should display: AIRAC 2508
    ```
4.  **Test Routes**:
    ```
    ROUTE Page → Enter Chinese routes (e.g., A1, B1)
    Should correctly display waypoints and distances
    ```

### 3. Function Test Checklist

- [ ] **AIRAC Cycle displays correctly**
- [ ] **Chinese routes can be loaded** (A1, B1, G212, etc.)
- [ ] **Airport procedures complete** (SID, STAR, APP)
- [ ] **Waypoint coordinates accurate**
- [ ] **Magnetic declination calculated correctly**
- [ ] **FMC navigation normal**

## 🔧 Advanced Usage

### Batch Processing Mode

Although the current version does not directly support batch processing, you can achieve it through scripts:

```python
# batch_convert.py
import subprocess
import os

databases = [
    "path/to/fenix_db1.db3",
    "path/to/fenix_db2.db3"
]

csv_file = "path/to/RTE_SEG.csv"

for db in databases:
    print(f"Processing database: {db}")
    # main.py needs to be modified here to support command-line arguments
    # subprocess.run(["python", "main.py", "--db", db, "--csv", csv_file])
```

### Custom Configuration File

Create a `config.json` file to save common configurations:

```json
{
    "default_fenix_path": "C:\\Users\\Username\\AppData\\Roaming\\Microsoft Flight Simulator\\Packages\\fenix-a320\\SimObjects\\Airplanes\\FenixA320\\navdata\\nd.db3",
    "default_csv_path": "D:\\Nav-Data\\RTE_SEG.csv",
    "terminal_id_start": 1500,
    "coordinate_precision": 8,
    "enable_backup": true,
    "backup_directory": "D:\\Nav-Data\\Backups"
}
```

### Data Update Process

Suggested regular update process:

```bash
# 1. Backup current data
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_$(date +%Y%m%d)"

# 2. Download the latest NAIP data
# (Download new RTE_SEG.csv from the official website)

# 3. Get the latest Fenix database
# (Ensure Fenix A320 is updated to the latest version)

# 4. Run the converter
python main.py

# 5. Verify results
# (Test new data in the simulator)
```

## ⚠️ Important Notes

### Important Reminders

1.  **Data Backup**: Always back up original iFly navigation data before conversion
2.  **Version Compatibility**: Ensure you are using the latest versions of Fenix A320 and iFly 737 MAX 8
3.  **Timeliness**: It is recommended to update AIRAC data every 28 days
4.  **Verification Testing**: Perform test flights on key routes after conversion

### Performance Optimization

1.  **Use SSD**: Place data files on an SSD to improve processing speed
2.  **Disable Antivirus**: Temporarily disable real-time scanning to avoid file access conflicts
3.  **Sufficient Memory**: Ensure at least 4GB of available memory
4.  **Stable Power Supply**: Use a UPS or ensure stable power supply

### Troubleshooting

If you encounter issues during the conversion process:

1.  **Check Logs**: Check `converter.log` for error messages
2.  **Retry Operation**: Some network or file access issues might be temporary
3.  **Clear Cache**: Delete temporary files and retry
4.  **Downgrade Settings**: If memory is insufficient, you can reduce the batch size

---

**Congratulations on completing the guide!** 🎉

You have now mastered the complete usage of the iFly Navdata Converter. If you encounter issues, please refer to the [Troubleshooting Guide](../troubleshooting.md) or [FAQ](../faq.md).

Happy flying! ✈️
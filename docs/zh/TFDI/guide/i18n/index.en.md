# 🚁 TFDI Navigation Data Converter User Guide

TFDI Navigation Data Converter is a professional aviation navigation data conversion tool, specifically designed to convert Fenix A320 navigation databases into TFDI MD-11 compatible JSON format. This tool features a modern CLI interface and efficient data processing capabilities.

## 📖 Quick Tour

### 🎯 Core Features
- **🎨 Rich CLI Interface** - Modern, colorized terminal interface with real-time progress display and status feedback
- **🔄 Complete Data Conversion** - Supports comprehensive conversion of all Fenix database tables
- **📊 Intelligent Data Processing** - Coordinate standardization, column name normalization, and data integrity validation
- **🔍 FAF Point Detection** - Intelligently identifies Final Approach Fix points, optimizing approach procedures
- **📦 JSON Output** - Generates standard TFDI-compatible JSON format files
- **🗜️ Automatic Compression** - Creates 7z archives for easy distribution

### ✈️ Supported Aircraft Models
- **TFDI MD-11** - High-fidelity McDonnell Douglas MD-11 in Microsoft Flight Simulator
- **Data Source** - Fenix A320 Navigation Database (nd.db3)
- **Format Support** - SQLite Database to JSON Format

### 📊 Data Type Coverage
- **🏢 Airport Data** - Airport information, runway data, communication frequencies
- **🧭 Navigation Aids** - VOR/DME, NDB, ILS device data
- **🛣️ Airway Network** - Airway definitions, airway segments, waypoint coordinates
- **🎯 Terminal Procedures** - SID, STAR, approach procedures, departure procedures
- **🔗 Lookup Tables** - Indexes and association tables for various data types

## 🚀 Quick Start

### 1️⃣ System Requirements Verification
```bash
# Check Python version (3.8+ required)
python --version

# Verify available memory (4GB+ recommended)
python -c "import psutil; print(f'Available Memory: {psutil.virtual_memory().available//1024**3} GB')"

# Check disk space (at least 1GB required)
python -c "import shutil; print(f'Available Space: {shutil.disk_usage(\".\")[2]//1024**3} GB')"
```

### 2️⃣ Prepare Necessary Files
- ✅ **Fenix Navigation Database** (`nd.db3`)
  ```
  Typical location: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **TFDI MD-11** installed in MSFS
- ✅ **Converter source code** downloaded locally

### 3️⃣ One-Click Conversion
```bash
# 1. Install dependencies
pip install rich pandas py7zr

# 2. Run the converter
python Fenix2TFDINavDataConverter.py

# 3. Follow on-screen prompts
# → Enter Fenix database path
# → Set terminal procedure starting ID
# → Wait for conversion to complete
```

## 📚 Documentation Navigation

### 🚀 Basic Usage
1.  **[Installation Guide](installation.md)** - Detailed environment setup and dependency installation
    - Python Environment Setup
    - Dependency Package Installation
    - System Compatibility Check
    - Troubleshooting Common Installation Issues

2.  **[Configuration Details](configuration.md)** - Detailed explanation of converter configuration options
    - ConverterConfig Parameters
    - Database Connection Settings
    - Output Format Configuration
    - Performance Tuning Parameters

3.  **[Usage Instructions](usage.md)** - Complete operation workflow and examples
    - Interactive Conversion Process
    - Programmatic Invocation
    - Batch Processing Methods
    - Result Validation Steps

### 🆘 Help and Support
- **[Frequently Asked Questions (FAQ)](../faq.md)** - Common user questions and answers
- **[Troubleshooting](../troubleshooting.md)** - Problem diagnosis and solutions

### 🔧 Advanced Topics
- **[Technical Architecture](../architecture.md)** - System design and working principles
- **[Contribution Guide](../contributing.md)** - Development participation and coding standards
- **[Changelog](../changelog.md)** - Version history and new features
- **[License Information](../license.md)** - Terms of use and legal disclaimers

## 🎨 Interface Preview

### Startup Interface
```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 Environment Check...
✅ Python 3.9.16
✅ Dependencies complete
✅ Sufficient memory
✅ Sufficient disk space
```

### Conversion Progress
```
╭─────────────────────────────────────────── 📊 Exporting Standard Data Tables ───────────────────────────────────────────╮
│                                                                                                         │
│ Exporting table data...                                                                                 │
│                                                                                                         │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                                       │
│                                                                                                         │
│ Currently processing: Terminals table → Converting terminal procedure data                               │
│ Completed: Airports, Runways, Waypoints, Navaids, Airways, AirwayLegs, ILSes                             │
│                                                                                                         │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Completion Summary
```
╔══════════════════════════════════════════════════════════════╗
║                          Conversion Successful                 ║
║                                                              ║
║  ✓ Data conversion completed successfully!                   ║
║                                                              ║
║  📊 Processing Statistics:                                   ║
║  • Exported Tables: 11                                       ║
║  • Processed Records: 156,789                                ║
║  • Terminal Procedures: 8,945                                ║
║  • Waypoints: 45,234                                         ║
║                                                              ║
║  📁 Output File: Primary.7z (15.6 MB)                        ║
║  🕒 Total Time: 4 minutes 23 seconds                         ║
║                                                              ║
║  This file can be used for navigation in the TFDI MD-11.     ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## ⚠️ Important Reminders

### Data Usage Guidelines
This tool is intended for flight simulation purposes only; please ensure your usage complies with relevant regulations:
- **🎯 Simulation Only** - Strictly prohibited for actual aviation navigation
- **📋 Comply with Agreements** - Confirm Fenix and TFDI data usage terms
- **🔒 Non-Commercial Use** - For personal study and entertainment use

### Technical Requirements
- **🐍 Python 3.8+** - Python 3.9 or higher recommended
- **💾 Memory Requirements** - At least 4GB RAM (8GB recommended)
- **💿 Storage Space** - At least 1GB of available space
- **🖥️ Operating System** - Windows 10/11, macOS 10.15+, Linux

### Data Security
- **💾 Backup Data** - Please back up important data before conversion
- **🔍 Verify Results** - Verify data integrity after conversion
- **📅 Version Management** - Use stable versions for important conversions
- **🔒 File Permissions** - Ensure sufficient file read/write permissions

## 🎯 Applicable Scenarios

### 🎮 Flight Simulation Enthusiasts
- **✈️ Enhanced Experience** - Use high-quality navigation data in the TFDI MD-11
- **🌍 Global Coverage** - Access global airport and airway information
- **📊 Real-World Data** - Accurate information based on professional aviation databases

### 👨‍🏫 Aviation Education
- **🎓 Training Purposes** - Provide standardized data for aviation education
- **📚 Learning Tool** - Understand modern aviation navigation systems
- **🔄 Data Updates** - Regular updates to maintain data currency

### 👨‍💻 Developers
- **🔧 Data Processing** - Learn aviation data conversion techniques
- **📝 Format Research** - Understand different navigation data formats
- **🧩 System Integration** - Integrate the converter into other systems

## 📊 Data Output Description

### JSON File Structure
After conversion, the following JSON files will be generated:

```
Primary.7z Contents:
├── 📄 AirportLookup.json      # Airport lookup index (~500KB)
├── 📄 Airports.json           # Airport basic information (~2MB)
├── 📄 AirwayLegs.json        # Airway segment detailed data (~3MB)
├── 📄 Airways.json           # Airway definitions (~800KB)
├── 📄 Ilses.json             # ILS approach data (~1.5MB)
├── 📄 NavaidLookup.json      # Navaid lookup index (~300KB)
├── 📄 Navaids.json           # Navaid data (~1.2MB)
├── 📄 Runways.json           # Runway information (~2.5MB)
├── 📄 Terminals.json         # Terminal procedure definitions (~800KB)
├── 📄 WaypointLookup.json    # Waypoint lookup index (~1MB)
├── 📄 Waypoints.json         # Waypoint data (~4MB)
└── 📁 ProcedureLegs/         # Procedure segment directory
    ├── TermID_1.json         # Terminal procedure segments
    ├── TermID_2.json
    └── ...
```

### Data Format Examples
```json
// Airports.json Example
{
  "ZBAA": {
    "AirportID": "ZBAA",
    "AirportName": "Beijing Capital International Airport",
    "Latitude": 40.080111,
    "Longitude": 116.584556,
    "Elevation": 116,
    "MagneticVariation": -6.2
  }
}

// Waypoints.json Example
{
  "ELMAG": {
    "WaypointID": "ELMAG",
    "Latitude": 39.832222,
    "Longitude": 116.298611,
    "Type": "DESIGNATED_POINT"
  }
}
```

## 🔄 Updates and Maintenance

### Data Update Frequency
- **Regular Updates**: Recommended to update every 28 days (AIRAC cycle)
- **Version Tracking**: Follow Fenix and TFDI version updates
- **Compatibility Check**: Verify version compatibility before updating

### Converter Updates
- **GitHub Releases**: Follow the project release page
- **Automatic Check**: Regularly check for converter version updates
- **Feature Improvements**: Participate in community feedback and feature suggestions

## 🆘 Get Help

If you encounter issues during use:

1.  **📚 Consult Documentation** - First, check the detailed explanations in relevant sections
2.  **🔍 Check Logs** - View generated log files for error details
3.  **🧪 Run Diagnostics** - Use the built-in diagnostic tools to check system status
4.  **💬 Community Support** - Report issues in GitHub Issues

### Quick Diagnostic Commands
```bash
# Check converter version
python Fenix2TFDINavDataConverter.py --version

# Verify environment
python -c "import rich, pandas, py7zr; print('Environment OK')"

# Test database connection
python -c "import sqlite3; sqlite3.connect('nd.db3').close(); print('Database accessible')"
```

### Performance Monitoring
```python
# Monitor system resources
import psutil
print(f"CPU: {psutil.cpu_percent()}%")
print(f"Memory: {psutil.virtual_memory().percent}%")
print(f"Disk: {psutil.disk_usage('.').percent}%")
```

---

**Next Step**: Head to the [Installation Guide](installation.md) to start configuring your environment, or directly view the [Usage Instructions](usage.md) to quickly get started with the conversion process! 🚁✨
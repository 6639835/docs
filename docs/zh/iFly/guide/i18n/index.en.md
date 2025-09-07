# 🛫 iFly Navigation Data Converter User Guide

The iFly Navigation Data Converter is a professional aviation navigation data conversion tool, specifically designed to convert Fenix A320 navigation databases into the iFly 737 MAX 8 navigation database format. This tool features a modern CLI interface and high-precision data processing capabilities.

## 📖 Quick Tour

### 🎯 Core Features
- **🎨 Modern Interface** - Color terminal interface based on the Rich library, with real-time progress display
- **🧭 High-Precision Magnetic Declination** - Local calculation using pygeomag's WMM-2025 geomagnetic model
- **📅 Smart AIRAC Management** - Dynamically calculates and manages Aviation Information Revision Cycles
- **⚡ Performance Optimization** - Concurrent processing and memory optimization, supporting large data files
- **🛡️ Enterprise-Grade Quality** - Comprehensive type hinting, error handling, and test coverage

### ✈️ Supported Aircraft Models
- **iFly 737 MAX 8** - High-fidelity Boeing 737 MAX 8 in Microsoft Flight Simulator
- **Data Source** - Fenix A320 navigation database (nd.db3)
- **Route Data** - NAIP RTE_SEG.csv China Civil Aviation Route Segment Data

### 📊 Data Type Coverage
- **🛣️ Route Data** - High/low altitude routes, waypoint coordinates, magnetic declination
- **🏢 Terminal Procedures** - SID, STAR, approach procedures, departure procedures
- **🧭 Navigation Aids** - VOR/DME, NDB, ILS data
- **📅 AIRAC Cycle** - Automatic calculation and management of data validity

## 🚀 Quick Start

### 1️⃣ System Requirements Check
```bash
# Check Python version (requires 3.8+)
python --version

# Check available memory (recommended 4GB+)
# Windows: Task Manager → Performance → Memory
# macOS: Activity Monitor → Memory
# Linux: free -h
```

### 2️⃣ Prepare Required Files
- ✅ **Fenix Navigation Database** (`nd.db3`)
  ```
  %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **NAIP Route Data** (`RTE_SEG.csv`)
  - Obtain from China Civil Aviation Data Service website
  - Ensure file encoding is UTF-8
- ✅ **iFly 737 MAX 8** installed in MSFS

### 3️⃣ Quick Installation and Run
```bash
# 1. Install dependency packages
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 2. Run converter
python main.py

# 3. Follow on-screen prompts
# → Select Fenix database file
# → Select NAIP CSV file
# → Set terminal procedure ID range
# → Wait for conversion to complete
```

## 📚 Documentation Navigation

### 🚀 Basic Usage
1. **[Installation Guide](installation.md)** - Detailed environment configuration and dependency installation
   - Python Environment Configuration
   - Dependency Package Installation
   - System Requirements Verification
   - Troubleshooting Common Installation Issues

2. **[Configuration Guide](configuration.md)** - Detailed explanation of configuration files and parameters
   - Converter Configuration Options
   - Path Settings Guide
   - AIRAC Cycle Configuration
   - Performance Optimization Parameters

3. **[Usage Instructions](usage.md)** - Complete operation process and examples
   - Interactive Operation Guide
   - Batch Processing Method
   - Data Validation Steps
   - Output File Description

### 🆘 Help and Support
- **[Frequently Asked Questions](../faq.md)** - Answers to the most common user questions
- **[Troubleshooting](../troubleshooting.md)** - Problem diagnosis and solutions

### 🔧 Advanced Content
- **[Technical Architecture](../architecture.md)** - System design and working principles
- **[Contribution Guide](../contributing.md)** - Development participation and code standards
- **[Changelog](../changelog.md)** - Version history and new features
- **[License Information](../license.md)** - Terms of use and legal notes

## 🎨 Interface Preview

### Welcome Interface
```
╔═══════════════════════════════════════ 🛩️  Aviation Navigation Data Conversion Tool  ✈️ ═══════════════════════════════════════╗
║                                                                                                          ║
║                                      Fenix to iFly Aviation Navigation Data Converter                                       ║
║                                          High-quality, modern conversion experience                                         ║
║                                                                                                          ║
╚═══════════════════════════════════════ Powered by Rich • Version 2.0 ═══════════════════════════════════════╝
```

### Progress Display
```
╭─────────────────────────────────────────────── 🔄 Processing Route Data ────────────────────────────────────────────────╮
│ Calculating magnetic declination...                                                                            │
│ ████████████████████████████████████████ 1,247/1,500 (83%) 0:02:15                                        │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Completion Summary
```
┌─────────────────────────────────────────── ✅ Conversion Complete ───────────────────────────────────────────────┐
│                                                                                                        │
│  🛣️  Route Data: 1,500 waypoints processed                                                                    │
│  🏢  Terminal Procedures: 245 procedures converted                                                                         │
│  📅  AIRAC Cycle: 2508 (valid until 2025-02-27)                                                             │
│  📁  Output Location: Community\ifly-aircraft-737max8\Data\navdata\                                            │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## ⚠️ Important Notice

### Data Compliance
This tool is for flight simulation purposes only; please ensure your use complies with relevant laws and regulations:
- **🎯 Simulation Only** - Strictly prohibited for actual aviation navigation
- **📋 Adhere to Agreements** - Confirm the legality of data sources
- **🔒 Non-Commercial Use** - For personal learning and entertainment only

### Technical Requirements
- **🐍 Python 3.8+** - Python 3.9 or higher recommended
- **💾 Memory Requirements** - At least 4GB RAM (8GB recommended)
- **💿 Storage Space** - At least 500MB available space
- **🖥️ Operating System** - Windows 10/11, macOS 10.15+, Linux

### Data Security
- **💾 Back up Original Data** - Please back up iFly original navigation data before conversion
- **🔍 Verify Results** - Verify data correctness in the simulator after conversion
- **📅 Regular Updates** - Recommended to update AIRAC data every 28 days
- **🔒 Permission Management** - Ensure the program has sufficient file write permissions

## 🎯 Usage Scenarios

### 🎓 Flight Simulation Enthusiasts
- **✈️ Enhanced Experience** - Obtain more accurate Chinese airspace navigation data
- **🎮 Realistic Flight** - Experience flight procedures based on real routes
- **📚 Learning Tool** - Understand modern aviation navigation systems

### 👨‍🏫 Aviation Education
- **🎓 Training Purposes** - Provide accurate navigation data for teaching
- **📊 Standardization** - Compliant with International Civil Aviation Organization (ICAO) standards
- **🔄 Real-time Updates** - Based on the latest AIRAC cycle data

### 👨‍💻 Developers
- **🔧 API Reference** - Clear code structure and documentation
- **🧩 Modularity** - Design that is easy to extend and customize
- **🧪 Comprehensive Testing** - Complete test coverage and quality assurance

## 🆘 Getting Help

If you encounter issues during use:

1. **📚 Consult Documentation** - First, check the detailed instructions in relevant sections
2. **🔍 Check Logs** - View the generated `converter.log` file
3. **🧪 Verify Environment** - Use the built-in verification tool to check system configuration
4. **💬 Community Support** - Report issues or participate in discussions on GitHub Issues

### Quick Diagnosis Commands
```bash
# Check Python environment
python --version
python -c "import rich, pandas, pygeomag; print('所有依赖已安装')"

# Verify file permissions
ls -la /path/to/ifly/navdata/

# View latest log
tail -n 50 converter.log
```

---

**Next Step**: Go to [Installation Guide](installation.md) to start configuring your development environment, or directly view [Usage Instructions](usage.md) to quickly get started! 🚀
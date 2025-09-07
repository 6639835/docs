# 🛫 Nav-data User Guide

Nav-data is a professional aviation navigation data conversion tool suite, specifically designed to provide high-quality navigation data support for PMDG aircraft in Microsoft Flight Simulator. This tool converts various standard aviation data formats into a PMDG-compatible SQLite database format.

## 📖 Quick Tour

### 🎯 Core Features
- **Multi-source Data Integration** - Supports standard formats such as AIRAC, ARINC 424, and X-Plane
- **Professional Data Conversion** - Precise coordinate system conversion and magnetic variation calculation
- **Quality Assurance** - Built-in data validation and integrity checks
- **China Region Optimization** - Optimized specifically for Chinese civil aviation data

### ✈️ Supported Aircraft Models
- **PMDG 737 Series**: 737-600, 737-700, 737-800, 737-900
- **PMDG 777 Series**: 777-300ER, 777F

### 📊 Data Type Coverage
- **Airport Data** - ICAO codes, Runways, Magnetic Variation
- **Navaids** - VOR/DME, NDB, ILS/GS
- **Airway Network** - High/Low Altitude Airways, Waypoints
- **Flight Procedures** - SID, STAR, Approach Procedures

## 📚 Documentation Navigation

### 🚀 Getting Started
1.  [Installation Guide](installation.md) - Environment setup and dependency installation
2.  [Configuration Guide](configuration.md) - Data source configuration and path settings
3.  [Usage Instructions](usage.md) - Conversion process and operational steps

### 🆘 Help and Support
- [FAQ](../faq.md) - Answers to frequently asked questions
- [Troubleshooting](../troubleshooting.md) - Problem diagnosis and solutions

### 🔧 Advanced Topics
- [Technical Architecture](../architecture.md) - System design and working principles
- [Contributing Guide](../contributing.md) - Developer participation and code standards
- [Changelog](../changelog.md) - Version history and new features
- [License Information](../license.md) - Terms of use and legal notes

## ⚠️ Important Reminders

### Data Compliance
This tool is intended for flight simulation purposes ONLY. Please ensure your data sources comply with relevant laws and regulations:
- Adhere to International Civil Aviation Organization (ICAO) standards
- Confirm the legality of data sources
- For non-commercial flight simulation use only

### Technical Requirements
- **Python 3.8+** - Python 3.9 or higher is recommended
- **Memory Requirements** - At least 4GB RAM (8GB recommended)
- **Storage Space** - At least 2GB of available space
- **Operating System** - Windows 10/11, macOS 10.15+, Linux

### Data Update Frequency
- **AIRAC Cycle** - Recommended to update every 28 days
- **Source Data** - Ensure the use of the latest valid AIRAC cycle data
- **Version Compatibility** - Confirm compatibility with PMDG aircraft versions

## 🆘 Getting Help

If you encounter problems during use:

1.  **Consult Documentation** - First, refer to the detailed instructions in the relevant sections
2.  **Check Logs** - Review generated log files for specific errors
3.  **Validate Data** - Use the built-in validation tool to check data integrity
4.  **Community Support** - Report issues in GitHub Issues

---

**Next Step**: Proceed to the [Installation Guide](installation.md) to start configuring your development environment.
# 📝 Changelog

All significant changes to Nav-data are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/lang/zh-CN/).

## [Unreleased] - Upcoming

### 🚀 Added
- New visual data validation report
- Support for multi-threaded database write optimization
- Added data processing progress monitoring

### 🔧 Improved
- Optimized memory usage, supporting larger datasets
- Improved error message readability
- Enhanced configuration file validation

### 🐛 Fixed
- Fixed issue with special character handling in airport names
- Resolved data race issues during concurrent processing

---

## [2.1.0] - 2024-12-24

### 🚀 New Features
- **Smart Route Merging Algorithm** - Implemented advanced route data merging logic, supporting automatic detection of common waypoints and intelligent insertion of missing segments
- **Database Validation Tool** - Added `db_validator.py`, providing comprehensive database integrity checks and quality reports
- **Concurrent Processing Support** - Multi-threaded processing for large datasets, significantly improving processing speed
- **Magnetic Variation Calculation Integration** - Integrated pygeomag library, providing precise magnetic declination calculations
- **Progress Monitoring** - Added tqdm progress bar, showing real-time processing progress

### 🔧 Improvements
- **Memory Management Optimization** - Implemented batch processing mechanism, significantly reducing memory footprint
- **Coordinate Conversion Precision** - Improved DMS to decimal degrees conversion precision to 8 decimal places
- **Enhanced Error Handling** - More detailed error logging and exception handling mechanisms
- **Strengthened Data Validation** - Added coordinate range validation and ICAO code format checks
- **Code Modularization** - Refactored code structure to improve maintainability

### 🐛 Bug Fixes
- Fixed CSV file encoding detection issue, correctly handling Latin-1 encoding
- Resolved database constraint conflicts caused by duplicate records
- Fixed waypoint coordinate precision loss issue
- Resolved memory overflow issues when processing large files
- Fixed Windows path separator compatibility issue

### 📚 Documentation Updates
- Completely rewrote technical documentation, including detailed architectural descriptions
- Added comprehensive installation and configuration guides
- Added troubleshooting and FAQ sections
- Updated API documentation and code examples

### 🔒 Security Improvements
- Added input path validation to prevent path traversal attacks
- Enhanced SQL input sanitization mechanism
- Improved file permission checks

---

## [2.0.0] - 2024-11-15

### 🚀 Major Updates
- **Completely Refactored Data Processing Engine** - Modular architecture designed from scratch
- **PMDG 777 Support** - Extended support for PMDG 777-300ER and 777F
- **New Database Schema** - Optimized table structure for better performance and compatibility
- **China Region Data Specific Support** - Specially optimized for Chinese civil aviation data

### 🔧 Technical Improvements
- **Python 3.8+ Support** - Updated to modern Python versions
- **Type Hinting** - Comprehensive addition of type hints to improve code quality
- **Asynchronous Processing** - Introduced asynchronous data processing capabilities
- **Configuration Management** - New configuration system, supporting YAML configuration files

### 📊 Data Processing Enhancements
- **Multi-source Data Integration** - Supports NAIP, X-Plane, CIFP multiple data sources
- **Unified Coordinate System** - Standardized coordinate conversion and validation
- **Data Quality Assurance** - Comprehensive data validation and cleansing process

### 🛠️ Tool Improvements
- **Command-Line Interface Optimization** - More user-friendly CLI tools
- **Batch Processing Support** - Supports batch processing of multiple data files
- **Logging System Upgrade** - Structured logging for better debugging support

### 💔 Breaking Changes
- **Minimum Python Version Requirement** - Requires Python 3.8 or higher
- **Configuration File Format Change** - New YAML configuration format
- **API Interface Refactoring** - Interfaces for some functions and classes have changed
- **Dependency Updates** - Updated multiple core dependency packages

### 🗑️ Removed Features
- Removed support for Python 2.7
- Removed support for deprecated XML configuration format
- Removed experimental network data source feature

---

## [1.5.2] - 2024-10-10

### 🐛 Fixed
- Fixed AIRAC 2410 data compatibility issue
- Resolved PMDG 737-900 database path issue
- Fixed log file encoding issue

### 🔧 Improved
- Optimized database connection pool management
- Improved Chinese display of error messages
- Updated airport name lookup database

---

## [1.5.1] - 2024-09-28

### 🐛 Fixed
- Fixed MSFS Steam version path detection
- Resolved runway direction calculation precision issue
- Fixed CSV parsing errors caused by special characters

### 📚 Documentation
- Updated MSFS path instructions in the installation guide
- Added solutions to common issues

---

## [1.5.0] - 2024-09-15

### 🚀 Added
- **AIRAC 2409 Support** - Supports the latest AIRAC cycle
- **Runway Data Enhancements** - Added runway surface type and slope information
- **Automatic Backup Feature** - Automatically backs up original navigation data
- **Data Validation Report** - Generates detailed data processing reports

### 🔧 Improved
- Improved processing speed for large airport data
- Optimized memory usage efficiency
- Improved user interface feedback

### 🐛 Fixed
- Fixed elevation data errors for high-altitude airports
- Resolved ICAO code handling issues for certain special airports
- Fixed runway length unit conversion errors

---

## [1.4.1] - 2024-08-20

### 🐛 Fixed
- Fixed Windows 11 compatibility issue
- Resolved database locking issue
- Fixed Chinese path handling error

### 🔧 Improved
- Improved startup speed
- Optimized error messages

---

## [1.4.0] - 2024-08-05

### 🚀 Added
- **Multilingual Support Foundation** - Added internationalization framework
- **Data Export Feature** - Supports export to multiple formats
- **Performance Monitoring** - Added processing performance statistics

### 🔧 Improved
- **Database Optimization** - Redesigned index structure, improving query speed by 40%
- **Memory Management** - Reduced memory footprint by 30%
- **User Experience** - Improved error prompts and status display

### 🐛 Fixed
- Fixed duplicate waypoint issue
- Resolved ILS frequency precision issue
- Fixed timezone handling errors

---

## [1.3.2] - 2024-07-12

### 🐛 Fixed
- Fixed PMDG 737 MAX series compatibility
- Resolved the impact of Daylight Saving Time on AIRAC dates
- Fixed frequency display issues for certain navigation equipment

---

## [1.3.1] - 2024-06-28

### 🐛 Fixed
- Fixed macOS path handling issue
- Resolved CSV file BOM mark issue
- Fixed route connection validation error

### 🔧 Improved
- Improved file read speed
- Optimized log output format

---

## [1.3.0] - 2024-06-15

### 🚀 Added
- **Linux Support** - Extended support for Linux systems
- **Configuration Validation** - Added configuration file syntax checking
- **Data Statistics** - Generated detailed data processing statistics

### 🔧 Improved
- **Cross-platform Compatibility** - Unified behavior across different operating systems
- **Error Recovery** - Enhanced data processing fault tolerance
- **Code Quality** - Refactored core modules to improve code quality

### 🐛 Fixed
- Fixed non-ASCII character handling issue
- Resolved large file processing timeout issue
- Fixed database transaction processing error

---

## [1.2.1] - 2024-05-20

### 🐛 Fixed
- Fixed AIRAC date calculation error
- Resolved coordinate conversion issues for certain airports
- Fixed inaccurate progress display issue

---

## [1.2.0] - 2024-05-05

### 🚀 Added
- **AIRAC 2405 Support** - Supports the latest navigation data cycle
- **Batch Processing Mode** - Supports processing multiple data files
- **Data Difference Detection** - Compares differences between different data versions

### 🔧 Improved
- **Processing Speed** - Data processing speed improved by 25%
- **Memory Optimization** - Optimized memory usage for large datasets
- **Logging Verbosity** - Provides more detailed processing logs

### 🐛 Fixed
- Fixed route altitude restriction handling
- Resolved VOR/DME frequency duplication issue
- Fixed airport elevation data precision

---

## [1.1.2] - 2024-04-18

### 🐛 Fixed
- Fixed Windows long path support issue
- Resolved special character encoding error
- Fixed database connection timeout issue

---

## [1.1.1] - 2024-04-05

### 🐛 Fixed
- Fixed PMDG 737-800 database path issue
- Resolved ILS glideslope angle calculation error
- Fixed missing waypoint issues for some waypoints

### 📚 Documentation
- Updated installation guide
- Added troubleshooting chapter

---

## [1.1.0] - 2024-03-22

### 🚀 Added
- **STAR Procedure Support** - Added Standard Terminal Arrival Procedure handling
- **Approach Procedures** - Supports instrument approach procedure data
- **Enhanced Data Validation** - More stringent data integrity checks

### 🔧 Improved
- **SID Procedure Optimization** - Improved Standard Instrument Departure procedure handling
- **Coordinate Precision** - Improved coordinate calculation precision
- **Error Handling** - Better error messages and recovery mechanisms

### 🐛 Fixed
- Fixed NDB frequency range validation
- Resolved route disconnection issue
- Fixed runway magnetic bearing calculation

---

## [1.0.0] - 2024-03-01

### 🎉 First Official Release

#### 🚀 Core Features
- **Full PMDG 737 Series Support** - Supports all PMDG 737 variants
- **Comprehensive Navigation Data Conversion** - Airport, runway, navigation aid, and route data
- **China Region Optimization** - Specifically optimized for Chinese civil aviation data
- **AIRAC 2403 Support** - Supports the March 2024 AIRAC cycle

#### 🛠️ Technical Features
- **SQLite Database** - PMDG-compatible database format
- **Multi-source Data Support** - Supports NAIP and X-Plane data sources
- **Automated Processing** - One-click data conversion process
- **Data Validation** - Comprehensive data quality checks

#### 📊 Supported Data Types
- Basic airport information (ICAO code, coordinates, name)
- Runway data (length, width, direction, surface)
- VOR/DME navigation aids
- NDB navigation beacons
- Waypoints and route network
- ILS Instrument Landing System

#### 🎯 Supported Aircraft
- PMDG 737-600
- PMDG 737-700
- PMDG 737-800
- PMDG 737-900

#### 🌍 Supported Regions
- Mainland China (ICAO codes ZB, ZG, ZS, ZJ, ZY, ZL, ZH, ZU, ZP, ZW)

---

## Version Planning

### 🔮 Future Version Plans

#### v2.2.0 (Planned 2025 Q1)
- **iniBuilds Aircraft Support** - Extended support for iniBuilds aircraft series
- **Real-time Data Updates** - Supports online AIRAC data updates
- **Graphical User Interface** - Added desktop GUI application
- **Cloud Data Sources** - Supports cloud data source integration

#### v2.3.0 (Planned 2025 Q2)
- **Global Data Support** - Extended to global navigation data
- **Custom Plugin System** - Supports third-party plugin development
- **Data Analysis Tools** - Built-in data analysis and visualization
- **REST API** - Provides Web API interface

#### v3.0.0 (Planned 2025 Q4)
- **Next-Generation Architecture** - Microservices-based distributed architecture
- **Machine Learning Optimization** - Intelligent data processing and optimization
- **Multi-Simulator Support** - Supports other simulators like P3D, FSX
- **Enterprise-Grade Features** - High availability, load balancing, and other enterprise features

---

## 📋 Update Notes

### 🔖 Version Numbering Rules
We use Semantic Versioning (SemVer):
- **MAJOR version** (X.y.z) - Incompatible API changes
- **MINOR version** (x.Y.z) - Backward-compatible feature additions
- **PATCH version** (x.y.Z) - Backward-compatible bug fixes

### 🏷️ Change Type Descriptions
- **🚀 Added** - New features
- **🔧 Changed** - Modifications to existing features
- **🗑️ Deprecated** - Features that will be removed soon
- **🗑️ Removed** - Features that have been removed
- **🐛 Fixed** - Bug fixes
- **🔒 Security** - Security-related fixes

### 📅 Release Cycle
- **Major Versions** - 1-2 major updates annually
- **Minor Versions** - Quarterly feature updates
- **Patch Versions** - Bug fixes released as needed

### 🔗 Getting Updates
- **GitHub Releases** - Get the latest version and detailed changelog
- **Automatic Notifications** - Subscribe to release notifications for timely updates
- **Beta Testing** - Participate in the Beta testing program to experience new features

---

**Note**: For detailed changes of a specific version, please visit the [GitHub Releases](https://github.com/Nav-data/releases) page.
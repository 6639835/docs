# Changelog

This document records all important changes for the Nav-data project.

The format is based on [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/), and version numbers follow [Semantic Versioning](https://semver.org/lang/zh-CN/).

## [Unreleased] - Unreleased

### Planned Additions
- Multilingual UI support
- GUI (Graphical User Interface) version
- Cloud data synchronization feature
- Batch task scheduler
- Real-time data validation

### In Development
- Performance optimization: Increased large file processing speed
- New data source support: EUROCONTROL data format
- Plugin system architecture

## [2.1.0] - 2025-01-15

### Added
- **PDF Extraction Enhancements**
  - Added automatic coordinate format detection feature
  - Supports more PDF layout types
  - Added manual quality inspection tool
- **AIRAC Cycle Management**
  - Automatically calculates current AIRAC cycle
  - Cycle validity verification
  - Supports historical cycle data
- **Batch Processing Tools**
  - Added `batch_process.py` script
  - Supports parallel processing of multiple files
  - Real-time processing progress monitoring
- **Data Validation Framework**
  - Complete data validation pipeline
  - Supports custom validation rules
  - Detailed error reports

### Improved
- **Performance Optimization**
  - CSV processing speed increased by 40%
  - Optimized memory usage, supports larger files
  - Improved concurrent processing mechanism
- **Error Handling**
  - More detailed error messages
  - Enhanced error recovery mechanism
  - Improved logging system
- **User Experience**
  - Optimized progress bar display
  - Colored console output
  - More intuitive error prompts

### Fixed
- Fixed Chinese character encoding issue (#45)
- Resolved occasional PDF parsing crashes (#52)
- Fixed coordinate precision loss issue (#48)
- Resolved large file memory overflow issue (#41)

### Technical Debt Clean-up
- Refactored core data structures
- Standardized code style and naming conventions
- Increased type annotation coverage to 95%
- Increased test coverage to 85%

## [2.0.1] - 2024-12-20

### Fixed
- **Critical Bug Fixes**
  - Fixed duplicate waypoint data generation issue (#38)
  - Resolved terminal program encoding error (#39)
  - Fixed handling of file paths containing spaces (#40)

### Improved
- Improved readability of error messages
- Optimized temporary file clean-up mechanism
- Enhanced cross-platform compatibility

### Security
- Fixed path traversal security vulnerability (#37)
- Strengthened input validation mechanism

## [2.0.0] - 2024-12-01

### Breaking Changes ⚠️
- **Architectural Refactoring**
  - Adopted modular design, allowing each module to run independently
  - Introduced a new configuration system
  - Redesigned API interfaces
- **Python Version Requirements**
  - Minimum requirement Python 3.6+
  - Recommended use Python 3.8+
- **Command-Line Interface Changes**
  - Unified command-line argument format
  - Removed some deprecated options

### Added
- **Terminal Patch Module**
  - Added `terminal_encoder.py` program encoder
  - Added `terminal_reencode.py` format fixer
  - Supports batch file processing
- **X-Plane CIFP Generation**
  - Complete CIFP data generation process
  - Supports X-Plane 11 and X-Plane 12
  - Navigation equipment and waypoint processing
- **Configuration Management System**
  - Supports configuration files and environment variables
  - Modular configuration options
  - Configuration validation and error prompts

### Improved
- **Data Processing Accuracy**
  - Coordinate precision increased to 8 decimal places
  - Improved degree-minute-second conversion algorithm
  - Enhanced data integrity checks
- **Documentation System**
  - Brand new documentation architecture
  - Detailed usage examples
  - Complete API documentation

### Removed
- Removed support for Python 2.7
- Removed support for outdated data formats
- Cleaned up unused helper scripts

## [1.3.2] - 2024-10-15

### Fixed
- Fixed file encoding issue on macOS (#28)
- Resolved Windows path separator issue (#29)
- Fixed PDF table parsing boundary conditions (#30)

### Improved
- Optimized large file loading performance
- Enhanced error log verbosity
- Improved Chinese region code handling

## [1.3.1] - 2024-09-28

### Fixed
- **Urgent Fixes**
  - Fixed waypoint data loss issue (#25)
  - Resolved coordinate conversion precision issue (#26)
  - Fixed CSV parsing exception handling (#27)

### Improved
- Strengthened data validation process
- Optimized memory usage efficiency

## [1.3.0] - 2024-09-10

### Added
- **Waypoint Extraction Enhancements**
  - Supports manual extraction mode for Edge browser
  - Added automatic coordinate format recognition
  - Added data quality assessment report
- **Region Filtering Functionality**
  - Supports custom region code filtering
  - Intelligent recognition of Chinese airspace
  - Batch region processing

### Improved
- **PDF Processing Capability**
  - Supports more PDF version formats
  - Improved text extraction accuracy
  - Enhanced table structure recognition
- **Data Conversion**
  - Optimized CSV to DAT conversion process
  - Enhanced data integrity checks
  - Improved error recovery mechanism

### Fixed
- Fixed special character handling issue (#18)
- Resolved concurrency deadlock (#19)
- Fixed temporary file clean-up issue (#20)

## [1.2.1] - 2024-08-20

### Fixed
- Fixed missing installation dependency issue (#15)
- Resolved encoding detection error (#16)
- Fixed log file permission issue (#17)

### Improved
- Optimized installation process
- Improved error prompt messages
- Enhanced cross-platform compatibility

## [1.2.0] - 2024-08-01

### Added
- **Multi-format Support**
  - Supports JSON output format
  - Added XML data export
  - Supports custom output templates
- **Logging System**
  - Structured logging
  - Multi-level log output
  - Log file rotation
- **Performance Monitoring**
  - Processing time statistics
  - Memory usage monitoring
  - System resource tracking

### Improved
- **User Interface**
  - Colored terminal output
  - Real-time progress display
  - More user-friendly error prompts
- **Data Processing**
  - Increased large file processing speed
  - Optimized memory usage efficiency
  - Enhanced exception handling capabilities

### Fixed
- Fixed duplicate waypoint data issue (#10)
- Resolved PDF parsing memory leak (#11)
- Fixed coordinate conversion boundary issue (#12)

## [1.1.0] - 2024-07-15

### Added
- **PDF Data Extraction**
  - Automatic PDF procedure data extraction
  - Supports multi-step data processing workflow
  - Intelligent recognition of waypoint coordinates
- **Data Validation**
  - Coordinate range validation
  - Data integrity checks
  - Format standardization validation

### Improved
- Improved CSV processing performance
- Optimized error handling mechanism
- Enhanced code maintainability

### Fixed
- Fixed encoding conversion issue (#6)
- Resolved file path handling error (#7)
- Fixed data type conversion exception (#8)

## [1.0.1] - 2024-06-28

### Fixed
- **Urgent Fixes**
  - Fixed installation script permission issue (#3)
  - Resolved dependency package version conflict (#4)
  - Fixed missing sample data file issue (#5)

### Improved
- Improved installation documentation
- Optimized error prompt messages
- Added usage examples

## [1.0.0] - 2024-06-15

### Added
- **Core Features** 🎉
  - Waypoint data CSV to X-Plane DAT format conversion
  - Chinese airspace region filtering functionality
  - Supports various navigation point types (DESIGNATED_POINT, VOR/DME, NDB)
  - Automatic data validation and error reporting
- **Basic Architecture**
  - Modular code structure
  - Comprehensive error handling mechanism
  - Basic logging system
  - Unit testing framework

### Supported Features
- ✅ CSV waypoint data processing
- ✅ X-Plane DAT format output
- ✅ Region code filtering
- ✅ Data integrity validation
- ✅ Batch file processing
- ✅ Cross-platform support (Windows, macOS, Linux)

---

## Version Notes

### Version Numbering Rules
Nav-data follows the [Semantic Versioning](https://semver.org/lang/zh-CN/) specification:

- **Major Version (X.y.z)**: Incompatible API changes
- **Minor Version (x.Y.z)**: Backward-compatible feature additions
- **Patch Version (x.y.Z)**: Backward-compatible bug fixes

### Release Cycle
- **Major Releases**: 1-2 times per year, including significant feature updates
- **Minor Releases**: Once per quarter, including new features and important improvements
- **Patch Releases**: As needed, primarily for bug fixes

### Support Policy
- **Current Version**: Fully supported, including new features and bug fixes
- **Previous Major Version**: Security updates and critical bug fixes (12 months)
- **Older Versions**: No longer officially supported

### Upgrade Guide

#### Upgrading from 1.x to 2.x
As version 2.0.0 includes significant architectural changes, please note the following when upgrading:

1.  **Python Version Requirement**: Ensure Python 3.6+ is used
2.  **Configuration Files**: Migration to the new configuration format is required
3.  **API Changes**: Some function interfaces have been altered
4.  **Dependency Update**: Run `pip install -r requirements.txt` to update dependencies

### Known Issues

#### Known Issues in Current Version
- Coordinate extraction might not be accurate enough for certain PDF formats (#60)
- Out of memory issues may occur when processing large files (>100MB) (#61)
- Long path support issues on Windows (#62)

#### Solutions
We are actively working to resolve these issues, with fixes expected in the next version. For temporary solutions, please refer to the relevant GitHub Issues.

### Contribution Statistics

#### Contributors for Version 2.1.0
- @contributor1 - Lead Developer
- @contributor2 - PDF Processing Module
- @contributor3 - Documentation Improvements
- @contributor4 - Testing and Bug Fixes

#### Special Thanks
Thanks to all community members who submitted Issues, provided feedback, and contributed code!

### Roadmap

#### Short-term Plan (3-6 months)
- [ ] GUI (Graphical User Interface) version development
- [ ] Support for more data source formats
- [ ] Performance optimization and memory usage improvements
- [ ] Internationalization and multilingual support

#### Long-term Plan (6-12 months)
- [ ] Cloud service integration
- [ ] Real-time data synchronization
- [ ] Machine learning-based data quality detection
- [ ] Enterprise-level feature expansion

### Feedback and Suggestions

If you have any suggestions or feedback regarding the development of Nav-data, please feel free to:

- Submit suggestions in [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- Participate in [GitHub Discussions](https://github.com/your-repo/nav-data/discussions)
- Send an email to the [project email](mailto:nav-data@example.com)

---

**Thank you for your attention and support!** ✈️ Nav-data will continue to improve, providing better navigation data conversion tools for the aviation simulation community.
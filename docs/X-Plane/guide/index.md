# Nav-data User Guide

Welcome to **Nav-data** - your professional aviation navigation data conversion tool!

## 🛩️ Project Overview

Nav-data is an open-source aviation navigation data processing and conversion tool, specifically designed for the X-Plane flight simulator. This tool can convert China Civil Aviation's NAIP (National Aeronautical Information Publication) data into a standard format recognizable by X-Plane, providing accurate and complete Chinese airspace navigation data for flight simulator enthusiasts and aviation professionals.

## ✨ Core Features

### 🛣️ Route Data Processing
- **CSV to DAT Conversion**: Converts CSV format route data to X-Plane DAT format
- **Area Filtering**: Intelligently filters Chinese airspace data (supports area codes such as ZB, ZG, ZY, ZS, ZW, ZJ, ZP, ZL, ZH, ZU)
- **Waypoint Type Support**:
  - DESIGNATED_POINT (Designated Point) - Type Code 11
  - VOR/DME - Type Code 3
  - NDB - Type Code 2
- **AIRAC Cycle Management**: Automatically calculates and manages AIRAC data effective periods

### 📄 PDF Data Extraction
- **Terminal Procedure Processing**: Extracts and standardizes aviation procedure data from PDF files
- **Waypoint Coordinate Extraction**: Automatically extracts waypoint geographical coordinate information
- **Multi-format Support**: Supports processing of PDF source files in various formats
- **Data Validation**: Built-in data integrity and accuracy checks

### 🔧 Data Repair and Encoding
- **Format Standardization**: Repairs and standardizes X-Plane CIFP data format
- **Encoding Repair**: Automatically repairs approach procedures, SID, STAR data encoding issues
- **Quality Assurance**: Multiple validations ensure output data complies with X-Plane standards

## 🎯 Target Users

### Flight Simulator Enthusiasts
- Obtain high-quality Chinese airspace navigation data
- Enjoy a more realistic flight experience
- Supports various aircraft using X-Plane default data

### Aviation Professionals
- Accurate navigation data for training and teaching purposes
- Compliant with International Civil Aviation Organization (ICAO) standards
- Based on authoritative NAIP data sources

### Developers
- Clear code structure and API documentation
- Modular design for easy extensibility
- Comprehensive error handling and logging system

## 📊 Data Standard Support

### International Standards
- **ICAO Standards**: Complies with International Civil Aviation Organization navigation data standards
- **ARINC 424**: Adheres to ARINC 424 navigation database standards
- **AIRAC Cycle**: Supports the standard 28-day AIRAC update cycle

### X-Plane Formats
- **CIFP Data**: Full X-Plane CIFP (Coded Instrument Flight Procedures) format support
- **DAT Files**: Standard X-Plane DAT format output
- **Compatibility**: Supports X-Plane 11 and X-Plane 12

## 🚀 Quick Start

### 1. Environment Setup
Ensure your system has Python 3.6+ and necessary dependencies installed.

### 2. Data Preparation
Prepare your source data files (CSV format route data or PDF format procedure files).

### 3. Configuration Settings
Configure file paths and processing parameters according to your requirements.

### 4. Data Conversion
Run the corresponding conversion script to start data processing.

## 📚 Documentation Navigation

### Basic Usage
- [Installation Guide](./installation.md) - Detailed installation and environment configuration instructions
- [Configuration Guide](./configuration.md) - Detailed explanation of configuration files and parameters
- [Usage Guide](./usage.md) - Complete operational procedures and examples

### Technical Details
- [Architecture Overview](../architecture.md) - System architecture and technical principles
- [Contribution Guide](../contributing.md) - Guidelines for participating in project development
- [Changelog](../changelog.md) - Version updates and improvements record

## ⚠️ Important Notes

### Data Accuracy
- This tool performs conversions based on publicly available NAIP data
- It is recommended to verify critical navigation data before actual flight
- Regularly update data to stay synchronized with the AIRAC cycle

### Usage Restrictions
- For flight simulation and educational purposes only
- Not for actual aviation navigation
- Comply with relevant laws, regulations, and data usage agreements

### Technical Support
- Check [FAQ (Common Questions)](./usage.md#faq)
- Submit [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- Participate in community discussions

---

**Start your navigation data conversion journey now!** 📈
# 🧭 User Guide

Welcome to the Nav-data aviation navigation data conversion tool! This guide will help you fully master this professional aviation navigation data processing system.

## 📋 Quick Navigation

### 🚀 Getting Started
- [**Installation Guide**](./installation.md) - System Requirements and Full Installation Process
- [**Configuration Instructions**](./configuration.md) - Data Source Configuration and AIRAC Cycle Settings
- [**Usage Instructions**](./usage.md) - Complete Data Conversion and Deployment Process

### 🆘 Help and Support
- [**FAQ**](../faq.md) - Answers to Frequently Asked Questions
- [**Troubleshooting**](../troubleshooting.md) - Problem Diagnosis and Solutions

### 🔧 Advanced Topics
- [**Architecture Description**](../architecture.md) - System Architecture and Technical Implementation

## 🎯 Project Overview

Nav-data is a professional aviation navigation data conversion tool, specifically designed to provide real-time, accurate navigation data support for advanced add-ons in Microsoft Flight Simulator.

### 🏆 Core Advantages

#### ✈️ Professional-Grade Data Accuracy
- **AIRAC Standard Compliance**: Strictly adheres to the International Civil Aviation Organization's 28-day AIRAC cycle
- **High-Precision Coordinates**: Supports geographical coordinates with 8 decimal places of precision
- **Magnetic Variation Calculation**: Uses WMM (World Magnetic Model) for real-time calculation
- **Multi-Standard Support**: Compatible with ARINC 424, X-Plane, and NAIP data formats

#### 🔄 Intelligent Data Processing
- **Multi-Source Data Fusion**: Integrates multiple data sources including NAIP, X-Plane, CIFP
- **Intelligent Data Validation**: Automatically detects and fixes data integrity issues
- **Incremental Update Support**: Efficient differential data update mechanism
- **Parallel Processing Optimization**: Multi-process parallel processing for large-scale datasets

#### 🛫 Extensive Compatibility
- **MSFS 2020 & 2024**: Fully supports both versions of Microsoft Flight Simulator
- **Multi-Platform Release**: Compatible with Steam Edition, Microsoft Store Edition, Xbox Edition
- **Premium Add-on Support**: Specifically optimized for iniBuilds and PMDG high-end add-ons

### 📊 Supported Navigation Data Types

| Data Type | English Name | Standard Code | Description |
|---------|---------|---------|------|
| Airport Information | Airports | APT | Airport ICAO code, coordinates, magnetic variation |
| Runway Data | Runways | RWY | Runway identifier, direction, length, surface type |
| VHF Navaids | VHF Navaids | VHF | VOR, DME, TACAN navaid frequencies |
| NDB Navaids | NDB Navaids | NDB | Non-directional beacon frequencies and coverage |
| Waypoints | Waypoints | FIX | Waypoint coordinates and airspace classification |
| Airways System | Airways | AWY | High-altitude, low-altitude airways and connections |
| Departure Procedures | SIDs | SID | Standard Instrument Departures |
| Arrival Procedures | STARs | STAR | Standard Terminal Arrival Routes |
| Approach Procedures | Approaches | IAP | Various instrument approach procedures |
| Landing System | ILS/GLS | GS | Instrument Landing System guidance information |

### 🌍 Coverage Areas

This tool primarily covers the following ICAO regions:

- **Mainland China**: ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH
- **Southeast Asia**: VM (Vietnam), VH (Hong Kong)
- **Northeast Asia**: RK (Part of South Korea)

### 🎯 Supported Aircraft Add-ons

#### iniBuilds Series
- **Airbus A350-900** - Long-haul Wide-body Airliner
- **Airbus A350-900ULR** - Ultra Long Range Version
- **Airbus A350-1000** - Stretched Version

#### PMDG Series
- **Boeing 737-600/700/800/900** - Narrow-body Airliner Series
- **Boeing 777-300ER** - Wide-body Long-range Airliner
- **Boeing 777F** - Cargo Version

## 🚦 Start Using

### Prerequisite Check

Before you begin, please ensure you have:

- [ ] **Microsoft Flight Simulator 2020 or 2024** (any version)
- [ ] **Python 3.8+** development environment
- [ ] **Valid navigation data subscription** (Navigraph or Aerosoft NavDataPro)
- [ ] **Target aircraft add-on** (iniBuilds A350 or PMDG 737/777)
- [ ] **Administrator privileges** (for file system access)

### 📖 Recommended Learning Path

1. **📥 Environment Preparation** → [Installation Guide](./installation.md)
2. **⚙️ Data Configuration** → [Configuration Instructions](./configuration.md)
3. **🔄 Perform Conversion** → [Usage Instructions](./usage.md)
4. **🛠️ In-depth Understanding** → [Architecture Description](../architecture.md)

## ⚡ Quick Start

If you already have experience, you can jump directly to:

```bash
# Quick install dependencies
pip install -r requirements.txt

# Run conversion tool
python XP2INI_NDB_Converter.py
```

## 📞 Get Help
- **💡 Feature Suggestions**: Refer to [Contributing Guide](../contributing.md)

---

Ready to begin? Let's start your Nav-data journey with the [Installation Guide](./installation.md)! 🚀
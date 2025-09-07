# 🙋 Frequently Asked Questions (FAQ)

## 📥 Installation

### Q1: What are the minimum system requirements?
**A:**
- **Operating System**: Windows 10/11, macOS 10.15+, Linux
- **Python Version**: 3.8+ (3.9 or higher recommended)
- **RAM**: At least 4GB RAM (8GB+ recommended)
- **Storage Space**: At least 2GB free space
- **MSFS Version**: Microsoft Flight Simulator 2020 or 2024

### Q2: Which Python versions are supported?
**A:** Python 3.8 and above are supported. Python 3.9 or 3.10 is recommended for optimal performance and compatibility.

### Q3: Are administrator privileges required?
**A:** Yes, administrator privileges are required on Windows systems to access the MSFS installation directory and write data files.

### Q4: Can I install it in a virtual environment?
**A:** Using a virtual environment (e.g., venv or conda) is highly recommended to isolate dependencies and avoid conflicts with other Python projects.

## ⚙️ Configuration

### Q5: How can I obtain valid AIRAC data?
**A:** You need to subscribe to one of the following services:
- **Navigraph**: Provides complete global navigation data (Recommended)
- **Aerosoft NavDataPro**: For Europe and specific regions
- **Jeppesen**: Commercial-grade navigation data service

### Q6: What is the AIRAC cycle? How often does it need to be updated?
**A:** AIRAC (Aeronautical Information Regulation and Control) is an international standard for aeronautical information update cycles, updated every 28 days. It is recommended to synchronize with the real-world AIRAC cycle.

### Q7: Where should the data files be placed?
**A:**
```
# Recommended directory structure:
C:/Nav-data/
├── input/          # Raw input data files
│   ├── AIRAC2024-01/
│   └── ...
├── output/         # Converted PMDG format files
└── backup/         # Data backup
```

### Q8: How do I verify if the configuration is correct?
**A:** Run the built-in configuration verification command:
```bash
python verify_config.py --check-all
```

## 🔄 Usage

### Q9: How long does the conversion process take?
**A:** Depending on the data volume and system performance:
- **Small datasets** (single airport): 1-2 minutes
- **Regional datasets**: 5-15 minutes
- **Global datasets**: 30-60 minutes

### Q10: Can I convert data for specific regions only?
**A:** Yes, regional filtering is supported:
```bash
python converter.py --region ZSPD --include-sids --include-stars
```

### Q11: How do I back up existing data?
**A:** A backup is automatically created before conversion, but you can also back up manually:
```bash
python backup_tool.py --create-backup --date-suffix
```

### Q12: Where is the converted data stored?
**A:**
- **Default location**: `%LOCALAPPDATA%/Lockheed Martin/Prepar3D v5/PMDG/Nav Data/`
- **Steam Edition MSFS**: `C:/Users/[username]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalCache/PMDG/`
- **Microsoft Store Edition**: Similar to the Steam Edition, but with a different ID

## ✈️ Compatibility

### Q13: Which PMDG aircraft are supported?
**A:**
- ✅ **PMDG 737-600/700/800/900** (Full series)
- ✅ **PMDG 777-300ER**
- ✅ **PMDG 777F** (Freighter version)
- 🔄 **PMDG 747-8** (Planned support)

### Q14: Is it compatible with MSFS 2024?
**A:** Yes, it is fully compatible with Microsoft Flight Simulator 2024. Ensure you are using the latest version of the conversion tool.

### Q15: Can it be used simultaneously with other navigation data tools?
**A:** It is not recommended to use multiple navigation data tools simultaneously, as this may lead to data conflicts. Please back up and remove data from other tools before use.

### Q16: Are third-party airport add-ons supported?
**A:** Yes, but you need to ensure:
- The third-party airport uses standard ICAO codes
- The navigation data includes information for that airport
- The airport add-on is compatible with PMDG aircraft

## 🌍 Data

### Q17: Which regions' data are supported?
**A:** Main coverage areas:
- ✅ **Mainland China (entire territory)** (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- ✅ **Hong Kong, Macau** (VH, VM)
- ✅ **Taiwan region** (RC)
- ✅ **Parts of Southeast Asia** (VT, VH, WS)
- ⚠️ **Other regions** (Data quality may be limited)

### Q18: What is the data accuracy?
**A:**
- **AIRAC Standard**: Strictly adheres to ICAO standards
- **Precision Level**: Supports 8-decimal place coordinate precision
- **Validation Mechanism**: Built-in multi-layer data validation and integrity checks
- **Update Frequency**: Follows official AIRAC cycle updates

### Q19: How do I verify data integrity?
**A:** Use the built-in validation tool:
```bash
python validate_data.py --comprehensive --output-report
```

### Q20: Does the data include Chinese content?
**A:** Yes, Chinese is supported:
- Airport names in Chinese and English
- Navigation point identifiers in Chinese and English
- Procedure name localization

## 🔧 Technical

### Q21: How do I enable debug mode?
**A:**
```bash
python converter.py --debug --verbose --log-file=debug.log
```

### Q22: Where are the log files located?
**A:**
- **Default location**: `./logs/converter_[date].log`
- **Debug logs**: `./logs/debug_[date].log`
- **Error logs**: `./logs/error_[date].log`

### Q23: How can I optimize conversion performance?
**A:**
- Use SSD storage
- Increase RAM to 8GB or more
- Enable multi-process handling: `--parallel=4`
- Close unnecessary background programs

### Q24: Is command-line batch processing supported?
**A:** Yes, a full command-line interface is supported:
```bash
# Batch conversion
python converter.py --batch --config-file=batch_config.json

# Scheduled tasks
python scheduler.py --schedule-weekly --auto-update
```

## 🆘 Getting Help

### Q25: How can I get support if I encounter issues?
**A:**
1.  **Check log files** - to understand specific error messages
2.  **Check documentation** - read relevant section descriptions
3.  **Search for known issues** - see [GitHub Issues](https://github.com/nav-data/docs/issues)
4.  **Submit a new issue** - include complete logs and system information
5.  **Community discussion** - participate in [GitHub Discussions](https://github.com/nav-data/docs/discussions)

### Q26: How do I report a bug?
**A:** Please report it in GitHub Issues, including:
- A detailed error description
- Complete error logs
- System environment information
- Steps to reproduce
- Expected result vs. actual result

### Q27: Can I contribute code?
**A:** Absolutely! Please refer to:
- [Contribution Guide](contributing.md)
- [Code Standards](contributing.md#代码规范)
- [Submission Process](contributing.md#提交流程)

---

## 🔍 Can't find your answer?

If your question is not in this list, please:

1.  📖 Check the [Troubleshooting Guide](troubleshooting.md)
2.  🔍 Use the search function at the top of the page
3.  💬 Ask in [GitHub Discussions](https://github.com/nav-data/docs/discussions)
4.  📧 Send an email to: support@nav-data.org

We will continue to update this FAQ. Thank you for your feedback and suggestions!
# 🙋 Frequently Asked Questions (FAQ)

## 📥 Installation

### Q1: Which operating systems are supported?
**A:** 
- ✅ **Windows 10/11** (Recommended)
- ✅ **macOS 10.15+** (Catalina and above)
- ✅ **Ubuntu 20.04+ / Debian 11+**
- ✅ **Other mainstream Linux distributions**

### Q2: What are the Python environment requirements?
**A:** 
- **Minimum version**: Python 3.8
- **Recommended version**: Python 3.9 or 3.10
- **Not supported**: Python 3.7 and earlier versions
- **Virtual environment**: venv or conda are highly recommended

### Q3: How much storage space is required?
**A:** 
- **Tool itself**: ~50MB
- **Dependency packages**: ~200MB
- **Temporary processing space**: 1-2GB
- **Output data**: 500MB-1GB (depending on coverage area)
- **Total recommended**: At least 4GB available space

### Q4: What are the memory requirements?
**A:** 
- **Minimum**: 4GB RAM
- **Recommended**: 8GB+ RAM
- **Large-scale conversion**: 16GB+ RAM
- **Virtual memory**: Recommended to be set to 1.5 times the physical memory

## ⚙️ Configuration

### Q5: How to obtain navigation data?
**A:** Recommended data sources:
- **Navigraph** (Preferred) - Global coverage, 28-day update cycle
- **X-Plane data** - Free, but less frequent updates
- **NAIP data** - Optimized for Asia region
- **Custom data sources** - Supports ARINC 424 format

### Q6: How to understand AIRAC cycles?
**A:** 
- **Cycle length**: One cycle every 28 days
- **Effective date**: Specific date each month (usually Thursday)
- **Version format**: YYYY-CC (e.g., 2024-01 means the 1st cycle of 2024)
- **Validity period**: 28 days, updating is recommended after expiration

### Q7: Which data formats are supported?
**A:** 
**Input formats**:
- ✅ ARINC 424 (.dat, .txt)
- ✅ X-Plane (.dat, .txt)
- ✅ NAIP (.xml, .json)
- ✅ CIFP (.xml)

**Output formats**:
- ✅ iniBuilds A350 native format
- ✅ SQLite database
- ✅ JSON configuration file
- ✅ XML export format

### Q8: How to configure data source priority?
**A:** Set in the configuration file:
```json
{
  "data_sources": {
    "priority_order": ["navigraph", "naip", "xplane"],
    "fallback_enabled": true,
    "merge_strategy": "priority_override"
  }
}
```

## 🔄 Usage

### Q9: How long does the conversion process take?
**A:** Estimated processing time:
- **Single airport**: 30 seconds - 2 minutes
- **Urban area** (e.g., Beijing surroundings): 5-10 minutes
- **Provincial area** (e.g., Guangdong Province): 15-30 minutes
- **National level** (e.g., all of China): 45-90 minutes
- **Global data**: 2-4 hours

### Q10: Can it perform incremental updates?
**A:** Supports intelligent incremental updates:
```bash
# Only update changed data
python converter.py --incremental --since-date=2024-01-01

# Update based on AIRAC cycle
python converter.py --update-airac --from=2024-01 --to=2024-02
```

### Q11: How to verify conversion results?
**A:** Built-in multi-layer validation:
```bash
# Quick validation
python validate.py --quick-check

# Comprehensive validation
python validate.py --comprehensive --report=html

# Compare with reference data
python validate.py --compare-with=reference_data.db
```

### Q12: Does it support batch processing?
**A:** Supports multiple batch modes:
```bash
# Batch process multiple AIRAC cycles
python batch_converter.py --airac-range=2024-01:2024-06

# Batch process multiple regions
python batch_converter.py --regions=ZSPD,ZBAA,ZGGG --parallel=4
```

## ✈️ iniBuilds Integration

### Q13: Which iniBuilds aircraft are supported?
**A:** Currently supported:
- ✅ **A350-900** - Full support for all systems
- ✅ **A350-900ULR** - Ultra-long-range version
- ✅ **A350-1000** - Stretched version
- 🔄 **A320neo series** - Under development
- 🔄 **A330 series** - Planned support

### Q14: Where is the data installed?
**A:** Automatic detection of installation path:
- **Default path**: `MSFS Community folder/inibuilds-aircraft-a350/SimObjects/`
- **Steam version**: `C:/Users/[User]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalState/packages/`
- **Microsoft Store version**: Similar to Steam version, but with a different package ID
- **Custom path**: Can be specified in the configuration

### Q15: How to confirm that the data has loaded correctly?
**A:** Check steps:
1. **MCDU display**: Check if the AIRAC cycle is correct
2. **Route planning**: Try planning a known route
3. **Waypoint retrieval**: Search for specific waypoints
4. **Procedure loading**: Load SID/STAR procedures

### Q16: Is it compatible with other navigation data tools?
**A:** 
- ⚠️ **Not recommended** to use simultaneously with other tools
- 🔄 **Conflict detection**: The tool automatically detects and warns of conflicts
- 🛠️ **Cleanup tool**: Provides a one-click function to clean up data from other tools
- 📋 **Backup and restore**: Supports automatic backup before switching tools

## 🌍 Geographic Coverage

### Q17: Which regions are primarily covered?
**A:** Detailed coverage areas:
- 🇨🇳 **Mainland China**: All ICAO regions (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- 🇭🇰 **Hong Kong**: VH region
- 🇲🇴 **Macau**: VM region
- 🇹🇼 **Taiwan**: RC region
- 🇻🇳 **Vietnam**: VV region
- 🇰🇷 **South Korea**: RK region (partial)
- 🌏 **Other Asian regions**: Data quality varies by region

### Q18: What is the data accuracy?
**A:** Accuracy specifications:
- **Coordinate accuracy**: 8 decimal places (approx. 1 meter accuracy)
- **Altitude accuracy**: 1 foot
- **Frequency accuracy**: 0.01 MHz
- **Magnetic variation**: Real-time calculation, using WMM2020 model
- **Update frequency**: Follows AIRAC 28-day cycle

### Q19: Which navigation data types are included?
**A:** Complete data types:
- ✈️ **Airport information**: ICAO code, coordinates, magnetic variation, runway information
- 📡 **Navigation aids**: VOR, DME, NDB, TACAN
- 📍 **Waypoints**: Coordinates, area classification, usage identifier
- 🛣️ **Route network**: High/low altitude routes, connectivity
- 🛫 **Departure procedures**: SID (Standard Instrument Departure)
- 🛬 **Arrival procedures**: STAR (Standard Terminal Arrival Route)
- 📐 **Approach procedures**: ILS, VOR, NDB, RNAV, and other types of approaches
- 📶 **Landing systems**: ILS/GLS guidance information

### Q20: What is the extent of Chinese localization?
**A:** 
- ✅ **Airport names**: Chinese and English equivalents
- ✅ **City names**: Full Chinese support
- ✅ **Waypoint names**: Pinyin and Chinese identifiers
- ✅ **Procedure names**: Localized naming conventions
- ✅ **User interface**: Full Chinese interface

## 🔧 Technical Aspects

### Q21: How to enable detailed logging?
**A:** 
```bash
# Basic debug mode
python converter.py --debug

# Detailed log mode
python converter.py --verbose --log-level=DEBUG

# Save log to file
python converter.py --log-file=debug_$(date +%Y%m%d).log
```

### Q22: Does it support multi-threaded processing?
**A:** Intelligent parallel processing:
```bash
# Automatically detect CPU core count
python converter.py --parallel=auto

# Specify number of threads
python converter.py --parallel=4

# Parallel processing with memory limit
python converter.py --parallel=2 --memory-limit=4GB
```

### Q23: How to monitor conversion progress?
**A:** Multiple progress monitoring methods:
- **Console progress bar**: Real-time display of completion percentage
- **Web interface**: Optional browser monitoring interface
- **Log file**: Detailed periodic progress records
- **Status API**: JSON format progress query interface

### Q24: Does it support automated deployment?
**A:** Full automation support:
```bash
# Scheduled task mode
python scheduler.py --schedule=weekly --auto-update

# CI/CD integration
python converter.py --batch --no-interaction --exit-on-error

# Docker container deployment
docker run nav-data/converter --config=/app/config.json
```

## 🔍 Performance Optimization

### Q25: How to improve conversion speed?
**A:** Performance optimization suggestions:
- 💾 **Use SSD**: Significantly improve I/O performance
- 🧠 **Increase RAM**: Reduce disk swapping
- ⚡ **Enable parallelism**: Utilize multi-core CPUs
- 🗜️ **Data compression**: Reduce network transfer time
- 🎯 **Region filtering**: Only process required regions

### Q26: What to do if memory usage is too high?
**A:** Memory optimization strategies:
```bash
# Enable streaming
python converter.py --streaming --chunk-size=1MB

# Limit memory usage
python converter.py --max-memory=2GB

# Temporary file optimization
python converter.py --temp-dir=/tmp --cleanup-temp
```

### Q27: How to handle network issues?
**A:** Network optimization solutions:
- 🌐 **Offline mode**: Pre-download all data
- 🔄 **Resume broken transfers**: Automatically resume after network interruption
- 🚀 **CDN acceleration**: Use nearby servers
- 📦 **Data caching**: Reduce redundant downloads

## 🛡️ Data Security

### Q28: Is the data secure?
**A:** Multiple security guarantees:
- 🔒 **Transmission encryption**: HTTPS/TLS 1.3
- 🔐 **Storage encryption**: AES-256 file encryption
- ✅ **Integrity verification**: SHA-256 hash verification
- 🔍 **Source verification**: Digital signature verification
- 🚫 **Privacy protection**: No collection of personal information

### Q29: How to back up and restore?
**A:** Complete backup solutions:
```bash
# Create full backup
python backup.py --full --compress --encrypt

# Incremental backup
python backup.py --incremental --since-date=2024-01-01

# Restore backup
python restore.py --backup-id=20240115_143022 --verify
```

## 🆘 Getting Help

### Q30: What to do if you encounter an issue?
**A:** Complete support system:

**1. Self-diagnosis**:
```bash
# Run system diagnosis
python diagnostic.py --comprehensive --report=html

# Check for common issues
python health_check.py --fix-common-issues
```

**2. Community Support**:
- 📖 [User Manual](guide/index.md)
- 🔧 [Troubleshooting Guide](troubleshooting.md)
- 💬 [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 🐛 [Issue Reporting](https://github.com/nav-data/docs/issues)

**3. Direct Contact**:
- 📧 **Technical Support**: technical@nav-data.org
- 🚨 **Urgent Issues**: urgent@nav-data.org
- 💬 **General Inquiries**: info@nav-data.org

### Q31: How to contribute and provide feedback?
**A:** Multiple ways to participate:
- 🐛 **Bug reports**: GitHub Issues
- 💡 **Feature suggestions**: GitHub Discussions
- 📝 **Documentation improvements**: Pull Request
- 💻 **Code contributions**: Check [Contribution Guide](contributing.md)
- 🌐 **Localization**: Help translate documentation

### Q32: Are there any training materials?
**A:** Rich learning resources:
- 📹 **Video tutorials**: YouTube channel and Bilibili (B站)
- 📚 **User manual**: PDF and online versions
- 🎓 **Online courses**: Step-by-step interactive tutorials
- 📋 **Quick guide**: 5-minute quick start
- 🔬 **Advanced tips**: Expert-level usage tips

---

## 🔍 Can't find an answer?

If your question is not answered in this FAQ, please:

1. 🔍 **Use search**: Search function at the top of the page
2. 📖 **Check documentation**: [Full User Guide](guide/index.md)
3. 🛠️ **Troubleshooting**: [Problem Resolution Guide](troubleshooting.md)
4. 💬 **Community discussions**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
5. 📧 **Direct contact**: support@nav-data.org

We promise to respond to all technical inquiries within 24 hours. Thank you for choosing Nav-data!

---

## 📊 Usage Statistics

**Most Frequent Questions** (based on user feedback):
1. **Installation and Configuration Issues** - 35%
2. **Data Format Related** - 22%
3. **Performance Optimization** - 18%
4. **iniBuilds Integration** - 15%
5. **Troubleshooting** - 10%

**User Satisfaction**: ⭐⭐⭐⭐⭐ 4.8/5.0 (based on 1,200+ user reviews)

**Continuous Improvement**: We update the FAQ content monthly to ensure the timeliness and accuracy of the information.
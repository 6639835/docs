# ❓ TFDI Navigation Data Converter FAQ

## 🔧 Installation and Configuration

### Q: What software do I need to install to use the converter?

**A:** You need the following software environment:
- **Python 3.8+** (3.9 or higher recommended)
- **TFDI MD-11** installed in Microsoft Flight Simulator
- **Fenix A320** (for obtaining navigation database files)
- Required Python dependency packages (installed via requirements.txt)

### Q: How do I obtain the Fenix navigation database file?

**A:** The Fenix database file is usually located at:
```
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
```

**Notes:**
- Ensure Fenix A320 is installed and has been run at least once
- The database file size is typically 50-200MB
- The file must be a complete and undamaged SQLite database

### Q: What versions of Fenix and TFDI does the converter support?

**A:** Currently supported versions:
- **Fenix A320**: v1.0.x - v1.2.x
- **TFDI MD-11**: v1.0.x - v1.2.x
- **Database Format**: SQLite 3.x

**Version Compatibility:**
- ✅ Fully compatible: Fenix v1.1.x + TFDI v1.1.x
- ⚠️ Requires verification: Latest versions may need to wait for compatibility updates
- ❌ Not supported: Outdated Beta versions

## 📊 Data Conversion

### Q: How long does the conversion process take?

**A:** Conversion time depends on the database size:
- **Small database** (< 50MB): 2-5 minutes
- **Medium database** (50-200MB): 5-15 minutes
- **Large database** (200-500MB): 15-45 minutes

**Influencing Factors:**
- Hard drive type (SSD is 2-3 times faster than HDD)
- Available RAM (8GB+ recommended)
- CPU performance (multi-core has advantages)
- System load (close unnecessary programs)

### Q: What is a Terminal ID, and how is it set?

**A:** A Terminal ID is a unique number used in the TFDI system to identify terminal procedures.

**Suggested Settings:**
```
Start ID: 1000 (default)
ID Range: 1-999999
Recommended Range: 1000-9000 (for expansion)
```

**Allocation Strategy:**
- Reserve 20-50 IDs per airport
- Allocate by region (e.g., Asia region 1000-3000)
- Avoid conflicts with existing TFDI data

### Q: Where are the converted files saved?

**A:** The converter generates a `Primary.7z` archive containing:

```
Primary.7z
├── AirportLookup.json      # Airport lookup data
├── Airports.json           # Airport information
├── AirwayLegs.json        # Airway leg data
├── Airways.json           # Airway definitions
├── Ilses.json             # ILS approach data
├── NavaidLookup.json      # Navaid lookup
├── Navaids.json           # Navaid data
├── Runways.json           # Runway information
├── Terminals.json         # Terminal procedure data
├── WaypointLookup.json    # Waypoint lookup
├── Waypoints.json         # Waypoint definitions
└── ProcedureLegs/         # Procedure leg directory
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

### Q: What is FAF point detection, and why is it important?

**A:** FAF (Final Approach Fix) is the Final Approach Fix in a precision approach procedure.

**Importance:**
- Marks the start of the precision approach
- A critical reference point for VNAV calculations
- Affects autopilot approach modes

**Detection Criteria:**
- VNAV angle ≤ 2.5° (configurable)
- Located in the final stage of the approach procedure
- Has altitude restriction information

## 🐛 Troubleshooting

### Q: What should I do if a "database file corrupted" error occurs?

**A:**
**Error Message:**
```
SQLite Error: database disk image is malformed
The database file may be corrupted
```

**Solutions:**
1. **Re-obtain the database:**
   ```bash
   # Delete potentially corrupted file
   rm path/to/nd.db3
   
   # Restart Fenix A320 to regenerate it
   ```

2. **Verify file integrity:**
   ```python
   import sqlite3
   
   try:
       conn = sqlite3.connect('nd.db3')
       conn.execute('PRAGMA integrity_check')
       print("Database integrity check passed")
   except Exception as e:
       print(f"Database corrupted: {e}")
   ```

3. **Use a database repair tool:**
   ```bash
   # Attempt repair using SQLite tool
   sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3
   ```

### Q: What should I do if the converter gets stuck at a certain step?

**A:**
**Common stuck steps:**
- Database validation phase
- Large table data processing phase
- JSON serialization phase
- Compression and packaging phase

**Troubleshooting methods:**
```bash
# 1. Check system resources
top  # Linux/macOS
# Or Task Manager (Windows)

# 2. View log file
tail -f converter.log

# 3. Check disk space
df -h  # Linux/macOS
# Or check drive space in Windows
```

**Solutions:**
1. **Restart the converter**: Exit completely and restart
2. **Increase memory**: Close other programs to free up RAM
3. **Check permissions**: Ensure write permissions
4. **Step-by-step debugging**: Use debug mode to view detailed information

### Q: The converted JSON files are not recognized by TFDI?

**A:**
**Possible reasons:**
1. **Version incompatibility**: TFDI version does not match JSON format version
2. **File corruption**: File corrupted during compression or transfer
3. **Incorrect format**: JSON format does not comply with TFDI standards
4. **Encoding issue**: Incorrect character encoding

**Verification steps:**
```bash
# 1. Validate JSON format
python -m json.tool Primary/Airports.json

# 2. Check file size
ls -lh Primary/

# 3. Verify archive integrity
7z t Primary.7z
```

**Repair methods:**
1. **Re-convert**: Delete the output folder and convert again
2. **Manually decompress**: Decompress the 7z file and check its contents
3. **Update version**: Ensure using the latest version of the converter
4. **Contact support**: If the problem persists, please report a bug

## 📈 Performance Optimization

### Q: How to improve conversion speed?

**A:**
**Hardware optimization:**
- **Use an SSD**: Solid-state drives are 3-5 times faster than HDDs
- **Increase memory**: 8GB+ RAM recommended
- **Multi-core CPU**: Supports parallel processing
- **Disable antivirus**: Temporarily disable real-time scanning

**Software optimization:**
```python
# Adjust configuration parameters
config = ConverterConfig(
    coordinate_precision=6,    # Reduce precision to increase speed
    batch_size=2000,          # Increase batch size
    enable_compression=False,  # Disable real-time compression
    max_workers=4             # Set number of parallel threads
)
```

**Environment optimization:**
```bash
# Set environment variables
export PYTHONOPTIMIZE=1       # Enable bytecode optimization
export SQLITE_TEMP_STORE=3    # Use in-memory temporary storage
```

### Q: What should I do if memory usage is too high?

**A:**
**Monitor memory usage:**
```python
import psutil

def monitor_memory():
    memory = psutil.virtual_memory()
    print(f"Memory usage: {memory.percent}%")
    print(f"Available memory: {memory.available // 1024**2} MB")
```

**Optimization strategies:**
1. **Reduce batch size**:
   ```python
   config.batch_size = 500  # Reduce from default 1000 to 500
   ```

2. **Process in steps**:
   ```python
   # Process large tables in batches
   tables = ['Airports', 'Runways', 'Waypoints']
   for table in tables:
       converter.process_table(table)
       gc.collect()  # Force garbage collection
   ```

3. **Stream processing**: Enable stream processing mode for large files

### Q: Can multiple converter instances be run simultaneously?

**A:**
**Technically feasible, but with limitations:**
- **Database locking**: SQLite does not support multiple write connections
- **Resource contention**: Multiple instances will compete for CPU and memory
- **Disk I/O**: May lead to disk bottlenecks

**Recommended practice:**
```bash
# Process multiple databases sequentially
python converter.py --input db1.db3 --output output1/
python converter.py --input db2.db3 --output output2/

# Or use a batch script
for db in *.db3; do
    python converter.py --input "$db" --output "output_${db%.*}/"
done
```

## 🔍 Data Validation

### Q: How to verify the correctness of the conversion results?

**A:**
**Automated validation tool:**
```python
# Use the built-in validator
from tfdi_converter.validation import DataValidator

validator = DataValidator()
result = validator.validate_output("Primary.7z")

if result.is_valid:
    print("✅ Validation passed")
else:
    print("❌ Validation failed:")
    for error in result.errors:
        print(f"  - {error}")
```

**Manual validation checklist:**
- [ ] **File integrity**: All required JSON files exist
- [ ] **Data quantity**: Record count is reasonable with no abnormal reduction
- [ ] **Coordinate range**: Latitude [-90, 90], Longitude [-180, 180]
- [ ] **Referential integrity**: Foreign key relationships remain intact
- [ ] **Special characters**: UTF-8 encoding handled correctly

**Validation in TFDI:**
1. Install the converted data package
2. Create a flight plan to test routes
3. Check procedure display in the FMC
4. Verify navaid frequencies and positions

### Q: Why is there a significant reduction in data volume after conversion?

**A:**
**Possible reasons:**
1. **Data filtering**: The converter filtered out incompatible or invalid data
2. **Regional restrictions**: Only data for specific regions might have been converted
3. **Format limitations**: Certain Fenix-specific formats cannot be converted
4. **Version differences**: Data structure differences between versions

**Checking method:**
```python
# Compare record counts before and after conversion
def compare_record_counts(fenix_db, tfdi_json_dir):
    # Count Fenix database records
    fenix_counts = count_fenix_records(fenix_db)
    
    # Count TFDI JSON records
    tfdi_counts = count_tfdi_records(tfdi_json_dir)
    
    # Compare results
    for table, fenix_count in fenix_counts.items():
        tfdi_count = tfdi_counts.get(table, 0)
        ratio = tfdi_count / fenix_count if fenix_count > 0 else 0
        print(f"{table}: {fenix_count} → {tfdi_count} ({ratio:.1%})")
```

## 🆘 Getting Help

### Q: Where can I get technical support?

**A:**
**Official support channels:**
- **GitHub Issues**: Report bugs and feature requests
- **GitHub Discussions**: For questions and general discussions
- **Project documentation**: Consult the complete user guide
- **Example code**: Refer to examples in the project

**Community support:**
- **Flight simulation forums**: Relevant flight simulation communities
- **Discord groups**: Real-time communication and mutual assistance
- **QQ/WeChat groups**: Chinese user communication groups

### Q: How to report issues or suggest new features?

**A:**
**Issue reporting process:**
1. **Search existing issues**: Avoid duplicate reports
2. **Gather information**:
   - Detailed error description
   - Complete error log
   - System environment information
   - Steps to reproduce
3. **Create an Issue**: Use the provided template
4. **Provide examples**: If possible, provide a minimal reproducible example

**Feature suggestions:**
- Describe the purpose of the new feature in detail
- Explain the expected behavior of the feature
- Consider the impact on existing users
- Provide implementation suggestions (if any)

### Q: Can I contribute code? How can I participate in development?

**A:**
**Contribution methods:**
- **Bug fixes**: Fix known issues
- **New feature development**: Implement new conversion functionalities
- **Performance optimization**: Improve conversion speed and efficiency
- **Documentation improvements**: Enhance user and API documentation
- **Test enhancements**: Increase test cases and coverage

**Participation steps:**
1. **Fork the project**: Create your own project branch
2. **Set up development environment**: Configure according to the contribution guide
3. **Choose a task**: Select a suitable task from Issues
4. **Develop and test**: Write code and ensure tests pass
5. **Submit a PR**: Create a Pull Request and await review

**Contribution requirements:**
- Follow the project's coding standards
- Provide adequate test coverage
- Update relevant documentation
- Use clear commit messages

---

**Can't find an answer?** 

Please search or create a new issue on [GitHub Issues](https://github.com/your-org/tfdi-converter/issues), and we will reply as soon as possible! 🚁✨

# ❓ iFly Navigation Data Converter FAQ

## 🔧 Installation and Configuration

### Q: What software do I need to run the converter?

**A:** You need the following software:
- **Python 3.8+** (Python 3.9 or higher recommended)
- **iFly 737 MAX 8** installed in Microsoft Flight Simulator
- **Fenix A320** (for obtaining the navigation database)
- **NAIP RTE_SEG.csv** route segment data file

### Q: How do I install the required Python dependencies?

**A:** Run in the project directory:
```bash
pip install rich pathlib typing pygeomag pandas tqdm geographiclib
```

Or if there's a requirements.txt file:
```bash
pip install -r requirements.txt
```

### Q: What if the program prompts that the iFly installation path cannot be found?

**A:** You can:
1. **Manually specify the path**: Enter the complete iFly installation path when prompted by the program
2. **Check installation location**: Confirm that iFly 737 MAX 8 is correctly installed in one of the following locations:
   - `Community\ifly-aircraft-737max8\`
   - `Official\asobo-aircraft-ifly-737max8\`
3. **Reinstall iFly**: If the path is incorrect, please reinstall iFly 737 MAX 8

## 📊 Data Processing

### Q: What is an AIRAC cycle? Why is it important?

**A:** AIRAC (Aeronautical Information Regulation and Control) is a 28-day aeronautical information update cycle mandated by ICAO (International Civil Aviation Organization). Each cycle has a unique 4-digit identifier (e.g., 2508), ensuring the timeliness and accuracy of navigation data.

### Q: How is magnetic declination calculated?

**A:** The converter uses the **WMM-2025** (World Magnetic Model) geomagnetic model from the **pygeomag** library for high-precision magnetic declination calculation:
- **Local calculation**: No internet connection required
- **High precision**: Accurate to multiple decimal places
- **Real-time update**: Based on the current date and coordinates

### Q: Why is the NAIP RTE_SEG.csv file needed?

**A:** This file contains route segment data for Chinese civil aviation, used for:
- Supplementing missing Chinese route information in iFly
- Providing accurate waypoint coordinates
- Ensuring consistency with the actual route network

### Q: Where is the converted data stored?

**A:** The data will be placed in the following locations:
- **Route data**: `Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt`
- **Terminal procedures**: `Community\ifly-aircraft-737max8\Data\navdata\Supplemental\`
- **AIRAC Identifier**: `FMC_Ident.txt`

## 🐛 Troubleshooting

### Q: The program shows a "Database connection failed" error during runtime?

**A:** Please check:
1. **File path**: Confirm that the Fenix database file path is correct
2. **File permissions**: Ensure the file is readable
3. **File integrity**: Try re-acquiring the Fenix database file
4. **Disk space**: Ensure there is enough free space

### Q: What if magnetic declination calculation is slow?

**A:** This is usually normal:
- **First run**: Geomagnetic model initialization takes time
- **Large data volume**: Calculation takes longer with many waypoints
- **System performance**: Older hardware processes slower

Optimization suggestions:
- Use an SSD
- Ensure sufficient memory (8GB+ recommended)
- Close unnecessary background programs

### Q: After conversion, new data is not visible in iFly?

**A:** Please try:
1. **Restart simulator**: Fully exit and restart MSFS
2. **Check file location**: Confirm that files are written to the correct directory
3. **Clear cache**: Delete iFly's cache files
4. **Check permissions**: Ensure the program has write permissions to the iFly directory

### Q: What if an encoding error occurs?

**A:** This is usually related to character encoding:
1. **Ensure Python environment supports UTF-8**
2. **Check CSV file encoding**: Confirm it is UTF-8 format
3. **Update Python version**: Use the latest Python version

## 📈 Performance and Optimization

### Q: How to improve conversion speed?

**A:** Performance optimization suggestions:
- **Use SSD**: Solid-state drives significantly improve I/O performance
- **Increase memory**: 8GB+ RAM recommended
- **Disable antivirus software**: Temporarily turn off real-time scanning
- **Use a newer Python version**: Python 3.9+ offers better performance

### Q: What if memory usage is too high?

**A:** Memory optimization solutions:
1. **Batch processing**: Use batch mode when processing large files
2. **Close other programs**: Free up system memory
3. **Check data size**: Confirm data file size is reasonable
4. **Use 64-bit Python**: Avoid 32-bit memory limitations

### Q: Can multiple databases be processed in batches?

**A:** The current version does not directly support batch processing, but you can:
1. **Run the program multiple times**: Process database files one by one
2. **Write a script**: Create an automated batch processing script
3. **Wait for updates**: v2.1.0 will support batch processing functionality

## 🔄 Data Management

### Q: How to back up original data?

**A:** It is highly recommended to back up before conversion:
```bash
# Back up iFly original data
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_navdata"
```

### Q: How to restore original data?

**A:** If you need to restore:
1. **Delete converted files**
2. **Restore from backup**:
   ```bash
   rm -r "Community\ifly-aircraft-737max8\Data\navdata"
   cp -r "backup_navdata" "Community\ifly-aircraft-737max8\Data\navdata"
   ```
3. **Reinstall iFly**: The most thorough recovery method

### Q: How to verify if data conversion was successful?

**A:** Verification methods:
1. **Check file existence**: Confirm that new files have been generated
2. **Check file size**: New files should be larger than the original files
3. **Simulator test**: Load iFly 737 in MSFS for testing
4. **FMC verification**: Check route and procedure data in the FMC

## 🆘 Technical Support

### Q: Where can I get help?

**A:** Channels for getting help:
1. **Check logs**: Examine the `converter.log` file
2. **Consult documentation**: Read the complete user guide
3. **GitHub Issues**: Report problems on the project page
4. **Community forums**: Participate in flight simulation community discussions

### Q: How to report a Bug?

**A:** When reporting an issue, please provide:
- **Detailed error description**
- **Complete error log**
- **System environment information** (OS, Python version, etc.)
- **Steps to reproduce**
- **Relevant screenshots or files**

### Q: Is the project open source?

**A:** Yes! The project follows an open-source license:
- **View source code**: GitHub repository is public
- **Contribute code**: Pull Requests are welcome
- **Feature suggestions**: Submit feature requests in Issues
- **Documentation improvements**: Help improve the documentation

## 🔮 Future Features

### Q: What new features are planned?

**A:** Upcoming features:
- **GUI Interface** (v2.1.0)
- **Batch processing** (v2.1.0)
- **Data validation tool** (v2.2.0)
- **Cloud processing** (v3.0.0)
- **Multi-format support** (v3.0.0)

### Q: How to get version updates?

**A:** Stay updated:
1. **Follow on GitHub**: Star the project to get update notifications
2. **Subscribe to releases**: Enable Release notifications
3. **Regular checks**: Check for new versions once a month
4. **Automatic updates**: Future versions will support automatic updates

---

**Can't find an answer to your question?** Please check the [troubleshooting guide](troubleshooting.md) or ask on GitHub Issues! 🆘
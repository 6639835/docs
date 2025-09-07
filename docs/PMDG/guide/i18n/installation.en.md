# 📥 Installation Guide

This guide will detail how to install and configure the Nav-data navigation data conversion tool on different operating systems.

## 🔧 System Requirements

### Minimum Requirements
- **Python**: 3.8 or higher
- **Memory**: 4GB RAM
- **Storage**: 2GB available space
- **Network**: Stable internet connection (for downloading dependencies)

### Recommended Requirements
- **Python**: 3.9+ (3.11 recommended)
- **Memory**: 8GB RAM or more
- **Storage**: 5GB available space
- **Processor**: Multi-core CPU (for parallel processing)

### Supported Operating Systems
- **Windows**: Windows 10/11 (64-bit)
- **macOS**: macOS 10.15 Catalina or higher
- **Linux**: Ubuntu 18.04+, CentOS 7+, or other compatible distributions

## 📋 Prerequisites

### 1. Install Python

#### Windows
1. Visit the [Python official website](https://www.python.org/downloads/windows/)
2. Download the latest Python 3.11.x version
3. Run the installer, ensure "Add Python to PATH" is checked
4. Verify installation:
```cmd
python --version
pip --version
```

#### macOS
Using Homebrew (recommended):
```bash
# 安装 Homebrew（如果尚未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python@3.11

# 验证安装
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# 更新包管理器
sudo apt update

# 安装 Python 和 pip
sudo apt install python3.11 python3.11-pip python3.11-venv

# 验证安装
python3.11 --version
pip3.11 --version
```

### 2. Get Project Code

#### Method A: Using Git (recommended)
```bash
# 克隆仓库
git clone https://github.com/Nav-data/docs.git

# 进入项目目录
cd docs
```

#### Method B: Download ZIP
1. Visit the GitHub repository page
2. Click "Code" > "Download ZIP"
3. Unzip to the target directory

## 🐍 Python Environment Configuration

### 1. Create Virtual Environment

#### Windows
```cmd
# 进入项目目录
cd Nav-data

# 创建虚拟环境
python -m venv nav-data-env

# 激活虚拟环境
nav-data-env\Scripts\activate

# 验证虚拟环境
where python
```

#### macOS/Linux
```bash
# 进入项目目录
cd Nav-data

# 创建虚拟环境
python3 -m venv nav-data-env

# 激活虚拟环境
source nav-data-env/bin/activate

# 验证虚拟环境
which python
```

### 2. Install Project Dependencies

```bash
# 确保虚拟环境已激活
# 升级 pip
pip install --upgrade pip

# 安装项目依赖
pip install -r requirements.txt
```

### 3. Verify Dependency Installation

```python
# 运行 Python 并测试导入
python -c "
import pandas as pd
import sqlite3
import pygeomag
import tqdm
import chardet
print('All dependencies installed successfully!')
"
```

## 📁 Data Source Configuration

### 1. Create Data Directory Structure

```bash
# 创建数据目录
mkdir -p data/input/{naip,xplane,cifp}
mkdir -p data/output
mkdir -p logs
```

The directory structure should be as follows:
```
Nav-data/
├── data/
│   ├── input/
│   │   ├── naip/          # NAIP CSV data files
│   │   ├── xplane/        # X-Plane DAT files
│   │   └── cifp/          # CIFP procedure data files
│   └── output/            # Generated database files
├── logs/                  # Log files
└── ...
```

### 2. Configure File Paths

Copy and edit the configuration file (optional):
```bash
# 复制示例配置文件
cp config/paths.example.py config/paths.py

# 编辑配置文件
nano config/paths.py  # Linux/macOS
notepad config/paths.py  # Windows
```

## 🛠️ Microsoft Flight Simulator Configuration

### 1. Locate MSFS Community Folder

#### Microsoft Store Version
```
C:\Users\[Username]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### Steam Version
```
C:\Users\[Username]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

#### Xbox Game Pass Version
```
C:\Users\[Username]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

### 2. Verify PMDG Aircraft Installation

Confirm the following directories exist:
```
[Community Folder]/
├── pmdg-aircraft-737/     # PMDG 737
├── pmdg-aircraft-738/     # PMDG 737-800
├── pmdg-aircraft-77w/     # PMDG 777-300ER
└── ...
```

### 3. Back up Original Navdata

```bash
# Back up original data for each PMDG aircraft
# Example: PMDG 737-800
cd "C:\Users\[Username]\...\Community\pmdg-aircraft-738\Config"
rename Navdata Navdata_backup_original
```

## ✅ Installation Verification

### 1. Run Basic Tests

```bash
# 激活虚拟环境
source nav-data-env/bin/activate  # macOS/Linux
# 或 nav-data-env\Scripts\activate  # Windows

# Run basic tests
python -c "
import sys
print(f'Python version: {sys.version}')

# Test key dependencies
import pandas as pd
print(f'Pandas version: {pd.__version__}')

import sqlite3
print('SQLite3: Available')

import pygeomag
print('PyGeoMag: Available')

print('✅ All components installed successfully!')
"
```

### 2. Verify Database Creation

```bash
# Test database creation function
python -c "
import sqlite3
import os

# Create test database
test_db = 'data/output/test.s3db'
os.makedirs(os.path.dirname(test_db), exist_ok=True)

conn = sqlite3.connect(test_db)
cursor = conn.cursor()
cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY)')
conn.close()

print('✅ Database creation function is working')
os.remove(test_db)
"
```

### 3. Check File Permissions

#### Windows
Ensure write permissions for the following directories:
- Project directory and subdirectories
- MSFS Community Folder
- MSFS Cache directory

#### macOS/Linux
```bash
# Check project directory permissions
ls -la Nav-data/

# To modify permissions
chmod -R 755 Nav-data/
```

## 🔍 Troubleshooting

### Common Issues and Solutions

#### 1. Python Version Incompatibility
**Problem**: "python: command not found" or version too low
**Solution**:
- Confirm Python 3.8+ is correctly installed
- Use `python3` instead of `python` on some systems

#### 2. pip Dependency Installation Failure
**Problem**: Compilation errors during dependency installation
**Solution**:
```bash
# Upgrade build tools
pip install --upgrade pip setuptools wheel

# For issues with specific packages
pip install --no-cache-dir --force-reinstall [package_name]
```

#### 3. pygeomag Installation Issues
**Problem**: pygeomag compilation failed
**Solution**:
```bash
# Windows: Install Microsoft C++ Build Tools
# macOS: Install Xcode Command Line Tools
xcode-select --install

# Linux: Install compilation dependencies
sudo apt install build-essential python3-dev
```

#### 4. Permission Issues
**Problem**: Unable to write to MSFS directory
**Solution**:
- Run as administrator (Windows)
- Check directory permissions (macOS/Linux)
- Temporarily disable real-time protection of antivirus software

#### 5. Insufficient Memory
**Problem**: Insufficient memory when processing large data files
**Solution**:
- Increase virtual memory/swap space
- Close other applications
- Process data files in batches

### Log File Locations

If you encounter issues, please check the following logs:
- `logs/PMDG_*.log` - Log for each module's processing
- `logs/db_validation.log` - Database validation log
- `data/output/missing_airports_data.txt` - Missing data records

## 📞 Get Help

If you encounter issues during installation:

1. **Check error messages** - Carefully read the error messages from the terminal output
2. **Check system requirements** - Confirm your system meets the minimum requirements
3. **Consult documentation** - Refer to the troubleshooting section of this guide
4. **Submit an Issue** - Submit a detailed problem report in the GitHub repository

---

**Next Steps**: Continue reading [Configuration Instructions](configuration.md) to learn how to configure data sources.
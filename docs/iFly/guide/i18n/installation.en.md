# 🔧 iFly Navigation Data Converter Installation Guide

This guide will walk you through the complete installation process for the iFly Navigation Data Converter, ensuring your system environment is correctly configured and all dependencies are installed.

## 📋 System Requirements

### 💻 Hardware Requirements
| Component | Minimum Requirement | Recommended Configuration |
|-----------|---------------------|---------------------------|
| **Processor** | Dual-core 2.0GHz | Quad-core 3.0GHz+ |
| **RAM** | 4GB RAM | 8GB+ RAM |
| **Storage** | 500MB Available Space | 2GB+ Available Space |
| **Network** | No network connection required | Required for downloading dependencies |

### 🖥️ Operating System Support
- **Windows**: Windows 10 (1909+) / Windows 11
- **macOS**: macOS 10.15 Catalina or higher
- **Linux**: Ubuntu 18.04+, CentOS 7+, or other mainstream distributions

### 🐍 Python Environment Requirements
- **Python Version**: 3.8.0 or higher
- **Recommended Version**: Python 3.9.x or 3.10.x
- **Package Manager**: pip 21.0+ (usually installed with Python)

## 🚀 Quick Installation

### Windows Users

#### 1️⃣ Install Python

**Method One: Download from official website (Recommended)**
```bash
# 1. Visit https://www.python.org/downloads/
# 2. Download the latest Python 3.9+ version
# 3. Run the installer, ensuring "Add Python to PATH" is checked
# 4. Verify installation
python --version
pip --version
```

**Method Two: Use Microsoft Store**
```bash
# 1. Open Microsoft Store
# 2. Search for "Python 3.9" or "Python 3.10"
# 3. Click Install
# 4. Verify installation
python --version
```

#### 2️⃣ Install Converter Dependencies

```bash
# Open Command Prompt or PowerShell
# Install all required dependencies
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# Verify installation
python -c "import rich, pandas, pygeomag; print('Dependencies installed successfully!')"
```

### macOS Users

#### 1️⃣ Install Python

**Method One: Use Homebrew (Recommended)**
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python@3.9

# Verify installation
python3 --version
pip3 --version
```

**Method Two: Download from official website**
```bash
# 1. Visit https://www.python.org/downloads/macos/
# 2. Download the Python installer for macOS
# 3. Run the .pkg file to install
# 4. Verify installation
python3 --version
```

#### 2️⃣ Install Converter Dependencies

```bash
# Install dependencies using pip3
pip3 install rich pathlib typing pygeomag pandas tqdm geographiclib

# Verify installation
python3 -c "import rich, pandas, pygeomag; print('Dependencies installed successfully!')"
```

### Linux Users

#### 1️⃣ Install Python

**Ubuntu/Debian:**
```bash
# Update package list
sudo apt update

# Install Python 3.9 and pip
sudo apt install python3.9 python3.9-pip python3.9-dev

# Create symbolic links (optional)
sudo ln -sf /usr/bin/python3.9 /usr/bin/python
sudo ln -sf /usr/bin/pip3.9 /usr/bin/pip

# Verify installation
python --version
pip --version
```

**CentOS/RHEL:**
```bash
# Install EPEL repository
sudo yum install epel-release

# Install Python 3.9
sudo yum install python39 python39-pip

# Verify installation
python3.9 --version
pip3.9 --version
```

**Arch Linux:**
```bash
# Install Python and pip
sudo pacman -S python python-pip

# Verify installation
python --version
pip --version
```

#### 2️⃣ Install Converter Dependencies

```bash
# Install dependency packages
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# If you encounter permission issues, use user installation
pip install --user rich pathlib typing pygeomag pandas tqdm geographiclib

# Verify installation
python -c "import rich, pandas, pygeomag; print('Dependencies installed successfully!')"
```

## 📦 Detailed Dependency Explanation

### Core Dependency Packages

| Package Name | Version Requirement | Purpose | License |
|--------------|---------------------|---------|---------|
| **rich** | ≥ 12.0.0 | Modern CLI interface | MIT |
| **pandas** | ≥ 1.3.0 | Data processing and analysis | BSD-3 |
| **pygeomag** | ≥ 0.4.2 | Magnetic declination calculation | MIT |
| **tqdm** | ≥ 4.60.0 | Progress bar display | MPL-2.0 |
| **geographiclib** | ≥ 1.52 | Geographic coordinate calculation | MIT |

### Standard Library Dependencies (No installation required)

| Module | Purpose |
|--------|---------|
| **pathlib** | File path handling |
| **typing** | Type hinting support |
| **sqlite3** | SQLite database access |
| **csv** | CSV file processing |
| **datetime** | Date and time handling |
| **logging** | Logging |

## 🔍 Installation Verification

### Full Verification Script

Create a verification script `verify_installation.py`:

```python
#!/usr/bin/env python3
"""
iFly Navigation Data Converter Installation Verification Script
"""

import sys
import importlib
from pathlib import Path

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    print(f"🐍 Python Version: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python version meets requirements")
        return True
    else:
        print("❌ Python version is too low, 3.8 or higher is required")
        return False

def check_dependencies():
    """Check dependency packages"""
    dependencies = [
        'rich',
        'pandas', 
        'pygeomag',
        'tqdm',
        'geographiclib'
    ]
    
    all_ok = True
    print("\n📦 Checking dependency packages:")
    
    for dep in dependencies:
        try:
            module = importlib.import_module(dep)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {dep}: {version}")
        except ImportError:
            print(f"❌ {dep}: Not installed")
            all_ok = False
    
    return all_ok

def check_system_resources():
    """Check system resources"""
    import shutil
    
    print("\n💾 Checking system resources:")
    
    # 检查磁盘空间
    total, used, free = shutil.disk_usage(Path.home())
    free_gb = free // (1024**3)
    print(f"📁 Available disk space: {free_gb} GB")
    
    if free_gb >= 1:
        print("✅ Disk space is sufficient")
        disk_ok = True
    else:
        print("⚠️ Insufficient disk space, at least 1GB recommended")
        disk_ok = False
    
    return disk_ok

def main():
    """Main verification function"""
    print("🔍 iFly Navigation Data Converter Installation Verification")
    print("=" * 50)
    
    # Items to check
    checks = [
        ("Python Version", check_python_version),
        ("Dependency Packages", check_dependencies),
        ("System Resources", check_system_resources),
    ]
    
    all_passed = True
    for name, check_func in checks:
        try:
            result = check_func()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} check failed: {e}")
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 All checks passed! You can now start using the converter.")
        return 0
    else:
        print("⚠️ Some checks failed, please resolve the issues based on the hints above.")
        return 1

if __name__ == "__main__":
    exit(main())
```

Run the verification script:
```bash
python verify_installation.py
```

### Manual Verification Steps

```bash
# 1. Check Python version
python --version

# 2. Check pip version
pip --version

# 3. Verify core dependencies
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import pygeomag; print('PyGeoMag: OK')"

# 4. Test Rich interface
python -c "from rich.console import Console; Console().print('Hello, World!', style='bold green')"

# 5. Test magnetic declination calculation
python -c "from pygeomag import GeoMag; gm = GeoMag(); print(f'Magnetic declination calculation OK: {gm.GeoMag(39.9, 116.4, 0, 2024)}')"
```

## 🔧 Common Installation Issues

### Issue 1: Python Version Too Low

**Symptom:**
```
SyntaxError: invalid syntax
```

**Solution:**
```bash
# Check current version
python --version

# If version < 3.8, please upgrade
# Windows: Download new version from python.org
# macOS: brew upgrade python
# Linux: Refer to the installation guide above
```

### Issue 2: pip Installation Failure

**Symptom:**
```
ERROR: Could not find a version that satisfies the requirement
```

**Solution:**
```bash
# Upgrade pip
python -m pip install --upgrade pip

# Use domestic mirror source
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Clear cache and retry
pip cache purge
pip install rich pandas pygeomag tqdm geographiclib
```

### Issue 3: Permission Error

**Symptom:**
```
PermissionError: [Errno 13] Permission denied
```

**Solution:**
```bash
# Windows: Run Command Prompt as administrator
# macOS/Linux: Use user installation
pip install --user rich pandas pygeomag tqdm geographiclib

# Or use sudo (not recommended)
sudo pip install rich pandas pygeomag tqdm geographiclib
```

### Issue 4: Network Connection Issues

**Symptom:**
```
WARNING: Retrying... Connection broken
```

**Solution:**
```bash
# Use domestic mirror source
pip install -i https://mirrors.aliyun.com/pypi/simple/ rich pandas pygeomag tqdm geographiclib

# Or Tsinghua mirror
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Configure permanent mirror source
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 🎯 Post-Installation Steps

### 1. Prepare Required Files
- **Fenix Database**: Obtain `nd.db3` file
- **NAIP Data**: Download `RTE_SEG.csv` route data
- **iFly Installation**: Confirm iFly 737 MAX 8 is installed

### 2. Create Working Directory
```bash
# Create dedicated directory
mkdir ~/ifly-converter
cd ~/ifly-converter

# Download converter script
# (Obtain main.py from project repository)
```

### 3. Perform First Test
```bash
# Run the converter
python main.py

# Follow the on-screen prompts
```

## 📚 Next Steps

After installation, please continue to read:

1.  **[Configuration Instructions](configuration.md)** - Learn about detailed configuration options
2.  **[Usage Instructions](usage.md)** - Start your first data conversion
3.  **[Troubleshooting](../troubleshooting.md)** - Refer to if you encounter issues

---

**Installation Complete!** 🎉 You can now start using the iFly Navigation Data Converter. If you encounter any issues, please refer to the [Troubleshooting Guide](../troubleshooting.md) or seek help in GitHub Issues.
# 🔧 TFDI Navigation Data Converter Installation Guide

This guide will detail how to install and configure the TFDI Navigation Data Converter, ensuring your system environment can run the converter smoothly.

## 📋 System Requirements

### 💻 Hardware Requirements
| Component   | Minimum Requirement | Recommended Configuration |
|-------------|---------------------|---------------------------|
| **Processor** | Dual-core 2.0GHz    | Quad-core 3.0GHz+         |
| **RAM**     | 4GB RAM             | 8GB+ RAM                  |
| **Storage** | 1GB Available Space | 5GB+ Available Space      |
| **Network** | Required for download only | Stable network connection |

### 🖥️ Operating System Support
- **Windows**: Windows 10 (2004+) / Windows 11
- **macOS**: macOS 10.15 Catalina or later
- **Linux**: Ubuntu 18.04+, CentOS 8+, or other mainstream distributions

### 🐍 Python Environment Requirements
- **Python Version**: 3.8.0 or later
- **Recommended Version**: Python 3.9.x or 3.10.x
- **Package Manager**: pip 21.0+ (usually installed with Python)

## 🚀 Quick Installation

### Windows Users

#### 1️⃣ Install Python

**Method 1: Microsoft Store (Recommended)**
```bash
# 1. Open Microsoft Store
# 2. Search for "Python 3.10"
# 3. Click Install Python 3.10
# 4. Verify installation
python --version
pip --version
```

**Method 2: Official Website Download**
```bash
# 1. Visit https://www.python.org/downloads/windows/
# 2. Download Python 3.10.x (64-bit)
# 3. Run the installer
#    ✅ Check "Add Python to PATH"
#    ✅ Check "Install pip"
# 4. Verify installation
python --version
```

#### 2️⃣ Install Converter Dependencies

```bash
# Open Command Prompt or PowerShell
# Upgrade pip
python -m pip install --upgrade pip

# Install required dependencies
pip install rich pandas py7zr

# Verify installation
python -c "import rich, pandas, py7zr; print('✅ All dependencies installed successfully!')"
```

#### 3️⃣ Download Converter

```bash
# Method 1: Download release package
# Visit the GitHub Releases page to download the latest version

# Method 2: Clone source code (requires Git)
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Verify converter
python Fenix2TFDINavDataConverter.py --help
```

### macOS Users

#### 1️⃣ Install Python

**Method 1: Homebrew (Recommended)**
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python@3.10

# Verify installation
python3 --version
pip3 --version

# Create symbolic links (optional)
ln -sf $(which python3) /usr/local/bin/python
ln -sf $(which pip3) /usr/local/bin/pip
```

**Method 2: Official Website Download**
```bash
# 1. Visit https://www.python.org/downloads/macos/
# 2. Download Python 3.10.x for macOS
# 3. Install the .pkg file
# 4. Verify installation
python3 --version
```

#### 2️⃣ Install Converter Dependencies

```bash
# Upgrade pip
python3 -m pip install --upgrade pip

# Install dependencies
pip3 install rich pandas py7zr

# Verify installation
python3 -c "import rich, pandas, py7zr; print('✅ Dependencies installed!')"
```

#### 3️⃣ Download and Set Up Converter

```bash
# Download converter
curl -L -o tfdi-converter.zip https://github.com/your-org/tfdi-converter/archive/main.zip
unzip tfdi-converter.zip
cd tfdi-converter-main

# Or use Git
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Verify installation
python3 Fenix2TFDINavDataConverter.py --version
```

### Linux Users

#### 1️⃣ Install Python

**Ubuntu/Debian:**
```bash
# Update package list
sudo apt update

# Install Python 3.10 and related tools
sudo apt install python3.10 python3.10-pip python3.10-venv python3.10-dev

# Install build-essential (some packages require compilation)
sudo apt install build-essential

# Create symbolic links
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3.10 1

# Verify installation
python --version
pip --version
```

**CentOS/RHEL 8+:**
```bash
# Enable PowerTools repository
sudo dnf config-manager --set-enabled powertools

# Install Python 3.10
sudo dnf install python3.10 python3.10-pip python3.10-devel

# Install development tools
sudo dnf groupinstall "Development Tools"

# Verify installation
python3.10 --version
pip3.10 --version
```

**Arch Linux:**
```bash
# Install Python
sudo pacman -S python python-pip

# Install development tools
sudo pacman -S base-devel

# Verify installation
python --version
pip --version
```

#### 2️⃣ Install Converter Dependencies

```bash
# Upgrade pip
python -m pip install --upgrade pip

# Install dependencies
pip install rich pandas py7zr

# If permission issues occur, install for user
pip install --user rich pandas py7zr

# Verify installation
python -c "import rich, pandas, py7zr; print('✅ Dependencies installed successfully!')"
```

#### 3️⃣ Download Converter

```bash
# Download using wget
wget https://github.com/your-org/tfdi-converter/archive/main.zip
unzip main.zip
cd tfdi-converter-main

# Or use git
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Set execute permissions
chmod +x Fenix2TFDINavDataConverter.py

# Verify installation
python Fenix2TFDINavDataConverter.py --version
```

## 📦 Detailed Dependency Description

### Core Dependencies

| Package Name | Version Requirement | Purpose                 | Installation Command |
|--------------|---------------------|-------------------------|----------------------|
| **rich**     | ≥ 12.0.0            | Modern CLI interface    | `pip install rich`   |
| **pandas**   | ≥ 1.3.0             | Data processing and analysis | `pip install pandas` |
| **py7zr**    | ≥ 0.18.0            | 7z archive file handling | `pip install py7zr`  |

### Standard Library Dependencies (No extra installation required)

| Module             | Purpose                 |
|--------------------|-------------------------|
| **sqlite3**        | SQLite database access  |
| **json**           | JSON data serialization |
| **pathlib**        | File path handling      |
| **logging**        | Logging                 |
| **dataclasses**    | Data class support      |
| **concurrent.futures** | Concurrency handling    |

### Optional Dependencies

```bash
# Development-related dependencies (for developers only)
pip install pytest flake8 mypy black pre-commit

# Performance monitoring dependency
pip install psutil

# Progress bar enhancement
pip install tqdm
```

## 🔍 Installation Verification

### Full Verification Script

Create the verification script `verify_tfdi_installation.py`:

```python
#!/usr/bin/env python3
"""
TFDI Navigation Data Converter Installation Verification Script
Checks system environment, dependencies, and converter functionality
"""

import sys
import importlib
import platform
from pathlib import Path

def check_python_version():
    """Checks Python version"""
    version = sys.version_info
    print(f"🐍 Python Version: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python version meets requirements (>= 3.8)")
        return True
    else:
        print("❌ Python version is too old, 3.8 or higher is required")
        print("   Please upgrade Python and try again")
        return False

def check_dependencies():
    """Checks required dependencies"""
    required_packages = {
        'rich': 'Modern CLI interface',
        'pandas': 'Data processing library',
        'py7zr': '7z compression handling'
    }
    
    print("\n📦 Checking dependencies:")
    all_ok = True
    
    for package, description in required_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"❌ {package:<10} Not installed        ({description})")
            all_ok = False
        except Exception as e:
            print(f"⚠️ {package:<10} Error: {e}")
            all_ok = False
    
    return all_ok

def check_optional_dependencies():
    """Checks optional dependencies"""
    optional_packages = {
        'psutil': 'System monitoring',
        'tqdm': 'Progress bar enhancement'
    }
    
    print("\n🔧 Checking optional dependencies:")
    for package, description in optional_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"⚪ {package:<10} Not installed        ({description}) - Optional")

def check_system_resources():
    """Checks system resources"""
    print("\n💾 Checking system resources:")
    
    try:
        import psutil
        
        # Check memory
        memory = psutil.virtual_memory()
        memory_gb = memory.total // (1024**3)
        print(f"💿 Total RAM: {memory_gb} GB")
        
        if memory_gb >= 4:
            print("✅ Sufficient RAM (>= 4GB)")
        else:
            print("⚠️ RAM might be insufficient, 4GB+ recommended")
        
        # Check disk space
        disk = psutil.disk_usage('.')
        free_gb = disk.free // (1024**3)
        print(f"💿 Available disk space: {free_gb} GB")
        
        if free_gb >= 1:
            print("✅ Sufficient disk space (>= 1GB)")
        else:
            print("⚠️ Insufficient disk space, at least 1GB required")
            
    except ImportError:
        print("⚪ Unable to check system resources (psutil not installed)")

def check_converter_accessibility():
    """Checks converter file accessibility"""
    print("\n🔧 Checking converter files:")
    
    converter_files = [
        'Fenix2TFDINavDataConverter.py',
        'README.md'
    ]
    
    for file_name in converter_files:
        file_path = Path(file_name)
        if file_path.exists():
            size_kb = file_path.stat().st_size // 1024
            print(f"✅ {file_name:<35} ({size_kb} KB)")
        else:
            print(f"⚠️ {file_name:<35} File does not exist")

def test_basic_functionality():
    """Tests basic functionality"""
    print("\n🧪 Testing basic functionality:")
    
    try:
        # Test Rich interface
        from rich.console import Console
        console = Console()
        console.print("✅ Rich interface test", style="green")
        
        # Test Pandas data processing
        import pandas as pd
        df = pd.DataFrame({'test': [1, 2, 3]})
        assert len(df) == 3
        print("✅ Pandas data processing test passed")
        
        # Test py7zr compression functionality
        import py7zr
        print("✅ py7zr compression functionality available")
        
        # Test SQLite connection
        import sqlite3
        conn = sqlite3.connect(':memory:')
        conn.close()
        print("✅ SQLite database connection test passed")
        
        return True
        
    except Exception as e:
        print(f"❌ Functionality test failed: {e}")
        return False

def main():
    """Main verification function"""
    print("🔍 TFDI Navigation Data Converter Installation Verification")
    print("=" * 60)
    
    # List of checks
    checks = [
        ("Python Version", check_python_version),
        ("Required Dependencies", check_dependencies),
        ("Optional Dependencies", check_optional_dependencies),
        ("System Resources", check_system_resources),
        ("Converter Files", check_converter_accessibility),
        ("Basic Functionality", test_basic_functionality),
    ]
    
    all_passed = True
    critical_passed = True
    
    for name, check_func in checks:
        try:
            result = check_func()
            if name in ["Python Version", "Required Dependencies", "Basic Functionality"]:
                if not result:
                    critical_passed = False
                    all_passed = False
            elif result is False:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} check failed: {e}")
            if name in ["Python Version", "Required Dependencies"]:
                critical_passed = False
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if critical_passed:
        if all_passed:
            print("🎉 All checks passed! The converter can be used normally.")
            print("\n📝 Next steps:")
            print("   1. Prepare Fenix navigation database file (nd.db3)")
            print("   2. Run the converter: python Fenix2TFDINavDataConverter.py")
            return 0
        else:
            print("✅ Core functionality available, some optional features may be limited.")
            print("   The converter can be used normally, but it is recommended to install missing optional dependencies.")
            return 0
    else:
        print("❌ Critical checks failed, please resolve the issues above and try again.")
        print("\n🔧 Common solutions:")
        print("   • Upgrade Python version: https://python.org/downloads")
        print("   • Install dependencies: pip install rich pandas py7zr")
        print("   • Check network connection and permission settings")
        return 1

if __name__ == "__main__":
    exit(main())
```

Run the verification script:
```bash
python verify_tfdi_installation.py
```

### Quick Verification Commands

```bash
# 1. Check Python version
python --version

# 2. Check pip version  
pip --version

# 3. Verify core dependencies
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import py7zr; print(f'py7zr: {py7zr.__version__}')"

# 4. Test Rich interface
python -c "from rich.console import Console; Console().print('🎉 Rich test successful!', style='bold green')"

# 5. Test converter startup
python Fenix2TFDINavDataConverter.py --version
```

## 🔧 Common Installation Issues

### Issue 1: Python Version Too Old

**Symptoms:**
```
SyntaxError: invalid syntax (used new syntax features)
TypeError: 'type' object is not subscriptable
```

**Solution:**
```bash
# Check current version
python --version

# If version < 3.8, an upgrade is required
# Windows: Download new version from python.org
# macOS: brew upgrade python  
# Linux: Refer to the installation guide above to update
```

### Issue 2: pip Installation Failure

**Symptoms:**
```
ERROR: Could not find a version that satisfies the requirement
WARNING: Retrying... Connection broken
```

**Solution:**
```bash
# Upgrade pip
python -m pip install --upgrade pip

# Use an alternative package index
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas py7zr

# Clear cache and retry
pip cache purge
pip install rich pandas py7zr

# Check network connection
ping pypi.org
```

### Issue 3: Permission Error

**Symptoms:**
```
PermissionError: [Errno 13] Permission denied
Could not install packages due to an PermissionError
```

**Solution:**
```bash
# Windows: Run as administrator
# Right-click Command Prompt → "Run as administrator"

# macOS/Linux: Install for user
pip install --user rich pandas py7zr

# Or use sudo (not recommended)
sudo pip install rich pandas py7zr
```

### Issue 4: Compilation Error

**Symptoms:**
```
error: Microsoft Visual C++ 14.0 is required
error: building wheel for package failed
```

**Solution:**

**Windows:**
```bash
# Install Microsoft C++ Build Tools
# Visit: https://visualstudio.microsoft.com/visual-cpp-build-tools/
# Download and install "Build Tools for Visual Studio"

# Or use pre-compiled packages
pip install --only-binary=all rich pandas py7zr
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install build-essential python3-dev

# CentOS/RHEL
sudo dnf groupinstall "Development Tools"
sudo dnf install python3-devel
```

### Issue 5: Dependency Conflicts

**Symptoms:**
```
ERROR: pip's dependency resolver does not currently support multiple versions
```

**Solution:**
```bash
# Create a virtual environment
python -m venv tfdi_env

# Activate the virtual environment
# Windows:
tfdi_env\Scripts\activate
# macOS/Linux:
source tfdi_env/bin/activate

# Install in the virtual environment
pip install rich pandas py7zr

# Verify installation
python -c "import rich, pandas, py7zr; print('Installation successful!')"
```

## 🎯 Post-Installation Steps

### 1. Environment Configuration

#### Windows Environment Variables (Optional)
```batch
# Add Python Scripts directory to PATH
set PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\Python\Python310\Scripts

# Set converter directory
set TFDI_CONVERTER_HOME=C:\Users\%USERNAME%\tfdi-converter
```

#### macOS/Linux Environment Variables (Optional)
```bash
# Add to ~/.bashrc or ~/.zshrc
export TFDI_CONVERTER_HOME="$HOME/tfdi-converter"
export PATH="$PATH:$TFDI_CONVERTER_HOME"

# Reload configuration
source ~/.bashrc  # Or source ~/.zshrc
```

### 2. Prepare Data Files

```bash
# Check Fenix database location
# Common Windows path:
dir "%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320" /s | findstr nd.db3

# macOS/Linux:
find ~ -name "nd.db3" 2>/dev/null
```

### 3. Create Working Directory

```bash
# Create a dedicated working directory
mkdir ~/tfdi-conversion-workspace
cd ~/tfdi-conversion-workspace

# Create subdirectories
mkdir input output logs backups

# Copy converter to working directory (optional)
cp /path/to/Fenix2TFDINavDataConverter.py .
```

### 4. First Run Test

```bash
# Run converter help
python Fenix2TFDINavDataConverter.py --help

# Run basic tests (if test data available)
python Fenix2TFDINavDataConverter.py --test

# View version information
python Fenix2TFDINavDataConverter.py --version
```

## 📚 Next Steps

Once the installation is complete, please continue reading:

1.  **[Configuration Guide](configuration.md)** - Learn about converter configuration options
2.  **[Usage Guide](usage.md)** - Start your first data conversion
3.  **[Troubleshooting](../troubleshooting.md)** - Refer here if you encounter issues

### Quick Start Checklist

- [ ] ✅ Python 3.8+ installed
- [ ] ✅ Required dependencies installed (rich, pandas, py7zr)
- [ ] ✅ Converter files downloaded
- [ ] ✅ Installation verified
- [ ] ✅ Fenix database file prepared
- [ ] ✅ TFDI MD-11 installed in MSFS

---

**Installation Complete!** 🎉 

You can now start using the TFDI Navigation Data Converter. If you encounter any issues, please refer to the [Troubleshooting Guide](../troubleshooting.md) or seek help in GitHub Issues. 🚁✨
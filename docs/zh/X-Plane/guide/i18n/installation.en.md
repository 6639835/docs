# Installation Guide

This guide will help you properly install and configure the Nav-data tool on different operating systems.

## 📋 System Requirements

### Minimum System Requirements
- **Operating System**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+ or other mainstream Linux distributions
- **Python Version**: Python 3.6 or higher
- **Memory**: 4GB RAM or more recommended
- **Storage**: At least 2GB of available disk space
- **Network**: For downloading dependency packages and updating data

### Recommended System Configuration
- **Python Version**: Python 3.8+ 
- **Memory**: 8GB RAM or higher
- **Storage**: 10GB+ SSD storage
- **Processor**: Multi-core CPU (for large file batch processing)

## 🔧 Installation Steps

### 1. Python Environment Installation

#### Windows System
1. Visit the [Python official website](https://www.python.org/downloads/) to download the latest version
2. Run the installer, **make sure to check "Add Python to PATH"**
3. Verify installation:
   ```cmd
   python --version
   pip --version
   ```

#### macOS System
Using Homebrew (recommended):
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python

# Verify installation
python3 --version
pip3 --version
```

#### Linux System (Ubuntu/Debian)
```bash
# Update package manager
sudo apt update

# Install Python and pip
sudo apt install python3 python3-pip python3-venv

# Verify installation
python3 --version
pip3 --version
```

### 2. Get Project Source Code

#### Method One: Git Clone (recommended)
```bash
# Clone the project repository
git clone https://github.com/your-repo/nav-data.git

# Enter the project directory
cd nav-data
```

#### Method Two: Download ZIP Archive
1. Visit the project GitHub page
2. Click "Code" → "Download ZIP"
3. Unzip to the target directory

### 3. Create Virtual Environment (recommended)

Create an isolated Python virtual environment to avoid dependency conflicts:

```bash
# Create virtual environment
python -m venv nav-data-env

# Activate virtual environment
# Windows:
nav-data-env\Scripts\activate

# macOS/Linux:
source nav-data-env/bin/activate

# Verify virtual environment
which python  # should display virtual environment path
```

### 4. Install Dependency Packages

#### Core Dependencies
```bash
# Install basic dependencies
pip install -r requirements.txt
```

#### Manual Dependency Installation (if no requirements.txt)
```bash
# Data processing related
pip install pandas numpy

# PDF processing
pip install pdfplumber

# Progress bar and user interface
pip install tqdm colorama

# Geographical calculations
pip install geopy

# Chinese text processing (if needed)
pip install pypinyin

# Other utility packages
pip install typing-extensions dataclasses
```

#### Optional Dependencies
```bash
# Jupyter Notebook support (data analysis)
pip install jupyter

# Testing framework
pip install pytest pytest-cov

# Code formatting
pip install black flake8
```

## 🗂️ Directory Structure Configuration

### Standard Directory Layout
```
nav-data/
├── Airway/                 # Airway data processing module
│   ├── airway.py          # Main conversion script
│   └── README.md          # Module description
├── PDF extract/           # PDF data extraction module
│   ├── 1_terminal_pdf.py  # Raw PDF extraction
│   ├── 2_terminal_encode.py # Data encoding
│   ├── 3_terminal_db.py   # Database generation
│   ├── waypoint_1_pdf.py  # Waypoint extraction
│   └── utils.py           # Utility functions
├── Terminal Patch/        # Data patching module
│   ├── terminal_encoder.py # Program encoder
│   └── terminal_reencode.py # Format repair
├── X-Plane CIFP/         # X-Plane CIFP processing
│   ├── 1_navaid.py       # Navaid processing
│   ├── 2_waypoint.py     # Waypoint processing
│   ├── 3_terminal.py     # Terminal procedure processing
│   └── utils.py          # Utility functions
├── docs/                  # Project documentation
├── requirements.txt       # Dependency list
└── README.md             # Project description
```

### Create Working Directories
```bash
# Create data input directory
mkdir -p data/input/{csv,pdf,raw}

# Create data output directory
mkdir -p data/output/{dat,txt,processed}

# Create logs directory
mkdir -p logs

# Create config directory
mkdir -p config
```

## ⚙️ Environment Variable Configuration

### Create Environment Configuration File
Create a `.env` file (Windows users create `.env.txt` and then rename it):

```bash
# X-Plane installation path
XPLANE_PATH=/path/to/X-Plane

# Data file paths
DATA_INPUT_PATH=./data/input
DATA_OUTPUT_PATH=./data/output

# Log configuration
LOG_LEVEL=INFO
LOG_FILE=./logs/nav-data.log

# Processing configuration
BATCH_SIZE=1000
ENABLE_PROGRESS_BAR=true

# Chinese airspace codes (customizable)
CHINA_AREAS=ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU
```

### Windows System Environment Variable Settings
1. Right-click "This PC" → "Properties" → "Advanced system settings"
2. Click "Environment Variables"
3. Add in "User variables":
   - Variable name: `NAV_DATA_HOME`
   - Variable value: Project installation path

### macOS/Linux Environment Variable Settings
Add to `~/.bashrc` or `~/.zshrc`:
```bash
export NAV_DATA_HOME="/path/to/nav-data"
export PATH="$NAV_DATA_HOME:$PATH"
```

## 🧪 Installation Verification

### 1. Basic Function Test
```bash
# Enter project directory
cd nav-data

# Test Airway module
python -c "import Airway.airway; print('Airway module loaded successfully')"

# Test PDF processing module  
python -c "import sys; sys.path.append('PDF extract'); import utils; print('PDF module loaded successfully')"

# Test Terminal Patch module
python -c "import sys; sys.path.append('Terminal Patch'); print('Terminal Patch module available')"
```

### 2. Dependency Check Script
Create `check_installation.py`:
```python
#!/usr/bin/env python3
"""
Nav-data Installation Check Script
"""
import sys
import importlib
import os

def check_python_version():
    """Check Python version"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 6):
        print("❌ Python version too low, 3.6+ required")
        return False
    print(f"✅ Python Version: {version.major}.{version.minor}.{version.micro}")
    return True

def check_dependencies():
    """Check dependency packages"""
    required_packages = [
        'pandas', 'numpy', 'pdfplumber', 'tqdm', 
        'colorama', 'geopy', 'typing_extensions'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - Not installed")
            missing_packages.append(package)
    
    return len(missing_packages) == 0, missing_packages

def check_directories():
    """Check directory structure"""
    required_dirs = [
        'Airway', 'PDF extract', 'Terminal Patch', 'X-Plane CIFP'
    ]
    
    missing_dirs = []
    for dirname in required_dirs:
        if os.path.exists(dirname):
            print(f"✅ {dirname}/")
        else:
            print(f"❌ {dirname}/ - Directory missing")
            missing_dirs.append(dirname)
    
    return len(missing_dirs) == 0, missing_dirs

def main():
    print("🔍 Nav-data Installation Check")
    print("=" * 40)
    
    # Check Python version
    print("\n📍 Python Version Check:")
    python_ok = check_python_version()
    
    # Check dependencies
    print("\n📍 Dependency Package Check:")
    deps_ok, missing_deps = check_dependencies()
    
    # Check directories
    print("\n📍 Directory Structure Check:")
    dirs_ok, missing_dirs = check_directories()
    
    # Summary
    print("\n" + "=" * 40)
    if python_ok and deps_ok and dirs_ok:
        print("🎉 Installation check passed! Nav-data is ready.")
        return 0
    else:
        print("⚠️  Installation check found issues:")
        if missing_deps:
            print(f"   Missing dependencies: {', '.join(missing_deps)}")
            print(f"   Installation command: pip install {' '.join(missing_deps)}")
        if missing_dirs:
            print(f"   Missing directories: {', '.join(missing_dirs)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

Run check:
```bash
python check_installation.py
```

## 🔥 Common Installation Issues

### Issue 1: Python Version Compatibility
**Symptom**: Syntax errors or module import errors at runtime
**Solution**:
```bash
# Check Python version
python --version

# If version is too low, upgrade Python
# Windows: Re-download and install new version
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### Issue 2: Dependency Package Installation Failed
**Symptom**: `pip install` command fails
**Solution**:
```bash
# Upgrade pip
python -m pip install --upgrade pip

# Use a domestic mirror source
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# Clear cache and retry
pip cache purge
pip install package_name
```

### Issue 3: Virtual Environment Issues
**Symptom**: Virtual environment cannot be activated or packages not found
**Solution**:
```bash
# Delete old virtual environment
rm -rf nav-data-env

# Recreate
python -m venv nav-data-env

# Activate and install dependencies
source nav-data-env/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

### Issue 4: File Permissions Issues (Linux/macOS)
**Symptom**: Unable to create files or directories
**Solution**:
```bash
# Modify directory permissions
chmod -R 755 nav-data/

# Or use sudo (not recommended)
sudo python script.py
```

### Issue 5: PDF Processing Module Issues
**Symptom**: pdfplumber installation or usage fails
**Solution**:
```bash
# Install system dependencies (Ubuntu/Debian)
sudo apt-get install python3-dev libpoppler-cpp-dev

# Reinstall pdfplumber
pip uninstall pdfplumber
pip install pdfplumber
```

## 🚀 Installation Complete

After installation, you can:

1. **Run a quick test**:
   ```bash
   python check_installation.py
   ```

2. **View help information**:
   ```bash
   python Airway/airway.py --help
   ```

3. **Start data conversion**:
   Refer to [Usage Instructions](./usage.md) for your first data conversion

## 🔄 Updates and Upgrades

### Update Project Code
```bash
# If using Git
git pull origin main

# Or re-download the latest version
```

### Update Dependency Packages
```bash
# Activate virtual environment
source nav-data-env/bin/activate

# Update all packages
pip install --upgrade -r requirements.txt

# Or manually update specific packages
pip install --upgrade package_name
```

### Data File Update
Regularly check and update NAIP data sources to ensure the timeliness of navigation data.

---

**Installation Complete!** 🎉 You can now start using Nav-data for navigation data conversion. If you encounter any issues, please refer to [Troubleshooting](#common-installation-issues) or submit a GitHub Issue.
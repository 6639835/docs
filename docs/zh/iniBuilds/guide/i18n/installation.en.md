# 📥 Installation Guide

<div class="installation-header">
  <div class="header-content">
    <h2>Nav-data iniBuilds A350 Installation Guide</h2>
    <p>This guide will walk you through the complete installation process for the Nav-data aviation navigation data conversion tool, ensuring correct system environment configuration.</p>
  </div>
  <div class="progress-indicator">
    <div class="step active" data-step="1">
      <div class="step-number">1</div>
      <div class="step-label">System Check</div>
    </div>
    <div class="step" data-step="2">
      <div class="step-number">2</div>
      <div class="step-label">Python Environment</div>
    </div>
    <div class="step" data-step="3">
      <div class="step-number">3</div>
      <div class="step-label">MSFS Configuration</div>
    </div>
    <div class="step" data-step="4">
      <div class="step-number">4</div>
      <div class="step-label">Verification Complete</div>
    </div>
  </div>
</div>

## 🖥️ System Requirements

### 📋 Configuration Requirements Comparison

<div class="requirements-comparison">
  <div class="req-column">
    <h4>🟡 Minimum Requirements</h4>
    <div class="req-card minimal">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Operating System</strong>
          <span>Windows 10 1903+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Python Version</strong>
          <span>Python 3.8+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>RAM</strong>
          <span>8GB RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Storage Space</strong>
          <span>2GB Available Space</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Network</strong>
          <span>Broadband Internet Connection</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="req-column">
    <h4>🟢 Recommended Requirements</h4>
    <div class="req-card recommended">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Operating System</strong>
          <span>Windows 11 22H2+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Python Version</strong>
          <span>Python 3.11+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>RAM</strong>
          <span>16GB+ RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Storage Space</strong>
          <span>5GB+ Available Space</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Network</strong>
          <span>Stable High-Speed Connection</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.installation-header {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.05));
  border: 1px solid rgba(30, 64, 175, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.header-content h2 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
}

.header-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1.6;
}

.progress-indicator {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;
}

.progress-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.requirements-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.req-column h4 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.req-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.req-card.minimal {
  border-color: rgba(245, 158, 11, 0.3);
}

.req-card.recommended {
  border-color: rgba(34, 197, 94, 0.3);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
}

.req-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.req-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.req-item:last-child {
  border-bottom: none;
}

.req-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.req-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.req-details strong {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.req-details span {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .progress-indicator {
    flex-direction: column;
    gap: 1rem;
  }
  
  .progress-indicator::before {
    display: none;
  }
  
  .step {
    flex-direction: row;
    justify-content: flex-start;
  }
  
  .requirements-comparison {
    grid-template-columns: 1fr;
  }
}
</style>

### ✈️ Required Software

- [**Microsoft Flight Simulator**](https://www.flightsimulator.com/) (2020 or 2024 Version)
- [**Python 3.8+**](https://www.python.org/downloads/) Development Environment
- Target Aircraft Add-on: [**iniBuilds A350**](https://www.inibuilds.com/) or [**PMDG 737/777**](https://pmdg.com/)

### 📊 Data Source Subscription (Choose One)

- [**Navigraph**](https://navigraph.com/) - Recommended, timely data updates
- [**Aerosoft NavDataPro**](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) - Affordable alternative

## 🐍 Python Environment Installation

### Step 1: Download and Install Python

1.  Visit the [Python Official Website](https://www.python.org/downloads/)
2.  Download the latest Python 3.11 version (recommended)
3.  **Important**: During installation, check the "Add Python to PATH" option

```powershell
# Verify Python installation
python --version
# Should display: Python 3.11.x

# Verify pip installation
pip --version
# Should display pip version information
```

### Step 2: Install Project Dependencies

```bash
# Clone or download the project locally
cd /path/to/nav-data

# Install required dependency packages
pip install -r requirements.txt
```

#### Dependency Package Description

| Package Name | Version | Purpose |
|------|------|------|
| `pandas` | ≥1.3.0 | Data processing and analysis |
| `requests` | ≥2.26.0 | HTTP request handling |
| `tqdm` | ≥4.62.0 | Progress bar display |
| `chardet` | ≥4.0.0 | Character encoding detection |
| `ratelimit` | ≥2.2.1 | API request limiting |
| `pygeomag` | ≥0.9.0 | Geomagnetic declination calculation |

### Step 3: Verify Installation

```python
# Test critical dependencies
python -c "import pandas, sqlite3, pygeomag; print('All dependencies installed successfully!')"
```

## 🎮 Microsoft Flight Simulator Configuration

### 🔍 Confirm MSFS Installation Location

Depending on your MSFS version and purchase channel, the Community folder location is as follows:

#### MSFS 2020

**Microsoft Store Version**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam Version**
```
%APPDATA%\Microsoft Flight Simulator\Packages\Community
```

#### MSFS 2024

**Microsoft Store Version**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam Version**
```
%APPDATA%\Microsoft Flight Simulator 2024\Packages\Community
```

### 🛠️ Quick Path Detection Script

Create the following PowerShell script to automatically detect your MSFS installation:

```powershell
# Save as detect_msfs.ps1
$paths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator\Packages\Community",
    "$env:LOCALAPPDATA\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator 2024\Packages\Community"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "Found MSFS Community folder: $path" -ForegroundColor Green
    }
}
```

## ✈️ Aircraft Add-on Verification

### iniBuilds A350 Verification

Check if the following directory exists:

```
[Community Folder]\inibuilds-aircraft-a350\Config\NavigationData\
```

### PMDG Add-on Verification

Check if the following directories exist (depending on your PMDG aircraft model):

```
[Community Folder]\pmdg-aircraft-737\Config\Navdata\
[Community Folder]\pmdg-aircraft-738\Config\Navdata\
[Community Folder]\pmdg-aircraft-77w\Config\Navdata\
[Community Folder]\pmdg-aircraft-77f\Config\Navdata\
```

## 📁 Project Directory Structure

After installation, your project directory should look like this:

```
nav-data/
├── XP2INI_NDB_Converter.py    # Main conversion program
├── requirements.txt           # Python dependency list
├── README.md                 # Project README
├── LICENSE                   # License file
│
├── 数据处理模块/
│   ├── airports.py           # Airport data processing
│   ├── runways.py           # Runway data processing
│   ├── vhfs.py              # VHF Navaid processing
│   ├── ndbs.py              # NDB Navaid processing
│   ├── enroute_waypoints.py # Enroute waypoint processing
│   ├── terminal_waypoints.py# Terminal waypoint processing
│   ├── sids.py              # SID procedure processing
│   ├── stars.py             # STAR procedure processing
│   ├── iaps.py              # Approach procedure processing
│   ├── airways.py           # Airway processing
│   └── gs.py                # Glide Slope processing
│
└── docs/                    # Documentation directory
    ├── guide/               # User Guide
    └── ...                  # Other documentation
```

## 🔧 Environment Variable Configuration (Optional)

For more convenient use, you can set the following environment variables:

```powershell
# Set MSFS Community path
setx MSFS_COMMUNITY_PATH "C:\Users\[Username]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community"

# Set Nav-data working directory
setx NAVDATA_WORKSPACE "C:\path\to\nav-data"
```

## ✅ Installation Verification Checklist

After completing the installation, please confirm the following items:

-   [ ] Python 3.8+ is correctly installed and added to PATH
-   [ ] All dependency packages are successfully installed
-   [ ] MSFS Community folder is located
-   [ ] Target aircraft add-on is installed and verified
-   [ ] Project files are downloaded to the local directory
-   [ ] Sufficient disk space is available (at least 2GB)

## 🚨 Common Installation Issues

### Python-Related Issues

**Issue**: `'python' is not recognized as an internal or external command`
```bash
# Solution: Reinstall Python and ensure "Add to PATH" is checked
# Or manually add Python to system PATH
```

**Issue**: `ModuleNotFoundError: No module named 'xxx'`
```bash
# Solution: Reinstall dependencies
pip install --upgrade -r requirements.txt
```

### Permission Issues

**Issue**: Unable to access MSFS folder
```powershell
# Solution: Run PowerShell/Command Prompt as administrator
# Right-click → "Run as administrator"
```

### Path Issues

**Issue**: Aircraft add-on directory not found
```bash
# Solution:
# 1. Confirm the aircraft add-on is correctly installed
# 2. Launch the aircraft in MSFS once to create necessary directories
# 3. Check if the add-on is in the correct Community folder
```

## 🔄 Update Instructions

To update Nav-data to the latest version:

```bash
# Pull latest code
git pull origin main

# Update dependency packages
pip install --upgrade -r requirements.txt
```

---

Installation complete! Next, please refer to the [**Configuration Guide**](./configuration.md) to set up data sources and AIRAC cycles.
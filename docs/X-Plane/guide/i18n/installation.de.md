# Installationsanleitung

Dieses Handbuch hilft Ihnen, das Nav-data Tool auf verschiedenen Betriebssystemen korrekt zu installieren und zu konfigurieren.

## 📋 Systemanforderungen

### Mindestsystemanforderungen
- **Betriebssystem**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+ oder andere gängige Linux-Distributionen
- **Python-Version**: Python 3.6 oder höher
- **Arbeitsspeicher**: Empfohlen 4GB RAM oder mehr
- **Speicherplatz**: Mindestens 2GB freier Speicherplatz
- **Netzwerk**: Für das Herunterladen von Abhängigkeitspaketen und Datenaktualisierungen

### Empfohlene Systemkonfiguration
- **Python-Version**: Python 3.8+
- **Arbeitsspeicher**: 8GB RAM oder mehr
- **Speicherplatz**: 10GB+ SSD-Speicher
- **Prozessor**: Mehrkern-CPU (für die Stapelverarbeitung großer Dateien)

## 🔧 Installationsschritte

### 1. Python-Umgebungsinstallation

#### Windows-System
1. Besuchen Sie die [offizielle Python-Website](https://www.python.org/downloads/), um die neueste Version herunterzuladen.
2. Führen Sie das Installationsprogramm aus und **stellen Sie sicher, dass "Add Python to PATH" angehakt ist**.
3. Installation überprüfen:
   ```cmd
   python --version
   pip --version
   ```

#### macOS-System
Homebrew verwenden (empfohlen):
```bash
# Install Homebrew (if not already installed)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python
brew install python

# Verify installation
python3 --version
pip3 --version
```

#### Linux-System (Ubuntu/Debian)
```bash
# Update package manager
sudo apt update

# Install Python and pip
sudo apt install python3 python3-pip python3-venv

# Verify installation
python3 --version
pip3 --version
```

### 2. Projekt-Quellcode abrufen

#### Methode 1: Git-Klon (empfohlen)
```bash
# Clone the project repository
git clone https://github.com/your-repo/nav-data.git

# Enter the project directory
cd nav-data
```

#### Methode 2: ZIP-Archiv herunterladen
1. Besuchen Sie die GitHub-Seite des Projekts
2. Klicken Sie auf "Code" → "Download ZIP"
3. Entpacken Sie es in das Zielverzeichnis

### 3. Virtuelle Umgebung erstellen (empfohlen)

Erstellen Sie eine unabhängige Python-virtuelle Umgebung, um Abhängigkeitskonflikte zu vermeiden:

```bash
# Create virtual environment
python -m venv nav-data-env

# Activate virtual environment
# Windows:
nav-data-env\Scripts\activate

# macOS/Linux:
source nav-data-env/bin/activate

# Verify virtual environment
which python  # Should display the virtual environment path
```

### 4. Abhängigkeitspakete installieren

#### Kernabhängigkeiten
```bash
# Install base dependencies
pip install -r requirements.txt
```

#### Abhängigkeiten manuell installieren (falls keine requirements.txt vorhanden ist)
```bash
# Data processing related
pip install pandas numpy

# PDF processing
pip install pdfplumber

# Progress bar and user interface
pip install tqdm colorama

# Geographical calculations
pip install geopy

# Chinese language processing (if needed)
pip install pypinyin

# Other toolkits
pip install typing-extensions dataclasses
```

#### Optionale Abhängigkeiten
```bash
# Jupyter Notebook support (data analysis)
pip install jupyter

# Testing framework
pip install pytest pytest-cov

# Code formatting
pip install black flake8
```

## 🗂️ Konfiguration der Verzeichnisstruktur

### Standard-Verzeichnislayout
```
nav-data/
├── Airway/                 # Modul zur Luftstraßendatenverarbeitung
│   ├── airway.py          # Hauptkonvertierungsskript
│   └── README.md          # Modulbeschreibung
├── PDF extract/           # Modul zur PDF-Datenextraktion
│   ├── 1_terminal_pdf.py  # Rohe PDF-Extraktion
│   ├── 2_terminal_encode.py # Datenkodierung
│   ├── 3_terminal_db.py   # Datenbankgenerierung
│   ├── waypoint_1_pdf.py  # Wegpunktextraktion
│   └── utils.py           # Hilfsfunktionen
├── Terminal Patch/        # Modul zur Datenreparatur
│   ├── terminal_encoder.py # Programm-Encoder
│   └── terminal_reencode.py # Formatkorrektur
├── X-Plane CIFP/         # X-Plane CIFP-Verarbeitung
│   ├── 1_navaid.py       # Navigationsgeräteverarbeitung
│   ├── 2_waypoint.py     # Wegpunktverarbeitung
│   ├── 3_terminal.py     # Terminalverfahrensverarbeitung
│   └── utils.py          # Hilfsfunktionen
├── docs/                  # Projektdokumentation
├── requirements.txt       # Abhängigkeitsliste
└── README.md             # Projektbeschreibung
```

### Arbeitsverzeichnisse erstellen
```bash
# Daten-Eingabeverzeichnis erstellen
mkdir -p data/input/{csv,pdf,raw}

# Daten-Ausgabeverzeichnis erstellen
mkdir -p data/output/{dat,txt,processed}

# Log-Verzeichnis erstellen
mkdir -p logs

# Konfigurationsverzeichnis erstellen
mkdir -p config
```

## ⚙️ Umgebungsvariablen konfigurieren

### Umgebungs-Konfigurationsdatei erstellen
Erstellen Sie eine `.env`-Datei (Windows-Benutzer erstellen eine `.env.txt` und benennen diese dann um):

```bash
# X-Plane Installationspfad
XPLANE_PATH=/path/to/X-Plane

# Datenpfad
DATA_INPUT_PATH=./data/input
DATA_OUTPUT_PATH=./data/output

# Log-Konfiguration
LOG_LEVEL=INFO
LOG_FILE=./logs/nav-data.log

# Verarbeitungskonfiguration
BATCH_SIZE=1000
ENABLE_PROGRESS_BAR=true

# Chinesische Luftraumcodes (anpassbar)
CHINA_AREAS=ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU
```

### Umgebungsvariablen unter Windows einstellen
1. Rechtsklick auf "Dieser PC" → "Eigenschaften" → "Erweiterte Systemeinstellungen"
2. Klicken Sie auf "Umgebungsvariablen"
3. Fügen Sie unter "Benutzervariablen" hinzu:
   - Variablenname: `NAV_DATA_HOME`
   - Variablenwert: Installationspfad des Projekts

### Umgebungsvariablen unter macOS/Linux einstellen
Fügen Sie in `~/.bashrc` oder `~/.zshrc` hinzu:
```bash
export NAV_DATA_HOME="/path/to/nav-data"
export PATH="$NAV_DATA_HOME:$PATH"
```

## 🧪 Installationsprüfung

### 1. Basisfunktionstest
```bash
# In das Projektverzeichnis wechseln
cd nav-data

# Airway-Modul testen
python -c "import Airway.airway; print('Airway module loaded successfully')"

# PDF-Verarbeitungsmodul testen  
python -c "import sys; sys.path.append('PDF extract'); import utils; print('PDF module loaded successfully')"

# Terminal Patch-Modul testen
python -c "import sys; sys.path.append('Terminal Patch'); print('Terminal Patch module available')"
```

### 2. Abhängigkeitsprüfskript
Erstellen Sie `check_installation.py`:
```python
#!/usr/bin/env python3
"""
Nav-data Installationsprüfskript
"""
import sys
import importlib
import os

def check_python_version():
    """Prüft die Python-Version"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 6):
        print("❌ Python-Version zu alt, 3.6+ erforderlich")
        return False
    print(f"✅ Python-Version: {version.major}.{version.minor}.{version.micro}")
    return True

def check_dependencies():
    """Prüft Abhängigkeitspakete"""
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
            print(f"❌ {package} - Nicht installiert")
            missing_packages.append(package)
    
    return len(missing_packages) == 0, missing_packages

def check_directories():
    """Prüft die Verzeichnisstruktur"""
    required_dirs = [
        'Airway', 'PDF extract', 'Terminal Patch', 'X-Plane CIFP'
    ]
    
    missing_dirs = []
    for dirname in required_dirs:
        if os.path.exists(dirname):
            print(f"✅ {dirname}/")
        else:
            print(f"❌ {dirname}/ - Verzeichnis fehlt")
            missing_dirs.append(dirname)
    
    return len(missing_dirs) == 0, missing_dirs

def main():
    print("🔍 Nav-data Installationsprüfung")
    print("=" * 40)
    
    # Python-Version prüfen
    print("\n📍 Python-Versionsprüfung:")
    python_ok = check_python_version()
    
    # Abhängigkeiten prüfen
    print("\n📍 Abhängigkeitspaketprüfung:")
    deps_ok, missing_deps = check_dependencies()
    
    # Verzeichnisse prüfen
    print("\n📍 Verzeichnisstrukturprüfung:")
    dirs_ok, missing_dirs = check_directories()
    
    # Zusammenfassung
    print("\n" + "=" * 40)
    if python_ok and deps_ok and dirs_ok:
        print("🎉 Installationsprüfung erfolgreich! Nav-data ist bereit.")
        return 0
    else:
        print("⚠️  Installationsprüfung hat Probleme festgestellt:")
        if missing_deps:
            print(f"   Fehlende Abhängigkeiten: {', '.join(missing_deps)}")
            print(f"   Installationsbefehl: pip install {' '.join(missing_deps)}")
        if missing_dirs:
            print(f"   Fehlende Verzeichnisse: {', '.join(missing_dirs)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

Prüfung ausführen:
```bash
python check_installation.py
```

## 🔥 Häufige Installationsprobleme

### Problem 1: Python-Versionskompatibilität
**Symptom**: Syntaxfehler oder Modulimportfehler während der Ausführung
**Lösung**:
```bash
# Python-Version prüfen
python --version

# Wenn die Version zu alt ist, Python aktualisieren
# Windows: Neue Version herunterladen und installieren
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### Problem 2: Fehler bei der Installation von Abhängigkeitspaketen
**Symptom**: `pip install`-Befehl schlägt fehl
**Lösung**:
```bash
# pip aktualisieren
python -m pip install --upgrade pip

# Chinesische Spiegelquelle verwenden
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# Cache leeren und erneut versuchen
pip cache purge
pip install package_name
```

### Problem 3: Probleme mit der virtuellen Umgebung
**Symptom**: Virtuelle Umgebung kann nicht aktiviert werden oder Pakete werden nicht gefunden
**Lösung**:
```bash
# Alte virtuelle Umgebung löschen
rm -rf nav-data-env

# Neu erstellen
python -m venv nav-data-env

# Aktivieren und Abhängigkeiten installieren
source nav-data-env/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

### Problem 4: Dateiberechtigungsprobleme (Linux/macOS)
**Symptom**: Dateien oder Verzeichnisse können nicht erstellt werden
**Lösung**:
```bash
# Verzeichnisberechtigungen ändern
chmod -R 755 nav-data/

# Oder sudo verwenden (nicht empfohlen)
sudo python script.py
```

### Problem 5: Probleme mit dem PDF-Verarbeitungsmodul
**Symptom**: Installation oder Verwendung von pdfplumber schlägt fehl
**Lösung**:
```bash
# Systemabhängigkeiten installieren (Ubuntu/Debian)
sudo apt-get install python3-dev libpoppler-cpp-dev

# pdfplumber neu installieren
pip uninstall pdfplumber
pip install pdfplumber
```

## 🚀 Installation abgeschlossen

Nach Abschluss der Installation können Sie:

1. **Schnelltest durchführen**:
   ```bash
   python check_installation.py
   ```

2. **Hilfeinformationen anzeigen**:
   ```bash
   python Airway/airway.py --help
   ```

3. **Datenkonvertierung starten**:
   Siehe [Nutzungshinweise](./usage.md) für die erste Datenkonvertierung

## 🔄 Aktualisierung und Upgrade

### Projektcode aktualisieren
```bash
# Falls Git verwendet wird
git pull origin main

# Oder die neueste Version erneut herunterladen
```

### Abhängigkeitspakete aktualisieren
```bash
# Virtuelle Umgebung aktivieren
source nav-data-env/bin/activate

# Alle Pakete aktualisieren
pip install --upgrade -r requirements.txt

# Oder bestimmte Pakete manuell aktualisieren
pip install --upgrade package_name
```

### Datenaktualisierung
Überprüfen und aktualisieren Sie regelmäßig die NAIP-Datenquellen, um die Aktualität der Navigationsdaten sicherzustellen.

---

**Installation abgeschlossen!** 🎉 Sie können jetzt Nav-data für die Konvertierung von Navigationsdaten verwenden. Bei Problemen lesen Sie bitte die [Fehlerbehebung](#常见安装问题) oder reichen Sie ein GitHub Issue ein.
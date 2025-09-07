# 🔧 TFDI Navigationsdatenkonverter Installationsanleitung

Diese Anleitung beschreibt detailliert, wie der TFDI Navigationsdatenkonverter installiert und konfiguriert wird, um sicherzustellen, dass Ihre Systemumgebung den Konverter reibungslos ausführen kann.

## 📋 Systemanforderungen

### 💻 Hardwareanforderungen
| Komponente   | Mindestanforderung         | Empfohlene Konfiguration   |
|--------------|----------------------------|----------------------------|
| **Prozessor**| Dual-Core 2.0GHz           | Quad-Core 3.0GHz+          |
| **Arbeitsspeicher**| 4GB RAM                    | 8GB+ RAM                   |
| **Speicherplatz**| 1GB verfügbarer Speicherplatz | 5GB+ verfügbarer Speicherplatz |
| **Netzwerk** | Nur für Downloads erforderlich | Stabile Netzwerkverbindung |

### 🖥️ Unterstützte Betriebssysteme
- **Windows**: Windows 10 (2004+) / Windows 11
- **macOS**: macOS 10.15 Catalina oder höher
- **Linux**: Ubuntu 18.04+, CentOS 8+, oder andere gängige Distributionen

### 🐍 Python-Umgebungsanforderungen
- **Python-Version**: 3.8.0 oder höher
- **Empfohlene Version**: Python 3.9.x oder 3.10.x
- **Paketmanager**: pip 21.0+ (wird normalerweise mit Python installiert)

## 🚀 Schnellinstallation

### Für Windows-Benutzer

#### 1️⃣ Python installieren

**Methode 1: Microsoft Store (Empfohlen)**
```bash
# 1. Microsoft Store öffnen
# 2. Nach "Python 3.10" suchen
# 3. Python 3.10 installieren (klicken)
# 4. Installation überprüfen
python --version
pip --version
```

**Methode 2: Download von der offiziellen Website**
```bash
# 1. Besuchen Sie https://www.python.org/downloads/windows/
# 2. Laden Sie Python 3.10.x (64-bit) herunter
# 3. Installationsprogramm ausführen
#    ✅ Häkchen setzen bei "Add Python to PATH"
#    ✅ Häkchen setzen bei "Install pip"
# 4. Installation überprüfen
python --version
```

#### 2️⃣ Konverter-Abhängigkeiten installieren

```bash
# Eingabeaufforderung oder PowerShell öffnen
# pip aktualisieren
python -m pip install --upgrade pip

# Erforderliche Abhängigkeiten installieren
pip install rich pandas py7zr

# Installation überprüfen
python -c "import rich, pandas, py7zr; print('✅ Alle Abhängigkeiten erfolgreich installiert!')"
```

#### 3️⃣ Konverter herunterladen

```bash
# Methode 1: Release-Paket herunterladen
# Besuchen Sie die GitHub Releases Seite, um die neueste Version herunterzuladen

# Methode 2: Quellcode klonen (Git erforderlich)
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Konverter überprüfen
python Fenix2TFDINavDataConverter.py --help
```

### Für macOS-Benutzer

#### 1️⃣ Python installieren

**Methode 1: Homebrew (Empfohlen)**
```bash
# Homebrew installieren (falls noch nicht geschehen)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python installieren
brew install python@3.10

# Installation überprüfen
python3 --version
pip3 --version

# Symbolischen Link erstellen (Optional)
ln -sf $(which python3) /usr/local/bin/python
ln -sf $(which pip3) /usr/local/bin/pip
```

**Methode 2: Download von der offiziellen Website**
```bash
# 1. Besuchen Sie https://www.python.org/downloads/macos/
# 2. Laden Sie Python 3.10.x für macOS herunter
# 3. .pkg-Datei installieren
# 4. Installation überprüfen
python3 --version
```

#### 2️⃣ Konverter-Abhängigkeiten installieren

```bash
# pip aktualisieren
python3 -m pip install --upgrade pip

# Abhängigkeiten installieren
pip3 install rich pandas py7zr

# Installation überprüfen
python3 -c "import rich, pandas, py7zr; print('✅ Abhängigkeiten erfolgreich installiert!')"
```

#### 3️⃣ Konverter herunterladen und einrichten

```bash
# Konverter herunterladen
curl -L -o tfdi-converter.zip https://github.com/your-org/tfdi-converter/archive/main.zip
unzip tfdi-converter.zip
cd tfdi-converter-main

# Oder Git verwenden
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Installation überprüfen
python3 Fenix2TFDINavDataConverter.py --version
```

### Für Linux-Benutzer

#### 1️⃣ Python installieren

**Ubuntu/Debian:**
```bash
# Paketlisten aktualisieren
sudo apt update

# Python 3.10 und verwandte Tools installieren
sudo apt install python3.10 python3.10-pip python3.10-venv python3.10-dev

# build-essential installieren (einige Pakete erfordern Kompilierung)
sudo apt install build-essential

# Symbolische Links erstellen
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3.10 1

# Installation überprüfen
python --version
pip --version
```

**CentOS/RHEL 8+:**
```bash
# PowerTools-Repository aktivieren
sudo dnf config-manager --set-enabled powertools

# Python 3.10 installieren
sudo dnf install python3.10 python3.10-pip python3.10-devel

# Entwicklungstools installieren
sudo dnf groupinstall "Development Tools"

# Installation überprüfen
python3.10 --version
pip3.10 --version
```

**Arch Linux:**
```bash
# Python installieren
sudo pacman -S python python-pip

# Entwicklungstools installieren
sudo pacman -S base-devel

# Installation überprüfen
python --version
pip --version
```

#### 2️⃣ Konverter-Abhängigkeiten installieren

```bash
# pip aktualisieren
python -m pip install --upgrade pip

# Abhängigkeiten installieren
pip install rich pandas py7zr

# Bei Berechtigungsproblemen Benutzerinstallation verwenden
pip install --user rich pandas py7zr

# Installation überprüfen
python -c "import rich, pandas, py7zr; print('✅ Abhängigkeiten erfolgreich installiert!')"
```

#### 3️⃣ Konverter herunterladen

```bash
# Mit wget herunterladen
wget https://github.com/your-org/tfdi-converter/archive/main.zip
unzip main.zip
cd tfdi-converter-main

# Oder Git verwenden
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Ausführungsberechtigungen festlegen
chmod +x Fenix2TFDINavDataConverter.py

# Installation überprüfen
python Fenix2TFDINavDataConverter.py --version
```

## 📦 Detaillierte Abhängigkeitsbeschreibung

### Kern-Abhängigkeitspakete

| Paketname | Versionsanforderung | Zweck                          | Installationsbefehl |
|-----------|---------------------|--------------------------------|---------------------|
| **rich**  | ≥ 12.0.0            | Moderne CLI-Oberfläche         | `pip install rich`  |
| **pandas**| ≥ 1.3.0             | Datenverarbeitung und -analyse | `pip install pandas`|
| **py7zr** | ≥ 0.18.0            | Verarbeitung von 7z-Archiven   | `pip install py7zr` |

### Standardbibliotheks-Abhängigkeiten (keine zusätzliche Installation erforderlich)

| Modul                | Zweck                        |
|----------------------|------------------------------|
| **sqlite3**          | SQLite-Datenbankzugriff      |
| **json**             | JSON-Datenserialisierung     |
| **pathlib**          | Dateipfadverarbeitung        |
| **logging**          | Protokollierung              |
| **dataclasses**      | Datenklassen-Unterstützung   |
| **concurrent.futures** | Parallelverarbeitung         |

### Optionale Abhängigkeiten

```bash
# Entwicklungsbezogene Abhängigkeiten (nur für Entwickler)
pip install pytest flake8 mypy black pre-commit

# Abhängigkeiten für die Leistungsüberwachung
pip install psutil

# Fortschrittsanzeige-Verbesserung
pip install tqdm
```

## 🔍 Installationsverifizierung

### Vollständiges Verifizierungsskript

Erstellen Sie das Verifizierungsskript `verify_tfdi_installation.py`:

```python
#!/usr/bin/env python3
"""
TFDI Navigationsdatenkonverter Installationsverifizierungs-Skript
Überprüft die Systemumgebung, Abhängigkeitspakete und Konverterfunktionen
"""

import sys
import importlib
import platform
from pathlib import Path

def check_python_version():
    """Überprüft die Python-Version"""
    version = sys.version_info
    print(f"🐍 Python-Version: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python-Version entspricht den Anforderungen (>= 3.8)")
        return True
    else:
        print("❌ Python-Version ist zu alt, benötigt 3.8 oder höher")
        print("   Bitte aktualisieren Sie Python und versuchen Sie es erneut")
        return False

def check_dependencies():
    """Überprüft erforderliche Abhängigkeitspakete"""
    required_packages = {
        'rich': 'Moderne CLI-Oberfläche',
        'pandas': 'Datenverarbeitungsbibliothek',
        'py7zr': '7z-Komprimierungsverarbeitung'
    }
    
    print("\n📦 Paketabhängigkeiten prüfen:")
    all_ok = True
    
    for package, description in required_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"❌ {package:<10} Nicht installiert        ({description})")
            all_ok = False
        except Exception as e:
            print(f"⚠️ {package:<10} Fehler: {e}")
            all_ok = False
    
    return all_ok

def check_optional_dependencies():
    """Überprüft optionale Abhängigkeiten"""
    optional_packages = {
        'psutil': 'Systemüberwachung',
        'tqdm': 'Fortschrittsanzeige-Verbesserung'
    }
    
    print("\n🔧 Optionale Abhängigkeiten prüfen:")
    for package, description in optional_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"⚪ {package:<10} Nicht installiert        ({description}) - Optional")

def check_system_resources():
    """Überprüft Systemressourcen"""
    print("\n💾 Systemressourcen prüfen:")
    
    try:
        import psutil
        
        # Arbeitsspeicher prüfen
        memory = psutil.virtual_memory()
        memory_gb = memory.total // (1024**3)
        print(f"💿 Gesamtarbeitsspeicher: {memory_gb} GB")
        
        if memory_gb >= 4:
            print("✅ Arbeitsspeicher ausreichend (>= 4GB)")
        else:
            print("⚠️ Arbeitsspeicher möglicherweise nicht ausreichend, 4GB+ empfohlen")
        
        # Festplattenspeicher prüfen
        disk = psutil.disk_usage('.')
        free_gb = disk.free // (1024**3)
        print(f"💿 Verfügbarer Festplattenspeicher: {free_gb} GB")
        
        if free_gb >= 1:
            print("✅ Festplattenspeicher ausreichend (>= 1GB)")
        else:
            print("⚠️ Festplattenspeicher nicht ausreichend, mindestens 1GB erforderlich")
            
    except ImportError:
        print("⚪ Systemressourcen können nicht geprüft werden (psutil nicht installiert)")

def check_converter_accessibility():
    """Überprüft die Dateizugänglichkeit des Konverters"""
    print("\n🔧 Konverterdateien prüfen:")
    
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
            print(f"⚠️ {file_name:<35} Datei nicht vorhanden")

def test_basic_functionality():
    """Testet grundlegende Funktionen"""
    print("\n🧪 Grundfunktionen testen:")
    
    try:
        # Rich-Oberflächen-Test
        from rich.console import Console
        console = Console()
        console.print("✅ Rich-Oberflächen-Test", style="green")
        
        # Pandas-Datenverarbeitungs-Test
        import pandas as pd
        df = pd.DataFrame({'test': [1, 2, 3]})
        assert len(df) == 3
        print("✅ Pandas-Datenverarbeitungstest erfolgreich")
        
        # py7zr-Komprimierungsfunktionstest
        import py7zr
        print("✅ py7zr-Komprimierungsfunktion verfügbar")
        
        # SQLite-Verbindungstest
        import sqlite3
        conn = sqlite3.connect(':memory:')
        conn.close()
        print("✅ SQLite-Datenbankverbindungstest erfolgreich")
        
        return True
        
    except Exception as e:
        print(f"❌ Funktionstest fehlgeschlagen: {e}")
        return False

def main():
    """Hauptverifizierungsfunktion"""
    print("🔍 TFDI Navigationsdatenkonverter Installationsverifizierung")
    print("=" * 60)
    
    # Prüfpunkliste
    checks = [
        ("Python-Version", check_python_version),
        ("Erforderliche Abhängigkeiten", check_dependencies),
        ("Optionale Abhängigkeiten", check_optional_dependencies),
        ("Systemressourcen", check_system_resources),
        ("Konverterdateien", check_converter_accessibility),
        ("Grundfunktionen", test_basic_functionality),
    ]
    
    all_passed = True
    critical_passed = True
    
    for name, check_func in checks:
        try:
            result = check_func()
            if name in ["Python-Version", "Erforderliche Abhängigkeiten", "Grundfunktionen"]:
                if not result:
                    critical_passed = False
                    all_passed = False
            elif result is False:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} Prüfung fehlgeschlagen: {e}")
            if name in ["Python-Version", "Erforderliche Abhängigkeiten"]:
                critical_passed = False
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if critical_passed:
        if all_passed:
            print("🎉 Alle Prüfungen erfolgreich! Der Konverter kann normal verwendet werden.")
            print("\n📝 Nächste Schritte:")
            print("   1. Fenix Navigationsdatenbankdatei (nd.db3) vorbereiten")
            print("   2. Konverter ausführen: python Fenix2TFDINavDataConverter.py")
            return 0
        else:
            print("✅ Kernfunktionen sind verfügbar, einige optionale Funktionen können eingeschränkt sein.")
            print("   Der Konverter kann normal verwendet werden, es wird jedoch empfohlen, fehlende optionale Abhängigkeiten zu installieren.")
            return 0
    else:
        print("❌ Kritische Prüfungen fehlgeschlagen. Bitte beheben Sie die oben genannten Probleme und versuchen Sie es erneut.")
        print("\n🔧 Häufige Lösungen:")
        print("   • Python-Version aktualisieren: https://python.org/downloads")
        print("   • Abhängigkeiten installieren: pip install rich pandas py7zr")
        print("   • Netzwerkverbindung und Berechtigungen überprüfen")
        return 1

if __name__ == "__main__":
    exit(main())
```

Verifizierungsskript ausführen:
```bash
python verify_tfdi_installation.py
```

### Schnelle Verifizierungsbefehle

```bash
# 1. Python-Version überprüfen
python --version

# 2. pip-Version überprüfen  
pip --version

# 3. Kern-Abhängigkeiten überprüfen
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import py7zr; print(f'py7zr: {py7zr.__version__}')"

# 4. Rich-Oberfläche testen
python -c "from rich.console import Console; Console().print('🎉 Rich-Test erfolgreich!', style='bold green')"

# 5. Konverterstart testen
python Fenix2TFDINavDataConverter.py --version
```

## 🔧 Häufige Installationsprobleme

### Problem 1: Python-Version zu alt

**Symptom:**
```
SyntaxError: invalid syntax (verwendet neue Syntaxmerkmale)
TypeError: 'type' object is not subscriptable
```

**Lösung:**
```bash
# Aktuelle Version überprüfen
python --version

# Wenn Version < 3.8, ist ein Upgrade erforderlich
# Windows: Neue Version von python.org herunterladen
# macOS: brew upgrade python  
# Linux: Siehe obige Installationsanleitung für Updates
```

### Problem 2: pip-Installation fehlgeschlagen

**Symptom:**
```
ERROR: Could not find a version that satisfies the requirement
WARNING: Retrying... Connection broken
```

**Lösung:**
```bash
# pip aktualisieren
python -m pip install --upgrade pip

# Nationalen Spiegelserver verwenden
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas py7zr

# Cache leeren und erneut versuchen
pip cache purge
pip install rich pandas py7zr

# Netzwerkverbindung überprüfen
ping pypi.org
```

### Problem 3: Berechtigungsfehler

**Symptom:**
```
PermissionError: [Errno 13] Permission denied
Could not install packages due to an PermissionError
```

**Lösung:**
```bash
# Windows: Als Administrator ausführen
# Rechtsklick auf die Eingabeaufforderung → "Als Administrator ausführen"

# macOS/Linux: Benutzerinstallation verwenden
pip install --user rich pandas py7zr

# Oder sudo verwenden (nicht empfohlen)
sudo pip install rich pandas py7zr
```

### Problem 4: Kompilierungsfehler

**Symptom:**
```
error: Microsoft Visual C++ 14.0 is required
error: building wheel for package failed
```

**Lösung:**

**Windows:**
```bash
# Microsoft C++ Build Tools installieren
# Besuchen Sie: https://visualstudio.microsoft.com/visual-cpp-build-tools/
# Laden Sie "Build Tools for Visual Studio" herunter und installieren Sie es

# Oder vorkompilierte Pakete verwenden
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

### Problem 5: Abhängigkeitskonflikte

**Symptom:**
```
ERROR: pip's dependency resolver does not currently support multiple versions
```

**Lösung:**
```bash
# Virtuelle Umgebung erstellen
python -m venv tfdi_env

# Virtuelle Umgebung aktivieren
# Windows:
tfdi_env\Scripts\activate
# macOS/Linux:
source tfdi_env/bin/activate

# In virtueller Umgebung installieren
pip install rich pandas py7zr

# Installation überprüfen
python -c "import rich, pandas, py7zr; print('Installation erfolgreich!')"
```

## 🎯 Weitere Installationsschritte

### 1. Umgebungskonfiguration

#### Windows-Umgebungsvariablen (Optional)
```batch
# Python Scripts-Verzeichnis zu PATH hinzufügen
set PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\Python\Python310\Scripts

# Konverter-Verzeichnis festlegen
set TFDI_CONVERTER_HOME=C:\Users\%USERNAME%\tfdi-converter
```

#### macOS-/Linux-Umgebungsvariablen (Optional)
```bash
# Zu ~/.bashrc oder ~/.zshrc hinzufügen
export TFDI_CONVERTER_HOME="$HOME/tfdi-converter"
export PATH="$PATH:$TFDI_CONVERTER_HOME"

# Konfiguration neu laden
source ~/.bashrc  # oder source ~/.zshrc
```

### 2. Datendateien vorbereiten

```bash
# Fenix-Datenbankpfad überprüfen
# Häufiger Windows-Pfad:
dir "%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320" /s | findstr nd.db3

# macOS/Linux:
find ~ -name "nd.db3" 2>/dev/null
```

### 3. Arbeitsverzeichnis erstellen

```bash
# Dediziertes Arbeitsverzeichnis erstellen
mkdir ~/tfdi-conversion-workspace
cd ~/tfdi-conversion-workspace

# Unterverzeichnisse erstellen
mkdir input output logs backups

# Konverter in das Arbeitsverzeichnis kopieren (Optional)
cp /path/to/Fenix2TFDINavDataConverter.py .
```

### 4. Erster Lauftest

```bash
# Konverter-Hilfe ausführen
python Fenix2TFDINavDataConverter.py --help

# Basistest ausführen (falls Testdaten vorhanden)
python Fenix2TFDINavDataConverter.py --test

# Versionsinformationen anzeigen
python Fenix2TFDINavDataConverter.py --version
```

## 📚 Nächste Schritte

Nach der Installation lesen Sie bitte weiter:

1.  **[Konfigurationsanleitung](configuration.md)** - Erfahren Sie mehr über die Konfigurationsoptionen des Konverters
2.  **[Bedienungsanleitung](usage.md)** - Starten Sie Ihre erste Datenkonvertierung
3.  **[Fehlerbehebung](../troubleshooting.md)** - Zurate ziehen, wenn Probleme auftreten

### Schnellstart-Checkliste

- [ ] ✅ Python 3.8+ installiert
- [ ] ✅ Erforderliche Abhängigkeiten installiert (rich, pandas, py7zr)
- [ ] ✅ Konverterdateien heruntergeladen
- [ ] ✅ Installationsprüfung bestanden
- [ ] ✅ Fenix-Datenbankdatei vorbereitet
- [ ] ✅ TFDI MD-11 in MSFS installiert

---

**Installation abgeschlossen!** 🎉 

Sie können jetzt den TFDI Navigationsdatenkonverter verwenden. Sollten Probleme auftreten, konsultieren Sie bitte die [Fehlerbehebung](../troubleshooting.md) oder suchen Sie Hilfe in den GitHub Issues. 🚁✨
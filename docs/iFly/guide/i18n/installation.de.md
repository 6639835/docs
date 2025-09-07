# 🔧 iFly Navigationsdatenkonverter Installationsanleitung

Diese Anleitung führt Sie durch den vollständigen Installationsprozess des iFly Navigationsdatenkonverters, um sicherzustellen, dass Ihre Systemumgebung korrekt konfiguriert ist und alle Abhängigkeiten installiert wurden.

## 📋 Systemanforderungen

### 💻 Hardwareanforderungen
| Komponente | Mindestanforderungen | Empfohlene Konfiguration |
|------------|----------------------|--------------------------|
| **Prozessor** | Dual-Core 2.0GHz | Quad-Core 3.0GHz+ |
| **Arbeitsspeicher** | 4GB RAM | 8GB+ RAM |
| **Speicher** | 500MB freier Speicherplatz | 2GB+ freier Speicherplatz |
| **Netzwerk** | Keine Netzwerkverbindung erforderlich | Zum Herunterladen von Abhängigkeiten erforderlich |

### 🖥️ Betriebssystemunterstützung
- **Windows**: Windows 10 (1909+) / Windows 11
- **macOS**: macOS 10.15 Catalina oder höher
- **Linux**: Ubuntu 18.04+, CentOS 7+ oder andere gängige Distributionen

### 🐍 Python Umgebungsanforderungen
- **Python Version**: 3.8.0 oder höher
- **Empfohlene Version**: Python 3.9.x oder 3.10.x
- **Paketmanager**: pip 21.0+ (wird normalerweise mit Python installiert)

## 🚀 Schnellinstallation

### Windows-Benutzer

#### 1️⃣ Python installieren

**Methode 1: Vom Offiziellen Website herunterladen (empfohlen)**
```bash
# 1. Besuchen Sie https://www.python.org/downloads/
# 2. Laden Sie die neueste Python 3.9+ Version herunter
# 3. Führen Sie das Installationsprogramm aus und stellen Sie sicher, dass "Add Python to PATH" angekreuzt ist
# 4. Installation überprüfen
python --version
pip --version
```

**Methode 2: Microsoft Store verwenden**
```bash
# 1. Öffnen Sie den Microsoft Store
# 2. Suchen Sie nach "Python 3.9" oder "Python 3.10"
# 3. Klicken Sie auf Installieren
# 4. Installation überprüfen
python --version
```

#### 2️⃣ Konverter-Abhängigkeiten installieren

```bash
# Öffnen Sie die Eingabeaufforderung oder PowerShell
# Alle erforderlichen Abhängigkeiten installieren
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# Installation überprüfen
python -c "import rich, pandas, pygeomag; print('Abhängigkeiten erfolgreich installiert!')"
```

### macOS-Benutzer

#### 1️⃣ Python installieren

**Methode 1: Homebrew verwenden (empfohlen)**
```bash
# Homebrew installieren (falls noch nicht installiert)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python installieren
brew install python@3.9

# Installation überprüfen
python3 --version
pip3 --version
```

**Methode 2: Vom Offiziellen Website herunterladen**
```bash
# 1. Besuchen Sie https://www.python.org/downloads/macos/
# 2. Laden Sie das Python-Installationspaket für macOS herunter
# 3. Führen Sie die .pkg-Datei zur Installation aus
# 4. Installation überprüfen
python3 --version
```

#### 2️⃣ Konverter-Abhängigkeiten installieren

```bash
# Abhängigkeiten mit pip3 installieren
pip3 install rich pathlib typing pygeomag pandas tqdm geographiclib

# Installation überprüfen
python3 -c "import rich, pandas, pygeomag; print('Abhängigkeiten erfolgreich installiert!')"
```

### Linux-Benutzer

#### 1️⃣ Python installieren

**Ubuntu/Debian:**
```bash
# Paketliste aktualisieren
sudo apt update

# Python 3.9 und pip installieren
sudo apt install python3.9 python3.9-pip python3.9-dev

# Symbolischen Link erstellen (optional)
sudo ln -sf /usr/bin/python3.9 /usr/bin/python
sudo ln -sf /usr/bin/pip3.9 /usr/bin/pip

# Installation überprüfen
python --version
pip --version
```

**CentOS/RHEL:**
```bash
# EPEL-Repository installieren
sudo yum install epel-release

# Python 3.9 installieren
sudo yum install python39 python39-pip

# Installation überprüfen
python3.9 --version
pip3.9 --version
```

**Arch Linux:**
```bash
# Python und pip installieren
sudo pacman -S python python-pip

# Installation überprüfen
python --version
pip --version
```

#### 2️⃣ Konverter-Abhängigkeiten installieren

```bash
# Abhängigkeitspakete installieren
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# Bei Berechtigungsproblemen Benutzerinstallation verwenden
pip install --user rich pathlib typing pygeomag pandas tqdm geographiclib

# Installation überprüfen
python -c "import rich, pandas, pygeomag; print('Abhängigkeiten erfolgreich installiert!')"
```

## 📦 Detaillierte Abhängigkeitsbeschreibung

### Kern-Abhängigkeitspakete

| Paketname | Versionsanforderung | Zweck | Lizenz |
|-----------|---------------------|-------|--------|
| **rich** | ≥ 12.0.0 | Modernes CLI-Interface | MIT |
| **pandas** | ≥ 1.3.0 | Datenverarbeitung und -analyse | BSD-3 |
| **pygeomag** | ≥ 0.4.2 | Berechnung der magnetischen Deklination | MIT |
| **tqdm** | ≥ 4.60.0 | Fortschrittsanzeige | MPL-2.0 |
| **geographiclib** | ≥ 1.52 | Berechnung geographischer Koordinaten | MIT |

### Standardbibliotheks-Abhängigkeiten (keine Installation erforderlich)

| Modul | Zweck |
|-------|-------|
| **pathlib** | Dateipfadverarbeitung |
| **typing** | Typisierungsunterstützung |
| **sqlite3** | SQLite-Datenbankzugriff |
| **csv** | CSV-Dateiverarbeitung |
| **datetime** | Datum- und Zeitverarbeitung |
| **logging** | Protokollierung |

## 🔍 Installationsprüfung

### Vollständiges Prüfskript

Erstellen Sie ein Prüfskript namens `verify_installation.py`:

```python
#!/usr/bin/env python3
"""
iFly Navigationsdatenkonverter Installationsprüfskript
"""

import sys
import importlib
from pathlib import Path

def check_python_version():
    """Python Version prüfen"""
    version = sys.version_info
    print(f"🐍 Python Version: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python Version entspricht den Anforderungen")
        return True
    else:
        print("❌ Python Version zu alt, 3.8 oder höher erforderlich")
        return False

def check_dependencies():
    """Abhängigkeitspakete prüfen"""
    dependencies = [
        'rich',
        'pandas', 
        'pygeomag',
        'tqdm',
        'geographiclib'
    ]
    
    all_ok = True
    print("\n📦 Abhängigkeitspakete prüfen:")
    
    for dep in dependencies:
        try:
            module = importlib.import_module(dep)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {dep}: {version}")
        except ImportError:
            print(f"❌ {dep}: Nicht installiert")
            all_ok = False
    
    return all_ok

def check_system_resources():
    """Systemressourcen prüfen"""
    import shutil
    
    print("\n💾 Systemressourcen prüfen:")
    
    # Festplattenspeicher prüfen
    total, used, free = shutil.disk_usage(Path.home())
    free_gb = free // (1024**3)
    print(f"📁 Verfügbarer Speicherplatz: {free_gb} GB")
    
    if free_gb >= 1:
        print("✅ Genügend Speicherplatz vorhanden")
        disk_ok = True
    else:
        print("⚠️ Nicht genügend Speicherplatz, mindestens 1GB empfohlen")
        disk_ok = False
    
    return disk_ok

def main():
    """Hauptprüffunktion"""
    print("🔍 iFly Navigationsdatenkonverter Installationsprüfung")
    print("=" * 50)
    
    # Prüfpunkte
    checks = [
        ("Python Version", check_python_version),
        ("Abhängigkeitspakete", check_dependencies),
        ("Systemressourcen", check_system_resources),
    ]
    
    all_passed = True
    for name, check_func in checks:
        try:
            result = check_func()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} Prüfung fehlgeschlagen: {e}")
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 Alle Prüfungen bestanden! Sie können den Konverter nun verwenden.")
        return 0
    else:
        print("⚠️ Einige Prüfungen nicht bestanden, bitte lösen Sie die Probleme gemäß den obigen Anweisungen.")
        return 1

if __name__ == "__main__":
    exit(main())
```

Führen Sie das Prüfskript aus:
```bash
python verify_installation.py
```

### Manuelle Prüfschritte

```bash
# 1. Python-Version prüfen
python --version

# 2. pip-Version prüfen
pip --version

# 3. Kern-Abhängigkeiten überprüfen
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import pygeomag; print('PyGeoMag: OK')"

# 4. Rich-Interface testen
python -c "from rich.console import Console; Console().print('Hello, World!', style='bold green')"

# 5. Berechnung der magnetischen Deklination testen
python -c "from pygeomag import GeoMag; gm = GeoMag(); print(f'Magnetische Deklination OK: {gm.GeoMag(39.9, 116.4, 0, 2024)}')"
```

## 🔧 Häufige Installationsprobleme

### Problem 1: Python-Version zu alt

**Symptom:**
```
SyntaxError: invalid syntax
```

**Lösung:**
```bash
# Aktuelle Version prüfen
python --version

# Falls Version < 3.8, bitte aktualisieren
# Windows: Neue Version von python.org herunterladen
# macOS: brew upgrade python
# Linux: Siehe obige Installationsanleitung
```

### Problem 2: pip-Installation fehlgeschlagen

**Symptom:**
```
ERROR: Could not find a version that satisfies the requirement
```

**Lösung:**
```bash
# pip aktualisieren
python -m pip install --upgrade pip

# Nationalen Mirror-Server verwenden
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Cache leeren und erneut versuchen
pip cache purge
pip install rich pandas pygeomag tqdm geographiclib
```

### Problem 3: Berechtigungsfehler

**Symptom:**
```
PermissionError: [Errno 13] Permission denied
```

**Lösung:**
```bash
# Windows: Eingabeaufforderung als Administrator ausführen
# macOS/Linux: Benutzerinstallation verwenden
pip install --user rich pandas pygeomag tqdm geographiclib

# Oder sudo verwenden (nicht empfohlen)
sudo pip install rich pandas pygeomag tqdm geographiclib
```

### Problem 4: Netzwerkverbindungsprobleme

**Symptom:**
```
WARNING: Retrying... Connection broken
```

**Lösung:**
```bash
# Nationalen Mirror-Server verwenden
pip install -i https://mirrors.aliyun.com/pypi/simple/ rich pandas pygeomag tqdm geographiclib

# Oder Tsinghua-Mirror-Server
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Dauerhaften Mirror-Server konfigurieren
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 🎯 Nächste Schritte nach der Installation

### 1. Erforderliche Dateien vorbereiten
- **Fenix-Datenbank**: `nd.db3`-Datei beschaffen
- **NAIP-Daten**: `RTE_SEG.csv`-Flugplandaten herunterladen
- **iFly-Installation**: Überprüfen Sie, ob iFly 737 MAX 8 installiert ist

### 2. Arbeitsverzeichnis erstellen
```bash
# Spezielles Verzeichnis erstellen
mkdir ~/ifly-converter
cd ~/ifly-converter

# Konverter-Skript herunterladen
# (main.py aus dem Projekt-Repository beziehen)
```

### 3. Ersten Test durchführen
```bash
# Konverter ausführen
python main.py

# Den Anweisungen auf der Benutzeroberfläche folgen
```

## 📚 Nächste Schritte

Nach der Installation fahren Sie bitte fort mit:

1. **[Konfigurationsbeschreibung](configuration.md)** - Erfahren Sie mehr über detaillierte Konfigurationsoptionen
2. **[Nutzungsanleitung](usage.md)** - Starten Sie Ihre erste Datenkonvertierung
3. **[Fehlerbehebung](../troubleshooting.md)** - Informationen bei Problemen

---

**Installation abgeschlossen!** 🎉 Sie können den iFly Navigationsdatenkonverter nun verwenden. Sollten Sie auf Probleme stoßen, lesen Sie bitte die [Anleitung zur Fehlerbehebung](../troubleshooting.md) oder suchen Sie Hilfe in den GitHub Issues.
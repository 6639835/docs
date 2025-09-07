# 📥 Installationsanleitung

Diese Anleitung beschreibt detailliert, wie das Nav-data Navigationsdaten-Konvertierungstool auf verschiedenen Betriebssystemen installiert und konfiguriert wird.

## 🔧 Systemanforderungen

### Mindestanforderungen
- **Python**: 3.8 oder höher
- **Arbeitsspeicher**: 4 GB RAM
- **Speicherplatz**: 2 GB freier Speicherplatz
- **Netzwerk**: Stabile Internetverbindung (zum Herunterladen von Abhängigkeiten)

### Empfohlene Konfiguration
- **Python**: 3.9+ (3.11 empfohlen)
- **Arbeitsspeicher**: 8 GB RAM oder mehr
- **Speicherplatz**: 5 GB freier Speicherplatz
- **Prozessor**: Mehrkern-CPU (für parallele Verarbeitung)

### Unterstützte Betriebssysteme
- **Windows**: Windows 10/11 (64-Bit)
- **macOS**: macOS 10.15 Catalina oder höher
- **Linux**: Ubuntu 18.04+, CentOS 7+ oder andere kompatible Distributionen

## 📋 Vorbereitung

### 1. Python installieren

#### Windows
1.  Besuchen Sie die [offizielle Python-Webseite](https://www.python.org/downloads/windows/)
2.  Laden Sie die neueste Python 3.11.x-Version herunter
3.  Führen Sie das Installationsprogramm aus und stellen Sie sicher, dass "Add Python to PATH" aktiviert ist
4.  Installation überprüfen:
    ```cmd
    python --version
    pip --version
    ```

#### macOS
Homebrew verwenden (empfohlen):
```bash
# Homebrew installieren (falls noch nicht installiert)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python installieren
brew install python@3.11

# Installation überprüfen
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# Paketmanager aktualisieren
sudo apt update

# Python und pip installieren
sudo apt install python3.11 python3.11-pip python3.11-venv

# Installation überprüfen
python3.11 --version
pip3.11 --version
```

### 2. Projektcode abrufen

#### Methode A: Mit Git (empfohlen)
```bash
# Repository klonen
git clone https://github.com/Nav-data/docs.git

# In das Projektverzeichnis wechseln
cd docs
```

#### Methode B: ZIP-Archiv herunterladen
1.  Besuchen Sie die GitHub-Repository-Seite
2.  Klicken Sie auf "Code" > "Download ZIP"
3.  Entpacken Sie das Archiv in das Zielverzeichnis

## 🐍 Python-Umgebungskonfiguration

### 1. Virtuelle Umgebung erstellen

#### Windows
```cmd
# In das Projektverzeichnis wechseln
cd Nav-data

# Virtuelle Umgebung erstellen
python -m venv nav-data-env

# Virtuelle Umgebung aktivieren
nav-data-env\Scripts\activate

# Virtuelle Umgebung überprüfen
where python
```

#### macOS/Linux
```bash
# In das Projektverzeichnis wechseln
cd Nav-data

# Virtuelle Umgebung erstellen
python3 -m venv nav-data-env

# Virtuelle Umgebung aktivieren
source nav-data-env/bin/activate

# Virtuelle Umgebung überprüfen
which python
```

### 2. Projektabhängigkeiten installieren

```bash
# Sicherstellen, dass die virtuelle Umgebung aktiviert ist
# pip aktualisieren
pip install --upgrade pip

# Projektabhängigkeiten installieren
pip install -r requirements.txt
```

### 3. Installation der Abhängigkeiten überprüfen

```python
# Python ausführen und Importe testen
python -c "
import pandas as pd
import sqlite3
import pygeomag
import tqdm
import chardet
print('Alle Abhängigkeitspakete erfolgreich installiert!')
"
```

## 📁 Datenquellenkonfiguration

### 1. Datenverzeichnisstruktur erstellen

```bash
# Datenverzeichnisse erstellen
mkdir -p data/input/{naip,xplane,cifp}
mkdir -p data/output
mkdir -p logs
```

Die Verzeichnisstruktur sollte wie folgt aussehen:
```
Nav-data/
├── data/
│   ├── input/
│   │   ├── naip/          # NAIP CSV-Datendateien
│   │   ├── xplane/        # X-Plane DAT-Dateien
│   │   └── cifp/          # CIFP Prozedurdatendateien
│   └── output/            # Generierte Datenbankdateien
├── logs/                  # Protokolldateien
└── ...
```

### 2. Dateipfade konfigurieren

Beispielkonfigurationsdatei kopieren und bearbeiten (optional):
```bash
# Beispielkonfigurationsdatei kopieren
cp config/paths.example.py config/paths.py

# Konfigurationsdatei bearbeiten
nano config/paths.py  # Linux/macOS
notepad config/paths.py  # Windows
```

## 🛠️ Microsoft Flight Simulator Konfiguration

### 1. MSFS Community-Ordner finden

#### Microsoft Store-Version
```
C:\Users\[Benutzername]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### Steam-Version
```
C:\Users\[Benutzername]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

#### Xbox Game Pass-Version
```
C:\Users\[Benutzername]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

### 2. PMDG-Flugzeuginstallation überprüfen

Bestätigen Sie, dass die folgenden Verzeichnisse existieren:
```
[Community-Ordner]/
├── pmdg-aircraft-737/     # PMDG 737
├── pmdg-aircraft-738/     # PMDG 737-800
├── pmdg-aircraft-77w/     # PMDG 777-300ER
└── ...
```

### 3. Originale Navigationsdaten sichern

```bash
# Originaldaten für jedes PMDG-Flugzeug sichern
# Beispiel: PMDG 737-800
cd "C:\Users\[Benutzername]\...\Community\pmdg-aircraft-738\Config"
rename Navdata Navdata_backup_original
```

## ✅ Installationsüberprüfung

### 1. Grundlegende Tests ausführen

```bash
# Virtuelle Umgebung aktivieren
source nav-data-env/bin/activate  # macOS/Linux
# oder nav-data-env\Scripts\activate  # Windows

# Grundlegende Tests ausführen
python -c "
import sys
print(f'Python-Version: {sys.version}')

# Schlüsselabhängigkeiten testen
import pandas as pd
print(f'Pandas-Version: {pd.__version__}')

import sqlite3
print('SQLite3: Verfügbar')

import pygeomag
print('PyGeoMag: Verfügbar')

print('✅ Alle Komponenten erfolgreich installiert!')
"
```

### 2. Datenbankerstellung überprüfen

```bash
# Datenbankerstellungsfunktion testen
python -c "
import sqlite3
import os

# Testdatenbank erstellen
test_db = 'data/output/test.s3db'
os.makedirs(os.path.dirname(test_db), exist_ok=True)

conn = sqlite3.connect(test_db)
cursor = conn.cursor()
cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY)')
conn.close()

print('✅ Datenbankerstellungsfunktion funktioniert einwandfrei')
os.remove(test_db)
"
```

### 3. Dateiberechtigungen überprüfen

#### Windows
Stellen Sie Schreibberechtigungen für die folgenden Verzeichnisse sicher:
-   Projektverzeichnis und Unterverzeichnisse
-   MSFS Community-Ordner
-   MSFS Cache-Verzeichnis

#### macOS/Linux
```bash
# Berechtigungen des Projektverzeichnisses überprüfen
ls -la Nav-data/

# Falls Berechtigungen geändert werden müssen
chmod -R 755 Nav-data/
```

## 🔍 Fehlerbehebung

### Häufige Probleme und Lösungen

#### 1. Inkompatible Python-Version
**Problem**: "python: command not found" oder Version zu alt
**Lösung**: 
-   Bestätigen Sie, dass Python 3.8+ korrekt installiert ist
-   Auf einigen Systemen `python3` anstelle von `python` verwenden

#### 2. pip-Installation der Abhängigkeiten fehlgeschlagen
**Problem**: Kompilierungsfehler bei der Installation von Abhängigkeiten
**Lösung**:
```bash
# Build-Tools aktualisieren
pip install --upgrade pip setuptools wheel

# Für Probleme mit bestimmten Paketen
pip install --no-cache-dir --force-reinstall [Paketname]
```

#### 3. pygeomag Installationsproblem
**Problem**: pygeomag Kompilierung fehlgeschlagen
**Lösung**:
```bash
# Windows: Microsoft C++ Build Tools installieren
# macOS: Xcode Command Line Tools installieren
xcode-select --install

# Linux: Kompilierungsabhängigkeiten installieren
sudo apt install build-essential python3-dev
```

#### 4. Berechtigungsprobleme
**Problem**: Kann nicht in das MSFS-Verzeichnis schreiben
**Lösung**:
-   Als Administrator ausführen (Windows)
-   Verzeichnisberechtigungen überprüfen (macOS/Linux)
-   Echtzeitschutz der Antivirensoftware vorübergehend deaktivieren

#### 5. Nicht genügend Arbeitsspeicher
**Problem**: Nicht genügend Arbeitsspeicher beim Verarbeiten großer Datendateien
**Lösung**:
-   Virtuellen Speicher/Auslagerungsdatei erhöhen
-   Andere Anwendungen schließen
-   Datendateien stapelweise verarbeiten

### Speicherort der Protokolldateien

Bei Problemen überprüfen Sie bitte die folgenden Protokolle:
-   `logs/PMDG_*.log` - Verarbeitungslogs für jedes Modul
-   `logs/db_validation.log` - Datenbankvalidierungslogs
-   `data/output/missing_airports_data.txt` - Aufzeichnungen fehlender Daten

## 📞 Hilfe erhalten

Sollten während der Installation Probleme auftreten:

1.  **Fehlermeldungen überprüfen** - Lesen Sie die Fehlermeldungen in der Terminalausgabe sorgfältig durch
2.  **Systemanforderungen überprüfen** - Bestätigen Sie, dass das System die Mindestanforderungen erfüllt
3.  **Dokumentation konsultieren** - Beziehen Sie sich auf den Abschnitt zur Fehlerbehebung in diesem Handbuch
4.  **Ein Issue einreichen** - Reichen Sie einen detaillierten Problembericht im GitHub-Repository ein

---

**Nächster Schritt**: Lesen Sie weiter in den [Konfigurationsanweisungen](configuration.md), um zu erfahren, wie Sie Datenquellen konfigurieren.
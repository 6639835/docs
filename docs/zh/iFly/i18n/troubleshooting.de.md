# 🛠️ iFly Navigationsdatenkonverter Fehlerbehebung

## 🚨 Häufige Fehler und Lösungen

### 1. Installations- und Umgebungsprobleme

#### ❌ Inkompatible Python-Version

**Fehlermeldung:**
```
SyntaxError: invalid syntax
TypeError: 'type' object is not subscriptable
```

**Lösung:**
1.  **Python-Version überprüfen**:
    ```bash
    python --version
    ```
2.  **Auf Python 3.8+ aktualisieren**:
    *   Windows: Die neueste Version von python.org herunterladen
    *   macOS: `brew install python`
    *   Linux: `sudo apt-get install python3.9`

#### ❌ Installation von Abhängigkeitspaketen fehlgeschlagen

**Fehlermeldung:**
```
ERROR: Could not find a version that satisfies the requirement
ModuleNotFoundError: No module named 'rich'
```

**Lösung:**
1.  **pip aktualisieren**:
    ```bash
    python -m pip install --upgrade pip
    ```
2.  **Cache leeren und neu installieren**:
    ```bash
    pip cache purge
    pip install -r requirements.txt --no-cache-dir
    ```
3.  **Nationalen Spiegelserver verwenden**:
    ```bash
    pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
    ```

### 2. Datei- und Pfadprobleme

#### ❌ Fenix-Datenbankdatei nicht gefunden

**Fehlermeldung:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
Datenbankdatei existiert nicht oder Pfad ist falsch
```

**Lösung:**
1.  **Dateispeicherort bestätigen**:
    ```bash
    # Häufiger Speicherort
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\
    ```
2.  **Absoluten Pfad verwenden**: Geben Sie den vollständigen Dateipfad ein
3.  **Dateiberechtigungen überprüfen**: Stellen Sie sicher, dass die Datei lesbar ist

#### ❌ iFly Installationspfad-Erkennung fehlgeschlagen

**Fehlermeldung:**
```
Installationspfad für iFly 737 MAX 8 wurde nicht gefunden
Bitte geben Sie das iFly Installationsverzeichnis manuell an
```

**Lösung:**
1.  **Pfad manuell eingeben**:
    ```
    # Community-Version
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Community\ifly-aircraft-737max8\
    
    # Marketplace-Version
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Official\asobo-aircraft-ifly-737max8\
    ```
2.  **Pfadstruktur überprüfen**: Bestätigen Sie, dass es das `Data\navdata\` Verzeichnis enthält

#### ❌ Unzureichende Dateischreibberechtigungen

**Fehlermeldung:**
```
PermissionError: [Errno 13] Permission denied
Datei kann nicht geschrieben werden
```

**Lösung:**
1.  **Als Administrator ausführen**:
    *   Windows: Rechtsklick → "Als Administrator ausführen"
    *   macOS/Linux: `sudo python main.py`
2.  **Dateiberechtigungen ändern**:
    ```bash
    chmod 755 /path/to/ifly/directory
    ```
3.  **Überprüfen Sie, ob die Datei in Gebrauch ist**: Schließen Sie MSFS und andere verwandte Programme

### 3. Datenverarbeitungsprobleme

#### ❌ CSV-Dateiformatfehler

**Fehlermeldung:**
```
pandas.errors.EmptyDataError: No columns to parse from file
UnicodeDecodeError: 'utf-8' codec can't decode
```

**Lösung:**
1.  **Dateicodierung überprüfen**:
    ```python
    # In UTF-8 konvertieren
    import chardet
    with open('file.csv', 'rb') as f:
        encoding = chardet.detect(f.read())['encoding']
    ```
2.  **CSV-Format überprüfen**: Stellen Sie sicher, dass die erforderlichen Spalten enthalten sind
3.  **Daten erneut herunterladen**: Neue NAIP-Datendateien abrufen

#### ❌ Berechnung der magnetischen Deklination fehlgeschlagen

**Fehlermeldung:**
```
geomag.GeomagnticCalculationError: Invalid date or coordinates
Bei der Berechnung der magnetischen Deklination ist ein Fehler aufgetreten
```

**Lösung:**
1.  **Koordinatenbereich überprüfen**:
    *   Breitengrad: -90° bis +90°
    *   Längengrad: -180° bis +180°
2.  **pygeomag aktualisieren**:
    ```bash
    pip install --upgrade pygeomag
    ```
3.  **Datumsgültigkeit überprüfen**: Stellen Sie sicher, dass das AIRAC-Datum in einem vernünftigen Bereich liegt

#### ❌ AIRAC-Zyklus-Berechnungsfehler

**Fehlermeldung:**
```
ValueError: Invalid AIRAC cycle calculation
AIRAC-Zyklus-Berechnung fehlgeschlagen
```

**Lösung:**
1.  **Systemzeit überprüfen**: Stellen Sie sicher, dass die Systemzeit korrekt ist
2.  **Zyklus manuell einstellen**:
    ```python
    # AIRAC-Zyklus manuell angeben
    airac_cycle = "2508"
    ```
3.  **Zeitzoneninformationen aktualisieren**: Stellen Sie die korrekte Zeitzoneneinstellung sicher

### 4. Speicher- und Leistungsprobleme

#### ❌ Nicht genügend Speicher

**Fehlermeldung:**
```
MemoryError: Unable to allocate array
Nicht genügend Speicher, kann große Datendateien nicht verarbeiten
```

**Lösung:**
1.  **Virtuellen Speicher erhöhen**:
    *   Windows: Systemsteuerung → System → Erweiterte Systemeinstellungen → Leistungseinstellungen → Virtueller Arbeitsspeicher
2.  **Stapelweise verarbeiten**:
    ```python
    # Daten in Blöcken lesen
    chunk_size = 1000
    for chunk in pd.read_csv(file, chunksize=chunk_size):
        process_chunk(chunk)
    ```
3.  **Andere Programme schließen**: System-RAM freigeben

#### ❌ Verarbeitungsgeschwindigkeit zu langsam

**Symptom:** Die Berechnung der magnetischen Deklination dauert zu lange

**Optimierungslösung:**
1.  **Hardware-Optimierung**:
    *   SSD-Festplatte verwenden
    *   RAM auf 8 GB+ erhöhen
    *   Mehrkern-CPU verwenden
2.  **Software-Optimierung**:
    ```python
    # Parallele Verarbeitung
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = executor.map(calculate_declination, coordinates)
    ```
3.  **Datenmenge reduzieren**: Unnötige Wegpunkte filtern

### 5. Ausgabe- und Validierungsprobleme

#### ❌ Konvertierte Daten werden in iFly nicht angezeigt

**Mögliche Ursachen:**
-   Dateiformat falsch
-   Probleme mit Datenüberschreibungsregeln
-   iFly-Cache wurde nicht geleert

**Lösung:**
1.  **Dateiformat überprüfen**:
    ```bash
    # Dateiinhalt prüfen
    head -n 10 WPNAVRTE.txt
    ```
2.  **iFly-Cache leeren**:
    ```bash
    # Cache-Dateien löschen
    rm -rf "%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_*\LocalCache\*ifly*"
    ```
3.  **Simulator neu starten**: MSFS vollständig beenden und neu starten

#### ❌ Anormale Wegpunktanzeige im FMC

**Symptom:** Wegpunktkoordinaten verschoben oder Typfehler

**Prüfschritte:**
1.  **Koordinatenformat überprüfen**:
    ```
    # Korrektes Format
    123.45678  # Längengrad (°)
    -12.34567  # Breitengrad (°)
    ```
2.  **Wegpunkttyp überprüfen**:
    ```
    11 - DESIGNATED_POINT (Bezeichneter Punkt)
    3  - VOR/DME
    2  - NDB
    ```
3.  **Wert der magnetischen Deklination überprüfen**:
    ```
    # Angemessener Bereich
    -30.0 bis +30.0 Grad
    ```

## 🔍 Diagnosewerkzeuge

### 1. Protokollanalyse

**Detailliertes Protokoll anzeigen:**
```bash
# Neuestes Protokoll anzeigen
tail -f converter.log

# Fehlermeldungen suchen
grep "ERROR" converter.log
grep "Exception" converter.log
```

**Erläuterung der Protokollebenen:**
-   `DEBUG`: Detaillierte Debug-Informationen
-   `INFO`: Allgemeine Informationen
-   `WARNING`: Warninformationen
-   `ERROR`: Fehlerinformationen
-   `CRITICAL`: Kritische Fehler

### 2. Datenvalidierungsskript

**Validierungsskript erstellen:**
```python
import pandas as pd
import sqlite3

def validate_database(db_path):
    """Datenbankintegrität validieren"""
    conn = sqlite3.connect(db_path)
    
    # Erforderliche Tabellen prüfen
    required_tables = [
        'Airports', 'Runways', 'Navaids', 
        'Waypoints', 'Terminals', 'TerminalLegs'
    ]
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    missing_tables = set(required_tables) - set(tables)
    if missing_tables:
        print(f"Fehlende Tabellen: {missing_tables}")
        return False
    
    print("Datenbankvalidierung erfolgreich")
    return True

# Anwendungsbeispiel
validate_database("path/to/nd.db3")
```

### 3. Systeminformationssammlung

**Systeminformationsbericht erstellen:**
```python
import platform
import sys
import pkg_resources

def generate_system_report():
    """Systeminformationsbericht generieren"""
    report = []
    
    # Systeminformationen
    report.append("=== Systeminformationen ===")
    report.append(f"Betriebssystem: {platform.system()} {platform.release()}")
    report.append(f"Architektur: {platform.machine()}")
    report.append(f"Python-Version: {sys.version}")
    
    # Installierte Pakete
    report.append("\n=== Installierte Pakete ===")
    installed_packages = [d for d in pkg_resources.working_set]
    for package in sorted(installed_packages, key=lambda x: x.key):
        report.append(f"{package.key}: {package.version}")
    
    return "\n".join(report)

# Bericht generieren
print(generate_system_report())
```

## 📋 Fehlerbehebungs-Checkliste

### 🔧 Grundlegende Überprüfung
-   [ ] Python-Version ≥ 3.8
-   [ ] Alle Abhängigkeitspakete installiert
-   [ ] Fenix-Datenbankdatei existiert und ist lesbar
-   [ ] iFly 737 MAX 8 korrekt installiert
-   [ ] Ausreichend Speicherplatz (≥ 100 MB)
-   [ ] Ausreichend Arbeitsspeicher (≥ 4 GB)

### 📁 Pfadvalidierung
-   [ ] Fenix-Datenbankpfad korrekt
-   [ ] iFly Installationspfad korrekt
-   [ ] CSV-Datendateipfad korrekt
-   [ ] Ausgabeverzeichnis hat Schreibberechtigungen

### 📊 Datenprüfung
-   [ ] CSV-Dateiformat korrekt (UTF-8-Codierung)
-   [ ] Datenbanktabellenstruktur intakt
-   [ ] Koordinatendaten im gültigen Bereich
-   [ ] AIRAC-Zyklusberechnung korrekt

### 🔄 Verarbeitungsvalidierung
-   [ ] Protokolldatei ohne ERROR-Ebene-Meldungen
-   [ ] Ausgabedatei(en) generiert
-   [ ] Dateigröße angemessen (nicht 0)
-   [ ] Daten werden in iFly korrekt angezeigt

## 🆘 Hilfe erhalten

### Selbsthilfe
1.  **Dokumentation konsultieren**: Die vollständige Bedienungsanleitung lesen
2.  **Protokolle durchsuchen**: Nach spezifischen Fehlermeldungen suchen
3.  **FAQ prüfen**: Häufig gestellte Fragen (FAQ) einsehen
4.  **Problem reproduzieren**: Bestätigen, dass das Problem reproduzierbar ist

### Community-Support
1.  **GitHub Issues**: Technische Probleme melden
2.  **Diskussionsforum**: An Community-Diskussionen teilnehmen
3.  **QQ-Gruppe/WeChat-Gruppe**: Live-Austausch und Fragen

### Beim Melden eines Problems bitte Folgendes angeben:
-   **Fehlerprotokoll**: Die vollständige Fehlermeldung
-   **Systeminformationen**: OS, Python-Version usw.
-   **Reproduktionsschritte**: Detaillierte Schritte zur Reproduktion
-   **Dateiinformationen**: Größe und Pfad relevanter Dateien
-   **Screenshots**: Bei Bedarf Screenshots bereitstellen

---

**Denken Sie daran: Die meisten Probleme haben eine Lösung!**

Wenn Sie auf Schwierigkeiten stoßen, atmen Sie tief durch und folgen Sie dieser Anleitung Schritt für Schritt zur Fehlerbehebung. 🔧✨
# 🔄 Benutzungshinweise

Diese Anleitung führt Sie durch den gesamten Nutzungsprozess des Nav-data Tools, von der Datenkonvertierung bis zur finalen Bereitstellung im Flugzeug-Add-on.

## 🚀 Schnellstart

### ⚡ Ein-Klick-Konvertierung

Wenn Sie die Konfiguration bereits abgeschlossen haben, können Sie das Hauptprogramm direkt ausführen:

```bash
python XP2INI_NDB_Converter.py
```

Das Programm führt Sie automatisch durch den gesamten Konvertierungsprozess.

## 📝 Detaillierter Arbeitsablauf

### 🎯 Erster Schritt: Datenvorbereitung und -Validierung

Bevor Sie mit der Konvertierung beginnen, stellen Sie sicher, dass alle erforderlichen Datendateien vorhanden sind:

```bash
# Überprüfung der Datenintegrität
python -c "
import os
files = [
    'NAIP/AD_HP.csv',
    'NAIP/RWY.csv',
    'NAIP/RWY_DIRECTION.csv',
    'NAIP/RTE_SEG.csv',
    'X-Plane/earth_fix.dat',
    'X-Plane/earth_nav.dat',
    'NDBs/nd.db3'
]
for f in files:
    print(f'✅ {f}' if os.path.exists(f) else f'❌ {f}')
"
```

### 🔧 Zweiter Schritt: Konvertierungsprogramm starten

Führen Sie das Hauptkonvertierungsprogramm aus und folgen Sie den Anweisungen:

```bash
python XP2INI_NDB_Converter.py
```

### 📂 Dritter Schritt: Pfadkonfigurationsassistent

Das Programm führt Sie durch die Pfadkonfiguration:

#### 3.1 Basispfad-Einrichtung
```
Bitte geben Sie den Basiverzeichnispfad ein (enthält die Ordner NAIP, NDBs und XP_Data):
> C:\NavData\Workspace
```

#### 3.2 Automatische Pfaderkennung
Das Programm scannt automatisch und zeigt die erkannten Dateien an:

```
================= Pfadkonfiguration starten =================
✅ NAIP_PATH: C:\NavData\Workspace\NAIP
✅ DB_OUTPUT_PATH: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
✅ FNX_NDB_PATH: C:\NavData\Workspace\NDBs\nd.db3
✅ CIFP_PATH: C:\NavData\Workspace\CIFP
✅ PATH_TO_FIX_DAT: C:\NavData\Workspace\X-Plane\earth_fix.dat
✅ PATH_TO_NAV_DAT: C:\NavData\Workspace\X-Plane\earth_nav.dat
✅ LOOKUP_TXT_PATH: C:\NavData\Workspace\ICAO.txt
```

#### 3.3 Pfadbestätigung
```
Sind alle oben genannten Pfade korrekt? (J/N): Y
```

### ⚙️ Vierter Schritt: Datenverarbeitungsprozess

Das Konvertierungsprogramm verarbeitet die verschiedenen Daten in der folgenden Reihenfolge:

#### 4.1 Flughafendatenverarbeitung
```
Verarbeite Flughafendaten...
📍 Analysiere grundlegende Flughafeninformationen
🧭 Berechne die magnetische Deklination des Flughafens
✅ Flughafendatenverarbeitung abgeschlossen (156 Flughäfen verarbeitet)
```

#### 4.2 Landebahndatenverarbeitung
```
Verarbeite Landebahndaten...
🛬 Verarbeite Landebahninformationen
📐 Berechne Landebahnrichtung und -koordinaten
✅ Landebahndatenverarbeitung abgeschlossen (312 Landebahnen verarbeitet)
```

#### 4.3 VHF-Navigationsfunkfeuer-Verarbeitung
```
Verarbeite VHF-Daten...
📡 Verarbeite VOR/DME-Navigationsfunkfeuer
🔢 Berechne Navigationsfunkfeuerfrequenzen und -abdeckung
✅ VHF-Datenverarbeitung abgeschlossen (89 Navigationsfunkfeuer verarbeitet)
```

#### 4.4 GS-Landesystem
```
Verarbeite GS-Daten...
🛬 Verarbeite ILS-Landesysteme
📐 Berechne Gleitpfadneigung und Position
✅ GS-Datenverarbeitung abgeschlossen
```

#### 4.5 NDB-Navigationsfunkfeuer-Verarbeitung
```
Verarbeite NDB-Daten...
📻 Verarbeite ungerichtete Funkfeuer (NDB)
🧭 Berechne die magnetische Deklination von NDBs
✅ NDB-Datenverarbeitung abgeschlossen (45 NDBs verarbeitet)
```

#### 4.6 Wegpunktdatenverarbeitung
```
Verarbeite Wegpunktdaten...
🗺️ Verarbeite En-route-Wegpunkte
✅ Wegpunktdatenverarbeitung abgeschlossen (2.453 Punkte verarbeitet)
```

#### 4.7 Terminalbereichs-Wegpunkt-Verarbeitung
```
Verarbeite Terminalpunktedaten...
🏢 Verarbeite Terminalbereichs-Wegpunkte
✅ Terminalpunktedatenverarbeitung abgeschlossen (876 Punkte verarbeitet)
```

#### 4.8 SID-Abflugverfahrensverarbeitung
```
Verarbeite Abflugverfahren...
🛫 Verarbeite SID-Verfahren
📋 Analysiere Verfahrenswegpunkte und Beschränkungen
✅ Abflugverfahrensverarbeitung abgeschlossen (234 Verfahren verarbeitet)
```

#### 4.9 STAR-Anflugverfahrensverarbeitung
```
Verarbeite Anflugverfahren...
🛬 Verarbeite STAR-Verfahren
📋 Analysiere Verfahrenswegpunkte und Beschränkungen
✅ Anflugverfahrensverarbeitung abgeschlossen (198 Verfahren verarbeitet)
```

#### 4.10 IAP-Anflugverfahrensverarbeitung
```
Verarbeite Anflugprozeduren...
🎯 Verarbeite Anflugverfahren
📋 Analysiere Anflugwegpunkte und Beschränkungen
✅ Anflugverfahrensverarbeitung abgeschlossen (445 Verfahren verarbeitet)
```

#### 4.11 Luftstraßendatenverarbeitung
```
Verarbeite Luftstraßendaten...
🛣️ Verarbeite Höhen- und Tiefenluftstraßen
🔗 Stelle Wegpunkt-Verbindungen her
✅ Luftstraßendatenverarbeitung abgeschlossen (167 Luftstraßen verarbeitet)
```

#### 4.12 Datenbankoptimierung
```
🗜️ Komprimiere Datenbank...
📊 Lösche temporäre Indizes...
✅ Datenbankoptimierung abgeschlossen
```

### ⏱️ Fünfter Schritt: Verarbeitung abgeschlossen

```
=====================================
🎉 Datenverarbeitung abgeschlossen, Dauer: 127,3 Sekunden
📄 Ausgabedatei: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
📊 Datenbankgröße: 15.6 MB
📈 Verarbeitungsstatistik:
   - Flughäfen: 156
   - Landebahnen: 312
   - VHF-Navigationsfunkfeuer: 89
   - NDB-Navigationsfunkfeuer: 45
   - Wegpunkte: 3.329
   - SID-Verfahren: 234
   - STAR-Verfahren: 198
   - Anflugverfahren: 445
   - Luftstraßen: 167
=====================================
Drücken Sie Enter zum Beenden...
```

## 🚁 Anleitung zur Datenbereitstellung

### 📁 Zielflugzeugidentifizierung

Wählen Sie den entsprechenden Bereitstellungspfad, basierend auf dem von Ihnen verwendeten Flugzeug-Add-on:

#### iniBuilds A350-Serie
```
[MSFS Community-Ordner]\inibuilds-aircraft-a350\work\NavigationData\
```

#### PMDG 737-Serie
```
[MSFS Community-Ordner]\pmdg-aircraft-737\Config\Navdata\
[MSFS Community-Ordner]\pmdg-aircraft-738\Config\Navdata\
[MSFS Community-Ordner]\pmdg-aircraft-739\Config\Navdata\
```

#### PMDG 777-Serie
```
[MSFS Community-Ordner]\pmdg-aircraft-77w\Config\Navdata\
[MSFS Community-Ordner]\pmdg-aircraft-77f\Config\Navdata\
```

### 🔄 Bereitstellungsprozess

#### Schritt 1: Sicherung der bestehenden Daten

**WICHTIG**: Erstellen Sie immer eine Sicherung, bevor Sie neue Daten bereitstellen!

```powershell
# Sicherung der bestehenden Navigationsdaten
$targetDir = "C:\...\pmdg-aircraft-77w\Config\Navdata"
$backupDir = "$targetDir" + "_backup_" + (Get-Date -Format "yyyyMMdd")
Copy-Item $targetDir $backupDir -Recurse
Write-Host "Sicherung erstellt: $backupDir"
```

#### Schritt 2: Cache-Verzeichnis leeren

Leeren Sie den Navigationsdaten-Cache von MSFS:

**MSFS 2020 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2020 (Steam)**
```
%APPDATA%\Microsoft Flight Simulator\Packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalState\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Steam)**
```
%APPDATA%\Microsoft Flight Simulator 2024\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

#### Schritt 3: Bereitstellung neuer Daten

Kopieren Sie die konvertierte Datenbankdatei an den Zielort:

```bash
# Datenbankdatei kopieren
copy "C:\NavData\Workspace\Output\e_dfd_PMDG.s3db" "[Zielverzeichnis für Navigationsdaten]\"
```

#### Schritt 4: Bereitstellung überprüfen

Starten Sie MSFS und laden Sie das Flugzeug, überprüfen Sie die folgenden Punkte:

- [ ] FMC startet normal und ohne Datenbankfehler
- [ ] Flughafeninformationen (ICAO-Code) können abgefragt werden
- [ ] Flugrouten können geplant werden (Start- zu Endpunkt)
- [ ] SID-/STAR-Verfahren sind verfügbar und vollständig
- [ ] Anflugverfahren sind wählbar und die Daten korrekt

## 🔧 Erweiterte Nutzungstipps

### 📊 Batch-Verarbeitungsskript

Erstellen Sie ein Batch-Verarbeitungsskript für automatisierte Vorgänge:

```batch
@echo off
echo ======================================
echo     Nav-data Automatische Konvertierungsskript
echo ======================================

cd /d "C:\NavData\iniBuilds"

echo 1. Starte Datenkonvertierung...
python XP2INI_NDB_Converter.py

echo 2. Sichere bestehende Daten...
set BACKUP_DIR=C:\NavData\Backup\%date:~0,4%%date:~5,2%%date:~8,2%
mkdir "%BACKUP_DIR%"
xcopy "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData" "%BACKUP_DIR%" /E /I

echo 3. Cache leeren...
del /Q "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\*"

echo 4. Neue Daten bereitstellen...
copy "Output\e_dfd_PMDG.s3db" "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\"

echo 5. Fertig!
pause
```

### 🔄 Regelmäßiger Aktualisierungs-Workflow

Richten Sie einen automatischen Aktualisierungsprozess ein:

```python
#!/usr/bin/env python3
"""Automatischer Aktualisierungs-Workflow"""

import schedule
import time
import subprocess
from datetime import datetime

def update_navdata():
    """Führt die Navigationsdatenaktualisierung aus"""
    print(f"🔄 Starte Navigationsdaten-Aktualisierung - {datetime.now()}")

    try:
        # Konvertierungsprogramm ausführen
        result = subprocess.run(['python', 'XP2INI_NDB_Converter.py'],
                              capture_output=True, text=True)

        if result.returncode == 0:
            print("✅ Navigationsdaten erfolgreich aktualisiert!")
            # Hier kann eine automatische Bereitstellungslogik hinzugefügt werden
        else:
            print("❌ Aktualisierung fehlgeschlagen:", result.stderr)

    except Exception as e:
        print(f"❌ Aktualisierungsfehler: {e}")

# Alle 28 Tage ausführen (AIRAC-Zyklus)
schedule.every(28).days.do(update_navdata)

# Skript am Laufen halten
print("📅 Navigationsdaten-Auto-Aktualisierungs-Scheduler gestartet")
while True:
    schedule.run_pending()
    time.sleep(3600)  # Jede Stunde prüfen
```

### 🔍 Datenqualitätsvalidierung

Erstellen Sie ein Validierungsskript zur Überprüfung der Ausgabedatenqualität:

```python
#!/usr/bin/env python3
"""Skript zur Datenqualitätsvalidierung"""

import sqlite3
import os

def validate_database(db_path):
    """Validiert die Datenbankintegrität und Datenqualität"""

    if not os.path.exists(db_path):
        print(f"❌ Datenbankdatei existiert nicht: {db_path}")
        return False

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Tabellenstruktur prüfen
    tables = [
        'tbl_airports',
        'tbl_runways',
        'tbl_d_vhfnavaids',
        'tbl_db_enroute_ndbnavaids',
        'tbl_ea_enroute_waypoints',
        'tbl_pc_terminal_waypoints',
        'tbl_pd_sids',
        'tbl_er_enroute_airways'
    ]

    print("🔍 Datenbank-Validierungsbericht")
    print("=" * 40)

    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"✅ {table}: {count} Einträge")
        except sqlite3.OperationalError as e:
            print(f"❌ {table}: Tabelle existiert nicht oder Abfrage fehlgeschlagen")

    # Datenqualität prüfen
    print("\n📊 Datenqualitätsprüfung")
    print("=" * 40)

    # Leere Koordinaten prüfen
    cursor.execute("""
        SELECT COUNT(*) FROM tbl_airports
        WHERE airport_latitude IS NULL OR airport_longitude IS NULL
    """)
    null_coords = cursor.fetchone()[0]

    if null_coords == 0:
        print("✅ Flughafenkoordinaten: Keine Nullwerte")
    else:
        print(f"⚠️ Flughafenkoordinaten: {null_coords} Nullwerte")

    conn.close()
    return True

if __name__ == "__main__":
    validate_database("Output/e_dfd_PMDG.s3db")
```

## 🚨 Häufige Probleme

### Probleme während des Konvertierungsprozesses

#### Problem: Programm stoppt mittendrin
```bash
# Ursache: Datendatei beschädigt oder Pfadfehler
# Lösung: Überprüfen Sie die Integrität aller Eingabedateien
python -c "
import os
for f in ['NAIP/AD_HP.csv', 'X-Plane/earth_fix.dat']:
    if os.path.exists(f):
        print(f'{f}: {os.path.getsize(f)} bytes')
    else:
        print(f'{f}: Datei nicht vorhanden')
"
```

#### Problem: Speichermangel-Fehler
```python
# Lösung: Reduzieren Sie die Batch-Größe
# Setzen Sie einen kleineren BATCH_SIZE in der Konfiguration
BATCH_SIZE = 500  # reduziert auf 500
```

#### Problem: Datenbank-Sperrfehler
```bash
# Ursache: Andere Programme greifen auf die Datenbank zu
# Lösung: Schließen Sie alle relevanten Programme und führen Sie es erneut aus
taskkill /f /im "FlightSimulator.exe"
```

### Bereitstellungsprobleme

#### Problem: FMC zeigt "DB OUT OF DATE" an
```bash
# Ursache:
# 1. Datenbankdatei wurde nicht korrekt kopiert
# 2. MSFS-Cache wurde nicht geleert
# 3. AIRAC-Zyklus stimmt nicht überein

# Lösungsschritte:
# 1. Stellen Sie sicher, dass die Datenbankdatei am richtigen Ort vorhanden ist
# 2. Löschen Sie den gesamten Inhalt des NavigationData-Cache-Ordners
# 3. MSFS neu starten
```

#### Problem: Einige Wegpunkte oder Verfahren fehlen
```bash
# Ursache: CIFP-Daten sind unvollständig
# Lösung:
# 1. Laden Sie das vollständige CIFP-Datenpaket erneut herunter
# 2. Stellen Sie sicher, dass die Verfahrensdateien für den Ziel-Flughafen existieren
# 3. Überprüfen Sie, ob der ICAO-Gebietscode im unterstützten Bereich liegt
```

## 📈 Leistungsoptimierung

### 🚀 Konvertierungsgeschwindigkeit erhöhen

```python
# Multi-Prozess-Verarbeitung aktivieren
MULTIPROCESS_WORKERS = 8  # Je nach Anzahl der CPU-Kerne anpassen

# SSD-Speicher verwenden
# Das Arbeitsverzeichnis auf einer SSD einzurichten, kann die I/O-Leistung erheblich verbessern

# Verfügbaren Speicher erhöhen
# Schließen Sie unnötige Programme, stellen Sie sicher, dass mindestens 8 GB verfügbarer Arbeitsspeicher vorhanden sind
```

### 📊 Ressourcennutzung überwachen

```python
import psutil
import time

def monitor_performance():
    """Überwacht die Systemressourcennutzung"""
    while True:
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        disk = psutil.disk_usage('.').percent

        print(f"CPU: {cpu}% | RAM: {memory}% | Disk: {disk}%")
        time.sleep(5)

# Überwachung während der Konvertierung ausführen
monitor_performance()
```

---

Herzlichen Glückwunsch! Sie haben nun den vollständigen Nutzungsprozess des Nav-data Tools gemeistert.
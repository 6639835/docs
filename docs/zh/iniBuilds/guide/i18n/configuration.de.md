# ⚙️ Konfigurationsanleitung

Dieser Leitfaden wird detailliert beschreiben, wie Sie die Datenquellen, Pfadeinstellungen und die AIRAC-Zyklusverwaltung für das Nav-data-Konvertierungstool konfigurieren.

## 📊 Übersicht der Datenquellen

Das Nav-data-Tool unterstützt verschiedene branchenübliche Luftfahrt-Navigationsdatenquellen, um die Autorität und Genauigkeit der Daten zu gewährleisten.

### 🔄 Unterstützte Datenformate

| Datenformat | Quelle | Zweck | Standard |
|-------------|--------|-------|----------|
| **NAIP CSV** | Navigraph/Aerosoft | Flughäfen, Landebahnen, Routen | ARINC 424 |
| **X-Plane DAT** | X-Plane 11/12 | Wegpunkte, Navigationsfunkfeuer | X-Plane-Format |
| **CIFP** | Offizielle Verfahrensdaten | SID/STAR/Anflug | ARINC 424 |
| **SQLite DB** | Fenix A320 | NDB-Referenzdaten | Benutzerdefiniertes Format |

## 🗃️ Erforderliche Datendateien

### 📁 Grundlegende Verzeichnisstruktur

Erstellen Sie die folgende Verzeichnisstruktur, um Ihre Navigationsdaten zu organisieren:

```
NavData_Workspace/
├── NAIP/                    # Verzeichnis für NAIP CSV-Dateien
│   ├── AD_HP.csv           # Basisdaten Flughäfen
│   ├── RWY.csv             # Landebahn-Informationen
│   ├── RWY_DIRECTION.csv   # Landebahn-Richtungsdaten
│   └── RTE_SEG.csv         # Routensegmentdaten
│
├── X-Plane/                 # X-Plane Datendateien
│   ├── earth_fix.dat       # Wegpunkt-Daten
│   └── earth_nav.dat       # Navigationsfunkfeuer-Daten
│
├── CIFP/                    # Verzeichnis für CIFP-Verfahrensdaten
│   ├── ZBAA.dat            # Beijing Capital Airport
│   ├── ZSSS.dat            # Shanghai Pudong Airport
│   └── [andere Flughäfen].dat      # Verfahrensdateien für verschiedene Flughäfen
│
├── NDBs/                    # NDB-Datenbank
│   └── nd.db3              # Fenix Navigationsdatenbank
│
└── Output/                  # Ausgabeverzeichnis
    └── e_dfd_PMDG.s3db     # Konvertierte Datenbank
```

## 🌐 Anleitung zur Beschaffung von Datenquellen

### 1️⃣ Navigraph-Daten (Empfohlen)

**Beschaffungsschritte:**
1.  Besuchen Sie die [Navigraph-Website](https://navigraph.com/) und registrieren Sie ein Konto.
2.  Abonnieren Sie Navigraph Unlimited oder den Charts + Data-Dienst.
3.  Laden Sie den Navigraph FMS Data Manager herunter.
4.  Wählen Sie im FMS Data Manager das Format "Generic".
5.  Laden Sie das NAIP-Datenpaket herunter und entpacken Sie es.

**NAIP-Dateibeschaffung:**
```
Navigraph FMS Data Manager → 
Generic → 
NAIP Format → 
Aktuellen AIRAC-Zyklus herunterladen
```

### 2️⃣ Aerosoft NavDataPro

**Beschaffungsschritte:**
1.  Kaufen Sie [Aerosoft NavDataPro](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/).
2.  Laden Sie die NavDataPro-Anwendung herunter.
3.  Melden Sie sich an und laden Sie die Daten im NAIP-Format herunter.
4.  Entpacken Sie diese in das NAIP-Verzeichnis.

### 3️⃣ X-Plane Datendateien

**Quellenoptionen:**
-   **Option A**: Kopieren Sie aus dem X-Plane 11/12 Installationsverzeichnis
    ```
    [X-Plane Installationsverzeichnis]/Resources/default data/earth_fix.dat
    [X-Plane Installationsverzeichnis]/Resources/default data/earth_nav.dat
    ```

-   **Option B**: Beziehen Sie diese aus den Beispieldaten dieses Projekts
    ```
    [Projektverzeichnis]/sample_data/earth_fix.dat
    [Projektverzeichnis]/sample_data/earth_nav.dat
    ```

### 4️⃣ CIFP-Verfahrensdaten

**Beschaffungsmethode:**
-   **Offizielle Kanäle**: Kostenloser Download von der FAA-Website
-   **Drittanbieter**: In Navigraph enthaltene CIFP-Daten
-   **Projektbereitstellung**: Vorverarbeitete CIFP-Dateien für die Region China

### 5️⃣ NDB-Datenbank

**Bezugsquelle:**
```bash
# Aus dem Fenix A320 Installationsverzeichnis kopieren
[MSFS Community]/fenix-a320/Resources/NavData/nd.db3
```

## 🛠️ Pfadeinrichtungsassistent

### Automatischer Konfigurationsmodus

Beim Ausführen des Konvertierungstools führt Sie das Programm durch die Pfadkonfiguration:

```bash
python XP2INI_NDB_Converter.py
```

**Konfigurationsablauf:**
1.  **Basisverzeichnis-Auswahl**: Wählen Sie das Stammverzeichnis, das alle Datendateien enthält.
2.  **Automatische Erkennung**: Das Programm scannt und validiert automatisch verschiedene Datendateien.
3.  **Pfadbestätigung**: Zeigt die erkannten Dateipfade zur Bestätigung an.
4.  **Manuelle Ergänzung**: Geben Sie die Pfade für nicht gefundene Dateien manuell an.

### 🔍 Pfade-Validierungsliste

| Datentyp | Dateipfad | Validierungsstatus |
|----------|-----------|--------------------|
| NAIP Flughafendaten | `NAIP/AD_HP.csv` | ✅ |
| NAIP Landebahndaten | `NAIP/RWY.csv` | ✅ |
| NAIP Landebahnrichtung | `NAIP/RWY_DIRECTION.csv` | ✅ |
| NAIP Routendaten | `NAIP/RTE_SEG.csv` | ✅ |
| X-Plane Wegpunkte | `X-Plane/earth_fix.dat` | ✅ |
| X-Plane Navigationsfunkfeuer | `X-Plane/earth_nav.dat` | ✅ |
| CIFP Verfahrensverzeichnis | `CIFP/` | ✅ |
| NDB-Datenbank | `NDBs/nd.db3` | ✅ |
| ICAO Nachschlagetabelle | `ICAO.txt` | ✅ |

## 📅 AIRAC-Zyklusverwaltung

### 🗓️ Erläuterung des AIRAC-Zyklus

**AIRAC (Aeronautical Information Regulation And Control)** ist ein von der Internationalen Zivilluftfahrtorganisation festgelegter 28-tägiger Aktualisierungszyklus für Luftfahrtinformationen.

-   **Aktualisierungsfrequenz**: Alle 28 Tage
-   **Globale Synchronisierung**: Weltweit einheitliche Aktualisierungszeiten
-   **Wichtigkeit**: Stellt sicher, dass Piloten und Fluglotsen dieselben Navigationsdaten verwenden.

### 📊 Abfrage des aktuellen Zyklus

```python
# Aktuellen AIRAC-Zyklus abfragen
import datetime

def get_current_airac():
    # AIRAC Referenzdatum 2023: 5. Januar 2023
    base_date = datetime.date(2023, 1, 5)
    today = datetime.date.today()
    
    days_diff = (today - base_date).days
    cycle_number = (days_diff // 28) + 1
    
    return f"AIRAC {today.year}{cycle_number:02d}"

print(f"Aktueller Zyklus: {get_current_airac()}")
```

### 🔄 Strategie zur Datenaktualisierung

#### Benutzer mit Echtzeit-Updates
-   **Aktualisierungsfrequenz**: Jeder AIRAC-Zyklus
-   **Empfohlene Quelle**: Navigraph (automatische Aktualisierung)
-   **Anwendungsfall**: Online-Flug, professionelle Nutzung

#### Reguläre Benutzer
-   **Aktualisierungsfrequenz**: 3-6 Monate
-   **Empfohlene Quelle**: Aerosoft NavDataPro
-   **Anwendungsfall**: Offline-Flug, Unterhaltungszwecke

## 🎛️ Erweiterte Konfigurationsoptionen

### 📍 Konfiguration der Regionalfilterung

Passen Sie den Datenverarbeitungsbereich für verschiedene Regionen an:

```python
# Konfiguriert die zu verarbeitenden ICAO-Gebietscodes
SUPPORTED_ICAO_REGIONS = {
    'ZB',  # Nordchina
    'ZS',  # Ostchina  
    'ZG',  # Südchina
    'ZJ',  # Ostchinesische Region
    'ZY',  # Zentralchina
    'ZL',  # Südwestchina
    'ZU',  # Westchina
    'ZW',  # Nordwestchina
    'ZP',  # Nordchinesische Region
    'ZH',  # Südchinesische Region
    'VM',  # Vietnam-Region
    'VH',  # Hongkong-Region
    'RK'   # Südkorea-Region
}
```

### 🎯 Präzisionskonfiguration

Legt die Koordinaten- und Berechnungspräzision fest:

```python
# Koordinaten-Präzisionskonfiguration
COORDINATE_PRECISION = 8  # Dezimalstellen
MAGNETIC_VARIATION_PRECISION = 1  # Magnetische Deklinationspräzision

# Umrechnung von Entfernungseinheiten
NM_TO_KM = 1.852  # Nautische Meilen zu Kilometer
KM_TO_NM = 0.539957  # Kilometer zu Nautische Meilen
```

### ⚡ Leistungsoptimierungskonfiguration

```python
# Konfiguration der Parallelverarbeitung
MULTIPROCESS_WORKERS = 4  # Anzahl der Parallelprozesse
BATCH_SIZE = 1000  # Batch-Größe
DATABASE_TIMEOUT = 30  # Datenbank-Timeout (Sekunden)

# Speicheroptimierung
ENABLE_CACHE = True  # Koordinaten-Cache aktivieren
CACHE_SIZE_LIMIT = 10000  # Cache-Größenlimit
```

## 🔧 Konfigurationsdateivorlage

Erstellen Sie eine `config.json`-Datei, um gängige Konfigurationen zu speichern:

```json
{
  "data_sources": {
    "naip_path": "C:/NavData/NAIP",
    "xplane_path": "C:/NavData/X-Plane", 
    "cifp_path": "C:/NavData/CIFP",
    "ndb_path": "C:/NavData/NDBs/nd.db3",
    "icao_txt": "C:/NavData/ICAO.txt"
  },
  "output": {
    "database_path": "C:/NavData/Output/e_dfd_PMDG.s3db"
  },
  "processing": {
    "regions": ["ZB", "ZS", "ZJ", "ZG", "ZY", "ZL", "ZU", "ZW", "ZP", "ZH"],
    "coordinate_precision": 8,
    "enable_multiprocessing": true,
    "workers": 4
  },
  "airac": {
    "current_cycle": "2410",
    "auto_update_check": true
  }
}
```

## ✅ Konfigurationsvalidierung

### 🔍 Konfigurationsprüfskript

```python
#!/usr/bin/env python3
"""Konfigurationsvalidierungsskript"""

import os
import json
from pathlib import Path

def validate_config():
    """Validiert die Integrität der Konfigurationsdatei"""
    
    required_files = {
        'NAIP/AD_HP.csv': 'Flughafendaten',
        'NAIP/RWY.csv': 'Landebahndaten', 
        'NAIP/RWY_DIRECTION.csv': 'Landebahnrichtung',
        'NAIP/RTE_SEG.csv': 'Routendaten',
        'X-Plane/earth_fix.dat': 'Wegpunkte',
        'X-Plane/earth_nav.dat': 'Navigationsfunkfeuer',
        'NDBs/nd.db3': 'NDB-Datenbank'
    }
    
    print("🔍 Starte die Konfigurationsvalidierung...")
    
    for file_path, description in required_files.items():
        if os.path.exists(file_path):
            print(f"✅ {description}: {file_path}")
        else:
            print(f"❌ {description}: {file_path} (Datei nicht vorhanden)")
    
    print("🔍 Validierung abgeschlossen!")

if __name__ == "__main__":
    validate_config()
```

## 🚨 Häufige Konfigurationsprobleme

### Pfadprobleme
```bash
# Problem: Pfad enthält chinesische Zeichen, was zu Kodierungsfehlern führt
# Lösung: Englische Pfade verwenden, Sonderzeichen vermeiden

# Beispiel für falschen Pfad
C:/导航数据/NAIP/

# Beispiel für korrekten Pfad  
C:/NavData/NAIP/
```

### Dateiberechtigungsprobleme
```powershell
# Problem: Keine Leseberechtigung
# Lösung: Als Administrator ausführen oder Dateiberechtigungen ändern
icacls "C:\NavData" /grant Everyone:F /T
```

### Datenintegritätsprobleme
```bash
# Problem: NAIP-Dateien unvollständig
# Lösung: Vollständiges AIRAC-Datenpaket erneut herunterladen
# Stellen Sie sicher, dass alle CSV-Dateien vorhanden und nicht leer sind.
```

---

Konfiguration abgeschlossen! Als Nächstes lesen Sie bitte die [**Benutzungsanleitung**](./usage.md), um den Datenkonvertierungsprozess durchzuführen.
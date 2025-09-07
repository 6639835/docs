# 🚀 iFly Navigationsdaten-Konverter Benutzerhandbuch

Dieses Handbuch beschreibt detailliert, wie man den iFly Navigationsdaten-Konverter verwendet, von den grundlegenden Operationen bis hin zu erweiterten Funktionen, um Ihnen zu helfen, die Navigationsdatenkonvertierung von Fenix zu iFly erfolgreich abzuschließen.

## 🎯 Vorbereitungen vor der Nutzung

### 1. Prüfliste für die Dateivorbereitung

Bevor Sie mit der Konvertierung beginnen, stellen Sie bitte sicher, dass Sie die folgenden Dateien vorbereitet haben:

- ✅ **Fenix Navigationsdatenbank** (`nd.db3`)
  ```
  Speicherort: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  Größe: Typischerweise 50-200MB
  Format: SQLite-Datenbankdatei
  ```

- ✅ **NAIP Routendaten** (`RTE_SEG.csv`)
  ```
  Quelle: China Civil Aviation Data Service Website (chinesische Zivilluftfahrt-Datenservice-Website)
  Kodierung: UTF-8
  Größe: Typischerweise 5-20MB
  Format: CSV-Datei, enthält Routenabschnittsdaten
  ```

- ✅ **iFly 737 MAX 8** ist installiert und betriebsbereit

### 2. Umgebungsprüfung

Führen Sie das Umgebungsscript aus:
```bash
# Python-Umgebung überprüfen
python --version  # Sollte Version 3.8 oder höher anzeigen

# Abhängigkeitspakete überprüfen
python -c "import rich, pandas, pygeomag; print('Umgebungsprüfung erfolgreich!')"

# Verfügbaren Speicher prüfen
python -c "import psutil; print(f'Verfügbarer Speicher: {psutil.virtual_memory().available // (1024**3)} GB')"
```

## 🖥️ Interaktive Nutzung

### Konverter starten

```bash
# Ins Projektverzeichnis wechseln
cd /path/to/ifly-converter

# Konverter starten
python main.py
```

### Willkommensbildschirm

Nach dem Start des Konverters sehen Sie den modernen Willkommensbildschirm:

```
╔═══════════════════════════════════════ 🛩️  航空导航数据转换工具  ✈️ ═══════════════════════════════════════╗
║                                                                                                          ║
║                                      Fenix zu iFly Navigationsdaten-Konverter                            ║
║                                          Hochwertige, moderne Konvertierungserfahrung                    ║
║                                                                                                          ║
╚═══════════════════════════════════════ Powered by Rich • Version 2.0 ═══════════════════════════════════════╝

🔍 Systemprüfung...
✅ Python-Umgebung: 3.9.16
✅ Abhängigkeitspakete: Alle installiert
✅ Verfügbarer Speicher: 8.2 GB
✅ Festplattenspeicher: 125 GB

Bereit, den Konvertierungsprozess zu starten...
```

## 📋 Detaillierte Konvertierungsschritte

### Schritt 1: Fenix-Datenbank verbinden

```
╭─────────────────────────────────────────────── 🔄 Schritt 1/4 ────────────────────────────────────────────────╮
│ Fenix-Datenbank verbinden                                                                                        │
│ Bitte wählen Sie die Fenix A320 Navigationsdatenbankdatei (nd.db3)                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Bitte geben Sie den Pfad zur Fenix-Datenbankdatei ein:
```

**Eingabebeispiel:**
```bash
# Windows-Pfad
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Oder drücken Sie Enter für die automatische Erkennung
[Enter drücken für automatische Erkennung]
```

**Überprüfungsprozess:**
```
🔍 Datenbank wird überprüft...
✅ Datei existiert und ist lesbar
✅ Datenbankformat korrekt
✅ Erforderliche Tabellen vollständig (11/11)
📊 Datenstatistik:
   • Flughäfen: 15,234
   • Landebahnen: 28,456
   • Wegpunkte: 156,789
   • Terminalverfahren: 8,945
```

### Schritt 2: CSV-Datei auswählen

```
╭─────────────────────────────────────────────── 🔄 Schritt 2/4 ────────────────────────────────────────────────╮
│ NAIP Routendaten auswählen                                                                                        │
│ Bitte wählen Sie die RTE_SEG.csv-Datei der chinesischen Zivilluftfahrt                                                                           │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Bitte geben Sie den Pfad zur CSV-Datei ein:
```

**Überprüfungsprozess:**
```
🔍 CSV-Datei wird überprüft...
✅ Dateikodierung: UTF-8
✅ Formatüberprüfung erfolgreich
✅ Erforderliche Spalten vorhanden
📊 Datenvorschau:
   • Gesamtanzahl der Datensätze: 12,456
   • Anzahl der Routen: 345
   • Abdeckungsbereich: Festlandchina, Hongkong, Macau
   • Datenaktualität: AIRAC 2508
```

### Schritt 3: iFly-Installation lokalisieren

```
╭─────────────────────────────────────────────── 🔄 Schritt 3/4 ────────────────────────────────────────────────╮
│ iFly-Installation lokalisieren                                                                                            │
│ Sucht nach dem iFly 737 MAX 8 Installationsort...                                                                       │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

🔍 Häufige Installationsorte werden gescannt...
✅ iFly-Installation gefunden: Community\ifly-aircraft-737max8\
📁 Installationspfad: C:\Users\Username\AppData\Local\Packages\Microsoft.FlightSimulator_xxx\LocalCache\Packages\Community\ifly-aircraft-737max8\
📋 Verzeichnisstrukturprüfung:
   ✅ Data\navdata\Permanent\
   ✅ Data\navdata\Supplemental\
   ✅ Schreibrechte normal
```

Wenn die automatische Erkennung fehlschlägt, fordert das System zur manuellen Eingabe auf:
```
❌ Automatische Erkennung fehlgeschlagen
Bitte geben Sie den iFly 737 MAX 8 Installationspfad manuell ein:
```

### Schritt 4: Konvertierungsoptionen konfigurieren

```
╭─────────────────────────────────────────────── 🔄 Schritt 4/4 ────────────────────────────────────────────────╮
│ Konvertierungsoptionen konfigurieren                                                                                              │
│ Parameter für die Terminalverfahrensverarbeitung einstellen                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Startwert der Terminalverfahrens-ID [Standard: 1000]:
```

**Erläuterung der Konfigurationsoptionen:**
```
📊 Terminalverfahrens-ID-Konfiguration:
   • Start-ID: 1000 (empfohlen)
   • Erwarteter Nutzungsbereich: 1000-3500
   • Gesamtzahl der verfügbaren IDs: 9000
   • Empfohlener Puffer: 20%

⚙️ Weitere Optionen:
   • Koordinatengenauigkeit: 8 Dezimalstellen (Standard)
   • Berechnung der magnetischen Deklination: WMM-2025 Modell
   • AIRAC-Zyklus: Automatische Berechnung
```

## 🔄 Konvertierungsprozess

### Konfigurationsbestätigung

Bevor die Konvertierung beginnt, zeigt das System eine vollständige Konfigurationszusammenfassung an:

```
┌────────────────────────────────── ✅ Konfigurationsbestätigung der Konvertierung ──────────────────────────────────┐
│                                                                                   │
│  📂 Datenquellenkonfiguration                                                                     │
│  ├─ Fenix-Datenbank: .../navdata/nd.db3 (142.5 MB)                                  │
│  ├─ NAIP CSV-Datei: .../RTE_SEG.csv (8.2 MB)                                      │
│  └─ iFly Installationspfad: .../ifly-aircraft-737max8/                                    │
│                                                                                   │
│  ⚙️ Verarbeitungsparameter                                                                       │
│  ├─ Start-ID der Terminalverfahren: 1000                                                          │
│  ├─ Koordinatengenauigkeit: 8 Dezimalstellen                                                             │
│  ├─ Magnetisches Deklinationsmodell: WMM-2025                                                           │
│  └─ AIRAC-Zyklus: 2508 (automatisch berechnet)                                                    │
│                                                                                   │
│  📊 Erwartete Verarbeitung                                                                       │
│  ├─ Wegpunkte: ~12,456                                                            │
│  ├─ Terminalverfahren: ~350                                                             │
│  └─ Geschätzte Zeit: 5-10 Minuten                                                           │
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘

Konvertierung starten bestätigen? [J/n]:
```

### Routendatenverarbeitung

```
╭─────────────────────────────────────────── 🛣️ Routendaten verarbeiten ───────────────────────────────────────────╮
│                                                                                                      │
│ NAIP-Routenabschnittsdaten werden verarbeitet...                                                                          │
│                                                                                                      │
│ ████████████████████████████████████████ 12,456/12,456 (100%) ⏱️ 0:03:45                         │
│                                                                                                      │
│ Aktuelle Verarbeitung: A1 Route → ZSAM-VOR01 Abschnitt                                                                   │
│ Berechnung der magnetischen Deklination: 39.917°N, 116.383°E → +7.2°                                                            │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Routenverarbeitungsstatistik:
✅ Erfolgreich verarbeitet: 12,456 Wegpunkte
✅ Magnetische Deklinationsberechnung: 12,456 Mal (durchschnittlich 0.02s/Mal)
✅ Ausgabedatei: WPNAVRTE.txt (um 2.3 MB erhöht)
⚠️ Datensätze übersprungen: 23 (Koordinatenanomalie)
```

### Terminalverfahrensverarbeitung

```
╭─────────────────────────────────────────── 🏢 Terminalverfahren verarbeiten ───────────────────────────────────────────╮
│                                                                                                      │
│ Terminalverfahrensdaten werden konvertiert...                                                                              │
│                                                                                                      │
│ ████████████████████████████████████████ 350/350 (100%) ⏱️ 0:02:15                               │
│                                                                                                      │
│ Aktuelle Verarbeitung: ZBAA (Beijing Capital) → SID SHUAY1A                                                             │
│ Verfahrenstyp: Standard Instrument Departure Procedure                                                                           │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Terminalverfahrensstatistik:
✅ Flughäfen verarbeitet: 145
✅ SID-Verfahren: 234
✅ STAR-Verfahren: 198  
✅ Anflugverfahren: 312
✅ Neue Dateien hinzugefügt: 89
✅ Dateien aktualisiert: 56
```

### AIRAC-Zyklusverwaltung

```
╭─────────────────────────────────────────── 📅 AIRAC-Zyklusverwaltung ───────────────────────────────────────────╮
│                                                                                                      │
│ AIRAC-Zyklus wird berechnet und eingestellt...                                                                         │
│                                                                                                      │
│ 🗓️ Berechnungsinformationen                                                                                          │
│ ├─ Basisdatum: 2024-01-11 (AIRAC 2401)                                                               │
│ ├─ Aktuelles Datum: 2024-12-24                                                                             │
│ ├─ Vergangene Tage: 348 Tage                                                                                  │
│ ├─ Vergangene Zyklen: 12.43 → 12 vollständige Zyklen                                                                   │
│ └─ Aktueller Zyklus: 2508                                                                                    │
│                                                                                                      │
│ 📋 Zyklusdetails                                                                                          │
│ ├─ AIRAC-Bezeichnung: 2508                                                                                 │
│ ├─ Gültig ab: 2024-12-19                                                                             │
│ ├─ Ungültig ab: 2025-01-16                                                                             │
│ └─ Verbleibende Tage: 23 Tage                                                                                   │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

✅ AIRAC-Datei generiert: FMC_Ident.txt
```

## ✅ Konvertierung abgeschlossen

### Erfolgszusammenfassung

```
┌─────────────────────────────────────────── ✅ Konvertierung abgeschlossen ───────────────────────────────────────────────┐
│                                                                                                        │
│  🎉 Herzlichen Glückwunsch! Die Navigationsdatenkonvertierung wurde erfolgreich abgeschlossen.                                                                          │
│                                                                                                        │
│  📊 Verarbeitungsstatistik                                                                                            │
│  ├─ 🛣️ Routendaten: 12,456 Wegpunkte                                                                       │
│  ├─ 🏢 Terminalverfahren: 350 Verfahren (145 Flughäfen)                                                               │
│  ├─ 📅 AIRAC-Zyklus: 2508                                                                               │
│  └─ ⏱️ Gesamtzeit: 6 Minuten 32 Sekunden                                                                             │
│                                                                                                        │
│  📁 Ausgabedateien                                                                                            │
│  ├─ WPNAVRTE.txt: Routendaten (aktualisiert)                                                                  │
│  ├─ FMC_Ident.txt: AIRAC-Identifikationsdatei                                                                     │
│  ├─ Supplemental: 89 neue Verfahrensdateien                                                                      │
│  └─ Konvertierungsprotokoll: converter.log                                                                           │
│                                                                                                        │
│  🔄 Nächste Schritte                                                                                          │
│  1. Microsoft Flight Simulator neu starten                                                                   │
│  2. iFly 737 MAX 8 laden                                                                               │
│  3. Neue Routen und Verfahren im FMC überprüfen                                                                        │
│  4. Sicherungsdateien zur Wiederherstellung speichern                                                                               │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Erläuterung der Dateispeicherorte

Nach Abschluss der Konvertierung werden die Dateien an den folgenden Speicherorten abgelegt:

```
📁 iFly Navigationsdatenverzeichnis:
Community\ifly-aircraft-737max8\Data\navdata\

├── Permanent\
│   ├── WPNAVRTE.txt        # Routendaten (aktualisiert)
│   └── Andere Originaldateien...
│
├── Supplemental\
│   ├── ZBAA\              # Flughafen Peking Capital
│   │   ├── SID\           # Standard Instrument Departure
│   │   ├── STAR\          # Standard Terminal Arrival
│   │   └── APP\           # Anflugverfahren
│   ├── ZSPD\              # Flughafen Shanghai Pudong
│   └── ...andere Flughäfen
│
└── FMC_Ident.txt          # AIRAC-Identifikationsdatei
```

## 🧪 Konvertierungsergebnisse überprüfen

### 1. Dateiprüfung

```bash
# Prüfen, ob Dateien generiert wurden
ls -la "Community\ifly-aircraft-737max8\Data\navdata\"

# Dateigröße prüfen (sollte größer sein als vor der Konvertierung)
du -h "Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt"

# AIRAC-Identifikation überprüfen
cat "Community\ifly-aircraft-737max8\Data\navdata\FMC_Ident.txt"
```

### 2. Simulatorprüfung

1.  **MSFS neu starten**: Simulator vollständig beenden und neu starten
2.  **iFly 737 laden**: iFly 737 MAX 8 auswählen
3.  **FMC überprüfen**:
    ```
    FMC Hauptseite → INIT REF → AIRAC-Zyklus anzeigen
    Sollte anzeigen: AIRAC 2508
    ```
4.  **Routen testen**:
    ```
    ROUTE-Seite → Chinesische Routen eingeben (z.B. A1, B1)
    Sollte Wegpunkte und Entfernungen korrekt anzeigen
    ```

### 3. Funktionsprüfliste

- [ ] **AIRAC-Zyklus korrekt angezeigt**
- [ ] **Chinesische Routen können geladen werden** (A1, B1, G212 etc.)
- [ ] **Flughafenverfahren vollständig** (SID, STAR, APP)
- [ ] **Wegpunktkoordinaten genau**
- [ ] **Magnetische Deklination korrekt berechnet**
- [ ] **FMC-Navigation funktioniert korrekt**

## 🔧 Erweiterte Nutzung

### Stapelverarbeitungsmodus

Obwohl die aktuelle Version die Stapelverarbeitung nicht direkt unterstützt, können Sie dies mit einem Skript umsetzen:

```python
# batch_convert.py
import subprocess
import os

databases = [
    "path/to/fenix_db1.db3",
    "path/to/fenix_db2.db3"
]

csv_file = "path/to/RTE_SEG.csv"

for db in databases:
    print(f"Datenbank verarbeiten: {db}")
    # Hier muss main.py geändert werden, um Kommandozeilenparameter zu unterstützen
    # subprocess.run(["python", "main.py", "--db", db, "--csv", csv_file])
```

### Benutzerdefinierte Konfigurationsdatei

Erstellen Sie eine `config.json`-Datei, um häufig verwendete Konfigurationen zu speichern:

```json
{
    "default_fenix_path": "C:\\Users\\Username\\AppData\\Roaming\\Microsoft Flight Simulator\\Packages\\fenix-a320\\SimObjects\\Airplanes\\FenixA320\\navdata\\nd.db3",
    "default_csv_path": "D:\\Nav-Data\\RTE_SEG.csv",
    "terminal_id_start": 1500,
    "coordinate_precision": 8,
    "enable_backup": true,
    "backup_directory": "D:\\Nav-Data\\Backups"
}
```

### Datenaktualisierungsprozess

Empfohlener regelmäßiger Aktualisierungsprozess:

```bash
# 1. Aktuelle Daten sichern
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_$(date +%Y%m%d)"

# 2. Neueste NAIP-Daten herunterladen
# (Neue RTE_SEG.csv von der offiziellen Website herunterladen)

# 3. Neueste Fenix-Datenbank abrufen
# (Stellen Sie sicher, dass Fenix A320 auf die neueste Version aktualisiert wurde)

# 4. Konverter ausführen
python main.py

# 5. Ergebnis überprüfen
# (Neue Daten im Simulator testen)
```

## ⚠️ Wichtige Hinweise

### Wichtige Erinnerungen

1.  **Datensicherung**: Sichern Sie unbedingt die originalen iFly Navigationsdaten vor der Konvertierung
2.  **Versionskompatibilität**: Stellen Sie sicher, dass Sie die neuesten Versionen von Fenix A320 und iFly 737 MAX 8 verwenden
3.  **Aktualität**: Es wird empfohlen, die AIRAC-Daten alle 28 Tage zu aktualisieren
4.  **Validierungstests**: Führen Sie nach der Konvertierung Testflüge auf wichtigen Routen durch

### Leistungsoptimierung

1.  **SSD verwenden**: Legen Sie die Datendateien auf einer SSD ab, um die Verarbeitungsgeschwindigkeit zu erhöhen
2.  **Antivirenprogramm deaktivieren**: Deaktivieren Sie vorübergehend den Echtzeit-Scan, um Dateizugriffskonflikte zu vermeiden
3.  **Ausreichend Speicher**: Stellen Sie sicher, dass mindestens 4 GB verfügbarer Speicher vorhanden sind
4.  **Stabile Stromversorgung**: Verwenden Sie eine USV oder stellen Sie eine stabile Stromversorgung sicher

### Fehlerbehebung

Wenn während der Konvertierung Probleme auftreten:

1.  **Protokoll prüfen**: Überprüfen Sie die Fehlerinformationen in der Datei `converter.log`
2.  **Vorgang wiederholen**: Einige Netzwerk- oder Dateizugriffsprobleme können temporär sein
3.  **Cache leeren**: Löschen Sie temporäre Dateien und versuchen Sie es erneut
4.  **Einstellungen herabstufen**: Wenn der Speicherplatz nicht ausreicht, können Sie die Stapelverarbeitungsgröße reduzieren

---

**Herzlichen Glückwunsch zum Abschluss!** 🎉 

Sie beherrschen nun die vollständige Nutzung des iFly Navigationsdaten-Konverters. Sollten Probleme auftreten, konsultieren Sie bitte das [Handbuch zur Fehlerbehebung](../troubleshooting.md) oder die [FAQ](../faq.md).

Viel Spaß beim Fliegen! ✈️
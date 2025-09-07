# 🔧 Fehlerbehebungsleitfaden

Dieser Leitfaden behandelt häufige Probleme und deren Lösungen, die bei der Verwendung des Nav-data PMDG Konvertierungstools auftreten können. Er ist nach Problemtypen kategorisiert, um eine schnelle Lokalisierung und Behebung zu erleichtern.

---

## 🚨 Installationsprobleme

### ❌ Python-Umgebungsprobleme

#### **Problem**: `python: command not found` oder `'python' ist kein interner oder externer Befehl`
**Symptom**:
```bash
'python' is not recognized as an internal or external command
```

**Lösung**:
```bash
# 1. Python-Installation überprüfen
python --version
# oder
python3 --version

# 2. PATH-Umgebungsvariable prüfen
echo $PATH  # Linux/macOS
echo %PATH%  # Windows

# 3. Python neu installieren (Download von der offiziellen Website empfohlen)
# https://www.python.org/downloads/
```

#### **Problem**: Installation von Abhängigkeitspaketen fehlgeschlagen
**Symptom**:
```bash
ERROR: Could not find a version that satisfies the requirement
```

**Lösung**:
```bash
# 1. pip aktualisieren
python -m pip install --upgrade pip

# 2. Nationalen Spiegelserver verwenden (Benutzer in China)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 3. pip-Cache leeren
pip cache purge

# 4. Virtuelle Umgebung verwenden
python -m venv nav_data_env
source nav_data_env/bin/activate  # Linux/macOS
nav_data_env\Scripts\activate     # Windows
```

### ❌ Berechtigungsprobleme

#### **Problem**: Zugriff auf das MSFS-Verzeichnis verweigert
**Symptom**:
```
PermissionError: [Errno 13] Permission denied
```

**Lösung**:
```bash
# Windows-Benutzer
# 1. Eingabeaufforderung als Administrator ausführen
# 2. Oder Verzeichnisberechtigungen ändern
icacls "C:\Users\[USERNAME]\AppData\Local\Packages" /grant Users:F /T

# MSFS-Verzeichnisberechtigungen überprüfen
# Rechtsklick auf das Verzeichnis -> Eigenschaften -> Sicherheit -> Bearbeiten -> Vollzugriffsberechtigungen hinzufügen
```

---

## 🔄 Konvertierungsprobleme

### ❌ Datendateiprobleme

#### **Problem**: AIRAC-Datendatei nicht gefunden
**Symptom**:
```
FileNotFoundError: AIRAC data file not found
```

**Diagnoseschritte**:
```bash
# 1. Dateipfad überprüfen
ls -la ./input/AIRAC2024-01/  # Linux/macOS
dir .\input\AIRAC2024-01\     # Windows

# 2. Dateiberechtigungen prüfen
ls -la *.dat *.txt *.xml      # Datendateien überprüfen
```

**Lösung**:
```bash
# 1. Datendateiformat und -speicherort bestätigen
mkdir -p ./input/AIRAC2024-01
# AIRAC-Datendateien in das richtige Verzeichnis legen

# 2. Dateigültigkeit überprüfen
python validate_data.py --check-integrity --input-dir=./input/AIRAC2024-01
```

#### **Problem**: Datenformat inkompatibel
**Symptom**:
```
ValueError: Unsupported data format or corrupted file
```

**Lösung**:
```bash
# 1. Unterstützte Formate prüfen
python converter.py --list-supported-formats

# 2. Datenformat konvertieren
python format_converter.py --input=old_format.dat --output=new_format.xml --format=ARINC424

# 3. Debug-Modus für detaillierte Informationen verwenden
python converter.py --debug --verbose --input=problematic_file.dat
```

### ❌ Fehler während des Konvertierungsvorgangs

#### **Problem**: Fehler wegen zu wenig Arbeitsspeicher
**Symptom**:
```
MemoryError: Unable to allocate array
```

**Lösung**:
```bash
# 1. Große Datensätze in Blöcken verarbeiten
python converter.py --batch-size=1000 --memory-limit=4GB

# 2. Datenstromverarbeitung aktivieren
python converter.py --streaming-mode --temp-dir=/tmp/nav_data

# 3. Virtuellen Arbeitsspeicher erhöhen (Windows)
# Systemsteuerung -> System -> Erweiterte Systemeinstellungen -> Virtueller Arbeitsspeicher

# 4. Systemressourcen optimieren
# Unnötige Programme schließen
# Temporäre Dateien bereinigen
```

#### **Problem**: Koordinatenkonvertierungsfehler
**Symptom**:
```
CoordinateTransformError: Invalid coordinate conversion
```

**Lösung**:
```bash
# 1. Koordinatensystemeinstellungen überprüfen
python converter.py --coordinate-system=WGS84 --verify-coordinates

# 2. Alternative Konvertierungsmethode verwenden
python converter.py --coordinate-method=alternative --precision=8

# 3. Missweisungseinstellungen prüfen
python converter.py --magnetic-model=WMM2020 --declination-check
```

---

## ⚙️ Konfigurationsprobleme

### ❌ PMDG-Integrationsprobleme

#### **Problem**: PMDG-Flugzeug erkennt Navigationsdaten nicht
**Symptom**: FMC zeigt "NAV DATA NOT FOUND" oder Navigationspunkte können nicht geladen werden

**Diagnoseschritte**:
```bash
# 1. PMDG-Datenverzeichnis prüfen
dir "C:\Users\%USERNAME%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\PMDG\"

# 2. Datenbankdatei überprüfen
python verify_pmdg_db.py --check-tables --check-indexes
```

**Lösung**:
```bash
# 1. PMDG-Datenpfad bestätigen
python converter.py --pmdg-path="C:\Users\[USERNAME]\AppData\Local\Packages\Microsoft.FlightSimulator_[ID]\LocalCache\PMDG"

# 2. Datenbankindizes neu generieren
python rebuild_indexes.py --database=pmdg_nav.db

# 3. Dateiberechtigungen prüfen
icacls "PMDG Datenverzeichnis" /grant Users:F /T

# 4. MSFS und PMDG-Flugzeug neu starten
```

#### **Problem**: Datenversion stimmt nicht überein
**Symptom**: PMDG zeigt alten AIRAC-Zyklus oder Daten werden nicht aktualisiert

**Lösung**:
```bash
# 1. AIRAC-Bezeichner erzwingen
python converter.py --force-airac-update --airac-cycle=2024-01

# 2. Cache leeren
python clear_cache.py --pmdg-cache --nav-cache

# 3. AIRAC-Zyklus überprüfen
python verify_airac.py --current-cycle --check-validity
```

---

## 🚀 Leistungsprobleme

### ❌ Langsame Konvertierungsgeschwindigkeit

#### **Problem**: Konvertierungsprozess ist ungewöhnlich langsam
**Mögliche Ursachen**:
- Engpass bei der Festplatten-I/O
- Zu wenig Arbeitsspeicher
- Geringe CPU-Auslastung
- Netzwerklatenz (Online-Validierung)

**Optimierungslösungen**:
```bash
# 1. Multiprocessing aktivieren
python converter.py --parallel=4 --workers=auto

# 2. SSD-Temp-Verzeichnis verwenden
python converter.py --temp-dir="D:\SSD_Temp" --keep-temp-files=false

# 3. Unnötige Validierungen deaktivieren
python converter.py --skip-validation --no-online-check

# 4. I/O-Operationen optimieren
python converter.py --buffer-size=64MB --async-io
```

### ❌ Hoher Arbeitsspeicherverbrauch

#### **Problem**: Konvertierungsprozess verbraucht viel Arbeitsspeicher
**Arbeitsspeicherverbrauch überwachen**:
```bash
# Windows
tasklist /fi "imagename eq python.exe"

# Linux/macOS  
top -p $(pgrep python)
```

**Lösung**:
```bash
# 1. Streaming aktivieren
python converter.py --streaming --chunk-size=10MB

# 2. Arbeitsspeichernutzung begrenzen
python converter.py --max-memory=2GB --gc-threshold=100MB

# 3. In Phasen verarbeiten
python converter.py --process-by-region --region-size=small
```

---

## 🔍 Datenvalidierungsprobleme

### ❌ Datenintegritätsprüfung fehlgeschlagen

#### **Problem**: Validierungstool meldet unvollständige Daten
**Symptom**:
```
ValidationError: Missing required navigation points
```

**Diagnosetools**:
```bash
# 1. Umfassende Validierung ausführen
python validate_data.py --comprehensive --output-report=validation_report.html

# 2. Spezifische Datentypen prüfen
python validate_data.py --check-airports --check-navaids --check-airways

# 3. Mit Referenzdaten vergleichen
python compare_data.py --reference=official_data.xml --current=converted_data.db
```

**Reparaturlösung**:
```bash
# 1. Quelldaten erneut herunterladen
# Sicherstellen, dass die AIRAC-Daten vollständig und aktuell sind

# 2. Reparaturtool verwenden
python repair_data.py --fix-missing --interpolate-gaps

# 3. Fehlende Daten manuell ergänzen
python manual_fix.py --add-missing-waypoints --config=fixes.json
```

### ❌ Koordinatengenauigkeitsprobleme

#### **Problem**: Position der Navigationspunkte ungenau
**Prüfmethode**:
```bash
# 1. Koordinaten spezifischer Wegpunkte überprüfen
python check_waypoint.py --icao=ZSPD --waypoint=SASAN

# 2. Mehrere Datenquellen vergleichen
python compare_coordinates.py --sources=navigraph,aerosoft --output=coordinate_diff.csv

# 3. Abweichungsbericht generieren
python deviation_report.py --threshold=0.001 --output=deviations.html
```

---

## 📊 Log-Analyse

### 🔍 Log-Dateien verstehen

#### **Erläuterung der Log-Level**:
- **DEBUG**: Detaillierte Debugging-Informationen
- **INFO**: Allgemeine Verarbeitungsinformationen
- **WARNING**: Warnmeldungen, beeinträchtigen die Funktionalität nicht
- **ERROR**: Fehlermeldungen, die Beachtung erfordern
- **CRITICAL**: Schwerwiegende Fehler, die die Verarbeitung unterbrechen

#### **Häufige Log-Muster**:
```bash
# Fehler-Logs finden
grep "ERROR\|CRITICAL" converter.log

# Anzahl der Warnungen zählen
grep -c "WARNING" converter.log

# Verarbeitungszeit analysieren
grep "Processing time" converter.log | tail -10
```

### 🔧 Log-Konfiguration

#### **Detaillierungsgrad der Logs erhöhen**:
```bash
# Detaillierte Logs aktivieren
python converter.py --log-level=DEBUG --log-format=detailed

# Logs nach Typ trennen
python converter.py --log-split --error-log=errors.log --debug-log=debug.log
```

---

## 🆘 Notfallreparaturen

### 🚨 Wiederherstellung beschädigter Daten

#### **Schritt 1**: Sofortige Sicherung
```bash
# Aktuellen Zustand sichern
cp -r ./output ./backup_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
xcopy .\output .\backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E /I  # Windows
```

#### **Schritt 2**: Aus Sicherung wiederherstellen
```bash
# Neueste gültige Sicherung wiederherstellen
python restore_backup.py --list-backups
python restore_backup.py --restore=backup_20240115_1430 --target=./output
```

#### **Schritt 3**: Wiederherstellung überprüfen
```bash
# Wiederhergestellte Daten überprüfen
python validate_data.py --quick-check --report-only-errors
```

### 🚨 Auf Standardzustand zurücksetzen

#### **Vollständiges Zurücksetzen**:
```bash
# WARNUNG: Dies löscht alle konvertierten Daten
python reset_tool.py --full-reset --confirm

# Standardkonfiguration erneut herunterladen
python setup.py --download-config --reset-settings

# Initialisierung erneut ausführen
python init.py --first-time-setup
```

---

## 📞 Weitere Hilfe anfordern

### 📝 Bitte bei der Problem報告 angeben

1. **Systeminformationen**:
   ```bash
   python --version
   python system_info.py --full-report
   ```

2. **Fehler-Logs**:
   - Vollständiger Fehler-Stack-Trace
   - Relevante Warnmeldungen
   - Log-Ausschnitte vor und nach der Verarbeitung

3. **Umgebungsinformationen**:
   - Betriebssystemversion
   - MSFS-Version und Installationsmethode
   - PMDG-Flugzeugversion
   - Datenquelle und AIRAC-Zyklus

4. **Reproduktionsschritte**:
   - Detaillierte Bedienschritte
   - Eingegebene Befehle und Parameter
   - Erwartetes Ergebnis vs. tatsächliches Ergebnis

### 🔗 Kontaktinformationen

- **GitHub Issues**: [Problembericht einreichen](https://github.com/nav-data/docs/issues/new)
- **Community-Forum**: [An Diskussionen teilnehmen](https://github.com/nav-data/docs/discussions)
- **Notfall-Support**: support@nav-data.org

---

## 🔄 Vorsichtsmaßnahmen

### ✅ Checkliste bewährter Methoden

- [ ] **Daten und Konfiguration regelmäßig sichern**
- [ ] **Die neueste Version** des Konvertierungstools verwenden
- [ ] **Daten validieren** nach jeder Konvertierung
- [ ] **Logs überwachen** um potenzielle Probleme zu erkennen
- [ ] **Umgebung sauber und aktuell halten**
- [ ] **Benutzerdefinierte Konfiguration dokumentieren**

### 📅 Wartungsplan

- **Wöchentlich**: Log-Dateien prüfen, temporäre Dateien bereinigen
- **Monatlich**: AIRAC-Daten aktualisieren, Tool-Version überprüfen
- **Quartalsweise**: Vollständige Systemprüfung, Leistungsoptimierung
- **Bei wichtigen Updates**: Vollständige Sicherung, vorsichtiges Upgrade

Denken Sie daran: Vorbeugen ist besser als Heilen! Regelmäßige Wartung kann die meisten Probleme vermeiden.
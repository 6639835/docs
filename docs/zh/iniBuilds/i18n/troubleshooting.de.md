# 🔧 Fehlerbehebungsanleitung

Diese Anleitung behandelt häufige Probleme und deren Lösungen, die bei der Verwendung des Nav-data iniBuilds Konvertierungstools auftreten können. Sie ist nach Schweregrad und Art des Problems kategorisiert, um eine schnelle Diagnose und Behebung zu ermöglichen.

---

## 🚨 Kritische Probleme (Critical Issues)

### ❌ Konvertierungstool startet nicht

#### **Problem**: Python-Umgebungsprobleme verhindern den Start des Tools
**Symptome**:
```bash
ModuleNotFoundError: No module named 'converter'
ImportError: cannot import name 'XP2INI_Converter'
```

**Sofortige Lösung**:
```bash
# 1. Python-Umgebung überprüfen
python --version  # Sollte 3.8+ anzeigen

# 2. Abhängigkeiten neu installieren
pip uninstall -r requirements.txt -y
pip install -r requirements.txt --force-reinstall

# 3. Arbeitsverzeichnis prüfen
pwd  # Linux/macOS
echo %cd%  # Windows

# 4. Repository neu klonen (letzte Option)
git clone https://github.com/nav-data/converter.git
cd converter
python setup.py install
```

#### **Problem**: Kritische Dateien fehlen
**Symptome**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'XP2INI_NDB_Converter.py'
```

**Sofortige Lösung**:
```bash
# 1. Dateiintegrität überprüfen
ls -la *.py  # Linux/macOS
dir *.py     # Windows

# 2. Fehlende Dateien neu herunterladen
wget https://raw.githubusercontent.com/nav-data/converter/main/XP2INI_NDB_Converter.py

# 3. Berechtigungen überprüfen
chmod +x *.py  # Linux/macOS
```

---

## ⚠️ Probleme hoher Priorität (High Priority)

### ❌ A350-Datenintegration fehlgeschlagen

#### **Problem**: iniBuilds A350 erkennt Navigationsdaten nicht
**Symptome**: MCDU zeigt "NO NAV DATA" an oder AIRAC-Anzeige ist leer

**Diagnoseschritte**:
```bash
# 1. A350-Installationspfad prüfen
find /c/Users -name "*inibuilds*" -type d 2>/dev/null  # Windows (Git Bash)
find /Users -name "*inibuilds*" -type d 2>/dev/null    # macOS
find /home -name "*inibuilds*" -type d 2>/dev/null     # Linux

# 2. Community-Ordner überprüfen
ls "$MSFS_COMMUNITY_PATH/inibuilds-aircraft-a350/SimObjects/Airplanes/iniBuilds_A350_900/"

# 3. Datendateien prüfen
ls -la *.db *.sqlite *.json  # Im A350-Datenverzeichnis
```

**Lösungen**:
```bash
# 1. A350-Installation neu lokalisieren
python converter.py --detect-aircraft --scan-community-folder

# 2. Pfad manuell angeben
python converter.py --a350-path="/path/to/inibuilds-aircraft-a350" --force-install

# 3. Dateiberechtigungen reparieren
# Windows
icacls "A350-Datenverzeichnis" /grant Users:F /T

# Linux/macOS  
chmod -R 755 /path/to/inibuilds-aircraft-a350/
chown -R $USER:$USER /path/to/inibuilds-aircraft-a350/

# 4. Installation überprüfen
python verify_installation.py --aircraft=a350 --verbose
```

#### **Problem**: AIRAC-Zyklus stimmt nicht überein
**Symptome**: A350 zeigt einen alten oder falschen AIRAC-Zyklus an

**Lösungen**:
```bash
# 1. AIRAC-Bezeichner erzwingen
python converter.py --force-airac --cycle=2024-01 --aircraft=a350

# 2. A350-Cache leeren
# A350-Cache-Dateien löschen
rm -f "$A350_PATH/work/NavData/cache/*"  # Linux/macOS
del "%A350_PATH%\work\NavData\cache\*"   # Windows

# 3. Navigationsdatenbank neu generieren
python rebuild_navdb.py --aircraft=a350 --clean-rebuild

# 4. AIRAC-Zyklus überprüfen
python check_airac.py --aircraft=a350 --expected-cycle=2024-01
```

---

## 🔄 Installations- und Konfigurationsprobleme

### ❌ Installation von Abhängigkeitspaketen fehlgeschlagen

#### **Problem**: Installation bestimmter Pakete fehlgeschlagen
**Häufige Fehler**:
```bash
# Abhängigkeitsprobleme der Mathematikbibliothek
ERROR: Failed building wheel for numpy
ERROR: Failed building wheel for pandas

# Compiler-Probleme
Microsoft Visual C++ 14.0 is required
error: Microsoft Visual Studio 14.0 is required
```

**Lösung nach Plattform**:

**Windows**:
```bash
# 1. Visual Studio Build Tools installieren
# Herunterladen und installieren: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# 2. Vorab kompilierte Pakete verwenden
pip install numpy pandas -f https://www.lfd.uci.edu/~gohlke/pythonlibs/

# 3. conda verwenden (empfohlen)
conda install numpy pandas sqlite3 lxml
```

**macOS**:
```bash
# 1. Xcode Command Line Tools installieren
xcode-select --install

# 2. Abhängigkeiten mit Homebrew installieren
brew install python@3.9 sqlite3

# 3. Python-Pakete neu installieren
pip3 install -r requirements.txt
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3-dev python3-pip build-essential libsqlite3-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel sqlite-devel

# Pakete neu installieren
pip3 install -r requirements.txt
```

### ❌ Datenquellen-Konfigurationsprobleme

#### **Problem**: Verbindung zur Datenquelle nicht möglich
**Symptome**:
```
ConnectionError: Failed to download AIRAC data
TimeoutError: Data source unreachable
```

**Netzwerkdiagnose**:
```bash
# 1. Netzwerkverbindung testen
ping navigraph.com
nslookup navigraph.com

# 2. Proxy-Einstellungen überprüfen
echo $HTTP_PROXY $HTTPS_PROXY  # Linux/macOS
echo %HTTP_PROXY% %HTTPS_PROXY%  # Windows

# 3. Port-Konnektivität testen
telnet navigraph.com 443
nc -zv navigraph.com 443  # Linux/macOS
```

**Lösungen**:
```bash
# 1. Proxy konfigurieren (falls erforderlich)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# Windows
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=https://proxy.company.com:8080

# 2. Offline-Modus verwenden
python converter.py --offline --local-data=/path/to/airac/data

# 3. Datenquelle wechseln
python converter.py --data-source=backup --mirror=asia
```

---

## 📊 Datenverarbeitungsprobleme

### ❌ Speicherbezogene Fehler

#### **Problem**: Zu wenig Speicher führt zu Konvertierungsfehlern
**Symptome**:
```
MemoryError: Unable to allocate memory
MemoryError: cannot allocate memory for array
OSError: [Errno 12] Cannot allocate memory
```

**Speicherüberwachung**:
```bash
# Speichernutzung in Echtzeit überwachen
# Linux
free -h
htop

# macOS
vm_stat
activity monitor

# Windows
tasklist /fi "imagename eq python.exe"
wmic process get name,processid,workingsetsize
```

**Optimierungslösungen**:
```bash
# 1. Streaming-Modus aktivieren
python converter.py --streaming --chunk-size=512KB --memory-limit=2GB

# 2. Bereichsweise Verarbeitung
python converter.py --region=ZSPD --process-incrementally
python converter.py --region=ZBAA --process-incrementally  
python converter.py --region=ZGGG --process-incrementally

# 3. Systemspeicher optimieren
# Unnötige Anwendungen schließen
# Virtuellen Speicher/Swap-Bereich erhöhen

# Linux - Swap-Bereich erhöhen
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. Low-Memory-Modus verwenden
python converter.py --low-memory --disable-cache --temp-cleanup
```

### ❌ Datenformatfehler

#### **Problem**: Eingabedatenformat inkompatibel
**Symptome**:
```
ValueError: Invalid ARINC 424 format
ParseError: Malformed XML data
UnicodeDecodeError: codec can't decode byte
```

**Datenvalidierung**:
```bash
# 1. Dateikodierung überprüfen
file input_data.dat
hexdump -C input_data.dat | head

# 2. Dateiintegrität überprüfen
md5sum input_data.dat  # Linux/macOS
certUtil -hashfile input_data.dat MD5  # Windows

# 3. Dateiformat überprüfen
python validate_format.py --input=input_data.dat --format=arinc424
```

**Reparaturlösungen**:
```bash
# 1. Dateikodierung konvertieren
iconv -f ISO-8859-1 -t UTF-8 input_data.dat > input_data_utf8.dat  # Linux/macOS

# Windows (PowerShell)
Get-Content input_data.dat -Encoding Default | Set-Content input_data_utf8.dat -Encoding UTF8

# 2. Formatkonverter verwenden
python format_converter.py --input=input_data.dat --from=legacy --to=arinc424

# 3. Häufige Probleme manuell beheben
python repair_data.py --fix-encoding --fix-line-endings --input=input_data.dat
```

---

## 🚀 Leistungsprobleme

### ❌ Konvertierungsgeschwindigkeit zu langsam

#### **Problem**: Konvertierungsprozess ungewöhnlich langsam
**Mögliche Ursachenanalyse**:
- Festplatten-I/O-Engpass (HDD vs SSD)
- Geringe CPU-Auslastung (Single-Thread-Verarbeitung)
- Unzureichender Speicher führt zu häufigem Swapping
- Netzwerkverzögerung (Online-Verifizierung)

**Leistungsdiagnose**:
```bash
# 1. Systemressourcen überwachen
# Linux
iostat -x 1    # I/O-Statistiken
top -p $(pgrep python)  # CPU und Speicher

# macOS
iostat 1       # I/O-Statistiken  
top -pid $(pgrep python)  # Prozessüberwachung

# Windows
perfmon        # Leistungsmonitor
wmic process get name,processid,percentprocessortime
```

**Leistungsoptimierung**:
```bash
# 1. Multiprocessing aktivieren
python converter.py --parallel=auto --workers=$(nproc)

# 2. Schnelleren Speicher verwenden
python converter.py --temp-dir=/path/to/ssd/temp --output-dir=/path/to/ssd/output

# 3. Unnötige Prüfungen deaktivieren
python converter.py --skip-validation --no-backup --fast-mode

# 4. Memory-Mapped-Modus (große Dateien)
python converter.py --memory-map --buffer-size=64MB

# 5. Ausgabe komprimieren (I/O reduzieren)
python converter.py --compress-output --compression=lz4
```

### ❌ Hohe CPU-Auslastung

#### **Problem**: Konvertierungsprozess mit 100% CPU-Auslastung, System reagiert langsam
**Lösungen**:
```bash
# 1. CPU-Nutzung begrenzen
python converter.py --cpu-limit=75 --nice=10

# 2. Parallelität reduzieren
python converter.py --parallel=2 --throttle=1000ms

# 3. Prioritätssteuerung verwenden
# Linux/macOS
nice -n 19 python converter.py  # Niedrigste Priorität

# Windows  
start /low python converter.py
```

---

## 🔍 iniBuilds A350 Spezifische Probleme

### ❌ MCDU-Navigationsdatenanzeigeprobleme

#### **Problem**: Navigationsdaten in der MCDU werden falsch oder unvollständig angezeigt
**Symptome**:
- Wegpunkte nicht gefunden
- SID/STAR-Prozeduren fehlen
- Falsche Frequenzinformationen
- Koordinatenversatz

**Diagnosetools**:
```bash
# 1. A350-Datenbankintegrität überprüfen
python check_a350_db.py --comprehensive --report=detailed

# 2. Spezifischen Navigationspunkt überprüfen
python verify_waypoint.py --icao=ZSPD --waypoint=SASAN --aircraft=a350

# 3. Datenkonsistenz vergleichen
python compare_data.py --source=navigraph --target=a350_db --threshold=0.001

# 4. Differenzbericht erstellen
python diff_report.py --original=source_data --converted=a350_data --format=html
```

**Reparaturschritte**:
```bash
# 1. Navigationsdatenbank neu generieren
python rebuild_navdb.py --aircraft=a350 --source=latest_airac

# 2. Kritische Wegpunkte manuell beheben
python manual_fix.py --waypoints=critical_fixes.json --aircraft=a350

# 3. Frequenzdaten aktualisieren
python update_frequencies.py --aircraft=a350 --source=official

# 4. Reparaturergebnisse überprüfen
python validate_fix.py --aircraft=a350 --quick-test
```

### ❌ FMS-Routenplanungsprobleme

#### **Problem**: A350 FMS kann Routen nicht korrekt planen
**Symptome**:
- "NO ROUTE FOUND"-Fehler
- Routensegmentverbindung unterbrochen
- Höhenbegrenzungsfehler

**Behebungsschritte**:
```bash
# 1. Routenkonnektivität überprüfen
python check_airways.py --from=ZSPD --to=ZBAA --aircraft=a350

# 2. Wegpunktverbindung überprüfen
python validate_connections.py --airway=A461 --aircraft=a350

# 3. Unterbrochene Routen reparieren
python repair_airways.py --auto-fix --aircraft=a350 --region=china

# 4. Routennetzwerk neu aufbauen
python rebuild_airways.py --aircraft=a350 --optimize-paths
```

---

## 📋 Log-Analyse und Diagnose

### 🔍 Fehlerprotokolle verstehen

#### **Häufige Fehlermuster und Bedeutungen**:

**Datenkonvertierungsfehler**:
```bash
# Koordinatenkonvertierungsproblem
ERROR: CoordinateTransformError: Invalid coordinate format
# -> Eingabedaten auf Koordinatenformat prüfen

# Datenbank-Schreibfehler  
ERROR: DatabaseError: database is locked
# -> Andere Programme schließen, die auf die Datenbank zugreifen

# Dateiberechtigungsproblem
ERROR: PermissionError: [Errno 13] Permission denied
# -> Administratorrechte verwenden oder Dateiberechtigungen ändern
```

**Netzwerkverbindungsfehler**:
```bash
# Verbindungstimeout
ERROR: ConnectionTimeout: Failed to connect within 30 seconds
# -> Netzwerkverbindung prüfen, Timeout erhöhen

# DNS-Auflösung fehlgeschlagen
ERROR: socket.gaierror: [Errno -2] Name or service not known  
# -> DNS-Einstellungen prüfen, alternativen DNS-Server verwenden
```

#### **Detaillierte Erläuterung der Log-Level**:
- **CRITICAL**: Schwerwiegender Fehler, der die weitere Ausführung des Programms verhindert
- **ERROR**: Funktionsausführung fehlgeschlagen, das Programm kann jedoch fortgesetzt werden
- **WARNING**: Potenzielles Problem, das die aktuelle Ausführung nicht beeinträchtigt
- **INFO**: Allgemeine Informationen, Verarbeitungsfortschritt usw.
- **DEBUG**: Detaillierte Debugging-Informationen zur Problemdiagnose

### 🛠️ Erweiterte Debugging-Techniken

#### **Detailliertes Debugging aktivieren**:
```bash
# 1. Detaillierteste Protokolle
python converter.py --log-level=DEBUG --verbose --trace --profile

# 2. Verschiedene Log-Typen trennen
python converter.py --log-split \
  --error-log=errors.log \
  --warning-log=warnings.log \
  --debug-log=debug.log \
  --info-log=info.log

# 3. Logs in Echtzeit überwachen
tail -f converter.log | grep -E "(ERROR|CRITICAL)"  # Linux/macOS
```

#### **Leistungsanalyse**:
```bash
# 1. Leistungsanalyse aktivieren
python -m cProfile -o profile_output.prof converter.py

# 2. Leistungsengpässe analysieren
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"

# 3. Speichernutzungsanalyse
python -m memory_profiler converter.py --memory-profile
```

---

## 🆘 Notfallwiederherstellungsverfahren

### 🚨 Datenkorruptionswiederherstellung

#### **Schnelle Wiederherstellungsschritte**:
```bash
# 1. Alle relevanten Prozesse sofort stoppen
pkill -f "python.*converter"  # Linux/macOS
taskkill /f /im python.exe    # Windows

# 2. Snapshot des aktuellen Zustands erstellen
cp -r output_data recovery_snapshot_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
robocopy output_data recovery_snapshot_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E  # Windows

# 3. Aus der letzten Sicherung wiederherstellen
python restore_backup.py --list-available
python restore_backup.py --restore=latest --confirm --target=output_data

# 4. Wiederhergestellte Daten überprüfen
python verify_data_integrity.py --comprehensive --fix-minor-issues
```

### 🔄 Vollständiges Reset-Verfahren

#### **Wenn alle Methoden fehlschlagen**:
```bash
# Warnung: Dies löscht alle konvertierten Daten und Konfigurationen
echo "This will delete all converted data. Continue? (yes/no)"
read confirmation
if [ "$confirmation" = "yes" ]; then
    # 1. Benutzerkonfiguration sichern
    cp config.json config_backup_$(date +%Y%m%d).json
    
    # 2. Vollständige Bereinigung
    python cleanup_all.py --nuclear-option --confirm-delete
    
    # 3. Neu initialisieren
    python setup.py --fresh-install --default-config
    
    # 4. Benutzerkonfiguration wiederherstellen
    python merge_config.py --base=config.json --user=config_backup_*.json
fi
```

---

## 📞 Professionellen Support erhalten

### 📝 Supportanfrage vorbereiten

**Bevor Sie den Support kontaktieren, sammeln Sie bitte die folgenden Informationen**:

```bash
# 1. Systeminformationsbericht
python system_report.py --full > system_info.txt

# 2. Fehlerprotokoll (letzte 100 Zeilen)
tail -100 converter.log > recent_errors.log  # Linux/macOS
powershell "Get-Content converter.log -Tail 100" > recent_errors.log  # Windows

# 3. Konfigurationsdatei
cp config.json config_for_support.json

# 4. Versionsinformationen
python --version > version_info.txt
python converter.py --version >> version_info.txt
git log --oneline -5 >> version_info.txt
```

### 🔗 Supportkanäle

#### **Nach Dringlichkeit auswählen**:

**🚨 Dringend (beeinträchtigt den Flug innerhalb von 24 Stunden)**:
- 📧 **Notfall-E-Mail**: emergency@nav-data.org
- 📱 **Dringender Kontakt**: WeChat-Gruppe "Nav-data Emergency Support"

**⚠️ Wichtig (Antwort innerhalb von 1-3 Tagen)**:
- 🐛 **GitHub Issues**: [Detaillierten Problembericht erstellen](https://github.com/nav-data/docs/issues/new?template=bug_report.md)
- 📧 **Technischer Support**: technical@nav-data.org

**💬 Allgemeine Fragen (Antwort innerhalb von 1 Woche)**:
- 🗣️ **Community-Diskussionen**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 📧 **Allgemeiner Support**: support@nav-data.org

#### **Vorlage für Supportanfrage**:
```
Betreff: [iniBuilds] Kurze Problembeschreibung - Auswirkungsebene

Umgebungsinformationen:
- Betriebssystem: Windows 11 / macOS 12.6 / Ubuntu 22.04
- Python-Version: 3.9.7
- Tool-Version: v2.1.3
- iniBuilds A350-Version: v1.2.0
- MSFS-Version: 2024

Problembeschreibung:
[Detaillierte Beschreibung des Problems]

Schritte zur Reproduktion:
1. Erster Schritt...
2. Zweiter Schritt...
3. Problem tritt auf

Erwartetes Ergebnis:
[Beschreiben Sie das erwartete korrekte Verhalten]

Tatsächliches Ergebnis:
[Beschreiben Sie das tatsächlich aufgetretene Fehlverhalten]

Versuchte Lösungen:
- Lösung A versucht, Ergebnis...
- Lösung B versucht, Ergebnis...

Anhänge:
- system_info.txt
- recent_errors.log
- config_for_support.json
```

---

## 🔄 Präventive Wartung

### ✅ Checkliste für regelmäßige Wartung

#### **Wöchentliche Prüfung**:
- [ ] Logdateien überprüfen, um potenzielle Probleme zu identifizieren
- [ ] Temporäre Dateien und Cache bereinigen
- [ ] A350-Datenladung auf Korrektheit prüfen
- [ ] Speicherplatznutzung überprüfen

```bash
# Automatisierte wöchentliche Prüfung
python weekly_maintenance.py --clean-temp --check-logs --verify-data --disk-usage
```

#### **Monatliche Prüfung**:
- [ ] AIRAC-Daten aktualisieren
- [ ] Wichtige Konfigurationen und Daten sichern
- [ ] Auf Tool-Versionen-Updates prüfen
- [ ] Leistungs-Benchmark-Test

```bash
# Automatisierte monatliche Wartung
python monthly_maintenance.py --update-airac --backup-data --check-updates --benchmark
```

#### **Vor wichtigen Updates**:
- [ ] Vollständige Datensicherung
- [ ] Testumgebungsverifizierung
- [ ] Versionskompatibilitätsprüfung
- [ ] Vorbereitung eines Rollback-Plans

### 📊 Überwachung und Benachrichtigungen

#### **Automatische Überwachung einrichten**:
```bash
# 1. Überwachungsskript erstellen
python create_monitor.py --check-interval=1h --alert-email=admin@your-domain.com

# 2. Systemdienst einrichten (Linux)
sudo systemctl enable nav-data-monitor
sudo systemctl start nav-data-monitor

# 3. Aufgabenplaner einrichten (Windows)
schtasks /create /tn "Nav-Data Monitor" /tr "python monitor.py" /sc hourly
```

Denken Sie daran: Proaktive Wartung und Überwachung können die meisten Probleme verhindern und sind effizienter als eine nachträgliche Behebung!

---

**Zuletzt aktualisiert**: 15. Januar 2024  
**Dokumentversion**: v2.1  
**Anwendbare Tool-Version**: v2.1.0+
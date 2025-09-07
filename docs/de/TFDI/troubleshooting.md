# 🛠️ TFDI Navigationsdatenkonverter Fehlerbehebung

## 🚨 Häufige Fehler und Lösungen

### 1. Umgebungs- und Installationsprobleme

#### ❌ Python-Umgebungsprobleme

**Fehlermeldung:**
```
ModuleNotFoundError: No module named 'rich'
ImportError: No module named 'pandas'
```

**Lösung:**
```bash
# 1. Python-Version überprüfen
python --version  # Sicherstellen, dass ≥ 3.8

# 2. pip aktualisieren
python -m pip install --upgrade pip

# 3. Abhängigkeiten installieren
pip install -r requirements.txt

# 4. Installation überprüfen
python -c "import rich, pandas; print('Abhängigkeiten erfolgreich installiert')"
```

#### ❌ Berechtigungsfehler

**Fehlermeldung:**
```
PermissionError: [Errno 13] Permission denied
Ausgabeverzeichnis konnte nicht erstellt werden
```

**Lösung:**
```bash
# Windows - Als Administrator ausführen
# Rechtsklick auf Eingabeaufforderung → "Als Administrator ausführen"

# macOS/Linux - sudo verwenden oder Berechtigungen ändern
sudo python converter.py
# oder
chmod 755 /path/to/output/directory
```

### 2. Datenbankzugriffsprobleme

#### ❌ Datenbankdatei existiert nicht

**Fehlermeldung:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
Fenix-Datenbankdatei nicht gefunden
```

**Lösung:**
1.  **Fenix-Installation überprüfen**:
    ```bash
    # Häufiger Pfad
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\
    ```

2.  **Datei manuell lokalisieren**:
    ```bash
    # Windows
    dir /s nd.db3
    
    # macOS/Linux
    find ~ -name "nd.db3" 2>/dev/null
    ```

3.  **Datenbank neu generieren**:
    -   MSFS starten
    -   Fenix A320 laden
    -   Warten, bis Navigationsdaten geladen sind

#### ❌ Datenbank beschädigt

**Fehlermeldung:**
```
sqlite3.DatabaseError: database disk image is malformed
Datenbankdatei ist beschädigt
```

**Diagnosemethode:**
```python
import sqlite3

def check_database_integrity(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        if result[0] == "ok":
            print("✅ Datenbankintegrität ist normal")
        else:
            print(f"❌ Datenbank beschädigt: {result[0]}")
    except Exception as e:
        print(f"❌ Zugriff auf Datenbank fehlgeschlagen: {e}")
    finally:
        conn.close()
```

**Reparaturlösung:**
```bash
# 1. Beschädigte Datenbank sichern
cp nd.db3 nd.db3.backup

# 2. SQLite-Reparatur versuchen
sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3

# 3. Wenn Reparatur fehlschlägt, Datenbank neu abrufen
# Datei löschen und Fenix neu starten
```

#### ❌ Datenbanktabellenstruktur inkompatibel

**Fehlermeldung:**
```
sqlite3.OperationalError: no such table: Terminals
Datenbank fehlen notwendige Tabellen
```

**Validierungsskript:**
```python
def validate_database_schema(db_path):
    required_tables = [
        'Airports', 'Runways', 'Waypoints', 'Navaids',
        'Airways', 'AirwayLegs', 'Terminals', 'TerminalLegs',
        'ILSes', 'AirportLookup', 'NavaidLookup', 'WaypointLookup'
    ]
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = {row[0] for row in cursor.fetchall()}
    
    missing_tables = set(required_tables) - existing_tables
    if missing_tables:
        print(f"❌ Tabellen fehlen: {missing_tables}")
        return False
    
    print("✅ Datenbankstrukturprüfung bestanden")
    return True
```

### 3. Speicher- und Leistungsprobleme

#### ❌ Nicht genügend Speicher

**Fehlermeldung:**
```
MemoryError: Unable to allocate array
Nicht genügend Speicher, um Daten zu verarbeiten
```

**Speichernutzung überwachen:**
```python
import psutil
import gc

def monitor_memory_usage():
    memory = psutil.virtual_memory()
    print(f"Gesamtspeicher: {memory.total // 1024**3} GB")
    print(f"Belegter Speicher: {memory.used // 1024**3} GB")
    print(f"Verfügbarer Speicher: {memory.available // 1024**3} GB")
    print(f"Auslastung: {memory.percent}%")

def optimize_memory():
    # Garbage Collection erzwingen
    gc.collect()
    
    # pandas-Cache leeren
    import pandas as pd
    pd.reset_option('all')
```

**Lösung:**
```python
# 1. Batch-Größe reduzieren
config = ConverterConfig(
    batch_size=500,  # Von Standard 1000 reduzieren
    coordinate_precision=6  # Präzision reduzieren
)

# 2. Streaming aktivieren
def process_large_table_streaming(table_name):
    chunk_size = 1000
    offset = 0
    
    while True:
        query = f"""
        SELECT * FROM {table_name} 
        LIMIT {chunk_size} OFFSET {offset}
        """
        
        chunk = pd.read_sql_query(query, conn)
        if chunk.empty:
            break
            
        process_chunk(chunk)
        del chunk  # Speicher freigeben
        gc.collect()
        
        offset += chunk_size
```

#### ❌ Verarbeitungsgeschwindigkeit zu langsam

**Symptom:** Konvertierungsprozess bleibt lange in einem Schritt hängen

**Leistungsdiagnose:**
```python
import time
import cProfile

def profile_conversion():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # Konvertierung durchführen
    converter.convert(db_path, terminal_id)
    
    profiler.disable()
    profiler.dump_stats('conversion_profile.prof')

# Leistungsengpässe analysieren
# python -m cProfile -o profile.prof converter.py
# python -c "import pstats; pstats.Stats('profile.prof').sort_stats('cumulative').print_stats(10)"
```

**Optimierungsempfehlungen:**
```python
# 1. SQLite-Leistungsoptimierung
def optimize_sqlite_connection(conn):
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA cache_size=10000")
    conn.execute("PRAGMA temp_store=MEMORY")

# 2. Parallele Verarbeitung
from concurrent.futures import ThreadPoolExecutor

def parallel_table_processing():
    tables = ['Airports', 'Runways', 'Waypoints', 'Navaids']
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for table in tables:
            future = executor.submit(process_table, table)
            futures.append(future)
        
        # Auf Abschluss aller Aufgaben warten
        for future in futures:
            future.result()
```

### 4. Datenkonvertierungsprobleme

#### ❌ Koordinatendaten abnormal

**Fehlermeldung:**
```
ValueError: Invalid coordinate value: latitude=91.5
Koordinaten außerhalb des gültigen Bereichs
```

**Validieren und reparieren:**
```python
def validate_and_fix_coordinates(df):
    """Koordinatendaten validieren und reparieren"""
    initial_count = len(df)
    
    # Breitengradbereich [-90, 90] prüfen
    invalid_lat = (df['Latitude'] < -90) | (df['Latitude'] > 90)
    if invalid_lat.any():
        print(f"Es wurden {invalid_lat.sum()} ungültige Breitengradwerte gefunden")
        df = df[~invalid_lat]
    
    # Längengradbereich [-180, 180] prüfen
    invalid_lon = (df['Longitude'] < -180) | (df['Longitude'] > 180)
    if invalid_lon.any():
        print(f"Es wurden {invalid_lon.sum()} ungültige Längengradwerte gefunden")
        df = df[~invalid_lon]
    
    removed_count = initial_count - len(df)
    if removed_count > 0:
        print(f"⚠️ Es wurden {removed_count} ungültige Koordinatendatensätze entfernt")
    
    return df
```

#### ❌ JSON-Serialisierung fehlgeschlagen

**Fehlermeldung:**
```
TypeError: Object of type 'datetime' is not JSON serializable
JSON-Serialisierungsfehler
```

**Lösung:**
```python
import json
from datetime import datetime
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """Benutzerdefinierter JSON-Encoder"""
    
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# Benutzerdefinierten Encoder verwenden
def safe_json_dump(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=CustomJSONEncoder, 
                 ensure_ascii=False, indent=2)
```

#### ❌ Zeichenkodierungsprobleme

**Fehlermeldung:**
```
UnicodeDecodeError: 'utf-8' codec can't decode byte
Zeichenkodierungsfehler
```

**Lösung:**
```python
import chardet

def detect_and_convert_encoding(file_path):
    """Dateikodierung erkennen und konvertieren"""
    # Kodierung erkennen
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        encoding = chardet.detect(raw_data)['encoding']
    
    print(f"Kodierung erkannt: {encoding}")
    
    # In UTF-8 konvertieren
    with open(file_path, 'r', encoding=encoding) as f:
        content = f.read()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def safe_string_handling(text):
    """Sichere Zeichenkettenverarbeitung"""
    if isinstance(text, bytes):
        # Verschiedene Kodierungen versuchen
        for encoding in ['utf-8', 'gbk', 'latin1']:
            try:
                return text.decode(encoding)
            except UnicodeDecodeError:
                continue
        # Wenn alles fehlschlägt, Fehlerbehandlung verwenden
        return text.decode('utf-8', errors='replace')
    return str(text)
```

### 5. Ausgabedateiprobleme

#### ❌ Archiv-Erstellung fehlgeschlagen

**Fehlermeldung:**
```
py7zr.exceptions.Bad7zFile: not a 7z file
Archiv-Erstellung fehlgeschlagen
```

**Lösung:**
```python
import py7zr
import shutil
from pathlib import Path

def safe_create_archive(source_dir, archive_path):
    """Sicheres Archiv erstellen"""
    try:
        # Sicherstellen, dass Quellverzeichnis existiert
        if not Path(source_dir).exists():
            raise FileNotFoundError(f"Quellverzeichnis existiert nicht: {source_dir}")
        
        # Vorhandenes Archiv löschen
        if Path(archive_path).exists():
            Path(archive_path).unlink()
        
        # Archiv erstellen
        with py7zr.SevenZipFile(archive_path, 'w') as archive:
            archive.writeall(source_dir, ".")
        
        print(f"✅ Archiv erfolgreich erstellt: {archive_path}")
        return True
        
    except Exception as e:
        print(f"❌ Archiv-Erstellung fehlgeschlagen: {e}")
        
        # Fallback: ZIP-Datei erstellen
        try:
            shutil.make_archive(
                str(Path(archive_path).with_suffix('')), 
                'zip', 
                source_dir
            )
            print("✅ ZIP-Format-Backup-Datei erstellt")
            return True
        except Exception as zip_error:
            print(f"❌ ZIP-Erstellung ebenfalls fehlgeschlagen: {zip_error}")
            return False
```

#### ❌ Dateigröße abnormal

**Symptom:** Ausgabedatei zu klein oder zu groß

**Prüfmethode:**
```python
def validate_output_files(output_dir):
    """Ausgabedateien überprüfen"""
    expected_files = [
        'Airports.json', 'Runways.json', 'Waypoints.json',
        'Navaids.json', 'Airways.json', 'AirwayLegs.json',
        'Terminals.json', 'ILSes.json'
    ]
    
    file_info = {}
    for file_name in expected_files:
        file_path = Path(output_dir) / file_name
        if file_path.exists():
            size = file_path.stat().st_size
            file_info[file_name] = {
                'exists': True,
                'size_mb': size / 1024 / 1024,
                'empty': size == 0
            }
        else:
            file_info[file_name] = {'exists': False}
    
    # Dateiinformatioen drucken
    print("📁 Überprüfung der Ausgabedateien:")
    for file_name, info in file_info.items():
        if info['exists']:
            if info.get('empty', False):
                print(f"⚠️ {file_name}: Leere Datei")
            else:
                print(f"✅ {file_name}: {info['size_mb']:.2f} MB")
        else:
            print(f"❌ {file_name}: Datei fehlt")
    
    return file_info
```

## 🔍 Diagnosetools

### 1. Systemumgebungsprüfung

```python
def system_diagnostics():
    """Systemumgebungsdiagnose"""
    import platform
    import sys
    import psutil
    
    print("🔍 Systemumgebungsdiagnose")
    print("=" * 50)
    
    # Betriebssysteminformationen
    print(f"Betriebssystem: {platform.system()} {platform.release()}")
    print(f"Architektur: {platform.machine()}")
    
    # Python-Umgebung
    print(f"Python-Version: {sys.version}")
    print(f"Python-Pfad: {sys.executable}")
    
    # Hardwareinformationen
    print(f"CPU-Kerne: {psutil.cpu_count()}")
    memory = psutil.virtual_memory()
    print(f"Gesamtspeicher: {memory.total // 1024**3} GB")
    print(f"Verfügbarer Speicher: {memory.available // 1024**3} GB")
    
    # Festplattenspeicher
    disk = psutil.disk_usage('.')
    print(f"Gesamter Festplattenspeicher: {disk.total // 1024**3} GB")
    print(f"Verfügbarer Festplattenspeicher: {disk.free // 1024**3} GB")
```

### 2. Abhängigkeitspaket-Validierung

```python
def verify_dependencies():
    """Abhängigkeitspakete validieren"""
    required_packages = [
        'rich', 'pandas', 'py7zr', 'sqlite3'
    ]
    
    print("📦 Abhängigkeitspaket-Validierung")
    print("=" * 30)
    
    for package in required_packages:
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package}: {version}")
        except ImportError:
            print(f"❌ {package}: Nicht installiert")
        except Exception as e:
            print(f"⚠️ {package}: Fehler - {e}")
```

### 3. Leistungsüberwachungstools

```python
import time
import threading
from contextlib import contextmanager

class PerformanceMonitor:
    """Leistungsmonitor"""
    
    def __init__(self):
        self.metrics = {}
        self.monitoring = False
    
    @contextmanager
    def measure(self, operation_name):
        """Operationsdauer messen"""
        start_time = time.time()
        start_memory = psutil.virtual_memory().used
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.virtual_memory().used
            
            self.metrics[operation_name] = {
                'duration': end_time - start_time,
                'memory_delta': end_memory - start_memory
            }
    
    def start_monitoring(self):
        """Echtzeitüberwachung starten"""
        self.monitoring = True
        
        def monitor():
            while self.monitoring:
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                
                print(f"\r🔄 CPU: {cpu_percent:5.1f}% | "
                      f"Speicher: {memory.percent:5.1f}% | "
                      f"Verfügbar: {memory.available//1024**2:,} MB", 
                      end='', flush=True)
                
                time.sleep(1)
        
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def stop_monitoring(self):
        """Überwachung stoppen"""
        self.monitoring = False
        print()  # Zeilenumbruch
    
    def print_summary(self):
        """Leistungszusammenfassung drucken"""
        print("\n📊 Leistungszusammenfassung:")
        print("-" * 40)
        
        for operation, metrics in self.metrics.items():
            duration = metrics['duration']
            memory_mb = metrics['memory_delta'] / 1024 / 1024
            
            print(f"{operation:20s}: {duration:8.2f}s | "
                  f"{memory_mb:+8.1f}MB")

# Anwendungsbeispiel
monitor = PerformanceMonitor()
monitor.start_monitoring()

with monitor.measure("Datenbankvalidierung"):
    validate_database(db_path)

with monitor.measure("Datenkonvertierung"):
    convert_data()

monitor.stop_monitoring()
monitor.print_summary()
```

## 📋 Fehlerbehebungs-Checkliste

### 🔧 Vor-Konvertierungsprüfung
- [ ] Python-Version ≥ 3.8
- [ ] Alle Abhängigkeitspakete installiert und Version korrekt
- [ ] Fenix-Datenbankdatei existiert und ist intakt
- [ ] Genügend verfügbarer Speicher (empfohlen 4GB+)
- [ ] Genügend Festplattenspeicher (empfohlen 1GB+)
- [ ] Ausgabeverzeichnis hat Schreibberechtigungen

### 📊 Konvertierungsprozessprüfung
- [ ] Datenbankverbindung erfolgreich
- [ ] Alle erforderlichen Tabellen vorhanden
- [ ] Koordinatendaten im gültigen Bereich
- [ ] Speichernutzung im vernünftigen Bereich
- [ ] Keine Berechtigungsfehler aufgetreten
- [ ] Temporäre Dateien normal erstellt

### 📁 Nach-Konvertierungsvalidierung
- [ ] Alle JSON-Dateien generiert
- [ ] Dateigröße angemessen (nicht leer oder ungewöhnlich groß)
- [ ] JSON-Format gültig
- [ ] Archiv erfolgreich erstellt
- [ ] Temporäre Dateien bereinigt
- [ ] Keine schwerwiegenden Fehler im Protokoll

## 🆘 Hilfe erhalten

### Selbstdiagnose
1.  **Diagnosetool ausführen**:
    ```python
    from tfdi_converter.diagnostics import run_full_diagnostics
    run_full_diagnostics()
    ```

2.  **Detaillierte Protokolle anzeigen**:
    ```bash
    tail -f converter.log
    grep -i error converter.log
    ```

3.  **Systemressourcen überprüfen**:
    ```bash
    # Windows
    taskmgr
    
    # macOS
    activity monitor
    
    # Linux
    top
    htop
    ```

### Community-Support
-   **GitHub Issues**: Bugs und technische Probleme melden
-   **GitHub Discussions**: Nutzungsfragen und Erfahrungsaustausch
-   **Projektdokumentation**: Vollständige Bedienungsanleitung einsehen

### Bitte bei der Problemmeldung Folgendes angeben:
-   **Vollständiges Fehlerprotokoll**
-   **Systemumgebungsinformationen**
-   **Konverterversion**
-   **Datenbankinformationen** (Größe, AIRAC usw.)
-   **Reproduktionsschritte**
-   **Zugehörige Konfigurationsdateien**

---

**Ungeklärte Probleme?**

Bitte erstellen Sie ein neues Problem unter [GitHub Issues](https://github.com/your-org/tfdi-converter/issues), wir helfen Ihnen so schnell wie möglich! 🚁✨

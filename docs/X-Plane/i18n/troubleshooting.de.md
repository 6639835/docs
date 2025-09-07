---
title: Leitfaden zur Fehlerbehebung
description: Systematische Fehlersuche und -behebung für Nav-data
---

# Leitfaden zur Fehlerbehebung

Dieses Dokument bietet systematische Methoden zur Fehlerdiagnose und -lösungen, um Benutzern zu helfen, Probleme, die während der Nutzung von Nav-data auftreten, schnell zu lokalisieren und zu beheben.

## 🔍 Schneller Diagnoseprozess

### Schritt eins: Umgebungsprüfung
```bash
# 1. Python-Version überprüfen
python --version
# Sollte Python 3.6+ anzeigen

# 2. Installation der Abhängigkeitspakete überprüfen
pip list | grep -E "(pandas|numpy|pdfplumber|tqdm|colorama|geopy)"

# 3. Arbeitsverzeichnis überprüfen
ls -la
# Sollte die Projektdateistruktur anzeigen

# 4. Systemressourcen überprüfen
df -h          # Festplattenspeicher
free -h        # Arbeitsspeicher (Linux/macOS)
# Windows: Im Task-Manager überprüfen
```

### Schritt zwei: Protokollanalyse
```bash
# Detaillierte Protokollierung aktivieren
export NAV_DATA_DEBUG=1  # Linux/macOS
set NAV_DATA_DEBUG=1     # Windows

# Neueste Fehlerprotokolle anzeigen
tail -n 50 logs/nav-data.log
```

### Schritt drei: Datenvalidierung
```bash
# Eingabedateien überprüfen
file -I input_file.csv   # Kodierung überprüfen
head -n 5 input_file.csv # Erste Zeilen anzeigen

# Dateikonsistenz überprüfen
wc -l input_file.csv     # Zeilenzählung
```

## 🚨 Häufige Fehlermuster

### Fehlertyp-Klassifizierung

#### A. Umgebungsfehler
- Inkompatible Python-Version
- Fehlende Abhängigkeitspakete oder Versionskonflikte
- Falsche Pfadkonfiguration
- Berechtigungsprobleme

#### B. Datenformatfehler
- CSV-Kodierungsprobleme
- PDF-Format nicht unterstützt
- Fehlende Felder oder falsches Format
- Koordinatenformatprobleme

#### C. Systemressourcenprobleme
- Nicht genügend Arbeitsspeicher
- Nicht genügend Festplattenspeicher
- Dateihandles über dem Limit
- Netzwerkverbindungsprobleme

#### D. Logikverarbeitungsfehler
- Datenvalidierung fehlgeschlagen
- Falsche Konvertierungsregeln
- Falsches Ausgabeformat
- Konflikte bei der Parallelverarbeitung

## 🔧 Detaillierte Fehlerbehebung

### 1. Installations- und Umgebungsprobleme

#### Problem: ModuleNotFoundError
```
Fehlermeldung: ModuleNotFoundError: No module named 'pandas'
```

**Diagnoseschritte:**
```bash
# 1. Aktuelle Python-Umgebung bestätigen
which python
python -c "import sys; print(sys.path)"

# 2. Status der virtuellen Umgebung überprüfen
echo $VIRTUAL_ENV  # Sollte den Pfad der virtuellen Umgebung anzeigen

# 3. Paketinstallation überprüfen
pip show pandas
```

**Lösung:**
```bash
# Option 1: Abhängigkeiten neu installieren
pip install -r requirements.txt

# Option 2: Neue virtuelle Umgebung erstellen
python -m venv nav-data-env-new
source nav-data-env-new/bin/activate
pip install -r requirements.txt

# Option 3: Conda-Umgebung verwenden
conda create -n nav-data python=3.8
conda activate nav-data
pip install -r requirements.txt
```

#### Problem: Permission Denied
```
Fehlermeldung: PermissionError: [Errno 13] Permission denied
```

**Diagnoseschritte:**
```bash
# 1. Dateiberechtigungen überprüfen
ls -la target_file

# 2. Verzeichnisberechtigungen überprüfen
ls -ld target_directory

# 3. Aktuellen Benutzer überprüfen
whoami
groups
```

**Lösung:**
```bash
# Option 1: Dateiberechtigungen ändern
chmod 644 target_file    # Dateiberechtigungen
chmod 755 target_dir     # Verzeichnisberechtigungen

# Option 2: Besitzer ändern (falls erforderlich)
sudo chown $USER:$USER target_file

# Option 3: Benutzerverzeichnis verwenden
mkdir ~/nav-data-workspace
cd ~/nav-data-workspace
```

#### Problem: Python-Versionskonflikt
```
Fehlermeldung: SyntaxError: invalid syntax (Python 2.7 detected)
```

**Diagnoseschritte:**
```bash
# Alle Python-Versionen überprüfen
python --version
python3 --version
which python
which python3

# Standard-Python überprüfen
ls -la /usr/bin/python*
```

**Lösung:**
```bash
# Option 1: Explizit python3 aufrufen
python3 script.py

# Option 2: Alias erstellen
echo "alias python=python3" >> ~/.bashrc
source ~/.bashrc

# Option 3: Systemstandard aktualisieren (vorsichtig vorgehen)
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### 2. Datenverarbeitungsprobleme

#### Problem: CSV-Kodierungsfehler
```
Fehlermeldung: UnicodeDecodeError: 'utf-8' codec can't decode
```

**Diagnoseskript:**
```python
#!/usr/bin/env python3
"""
CSV-Kodierungsdiagnosetool
"""
import chardet
import pandas as pd
from pathlib import Path

def diagnose_csv_encoding(file_path):
    """Diagnostiziert die Kodierung einer CSV-Datei"""
    file_path = Path(file_path)
    
    print(f"🔍 Datei diagnostizieren: {file_path}")
    
    # 1. Grundlegende Dateiinformationen
    print(f"Dateigröße: {file_path.stat().st_size} Bytes")
    
    # 2. Kodierung automatisch erkennen
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)  # Erste 10KB lesen
        encoding_info = chardet.detect(raw_data)
        print(f"Erkannte Kodierung: {encoding_info}")
    
    # 3. Verschiedene Kodierungen versuchen
    encodings = ['utf-8', 'gbk', 'gb2312', 'utf-16', 'latin1']
    
    for encoding in encodings:
        try:
            df = pd.read_csv(file_path, encoding=encoding, nrows=5)
            print(f"✅ {encoding}: Erfolgreich {len(df)} Zeilen gelesen")
            print(f"   Spaltennamen: {list(df.columns)}")
            break
        except Exception as e:
            print(f"❌ {encoding}: {str(e)[:50]}...")
    
    return encoding_info['encoding']

# Anwendungsbeispiel
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnosed_encoding = diagnose_csv_encoding(sys.argv[1])
        print(f"\n💡 Empfohlene Kodierung: {diagnosed_encoding}")
```

**Lösung:**
```python
# Option 1: Korrekte Kodierung angeben
import pandas as pd
df = pd.read_csv('file.csv', encoding='gbk')

# Option 2: Dateikodierung konvertieren
import codecs
with codecs.open('input.csv', 'r', 'gbk') as f_in:
    with codecs.open('output.csv', 'w', 'utf-8') as f_out:
        f_out.write(f_in.read())

# Option 3: Kodierung automatisch erkennen
import chardet
with open('file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']
df = pd.read_csv('file.csv', encoding=encoding)
```

#### Problem: PDF-Parsing fehlgeschlagen
```
Fehlermeldung: PDFSyntaxError: No /Root object found
```

**Diagnosetool:**
```python
#!/usr/bin/env python3
"""
PDF-Dateidiagnosetool
"""
import pdfplumber
from pathlib import Path

def diagnose_pdf_file(file_path):
    """Diagnostiziert Probleme mit einer PDF-Datei"""
    file_path = Path(file_path)
    
    print(f"🔍 PDF-Datei diagnostizieren: {file_path}")
    
    # 1. Grundlegende Dateiinformationen
    print(f"Dateigröße: {file_path.stat().st_size} Bytes")
    
    # 2. Versuch, PDF zu öffnen
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"✅ PDF erfolgreich geöffnet")
            print(f"Seitenanzahl: {len(pdf.pages)}")
            
            # Erste Seite überprüfen
            if pdf.pages:
                first_page = pdf.pages[0]
                print(f"Größe der ersten Seite: {first_page.width} x {first_page.height}")
                
                # Textextraktionstest
                text = first_page.extract_text()
                if text:
                    print(f"Textextraktion erfolgreich, erste 100 Zeichen: {text[:100]}...")
                else:
                    print("⚠️  Text kann nicht extrahiert werden, möglicherweise ein gescanntes PDF")
                
                # Tabellen überprüfen
                tables = first_page.extract_tables()
                print(f"Es wurden {len(tables)} Tabellen erkannt")
                
                # Bilder überprüfen
                images = first_page.images
                print(f"Es wurden {len(images)} Bilder erkannt")
                
    except Exception as e:
        print(f"❌ PDF konnte nicht geöffnet werden: {e}")
        
        # Reparaturvorschläge versuchen
        print("\n💡 Reparaturvorschläge:")
        print("1. Überprüfen Sie, ob die PDF-Datei beschädigt ist")
        print("2. Versuchen Sie, die Datei mit Adobe Reader zu öffnen und zu überprüfen")
        print("3. Verwenden Sie ein PDF-Reparaturtool")
        print("4. Laden Sie die PDF-Datei erneut herunter oder besorgen Sie sie neu")

# Anwendungsbeispiel
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnose_pdf_file(sys.argv[1])
```

**Lösung:**
```python
# Option 1: Lockerere Parsing-Optionen verwenden
import pdfplumber
try:
    with pdfplumber.open(pdf_file, password="") as pdf:
        # Verarbeitungslogik
        pass
except Exception as e:
    print(f"PDF-Parsing fehlgeschlagen: {e}")

# Option 2: Andere PDF-Bibliotheken ausprobieren
import pypdf2
try:
    with open(pdf_file, 'rb') as f:
        reader = pypdf2.PdfFileReader(f)
        # Verarbeitungslogik
except Exception as e:
    print(f"Alternative PDF-Bibliothek ebenfalls fehlgeschlagen: {e}")

# Option 3: PDF vorverarbeiten
# Externes Tool wie pdftk zur PDF-Reparatur verwenden
import subprocess
subprocess.run(['pdftk', 'broken.pdf', 'output', 'fixed.pdf'])
```

#### Problem: Koordinatenkonvertierungsfehler
```
Fehlermeldung: ValueError: invalid literal for float()
```

**Diagnosetool:**
```python
#!/usr/bin/env python3
"""
Koordinatendaten-Diagnosetool
"""
import re

def diagnose_coordinate_data(text):
    """Diagnostiziert das Format von Koordinatendaten"""
    print(f"🔍 Koordinatendaten diagnostizieren: {text[:50]}...")
    
    # Häufige Koordinatenformatmuster
    patterns = {
        'decimal': r'[+-]?\d+\.\d+',
        'dms_with_symbols': r'\d+°\d+′\d+″',
        'dms_with_letters': r'\d+[°]\d+[\']\d+["]',
        'dms_spaces': r'\d+\s+\d+\s+\d+',
        'chinese_format': r'北纬|南纬|东经|西经',
    }
    
    found_patterns = []
    for name, pattern in patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            found_patterns.append((name, matches[:3]))  # Erste 3 Übereinstimmungen anzeigen
    
    print("Erkannte Koordinatenformate:")
    for name, matches in found_patterns:
        print(f"  {name}: {matches}")
    
    # Mögliche Koordinaten extrahieren
    coord_candidates = re.findall(r'\d+[°′″\s\'"]+\d+[°′″\s\'"]*\d*', text)
    print(f"Koordinatenkandidaten: {coord_candidates[:5]}")
    
    return found_patterns

def test_coordinate_conversion(coord_string):
    """Testet die Koordinatenkonvertierung"""
    print(f"\n🧪 Konvertierung testen: {coord_string}")
    
    try:
        # Verschiedene Konvertierungsmethoden versuchen
        
        # Methode 1: Direkt in eine Gleitkommazahl konvertieren
        try:
            result = float(coord_string)
            print(f"  Direkte Konvertierung: {result}")
            return result
        except ValueError:
            pass
        
        # Methode 2: Grad, Minuten, Sekunden Konvertierung
        dms_pattern = r'(\d+)[°]\s*(\d+)[′\']\s*(\d+(?:\.\d+)?)[″"]?'
        match = re.search(dms_pattern, coord_string)
        if match:
            degrees, minutes, seconds = map(float, match.groups())
            decimal = degrees + minutes/60 + seconds/3600
            print(f"  Grad, Minuten, Sekunden Konvertierung: {decimal}")
            return decimal
        
        # Methode 3: Nach Bereinigung von Sonderzeichen konvertieren
        cleaned = re.sub(r'[^\d\.]', '', coord_string)
        if cleaned:
            result = float(cleaned)
            print(f"  Nach Bereinigung konvertiert: {result}")
            return result
            
        print(f"  ❌ Konvertierung fehlgeschlagen")
        return None
        
    except Exception as e:
        print(f"  ❌ Konvertierungsfehler: {e}")
        return None

# Anwendungsbeispiel
if __name__ == "__main__":
    test_data = "北纬39°48'35.6\" 东经116°34'46.7\""
    diagnose_coordinate_data(test_data)
    test_coordinate_conversion("39°48'35.6\"")
```

### 3. Systemressourcenprobleme

#### Problem: Nicht genügend Arbeitsspeicher
```
Fehlermeldung: MemoryError: Unable to allocate array
```

**Arbeitsspeicher-Überwachungsskript:**
```python
#!/usr/bin/env python3
"""
Tool zur Überwachung der Arbeitsspeichernutzung
"""
import psutil
import gc
import os
from functools import wraps

def monitor_memory(func):
    """Decorator zur Arbeitsspeicherüberwachung"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Initialen Arbeitsspeicherstatus abrufen
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"🔍 Arbeitsspeicher vor Ausführung: {initial_memory:.2f} MB")
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Garbage Collection erzwingen
            gc.collect()
            
            # Endgültigen Arbeitsspeicherstatus abrufen
            final_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_delta = final_memory - initial_memory
            
            print(f"🔍 Arbeitsspeicher nach Ausführung: {final_memory:.2f} MB")
            print(f"🔍 Arbeitsspeicheränderung: {memory_delta:+.2f} MB")
            
            # Arbeitsspeicherwarnung
            if final_memory > 1000:  # Über 1GB
                print("⚠️  Hohe Arbeitsspeichernutzung, Optimierung empfohlen")
    
    return wrapper

def check_system_memory():
    """Überprüft den System-Arbeitsspeicherstatus"""
    memory = psutil.virtual_memory()
    
    print("💾 System-Arbeitsspeicherstatus:")
    print(f"  Gesamter Arbeitsspeicher: {memory.total / 1024**3:.2f} GB")
    print(f"  Verfügbarer Arbeitsspeicher: {memory.available / 1024**3:.2f} GB")
    print(f"  Auslastung: {memory.percent:.1f}%")
    
    if memory.percent > 80:
        print("⚠️  System-Arbeitsspeichernutzung zu hoch")
        return False
    return True

# Arbeitsspeicherfreundliche Datenverarbeitungsfunktion
@monitor_memory
def memory_efficient_csv_processing(file_path, chunk_size=1000):
    """Arbeitsspeicherfreundliche CSV-Verarbeitung"""
    import pandas as pd
    
    results = []
    
    # Große Dateien in Blöcken lesen
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Datenblock verarbeiten
        processed_chunk = process_data_chunk(chunk)
        results.append(processed_chunk)
        
        # Arbeitsspeicher bereinigen
        del chunk
        gc.collect()
    
    return pd.concat(results, ignore_index=True)

def process_data_chunk(chunk):
    """Verarbeitet einen einzelnen Datenblock"""
    # Tatsächliche Datenverarbeitungslogik
    return chunk  # Vereinfachtes Beispiel
```

**Lösung:**
```python
# Option 1: Blockweise Verarbeitung
def process_large_file_in_chunks(file_path, chunk_size=1000):
    import pandas as pd
    
    processed_data = []
    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Einzelnen Block verarbeiten
        processed_chunk = your_processing_function(chunk)
        processed_data.append(processed_chunk)
        
        # Arbeitsspeicher freigeben
        del chunk
        gc.collect()
    
    return pd.concat(processed_data, ignore_index=True)

# Option 2: Generatoren verwenden
def data_generator(file_path):
    """Datengenerator, spart Arbeitsspeicher"""
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

# Option 3: Virtuellen Arbeitsspeicher erhöhen
# Linux/macOS:
# sudo fallocate -l 4G /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
```

#### Problem: Nicht genügend Festplattenspeicher
```
Fehlermeldung: OSError: [Errno 28] No space left on device
```

**Festplattenspeicher-Überprüfungsskript:**
```python
#!/usr/bin/env python3
"""
Tool zur Überwachung des Festplattenspeichers
"""
import shutil
import os
from pathlib import Path

def check_disk_space(path="."):
    """Überprüft den Festplattenspeicher"""
    total, used, free = shutil.disk_usage(path)
    
    print(f"💽 Festplattenspeicherstatus ({path}):")
    print(f"  Gesamtspeicher: {total / 1024**3:.2f} GB")
    print(f"  Genutzt: {used / 1024**3:.2f} GB")
    print(f"  Verfügbarer Speicher: {free / 1024**3:.2f} GB")
    print(f"  Auslastung: {used/total*100:.1f}%")
    
    # Warnung bei geringem Speicherplatz
    if free < 1024**3:  # Weniger als 1GB
        print("⚠️  Nicht genügend Festplattenspeicher!")
        return False
    
    return True

def cleanup_temp_files():
    """Bereinigt temporäre Dateien"""
    temp_patterns = [
        "*.tmp",
        "*.temp", 
        "*.cache",
        "*.log",
        "__pycache__",
        ".pytest_cache"
    ]
    
    current_dir = Path(".")
    total_cleaned = 0
    
    for pattern in temp_patterns:
        for file_path in current_dir.rglob(pattern):
            try:
                if file_path.is_file():
                    size = file_path.stat().st_size
                    file_path.unlink()
                    total_cleaned += size
                    print(f"Datei gelöscht: {file_path}")
                elif file_path.is_dir():
                    import shutil
                    size = sum(f.stat().st_size for f in file_path.rglob('*') if f.is_file())
                    shutil.rmtree(file_path)
                    total_cleaned += size
                    print(f"Verzeichnis gelöscht: {file_path}")
            except Exception as e:
                print(f"Konnte {file_path} nicht löschen: {e}")
    
    print(f"💾 Insgesamt {total_cleaned / 1024**2:.2f} MB bereinigt")

def estimate_output_size(input_file):
    """Schätzt die Größe der Ausgabedatei"""
    input_size = Path(input_file).stat().st_size
    
    # Schätzung basierend auf Verarbeitungstyp (hier eine vereinfachte Schätzung)
    estimated_multiplier = {
        '.csv': 1.2,    # CSV zu DAT ist normalerweise etwas größer
        '.pdf': 0.1,    # PDF-Textextraktion ist normalerweise viel kleiner
        '.dat': 1.0,    # DAT-Formatreparatur ändert die Größe nicht
    }
    
    suffix = Path(input_file).suffix.lower()
    multiplier = estimated_multiplier.get(suffix, 1.0)
    
    estimated_size = input_size * multiplier
    print(f"📊 Geschätzte Ausgabegröße: {estimated_size / 1024**2:.2f} MB")
    
    return estimated_size
```

### 4. Fehlerbehebung bei Leistungsoptimierung

#### Problem: Langsame Verarbeitungsgeschwindigkeit

**Leistungsanalysetool:**
```python
#!/usr/bin/env python3
"""
Leistungsanalysetool
"""
import time
import cProfile
import pstats
from functools import wraps

def profile_performance(func):
    """Decorator zur Leistungsanalyse"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Leistungsanalysator erstellen
        pr = cProfile.Profile()
        
        # Analyse starten
        pr.enable()
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Analyse stoppen
            end_time = time.time()
            pr.disable()
            
            # Leistungsbericht ausgeben
            print(f"⏱️  Ausführungszeit: {end_time - start_time:.2f} Sekunden")
            
            # Detaillierten Bericht speichern
            stats = pstats.Stats(pr)
            stats.sort_stats('cumulative')
            
            print("\n🔍 Leistungsschwerpunkte (Top 10 Funktionen):")
            stats.print_stats(10)
            
            # Bericht in Datei speichern
            stats.dump_stats(f'performance_profile_{int(time.time())}.prof')
    
    return wrapper

# Anwendungsbeispiel
@profile_performance
def slow_function():
    """Beispiel für eine langsame Funktion"""
    import pandas as pd
    
    # Langsame Operation simulieren
    data = []
    for i in range(100000):
        data.append({'id': i, 'value': i**2})
    
    df = pd.DataFrame(data)
    return df.groupby('id').sum()

def benchmark_different_approaches():
    """Vergleicht die Leistung verschiedener Implementierungsansätze"""
    import pandas as pd
    
    # Testdaten
    test_data = list(range(10000))
    
    # Methode 1: Normale Schleife
    start_time = time.time()
    result1 = []
    for i in test_data:
        result1.append(i * 2)
    time1 = time.time() - start_time
    
    # Methode 2: List Comprehension
    start_time = time.time()
    result2 = [i * 2 for i in test_data]
    time2 = time.time() - start_time
    
    # Methode 3: NumPy
    import numpy as np
    start_time = time.time()
    result3 = (np.array(test_data) * 2).tolist()
    time3 = time.time() - start_time
    
    print("🏃 Leistungsvergleich:")
    print(f"  Normale Schleife: {time1:.4f} Sekunden")
    print(f"  List Comprehension: {time2:.4f} Sekunden")
    print(f"  NumPy: {time3:.4f} Sekunden")
    
    # Schnellste Methode finden
    times = {'Normale Schleife': time1, 'List Comprehension': time2, 'NumPy': time3}
    fastest = min(times, key=times.get)
    print(f"🏆 Schnellste Methode: {fastest}")
```

## 🔬 Erweiterte Diagnosetools

### Integriertes Diagnoseskript

Erstellen Sie `diagnose_nav_data.py`:

```python
#!/usr/bin/env python3
"""
Integriertes Nav-data Diagnosetool
"""
import sys
import os
import subprocess
import platform
from pathlib import Path
import importlib

class NavDataDiagnostic:
    """Nav-data Diagnosetool-Klasse"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.info = []
    
    def log_issue(self, message):
        """Problem protokollieren"""
        self.issues.append(message)
        print(f"❌ {message}")
    
    def log_warning(self, message):
        """Warnung protokollieren"""
        self.warnings.append(message)
        print(f"⚠️  {message}")
    
    def log_info(self, message):
        """Information protokollieren"""
        self.info.append(message)
        print(f"ℹ️  {message}")
    
    def check_python_environment(self):
        """Python-Umgebung überprüfen"""
        print("\n🐍 Python-Umgebungsprüfung:")
        
        # Python-Version
        version = sys.version_info
        version_str = f"{version.major}.{version.minor}.{version.micro}"
        print(f"  Python-Version: {version_str}")
        
        if version.major < 3 or (version.major == 3 and version.minor < 6):
            self.log_issue(f"Python-Version zu alt ({version_str}), 3.6+ erforderlich")
        else:
            self.log_info(f"Python-Version erfüllt Anforderungen ({version_str})")
        
        # Virtuelle Umgebung
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            self.log_info("Virtuelle Umgebung wird verwendet")
        else:
            self.log_warning("Keine virtuelle Umgebung verwendet, es wird empfohlen, eine zu verwenden")
        
        # Python-Pfad
        print(f"  Python-Pfad: {sys.executable}")
        print(f"  Paketsuchpfade: {len(sys.path)} Pfade")
    
    def check_dependencies(self):
        """Abhängigkeitspakete überprüfen"""
        print("\n📦 Abhängigkeitspaketprüfung:")
        
        required_packages = {
            'pandas': '1.3.0',
            'numpy': '1.21.0',
            'pdfplumber': '0.7.0',
            'tqdm': '4.60.0',
            'colorama': '0.4.4',
            'geopy': '2.2.0'
        }
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                version = getattr(module, '__version__', 'unbekannt')
                print(f"  ✅ {package}: {version}")
                
                # TODO: Versionen vergleichen
                
            except ImportError:
                self.log_issue(f"Fehlendes Abhängigkeitspaket: {package}")
    
    def check_system_resources(self):
        """Systemressourcen überprüfen"""
        print("\n💻 Systemressourcenprüfung:")
        
        # Betriebssystem
        system_info = platform.system()
        print(f"  Betriebssystem: {system_info} {platform.release()}")
        
        # Arbeitsspeicherprüfung
        try:
            import psutil
            memory = psutil.virtual_memory()
            print(f"  Gesamter Arbeitsspeicher: {memory.total / 1024**3:.2f} GB")
            print(f"  Verfügbarer Arbeitsspeicher: {memory.available / 1024**3:.2f} GB")
            
            if memory.available < 2 * 1024**3:  # Weniger als 2GB
                self.log_warning("Wenig verfügbarer Arbeitsspeicher, kann die Verarbeitung großer Dateien beeinträchtigen")
        except ImportError:
            self.log_warning("Arbeitsspeicherstatus kann nicht überprüft werden (psutil fehlt)")
        
        # Festplattenspeicher
        try:
            import shutil
            total, used, free = shutil.disk_usage('.')
            print(f"  Festplattenspeicher: {free / 1024**3:.2f} GB verfügbar")
            
            if free < 1024**3:  # Weniger als 1GB
                self.log_warning("Nicht genügend Festplattenspeicher")
        except Exception as e:
            self.log_warning(f"Festplattenspeicher kann nicht überprüft werden: {e}")
    
    def check_project_structure(self):
        """Projektstruktur überprüfen"""
        print("\n📁 Projektstrukturprüfung:")
        
        required_dirs = [
            'Airway',
            'PDF extract', 
            'Terminal Patch',
            'X-Plane CIFP'
        ]
        
        for dirname in required_dirs:
            if Path(dirname).exists():
                print(f"  ✅ {dirname}/")
            else:
                self.log_issue(f"Fehlendes Verzeichnis: {dirname}/")
        
        # Wichtige Dateien überprüfen
        key_files = [
            'Airway/airway.py',
            'PDF extract/utils.py',
            'Terminal Patch/terminal_encoder.py',
        ]
        
        for filepath in key_files:
            if Path(filepath).exists():
                print(f"  ✅ {filepath}")
            else:
                self.log_issue(f"Fehlende Datei: {filepath}")
    
    def check_common_issues(self):
        """Häufige Probleme überprüfen"""
        print("\n🔍 Prüfung auf häufige Probleme:")
        
        # Dateikodierung überprüfen
        csv_files = list(Path('.').glob('**/*.csv'))
        if csv_files:
            print(f"  {len(csv_files)} CSV-Dateien gefunden")
            # TODO: Kodierungsprüfung
        
        # Protokolldateien überprüfen
        log_files = list(Path('.').glob('**/*.log'))
        if log_files:
            print(f"  {len(log_files)} Protokolldateien gefunden")
            
            # Neueste Fehler überprüfen
            for log_file in log_files[-3:]:  # Neueste 3 Protokolle überprüfen
                try:
                    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        error_lines = [line for line in lines[-50:] if 'ERROR' in line.upper()]
                        if error_lines:
                            print(f"    ⚠️  {len(error_lines)} Fehler in {log_file} gefunden")
                except Exception as e:
                    print(f"    Konnte {log_file} nicht lesen: {e}")
    
    def generate_report(self):
        """Diagnosebericht erstellen"""
        print("\n" + "="*50)
        print("📋 Zusammenfassung des Diagnoseberichts")
        print("="*50)
        
        print(f"Kritische Probleme: {len(self.issues)} gefunden")
        for issue in self.issues:
            print(f"  ❌ {issue}")
        
        print(f"\nWarnungen: {len(self.warnings)} gefunden")
        for warning in self.warnings:
            print(f"  ⚠️  {warning}")
        
        print(f"\nInformationen: {len(self.info)} gefunden")
        for info in self.info:
            print(f"  ℹ️  {info}")
        
        # Gesamtstatus
        if not self.issues:
            if not self.warnings:
                print("\n🎉 Systemstatus ist gut!")
            else:
                print("\n✅ System ist grundsätzlich in Ordnung, Warnungen sollten beachtet werden")
        else:
            print("\n🚨 Kritische Probleme gefunden, müssen vor der normalen Nutzung behoben werden")
        
        # Bericht speichern
        report_file = f"diagnostic_report_{int(time.time())}.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("Nav-data Diagnosebericht\n")
            f.write("="*50 + "\n\n")
            
            f.write("Kritische Probleme:\n")
            for issue in self.issues:
                f.write(f"- {issue}\n")
            
            f.write("\nWarnungen:\n")
            for warning in self.warnings:
                f.write(f"- {warning}\n")
            
            f.write("\nInformationen:\n")
            for info in self.info:
                f.write(f"- {info}\n")
        
        print(f"\n📄 Detaillierter Bericht gespeichert unter: {report_file}")
    
    def run_full_diagnostic(self):
        """Vollständige Diagnose ausführen"""
        print("🔬 Nav-data Systemdiagnose")
        print("="*50)
        
        self.check_python_environment()
        self.check_dependencies()
        self.check_system_resources()
        self.check_project_structure()
        self.check_common_issues()
        self.generate_report()

def main():
    """Hauptfunktion"""
    diagnostic = NavDataDiagnostic()
    
    try:
        diagnostic.run_full_diagnostic()
    except KeyboardInterrupt:
        print("\n\nDiagnose vom Benutzer unterbrochen")
    except Exception as e:
        print(f"\n\nAusnahme während der Diagnose: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import time
    main()
```

### Diagnosetool verwenden

```bash
# Vollständige Diagnose ausführen
python diagnose_nav_data.py

# Diagnosebericht anzeigen
cat diagnostic_report_*.txt

# Maßnahmen basierend auf den Diagnoseergebnissen ergreifen
# Wenn kritische Probleme vorliegen, gemäß den Empfehlungen des Berichts beheben
# Bei nur Warnungen kann die Nutzung fortgesetzt werden, aber Optimierung wird empfohlen
```

## 📞 Hilfe anfordern

### Bitte geben Sie beim Melden eines Problems Folgendes an:

1. **Vollständige Fehlermeldung**
2. **Systemumgebungsinformationen** (mit Diagnosetool abrufen)
3. **Schritte zur Reproduktion**
4. **Beispieldaten** (falls teilbar)
5. **Erwartetes Ergebnis vs. tatsächliches Ergebnis**

### Kontaktkanäle:
- [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- [FAQ-Dokumentation](./faq.md)
- [Community-Diskussionen](https://github.com/your-repo/nav-data/discussions)

---

**Denken Sie daran: Die meisten Probleme haben eine Lösung!** 🛠️ 

Durch systematische Diagnose und Fehlerbehebung können Sie Probleme, die bei der Nutzung von Nav-data auftreten, schnell lösen. Sollten die Probleme weiterhin bestehen, zögern Sie nicht, die Community um Hilfe zu bitten.
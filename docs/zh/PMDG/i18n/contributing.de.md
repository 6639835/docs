# 🤝 Leitfaden für Mitwirkende

Willkommen bei der Entwicklung des Nav-data Projekts! Dieser Leitfaden hilft Ihnen zu verstehen, wie Sie zum Projekt beitragen können, einschließlich Codestandards, Entwicklungsprozessen und Best Practices.

## 🎯 Beitragsmöglichkeiten

### Wir begrüßen Beiträge der folgenden Arten:

- **🐛 Bug-Meldungen und -Behebungen** - Finden und Beheben von Problemen im Projekt
- **✨ Entwicklung neuer Funktionen** - Hinzufügen neuer Datenverarbeitungsfunktionen oder Optimierungen
- **📚 Dokumentationsverbesserungen** - Verbesserung der Dokumentation, Hinzufügen von Beispielen, Korrektur von Fehlern
- **🔧 Leistungsoptimierung** - Steigerung der Datenverarbeitungseffizienz und des Speicherverbrauchs
- **🧪 Testfälle** - Erhöhung der Testabdeckung, Verbesserung der Codequalität
- **🌍 Internationalisierungs-Unterstützung** - Hinzufügen von Mehrsprachigkeitsunterstützung oder Daten für andere Regionen
- **🎨 Verbesserung der User Experience** - Optimierung der Benutzerfreundlichkeit des Tools und des Ausgabeformats

## 🚀 Schnellstart

### 1. Umgebungsvorbereitung

```bash
# Projekt auf Ihr GitHub-Konto forken
# Ihren Fork klonen
git clone https://github.com/[您的用户名]/Nav-data.git
cd Nav-data

# Upstream-Repository hinzufügen
git remote add upstream https://github.com/原作者/Nav-data.git

# Virtuelle Umgebung erstellen
python -m venv nav-data-dev
source nav-data-dev/bin/activate  # Linux/macOS
# oder nav-data-dev\Scripts\activate  # Windows

# Entwicklungsabhängigkeiten installieren
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Entwicklungsabhängigkeiten (falls vorhanden)
```

### 2. Entwicklungsumgebung validieren

```bash
# Basistests ausführen
python -m pytest tests/ -v

# Codestil prüfen
flake8 *.py

# Typüberprüfung ausführen (falls verwendet)
mypy *.py
```

## 📋 Entwicklungsrichtlinien

### Codestil

Wir folgen den Python Community Standards und Best Practices:

#### 1. PEP 8 Codestil

```python
# ✅ Gutes Beispiel
class AirportDataProcessor:
    """Flughafendatenprozessor
    
    Verarbeitet Flughafendaten im NAIP-Format und konvertiert sie in ein PMDG-kompatibles Format.
    """
    
    def __init__(self, csv_file_path: str, output_db_path: str):
        self.csv_file_path = csv_file_path
        self.output_db_path = output_db_path
        self.processed_count = 0
    
    def process_airport_data(self) -> ProcessingResult:
        """Hauptmethode zur Verarbeitung von Flughafendaten
        
        Returns:
            ProcessingResult: Ergebnisobjekt mit Verarbeitungsstatistiken
            
        Raises:
            FileNotFoundError: Wenn die Eingabedatei nicht existiert
            DatabaseError: Wenn ein Datenbankvorgang fehlschlägt
        """
        try:
            data = self._load_csv_data()
            processed_data = self._transform_data(data)
            self._save_to_database(processed_data)
            
            return ProcessingResult(
                success=True,
                processed_count=self.processed_count,
                message="Flughafendatenverarbeitung abgeschlossen"
            )
        except Exception as e:
            logging.error(f"Fehler bei der Verarbeitung von Flughafendaten: {e}")
            raise

# ❌ Zu vermeidende Schreibweise
def processAirports(file,db):  # Funktionsname nicht konform, Parametertypen unklar
    d=pd.read_csv(file)       # Variablenname unklar
    for i in d.iterrows():    # Keine Fehlerbehandlung
        # Verarbeitunglogik...
        pass
```

#### 2. Typannotationen

```python
from typing import List, Dict, Optional, Union, Tuple
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """Datenklasse für Verarbeitungsergebnisse"""
    success: bool
    processed_count: int
    failed_count: int = 0
    errors: List[str] = None
    message: Optional[str] = None

def convert_coordinates(
    dms_latitude: str, 
    dms_longitude: str
) -> Tuple[Optional[float], Optional[float]]:
    """Konvertiert Koordinaten im DMS-Format in Dezimalgrad
    
    Args:
        dms_latitude: Breitengrad-String im DMS-Format (z.B.: N390308.00)
        dms_longitude: Längengrad-String im DMS-Format (z.B.: E1162930.00)
    
    Returns:
        (Breitengrad, Längengrad) Tupel, bei fehlgeschlagener Konvertierung (None, None)
    """
    try:
        lat = parse_dms_coordinate(dms_latitude, coord_type='latitude')
        lon = parse_dms_coordinate(dms_longitude, coord_type='longitude')
        return lat, lon
    except ValueError as e:
        logging.warning(f"Koordinatenkonvertierung fehlgeschlagen: {e}")
        return None, None
```

#### 3. Fehlerbehandlung und Protokollierung

```python
import logging
from enum import Enum

class ProcessingError(Exception):
    """Basisklasse für datenverarbeitungsbezogene Fehler"""
    pass

class ValidationError(ProcessingError):
    """Datenvalidierungsfehler"""
    pass

class CoordinateError(ValidationError):
    """Koordinatenbezogener Fehler"""
    pass

def process_with_error_handling(data: Dict) -> bool:
    """Beispiel für Datenverarbeitung mit vollständiger Fehlerbehandlung"""
    try:
        # Datenvalidierung
        if not validate_required_fields(data):
            raise ValidationError("Fehlende Pflichtfelder")
        
        # Koordinatenverarbeitung
        lat, lon = convert_coordinates(
            data.get('latitude'),
            data.get('longitude')
        )
        
        if lat is None or lon is None:
            raise CoordinateError("Koordinatenkonvertierung fehlgeschlagen")
        
        # Datenspeicherung
        save_to_database(data)
        logging.info(f"Datensatz erfolgreich verarbeitet: {data.get('identifier')}")
        return True
        
    except ValidationError as e:
        logging.warning(f"Datenvalidierung fehlgeschlagen: {e}")
        return False
    except CoordinateError as e:
        logging.error(f"Fehler bei der Koordinatenverarbeitung: {e}")
        return False
    except Exception as e:
        logging.critical(f"Unerwarteter Fehler: {e}")
        raise
```

### Dokumentationsstandards

#### 1. Funktions- und Klassendokumentation

```python
def parse_dat_file(
    file_path: str, 
    batch_size: int = 1000,
    encoding: str = 'utf-8'
) -> List[Dict[str, Any]]:
    """Analysiert DAT-Dateien im X-Plane-Format
    
    Diese Funktion liest X-Plane Navigationsdatendateien, analysiert die enthaltenen Wegpunktinformationen
    und gibt eine Liste strukturierter Daten zurück. Die Stapelverarbeitung großer Dateien wird unterstützt.
    
    Args:
        file_path: Vollständiger Pfad zur DAT-Datei
        batch_size: Stapelgröße zur Speicheroptimierung, Standard ist 1000
        encoding: Dateikodierung, Standard ist utf-8
    
    Returns:
        Liste von Dictionaries mit Wegpunktinformationen, jedes Dictionary enthält die folgenden Schlüssel:
        - waypoint_identifier: Wegpunkt-Identifikator
        - latitude: Breitengrad (Dezimalgrad)
        - longitude: Längengrad (Dezimalgrad)
        - waypoint_type: Wegpunkt-Typ
        - icao_code: ICAO-Regionalcode
    
    Raises:
        FileNotFoundError: Wenn die angegebene Datei nicht existiert
        ValueError: Wenn das Dateiformat falsch ist
        MemoryError: Wenn nicht genügend Arbeitsspeicher verfügbar ist
    
    Examples:
        Grundlegende Verwendung:
        >>> waypoints = parse_dat_file('data/earth_fix.dat')
        >>> print(f"Es wurden {len(waypoints)} Wegpunkte analysiert")
        
        Verarbeitung großer Dateien:
        >>> waypoints = parse_dat_file(
        ...     'large_file.dat', 
        ...     batch_size=5000
        ... )
    
    Note:
        Die Funktion überspringt automatisch Kommentarzeilen am Anfang der Datei und verarbeitet nur gültige Datenzeilen.
        Beschädigte Datenzeilen werden protokolliert, führen aber nicht zum Abbruch der Verarbeitung.
    """
    # Implementierung...
```

#### 2. Modul-Dokumentation

```python
"""
PMDG Flughafendatenverarbeitungsmodul

Dieses Modul ist für die Verarbeitung von Flughafendaten im NAIP-Format zuständig und konvertiert sie in das PMDG-kompatible SQLite-Datenbankformat. Die Hauptfunktionen umfassen:

- CSV-Dateilesen und -Parsen
- DMS-Koordinatenformatkonvertierung
- Flughafennamenssuche und -abgleich
- Datenvalidierung und -bereinigung
- SQLite-Datenbank schreiben

Unterstützte Eingabedateiformate:
- AD_HP.csv: Flughafengrunddaten (NAIP-Format)
- Airport.dat: Flughafennamens-Nachschlagetabelle

Ausgabeformat:
- SQLite-Datenbank, enthält die Tabelle tbl_airports

Author: Nav-data Team
Version: 2.0.0
License: MIT

Examples:
    Befehlszeilenverwendung:
    $ python PMDG_APT.py
    
    Programmierschnittstelle:
    >>> from PMDG_APT import AirportProcessor
    >>> processor = AirportProcessor(
    ...     csv_path='data/AD_HP.csv',
    ...     output_path='output/airports.s3db'
    ... )
    >>> result = processor.process()
    >>> print(f"Verarbeitung abgeschlossen: {result.processed_count} Flughäfen")
"""

import pandas as pd
import sqlite3
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path

# Modulkonstanten
DEFAULT_AREA_CODE = 'EEU'
DEFAULT_ENCODING = 'latin1'
SUPPORTED_ICAO_REGIONS = {'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW'}

# ... restlicher Code
```

### Teststandards

#### 1. Unit-Tests

```python
import unittest
from unittest.mock import patch, mock_open
import pandas as pd
from PMDG_APT import AirportProcessor, convert_dms_to_decimal

class TestCoordinateConversion(unittest.TestCase):
    """Test der Koordinatenkonvertierungsfunktion"""
    
    def test_valid_north_latitude(self):
        """Test der Konvertierung gültiger nördlicher Breitengrade"""
        result, error = convert_dms_to_decimal("N390308.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 39.0522222, places=6)
    
    def test_valid_east_longitude(self):
        """Test der Konvertierung gültiger östlicher Längengrade"""
        result, error = convert_dms_to_decimal("E1162930.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 116.4916667, places=6)
    
    def test_invalid_format(self):
        """Test ungültiger Koordinatenformate"""
        result, error = convert_dms_to_decimal("INVALID")
        self.assertIsNone(result)
        self.assertIsNotNone(error)
        self.assertIn("Ungültiges DMS-Format", error)
    
    def test_boundary_coordinates(self):
        """Test von Grenzkoordinaten"""
        # Test des Nordpols
        result, error = convert_dms_to_decimal("N900000.00")
        self.assertIsNone(error)
        self.assertEqual(result, 90.0)

class TestAirportProcessor(unittest.TestCase):
    """Test des Flughafendatenprozessors"""
    
    def setUp(self):
        """Testinitialisierung"""
        self.processor = AirportProcessor(
            csv_file_path="test_data/AD_HP.csv",
            lookup_file_path="test_data/Airport.dat",
            output_db_path="test_output/test.s3db"
        )
    
    @patch('pandas.read_csv')
    def test_csv_loading(self, mock_read_csv):
        """Test des CSV-Dateiladens"""
        # CSV-Daten simulieren
        mock_data = pd.DataFrame({
            'CODE_ID': ['ZBAA', 'ZSPD'],
            'GEO_LAT_ACCURACY': ['N390308.00', 'N311133.00'],
            'GEO_LONG_ACCURACY': ['E1162930.00', 'E1211056.00']
        })
        mock_read_csv.return_value = mock_data
        
        result = self.processor._load_csv_data()
        self.assertEqual(len(result), 2)
        self.assertEqual(result.iloc[0]['CODE_ID'], 'ZBAA')
    
    @patch('sqlite3.connect')
    def test_database_creation(self, mock_connect):
        """Test der Datenbankerstellung"""
        mock_connection = mock_connect.return_value
        mock_cursor = mock_connection.cursor.return_value
        
        self.processor._create_database_tables()
        
        # Überprüfen, ob die Tabellenerstellungs-SQL ausgeführt wurde
        mock_cursor.execute.assert_called()
        create_table_calls = [call[0][0] for call in mock_cursor.execute.call_args_list]
        self.assertTrue(any('CREATE TABLE' in call for call in create_table_calls))
```

#### 2. Integrationstests

```python
import tempfile
import os
import sqlite3
from pathlib import Path

class TestIntegration(unittest.TestCase):
    """Integrationstests"""
    
    def setUp(self):
        """Temporäre Testumgebung erstellen"""
        self.test_dir = tempfile.mkdtemp()
        self.csv_file = Path(self.test_dir) / "test_airports.csv"
        self.lookup_file = Path(self.test_dir) / "airports.dat"
        self.output_db = Path(self.test_dir) / "output.s3db"
        
        # Testdatendateien erstellen
        self.create_test_csv()
        self.create_test_lookup()
    
    def tearDown(self):
        """Testumgebung bereinigen"""
        import shutil
        shutil.rmtree(self.test_dir)
    
    def create_test_csv(self):
        """Test-CSV-Datei erstellen"""
        test_data = """CODE_ID,GEO_LAT_ACCURACY,GEO_LONG_ACCURACY
ZBAA,N390308.00,E1162930.00
ZSPD,N311133.00,E1211056.00"""
        
        with open(self.csv_file, 'w', encoding='latin1') as f:
            f.write(test_data)
    
    def create_test_lookup(self):
        """Test-Nachschlage-Datei erstellen"""
        lookup_data = """ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL"""
        
        with open(self.lookup_file, 'w') as f:
            f.write(lookup_data)
    
    def test_end_to_end_processing(self):
        """End-to-End-Verarbeitungstest"""
        processor = AirportProcessor(
            csv_file_path=str(self.csv_file),
            lookup_file_path=str(self.lookup_file),
            output_db_path=str(self.output_db)
        )
        
        result = processor.process()
        
        # Verarbeitungsergebnis validieren
        self.assertTrue(result.success)
        self.assertEqual(result.processed_count, 2)
        
        # Datenbankinhalt validieren
        self.assertTrue(self.output_db.exists())
        
        conn = sqlite3.connect(str(self.output_db))
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        self.assertEqual(count, 2)
        
        cursor.execute("SELECT airport_identifier, airport_name FROM tbl_airports ORDER BY airport_identifier")
        airports = cursor.fetchall()
        
        self.assertEqual(airports[0][0], 'ZBAA')
        self.assertEqual(airports[0][1], 'BEIJING/CAPITAL')
        
        conn.close()
```

## 🔄 Entwicklungsprozess

### Git-Workflow

Wir verwenden den **Git Flow** Workflow:

```bash
# 1. Feature-Branch vom neuesten main-Branch erstellen
git checkout main
git pull upstream main
git checkout -b feature/航路处理优化

# 2. Entwicklungsarbeiten durchführen
# Code schreiben, Tests hinzufügen, Dokumentation aktualisieren

# 3. Änderungen committen
git add .
git commit -m "feat: 优化航路数据处理性能

- 实现批量处理以减少内存使用
- 添加进度条显示处理状态
- 优化数据库写入操作

Closes #123"

# 4. Auf Ihren Fork pushen
git push origin feature/航路处理优化

# 5. Pull Request erstellen
```

### Commit-Nachrichten-Richtlinien

Wir verwenden die **Conventional Commits** Spezifikation:

```bash
# Format: <Typ>(<Scope>): <Beschreibung>
#
# <Optionaler Hauptteil>
#
# <Optionale Fußzeile>

# Beispiel:
git commit -m "feat(airport): 添加机场名称自动查找功能

实现了基于ICAO代码的机场名称自动查找，
支持从多个数据源获取机场名称信息。

- 添加了AirportNameResolver类
- 支持缓存以提高查找性能
- 添加了相应的单元测试

Closes #45"

# Typbeschreibungen:
# feat: Neue Funktion
# fix: Bugfix
# docs: Dokumentationsaktualisierung
# style: Codeformatierung angepasst (ohne funktionale Auswirkungen)
# refactor: Code-Refactoring
# perf: Leistungsoptimierung
# test: Tests hinzugefügt oder geändert
# chore: Änderungen am Build-Prozess oder an Hilfswerkzeugen
```

### Pull Request-Prozess

#### 1. PR-Checkliste

Bevor Sie einen PR einreichen, stellen Sie bitte sicher, dass:

- [ ] Der Code folgt den Codierungsrichtlinien des Projekts
- [ ] Die notwendigen Testfälle wurden hinzugefügt
- [ ] Alle Tests bestanden wurden
- [ ] Die relevante Dokumentation aktualisiert wurde
- [ ] Die Commit-Nachricht den Richtlinien entspricht
- [ ] Keine neuen Abhängigkeiten eingeführt wurden (falls doch, bitte im PR erläutern)

#### 2. PR-Vorlage

```markdown
## 📝 Änderungsbeschreibung
Beschreiben Sie kurz, welche Änderungen dieser PR vornimmt.

## 🔧 Änderungstyp
- [ ] Bugfix
- [ ] Neue Funktion
- [ ] Leistungsoptimierung
- [ ] Code-Refactoring
- [ ] Dokumentationsaktualisierung
- [ ] Testverbesserung

## 🧪 Tests
Beschreiben Sie, wie diese Änderungen getestet wurden:
- [ ] Neue Unit-Tests hinzugefügt
- [ ] Integrationstests hinzugefügt
- [ ] Manuelle Testschritte:
  1. Schritt 1
  2. Schritt 2

## 📸 Screenshots (falls zutreffend)
Fügen Sie Screenshots hinzu, falls es UI-Änderungen oder Änderungen am Ausgabeformat gibt.

## 🔗 Verwandte Issues
Fixes #123
Related to #456

## 📋 Checkliste
- [ ] Mein Code folgt den Codierungsrichtlinien des Projekts
- [ ] Ich habe meinen Code selbst überprüft
- [ ] Ich habe die entsprechenden Tests hinzugefügt
- [ ] Alle neuen und bestehenden Tests wurden bestanden
- [ ] Ich habe die relevante Dokumentation aktualisiert

## 💬 Zusätzliche Anmerkungen
Fügen Sie alle weiteren notwendigen Erläuterungen hinzu.
```

## 🐛 Problem melden

### Bug-Melde-Vorlage

Wenn Sie Probleme finden, verwenden Sie bitte die folgende Vorlage, um ein Issue zu erstellen:

```markdown
**🐛 Bug-Beschreibung**
Beschreiben Sie prägnant und klar das aufgetretene Problem.

**🔄 Schritte zur Reproduktion**
1. Gehen Sie zu '...'
2. Klicken Sie auf '...'
3. Scrollen Sie zu '...'
4. Beobachten Sie den Fehler

**✅ Erwartetes Verhalten**
Beschreiben Sie, was Sie erwarten.

**💻 Umgebungsinformationen**
- Betriebssystem: [z.B. Windows 10, macOS 11.6, Ubuntu 20.04]
- Python-Version: [z.B. 3.9.7]
- Nav-data-Version: [z.B. 2.1.0]
- Andere relevante Softwareversionen:

**📄 Fehlerprotokoll**
Fügen Sie bei Bedarf Fehlerprotokolle oder Screenshots hinzu.

```
[Fügen Sie hier den Protokollinhalt ein]
```

**📁 Eingabedaten**
Wenn das Problem mit bestimmten Eingabedaten zusammenhängt, stellen Sie Beispieldaten bereit (vertrauliche Informationen entfernen).

**🔍 Zusätzliche Informationen**
Fügen Sie weitere Informationen hinzu, die bei der Diagnose des Problems helfen können.
```

### Funktionsanfrage-Vorlage

```markdown
**🚀 Funktionsbeschreibung**
Beschreiben Sie prägnant und klar die Funktion, die Sie hinzufügen möchten.

**💡 Anwendungsfall**
Beschreiben Sie, welches Problem diese Funktion löst oder welchen Prozess sie verbessert.

**📋 Detaillierte Anforderungen**
- [ ] Anforderung 1: Beschreibung
- [ ] Anforderung 2: Beschreibung
- [ ] Anforderung 3: Beschreibung

**🎨 Mögliche Implementierung**
Wenn Sie Implementierungsideen haben, beschreiben Sie diese kurz.

**📚 Referenzmaterialien**
Geben Sie Links zu relevanten Dokumenten, Standards oder Referenzmaterialien an.

**📊 Priorität**
- [ ] Niedrig - Zu erledigen, wenn Zeit ist
- [ ] Mittel - Wichtig, aber nicht dringend
- [ ] Hoch - Muss so schnell wie möglich implementiert werden
- [ ] Dringend - Blockiert andere Arbeiten

**💬 Zusätzliche Anmerkungen**
Alle weiteren zu erläuternden Inhalte.
```

## 📚 Entwicklungsumgebungskonfiguration

### IDE-Konfigurationsempfehlungen

#### Visual Studio Code

Empfohlene Erweiterungen:
```json
{
    "recommendations": [
        "ms-python.python",
        "ms-python.flake8",
        "ms-python.pylint",
        "ms-python.black-formatter",
        "njpwerner.autodocstring",
        "ms-python.isort",
        "charliermarsh.ruff"
    ]
}
```

Workspace-Einstellungen (`.vscode/settings.json`):
```json
{
    "python.defaultInterpreterPath": "./nav-data-dev/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length=88"],
    "python.sortImports.args": ["--profile", "black"],
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    }
}
```

#### PyCharm

1. Codestil konfigurieren:
   - File → Settings → Editor → Code Style → Python
   - Wählen Sie das "Black"-Preset

2. Test-Runner konfigurieren:
   - File → Settings → Tools → Python Integrated Tools
   - Standard-Test-Runner: pytest

### Entwicklungswerkzeugkonfiguration

#### pre-commit Hooks

Erstellen Sie `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
  
  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
        language_version: python3
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88, --extend-ignore=E203]
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: [--profile=black]
```

Installieren und Aktivieren:
```bash
pip install pre-commit
pre-commit install
```

## 🏆 Best Practices

### Leistungsoptimierung

1. Speicherverwaltung
   ```python
   # ✅ Gute Praxis: Generatoren für große Dateien verwenden
   def process_large_file(file_path):
       with open(file_path, 'r') as f:
           for line in f:
               yield process_line(line)
   
   # ❌ Vermeiden: Ganze Datei auf einmal in den Speicher laden
   def process_large_file_bad(file_path):
       with open(file_path, 'r') as f:
           lines = f.readlines()  # Kann viel Speicher verbrauchen
       return [process_line(line) for line in lines]
   ```

2. Datenbankoperationsoptimierung
   ```python
   # ✅ Gute Praxis: Stapelweises Einfügen
   def insert_records_batch(connection, records, batch_size=1000):
       cursor = connection.cursor()
       for i in range(0, len(records), batch_size):
           batch = records[i:i + batch_size]
           cursor.executemany(
               "INSERT INTO table (col1, col2) VALUES (?, ?)", 
               batch
           )
           connection.commit()
   
   # ❌ Vermeiden: Einzelnes Einfügen
   def insert_records_one_by_one(connection, records):
       cursor = connection.cursor()
       for record in records:
           cursor.execute("INSERT INTO table (col1, col2) VALUES (?, ?)", record)
           connection.commit()  # Jedes Mal committen, beeinträchtigt die Leistung
   ```

### Fehlerbehandlung

```python
# ✅ Gute Fehlerbehandlung
def process_coordinate(dms_string: str) -> float:
    """Verarbeitet Koordinaten-String, gibt Dezimalgrad zurück"""
    try:
        return convert_dms_to_decimal(dms_string)
    except ValueError as e:
        logging.warning(f"Koordinatenformatfehler: {dms_string}, Fehler: {e}")
        raise CoordinateError(f"Kann Koordinate nicht analysieren: {dms_string}") from e
    except Exception as e:
        logging.error(f"Unbekannter Fehler bei der Koordinatenverarbeitung: {e}")
        raise

# ❌ Zu vermeidende Fehlerbehandlung
def process_coordinate_bad(dms_string):
    try:
        return convert_dms_to_decimal(dms_string)
    except:  # Fängt alle Ausnahmen ab, schwer zu debuggen
        return None  # Fehlerinformationen gehen verloren
```

### Tests schreiben

```python
# ✅ Gute Tests
class TestCoordinateProcessing(unittest.TestCase):
    def test_valid_north_latitude_conversion(self):
        """Test der Konvertierung gültiger nördlicher Breitengrade"""
        # Gegeben
        dms_input = "N390308.00"
        expected_decimal = 39.0522222
        
        # Wenn
        result = convert_dms_to_decimal(dms_input)
        
        # Dann
        self.assertAlmostEqual(result, expected_decimal, places=6)
    
    def test_invalid_format_raises_error(self):
        """Test, ob ungültiges Format einen entsprechenden Fehler auslöst"""
        # Gegeben
        invalid_input = "INVALID_FORMAT"
        
        # Wenn/Dann
        with self.assertRaises(CoordinateError) as context:
            convert_dms_to_decimal(invalid_input)
        
        self.assertIn("Kann Koordinate nicht analysieren", str(context.exception))

# ❌ Zu vermeidende Tests
def test_coordinate():  # Testname unklar
    result = convert_dms_to_decimal("N390308.00")
    assert result == 39.0522222  # Genaue Gleitkomma-Vergleiche können fehlschlagen
```

## 📞 Hilfe erhalten

Wenn Sie während des Beitragsprozesses auf Probleme stoßen:

1. **Dokumentation konsultieren** - Prüfen Sie zuerst die Projektdokumentation und diesen Beitragsleitfaden
2. **Bestehende Issues durchsuchen** - Prüfen Sie, ob jemand auf ein ähnliches Problem gestoßen ist
3. **An Diskussionen teilnehmen** - Stellen Sie Fragen in den GitHub Discussions
4. **Maintainer kontaktieren** - Kontaktieren Sie die Projekt-Maintainer über GitHub Issues

### Community-Richtlinien

Wir setzen uns für eine offene und freundliche Community-Umgebung ein:

- **Andere respektieren** - Seien Sie höflich und respektvoll gegenüber allen Teilnehmern
- **Konstruktives Feedback** - Geben Sie nützliches, konstruktives Feedback und Vorschläge
- **Geduldiges Lernen** - Helfen Sie Neulingen beim Lernen, teilen Sie Wissen und Erfahrungen
- **Teamgeist** - Arbeiten Sie zusammen, um das Projekt zu verbessern

## 🎉 Anerkennung für Mitwirkende

Wir erkennen Mitwirkende an den folgenden Stellen an:
- Im Abschnitt für Mitwirkende in der README.md
- In den Versionsaktualisierungen in der CHANGELOG.md
- In der Danksagungsliste der GitHub Releases

Vielen Dank, dass Sie in Erwägung ziehen, zum Nav-data Projekt beizutragen! Jeder Beitrag macht dieses Projekt besser.

---

**Denken Sie daran**: Guter Code wird für Menschen geschrieben; Maschinen führen ihn nur zufällig aus.
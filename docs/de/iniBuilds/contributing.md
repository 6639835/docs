# 🤝 Beitragsrichtlinien

Willkommen, um zum Nav-data-Projekt beizutragen! Diese Richtlinien helfen Ihnen zu verstehen, wie Sie sich an der Projektentwicklung beteiligen, Code einreichen und Verbesserungsvorschläge machen können.

## 🎯 Beitragsmöglichkeiten

### 📝 Sie können auf folgende Weisen beitragen:

- **🐛 Fehler melden**: Probleme finden und detaillierte Schritte zur Reproduktion angeben
- **💡 Funktionsvorschläge**: Ideen für neue Funktionen oder Verbesserungen bestehender Funktionen einreichen
- **📖 Dokumentationsverbesserungen**: Dokumentation vervollständigen, Fehler korrigieren, Beispiele hinzufügen
- **🔧 Code-Beiträge**: Fehler beheben, neue Funktionen implementieren, Performance optimieren
- **🧪 Testunterstützung**: Testfälle hinzufügen, Testabdeckung verbessern
- **🌐 Lokalisierung**: Dokumente übersetzen, mehr Sprachen und Regionen unterstützen

## 🚀 Schnellstart

### 📋 Entwicklungsumgebung einrichten

1. **Projekt-Repository forken**
   ```bash
   # Projekt auf GitHub forken
   # Dann lokal klonen
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

2. **Entwicklungsumgebung einrichten**
   ```bash
   # Virtuelle Umgebung erstellen
   python -m venv venv
   
   # Virtuelle Umgebung aktivieren
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # Abhängigkeiten installieren
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # Entwicklungs-Abhängigkeiten
   ```

3. **Git Hooks installieren**
   ```bash
   # pre-commit Hooks installieren
   pre-commit install
   ```

### 🔄 Entwicklungs-Workflow

1. **Branch erstellen**
   ```bash
   git checkout -b feature/your-feature-name
   # Oder
   git checkout -b fix/bug-description
   ```

2. **Entwickeln**
   - Code schreiben
   - Tests hinzufügen
   - Dokumentation aktualisieren
   - Tests ausführen und sicherstellen, dass sie bestehen

3. **Code committen**
   ```bash
   git add .
   git commit -m "feat: add new navigation data processor"
   ```

4. **Pushen und PR erstellen**
   ```bash
   git push origin feature/your-feature-name
   # Pull Request auf GitHub erstellen
   ```

## 📋 Code-Standards

### 🐍 Python-Code-Stil

Wir folgen dem [PEP 8](https://pep8.org/)-Standard und verwenden die folgenden Tools:

#### **Code-Formatierung**
```bash
# Code-Formatierung mit black
black *.py

# Imports mit isort sortieren
isort *.py
```

#### **Code-Überprüfung**
```bash
# Code-Überprüfung mit flake8
flake8 *.py

# Statische Analyse mit pylint
pylint *.py
```

### 📝 Code-Standard-Anforderungen

#### **1. Benennung von Funktionen und Klassen**
```python
# ✅ Korrekte Benennung
def process_airports(csv_file_path: str, db_path: str) -> None:
    """Verarbeitet Flughafendaten"""
    pass

class CoordinateCache:
    """Klasse für den Koordinaten-Cache"""
    pass

# ❌ Falsche Benennung
def processAirports(csvFile, dbPath):
    pass

class coordinateCache:
    pass
```

#### **2. Docstrings**
```python
def get_magnetic_variation(lat: float, lon: float) -> float:
    """
    Berechnet die magnetische Deklination für angegebene Koordinaten
    
    Parameter:
        lat (float): Breitengrad (dezimal Grad)
        lon (float): Längengrad (dezimal Grad)
    
    Gibt zurück:
        float: Magnetische Deklination (Grad), auf 1 Dezimalstelle gerundet
    
    Beispiel:
        >>> get_magnetic_variation(39.9042, 116.4074)
        -6.2
    """
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)
```

#### **3. Typ-Annotationen**
```python
from typing import Dict, List, Optional, Tuple

def parse_dat_file(file_path: str) -> List[Dict[str, str]]:
    """Analysiert eine DAT-Datei und gibt eine Liste von Datensätzen zurück"""
    records = []
    # Verarbeitungslogik
    return records

def find_coordinates(
    identifier: str, 
    icao_code: Optional[str] = None
) -> Tuple[float, float]:
    """Findet Koordinaten und gibt ein Breiten- und Längengrad-Tupel zurück"""
    return lat, lon
```

#### **4. Fehlerbehandlung**
```python
import logging

logger = logging.getLogger(__name__)

def process_data_file(file_path: str) -> bool:
    """
    Verarbeitet eine Datendatei
    
    Gibt zurück:
        bool: Gibt an, ob die Verarbeitung erfolgreich war
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            # Verarbeitungslogik
            data = file.read()
            
        logger.info(f"Datei erfolgreich verarbeitet: {file_path}")
        return True
        
    except FileNotFoundError:
        logger.error(f"Datei nicht gefunden: {file_path}")
        return False
    except PermissionError:
        logger.error(f"Dateiberechtigungen unzureichend: {file_path}")
        return False
    except Exception as e:
        logger.error(f"Unbekannter Fehler bei der Dateiverarbeitung: {e}")
        return False
```

#### **5. Konstanten-Definition**
```python
# Konstanten am Anfang des Moduls definieren
SUPPORTED_ICAO_REGIONS = {
    'ZB', 'ZS', 'ZJ', 'ZG', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH',
    'VM', 'VH', 'RK'
}

DEFAULT_BATCH_SIZE = 1000
COORDINATE_PRECISION = 8
DATABASE_TIMEOUT = 30

# In Funktionen verwenden
def process_waypoints(icao_code: str) -> bool:
    if icao_code not in SUPPORTED_ICAO_REGIONS:
        logger.warning(f"Nicht unterstützte ICAO-Region: {icao_code}")
        return False
    # Verarbeitungslogik
```

## 🧪 Test-Anforderungen

### 📊 Testabdeckung

- **Mindestanforderung**: Testabdeckung für neuen Code ≥ 80%
- **Ziel**: Gesamte Projekt-Testabdeckung ≥ 90%

### 🛠️ Test-Tools

```bash
# Alle Tests ausführen
pytest

# Spezifische Testdatei ausführen
pytest tests/test_airports.py

# Abdeckungsbericht generieren
pytest --cov=. --cov-report=html

# Abdeckungsbericht anzeigen
open htmlcov/index.html
```

### ✅ Test-Beispiele

#### **Unit-Tests**
```python
import unittest
from unittest.mock import patch, MagicMock
from airports import get_magnetic_variation, convert_dms_to_decimal

class TestAirports(unittest.TestCase):
    
    def test_convert_dms_to_decimal_north(self):
        """Testet die DMS-Konvertierung für nördliche Breite"""
        result = convert_dms_to_decimal("N390842.12")
        self.assertAlmostEqual(result, 39.145033, places=6)
    
    def test_convert_dms_to_decimal_south(self):
        """Testet die DMS-Konvertierung für südliche Breite"""
        result = convert_dms_to_decimal("S390842.12")
        self.assertAlmostEqual(result, -39.145033, places=6)
    
    @patch('airports.geo_mag')
    def test_get_magnetic_variation(self, mock_geomag):
        """Testet die Berechnung der magnetischen Deklination"""
        # Mock-Rückgabewert einstellen
        mock_result = MagicMock()
        mock_result.d = -6.234
        mock_geomag.calculate.return_value = mock_result
        
        result = get_magnetic_variation(39.9042, 116.4074)
        
        self.assertEqual(result, -6.2)
        mock_geomag.calculate.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### **Integrationstests**
```python
import tempfile
import sqlite3
import os
from airports import process_airports

class TestAirportsIntegration(unittest.TestCase):
    
    def setUp(self):
        """Einrichtung vor dem Test"""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix='.db')
        self.temp_db.close()
        self.db_path = self.temp_db.name
    
    def tearDown(self):
        """Bereinigung nach dem Test"""
        os.unlink(self.db_path)
    
    def test_process_airports_integration(self):
        """Testet die Integration der Flughafen-Datenverarbeitung"""
        csv_file = "test_data/sample_airports.csv"
        lookup_file = "test_data/sample_icao.txt"
        
        # Verarbeitung ausführen
        process_airports(csv_file, lookup_file, self.db_path)
        
        # Ergebnis überprüfen
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        
        self.assertGreater(count, 0)
        
        # Datenqualität überprüfen
        cursor.execute("""
            SELECT COUNT(*) FROM tbl_airports 
            WHERE airport_latitude IS NULL OR airport_longitude IS NULL
        """)
        null_coords = cursor.fetchone()[0]
        
        self.assertEqual(null_coords, 0, "Es sollten keine Null-Koordinaten existieren")
        
        conn.close()
```

### 📝 Testdaten

Testdaten sollten im Verzeichnis `tests/test_data/` abgelegt werden:

```
tests/
├── test_data/
│   ├── sample_airports.csv      # Beispiel-Flughafendaten
│   ├── sample_runways.csv       # Beispiel-Runway-Daten
│   ├── sample_earth_fix.dat     # Beispiel-Wegpunkt-Daten
│   ├── sample_earth_nav.dat     # Beispiel-Navigationsdaten
│   └── sample_icao.txt          # Beispiel-ICAO-Lookup-Tabelle
├── test_airports.py             # Tests für das Flughafenmodul
├── test_runways.py              # Tests für das Runway-Modul
├── test_waypoints.py            # Tests für das Wegpunktmodul
└── conftest.py                  # pytest-Konfiguration
```

## 🐛 Fehlerbericht

### 📋 Fehlerbericht-Vorlage

Verwenden Sie die folgende Vorlage, um Fehler zu melden:

```markdown
## Fehlerbeschreibung
Kurze und prägnante Beschreibung des Problems

## Schritte zur Reproduktion
1. Führen Sie den Befehl `python XP2INI_NDB_Converter.py` aus
2. Wählen Sie die Konfiguration '...'
3. Beobachten Sie den Fehler '...'

## Erwartetes Verhalten
Beschreiben Sie, was Sie erwarten würden

## Tatsächliches Verhalten
Beschreiben Sie, was tatsächlich passiert ist

## Umgebungsinformationen
- Betriebssystem: Windows 11 22H2
- Python-Version: 3.11.5
- MSFS-Version: 2024
- Flugzeug-Addon: PMDG 777

## Fehlerprotokoll
```
Fügen Sie die relevanten Fehlermeldungen und Protokolle ein
```

## Weitere Informationen
Alle weiteren Informationen, die bei der Diagnose des Problems helfen könnten
```

### 🔍 Fehlerklassifizierung

| Priorität | Label | Beschreibung |
|-----------|-------|--------------|
| 🔴 Kritisch | `priority:critical` | Führt zu Programmabstürzen oder Datenkorruption |
| 🟠 Hoch | `priority:high` | Betrifft Hauptfunktionen, mit Workaround |
| 🟡 Mittel | `priority:medium` | Betrifft sekundäre Funktionen oder Benutzererfahrung |
| 🟢 Niedrig | `priority:low` | Kleines Problem, beeinträchtigt Kernfunktionen nicht |

## 💡 Funktionsvorschläge

### 📋 Funktionsvorschlag-Vorlage

```markdown
## Funktionsübersicht
Kurze Beschreibung der vorgeschlagenen Funktion

## Anwendungsfall
Beschreiben Sie, wann diese Funktion benötigt wird

## Detaillierte Beschreibung
Detaillierte Erläuterung der Implementierung und des erwarteten Effekts der Funktion

## Alternative Lösungen
Haben Sie andere Lösungen in Betracht gezogen?

## Zusätzliche Informationen
Alle weiteren Informationen, die zum Verständnis des Vorschlags beitragen
```

### 🎯 Funktionsklassifizierung

| Typ | Label | Beschreibung |
|-----|-------|--------------|
| ✨ Verbesserung | `type:enhancement` | Verbesserung bestehender Funktionen |
| 🚀 Funktion | `type:feature` | Brandneue Funktion |
| 📊 Performance | `type:performance` | Performance-Optimierung |
| 📖 Dokumentation | `type:documentation` | Dokumentationsverbesserung |

## 📖 Dokumentationsbeiträge

### 📝 Dokumentationsstandards

1. **Markdown-Format**: Standard-Markdown-Syntax verwenden
2. **VitePress-Kompatibilität**: Sicherstellen, dass front matter korrekt ist
3. **Technische Begriffe in Englisch, Erläuterungen in Deutsch**: Technische Fachbegriffe in Englisch beibehalten, Erläuterungen in Deutsch verfassen.
4. **Code-Beispiele**: Vollständige, lauffähige Code-Beispiele bereitstellen

### 🎨 Dokumentations-Stilrichtlinien

```markdown
---
title: Seitentitel
description: Seitenbeschreibung
---

# 🎯 Haupttitel

Einführungstext, der den Zweck und Umfang dieses Dokuments erklärt.

## 📋 Untertitel

### Dritttitel

Verwenden Sie geeignete Emojis und eine sinnvolle Hierarchie.

#### Code-Beispiel

```python
# Vollständiges Code-Beispiel bereitstellen
def example_function():
    return "Beispiel"
```

#### Hinweise

> ⚠️ **Wichtiger Hinweis**: Wichtige Informationen in einem Zitatblock hervorheben

#### Listenformat

- ✅ Emojis zur Verbesserung der Lesbarkeit verwenden
- 📝 Listeneinträge prägnant halten
- 🔗 Bei Bedarf interne Links hinzufügen
```

## 🔄 Pull Request-Prozess

### 📋 PR-Checkliste

Bitte vor dem Einreichen eines PR überprüfen:

- [ ] 🧪 **Alle Tests bestanden**: `pytest`
- [ ] 📊 **Testabdeckung erfüllt**: Neue Code-Abdeckung ≥ 80%
- [ ] 🎨 **Code-Formatierung korrekt**: `black`, `isort`, `flake8`
- [ ] 📖 **Dokumentation aktualisiert**: API-Änderungen erfordern eine Dokumentationsaktualisierung
- [ ] 🏷️ **Commit-Nachricht-Standard**: Conventional Commits befolgen
- [ ] 🔗 **Referenziertes Issue verknüpft**: Im PR-Beschreibungstext referenzieren

### 📝 PR-Vorlage

```markdown
## Änderungsübersicht
Kurze Beschreibung des Zwecks und der Hauptänderungen dieses PRs

## Änderungstyp
- [ ] 🐛 Bugfix
- [ ] ✨ Neue Funktion
- [ ] 📖 Dokumentations-Update
- [ ] 🎨 Code-Refactoring
- [ ] ⚡ Performance-Optimierung
- [ ] 🧪 Testverbesserung

## Detaillierte Beschreibung
Detaillierte Beschreibung der Implementierung und der technischen Details

## Tests
Erklären Sie, wie diese Änderungen getestet wurden

## Verwandtes Issue
Schließt #123

## Checkliste
- [ ] Tests bestanden
- [ ] Code-Formatierung korrekt
- [ ] Dokumentation aktualisiert
- [ ] Änderungslog aktualisiert
```

### 🏷️ Commit-Nachricht-Standard

Folgen Sie dem [Conventional Commits](https://www.conventionalcommits.org/)-Standard:

```bash
# Feature-Hinzufügung
feat: add support for AIRAC 2024 data format

# Bugfix
fix: resolve coordinate conversion precision issue

# Dokumentations-Update
docs: update installation guide for Windows 11

# Performance-Optimierung
perf: optimize magnetic variation calculation

# Code-Refactoring
refactor: restructure database connection handling

# Test-Hinzufügung
test: add unit tests for waypoint processing

# Build-bezogen
build: update dependencies to latest versions
```

## 🌟 Anerkennung für Mitwirkende

### 🏆 Mitwirkenden-Ränge

| Rang | Anforderungen | Berechtigungen |
|------|---------------|----------------|
| 👋 Contributor | 1+ gültiger PR | Basis-Mitwirkender |
| 🎖️ Regular Contributor | 5+ gültige PRs | Priorisierter Code-Review |
| 🌟 Core Contributor | 10+ gültige PRs + langfristige Beteiligung | Issue-Triage-Berechtigungen |
| 👑 Maintainer | Kernentwickler | Volle Repository-Berechtigungen |

### 📜 Liste der Mitwirkenden

Wir pflegen eine Liste der Mitwirkenden in der README-Datei und danken jedem Mitwirkenden für seine Bemühungen!

```markdown
## 🙏 Dank an die Mitwirkenden

<a href="https://github.com/your-repo/nav-data/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/nav-data" />
</a>
```

## 🤔 Hilfe erhalten

### 💬 Kommunikationskanäle

- **📧 E-Mail**: project@nav-data.org
- **💬 Diskussionsforum**: GitHub Discussions
- **🐛 Problemberichte**: GitHub Issues
- **📖 Dokumentationsfragen**: Direkt einen PR zur Änderung einreichen

### 📚 Lernressourcen

- [Offizielle Python-Dokumentation](https://docs.python.org/)
- [SQLite-Dokumentation](https://sqlite.org/docs.html)
- [Prinzipien der Flugnavigation](https://www.faa.gov/air_traffic/publications/)
- [ARINC 424 Standard](https://www.arinc.com/)

### 🎓 Leitfaden für Neueinsteiger

Wenn Sie zum ersten Mal an einem Open-Source-Projekt teilnehmen:

1. 📖 **Code lesen**: Zuerst die Projektstruktur und Kernfunktionen verstehen
2. 🐛 **Klein anfangen**: Mit der Behebung von Dokumentationsfehlern oder kleinen Bugs beginnen
3. 🤝 **Aktiv kommunizieren**: Scheuen Sie sich nicht, Fragen zu stellen und Hilfe zu suchen
4. 📈 **Kontinuierlich lernen**: Projektentwicklungen verfolgen und Best Practices lernen

## 📄 Verhaltenskodex

### 🤝 Unser Engagement

Um eine offene und einladende Umgebung zu schaffen, verpflichten wir uns zu:

- **🌈 Inklusivität**: Teilnehmer mit unterschiedlichen Hintergründen und Ansichten sind willkommen
- **🤝 Respekt**: Unterschiedliche Meinungen und Erfahrungen respektieren
- **📚 Lernorientierung**: Neulingen helfen, sich zu entwickeln und zu lernen
- **🎯 Professionalität**: Fokus auf technische Diskussionen und Projektverbesserungen

### ❌ Inakzeptables Verhalten

- Persönliche Angriffe oder beleidigende Äußerungen
- Belästigung oder Diskriminierung
- Veröffentlichung privater Informationen anderer
- Anderes unprofessionelles oder unangemessenes Verhalten

### 📞 Meldemechanismus

Sollten Sie eine Verletzung des Verhaltenskodex feststellen, kontaktieren Sie bitte die Projektbetreuer:
- 📧 E-Mail: conduct@nav-data.org
- 📱 Private Nachricht: Projektbetreuer über GitHub-Private Nachricht kontaktieren

---

Vielen Dank, dass Sie in Erwägung ziehen, zum Nav-data-Projekt beizutragen! Jeder Beitrag macht die Flugsimulations-Community besser. 🛫
# 🤝 TFDI Navigationsdatenkonverter Beitragsleitfaden

Willkommen beim TFDI Navigationsdatenkonverter-Projekt! Wir danken allen Mitwirkenden für ihre Beteiligung, sei es durch Code-Beiträge, Dokumentationsverbesserungen, Fehlerberichte oder Funktionsvorschläge.

## 🌟 Beitragsmöglichkeiten

### 💻 Code-Beiträge
- 🐛 **Bugs beheben** - Bekannte Probleme und Mängel lösen
- ✨ **Neue Funktionen entwickeln** - Neue Konvertierungsfunktionen oder Verbesserungen hinzufügen
- 📈 **Leistungsoptimierung** - Konvertierungsgeschwindigkeit und Speichereffizienz verbessern
- 🧪 **Testerweiterung** - Testfälle und Abdeckung erhöhen
- 📚 **Dokumentationsverbesserung** - API-Dokumentation und Benutzerhandbuch vervollständigen

### 📝 Nicht-Code-Beiträge
- 🐛 **Probleme melden** - Bugs und Kompatibilitätsprobleme melden
- 💡 **Funktionsvorschläge** - Neue Funktionen und Verbesserungsvorschläge einreichen
- 📖 **Dokumentation verfassen** - Tutorials, Anleitungen und Beispiele erstellen
- 🌐 **Lokalisierung** - Benutzeroberfläche und Dokumentation übersetzen
- 🎓 **Community-Support** - Anderen Benutzern bei der Problemlösung helfen

## 🚀 Entwicklungsumgebung einrichten

### Systemanforderungen

```bash
# Python Versionsanforderungen
Python 3.8+ (3.9 oder 3.10 empfohlen)

# Betriebssystemunterstützung
Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+)

# Speicheranforderungen
Mindestens 4 GB RAM (8 GB+ empfohlen)
```

### Schnellstart

#### 1. Projekt klonen
```bash
# Haupt-Repository klonen
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Oder Ihren Fork klonen
git clone https://github.com/your-username/tfdi-nav-converter.git
cd tfdi-nav-converter
```

#### 2. Entwicklungsumgebung einrichten
```bash
# Virtuelle Umgebung erstellen
python -m venv venv

# Virtuelle Umgebung aktivieren
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Entwicklungsabhängigkeiten installieren
pip install -r requirements-dev.txt
pip install -e .  # Editierbare Installation
```

#### 3. Installation überprüfen
```bash
# Testsuite ausführen
pytest

# Code-Qualitätsprüfung ausführen
flake8 src/
mypy src/
black --check src/

# Konverter ausführen
python -m tfdi_converter --help
```

### Entwicklungswerkzeug-Konfiguration

#### IDE-Einstellungen (VS Code empfohlen)
```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./venv/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.mypyEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests/"]
}
```

#### Pre-Commit-Hooks
```bash
# pre-commit installieren
pip install pre-commit

# Hooks installieren
pre-commit install

# Alle Hooks manuell ausführen
pre-commit run --all-files
```

## 📋 Entwicklungs-Workflow

### 1. Feature-Branch erstellen

```bash
# Sicherstellen, dass der Main-Branch aktuell ist
git checkout main
git pull origin main

# Neuen Feature-Branch erstellen
git checkout -b feature/add-new-format-support

# Oder Fix-Branch
git checkout -b fix/memory-leak-in-processor
```

### 2. Entwickeln und Testen

#### Code-Entwicklung
```bash
# Code schreiben
# ... Entwicklung durchführen ...

# Tests hinzufügen
# tests/test_new_feature.py

# Dokumentation aktualisieren
# docs/api/new_feature.md
```

#### Tests ausführen
```bash
# Alle Tests ausführen
pytest

# Spezifische Testdatei ausführen
pytest tests/test_converter.py

# Ausführen und Coverage-Bericht generieren
pytest --cov=tfdi_converter --cov-report=html

# Performance-Tests ausführen
pytest tests/performance/ -m performance
```

#### Code-Qualitätsprüfung
```bash
# Code formatieren
black src/ tests/

# Imports sortieren
isort src/ tests/

# Statische Analyse
flake8 src/ tests/
mypy src/

# Sicherheitsprüfung
bandit -r src/
```

### 3. Code committen

#### Commit-Nachrichten-Konvention
Verwenden Sie die [Conventional Commits](https://www.conventionalcommits.org/)-Spezifikation:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Commit-Typen:**
- `feat`: Neue Funktion
- `fix`: Bugfix
- `docs`: Dokumentationsupdate
- `style`: Code-Formatierung
- `refactor`: Code-Refactoring
- `test`: Testbezogen
- `chore`: Änderungen am Build-Prozess oder an Hilfswerkzeugen
- `perf`: Performance-Verbesserung

**Commit-Beispiele:**
```bash
# Neue Funktion
git commit -m "feat(converter): add support for MSFS native format"

# Bugfix
git commit -m "fix(parser): handle malformed coordinate data gracefully"

# Dokumentationsupdate
git commit -m "docs(api): add examples for batch processing"

# Performance-Verbesserung
git commit -m "perf(processor): optimize memory usage in large dataset processing"
```

### 4. Pushen und PR erstellen

```bash
# Branch remote pushen
git push origin feature/add-new-format-support

# Pull Request auf GitHub erstellen
# PR-Vorlage ausfüllen
# Auf Code-Review warten
```

## 📝 Code-Konventionen

### Python-Codierungsstandards

#### 1. Code-Stil
```python
# Standardeinstellungen des Black-Formatierers verwenden
# Zeilenlänge: 88 Zeichen
# Doppelte Anführungszeichen verwenden
# Zwei Leerzeilen zwischen Funktionen

from typing import Dict, List, Optional, Union
import logging
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


@dataclass
class ConversionConfig:
    """Konvertierungskonfigurationsklasse.
    
    Dient zur Verwaltung verschiedener Konfigurationsparameter des TFDI-Konverters.
    
    Attributes:
        output_dir: Pfad zum Ausgabeverzeichnis
        coordinate_precision: Koordinatenpräzision
        enable_validation: Aktiviert die Datenvalidierung
    """
    output_dir: str = "Primary"
    coordinate_precision: int = 8
    enable_validation: bool = True


class FenixDataProcessor:
    """Fenix-Datenprozessor.
    
    Verantwortlich für das Lesen und Verarbeiten von Navigationsdaten aus der Fenix-Datenbank.
    """
    
    def __init__(self, config: ConversionConfig) -> None:
        """Initialisiert den Prozessor.
        
        Args:
            config: Konvertierungskonfigurationsobjekt
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def process_waypoints(
        self, 
        waypoint_data: List[Dict[str, Union[str, float]]]
    ) -> List[Dict[str, Union[str, float]]]:
        """Verarbeitet Wegpunktdaten.
        
        Args:
            waypoint_data: Liste der Rohdaten für Wegpunkte
            
        Returns:
            Liste der verarbeiteten Wegpunktdaten
            
        Raises:
            DataProcessingError: Fehler bei der Datenverarbeitung
        """
        try:
            processed_data = []
            
            for waypoint in waypoint_data:
                processed_waypoint = self._normalize_waypoint(waypoint)
                processed_data.append(processed_waypoint)
            
            self.logger.info(f"Erfolgreich {len(processed_data)} Wegpunkte verarbeitet")
            return processed_data
            
        except Exception as e:
            self.logger.error(f"Wegpunktverarbeitung fehlgeschlagen: {e}")
            raise DataProcessingError(f"Wegpunktdaten können nicht verarbeitet werden: {e}") from e
    
    def _normalize_waypoint(
        self, waypoint: Dict[str, Union[str, float]]
    ) -> Dict[str, Union[str, float]]:
        """Normalisiert einzelne Wegpunktdaten."""
        # Standardisierungslogik implementieren
        normalized = waypoint.copy()
        
        # Koordinatenpräzision standardisieren
        if "latitude" in normalized:
            normalized["latitude"] = round(
                float(normalized["latitude"]), 
                self.config.coordinate_precision
            )
        
        return normalized
```

#### 2. Typ-Hinweise
```python
from typing import (
    Any, Dict, List, Optional, Union, 
    Callable, Iterator, TypeVar, Generic
)

# Typaliase
ConfigDict = Dict[str, Any]
WaypointData = Dict[str, Union[str, float]]
ProcessingResult = List[WaypointData]

# Generischer Typ
T = TypeVar('T')

class DataCache(Generic[T]):
    """Generische Daten-Cache-Klasse"""
    
    def __init__(self) -> None:
        self._cache: Dict[str, T] = {}
    
    def get(self, key: str) -> Optional[T]:
        """Cachedaten abrufen"""
        return self._cache.get(key)
    
    def set(self, key: str, value: T) -> None:
        """Cachedaten setzen"""
        self._cache[key] = value
```

#### 3. Fehlerbehandlung
```python
class TFDIConverterError(Exception):
    """Basis-Ausnahmeklasse für den Konverter"""
    pass


class DataValidationError(TFDIConverterError):
    """Ausnahme bei Datenvalidierung"""
    pass


class DatabaseConnectionError(TFDIConverterError):
    """Ausnahme bei Datenbankverbindung"""
    pass


def safe_database_operation(operation: Callable[[], T]) -> Optional[T]:
    """Wrapper für sichere Datenbankoperationen"""
    try:
        return operation()
    except sqlite3.Error as e:
        logger.error(f"Datenbankoperation fehlgeschlagen: {e}")
        raise DatabaseConnectionError(f"Datenbankoperation fehlgeschlagen: {e}") from e
    except Exception as e:
        logger.error(f"Unbekannter Fehler: {e}")
        return None
```

### Test-Konventionen

#### 1. Teststruktur
```python
# tests/test_converter.py
import pytest
from unittest.mock import Mock, patch
from pathlib import Path

from tfdi_converter.core.converter import FenixToTFDIConverter
from tfdi_converter.core.config import ConverterConfig
from tfdi_converter.exceptions import DataValidationError


class TestFenixToTFDIConverter:
    """Testklasse für den Fenix zu TFDI Konverter"""
    
    @pytest.fixture
    def sample_config(self) -> ConverterConfig:
        """Beispielkonfiguration erstellen"""
        return ConverterConfig(
            output_dir="test_output",
            coordinate_precision=6,
            enable_validation=True
        )
    
    @pytest.fixture
    def sample_database(self, tmp_path: Path) -> Path:
        """Beispieldatenbank erstellen"""
        db_path = tmp_path / "test.db3"
        # Logik zur Erstellung der Testdatenbank
        return db_path
    
    def test_converter_initialization(self, sample_config):
        """Test der Konverter-Initialisierung"""
        converter = FenixToTFDIConverter(sample_config)
        
        assert converter.config == sample_config
        assert converter.config.coordinate_precision == 6
    
    def test_database_validation_success(
        self, sample_config, sample_database
    ):
        """Test des erfolgreichen Datenbank-Validierungsfalls"""
        converter = FenixToTFDIConverter(sample_config)
        
        result = converter.validate_database(sample_database)
        
        assert result is True
    
    def test_database_validation_failure(self, sample_config):
        """Test des fehlgeschlagenen Datenbank-Validierungsfalls"""
        converter = FenixToTFDIConverter(sample_config)
        invalid_db = Path("nonexistent.db3")
        
        with pytest.raises(DataValidationError):
            converter.validate_database(invalid_db)
    
    @patch('tfdi_converter.core.converter.sqlite3.connect')
    def test_database_connection_error(
        self, mock_connect, sample_config, sample_database
    ):
        """Test des Datenbankverbindungsfehlers"""
        mock_connect.side_effect = sqlite3.Error("Verbindung fehlgeschlagen")
        converter = FenixToTFDIConverter(sample_config)
        
        with pytest.raises(DatabaseConnectionError):
            converter.convert(sample_database, start_terminal_id=1000)
    
    @pytest.mark.performance
    def test_large_database_performance(
        self, sample_config, large_test_database
    ):
        """Test der Performance mit großer Datenbank"""
        import time
        
        converter = FenixToTFDIConverter(sample_config)
        start_time = time.time()
        
        converter.convert(large_test_database, start_terminal_id=1000)
        
        elapsed_time = time.time() - start_time
        assert elapsed_time < 300  # Sollte innerhalb von 5 Minuten abgeschlossen sein
```

#### 2. Testdatenverwaltung
```python
# tests/conftest.py
import pytest
import sqlite3
from pathlib import Path


@pytest.fixture(scope="session")
def test_data_dir() -> Path:
    """Testdatenverzeichnis"""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_fenix_database(tmp_path: Path) -> Path:
    """Beispiel-Fenix-Datenbank erstellen"""
    db_path = tmp_path / "sample_fenix.db3"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Testtabellenstruktur erstellen
    cursor.execute("""
        CREATE TABLE Airports (
            AirportID TEXT PRIMARY KEY,
            AirportName TEXT,
            Latitude REAL,
            Longitude REAL
        )
    """)
    
    # Testdaten einfügen
    cursor.execute("""
        INSERT INTO Airports VALUES 
        ('ZBAA', 'Beijing Capital', 40.080111, 116.584556),
        ('ZSPD', 'Shanghai Pudong', 31.143378, 121.805214)
    """)
    
    conn.commit()
    conn.close()
    
    return db_path
```

### Dokumentationsstandards

#### 1. API-Dokumentation
```python
def convert_fenix_database(
    database_path: Path,
    output_dir: Path,
    config: Optional[ConverterConfig] = None
) -> ConversionResult:
    """Konvertiert die Fenix-Datenbank in das TFDI-Format.
    
    Diese Funktion empfängt die Fenix A320 Navigationsdatenbankdatei und konvertiert sie in eine
    Sammlung von TFDI MD-11-kompatiblen JSON-Dateien.
    
    Args:
        database_path: Pfad zur Fenix-Datenbankdatei (.db3-Datei)
        output_dir: Pfad zum Ausgabeverzeichnis, in dem die konvertierten Dateien gespeichert werden
        config: Optionales Konvertierungskonfigurationsobjekt; wenn nicht angegeben, wird die Standardkonfiguration verwendet
    
    Returns:
        ConversionResult: Objekt, das Konvertierungsergebnisse und Statistiken enthält
        
    Raises:
        FileNotFoundError: Wenn die Datenbankdatei nicht existiert
        DataValidationError: Wenn das Datenbankformat inkorrekt ist
        PermissionError: Wenn keine Schreibberechtigung für das Ausgabeverzeichnis besteht
        
    Example:
        >>> from pathlib import Path
        >>> from tfdi_converter import convert_fenix_database
        >>> 
        >>> result = convert_fenix_database(
        ...     database_path=Path("fenix_nav.db3"),
        ...     output_dir=Path("./output")
        ... )
        >>> print(f"Konvertierung abgeschlossen, {result.processed_records} Datensätze verarbeitet")
        
    Note:
        Der Konvertierungsprozess kann je nach Datenbankgröße einige Minuten dauern.
        Es wird empfohlen, die Originaldaten vor der Konvertierung zu sichern.
        
    See Also:
        - :class:`ConverterConfig`: Konvertierungskonfigurationsoptionen
        - :class:`ConversionResult`: Konvertierungsergebnisdetails
    """
    pass
```

#### 2. Benutzerdokumentation
```markdown
# Anwendungsbeispiele

## Grundlegende Konvertierung

```python
from tfdi_converter import FenixToTFDIConverter, ConverterConfig

# Konfiguration erstellen
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8
)

# Konverter initialisieren
converter = FenixToTFDIConverter(config)

# Konvertierung ausführen
result = converter.convert(
    database_path="path/to/fenix.db3",
    start_terminal_id=1000
)

print(f"Konvertierung abgeschlossen! Ausgabedatei: {result.output_archive}")
```

## Erweiterte Konfiguration

```python
# Benutzerdefinierte Konfiguration
config = ConverterConfig(
    output_dir="Custom_Output",
    coordinate_precision=6,
    vnav_threshold=3.0,
    enable_faf_detection=True,
    compression_level=9
)
```
```

## 🧪 Testanleitung

### Teststrategie

#### 1. Unit-Tests
- **Coverage-Ziel**: 90%+
- **Testumfang**: Alle öffentlichen Methoden und kritischen privaten Methoden
- **Mock-Strategie**: Externe Abhängigkeiten (Datenbanken, Dateisysteme) isolieren

#### 2. Integrationstests  
- **Datenbankintegration**: Verwendung echter Testdatenbanken
- **Dateisystemintegration**: Testen tatsächlicher Datei-Lese- und -Schreibvorgänge
- **End-to-End-Tests**: Vollständige Konvertierungsprozess-Tests

#### 3. Performance-Tests
- **Benchmark-Tests**: Erfassung der Verarbeitungszeiten für verschiedene Datensatzgrößen
- **Speichertests**: Überwachung der Speichernutzung und -lecks
- **Parallelitätstests**: Testen von Multithreading und gleichzeitiger Ausführung

### Tests ausführen

```bash
# Schnelle Tests (ohne Performance-Tests)
pytest -m "not performance"

# Komplette Testsuite
pytest

# Spezifische Modultests
pytest tests/test_converter.py

# Coverage-Tests
pytest --cov=tfdi_converter --cov-report=term-missing

# Performance-Benchmark-Tests
pytest tests/performance/ --benchmark-only
```

## 📚 Dokumentationsbeiträge

### Dokumentationstypen

#### 1. Benutzerdokumentation
- **Installationsanleitung**: Detaillierte Installationsschritte
- **Benutzer-Tutorials**: Anwendungsbeispiele von grundlegend bis fortgeschritten
- **Fehlerbehebung**: Häufig gestellte Fragen und Lösungen
- **API-Referenz**: Vollständige API-Dokumentation

#### 2. Entwicklerdokumentation
- **Architekturdesign**: Systemarchitektur und Designphilosophie
- **Beitragsleitfaden**: Dieses Dokument
- **Codierungskonventionen**: Code-Stil und Best Practices
- **Veröffentlichungsprozess**: Versionsfreigabe- und Wartungsprozess

### Dokumentationserstellung

```bash
# Dokumentationsabhängigkeiten installieren
pip install -r docs/requirements.txt

# Dokumentation erstellen
cd docs/
make html

# Live-Vorschau
make livehtml
```

## 🐛 Problem melden

### Problembericht-Vorlage

```markdown
**Problembeschreibung**
Beschreiben Sie das aufgetretene Problem klar und prägnant.

**Reproduktionsschritte**
1. Führen Sie '...' aus
2. Geben Sie '...' ein
3. Sehen Sie den Fehler '...'

**Erwartetes Verhalten**
Beschreiben Sie, was Sie erwartet hätten.

**Tatsächliches Verhalten**
Beschreiben Sie, was tatsächlich passiert ist.

**Umgebungsinformationen**
- OS: [z.B. Windows 11, macOS 12.0, Ubuntu 20.04]
- Python: [z.B. 3.9.16]
- Konverter-Version: [z.B. v1.0.0]
- Fenix-Version: [z.B. v1.2.0]
- TFDI-Version: [z.B. v1.1.0]

**Datenbankinformationen**
- Datenbankgröße: [z.B. 150 MB]
- Anzahl der Datensätze: [z.B. ~50.000]
- AIRAC-Zyklus: [z.B. 2508]

**Protokollinformationen**
```
Fügen Sie relevante Protokollinformationen oder den Fehler-Stacktrace ein
```

**Zusätzliche Dateien**
- Konfigurationsdateien
- Fehler-Screenshots
- Beispieldaten (falls möglich)
```

### Problem-Tags

Verwenden Sie die folgenden Tags, um Probleme zu kategorisieren:
- 🐛 `bug` - Fehlerbericht
- ✨ `enhancement` - Funktionsanfrage
- 📚 `documentation` - Dokumentationsbezogen
- ❓ `question` - Anwendungsfrage
- 🔥 `urgent` - Dringendes Problem
- 🆕 `good first issue` - Gut für neue Mitwirkende

## 🏆 Anerkennung und Belohnungen

### Anerkennung der Mitwirkenden

#### 1. Code-Beitragende
- **Committer-Liste**: Liste der Beitragenden in README und Dokumentation
- **Release Notes**: Besondere Danksagung in den Versionshinweisen
- **GitHub-Statistiken**: Beitragsstatistiken und Erfolgsabzeichen

#### 2. Dokumentationsbeitragende
- **Dokumentationsnennung**: Nennung auf den entsprechenden Dokumentationsseiten
- **Übersetzungsanerkennung**: Liste der Übersetzer für mehrsprachige Versionen
- **Tutorial-Autoren**: Anerkennung der Autoren von Community-Tutorials

#### 3. Community-Beitragende
- **Problemberichte**: Besonderer Dank an Entdecker wichtiger Probleme
- **Testbeiträge**: Beta-Tester und Beitragende zur Qualitätssicherung
- **Werbebeiträge**: Beitragende zur Community-Promotion und -Bildung

### Besondere Beitragsbelohnungen

#### Monatlicher Mitwirkender
- Monatliche Auswahl herausragender Mitwirkender
- Bewerbung auf der Projekt-Homepage und in sozialen Medien
- Spezielle GitHub-Abzeichen und Titel

#### Jährlicher Mitwirkender
- Auswahl des besten Mitwirkenden des Jahres
- Speziell angefertigte Andenken und Zertifikate
- Einladung zum Projektentscheidungsausschuss

## 📞 Kontakt

### Kontakt zum Entwicklungsteam

- **Projektbetreuer**: @maintainer-username
- **Technischer Leiter**: @tech-lead-username  
- **Community-Management**: @community-manager-username

### Kommunikationskanäle

- **GitHub Issues**: Technische Probleme und Funktionsanfragen
- **GitHub Discussions**: Allgemeine Diskussionen und Fragen & Antworten
- **Mailingliste**: dev@tfdi-converter.org
- **Discord**: [Einladungslink]

### Zugesagte Reaktionszeiten

- **Bug-Berichte**: Antwort innerhalb von 48 Stunden
- **Funktionsanfragen**: Antwort innerhalb von 1 Woche
- **Pull Request**: Überprüfung innerhalb von 3 Werktagen
- **Community-Fragen**: Antwort innerhalb von 24 Stunden

---

**Vielen Dank, dass Sie in Erwägung ziehen, zum TFDI Navigationsdatenkonverter beizutragen!** 

Wir freuen uns darauf, gemeinsam mit Ihnen bessere Flugsimulationswerkzeuge zu entwickeln. 🚁✨
# Leitfaden für Mitwirkende

Willkommen beim Nav-data Open-Source-Projekt! Wir freuen uns sehr über Ihre Beiträge zum Tool für die Konvertierung von Luftfahrtnavigationsdaten.

## 🤝 So können Sie mitwirken

### Probleme melden (Issues)
- **Bug-Bericht**: Fehler im Programm oder ungewöhnliches Verhalten entdecken
- **Feature-Anfrage**: Neue Funktionen oder Verbesserungen bestehender Funktionen vorschlagen
- **Dokumentationsverbesserung**: Fehler oder unklare Stellen in der Dokumentation aufzeigen
- **Performance-Problem**: Performance-Engpässe oder Optimierungsvorschläge melden

### Code-Beitrag (Pull Requests)
- **Bug beheben**: Bekannte Probleme beheben
- **Neue Funktionen entwickeln**: Neue Datenverarbeitungsfunktionen implementieren
- **Performance-Optimierung**: Die Ausführungseffizienz des Codes verbessern
- **Code-Refactoring**: Code-Struktur und Wartbarkeit verbessern

### Dokumentationsbeitrag
- **Technische Dokumentation**: API-Dokumentation und Architekturbeschreibung vervollständigen
- **Benutzerhandbuch**: Benutzeranleitungen und Tutorials verbessern
- **Code-Beispiele**: Mehr Anwendungsbeispiele bereitstellen
- **Mehrsprachige Übersetzung**: Dokumente in andere Sprachen übersetzen

## 📋 Bevor Sie beginnen

### 1. Das Projekt verstehen
Bevor Sie mit der Mitarbeit beginnen, beachten Sie bitte:
- Lesen Sie die [Architekturbeschreibung](./architecture.md)
- Verstehen Sie die [Nutzungsanleitung](./guide/usage.md)
- Durchsuchen Sie die bestehenden [Issues](https://github.com/your-repo/nav-data/issues)

### 2. Umgebung vorbereiten
Stellen Sie sicher, dass Ihre Entwicklungsumgebung die Anforderungen erfüllt:
- Python 3.6+
- Git
- Erforderliche Abhängigkeitspakete (siehe [Installationsanleitung](./guide/installation.md))

### 3. Projekt forken
1. Besuchen Sie die [Nav-data GitHub-Seite](https://github.com/your-repo/nav-data)
2. Klicken Sie oben rechts auf die Schaltfläche "Fork"
3. Klonen Sie Ihren Fork lokal:
   ```bash
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

## 🐛 Probleme melden

### Bug-Bericht-Vorlage

Wenn Sie einen Bug melden, geben Sie bitte die folgenden Informationen an:

```markdown
**Bug 描述**
简要描述遇到的问题。

**重现步骤**
1. 执行 '...' 命令
2. 使用 '...' 数据文件
3. 观察到 '...' 错误

**预期行为**
描述您期望发生的情况。

**实际行为**
描述实际发生的情况。

**环境信息**
- 操作系统: [如 macOS 12.0]
- Python 版本: [如 3.9.7]
- Nav-data 版本: [如 v1.2.0]

**附加信息**
- 错误日志
- 相关截图
- 示例数据文件（如适用）
```

### Feature-Anfrage-Vorlage

```markdown
**功能描述**
简要描述您希望添加的功能。

**使用场景**
描述此功能解决的具体问题或使用场景。

**建议实现方案**
如果您有具体的实现想法，请详细描述。

**替代方案**
描述您考虑过的其他替代方案。

**附加信息**
任何其他相关信息或参考资料。
```

## 💻 Code-Beitrags-Workflow

### 1. Branch erstellen
Erstellen Sie einen neuen Branch für Ihren Beitrag:

```bash
# Sicherstellen, dass der main-Branch aktuell ist
git checkout main
git pull upstream main

# Neuen Branch erstellen
git checkout -b feature/your-feature-name
# Oder für Bugfixes
git checkout -b fix/issue-number-description
```

### 2. Entwicklung und Tests
Während der Entwicklung:

```bash
# Änderungen häufig committen
git add .
git commit -m "feat: add waypoint validation function"

# Tests ausführen, um die Codequalität sicherzustellen
python -m pytest tests/
python -m flake8 .
python -m black . --check
```

### 3. Pull Request einreichen
Nach Abschluss der Entwicklung:

```bash
# Branch zu Ihrem Fork pushen
git push origin feature/your-feature-name
```

Erstellen Sie dann einen Pull Request auf GitHub.

### Pull Request-Vorlage

```markdown
**Art der Änderung**
- [ ] Bugfix
- [ ] Neues Feature
- [ ] Code-Refactoring
- [ ] Dokumentationsaktualisierung
- [ ] Performance-Optimierung

**Beschreibung der Änderung**
Beschreiben Sie kurz den Inhalt der Änderungen dieses PRs.

**Zugehöriges Issue**
- Fixes #(issue number)
- Related to #(issue number)

**Tests**
- [ ] Neue Testfälle hinzugefügt
- [ ] Alle bestehenden Tests bestanden
- [ ] Manuelle Testvalidierung

**Checkliste**
- [ ] Der Code entspricht den Projekt-Kodierungsrichtlinien
- [ ] Notwendige Dokumentation hinzugefügt
- [ ] Zugehörige README oder Konfiguration aktualisiert
- [ ] Rückwärtskompatibilität berücksichtigt
```

## 📝 Code-Konventionen

### Python-Kodierungsstandards

#### 1. Code-Stil
Verwenden Sie [PEP 8](https://pep8.org/) als Grundlage und befolgen Sie die folgenden zusätzlichen Richtlinien:

```python
# Importreihenfolge
import os  # Standardbibliothek
import sys

import pandas as pd  # Drittanbieterbibliothek
import numpy as np

from .utils import helper_function  # Lokaler Import

# Klassendefinition
class NavigationDataProcessor:
    """
    Navigationsdatenprozessor
    
    Verarbeitet Luftfahrtnavigationsdaten in verschiedenen Formaten, einschließlich der Konvertierung von CSV-, PDF- usw. Formaten.
    
    Attributes:
        input_format (str): Eingabedatenformat
        output_format (str): Ausgabedatenformat
    """
    
    def __init__(self, input_format: str, output_format: str):
        """
        Initialisiert den Prozessor
        
        Args:
            input_format: Eingabedatenformat ('csv', 'pdf', 'dat')
            output_format: Ausgabedatenformat ('dat', 'txt', 'json')
        """
        self.input_format = input_format
        self.output_format = output_format
    
    def process(self, data: Any) -> Any:
        """
        Hauptmethode zur Datenverarbeitung
        
        Args:
            data: Eingabedaten
            
        Returns:
            Die verarbeiteten Daten
            
        Raises:
            ValueError: Wird ausgelöst, wenn das Eingabedatenformat nicht unterstützt wird
        """
        if not self._validate_input(data):
            raise ValueError(f"Invalid input format: {type(data)}")
        
        return self._convert_data(data)
```

#### 2. Namenskonventionen
```python
# Konstanten: Großbuchstaben, durch Unterstriche getrennt
CHINA_AREAS = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW'}
MAX_RETRY_COUNT = 3

# Variablen und Funktionen: Kleinbuchstaben, durch Unterstriche getrennt
def process_waypoint_data(input_file: str) -> List[Dict]:
    waypoint_list = []
    error_count = 0
    return waypoint_list

# Klassennamen: PascalCase
class CSVDataProcessor:
    pass

# Private Methoden: Einzelner Unterstrich als Präfix
def _validate_coordinates(self, lat: float, lon: float) -> bool:
    pass

# Interne Verwendung: Doppelter Unterstrich als Präfix
def __internal_helper(self) -> None:
    pass
```

#### 3. Typ-Annotationen
Alle öffentlichen Funktionen müssen Typ-Annotationen enthalten:

```python
from typing import Dict, List, Optional, Union, Any

def convert_coordinates(
    input_coords: Union[str, Tuple[float, float]], 
    output_format: str = "decimal"
) -> Optional[Dict[str, float]]:
    """
    Koordinatenformat konvertieren
    
    Args:
        input_coords: Eingabekoordinaten, unterstützt String- oder Tupelformat
        output_format: Ausgabeformat, unterstützt 'decimal' oder 'dms'
        
    Returns:
        Konvertiertes Koordinaten-Wörterbuch, gibt None bei Fehler zurück
    """
    pass
```

#### 4. Docstrings
Verwenden Sie Docstrings im Google-Stil:

```python
def process_airway_csv(csv_file: str, output_file: str, 
                      excluded_areas: Set[str] = None) -> bool:
    """
    CSV-Daten für Luftstraßen verarbeiten
    
    Liest Luftstraßendaten aus einer CSV-Datei, validiert und konvertiert sie und gibt sie dann im X-Plane DAT-Format aus. Unterstützt eine Regionsfilterfunktion.
    
    Args:
        csv_file: Pfad zur Eingabe-CSV-Datei
        output_file: Pfad zur Ausgabe-DAT-Datei  
        excluded_areas: Satz von Bereichscodes, die ausgeschlossen werden sollen, standardmäßig None
        
    Returns:
        Gibt True bei erfolgreicher Verarbeitung zurück, False bei Fehler
        
    Raises:
        FileNotFoundError: Wird ausgelöst, wenn die Eingabedatei nicht existiert
        ValueError: Wird ausgelöst, wenn das CSV-Format fehlerhaft ist
        
    Example:
        >>> process_airway_csv('routes.csv', 'earth_awy.dat', {'ZB', 'ZG'})
        True
        
    Note:
        Die ursprüngliche Ausgabedatei wird während des Verarbeitungsprozesses automatisch gesichert.
    """
    pass
```

### Tools zur Code-Qualität

#### 1. Code-Formatierung
Verwenden Sie [Black](https://black.readthedocs.io/) zur Code-Formatierung:

```bash
# Installation
pip install black

# Gesamtes Projekt formatieren
black .

# Formatierung überprüfen, aber nicht ändern
black . --check

# Einzelne Datei formatieren
black script.py
```

#### 2. Code-Linting
Verwenden Sie [flake8](https://flake8.pycqa.org/) zur Code-Prüfung:

```bash
# Installation
pip install flake8

# Gesamtes Projekt prüfen
flake8 .

# Konfigurationsdatei .flake8
[flake8]
max-line-length = 88
ignore = E203, W503
exclude = 
    .git,
    __pycache__,
    build,
    dist,
    venv,
    .venv
```

#### 3. Typ-Prüfung
Verwenden Sie [mypy](http://mypy-lang.org/) zur Typ-Prüfung:

```bash
# Installation
pip install mypy

# Typen prüfen
mypy .

# Konfigurationsdatei mypy.ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
```

### Git Commit-Konventionen

#### Commit-Nachrichtenformat
Verwenden Sie die [Conventional Commits](https://www.conventionalcommits.org/)-Spezifikation:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit-Typen
- `feat`: Neues Feature
- `fix`: Bugfix
- `docs`: Dokumentationsaktualisierung
- `style`: Code-Formatierung (Änderungen, die die Code-Ausführung nicht beeinflussen)
- `refactor`: Refactoring (Code-Änderungen, die weder neue Funktionen hinzufügen noch Fehler beheben)
- `perf`: Performance-Optimierung
- `test`: Tests hinzufügen
- `chore`: Änderungen am Build-Prozess oder an Hilfswerkzeugen

#### Beispiele
```bash
# Neues Feature
git commit -m "feat(airway): add AIRAC cycle validation"

# Bugfix
git commit -m "fix(pdf): resolve coordinate parsing error for edge cases"

# Dokumentationsaktualisierung
git commit -m "docs: update installation guide for macOS"

# Refactoring
git commit -m "refactor(terminal): extract common validation logic"
```

## 🧪 Test-Leitfaden

### Teststruktur
```
tests/
├── unit/                   # Unit-Tests
│   ├── test_airway.py
│   ├── test_pdf_extract.py
│   └── test_terminal.py
├── integration/            # Integrationstests
│   ├── test_full_pipeline.py
│   └── test_module_interaction.py
├── fixtures/               # Testdaten
│   ├── sample_data/
│   └── expected_outputs/
└── conftest.py            # pytest-Konfiguration
```

### Tests schreiben

#### Unit-Test-Beispiel
```python
import pytest
from unittest.mock import Mock, patch
from nav_data.airway import NavigationPoint, process_navigation_point

class TestNavigationPoint:
    """Testklasse für Navigationspunkte"""
    
    def test_navigation_point_creation(self):
        """Testet die Erstellung von Navigationspunkten"""
        point = NavigationPoint("ABCDE", "DESIGNATED_POINT", "ZB")
        
        assert point.identifier == "ABCDE"
        assert point.type.code_type == "DESIGNATED_POINT"
        assert point.area_code == "ZB"
    
    def test_navigation_point_invalid_type(self):
        """Testet ungültigen Navigationspunkttyp"""
        with pytest.raises(ValueError):
            NavigationPoint("ABCDE", "INVALID_TYPE", "ZB")
    
    @pytest.mark.parametrize("identifier,expected", [
        ("ABCDE", True),
        ("", False),
        (None, False),
    ])
    def test_navigation_point_validation(self, identifier, expected):
        """Parametrisierter Test zur Navigationspunktvalidierung"""
        result = validate_navigation_identifier(identifier)
        assert result == expected
```

#### Integrationstest-Beispiel
```python
import tempfile
from pathlib import Path
from nav_data.pipeline import DataPipeline

class TestDataPipeline:
    """Integrationstest für Daten-Pipeline"""
    
    @pytest.fixture
    def temp_directory(self):
        """Temporäres Verzeichnis-Fixture"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def sample_csv_data(self):
        """Beispiel-CSV-Daten"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123"""
    
    def test_complete_pipeline(self, temp_directory, sample_csv_data):
        """Testet die vollständige Datenverarbeitungs-Pipeline"""
        # Testdaten vorbereiten
        input_file = temp_directory / "input.csv"
        input_file.write_text(sample_csv_data)
        output_file = temp_directory / "output.dat"
        
        # Pipeline ausführen
        pipeline = DataPipeline()
        result = pipeline.process(str(input_file), str(output_file))
        
        # Ergebnis überprüfen
        assert result is True
        assert output_file.exists()
        
        output_content = output_file.read_text()
        assert "ABCDE" in output_content
        assert "FGHIJ" in output_content
```

### Tests ausführen
```bash
# Alle Tests ausführen
pytest

# Bestimmte Testdatei ausführen
pytest tests/unit/test_airway.py

# Bestimmte Testmethode ausführen
pytest tests/unit/test_airway.py::TestNavigationPoint::test_navigation_point_creation

# Abdeckungsbericht generieren
pytest --cov=nav_data tests/

# Detaillierte Ausgabe
pytest -v

# Beim ersten Fehler anhalten
pytest -x
```

## 📚 Dokumentationsbeitrag

### Dokumentationsstruktur
```
docs/
├── guide/                  # Benutzerhandbuch
│   ├── index.md           # Handbuch-Startseite
│   ├── installation.md    # Installationsanleitung
│   ├── configuration.md   # Konfigurationsbeschreibung
│   └── usage.md           # Nutzungsanleitung
├── api/                    # API-Dokumentation
│   ├── airway.md
│   ├── pdf_extract.md
│   └── terminal.md
├── architecture.md         # Architekturbeschreibung
├── contributing.md         # Leitfaden für Mitwirkende
├── changelog.md           # Änderungsverlauf
└── license.md             # Lizenz
```

### Dokumentationsschreibregeln

#### Markdown-Format
```markdown
---
title: Dokumenttitel
description: Dokumentbeschreibung
---

# Überschrift erster Ordnung

Kurze Einführung in den Dokumentinhalt.

## Überschrift zweiter Ordnung

### Überschrift dritter Ordnung

Der Haupttext verwendet eine klare deutsche Ausdrucksweise.

#### Code-Beispiel
Beispiele mit Code-Blöcken darstellen:

```python
def example_function():
    """Beispielfunktion"""
    return "Hello, Nav-data!"
```

#### Hinweise
> **Hinweis**: Wichtige Hinweise im Zitatformat.

**Warnung**: Warnmeldungen fett formatieren.

#### Links und Referenzen
- Interner Link: [Installationsanleitung](./guide/installation.md)
- Externer Link: [Python-Webseite](https://python.org)
- Code-Referenz: Code im `code`-Format zitieren
```

#### Leitfaden für technisches Schreiben
1. **Klar und prägnant**: Verwenden Sie eine einfache und klare Sprache
2. **Strukturiert**: Gliedern Sie Inhalte mit Überschriften, Listen und Tabellen
3. **Beispielreich**: Stellen Sie ausreichend Code-Beispiele bereit
4. **Benutzerfreundlich**: Schreiben Sie die Dokumentation aus der Perspektive des Benutzers
5. **Zeitnahe Aktualisierung**: Halten Sie die Dokumentation mit dem Code synchron

### API-Dokumentation
Schreiben Sie eine detaillierte Dokumentation für alle öffentlichen APIs:

```python
def process_csv_data(csv_file: str, output_format: str = "dat") -> Dict[str, Any]:
    """
    Navigationsdaten im CSV-Format verarbeiten
    
    Diese Funktion liest Luftstraßendaten im CSV-Format, validiert und konvertiert sie und gibt sie als Navigationsdatendatei im angegebenen Format aus.
    
    Args:
        csv_file (str): Pfad zur Eingabe-CSV-Datei
        output_format (str, optional): Ausgabeformat, unterstützt 'dat', 'json', 'xml'. Standard ist 'dat'.
    
    Returns:
        Dict[str, Any]: Informationen zum Verarbeitungsergebnis, enthält folgende Schlüssel:
            - 'success' (bool): War die Verarbeitung erfolgreich
            - 'processed_count' (int): Anzahl der erfolgreich verarbeiteten Datensätze
            - 'error_count' (int): Anzahl der Fehlerdatensätze
            - 'output_file' (str): Pfad zur Ausgabedatei
    
    Raises:
        FileNotFoundError: Wird ausgelöst, wenn die Eingabedatei nicht existiert
        ValueError: Wird ausgelöst, wenn das CSV-Format inkorrekt ist
        PermissionError: Wird ausgelöst, wenn die Ausgabedatei nicht geschrieben werden kann
    
    Example:
        Grundlegende Verwendung:
        
        >>> result = process_csv_data('airway_data.csv')
        >>> print(result['success'])
        True
        
        Ausgabeformat angeben:
        
        >>> result = process_csv_data('airway_data.csv', 'json')
        >>> print(result['output_file'])
        'airway_data.json'
    
    Note:
        - Die Eingabe-CSV-Datei muss standardmäßige Luftstraßendatenfelder enthalten
        - Die Datenintegrität wird während der Verarbeitung automatisch überprüft
        - Unterstützt die Fortsetzung nach Unterbrechungen
    
    See Also:
        :func:`validate_csv_format`: CSV-Format-Validierung
        :func:`convert_coordinate_format`: Koordinatenformat-Konvertierung
    """
    pass
```

## 🔍 Code-Review

### Review-Checkliste

#### Funktionalität
- [ ] Der Code implementiert die erwartete Funktionalität
- [ ] Alle Grenzfälle wurden behandelt
- [ ] Fehlerbehandlung ist angemessen
- [ ] Die Performance erfüllt die Anforderungen

#### Code-Qualität
- [ ] Die Code-Struktur ist klar
- [ ] Die Benennung ist aussagekräftig
- [ ] Funktionen haben eine einzige Verantwortung
- [ ] Code-Duplikation wird vermieden

#### Sicherheit
- [ ] Eingabeprüfung ist ausreichend
- [ ] Keine Sicherheitslücken
- [ ] Sensible Informationen werden angemessen behandelt
- [ ] Die Berechtigungsverwaltung ist angemessen

#### Tests
- [ ] Testabdeckung ist ausreichend
- [ ] Testfälle sind umfassend
- [ ] Integrationstests sind bestanden
- [ ] Performance-Tests erfüllen die Anforderungen

#### Dokumentation
- [ ] Code-Kommentare sind ausreichend
- [ ] API-Dokumentation ist vollständig
- [ ] Benutzerdokumentation ist aktualisiert
- [ ] Änderungsverlauf ist aktualisiert

### Review-Feedback
Geben Sie konstruktives Feedback:

```markdown
**Gesamtbewertung**
Der Code implementiert die erwartete Funktionalität, hat eine klare Struktur und eine ausreichende Testabdeckung.

**Spezifisches Feedback**
1. **Code-Struktur**: Die Funktion `process_data` ist zu lang, es wird empfohlen, sie in mehrere kleinere Funktionen aufzuteilen
2. **Performance-Optimierung**: Die Schleife in Zeile 45 könnte durch eine List Comprehension optimiert werden
3. **Fehlerbehandlung**: Es wird empfohlen, in Zeile 78 spezifische Ausnahmetypen hinzuzufügen

**Vorgeschlagene Änderung**
```python
# Es wird empfohlen, diesen Code
for item in data_list:
    if validate_item(item):
        processed_list.append(process_item(item))

# zu ändern in
processed_list = [
    process_item(item) 
    for item in data_list 
    if validate_item(item)
]
```

**Sonstiges**
Die Dokumentation benötigt zusätzliche Anwendungsbeispiele.
```

## 🚀 Release-Prozess

### Versionsnummer-Konvention
Verwenden Sie [Semantische Versionierung](https://semver.org/lang/zh-CN/) (Semantic Versioning):

- **Major-Version**: Inkompatible API-Änderungen
- **Minor-Version**: Rückwärtskompatible Funktionserweiterungen
- **Patch-Version**: Rückwärtskompatible Fehlerbehebungen

Beispiel: `1.2.3`

### Release-Checkliste
Vor der Veröffentlichung sicherstellen:
- [ ] Alle Tests bestanden
- [ ] Dokumentation ist aktualisiert
- [ ] Änderungsverlauf ist aktualisiert
- [ ] Versionsnummer ist aktualisiert
- [ ] Abhängigkeiten sind korrekt
- [ ] Sicherheitsprüfung bestanden

## 🏆 Belohnungen für Mitwirkende

### Anerkennungsmechanismen
- **Code-Mitwirkende**: Alle Mitwirkenden in der README auflisten
- **Dokumentationsmitwirkende**: Informationen der Mitwirkenden in der Dokumentation kennzeichnen
- **Problemreporter**: Nach der Lösung eines Issues Dank aussprechen
- **Langfristige Mitwirkende**: Zur Projektbetreuung einladen

### Projektbetreuer werden
Langfristig aktive Mitwirkende können eingeladen werden, Projektbetreuer zu werden und erhalten:
- Direkte Push-Berechtigungen
- Berechtigungen zur Überprüfung von Pull Requests
- Das Recht, an Projektentscheidungen teilzunehmen
- Besonderen Dank in der Projektbeschreibung

## 📞 Kontakt

### Hilfe erhalten
- **GitHub Issues**: Probleme melden oder Funktionen anfragen
- **GitHub Discussions**: Allgemeine Diskussionen und Q&A
- **Dokumentation**: Detaillierte Nutzungsanleitung ansehen
- **Code-Kommentare**: Detaillierte Kommentare im Quellcode einsehen

### Community-Richtlinien
Bitte befolgen Sie die folgenden Grundsätze, wenn Sie am Projekt mitwirken:
- **Andere respektieren**: Eine freundliche und professionelle Haltung bewahren
- **Konstruktive Diskussion**: Wertvolles Feedback und Vorschläge geben
- **Inklusivität**: Mitwirkende mit unterschiedlichem Hintergrund sind willkommen
- **Lernorientiert**: Anderen helfen zu lernen und sich weiterzuentwickeln

## 🙏 Danksagung

Vielen Dank an alle Entwickler, Tester, Dokumentationsmitwirkende und Benutzer, die zum Nav-data Projekt beigetragen haben!

### Besonderer Dank
- Kern-Wartungsteam
- Langfristige Mitwirkende
- Problemreporter
- Dokumentationsübersetzer
- Community-Unterstützer

---

**Nochmals vielen Dank für Ihren Beitrag!** 🎉 Ihre Beteiligung macht Nav-data besser und bietet der Luftfahrtsimulations-Community bessere Navigationsdatentools.
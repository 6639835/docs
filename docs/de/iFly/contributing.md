# 🤝 Beitragsrichtlinien

Vielen Dank für Ihr Interesse am iFly Navigationsdaten-Konverter-Projekt! Wir begrüßen und schätzen Beiträge in jeder Form.

## 🌟 Beitragsmöglichkeiten

### 💻 Code-Beiträge
- 🐛 Fehlerbehebungen
- ✨ Neue Funktionen hinzufügen
- 📈 Performance-Optimierung
- 🧪 Testfälle hinzufügen
- 📚 Dokumentation verbessern

### 📝 Nicht-Code-Beiträge
- 🐛 Probleme melden
- 💡 Funktionsvorschläge einreichen
- 📖 Dokumentation verbessern
- 🌐 Übersetzungsunterstützung
- 🎓 Tutorial-Erstellung

## 🚀 Schnellstart

### 1. Umgebung vorbereiten

```bash
# Repository klonen
git clone https://github.com/your-username/ifly-nav-converter.git
cd ifly-nav-converter

# Virtuelle Umgebung erstellen
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Abhängigkeiten installieren
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Entwicklungs-Abhängigkeiten
```

### 2. Entwicklungsumgebung konfigurieren

```bash
# Pre-Commit-Hooks installieren
pre-commit install

# Tests ausführen
pytest

# Code-Qualitätsprüfung
flake8 .
mypy .
black . --check
```

## 📋 Entwicklungsablauf

### 1. Feature-Branch erstellen

```bash
# Neuen Branch vom Hauptbranch erstellen
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Oder Fix-Branch
git checkout -b fix/issue-description
```

### 2. Entwickeln und Testen

```bash
# Entwicklung durchführen
# ... Code schreiben ...

# Tests ausführen
pytest tests/

# Code-Qualität prüfen
black .
flake8 .
mypy .
```

### 3. Code committen

```bash
# Dateien hinzufügen
git add .

# Committen (Commit-Nachrichten-Konventionen beachten)
git commit -m "feat: add new feature description"

# Auf Remote-Branch pushen
git push origin feature/your-feature-name
```

### 4. Pull Request erstellen

1. Pull Request auf GitHub erstellen
2. Eine detaillierte PR-Beschreibung ausfüllen
3. Sicherstellen, dass alle Prüfungen erfolgreich sind
4. Auf Code-Review warten

## 📝 Code-Konventionen

### Python Code-Stil

Wir verwenden die folgenden Tools, um die Code-Qualität sicherzustellen:

- **Black**：Code-Formatierung
- **Flake8**：Code-Stil-Prüfung
- **MyPy**：Typ-Prüfung
- **isort**：Import-Sortierung

### Code-Beispiel

```python
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class NavigationDataConverter:
    """Navigationsdaten-Konverter-Hauptklasse.
    
    Dieses Modul ist für die Umwandlung von Fenix Navigationsdaten in das iFly-Format verantwortlich.
    
    Attributes:
        config: Konverter-Konfiguration
        logger: Logger
    """
    
    def __init__(self, config: ConverterConfig) -> None:
        """Initialisiert den Konverter.
        
        Args:
            config: Konverter-Konfigurationsobjekt
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def convert_data(
        self, 
        source_path: Path,
        target_path: Path,
        options: Optional[Dict[str, Any]] = None
    ) -> bool:
        """Konvertiert Navigationsdaten.
        
        Args:
            source_path: Quelldatenpfad
            target_path: Zieldatenpfad  
            options: Optionale Konvertierungsoptionen
            
        Returns:
            Gibt zurück, ob die Konvertierung erfolgreich war.
            
        Raises:
            ConversionError: Ein Fehler trat während der Konvertierung auf
        """
        try:
            # Konvertierungslogik implementieren
            return True
        except Exception as e:
            self.logger.error(f"Konvertierung fehlgeschlagen: {e}")
            raise ConversionError(f"Datenkonvertierung fehlgeschlagen: {e}") from e
```

### Commit-Nachrichten-Konventionen

Verwenden Sie die [Conventional Commits](https://www.conventionalcommits.org/)-Spezifikation:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Typ-Kennzeichnungen:**
- `feat`: neue Funktion
- `fix`: Fehlerbehebung
- `docs`: Dokumentations-Update
- `style`: Anpassung der Code-Formatierung
- `refactor`: Code-Refactoring
- `test`: Testfall
- `chore`: Änderungen am Build-Prozess oder an Hilfswerkzeugen

**Beispiel:**
```
feat(converter): add magnetic declination calculation

- Implement WMM-2025 model integration
- Add pygeomag dependency
- Improve calculation accuracy

Closes #123
```

## 🧪 Test-Leitfaden

### Teststruktur

```
tests/
├── unit/           # Unit-Tests
├── integration/    # Integrationstests
├── fixtures/       # Testdaten
└── conftest.py     # Testkonfiguration
```

### Tests schreiben

```python
import pytest
from pathlib import Path
from ifly_converter.converter import NavigationDataConverter


class TestNavigationDataConverter:
    """Testklasse für den Navigationsdaten-Konverter."""
    
    @pytest.fixture
    def converter(self):
        """Erstellt eine Konverter-Instanz für Testzwecke."""
        config = ConverterConfig(
            output_dir="test_output",
            coordinate_precision=8
        )
        return NavigationDataConverter(config)
    
    def test_convert_data_success(self, converter, tmp_path):
        """Testfall für erfolgreiche Datenkonvertierung."""
        source = tmp_path / "source.db3"
        target = tmp_path / "target"
        
        # Testdaten erstellen
        source.touch()
        
        # Konvertierung ausführen
        result = converter.convert_data(source, target)
        
        # Ergebnis überprüfen
        assert result is True
        assert target.exists()
    
    def test_convert_data_failure(self, converter):
        """Testfall für fehlgeschlagene Datenkonvertierung."""
        with pytest.raises(ConversionError):
            converter.convert_data(
                Path("nonexistent.db3"),
                Path("target")
            )
```

### Tests ausführen

```bash
# Alle Tests ausführen
pytest

# Bestimmte Testdatei ausführen
pytest tests/unit/test_converter.py

# Tests ausführen und Coverage-Report generieren
pytest --cov=ifly_converter --cov-report=html

# Performance-Tests ausführen
pytest tests/performance/ -m performance
```

## 📚 Dokumentationsbeiträge

### Dokumentationsstruktur

```
docs/
├── guide/          # Benutzerhandbuch
├── api/            # API-Dokumentation
├── examples/       # Beispielcode
└── deployment/     # Bereitstellungsleitfaden
```

### Dokumentationskonventionen

- **Markdown**-Format verwenden
- Code-Beispiele enthalten
- Mehrsprachige Unterstützung bieten
- Dokumentation aktuell halten

### Dokumentationsbeispiel

```markdown
## 🔧 Konfigurationsmanagement

### Grundlegende Konfiguration

Der Konverter verwaltet die Konfiguration über die Klasse `ConverterConfig`:

```python
from ifly_converter.config import ConverterConfig

# Standardkonfiguration erstellen
config = ConverterConfig()

# Benutzerdefinierte Konfiguration
config = ConverterConfig(
    output_dir="custom_output",
    coordinate_precision=6,
    enable_validation=True
)
```

### Konfigurationsoptionen

| Option | Typ | Standardwert | Beschreibung |
|------|------|--------|------|
| `output_dir` | str | "output" | Ausgabeverzeichnis |
| `coordinate_precision` | int | 8 | Koordinatengenauigkeit |
| `enable_validation` | bool | True | Validierung aktivieren |
```

## 🐛 Probleme melden

### Vorlage für Problemberichte

Bitte geben Sie beim Melden eines Problems die folgenden Informationen an:

```markdown
**Problembeschreibung**
Beschreiben Sie das aufgetretene Problem klar und prägnant.

**Schritte zur Reproduktion**
1. Erster Schritt '...'
2. Zweiter Schritt '...'
3. Dritter Schritt '...'
4. Fehler sehen

**Erwartetes Verhalten**
Beschreiben Sie, was Sie erwartet haben.

**Tatsächliches Verhalten**
Beschreiben Sie, was tatsächlich passiert ist.

**Umgebungsinformationen**
- OS: [z.B. Windows 10]
- Python Version: [z.B. 3.9.0]
- Projektversion: [z.B. v2.0.0]

**Log-Informationen**
```
Fügen Sie relevante Log-Informationen ein
```

**Screenshot**
Fügen Sie, falls zutreffend, Screenshots hinzu, um das Problem zu erklären.

**Zusätzliche Informationen**
Fügen Sie alle weiteren relevanten Kontextinformationen hinzu.
```

### Problemklassifizierung

Verwenden Sie die folgenden Labels, um Probleme zu kategorisieren:

- 🐛 `bug` - Fehlerbericht
- ✨ `enhancement` - Funktionsanfrage
- 📚 `documentation` - dokumentationsbezogen
- ❓ `question` - Anwendungsfrage
- 🔥 `priority: high` - hohe Priorität
- 🧹 `good first issue` - gut für Einsteiger

## 📋 Funktionsanfragen

### Vorlage für Funktionsanfragen

```markdown
**Funktionsübersicht**
Beschreiben Sie kurz die Funktion, die Sie hinzufügen möchten.

**Gelöstes Problem**
Welches Problem löst diese Funktion?

**Detaillierte Beschreibung**
Beschreiben Sie detailliert, wie die Funktion funktioniert.

**In Betracht gezogene Alternativen**
Haben Sie andere Lösungen in Betracht gezogen?

**Zusätzliche Informationen**
Fügen Sie alle weiteren relevanten Informationen, Screenshots oder Beispiele hinzu.
```

## 🎯 Entwicklungs-Roadmap

### Kurzfristige Ziele (1-3 Monate)
- [ ] GUI-Oberflächenentwicklung
- [ ] Stapelverarbeitungsfunktion
- [ ] Verbesserung der Datenvalidierungstools
- [ ] Performance-Optimierung

### Mittelfristige Ziele (3-6 Monate)
- [ ] Multi-Format-Unterstützung
- [ ] Cloud-Verarbeitung
- [ ] REST-API-Schnittstelle
- [ ] Plugin-System

### Langfristige Ziele (6-12 Monate)
- [ ] Machine-Learning-Optimierung
- [ ] Echtzeit-Datenaktualisierungen
- [ ] Mobile Unterstützung
- [ ] Enterprise-Funktionen

## 🏆 Mitwirkende

Vielen Dank an alle Entwickler, die zu diesem Projekt beigetragen haben!

<!-- Die Liste der Mitwirkenden wird automatisch aktualisiert -->

## 📞 Kontakt

- 📧 **E-Mail**：project@example.com
- 💬 **Diskussionen**：GitHub Discussions
- 🐛 **Probleme**：GitHub Issues
- 🌐 **Offizielle Website**：https://ifly-converter.org

---

Nochmals vielen Dank für Ihre Beiträge! Lassen Sie uns gemeinsam einen besseren iFly Navigationsdaten-Konverter entwickeln! 🚀
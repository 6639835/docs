# 🛫 iFly Navigationsdaten-Konverter Benutzerhandbuch

Der iFly Navigationsdaten-Konverter ist ein professionelles Tool zur Konvertierung von Luftfahrt-Navigationsdaten, das speziell entwickelt wurde, um die Fenix A320 Navigationsdatenbank in das iFly 737 MAX 8 Navigationsdatenbank-Format zu konvertieren. Dieses Tool verfügt über eine moderne CLI-Oberfläche und hochpräzise Datenverarbeitungsfähigkeiten.

## 📖 Schnellübersicht

### 🎯 Kernfunktionen
- **🎨 Moderne Oberfläche** - Farbiges Terminal-Interface basierend auf der Rich-Bibliothek, mit Echtzeit-Fortschrittsanzeige
- **🧭 Hochpräzise magnetische Deklination** - Lokale Berechnung unter Verwendung des WMM-2025 geomagnetischen Modells von pygeomag
- **📅 Intelligentes AIRAC-Management** - Dynamische Berechnung und Verwaltung von Luftfahrtinformations-Revisionszyklen
- **⚡ Leistungsoptimierung** - Parallele Verarbeitung und Speicheroptimierung, Unterstützung großer Datendateien
- **🛡️ Enterprise-Qualität** - Umfassende Typ-Hinweise, Fehlerbehandlung und Testabdeckung

### ✈️ Unterstützte Flugzeugmodelle
- **iFly 737 MAX 8** - Hochsimulations-Boeing 737 MAX 8 im Microsoft Flight Simulator
- **Datenquelle** - Fenix A320 Navigationsdatenbank (nd.db3)
- **Wegstreckendaten** - NAIP RTE_SEG.csv Flugwegsegmentdaten der chinesischen Zivilluftfahrt

### 📊 Abgedeckte Datentypen
- **🛣️ Wegstreckendaten** - Hoch-/Tiefflugrouten, Wegpunktkoordinaten, magnetische Deklination
- **🏢 Terminalverfahren** - SID, STAR, Anflugverfahren, Abflugverfahren
- **🧭 Navigationshilfen** - VOR/DME-, NDB-, ILS-Daten
- **📅 AIRAC-Zyklus** - Automatische Berechnung und Verwaltung der Datenvalidität

## 🚀 Schnellstart

### 1️⃣ Systemanforderungen prüfen
```bash
# Python-Version prüfen (3.8+ erforderlich)
python --version

# Verfügbaren Arbeitsspeicher prüfen (4GB+ empfohlen)
# Windows: Task-Manager → Leistung → Arbeitsspeicher
# macOS: Aktivitätsanzeige → Speicher
# Linux: free -h
```

### 2️⃣ Notwendige Dateien vorbereiten
- ✅ **Fenix Navigationsdatenbank** (`nd.db3`)
  ```
  %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **NAIP Wegstreckendaten** (`RTE_SEG.csv`)
  - Von der chinesischen Zivilluftfahrt-Datenwebsite beziehen
  - Sicherstellen, dass die Dateikodierung UTF-8 ist
- ✅ **iFly 737 MAX 8** im MSFS installiert

### 3️⃣ Schnelle Installation und Ausführung
```bash
# 1. Abhängigkeitspakete installieren
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 2. Konverter ausführen
python main.py

# 3. Den Anweisungen auf dem Bildschirm folgen
# → Fenix-Datenbankdatei auswählen
# → NAIP-CSV-Datei auswählen
# → ID-Bereich für Terminalverfahren festlegen
# → Auf Abschluss der Konvertierung warten
```

## 📚 Dokumentations-Navigation

### 🚀 Grundlegende Nutzung
1.  **[Installationsanleitung](installation.md)** - Detaillierte Umgebungs- und Abhängigkeitsinstallation
    - Python-Umgebungskonfiguration
    - Installation von Abhängigkeitspaketen
    - Überprüfung der Systemanforderungen
    - Lösung häufiger Installationsprobleme

2.  **[Konfigurationsbeschreibung](configuration.md)** - Detaillierte Konfigurationsdateien und Parameter
    - Konverter-Konfigurationsoptionen
    - Anleitung zur Pfadeinstellung
    - AIRAC-Zyklus-Konfiguration
    - Parameter zur Leistungsoptimierung

3.  **[Nutzungsanleitung](usage.md)** - Vollständiger Betriebsablauf und Beispiele
    - Interaktive Bedienungsanleitung
    - Methoden zur Stapelverarbeitung
    - Datenvalidierungsschritte
    - Beschreibung der Ausgabedateien

### 🆘 Hilfe & Support
- **[Häufig gestellte Fragen (FAQ)](../faq.md)** - Antworten auf die wichtigsten Benutzerfragen
- **[Fehlerbehebung](../troubleshooting.md)** - Problemdiagnose und -lösungen

### 🔧 Erweiterte Inhalte
- **[Technische Architektur](../architecture.md)** - Systemdesign und Funktionsweise
- **[Beitragsrichtlinien](../contributing.md)** - Entwicklungsbeteiligung und Codestandards
- **[Änderungsprotokoll](../changelog.md)** - Versionshistorie und neue Funktionen
- **[Lizenzinformationen](../license.md)** - Nutzungsbedingungen und rechtliche Hinweise

## 🎨 Oberflächenvorschau

### Willkommensbildschirm
```
╔═════════════════════════════════════════════ 🛩️  Tool zur Konvertierung von Luftfahrt-Navigationsdaten  ✈️ ══════════════════════════════════════════╗
║                                                                                                                    ║
║                               Fenix zu iFly Luftfahrt-Navigationsdaten-Konverter                                 ║
║                               Eine hochwertige, moderne Konvertierungserfahrung                                 ║
║                                                                                                                    ║
╚═══════════════════════════════════════════ Powered by Rich • Version 2.0 ═══════════════════════════════════════════╝
```

### Fortschrittsanzeige
```
╭─────────────────────────────────────── 🔄 Flugwegdaten werden verarbeitet ───────────────────────────────────────╮
│                                  Magnetische Deklination wird berechnet...                                   │
│ ████████████████████████████████████████ 1,247/1,500 (83%) 0:02:15                                        │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Zusammenfassung Abschluss
```
┌──────────────────────────────────── ✅ Konvertierung abgeschlossen ────────────────────────────────────┐
│                                                                                                    │
│                           🛣️  Wegstreckendaten: 1.500 Wegpunkte verarbeitet                           │
│                           🏢  Terminalverfahren: 245 Verfahren konvertiert                            │
│                            📅  AIRAC-Zyklus: 2508 (Gültig bis 2025-02-27)                             │
│              📁  Ausgabeort: Community\ifly-aircraft-737max8\Data\navdata\              │
│                                                                                                    │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## ⚠️ Wichtige Hinweise

### Datenkonformität
Dieses Tool ist ausschließlich für Simulationszwecke bestimmt. Bitte stellen Sie sicher, dass Ihre Nutzung den relevanten Gesetzen und Vorschriften entspricht:
- **🎯 Nur für Simulation** - Strikt verboten für die reale Luftfahrtnavigation
- **📋 Einhaltung der Vereinbarungen** - Bestätigen Sie die Rechtmäßigkeit der Datenquelle
- **🔒 Nicht-kommerzielle Nutzung** - Ausschließlich für persönliches Lernen und Unterhaltung

### Technische Anforderungen
- **🐍 Python 3.8+** - Es wird Python 3.9 oder höher empfohlen
- **💾 Arbeitsspeicheranforderungen** - Mindestens 4 GB RAM (8 GB empfohlen)
- **💿 Speicherplatz** - Mindestens 500 MB freier Speicherplatz
- **🖥️ Betriebssysteme** - Windows 10/11, macOS 10.15+, Linux

### Datensicherheit
- **💾 Originaldaten sichern** - Bitte sichern Sie die originalen iFly Navigationsdaten vor der Konvertierung
- **🔍 Ergebnisse überprüfen** - Überprüfen Sie die Datenkorrektheit nach der Konvertierung im Simulator
- **📅 Regelmäßige Updates** - Es wird empfohlen, die AIRAC-Daten alle 28 Tage zu aktualisieren
- **🔒 Berechtigungsverwaltung** - Stellen Sie sicher, dass das Programm über ausreichende Schreibrechte verfügt

## 🎯 Anwendungsfälle

### 🎓 Flugsimulations-Enthusiasten
- **✈️ Verbessertes Erlebnis** - Erhalten Sie genauere Navigationsdaten für den chinesischen Luftraum
- **🎮 Realistischer Flug** - Erleben Sie Flugverfahren basierend auf realen Flugrouten
- **📚 Lernwerkzeug** - Verstehen Sie moderne Luftfahrt-Navigationssysteme

### 👨‍🏫 Luftfahrtausbildung
- **🎓 Schulungszwecke** - Bereitstellung präziser Navigationsdaten für Lehrzwecke
- **📊 Standardisierung** - Entspricht den Standards der Internationalen Zivilluftfahrtorganisation (ICAO)
- **🔄 Echtzeit-Updates** - Basierend auf den neuesten AIRAC-Zyklusdaten

### 👨‍💻 Entwickler
- **🔧 API-Referenz** - Klare Codestruktur und Dokumentation
- **🧩 Modularität** - Leicht erweiterbares und anpassbares Design
- **🧪 Umfassende Tests** - Vollständige Testabdeckung und Qualitätssicherung

## 🆘 Hilfe erhalten

Sollten Sie während der Nutzung Probleme haben:

1.  **📚 Dokumentation einsehen** - Lesen Sie zuerst die detaillierten Anweisungen in den relevanten Abschnitten
2.  **🔍 Protokolle prüfen** - Überprüfen Sie die generierte Datei `converter.log`
3.  **🧪 Umgebung verifizieren** - Nutzen Sie das integrierte Verifizierungstool, um die Systemkonfiguration zu prüfen
4.  **💬 Community-Support** - Melden Sie Probleme oder beteiligen Sie sich an Diskussionen in GitHub Issues

### Schnelle Diagnosebefehle
```bash
# Python-Umgebung prüfen
python --version
python -c "import rich, pandas, pygeomag; print('Alle Abhängigkeiten sind installiert')"

# Dateiberechtigungen verifizieren
ls -la /path/to/ifly/navdata/

# Neueste Protokolle anzeigen
tail -n 50 converter.log
```

---

**Nächster Schritt**: Gehen Sie zur [Installationsanleitung](installation.md), um Ihre Entwicklungsumgebung einzurichten, oder sehen Sie sich direkt die [Nutzungsanleitung](usage.md) für einen schnellen Start an! 🚀
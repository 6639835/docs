# 🚁 TFDI Navigationsdaten-Konverter – Benutzerhandbuch

Der TFDI Navigationsdaten-Konverter ist ein professionelles Tool zur Konvertierung von Luftfahrt-Navigationsdaten, das speziell entwickelt wurde, um Fenix A320 Navigationsdatenbanken in ein TFDI MD-11-kompatibles JSON-Format zu konvertieren. Das Tool verfügt über eine moderne CLI-Benutzeroberfläche und effiziente Datenverarbeitungsfähigkeiten.

## 📖 Kurzübersicht

### 🎯 Kernfunktionen
- **🎨 Rich CLI-Benutzeroberfläche** - Moderne, farbige Terminal-Oberfläche mit Echtzeit-Fortschrittsanzeige und Status-Feedback
- **🔄 Vollständige Datenkonvertierung** - Umfassende Konvertierung aller Fenix-Datenbanktabellen
- **📊 Intelligente Datenverarbeitung** - Koordinaten-Standardisierung, Spaltennamen-Standardisierung und Datenintegritätsprüfung
- **🔍 FAF-Punkt-Erkennung** - Intelligente Erkennung von Final Approach Fix (FAF)-Punkten zur Optimierung von Anflugverfahren
- **📦 JSON-Ausgabe** - Erzeugung TFDI-kompatibler Standard-JSON-Formatdateien
- **🗜️ Automatische Komprimierung** - Erstellung eines leicht verteilbaren 7z-Archivs

### ✈️ Unterstützte Flugzeugmodelle
- **TFDI MD-11** - Hochsimuliertes McDonnell Douglas MD-11 in Microsoft Flight Simulator
- **Datenquelle** - Fenix A320 Navigationsdatenbank (nd.db3)
- **Formatunterstützung** - SQLite-Datenbank zu JSON-Format

### 📊 Datenabdeckung
- **🏢 Flughafendaten** - Flughafeninformationen, Landebahndaten, Kommunikationsfrequenzen
- **🧭 Navigationsanlagen** - VOR/DME-, NDB-, ILS-Anlagendaten
- **🛣️ Flugstraßennetzwerk** - Flugstraßen-Definitionen, Flugstraßenabschnitte, Wegpunktkoordinaten
- **🎯 Terminalverfahren** - SID, STAR, Anflugverfahren, Abflugverfahren
- **🔗 Lookup-Tabellen** - Indizes und Verknüpfungstabellen für verschiedene Datentypen

## 🚀 Schnellstart

### 1️⃣ Systemanforderungen überprüfen
```bash
# Python-Version prüfen (3.8+ erforderlich)
python --version

# Verfügbaren Arbeitsspeicher überprüfen (4GB+ empfohlen)
python -c "import psutil; print(f'Verfügbarer Arbeitsspeicher: {psutil.virtual_memory().available//1024**3} GB')"

# Festplattenspeicher prüfen (mindestens 1GB erforderlich)
python -c "import shutil; print(f'Verfügbarer Speicherplatz: {shutil.disk_usage(\".\")[2]//1024**3} GB')"
```

### 2️⃣ Erforderliche Dateien vorbereiten
- ✅ **Fenix Navigationsdatenbank** (`nd.db3`)
  ```
  Typischer Speicherort: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **TFDI MD-11** in MSFS installiert
- ✅ **Konverter-Quellcode** lokal heruntergeladen

### 3️⃣ Konvertierung mit einem Klick starten
```bash
# 1. Abhängigkeiten installieren
pip install rich pandas py7zr

# 2. Konverter ausführen
python Fenix2TFDINavDataConverter.py

# 3. Den Anweisungen auf dem Bildschirm folgen
# → Fenix-Datenbankpfad eingeben
# → Start-ID für Terminalverfahren festlegen
# → Auf Abschluss der Konvertierung warten
```

## 📚 Dokumentationsnavigation

### 🚀 Grundlagen der Nutzung
1. **[Installationsanleitung](installation.md)** - Detaillierte Umgebungs- und Abhängigkeitsinstallation
   - Python-Umgebung einrichten
   - Abhängigkeitspakete installieren
   - Systemkompatibilitätsprüfung
   - Lösung häufiger Installationsprobleme

2. **[Konfigurationsbeschreibung](configuration.md)** - Detaillierte Beschreibung der Konverter-Konfigurationsoptionen
   - ConverterConfig-Parameter
   - Datenbankverbindungseinstellungen
   - Ausgabeformatkonfiguration
   - Leistungsoptimierungsparameter

3. **[Nutzungsanleitung](usage.md)** - Vollständiger Betriebsablauf und Beispiele
   - Interaktiver Konvertierungsprozess
   - Programmatischer Aufruf
   - Batch-Verarbeitungsmethoden
   - Schritte zur Ergebnisverifizierung

### 🆘 Hilfe und Support
- **[Häufig gestellte Fragen](../faq.md)** - Häufige Benutzerfragen und Antworten
- **[Fehlerbehebung](../troubleshooting.md)** - Problembehandlung und Lösungen

### 🔧 Erweiterte Themen
- **[Technische Architektur](../architecture.md)** - Systemdesign und Funktionsweise
- **[Beitragsrichtlinien](../contributing.md)** - Entwicklerbeteiligung und Code-Standards
- **[Änderungsprotokoll](../changelog.md)** - Versionshistorie und neue Funktionen
- **[Lizenzinformationen](../license.md)** - Nutzungsbedingungen und rechtliche Hinweise

## 🎨 Benutzeroberflächen-Vorschau

### Startbildschirm
```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 Umgebungsprüfung...
✅ Python 3.9.16
✅ Abhängigkeitspakete vollständig
✅ Arbeitsspeicher ausreichend
✅ Festplattenspeicher ausreichend
```

### Konvertierungsfortschritt
```
╭─────────────────────────────────────────── 📊 Standarddatentabellen exportieren ───────────────────────────────────────────╮
│                                                                                                         │
│ Tabellendaten werden exportiert...                                                                      │
│                                                                                                         │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                                       │
│                                                                                                         │
│ Aktuelle Verarbeitung: Terminals-Tabelle → Terminalverfahrensdaten konvertieren                        │
│ Abgeschlossen: Airports, Runways, Waypoints, Navaids, Airways, AirwayLegs, ILSes                      │
│                                                                                                         │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Abschlussübersicht
```
╔══════════════════════════════════════════════════════════════╗
║                          Konvertierung erfolgreich           ║
║                                                              ║
║  ✓ Datenkonvertierung erfolgreich abgeschlossen!             ║
║                                                              ║
║  📊 Verarbeitungsstatistik:                                  ║
║  • Exportierte Tabellen: 11                                  ║
║  • Verarbeitete Datensätze: 156.789                          ║
║  • Terminalverfahren: 8.945                                  ║
║  • Wegpunkte: 45.234                                         ║
║                                                              ║
║  📁 Ausgabedatei: Primary.7z (15.6 MB)                      ║
║  🕒 Gesamtzeit: 4 Minuten 23 Sekunden                        ║
║                                                              ║
║  Diese Datei kann im TFDI MD-11 für die Navigation verwendet werden. │
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## ⚠️ Wichtige Hinweise

### Datennutzungsrichtlinien
Dieses Tool ist nur für Simulationsflugzwecke bestimmt. Bitte stellen Sie sicher, dass Ihre Nutzung den entsprechenden Vorschriften entspricht:
- **🎯 Nur für Simulation** - Strikt verboten für die reale Luftfahrtnavigation
- **📋 Vereinbarungen einhalten** - Bestätigen Sie die Nutzungsbedingungen von Fenix und TFDI für Daten
- **🔒 Nicht-kommerzielle Nutzung** - Persönliches Lernen und Unterhaltung

### Technische Anforderungen
- **🐍 Python 3.8+** - Es wird Python 3.9 oder höher empfohlen
- **💾 Arbeitsspeicheranforderungen** - Mindestens 4GB RAM (8GB empfohlen)
- **💿 Speicherplatz** - Mindestens 1GB verfügbarer Speicherplatz
- **🖥️ Betriebssystem** - Windows 10/11, macOS 10.15+, Linux

### Datensicherheit
- **💾 Daten sichern** - Bitte sichern Sie wichtige Daten vor der Konvertierung
- **🔍 Ergebnisse überprüfen** - Datenintegrität nach der Konvertierung überprüfen
- **📅 Versionsverwaltung** - Verwenden Sie stabile Versionen für wichtige Konvertierungen
- **🔒 Dateiberechtigungen** - Stellen Sie sicher, dass ausreichende Lese- und Schreibberechtigungen vorhanden sind

## 🎯 Anwendungsbereiche

### 🎮 Flugsimulations-Enthusiasten
- **✈️ Erfahrung verbessern** - Verwenden Sie hochwertige Navigationsdaten im TFDI MD-11
- **🌍 Globale Abdeckung** - Erhalten Sie globale Flughafen- und Flugstraßeninformationen
- **📊 Reale Daten** - Genaue Informationen basierend auf professionellen Luftfahrt-Datenbanken

### 👨‍🏫 Luftfahrtbildung
- **🎓 Schulungszwecke** - Bereitstellung standardisierter Daten für die Luftfahrtbildung
- **📚 Lernwerkzeug** - Verständnis moderner Luftfahrt-Navigationssysteme
- **🔄 Datenaktualisierung** - Regelmäßige Updates zur Gewährleistung der Datenaktualität

### 👨‍💻 Entwickler
- **🔧 Datenverarbeitung** - Erlernen von Luftfahrt-Datenkonvertierungstechniken
- **📝 Formatforschung** - Verständnis verschiedener Navigationsdatenformate
- **🧩 Systemintegration** - Integration des Konverters in andere Systeme

## 📊 Beschreibung der Datenausgabe

### JSON-Dateistruktur
Nach Abschluss der Konvertierung werden die folgenden JSON-Dateien generiert:

```
Primary.7z Inhalt:
├── 📄 AirportLookup.json      # Flughafen-Lookup-Index (~500KB)
├── 📄 Airports.json           # Grundlegende Flughafeninformationen (~2MB)
├── 📄 AirwayLegs.json        # Detaillierte Flugstraßenabschnittsdaten (~3MB)
├── 📄 Airways.json           # Flugstraßen-Definitionen (~800KB)
├── 📄 Ilses.json             # ILS-Anflugdaten (~1.5MB)
├── 📄 NavaidLookup.json      # Navigationsanlagen-Lookup-Index (~300KB)
├── 📄 Navaids.json           # Navigationsanlagendaten (~1.2MB)
├── 📄 Runways.json           # Landebahninformationen (~2.5MB)
├── 📄 Terminals.json         # Terminalverfahrens-Definitionen (~800KB)
├── 📄 WaypointLookup.json    # Wegpunkt-Lookup-Index (~1MB)
├── 📄 Waypoints.json         # Wegpunktdaten (~4MB)
└── 📁 ProcedureLegs/         # Verzeichnis der Verfahrensabschnitte
    ├── TermID_1.json         # Terminalverfahrensabschnitt
    ├── TermID_2.json
    └── ...
```

### Datenformatbeispiel
```json
// Beispiel Airports.json
{
  "ZBAA": {
    "AirportID": "ZBAA",
    "AirportName": "Beijing Capital International Airport",
    "Latitude": 40.080111,
    "Longitude": 116.584556,
    "Elevation": 116,
    "MagneticVariation": -6.2
  }
}

// Beispiel Waypoints.json
{
  "ELMAG": {
    "WaypointID": "ELMAG",
    "Latitude": 39.832222,
    "Longitude": 116.298611,
    "Type": "DESIGNATED_POINT"
  }
}
```

## 🔄 Updates und Wartung

### Häufigkeit der Datenaktualisierung
- **Regelmäßige Updates**: Empfohlen wird eine Aktualisierung alle 28 Tage (AIRAC-Zyklus)
- **Versionsverfolgung**: Beachten Sie die Versionsaktualisierungen von Fenix und TFDI
- **Kompatibilitätsprüfung**: Überprüfen Sie die Versionskompatibilität vor dem Update

### Konverter-Updates
- **GitHub Releases**: Beachten Sie die Projekt-Release-Seite
- **Automatische Überprüfung**: Überprüfen Sie regelmäßig auf Konverter-Versionsaktualisierungen
- **Funktionsverbesserungen**: Beteiligen Sie sich am Community-Feedback und an Funktionsvorschlägen

## 🆘 Hilfe erhalten

Wenn Sie während der Nutzung auf Probleme stoßen:

1. **📚 Dokumentation konsultieren** - Lesen Sie zuerst die detaillierten Anweisungen in den entsprechenden Abschnitten
2. **🔍 Protokolle überprüfen** - Überprüfen Sie die generierten Protokolldateien für Fehlerdetails
3. **🧪 Diagnose ausführen** - Verwenden Sie die integrierten Diagnosetools, um den Systemstatus zu überprüfen
4. **💬 Community-Support** - Melden Sie Probleme in GitHub Issues

### Schnelle Diagnosebefehle
```bash
# Konverter-Version überprüfen
python Fenix2TFDINavDataConverter.py --version

# Umgebung überprüfen
python -c "import rich, pandas, py7zr; print('Umgebung ist normal')"

# Datenbankverbindung testen
python -c "import sqlite3; sqlite3.connect('nd.db3').close(); print('Datenbank ist zugänglich')"
```

### Leistungsüberwachung
```python
# Monitor system resources
import psutil
print(f"CPU: {psutil.cpu_percent()}%")
print(f"Arbeitsspeicher: {psutil.virtual_memory().percent}%")
print(f"Festplatte: {psutil.disk_usage('.').percent}%")
```

---

**Nächster Schritt**: Gehen Sie zur [Installationsanleitung](installation.md), um Ihre Umgebung einzurichten, oder sehen Sie sich direkt die [Nutzungsanleitung](usage.md) an, um schnell mit dem Konvertierungsprozess zu beginnen! 🚁✨
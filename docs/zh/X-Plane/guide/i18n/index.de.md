# Nav-data Benutzerhandbuch

Willkommen bei **Nav-data** - dem professionellen Tool zur Umwandlung von Luftfahrtnavigationsdaten!

## 🛩️ Projektübersicht

Nav-data ist ein Open-Source-Tool zur Verarbeitung und Konvertierung von Luftfahrtnavigationsdaten, speziell für den X-Plane Flugsimulator entwickelt. Es ist in der Lage, NAIP-Daten (National Aeronautical Information Publication) der chinesischen Zivilluftfahrt in ein von X-Plane erkennbares Standardformat umzuwandeln, und bietet Flugsimulator-Enthusiasten sowie Luftfahrtprofis genaue und vollständige Navigationsdaten für den chinesischen Luftraum.

## ✨ Kernfunktionen

### 🛣️ Flugwegdatenverarbeitung
- **CSV zu DAT Konvertierung**: Konvertiert Flugwegdaten im CSV-Format in das X-Plane DAT-Format
- **Gebietsfilterung**: Intelligente Filterung von Daten des chinesischen Luftraums (unterstützt Gebietskennungen wie ZB, ZG, ZY, ZS, ZW, ZJ, ZP, ZL, ZH, ZU)
- **Unterstützung von Navigationspunkttypen**:
  - DESIGNATED_POINT (Bestimmter Punkt) – Typcode 11
  - VOR/DME – Typcode 3
  - NDB – Typcode 2
- **AIRAC-Zyklus-Management**: Automatische Berechnung und Verwaltung des Gültigkeitszeitraums von AIRAC-Daten

### 📄 PDF-Datenextraktion
- **Terminalverfahren-Verarbeitung**: Extrahiert und standardisiert Luftfahrtverfahrensdaten aus PDF-Dateien
- **Wegpunktkoordinaten-Extraktion**: Automatische Extraktion geografischer Koordinateninformationen von Wegpunkten
- **Multi-Format-Unterstützung**: Unterstützt die Verarbeitung von PDF-Quelldateien in verschiedenen Formaten
- **Datenvalidierung**: Integrierte Prüfung der Datenintegrität und -genauigkeit

### 🔧 Datenreparatur und Kodierung
- **Formatstandardisierung**: Repariert und standardisiert das X-Plane CIFP-Datenformat
- **Kodierungsreparatur**: Automatische Reparatur von Kodierungsproblemen bei Anflugverfahren, SIDs und STARs
- **Qualitätssicherung**: Mehrfache Validierung stellt sicher, dass die Ausgabedaten den X-Plane-Standards entsprechen

## 🎯 Zielgruppe

### Flugsimulator-Enthusiasten
- Erhalten hochwertige Navigationsdaten für den chinesischen Luftraum
- Genießen ein realistischeres Flugerlebnis
- Unterstützen alle Flugzeuge, die X-Plane-Standarddaten verwenden

### Luftfahrtprofis
- Präzise Navigationsdaten für Trainings- und Lehrzwecke
- Entsprechen den Standards der Internationalen Zivilluftfahrtorganisation (ICAO)
- Basierend auf maßgeblichen NAIP-Datenquellen

### Entwickler
- Klare Code-Struktur und API-Dokumentation
- Modularer Aufbau für einfache Erweiterbarkeit
- Umfassende Fehlerbehandlung und Protokollierungssystem

## 📊 Unterstützung von Datenstandards

### Internationale Standards
- **ICAO-Standards**: Entsprechen den Navigationsdatenstandards der Internationalen Zivilluftfahrtorganisation
- **ARINC 424**: Folgen dem ARINC 424 Navigationsdatenbankstandard
- **AIRAC-Zyklus**: Unterstützt den Standard-AIRAC-Aktualisierungszyklus von 28 Tagen

### X-Plane-Formate
- **CIFP-Daten**: Vollständige Unterstützung des X-Plane CIFP-Formats (Coded Instrument Flight Procedures)
- **DAT-Dateien**: Standard-X-Plane DAT-Formatausgabe
- **Kompatibilität**: Unterstützt X-Plane 11 und X-Plane 12

## 🚀 Schnellstart

### 1. Umgebungsvorbereitung
Stellen Sie sicher, dass auf Ihrem System Python 3.6+ und die erforderlichen Abhängigkeitspakete installiert sind.

### 2. Datenvorbereitung
Bereiten Sie Ihre Quelldateien vor (Flugwegdaten im CSV-Format oder Verfahrensdateien im PDF-Format).

### 3. Konfigurationseinstellungen
Konfigurieren Sie Dateipfade und Verarbeitungsparameter entsprechend Ihren Anforderungen.

### 4. Datenkonvertierung
Führen Sie das entsprechende Konvertierungsskript aus, um die Datenverarbeitung zu starten.

## 📚 Dokumentationsnavigation

### Grundlegende Verwendung
- [Installationsanleitung](./installation.md) - Detaillierte Installations- und Umgebungskonfigurationsanweisungen
- [Konfigurationsbeschreibung](./configuration.md) - Detaillierte Erläuterung der Konfigurationsdateien und Parameter
- [Nutzungsanleitung](./usage.md) - Vollständige Bedienungsabläufe und Beispiele

### Technische Details
- [Architekturbeschreibung](../architecture.md) - Systemarchitektur und technische Prinzipien
- [Beitragsrichtlinien](../contributing.md) - Richtlinien zur Teilnahme an der Projektentwicklung
- [Änderungsprotokoll](../changelog.md) - Aufzeichnungen über Versionsaktualisierungen und Verbesserungen

## ⚠️ Wichtige Hinweise

### Datengenauigkeit
- Dieses Tool basiert auf der Konvertierung von öffentlich zugänglichen NAIP-Daten
- Es wird empfohlen, kritische Navigationsdaten vor dem tatsächlichen Flug zu überprüfen
- Aktualisieren Sie die Daten regelmäßig, um den AIRAC-Zyklus synchron zu halten

### Nutzungsbeschränkungen
- Nur für Flugsimulations- und Lehrzwecke
- Nicht für die tatsächliche Luftfahrtnavigation zu verwenden
- Beachten Sie relevante Gesetze, Vorschriften und Datenutzungsvereinbarungen

### Technischer Support
- Siehe [FAQ Häufig gestellte Fragen](./usage.md#faq)
- Reichen Sie [GitHub Issues](https://github.com/your-repo/nav-data/issues) ein
- Beteiligen Sie sich an der Community-Diskussion

---

**Starten Sie jetzt Ihre Reise der Navigationsdatenkonvertierung!** 📈
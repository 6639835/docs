# 🛫 Nav-data Benutzerhandbuch

Nav-data ist eine professionelle Suite von Konvertierungstools für Luftnavigationsdaten, die speziell entwickelt wurde, um hochwertige Navigationsdatenunterstützung für PMDG-Flugzeuge im Microsoft Flight Simulator bereitzustellen. Dieses Tool konvertiert verschiedene Standard-Luftfahrtdatenformate in das PMDG-kompatible SQLite-Datenbankformat.

## 📖 Kurzübersicht

### 🎯 Kernfunktionen
- **Integration mehrerer Datenquellen** – Unterstützt Standardformate wie AIRAC, ARINC 424, X-Plane
- **Professionelle Datenkonvertierung** – Präzise Koordinatensystem-Transformation und magnetische Deklinationsberechnung
- **Qualitätssicherung** – Integrierte Datenvalidierung und Integritätsprüfung
- **Optimierung für die Region China** – Speziell optimiert für chinesische Zivilluftfahrtdaten

### ✈️ Unterstützte Flugzeugmodelle
- **PMDG 737 Serie**: 737-600, 737-700, 737-800, 737-900
- **PMDG 777 Serie**: 777-300ER, 777F

### 📊 Abgedeckte Datentypen
- **Flughafendaten** – ICAO-Code, Start- und Landebahnen, magnetische Deklination
- **Navigationshilfen** – VOR/DME, NDB, ILS/GS
- **Streckennetz** – Obere/untere Flugrouten, Wegpunkte
- **Flugverfahren** – SID, STAR, Anflugverfahren

## 📚 Dokumentennavigation

### 🚀 Erste Schritte
1. [Installationsanleitung](installation.md) – Umgebungskonfiguration und Abhängigkeitsinstallation
2. [Konfigurationsanleitung](configuration.md) – Datenquellenkonfiguration und Pfadeinstellungen
3. [Bedienungsanleitung](usage.md) – Konvertierungsprozess und Bedienschritte

### 🆘 Hilfe und Support
- [Häufig gestellte Fragen](../faq.md) – Antworten auf die wichtigsten Fragen der Benutzer
- [Fehlerbehebung](../troubleshooting.md) – Problemdiagnose und Lösungen

### 🔧 Erweiterte Inhalte
- [Technische Architektur](../architecture.md) – Systemdesign und Funktionsweise
- [Beitragsleitfaden](../contributing.md) – Entwicklerbeteiligung und Codestandards
- [Änderungsprotokoll](../changelog.md) – Versionshistorie und neue Funktionen
- [Lizenzinformationen](../license.md) – Nutzungsbedingungen und rechtliche Hinweise

## ⚠️ Wichtige Hinweise

### Datenkonformität
Dieses Tool ist ausschließlich für Simulationszwecke bestimmt. Bitte stellen Sie sicher, dass Ihre Datenquellen den entsprechenden Gesetzen und Vorschriften entsprechen:
- Einhaltung der Standards der Internationalen Zivilluftfahrtorganisation (ICAO)
- Überprüfung der Rechtmäßigkeit der Datenquelle
- Ausschließlich für nicht-kommerzielle Flugsimulationen verwenden

### Technische Anforderungen
- **Python 3.8+** – Es wird Python 3.9 oder höher empfohlen
- **Speicheranforderungen** – Mindestens 4 GB RAM (8 GB empfohlen)
- **Speicherplatz** – Mindestens 2 GB freier Speicherplatz
- **Betriebssystem** – Windows 10/11, macOS 10.15+, Linux

### Datenaktualisierungsfrequenz
- **AIRAC-Zyklus** – Es wird empfohlen, alle 28 Tage zu aktualisieren
- **Quelldaten** – Stellen Sie sicher, dass die neuesten gültigen AIRAC-Zyklusdaten verwendet werden
- **Versionskompatibilität** – Überprüfung der Kompatibilität mit der PMDG-Flugzeugversion

## 🆘 Hilfe erhalten

Falls während der Nutzung Probleme auftreten:

1. **Dokumentation konsultieren** – Zuerst die detaillierten Anweisungen in den entsprechenden Abschnitten prüfen
2. **Protokolle überprüfen** – Die generierten Protokolldateien auf spezifische Fehler überprüfen
3. **Daten validieren** – Die Datenintegrität mit dem integrierten Validierungstool überprüfen
4. **Community-Support** – Probleme in GitHub Issues melden

---

**Nächster Schritt**: Gehen Sie zur [Installationsanleitung](installation.md), um Ihre Entwicklungsumgebung einzurichten.
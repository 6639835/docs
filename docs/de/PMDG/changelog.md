# 📝 Changelog

Alle wichtigen Änderungen an Nav-data sind in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
und das Projekt folgt [Semantic Versioning](https://semver.org/lang/zh-CN/).

## [Unveröffentlicht] - Bald verfügbar

### 🚀 Neu
- Neuer visueller Datenvalidierungsbericht
- Unterstützung für optimierte Multithread-Datenbank-Schreibvorgänge
- Überwachung des Datenverarbeitungsfortschritts hinzugefügt

### 🔧 Verbesserungen
- Optimierte Speichernutzung, Unterstützung größerer Datensätze
- Verbesserte Lesbarkeit von Fehlermeldungen
- Verbesserte Konfigurationsdateivalidierung

### 🐛 Behobene Fehler
- Problem bei der Verarbeitung von Sonderzeichen in Flughafennamen behoben
- Datenkonflikte bei der gleichzeitigen Verarbeitung gelöst

---

## [2.1.0] - 2024-12-24

### 🚀 Neue Funktionen
- **Intelligenter Flugrouten-Zusammenführungsalgorithmus** - Implementiert eine erweiterte Logik zur Zusammenführung von Flugrouten-Daten, unterstützt die automatische Erkennung gemeinsamer Wegpunkte und die intelligente Einfügung fehlender Flugabschnitte
- **Datenbank-Validierungstool** - `db_validator.py` hinzugefügt, bietet umfassende Datenbank-Integritätsprüfungen und Qualitätsberichte
- **Unterstützung für parallele Verarbeitung** - Multithread-Verarbeitung großer Datensätze, wodurch die Verarbeitungsgeschwindigkeit erheblich verbessert wird
- **Integration der magnetischen Deklinationsberechnung** - pygeomag-Bibliothek integriert, bietet präzise Berechnung der magnetischen Deklination
- **Fortschrittsüberwachung** - tqdm-Fortschrittsanzeige hinzugefügt, zeigt den Verarbeitungsfortschritt in Echtzeit an

### 🔧 Verbesserungen und Optimierungen
- **Optimierung der Speicherverwaltung** - Stapelverarbeitungsmechanismus implementiert, reduziert den Speicherverbrauch erheblich
- **Genauigkeit der Koordinatenkonvertierung** - Umwandlungsgenauigkeit von DMS in Dezimalgrade auf 8 Nachkommastellen erhöht
- **Verbesserte Fehlerbehandlung** - Detailliertere Fehlerprotokolle und Ausnahmenbehandlungsmechanismen
- **Verstärkte Datenvalidierung** - Koordinatenbereichsprüfung und ICAO-Code-Formatprüfung hinzugefügt
- **Code-Modularisierung** - Code-Struktur refaktoriert, Wartbarkeit verbessert

### 🐛 Fehlerbehebungen
- Problem mit der CSV-Dateikodierungserkennung behoben, Latin-1-Kodierung wird nun korrekt verarbeitet
- Datenbank-Integritätskonflikte durch doppelte Einträge gelöst
- Problem mit dem Verlust der Wegpunktkoordinatengenauigkeit behoben
- Speicherüberlaufprobleme bei der Verarbeitung großer Dateien gelöst
- Kompatibilitätsproblem mit Windows-Pfadtrennzeichen behoben

### 📚 Dokumentationsaktualisierungen
- Technische Dokumentation komplett neu geschrieben, enthält detaillierte Architekturbeschreibungen
- Umfassende Installations- und Konfigurationsanleitung hinzugefügt
- Neue Abschnitte für Fehlerbehebung und FAQ hinzugefügt
- API-Dokumentation und Code-Beispiele aktualisiert

### 🔒 Sicherheitsverbesserungen
- Eingabepfadvalidierung hinzugefügt, um Path Traversal-Angriffe zu verhindern
- SQL-Eingabebereinigungsmechanismus verstärkt
- Dateiberechtigungsprüfung verbessert

---

## [2.0.0] - 2024-11-15

### 🚀 Wichtige Updates
- **Komplett refaktorisierte Datenverarbeitungs-Engine** - Modularer Aufbau von Grund auf neu konzipiert
- **PMDG 777 Unterstützung** - Erweiterte Unterstützung für PMDG 777-300ER und 777F
- **Neue Datenbankarchitektur** - Optimierte Tabellenstruktur, bessere Leistung und Kompatibilität
- **Spezielle Datenunterstützung für die Region China** - Speziell optimiert für chinesische Zivilluftfahrtdaten

### 🔧 Technische Verbesserungen
- **Python 3.8+ Unterstützung** - Aktualisiert auf moderne Python-Versionen
- **Typannotationen** - Umfassende Hinzufügung von Typ-Hinweisen zur Verbesserung der Codequalität
- **Asynchrone Verarbeitung** - Einführung von asynchronen Datenverarbeitungsfähigkeiten
- **Konfigurationsmanagement** - Neues Konfigurationssystem, unterstützt YAML-Konfigurationsdateien

### 📊 Datenverarbeitungsverbesserungen
- **Integration mehrerer Datenquellen** - Unterstützt NAIP-, X-Plane-, CIFP-Datenquellen
- **Vereinheitlichung der Koordinatensysteme** - Standardisierte Koordinatenkonvertierung und -validierung
- **Datenqualitätsgarantie** - Vollständige Datenvalidierungs- und Bereinigungsprozesse

### 🛠️ Tool-Verbesserungen
- **Optimierung der Befehlszeilenschnittstelle** - Benutzerfreundlicheres CLI-Tool
- **Stapelverarbeitungsunterstützung** - Unterstützt die Stapelverarbeitung mehrerer Datendateien
- **Upgrade des Log-Systems** - Strukturierte Protokollierung, bessere Debugging-Unterstützung

### 💔 Breaking Changes
- **Mindestanforderung für Python-Version** - Benötigt Python 3.8 oder höher
- **Änderung des Konfigurationsdateiformats** - Neues YAML-Konfigurationsformat
- **API-Schnittstellen-Refactoring** - Schnittstellen einiger Funktionen und Klassen haben sich geändert
- **Abhängigkeitsaktualisierungen** - Mehrere Kern-Abhängigkeitspakete aktualisiert

### 🗑️ Entfernte Funktionen
- Unterstützung für Python 2.7 entfernt
- Unterstützung für veraltetes XML-Konfigurationsformat entfernt
- Experimentelle Netzwerk-Datenquellenfunktion entfernt

---

## [1.5.2] - 2024-10-10

### 🐛 Behobene Fehler
- Kompatibilitätsproblem mit AIRAC 2410-Daten behoben
- Datenbankpfadproblem der PMDG 737-900 gelöst
- Kodierungsproblem der Protokolldatei behoben

### 🔧 Verbesserungen
- Datenbank-Verbindungspool-Verwaltung optimiert
- Anzeige von Fehlermeldungen in Chinesisch verbessert
- Datenbank für Flughafennamen-Suche aktualisiert

---

## [1.5.1] - 2024-09-28

### 🐛 Behobene Fehler
- Pfaderkennung für MSFS Steam-Version behoben
- Genauigkeitsproblem bei der Start-/Landeausrichtungsberechnung gelöst
- CSV-Analysefehler durch Sonderzeichen behoben

### 📚 Dokumentation
- MSFS-Pfadbeschreibung in der Installationsanleitung aktualisiert
- Lösungen für häufig gestellte Fragen hinzugefügt

---

## [1.5.0] - 2024-09-15

### 🚀 Neu
- **AIRAC 2409 Unterstützung** - Unterstützt den neuesten AIRAC-Datenzyklus
- **Runway-Daten-Erweiterung** - Informationen zu Landebahnoberflächentyp und -neigung hinzugefügt
- **Automatische Sicherungsfunktion** - Automatische Sicherung der ursprünglichen Navigationsdaten
- **Datenvalidierungsbericht** - Erstellung detaillierter Datenverarbeitungsberichte

### 🔧 Verbesserungen
- Erhöhte Datenverarbeitungsgeschwindigkeit für große Flughäfen
- Optimierte Speichernutzungseffizienz
- Verbesserte Rückmeldungen der Benutzeroberfläche

### 🐛 Behobene Fehler
- Fehler bei den Höhendaten für Hochgebirgsflughäfen behoben
- Problem bei der Verarbeitung von ICAO-Codes bestimmter spezieller Flughäfen gelöst
- Fehler bei der Umrechnung von Landebahnlängeneinheiten behoben

---

## [1.4.1] - 2024-08-20

### 🐛 Behobene Fehler
- Windows 11 Kompatibilitätsproblem behoben
- Datenbank-Sperrproblem gelöst
- Fehler bei der Verarbeitung chinesischer Pfade behoben

### 🔧 Verbesserungen
- Erhöhte Startgeschwindigkeit
- Optimierte Fehlermeldungen

---

## [1.4.0] - 2024-08-05

### 🚀 Neu
- **Grundlage für Mehrsprachigkeit** - Internationalisierungs-Framework hinzugefügt
- **Datenexportfunktion** - Unterstützt den Export in verschiedene Formate
- **Leistungsüberwachung** - Statistiken zur Verarbeitungsleistung hinzugefügt

### 🔧 Verbesserungen
- **Datenbankoptimierung** - Neu gestaltete Indexstruktur, Abfragegeschwindigkeit um 40% erhöht
- **Speicherverwaltung** - Speicherverbrauch um 30% reduziert
- **Benutzererfahrung** - Verbesserte Fehlermeldungen und Statusanzeige

### 🐛 Behobene Fehler
- Problem mit doppelten Wegpunkten behoben
- ILS-Frequenzgenauigkeitsproblem gelöst
- Zeitzonen-Verarbeitungsfehler behoben

---

## [1.3.2] - 2024-07-12

### 🐛 Behobene Fehler
- Kompatibilität mit der PMDG 737 MAX-Serie behoben
- Einfluss der Sommerzeit auf AIRAC-Daten behoben
- Anzeigeproblem der Frequenz einiger Navigationsgeräte behoben

---

## [1.3.1] - 2024-06-28

### 🐛 Behobene Fehler
- macOS Pfadverarbeitungsproblem behoben
- CSV-Dateien BOM-Marker-Problem gelöst
- Fehler bei der Flugrouten-Verbindungsvalidierung behoben

### 🔧 Verbesserungen
- Erhöhte Dateilesegeschwindigkeit
- Optimiertes Log-Ausgabeformat

---

## [1.3.0] - 2024-06-15

### 🚀 Neu
- **Linux-Unterstützung** - Erweiterte Unterstützung für Linux-Systeme
- **Konfigurationsvalidierung** - Überprüfung der Konfigurationsdateisyntax hinzugefügt
- **Datenstatistiken** - Erstellung detaillierter Datenverarbeitungsstatistiken

### 🔧 Verbesserungen
- **Plattformübergreifende Kompatibilität** - Vereinheitlichung des Verhaltens über verschiedene Betriebssysteme hinweg
- **Fehlerbehebung** - Verbesserte Fehlertoleranz bei der Datenverarbeitung
- **Code-Qualität** - Kernmodule refaktoriert, Code-Qualität verbessert

### 🐛 Behobene Fehler
- Problem bei der Verarbeitung von Nicht-ASCII-Zeichen behoben
- Timeout-Problem bei der Verarbeitung großer Dateien gelöst
- Fehler bei der Datenbanktransaktionsverarbeitung behoben

---

## [1.2.1] - 2024-05-20

### 🐛 Behobene Fehler
- AIRAC-Datum-Berechnungsfehler behoben
- Koordinatenkonvertierungsproblem für bestimmte Flughäfen gelöst
- Problem mit ungenauer Fortschrittsanzeige behoben

---

## [1.2.0] - 2024-05-05

### 🚀 Neu
- **AIRAC 2405 Unterstützung** - Unterstützt den neuesten Navigationsdatenzyklus
- **Stapelverarbeitungsmodus** - Unterstützt die Verarbeitung mehrerer Datendateien
- **Datendifferenzerkennung** - Vergleich von Datenunterschieden zwischen verschiedenen Versionen

### 🔧 Verbesserungen
- **Verarbeitungsgeschwindigkeit** - Datenverarbeitungsgeschwindigkeit um 25% erhöht
- **Speicheroptimierung** - Optimierte Speichernutzung für große Datensätze
- **Log-Detaillierungsgrad** - Bietet detailliertere Verarbeitungs-Logs

### 🐛 Behobene Fehler
- Verarbeitung von Flugrouten-Höhenbeschränkungen behoben
- Problem mit doppelten VOR/DME-Frequenzen gelöst
- Genauigkeit der Flughöhendaten behoben

---

## [1.1.2] - 2024-04-18

### 🐛 Behobene Fehler
- Unterstützung für lange Windows-Pfade behoben
- Kodierungsfehler für Sonderzeichen gelöst
- Datenbankverbindungs-Timeout-Problem behoben

---

## [1.1.1] - 2024-04-05

### 🐛 Behobene Fehler
- Datenbankpfadproblem der PMDG 737-800 behoben
- Fehler bei der ILS-Gleitpfadwinkelberechnung gelöst
- Problem mit fehlenden Wegpunkten behoben

### 📚 Dokumentation
- Installationsanleitung aktualisiert
- Abschnitt zur Fehlerbehebung hinzugefügt

---

## [1.1.0] - 2024-03-22

### 🚀 Neu
- **STAR-Verfahrensunterstützung** - Unterstützung für Standard Terminal Arrival Routes (STAR) hinzugefügt
- **Anflugverfahren** - Unterstützung für Instrumentenanflugverfahrensdaten
- **Verbesserte Datenvalidierung** - Strengere Datenintegritätsprüfung

### 🔧 Verbesserungen
- **SID-Verfahrensoptimierung** - Verbesserte Verarbeitung von Standard Instrument Departures (SID)
- **Koordinatengenauigkeit** - Erhöhte Genauigkeit der Koordinatenberechnung
- **Fehlerbehandlung** - Bessere Fehlermeldungen und Wiederherstellungsmechanismen

### 🐛 Behobene Fehler
- NDB-Frequenzbereichsvalidierung behoben
- Problem mit unterbrochenen Flugroutenverbindungen gelöst
- Berechnung des magnetischen Kurses der Landebahn behoben

---

## [1.0.0] - 2024-03-01

### 🎉 Erste offizielle Veröffentlichung

#### 🚀 Kernfunktionen
- **Vollständige Unterstützung der PMDG 737 Serie** - Unterstützt alle PMDG 737 Varianten
- **Vollständige Navigationsdatenkonvertierung** - Flughäfen, Landebahnen, Navigationsgeräte, Flugrouten-Daten
- **Optimierung für die Region China** - Speziell optimiert für chinesische Zivilluftfahrtdaten
- **AIRAC 2403 Unterstützung** - Unterstützt den AIRAC-Datenzyklus März 2024

#### 🛠️ Technische Merkmale
- **SQLite-Datenbank** - PMDG-kompatibles Datenbankformat
- **Unterstützung mehrerer Datenquellen** - Unterstützt NAIP- und X-Plane-Datenquellen
- **Automatisierte Verarbeitung** - Ein-Klick-Datenkonvertierungsprozess
- **Datenvalidierung** - Vollständige Datenqualitätsprüfung

#### 📊 Unterstützte Datentypen
- Grundlegende Flughafeninformationen (ICAO-Codes, Koordinaten, Namen)
- Landebahn-Daten (Länge, Breite, Richtung, Oberfläche)
- VOR/DME-Navigationsgeräte
- NDB-Navigationsfunkfeuer
- Wegpunkte und Flugrouten-Netzwerk
- ILS-Instrumentenlandesystem

#### 🎯 Unterstützte Flugzeuge
- PMDG 737-600
- PMDG 737-700
- PMDG 737-800
- PMDG 737-900

#### 🌍 Unterstützte Regionen
- Festlandchina (ICAO-Codes ZB, ZG, ZS, ZJ, ZY, ZL, ZH, ZU, ZP, ZW)

---

## Versionsplanung

### 🔮 Zukünftige Versionsplanung

#### v2.2.0 (Geplant für Q1 2025)
- **iniBuilds Flugzeugunterstützung** - Erweiterte Unterstützung für iniBuilds Flugzeugserien
- **Echtzeit-Datenaktualisierung** - Unterstützt Online-AIRAC-Datenaktualisierungen
- **Grafische Benutzeroberfläche** - Desktop-GUI-Anwendung hinzugefügt
- **Cloud-Datenquellen** - Unterstützt die Integration von Cloud-Datenquellen

#### v2.3.0 (Geplant für Q2 2025)
- **Globale Datenunterstützung** - Erweiterung auf globale Navigationsdaten
- **Benutzerdefiniertes Plugin-System** - Unterstützt die Entwicklung von Drittanbieter-Plugins
- **Datenanalyse-Tools** - Integrierte Datenanalyse und Visualisierung
- **REST API** - Bietet eine Web-API-Schnittstelle

#### v3.0.0 (Geplant für Q4 2025)
- **Architektur der nächsten Generation** - Mikroservice-basierte, verteilte Architektur
- **Maschinelles Lernen-Optimierung** - Intelligente Datenverarbeitung und -optimierung
- **Multi-Simulator-Unterstützung** - Unterstützt andere Simulatoren wie P3D, FSX
- **Enterprise-Funktionen** - Enterprise-Funktionen wie Hochverfügbarkeit, Lastverteilung

---

## 📋 Update-Hinweise

### 🔖 Versionsnummerierungsregeln
Wir verwenden Semantic Versioning (SemVer):
- **Hauptversionsnummer** (X.y.z) - Inkompatible API-Änderungen
- **Nebenversionsnummer** (x.Y.z) - Abwärtskompatible Funktionserweiterungen
- **Patch-Versionsnummer** (x.y.Z) - Abwärtskompatible Fehlerbehebungen

### 🏷️ Erläuterung der Änderungstypen
- **🚀 Neu (Added)** - Neue Funktionen
- **🔧 Verbessert (Changed)** - Änderungen an bestehenden Funktionen
- **🗑️ Veraltet (Deprecated)** - Funktionen, die bald entfernt werden
- **🗑️ Entfernt (Removed)** - Bereits entfernte Funktionen
- **🐛 Behoben (Fixed)** - Fehlerbehebungen
- **🔒 Sicherheit (Security)** - Sicherheitsrelevante Fehlerbehebungen

### 📅 Veröffentlichungszyklus
- **Hauptversionen** - 1-2 größere Updates pro Jahr
- **Nebenversionen** - Funktionale Updates jedes Quartal
- **Patch-Versionen** - Bugfixes bei Bedarf veröffentlicht

### 🔗 Updates erhalten
- **GitHub Releases** - Erhalten Sie die neueste Version und detaillierte Änderungs-Logs
- **Automatische Benachrichtigungen** - Abonnieren Sie Release-Benachrichtigungen, um Updates sofort zu erhalten
- **Beta-Tests** - Nehmen Sie am Beta-Testprogramm teil, um neue Funktionen zu erleben

---

**Hinweis**: Für detaillierte Änderungen spezifischer Versionen besuchen Sie bitte die [GitHub Releases](https://github.com/Nav-data/releases)-Seite.
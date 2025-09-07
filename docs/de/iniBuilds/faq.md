# 🙋 Häufig gestellte Fragen (FAQ)

## 📥 Installation

### F1: Welche Betriebssysteme werden unterstützt?
**A:**
- ✅ **Windows 10/11** (empfohlen)
- ✅ **macOS 10.15+** (Catalina und höher)
- ✅ **Ubuntu 20.04+ / Debian 11+**
- ✅ **Andere gängige Linux-Distributionen**

### F2: Welche Python-Umgebungsanforderungen gibt es?
**A:**
- **Mindestversion**: Python 3.8
- **Empfohlene Version**: Python 3.9 oder 3.10
- **Nicht unterstützt**: Python 3.7 und ältere Versionen
- **Virtuelle Umgebung**: Die Verwendung von venv oder conda wird dringend empfohlen

### F3: Wie viel Speicherplatz wird benötigt?
**A:**
- **Tool selbst**: ~50MB
- **Abhängigkeitspakete**: ~200MB
- **Temporärer Verarbeitungsplatz**: 1-2GB
- **Ausgabedaten**: 500MB-1GB (abhängig vom Abdeckungsbereich)
- **Gesamtempfehlung**: Mindestens 4GB verfügbarer Speicherplatz

### F4: Wie hoch sind die Arbeitsspeicheranforderungen?
**A:**
- **Mindestens**: 4GB RAM
- **Empfohlen**: 8GB+ RAM
- **Groß angelegte Konvertierung**: 16GB+ RAM
- **Virtueller Speicher**: Es wird empfohlen, ihn auf das 1,5-fache des physischen Speichers einzustellen

## ⚙️ Konfiguration

### F5: Wie erhalte ich Navigationsdaten?
**A:** Empfohlene Datenquellen:
- **Navigraph** (bevorzugt) - Globale Abdeckung, 28-tägiger Aktualisierungszyklus
- **X-Plane Daten** - Kostenlos, aber geringere Aktualisierungsfrequenz
- **NAIP Daten** - Optimiert für die Region Asien
- **Benutzerdefinierte Datenquellen** - Unterstützt das ARINC 424-Format

### F6: Wie ist der AIRAC-Zyklus zu verstehen?
**A:**
- **Zykluslänge**: Ein Zyklus alle 28 Tage
- **Gültigkeitsdatum**: Ein bestimmtes Datum jedes Monats (normalerweise ein Donnerstag)
- **Versionsformat**: YYYY-CC (z.B. 2024-01 für den ersten Zyklus im Jahr 2024)
- **Gültigkeitsdauer**: 28 Tage, nach Ablauf wird ein Update empfohlen

### F7: Welche Datenformate werden unterstützt?
**A:**
**Eingabeformate**:
- ✅ ARINC 424 (.dat, .txt)
- ✅ X-Plane (.dat, .txt)
- ✅ NAIP (.xml, .json)
- ✅ CIFP (.xml)

**Ausgabeformate**:
- ✅ iniBuilds A350 natives Format
- ✅ SQLite-Datenbank
- ✅ JSON-Konfigurationsdatei
- ✅ XML-Exportformat

### F8: Wie konfiguriere ich die Datenquellenpriorität?
**A:** In der Konfigurationsdatei einstellen:
```json
{
  "data_sources": {
    "priority_order": ["navigraph", "naip", "xplane"],
    "fallback_enabled": true,
    "merge_strategy": "priority_override"
  }
}
```

## 🔄 Verwendung

### F9: Wie lange dauert der Konvertierungsprozess?
**A:** Geschätzte Verarbeitungszeit:
- **Einzelner Flughafen**: 30 Sekunden - 2 Minuten
- **Stadtgebiet** (z.B. Peking und Umgebung): 5-10 Minuten
- **Provinzgebiet** (z.B. Provinz Guangdong): 15-30 Minuten
- **Landesebene** (z.B. ganz China): 45-90 Minuten
- **Globale Daten**: 2-4 Stunden

### F10: Ist eine inkrementelle Aktualisierung möglich?
**A:** Unterstützt intelligente inkrementelle Aktualisierungen:
```bash
# Nur geänderte Daten aktualisieren
python converter.py --incremental --since-date=2024-01-01

# Basierend auf dem AIRAC-Zyklus aktualisieren
python converter.py --update-airac --from=2024-01 --to=2024-02
```

### F11: Wie überprüfe ich die Konvertierungsergebnisse?
**A:** Integrierte mehrstufige Validierung:
```bash
# Schnelle Validierung
python validate.py --quick-check

# Umfassende Validierung
python validate.py --comprehensive --report=html

# Mit Referenzdaten vergleichen
python validate.py --compare-with=reference_data.db
```

### F12: Wird Stapelverarbeitung unterstützt?
**A:** Unterstützt verschiedene Stapelmodi:
```bash
# Mehrere AIRAC-Zyklen im Stapel verarbeiten
python batch_converter.py --airac-range=2024-01:2024-06

# Mehrere Regionen im Stapel verarbeiten
python batch_converter.py --regions=ZSPD,ZBAA,ZGGG --parallel=4
```

## ✈️ iniBuilds Integration

### F13: Welche iniBuilds Flugzeuge werden unterstützt?
**A:** Derzeit unterstützt:
- ✅ **A350-900** - Volle Unterstützung aller Systeme
- ✅ **A350-900ULR** - Ultralangstreckenversion
- ✅ **A350-1000** - Verlängerte Version
- 🔄 **A320neo-Serie** - In Entwicklung
- 🔄 **A330-Serie** - Geplante Unterstützung

### F14: Wo werden die Daten installiert?
**A:** Automatische Erkennung des Installationspfades:
- **Standardpfad**: `MSFS Community-Ordner/inibuilds-aircraft-a350/SimObjects/`
- **Steam-Version**: `C:/Users/[Benutzer]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalState/packages/`
- **Microsoft Store-Version**: Ähnlich wie die Steam-Version, aber mit anderer Paket-ID
- **Benutzerdefinierter Pfad**: Kann in der Konfiguration angegeben werden

### F15: Wie bestätige ich, dass die Daten korrekt geladen wurden?
**A:** Überprüfungsschritte:
1. **MCDU-Anzeige**: Überprüfen Sie, ob der AIRAC-Zyklus korrekt ist
2. **Routenplanung**: Versuchen Sie, eine bekannte Route zu planen
3. **Wegpunktsuche**: Suchen Sie nach einem bestimmten Wegpunkt
4. **Prozedurladung**: Laden Sie SID/STAR-Prozeduren

### F16: Ist es mit anderen Navigationsdatentools kompatibel?
**A:**
- ⚠️ **Nicht empfohlen**, es gleichzeitig mit anderen Tools zu verwenden
- 🔄 **Konflikterkennung**: Das Tool erkennt Konflikte automatisch und warnt davor
- 🛠️ **Bereinigungstool**: Bietet eine Ein-Klick-Funktion zur Bereinigung von Daten anderer Tools
- 📋 **Sicherung und Wiederherstellung**: Unterstützt die automatische Sicherung vor dem Wechsel des Tools

## 🌍 Geografische Abdeckung

### F17: Welche Regionen werden hauptsächlich abgedeckt?
**A:** Detaillierte Abdeckungsbereiche:
- 🇨🇳 **Festlandchina**: Alle ICAO-Regionen (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- 🇭🇰 **Hongkong**: VH-Region
- 🇲🇴 **Macau**: VM-Region
- 🇹🇼 **Taiwan**: RC-Region
- 🇻🇳 **Vietnam**: VV-Region
- 🇰🇷 **Südkorea**: RK-Region (teilweise)
- 🌏 **Andere asiatische Regionen**: Datenqualität variiert je nach Region

### F18: Wie hoch ist die Datengenauigkeit?
**A:** Genauigkeitsspezifikationen:
- **Koordinatengenauigkeit**: 8 Dezimalstellen (ca. 1 Meter Genauigkeit)
- **Höhengenauigkeit**: 1 Fuß
- **Frequenzgenauigkeit**: 0,01 MHz
- **Magnetische Deklination**: Echtzeitberechnung, verwendet das WMM2020-Modell
- **Aktualisierungsfrequenz**: Folgt dem AIRAC-28-Tage-Zyklus

### F19: Welche Navigationsdatentypen sind enthalten?
**A:** Vollständige Datentypen:
- ✈️ **Flughafeninformationen**: ICAO-Code, Koordinaten, magnetische Deklination, Start- und Landebahninformationen
- 📡 **Navigationsgeräte**: VOR, DME, NDB, TACAN
- 📍 **Wegpunkte**: Koordinaten, Bereichsklassifizierung, Nutzungsidentifikation
- 🛣️ **Routennetzwerk**: Hoch-/Niedrigrouten, Verbindungen
- 🛫 **Abflugverfahren**: SID (Standard Instrument Departure)
- 🛬 **Anflugverfahren**: STAR (Standard Terminal Arrival Route)
- 📐 **Anflugprozeduren**: ILS, VOR, NDB, RNAV und andere Anflugarten
- 📶 **Landesysteme**: ILS/GLS-Leitinformationen

### F20: Wie ist der Grad der chinesischen Lokalisierung?
**A:**
- ✅ **Flughafennamen**: Chinesisch und Englisch im Vergleich
- ✅ **Städtenamen**: Volle chinesische Unterstützung
- ✅ **Wegpunktenamen**: Pinyin und chinesische Bezeichnung
- ✅ **Prozedurnamen**: Lokalisierte Benennungsregeln
- ✅ **Benutzeroberfläche**: Vollständige chinesische Oberfläche

## 🔧 Technik

### F21: Wie aktiviere ich detaillierte Protokolle?
**A:**
```bash
# Grundlegender Debug-Modus
python converter.py --debug

# Detaillierter Protokollmodus
python converter.py --verbose --log-level=DEBUG

# Protokoll in Datei speichern
python converter.py --log-file=debug_$(date +%Y%m%d).log
```

### F22: Wird Multithreading unterstützt?
**A:** Intelligente Parallelverarbeitung:
```bash
# Automatische Erkennung der CPU-Kerne
python converter.py --parallel=auto

# Anzahl der Threads angeben
python converter.py --parallel=4

# Parallelisierung mit Speicherbegrenzung
python converter.py --parallel=2 --memory-limit=4GB
```

### F23: Wie überwache ich den Konvertierungsfortschritt?
**A:** Verschiedene Methoden zur Fortschrittsüberwachung:
- **Konsolen-Fortschrittsbalken**: Zeigt den Abschluss in Echtzeit an
- **Web-Oberfläche**: Optionale browserbasierte Überwachungsschnittstelle
- **Protokolldatei**: Detaillierte Aufzeichnung des phasenweisen Fortschritts
- **Status-API**: JSON-basiertes Abfrage-Interface für den Fortschritt

### F24: Wird die automatisierte Bereitstellung unterstützt?
**A:** Volle Automatisierungsunterstützung:
```bash
# Geplanter Task-Modus
python scheduler.py --schedule=weekly --auto-update

# CI/CD-Integration
python converter.py --batch --no-interaction --exit-on-error

# Docker-Container-Bereitstellung
docker run nav-data/converter --config=/app/config.json
```

## 🔍 Leistungsoptimierung

### F25: Wie kann ich die Konvertierungsgeschwindigkeit erhöhen?
**A:** Empfehlungen zur Leistungsoptimierung:
- 💾 **SSD verwenden**: Deutliche Steigerung der I/O-Leistung
- 🧠 **Speicher erweitern**: Reduziert das Swapping auf die Festplatte
- ⚡ **Parallelisierung aktivieren**: Nutzt Multi-Core-CPUs
- 🗜️ **Datenkomprimierung**: Reduziert die Netzwerkübertragungszeit
- 🎯 **Bereichsfilterung**: Verarbeitet nur die benötigten Bereiche

### F26: Was tun, wenn der Speicherverbrauch zu hoch ist?
**A:** Speicheroptimierungsstrategien:
```bash
# Streaming aktivieren
python converter.py --streaming --chunk-size=1MB

# Speichernutzung begrenzen
python converter.py --max-memory=2GB

# Optimierung temporärer Dateien
python converter.py --temp-dir=/tmp --cleanup-temp
```

### F27: Wie gehe ich mit Netzwerkproblemen um?
**A:** Netzwerkoptimierungslösungen:
- 🌐 **Offline-Modus**: Alle Daten vorab herunterladen
- 🔄 **Wiederaufnahme bei Unterbrechung**: Automatische Wiederherstellung nach Netzwerkunterbrechung
- 🚀 **CDN-Beschleunigung**: Nutzung von Servern in der Nähe
- 📦 **Daten-Caching**: Reduziert wiederholte Downloads

## 🛡️ Datensicherheit

### F28: Sind die Daten sicher?
**A:** Mehrere Sicherheitsgarantien:
- 🔒 **Transportverschlüsselung**: HTTPS/TLS 1.3
- 🔐 **Speicherverschlüsselung**: AES-256 Dateiverschlüsselung
- ✅ **Integritätsprüfung**: SHA-256 Hash-Validierung
- 🔍 **Quellvalidierung**: Digitale Signaturprüfung
- 🚫 **Datenschutz**: Keine Erfassung persönlicher Informationen

### F29: Wie führe ich Sicherungen und Wiederherstellungen durch?
**A:** Umfassende Sicherungslösungen:
```bash
# Vollständige Sicherung erstellen
python backup.py --full --compress --encrypt

# Inkrementelle Sicherung
python backup.py --incremental --since-date=2024-01-01

# Sicherung wiederherstellen
python restore.py --backup-id=20240115_143022 --verify
```

## 🆘 Hilfe erhalten

### F30: Was tun bei Problemen?
**A:** Umfassendes Unterstützungssystem:

**1. Selbstdiagnose**:
```bash
# Systemdiagnose ausführen
python diagnostic.py --comprehensive --report=html

# Häufige Probleme prüfen
python health_check.py --fix-common-issues
```

**2. Community-Support**:
- 📖 [Benutzerhandbuch](guide/index.md)
- 🔧 [Fehlerbehebungsleitfaden](troubleshooting.md)
- 💬 [GitHub-Diskussionen](https://github.com/nav-data/docs/discussions)
- 🐛 [Problem melden](https://github.com/nav-data/docs/issues)

**3. Direkter Kontakt**:
- 📧 **Technischer Support**: technical@nav-data.org
- 🚨 **Dringende Probleme**: urgent@nav-data.org
- 💬 **Allgemeine Anfragen**: info@nav-data.org

### F31: Wie kann ich beitragen und Feedback geben?
**A:** Verschiedene Beteiligungsmöglichkeiten:
- 🐛 **Bug-Berichte**: GitHub Issues
- 💡 **Funktionsvorschläge**: GitHub Discussions
- 📝 **Dokumentationsverbesserungen**: Pull Request
- 💻 **Code-Beiträge**: Siehe [Beitragsrichtlinien](contributing.md)
- 🌐 **Lokalisierung**: Hilfe bei der Übersetzung von Dokumenten

### F32: Gibt es Schulungsmaterialien?
**A:** Umfangreiche Lernressourcen:
- 📹 **Video-Tutorials**: YouTube-Kanal und B站
- 📚 **Benutzerhandbuch**: PDF und Online-Version
- 🎓 **Online-Kurse**: Schritt-für-Schritt-interaktive Tutorials
- 📋 **Schnellanleitung**: 5-Minuten-Schnellstart
- 🔬 **Fortgeschrittene Techniken**: Expertentipps zur Nutzung

---

## 🔍 Keine Antwort gefunden?

Wenn Ihre Frage in dieser FAQ nicht beantwortet wurde, gehen Sie bitte wie folgt vor:

1. 🔍 **Suche verwenden**: Die Suchfunktion oben auf der Seite
2. 📖 **Dokumentation prüfen**: [Vollständiges Benutzerhandbuch](guide/index.md)
3. 🛠️ **Fehlerbehebung**: [Leitfaden zur Problembehebung](troubleshooting.md)
4. 💬 **Community-Diskussionen**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
5. 📧 **Direkt kontaktieren**: support@nav-data.org

Wir versprechen, alle technischen Anfragen innerhalb von 24 Stunden zu beantworten. Vielen Dank, dass Sie Nav-data gewählt haben!

---

## 📊 Nutzungsstatistiken

**Ranking der häufigsten Fragen** (basierend auf Benutzerfeedback):
1. **Installations- und Konfigurationsprobleme** - 35%
2. **Datenformatbezogene Probleme** - 22%
3. **Leistungsoptimierung** - 18%
4. **iniBuilds-Integration** - 15%
5. **Fehlerbehebung** - 10%

**Benutzerzufriedenheit**: ⭐⭐⭐⭐⭐ 4.8/5.0 (basierend auf über 1.200 Benutzerbewertungen)

**Kontinuierliche Verbesserung**: Wir aktualisieren den FAQ-Inhalt monatlich, um die Aktualität und Genauigkeit der Informationen zu gewährleisten.
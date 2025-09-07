# ❓ iFly Navigationsdatenkonverter - Häufig gestellte Fragen

## 🔧 Installation und Konfiguration

### Q: Welche Software benötige ich, um den Konverter auszuführen?

**A:** Sie benötigen die folgende Software:
- **Python 3.8+** (Python 3.9 oder höher wird empfohlen)
- **iFly 737 MAX 8** installiert in Microsoft Flight Simulator
- **Fenix A320** (zum Abrufen der Navigationsdatenbank)
- **NAIP RTE_SEG.csv** Flugwegsegment-Datendatei

### Q: Wie installiere ich die erforderlichen Python-Abhängigkeiten?

**A:** Führen Sie im Projektverzeichnis aus:
```bash
pip install rich pathlib typing pygeomag pandas tqdm geographiclib
```

Oder wenn eine requirements.txt-Datei vorhanden ist:
```bash
pip install -r requirements.txt
```

### Q: Was tun, wenn das Programm den iFly Installationspfad nicht findet?

**A:** Sie können:
1. **Pfad manuell angeben**: Geben Sie den vollständigen iFly Installationspfad ein, wenn das Programm dazu auffordert.
2. **Installationsort überprüfen**: Stellen Sie sicher, dass iFly 737 MAX 8 korrekt an einem der folgenden Orte installiert ist:
   - `Community\ifly-aircraft-737max8\`
   - `Official\asobo-aircraft-ifly-737max8\`
3. **iFly neu installieren**: Wenn der Pfad ungewöhnlich ist, installieren Sie iFly 737 MAX 8 neu.

## 📊 Datenverarbeitung

### Q: Was ist ein AIRAC-Zyklus? Warum ist er wichtig?

**A:** AIRAC (Aeronautical Information Regulation and Control) ist der von der ICAO (Internationale Zivilluftfahrt-Organisation) festgelegte 28-tägige Aktualisierungszyklus für Luftfahrtinformationen. Jeder Zyklus hat eine eindeutige 4-stellige Kennung (z.B. 2508), um die Aktualität und Genauigkeit der Navigationsdaten zu gewährleisten.

### Q: Wie wird die magnetische Missweisung berechnet?

**A:** Der Konverter verwendet das **WMM-2025** (World Magnetic Model) geomagnetische Modell der **pygeomag**-Bibliothek für hochpräzise Missweisungsberechnungen:
- **Lokale Berechnung**: Keine Internetverbindung erforderlich
- **Hohe Präzision**: Genau auf mehrere Dezimalstellen
- **Echtzeit-Aktualisierung**: Basierend auf aktuellem Datum und Koordinaten

### Q: Warum wird die Datei NAIP RTE_SEG.csv benötigt?

**A:** Diese Datei enthält Daten zu Flugwegsegmenten der chinesischen Zivilluftfahrt und wird verwendet für:
- Ergänzung fehlender chinesischer Flugrouteninformationen in iFly
- Bereitstellung präziser Wegpunktkoordinaten
- Sicherstellung der Übereinstimmung mit dem tatsächlichen Flugroutennetzwerk

### Q: Wo werden die konvertierten Daten abgelegt?

**A:** Die Daten werden an folgenden Stellen abgelegt:
- **Flugwegdaten**: `Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt`
- **Terminalverfahren**: `Community\ifly-aircraft-737max8\Data\navdata\Supplemental\`
- **AIRAC-Kennung**: `FMC_Ident.txt`

## 🐛 Fehlerbehebung

### Q: Fehler 'Datenbankverbindung fehlgeschlagen' beim Ausführen des Programms?

**A:** Bitte überprüfen Sie:
1. **Dateipfad**: Stellen Sie sicher, dass der Dateipfad zur Fenix-Datenbank korrekt ist.
2. **Dateiberechtigungen**: Stellen Sie sicher, dass die Datei lesbar ist.
3. **Dateintegrität**: Versuchen Sie, die Fenix-Datenbankdatei neu zu beziehen.
4. **Festplattenspeicher**: Stellen Sie sicher, dass genügend freier Speicherplatz vorhanden ist.

### Q: Was tun, wenn die Missweisungsberechnung sehr langsam ist?

**A:** Dies ist in der Regel normal:
- **Erster Start**: Die Initialisierung des geomagnetischen Modells benötigt Zeit.
- **Große Datenmengen**: Bei vielen Wegpunkten dauert die Berechnung länger.
- **Systemleistung**: Ältere Hardware verarbeitet Daten langsamer.

Optimierungsvorschläge:
- Verwenden Sie eine SSD-Festplatte
- Stellen Sie sicher, dass genügend Arbeitsspeicher vorhanden ist (8GB+ empfohlen)
- Schließen Sie unnötige Hintergrundprogramme

### Q: Die neuen Daten sind nach der Konvertierung in iFly nicht sichtbar?

**A:** Bitte versuchen Sie:
1. **Simulator neu starten**: MSFS vollständig beenden und neu starten.
2. **Dateispeicherort überprüfen**: Stellen Sie sicher, dass die Dateien in das richtige Verzeichnis geschrieben wurden.
3. **Cache leeren**: Löschen Sie die Cache-Dateien von iFly.
4. **Berechtigungen überprüfen**: Stellen Sie sicher, dass das Programm Schreibberechtigungen für das iFly-Verzeichnis hat.

### Q: Was tun bei einem Kodierungsfehler?

**A:** Dies hängt normalerweise mit der Zeichenkodierung zusammen:
1. **Stellen Sie sicher, dass die Python-Umgebung UTF-8 unterstützt**
2. **CSV-Dateikodierung überprüfen**: Stellen Sie sicher, dass sie im UTF-8-Format vorliegt.
3. **Python-Version aktualisieren**: Verwenden Sie die neueste Python-Version.

## 📈 Leistung und Optimierung

### Q: Wie kann die Konvertierungsgeschwindigkeit erhöht werden?

**A:** Vorschläge zur Leistungsoptimierung:
- **SSD verwenden**: Eine Solid-State-Festplatte verbessert die E/A-Leistung erheblich.
- **Arbeitsspeicher erhöhen**: 8GB+ RAM empfohlen.
- **Antivirensoftware deaktivieren**: Deaktivieren Sie vorübergehend den Echtzeit-Scan.
- **Neuere Python-Version verwenden**: Python 3.9+ bietet eine bessere Leistung.

### Q: Was tun bei zu hohem Arbeitsspeicherverbrauch?

**A:** Lösungen zur Speicheroptimierung:
1. **Stapelverarbeitung**: Verwenden Sie den Stapelmodus beim Verarbeiten großer Dateien.
2. **Andere Programme schließen**: Geben Sie Systemspeicher frei.
3. **Datengröße überprüfen**: Stellen Sie sicher, dass die Datendateigröße angemessen ist.
4. **64-Bit Python verwenden**: Vermeiden Sie die 32-Bit-Speicherbeschränkungen.

### Q: Können mehrere Datenbanken im Stapel verarbeitet werden?

**A:** Die aktuelle Version unterstützt keine direkte Stapelverarbeitung, aber Sie können:
1. **Programm mehrmals ausführen**: Verarbeiten Sie Datenbankdateien einzeln.
2. **Skript schreiben**: Erstellen Sie ein automatisiertes Stapelverarbeitungsskript.
3. **Auf Update warten**: v2.1.0 wird die Stapelverarbeitungsfunktion unterstützen.

## 🔄 Datenverwaltung

### Q: Wie werden die Originaldaten gesichert?

**A:** Es wird dringend empfohlen, vor der Konvertierung ein Backup zu erstellen:
```bash
# iFly Originaldaten sichern
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_navdata"
```

### Q: Wie werden die Originaldaten wiederhergestellt?

**A:** Wenn eine Wiederherstellung erforderlich ist:
1. **Konvertierte Dateien löschen**
2. **Aus Backup wiederherstellen**:
   ```bash
   rm -r "Community\ifly-aircraft-737max8\Data\navdata"
   cp -r "backup_navdata" "Community\ifly-aircraft-737max8\Data\navdata"
   ```
3. **iFly neu installieren**: Die gründlichste Wiederherstellungsmethode.

### Q: Wie kann die erfolgreiche Datenkonvertierung überprüft werden?

**A:** Validierungsmethoden:
1. **Dateiexistenz prüfen**: Überprüfen Sie, ob neue Dateien generiert wurden.
2. **Dateigröße prüfen**: Die neuen Dateien sollten größer sein als die Originaldateien.
3. **Simulator-Test**: Laden Sie die iFly 737 in MSFS und testen Sie.
4. **FMC-Validierung**: Überprüfen Sie die Flugrouten- und Prozedurdaten im FMC.

## 🆘 Technischer Support

### Q: Wo kann ich Hilfe erhalten?

**A:** Kanäle für Hilfe:
1. **Protokolle überprüfen**: Überprüfen Sie die Datei `converter.log`.
2. **Dokumentation lesen**: Lesen Sie die vollständige Bedienungsanleitung.
3. **GitHub Issues**: Melden Sie Probleme auf der Projektseite.
4. **Community-Forum**: Beteiligen Sie sich an Diskussionen in der Flugsimulations-Community.

### Q: Wie melde ich einen Bug?

**A:** Bitte geben Sie beim Melden eines Problems an:
- **Detaillierte Fehlerbeschreibung**
- **Vollständiges Fehlerprotokoll**
- **Systemumgebungsinformationen** (OS, Python-Version usw.)
- **Schritte zur Reproduktion**
- **Zugehörige Screenshots oder Dateien**

### Q: Ist das Projekt Open Source?

**A:** Ja! Das Projekt folgt einer Open-Source-Lizenz:
- **Quellcode anzeigen**: Das GitHub-Repository ist öffentlich.
- **Code beitragen**: Pull Requests sind willkommen.
- **Funktionsvorschläge**: Stellen Sie Funktionsanfragen in den Issues.
- **Dokumentationsverbesserungen**: Helfen Sie mit, die Dokumentation zu verbessern.

## 🔮 Zukünftige Funktionen

### Q: Welche neuen Funktionen sind geplant?

**A:** Kommende Funktionen:
- **GUI-Oberfläche** (v2.1.0)
- **Stapelverarbeitung** (v2.1.0)
- **Datenvalidierungstool** (v2.2.0)
- **Cloud-Verarbeitung** (v3.0.0)
- **Multi-Format-Unterstützung** (v3.0.0)

### Q: Wie erhalte ich Versionsupdates?

**A:** Bleiben Sie auf dem Laufenden:
1. **GitHub folgen**: Starren Sie das Projekt, um Update-Benachrichtigungen zu erhalten.
2. **Veröffentlichungen abonnieren**: Aktivieren Sie Release-Benachrichtigungen.
3. **Regelmäßig prüfen**: Überprüfen Sie einmal im Monat auf neue Versionen.
4. **Automatische Updates**: Zukünftige Versionen werden automatische Updates unterstützen.

---

**Keine Antwort auf Ihre Frage gefunden?** Bitte lesen Sie den [Fehlerbehebungsleitfaden](troubleshooting.md) oder stellen Sie eine Frage in den GitHub Issues! 🆘
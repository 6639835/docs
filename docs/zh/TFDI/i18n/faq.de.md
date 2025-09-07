# ❓ TFDI Navigationsdatenkonverter - Häufig gestellte Fragen

## 🔧 Installation und Konfiguration

### Q: Welche Software muss ich installieren, um den Konverter zu verwenden?

**A:** Sie benötigen die folgende Softwareumgebung:
- **Python 3.8+** (empfohlen 3.9 oder höher)
- **TFDI MD-11** installiert in Microsoft Flight Simulator
- **Fenix A320** (zum Abrufen der Navigationsdatenbankdatei)
- Notwendige Python-Abhängigkeitspakete (Installation über requirements.txt)

### Q: Wie erhalte ich die Fenix Navigationsdatenbankdatei?

**A:** Die Fenix-Datenbankdatei befindet sich normalerweise unter:
```
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
```

**Wichtige Hinweise:**
- Stellen Sie sicher, dass Fenix A320 installiert und mindestens einmal ausgeführt wurde
- Die Datenbankdatei ist normalerweise 50-200MB groß
- Die Datei muss eine vollständige und unbeschädigte SQLite-Datenbank sein

### Q: Welche Versionen von Fenix und TFDI unterstützt der Konverter?

**A:** Aktuell unterstützte Versionen:
- **Fenix A320**: v1.0.x - v1.2.x
- **TFDI MD-11**: v1.0.x - v1.2.x
- **Datenbankformat**: SQLite 3.x

**Versionskompatibilität:**
- ✅ Voll kompatibel: Fenix v1.1.x + TFDI v1.1.x
- ⚠️ Überprüfung erforderlich: Neueste Versionen erfordern möglicherweise ein Kompatibilitätsupdate
- ❌ Nicht unterstützt: Veraltete Beta-Versionen

## 📊 Datenkonvertierung

### Q: Wie lange dauert der Konvertierungsprozess?

**A:** Die Konvertierungszeit hängt von der Größe der Datenbank ab:
- **Kleine Datenbanken** (< 50MB): 2-5 Minuten
- **Mittelgroße Datenbanken** (50-200MB): 5-15 Minuten
- **Große Datenbanken** (200-500MB): 15-45 Minuten

**Einflussfaktoren:**
- Festplattentyp (SSD ist 2-3 Mal schneller als HDD)
- Verfügbarer Arbeitsspeicher (empfohlen 8GB+)
- CPU-Leistung (Mehrkernprozessoren haben Vorteile)
- Systemauslastung (unnötige Programme schließen)

### Q: Was ist eine Terminal-ID und wie wird sie eingestellt?

**A:** Eine Terminal-ID ist eine eindeutige Nummer im TFDI-System zur Identifizierung von Terminalverfahren.

**Einstellungsempfehlungen:**
```
Start-ID: 1000 (Standard)
ID-Bereich: 1-999999
Empfohlener Bereich: 1000-9000 (Platz für Erweiterungen lassen)
```

**Zuweisungsstrategie:**
- Für jeden Flughafen 20-50 IDs reservieren
- Nach Regionen gruppieren und zuweisen (z.B. Asien-Region 1000-3000)
- Konflikte mit vorhandenen TFDI-Daten vermeiden

### Q: Wo werden die konvertierten Dateien gespeichert?

**A:** Der Konverter generiert ein `Primary.7z` Archiv, das Folgendes enthält:

```
Primary.7z
├── AirportLookup.json      # Flughafensuchdaten
├── Airports.json           # Flughafeninformationen
├── AirwayLegs.json        # Luftstraßenabschnittsdaten
├── Airways.json           # Luftstraßendefinitionen
├── Ilses.json             # ILS-Anflugdaten
├── NavaidLookup.json      # Navigationshilfe-Suchdaten
├── Navaids.json           # Navigationshilfe-Daten
├── Runways.json           # Landebahninformationen
├── Terminals.json         # Terminalverfahrensdaten
├── WaypointLookup.json    # Wegpunkt-Suchdaten
├── Waypoints.json         # Wegpunktdefinitionen
└── ProcedureLegs/         # Verzeichnis der Verfahrensabschnitte
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

### Q: Was ist die FAF-Punkterkennung und warum ist sie wichtig?

**A:** Der FAF (Final Approach Fix) ist der Endanflug-Fixpunkt in einem Präzisionsanflugverfahren.

**Wichtigkeit:**
- Markiert den Beginn des Präzisionsanflugs
- Ein entscheidender Referenzpunkt für die VNAV-Berechnung
- Beeinflusst den Anflugmodus des Autopiloten

**Erkennungskriterien:**
- VNAV-Winkel ≤ 2.5° (konfigurierbar)
- Befindet sich in der letzten Phase des Anflugverfahrens
- Verfügt über Höhenbeschränkungsinformationen

## 🐛 Fehlerbehebung

### Q: Was tun, wenn der Fehler "Datenbankdatei beschädigt" auftritt?

**Fehlermeldung:**
```
SQLite Error: database disk image is malformed
Die Datenbankdatei ist möglicherweise beschädigt
```

**Lösungen:**
1. **Datenbank neu abrufen**:
   ```bash
   # Löschen der möglicherweise beschädigten Datei
   rm path/to/nd.db3
   
   # Fenix A320 neu starten, damit sie neu generiert wird
   ```

2. **Dateintegrität überprüfen**:
   ```python
   import sqlite3
   
   try:
       conn = sqlite3.connect('nd.db3')
       conn.execute('PRAGMA integrity_check')
       print("Datenbankintegritätsprüfung bestanden")
   except Exception as e:
       print(f"Datenbank beschädigt: {e}")
   ```

3. **Datenbank-Reparaturtool verwenden**:
   ```bash
   # Versuch, mit SQLite-Tools zu reparieren
   sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3
   ```

### Q: Was tun, wenn der Konverter in einem Schritt stecken bleibt?

**Häufig blockierte Schritte:**
- Datenbankvalidierungsphase
- Datenverarbeitungsphase für große Tabellen
- JSON-Serialisierungsphase
- Komprimierungs- und Paketierungsphase

**Fehlersuchmethoden:**
```bash
# 1. Systemressourcen überprüfen
top  # Linux/macOS
# oder Task-Manager (Windows)

# 2. Protokolldatei anzeigen
tail -f converter.log

# 3. Speicherplatz prüfen
df -h  # Linux/macOS
# oder Speicherplatz auf Windows-Laufwerken prüfen
```

**Lösungen:**
1. **Konverter neu starten**: Nach vollständigem Beenden neu starten
2. **Arbeitsspeicher erhöhen**: Andere Programme schließen, um Arbeitsspeicher freizugeben
3. **Berechtigungen prüfen**: Sicherstellen, dass Schreibberechtigungen vorhanden sind
4. **Schrittweises Debugging**: Debug-Modus verwenden, um Details anzuzeigen

### Q: Konvertierte JSON-Dateien werden in TFDI nicht erkannt?

**Mögliche Ursachen:**
1. **Versionsinkompatibilität**: TFDI-Version stimmt nicht mit der JSON-Formatversion überein
2. **Dateibeschädigung**: Datei während der Komprimierung oder Übertragung beschädigt
3. **Formatfehler**: JSON-Format entspricht nicht dem TFDI-Standard
4. **Kodierungsproblem**: Zeichenkodierung ist falsch

**Validierungsschritte:**
```bash
# 1. JSON-Format validieren
python -m json.tool Primary/Airports.json

# 2. Dateigröße prüfen
ls -lh Primary/

# 3. Archivintegrität überprüfen
7z t Primary.7z
```

**Behebungsmethoden:**
1. **Erneut konvertieren**: Ausgabeordner löschen und erneut konvertieren
2. **Manuell entpacken**: 7z-Datei entpacken und Inhalt prüfen
3. **Versionsaktualisierung**: Sicherstellen, dass die neueste Version des Konverters verwendet wird
4. **Support kontaktieren**: Bei weiterhin bestehenden Problemen einen Bug melden

## 📈 Leistungsoptimierung

### Q: Wie kann die Konvertierungsgeschwindigkeit erhöht werden?

**Hardware-Optimierung:**
- **SSD verwenden**: Solid-State-Laufwerke sind 3-5 Mal schneller als mechanische Festplatten
- **Arbeitsspeicher erhöhen**: Empfohlen 8GB+ RAM
- **Mehrkern-CPU**: Unterstützt parallele Verarbeitung
- **Antivirus deaktivieren**: Echtzeit-Scan temporär deaktivieren

**Software-Optimierung:**
```python
# Konfigurationsparameter anpassen
config = ConverterConfig(
    coordinate_precision=6,    # Präzision reduzieren, um Geschwindigkeit zu erhöhen
    batch_size=2000,          # Batch-Größe erhöhen
    enable_compression=False,  # Echtzeitkomprimierung deaktivieren
    max_workers=4             # Anzahl der parallelen Threads festlegen
)
```

**Umgebungsoptimierung:**
```bash
# Umgebungsvariablen setzen
export PYTHONOPTIMIZE=1       # Bytecode-Optimierung aktivieren
export SQLITE_TEMP_STORE=3    # Temporären Speicher im Arbeitsspeicher verwenden
```

### Q: Was tun bei zu hohem Arbeitsspeicherverbrauch?

**Arbeitsspeichernutzung überwachen:**
```python
import psutil

def monitor_memory():
    memory = psutil.virtual_memory()
    print(f"Arbeitsspeicherauslastung: {memory.percent}%")
    print(f"Verfügbarer Arbeitsspeicher: {memory.available // 1024**2} MB")
```

**Optimierungsstrategien:**
1. **Batch-Größe reduzieren**:
   ```python
   config.batch_size = 500  # Von Standard 1000 auf 500 reduzieren
   ```

2. **Schrittweise Verarbeitung**:
   ```python
   # Große Tabellen schrittweise verarbeiten
   tables = ['Airports', 'Runways', 'Waypoints']
   for table in tables:
       converter.process_table(table)
       gc.collect()  # Erzwingt Garbage Collection
   ```

3. **Streaming-Verarbeitung**: Streaming-Modus für die Verarbeitung großer Dateien aktivieren

### Q: Können mehrere Konverterinstanzen gleichzeitig ausgeführt werden?

**Technisch machbar, aber mit Einschränkungen:**
- **Datenbank-Sperre**: SQLite unterstützt keine mehreren Schreibverbindungen
- **Ressourcenkonflikt**: Mehrere Instanzen konkurrieren um CPU und Arbeitsspeicher
- **Festplatten-I/O**: Kann zu Engpässen bei der Festplatten-I/O führen

**Empfohlene Vorgehensweise:**
```bash
# Mehrere Datenbanken seriell verarbeiten
python converter.py --input db1.db3 --output output1/
python converter.py --input db2.db3 --output output2/

# Oder ein Batch-Skript verwenden
for db in *.db3; do
    python converter.py --input "$db" --output "output_${db%.*}/"
done
```

## 🔍 Datenvalidierung

### Q: Wie wird die Korrektheit der Konvertierungsergebnisse überprüft?

**Automatische Validierungstools:**
```python
# Eingebauten Validator verwenden
from tfdi_converter.validation import DataValidator

validator = DataValidator()
result = validator.validate_output("Primary.7z")

if result.is_valid:
    print("✅ Validierung erfolgreich")
else:
    print("❌ Validierung fehlgeschlagen:")
    for error in result.errors:
        print(f"  - {error}")
```

**Manuelle Validierungs-Checkliste:**
- [ ] **Dateintegrität**: Alle erforderlichen JSON-Dateien sind vorhanden
- [ ] **Datenmenge**: Angemessene Anzahl von Datensätzen ohne ungewöhnliche Reduzierung
- [ ] **Koordinatenbereich**: Breitengrad [-90, 90], Längengrad [-180, 180]
- [ ] **Referenzielle Integrität**: Fremdschlüsselbeziehungen bleiben intakt
- [ ] **Sonderzeichen**: UTF-8-Kodierung korrekt verarbeitet

**Validierung in TFDI:**
1. Konvertiertes Datenpaket installieren
2. Flugplan erstellen und Route testen
3. Verfahrensanzeige im FMC prüfen
4. Frequenzen und Positionen der Navigationshilfen überprüfen

### Q: Warum hat sich die Datenmenge nach der Konvertierung deutlich reduziert?

**Mögliche Ursachen:**
1. **Datenfilterung**: Der Konverter hat inkompatible oder ungültige Daten gefiltert
2. **Regionale Beschränkung**: Möglicherweise wurden nur Daten für bestimmte Regionen konvertiert
3. **Formatbeschränkung**: Einige Fenix-spezifische Formate können nicht konvertiert werden
4. **Versionsunterschiede**: Unterschiede in der Datenstruktur zwischen verschiedenen Versionen

**Prüfmethode:**
```python
# Anzahl der Datensätze vor und nach der Konvertierung vergleichen
def compare_record_counts(fenix_db, tfdi_json_dir):
    # Fenix-Datenbankdatensätze zählen
    fenix_counts = count_fenix_records(fenix_db)
    
    # TFDI-JSON-Datensätze zählen
    tfdi_counts = count_tfdi_records(tfdi_json_dir)
    
    # Ergebnisse vergleichen
    for table, fenix_count in fenix_counts.items():
        tfdi_count = tfdi_counts.get(table, 0)
        ratio = tfdi_count / fenix_count if fenix_count > 0 else 0
        print(f"{table}: {fenix_count} → {tfdi_count} ({ratio:.1%})")
```

## 🆘 Hilfe erhalten

### Q: Wo erhalte ich technischen Support?

**Offizielle Support-Kanäle:**
- **GitHub Issues**: Bugs und Funktionsanfragen melden
- **GitHub Discussions**: Für Fragen und allgemeine Diskussionen
- **Projektdokumentation**: Vollständige Benutzeranleitung einsehen
- **Beispielcode**: Beispiele im Projekt nachschlagen

**Community-Support:**
- **Flugsimulationsforen**: Zugehörige Flugsimulations-Communitys
- **Discord-Gruppen**: Echtzeit-Kommunikation und gegenseitige Hilfe
- **QQ-/WeChat-Gruppen**: Austauschgruppen für chinesische Benutzer

### Q: Wie melde ich ein Problem oder schlage eine neue Funktion vor?

**Prozess zur Problembehebung:**
1. **Vorhandene Probleme suchen**: Doppelmeldungen vermeiden
2. **Informationen sammeln**:
   - Detaillierte Fehlerbeschreibung
   - Vollständiges Fehlerprotokoll
   - Systemumgebungsinformationen
   - Schritte zur Reproduktion
3. **Issue erstellen**: Verwenden der bereitgestellten Vorlage
4. **Beispiel bereitstellen**: Falls möglich, ein minimales Reproduktionsbeispiel bereitstellen

**Funktionsvorschläge:**
- Den Zweck der neuen Funktion detailliert beschreiben
- Das erwartete Verhalten der Funktion erläutern
- Auswirkungen auf bestehende Benutzer berücksichtigen
- Implementierungsvorschläge machen (falls vorhanden)

### Q: Kann ich Code beitragen? Wie kann ich mich an der Entwicklung beteiligen?

**Beitragsmöglichkeiten:**
- **Bugfixes**: Bekannte Probleme beheben
- **Neue Funktionen entwickeln**: Neue Konvertierungsfunktionen implementieren
- **Leistungsoptimierung**: Konvertierungsgeschwindigkeit und -effizienz verbessern
- **Dokumentationsverbesserung**: Benutzer- und API-Dokumentation vervollständigen
- **Testerweiterung**: Testfälle und Abdeckung erhöhen

**Schritte zur Beteiligung:**
1. **Projekt forken**: Eigenen Projekt-Branch erstellen
2. **Entwicklungsumgebung einrichten**: Gemäß den Beitragsrichtlinien konfigurieren
3. **Aufgabe auswählen**: Eine passende Aufgabe aus den Issues auswählen
4. **Entwickeln und Testen**: Code schreiben und sicherstellen, dass Tests bestanden werden
5. **PR einreichen**: Pull Request erstellen und auf Überprüfung warten

**Beitragsanforderungen:**
- Den Coding-Standards des Projekts folgen
- Ausreichende Testabdeckung bereitstellen
- Relevante Dokumentation aktualisieren
- Klare Commit-Nachrichten verwenden

---

**Keine Antwort gefunden?** 

Bitte suchen Sie in [GitHub Issues](https://github.com/your-org/tfdi-converter/issues) oder erstellen Sie ein neues Problem, wir werden so schnell wie möglich antworten! 🚁✨

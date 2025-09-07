# 🙋 Häufig gestellte Fragen (FAQ)

## 📥 Installation

### Q1: Was sind die Systemmindestanforderungen?
**A:** 
- **Betriebssystem**: Windows 10/11, macOS 10.15+, Linux
- **Python-Version**: 3.8+ (Empfohlen: 3.9 oder höher)
- **Arbeitsspeicher**: Mindestens 4 GB RAM (empfohlen 8 GB+)
- **Speicherplatz**: Mindestens 2 GB verfügbarer Speicherplatz
- **MSFS-Version**: Microsoft Flight Simulator 2020 oder 2024

### Q2: Welche Python-Versionen werden unterstützt?
**A:** Es werden Python 3.8 und höhere Versionen unterstützt. Für optimale Leistung und Kompatibilität wird die Verwendung von Python 3.9 oder 3.10 empfohlen.

### Q3: Werden Administratorrechte benötigt?
**A:** Ja, unter Windows sind Administratorrechte erforderlich, um auf das MSFS-Installationsverzeichnis zuzugreifen und Datendateien zu schreiben.

### Q4: Kann die Installation in einer virtuellen Umgebung erfolgen?
**A:** Es wird dringend empfohlen, eine virtuelle Umgebung (z. B. venv oder conda) zu verwenden, um Abhängigkeiten zu isolieren und Konflikte mit anderen Python-Projekten zu vermeiden.

## ⚙️ Konfiguration

### Q5: Wie erhalte ich gültige AIRAC-Daten?
**A:** Sie müssen einen der folgenden Dienste abonnieren:
- **Navigraph**: Bietet weltweit vollständige Navigationsdaten (Empfohlen)
- **Aerosoft NavDataPro**: Für Europa und ausgewählte Regionen
- **Jeppesen**: Kommerzieller Navigationsdatendienst

### Q6: Was ist der AIRAC-Zyklus? Wie oft muss er aktualisiert werden?
**A:** AIRAC (Aeronautical Information Regulation and Control) ist der internationale Standard-Aktualisierungszyklus für Luftfahrtinformationen und wird alle 28 Tage aktualisiert. Es wird empfohlen, sich an den realen AIRAC-Zyklus zu halten.

### Q7: Wo sollen die Datendateien abgelegt werden?
**A:** 
```
Empfohlene Verzeichnisstruktur:
C:/Nav-data/
├── input/          # Eingabedateien der Rohdaten
│   ├── AIRAC2024-01/
│   └── ...
├── output/         # Konvertierte PMDG-Formatdateien
└── backup/         # Datensicherung
```

### Q8: Wie überprüfe ich, ob die Konfiguration korrekt ist?
**A:** Führen Sie den integrierten Konfigurationsprüfbefehl aus:
```bash
python verify_config.py --check-all
```

## 🔄 Nutzung

### Q9: Wie lange dauert der Konvertierungsprozess?
**A:** Abhängig von Datenmenge und Systemleistung:
- **Kleine Datensätze** (Einzelner Flughafen): 1-2 Minuten
- **Regionale Datensätze**: 5-15 Minuten  
- **Globale Datensätze**: 30-60 Minuten

### Q10: Können nur Daten für bestimmte Regionen konvertiert werden?
**A:** Ja, regionale Filterung wird unterstützt:
```bash
python converter.py --region ZSPD --include-sids --include-stars
```

### Q11: Wie sichere ich bestehende Daten?
**A:** Vor der Konvertierung wird automatisch eine Sicherung erstellt; eine manuelle Sicherung ist ebenfalls möglich:
```bash
python backup_tool.py --create-backup --date-suffix
```

### Q12: Wo werden die konvertierten Daten gespeichert?
**A:** 
- **Standardspeicherort**: `%LOCALAPPDATA%/Lockheed Martin/Prepar3D v5/PMDG/Nav Data/`
- **MSFS Steam-Version**: `C:/Users/[Benutzername]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalCache/PMDG/`
- **Microsoft Store-Version**: Ähnlich wie die Steam-Version, aber mit anderer ID

## ✈️ Kompatibilität

### Q13: Welche PMDG-Flugzeuge werden unterstützt?
**A:** 
- ✅ **PMDG 737-600/700/800/900** (Alle Serien)
- ✅ **PMDG 777-300ER**
- ✅ **PMDG 777F** (Frachterversion)
- 🔄 **PMDG 747-8** (Unterstützung ist geplant)

### Q14: Ist es mit MSFS 2024 kompatibel?
**A:** Ja, es ist vollständig mit Microsoft Flight Simulator 2024 kompatibel. Stellen Sie sicher, dass Sie die neueste Version des Konvertierungstools verwenden.

### Q15: Kann es gleichzeitig mit anderen Navigationsdatentools verwendet werden?
**A:** Die gleichzeitige Verwendung mehrerer Navigationsdatentools wird nicht empfohlen, da dies zu Datenkonflikten führen kann. Sichern Sie vor der Verwendung und entfernen Sie die Daten anderer Tools.

### Q16: Werden Drittanbieter-Flughafen-Add-ons unterstützt?
**A:** Ja, aber es muss sichergestellt werden, dass:
- Das Drittanbieter-Flughafen-Add-on standardmäßige ICAO-Codes verwendet
- Die Navigationsdaten Informationen zu diesem Flughafen enthalten
- Das Flughafen-Add-on mit PMDG-Flugzeugen kompatibel ist

## 🌍 Daten

### Q17: Daten für welche Regionen werden unterstützt?
**A:** Hauptabgedeckte Regionen:
- ✅ **Gesamtes chinesisches Festland** (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- ✅ **Hongkong, Macau** (VH, VM)
- ✅ **Region Taiwan** (RC)
- ✅ **Teile Südostasiens** (VT, VH, WS)
- ⚠️ **Andere Regionen** (Datenqualität kann begrenzt sein)

### Q18: Wie ist die Datengenauigkeit?
**A:** 
- **AIRAC-Standard**: Hält sich streng an die Standards der Internationalen Zivilluftfahrt-Organisation (ICAO)
- **Genauigkeitsgrad**: Unterstützt Koordinaten mit 8 Dezimalstellen Genauigkeit
- **Validierungsmechanismus**: Integrierte mehrstufige Datenvalidierung und Integritätsprüfung
- **Update-Frequenz**: Folgt dem offiziellen AIRAC-Update-Zyklus

### Q19: Wie überprüfe ich die Datenintegrität?
**A:** Verwenden Sie das integrierte Validierungstool:
```bash
python validate_data.py --comprehensive --output-report
```

### Q20: Enthalten die Daten chinesische Inhalte?
**A:** Ja, Chinesisch wird unterstützt:
- Chinesische und englische Flughafennamen
- Chinesische und englische Navigationspunktkennungen
- Lokalisierte Verfahrensnamen

## 🔧 Technisches

### Q21: Wie aktiviere ich den Debug-Modus?
**A:** 
```bash
python converter.py --debug --verbose --log-file=debug.log
```

### Q22: Wo befinden sich die Logdateien?
**A:** 
- **Standardspeicherort**: `./logs/converter_[Datum].log`
- **Debug-Log**: `./logs/debug_[Datum].log`
- **Fehler-Log**: `./logs/error_[Datum].log`

### Q23: Wie optimiere ich die Konvertierungsleistung?
**A:** 
- SSD-Speicher verwenden
- Arbeitsspeicher auf über 8 GB erhöhen
- Mehrprozessverarbeitung aktivieren: `--parallel=4`
- Unnötige Hintergrundprogramme schließen

### Q24: Wird die Befehlszeilen-Stapelverarbeitung unterstützt?
**A:** Ja, eine vollständige Befehlszeilenschnittstelle wird unterstützt:
```bash
# Stapelkonvertierung
python converter.py --batch --config-file=batch_config.json

# Geplante Aufgaben
python scheduler.py --schedule-weekly --auto-update
```

## 🆘 Hilfe erhalten

### Q25: Wie erhalte ich Unterstützung bei Problemen?
**A:** 
1.  **Logdateien überprüfen** - Um spezifische Fehlermeldungen zu verstehen
2.  **Dokumentation prüfen** - Relevante Abschnitte lesen
3.  **Nach bekannten Problemen suchen** - Siehe [GitHub Issues](https://github.com/nav-data/docs/issues)
4.  **Neues Problem melden** - Fügen Sie vollständige Log- und Systeminformationen bei
5.  **Community-Diskussionen** - Beteiligen Sie sich an [GitHub Discussions](https://github.com/nav-data/docs/discussions)

### Q26: Wie melde ich einen Bug?
**A:** Bitte melden Sie Bugs in den GitHub Issues und fügen Sie Folgendes bei:
- Detaillierte Fehlerbeschreibung
- Vollständige Fehler-Logdateien
- Informationen zur Systemumgebung
- Schritte zur Reproduktion
- Erwartetes Ergebnis vs. tatsächliches Ergebnis

### Q27: Kann ich Code beitragen?
**A:** Beiträge sind herzlich willkommen! Bitte beachten Sie:
- [Beitragsrichtlinien](contributing.md)
- [Codestandards](contributing.md#代码规范)
- [Einreichungsprozess](contributing.md#提交流程)

---

## 🔍 Keine Antwort gefunden?

Sollte Ihre Frage nicht in dieser Liste aufgeführt sein, gehen Sie bitte wie folgt vor:

1.  📖 Siehe [Leitfaden zur Fehlerbehebung](troubleshooting.md)
2.  🔍 Verwenden Sie die Suchfunktion oben auf der Seite
3.  💬 Stellen Sie eine Frage in den [GitHub Discussions](https://github.com/nav-data/docs/discussions)
4.  📧 Senden Sie eine E-Mail an: support@nav-data.org

Wir werden diese FAQ kontinuierlich aktualisieren. Vielen Dank für Ihr Feedback und Ihre Vorschläge!
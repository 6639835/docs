# 📜 Lizenzinformationen

## MIT-Lizenz

Das **Nav-data**-Projekt ist unter der MIT-Lizenz quelloffen veröffentlicht, einer einfachen und permissiven Open-Source-Lizenz.

### Volltext der Lizenz

```
MIT License

Copyright (c) 2025 Justin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🔍 Lizenzinterpretation

### ✅ Sie dürfen
- **Kommerzielle Nutzung** - Diese Software in einem kommerziellen Umfeld verwenden
- **Modifikation** - Den Quellcode der Software ändern
- **Distribution** - Die ursprüngliche oder modifizierte Software verbreiten
- **Private Nutzung** - Die Software für private Zwecke verwenden
- **Patentnutzung** - Patentansprüche nutzen, die im Besitz eines Mitwirkenden sind

### ⚠️ Nutzungsbedingungen
- **Lizenz enthalten** - Die ursprüngliche Lizenz und der Copyright-Hinweis müssen in allen Kopien der Software enthalten sein
- **Copyright-Hinweis enthalten** - Der ursprüngliche Copyright-Hinweis muss beibehalten werden

### ❌ Einschränkungen
- **Haftung** - Die Software-Autoren übernehmen keine Haftung
- **Gewährleistung** - Die Software wird ohne jegliche Form von Gewährleistung bereitgestellt

## 📋 Lizenzen von Drittanbieter-Abhängigkeiten

Nav-data verwendet die folgenden quelloffenen Bibliotheken, die jeweils ihre eigenen Lizenzen haben:

### Python-Standardbibliothek
- **Python** - [PSF License](https://docs.python.org/3/license.html)

### Datenverarbeitungsbibliotheken
- **pandas** - BSD 3-Clause License
- **numpy** - BSD License
- **sqlite3** - Public Domain

### Wissenschaftliche Berechnungsbibliotheken
- **pygeomag** - MIT License

### Benutzeroberflächenbibliotheken
- **tqdm** - MIT License + MPL-2.0 License

### Dateiverarbeitungsbibliotheken
- **chardet** - LGPL 2.1 License

### HTTP-Bibliotheken
- **requests** - Apache 2.0 License

### Vollständige Abhängigkeitsliste

```yaml
核心依赖:
  pandas: ">=1.3.0"     # BSD 3-Clause
  requests: ">=2.26.0"  # Apache 2.0
  tqdm: ">=4.62.0"      # MIT + MPL-2.0
  chardet: ">=4.0.0"    # LGPL 2.1
  ratelimit: ">=2.2.1"  # MIT
  pygeomag: ">=0.9.0"   # MIT

开发依赖:
  pytest: ">=6.0.0"     # MIT
  flake8: ">=4.0.0"     # MIT
  black: ">=22.0.0"     # MIT
  mypy: ">=0.910"       # MIT
```

### Lizenzkompatibilität

Alle Lizenzen der Drittanbieter-Abhängigkeiten sind mit der MIT-Lizenz kompatibel, was Folgendes sicherstellt:
- Rechtmäßigkeit der kommerziellen Nutzung
- Freiheit der Distribution
- Minimale rechtliche Einschränkungen

## ⚖️ Rechtliche Hinweise

### Haftungsausschluss

**Das Nav-data Projekt ist ausschließlich für die Flugsimulation bestimmt. Bitte beachten Sie die folgenden wichtigen Hinweise:**

#### 🛫 Nutzungsbeschränkungen
- **Nur für Simulatoren** - Diese Software und die von ihr generierten Navigationsdaten sind ausschließlich für Flugsimulatoren bestimmt.
- **Nicht für reale Navigation** - Die Nutzung für die Navigation realer Luftfahrzeuge ist untersagt.
- **Bildungszwecke** - Geeignet für Bildungs-, Trainings- und Unterhaltungszwecke.

#### 📊 Datenquellen
- **Drittanbieterdaten** - Navigationsdaten stammen aus öffentlich zugänglichen Drittanbieterquellen.
- **Datengenauigkeit** - Die Vollständigkeit, Genauigkeit oder Aktualität der Daten wird nicht garantiert.
- **Verantwortung des Benutzers** - Der Benutzer muss die Eignung der Daten selbst überprüfen.

#### 🚫 Haftungsbeschränkung
Die Entwickler und Mitwirkenden dieser Software **übernehmen keinerlei Haftung**, einschließlich, aber nicht beschränkt auf:
- Verluste aufgrund von Datenfehlern
- Auswirkungen durch Softwarefehler
- Probleme, die durch unsachgemäße Verwendung entstehen
- Probleme mit der Genauigkeit von Drittanbieterdaten

### Konforme Nutzung

#### 📋 Richtlinien zur Datennutzung
1.  **Lokale Gesetze einhalten** - Stellen Sie sicher, dass Sie die Gesetze und Vorschriften Ihrer Region einhalten.
2.  **Datenquellen respektieren** - Beachten Sie die Nutzungsbedingungen der ursprünglichen Datenanbieter.
3.  **Nicht-kommerzielle Einschränkungen** - Einige Datenquellen können Beschränkungen für die nicht-kommerzielle Nutzung haben.
4.  **Quellennachweis** - Geben Sie die Datenquellen und Software-Autoren entsprechend an.

#### 🔒 Sichere Nutzung
1.  **Daten sichern** - Sichern Sie die ursprünglichen Navigationsdaten vor der Verwendung.
2.  **Test und Validierung** - Testen Sie umfassend vor dem kritischen Einsatz.
3.  **Versionsmanagement** - Verwenden Sie stabile Versionen für wichtige Anwendungen.
4.  **Updates überwachen** - Beachten Sie zeitnah Sicherheitsupdates und Fehlerbehebungen.

## 🤝 Mitwirkendenvereinbarung

### Beitragslizenzierung
Indem Sie Code zum Nav-data Projekt beitragen, stimmen Sie zu:

1.  **Lizenzgewährung** - Ihr Beitrag wird unter der MIT-Lizenz veröffentlicht.
2.  **Urheberrechtszuweisung** - Das Urheberrecht des Beitrags wird dem Projekt zugewiesen.
3.  **Originalität** - Sie bestätigen, dass der Beitrag Ihr Originalwerk ist.
4.  **Rechteinhaber** - Sie besitzen die rechtliche Befugnis, diese Rechte zu gewähren.

### Urheberrechtszuordnung
- **Originalautoren** - Nav-data Entwicklungsteam
- **Mitwirkende** - Alle Code-Mitwirkenden behalten ihre Urheberschaft an ihren Beiträgen.
- **Kollektives Urheberrecht** - Das Projekt als Ganzes wird von allen Mitwirkenden gemeinsam gehalten.

## 📞 Rechtsberatung

### Problem melden
Wenn Sie Lizenz- oder rechtliche Konformitätsprobleme feststellen, gehen Sie bitte wie folgt vor:

1.  **Sofort melden** - Melden Sie dies über GitHub Issues.
2.  **Detaillierte Beschreibung** - Geben Sie konkrete rechtliche Bedenken an.
3.  **Projektbetreuer kontaktieren** - Wenden Sie sich direkt an die Projektbetreuer.
4.  **Professionellen Rat einholen** - Suchen Sie bei Bedarf professionelle Rechtsberatung.

### Kommerzielle Beratung
Für kommerzielle Nutzung oder großflächige Bereitstellung:

1.  **Risikobewertung** - Eine interne rechtliche Risikobewertung wird empfohlen.
2.  **Compliance-Prüfung** - Stellen Sie sicher, dass die Compliance-Anforderungen Ihrer Organisation erfüllt sind.
3.  **Fachliche Meinung** - Ziehen Sie die Konsultation eines Anwalts für geistiges Eigentum in Betracht.
4.  **Maßgeschneiderte Lizenzierung** - Kontaktieren Sie uns für spezielle Lizenzvereinbarungen.

## 🔗 Verwandte Ressourcen

### Lizenzinformationen
- [Volltext der MIT-Lizenz](https://opensource.org/licenses/MIT)
- [Vergleich von Open-Source-Lizenzen](https://choosealicense.com/)
- [GPL-Kompatibilitätsrichtlinien](https://www.gnu.org/licenses/license-compatibility.html)

### Compliance-Richtlinien
- [Best Practices für Open-Source-Compliance in Unternehmen](https://www.linuxfoundation.org/resources/open-source-compliance-program)
- [Risikomanagement für geistiges Eigentum](https://www.wipo.int/sme/en/ip_business/trade_secrets/trade_secrets.htm)

### Vorschriften für Luftfahrtdaten
- [ICAO Anhang 15 - Luftfahrtinformationsdienste](https://www.icao.int/safety/aviation-medicine/library/Documents/ICAO_Annex_15.pdf)
- [FAA Datenverwendungsrichtlinie](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/library/policy/)

---

**Letzte Aktualisierung**: 24. Dezember 2024

**Hinweis**: Dieses Dokument dient ausschließlich zu Informationszwecken und stellt keine Rechtsberatung dar. Bei spezifischen rechtlichen Fragen konsultieren Sie bitte einen Fachanwalt.
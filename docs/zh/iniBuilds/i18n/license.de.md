# 📜 Lizenzinformationen

## MIT-Lizenz

Das **Nav-data** Projekt ist unter der MIT-Lizenz quelloffen, einer prägnanten und liberalen Open-Source-Lizenz.

### Volltext der Lizenz

```
MIT License

Copyright (c) 2025 Yuzuriha

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
- **Kommerzielle Nutzung** - Die Software in einem kommerziellen Umfeld nutzen
- **Modifizieren** - Den Quellcode der Software ändern
- **Verbreiten** - Die ursprüngliche oder modifizierte Software verbreiten
- **Private Nutzung** - Die Software für persönliche Zwecke verwenden
- **Patentnutzung** - Patentansprüche, die einem Mitwirkenden gehören, nutzen

### ⚠️ Nutzungsbedingungen
- **Lizenz beifügen** - Die Originallizenz und den Copyright-Hinweis in allen Kopien der Software enthalten
- **Copyright-Hinweis beibehalten** - Den ursprünglichen Copyright-Hinweis beibehalten

### ❌ Einschränkungen
- **Haftung** - Die Autoren der Software übernehmen keine Haftung
- **Gewährleistung** - Die Software bietet keinerlei Gewährleistung

## 📋 Lizenzen für Drittanbieter-Abhängigkeiten

Nav-data verwendet die folgenden Open-Source-Bibliotheken, die jeweils ihre eigenen Lizenzen haben:

### Python Standardbibliothek
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
Kernabhängigkeiten:
  pandas: ">=1.3.0"     # BSD 3-Clause
  requests: ">=2.26.0"  # Apache 2.0
  tqdm: ">=4.62.0"      # MIT + MPL-2.0
  chardet: ">=4.0.0"    # LGPL 2.1
  ratelimit: ">=2.2.1"  # MIT
  pygeomag: ">=0.9.0"   # MIT

Entwicklungsabhängigkeiten:
  pytest: ">=6.0.0"     # MIT
  flake8: ">=4.0.0"     # MIT
  black: ">=22.0.0"     # MIT
  mypy: ">=0.910"       # MIT
```

### Lizenzkompatibilität

Die Lizenzen aller Drittanbieter-Abhängigkeiten sind mit der MIT-Lizenz kompatibel und gewährleisten:
- Die Legalität der kommerziellen Nutzung
- Die Freiheit der Verbreitung
- Minimale rechtliche Einschränkungen

## ⚖️ Rechtliche Hinweise

### Haftungsausschluss

**Das Nav-data Projekt ist ausschließlich für die Verwendung in der Flugsimulation bestimmt. Bitte beachten Sie die folgenden wichtigen Hinweise:**

#### 🛫 Nutzungsbeschränkungen
- **Nur für Simulatornutzung** - Diese Software und die von ihr generierten Navigationsdaten sind ausschließlich für Flugsimulatoren bestimmt
- **Keine reale Navigation** - Die Nutzung für die Navigation realer Luftfahrzeuge ist untersagt
- **Bildungszwecke** - Geeignet für Bildungs-, Schulungs- und Unterhaltungszwecke

#### 📊 Datenquellen
- **Daten Dritter** - Navigationsdaten stammen aus öffentlichen Datenquellen Dritter
- **Datengenauigkeit** - Die Vollständigkeit, Genauigkeit oder Aktualität der Daten wird nicht garantiert
- **Nutzerverantwortung** - Der Nutzer ist selbst für die Überprüfung der Anwendbarkeit der Daten verantwortlich

#### 🚫 Haftungsbeschränkung
Die Entwickler und Mitwirkenden dieser Software **übernehmen keinerlei Haftung**, einschließlich, aber nicht beschränkt auf:
- Verluste aufgrund von Datenfehlern
- Auswirkungen durch Softwarefehler
- Probleme, die durch unsachgemäße Nutzung entstehen
- Probleme mit der Genauigkeit von Drittanbieterdaten

### Konforme Nutzung

#### 📋 Richtlinien zur Datennutzung
1. **Lokale Gesetze einhalten** - Stellen Sie sicher, dass die lokalen Gesetze und Vorschriften Ihrer Region eingehalten werden
2. **Datenquellen respektieren** - Halten Sie die Nutzungsbedingungen der ursprünglichen Datenanbieter ein
3. **Nicht-kommerzielle Einschränkungen** - Einige Datenquellen können Beschränkungen für die nicht-kommerzielle Nutzung haben
4. **Quellenangabe** - Geben Sie die Datenquellen und Softwareautoren angemessen an

#### 🔒 Sichere Nutzung
1. **Daten sichern** - Sichern Sie die ursprünglichen Navigationsdaten vor der Verwendung
2. **Test und Validierung** - Führen Sie vor kritischer Nutzung umfassende Tests durch
3. **Versionsverwaltung** - Verwenden Sie stabile Versionen für wichtige Anwendungen
4. **Updates überwachen** - Verfolgen Sie Sicherheitsupdates und Korrekturen zeitnah

## 🤝 Mitwirkendenvereinbarung

### Beitrags-Lizenz
Durch das Beitragen von Code zum Nav-data Projekt stimmen Sie Folgendem zu:

1. **Lizenzgewährung** - Ihr Beitrag wird unter der MIT-Lizenz veröffentlicht
2. **Copyright-Zuschreibung** - Das Copyright des Beitrags wird dem Projekt zugeschrieben
3. **Originalität** - Sie bestätigen, dass Ihr Beitrag Ihr Originalwerk ist
4. **Rechteinhaberschaft** - Sie besitzen die rechtliche Befugnis, diese Rechte zu gewähren

### Copyright-Zuschreibung
- **Originalautoren** - Nav-data Entwicklungsteam
- **Mitwirkende** - Alle Code-Mitwirkenden behalten die Autorenschaft ihrer Beiträge
- **Kollektives Copyright** - Das Projekt als Ganzes gehört allen Mitwirkenden gemeinsam

## 📞 Rechtsberatung

### Problem melden
Wenn Sie Lizenz- oder rechtliche Compliance-Probleme feststellen, gehen Sie bitte wie folgt vor:

1. **Sofort melden** - Über GitHub Issues melden
2. **Detaillierte Beschreibung** - Geben Sie konkrete rechtliche Bedenken an
3. **Maintainer kontaktieren** - Wenden Sie sich direkt an die Projekt-Maintainer
4. **Professionellen Rat** - Suchen Sie bei Bedarf professionelle Rechtsberatung

### Kommerzielle Beratung
Für die kommerzielle Nutzung oder den großflächigen Einsatz:

1. **Risikobewertung** - Eine interne rechtliche Risikobewertung wird empfohlen
2. **Compliance-Prüfung** - Stellen Sie sicher, dass die Compliance-Anforderungen Ihrer Organisation erfüllt sind
3. **Professionelle Meinung** - Erwägen Sie die Konsultation eines Anwalts für geistiges Eigentum
4. **Benutzerdefinierte Lizenz** - Kontaktieren Sie uns für spezielle Lizenzvereinbarungen

## 🔗 Verwandte Ressourcen

### Lizenzinformationen
- [Vollständiger Text der MIT-Lizenz](https://opensource.org/licenses/MIT)
- [Vergleich von Open-Source-Lizenzen](https://choosealicense.com/)
- [GPL-Kompatibilitätsleitfaden](https://www.gnu.org/licenses/license-compatibility.html)

### Compliance-Leitfäden
- [Best Practices für die Open-Source-Compliance in Unternehmen](https://www.linuxfoundation.org/resources/open-source-compliance-program)
- [Risikomanagement für geistiges Eigentum](https://www.wipo.int/sme/en/ip_business/trade_secrets/trade_secrets.htm)

### Vorschriften für Luftfahrtdaten
- [ICAO Anhang 15 - Aeronautische Informationsdienste](https://www.icao.int/safety/aviation-medicine/library/Documents/ICAO_Annex_15.pdf)
- [FAA Richtlinie zur Datennutzung](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/library/policy/)

---

**Zuletzt aktualisiert**: 24. Dezember 2024

**Hinweis**: Dieses Dokument dient nur zu Informationszwecken und stellt keine Rechtsberatung dar. Bei spezifischen rechtlichen Fragen wenden Sie sich bitte an einen qualifizierten Anwalt.
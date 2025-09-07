# 📜 Lizenzinformationen

## MIT-Lizenz

Das **Nav-data**-Projekt ist Open Source unter der MIT-Lizenz, einer einfachen, freizügigen Open-Source-Lizenz.

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

## 🔍 Erläuterung der Lizenz

### ✅ Sie dürfen
- **Kommerzielle Nutzung** - Die Software in einem kommerziellen Umfeld nutzen
- **Modifizieren** - Den Software-Quellcode modifizieren
- **Verteilen** - Die ursprüngliche oder modifizierte Software verteilen
- **Private Nutzung** - Die Software für persönliche Zwecke nutzen
- **Patentnutzung** - Patentrechte nutzen, die im Besitz eines Mitwirkenden sind

### ⚠️ Nutzungsbedingungen
- **Lizenz beifügen** - Muss die originäre Lizenz und den Copyright-Hinweis in allen Kopien der Software enthalten
- **Copyright-Hinweis beibehalten** - Muss den originären Copyright-Hinweis beibehalten

### ❌ Einschränkungen
- **Haftung** - Der Software-Autor übernimmt keine Haftung
- **Gewährleistung** - Die Software bietet keinerlei Gewährleistung

## 📋 Lizenzen für Drittanbieter-Abhängigkeiten

Nav-data verwendet die folgenden Open-Source-Bibliotheken, die jeweils ihre eigenen Lizenzen haben:

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

Die Lizenzen aller Drittanbieter-Abhängigkeiten sind mit der MIT-Lizenz kompatibel, was Folgendes gewährleistet:
- Die Rechtmäßigkeit der kommerziellen Nutzung
- Die Freiheit der Verbreitung
- Minimale rechtliche Einschränkungen

## ⚖️ Rechtliche Hinweise

### Haftungsausschluss

**Das Nav-data-Projekt ist ausschließlich für die Flugsimulation bestimmt. Bitte beachten Sie die folgenden wichtigen Hinweise:**

#### 🛫 Nutzungsbeschränkungen
- **Nur für Simulatornutzung** - Diese Software und die von ihr generierten Navigationsdaten sind ausschließlich für Flugsimulatoren bestimmt
- **Keine reale Navigation** - Die Verwendung für die Navigation in realen Luftfahrzeugen ist untersagt
- **Bildungszwecke** - Geeignet für Bildungs-, Trainings- und Unterhaltungszwecke

#### 📊 Datenquellen
- **Daten Dritter** - Navigationsdaten stammen aus öffentlichen Drittanbieter-Datenquellen
- **Datenrichtigkeit** - Die Vollständigkeit, Richtigkeit oder Aktualität der Daten wird nicht garantiert
- **Nutzerverantwortung** - Der Nutzer ist selbst für die Überprüfung der Anwendbarkeit der Daten verantwortlich

#### 🚫 Haftungsbeschränkung
Die Entwickler und Mitwirkenden dieser Software **übernehmen keinerlei Haftung**, einschließlich, aber nicht beschränkt auf:
- Verluste, die durch Datenfehler entstehen
- Auswirkungen, die durch Softwarefehler verursacht werden
- Probleme, die durch unsachgemäße Nutzung entstehen
- Probleme mit der Genauigkeit von Drittanbieter-Daten

### Einhaltung der Vorschriften

#### 📋 Richtlinien zur Datennutzung
1. **Einhaltung lokaler Gesetze** - Sicherstellen der Einhaltung der Gesetze und Vorschriften Ihrer Region
2. **Respektierung der Datenquellen** - Die Nutzungsbedingungen der ursprünglichen Datenanbieter einhalten
3. **Nicht-kommerzielle Einschränkungen** - Einige Datenquellen können nicht-kommerzielle Nutzungsbeschränkungen haben
4. **Quellenangabe** - Datenquellen und Software-Autor angemessen nennen

#### 🔒 Sichere Nutzung
1. **Daten sichern** - Sichern Sie die ursprünglichen Navigationsdaten vor der Verwendung
2. **Testen und Validieren** - Vor kritischer Nutzung gründlich testen
3. **Versionsverwaltung** - Verwenden Sie stabile Versionen für wichtige Anwendungen
4. **Updates überwachen** - Sicherheitsupdates und Korrekturen zeitnah verfolgen

## 🤝 Mitwirkendenvereinbarung

### Lizenzierung der Beiträge
Indem Sie Code zum Nav-data-Projekt beitragen, stimmen Sie Folgendem zu:

1. **Lizenzgewährung** - Ihr Beitrag wird unter der MIT-Lizenz veröffentlicht
2. **Urheberrechtszuweisung** - Das Urheberrecht des Beitrags wird dem Projekt zugewiesen
3. **Originalität** - Sie bestätigen, dass der Beitrag Ihr Originalwerk ist
4. **Rechteinhaber** - Sie besitzen die rechtliche Befugnis, diese Rechte zu gewähren

### Urheberrechtszuordnung
- **Ursprünglicher Autor** - Nav-data Entwicklungsteam
- **Mitwirkende** - Alle Code-Mitwirkenden behalten die Autorschaft ihrer Beiträge
- **Kollektives Urheberrecht** - Das Projekt als Ganzes wird von allen Mitwirkenden gemeinsam besessen

## 📞 Rechtsberatung

### Meldung von Problemen
Wenn Sie Lizenz- oder rechtliche Compliance-Probleme feststellen, bitten wir Sie:

1. **Sofort melden** - Über GitHub Issues melden
2. **Detailliert beschreiben** - Genaue rechtliche Bedenken angeben
3. **Maintainer kontaktieren** - Das Projekt-Wartungsteam direkt kontaktieren
4. **Professionellen Rat** - Bei Bedarf professionelle Rechtsberatung einholen

### Kommerzielle Beratung
Für kommerzielle Nutzung oder großflächige Bereitstellung:

1. **Risikobewertung** - Es wird empfohlen, eine interne rechtliche Risikobewertung durchzuführen
2. **Compliance-Prüfung** - Sicherstellen, dass die Compliance-Anforderungen Ihrer Organisation erfüllt werden
3. **Professionelle Meinung** - Ziehen Sie in Betracht, einen Anwalt für geistiges Eigentum zu konsultieren
4. **Angepasste Lizenzierung** - Für spezielle Lizenzvereinbarungen kontaktieren Sie uns bitte

## 🔗 Verwandte Ressourcen

### Lizenzinformationen
- [Volltext der MIT-Lizenz](https://opensource.org/licenses/MIT)
- [Vergleich von Open-Source-Lizenzen](https://choosealicense.com/)
- [GPL-Kompatibilitätsleitfaden](https://www.gnu.org/licenses/license-compatibility.html)

### Compliance-Richtlinien
- [Best Practices für Open-Source-Compliance in Unternehmen](https://www.linuxfoundation.org/resources/open-source-compliance-program)
- [Risikomanagement für geistiges Eigentum](https://www.wipo.int/sme/en/ip_business/trade_secrets/trade_secrets.htm)

### Vorschriften für Luftfahrtdaten
- [ICAO Anhang 15 - Flugnavigationsdienste](https://www.icao.int/safety/aviation-medicine/library/Documents/ICAO_Annex_15.pdf)
- [FAA Datenverwendungsrichtlinie](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/library/policy/)

---

**Zuletzt aktualisiert**: 24. Dezember 2024

**Hinweis**: Dieses Dokument dient nur zu Informationszwecken und stellt keine Rechtsberatung dar. Bei spezifischen rechtlichen Fragen konsultieren Sie bitte einen Fachanwalt.
# 🧭 Benutzerhandbuch

Willkommen beim Nav-data Tool zur Umwandlung von Luftfahrtnavigationsdaten! Dieser Leitfaden wird Ihnen helfen, dieses professionelle System zur Verarbeitung von Luftfahrtnavigationsdaten vollständig zu beherrschen.

## 📋 Schnelle Navigation

### 🚀 Erste Schritte
- [**Installationsanleitung**](./installation.md) - Systemanforderungen und vollständiger Installationsprozess
- [**Konfigurationsanleitung**](./configuration.md) - Datenquellenkonfiguration und AIRAC-Zykluseinstellungen
- [**Nutzungshinweise**](./usage.md) - Der vollständige Prozess der Datenkonvertierung und Bereitstellung

### 🆘 Hilfe und Support
- [**Häufig gestellte Fragen (FAQ)**](../faq.md) - Antworten auf die wichtigsten Fragen der Benutzer
- [**Fehlerbehebung**](../troubleshooting.md) - Problemdiagnose und Lösungen

### 🔧 Fortgeschrittene Themen
- [**Architekturbeschreibung**](../architecture.md) - Systemarchitektur und technische Implementierung

## 🎯 Projektübersicht

Nav-data ist ein professionelles Tool zur Konvertierung von Luftfahrtnavigationsdaten, das speziell entwickelt wurde, um fortschrittlichen Add-ons für Microsoft Flight Simulator Echtzeit- und genaue Navigationsdaten zu liefern.

### 🏆 Kernvorteile

#### ✈️ Professionelle Datengenauigkeit
- **AIRAC-Standard-Kompatibilität**: Streng nach dem 28-tägigen AIRAC-Zyklus der ICAO
- **Hochpräzise Koordinaten**: Unterstützt geografische Koordinaten mit 8 Dezimalstellen Genauigkeit
- **Magnetische Deklinationsberechnung**: Echtzeitberechnung unter Verwendung des WMM (World Magnetic Model)
- **Unterstützung mehrerer Standards**: Kompatibel mit ARINC 424-, X-Plane- und NAIP-Datenformaten

#### 🔄 Intelligente Datenverarbeitung
- **Multiquellen-Datenfusion**: Integration verschiedener Datenquellen wie NAIP, X-Plane, CIFP
- **Intelligente Datenvalidierung**: Automatische Erkennung und Behebung von Datenintegritätsproblemen
- **Unterstützung für inkrementelle Updates**: Effizienter Mechanismus für differenzielle Datenaktualisierungen
- **Parallelverarbeitungsoptimierung**: Parallele Verarbeitung großer Datensätze durch mehrere Prozesse

#### 🛫 Breite Kompatibilität
- **MSFS 2020 & 2024**: Volle Unterstützung für beide Versionen des Microsoft Flight Simulator
- **Mehrere Vertriebsplattformen**: Kompatibel mit Steam-Version, Microsoft Store-Version, Xbox-Version
- **Top-Add-on-Unterstützung**: Speziell optimiert für High-End-Add-ons von iniBuilds und PMDG

### 📊 Unterstützte Navigationsdatentypen

| Datentyp | Englischer Name | Standardcode | Beschreibung |
|---------|-----------------|--------------|--------------|
| Flughafeninformationen | Airports | APT | ICAO-Code des Flughafens, Koordinaten, magnetische Deklination |
| Landebahndaten | Runways | RWY | Landebahnkennung, Richtung, Länge, Oberflächenart |
| VHF-Funknavigationshilfen | VHF Navaids | VHF | Frequenzen von VOR-, DME-, TACAN-Funknavigationshilfen |
| NDB-Funknavigationshilfen | NDB Navaids | NDB | Frequenz und Reichweite von ungerichteten Funkfeuern |
| Wegpunkte | Waypoints | FIX | Wegpunktkoordinaten und Gebietsklassifizierung |
| Luftstraßen-Systeme | Airways | AWY | Hoch- und Tiefflugrouten sowie Verbindungsbeziehungen |
| Abflugverfahren | SIDs | SID | Standard-Instrumentenabflugverfahren |
| Anflugverfahren | STARs | STAR | Standard-Terminal-Anflugrouten |
| Anflugprozeduren | Approaches | IAP | Alle Arten von Instrumentenanflugverfahren |
| Landesysteme | ILS/GLS | GS | Leitinformationen für Instrumentenlandesysteme |

### 🌍 Abgedeckte Regionen

Dieses Tool deckt hauptsächlich die folgenden ICAO-Regionen ab:

- **Festlandchina**: ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH
- **Südostasien**: VM (Vietnam), VH (Hongkong)
- **Nordostasien**: RK (Teile Südkoreas)

### 🎯 Unterstützte Flugzeug-Add-ons

#### iniBuilds-Reihe
- **Airbus A350-900** - Langstrecken-Großraumflugzeug
- **Airbus A350-900ULR** - Ultralangstreckenversion
- **Airbus A350-1000** - Verlängerte Version

#### PMDG-Reihe
- **Boeing 737-600/700/800/900** - Schmalrumpf-Flugzeugserie
- **Boeing 777-300ER** - Großraum-Langstreckenflugzeug
- **Boeing 777F** - Frachtversion

## 🚦 Erste Schritte

### Überprüfung der Voraussetzungen

Bevor Sie beginnen, stellen Sie bitte sicher, dass Sie Folgendes besitzen:

- [ ] **Microsoft Flight Simulator 2020 oder 2024** (beliebige Version)
- [ ] **Python 3.8+** Entwicklungsumgebung
- [ ] **Gültiges Navigationsdatenabonnement** (Navigraph oder Aerosoft NavDataPro)
- [ ] **Ziel-Flugzeug-Add-on** (iniBuilds A350 oder PMDG 737/777)
- [ ] **Administratorrechte** (für den Dateisystemzugriff)

### 📖 Empfohlener Lernpfad

1. **📥 Umgebung vorbereiten** → [Installationsanleitung](./installation.md)
2. **⚙️ Daten konfigurieren** → [Konfigurationsanleitung](./configuration.md)
3. **🔄 Konvertierung durchführen** → [Nutzungshinweise](./usage.md)
4. **🛠️ Tiefgreifendes Verständnis** → [Architekturbeschreibung](../architecture.md)

## ⚡ Schnellstart

Wenn Sie bereits Erfahrung haben, können Sie direkt springen zu:

```bash
# Abhängigkeiten schnell installieren
pip install -r requirements.txt

# Konvertierungstool ausführen
python XP2INI_NDB_Converter.py
```

## 📞 Hilfe erhalten
- **💡 Funktionsvorschläge**: Siehe [Beitragsrichtlinien](../contributing.md)

---

Bereit? Beginnen Sie Ihre Nav-data Reise mit der [Installationsanleitung](./installation.md)! 🚀
# 📥 Installationsanleitung

<div class="installation-header">
  <div class="header-content">
    <h2>Nav-data iniBuilds A350 Installationsassistent</h2>
    <p>Diese Anleitung führt Sie durch den vollständigen Installationsprozess des Nav-data Luftnavigationsdaten-Konvertierungstools und stellt sicher, dass Ihre Systemumgebung korrekt konfiguriert ist.</p>
  </div>
  <div class="progress-indicator">
    <div class="step active" data-step="1">
      <div class="step-number">1</div>
      <div class="step-label">Systemprüfung</div>
    </div>
    <div class="step" data-step="2">
      <div class="step-number">2</div>
      <div class="step-label">Python-Umgebung</div>
    </div>
    <div class="step" data-step="3">
      <div class="step-number">3</div>
      <div class="step-label">MSFS-Konfiguration</div>
    </div>
    <div class="step" data-step="4">
      <div class="step-number">4</div>
      <div class="step-label">Überprüfung abgeschlossen</div>
    </div>
  </div>
</div>

## 🖥️ Systemanforderungen

### 📋 Konfigurationsanforderungen im Vergleich

<div class="requirements-comparison">
  <div class="req-column">
    <h4>🟡 Mindestanforderungen</h4>
    <div class="req-card minimal">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Betriebssystem</strong>
          <span>Windows 10 1903+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Python-Version</strong>
          <span>Python 3.8+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>Arbeitsspeicher</strong>
          <span>8GB RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Speicherplatz</strong>
          <span>2GB freier Speicherplatz</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Netzwerk</strong>
          <span>Breitband-Internetverbindung</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="req-column">
    <h4>🟢 Empfohlene Anforderungen</h4>
    <div class="req-card recommended">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Betriebssystem</strong>
          <span>Windows 11 22H2+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Python-Version</strong>
          <span>Python 3.11+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>Arbeitsspeicher</strong>
          <span>16GB+ RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Speicherplatz</strong>
          <span>5GB+ freier Speicherplatz</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Netzwerk</strong>
          <span>Stabile Hochgeschwindigkeitsverbindung</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.installation-header {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.05));
  border: 1px solid rgba(30, 64, 175, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.header-content h2 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
}

.header-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1.6;
}

.progress-indicator {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;
}

.progress-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.requirements-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.req-column h4 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.req-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.req-card.minimal {
  border-color: rgba(245, 158, 11, 0.3);
}

.req-card.recommended {
  border-color: rgba(34, 197, 94, 0.3);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
}

.req-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.req-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.req-item:last-child {
  border-bottom: none;
}

.req-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.req-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.req-details strong {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.req-details span {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .progress-indicator {
    flex-direction: column;
    gap: 1rem;
  }
  
  .progress-indicator::before {
    display: none;
  }
  
  .step {
    flex-direction: row;
    justify-content: flex-start;
  }
  
  .requirements-comparison {
    grid-template-columns: 1fr;
  }
}
</style>

### ✈️ Erforderliche Software

- [**Microsoft Flight Simulator**](https://www.flightsimulator.com/) (Version 2020 oder 2024)
- [**Python 3.8+**](https://www.python.org/downloads/) Entwicklungsumgebung
- Ziel-Flugzeug-Add-on: [**iniBuilds A350**](https://www.inibuilds.com/) oder [**PMDG 737/777**](https://pmdg.com/)

### 📊 Datenquellen-Abonnement (wählen Sie eines)

- [**Navigraph**](https://navigraph.com/) - Empfohlen, zeitnahe Datenaktualisierungen
- [**Aerosoft NavDataPro**](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) - Preiswerte Alternative

## 🐍 Python-Umgebungsinstallation

### Schritt 1: Python herunterladen und installieren

1. Besuchen Sie die [offizielle Python-Website](https://www.python.org/downloads/)
2. Laden Sie die neueste Python 3.11-Version herunter (empfohlen)
3. **Wichtig**: Aktivieren Sie während der Installation die Option "Add Python to PATH"

```powershell
# Python-Installation überprüfen
python --version
# Sollte anzeigen: Python 3.11.x

# pip-Installation überprüfen
pip --version
# Sollte pip-Versionsinformationen anzeigen
```

### Schritt 2: Projekt-Abhängigkeiten installieren

```bash
# Projekt lokal klonen oder herunterladen
cd /path/to/nav-data

# Erforderliche Abhängigkeitspakete installieren
pip install -r requirements.txt
```

#### Erläuterung der Abhängigkeitspakete

| Paketname | Version | Zweck |
|------|------|------|
| `pandas` | ≥1.3.0 | Datenverarbeitung und -analyse |
| `requests` | ≥2.26.0 | HTTP-Anfragen-Verarbeitung |
| `tqdm` | ≥4.62.0 | Fortschrittsanzeige |
| `chardet` | ≥4.0.0 | Zeichenkodierungs-Erkennung |
| `ratelimit` | ≥2.2.1 | API-Anfragebeschränkung |
| `pygeomag` | ≥0.9.0 | Berechnung der magnetischen Deklination |

### Schritt 3: Installation überprüfen

```python
# Wichtige Abhängigkeiten testen
python -c "import pandas, sqlite3, pygeomag; print('Alle Abhängigkeiten erfolgreich installiert!')"
```

## 🎮 Microsoft Flight Simulator-Konfiguration

### 🔍 MSFS-Installationsort bestätigen

Je nach Ihrer MSFS-Version und Kaufquelle befindet sich der Community-Ordner an folgenden Stellen:

#### MSFS 2020

**Microsoft Store-Version**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam-Version**
```
%APPDATA%\Microsoft Flight Simulator\Packages\Community
```

#### MSFS 2024

**Microsoft Store-Version**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam-Version**
```
%APPDATA%\Microsoft Flight Simulator 2024\Packages\Community
```

### 🛠️ Skript zur schnellen Pfaderkennung

Erstellen Sie das folgende PowerShell-Skript, um Ihre MSFS-Installation automatisch zu erkennen:

```powershell
# Als detect_msfs.ps1 speichern
$paths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator\Packages\Community",
    "$env:LOCALAPPDATA\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator 2024\Packages\Community"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "MSFS Community-Ordner gefunden: $path" -ForegroundColor Green
    }
}
```

## ✈️ Flugzeug-Add-on-Überprüfung

### iniBuilds A350-Überprüfung

Überprüfen Sie, ob das folgende Verzeichnis existiert:

```
[Community-Ordner]\inibuilds-aircraft-a350\Config\NavigationData\
```

### PMDG-Add-on-Überprüfung

Überprüfen Sie, ob die folgenden Verzeichnisse existieren (abhängig von Ihrem PMDG-Flugzeugmodell):

```
[Community-Ordner]\pmdg-aircraft-737\Config\Navdata\
[Community-Ordner]\pmdg-aircraft-738\Config\Navdata\
[Community-Ordner]\pmdg-aircraft-77w\Config\Navdata\
[Community-Ordner]\pmdg-aircraft-77f\Config\Navdata\
```

## 📁 Projektverzeichnisstruktur

Nach der Installation sollte Ihr Projektverzeichnis wie folgt aussehen:

```
nav-data/
├── XP2INI_NDB_Converter.py    # Hauptkonvertierungsprogramm
├── requirements.txt           # Python-Abhängigkeitsliste
├── README.md                 # Projektbeschreibung
├── LICENSE                   # Lizenzdatei
│
├── Datenverarbeitungsmodule/
│   ├── airports.py           # Flughafen-Datenverarbeitung
│   ├── runways.py           # Landebahn-Datenverarbeitung
│   ├── vhfs.py              # VHF-Navigationsfunkfeuer-Verarbeitung
│   ├── ndbs.py              # NDB-Navigationsfunkfeuer-Verarbeitung
│   ├── enroute_waypoints.py # Wegpunktverarbeitung (Enroute)
│   ├── terminal_waypoints.py# Terminal-Wegpunktverarbeitung
│   ├── sids.py              # SID-Verfahrensverarbeitung
│   ├── stars.py             # STAR-Verfahrensverarbeitung
│   ├── iaps.py              # Anflugverfahrensverarbeitung
│   ├── airways.py           # Luftstraßenverarbeitung
│   └── gs.py                # Gleitpfad-Verarbeitung
│
└── docs/                    # Dokumentationsverzeichnis
    ├── guide/               # Benutzerhandbuch
    └── ...                  # Andere Dokumente
```

## 🔧 Umgebungsvariablen-Konfiguration (optional)

Für eine bequemere Nutzung können Sie die folgenden Umgebungsvariablen festlegen:

```powershell
# MSFS Community-Pfad festlegen
setx MSFS_COMMUNITY_PATH "C:\Users\[Benutzername]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community"

# Nav-data Arbeitsverzeichnis festlegen
setx NAVDATA_WORKSPACE "C:\path\to\nav-data"
```

## ✅ Installationsprüfliste

Bestätigen Sie nach Abschluss der Installation die folgenden Punkte:

- [ ] Python 3.8+ korrekt installiert und zum PATH hinzugefügt
- [ ] Alle Abhängigkeitspakete erfolgreich installiert
- [ ] MSFS Community-Ordner gefunden
- [ ] Ziel-Flugzeug-Add-on installiert und überprüft
- [ ] Projektdateien in das lokale Verzeichnis heruntergeladen
- [ ] Ausreichend Speicherplatz vorhanden (mindestens 2GB)

## 🚨 Häufige Installationsprobleme

### Python-bezogene Probleme

**Problem**: `'python' ist kein interner oder externer Befehl`
```bash
# Lösung: Python neu installieren und sicherstellen, dass "Add to PATH" aktiviert ist,
# oder Python manuell zum System-PATH hinzufügen.
```

**Problem**: `ModuleNotFoundError: No module named 'xxx'`
```bash
# Lösung: Abhängigkeiten neu installieren
pip install --upgrade -r requirements.txt
```

### Berechtigungsprobleme

**Problem**: Zugriff auf MSFS-Ordner verweigert
```powershell
# Lösung: Führen Sie PowerShell/Eingabeaufforderung als Administrator aus
# Rechtsklick → "Als Administrator ausführen"
```

### Pfadprobleme

**Problem**: Flugzeug-Add-on-Verzeichnis nicht gefunden
```bash
# Lösung:
# 1. Bestätigen Sie, dass das Flugzeug-Add-on korrekt installiert ist
# 2. Starten Sie das Flugzeug einmal in MSFS, um die notwendigen Verzeichnisse zu erstellen
# 3. Überprüfen Sie, ob das Add-on im korrekten Community-Ordner liegt
```

## 🔄 Update-Hinweise

Um Nav-data auf die neueste Version zu aktualisieren:

```bash
# Neuesten Code herunterladen (pull)
git pull origin main

# Abhängigkeitspakete aktualisieren
pip install --upgrade -r requirements.txt
```

---

Installation abgeschlossen! Als Nächstes lesen Sie bitte die [**Konfigurationsanleitung**](./configuration.md), um die Datenquellen und den AIRAC-Zyklus einzurichten.
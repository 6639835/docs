# 📥 Guide d'installation

<div class="installation-header">
  <div class="header-content">
    <h2>Assistant d'installation Nav-data iniBuilds A350</h2>
    <p>Ce guide vous accompagnera tout au long du processus d'installation de l'outil de conversion de données de navigation aérienne Nav-data, en veillant à la bonne configuration de votre environnement système.</p>
  </div>
  <div class="progress-indicator">
    <div class="step active" data-step="1">
      <div class="step-number">1</div>
      <div class="step-label">Vérification système</div>
    </div>
    <div class="step" data-step="2">
      <div class="step-number">2</div>
      <div class="step-label">Environnement Python</div>
    </div>
    <div class="step" data-step="3">
      <div class="step-number">3</div>
      <div class="step-label">Configuration MSFS</div>
    </div>
    <div class="step" data-step="4">
      <div class="step-number">4</div>
      <div class="step-label">Validation terminée</div>
    </div>
  </div>
</div>

## 🖥️ Configuration système requise

### 📋 Comparaison des exigences de configuration

<div class="requirements-comparison">
  <div class="req-column">
    <h4>🟡 Configuration minimale</h4>
    <div class="req-card minimal">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Système d'exploitation</strong>
          <span>Windows 10 1903+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Version de Python</strong>
          <span>Python 3.8+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>Mémoire vive</strong>
          <span>8 Go RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Espace de stockage</strong>
          <span>2 Go d'espace disponible</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Réseau</strong>
          <span>Connexion internet haut débit</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="req-column">
    <h4>🟢 Configuration recommandée</h4>
    <div class="req-card recommended">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Système d'exploitation</strong>
          <span>Windows 11 22H2+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Version de Python</strong>
          <span>Python 3.11+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>Mémoire vive</strong>
          <span>16 Go+ RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Espace de stockage</strong>
          <span>5 Go+ d'espace disponible</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Réseau</strong>
          <span>Connexion stable et rapide</span>
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

### ✈️ Logiciels requis

- [**Microsoft Flight Simulator**](https://www.flightsimulator.com/) (versions 2020 ou 2024)
- [**Python 3.8+**](https://www.python.org/downloads/) environnement de développement
- Modules complémentaires d'avion cible : [**iniBuilds A350**](https://www.inibuilds.com/) ou [**PMDG 737/777**](https://pmdg.com/)

### 📊 Abonnements aux sources de données (choisir l'un d'eux)

- [**Navigraph**](https://navigraph.com/) - Recommandé, mises à jour des données rapides
- [**Aerosoft NavDataPro**](https://www.erosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) - Alternative économique

## 🐍 Installation de l'environnement Python

### Étape 1 : Télécharger et installer Python

1.  Visitez le [site officiel de Python](https://www.python.org/downloads/)
2.  Téléchargez la dernière version de Python 3.11 (recommandé)
3.  **Important** : Lors de l'installation, cochez l'option "Add Python to PATH"

```powershell
# Vérifier l'installation de Python
python --version
# Devrait afficher : Python 3.11.x

# Vérifier l'installation de pip
pip --version
# Devrait afficher les informations de version de pip
```

### Étape 2 : Installer les dépendances du projet

```bash
# Cloner ou télécharger le projet localement
cd /path/to/nav-data

# Installer les paquets de dépendances requis
pip install -r requirements.txt
```

#### Description des paquets de dépendances

| Nom du paquet | Version | Utilisation |
|------|------|------|
| `pandas` | ≥1.3.0 | Traitement et analyse de données |
| `requests` | ≥2.26.0 | Gestion des requêtes HTTP |
| `tqdm` | ≥4.62.0 | Affichage de la barre de progression |
| `chardet` | ≥4.0.0 | Détection de l'encodage des caractères |
| `ratelimit` | ≥2.2.1 | Limitation des requêtes API |
| `pygeomag` | ≥0.9.0 | Calcul de la déclinaison magnétique |

### Étape 3 : Vérifier l'installation

```python
# Tester les dépendances critiques
python -c "import pandas, sqlite3, pygeomag; print('Toutes les dépendances ont été installées avec succès !')"
```

## 🎮 Configuration de Microsoft Flight Simulator

### 🔍 Vérifier l'emplacement d'installation de MSFS

Selon votre version de MSFS et votre canal d'achat, l'emplacement du dossier Community est le suivant :

#### MSFS 2020

**Version Microsoft Store**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Version Steam**
```
%APPDATA%\Microsoft Flight Simulator\Packages\Community
```

#### MSFS 2024

**Version Microsoft Store**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Version Steam**
```
%APPDATA%\Microsoft Flight Simulator 2024\Packages\Community
```

### 🛠️ Script de détection rapide de chemin

Créez le script PowerShell suivant pour détecter automatiquement votre installation MSFS :

```powershell
# Enregistrer sous detect_msfs.ps1
$paths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator\Packages\Community",
    "$env:LOCALAPPDATA\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator 2024\Packages\Community"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "Dossier Community de MSFS trouvé: $path" -ForegroundColor Green
    }
}
```

## ✈️ Vérification des modules complémentaires d'avion

### Vérification iniBuilds A350

Vérifiez l'existence des répertoires suivants :

```
[dossier Community]\inibuilds-aircraft-a350\Config\NavigationData\
```

### Vérification des modules complémentaires PMDG

Vérifiez l'existence des répertoires suivants (selon votre modèle d'avion PMDG) :

```
[dossier Community]\pmdg-aircraft-737\Config\Navdata\
[dossier Community]\pmdg-aircraft-738\Config\Navdata\
[dossier Community]\pmdg-aircraft-77w\Config\Navdata\
[dossier Community]\pmdg-aircraft-77f\Config\Navdata\
```

## 📁 Structure du répertoire du projet

Une fois l'installation terminée, la structure de votre répertoire de projet devrait ressembler à ceci :

```
nav-data/
├── XP2INI_NDB_Converter.py    # Programme de conversion principal
├── requirements.txt           # Liste des dépendances Python
├── README.md                 # Description du projet
├── LICENSE                   # Fichier de licence
│
├── 数据处理模块/
│   ├── airports.py           # Traitement des données d'aéroports
│   ├── runways.py           # Traitement des données de pistes
│   ├── vhfs.py              # Traitement des balises de navigation VHF
│   ├── ndbs.py              # Traitement des balises de navigation NDB
│   ├── enroute_waypoints.py # Traitement des waypoints en route
│   ├── terminal_waypoints.py# Traitement des waypoints terminaux
│   ├── sids.py              # Traitement des procédures SID
│   ├── stars.py             # Traitement des procédures STAR
│   ├── iaps.py              # Traitement des procédures d'approche
│   ├── airways.py           # Traitement des voies aériennes
│   └── gs.py                # Traitement du guidage d'atterrissage
│
└── docs/                    # Répertoire de documentation
    ├── guide/               # Guide d'utilisation
    └── ...                  # Autres documents
```

## 🔧 Configuration des variables d'environnement (Facultatif)

Pour une utilisation plus pratique, vous pouvez définir les variables d'environnement suivantes :

```powershell
# Définir le chemin du dossier MSFS Community
setx MSFS_COMMUNITY_PATH "C:\Users\[Nom d'utilisateur]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community"

# Définir le répertoire de travail Nav-data
setx NAVDATA_WORKSPACE "C:\path\to\nav-data"
```

## ✅ Liste de vérification de l'installation

Après l'installation, veuillez confirmer les points suivants :

- [ ] Python 3.8+ est correctement installé et ajouté au PATH
- [ ] Tous les paquets de dépendances ont été installés avec succès
- [ ] Le dossier MSFS Community a été localisé
- [ ] Le module complémentaire d'avion cible est installé et vérifié
- [ ] Les fichiers du projet ont été téléchargés dans le répertoire local
- [ ] Un espace disque suffisant est disponible (au moins 2 Go)

## 🚨 Problèmes d'installation courants

### Problèmes liés à Python

**Problème** : `'python' n'est pas reconnu en tant que commande interne ou externe`
```bash
# Solution : Réinstallez Python en vous assurant de cocher l'option "Add to PATH"
# Ou ajoutez manuellement Python au PATH système
```

**Problème** : `ModuleNotFoundError: No module named 'xxx'`
```bash
# Solution : Réinstallez les dépendances
pip install --upgrade -r requirements.txt
```

### Problèmes de permissions

**Problème** : Impossible d'accéder au dossier MSFS
```powershell
# Solution : Exécutez PowerShell/l'invite de commande en tant qu'administrateur
# Clic droit → "Exécuter en tant qu'administrateur"
```

### Problèmes de chemin

**Problème** : Impossible de trouver le répertoire du module complémentaire d'avion
```bash
# Solution :
# 1. Confirmez que le module complémentaire d'avion est correctement installé
# 2. Lancez l'avion une fois dans MSFS pour créer les répertoires nécessaires
# 3. Vérifiez si le module complémentaire se trouve dans le bon dossier Community
```

## 🔄 Instructions de mise à jour

Pour mettre à jour Nav-data vers la dernière version :

```bash
# Récupérer le dernier code
git pull origin main

# Mettre à jour les paquets de dépendances
pip install --upgrade -r requirements.txt
```

---

Installation terminée ! Veuillez maintenant consulter les [**Instructions de configuration**](./configuration.md) pour définir la source de données et le cycle AIRAC.
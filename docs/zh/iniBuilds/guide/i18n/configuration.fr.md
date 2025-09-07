# ⚙️ Guide de configuration

Ce guide détaillera comment configurer les sources de données, les paramètres de chemin d'accès et la gestion des cycles AIRAC de l'outil de conversion Nav-data.

## 📊 Aperçu des sources de données

L'outil Nav-data prend en charge plusieurs formats standards de l'industrie pour les sources de données de navigation aérienne, garantissant l'autorité et la précision des données.

### 🔄 Formats de données pris en charge

| Format de données | Source | Usage | Standard |
|-------------------|--------|-------|----------|
| **NAIP CSV**      | Navigraph/Aerosoft | Aéroports, pistes, routes | ARINC 424 |
| **X-Plane DAT**   | X-Plane 11/12 | Points de cheminement, aides à la navigation | Format X-Plane |
| **CIFP**          | Données de procédures officielles | SID/STAR/Approches | ARINC 424 |
| **SQLite DB**     | Fenix A320 | Données de référence NDB | Format personnalisé |

## 🗃️ Fichiers de données requis

### 📁 Structure de répertoire de base

Créez la structure de répertoires suivante pour organiser vos données de navigation :

```
NavData_Workspace/
├── NAIP/                    # Répertoire des fichiers CSV NAIP
│   ├── AD_HP.csv           # Données de base des aéroports
│   ├── RWY.csv             # Informations sur les pistes
│   ├── RWY_DIRECTION.csv   # Données de direction des pistes
│   └── RTE_SEG.csv         # Données de segments de route
│
├── X-Plane/                 # Fichiers de données X-Plane
│   ├── earth_fix.dat       # Données de points de cheminement
│   └── earth_nav.dat       # Données d'aides à la navigation
│
├── CIFP/                    # Répertoire des données de procédures CIFP
│   ├── ZBAA.dat            # Aéroport international de Pékin-Capitale
│   ├── ZSSS.dat            # Aéroport international de Shanghai-Pudong
│   └── [其他机场].dat      # Fichiers de procédures pour chaque aéroport
│
├── NDBs/                    # Base de données NDB
│   └── nd.db3              # Base de données de navigation Fenix
│
└── Output/                  # Répertoire de sortie
    └── e_dfd_PMDG.s3db     # Base de données convertie
```

## 🌐 Guide d'acquisition des sources de données

### 1️⃣ Données Navigraph (recommandé)

**Étapes d'acquisition :**
1.  Visitez le [site officiel de Navigraph](https://navigraph.com/) et enregistrez un compte
2.  Abonnez-vous à Navigraph Unlimited ou au service Charts + Data
3.  Téléchargez Navigraph FMS Data Manager
4.  Dans FMS Data Manager, sélectionnez le format "Generic"
5.  Téléchargez et décompressez le paquet de données NAIP

**Acquisition des fichiers NAIP :**
```
Navigraph FMS Data Manager →
Generic →
NAIP Format →
Télécharger le cycle AIRAC actuel
```

### 2️⃣ Aerosoft NavDataPro

**Étapes d'acquisition :**
1.  Achetez [Aerosoft NavDataPro](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/)
2.  Téléchargez l'application NavDataPro
3.  Connectez-vous et téléchargez les données au format NAIP
4.  Décompressez dans le répertoire NAIP

### 3️⃣ Fichiers de données X-Plane

**Options de source :**
-   **Option A** : Copier depuis le répertoire d'installation de X-Plane 11/12
    ```
    [X-Plane安装目录]/Resources/default data/earth_fix.dat
    [X-Plane安装目录]/Resources/default data/earth_nav.dat
    ```

-   **Option B** : Obtenir à partir des données d'exemple de ce projet
    ```
    [项目目录]/sample_data/earth_fix.dat
    [项目目录]/sample_data/earth_nav.dat
    ```

### 4️⃣ Données de procédures CIFP

**Méthodes d'acquisition :**
-   **Canal officiel** : Téléchargement gratuit depuis le site web de la FAA
-   **Tiers** : Données CIFP incluses avec Navigraph
-   **Fourni par le projet** : Fichiers CIFP pré-traités pour la région chinoise

### 5️⃣ Base de données NDB

**Voie d'acquisition :**
```bash
# Copier depuis le répertoire d'installation de Fenix A320
[MSFS Community]/fenix-a320/Resources/NavData/nd.db3
```

## 🛠️ Assistant de configuration des chemins

### Mode de configuration automatique

Lors de l'exécution de l'outil de conversion, le programme vous guidera à travers la configuration des chemins d'accès :

```bash
python XP2INI_NDB_Converter.py
```

**Processus de configuration :**
1.  **Sélection du répertoire de base** : Sélectionnez le répertoire racine contenant tous les fichiers de données
2.  **Détection automatique** : Le programme scanne et valide automatiquement les différents types de fichiers de données
3.  **Confirmation des chemins d'accès** : Affiche les chemins de fichiers détectés pour votre confirmation
4.  **Ajout manuel** : Pour les fichiers non trouvés, spécifiez manuellement le chemin

### 🔍 Liste de vérification des chemins d'accès

| Type de données | Chemin du fichier | Statut de validation |
|-----------------|-------------------|----------------------|
| Données d'aéroport NAIP | `NAIP/AD_HP.csv` | ✅ |
| Données de piste NAIP | `NAIP/RWY.csv` | ✅ |
| Directions de piste NAIP | `NAIP/RWY_DIRECTION.csv` | ✅ |
| Données de route NAIP | `NAIP/RTE_SEG.csv` | ✅ |
| Points de cheminement X-Plane | `X-Plane/earth_fix.dat` | ✅ |
| Aides à la navigation X-Plane | `X-Plane/earth_nav.dat` | ✅ |
| Répertoire de procédures CIFP | `CIFP/` | ✅ |
| Base de données NDB | `NDBs/nd.db3` | ✅ |
| Table de consultation ICAO | `ICAO.txt` | ✅ |

## 📅 Gestion des cycles AIRAC

### 🗓️ Description des cycles AIRAC

**AIRAC (Aeronautical Information Regulation And Control)** est un cycle de mise à jour de 28 jours pour les informations aéronautiques, établi par l'Organisation de l'aviation civile internationale (OACI).

-   **Fréquence de mise à jour** : Tous les 28 jours
-   **Synchronisation mondiale** : Heure de mise à jour uniforme dans le monde entier
-   **Importance** : Garantit que les pilotes et les contrôleurs utilisent les mêmes données de navigation

### 📊 Vérification du cycle actuel

```python
# Vérifier le cycle AIRAC actuel
import datetime

def get_current_airac():
    # Date de référence AIRAC 2023 : 5 janvier 2023
    base_date = datetime.date(2023, 1, 5)
    today = datetime.date.today()
    
    days_diff = (today - base_date).days
    cycle_number = (days_diff // 28) + 1
    
    return f"AIRAC {today.year}{cycle_number:02d}"

print(f"Cycle actuel : {get_current_airac()}")
```

### 🔄 Stratégie de mise à jour des données

#### Utilisateurs à jour en temps réel
-   **Fréquence de mise à jour** : Chaque cycle AIRAC
-   **Source recommandée** : Navigraph (mises à jour automatiques)
-   **Scénarios applicables** : Vol en ligne, usage professionnel

#### Utilisateurs occasionnels
-   **Fréquence de mise à jour** : Tous les 3 à 6 mois
-   **Source recommandée** : Aerosoft NavDataPro
-   **Scénarios applicables** : Vol hors ligne, usage de loisir

## 🎛️ Options de configuration avancées

### 📍 Configuration du filtrage régional

Personnalisez la portée du traitement des données pour différentes régions :

```python
# Configurer les codes régionaux ICAO à traiter
SUPPORTED_ICAO_REGIONS = {
    'ZB',  # Région du nord de la Chine
    'ZS',  # Région de l'est de la Chine
    'ZG',  # Région du sud de la Chine
    'ZJ',  # Région de l'est de la Chine
    'ZY',  # Région du centre de la Chine
    'ZL',  # Région du sud-ouest de la Chine
    'ZU',  # Région de l'ouest de la Chine
    'ZW',  # Région du nord-ouest de la Chine
    'ZP',  # Région du nord de la Chine
    'ZH',  # Région du sud de la Chine
    'VM',  # Région du Vietnam
    'VH',  # Région de Hong Kong
    'RK'   # Région de Corée du Sud
}
```

### 🎯 Configuration de la précision

Définissez la précision des coordonnées et des calculs :

```python
# Configuration de la précision des coordonnées
COORDINATE_PRECISION = 8  # Nombre de décimales
MAGNETIC_VARIATION_PRECISION = 1  # Précision de la déclinaison magnétique

# Conversion d'unités de distance
NM_TO_KM = 1.852  # Milles nautiques en kilomètres
KM_TO_NM = 0.539957  # Kilomètres en milles nautiques
```

### ⚡ Configuration d'optimisation des performances

```python
# Configuration du traitement parallèle
MULTIPROCESS_WORKERS = 4  # Nombre de processus parallèles
BATCH_SIZE = 1000  # Taille du lot (batch)
DATABASE_TIMEOUT = 30  # Délai d'attente de la base de données (secondes)

# Optimisation de la mémoire
ENABLE_CACHE = True  # Activer le cache de coordonnées
CACHE_SIZE_LIMIT = 10000  # Limite de taille du cache
```

## 🔧 Modèle de fichier de configuration

Créez un fichier `config.json` pour enregistrer les configurations courantes :

```json
{
  "data_sources": {
    "naip_path": "C:/NavData/NAIP",
    "xplane_path": "C:/NavData/X-Plane", 
    "cifp_path": "C:/NavData/CIFP",
    "ndb_path": "C:/NavData/NDBs/nd.db3",
    "icao_txt": "C:/NavData/ICAO.txt"
  },
  "output": {
    "database_path": "C:/NavData/Output/e_dfd_PMDG.s3db"
  },
  "processing": {
    "regions": ["ZB", "ZS", "ZJ", "ZG", "ZY", "ZL", "ZU", "ZW", "ZP", "ZH"],
    "coordinate_precision": 8,
    "enable_multiprocessing": true,
    "workers": 4
  },
  "airac": {
    "current_cycle": "2410",
    "auto_update_check": true
  }
}
```

## ✅ Validation de la configuration

### 🔍 Script de vérification de la configuration

```python
#!/usr/bin/env python3
"""Script de validation de la configuration"""

import os
import json
from pathlib import Path

def validate_config():
    """Valide l'intégrité du fichier de configuration"""
    
    required_files = {
        'NAIP/AD_HP.csv': 'Données d\'aéroport',
        'NAIP/RWY.csv': 'Données de piste', 
        'NAIP/RWY_DIRECTION.csv': 'Directions de piste',
        'NAIP/RTE_SEG.csv': 'Données de route',
        'X-Plane/earth_fix.dat': 'Points de cheminement',
        'X-Plane/earth_nav.dat': 'Aides à la navigation',
        'NDBs/nd.db3': 'Base de données NDB'
    }
    
    print("🔍 Démarrage de la validation de la configuration...")
    
    for file_path, description in required_files.items():
        if os.path.exists(file_path):
            print(f"✅ {description}: {file_path}")
        else:
            print(f"❌ {description}: {file_path} (Fichier introuvable)")
    
    print("🔍 Validation terminée !")

if __name__ == "__main__":
    validate_config()
```

## 🚨 Problèmes de configuration courants

### Problèmes de chemin d'accès
```bash
# Problème : Le chemin contient des caractères chinois, ce qui provoque une erreur d'encodage
# Solution : Utilisez un chemin en anglais et évitez les caractères spéciaux

# Exemple de chemin incorrect
C:/导航数据/NAIP/

# Exemple de chemin correct
C:/NavData/NAIP/
```

### Problèmes de permissions de fichier
```powershell
# Problème : Aucune permission de lecture
# Solution : Exécutez en tant qu'administrateur ou modifiez les permissions du fichier
icacls "C:\NavData" /grant Everyone:F /T
```

### Problèmes d'intégrité des données
```bash
# Problème : Les fichiers NAIP sont incomplets
# Solution : Téléchargez à nouveau le paquet de données AIRAC complet
# Assurez-vous que tous les fichiers CSV existent et ne sont pas vides
```

---

Configuration terminée ! L'étape suivante consiste à consulter le [**Guide d'utilisation**](./usage.md) pour exécuter le processus de conversion des données.
# 🛠️ Dépannage du convertisseur de données de navigation iFly

## 🚨 Erreurs courantes et solutions

### 1. Problèmes d'installation et d'environnement

#### ❌ Version de Python incompatible

**Message d'erreur :**
```
SyntaxError: invalid syntax
TypeError: 'type' object is not subscriptable
```

**Solutions :**
1.  **Vérifier la version de Python** :
    ```bash
    python --version
    ```
2.  **Mettre à niveau vers Python 3.8+** :
    -   Windows : Télécharger la dernière version depuis python.org
    -   macOS : `brew install python`
    -   Linux : `sudo apt-get install python3.9`

#### ❌ Échec de l'installation des paquets de dépendances

**Message d'erreur :**
```
ERROR: Could not find a version that satisfies the requirement
ModuleNotFoundError: No module named 'rich'
```

**Solutions :**
1.  **Mettre à niveau pip** :
    ```bash
    python -m pip install --upgrade pip
    ```
2.  **Vider le cache et réinstaller** :
    ```bash
    pip cache purge
    pip install -r requirements.txt --no-cache-dir
    ```
3.  **Utiliser une source miroir nationale** :
    ```bash
    pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
    ```

### 2. Problèmes de fichiers et de chemins d'accès

#### ❌ Fichier de base de données Fenix introuvable

**Message d'erreur :**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
Le fichier de base de données n'existe pas ou le chemin est incorrect
```

**Solutions :**
1.  **Confirmer l'emplacement du fichier** :
    ```bash
    # Emplacement courant
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\
    ```
2.  **Utiliser un chemin absolu** : Entrer le chemin complet du fichier
3.  **Vérifier les permissions du fichier** : S'assurer que le fichier est lisible

#### ❌ Échec de la détection du chemin d'installation d'iFly

**Message d'erreur :**
```
Chemin d'installation d'iFly 737 MAX 8 introuvable
Veuillez spécifier manuellement le répertoire d'installation d'iFly
```

**Solutions :**
1.  **Saisir manuellement le chemin** :
    ```
    # Version Communauté
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Community\ifly-aircraft-737max8\
    
    # Version Marketplace
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Official\asobo-aircraft-ifly-737max8\
    ```
2.  **Vérifier la structure du chemin** : Confirmer qu'il contient le répertoire `Data\navdata\`

#### ❌ Permissions d'écriture de fichier insuffisantes

**Message d'erreur :**
```
PermissionError: [Errno 13] Permission denied
Impossible d'écrire le fichier
```

**Solutions :**
1.  **Exécuter en tant qu'administrateur** :
    -   Windows : Clic droit → "Exécuter en tant qu'administrateur"
    -   macOS/Linux : `sudo python main.py`
2.  **Modifier les permissions du fichier** :
    ```bash
    chmod 755 /path/to/ifly/directory
    ```
3.  **Vérifier si le fichier est en cours d'utilisation** : Fermer MSFS et les autres programmes associés

### 3. Problèmes de traitement des données

#### ❌ Erreur de format de fichier CSV

**Message d'erreur :**
```
pandas.errors.EmptyDataError: No columns to parse from file
UnicodeDecodeError: 'utf-8' codec can't decode
```

**Solutions :**
1.  **Vérifier l'encodage du fichier** :
    ```python
    # Convertir en UTF-8
    import chardet
    with open('file.csv', 'rb') as f:
        encoding = chardet.detect(f.read())['encoding']
    ```
2.  **Valider le format CSV** : S'assurer qu'il contient les colonnes nécessaires
3.  **Retélécharger les données** : Obtenir un nouveau fichier de données NAIP

#### ❌ Échec du calcul de la déclinaison magnétique

**Message d'erreur :**
```
geomag.GeomagnticCalculationError: Invalid date or coordinates
Une anomalie est survenue lors du calcul de la déclinaison magnétique
```

**Solutions :**
1.  **Vérifier la plage de coordonnées** :
    -   Latitude : de -90° à +90°
    -   Longitude : de -180° à +180°
2.  **Mettre à jour pygeomag** :
    ```bash
    pip install --upgrade pygeomag
    ```
3.  **Vérifier la validité de la date** : S'assurer que la date AIRAC est dans une plage raisonnable

#### ❌ Erreur de calcul du cycle AIRAC

**Message d'erreur :**
```
ValueError: Invalid AIRAC cycle calculation
Échec du calcul du cycle AIRAC
```

**Solutions :**
1.  **Vérifier l'heure du système** : S'assurer que l'heure du système est correcte
2.  **Définir manuellement le cycle** :
    ```python
    # Spécifier manuellement le cycle AIRAC
    airac_cycle = "2508"
    ```
3.  **Mettre à jour les informations de fuseau horaire** : S'assurer que les paramètres de fuseau horaire sont corrects

### 4. Problèmes de mémoire et de performance

#### ❌ Mémoire insuffisante

**Message d'erreur :**
```
MemoryError: Unable to allocate array
Mémoire insuffisante, impossible de traiter les fichiers de données volumineux
```

**Solutions :**
1.  **Augmenter la mémoire virtuelle** :
    -   Windows : Panneau de configuration → Système → Paramètres système avancés → Paramètres de performance → Mémoire virtuelle
2.  **Traitement par lots** :
    ```python
    # Lire les données par lots
    chunk_size = 1000
    for chunk in pd.read_csv(file, chunksize=chunk_size):
        process_chunk(chunk)
    ```
3.  **Fermer les autres programmes** : Libérer de la mémoire système

#### ❌ Vitesse de traitement trop lente

**Symptôme :** Le calcul de la déclinaison magnétique prend trop de temps

**Optimisations :**
1.  **Optimisation matérielle** :
    -   Utiliser un disque SSD
    -   Augmenter la RAM à 8 Go ou plus
    -   Utiliser un CPU multi-cœur
2.  **Optimisation logicielle** :
    ```python
    # Traitement parallèle
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = executor.map(calculate_declination, coordinates)
    ```
3.  **Réduire le volume de données** : Filtrer les points de cheminement inutiles

### 5. Problèmes de sortie et de validation

#### ❌ Données converties non affichées dans iFly

**Causes possibles :**
-   Format de fichier incorrect
-   Problème de règles de remplacement des données
-   Cache iFly non vidé

**Solutions :**
1.  **Vérifier le format du fichier** :
    ```bash
    # Vérifier le contenu du fichier
    head -n 10 WPNAVRTE.txt
    ```
2.  **Vider le cache iFly** :
    ```bash
    # Supprimer les fichiers de cache
    rm -rf "%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_*\LocalCache\*ifly*"
    ```
3.  **Redémarrer le simulateur** : Quitter complètement et relancer MSFS

#### ❌ Affichage anormal des points de cheminement dans le FMC

**Symptôme :** Décalage des coordonnées des points de cheminement ou type incorrect

**Étapes de vérification :**
1.  **Vérifier le format des coordonnées** :
    ```
    # Format correct
    123.45678  # Longitude (°)
    -12.34567  # Latitude (°)
    ```
2.  **Vérifier le type de point de cheminement** :
    ```
    11 - DESIGNATED_POINT (Point désigné)
    3  - VOR/DME
    2  - NDB
    ```
3.  **Valider la valeur de la déclinaison magnétique** :
    ```
    # Plage raisonnable
    -30.0 à +30.0 degrés
    ```

## 🔍 Outils de diagnostic

### 1. Analyse des journaux

**Consulter les journaux détaillés :**
```bash
# Consulter le dernier journal
tail -f converter.log

# Rechercher des messages d'erreur
grep "ERROR" converter.log
grep "Exception" converter.log
```

**Explication des niveaux de journalisation :**
-   `DEBUG` : Informations de débogage détaillées
-   `INFO` : Informations générales
-   `WARNING` : Messages d'avertissement
-   `ERROR` : Messages d'erreur
-   `CRITICAL` : Erreurs critiques

### 2. Script de validation des données

**Créer un script de validation :**
```python
import pandas as pd
import sqlite3

def validate_database(db_path):
    """Valider l'intégrité de la base de données"""
    conn = sqlite3.connect(db_path)
    
    # Vérifier les tables nécessaires
    required_tables = [
        'Airports', 'Runways', 'Navaids', 
        'Waypoints', 'Terminals', 'TerminalLegs'
    ]
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    missing_tables = set(required_tables) - set(tables)
    if missing_tables:
        print(f"Tables manquantes : {missing_tables}")
        return False
    
    print("Validation de la base de données réussie")
    return True

# Exemple d'utilisation
validate_database("path/to/nd.db3")
```

### 3. Collecte des informations système

**Créer un rapport d'informations système :**
```python
import platform
import sys
import pkg_resources

def generate_system_report():
    """Générer un rapport d'informations système"""
    report = []
    
    # Informations système
    report.append("=== Informations système ===")
    report.append(f"Système d'exploitation : {platform.system()} {platform.release()}")
    report.append(f"Architecture : {platform.machine()}")
    report.append(f"Version de Python : {sys.version}")
    
    # Paquets installés
    report.append("\n=== Paquets installés ===")
    installed_packages = [d for d in pkg_resources.working_set]
    for package in sorted(installed_packages, key=lambda x: x.key):
        report.append(f"{package.key}: {package.version}")
    
    return "\n".join(report)

# Générer le rapport
print(generate_system_report())
```

## 📋 Liste de contrôle de dépannage

### 🔧 Vérifications de base
-   [ ] Version de Python ≥ 3.8
-   [ ] Tous les paquets de dépendances sont installés
-   [ ] Le fichier de base de données Fenix existe et est lisible
-   [ ] iFly 737 MAX 8 est correctement installé
-   [ ] Espace disque suffisant (≥ 100 Mo)
-   [ ] Mémoire suffisante (≥ 4 Go)

### 📁 Validation des chemins d'accès
-   [ ] Le chemin de la base de données Fenix est correct
-   [ ] Le chemin d'installation d'iFly est correct
-   [ ] Le chemin du fichier de données CSV est correct
-   [ ] Le répertoire de sortie a les permissions d'écriture

### 📊 Vérification des données
-   [ ] Le format du fichier CSV est correct (encodage UTF-8)
-   [ ] La structure des tables de la base de données est complète
-   [ ] Les données de coordonnées sont dans une plage valide
-   [ ] Le calcul du cycle AIRAC est correct

### 🔄 Validation du traitement
-   [ ] Le fichier journal ne contient pas de messages de niveau ERROR
-   [ ] Le fichier de sortie a été généré
-   [ ] La taille du fichier est raisonnable (non nulle)
-   [ ] Les données s'affichent correctement dans iFly

## 🆘 Obtenir de l'aide

### Auto-assistance
1.  **Consulter la documentation** : Lire le guide de l'utilisateur complet
2.  **Rechercher dans les journaux** : Trouver des messages d'erreur spécifiques
3.  **Consulter la FAQ** : Examiner la foire aux questions
4.  **Reproduire le problème** : Confirmer que le problème est reproductible

### Support communautaire
1.  **GitHub Issues** : Signaler les problèmes techniques
2.  **Forums de discussion** : Participer aux discussions de la communauté
3.  **Groupes QQ/WeChat** : Échanger et obtenir des réponses en temps réel

### Lors du signalement d'un problème, veuillez fournir :
-   **Journal d'erreurs** : Le message d'erreur complet
-   **Informations système** : OS, version de Python, etc.
-   **Étapes de reproduction** : Les étapes détaillées
-   **Informations sur les fichiers** : La taille et le chemin des fichiers pertinents
-   **Captures d'écran** : Fournir des captures d'écran de l'interface si nécessaire

---

**N'oubliez pas : la plupart des problèmes ont une solution !**

En cas de difficulté, respirez profondément, puis suivez ce guide étape par étape pour le dépannage. 🔧✨
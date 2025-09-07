# 🛠️ Dépannage du convertisseur de données de navigation TFDI

## 🚨 Erreurs courantes et solutions

### 1. Problèmes d'environnement et d'installation

#### ❌ Problèmes d'environnement Python

**Message d'erreur :**
```
ModuleNotFoundError: No module named 'rich'
ImportError: No module named 'pandas'
```

**Solution :**
```bash
# 1. Vérifier la version de Python
python --version  # S'assurer que la version est ≥ 3.8

# 2. Mettre à jour pip
python -m pip install --upgrade pip

# 3. Installer les dépendances
pip install -r requirements.txt

# 4. Vérifier l'installation
python -c "import rich, pandas; print('Dépendances installées avec succès')"
```

#### ❌ Erreurs d'autorisation

**Message d'erreur :**
```
PermissionError: [Errno 13] Permission denied
Impossible de créer le répertoire de sortie
```

**Solution :**
```bash
# Windows - Exécuter en tant qu'administrateur
# Clic droit sur l'invite de commande → "Exécuter en tant qu'administrateur"

# macOS/Linux - Utiliser sudo ou modifier les permissions
sudo python converter.py
# ou
chmod 755 /path/to/output/directory
```

### 2. Problèmes d'accès à la base de données

#### ❌ Fichier de base de données introuvable

**Message d'erreur :**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
Fichier de base de données Fenix introuvable
```

**Solution :**
1.  **Vérifier l'installation de Fenix** :
    ```bash
    # Chemin courant
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\
    ```

2.  **Localiser manuellement le fichier** :
    ```bash
    # Windows
    dir /s nd.db3
    
    # macOS/Linux
    find ~ -name "nd.db3" 2>/dev/null
    ```

3.  **Régénérer la base de données** :
    -   Lancer MSFS
    -   Charger le Fenix A320
    -   Attendre que les données de navigation soient chargées

#### ❌ Base de données corrompue

**Message d'erreur :**
```
sqlite3.DatabaseError: database disk image is malformed
Le fichier de base de données est corrompu
```

**Méthode de diagnostic :**
```python
import sqlite3

def check_database_integrity(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        if result[0] == "ok":
            print("✅ Intégrité de la base de données normale")
        else:
            print(f"❌ Base de données corrompue: {result[0]}")
    except Exception as e:
        print(f"❌ Impossible d'accéder à la base de données: {e}")
    finally:
        conn.close()
```

**Solution de réparation :**
```bash
# 1. Sauvegarder la base de données corrompue
cp nd.db3 nd.db3.backup

# 2. Tenter une réparation SQLite
sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3

# 3. Si la réparation échoue, récupérer la base de données
# Supprimer le fichier et redémarrer Fenix
```

#### ❌ Structure de table de base de données incompatible

**Message d'erreur :**
```
sqlite3.OperationalError: no such table: Terminals
La base de données manque de tables nécessaires
```

**Script de validation :**
```python
def validate_database_schema(db_path):
    required_tables = [
        'Airports', 'Runways', 'Waypoints', 'Navaids',
        'Airways', 'AirwayLegs', 'Terminals', 'TerminalLegs',
        'ILSes', 'AirportLookup', 'NavaidLookup', 'WaypointLookup'
    ]
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = {row[0] for row in cursor.fetchall()}
    
    missing_tables = set(required_tables) - existing_tables
    if missing_tables:
        print(f"❌ Tables manquantes: {missing_tables}")
        return False
    
    print("✅ Validation de la structure de la base de données réussie")
    return True
```

### 3. Problèmes de mémoire et de performance

#### ❌ Mémoire insuffisante

**Message d'erreur :**
```
MemoryError: Unable to allocate array
Mémoire insuffisante, impossible de traiter les données
```

**Surveillance de l'utilisation de la mémoire :**
```python
import psutil
import gc

def monitor_memory_usage():
    memory = psutil.virtual_memory()
    print(f"Mémoire totale: {memory.total // 1024**3} GB")
    print(f"Mémoire utilisée: {memory.used // 1024**3} GB")
    print(f"Mémoire disponible: {memory.available // 1024**3} GB")
    print(f"Utilisation: {memory.percent}%")

def optimize_memory():
    # Forcer le nettoyage de la mémoire (garbage collection)
    gc.collect()
    
    # Nettoyer le cache pandas
    import pandas as pd
    pd.reset_option('all')
```

**Solution :**
```python
# 1. Réduire la taille du lot
config = ConverterConfig(
    batch_size=500,  # Réduire de la valeur par défaut 1000
    coordinate_precision=6  # Réduire la précision
)

# 2. Activer le traitement en flux
def process_large_table_streaming(table_name):
    chunk_size = 1000
    offset = 0
    
    while True:
        query = f"""
        SELECT * FROM {table_name} 
        LIMIT {chunk_size} OFFSET {offset}
        """
        
        chunk = pd.read_sql_query(query, conn)
        if chunk.empty:
            break
            
        process_chunk(chunk)
        del chunk  # Libérer la mémoire
        gc.collect()
        
        offset += chunk_size
```

#### ❌ Vitesse de traitement trop lente

**Symptôme :** Le processus de conversion reste bloqué à une certaine étape pendant une longue période

**Diagnostic de performance :**
```python
import time
import cProfile

def profile_conversion():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # Exécuter la conversion
    converter.convert(db_path, terminal_id)
    
    profiler.disable()
    profiler.dump_stats('conversion_profile.prof')

# Analyser les goulots d'étranglement de performance
# python -m cProfile -o profile.prof converter.py
# python -c "import pstats; pstats.Stats('profile.prof').sort_stats('cumulative').print_stats(10)"
```

**Suggestions d'optimisation :**
```python
# 1. Optimisation des performances SQLite
def optimize_sqlite_connection(conn):
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA cache_size=10000")
    conn.execute("PRAGMA temp_store=MEMORY")

# 2. Traitement parallèle
from concurrent.futures import ThreadPoolExecutor

def parallel_table_processing():
    tables = ['Airports', 'Runways', 'Waypoints', 'Navaids']
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for table in tables:
            future = executor.submit(process_table, table)
            futures.append(future)
        
        # Attendre que toutes les tâches soient terminées
        for future in futures:
            future.result()
```

### 4. Problèmes de conversion de données

#### ❌ Données de coordonnées anormales

**Message d'erreur :**
```
ValueError: Invalid coordinate value: latitude=91.5
Coordonnées hors limites valides
```

**Validation et réparation :**
```python
def validate_and_fix_coordinates(df):
    """Valider et réparer les données de coordonnées"""
    initial_count = len(df)
    
    # Vérifier la plage de latitude [-90, 90]
    invalid_lat = (df['Latitude'] < -90) | (df['Latitude'] > 90)
    if invalid_lat.any():
        print(f"Détecté {invalid_lat.sum()} valeurs de latitude invalides")
        df = df[~invalid_lat]
    
    # Vérifier la plage de longitude [-180, 180]
    invalid_lon = (df['Longitude'] < -180) | (df['Longitude'] > 180)
    if invalid_lon.any():
        print(f"Détecté {invalid_lon.sum()} valeurs de longitude invalides")
        df = df[~invalid_lon]
    
    removed_count = initial_count - len(df)
    if removed_count > 0:
        print(f"⚠️ Supprimé {removed_count} enregistrements de coordonnées invalides")
    
    return df
```

#### ❌ Échec de la sérialisation JSON

**Message d'erreur :**
```
TypeError: Object of type 'datetime' is not JSON serializable
Erreur de sérialisation JSON
```

**Solution :**
```python
import json
from datetime import datetime
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """Encodeur JSON personnalisé"""
    
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# Utiliser l'encodeur personnalisé
def safe_json_dump(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=CustomJSONEncoder, 
                 ensure_ascii=False, indent=2)
```

#### ❌ Problèmes d'encodage de caractères

**Message d'erreur :**
```
UnicodeDecodeError: 'utf-8' codec can't decode byte
Erreur d'encodage de caractères
```

**Solution :**
```python
import chardet

def detect_and_convert_encoding(file_path):
    """Détecter et convertir l'encodage du fichier"""
    # Détecter l'encodage
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        encoding = chardet.detect(raw_data)['encoding']
    
    print(f"Encodage détecté: {encoding}")
    
    # Convertir en UTF-8
    with open(file_path, 'r', encoding=encoding) as f:
        content = f.read()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def safe_string_handling(text):
    """Gestion sécurisée des chaînes"""
    if isinstance(text, bytes):
        # Essayer plusieurs encodages
        for encoding in ['utf-8', 'gbk', 'latin1']:
            try:
                return text.decode(encoding)
            except UnicodeDecodeError:
                continue
        # Si tous échouent, utiliser la gestion d'erreurs
        return text.decode('utf-8', errors='replace')
    return str(text)
```

### 5. Problèmes de fichiers de sortie

#### ❌ Échec de la création de l'archive

**Message d'erreur :**
```
py7zr.exceptions.Bad7zFile: not a 7z file
Échec de la création de l'archive
```

**Solution :**
```python
import py7zr
import shutil
from pathlib import Path

def safe_create_archive(source_dir, archive_path):
    """Créer une archive en toute sécurité"""
    try:
        # S'assurer que le répertoire source existe
        if not Path(source_dir).exists():
            raise FileNotFoundError(f"Répertoire source introuvable: {source_dir}")
        
        # Supprimer l'archive existante
        if Path(archive_path).exists():
            Path(archive_path).unlink()
        
        # Créer l'archive
        with py7zr.SevenZipFile(archive_path, 'w') as archive:
            archive.writeall(source_dir, ".")
        
        print(f"✅ Archive créée avec succès: {archive_path}")
        return True
        
    except Exception as e:
        print(f"❌ Échec de la création de l'archive: {e}")
        
        # Solution de repli : créer un fichier ZIP
        try:
            shutil.make_archive(
                str(Path(archive_path).with_suffix('')), 
                'zip', 
                source_dir
            )
            print("✅ Fichier de secours au format ZIP créé")
            return True
        except Exception as zip_error:
            print(f"❌ La création ZIP a également échoué: {zip_error}")
            return False
```

#### ❌ Taille de fichier anormale

**Symptôme :** Le fichier de sortie est trop petit ou trop grand

**Méthode de vérification :**
```python
def validate_output_files(output_dir):
    """Valider les fichiers de sortie"""
    expected_files = [
        'Airports.json', 'Runways.json', 'Waypoints.json',
        'Navaids.json', 'Airways.json', 'AirwayLegs.json',
        'Terminals.json', 'ILSes.json'
    ]
    
    file_info = {}
    for file_name in expected_files:
        file_path = Path(output_dir) / file_name
        if file_path.exists():
            size = file_path.stat().st_size
            file_info[file_name] = {
                'exists': True,
                'size_mb': size / 1024 / 1024,
                'empty': size == 0
            }
        else:
            file_info[file_name] = {'exists': False}
    
    # Imprimer les informations sur les fichiers
    print("📁 Vérification des fichiers de sortie:")
    for file_name, info in file_info.items():
        if info['exists']:
            if info.get('empty', False):
                print(f"⚠️ {file_name}: Fichier vide")
            else:
                print(f"✅ {file_name}: {info['size_mb']:.2f} MB")
        else:
            print(f"❌ {file_name}: Fichier manquant")
    
    return file_info
```

## 🔍 Outils de diagnostic

### 1. Vérification de l'environnement système

```python
def system_diagnostics():
    """Diagnostic de l'environnement système"""
    import platform
    import sys
    import psutil
    
    print("🔍 Diagnostic de l'environnement système")
    print("=" * 50)
    
    # Informations sur le système d'exploitation
    print(f"Système d'exploitation: {platform.system()} {platform.release()}")
    print(f"Architecture: {platform.machine()}")
    
    # Environnement Python
    print(f"Version Python: {sys.version}")
    print(f"Chemin Python: {sys.executable}")
    
    # Informations matérielles
    print(f"Nombre de cœurs CPU: {psutil.cpu_count()}")
    memory = psutil.virtual_memory()
    print(f"Mémoire totale: {memory.total // 1024**3} GB")
    print(f"Mémoire disponible: {memory.available // 1024**3} GB")
    
    # Espace disque
    disk = psutil.disk_usage('.')
    print(f"Espace disque total: {disk.total // 1024**3} GB")
    print(f"Espace disque disponible: {disk.free // 1024**3} GB")
```

### 2. Validation des paquets de dépendances

```python
def verify_dependencies():
    """Valider les paquets de dépendances"""
    required_packages = [
        'rich', 'pandas', 'py7zr', 'sqlite3'
    ]
    
    print("📦 Validation des paquets de dépendances")
    print("=" * 30)
    
    for package in required_packages:
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package}: {version}")
        except ImportError:
            print(f"❌ {package}: Non installé")
        except Exception as e:
            print(f"⚠️ {package}: Erreur - {e}")
```

### 3. Outil de surveillance des performances

```python
import time
import threading
from contextlib import contextmanager

class PerformanceMonitor:
    """Moniteur de performance"""
    
    def __init__(self):
        self.metrics = {}
        self.monitoring = False
    
    @contextmanager
    def measure(self, operation_name):
        """Mesurer le temps d'exécution de l'opération"""
        start_time = time.time()
        start_memory = psutil.virtual_memory().used
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.virtual_memory().used
            
            self.metrics[operation_name] = {
                'duration': end_time - start_time,
                'memory_delta': end_memory - start_memory
            }
    
    def start_monitoring(self):
        """Démarrer la surveillance en temps réel"""
        self.monitoring = True
        
        def monitor():
            while self.monitoring:
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                
                print(f"\r🔄 CPU: {cpu_percent:5.1f}% | "
                      f"Mémoire: {memory.percent:5.1f}% | "
                      f"Disponible: {memory.available//1024**2:,} MB", 
                      end='', flush=True)
                
                time.sleep(1)
        
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def stop_monitoring(self):
        """Arrêter la surveillance"""
        self.monitoring = False
        print()  # Saut de ligne
    
    def print_summary(self):
        """Imprimer le résumé des performances"""
        print("\n📊 Résumé des performances:")
        print("-" * 40)
        
        for operation, metrics in self.metrics.items():
            duration = metrics['duration']
            memory_mb = metrics['memory_delta'] / 1024 / 1024
            
            print(f"{operation:20s}: {duration:8.2f}s | "
                  f"{memory_mb:+8.1f}MB")

# Exemple d'utilisation
monitor = PerformanceMonitor()
monitor.start_monitoring()

with monitor.measure("Validation de la base de données"):
    validate_database(db_path)

with monitor.measure("Conversion des données"):
    convert_data()

monitor.stop_monitoring()
monitor.print_summary()
```

## 📋 Liste de contrôle du dépannage

### 🔧 Vérifications avant la conversion
- [ ] Version de Python ≥ 3.8
- [ ] Tous les paquets de dépendances sont installés et les versions sont correctes
- [ ] Le fichier de base de données Fenix existe et est intact
- [ ] Mémoire disponible suffisante (4 Go+ recommandés)
- [ ] Espace disque suffisant (1 Go+ recommandé)
- [ ] Le répertoire de sortie a les permissions d'écriture

### 📊 Vérifications pendant la conversion
- [ ] Connexion à la base de données réussie
- [ ] Toutes les tables requises existent
- [ ] Les données de coordonnées sont dans la plage valide
- [ ] L'utilisation de la mémoire est dans une plage raisonnable
- [ ] Aucune erreur d'autorisation n'est apparue
- [ ] Les fichiers temporaires sont créés normalement

### 📁 Validation après la conversion
- [ ] Tous les fichiers JSON ont été générés
- [ ] La taille des fichiers est raisonnable (ni vide ni anormalement grande)
- [ ] Le format JSON est valide
- [ ] L'archive a été créée avec succès
- [ ] Les fichiers temporaires ont été nettoyés
- [ ] Le journal ne contient pas d'erreurs graves

## 🆘 Obtenir de l'aide

### Auto-diagnostic
1.  **Exécuter les outils de diagnostic** :
    ```python
    from tfdi_converter.diagnostics import run_full_diagnostics
    run_full_diagnostics()
    ```

2.  **Afficher les journaux détaillés** :
    ```bash
    tail -f converter.log
    grep -i error converter.log
    ```

3.  **Vérifier les ressources système** :
    ```bash
    # Windows
    taskmgr
    
    # macOS
    activity monitor
    
    # Linux
    top
    htop
    ```

### Support communautaire
-   **GitHub Issues** : Signaler les bugs et les problèmes techniques
-   **GitHub Discussions** : Questions d'utilisation et partage d'expérience
-   **Documentation du projet** : Consulter le guide d'utilisation complet

### Lors du signalement d'un problème, veuillez fournir :
-   **Journal d'erreurs complet**
-   **Informations sur l'environnement système**
-   **Version du convertisseur**
-   **Informations sur la base de données** (taille, AIRAC, etc.)
-   **Étapes de reproduction**
-   **Fichiers de configuration pertinents**

---

**Rencontrez-vous un problème non résolu ?** 

Veuillez créer un nouveau problème sur [GitHub Issues](https://github.com/your-org/tfdi-converter/issues), nous vous aiderons à le résoudre dès que possible ! 🚁✨

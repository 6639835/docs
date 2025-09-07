```
---
title: Foire aux questions
description: Questions fréquemment posées et solutions pour les utilisateurs de Nav-data
---

# Foire aux questions (FAQ)

Ce document rassemble les questions les plus fréquemment rencontrées par les utilisateurs de Nav-data et leurs solutions.

## 🚀 Réponses rapides

### Q: Qu'est-ce que Nav-data ?
**R:** Nav-data est un outil de conversion de données de navigation aérienne open source, spécialement conçu pour convertir les données NAIP de l'aviation civile chinoise en un format utilisable par le simulateur de vol X-Plane. Il comprend quatre modules principaux : le traitement des routes aériennes, l'extraction PDF, la réparation des terminaux et la génération de CIFP X-Plane.

### Q: De quoi ai-je besoin pour utiliser Nav-data ?
**R:** Vous avez besoin de :
- Un environnement Python 3.6+
- Les fichiers source de données de navigation correspondants (CSV, PDF, etc.)
- Le simulateur de vol X-Plane (pour utiliser les données converties)
- Des connaissances de base en ligne de commande

### Q: Nav-data est-il gratuit ?
**R:** Oui, Nav-data est sous licence open source MIT et est entièrement gratuit à utiliser, y compris pour des usages commerciaux.

## 📦 Problèmes liés à l'installation

### Q: Que faire si l'installation affiche un message "Version de Python trop ancienne" ?
**R:** Nav-data nécessite Python 3.6 ou une version ultérieure. Solution :

```bash
# Vérifier la version actuelle
python --version

# Si la version est trop ancienne, veuillez :
# Windows: Télécharger la dernière version depuis python.org
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### Q: Que faire si la commande pip install échoue ?
**R:** Solutions courantes :

```bash
# 1. Mettre à jour pip
python -m pip install --upgrade pip

# 2. Utiliser un miroir national
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# 3. Purger le cache
pip cache purge

# 4. Utiliser un environnement virtuel
python -m venv nav-data-env
source nav-data-env/bin/activate  # Linux/macOS
# Ou nav-data-env\Scripts\activate  # Windows
```

### Q: L'installation des paquets de dépendance échoue, avec un message "Autorisation insuffisante" ?
**R:** Solution :

```bash
# Solution 1 : Installation par l'utilisateur (recommandé)
pip install --user package_name

# Solution 2 : Utiliser un environnement virtuel (fortement recommandé)
python -m venv nav-data-env
source nav-data-env/bin/activate
pip install package_name

# Solution 3 : Utiliser sudo (non recommandé)
sudo pip install package_name
```

### Q: L'installation de pdfplumber sous Windows échoue ?
**R:** Cela est généralement dû à l'absence de l'environnement de compilation Visual C++ :

1. Installer les outils de compilation Microsoft Visual C++
2. Ou utiliser la version précompilée :
   ```cmd
   pip install --only-binary=all pdfplumber
   ```

## 🗂️ Problèmes de traitement des données

### Q: Le fichier CSV ne peut pas être lu, message d'erreur d'encodage ?
**R:** C'est un problème courant avec les fichiers CSV chinois :

```python
# Vérifier l'encodage du fichier
import chardet
with open('your_file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())
    print(encoding)

# Convertir l'encodage
iconv -f gbk -t utf-8 input.csv > output.csv
```

### Q: Les données des routes aériennes sont incomplètes après conversion ?
**R:** Vérifier les éléments suivants :

1. **Format du fichier CSV** : S'assurer qu'il contient les champs obligatoires
   ```
   CODE_POINT_START, CODE_TYPE_START, CODE_POINT_END, 
   CODE_TYPE_END, CODE_DIR, TXT_DESIG
   ```

2. **Paramètres de filtrage de zone** : Vérifier si des données nécessaires n'ont pas été filtrées par inadvertance
   ```python
   # Vérifier les paramètres de zone dans airway.py
   china_areas = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW', 'ZJ', 'ZP', 'ZL', 'ZH', 'ZU'}
   ```

3. **Fichiers de données de référence** : S'assurer que earth_fix.dat et earth_nav.dat existent et sont complets

### Q: La précision des coordonnées extraites du PDF est insuffisante ?
**R:** Essayer les solutions suivantes :

1. **Utiliser le mode d'extraction manuelle** :
   ```bash
   python waypoint_2_edge.py
   ```

2. **Ajuster les paramètres de traitement** :
   ```python
   # Modifier les paramètres de précision dans le script
   COORDINATE_PRECISION = 8
   crop_margin = 50  # Augmenter la marge de recadrage
   ```

3. **Prétraiter les fichiers PDF** :
   - S'assurer que le PDF est au format texte et non une image scannée
   - Utiliser des outils comme Adobe Acrobat pour optimiser le PDF

### Q: Le résultat de la conversion des coordonnées est incorrect ?
**R:** Vérifier le format des coordonnées et les paramètres de conversion :

```python
# Valider la plage de coordonnées (région chinoise)
LAT_MIN, LAT_MAX = 15.0, 55.0
LON_MIN, LON_MAX = 70.0, 140.0

# Vérifier la conversion degrés-minutes-secondes
def dms_to_decimal(degrees, minutes, seconds):
    return degrees + minutes/60 + seconds/3600
```

## 🔧 Problèmes de réparation de programme

### Q: Le format des procédures terminales est incorrect après encodage ?
**R:** Vérifier la configuration des règles d'encodage :

```python
# Confirmer les paramètres des règles d'encodage
ENCODING_MAPPINGS = {
    'IF_LINE': 'E  A',
    'TRANSITION_MIDDLE': 'E   ',
    'TRANSITION_END': 'EE B',
    'MAIN_APPROACH_IF': 'E  B',
    'FAF_POINT': 'E  F',
    'MISSED_APPROACH_FIRST': 'E M ',
    'PROCEDURE_END': 'EE  ',
    'HOLDING_END': 'EE H'
}
```

### Q: Certains fichiers échouent lors du traitement par lots ?
**R:** Utiliser le mode de traitement tolérant aux pannes :

```python
# Modifier le script de traitement, ajouter la gestion des exceptions
try:
    process_single_file(file_path)
    print(f"✅ Traitement réussi : {file_path}")
except Exception as e:
    print(f"❌ Échec du traitement : {file_path} - {e}")
    continue  # Continuer avec le fichier suivant
```

### Q: Les règles de réparation ne s'appliquent pas ?
**R:** Confirmer la priorité et les conditions de correspondance des règles de réparation :

```python
# Vérifier les conditions de correspondance des règles
def check_rule_match(line, pattern):
    import re
    return re.search(pattern, line) is not None

# Tester une ligne spécifique
test_line = "APPCH RW25L ABC123 GY M"
print(check_rule_match(test_line, r"APPCH.*GY M"))
```

## 🛩️ Problèmes d'intégration X-Plane

### Q: X-Plane ne reconnaît pas les données converties ?
**R:** Vérifier les éléments suivants :

1. **Exactitude du chemin du fichier** :
   ```bash
   # X-Plane 11
   /path/to/X-Plane/Custom Data/
   
   # X-Plane 12
   /path/to/X-Plane/Output/FMS plans/
   ```

2. **Intégrité du format de fichier** :
   ```bash
   # Vérifier si le fichier se termine par "99"
   tail -n 5 earth_awy.dat
   ```

3. **Format d'encodage** :
   ```bash
   # S'assurer que le fichier est encodé en UTF-8
   file -I earth_awy.dat
   ```

### Q: Les données CIFP s'affichent anormalement dans X-Plane ?
**R:** Valider la spécification du format CIFP :

```python
# Vérifier le format des lignes CIFP
def validate_cifp_line(line):
    parts = line.split()
    if line.startswith(('SID', 'STAR', 'APPCH')):
        return len(parts) >= 15  # Nombre de champs standard CIFP
    return True

# Validation par lots
with open('airport.dat', 'r') as f:
    for i, line in enumerate(f, 1):
        if not validate_cifp_line(line.strip()):
            print(f"Erreur de format à la ligne {i} : {line.strip()}")
```

### Q: La procédure ne peut pas être sélectionnée dans X-Plane ?
**R:** Vérifier le nom de la procédure et l'identifiant de la piste :

1. **Format de l'identifiant de piste** : S'assurer qu'il est conforme aux normes OACI (par exemple RW25L, RW03R)
2. **Nom de la procédure** : Éviter les caractères spéciaux et les noms trop longs
3. **Code d'aéroport** : S'assurer d'utiliser le bon code OACI à quatre lettres

## ⚡ Problèmes de performance

### Q: Le traitement des fichiers volumineux est très lent ?
**R:** Optimiser les performances de traitement :

```python
# 1. Augmenter la taille du lot de traitement
BATCH_SIZE = 5000  # Par défaut 1000

# 2. Utiliser le traitement multiprocessus
from multiprocessing import Pool
with Pool(processes=4) as pool:
    results = pool.map(process_function, file_list)

# 3. Activer le cache de progression
USE_CACHE = True
CACHE_DIR = "cache/"
```

### Q: Que faire si l'utilisation de la mémoire est trop élevée ?
**R:** Stratégies d'optimisation de la mémoire :

```python
# 1. Traiter les fichiers volumineux par blocs
def process_large_file_chunked(file_path, chunk_size=1000):
    chunk = []
    with open(file_path, 'r') as f:
        for line in f:
            chunk.append(line)
            if len(chunk) >= chunk_size:
                yield process_chunk(chunk)
                chunk.clear()
                gc.collect()  # Forcer le ramasse-miettes

# 2. Libérer les variables inutiles
del large_data_structure
gc.collect()

# 3. Utiliser des générateurs au lieu de listes
def data_generator():
    for item in data_source:
        yield process_item(item)
```

## 🐛 Dépannage

### Q: Le programme plante soudainement pendant l'exécution ?
**R:** Collecter les informations de débogage :

```python
# 1. Activer la journalisation détaillée
import logging
logging.basicConfig(level=logging.DEBUG)

# 2. Utiliser la gestion des exceptions
try:
    main_processing_function()
except Exception as e:
    import traceback
    print(f"Détails de l'erreur : {e}")
    print(f"Trace de la pile : {traceback.format_exc()}")

# 3. Vérifier les ressources système
import psutil
print(f"Utilisation de la mémoire : {psutil.virtual_memory().percent}%")
print(f"Espace disque : {psutil.disk_usage('/').percent}%")
```

### Q: Le résultat de la sortie ne correspond pas aux attentes ?
**R:** Déboguer le processus étape par étape :

```python
# 1. Ajouter une sortie intermédiaire
def debug_process_step(data, step_name):
    print(f"=== {step_name} ===")
    print(f"Volume de données : {len(data)}")
    print(f"Exemple de données : {data[:3]}")
    return data

# 2. Comparer l'entrée et la sortie
print("Statistiques des données d'entrée :")
analyze_data(input_data)
print("Statistiques des données de sortie :")
analyze_data(output_data)

# 3. Valider les étapes clés
assert len(processed_data) > 0, "Les données traitées sont vides"
assert all(validate_item(item) for item in processed_data), "Échec de la validation des données"
```

## 🌐 Problèmes spécifiques à la plateforme

### Q: Les chemins sous Windows contenant des espaces entraînent des erreurs ?
**R:** Traiter correctement les chemins de fichiers :

```python
import os
from pathlib import Path

# Utiliser pathlib (recommandé)
file_path = Path("C:/Program Files/Nav Data/input.csv")
if file_path.exists():
    process_file(str(file_path))

# Ou utiliser des guillemets
import subprocess
subprocess.run(['python', 'script.py', '"C:/path with spaces/file.csv"'])
```

### Q: Autorisation refusée sous macOS ?
**R:** Corriger les problèmes d'autorisation :

```bash
# 1. Modifier les permissions de fichier
chmod +x script.py
chmod 755 nav-data-directory/

# 2. Utiliser le répertoire utilisateur
mkdir ~/nav-data
cd ~/nav-data

# 3. Éviter d'utiliser sudo
# Ne pas : sudo python script.py
# Utiliser : python script.py
```

### Q: Dépendances système manquantes sous Linux ?
**R:** Installer les paquets système nécessaires :

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3-dev libpoppler-cpp-dev

# CentOS/RHEL
sudo yum install python3-devel poppler-cpp-devel

# Ou utiliser conda
conda install -c conda-forge pdfplumber
```

## 🔄 Problèmes de mise à jour des données

### Q: Comment obtenir les dernières données NAIP ?
**R:** Processus de mise à jour des données :

1. **Source des données** : Obtenir les dernières données NAIP du site officiel de l'Administration de l'aviation civile
2. **Cycle AIRAC** : S'assurer que les données correspondent au bon cycle AIRAC
3. **Validation du format** : Les nouvelles données peuvent nécessiter des ajustements de format

```python
# Vérifier le cycle AIRAC
from datetime import datetime
def get_current_airac():
    # Logique de calcul AIRAC
    base_date = datetime(2025, 1, 23)  # Date de référence
    current_date = datetime.now()
    days_diff = (current_date - base_date).days
    cycle_number = (days_diff // 28) + 2501  # Un cycle tous les 28 jours
    return cycle_number
```

### Q: Que faire si les données converties sont obsolètes ?
**R:** Mettre à jour régulièrement les données :

1. **Établir un rappel de mise à jour** : Vérifier les nouvelles données AIRAC tous les 28 jours
2. **Sauvegarder les anciennes données** : Sauvegarder les données actuellement disponibles avant la mise à jour
3. **Mise à jour progressive** : Tester d'abord les nouvelles données, puis effectuer une mise à jour complète après confirmation

## 📞 Obtenir plus d'aide

### Q: Où puis-je obtenir un support technique ?
**R:** Diverses façons d'obtenir de l'aide :

1. **Ressources documentaires** :
   - [Guide d'utilisation](./guide/usage.md)
   - [Dépannage](./troubleshooting.md)
   - [Description de l'architecture](./architecture.md)

2. **Support communautaire** :
   - [GitHub Issues](https://github.com/your-repo/nav-data/issues)
   - [GitHub Discussions](https://github.com/your-repo/nav-data/discussions)
   - Forums de la communauté de simulation de vol

3. **Contacter directement** :
   - Soumettre un rapport de bug détaillé
   - Inclure le journal des erreurs et les informations système
   - Fournir des données d'exemple permettant de reproduire le problème

### Q: Comment signaler un problème ou suggérer des améliorations ?
**R:** Un rapport de problème efficace contient :

```markdown
**Description du problème**: Décrivez brièvement le problème rencontré
**Étapes de reproduction**: 
1. Commandes ou opérations utilisées
2. Fichiers de données d'entrée
3. Résultat attendu vs résultat réel

**Informations sur l'environnement**:
- Système d'exploitation: Windows 10 / macOS 12 / Ubuntu 20.04
- Version de Python: 3.9.7
- Version de Nav-data: v2.1.0

**Informations supplémentaires**:
- Journal des erreurs
- Captures d'écran pertinentes  
- Fichiers de données d'exemple (si partageables)
```

### Q: Vous souhaitez contribuer au code ou à la documentation ?
**R:** Bienvenue à participer au développement du projet !

1. **Consulter le guide de contribution** : [contributing.md](./contributing.md)
2. **Comprendre l'architecture du projet** : [architecture.md](./architecture.md)
3. **Suivre les conventions de codage** : PEP 8 + conventions spécifiques au projet
4. **Soumettre une Pull Request** : Soumettre votre contribution via GitHub

---

## 💡 Conseils pratiques

### Commandes de diagnostic rapide
```bash
# Vérification de l'environnement
python --version
pip list | grep -E "(pandas|pdfplumber|tqdm|colorama)"

# Vérification des fichiers de données
ls -la *.csv *.dat *.pdf
file -I input_file.csv

# Vérification des ressources système
df -h  # Espace disque
free -h  # Utilisation de la mémoire (Linux)
```

### Commutateur de débogage
Ajouter un mode de débogage dans le script :
```python
DEBUG = True  # Définir sur True pour activer la sortie de débogage

if DEBUG:
    print(f"Fichier traité : {file_path}")
    print(f"Nombre de lignes de données : {len(data)}")
    print(f"Temps de traitement : {elapsed_time:.2f}s")
```

**Si votre problème ne figure pas dans la liste ci-dessus, n'hésitez pas à soumettre une nouvelle question via les GitHub Issues !** Nous continuerons à mettre à jour ce document FAQ pour qu'il serve au mieux la communauté. ✈️
```
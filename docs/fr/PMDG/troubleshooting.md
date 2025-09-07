# 🔧 Guide de dépannage

Ce guide couvre les problèmes courants et leurs solutions lors de l'utilisation de l'outil de conversion Nav-data PMDG. Il est classé par type de problème pour une identification et une résolution rapides.

---

## 🚨 Problèmes d'installation

### ❌ Problèmes d'environnement Python

#### **Problème** : `python: command not found` ou `'python' n'est pas une commande interne ou externe`
**Symptômes** :
```bash
'python' is not recognized as an internal or external command
```

**Solutions** :
```bash
# 1. Vérifier l'installation de Python
python --version
# ou
python3 --version

# 2. Vérifier la variable d'environnement PATH
echo $PATH  # Linux/macOS
echo %PATH%  # Windows

# 3. Réinstaller Python (recommandé depuis le site officiel)
# https://www.python.org/downloads/
```

#### **Problème** : Échec de l'installation des paquets de dépendances
**Symptômes** :
```bash
ERROR: Could not find a version that satisfies the requirement
```

**Solutions** :
```bash
# 1. Mettre à jour pip
python -m pip install --upgrade pip

# 2. Utiliser une source miroir nationale (utilisateurs en Chine)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 3. Nettoyer le cache pip
pip cache purge

# 4. Utiliser un environnement virtuel
python -m venv nav_data_env
source nav_data_env/bin/activate  # Linux/macOS
nav_data_env\Scripts\activate     # Windows
```

### ❌ Problèmes d'autorisations

#### **Problème** : Accès au répertoire MSFS refusé
**Symptômes** :
```
PermissionError: [Errno 13] Permission denied
```

**Solutions** :
```bash
# Utilisateurs Windows
# 1. Exécuter l'invite de commande en tant qu'administrateur
# 2. Ou modifier les autorisations du répertoire
icacls "C:\Users\[用户名]\AppData\Local\Packages" /grant Users:F /T

# Vérifier les autorisations du répertoire MSFS
# Clic droit sur le répertoire -> Propriétés -> Sécurité -> Modifier -> Ajouter les autorisations de contrôle total
```

---

## 🔄 Problèmes de conversion

### ❌ Problèmes de fichiers de données

#### **Problème** : Fichier de données AIRAC introuvable
**Symptômes** :
```
FileNotFoundError: AIRAC data file not found
```

**Étapes de diagnostic** :
```bash
# 1. Vérifier le chemin du fichier
ls -la ./input/AIRAC2024-01/  # Linux/macOS
dir .\input\AIRAC2024-01\     # Windows

# 2. Vérifier les autorisations du fichier
ls -la *.dat *.txt *.xml      # Vérifier les fichiers de données
```

**Solutions** :
```bash
# 1. Confirmer le format et l'emplacement du fichier de données
mkdir -p ./input/AIRAC2024-01
# Placer les fichiers de données AIRAC dans le bon répertoire

# 2. Vérifier l'intégrité du fichier
python validate_data.py --check-integrity --input-dir=./input/AIRAC2024-01
```

#### **Problème** : Format de données incompatible
**Symptômes** :
```
ValueError: Unsupported data format or corrupted file
```

**Solutions** :
```bash
# 1. Vérifier les formats pris en charge
python converter.py --list-supported-formats

# 2. Convertir le format des données
python format_converter.py --input=old_format.dat --output=new_format.xml --format=ARINC424

# 3. Utiliser le mode débogage pour obtenir des informations détaillées
python converter.py --debug --verbose --input=problematic_file.dat
```

### ❌ Erreurs durant le processus de conversion

#### **Problème** : Erreur de mémoire insuffisante
**Symptômes** :
```
MemoryError: Unable to allocate array
```

**Solutions** :
```bash
# 1. Traiter de grands ensembles de données par blocs
python converter.py --batch-size=1000 --memory-limit=4GB

# 2. Activer le traitement en flux de données
python converter.py --streaming-mode --temp-dir=/tmp/nav_data

# 3. Augmenter la mémoire virtuelle (Windows)
# Panneau de configuration -> Système -> Paramètres système avancés -> Mémoire virtuelle

# 4. Optimiser les ressources système
# Fermer les programmes inutiles
# Nettoyer les fichiers temporaires
```

#### **Problème** : Erreur de conversion de coordonnées
**Symptômes** :
```
CoordinateTransformError: Invalid coordinate conversion
```

**Solutions** :
```bash
# 1. Vérifier les paramètres du système de coordonnées
python converter.py --coordinate-system=WGS84 --verify-coordinates

# 2. Utiliser une méthode de conversion alternative
python converter.py --coordinate-method=alternative --precision=8

# 3. Vérifier les paramètres de déclinaison magnétique
python converter.py --magnetic-model=WMM2020 --declination-check
```

---

## ⚙️ Problèmes de configuration

### ❌ Problèmes d'intégration PMDG

#### **Problème** : L'avion PMDG ne reconnaît pas les données de navigation
**Symptômes** : Le FMC affiche "NAV DATA NOT FOUND" ou les points de navigation ne peuvent pas être chargés

**Étapes de diagnostic** :
```bash
# 1. Vérifier le répertoire de données PMDG
dir "C:\Users\%USERNAME%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\PMDG\"

# 2. Vérifier le fichier de base de données
python verify_pmdg_db.py --check-tables --check-indexes
```

**Solutions** :
```bash
# 1. Confirmer le chemin des données PMDG
python converter.py --pmdg-path="C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_[ID]\LocalCache\PMDG"

# 2. Régénérer les index de la base de données
python rebuild_indexes.py --database=pmdg_nav.db

# 3. Vérifier les autorisations du fichier
icacls "PMDG数据目录" /grant Users:F /T

# 4. Redémarrer MSFS et l'avion PMDG
```

#### **Problème** : Incompatibilité de version des données
**Symptômes** : PMDG affiche un cycle AIRAC obsolète ou les données ne sont pas à jour

**Solutions** :
```bash
# 1. Forcer la mise à jour de l'identifiant AIRAC
python converter.py --force-airac-update --airac-cycle=2024-01

# 2. Vider le cache
python clear_cache.py --pmdg-cache --nav-cache

# 3. Vérifier le cycle AIRAC
python verify_airac.py --current-cycle --check-validity
```

---

## 🚀 Problèmes de performance

### ❌ Vitesse de conversion lente

#### **Problème** : Le processus de conversion est anormalement lent
**Causes possibles** :
- Goulot d'étranglement E/S du disque dur
- Mémoire insuffisante
- Faible utilisation du CPU
- Latence réseau (vérification en ligne)

**Solutions d'optimisation** :
```bash
# 1. Activer le traitement multi-processus
python converter.py --parallel=4 --workers=auto

# 2. Utiliser un répertoire temporaire sur SSD
python converter.py --temp-dir="D:\SSD_Temp" --keep-temp-files=false

# 3. Désactiver les validations inutiles
python converter.py --skip-validation --no-online-check

# 4. Optimiser les opérations d'E/S
python converter.py --buffer-size=64MB --async-io
```

### ❌ Utilisation excessive de la mémoire

#### **Problème** : Le processus de conversion consomme beaucoup de mémoire
**Surveillance de l'utilisation de la mémoire** :
```bash
# Windows
tasklist /fi "imagename eq python.exe"

# Linux/macOS  
top -p $(pgrep python)
```

**Solutions** :
```bash
# 1. Activer le traitement en flux
python converter.py --streaming --chunk-size=10MB

# 2. Limiter l'utilisation de la mémoire
python converter.py --max-memory=2GB --gc-threshold=100MB

# 3. Traiter par région
python converter.py --process-by-region --region-size=small
```

---

## 🔍 Problèmes de validation des données

### ❌ Échec de la vérification de l'intégrité des données

#### **Problème** : L'outil de validation signale des données incomplètes
**Symptômes** :
```
ValidationError: Missing required navigation points
```

**Outils de diagnostic** :
```bash
# 1. Exécuter une validation complète
python validate_data.py --comprehensive --output-report=validation_report.html

# 2. Vérifier les types de données spécifiques
python validate_data.py --check-airports --check-navaids --check-airways

# 3. Comparer avec les données de référence
python compare_data.py --reference=official_data.xml --current=converted_data.db
```

**Solutions de réparation** :
```bash
# 1. Retélécharger les données source
# S'assurer que les données AIRAC sont complètes et à jour

# 2. Utiliser l'outil de réparation
python repair_data.py --fix-missing --interpolate-gaps

# 3. Compléter manuellement les données manquantes
python manual_fix.py --add-missing-waypoints --config=fixes.json
```

### ❌ Problèmes de précision des coordonnées

#### **Problème** : La position des points de navigation est imprécise
**Méthodes de vérification** :
```bash
# 1. Vérifier les coordonnées d'un point de cheminement spécifique
python check_waypoint.py --icao=ZSPD --waypoint=SASAN

# 2. Comparer avec plusieurs sources de données
python compare_coordinates.py --sources=navigraph,aerosoft --output=coordinate_diff.csv

# 3. Générer un rapport d'écart
python deviation_report.py --threshold=0.001 --output=deviations.html
```

---

## 📊 Analyse des journaux

### 🔍 Comprendre les fichiers journaux

#### **Explication des niveaux de journalisation** :
- **DEBUG** : Informations de débogage détaillées
- **INFO** : Informations de traitement générales
- **WARNING** : Messages d'avertissement, n'affectent pas la fonctionnalité
- **ERROR** : Messages d'erreur, nécessitent une attention particulière
- **CRITICAL** : Erreur critique, traitement interrompu

#### **Modèles de journaux courants** :
```bash
# Rechercher les journaux d'erreurs
grep "ERROR\|CRITICAL" converter.log

# Compter le nombre d'avertissements
grep -c "WARNING" converter.log

# Analyser le temps de traitement
grep "Processing time" converter.log | tail -10
```

### 🔧 Configuration des journaux

#### **Augmenter la verbosité des journaux** :
```bash
# Activer les journaux détaillés
python converter.py --log-level=DEBUG --log-format=detailed

# Séparer les différents types de journaux
python converter.py --log-split --error-log=errors.log --debug-log=debug.log
```

---

## 🆘 Corrections d'urgence

### 🚨 Récupération après corruption de données

#### **Étape 1** : Sauvegarde immédiate
```bash
# Sauvegarder l'état actuel
cp -r ./output ./backup_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
xcopy .\output .\backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E /I  # Windows
```

#### **Étape 2** : Restaurer à partir d'une sauvegarde
```bash
# Restaurer la sauvegarde valide la plus récente
python restore_backup.py --list-backups
python restore_backup.py --restore=backup_20240115_1430 --target=./output
```

#### **Étape 3** : Vérifier la restauration
```bash
# Vérifier les données restaurées
python validate_data.py --quick-check --report-only-errors
```

### 🚨 Réinitialiser à l'état par défaut

#### **Réinitialisation complète** :
```bash
# Avertissement : Ceci supprimera toutes les données converties
python reset_tool.py --full-reset --confirm

# Retélécharger la configuration par défaut
python setup.py --download-config --reset-settings

# Réexécuter l'initialisation
python init.py --first-time-setup
```

---

## 📞 Obtenir de l'aide supplémentaire

### 📝 Veuillez fournir les informations suivantes lors du signalement d'un problème

1. **Informations système** :
   ```bash
   python --version
   python system_info.py --full-report
   ```

2. **Journaux d'erreurs** :
   - La trace de pile complète de l'erreur
   - Les messages d'avertissement pertinents
   - Les extraits de journaux avant et après le traitement

3. **Informations sur l'environnement** :
   - Version du système d'exploitation
   - Version et méthode d'installation de MSFS
   - Version de l'avion PMDG
   - Source des données et cycle AIRAC

4. **Étapes de reproduction** :
   - Les étapes opérationnelles détaillées
   - Les commandes et paramètres saisis
   - Résultat attendu vs résultat réel

### 🔗 Contacts

- **GitHub Issues** : [Soumettre un rapport de problème](https://github.com/nav-data/docs/issues/new)
- **Forums communautaires** : [Participer à la discussion](https://github.com/nav-data/docs/discussions)
- **Support d'urgence** : support@nav-data.org

---

## 🔄 Mesures préventives

### ✅ Liste des meilleures pratiques

- [ ] **Sauvegarder régulièrement** les données et la configuration
- [ ] **Utiliser la dernière version** de l'outil de conversion
- [ ] **Valider les données** après chaque conversion
- [ ] **Surveiller les journaux** pour identifier les problèmes potentiels
- [ ] **Maintenir l'environnement** propre et à jour
- [ ] **Documenter** les configurations personnalisées

### 📅 Plan de maintenance

- **Hebdomadaire** : Vérifier les fichiers journaux, nettoyer les fichiers temporaires
- **Mensuel** : Mettre à jour les données AIRAC, vérifier la version de l'outil
- **Trimestriel** : Vérification complète du système, optimisation des performances
- **Lors des mises à jour importantes** : Sauvegarde complète, mise à niveau prudente

N'oubliez pas : mieux vaut prévenir que guérir ! Une maintenance régulière peut éviter la plupart des problèmes.
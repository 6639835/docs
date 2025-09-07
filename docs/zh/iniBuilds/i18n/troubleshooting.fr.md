Voici la traduction du texte chinois vers le français, en respectant toutes les règles spécifiées :

# 🔧 Guide de dépannage

Ce guide couvre les problèmes courants et leurs solutions que vous pourriez rencontrer lors de l'utilisation de l'outil de conversion Nav-data iniBuilds. Il est classé par gravité et type de problème pour un diagnostic et une résolution rapides.

---

## 🚨 Problèmes critiques (Critical Issues)

### ❌ L'outil de conversion ne démarre pas

#### **Problème**: L'outil ne peut pas s'exécuter en raison d'un problème d'environnement Python
**Symptômes**:
```bash
ModuleNotFoundError: No module named 'converter'
ImportError: cannot import name 'XP2INI_Converter'
```

**Solution immédiate**:
```bash
# 1. Vérifier l'environnement Python
python --version  # Devrait afficher 3.8+

# 2. Réinstaller les dépendances
pip uninstall -r requirements.txt -y
pip install -r requirements.txt --force-reinstall

# 3. Vérifier le répertoire de travail
pwd  # Linux/macOS
echo %cd%  # Windows

# 4. Recloner le dépôt (dernier recours)
git clone https://github.com/nav-data/converter.git
cd converter
python setup.py install
```

#### **Problème**: Fichiers critiques manquants
**Symptômes**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'XP2INI_NDB_Converter.py'
```

**Solution immédiate**:
```bash
# 1. Vérifier l'intégrité des fichiers
ls -la *.py  # Linux/macOS
dir *.py     # Windows

# 2. Retélécharger les fichiers manquants
wget https://raw.githubusercontent.com/nav-data/converter/main/XP2INI_NDB_Converter.py

# 3. Vérifier les permissions
chmod +x *.py  # Linux/macOS
```

---

## ⚠️ Problèmes de haute priorité (High Priority)

### ❌ Échec de l'intégration des données A350

#### **Problème**: L'iniBuilds A350 ne reconnaît pas les données de navigation
**Symptômes**: Le MCDU affiche "NO NAV DATA" ou l'AIRAC est vide

**Étapes de diagnostic**:
```bash
# 1. Vérifier le chemin d'installation de l'A350
find /c/Users -name "*inibuilds*" -type d 2>/dev/null  # Windows (Git Bash)
find /Users -name "*inibuilds*" -type d 2>/dev/null    # macOS
find /home -name "*inibuilds*" -type d 2>/dev/null     # Linux

# 2. Vérifier le dossier communautaire
ls "$MSFS_COMMUNITY_PATH/inibuilds-aircraft-a350/SimObjects/Airplanes/iniBuilds_A350_900/"

# 3. Vérifier les fichiers de données
ls -la *.db *.sqlite *.json  # Dans le répertoire des données de l'A350
```

**Solutions**:
```bash
# 1. Relocaliser l'installation de l'A350
python converter.py --detect-aircraft --scan-community-folder

# 2. Spécifier manuellement le chemin
python converter.py --a350-path="/path/to/inibuilds-aircraft-a350" --force-install

# 3. Réparer les permissions des fichiers
# Windows
icacls "A350数据目录" /grant Users:F /T

# Linux/macOS  
chmod -R 755 /path/to/inibuilds-aircraft-a350/
chown -R $USER:$USER /path/to/inibuilds-aircraft-a350/

# 4. Vérifier l'installation
python verify_installation.py --aircraft=a350 --verbose
```

#### **Problème**: Le cycle AIRAC ne correspond pas
**Symptômes**: L'A350 affiche un cycle AIRAC ancien ou incorrect

**Solutions**:
```bash
# 1. Forcer la mise à jour de l'identifiant AIRAC
python converter.py --force-airac --cycle=2024-01 --aircraft=a350

# 2. Effacer le cache de l'A350
# Supprimer les fichiers de cache de l'A350
rm -f "$A350_PATH/work/NavData/cache/*"  # Linux/macOS
del "%A350_PATH%\work\NavData\cache\*"   # Windows

# 3. Régénérer la base de données de navigation
python rebuild_navdb.py --aircraft=a350 --clean-rebuild

# 4. Vérifier le cycle AIRAC
python check_airac.py --aircraft=a350 --expected-cycle=2024-01
```

---

## 🔄 Problèmes d'installation et de configuration

### ❌ Échec de l'installation des packages de dépendance

#### **Problème**: Échec de l'installation de packages spécifiques
**Erreurs courantes**:
```bash
# Problème de dépendance de bibliothèque mathématique
ERROR: Failed building wheel for numpy
ERROR: Failed building wheel for pandas

# Problème de compilateur
Microsoft Visual C++ 14.0 is required
error: Microsoft Visual Studio 14.0 is required
```

**Résoudre par plateforme**:

**Windows**:
```bash
# 1. Installer les Outils de Build de Visual Studio
# Télécharger et installer: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# 2. Utiliser des packages précompilés
pip install numpy pandas -f https://www.lfd.uci.edu/~gohlke/pythonlibs/

# 3. Utiliser conda (recommandé)
conda install numpy pandas sqlite3 lxml
```

**macOS**:
```bash
# 1. Installer les Outils de ligne de commande Xcode
xcode-select --install

# 2. Installer les dépendances avec Homebrew
brew install python@3.9 sqlite3

# 3. Réinstaller les packages Python
pip3 install -r requirements.txt
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3-dev python3-pip build-essential libsqlite3-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel sqlite-devel

# Réinstaller les packages
pip3 install -r requirements.txt
```

### ❌ Problèmes de configuration de la source de données

#### **Problème**: Impossible de se connecter à la source de données
**Symptômes**:
```
ConnectionError: Failed to download AIRAC data
TimeoutError: Data source unreachable
```

**Diagnostic réseau**:
```bash
# 1. Tester la connexion réseau
ping navigraph.com
nslookup navigraph.com

# 2. Vérifier les paramètres de proxy
echo $HTTP_PROXY $HTTPS_PROXY  # Linux/macOS
echo %HTTP_PROXY% %HTTPS_PROXY%  # Windows

# 3. Tester la connectivité des ports
telnet navigraph.com 443
nc -zv navigraph.com 443  # Linux/macOS
```

**Solutions**:
```bash
# 1. Configurer un proxy (si nécessaire)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# Windows
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=https://proxy.company.com:8080

# 2. Utiliser le mode hors ligne
python converter.py --offline --local-data=/path/to/airac/data

# 3. Changer de source de données
python converter.py --data-source=backup --mirror=asia
```

---

## 📊 Problèmes de traitement des données

### ❌ Erreurs liées à la mémoire

#### **Problème**: Échec de la conversion dû à un manque de mémoire
**Symptômes**:
```
MemoryError: Unable to allocate memory
MemoryError: cannot allocate memory for array
OSError: [Errno 12] Cannot allocate memory
```

**Surveillance de la mémoire**:
```bash
# Surveiller l'utilisation de la mémoire en temps réel
# Linux
free -h
htop

# macOS
vm_stat
activity monitor

# Windows
tasklist /fi "imagename eq python.exe"
wmic process get name,processid,workingsetsize
```

**Solutions d'optimisation**:
```bash
# 1. Activer le mode de traitement en continu (streaming)
python converter.py --streaming --chunk-size=512KB --memory-limit=2GB

# 2. Traiter par région
python converter.py --region=ZSPD --process-incrementally
python converter.py --region=ZBAA --process-incrementally  
python converter.py --region=ZGGG --process-incrementally

# 3. Optimiser la mémoire système
# Fermer les applications inutiles
# Augmenter la mémoire virtuelle/l'espace d'échange

# Linux - Augmenter l'espace d'échange
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. Utiliser le mode faible mémoire
python converter.py --low-memory --disable-cache --temp-cleanup
```

### ❌ Erreurs de format de données

#### **Problème**: Format de données d'entrée incompatible
**Symptômes**:
```
ValueError: Invalid ARINC 424 format
ParseError: Malformed XML data
UnicodeDecodeError: codec can't decode byte
```

**Validation des données**:
```bash
# 1. Vérifier l'encodage du fichier
file input_data.dat
hexdump -C input_data.dat | head

# 2. Vérifier l'intégrité du fichier
md5sum input_data.dat  # Linux/macOS
certUtil -hashfile input_data.dat MD5  # Windows

# 3. Vérifier le format du fichier
python validate_format.py --input=input_data.dat --format=arinc424
```

**Solutions de réparation**:
```bash
# 1. Convertir l'encodage du fichier
iconv -f ISO-8859-1 -t UTF-8 input_data.dat > input_data_utf8.dat  # Linux/macOS

# Windows (PowerShell)
Get-Content input_data.dat -Encoding Default | Set-Content input_data_utf8.dat -Encoding UTF8

# 2. Utiliser un convertisseur de format
python format_converter.py --input=input_data.dat --from=legacy --to=arinc424

# 3. Réparer manuellement les problèmes courants
python repair_data.py --fix-encoding --fix-line-endings --input=input_data.dat
```

---

## 🚀 Problèmes de performance

### ❌ Vitesse de conversion trop lente

#### **Problème**: Processus de conversion anormalement lent
**Analyse des causes possibles**:
- Goulot d'étranglement E/S disque (HDD vs SSD)
- Faible utilisation du CPU (traitement monotâche)
- Manque de mémoire entraînant des échanges fréquents
- Latence réseau (vérification en ligne)

**Diagnostic des performances**:
```bash
# 1. Surveiller les ressources système
# Linux
iostat -x 1    # Statistiques I/O
top -p $(pgrep python)  # CPU et mémoire

# macOS
iostat 1       # Statistiques I/O  
top -pid $(pgrep python)  # Surveillance des processus

# Windows
perfmon        # Moniteur de performances
wmic process get name,processid,percentprocessortime
```

**Optimisation des performances**:
```bash
# 1. Activer le traitement multiprocessus
python converter.py --parallel=auto --workers=$(nproc)

# 2. Utiliser un stockage plus rapide
python converter.py --temp-dir=/path/to/ssd/temp --output-dir=/path/to/ssd/output

# 3. Désactiver les vérifications inutiles
python converter.py --skip-validation --no-backup --fast-mode

# 4. Mode de mappage mémoire (pour les fichiers volumineux)
python converter.py --memory-map --buffer-size=64MB

# 5. Compresser la sortie (réduire les I/O)
python converter.py --compress-output --compression=lz4
```

### ❌ Utilisation excessive du CPU

#### **Problème**: Le processus de conversion utilise 100% du CPU, le système est lent à répondre
**Solutions**:
```bash
# 1. Limiter l'utilisation du CPU
python converter.py --cpu-limit=75 --nice=10

# 2. Réduire le parallélisme
python converter.py --parallel=2 --throttle=1000ms

# 3. Utiliser le contrôle de la priorité
# Linux/macOS
nice -n 19 python converter.py  # Priorité la plus basse

# Windows  
start /low python converter.py
```

---

## 🔍 Problèmes spécifiques à l'iniBuilds A350

### ❌ Problèmes d'affichage des données de navigation du MCDU

#### **Problème**: Les données de navigation du MCDU sont incorrectes ou incomplètes
**Symptômes**:
- Points de cheminement introuvables
- Procédures SID/STAR manquantes
- Informations de fréquence incorrectes
- Décalage de coordonnées

**Outils de diagnostic**:
```bash
# 1. Vérifier l'intégrité de la base de données de l'A350
python check_a350_db.py --comprehensive --report=detailed

# 2. Vérifier un point de navigation spécifique
python verify_waypoint.py --icao=ZSPD --waypoint=SASAN --aircraft=a350

# 3. Comparer la cohérence des données
python compare_data.py --source=navigraph --target=a350_db --threshold=0.001

# 4. Générer un rapport de différences
python diff_report.py --original=source_data --converted=a350_data --format=html
```

**Étapes de réparation**:
```bash
# 1. Régénérer la base de données de navigation
python rebuild_navdb.py --aircraft=a350 --source=latest_airac

# 2. Réparer manuellement les points de cheminement critiques
python manual_fix.py --waypoints=critical_fixes.json --aircraft=a350

# 3. Mettre à jour les données de fréquence
python update_frequencies.py --aircraft=a350 --source=official

# 4. Vérifier les résultats de la réparation
python validate_fix.py --aircraft=a350 --quick-test
```

### ❌ Problèmes de planification de route FMS

#### **Problème**: Le FMS de l'A350 ne peut pas planifier les routes correctement
**Symptômes**:
- Erreur "NO ROUTE FOUND"
- Connexion des segments de route interrompue
- Erreurs de restriction d'altitude

**Étapes de résolution**:
```bash
# 1. Vérifier la connectivité des routes aériennes
python check_airways.py --from=ZSPD --to=ZBAA --aircraft=a350

# 2. Valider la connexion des points de cheminement
python validate_connections.py --airway=A461 --aircraft=a350

# 3. Réparer les routes aériennes déconnectées
python repair_airways.py --auto-fix --aircraft=a350 --region=china

# 4. Reconstruire le réseau de routes aériennes
python rebuild_airways.py --aircraft=a350 --optimize-paths
```

---

## 📋 Analyse et diagnostic des journaux

### 🔍 Comprendre les journaux d'erreurs

#### **Modèles d'erreurs courants et leur signification**:

**Erreurs de conversion de données**:
```bash
# Problèmes de conversion de coordonnées
ERROR: CoordinateTransformError: Invalid coordinate format
# -> Vérifier le format des coordonnées des données d'entrée

# Échec d'écriture dans la base de données  
ERROR: DatabaseError: database is locked
# -> Fermer les autres programmes accédant à la base de données

# Problèmes de permissions de fichier
ERROR: PermissionError: [Errno 13] Permission denied
# -> Utiliser les privilèges d'administrateur ou modifier les permissions des fichiers
```

**Erreurs de connexion réseau**:
```bash
# Expiration du délai de connexion
ERROR: ConnectionTimeout: Failed to connect within 30 seconds
# -> Vérifier la connexion réseau, augmenter le délai d'attente

# Échec de résolution DNS
ERROR: socket.gaierror: [Errno -2] Name or service not known  
# -> Vérifier les paramètres DNS, utiliser un serveur DNS alternatif
```

#### **Détail des niveaux de journalisation**:
- **CRITICAL**: Erreur grave empêchant l'exécution continue du programme
- **ERROR**: Échec de l'exécution d'une fonction, mais le programme peut continuer
- **WARNING**: Problème potentiel n'affectant pas l'exécution actuelle
- **INFO**: Informations générales, progression du traitement, etc.
- **DEBUG**: Informations de débogage détaillées, utilisées pour le diagnostic des problèmes

### 🛠️ Techniques de débogage avancées

#### **Activer le débogage détaillé**:
```bash
# 1. Journaux les plus détaillés
python converter.py --log-level=DEBUG --verbose --trace --profile

# 2. Séparer les différents types de journaux
python converter.py --log-split \
  --error-log=errors.log \
  --warning-log=warnings.log \
  --debug-log=debug.log \
  --info-log=info.log

# 3. Surveiller les journaux en temps réel
tail -f converter.log | grep -E "(ERROR|CRITICAL)"  # Linux/macOS
```

#### **Analyse des performances**:
```bash
# 1. Activer l'analyse des performances
python -m cProfile -o profile_output.prof converter.py

# 2. Analyser les goulots d'étranglement de performance
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"

# 3. Analyse de l'utilisation de la mémoire
python -m memory_profiler converter.py --memory-profile
```

---

## 🆘 Procédures de récupération d'urgence

### 🚨 Récupération des données corrompues

#### **Étapes de récupération rapide**:
```bash
# 1. Arrêter immédiatement tous les processus associés
pkill -f "python.*converter"  # Linux/macOS
taskkill /f /im python.exe    # Windows

# 2. Créer un instantané de l'état actuel
cp -r output_data recovery_snapshot_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
robocopy output_data recovery_snapshot_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E  # Windows

# 3. Restaurer à partir de la sauvegarde la plus récente
python restore_backup.py --list-available
python restore_backup.py --restore=latest --confirm --target=output_data

# 4. Vérifier les données restaurées
python verify_data_integrity.py --comprehensive --fix-minor-issues
```

### 🔄 Procédure de réinitialisation complète

#### **Lorsque toutes les autres méthodes échouent**:
```bash
# Avertissement : Cela supprimera toutes les données converties et la configuration
echo "This will delete all converted data. Continue? (yes/no)"
read confirmation
if [ "$confirmation" = "yes" ]; then
    # 1. Sauvegarder la configuration utilisateur
    cp config.json config_backup_$(date +%Y%m%d).json
    
    # 2. Nettoyage complet
    python cleanup_all.py --nuclear-option --confirm-delete
    
    # 3. Réinitialiser
    python setup.py --fresh-install --default-config
    
    # 4. Restaurer la configuration utilisateur
    python merge_config.py --base=config.json --user=config_backup_*.json
fi
```

---

## 📞 Obtenir un support professionnel

### 📝 Préparer une demande de support

**Avant de contacter le support, veuillez recueillir les informations suivantes**:

```bash
# 1. Rapport d'informations système
python system_report.py --full > system_info.txt

# 2. Journal d'erreurs (100 dernières lignes)
tail -100 converter.log > recent_errors.log  # Linux/macOS
powershell "Get-Content converter.log -Tail 100" > recent_errors.log  # Windows

# 3. Fichier de configuration
cp config.json config_for_support.json

# 4. Informations de version
python --version > version_info.txt
python converter.py --version >> version_info.txt
git log --oneline -5 >> version_info.txt
```

### 🔗 Canaux de support

#### **Choisir par niveau d'urgence**:

**🚨 Urgence (affecte le vol dans les 24 heures)**:
- 📧 **E-mail d'urgence**: emergency@nav-data.org
- 📱 **Contact urgent**: Groupe WeChat "Nav-data Support d'urgence"

**⚠️ Important (réponse sous 1 à 3 jours)**:
- 🐛 **GitHub Issues**: [Créer un rapport de problème détaillé](https://github.com/nav-data/docs/issues/new?template=bug_report.md)
- 📧 **Support technique**: technical@nav-data.org

**💬 Questions générales (réponse sous 1 semaine)**:
- 🗣️ **Discussions communautaires**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 📧 **Support général**: support@nav-data.org

#### **Modèle de demande de support**:
```
Objet: [iniBuilds] Description concise du problème - Niveau d'impact

Informations sur l'environnement:
- Système d'exploitation: Windows 11 / macOS 12.6 / Ubuntu 22.04
- Version de Python: 3.9.7
- Version de l'outil: v2.1.3
- Version de l'iniBuilds A350: v1.2.0
- Version de MSFS: 2024

Description du problème:
[Décrivez en détail le phénomène du problème]

Étapes pour reproduire:
1. Première étape...
2. Deuxième étape...
3. Le problème apparaît

Résultat attendu:
[Décrivez le comportement correct attendu]

Résultat réel:
[Décrivez le comportement erroné réellement observé]

Solutions déjà tentées:
- Tentative de solution A, résultat...
- Tentative de solution B, résultat...

Pièces jointes:
- system_info.txt
- recent_errors.log
- config_for_support.json
```

---

## 🔄 Maintenance préventive

### ✅ Liste de contrôle de maintenance régulière

#### **Vérifications hebdomadaires**:
- [ ] Examiner les fichiers journaux pour identifier les problèmes potentiels
- [ ] Nettoyer les fichiers temporaires et le cache
- [ ] Vérifier que les données de l'A350 se chargent correctement
- [ ] Vérifier l'utilisation de l'espace disque

```bash
# Vérifications hebdomadaires automatisées
python weekly_maintenance.py --clean-temp --check-logs --verify-data --disk-usage
```

#### **Vérifications mensuelles**:
- [ ] Mettre à jour les données AIRAC
- [ ] Sauvegarder les configurations et données importantes
- [ ] Vérifier les mises à jour de l'outil
- [ ] Effectuer des tests de performance (benchmark)

```bash
# Maintenance mensuelle automatisée
python monthly_maintenance.py --update-airac --backup-data --check-updates --benchmark
```

#### **Avant une mise à jour majeure**:
- [ ] Sauvegarde complète des données
- [ ] Validation dans un environnement de test
- [ ] Vérification de la compatibilité des versions
- [ ] Préparation d'un plan de retour arrière

### 📊 Surveillance et alertes

#### **Configurer la surveillance automatique**:
```bash
# 1. Créer un script de surveillance
python create_monitor.py --check-interval=1h --alert-email=admin@your-domain.com

# 2. Configurer un service système (Linux)
sudo systemctl enable nav-data-monitor
sudo systemctl start nav-data-monitor

# 3. Configurer une tâche planifiée (Windows)
schtasks /create /tn "Nav-Data Monitor" /tr "python monitor.py" /sc hourly
```

N'oubliez pas : une maintenance et une surveillance proactives peuvent prévenir la plupart des problèmes, ce qui est plus efficace que de les résoudre après coup !

---

**Dernière mise à jour**: 15 janvier 2024  
**Version du document**: v2.1  
**Versions d'outil applicables**: v2.1.0+
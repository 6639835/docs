# 🚁 Guide de l'utilisateur du convertisseur de données de navigation TFDI

Le convertisseur de données de navigation TFDI est un outil professionnel de conversion de données de navigation aéronautiques, spécifiquement conçu pour transformer la base de données de navigation du Fenix A320 en un format JSON compatible avec le TFDI MD-11. Cet outil est doté d'une interface CLI moderne et de capacités de traitement de données efficaces.

## 📖 Aperçu rapide

### 🎯 Fonctionnalités clés
- **🎨 Interface CLI Riche** - Interface de terminal colorée et moderne, avec affichage de la progression en temps réel et retours d'état.
- **🔄 Conversion complète des données** - Prend en charge la conversion exhaustive de toutes les tables de la base de données Fenix.
- **📊 Traitement intelligent des données** - Normalisation des coordonnées, standardisation des noms de colonnes et validation de l'intégrité des données.
- **🔍 Détection des points FAF** - Identification intelligente des points Final Approach Fix, optimisation des procédures d'approche.
- **📦 Sortie JSON** - Génération de fichiers au format JSON standard compatible TFDI.
- **🗜️ Compression automatique** - Création d'archives compressées 7z faciles à distribuer.

### ✈️ Modèles d'avions pris en charge
- **TFDI MD-11** - Le McDonnell Douglas MD-11 hautement simulé dans Microsoft Flight Simulator.
- **Source des données** - Base de données de navigation Fenix A320 (nd.db3).
- **Formats pris en charge** - Conversion de la base de données SQLite au format JSON.

### 📊 Couverture des types de données
- **🏢 Données d'aéroport** - Informations sur les aéroports, données de pistes, fréquences de communication.
- **🧭 Équipements de navigation** - Données VOR/DME, NDB, ILS.
- **🛣️ Réseau de routes aériennes** - Définitions de routes aériennes, tronçons de routes, coordonnées de points de cheminement.
- **🎯 Procédures terminales** - SID, STAR, procédures d'approche, procédures de départ.
- **🔗 Tables de correspondance** - Index et tables d'association pour divers types de données.

## 🚀 Démarrage rapide

### 1️⃣ Vérification des exigences système
```bash
# 检查 Python 版本 (需要 3.8+)
python --version

# 验证可用内存 (推荐 4GB+)
python -c "import psutil; print(f'可用内存: {psutil.virtual_memory().available//1024**3} GB')"

# 检查磁盘空间 (需要至少 1GB)
python -c "import shutil; print(f'可用空间: {shutil.disk_usage(\".\")[2]//1024**3} GB')"
```

### 2️⃣ Préparation des fichiers nécessaires
- ✅ **Base de données de navigation Fenix** (`nd.db3`)
  ```
  Emplacement habituel: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **TFDI MD-11** déjà installé dans MSFS.
- ✅ **Code source du convertisseur** déjà téléchargé localement.

### 3️⃣ Lancement de la conversion en un clic
```bash
# 1. Installation des dépendances
pip install rich pandas py7zr

# 2. Exécution du convertisseur
python Fenix2TFDINavDataConverter.py

# 3. Suivre les instructions de l'interface
# → Saisir le chemin de la base de données Fenix
# → Définir l'ID de départ des procédures terminales
# → Attendre la fin de la conversion
```

## 📚 Navigation dans la documentation

### 🚀 Utilisation de base
1. **[Guide d'installation](installation.md)** - Configuration détaillée de l'environnement et installation des dépendances.
   - Configuration de l'environnement Python
   - Installation des paquets de dépendances
   - Vérification de la compatibilité système
   - Résolution des problèmes d'installation courants

2. **[Description de la configuration](configuration.md)** - Détails des options de configuration du convertisseur.
   - Paramètres ConverterConfig
   - Paramètres de connexion à la base de données
   - Configuration du format de sortie
   - Paramètres d'optimisation des performances

3. **[Instructions d'utilisation](usage.md)** - Procédure opérationnelle complète et exemples.
   - Processus de conversion interactif
   - Appel programmatique
   - Méthodes de traitement par lot
   - Étapes de vérification des résultats

### 🆘 Aide et support
- **[Foire Aux Questions (FAQ)](../faq.md)** - Questions fréquemment posées par les utilisateurs et leurs réponses.
- **[Dépannage](../troubleshooting.md)** - Diagnostic des problèmes et solutions.

### 🔧 Contenu avancé
- **[Architecture technique](../architecture.md)** - Conception du système et principes de fonctionnement.
- **[Guide de contribution](../contributing.md)** - Participation au développement et normes de code.
- **[Journal des modifications](../changelog.md)** - Historique des versions et nouvelles fonctionnalités.
- **[Informations sur la licence](../license.md)** - Conditions d'utilisation et mentions légales.

## 🎨 Aperçu de l'interface

### Écran de démarrage
```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 Vérification de l'environnement...
✅ Python 3.9.16
✅ Paquets de dépendances complets
✅ Mémoire suffisante
✅ Espace disque suffisant
```

### Progression de la conversion
```
╭─────────────────────────────────────────── 📊 Exportation des tables de données standard ───────────────────────────────────────────╮
│                                                                                                         │
│ Exportation des données de table en cours...                                                            │
│                                                                                                         │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                                       │
│                                                                                                         │
│ Traitement actuel: Table Terminals → Conversion des données de procédures terminales                   │
│ Terminé: Airports, Runways, Waypoints, Navaids, Airways, AirwayLegs, ILSes                             │
│                                                                                                         │
╰─────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Résumé de la conversion
```
╔══════════════════════════════════════════════════════════════╗
║                          Conversion réussie                         ║
║                                                              ║
║  ✓ La conversion des données est terminée avec succès !           ║
║                                                              ║
║  📊 Statistiques de traitement:                                  ║
║  • Tables exportées: 11                                          ║
║  • Enregistrements traités: 156,789                             ║
║  • Procédures terminales: 8,945                                  ║
║  • Points de cheminement: 45,234                                  ║
║                                                              ║
║  📁 Fichier de sortie: Primary.7z (15.6 MB)                      ║
║  🕒 Temps total: 4 minutes 23 secondes                         ║
║                                                              ║
║  Vous pouvez utiliser ce fichier pour la navigation dans le TFDI MD-11. ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝
```

## ⚠️ Rappels importants

### Directives d'utilisation des données
Cet outil est uniquement destiné à des fins de simulation de vol. Veuillez vous assurer que votre utilisation est conforme aux réglementations applicables :
- **🎯 Pour la simulation uniquement** - Strictement interdit pour la navigation aérienne réelle.
- **📋 Respecter les accords** - Confirmer les conditions d'utilisation des données Fenix et TFDI.
- **🔒 Usage non commercial** - Pour l'apprentissage personnel et le divertissement.

### Exigences techniques
- **🐍 Python 3.8+** - Il est recommandé d'utiliser Python 3.9 ou une version ultérieure.
- **💾 Exigences de mémoire** - Au moins 4 Go de RAM (8 Go recommandés).
- **💿 Espace de stockage** - Au moins 1 Go d'espace disponible.
- **🖥️ Système d'exploitation** - Windows 10/11, macOS 10.15+, Linux.

### Sécurité des données
- **💾 Sauvegarde des données** - Veuillez sauvegarder les données importantes avant la conversion.
- **🔍 Vérification des résultats** - Vérifier l'intégrité des données après la conversion.
- **📅 Gestion des versions** - Utiliser une version stable pour les conversions importantes.
- **🔒 Permissions de fichier** - S'assurer d'avoir les permissions de lecture/écriture suffisantes pour les fichiers.

## 🎯 Cas d'utilisation

### 🎮 Passionnés de simulation de vol
- **✈️ Amélioration de l'expérience** - Utiliser des données de navigation de haute qualité dans le TFDI MD-11.
- **🌍 Couverture mondiale** - Obtenir des informations sur les aéroports et les routes aériennes du monde entier.
- **📊 Données réalistes** - Informations précises basées sur des bases de données aéronautiques professionnelles.

### 👨‍🏫 Enseignement aéronautique
- **🎓 Fins de formation** - Fournir des données standardisées pour l'enseignement aéronautique.
- **📚 Outil d'apprentissage** - Comprendre les systèmes de navigation aérienne modernes.
- **🔄 Mises à jour des données** - Mises à jour régulières pour maintenir la pertinence des données.

### 👨‍💻 Développeurs
- **🔧 Traitement des données** - Apprendre les techniques de conversion des données aéronautiques.
- **📝 Recherche de format** - Comprendre les différents formats de données de navigation.
- **🧩 Intégration système** - Intégrer le convertisseur dans d'autres systèmes.

## 📊 Description de la sortie des données

### Structure des fichiers JSON
Une fois la conversion terminée, les fichiers JSON suivants seront générés :

```
Contenu de Primary.7z :
├── 📄 AirportLookup.json      # Index de recherche d'aéroport (~500KB)
├── 📄 Airports.json           # Informations de base sur les aéroports (~2MB)
├── 📄 AirwayLegs.json        # Données détaillées des tronçons de route aérienne (~3MB)
├── 📄 Airways.json           # Définitions de routes aériennes (~800KB)
├── 📄 Ilses.json             # Données d'approche ILS (~1.5MB)
├── 📄 NavaidLookup.json      # Index des équipements de navigation (~300KB)
├── 📄 Navaids.json           # Données des équipements de navigation (~1.2MB)
├── 📄 Runways.json           # Informations sur les pistes (~2.5MB)
├── 📄 Terminals.json         # Définitions des procédures terminales (~800KB)
├── 📄 WaypointLookup.json    # Index des points de cheminement (~1MB)
├── 📄 Waypoints.json         # Données des points de cheminement (~4MB)
└── 📁 ProcedureLegs/         # Répertoire des tronçons de procédure
    ├── TermID_1.json         # Tronçon de procédure terminale
    ├── TermID_2.json
    └── ...
```

### Exemple de format de données
```json
// Exemple Airports.json
{
  "ZBAA": {
    "AirportID": "ZBAA",
    "AirportName": "Beijing Capital International Airport",
    "Latitude": 40.080111,
    "Longitude": 116.584556,
    "Elevation": 116,
    "MagneticVariation": -6.2
  }
}

// Exemple Waypoints.json
{
  "ELMAG": {
    "WaypointID": "ELMAG",
    "Latitude": 39.832222,
    "Longitude": 116.298611,
    "Type": "DESIGNATED_POINT"
  }
}
```

## 🔄 Mises à jour et maintenance

### Fréquence de mise à jour des données
- **Mises à jour régulières**: Il est recommandé de mettre à jour tous les 28 jours (cycle AIRAC).
- **Suivi des versions**: Suivre les mises à jour des versions de Fenix et TFDI.
- **Vérification de la compatibilité**: Vérifier la compatibilité des versions avant la mise à jour.

### Mises à jour du convertisseur
- **GitHub Releases**: Suivre la page des versions du projet.
- **Vérification automatique**: Vérifier régulièrement les mises à jour de version du convertisseur.
- **Améliorations des fonctionnalités**: Participer aux retours de la communauté et aux suggestions de fonctionnalités.

## 🆘 Obtenir de l'aide

Si vous rencontrez des problèmes lors de l'utilisation :

1. **📚 Consulter la documentation** - Consultez d'abord les sections pertinentes pour des explications détaillées.
2. **🔍 Examiner les journaux** - Vérifiez les fichiers journaux générés pour les détails des erreurs.
3. **🧪 Exécuter un diagnostic** - Utilisez l'outil de diagnostic intégré pour vérifier l'état du système.
4. **💬 Support communautaire** - Signalez les problèmes dans les GitHub Issues.

### Commandes de diagnostic rapide
```bash
# Vérifier la version du convertisseur
python Fenix2TFDINavDataConverter.py --version

# Valider l'environnement
python -c "import rich, pandas, py7zr; print('Environnement normal')"

# Tester la connexion à la base de données
python -c "import sqlite3; sqlite3.connect('nd.db3').close(); print('Base de données accessible')"
```

### Surveillance des performances
```python
# Surveiller les ressources système
import psutil
print(f"CPU: {psutil.cpu_percent()}%")
print(f"Mémoire: {psutil.virtual_memory().percent}%")
print(f"Disque: {psutil.disk_usage('.').percent}%")
```

---

**Étape suivante**: Rendez-vous sur le [Guide d'installation](installation.md) pour commencer à configurer votre environnement, ou consultez directement les [Instructions d'utilisation](usage.md) pour une prise en main rapide du processus de conversion ! 🚁✨
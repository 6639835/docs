# 🚀 Guide d'utilisation du convertisseur de données de navigation iFly

Ce guide détaillera l'utilisation du convertisseur de données de navigation iFly, des opérations de base aux fonctionnalités avancées, vous aidant à effectuer la conversion des données de navigation de Fenix vers iFly en toute simplicité.

## 🎯 Préparation avant utilisation

### 1. Liste de contrôle de préparation des fichiers

Avant de commencer la conversion, veuillez confirmer que vous avez préparé les fichiers suivants :

- ✅ **Base de données de navigation Fenix** (`nd.db3`)
  ```
  Emplacement: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  Taille: Généralement 50-200 Mo
  Format: Fichier de base de données SQLite
  ```

- ✅ **Données d'itinéraire NAIP** (`RTE_SEG.csv`)
  ```
  Source: Site de services de données de l'aviation civile chinoise
  Encodage: UTF-8
  Taille: Généralement 5-20 Mo
  Format: Fichier CSV, contenant les informations des segments d'itinéraire
  ```

- ✅ **iFly 737 MAX 8** installé et fonctionnel

### 2. Validation de l'environnement

Exécuter le script de vérification de l'environnement :
```bash
# Vérifier l'environnement Python
python --version  # Devrait afficher la version 3.8 ou supérieure

# Vérifier les paquets de dépendances
python -c "import rich, pandas, pygeomag; print('Validation de l\'environnement réussie !')"

# Vérifier la mémoire disponible
python -c "import psutil; print(f'Mémoire disponible: {psutil.virtual_memory().available // (1024**3)} GB')"
```

## 🖥️ Utilisation interactive

### Lancer le convertisseur

```bash
# Accéder au répertoire du projet
cd /path/to/ifly-converter

# Lancer le convertisseur
python main.py
```

### Écran d'accueil

Après le démarrage du convertisseur, vous verrez un écran d'accueil modernisé :

```
╔═══════════════════════════════════════ 🛩️  Outil de conversion de données de navigation aéronautique  ✈️ ═══════════════════════════════════════╗
║                                                                                                          ║
║                                      Convertisseur de données de navigation aéronautique Fenix vers iFly                                       ║
║                                          Expérience de conversion de haute qualité et modernisée                                         ║
║                                                                                                          ║
╚═══════════════════════════════════════ Powered by Rich • Version 2.0 ═══════════════════════════════════════╝

🔍 Vérification du système...
✅ Environnement Python : 3.9.16
✅ Paquets de dépendances : Tous installés
✅ Mémoire disponible : 8.2 Go
✅ Espace disque : 125 Go

Préparation du processus de conversion...
```

## 📋 Étapes détaillées de la conversion

### Étape 1 : Connexion à la base de données Fenix

```
╭─────────────────────────────────────────────── 🔄 Étape 1/4 ────────────────────────────────────────────────╮
│ Connexion à la base de données Fenix                                                                        │
│ Veuillez sélectionner le fichier de base de données de navigation du Fenix A320 (nd.db3)                   │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Veuillez saisir le chemin du fichier de base de données Fenix :
```

**Exemple de saisie :**
```bash
# Chemin Windows
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Ou appuyez simplement sur Entrée pour la détection automatique
[Appuyez sur Entrée pour la détection automatique]
```

**Processus de validation :**
```
🔍 Validation de la base de données en cours...
✅ Fichier existant et lisible
✅ Format de la base de données correct
✅ Tables nécessaires complètes (11/11)
📊 Statistiques des données :
   • Aéroports : 15 234
   • Pistes : 28 456
   • Points de cheminement : 156 789
   • Procédures terminales : 8 945
```

### Étape 2 : Sélectionner le fichier CSV

```
╭─────────────────────────────────────────────── 🔄 Étape 2/4 ────────────────────────────────────────────────╮
│ Sélectionner les données d'itinéraire NAIP                                                                  │
│ Veuillez sélectionner le fichier RTE_SEG.csv de l'aviation civile chinoise                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Veuillez saisir le chemin du fichier CSV :
```

**Processus de validation :**
```
🔍 Validation du fichier CSV en cours...
✅ Encodage du fichier : UTF-8
✅ Format validé
✅ Colonnes nécessaires présentes
📊 Aperçu des données :
   • Nombre total d'enregistrements : 12 456
   • Nombre d'itinéraires : 345
   • Zone de couverture : Chine continentale, Hong Kong, Macao
   • Période de validité des données : AIRAC 2508
```

### Étape 3 : Localiser l'installation iFly

```
╭─────────────────────────────────────────────── 🔄 Étape 3/4 ────────────────────────────────────────────────╮
│ Localisation de l'installation iFly                                                                       │
│ Recherche de l'emplacement d'installation de l'iFly 737 MAX 8 en cours...                                 │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

🔍 Analyse des emplacements d'installation courants...
✅ Installation iFly trouvée : Community\ifly-aircraft-737max8\
📁 Chemin d'installation : C:\Users\Username\AppData\Local\Packages\Microsoft.FlightSimulator_xxx\LocalCache\Packages\Community\ifly-aircraft-737max8\
📋 Validation de la structure des répertoires :
   ✅ Data\navdata\Permanent\
   ✅ Data\navdata\Supplemental\
   ✅ Droits d'écriture normaux
```

Si la détection automatique échoue, le système vous invitera à saisir manuellement :
```
❌ Échec de la détection automatique
Veuillez saisir manuellement le chemin d'installation de l'iFly 737 MAX 8 :
```

### Étape 4 : Configurer les options de conversion

```
╭─────────────────────────────────────────────── 🔄 Étape 4/4 ────────────────────────────────────────────────╮
│ Configurer les options de conversion                                                                      │
│ Définir les paramètres de traitement des procédures terminales                                            │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Valeur de début de l'ID de procédure terminale [Défaut : 1000] :
```

**Description des options de configuration :**
```
📊 Configuration de l'ID de procédure terminale :
   • ID de début : 1000 (recommandé)
   • Plage d'utilisation estimée : 1000-3500
   • Nombre total d'ID disponibles : 9000
   • Marge de sécurité recommandée : 20 %

⚙️ Autres options :
   • Précision des coordonnées : 8 décimales (défaut)
   • Calcul de la déclinaison magnétique : Modèle WMM-2025
   • Cycle AIRAC : Calcul automatique
```

## 🔄 Processus de conversion

### Confirmation de la configuration

Avant de commencer la conversion, le système affichera un résumé complet de la configuration :

```
┌────────────────────────────────── ✅ Confirmation de la configuration de conversion ──────────────────────────────────┐
│                                                                                   │
│  📂 Configuration des sources de données                                           │
│  ├─ Base de données Fenix : .../navdata/nd.db3 (142.5 Mo)                         │
│  ├─ Fichier CSV NAIP : .../RTE_SEG.csv (8.2 Mo)                                   │
│  └─ Chemin d'installation iFly : .../ifly-aircraft-737max8/                      │
│                                                                                   │
│  ⚙️ Paramètres de traitement                                                       │
│  ├─ ID de début de procédure terminale : 1000                                     │
│  ├─ Précision des coordonnées : 8 décimales                                       │
│  ├─ Modèle de déclinaison magnétique : WMM-2025                                   │
│  └─ Cycle AIRAC : 2508 (calcul automatique)                                       │
│                                                                                   │
│  📊 Traitement estimé                                                              │
│  ├─ Points de cheminement : ~ 12 456                                              │
│  ├─ Procédures terminales : ~ 350                                                 │
│  └─ Temps estimé : 5-10 minutes                                                   │
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘

Confirmer le début de la conversion ? [O/n] :
```

### Traitement des données d'itinéraire

```
╭─────────────────────────────────────────── 🛣️ Traitement des données d'itinéraire ───────────────────────────────────────────╮
│                                                                                                      │
│ Traitement des données de segment d'itinéraire NAIP en cours...                                      │
│                                                                                                      │
│ ████████████████████████████████████████ 12 456/12 456 (100%) ⏱️ 0:03:45                         │
│                                                                                                      │
│ Traitement actuel : Itinéraire A1 → Segment ZSAM-VOR01                                               │
│ Calcul de la déclinaison magnétique : 39.917°N, 116.383°E → +7.2°                                   │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Statistiques de traitement des itinéraires :
✅ Traitement réussi : 12 456 points de cheminement
✅ Calculs de déclinaison magnétique : 12 456 (moy. 0,02s/occurrence)
✅ Fichier de sortie : WPNAVRTE.txt (+2,3 Mo)
⚠️ Enregistrements ignorés : 23 (coordonnées anormales)
```

### Traitement des procédures terminales

```
╭─────────────────────────────────────────── 🏢 Traitement des procédures terminales ───────────────────────────────────────────╮
│                                                                                                      │
│ Conversion des données de procédure terminale en cours...                                            │
│                                                                                                      │
│ ████████████████████████████████████████ 350/350 (100%) ⏱️ 0:02:15                               │
│                                                                                                      │
│ Traitement actuel : ZBAA (Pékin Capital) → SID SHUAY1A                                               │
│ Type de procédure : Procédure de départ standard aux instruments (SID)                               │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Statistiques des procédures terminales :
✅ Aéroports traités : 145
✅ Procédures SID : 234
✅ Procédures STAR : 198  
✅ Procédures d'approche : 312
✅ Nouveaux fichiers ajoutés : 89
✅ Fichiers mis à jour : 56
```

### Gestion du cycle AIRAC

```
╭─────────────────────────────────────────── 📅 Gestion du cycle AIRAC ───────────────────────────────────────────╮
│                                                                                                      │
│ Calcul et configuration du cycle AIRAC en cours...                                                   │
│                                                                                                      │
│ 🗓️ Informations de calcul                                                                              │
│ ├─ Date de référence : 2024-01-11 (AIRAC 2401)                                                        │
│ ├─ Date actuelle : 2024-12-24                                                                         │
│ ├─ Jours écoulés : 348 jours                                                                          │
│ ├─ Cycles écoulés : 12.43 → 12 cycles complets                                                        │
│ └─ Cycle actuel : 2508                                                                               │
│                                                                                                      │
│ 📋 Détails du cycle                                                                                    │
│ ├─ Identifiant AIRAC : 2508                                                                           │
│ ├─ Date d'entrée en vigueur : 2024-12-19                                                              │
│ ├─ Date d'expiration : 2025-01-16                                                                     │
│ └─ Jours restants : 23 jours                                                                          │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

✅ Fichier AIRAC généré : FMC_Ident.txt
```

## ✅ Conversion terminée

### Résumé de succès

```
┌─────────────────────────────────────────── ✅ Conversion terminée ───────────────────────────────────────────────┐
│                                                                                                        │
│  🎉 Félicitations ! La conversion des données de navigation est terminée avec succès                          │
│                                                                                                        │
│  📊 Statistiques de traitement                                                                          │
│  ├─ 🛣️ Données d'itinéraire : 12 456 points de cheminement                                                │
│  ├─ 🏢 Procédures terminales : 350 procédures (145 aéroports)                                             │
│  ├─ 📅 Cycle AIRAC : 2508                                                                               │
│  └─ ⏱️ Durée totale : 6 minutes 32 secondes                                                              │
│                                                                                                        │
│  📁 Fichiers de sortie                                                                                    │
│  ├─ WPNAVRTE.txt : Données d'itinéraire (+2,3 Mo)                                                          │
│  ├─ FMC_Ident.txt : Fichier d'identification AIRAC                                                        │
│  ├─ Supplemental : 89 nouveaux fichiers de procédure                                                      │
│  └─ Journal de conversion : converter.log                                                                 │
│                                                                                                        │
│  🔄 Étapes suivantes recommandées                                                                          │
│  1. Redémarrer Microsoft Flight Simulator                                                                 │
│  2. Charger l'iFly 737 MAX 8                                                                              │
│  3. Vérifier les nouveaux itinéraires et procédures dans le FMC                                           │
│  4. Sauvegarder les fichiers de sauvegarde pour la récupération                                          │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Description de l'emplacement des fichiers

Une fois la conversion terminée, les fichiers seront placés aux emplacements suivants :

```
📁 Répertoire des données de navigation iFly :
Community\ifly-aircraft-737max8\Data\navdata\

├── Permanent\
│   ├── WPNAVRTE.txt        # Données d'itinéraire (mises à jour)
│   └── Autres fichiers originaux...
│
├── Supplemental\
│   ├── ZBAA\              # Aéroport de Pékin Capital
│   │   ├── SID\           # Départs standard aux instruments (SID)
│   │   ├── STAR\          # Arrivées standard aux instruments (STAR)
│   │   └── APP\           # Procédures d'approche (APP)
│   ├── ZSPD\              # Aéroport de Shanghai Pudong
│   └── ...Autres aéroports
│
└── FMC_Ident.txt          # Fichier d'identification AIRAC
```

## 🧪 Vérifier les résultats de la conversion

### 1. Validation des fichiers

```bash
# Vérifier si les fichiers sont générés
ls -la "Community\ifly-aircraft-737max8\Data\navdata\"

# Vérifier la taille des fichiers (devrait être plus grande qu'avant la conversion)
du -h "Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt"

# Vérifier l'identifiant AIRAC
cat "Community\ifly-aircraft-737max8\Data\navdata\FMC_Ident.txt"
```

### 2. Validation dans le simulateur

1.  **Redémarrer MSFS** : Quitter complètement et redémarrer le simulateur
2.  **Charger l'iFly 737** : Sélectionner l'iFly 737 MAX 8
3.  **Vérifier le FMC** :
    ```
    Page d'accueil FMC → INIT REF → Afficher le cycle AIRAC
    Devrait afficher : AIRAC 2508
    ```
4.  **Tester les itinéraires** :
    ```
    Page ROUTE → Saisir un itinéraire chinois (ex. A1, B1)
    Devrait afficher correctement les points de cheminement et les distances
    ```

### 3. Liste de contrôle des tests fonctionnels

- [ ] **Affichage correct du cycle AIRAC**
- [ ] **Les itinéraires chinois peuvent être chargés** (A1, B1, G212, etc.)
- [ ] **Procédures aéroportuaires complètes** (SID, STAR, APP)
- [ ] **Coordonnées des points de cheminement précises**
- [ ] **Calcul de la déclinaison magnétique correct**
- [ ] **Navigation FMC normale**

## 🔧 Utilisation avancée

### Mode de traitement par lots

Bien que la version actuelle ne supporte pas directement le traitement par lots, vous pouvez l'implémenter via un script :

```python
# batch_convert.py
import subprocess
import os

databases = [
    "path/to/fenix_db1.db3",
    "path/to/fenix_db2.db3"
]

csv_file = "path/to/RTE_SEG.csv"

for db in databases:
    print(f"Traitement de la base de données : {db}")
    # Ici, main.py doit être modifié pour prendre en charge les arguments de ligne de commande
    # subprocess.run(["python", "main.py", "--db", db, "--csv", csv_file])
```

### Fichier de configuration personnalisé

Créez un fichier `config.json` pour sauvegarder les configurations courantes :

```json
{
    "default_fenix_path": "C:\\Users\\Username\\AppData\\Roaming\\Microsoft Flight Simulator\\Packages\\fenix-a320\\SimObjects\\Airplanes\\FenixA320\\navdata\\nd.db3",
    "default_csv_path": "D:\\Nav-Data\\RTE_SEG.csv",
    "terminal_id_start": 1500,
    "coordinate_precision": 8,
    "enable_backup": true,
    "backup_directory": "D:\\Nav-Data\\Backups"
}
```

### Processus de mise à jour des données

Processus de mise à jour périodique recommandé :

```bash
# 1. Sauvegarder les données actuelles
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_$(date +%Y%m%d)"

# 2. Télécharger les dernières données NAIP
# (Télécharger le nouveau RTE_SEG.csv depuis le site officiel)

# 3. Obtenir la dernière base de données Fenix
# (Assurez-vous que le Fenix A320 est mis à jour vers la dernière version)

# 4. Exécuter le convertisseur
python main.py

# 5. Vérifier les résultats
# (Tester les nouvelles données dans le simulateur)
```

## ⚠️ Points importants

### Rappels importants

1.  **Sauvegarde des données** : Sauvegardez impérativement les données de navigation iFly originales avant la conversion.
2.  **Compatibilité des versions** : Assurez-vous d'utiliser les dernières versions du Fenix A320 et de l'iFly 737 MAX 8.
3.  **Actualisation** : Il est recommandé de mettre à jour les données AIRAC tous les 28 jours.
4.  **Tests de validation** : Effectuez des vols d'essai sur des itinéraires clés après la conversion.

### Optimisation des performances

1.  **Utiliser un SSD** : Placez les fichiers de données sur un SSD pour améliorer la vitesse de traitement.
2.  **Désactiver l'antivirus** : Désactivez temporairement l'analyse en temps réel pour éviter les conflits d'accès aux fichiers.
3.  **Mémoire suffisante** : Assurez-vous d'avoir au moins 4 Go de mémoire disponible.
4.  **Alimentation stable** : Utilisez un onduleur (UPS) ou assurez-vous d'une alimentation stable.

### Dépannage

Si vous rencontrez des problèmes pendant le processus de conversion :

1.  **Vérifier le journal** : Vérifiez les messages d'erreur dans le fichier `converter.log`.
2.  **Réessayer l'opération** : Certains problèmes de réseau ou d'accès aux fichiers peuvent être temporaires.
3.  **Nettoyer le cache** : Supprimez les fichiers temporaires et réessayez.
4.  **Réduire les paramètres** : Si la mémoire est insuffisante, vous pouvez réduire la taille du traitement par lots.

---

**Félicitations pour avoir terminé !** 🎉 

Vous maîtrisez maintenant l'utilisation complète du convertisseur de données de navigation iFly. Si vous rencontrez des problèmes, veuillez consulter le [guide de dépannage](../troubleshooting.md) ou la [FAQ](../faq.md).

Bons vols ! ✈️
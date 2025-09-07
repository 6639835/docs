# 🛫 Guide de l'utilisateur du convertisseur de données de navigation iFly

Le convertisseur de données de navigation iFly est un outil professionnel de conversion de données de navigation aéronautiques, spécialement conçu pour convertir la base de données de navigation du Fenix A320 au format de base de données de navigation de l'iFly 737 MAX 8. Cet outil dispose d'une interface CLI moderne et de capacités de traitement de données de haute précision.

## 📖 Aperçu rapide

### 🎯 Fonctionnalités clés
- **🎨 Interface moderne** - Interface de terminal couleur basée sur la bibliothèque Rich, avec affichage de la progression en temps réel
- **🧭 Déclinaison magnétique de haute précision** - Calcul local utilisant le modèle géomagnétique WMM-2025 de pygeomag
- **📅 Gestion intelligente des cycles AIRAC** - Calcul et gestion dynamiques des cycles de révision des informations aéronautiques
- **⚡ Optimisation des performances** - Traitement concurrent et optimisation de la mémoire, prenant en charge les fichiers de données volumineux
- **🛡️ Qualité professionnelle** - Type hints complets, gestion des erreurs et couverture de tests

### ✈️ Modèles d'avion pris en charge
- **iFly 737 MAX 8** - Boeing 737 MAX 8 hautement simulé dans Microsoft Flight Simulator
- **Source des données** - Base de données de navigation Fenix A320 (`nd.db3`)
- **Données de route** - Données de segments de route de l'aviation civile chinoise NAIP RTE_SEG.csv

### 📊 Types de données couverts
- **🛣️ Données de route** - Routes haute/basse altitude, coordonnées des points de cheminement, déclinaison magnétique
- **🏢 Procédures terminales** - SID, STAR, procédures d'approche, procédures de départ
- **🧭 Équipements de navigation** - Données VOR/DME, NDB, ILS
- **📅 Cycles AIRAC** - Calcul et gestion automatiques de la validité des données

## 🚀 Démarrage rapide

### 1️⃣ Vérification des exigences système
```bash
# Vérifier la version de Python (3.8+ requis)
python --version

# Vérifier la mémoire disponible (4 Go+ recommandé)
# Windows: Gestionnaire des tâches → Performance → Mémoire
# macOS: Moniteur d'activité → Mémoire
# Linux: free -h
```

### 2️⃣ Préparation des fichiers nécessaires
- ✅ **Base de données de navigation Fenix** (`nd.db3`)
  ```
  %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **Données de route NAIP** (`RTE_SEG.csv`)
  - À obtenir sur le site web du service de données de l'aviation civile chinoise
  - Assurez-vous que le fichier est encodé en UTF-8
- ✅ **iFly 737 MAX 8** installé dans MSFS

### 3️⃣ Installation et exécution rapides
```bash
# 1. Installer les paquets de dépendance
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 2. Exécuter le convertisseur
python main.py

# 3. Suivre les invites de l'interface
# → Sélectionner le fichier de base de données Fenix
# → Sélectionner le fichier CSV NAIP
# → Définir la plage d'ID des procédures terminales
# → Attendre la fin de la conversion
```

## 📚 Navigation dans la documentation

### 🚀 Utilisation de base
1. **[Guide d'installation](installation.md)** - Configuration détaillée de l'environnement et installation des dépendances
   - Configuration de l'environnement Python
   - Installation des paquets de dépendance
   - Validation des exigences système
   - Résolution des problèmes d'installation courants

2. **[Instructions de configuration](configuration.md)** - Détails des fichiers de configuration et des paramètres
   - Options de configuration du convertisseur
   - Guide de configuration des chemins
   - Configuration des cycles AIRAC
   - Paramètres d'optimisation des performances

3. **[Instructions d'utilisation](usage.md)** - Flux de travail complet et exemples
   - Guide d'opération interactive
   - Méthodes de traitement par lots
   - Étapes de validation des données
   - Description des fichiers de sortie

### 🆘 Aide et support
- **[FAQ](../faq.md)** - Réponses aux questions les plus courantes des utilisateurs
- **[Dépannage](../troubleshooting.md)** - Diagnostic des problèmes et solutions

### 🔧 Contenu avancé
- **[Architecture technique](../architecture.md)** - Conception du système et principes de fonctionnement
- **[Guide de contribution](../contributing.md)** - Participation au développement et normes de codage
- **[Journal des modifications](../changelog.md)** - Historique des versions et nouvelles fonctionnalités
- **[Informations sur la licence](../license.md)** - Conditions d'utilisation et mentions légales

## 🎨 Aperçu de l'interface

### Écran d'accueil
```
╔═════════════════════════════════════ 🛩️  Outil de conversion de données de navigation aéronautique  ✈️ ═════════════════════════════════════╗
║                                                                                                                                              ║
║                                      Convertisseur de données de navigation aéronautique Fenix vers iFly                                     ║
║                                                  Une expérience de conversion moderne et de haute qualité                                    ║
║                                                                                                                                              ║
╚════════════════════════════════════════════ Powered by Rich • Version 2.0 ════════════════════════════════════════════╝
```

### Affichage de la progression
```
╭─────────────────────────────────────────────── 🔄 Traitement des données de route ────────────────────────────────────────────────╮
│ Calcul de la déclinaison magnétique...                                                                                             │
│ ████████████████████████████████████████ 1,247/1,500 (83%) 0:02:15                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Résumé de la conversion
```
┌─────────────────────────────────────────── ✅ Conversion terminée ───────────────────────────────────────────────┐
│                                                                                                                │
│  🛣️  Données de route: 1 500 points de cheminement traités                                                       │
│  🏢  Procédures terminales: 245 procédures converties                                                            │
│  📅  Cycle AIRAC: 2508 (valide jusqu'au 2025-02-27)                                                              │
│  📁  Emplacement de sortie: Community\ifly-aircraft-737max8\Data\navdata\                                        │
│                                                                                                                │
└────────────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## ⚠️ Avis important

### Conformité des données
Cet outil est destiné uniquement à des fins de simulation de vol. Veuillez vous assurer que votre utilisation est conforme aux lois et réglementations applicables :
- **🎯 Usage de simulation uniquement** - Strictement interdit pour la navigation aérienne réelle
- **📋 Respect des accords** - Vérifier la légalité des sources de données
- **🔒 Usage non commercial** - Uniquement pour l'étude et le divertissement personnels

### Exigences techniques
- **🐍 Python 3.8+** - Python 3.9 ou version ultérieure recommandé
- **💾 Exigences de mémoire** - Au moins 4 Go de RAM (8 Go recommandé)
- **💿 Espace de stockage** - Au moins 500 Mo d'espace disponible
- **🖥️ Systèmes d'exploitation** - Windows 10/11, macOS 10.15+, Linux

### Sécurité des données
- **💾 Sauvegarder les données originales** - Veuillez sauvegarder les données de navigation originales d'iFly avant la conversion
- **🔍 Vérifier les résultats** - Vérifier l'exactitude des données dans le simulateur après la conversion
- **📅 Mises à jour régulières** - Il est recommandé de mettre à jour les données AIRAC tous les 28 jours
- **🔒 Gestion des autorisations** - Assurez-vous que le programme dispose des autorisations d'écriture de fichiers suffisantes

## 🎯 Scénarios d'utilisation

### 🎓 Passionnés de simulation de vol
- **✈️ Expérience améliorée** - Obtenir des données de navigation plus précises pour l'espace aérien chinois
- **🎮 Vol réaliste** - Expérimenter des procédures de vol basées sur des routes réelles
- **📚 Outil d'apprentissage** - Comprendre les systèmes de navigation aérienne modernes

### 👨‍🏫 Enseignement aéronautique
- **🎓 Usage de formation** - Fournir des données de navigation précises à des fins de formation
- **📊 Standardisation** - Conforme aux normes de l'Organisation de l'Aviation Civile Internationale (OACI)
- **🔄 Mises à jour en temps réel** - Basé sur les données du cycle AIRAC les plus récentes

### 👨‍💻 Développeurs
- **🔧 Référence API** - Structure de code et documentation claires
- **🧩 Modularité** - Conception facile à étendre et à personnaliser
- **🧪 Tests complets** - Couverture de test complète et assurance qualité

## 🆘 Obtenir de l'aide

Si vous rencontrez des problèmes lors de l'utilisation :

1. **📚 Consulter la documentation** - Consultez d'abord les instructions détaillées dans les sections pertinentes
2. **🔍 Vérifier les logs** - Vérifiez le fichier `converter.log` généré
3. **🧪 Valider l'environnement** - Utilisez l'outil de validation intégré pour vérifier la configuration du système
4. **💬 Support communautaire** - Signalez un problème ou participez aux discussions sur GitHub Issues

### Commandes de diagnostic rapide
```bash
# Vérifier l'environnement Python
python --version
python -c "import rich, pandas, pygeomag; print('Toutes les dépendances sont installées')"

# Vérifier les permissions de fichier
ls -la /path/to/ifly/navdata/

# Afficher les derniers logs
tail -n 50 converter.log
```

---

**Étape suivante**: Accédez au [Guide d'installation](installation.md) pour commencer à configurer votre environnement de développement, ou consultez directement les [Instructions d'utilisation](usage.md) pour un démarrage rapide !🚀
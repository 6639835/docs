# 📝 Journal des modifications

Toutes les modifications importantes des données de navigation (Nav-data) sont enregistrées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
et le projet suit le [Versionnement Sémantique](https://semver.org/lang/zh-CN/).

## [Non publié] - À venir

### 🚀 Ajouts
- Nouveau rapport de validation de données visuelles
- Optimisation de l'écriture de la base de données multithread
- Ajout du suivi de la progression du traitement des données

### 🔧 Améliorations
- Optimisation de l'utilisation de la mémoire pour prendre en charge des jeux de données plus importants
- Amélioration de la lisibilité des messages d'erreur
- Renforcement de la validation des fichiers de configuration

### 🐛 Correctifs
- Correction du problème de traitement des caractères spéciaux dans les noms d'aéroport
- Résolution des problèmes de concurrence des données lors du traitement parallèle

---

## [2.1.0] - 2024-12-24

### 🚀 Nouvelles fonctionnalités
- **Algorithme intelligent de fusion de routes** - Implémentation d'une logique avancée de fusion de données de routes, prenant en charge la détection automatique des points de cheminement communs et l'insertion intelligente des segments manquants
- **Outil de validation de base de données** - Ajout de `db_validator.py`, fournissant une vérification complète de l'intégrité de la base de données et des rapports de qualité
- **Prise en charge du traitement concurrent** - Traitement multithread de grands jeux de données, améliorant considérablement la vitesse de traitement
- **Intégration du calcul de la déclinaison magnétique** - Intégration de la bibliothèque pygeomag pour un calcul précis de la déclinaison magnétique
- **Suivi de la progression** - Ajout d'une barre de progression tqdm, affichant la progression du traitement en temps réel

### 🔧 Améliorations et optimisations
- **Optimisation de la gestion de la mémoire** - Implémentation d'un mécanisme de traitement par lots, réduisant considérablement l'empreinte mémoire
- **Précision de la conversion des coordonnées** - Amélioration de la précision de la conversion DMS vers degrés décimaux à 8 décimales
- **Gestion des erreurs améliorée** - Journaux d'erreurs plus détaillés et mécanismes de gestion des exceptions
- **Validation des données renforcée** - Ajout de la validation des plages de coordonnées et de la vérification du format des codes ICAO
- **Modularisation du code** - Refactorisation de la structure du code pour améliorer la maintenabilité

### 🐛 Corrections de problèmes
- Correction du problème de détection de l'encodage des fichiers CSV, gérant correctement l'encodage Latin-1
- Résolution des conflits de contrainte de base de données causés par des enregistrements en double
- Correction de la perte de précision des coordonnées des points de cheminement
- Résolution des problèmes de débordement de mémoire lors du traitement de fichiers volumineux
- Correction du problème de compatibilité des séparateurs de chemin Windows

### 📚 Mise à jour de la documentation
- Documentation technique entièrement réécrite, incluant des descriptions d'architecture détaillées
- Ajout de guides complets d'installation et de configuration
- Ajout de sections de dépannage et de FAQ
- Mise à jour de la documentation API et des exemples de code

### 🔒 Améliorations de la sécurité
- Ajout de la validation des chemins d'entrée pour prévenir les attaques par traversée de répertoire
- Renforcement du mécanisme de nettoyage des entrées SQL
- Amélioration de la vérification des permissions de fichiers

---

## [2.0.0] - 2024-11-15

### 🚀 Mises à jour majeures
- **Moteur de traitement de données entièrement refactorisé** - Architecture modulaire conçue à partir de zéro
- **Prise en charge du PMDG 777** - Prise en charge étendue des PMDG 777-300ER et 777F
- **Nouvelle architecture de base de données** - Structure de table optimisée, meilleures performances et compatibilité
- **Support spécifique pour les données de la région Chine** - Optimisations spéciales pour les données de l'aviation civile chinoise

### 🔧 Améliorations techniques
- **Prise en charge de Python 3.8+** - Mise à jour vers des versions modernes de Python
- **Annotations de type** - Ajout complet d'indications de type pour améliorer la qualité du code
- **Traitement asynchrone** - Introduction de la capacité de traitement asynchrone des données
- **Gestion de la configuration** - Nouveau système de configuration, prenant en charge les fichiers de configuration YAML

### 📊 Améliorations du traitement des données
- **Intégration de données multi-sources** - Prise en charge de diverses sources de données telles que NAIP, X-Plane, CIFP
- **Unification du système de coordonnées** - Conversion et validation standardisées des coordonnées
- **Assurance qualité des données** - Processus complet de validation et de nettoyage des données

### 🛠️ Améliorations des outils
- **Optimisation de l'interface en ligne de commande** - Outil CLI plus convivial
- **Prise en charge du traitement par lots** - Prise en charge du traitement par lots de plusieurs fichiers de données
- **Mise à niveau du système de journalisation** - Journaux structurés, meilleur support de débogage

### 💔 Changements cassants
- **Exigence de version Python minimale** - Nécessite Python 3.8 ou une version ultérieure
- **Changement de format de fichier de configuration** - Nouveau format de configuration YAML
- **Refactorisation de l'interface API** - Les interfaces de certaines fonctions et classes ont changé
- **Mise à jour des dépendances** - Plusieurs paquets de dépendances critiques ont été mis à jour

### 🗑️ Fonctionnalités supprimées
- Suppression de la prise en charge de Python 2.7
- Suppression du support obsolète du format de configuration XML
- Suppression de la fonctionnalité expérimentale de source de données réseau

---

## [1.5.2] - 2024-10-10

### 🐛 Correctifs
- Correction du problème de compatibilité des données AIRAC 2410
- Résolution du problème de chemin de base de données du PMDG 737-900
- Correction du problème d'encodage des fichiers journaux

### 🔧 Améliorations
- Optimisation de la gestion du pool de connexions de la base de données
- Amélioration de l'affichage des messages d'erreur en chinois
- Mise à jour de la base de données de recherche des noms d'aéroport

---

## [1.5.1] - 2024-09-28

### 🐛 Correctifs
- Correction de la détection du chemin de la version Steam de MSFS
- Résolution du problème de précision du calcul de la direction des pistes
- Correction des erreurs d'analyse CSV causées par des caractères spéciaux

### 📚 Documentation
- Mise à jour des instructions de chemin MSFS dans le guide d'installation
- Ajout de solutions aux problèmes courants

---

## [1.5.0] - 2024-09-15

### 🚀 Ajouts
- **Prise en charge AIRAC 2409** - Prise en charge du dernier cycle de réglementation de l'information aéronautique
- **Amélioration des données de piste** - Ajout d'informations sur le type de surface et la pente des pistes
- **Fonction de sauvegarde automatique** - Sauvegarde automatique des données de navigation existantes
- **Rapports de validation de données** - Génération de rapports détaillés sur le traitement des données

### 🔧 Améliorations
- Amélioration de la vitesse de traitement des données des grands aéroports
- Optimisation de l'efficacité de l'utilisation de la mémoire
- Amélioration des informations de retour de l'interface utilisateur

### 🐛 Correctifs
- Correction des erreurs de données d'altitude pour les aéroports en haute altitude
- Résolution des problèmes de traitement des codes ICAO pour certains aéroports spéciaux
- Correction des erreurs de conversion d'unités de longueur de piste

---

## [1.4.1] - 2024-08-20

### 🐛 Correctifs
- Correction du problème de compatibilité avec Windows 11
- Résolution du problème de verrouillage de la base de données
- Correction des erreurs de traitement des chemins en chinois

### 🔧 Améliorations
- Amélioration de la vitesse de démarrage
- Optimisation des messages d'erreur

---

## [1.4.0] - 2024-08-05

### 🚀 Ajouts
- **Base de support multilingue** - Ajout d'un cadre d'internationalisation
- **Fonction d'exportation de données** - Prise en charge de l'exportation vers plusieurs formats
- **Surveillance des performances** - Ajout de statistiques de performance de traitement

### 🔧 Améliorations
- **Optimisation de la base de données** - Refonte de la structure de l'index, augmentation de la vitesse de requête de 40%
- **Gestion de la mémoire** - Réduction de l'empreinte mémoire de 30%
- **Expérience utilisateur** - Amélioration des messages d'erreur et de l'affichage de l'état

### 🐛 Correctifs
- Correction du problème de duplication des points de cheminement
- Résolution du problème de précision de la fréquence ILS
- Correction des erreurs de traitement du fuseau horaire

---

## [1.3.2] - 2024-07-12

### 🐛 Correctifs
- Correction de la compatibilité avec la série PMDG 737 MAX
- Résolution de l'impact de l'heure d'été sur les dates AIRAC
- Correction du problème d'affichage de la fréquence de certains équipements de navigation

---

## [1.3.1] - 2024-06-28

### 🐛 Correctifs
- Correction du problème de traitement des chemins macOS
- Résolution du problème du marqueur BOM des fichiers CSV
- Correction des erreurs de validation de connexion de route

### 🔧 Améliorations
- Amélioration de la vitesse de lecture des fichiers
- Optimisation du format de sortie des journaux

---

## [1.3.0] - 2024-06-15

### 🚀 Ajouts
- **Prise en charge de Linux** - Extension du support aux systèmes Linux
- **Validation de configuration** - Ajout de la vérification de la syntaxe des fichiers de configuration
- **Statistiques de données** - Génération d'informations statistiques détaillées sur le traitement des données

### 🔧 Améliorations
- **Compatibilité multiplateforme** - Unification du comportement sur différents systèmes d'exploitation
- **Récupération d'erreurs** - Amélioration de la tolérance aux pannes du traitement des données
- **Qualité du code** - Refactorisation des modules principaux pour améliorer la qualité du code

### 🐛 Correctifs
- Correction du problème de traitement des caractères non-ASCII
- Résolution du problème de timeout lors du traitement de fichiers volumineux
- Correction des erreurs de traitement des transactions de base de données

---

## [1.2.1] - 2024-05-20

### 🐛 Correctifs
- Correction des erreurs de calcul de la date AIRAC
- Résolution des problèmes de conversion des coordonnées de certains aéroports
- Correction du problème d'affichage imprécis de la progression

---

## [1.2.0] - 2024-05-05

### 🚀 Ajouts
- **Prise en charge AIRAC 2405** - Prise en charge du dernier cycle de données de navigation
- **Mode traitement par lots** - Prise en charge du traitement de plusieurs fichiers de données
- **Détection des différences de données** - Comparaison des différences entre les données de différentes versions

### 🔧 Améliorations
- **Vitesse de traitement** - Vitesse de traitement des données augmentée de 25%
- **Optimisation de la mémoire** - Optimisation de l'utilisation de la mémoire pour les grands jeux de données
- **Détail des journaux** - Fourniture de journaux de traitement plus détaillés

### 🐛 Correctifs
- Correction du traitement des restrictions d'altitude de route
- Résolution du problème de duplication des fréquences VOR/DME
- Correction de la précision des données d'élévation des aéroports

---

## [1.1.2] - 2024-04-18

### 🐛 Correctifs
- Correction du problème de prise en charge des chemins longs de Windows
- Résolution des erreurs d'encodage des caractères spéciaux
- Correction du problème de timeout de connexion à la base de données

---

## [1.1.1] - 2024-04-05

### 🐛 Correctifs
- Correction du problème de chemin de base de données du PMDG 737-800
- Résolution de l'erreur de calcul de l'angle du glide slope ILS
- Correction du problème de points de cheminement manquants

### 📚 Documentation
- Mise à jour du guide d'installation
- Ajout d'un chapitre de dépannage

---

## [1.1.0] - 2024-03-22

### 🚀 Ajouts
- **Prise en charge des procédures STAR** - Ajout du traitement des procédures d'arrivée terminale standard
- **Procédures d'approche** - Prise en charge des données de procédures d'approche aux instruments
- **Validation de données renforcée** - Vérifications plus strictes de l'intégrité des données

### 🔧 Améliorations
- **Optimisation des procédures SID** - Amélioration du traitement des procédures de départ aux instruments standard
- **Précision des coordonnées** - Amélioration de la précision du calcul des coordonnées
- **Gestion des erreurs** - Meilleures informations d'erreur et mécanismes de récupération

### 🐛 Correctifs
- Correction de la validation de la plage de fréquences NDB
- Résolution du problème de connexion de route rompue
- Correction du calcul du relèvement magnétique de la piste

---

## [1.0.0] - 2024-03-01

### 🎉 Première publication officielle

#### 🚀 Fonctionnalités principales
- **Prise en charge complète de la série PMDG 737** - Prise en charge de toutes les variantes du PMDG 737
- **Conversion complète des données de navigation** - Données d'aéroport, de pistes, d'équipements de navigation, de routes
- **Optimisation pour la région Chine** - Optimisation spécifique pour les données de l'aviation civile chinoise
- **Prise en charge AIRAC 2403** - Prise en charge du cycle d'informations aéronautiques de mars 2024

#### 🛠️ Caractéristiques techniques
- **Base de données SQLite** - Format de base de données compatible PMDG
- **Prise en charge de données multi-sources** - Prise en charge des sources de données NAIP et X-Plane
- **Traitement automatisé** - Processus de conversion de données en un clic
- **Validation de données** - Vérification complète de la qualité des données

#### 📊 Types de données pris en charge
- Informations de base sur les aéroports (codes ICAO, coordonnées, noms)
- Données de piste (longueur, largeur, direction, surface)
- Équipements de navigation VOR/DME
- Balises de navigation NDB
- Points de cheminement et réseau de routes
- Système d'atterrissage aux instruments ILS

#### 🎯 Avions pris en charge
- PMDG 737-600
- PMDG 737-700
- PMDG 737-800
- PMDG 737-900

#### 🌍 Régions prises en charge
- Chine continentale (codes ICAO ZB, ZG, ZS, ZJ, ZY, ZL, ZH, ZU, ZP, ZW)

---

## Planification des versions

### 🔮 Plans pour les futures versions

#### v2.2.0 (Prévu T1 2025)
- **Prise en charge des avions iniBuilds** - Prise en charge étendue de la série d'avions iniBuilds
- **Mises à jour de données en temps réel** - Prise en charge des mises à jour des données AIRAC en ligne
- **Interface utilisateur graphique** - Ajout d'une application GUI de bureau
- **Source de données cloud** - Prise en charge de l'intégration de sources de données cloud

#### v2.3.0 (Prévu T2 2025)
- **Prise en charge des données mondiales** - Extension aux données de navigation à l'échelle mondiale
- **Système de plugins personnalisés** - Prise en charge du développement de plugins tiers
- **Outils d'analyse de données** - Analyse et visualisation de données intégrées
- **REST API** - Fourniture d'une interface API Web

#### v3.0.0 (Prévu T4 2025)
- **Architecture de nouvelle génération** - Architecture distribuée basée sur les microservices
- **Optimisation par apprentissage automatique** - Traitement et optimisation intelligents des données
- **Support multi-simulateurs** - Prise en charge d'autres simulateurs comme P3D, FSX
- **Fonctionnalités de niveau entreprise** - Fonctionnalités d'entreprise telles que haute disponibilité, équilibrage de charge

---

## 📋 Notes de mise à jour

### 🔖 Règles de numérotation des versions
Nous utilisons le versionnement sémantique (SemVer) :
- **Version majeure** (X.y.z) - Modifications API incompatibles
- **Version mineure** (x.Y.z) - Nouvelles fonctionnalités rétrocompatibles
- **Version de patch** (x.y.Z) - Corrections de problèmes rétrocompatibles

### 🏷️ Description des types de changements
- **🚀 Ajout (Added)** - Nouvelle fonctionnalité
- **🔧 Amélioration (Changed)** - Modification d'une fonctionnalité existante
- **🗑️ Obsolète (Deprecated)** - Fonctionnalité qui sera bientôt supprimée
- **🗑️ Supprimé (Removed)** - Fonctionnalité qui a été supprimée
- **🐛 Correctif (Fixed)** - Correction de problème
- **🔒 Sécurité (Security)** - Correctifs liés à la sécurité

### 📅 Cycle de publication
- **Versions majeures** - 1 à 2 mises à jour significatives par an
- **Versions mineures** - Mises à jour de fonctionnalités trimestrielles
- **Versions de patch** - Corrections de bugs publiées au besoin

### 🔗 Obtenir les mises à jour
- **GitHub Releases** - Obtenez la dernière version et le journal des modifications détaillé
- **Notifications automatiques** - Abonnez-vous aux notifications de publication pour les dernières mises à jour
- **Tests Beta** - Participez au programme de tests Beta pour découvrir les nouvelles fonctionnalités

---

**Note** : Pour consulter les modifications détaillées d'une version spécifique, veuillez visiter la page [GitHub Releases](https://github.com/Nav-data/releases).
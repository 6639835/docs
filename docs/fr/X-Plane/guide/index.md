# Guide d'utilisation de Nav-data

Bienvenue dans **Nav-data** - l'outil professionnel de conversion de données de navigation aérienne !

## 🛩️ Aperçu du projet

Nav-data est un outil open source de traitement et de conversion de données de navigation aérienne, spécialement conçu pour le simulateur de vol X-Plane. Cet outil est capable de convertir les données NAIP (National Aeronautical Information Publication) de l'aviation civile chinoise dans un format standard reconnaissable par X-Plane, afin de fournir aux passionnés de simulation de vol et aux professionnels de l'aviation des données de navigation précises et complètes pour l'espace aérien chinois.

## ✨ Fonctionnalités clés

### 🛣️ Traitement des données de route
- **Conversion CSV vers DAT** : Convertit les données de route au format CSV en format DAT pour X-Plane
- **Filtrage de zone** : Filtre intelligemment les données de l'espace aérien chinois (prend en charge les codes de zone tels que ZB, ZG, ZY, ZS, ZW, ZJ, ZP, ZL, ZH, ZU)
- **Prise en charge des types de points de navigation** :
  - DESIGNATED_POINT (Point désigné) - Code de type 11
  - VOR/DME - Code de type 3
  - NDB - Code de type 2
- **Gestion du cycle AIRAC** : Calcule et gère automatiquement la période de validité des données AIRAC

### 📄 Extraction de données PDF
- **Traitement des procédures terminales** : Extrait et standardise les données de procédures aéronautiques à partir de fichiers PDF
- **Extraction de coordonnées de points de route** : Extrait automatiquement les informations de coordonnées géographiques des points de route
- **Prise en charge multi-formats** : Prend en charge le traitement de fichiers PDF source de différents formats
- **Validation des données** : Vérification intégrée de l'intégrité et de l'exactitude des données

### 🔧 Correction et encodage des données
- **Normalisation des formats** : Corrige et standardise le format des données CIFP X-Plane
- **Correction d'encodage** : Corrige automatiquement les problèmes d'encodage des données de procédures d'approche, SID, STAR
- **Assurance qualité** : Plusieurs validations garantissent que les données de sortie sont conformes aux normes X-Plane

## 🎯 Utilisateurs cibles

### Passionnés de simulateurs de vol
- Obtenez des données de navigation de haute qualité pour l'espace aérien chinois
- Profitez d'une expérience de vol plus réaliste
- Prise en charge de divers types d'avions utilisant les données par défaut de X-Plane

### Professionnels de l'aviation
- Données de navigation précises pour la formation et l'enseignement
- Conforme aux normes de l'Organisation de l'aviation civile internationale (OACI)
- Basé sur des sources de données NAIP fiables

### Développeurs
- Structure de code claire et documentation API
- Conception modulaire facilitant l'extension
- Système complet de gestion des erreurs et de journalisation

## 📊 Prise en charge des standards de données

### Standards internationaux
- **Standards OACI** : Conforme aux standards de données de navigation de l'Organisation de l'aviation civile internationale
- **ARINC 424** : Respecte le standard de base de données de navigation ARINC 424
- **Cycle AIRAC** : Prend en charge le cycle de mise à jour AIRAC standard de 28 jours

### Formats X-Plane
- **Données CIFP** : Prise en charge complète du format CIFP (Coded Instrument Flight Procedures) de X-Plane
- **Fichiers DAT** : Sortie au format DAT standard de X-Plane
- **Compatibilité** : Compatible avec X-Plane 11 et X-Plane 12

## 🚀 Démarrage rapide

### 1. Préparation de l'environnement
Assurez-vous que votre système a Python 3.6+ et les paquets de dépendances nécessaires installés.

### 2. Préparation des données
Préparez vos fichiers de données source (données de route au format CSV ou fichiers de procédures au format PDF).

### 3. Paramètres de configuration
Configurez les chemins de fichiers et les paramètres de traitement selon vos besoins.

### 4. Conversion des données
Exécutez les scripts de conversion appropriés pour démarrer le traitement des données.

## 📚 Navigation dans la documentation

### Utilisation de base
- [Guide d'installation](./installation.md) - Instructions détaillées pour l'installation et la configuration de l'environnement
- [Instructions de configuration](./configuration.md) - Explication détaillée des fichiers de configuration et des paramètres
- [Instructions d'utilisation](./usage.md) - Processus d'opération complet et exemples

### Détails techniques
- [Description de l'architecture](../architecture.md) - Architecture du système et principes techniques
- [Guide de contribution](../contributing.md) - Guide pour participer au développement du projet
- [Journal des modifications](../changelog.md) - Enregistrement des mises à jour et améliorations de version

## ⚠️ Remarques importantes

### Précision des données
- Cet outil effectue la conversion basée sur des données NAIP publiques
- Il est conseillé de vérifier les données de navigation critiques avant tout vol réel
- Mettez à jour les données régulièrement pour maintenir la synchronisation du cycle AIRAC

### Restrictions d'utilisation
- Uniquement destiné à la simulation de vol et à des fins pédagogiques
- Ne doit pas être utilisé pour la navigation aérienne réelle
- Respectez les lois, réglementations et accords d'utilisation des données pertinents

### Support technique
- Consultez la [FAQ - Questions fréquentes](./usage.md#faq)
- Soumettez des [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- Participez aux discussions de la communauté

---

**Commencez dès maintenant votre voyage de conversion de données de navigation !** 📈
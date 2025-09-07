# 🧭 Guide d'utilisation

Bienvenue dans l'outil de conversion de données de navigation aérienne Nav-data ! Ce guide vous aidera à maîtriser entièrement ce système professionnel de traitement de données de navigation aérienne.

## 📋 Navigation rapide

### 🚀 Premiers pas
- [**Guide d'installation**](./installation.md) - Configuration requise et processus d'installation complet
- [**Instructions de configuration**](./configuration.md) - Configuration des sources de données et réglage du cycle AIRAC
- [**Instructions d'utilisation**](./usage.md) - Processus complet de conversion et de déploiement des données

### 🆘 Aide et support
- [**Foire aux questions (FAQ)**](../faq.md) - Réponses aux questions les plus fréquentes des utilisateurs
- [**Dépannage**](../troubleshooting.md) - Diagnostic des problèmes et solutions

### 🔧 Sujets avancés
- [**Description de l'architecture**](../architecture.md) - Architecture système et implémentation technique

## 🎯 Présentation du projet

Nav-data est un outil professionnel de conversion de données de navigation aérienne, conçu pour fournir un support de données de navigation en temps réel et précis aux modules complémentaires avancés de Microsoft Flight Simulator.

### 🏆 Avantages clés

#### ✈️ Précision des données de niveau professionnel
- **Compatibilité standard AIRAC** : Conforme strictement au cycle AIRAC de 28 jours de l'ICAO
- **Coordonnées de haute précision** : Prend en charge les coordonnées géographiques avec une précision de 8 décimales
- **Calcul de la déclinaison magnétique** : Utilise le WMM (Modèle Magnétique Mondial) pour les calculs en temps réel
- **Prise en charge de multiples standards** : Compatible avec les formats de données ARINC 424, X-Plane et NAIP

#### 🔄 Traitement intelligent des données
- **Fusion de données multi-sources** : Intègre plusieurs sources de données (NAIP, X-Plane, CIFP)
- **Validation intelligente des données** : Détecte et corrige automatiquement les problèmes d'intégrité des données
- **Prise en charge des mises à jour incrémentielles** : Mécanisme efficace de mise à jour différentielle des données
- **Optimisation du traitement parallèle** : Traitement parallèle multi-processus de grands ensembles de données

#### 🛫 Compatibilité étendue
- **MSFS 2020 & 2024** : Prise en charge complète des deux versions de Microsoft Flight Simulator
- **Multiples plateformes de distribution** : Compatible avec les versions Steam, Microsoft Store, Xbox
- **Prise en charge des modules complémentaires haut de gamme** : Optimisé spécifiquement pour les modules complémentaires premium iniBuilds et PMDG

### 📊 Types de données de navigation pris en charge

| Type de données | Nom anglais | Code standard | Description |
|-----------------|-------------|---------------|-------------|
| Informations sur les aéroports | Airports | APT | Code ICAO de l'aéroport, coordonnées, déclinaison magnétique |
| Données de piste | Runways | RWY | Identifiant de piste, direction, longueur, type de surface |
| Radionav VHF | VHF Navaids | VHF | Fréquences des radionav VOR, DME, TACAN |
| Radionav NDB | NDB Navaids | NDB | Fréquences et portée des balises non directionnelles |
| Points de cheminement | Waypoints | FIX | Coordonnées des points de cheminement et classification régionale |
| Système de voies aériennes | Airways | AWY | Voies aériennes supérieures et inférieures et leurs interconnexions |
| Procédures de départ | SIDs | SID | Procédures de départ aux instruments standard |
| Procédures d'arrivée | STARs | STAR | Routes d'arrivée terminales standard |
| Procédures d'approche | Approaches | IAP | Diverses procédures d'approche aux instruments |
| Systèmes d'atterrissage | ILS/GLS | GS | Informations de guidage du système d'atterrissage aux instruments |

### 🌍 Zones couvertes

Cet outil couvre principalement les zones ICAO suivantes :

- **Chine continentale** : ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH
- **Asie du Sud-Est** : VM (Vietnam), VH (Hong Kong)
- **Asie du Nord-Est** : RK (partie de la Corée du Sud)

### 🎯 Modules complémentaires d'avion pris en charge

#### Série iniBuilds
- **Airbus A350-900** - Avion de ligne long-courrier à fuselage large
- **Airbus A350-900ULR** - Version ultra long-courrier
- **Airbus A350-1000** - Version allongée

#### Série PMDG
- **Boeing 737-600/700/800/900** - Série d'avions de ligne à fuselage étroit
- **Boeing 777-300ER** - Avion de ligne long-courrier à fuselage large
- **Boeing 777F** - Version cargo

## 🚦 Mise en route

### Vérification des prérequis

Avant de commencer, veuillez vous assurer que vous disposez de :

- [ ] **Microsoft Flight Simulator 2020 ou 2024** (n'importe quelle version)
- [ ] Environnement de développement **Python 3.8+**
- [ ] **Abonnement valide aux données de navigation** (Navigraph ou Aerosoft NavDataPro)
- [ ] **Module complémentaire d'avion cible** (iniBuilds A350 ou PMDG 737/777)
- [ ] **Droits d'administrateur** (pour l'accès au système de fichiers)

### 📖 Parcours d'apprentissage recommandé

1.  **📥 Préparation de l'environnement** → [Guide d'installation](./installation.md)
2.  **⚙️ Configuration des données** → [Instructions de configuration](./configuration.md)
3.  **🔄 Exécution de la conversion** → [Instructions d'utilisation](./usage.md)
4.  **🛠️ Compréhension approfondie** → [Description de l'architecture](../architecture.md)

## ⚡ Démarrage rapide

Si vous êtes déjà expérimenté, vous pouvez directement passer à :

```bash
# Installation rapide des dépendances
pip install -r requirements.txt

# Exécuter l'outil de conversion
python XP2INI_NDB_Converter.py
```

## 📞 Obtenir de l'aide
- **💡 Suggestions de fonctionnalités** : Référez-vous au [Guide de contribution](../contributing.md)

---

Prêt à commencer ? Lançons-nous dans votre aventure Nav-data avec le [Guide d'installation](./installation.md) ! 🚀
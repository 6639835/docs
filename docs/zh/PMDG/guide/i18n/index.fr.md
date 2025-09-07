# 🛫 Guide de l'utilisateur Nav-data

Nav-data est une suite d'outils professionnels de conversion de données de navigation aérienne, spécialement conçue pour fournir un support de données de navigation de haute qualité aux avions PMDG dans Microsoft Flight Simulator. Cet outil convertit divers formats de données aéronautiques standard en un format de base de données SQLite compatible PMDG.

## 📖 Aperçu rapide

### 🎯 Fonctionnalités clés
- **Intégration de données multi-sources** - Prend en charge les formats standard tels que AIRAC, ARINC 424, X-Plane
- **Conversion de données professionnelle** - Calcul précis de la conversion des systèmes de coordonnées et de la déclinaison magnétique
- **Assurance qualité** - Validation de données et vérifications d'intégrité intégrées
- **Optimisation pour la région chinoise** - Spécifiquement optimisé pour les données de l'aviation civile chinoise

### ✈️ Modèles d'avions pris en charge
- **PMDG 737 Série**: 737-600, 737-700, 737-800, 737-900
- **PMDG 777 Série**: 777-300ER, 777F

### 📊 Couverture des types de données
- **Données d'aéroport** - Codes OACI, pistes, déclinaison magnétique
- **Équipements de navigation** - VOR/DME, NDB, ILS/GS
- **Réseau de routes** - Routes haute/basse altitude, points de cheminement
- **Procédures de vol** - SID, STAR, procédures d'approche

## 📚 Navigation dans la documentation

### 🚀 Démarrage rapide
1. [Guide d'installation](installation.md) - Configuration de l'environnement et installation des dépendances
2. [Instructions de configuration](configuration.md) - Configuration de la source de données et des chemins
3. [Instructions d'utilisation](usage.md) - Processus de conversion et étapes d'opération

### 🆘 Aide et support
- [Questions fréquentes](../faq.md) - Réponses aux questions les plus fréquentes des utilisateurs
- [Dépannage](../troubleshooting.md) - Diagnostic des problèmes et solutions

### 🔧 Contenu avancé
- [Architecture technique](../architecture.md) - Conception du système et principes de fonctionnement
- [Guide de contribution](../contributing.md) - Participation au développement et normes de code
- [Journal des modifications](../changelog.md) - Historique des versions et nouvelles fonctionnalités
- [Informations sur la licence](../license.md) - Conditions d'utilisation et mentions légales

## ⚠️ Remarque importante

### Conformité des données
Cet outil est destiné uniquement à des fins de simulation de vol, veuillez vous assurer que votre source de données est conforme aux lois et réglementations en vigueur :
- Respecter les normes de l'Organisation de l'aviation civile internationale (OACI)
- Confirmer la légalité de la source de données
- Uniquement pour la simulation de vol à des fins non commerciales

### Exigences techniques
- **Python 3.8+** - Il est recommandé d'utiliser Python 3.9 ou une version ultérieure
- **Exigences de mémoire** - Au moins 4 Go de RAM (8 Go recommandés)
- **Espace de stockage** - Au moins 2 Go d'espace disponible
- **Système d'exploitation** - Windows 10/11, macOS 10.15+, Linux

### Fréquence de mise à jour des données
- **Cycle AIRAC** - Il est recommandé de le mettre à jour tous les 28 jours
- **Données source** - Assurez-vous d'utiliser les données du cycle AIRAC les plus récentes et valides
- **Compatibilité des versions** - Confirmer la compatibilité avec les versions d'avions PMDG

## 🆘 Obtenir de l'aide

Si vous rencontrez des problèmes lors de l'utilisation :

1. **Consulter la documentation** - Consultez d'abord les explications détaillées dans les sections pertinentes
2. **Vérifier les journaux** - Consultez les fichiers journaux générés pour comprendre les erreurs spécifiques
3. **Valider les données** - Utilisez l'outil de validation intégré pour vérifier l'intégrité des données
4. **Support communautaire** - Signalez les problèmes dans les GitHub Issues

---

**Étape suivante**: Rendez-vous sur le [Guide d'installation](installation.md) pour commencer à configurer votre environnement de développement.
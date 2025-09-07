# 🙋 Foire Aux Questions (FAQ)

## 📥 Installation

### Q1: Quels systèmes d'exploitation sont pris en charge ?
**R:**
- ✅ **Windows 10/11** (Recommandé)
- ✅ **macOS 10.15+** (Catalina et versions ultérieures)
- ✅ **Ubuntu 20.04+ / Debian 11+**
- ✅ **Autres distributions Linux majeures**

### Q2: Quelles sont les exigences pour l'environnement Python ?
**R:**
- **Version minimale**: Python 3.8
- **Version recommandée**: Python 3.9 ou 3.10
- **Non pris en charge**: Python 3.7 et versions antérieures
- **Environnement virtuel**: L'utilisation de venv ou conda est fortement recommandée

### Q3: Combien d'espace de stockage est nécessaire ?
**R:**
- **Outil lui-même**: ~50 Mo
- **Paquets de dépendances**: ~200 Mo
- **Espace de traitement temporaire**: 1-2 Go
- **Données de sortie**: 500 Mo-1 Go (selon la zone couverte)
- **Total recommandé**: Au moins 4 Go d'espace disponible

### Q4: Quelle est la mémoire requise ?
**R:**
- **Minimale**: 4 Go de RAM
- **Recommandée**: 8 Go de RAM ou plus
- **Conversion à grande échelle**: 16 Go de RAM ou plus
- **Mémoire virtuelle**: Il est recommandé de la définir à 1,5 fois la mémoire physique

## ⚙️ Configuration

### Q5: Comment obtenir les données de navigation ?
**R:** Sources de données recommandées :
- **Navigraph** (Préféré) - Couverture mondiale, cycle de mise à jour de 28 jours
- **Données X-Plane** - Gratuites, mais fréquence de mise à jour plus faible
- **Données NAIP** - Optimisées pour la région asiatique
- **Source de données personnalisée** - Prend en charge le format ARINC 424

### Q6: Comment comprendre le cycle AIRAC ?
**R:**
- **Durée du cycle**: Un cycle tous les 28 jours
- **Date d'entrée en vigueur**: Une date spécifique de chaque mois (généralement un jeudi)
- **Format de version**: AAAA-CC (par exemple, 2024-01 signifie le 1er cycle de 2024)
- **Validité**: 28 jours, une mise à jour est recommandée après expiration

### Q7: Quels formats de données sont pris en charge ?
**R:**
**Formats d'entrée**:
- ✅ ARINC 424 (.dat, .txt)
- ✅ X-Plane (.dat, .txt)
- ✅ NAIP (.xml, .json)
- ✅ CIFP (.xml)

**Formats de sortie**:
- ✅ Format natif iniBuilds A350
- ✅ Base de données SQLite
- ✅ Fichier de configuration JSON
- ✅ Format d'exportation XML

### Q8: Comment configurer la priorité des sources de données ?
**R:** À configurer dans le fichier de configuration :
```json
{
  "data_sources": {
    "priority_order": ["navigraph", "naip", "xplane"],
    "fallback_enabled": true,
    "merge_strategy": "priority_override"
  }
}
```

## 🔄 Utilisation

### Q9: Combien de temps dure le processus de conversion ?
**R:** Estimation du temps de traitement :
- **Un seul aéroport**: 30 secondes - 2 minutes
- **Zone urbaine** (ex. : les environs de Pékin): 5-10 minutes
- **Zone provinciale** (ex. : province du Guangdong): 15-30 minutes
- **Niveau national** (ex. : toute la Chine): 45-90 minutes
- **Données mondiales**: 2-4 heures

### Q10: Est-ce que la mise à jour incrémentielle est possible ?
**R:** Prend en charge les mises à jour incrémentielles intelligentes :
```bash
# Met à jour uniquement les données modifiées
python converter.py --incremental --since-date=2024-01-01

# Met à jour en fonction du cycle AIRAC
python converter.py --update-airac --from=2024-01 --to=2024-02
```

### Q11: Comment vérifier les résultats de la conversion ?
**R:** Validation multicouche intégrée :
```bash
# Validation rapide
python validate.py --quick-check

# Validation complète
python converter.py --comprehensive --report=html

# Compare avec les données de référence
python converter.py --compare-with=reference_data.db
```

### Q12: Le traitement par lots est-il pris en charge ?
**R:** Prend en charge plusieurs modes de traitement par lots :
```bash
# Traite plusieurs cycles AIRAC par lots
python batch_converter.py --airac-range=2024-01:2024-06

# Traite plusieurs régions par lots
python batch_converter.py --regions=ZSPD,ZBAA,ZGGG --parallel=4
```

## ✈️ Intégration iniBuilds

### Q13: Quels avions iniBuilds sont pris en charge ?
**R:** Actuellement pris en charge :
- ✅ **A350-900** - Prise en charge complète de tous les systèmes
- ✅ **A350-900ULR** - Version ultra long-courrier
- ✅ **A350-1000** - Version allongée
- 🔄 **Série A320neo** - En développement
- 🔄 **Série A330** - Support planifié

### Q14: Où les données sont-elles installées ?
**R:** Détection automatique du chemin d'installation :
- **Chemin par défaut**: `MSFS Community folder/inibuilds-aircraft-a350/SimObjects/`
- **Version Steam**: `C:/Users/[Utilisateur]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalState/packages/`
- **Version Microsoft Store**: Similaire à la version Steam, mais avec un ID de paquet différent
- **Chemin personnalisé**: Peut être spécifié dans la configuration

### Q15: Comment confirmer que les données ont été correctement chargées ?
**R:** Étapes de vérification :
1. **Affichage MCDU**: Vérifiez si le cycle AIRAC est correct
2. **Planification de route**: Essayez de planifier une route connue
3. **Recherche de points de navigation**: Recherchez un point de navigation spécifique
4. **Chargement de procédures**: Chargez les procédures SID/STAR

### Q16: Est-ce compatible avec d'autres outils de données de navigation ?
**R:**
- ⚠️ **Il est déconseillé** de l'utiliser simultanément avec d'autres outils
- 🔄 **Détection de conflits** : L'outil détecte et avertit automatiquement des conflits
- 🛠️ **Outil de nettoyage** : Offre une fonction de nettoyage en un clic des données d'autres outils
- 📋 **Sauvegarde et restauration** : Prend en charge la sauvegarde automatique avant de changer d'outil

## 🌍 Couverture Géographique

### Q17: Quelles sont les principales régions couvertes ?
**R:** Zones de couverture détaillées :
- 🇨🇳 **Chine continentale**: Toutes les régions OACI (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- 🇭🇰 **Hong Kong**: Région VH
- 🇲🇴 **Macao**: Région VM
- 🇹🇼 **Taïwan**: Région RC
- 🇻🇳 **Vietnam**: Région VV
- 🇰🇷 **Corée du Sud**: Région RK (partielle)
- 🌏 **Autres régions d'Asie**: La qualité des données varie selon la région

### Q18: Quelle est la précision des données ?
**R:** Spécifications de précision :
- **Précision des coordonnées**: 8 décimales (environ 1 mètre de précision)
- **Précision de l'altitude**: 1 pied
- **Précision de la fréquence**: 0.01 MHz
- **Déclinaison magnétique**: Calculée en temps réel, utilisant le modèle WMM2020
- **Fréquence de mise à jour**: Suit le cycle AIRAC de 28 jours

### Q19: Quels types de données de navigation sont inclus ?
**R:** Types de données complets :
- ✈️ **Informations d'aéroport**: Code OACI, coordonnées, déclinaison magnétique, informations de piste
- 📡 **Équipements de navigation**: VOR, DME, NDB, TACAN
- 📍 **Points de cheminement**: Coordonnées, classification de zone, identifiant d'utilisation
- 🛣️ **Réseau de routes**: Routes haute/basse altitude, relations de connexion
- 🛫 **Procédures de départ**: SID (Standard Instrument Departure)
- 🛬 **Procédures d'arrivée**: STAR (Standard Terminal Arrival Route)
- 📐 **Procédures d'approche**: ILS, VOR, NDB, RNAV et autres types d'approches
- 📶 **Systèmes d'atterrissage**: Informations de guidage ILS/GLS

### Q20: Quel est le niveau de localisation en chinois ?
**R:**
- ✅ **Noms d'aéroport**: Correspondance chinois-anglais
- ✅ **Noms de villes**: Prise en charge complète du chinois
- ✅ **Noms de points de cheminement**: Identification en Pinyin et en chinois
- ✅ **Noms de procédures**: Règles de nommage localisées
- ✅ **Interface utilisateur**: Interface entièrement en chinois

## 🔧 Aspects Techniques

### Q21: Comment activer les journaux détaillés ?
**R:**
```bash
# Mode de débogage de base
python converter.py --debug

# Mode de journalisation détaillée
python converter.py --verbose --log-level=DEBUG

# Enregistrer le journal dans un fichier
python converter.py --log-file=debug_$(date +%Y%m%d).log
```

### Q22: Le traitement multithread est-il pris en charge ?
**R:** Traitement parallèle intelligent :
```bash
# Détection automatique du nombre de cœurs CPU
python converter.py --parallel=auto

# Spécifier le nombre de threads
python converter.py --parallel=4

# Parallélisation sous contrainte de mémoire
python converter.py --parallel=2 --memory-limit=4GB
```

### Q23: Comment suivre la progression de la conversion ?
**R:** Plusieurs méthodes de suivi de la progression :
- **Barre de progression de la console**: Affiche le pourcentage d'achèvement en temps réel
- **Interface Web**: Interface de surveillance via navigateur (optionnel)
- **Fichier journal**: Enregistrement détaillé de la progression par étapes
- **API d'état**: Interface de requête de progression au format JSON

### Q24: Le déploiement automatisé est-il pris en charge ?
**R:** Prise en charge complète de l'automatisation :
```bash
# Mode tâche planifiée
python scheduler.py --schedule=weekly --auto-update

# Intégration CI/CD
python converter.py --batch --no-interaction --exit-on-error

# Déploiement de conteneur Docker
docker run nav-data/converter --config=/app/config.json
```

## 🔍 Optimisation des Performances

### Q25: Comment augmenter la vitesse de conversion ?
**R:** Suggestions d'optimisation des performances :
- 💾 **Utiliser un SSD**: Améliore considérablement les performances E/S
- 🧠 **Augmenter la mémoire**: Réduit l'échange de disque
- ⚡ **Activer le parallélisme**: Utilise les CPU multicœurs
- 🗜️ **Compression des données**: Réduit le temps de transfert réseau
- 🎯 **Filtrage des zones**: Traite uniquement les zones nécessaires

### Q26: Que faire en cas de consommation excessive de mémoire ?
**R:** Stratégies d'optimisation de la mémoire :
```bash
# Activer le traitement en flux
python converter.py --streaming --chunk-size=1MB

# Limiter l'utilisation de la mémoire
python converter.py --max-memory=2GB

# Optimisation des fichiers temporaires
python converter.py --temp-dir=/tmp --cleanup-temp
```

### Q27: Comment gérer les problèmes réseau ?
**R:** Solutions d'optimisation réseau :
- 🌐 **Mode hors ligne**: Prétélécharge toutes les données
- 🔄 **Reprise des téléchargements**: Reprend automatiquement après une interruption réseau
- 🚀 **Accélération CDN**: Utilise le serveur le plus proche
- 📦 **Mise en cache des données**: Réduit les téléchargements répétés

## 🛡️ Sécurité des Données

### Q28: Les données sont-elles sécurisées ?
**R:** Garanties de sécurité multiples :
- 🔒 **Chiffrement de transmission**: HTTPS/TLS 1.3
- 🔐 **Chiffrement de stockage**: Chiffrement de fichiers AES-256
- ✅ **Vérification d'intégrité**: Validation de hachage SHA-256
- 🔍 **Vérification de la source**: Validation par signature numérique
- 🚫 **Protection de la vie privée**: Aucune information personnelle n'est collectée

### Q29: Comment sauvegarder et restaurer ?
**R:** Solution de sauvegarde complète :
```bash
# Créer une sauvegarde complète
python backup.py --full --compress --encrypt

# Sauvegarde incrémentielle
python backup.py --incremental --since-date=2024-01-01

# Restaurer la sauvegarde
python restore.py --backup-id=20240115_143022 --verify
```

## 🆘 Obtenir de l'aide

### Q30: Que faire en cas de problème ?
**R:** Système de support complet :

**1. Auto-diagnostic**:
```bash
# Exécuter le diagnostic système
python diagnostic.py --comprehensive --report=html

# Vérifier les problèmes courants
python health_check.py --fix-common-issues
```

**2. Support Communautaire**:
- 📖 [Manuel de l'utilisateur](guide/index.md)
- 🔧 [Guide de dépannage](troubleshooting.md)
- 💬 [Discussions GitHub](https://github.com/nav-data/docs/discussions)
- 🐛 [Rapports de problèmes](https://github.com/nav-data/docs/issues)

**3. Contact Direct**:
- 📧 **Support technique**: technical@nav-data.org
- 🚨 **Problèmes urgents**: urgent@nav-data.org
- 💬 **Renseignements généraux**: info@nav-data.org

### Q31: Comment contribuer et faire part de vos commentaires ?
**R:** Plusieurs façons de participer :
- 🐛 **Rapports de bugs**: GitHub Issues
- 💡 **Suggestions de fonctionnalités**: GitHub Discussions
- 📝 **Améliorations de la documentation**: Pull Request
- 💻 **Contributions de code**: Consultez le [Guide de contribution](contributing.md)
- 🌐 **Localisation**: Aide à la traduction de la documentation

### Q32: Existe-t-il des ressources de formation ?
**R:** Nombreuses ressources d'apprentissage :
- 📹 **Tutoriels vidéo**: Chaîne YouTube et Bilibili (B站)
- 📚 **Manuels d'utilisateur**: Versions PDF et en ligne
- 🎓 **Cours en ligne**: Tutoriels interactifs étape par étape
- 📋 **Guide rapide**: Prise en main rapide en 5 minutes
- 🔬 **Astuces avancées**: Techniques d'utilisation expertes

---

## 🔍 Vous ne trouvez pas votre réponse ?

Si votre question n'a pas été abordée dans cette FAQ, veuillez :

1. 🔍 **Utiliser la recherche**: La fonction de recherche en haut de la page
2. 📖 **Consulter la documentation**: [Guide utilisateur complet](guide/index.md)
3. 🛠️ **Dépannage**: [Guide de résolution des problèmes](troubleshooting.md)
4. 💬 **Discussions communautaires**: [Discussions GitHub](https://github.com/nav-data/docs/discussions)
5. 📧 **Contacter directement**: support@nav-data.org

Nous nous engageons à répondre à toutes les demandes techniques dans les 24 heures. Merci d'avoir choisi Nav-data !

---

## 📊 Statistiques d'utilisation

**Classement des questions fréquentes** (basé sur les commentaires des utilisateurs) :
1. **Problèmes d'installation et de configuration** - 35%
2. **Formats de données** - 22%
3. **Optimisation des performances** - 18%
4. **Intégration iniBuilds** - 15%
5. **Dépannage** - 10%

**Satisfaction utilisateur**: ⭐⭐⭐⭐⭐ 4.8/5.0 (basée sur plus de 1 200 avis d'utilisateurs)

**Amélioration continue**: Nous mettons à jour le contenu de la FAQ chaque mois pour garantir l'actualité et la précision des informations.
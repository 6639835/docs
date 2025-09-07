# 🙋 Foire Aux Questions (FAQ)

## 📥 Installation

### Q1: Quelle est la configuration système minimale requise ?
**R:**
- **Système d'exploitation**: Windows 10/11, macOS 10.15+, Linux
- **Version de Python**: 3.8+ (3.9 ou supérieur recommandé)
- **Mémoire vive (RAM)**: Au moins 4 Go (8 Go+ recommandé)
- **Espace de stockage**: Au moins 2 Go d'espace disponible
- **Version de MSFS**: Microsoft Flight Simulator 2020 ou 2024

### Q2: Quelles versions de Python sont prises en charge ?
**R:** Python 3.8 et versions ultérieures sont prises en charge. L'utilisation de Python 3.9 ou 3.10 est recommandée pour des performances et une compatibilité optimales.

### Q3: Des droits d'administrateur sont-ils nécessaires ?
**R:** Oui, sous Windows, des droits d'administrateur sont nécessaires pour accéder au répertoire d'installation de MSFS et écrire des fichiers de données.

### Q4: Peut-on l'installer dans un environnement virtuel ?
**R:** Il est fortement recommandé d'utiliser un environnement virtuel (tel que venv ou conda) pour isoler les dépendances et éviter les conflits avec d'autres projets Python.

## ⚙️ Configuration

### Q5: Comment obtenir des données AIRAC valides ?
**R:** Vous devez vous abonner à l'un des services suivants :
- **Navigraph**: Fournit des données de navigation mondiales complètes (recommandé)
- **Aerosoft NavDataPro**: Pour l'Europe et certaines régions
- **Jeppesen**: Service de données de navigation de niveau commercial

### Q6: Qu'est-ce que le cycle AIRAC ? À quelle fréquence dois-je le mettre à jour ?
**R:** AIRAC (Aeronautical Information Regulation and Control) est un cycle de mise à jour des informations aéronautiques standard international, mis à jour tous les 28 jours. Il est conseillé de rester synchronisé avec le cycle AIRAC réel.

### Q7: Où doivent être placés les fichiers de données ?
**R:**
```
Structure de répertoire recommandée :
C:/Nav-data/
├── input/          # Fichiers de données brutes d'entrée
│   ├── AIRAC2024-01/
│   └── ...
├── output/         # Fichiers convertis au format PMDG
└── backup/         # Sauvegarde des données
```

### Q8: Comment vérifier que la configuration est correcte ?
**R:** Exécutez la commande de validation de configuration intégrée :
```bash
python verify_config.py --check-all
```

## 🔄 Utilisation

### Q9: Combien de temps dure le processus de conversion ?
**R:** En fonction du volume de données et des performances du système :
- **Petits ensembles de données** (un seul aéroport): 1-2 minutes
- **Ensembles de données régionaux**: 5-15 minutes
- **Ensembles de données mondiaux**: 30-60 minutes

### Q10: Est-il possible de ne convertir les données que pour une région spécifique ?
**R:** Oui, le filtrage par région est pris en charge :
```bash
python converter.py --region ZSPD --include-sids --include-stars
```

### Q11: Comment sauvegarder les données existantes ?
**R:** Une sauvegarde est automatiquement créée avant la conversion ; vous pouvez également effectuer une sauvegarde manuelle :
```bash
python backup_tool.py --create-backup --date-suffix
```

### Q12: Où sont stockées les données converties ?
**R:**
- **Emplacement par défaut**: `%LOCALAPPDATA%/Lockheed Martin/Prepar3D v5/PMDG/Nav Data/`
- **MSFS version Steam**: `C:/Users/[Nom d'utilisateur]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalCache/PMDG/`
- **MSFS version Microsoft Store**: Similaire à la version Steam, mais avec un ID différent

## ✈️ Compatibilité

### Q13: Quels avions PMDG sont pris en charge ?
**R:**
- ✅ **PMDG 737-600/700/800/900** (série complète)
- ✅ **PMDG 777-300ER**
- ✅ **PMDG 777F** (version cargo)
- 🔄 **PMDG 747-8** (support planifié)

### Q14: Est-ce compatible avec MSFS 2024 ?
**R:** Oui, entièrement compatible avec Microsoft Flight Simulator 2024. Assurez-vous d'utiliser la dernière version de l'outil de conversion.

### Q15: Peut-on l'utiliser simultanément avec d'autres outils de données de navigation ?
**R:** Il n'est pas recommandé d'utiliser plusieurs outils de données de navigation simultanément, car cela pourrait entraîner des conflits de données. Avant utilisation, veuillez sauvegarder et supprimer les données des autres outils.

### Q16: Les extensions d'aéroport tierces sont-elles prises en charge ?
**R:** Oui, elles sont prises en charge, mais vous devez vous assurer que :
- L'aéroport tiers utilise des codes OACI standard
- Les données de navigation contiennent les informations de cet aéroport
- L'extension d'aéroport est compatible avec les avions PMDG

## 🌍 Données

### Q17: Quelles régions de données sont prises en charge ?
**R:** Principales zones couvertes :
- ✅ **Toute la Chine continentale** (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- ✅ **Hong Kong, Macao** (VH, VM)
- ✅ **Région de Taïwan** (RC)
- ✅ **Partie de l'Asie du Sud-Est** (VT, VH, WS)
- ⚠️ **Autres régions** (La qualité des données peut être limitée)

### Q18: Quelle est la précision des données ?
**R:**
- **Norme AIRAC**: Respecte strictement les normes de l'Organisation de l'aviation civile internationale (OACI)
- **Niveau de précision**: Prend en charge les coordonnées avec une précision de 8 décimales
- **Mécanisme de validation**: Validation des données multicouche et vérifications d'intégrité intégrées
- **Fréquence des mises à jour**: Mises à jour suivant le cycle AIRAC officiel

### Q19: Comment vérifier l'intégrité des données ?
**R:** Utilisez l'outil de validation intégré :
```bash
python validate_data.py --comprehensive --output-report
```

### Q20: Les données contiennent-elles du contenu en chinois ?
**R:** Oui, le chinois est pris en charge :
- Noms d'aéroport en chinois et en anglais
- Identifiants de points de navigation en chinois et en anglais
- Localisation des noms de procédure

## 🔧 Technique

### Q21: Comment activer le mode débogage ?
**R:**
```bash
python converter.py --debug --verbose --log-file=debug.log
```

### Q22: Où se trouvent les fichiers journaux ?
**R:**
- **Emplacement par défaut**: `./logs/converter_[date].log`
- **Journal de débogage**: `./logs/debug_[date].log`
- **Journal d'erreurs**: `./logs/error_[date].log`

### Q23: Comment optimiser les performances de conversion ?
**R:**
- Utiliser un stockage SSD
- Augmenter la RAM à plus de 8 Go
- Activer le traitement multi-processus : `--parallel=4`
- Fermer les programmes d'arrière-plan inutiles

### Q24: Le traitement par lots en ligne de commande est-il pris en charge ?
**R:** Oui, une interface de ligne de commande complète est prise en charge :
```bash
# Conversion par lots
python converter.py --batch --config-file=batch_config.json

# Tâches planifiées
python scheduler.py --schedule-weekly --auto-update
```

## 🆘 Obtenir de l'aide

### Q25: Comment obtenir de l'aide en cas de problème ?
**R:**
1.  **Vérifier les fichiers journaux** - pour comprendre les messages d'erreur spécifiques
2.  **Consulter la documentation** - Lire les sections pertinentes
3.  **Rechercher les problèmes connus** - Voir les [GitHub Issues](https://github.com/nav-data/docs/issues)
4.  **Soumettre un nouveau problème** - incluant les journaux complets et les informations système
5.  **Discussions communautaires** - Participer aux [Discussions GitHub](https://github.com/nav-data/docs/discussions)

### Q26: Comment signaler un bug ?
**R:** Veuillez le signaler dans les GitHub Issues, en incluant :
- Une description détaillée de l'erreur
- Le journal d'erreurs complet
- Les informations sur l'environnement système
- Les étapes pour reproduire
- Le résultat attendu vs le résultat réel

### Q27: Puis-je contribuer au code ?
**R:** Bien sûr ! Veuillez consulter :
- Le [Guide de contribution](contributing.md)
- Les [Conventions de code](contributing.md#代码规范)
- Le [Processus de soumission](contributing.md#提交流程)

---

## 🔍 Vous ne trouvez pas la réponse ?

Si votre question ne figure pas dans cette liste, veuillez :

1.  📖 Consulter le [Guide de dépannage](troubleshooting.md)
2.  🔍 Utiliser la fonction de recherche en haut de la page
3.  💬 Poser une question sur les [Discussions GitHub](https://github.com/nav-data/docs/discussions)
4.  📧 Envoyer un e-mail à : support@nav-data.org

Nous mettrons continuellement à jour cette FAQ, merci pour vos commentaires et suggestions !
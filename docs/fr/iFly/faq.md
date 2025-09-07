# ❓ FAQ du Convertisseur de Données de Navigation iFly

## 🔧 Installation et Configuration

### Q: Quel logiciel est nécessaire pour exécuter le convertisseur ?

**R:** Vous avez besoin du logiciel suivant :
- **Python 3.8+** (Python 3.9 ou version ultérieure recommandé)
- **iFly 737 MAX 8** installé dans Microsoft Flight Simulator
- **Fenix A320** (pour l'obtention de la base de données de navigation)
- **NAIP RTE_SEG.csv** fichier de données de segments de route

### Q: Comment installer les paquets de dépendances Python requis ?

**R:** Exécutez dans le répertoire du projet :
```bash
pip install rich pathlib typing pygeomag pandas tqdm geographiclib
```

Ou si un fichier requirements.txt est présent :
```bash
pip install -r requirements.txt
```

### Q: Que faire si le programme indique qu'il ne trouve pas le chemin d'installation d'iFly ?

**R:** Vous pouvez :
1. **Spécifier le chemin manuellement** : saisissez le chemin d'installation complet d'iFly lorsque le programme vous y invite.
2. **Vérifier l'emplacement d'installation** : assurez-vous que l'iFly 737 MAX 8 est correctement installé à l'un des emplacements suivants :
   - `Community\ifly-aircraft-737max8\`
   - `Official\asobo-aircraft-ifly-737max8\`
3. **Réinstaller iFly** : si le chemin est incorrect, veuillez réinstaller l'iFly 737 MAX 8.

## 📊 Traitement des Données

### Q: Qu'est-ce qu'un cycle AIRAC ? Pourquoi est-ce important ?

**R:** AIRAC (Aeronautical Information Regulation and Control) est un cycle de mise à jour de l'information aéronautique de 28 jours, défini par l'Organisation de l'aviation civile internationale (OACI). Chaque cycle est identifié par un code unique à 4 chiffres (ex: 2508), garantissant l'actualité et la précision des données de navigation.

### Q: Comment la déclinaison magnétique est-elle calculée ?

**R:** Le convertisseur utilise le modèle géomagnétique **WMM-2025** (World Magnetic Model) de la bibliothèque **pygeomag** pour un calcul de la déclinaison magnétique de haute précision :
- **Calcul local** : aucune connexion réseau requise
- **Haute précision** : précis à plusieurs décimales
- **Mise à jour en temps réel** : basé sur la date et les coordonnées actuelles

### Q: Pourquoi le fichier NAIP RTE_SEG.csv est-il nécessaire ?

**R:** Ce fichier contient les données des segments de route de l'aviation civile chinoise, et est utilisé pour :
- Compléter les informations de routes chinoises manquantes dans iFly
- Fournir des coordonnées de points de route précises
- Assurer la cohérence avec le réseau de routes aériennes réel

### Q: Où sont stockées les données converties ?

**R:** Les données sont placées aux emplacements suivants :
- **Données de routes** : `Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt`
- **Procédures terminales** : `Community\ifly-aircraft-737max8\Data\navdata\Supplemental\`
- **Identifiant AIRAC** : `FMC_Ident.txt`

## 🐛 Dépannage

### Q: Le programme affiche une erreur "Échec de la connexion à la base de données" pendant l'exécution ?

**R:** Veuillez vérifier :
1. **Chemin du fichier** : assurez-vous que le chemin du fichier de la base de données Fenix est correct.
2. **Permissions du fichier** : assurez-vous que le fichier est lisible.
3. **Intégrité du fichier** : essayez de récupérer le fichier de la base de données Fenix à nouveau.
4. **Espace disque** : assurez-vous d'avoir suffisamment d'espace disponible.

### Q: Que faire si le calcul de la déclinaison magnétique est lent ?

**R:** Ceci est généralement normal :
- **Première exécution** : l'initialisation du modèle géomagnétique prend du temps.
- **Grandes quantités de données** : le calcul prend plus de temps lorsqu'il y a de nombreux points de route.
- **Performance du système** : le traitement est plus lent sur du matériel plus ancien.

Suggestions d'optimisation :
- Utilisez un disque dur SSD
- Assurez-vous d'avoir suffisamment de mémoire vive (8 Go+ recommandé)
- Fermez les programmes en arrière-plan inutiles

### Q: Les nouvelles données ne sont pas visibles dans iFly après la conversion ?

**R:** Veuillez essayer :
1. **Redémarrer le simulateur** : quittez complètement et redémarrez MSFS.
2. **Vérifier l'emplacement du fichier** : assurez-vous que les fichiers ont été écrits dans le bon répertoire.
3. **Effacer le cache** : supprimez les fichiers cache d'iFly.
4. **Vérifier les permissions** : assurez-vous que le programme a les permissions d'écriture dans le répertoire d'iFly.

### Q: Que faire en cas d'erreur d'encodage ?

**R:** Cela est généralement lié à l'encodage des caractères :
1. **Assurez-vous que l'environnement Python prend en charge UTF-8**
2. **Vérifiez l'encodage du fichier CSV** : assurez-vous qu'il est au format UTF-8.
3. **Mettez à jour la version de Python** : utilisez la dernière version de Python.

## 📈 Performance et Optimisation

### Q: Comment améliorer la vitesse de conversion ?

**R:** Suggestions d'optimisation des performances :
- **Utilisez un SSD** : les disques SSD améliorent considérablement les performances d'E/S.
- **Augmentez la mémoire RAM** : 8 Go+ de RAM sont recommandés.
- **Désactivez l'antivirus** : désactivez temporairement la numérisation en temps réel.
- **Utilisez une version plus récente de Python** : Python 3.9+ offre de meilleures performances.

### Q: Que faire si l'utilisation de la mémoire est trop élevée ?

**R:** Solutions d'optimisation de la mémoire :
1. **Traitement par lots** : utilisez un mode de traitement par lots lors du traitement de gros fichiers.
2. **Fermez les autres programmes** : libérez la mémoire système.
3. **Vérifiez la taille des données** : assurez-vous que la taille des fichiers de données est raisonnable.
4. **Utilisez Python 64 bits** : évitez les limitations de mémoire 32 bits.

### Q: Est-il possible de traiter plusieurs bases de données par lots ?

**R:** La version actuelle ne prend pas directement en charge le traitement par lots, mais vous pouvez :
1. **Exécuter le programme plusieurs fois** : traitez les fichiers de base de données un par un.
2. **Écrire un script** : créez un script de traitement par lots automatisé.
3. **Attendre une mise à jour** : la v2.1.0 prendra en charge la fonction de traitement par lots.

## 🔄 Gestion des Données

### Q: Comment sauvegarder les données originales ?

**R:** Il est fortement recommandé de sauvegarder avant la conversion :
```bash
# 备份 iFly 原始数据
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_navdata"
```

### Q: Comment restaurer les données originales ?

**R:** Si vous avez besoin de restaurer :
1. **Supprimez les fichiers convertis**
2. **Restaurer depuis la sauvegarde** :
   ```bash
   rm -r "Community\ifly-aircraft-737max8\Data\navdata"
   cp -r "backup_navdata" "Community\ifly-aircraft-737max8\Data\navdata"
   ```
3. **Réinstaller iFly** : la méthode de récupération la plus complète.

### Q: Comment vérifier si la conversion des données a réussi ?

**R:** Méthodes de vérification :
1. **Vérifiez l'existence des fichiers** : assurez-vous que les nouveaux fichiers ont été générés.
2. **Vérifiez la taille des fichiers** : les nouveaux fichiers devraient être plus volumineux que les originaux.
3. **Test en simulateur** : chargez l'iFly 737 dans MSFS pour tester.
4. **Vérification FMC** : vérifiez les données de routes et de procédures dans le FMC.

## 🆘 Support Technique

### Q: Où puis-je obtenir de l'aide ?

**R:** Canaux d'aide :
1. **Consulter les journaux** : vérifiez le fichier `converter.log`.
2. **Consulter la documentation** : lisez le guide d'utilisation complet.
3. **GitHub Issues** : signalez les problèmes sur la page du projet.
4. **Forums communautaires** : participez aux discussions de la communauté de simulation de vol.

### Q: Comment signaler un bug ?

**R:** Lorsque vous signalez un problème, veuillez fournir :
- **Description détaillée de l'erreur**
- **Journal d'erreurs complet**
- **Informations sur l'environnement système** (OS, version de Python, etc.)
- **Étapes pour reproduire**
- **Captures d'écran ou fichiers pertinents**

### Q: Le projet est-il open source ?

**R:** Oui ! Le projet respecte une licence open source :
- **Voir le code source** : le dépôt GitHub est public.
- **Contribuer au code** : les Pull Requests sont les bienvenues.
- **Suggestions de fonctionnalités** : soumettez vos demandes de fonctionnalités dans les Issues.
- **Amélioration de la documentation** : aidez à améliorer la documentation.

## 🔮 Fonctionnalités Futures

### Q: Quelles nouvelles fonctionnalités sont prévues ?

**R:** Fonctionnalités à venir :
- **Interface graphique (GUI)** (v2.1.0)
- **Traitement par lots** (v2.1.0)
- **Outil de validation des données** (v2.2.0)
- **Traitement cloud** (v3.0.0)
- **Support multi-formats** (v3.0.0)

### Q: Comment obtenir les mises à jour de version ?

**R:** Pour rester à jour :
1. **Suivez sur GitHub** : "Star" le projet pour recevoir les notifications de mise à jour.
2. **S'abonner aux versions** : activez les notifications de "Release".
3. **Vérifiez régulièrement** : vérifiez une nouvelle version chaque mois.
4. **Mises à jour automatiques** : les futures versions prendront en charge les mises à jour automatiques.

---

**Vous ne trouvez pas la réponse à votre question ?** Veuillez consulter le [guide de dépannage](troubleshooting.md) ou posez votre question sur GitHub Issues ! 🆘
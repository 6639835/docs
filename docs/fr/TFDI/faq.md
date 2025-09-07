# ❓ FAQ sur le convertisseur de données de navigation TFDI

## 🔧 Installation et configuration

### Q: Quels logiciels dois-je installer pour utiliser le convertisseur ?

**R:** Vous avez besoin de l'environnement logiciel suivant :
- **Python 3.8+** (version 3.9 ou supérieure recommandée)
- **TFDI MD-11** installé dans Microsoft Flight Simulator
- **Fenix A320** (pour obtenir les fichiers de base de données de navigation)
- Les dépendances Python nécessaires (installées via requirements.txt)

### Q: Comment obtenir les fichiers de base de données de navigation Fenix ?

**R:** Les fichiers de base de données Fenix se trouvent généralement à l'emplacement suivant :
```
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
```

**Remarques importantes :**
- Assurez-vous que le Fenix A320 est installé et a été exécuté au moins une fois.
- La taille du fichier de base de données est généralement de 50 à 200 Mo.
- Le fichier doit être une base de données SQLite complète et non corrompue.

### Q: Quelles versions de Fenix et TFDI le convertisseur prend-il en charge ?

**R:** Versions actuellement prises en charge :
- **Fenix A320**: v1.0.x - v1.2.x
- **TFDI MD-11**: v1.0.x - v1.2.x
- **Format de base de données**: SQLite 3.x

**Compatibilité des versions :**
- ✅ Entièrement compatible : Fenix v1.1.x + TFDI v1.1.x
- ⚠️ À vérifier : Les dernières versions peuvent nécessiter des mises à jour de compatibilité.
- ❌ Non pris en charge : Les anciennes versions Beta.

## 📊 Conversion des données

### Q: Combien de temps dure le processus de conversion ?

**R:** Le temps de conversion dépend de la taille de la base de données :
- **Petite base de données** (< 50 Mo) : 2-5 minutes
- **Base de données moyenne** (50-200 Mo) : 5-15 minutes
- **Grande base de données** (200-500 Mo) : 15-45 minutes

**Facteurs influençants :**
- Type de disque dur (SSD 2-3 fois plus rapide que HDD)
- Mémoire disponible (8 Go+ recommandé)
- Performances du CPU (les multi-cœurs sont un avantage)
- Charge système (fermez les programmes inutiles)

### Q: Qu'est-ce qu'un ID de terminal et comment le configurer ?

**R:** L'ID de terminal est un numéro unique utilisé dans le système TFDI pour identifier les procédures de terminal.

**Suggestions de configuration :**
```
Starting ID: 1000 (par défaut)
Plage d'ID: 1-999999
Plage recommandée: 1000-9000 (laisse de la place pour l'extension)
```

**Stratégie d'attribution :**
- Réservez 20 à 50 ID par aéroport.
- Attribuez par groupes régionaux (par exemple, région Asie 1000-3000).
- Évitez les conflits avec les données TFDI existantes.

### Q: Où sont sauvegardés les fichiers convertis ?

**R:** Le convertisseur génère une archive compressée `Primary.7z` contenant :

```
Primary.7z
├── AirportLookup.json      # Données de recherche d'aéroport
├── Airports.json           # Informations sur les aéroports
├── AirwayLegs.json        # Données des segments de route aérienne
├── Airways.json           # Définitions des routes aériennes
├── Ilses.json             # Données d'approche ILS
├── NavaidLookup.json      # Recherche d'équipements de navigation
├── Navaids.json           # Données des équipements de navigation
├── Runways.json           # Informations sur les pistes
├── Terminals.json         # Données des procédures de terminal
├── WaypointLookup.json    # Recherche de points de cheminement
├── Waypoints.json         # Définitions des points de cheminement
└── ProcedureLegs/         # Répertoire des segments de procédure
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

### Q: Qu'est-ce que la détection du point FAF et pourquoi est-elle importante ?

**R:** Le FAF (Final Approach Fix) est le point d'approche finale dans une procédure d'approche de précision.

**Importance :**
- Marque le début de l'approche de précision.
- Point de référence clé pour le calcul VNAV.
- Influence les modes d'approche du pilote automatique.

**Critères de détection :**
- Angle VNAV ≤ 2,5° (configurable)
- Situé dans la phase finale de la procédure d'approche.
- Contient des informations de limitation d'altitude.

## 🐛 Dépannage

### Q: Que faire si l'erreur "Fichier de base de données corrompu" apparaît ?

**Message d'erreur :**
```
SQLite Error: database disk image is malformed
Le fichier de base de données est peut-être corrompu
```

**Solutions :**
1. **Réacquérir la base de données** :
   ```bash
   # Supprimez le fichier potentiellement corrompu
   rm path/to/nd.db3
   
   # Redémarrez Fenix A320 pour qu'il le régénère
   ```

2. **Vérifier l'intégrité du fichier** :
   ```python
   import sqlite3
   
   try:
       conn = sqlite3.connect('nd.db3')
       conn.execute('PRAGMA integrity_check')
       print("Vérification de l'intégrité de la base de données réussie")
   except Exception as e:
       print(f"Base de données corrompue: {e}")
   ```

3. **Utiliser un outil de réparation de base de données** :
   ```bash
   # Tentez de réparer avec l'outil SQLite
   sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3
   ```

### Q: Que faire si le convertisseur se bloque à une étape ?

**Étapes courantes où le blocage se produit :**
- Phase de validation de la base de données
- Phase de traitement des données de grandes tables
- Phase de sérialisation JSON
- Phase de compression et d'empaquetage

**Méthodes de dépannage :**
```bash
# 1. Vérifiez les ressources système
top  # Linux/macOS
# ou Gestionnaire des tâches (Windows)

# 2. Consultez les fichiers journaux
tail -f converter.log

# 3. Vérifiez l'espace disque
df -h  # Linux/macOS
# ou vérifiez l'espace disque sous Windows
```

**Solutions :**
1. **Redémarrer le convertisseur** : Quittez complètement, puis redémarrez.
2. **Augmenter la mémoire** : Fermez les autres programmes pour libérer de la mémoire.
3. **Vérifier les permissions** : Assurez-vous d'avoir les droits d'écriture.
4. **Débogage pas à pas** : Utilisez le mode de débogage pour afficher les détails.

### Q: Les fichiers JSON convertis ne sont pas reconnus dans TFDI ?

**Causes possibles :**
1. **Incompatibilité de version** : La version TFDI ne correspond pas à la version du format JSON.
2. **Fichier corrompu** : Le fichier a été corrompu pendant la compression ou le transfert.
3. **Erreur de format** : Le format JSON n'est pas conforme aux standards TFDI.
4. **Problème d'encodage** : L'encodage des caractères est incorrect.

**Étapes de vérification :**
```bash
# 1. Validez le format JSON
python -m json.tool Primary/Airports.json

# 2. Vérifiez la taille du fichier
ls -lh Primary/

# 3. Vérifiez l'intégrité de l'archive
7z t Primary.7z
```

**Méthodes de réparation :**
1. **Re-convertir** : Supprimez le dossier de sortie, puis re-convertissez.
2. **Décompresser manuellement** : Décompressez le fichier 7z et vérifiez son contenu.
3. **Mise à jour de la version** : Assurez-vous d'utiliser la dernière version du convertisseur.
4. **Contacter le support** : Si le problème persiste, veuillez signaler un bug.

## 📈 Optimisation des performances

### Q: Comment améliorer la vitesse de conversion ?

**Optimisation matérielle :**
- **Utiliser un SSD** : Les disques SSD sont 3 à 5 fois plus rapides que les disques durs mécaniques.
- **Augmenter la mémoire** : 8 Go+ de RAM recommandé.
- **CPU multi-cœur** : Prend en charge le traitement parallèle.
- **Désactiver l'antivirus** : Désactivez temporairement l'analyse en temps réel.

**Optimisation logicielle :**
```python
# Ajuster les paramètres de configuration
config = ConverterConfig(
    coordinate_precision=6,    # Réduire la précision pour augmenter la vitesse
    batch_size=2000,          # Augmenter la taille du lot
    enable_compression=False,  # Désactiver la compression en temps réel
    max_workers=4             # Définir le nombre de threads parallèles
)
```

**Optimisation de l'environnement :**
```bash
# Définir les variables d'environnement
export PYTHONOPTIMIZE=1       # Activer l'optimisation du bytecode
export SQLITE_TEMP_STORE=3    # Utiliser le stockage temporaire en mémoire
```

### Q: Que faire si l'utilisation de la mémoire est trop élevée ?

**Surveiller l'utilisation de la mémoire :**
```python
import psutil

def monitor_memory():
    memory = psutil.virtual_memory()
    print(f"Utilisation de la mémoire: {memory.percent}%")
    print(f"Mémoire disponible: {memory.available // 1024**2} MB")
```

**Stratégies d'optimisation :**
1. **Réduire la taille du lot** :
   ```python
   config.batch_size = 500  # Réduit de la valeur par défaut de 1000 à 500
   ```

2. **Traitement par étapes** :
   ```python
   # Traitement des grandes tables par lots
   tables = ['Airports', 'Runways', 'Waypoints']
   for table in tables:
       converter.process_table(table)
       gc.collect()  # Forcer le nettoyage de la mémoire
   ```

3. **Traitement en streaming** : Activez le mode de traitement en streaming pour les fichiers volumineux.

### Q: Puis-je exécuter plusieurs instances du convertisseur simultanément ?

**Techniquement faisable, mais avec des limitations :**
- **Verrouillage de la base de données** : SQLite ne prend pas en charge plusieurs connexions en écriture.
- **Concurrence des ressources** : Plusieurs instances se disputeront le CPU et la mémoire.
- **E/S disque** : Peut entraîner un goulot d'étranglement du disque.

**Pratique recommandée :**
```bash
# Traitement en série de plusieurs bases de données
python converter.py --input db1.db3 --output output1/
python converter.py --input db2.db3 --output output2/

# Ou utilisez un script de traitement par lots
for db in *.db3; do
    python converter.py --input "$db" --output "output_${db%.*}/"
done
```

## 🔍 Validation des données

### Q: Comment vérifier l'exactitude des résultats de la conversion ?

**Outil de validation automatique :**
```python
# Utilisez le validateur intégré
from tfdi_converter.validation import DataValidator

validator = DataValidator()
result = validator.validate_output("Primary.7z")

if result.is_valid:
    print("✅ Validation réussie")
else:
    print("❌ Validation échouée:")
    for error in result.errors:
        print(f"  - {error}")
```

**Liste de vérification manuelle :**
- [ ] **Intégrité des fichiers** : Tous les fichiers JSON requis sont présents.
- [ ] **Quantité de données** : Le nombre d'enregistrements est raisonnable et sans réduction anormale.
- [ ] **Plage de coordonnées** : Latitude [-90, 90], Longitude [-180, 180].
- [ ] **Intégrité référentielle** : Les relations de clé étrangère sont maintenues.
- [ ] **Caractères spéciaux** : L'encodage UTF-8 est géré correctement.

**Vérification dans TFDI :**
1. Installez le paquet de données converti.
2. Créez un plan de vol pour tester les routes.
3. Vérifiez l'affichage des procédures dans le FMC.
4. Vérifiez les fréquences et les positions des équipements de navigation.

### Q: Pourquoi le volume de données converties a-t-il considérablement diminué ?

**Causes possibles :**
1. **Filtrage des données** : Le convertisseur a filtré les données incompatibles ou invalides.
2. **Restriction régionale** : Seules les données d'une région spécifique ont pu être converties.
3. **Restriction de format** : Certains formats spécifiques à Fenix ne peuvent pas être convertis.
4. **Différences de version** : Différences de structure de données entre les versions.

**Méthode de vérification :**
```python
# Comparez le nombre d'enregistrements avant et après la conversion
def compare_record_counts(fenix_db, tfdi_json_dir):
    # Comptez les enregistrements de la base de données Fenix
    fenix_counts = count_fenix_records(fenix_db)
    
    # Comptez les enregistrements JSON de TFDI
    tfdi_counts = count_tfdi_records(tfdi_json_dir)
    
    # Comparez les résultats
    for table, fenix_count in fenix_counts.items():
        tfdi_count = tfdi_counts.get(table, 0)
        ratio = tfdi_count / fenix_count if fenix_count > 0 else 0
        print(f"{table}: {fenix_count} → {tfdi_count} ({ratio:.1%})")
```

## 🆘 Obtenir de l'aide

### Q: Où puis-je obtenir un support technique ?

**Canaux de support officiels :**
- **GitHub Issues** : Signalez les bugs et les demandes de fonctionnalités.
- **GitHub Discussions** : Pour les questions d'utilisation et les discussions générales.
- **Documentation du projet** : Consultez le guide utilisateur complet.
- **Exemples de code** : Référez-vous aux exemples dans le projet.

**Support communautaire :**
- **Forums de simulation de vol** : Communautés de simulation de vol pertinentes.
- **Groupes Discord** : Communication en temps réel et aide mutuelle.
- **Groupes QQ/WeChat** : Groupes de discussion pour les utilisateurs chinois.

### Q: Comment signaler un problème ou suggérer une nouvelle fonctionnalité ?

**Procédure de signalement de problème :**
1. **Recherchez les problèmes existants** : Évitez les doublons.
2. **Collectez les informations** :
   - Description détaillée de l'erreur
   - Journal d'erreurs complet
   - Informations sur l'environnement système
   - Étapes pour reproduire
3. **Créez une Issue** : Utilisez le modèle fourni.
4. **Fournissez un exemple** : Si possible, fournissez un exemple minimal reproductible.

**Suggestions de fonctionnalités :**
- Décrivez en détail l'utilité de la nouvelle fonctionnalité.
- Décrivez le comportement attendu de la fonctionnalité.
- Considérez l'impact sur les utilisateurs existants.
- Proposez des suggestions d'implémentation (si applicable).

### Q: Puis-je contribuer au code ? Comment participer au développement ?

**Façons de contribuer :**
- **Corrections de bugs** : Corrigez les problèmes connus.
- **Développement de nouvelles fonctionnalités** : Implémentez de nouvelles fonctionnalités de conversion.
- **Optimisation des performances** : Améliorez la vitesse et l'efficacité de la conversion.
- **Améliorations de la documentation** : Peaufinez la documentation utilisateur et la documentation API.
- **Améliorations des tests** : Augmentez les cas de test et la couverture.

**Étapes pour participer :**
1. **Forkel le projet** : Créez votre propre branche de projet.
2. **Configurez l'environnement de développement** : Suivez les directives de contribution.
3. **Choisissez une tâche** : Sélectionnez une tâche appropriée parmi les Issues.
4. **Développez et testez** : Écrivez du code et assurez-vous que les tests passent.
5. **Soumettez une PR** : Créez une Pull Request et attendez la révision.

**Exigences de contribution :**
- Suivez les conventions de codage du projet.
- Fournissez une couverture de test adéquate.
- Mettez à jour la documentation pertinente.
- Utilisez des messages de commit clairs.

---

**Vous ne trouvez pas votre réponse ?**

Veuillez chercher ou créer une nouvelle question sur [GitHub Issues](https://github.com/your-org/tfdi-converter/issues), nous vous répondrons dès que possible ! 🚁✨
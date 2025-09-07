# 🤝 Guide de contribution

Bienvenue dans le développement du projet Nav-data ! Ce guide vous aidera à comprendre comment contribuer au projet, y compris les standards de code, le processus de développement et les meilleures pratiques.

## 🎯 Comment contribuer

### Nous accueillons les types de contributions suivants :

- **🐛 Signalement et correction de bugs** - Détecter et corriger les problèmes dans le projet
- **✨ Développement de nouvelles fonctionnalités** - Ajouter de nouvelles fonctionnalités ou optimisations de traitement de données
- **📚 Amélioration de la documentation** - Compléter la documentation, ajouter des exemples, corriger des erreurs
- **🔧 Optimisation des performances** - Améliorer l'efficacité du traitement des données et l'utilisation de la mémoire
- **🧪 Cas de test** - Augmenter la couverture des tests, améliorer la qualité du code
- **🌍 Prise en charge de l'internationalisation** - Ajouter la prise en charge multilingue ou des données régionales supplémentaires
- **🎨 Amélioration de l'expérience utilisateur** - Optimiser la convivialité de l'outil et le format de sortie

## 🚀 Démarrage rapide

### 1. Préparation de l'environnement

```bash
# Forker le projet sur votre compte GitHub
# Cloner votre fork
git clone https://github.com/[votre_nom_utilisateur]/Nav-data.git
cd Nav-data

# Ajouter le dépôt en amont
git remote add upstream https://github.com/原作者/Nav-data.git

# Créer un environnement virtuel
python -m venv nav-data-dev
source nav-data-dev/bin/activate  # Linux/macOS
# Ou nav-data-dev\Scripts\activate  # Windows

# Installer les dépendances de développement
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Dépendances de développement (si elles existent)
```

### 2. Validation de l'environnement de développement

```bash
# Exécuter les tests de base
python -m pytest tests/ -v

# Vérifier le style du code
flake8 *.py

# Exécuter la vérification de type (si utilisée)
mypy *.py
```

## 📋 Conventions de développement

### Style de code

Nous suivons les standards et les meilleures pratiques de la communauté Python :

#### 1. Style de code PEP 8

```python
# ✅ Bon exemple
class AirportDataProcessor:
    """Processeur de données d'aéroport
    
    Traite les données d'aéroport au format NAIP et les convertit en un format compatible PMDG.
    """
    
    def __init__(self, csv_file_path: str, output_db_path: str):
        self.csv_file_path = csv_file_path
        self.output_db_path = output_db_path
        self.processed_count = 0
    
    def process_airport_data(self) -> ProcessingResult:
        """Méthode principale pour traiter les données d'aéroport
        
        Returns:
            ProcessingResult: Un objet de résultat contenant des statistiques de traitement
            
        Raises:
            FileNotFoundError: Lorsque le fichier d'entrée n'existe pas
            DatabaseError: Lorsque l'opération de base de données échoue
        """
        try:
            data = self._load_csv_data()
            processed_data = self._transform_data(data)
            self._save_to_database(processed_data)
            
            return ProcessingResult(
                success=True,
                processed_count=self.processed_count,
                message="Traitement des données d'aéroport terminé"
            )
        except Exception as e:
            logging.error(f"Erreur lors du traitement des données d'aéroport : {e}")
            raise

# ❌ Écriture à éviter
def processAirports(file,db):  # Nom de fonction non conforme, types de paramètres non clairs
    d=pd.read_csv(file)       # Noms de variables non clairs
    for i in d.iterrows():    # Pas de gestion d'erreurs
        # Logique de traitement...
        pass
```

#### 2. Annotations de type

```python
from typing import List, Dict, Optional, Union, Tuple
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """Classe de données de résultat de traitement"""
    success: bool
    processed_count: int
    failed_count: int = 0
    errors: List[str] = None
    message: Optional[str] = None

def convert_coordinates(
    dms_latitude: str, 
    dms_longitude: str
) -> Tuple[Optional[float], Optional[float]]:
    """Convertit les coordonnées au format DMS en degrés décimaux
    
    Args:
        dms_latitude: Chaîne de caractères de latitude au format DMS (ex: N390308.00)
        dms_longitude: Chaîne de caractères de longitude au format DMS (ex: E1162930.00)
    
    Returns:
        Un tuple (latitude, longitude), ou (None, None) si la conversion échoue
    """
    try:
        lat = parse_dms_coordinate(dms_latitude, coord_type='latitude')
        lon = parse_dms_coordinate(dms_longitude, coord_type='longitude')
        return lat, lon
    except ValueError as e:
        logging.warning(f"Échec de la conversion des coordonnées : {e}")
        return None, None
```

#### 3. Gestion des erreurs et journalisation

```python
import logging
from enum import Enum

class ProcessingError(Exception):
    """Classe de base pour les erreurs liées au traitement des données"""
    pass

class ValidationError(ProcessingError):
    """Erreur de validation des données"""
    pass

class CoordinateError(ValidationError):
    """Erreur liée aux coordonnées"""
    pass

def process_with_error_handling(data: Dict) -> bool:
    """Exemple de traitement de données avec gestion complète des erreurs"""
    try:
        # Validation des données
        if not validate_required_fields(data):
            raise ValidationError("Champs obligatoires manquants")
        
        # Traitement des coordonnées
        lat, lon = convert_coordinates(
            data.get('latitude'),
            data.get('longitude')
        )
        
        if lat is None or lon is None:
            raise CoordinateError("Échec de la conversion des coordonnées")
        
        # Sauvegarde des données
        save_to_database(data)
        logging.info(f"Enregistrement traité avec succès : {data.get('identifier')}")
        return True
        
    except ValidationError as e:
        logging.warning(f"Échec de la validation des données : {e}")
        return False
    except CoordinateError as e:
        logging.error(f"Erreur de traitement des coordonnées : {e}")
        return False
    except Exception as e:
        logging.critical(f"Erreur inattendue : {e}")
        raise
```

### Standards de documentation

#### 1. Documentation de fonctions et de classes

```python
def parse_dat_file(
    file_path: str, 
    batch_size: int = 1000,
    encoding: str = 'utf-8'
) -> List[Dict[str, Any]]:
    """Analyse un fichier DAT au format X-Plane
    
    Cette fonction lit un fichier de données de navigation X-Plane, analyse les informations 
    de points de cheminement qu'il contient et retourne une liste de données structurées.
    Elle prend en charge le traitement par lots pour les grands fichiers.
    
    Args:
        file_path: Le chemin complet du fichier DAT
        batch_size: La taille du lot pour l'optimisation de la mémoire, par défaut 1000
        encoding: L'encodage du fichier, par défaut utf-8
    
    Returns:
        Une liste de dictionnaires contenant les informations des points de cheminement,
        chaque dictionnaire contient les clés suivantes :
        - waypoint_identifier: Identifiant du point de cheminement
        - latitude: Latitude (degrés décimaux)
        - longitude: Longitude (degrés décimaux)
        - waypoint_type: Type de point de cheminement
        - icao_code: Code régional OACI
    
    Raises:
        FileNotFoundError: Lorsque le fichier spécifié n'existe pas
        ValueError: Lorsque le format du fichier est incorrect
        MemoryError: Lorsque la mémoire disponible est insuffisante
    
    Examples:
        Utilisation de base :
        >>> waypoints = parse_dat_file('data/earth_fix.dat')
        >>> print(f"Analysé {len(waypoints)} points de cheminement")
        
        Traitement de grands fichiers :
        >>> waypoints = parse_dat_file(
        ...     'large_file.dat', 
        ...     batch_size=5000
        ... )
    
    Note:
        Cette fonction ignore automatiquement les lignes de commentaire en début de fichier
        et ne traite que les lignes de données valides. Pour les lignes de données corrompues,
        un journal d'avertissement sera enregistré mais le traitement ne sera pas interrompu.
    """
    # Implémentation...
```

#### 2. Documentation de module

```python
"""
Module de traitement des données d'aéroport PMDG

Ce module est responsable du traitement des données d'aéroport au format NAIP
et de leur conversion au format de base de données SQLite compatible PMDG.
Les fonctions principales incluent :

- Lecture et analyse de fichiers CSV
- Conversion de coordonnées au format DMS
- Recherche et correspondance de noms d'aéroport
- Validation et nettoyage des données
- Écriture dans la base de données SQLite

Formats de fichier d'entrée pris en charge :
- AD_HP.csv: Données d'aéroport de base (format NAIP)
- Airport.dat: Table de recherche de noms d'aéroport

Format de sortie :
- Base de données SQLite, contenant la table tbl_airports

Author: Nav-data Team
Version: 2.0.0
License: MIT

Examples:
    Utilisation en ligne de commande :
    $ python PMDG_APT.py
    
    Interface de programmation :
    >>> from PMDG_APT import AirportProcessor
    >>> processor = AirportProcessor(
    ...     csv_path='data/AD_HP.csv',
    ...     output_path='output/airports.s3db'
    ... )
    >>> result = processor.process()
    >>> print(f"Traitement terminé : {result.processed_count} aéroports")
"""

import pandas as pd
import sqlite3
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path

# Constantes de niveau module
DEFAULT_AREA_CODE = 'EEU'
DEFAULT_ENCODING = 'latin1'
SUPPORTED_ICAO_REGIONS = {'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW'}

# ... Reste du code
```

### Standards de test

#### 1. Tests unitaires

```python
import unittest
from unittest.mock import patch, mock_open
import pandas as pd
from PMDG_APT import AirportProcessor, convert_dms_to_decimal

class TestCoordinateConversion(unittest.TestCase):
    """Test des fonctionnalités de conversion de coordonnées"""
    
    def test_valid_north_latitude(self):
        """Teste la conversion d'une coordonnée de latitude nord valide"""
        result, error = convert_dms_to_decimal("N390308.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 39.0522222, places=6)
    
    def test_valid_east_longitude(self):
        """Teste la conversion d'une coordonnée de longitude est valide"""
        result, error = convert_dms_to_decimal("E1162930.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 116.4916667, places=6)
    
    def test_invalid_format(self):
        """Teste le format de coordonnée invalide"""
        result, error = convert_dms_to_decimal("INVALID")
        self.assertIsNone(result)
        self.assertIsNotNone(error)
        self.assertIn("Format DMS invalide", error)
    
    def test_boundary_coordinates(self):
        """Teste les coordonnées limites"""
        # Test du pôle Nord
        result, error = convert_dms_to_decimal("N900000.00")
        self.assertIsNone(error)
        self.assertEqual(result, 90.0)

class TestAirportProcessor(unittest.TestCase):
    """Test du processeur de données d'aéroport"""
    
    def setUp(self):
        """Initialisation du test"""
        self.processor = AirportProcessor(
            csv_file_path="test_data/AD_HP.csv",
            lookup_file_path="test_data/Airport.dat",
            output_db_path="test_output/test.s3db"
        )
    
    @patch('pandas.read_csv')
    def test_csv_loading(self, mock_read_csv):
        """Teste le chargement du fichier CSV"""
        # Simuler les données CSV
        mock_data = pd.DataFrame({
            'CODE_ID': ['ZBAA', 'ZSPD'],
            'GEO_LAT_ACCURACY': ['N390308.00', 'N311133.00'],
            'GEO_LONG_ACCURACY': ['E1162930.00', 'E1211056.00']
        })
        mock_read_csv.return_value = mock_data
        
        result = self.processor._load_csv_data()
        self.assertEqual(len(result), 2)
        self.assertEqual(result.iloc[0]['CODE_ID'], 'ZBAA')
    
    @patch('sqlite3.connect')
    def test_database_creation(self, mock_connect):
        """Teste la création de la base de données"""
        mock_connection = mock_connect.return_value
        mock_cursor = mock_connection.cursor.return_value
        
        self.processor._create_database_tables()
        
        # Vérifier que le SQL de création de table a été exécuté
        mock_cursor.execute.assert_called()
        create_table_calls = [call[0][0] for call in mock_cursor.execute.call_args_list]
        self.assertTrue(any('CREATE TABLE' in call for call in create_table_calls))
```

#### 2. Tests d'intégration

```python
import tempfile
import os
import sqlite3
from pathlib import Path

class TestIntegration(unittest.TestCase):
    """Tests d'intégration"""
    
    def setUp(self):
        """Crée un environnement de test temporaire"""
        self.test_dir = tempfile.mkdtemp()
        self.csv_file = Path(self.test_dir) / "test_airports.csv"
        self.lookup_file = Path(self.test_dir) / "airports.dat"
        self.output_db = Path(self.test_dir) / "output.s3db"
        
        # Créer les fichiers de données de test
        self.create_test_csv()
        self.create_test_lookup()
    
    def tearDown(self):
        """Nettoie l'environnement de test"""
        import shutil
        shutil.rmtree(self.test_dir)
    
    def create_test_csv(self):
        """Crée un fichier CSV de test"""
        test_data = """CODE_ID,GEO_LAT_ACCURACY,GEO_LONG_ACCURACY
ZBAA,N390308.00,E1162930.00
ZSPD,N311133.00,E1211056.00"""
        
        with open(self.csv_file, 'w', encoding='latin1') as f:
            f.write(test_data)
    
    def create_test_lookup(self):
        """Crée un fichier de recherche de test"""
        lookup_data = """ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL"""
        
        with open(self.lookup_file, 'w') as f:
            f.write(lookup_data)
    
    def test_end_to_end_processing(self):
        """Teste le traitement de bout en bout"""
        processor = AirportProcessor(
            csv_file_path=str(self.csv_file),
            lookup_file_path=str(self.lookup_file),
            output_db_path=str(self.output_db)
        )
        
        result = processor.process()
        
        # Vérifier les résultats du traitement
        self.assertTrue(result.success)
        self.assertEqual(result.processed_count, 2)
        
        # Vérifier le contenu de la base de données
        self.assertTrue(self.output_db.exists())
        
        conn = sqlite3.connect(str(self.output_db))
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        self.assertEqual(count, 2)
        
        cursor.execute("SELECT airport_identifier, airport_name FROM tbl_airports ORDER BY airport_identifier")
        airports = cursor.fetchall()
        
        self.assertEqual(airports[0][0], 'ZBAA')
        self.assertEqual(airports[0][1], 'BEIJING/CAPITAL')
        
        conn.close()
```

## 🔄 Processus de développement

### Workflow Git

Nous utilisons le workflow **Git Flow** :

```bash
# 1. Créer une branche de fonctionnalité à partir de la dernière branche main
git checkout main
git pull upstream main
git checkout -b feature/optimisation-traitement-itineraires

# 2. Effectuer le travail de développement
# Écrire du code, ajouter des tests, mettre à jour la documentation

# 3. Commiter les modifications
git add .
git commit -m "feat: Optimisation des performances du traitement des données d'itinéraire

- Implémentation du traitement par lots pour réduire l'utilisation de la mémoire
- Ajout d'une barre de progression pour afficher l'état du traitement
- Optimisation des opérations d'écriture dans la base de données

Closes #123"

# 4. Pousser vers votre fork
git push origin feature/optimisation-traitement-itineraires

# 5. Créer une Pull Request
```

### Convention des messages de commit

Nous utilisons la convention **Conventional Commits** :

```bash
# Format : <type>(<portée>) : <description>
#
# <Corps facultatif>
#
# <Pied de page facultatif>

# Exemple :
git commit -m "feat(airport): Ajout de la fonction de recherche automatique de noms d'aéroport

Implémentation de la recherche automatique de noms d'aéroport basée sur les codes OACI,
prenant en charge l'obtention d'informations de noms d'aéroport à partir de plusieurs sources de données.

- Ajout de la classe AirportNameResolver
- Prise en charge du cache pour améliorer les performances de recherche
- Ajout de tests unitaires correspondants

Closes #45"

# Description des types :
# feat : Nouvelle fonctionnalité
# fix : Correction de bug
# docs : Mise à jour de la documentation
# style : Ajustement du formatage du code (n'affecte pas la fonctionnalité)
# refactor : Refactorisation du code
# perf : Optimisation des performances
# test : Ajout ou modification de tests
# chore : Modifications au processus de build ou aux outils auxiliaires
```

### Processus de Pull Request

#### 1. Liste de contrôle PR

Avant de soumettre une PR, assurez-vous que :

- [ ] Le code respecte les conventions de codage du projet
- [ ] Les cas de test nécessaires ont été ajoutés
- [ ] Tous les tests ont réussi
- [ ] La documentation pertinente a été mise à jour
- [ ] Le message de commit est conforme à la convention
- [ ] Aucune nouvelle dépendance n'a été introduite (si oui, veuillez le mentionner dans la PR)

#### 2. Modèle de PR

```markdown
## 📝 Description du changement
Décrivez brièvement ce que cette PR modifie.

## 🔧 Type de changement
- [ ] Correction de bug
- [ ] Nouvelle fonctionnalité
- [ ] Optimisation des performances
- [ ] Refactorisation du code
- [ ] Mise à jour de la documentation
- [ ] Amélioration des tests

## 🧪 Tests
Décrivez comment ces changements ont été testés :
- [ ] Nouveaux tests unitaires ajoutés
- [ ] Tests d'intégration ajoutés
- [ ] Étapes de test manuel :
  1. Étape 1
  2. Étape 2

## 📸 Captures d'écran (si applicable)
Si des modifications de l'interface utilisateur ou du format de sortie sont présentes, veuillez ajouter des captures d'écran.

## 🔗 Issue(s) associée(s)
Fixes #123
Related to #456

## 📋 Liste de contrôle
- [ ] Mon code respecte les conventions de codage du projet
- [ ] J'ai auto-révisé mon code
- [ ] J'ai ajouté les tests correspondants
- [ ] Tous les tests nouveaux et existants ont réussi
- [ ] J'ai mis à jour la documentation pertinente

## 💬 Remarques supplémentaires
Ajoutez toute autre information nécessaire.
```

## 🐛 Signalement de problèmes

### Modèle de rapport de bug

Lorsque vous trouvez un problème, veuillez utiliser le modèle suivant pour créer une Issue :

```markdown
**🐛 Description du bug**
Décrivez succinctement et clairement le problème rencontré.

**🔄 Étapes de reproduction**
1. Allez à '...'
2. Cliquez sur '...'
3. Faites défiler jusqu'à '...'
4. Observez l'erreur

**✅ Comportement attendu**
Décrivez ce que vous vous attendez à voir.

**💻 Informations sur l'environnement**
- Système d'exploitation : [par exemple Windows 10, macOS 11.6, Ubuntu 20.04]
- Version Python : [par exemple 3.9.7]
- Version Nav-data : [par exemple 2.1.0]
- Autres versions de logiciels pertinents :

**📄 Journaux d'erreurs**
Si applicable, veuillez ajouter les journaux d'erreurs ou des captures d'écran.

```
[Coller le contenu du journal ici]
```

**📁 Données d'entrée**
Si le problème est lié à des données d'entrée spécifiques, veuillez fournir des exemples de données (en supprimant les informations sensibles).

**🔍 Informations supplémentaires**
Ajoutez toute autre information susceptible d'aider à diagnostiquer le problème.
```

### Modèle de demande de fonctionnalité

```markdown
**🚀 Description de la fonctionnalité**
Décrivez succinctement et clairement la fonctionnalité que vous souhaitez ajouter.

**💡 Cas d'utilisation**
Décrivez le problème que cette fonctionnalité résout ou le processus qu'elle améliore.

**📋 Besoins détaillés**
- [ ] Besoin 1 : Description
- [ ] Besoin 2 : Description
- [ ] Besoin 3 : Description

**🎨 Solutions d'implémentation possibles**
Si vous avez des idées d'implémentation, veuillez les décrire brièvement.

**📚 Références**
Fournissez des liens vers des documents, des standards ou des références pertinents.

**📊 Priorité**
- [ ] Basse - À faire quand le temps le permet
- [ ] Moyenne - Important mais non urgent
- [ ] Haute - À implémenter dès que possible
- [ ] Urgente - Bloque d'autres travaux

**💬 Remarques supplémentaires**
Autres informations à noter.
```

## 📚 Configuration de l'environnement de développement

### Suggestions de configuration IDE

#### Visual Studio Code

Extensions recommandées :
```json
{
    "recommendations": [
        "ms-python.python",
        "ms-python.flake8",
        "ms-python.pylint",
        "ms-python.black-formatter",
        "njpwerner.autodocstring",
        "ms-python.isort",
        "charliermarsh.ruff"
    ]
}
```

Paramètres de l'espace de travail (`.vscode/settings.json`) :
```json
{
    "python.defaultInterpreterPath": "./nav-data-dev/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length=88"],
    "python.sortImports.args": ["--profile", "black"],
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    }
}
```

#### PyCharm

1. Configurer le style de code :
   - File → Settings → Editor → Code Style → Python
   - Sélectionner le préréglage "Black"

2. Configurer le lanceur de tests :
   - File → Settings → Tools → Python Integrated Tools
   - Lanceur de tests par défaut : pytest

### Configuration des outils de développement

#### Hooks pre-commit

Créer `.pre-commit-config.yaml` :
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
  
  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
        language_version: python3
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88, --extend-ignore=E203]
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: [--profile=black]
```

Installer et activer :
```bash
pip install pre-commit
pre-commit install
```

## 🏆 Bonnes pratiques

### Optimisation des performances

1. **Gestion de la mémoire**
   ```python
   # ✅ Bonne pratique : Utiliser des générateurs pour traiter les grands fichiers
   def process_large_file(file_path):
       with open(file_path, 'r') as f:
           for line in f:
               yield process_line(line)
   
   # ❌ À éviter : Charger l'intégralité du fichier en mémoire en une seule fois
   def process_large_file_bad(file_path):
       with open(file_path, 'r') as f:
           lines = f.readlines()  # Peut consommer beaucoup de mémoire
       return [process_line(line) for line in lines]
   ```

2. **Optimisation des opérations de base de données**
   ```python
   # ✅ Bonne pratique : Insertion par lots
   def insert_records_batch(connection, records, batch_size=1000):
       cursor = connection.cursor()
       for i in range(0, len(records), batch_size):
           batch = records[i:i + batch_size]
           cursor.executemany(
               "INSERT INTO table (col1, col2) VALUES (?, ?)", 
               batch
           )
           connection.commit()
   
   # ❌ À éviter : Insertion ligne par ligne
   def insert_records_one_by_one(connection, records):
       cursor = connection.cursor()
       for record in records:
           cursor.execute("INSERT INTO table (col1, col2) VALUES (?, ?)", record)
           connection.commit()  # Chaque commit affecte les performances
   ```

### Gestion des erreurs

```python
# ✅ Bonne gestion des erreurs
def process_coordinate(dms_string: str) -> float:
    """Traite une chaîne de caractères de coordonnées et retourne une valeur décimale"""
    try:
        return convert_dms_to_decimal(dms_string)
    except ValueError as e:
        logging.warning(f"Erreur de format de coordonnée : {dms_string}, Erreur : {e}")
        raise CoordinateError(f"Impossible d'analyser la coordonnée : {dms_string}") from e
    except Exception as e:
        logging.error(f"Erreur inconnue lors du traitement de la coordonnée : {e}")
        raise

# ❌ Gestion des erreurs à éviter
def process_coordinate_bad(dms_string):
    try:
        return convert_dms_to_decimal(dms_string)
    except:  # Capture toutes les exceptions, difficile à déboguer
        return None  # Perte d'informations sur l'erreur
```

### Rédaction de tests

```python
# ✅ Bons tests
class TestCoordinateProcessing(unittest.TestCase):
    def test_valid_north_latitude_conversion(self):
        """Teste la conversion d'une coordonnée de latitude nord valide"""
        # Given
        dms_input = "N390308.00"
        expected_decimal = 39.0522222
        
        # When
        result = convert_dms_to_decimal(dms_input)
        
        # Then
        self.assertAlmostEqual(result, expected_decimal, places=6)
    
    def test_invalid_format_raises_error(self):
        """Teste qu'un format invalide lève une erreur appropriée"""
        # Given
        invalid_input = "INVALID_FORMAT"
        
        # When/Then
        with self.assertRaises(CoordinateError) as context:
            convert_dms_to_decimal(invalid_input)
        
        self.assertIn("Impossible d'analyser la coordonnée", str(context.exception))

# ❌ Tests à éviter
def test_coordinate():  # Nom de test non clair
    result = convert_dms_to_decimal("N390308.00")
    assert result == 39.0522222  # La comparaison exacte de flottants peut échouer
```

## 📞 Obtenir de l'aide

Si vous rencontrez des problèmes pendant le processus de contribution :

1.  **Consultez la documentation** - Vérifiez d'abord la documentation du projet et ce guide de contribution
2.  **Recherchez les Issues existantes** - Vérifiez si quelqu'un a déjà rencontré un problème similaire
3.  **Participez aux discussions** - Posez des questions dans les discussions GitHub (GitHub Discussions)
4.  **Contactez les mainteneurs** - Contactez les mainteneurs du projet via les Issues GitHub

### Lignes directrices de la communauté

Nous nous engageons à créer un environnement communautaire ouvert et convivial :

-   **Respecter les autres** - Restez courtois et respectueux envers tous les participants
-   **Retour constructif** - Fournissez des commentaires et des suggestions utiles et constructifs
-   **Apprentissage patient** - Aidez les débutants à apprendre, partagez vos connaissances et votre expérience
-   **Esprit de collaboration** - Travaillez ensemble pour améliorer le projet

## 🎉 Reconnaissance des contributeurs

Nous reconnaissons les contributeurs aux endroits suivants :
-   Section des contributeurs de README.md
-   Historique des mises à jour de version dans CHANGELOG.md
-   Liste de remerciements des versions GitHub (GitHub Releases)

Merci d'avoir envisagé de contribuer au projet Nav-data ! Chaque contribution rend ce projet meilleur.

---

**Rappelez-vous** : Le bon code est écrit pour être lu par des humains, les machines ne font que l'exécuter.
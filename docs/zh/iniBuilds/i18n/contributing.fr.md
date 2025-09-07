# 🤝 Guide de contribution

Bienvenue à contribuer au projet Nav-data ! Ce guide vous aidera à comprendre comment participer au développement du projet, soumettre du code et proposer des améliorations.

## 🎯 Comment contribuer

### 📝 Vous pouvez contribuer des manières suivantes :

- **🐛 Rapporter un bogue** : Identifier un problème et fournir des étapes de reproduction détaillées
- **💡 Suggérer une fonctionnalité** : Proposer de nouvelles fonctionnalités ou des idées pour améliorer les fonctionnalités existantes
- **📖 Améliorer la documentation** : Compléter la documentation, corriger les erreurs, ajouter des exemples
- **🔧 Contribuer du code** : Corriger des bogues, implémenter de nouvelles fonctionnalités, optimiser les performances
- **🧪 Soutenir les tests** : Ajouter des cas de test, améliorer la couverture des tests
- **🌐 Localiser** : Traduire la documentation, prendre en charge plus de langues et de régions

## 🚀 Démarrage rapide

### 📋 Configuration de l'environnement de développement

1. **Forker le dépôt du projet**
   ```bash
   # Forker le projet sur GitHub
   # Puis cloner localement
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

2. **Configurer l'environnement de développement**
   ```bash
   # Créer un environnement virtuel
   python -m venv venv
   
   # Activer l'environnement virtuel
   # Windows:
   venv\Scripts\activate
   # macOS/Linux:
   source venv/bin/activate
   
   # Installer les dépendances
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # Dépendances de développement
   ```

3. **Installer les crochets Git**
   ```bash
   # Installer les crochets pre-commit
   pre-commit install
   ```

### 🔄 Flux de travail de développement

1. **Créer une branche**
   ```bash
   git checkout -b feature/your-feature-name
   # Ou
   git checkout -b fix/bug-description
   ```

2. **Effectuer le développement**
   - Écrire le code
   - Ajouter des tests
   - Mettre à jour la documentation
   - Exécuter les tests pour s'assurer qu'ils passent

3. **Commettre le code**
   ```bash
   git add .
   git commit -m "feat: add new navigation data processor"
   ```

4. **Pousser et créer une PR**
   ```bash
   git push origin feature/your-feature-name
   # Créer une Pull Request sur GitHub
   ```

## 📋 Conventions de codage

### 🐍 Style de code Python

Nous suivons la norme [PEP 8](https://pep8.org/) et utilisons les outils suivants :

#### **Formatage du code**
```bash
# Utiliser black pour le formatage du code
black *.py

# Utiliser isort pour organiser les imports
isort *.py
```

#### **Analyse du code**
```bash
# Utiliser flake8 pour l'analyse du code
flake8 *.py

# Utiliser pylint pour l'analyse statique
pylint *.py
```

### 📝 Exigences des conventions de codage

#### **1. Nommage des fonctions et des classes**
```python
# ✅ Nommage correct
def process_airports(csv_file_path: str, db_path: str) -> None:
    """Traite les données d'aéroport"""
    pass

class CoordinateCache:
    """Classe de cache de coordonnées"""
    pass

# ❌ Nommage incorrect
def processAirports(csvFile, dbPath):
    pass

class coordinateCache:
    pass
```

#### **2. Docstrings**
```python
def get_magnetic_variation(lat: float, lon: float) -> float:
    """
    Calcule la déclinaison magnétique pour les coordonnées spécifiées
    
    Paramètres:
        lat (float): Latitude (degrés décimaux)
        lon (float): Longitude (degrés décimaux)
    
Retourne:
        float: Déclinaison magnétique (degrés), arrondie à 1 décimale
    
    Exemple:
        >>> get_magnetic_variation(39.9042, 116.4074)
        -6.2
    """
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)
```

#### **3. Annotations de type**
```python
from typing import Dict, List, Optional, Tuple

def parse_dat_file(file_path: str) -> List[Dict[str, str]]:
    """Parse un fichier DAT et retourne une liste d'enregistrements"""
    records = []
    # Logique de traitement
    return records

def find_coordinates(
    identifier: str, 
    icao_code: Optional[str] = None
) -> Tuple[float, float]:
    """Trouve les coordonnées et retourne un tuple de latitude et longitude"""
    return lat, lon
```

#### **4. Gestion des erreurs**
```python
import logging

logger = logging.getLogger(__name__)

def process_data_file(file_path: str) -> bool:
    """
    Traite un fichier de données
    
    Retourne:
        bool: Indique si le traitement a réussi
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            # Logique de traitement
            data = file.read()
            
        logger.info(f"Fichier traité avec succès : {file_path}")
        return True
        
    except FileNotFoundError:
        logger.error(f"Fichier introuvable : {file_path}")
        return False
    except PermissionError:
        logger.error(f"Droits d'accès insuffisants au fichier : {file_path}")
        return False
    except Exception as e:
        logger.error(f"Une erreur inconnue est survenue lors du traitement du fichier : {e}")
        return False
```

#### **5. Définition des constantes**
```python
# Définir les constantes en haut du module
SUPPORTED_ICAO_REGIONS = {
    'ZB', 'ZS', 'ZJ', 'ZG', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH',
    'VM', 'VH', 'RK'
}

DEFAULT_BATCH_SIZE = 1000
COORDINATE_PRECISION = 8
DATABASE_TIMEOUT = 30

# Utilisation dans une fonction
def process_waypoints(icao_code: str) -> bool:
    if icao_code not in SUPPORTED_ICAO_REGIONS:
        logger.warning(f"Région OACI non prise en charge : {icao_code}")
        return False
    # Logique de traitement
```

## 🧪 Exigences de test

### 📊 Couverture de test

- **Exigence minimale** : Couverture des tests du nouveau code ≥ 80%
- **Objectif** : Couverture globale des tests du projet ≥ 90%

### 🛠️ Outils de test

```bash
# Exécuter tous les tests
pytest

# Exécuter un fichier de test spécifique
pytest tests/test_airports.py

# Générer un rapport de couverture
pytest --cov=. --cov-report=html

# Afficher le rapport de couverture
open htmlcov/index.html
```

### ✅ Exemples de test

#### **Tests unitaires**
```python
import unittest
from unittest.mock import patch, MagicMock
from airports import get_magnetic_variation, convert_dms_to_decimal

class TestAirports(unittest.TestCase):
    
    def test_convert_dms_to_decimal_north(self):
        """Teste la conversion DMS pour la latitude Nord"""
        result = convert_dms_to_decimal("N390842.12")
        self.assertAlmostEqual(result, 39.145033, places=6)
    
    def test_convert_dms_to_decimal_south(self):
        """Teste la conversion DMS pour la latitude Sud"""
        result = convert_dms_to_decimal("S390842.12")
        self.assertAlmostEqual(result, -39.145033, places=6)
    
    @patch('airports.geo_mag')
    def test_get_magnetic_variation(self, mock_geomag):
        """Teste le calcul de la déclinaison magnétique"""
        # Définir la valeur de retour simulée
        mock_result = MagicMock()
        mock_result.d = -6.234
        mock_geomag.calculate.return_value = mock_result
        
        result = get_magnetic_variation(39.9042, 116.4074)
        
        self.assertEqual(result, -6.2)
        mock_geomag.calculate.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### **Tests d'intégration**
```python
import tempfile
import sqlite3
import os
from airports import process_airports

class TestAirportsIntegration(unittest.TestCase):
    
    def setUp(self):
        """Configuration avant le test"""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix='.db')
        self.temp_db.close()
        self.db_path = self.temp_db.name
    
    def tearDown(self):
        """Nettoyage après le test"""
        os.unlink(self.db_path)
    
    def test_process_airports_integration(self):
        """Teste l'intégration du traitement des données d'aéroport"""
        csv_file = "test_data/sample_airports.csv"
        lookup_file = "test_data/sample_icao.txt"
        
        # Exécuter le traitement
        process_airports(csv_file, lookup_file, self.db_path)
        
        # Vérifier les résultats
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        
        self.assertGreater(count, 0)
        
        # Vérifier la qualité des données
        cursor.execute("""
            SELECT COUNT(*) FROM tbl_airports 
            WHERE airport_latitude IS NULL OR airport_longitude IS NULL
        """)
        null_coords = cursor.fetchone()[0]
        
        self.assertEqual(null_coords, 0, "Il ne devrait pas y avoir de coordonnées nulles")
        
        conn.close()
```

### 📝 Données de test

Les données de test doivent être placées dans le répertoire `tests/test_data/` :

```
tests/
├── test_data/
│   ├── sample_airports.csv      # Données d'aéroport d'exemple
│   ├── sample_runways.csv       # Données de piste d'exemple
│   ├── sample_earth_fix.dat     # Données de point de cheminement d'exemple
│   ├── sample_earth_nav.dat     # Données de balise de navigation d'exemple
│   └── sample_icao.txt          # Table de recherche OACI d'exemple
├── test_airports.py             # Tests du module aéroports
├── test_runways.py              # Tests du module pistes
├── test_waypoints.py            # Tests du module points de cheminement
└── conftest.py                  # Configuration pytest
```

## 🐛 Rapport de bogue

### 📋 Modèle de rapport de bogue

```markdown
## Description du bogue
Décrire le problème de manière concise

## Étapes de reproduction
1. Exécuter la commande `python XP2INI_NDB_Converter.py`
2. Sélectionner la configuration '...'
3. Observer l'erreur '...'

## Comportement attendu
Décrire ce qui devrait se produire

## Comportement réel
Décrire ce qui s'est réellement produit

## Informations sur l'environnement
- Système d'exploitation : Windows 11 22H2
- Version Python : 3.11.5
- Version MSFS : 2024
- Addon avion : PMDG 777

## Journaux d'erreurs
```
Coller les informations d'erreur et les journaux pertinents
```

## Informations supplémentaires
Toute autre information utile au diagnostic du problème
```

### 🔍 Classification des bogues

| Priorité | Étiquette | Description |
|----------|-----------|-------------|
| 🔴 Critique | `priority:critical` | Provoque un crash du programme ou une corruption de données |
| 🟠 Élevée | `priority:high` | Affecte les fonctionnalités majeures, avec une solution de contournement |
| 🟡 Moyenne | `priority:medium` | Affecte les fonctionnalités mineures ou l'expérience utilisateur |
| 🟢 Faible | `priority:low` | Problème mineur, n'affecte pas les fonctionnalités de base |

## 💡 Suggestion de fonctionnalité

### 📋 Modèle de suggestion de fonctionnalité

```markdown
## Aperçu de la fonctionnalité
Décrire brièvement la fonctionnalité suggérée

## Scénario d'utilisation
Décrire les situations où cette fonctionnalité serait nécessaire

## Description détaillée
Détailler la manière dont la fonctionnalité serait implémentée et l'effet attendu

## Solutions alternatives
Avez-vous envisagé d'autres solutions ?

## Informations supplémentaires
Toute autre information utile pour comprendre la suggestion
```

### 🎯 Classification des fonctionnalités

| Type | Étiquette | Description |
|------|-----------|-------------|
| ✨ Amélioration | `type:enhancement` | Améliore une fonctionnalité existante |
| 🚀 Fonctionnalité | `type:feature` | Nouvelle fonctionnalité |
| 📊 Performance | `type:performance` | Optimisation des performances |
| 📖 Documentation | `type:documentation` | Amélioration de la documentation |

## 📖 Contribution à la documentation

### 📝 Directives de documentation

1. **Format Markdown** : Utiliser la syntaxe Markdown standard
2. **Compatibilité VitePress** : S'assurer que le front matter est correct
3. **Mélange chinois et anglais** : Conserver les termes techniques en anglais, utiliser le chinois pour les explications
4. **Exemples de code** : Fournir des exemples de code complets et exécutables

### 🎨 Guide de style de documentation

```markdown
---
title: Titre de la page
description: Description de la page
---

# 🎯 Titre principal

Paragraphe d'introduction décrivant l'objectif et la portée de ce document.

## 📋 Titre de niveau deux

### Titre de niveau trois

Utiliser des emojis et une hiérarchie appropriés.

#### Exemple de code

```python
# Fournir un exemple de code complet
def example_function():
    return "Exemple"
```

#### Remarques

> ⚠️ **Note importante** : Les informations importantes doivent être mises en évidence à l'aide de blocs de citation

#### Format de liste

- ✅ Utiliser des emojis pour améliorer la lisibilité
- 📝 Garder les éléments de la liste concis et clairs
- 🔗 Ajouter des liens internes si nécessaire
```

## 🔄 Processus de Pull Request

### 📋 Liste de contrôle des PR

Avant de soumettre une PR, veuillez confirmer :

- [ ] 🧪 **Tous les tests sont passés** : `pytest`
- [ ] 📊 **La couverture des tests est satisfaisante** : Couverture du nouveau code ≥ 80%
- [ ] 🎨 **Le format du code est correct** : `black`, `isort`, `flake8`
- [ ] 📖 **La documentation a été mise à jour** : Les changements d'API nécessitent une mise à jour de la documentation
- [ ] 🏷️ **Le message de commit est conforme** : Suivre les Conventional Commits
- [ ] 🔗 **Lier l'Issue correspondante** : Citer l'Issue dans la description de la PR

### 📝 Modèle de PR

```markdown
## Aperçu des changements
Décrire brièvement l'objectif et les principaux changements de cette PR

## Type de changement
- [ ] 🐛 Correction de bogue
- [ ] ✨ Nouvelle fonctionnalité
- [ ] 📖 Mise à jour de la documentation
- [ ] 🎨 Refactorisation du code
- [ ] ⚡ Optimisation des performances
- [ ] 🧪 Amélioration des tests

## Description détaillée
Décrire en détail la méthode d'implémentation et les spécificités techniques

## Tests
Expliquer comment tester ces changements

## Issue(s) liée(s)
Ferme #123

## Liste de contrôle
- [ ] Tests passés
- [ ] Format du code correct
- [ ] Documentation mise à jour
- [ ] Journal des modifications mis à jour
```

### 🏷️ Convention des messages de commit

Suivre la convention [Conventional Commits](https://www.conventionalcommits.org/) :

```bash
# Ajout de fonctionnalité
feat: add support for AIRAC 2024 data format

# Correction de bogue
fix: resolve coordinate conversion precision issue

# Mise à jour de la documentation
docs: update installation guide for Windows 11

# Optimisation des performances
perf: optimize magnetic variation calculation

# Refactorisation du code
refactor: restructure database connection handling

# Ajout de tests
test: add unit tests for waypoint processing

# Lié à la compilation/build
build: update dependencies to latest versions
```

## 🌟 Reconnaissance des contributeurs

### 🏆 Niveaux de contributeurs

| Niveau | Exigences | Permissions |
|--------|-----------|-------------|
| 👋 Contributeur | 1+ PR valide | Contributeur de base |
| 🎖️ Contributeur régulier | 5+ PR valides | Revue de code prioritaire |
| 🌟 Contributeur principal | 10+ PR valides + participation à long terme | Permissions de tri des Issues |
| 👑 Mainteneur | Développeur principal | Permissions complètes du dépôt |

### 📜 Répertoire des contributeurs

Nous maintenons un répertoire des contributeurs dans le README, merci à tous les contributeurs pour leurs efforts !

```markdown
## 🙏 Remerciements aux contributeurs

<a href="https://github.com/your-repo/nav-data/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/nav-data" />
</a>
```

## 🤔 Obtenir de l'aide

### 💬 Canaux de communication

- **📧 Courriel** : project@nav-data.org
- **💬 Zone de discussion** : GitHub Discussions
- **🐛 Rapports de problèmes** : GitHub Issues
- **📖 Problèmes de documentation** : Soumettre directement une PR pour modification

### 📚 Ressources d'apprentissage

- [Documentation officielle Python](https://docs.python.org/)
- [Documentation SQLite](https://sqlite.org/docs.html)
- [Principes de navigation aérienne](https://www.faa.gov/air_traffic/publications/)
- [Norme ARINC 424](https://www.arinc.com/)

### 🎓 Guide pour les débutants

Si c'est votre première participation à un projet open-source :

1. 📖 **Lire le code** : Commencez par comprendre la structure du projet et les fonctionnalités principales
2. 🐛 **Commencer petit** : Démarrez par la correction d'erreurs de documentation ou de petits bogues
3. 🤝 **Communiquer activement** : N'hésitez pas à poser des questions et à demander de l'aide
4. 📈 **Apprendre continuellement** : Suivez les actualités du projet et apprenez les meilleures pratiques

## 📄 Code de conduite

### 🤝 Notre engagement

Afin de créer un environnement ouvert et accueillant, nous nous engageons à :

- **🌈 L'inclusivité** : Accueillir les participants de toutes origines et de tous points de vue
- **🤝 Le respect** : Respecter les différentes opinions et expériences
- **📚 L'orientation vers l'apprentissage** : Aider les débutants à grandir et à apprendre
- **🎯 Le professionnalisme** : Se concentrer sur les discussions techniques et l'amélioration du projet

### ❌ Comportements inacceptables

- Attaques personnelles ou propos insultants
- Harcèlement ou discrimination
- Publication d'informations privées d'autrui
- Tout autre comportement non professionnel ou inapproprié

### 📞 Mécanisme de signalement

En cas de violation du code de conduite, veuillez contacter les mainteneurs du projet :
- 📧 Courriel : conduct@nav-data.org
- 📱 Message privé : Contacter les mainteneurs via message privé GitHub

---

Merci d'avoir envisagé de contribuer au projet Nav-data ! Chaque contribution rend la communauté de la simulation aéronautique meilleure. 🛫
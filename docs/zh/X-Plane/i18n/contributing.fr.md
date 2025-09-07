# Guide de contribution

Bienvenue au projet open source Nav-data ! Nous vous sommes très reconnaissants pour votre contribution à l'outil de conversion de données de navigation aérienne.

## 🤝 Comment contribuer

### Signaler un problème (Issues)
- **Rapports de bugs** : Détecter des erreurs de programme ou des comportements anormaux
- **Requêtes de fonctionnalités** : Suggérer de nouvelles fonctionnalités ou améliorer celles existantes
- **Améliorations de la documentation** : Signaler les erreurs ou les points peu clairs dans la documentation
- **Problèmes de performance** : Rapporter les goulots d'étranglement de performance ou suggérer des optimisations

### Contributions au code (Pull Requests)
- **Correction de bugs** : Corriger les problèmes connus
- **Développement de nouvelles fonctionnalités** : Implémenter de nouvelles fonctions de traitement de données
- **Optimisation des performances** : Améliorer l'efficacité d'exécution du code
- **Refactorisation du code** : Améliorer la structure et la maintenabilité du code

### Contributions à la documentation
- **Documentation technique** : Compléter la documentation de l'API et les descriptions d'architecture
- **Guide de l'utilisateur** : Améliorer les instructions d'utilisation et les tutoriels
- **Exemples de code** : Fournir plus d'exemples d'utilisation
- **Traduction multilingue** : Traduire la documentation dans d'autres langues

## 📋 Avant de commencer

### 1. Comprendre le projet
Avant de commencer à contribuer, veuillez :
- Consulter la [description de l'architecture](./architecture.md)
- Comprendre les [instructions d'utilisation](./guide/usage.md)
- Parcourir les [Issues](https://github.com/your-repo/nav-data/issues) existantes

### 2. Préparation de l'environnement
Assurez-vous que votre environnement de développement répond aux exigences :
- Python 3.6+
- Git
- Les paquets de dépendances nécessaires (voir le [guide d'installation](./guide/installation.md))

### 3. Forker le projet
1. Accéder à la [page GitHub de Nav-data](https://github.com/your-repo/nav-data)
2. Cliquer sur le bouton "Fork" en haut à droite
3. Cloner votre Fork localement :
   ```bash
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

## 🐛 Signaler un problème

### Modèle de rapport de bug

Lors du signalement d'un bug, veuillez fournir les informations suivantes :

```markdown
**Description du bug**
Décrivez brièvement le problème rencontré.

**Étapes pour reproduire**
1. Exécuter la commande '...'
2. Utiliser le fichier de données '...'
3. Observer l'erreur '...'

**Comportement attendu**
Décrivez ce que vous attendiez.

**Comportement actuel**
Décrivez ce qui s'est réellement passé.

**Informations sur l'environnement**
- Système d'exploitation : [par ex. macOS 12.0]
- Version de Python : [par ex. 3.9.7]
- Version de Nav-data : [par ex. v1.2.0]

**Informations supplémentaires**
- Journaux d'erreurs
- Captures d'écran pertinentes
- Fichiers de données d'exemple (le cas échéant)
```

### Modèle de requête de fonctionnalité

```markdown
**Description de la fonctionnalité**
Décrivez brièvement la fonctionnalité que vous souhaitez ajouter.

**Cas d'utilisation**
Décrivez le problème spécifique ou le cas d'utilisation que cette fonctionnalité résout.

**Solution d'implémentation suggérée**
Si vous avez des idées d'implémentation spécifiques, veuillez les décrire en détail.

**Solutions alternatives**
Décrivez les autres solutions alternatives que vous avez envisagées.

**Informations supplémentaires**
Toute autre information pertinente ou référence.
```

## 💻 Processus de contribution au code

### 1. Créer une branche
Créez une nouvelle branche pour votre contribution :

```bash
# S'assurer que la branche main est à jour
git checkout main
git pull upstream main

# Créer une nouvelle branche
git checkout -b feature/your-feature-name
# Ou pour une correction de bug
git checkout -b fix/issue-number-description
```

### 2. Développement et tests
Pendant le développement :

```bash
# Committer fréquemment les changements
git add .
git commit -m "feat: add waypoint validation function"

# Exécuter les tests pour garantir la qualité du code
python -m pytest tests/
python -m flake8 .
python -m black . --check
```

### 3. Soumettre une Pull Request
Une fois le développement terminé :

```bash
# Pousser la branche vers votre Fork
git push origin feature/your-feature-name
```

Ensuite, créez une Pull Request sur GitHub.

### Modèle de Pull Request

```markdown
**Type de modification**
- [ ] Correction de bug
- [ ] Nouvelle fonctionnalité
- [ ] Refactorisation du code
- [ ] Mise à jour de la documentation
- [ ] Optimisation des performances

**Description des modifications**
Décrivez brièvement le contenu des modifications de cette PR.

**Issue(s) associée(s)**
- Fixes #(issue number)
- Related to #(issue number)

**Tests**
- [ ] Nouveaux cas de test ajoutés
- [ ] Tous les tests existants réussis
- [ ] Vérification par tests manuels

**Liste de contrôle**
- [ ] Le code respecte les conventions de codage du projet
- [ ] La documentation nécessaire a été ajoutée
- [ ] Le README ou la configuration pertinente a été mis à jour
- [ ] La compatibilité descendante a été prise en compte
```

## 📝 Conventions de code

### Standards de codage Python

#### 1. Style de code
Utilisez [PEP 8](https://pep8.org/) comme base et suivez les conventions supplémentaires suivantes :

```python
# Ordre des importations
import os  # Bibliothèque standard
import sys

import pandas as pd  # Bibliothèques tierces
import numpy as np

from .utils import helper_function  # Importations locales

# Définition de classe
class NavigationDataProcessor:
    """
    Processeur de données de navigation
    
    Traite les données de navigation aérienne de divers formats, y compris la conversion entre CSV, PDF, etc.
    
    Attributes:
        input_format (str): Format des données d'entrée
        output_format (str): Format des données de sortie
    """
    
    def __init__(self, input_format: str, output_format: str):
        """
        Initialise le processeur
        
        Args:
            input_format: Format des données d'entrée ('csv', 'pdf', 'dat')
            output_format: Format des données de sortie ('dat', 'txt', 'json')
        """
        self.input_format = input_format
        self.output_format = output_format
    
    def process(self, data: Any) -> Any:
        """
        Méthode principale pour traiter les données
        
        Args:
            data: Données d'entrée
            
        Returns:
            Données traitées
            
        Raises:
            ValueError: Soulevée si le format des données d'entrée n'est pas supporté
        """
        if not self._validate_input(data):
            raise ValueError(f"Invalid input format: {type(data)}")
        
        return self._convert_data(data)
```

#### 2. Conventions de nommage
```python
# Constantes : tout en majuscules, séparées par des underscores
CHINA_AREAS = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW'}
MAX_RETRY_COUNT = 3

# Variables et fonctions : minuscules, séparées par des underscores
def process_waypoint_data(input_file: str) -> List[Dict]:
    waypoint_list = []
    error_count = 0
    return waypoint_list

# Noms de classe : PascalCase
class CSVDataProcessor:
    pass

# Méthodes privées : préfixées par un seul underscore
def _validate_coordinates(self, lat: float, lon: float) -> bool:
    pass

# Usage interne : préfixées par deux underscores
def __internal_helper(self) -> None:
    pass
```

#### 3. Annotations de type
Toutes les fonctions publiques doivent inclure des annotations de type :

```python
from typing import Dict, List, Optional, Union, Any

def convert_coordinates(
    input_coords: Union[str, Tuple[float, float]], 
    output_format: str = "decimal"
) -> Optional[Dict[str, float]]:
    """
    Convertit le format des coordonnées
    
    Args:
        input_coords: Coordonnées d'entrée, supporte les formats chaîne ou tuple
        output_format: Format de sortie, supporte 'decimal' ou 'dms'
        
    Returns:
        Dictionnaire de coordonnées converties, retourne None en cas d'échec
    """
    pass
```

#### 4. Docstrings
Utilisez le style Google pour les docstrings :

```python
def process_airway_csv(csv_file: str, output_file: str, 
                      excluded_areas: Set[str] = None) -> bool:
    """
    Traite les fichiers de données CSV d'itinéraires
    
    Lit les données d'itinéraires à partir d'un fichier CSV, les valide et les convertit,
    puis les exporte au format DAT de X-Plane. Supporte la fonction de filtrage par zone.
    
    Args:
        csv_file: Chemin du fichier CSV d'entrée
        output_file: Chemin du fichier DAT de sortie  
        excluded_areas: Ensemble des codes de zone à exclure, None par défaut
        
    Returns:
        Retourne True en cas de succès du traitement, False en cas d'échec
        
    Raises:
        FileNotFoundError: Soulevée si le fichier d'entrée n'existe pas
        ValueError: Soulevée si le format CSV est incorrect
        
    Example:
        >>> process_airway_csv('routes.csv', 'earth_awy.dat', {'ZB', 'ZG'})
        True
        
    Note:
        Le fichier de sortie original est automatiquement sauvegardé pendant le traitement.
    """
    pass
```

### Outils de qualité de code

#### 1. Formatage du code
Utilisez [Black](https://black.readthedocs.io/) pour formater le code :

```bash
# Installation
pip install black

# Formater tout le projet
black .

# Vérifier le format sans modifier
black . --check

# Formater un seul fichier
black script.py
```

#### 2. Analyse du code
Utilisez [flake8](https://flake8.pycqa.org/) pour l'analyse du code :

```bash
# Installation
pip install flake8

# Analyser tout le projet
flake8 .

# Fichier de configuration .flake8
[flake8]
max-line-length = 88
ignore = E203, W503
exclude = 
    .git,
    __pycache__,
    build,
    dist,
    venv,
    .venv
```

#### 3. Vérification des types
Utilisez [mypy](http://mypy-lang.org/) pour la vérification des types :

```bash
# Installation
pip install mypy

# Vérifier les types
mypy .

# Fichier de configuration mypy.ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
```

### Conventions de commit Git

#### Format des messages de commit
Utilisez les conventions de [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Types de commit
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Mise à jour de la documentation
- `style`: Formatage du code (modifications n'affectant pas l'exécution du code)
- `refactor`: Refactorisation (modification du code qui n'est ni une nouvelle fonctionnalité, ni une correction de bug)
- `perf`: Optimisation des performances
- `test`: Ajout de tests
- `chore`: Modifications du processus de build ou des outils auxiliaires

#### Exemples
```bash
# Nouvelle fonctionnalité
git commit -m "feat(airway): add AIRAC cycle validation"

# Correction de bug
git commit -m "fix(pdf): resolve coordinate parsing error for edge cases"

# Mise à jour de la documentation
git commit -m "docs: update installation guide for macOS"

# Refactorisation
git commit -m "refactor(terminal): extract common validation logic"
```

## 🧪 Guide de test

### Structure des tests
```
tests/
├── unit/                   # Tests unitaires
│   ├── test_airway.py
│   ├── test_pdf_extract.py
│   └── test_terminal.py
├── integration/            # Tests d'intégration
│   ├── test_full_pipeline.py
│   └── test_module_interaction.py
├── fixtures/               # Données de test
│   ├── sample_data/
│   └── expected_outputs/
└── conftest.py            # Configuration pytest
```

### Écriture des tests

#### Exemple de test unitaire
```python
import pytest
from unittest.mock import Mock, patch
from nav_data.airway import NavigationPoint, process_navigation_point

class TestNavigationPoint:
    """Classe de test pour NavigationPoint"""
    
    def test_navigation_point_creation(self):
        """Teste la création d'un point de navigation"""
        point = NavigationPoint("ABCDE", "DESIGNATED_POINT", "ZB")
        
        assert point.identifier == "ABCDE"
        assert point.type.code_type == "DESIGNATED_POINT"
        assert point.area_code == "ZB"
    
    def test_navigation_point_invalid_type(self):
        """Teste un type de point de navigation invalide"""
        with pytest.raises(ValueError):
            NavigationPoint("ABCDE", "INVALID_TYPE", "ZB")
    
    @pytest.mark.parametrize("identifier,expected", [
        ("ABCDE", True),
        ("", False),
        (None, False),
    ])
    def test_navigation_point_validation(self, identifier, expected):
        """Test paramétré pour la validation d'un point de navigation"""
        result = validate_navigation_identifier(identifier)
        assert result == expected
```

#### Exemple de test d'intégration
```python
import tempfile
from pathlib import Path
from nav_data.pipeline import DataPipeline

class TestDataPipeline:
    """Test d'intégration du pipeline de données"""
    
    @pytest.fixture
    def temp_directory(self):
        """Fixture de répertoire temporaire"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def sample_csv_data(self):
        """Données CSV d'exemple"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123"""
    
    def test_complete_pipeline(self, temp_directory, sample_csv_data):
        """Teste le pipeline complet de traitement des données"""
        # Préparer les données de test
        input_file = temp_directory / "input.csv"
        input_file.write_text(sample_csv_data)
        output_file = temp_directory / "output.dat"
        
        # Exécuter le pipeline
        pipeline = DataPipeline()
        result = pipeline.process(str(input_file), str(output_file))
        
        # Vérifier le résultat
        assert result is True
        assert output_file.exists()
        
        output_content = output_file.read_text()
        assert "ABCDE" in output_content
        assert "FGHIJ" in output_content
```

### Exécuter les tests
```bash
# Exécuter tous les tests
pytest

# Exécuter un fichier de test spécifique
pytest tests/unit/test_airway.py

# Exécuter une méthode de test spécifique
pytest tests/unit/test_airway.py::TestNavigationPoint::test_navigation_point_creation

# Générer un rapport de couverture
pytest --cov=nav_data tests/

# Sortie détaillée
pytest -v

# Arrêter au premier échec
pytest -x
```

## 📚 Contributions à la documentation

### Structure de la documentation
```
docs/
├── guide/                  # Guide de l'utilisateur
│   ├── index.md           # Page d'accueil du guide
│   ├── installation.md    # Guide d'installation
│   ├── configuration.md   # Description de la configuration
│   └── usage.md           # Instructions d'utilisation
├── api/                    # Documentation API
│   ├── airway.md
│   ├── pdf_extract.md
│   └── terminal.md
├── architecture.md         # Description de l'architecture
├── contributing.md         # Guide de contribution
├── changelog.md           # Journal des modifications
└── license.md             # Licence
```

### Conventions de rédaction de la documentation

#### Format Markdown
```markdown
---
title: Titre du document
description: Description du document
---

# Titre de niveau 1

Brève introduction au contenu du document.

## Titre de niveau 2

### Titre de niveau 3

Le contenu principal utilise une formulation claire.

#### Exemple de code
Utilisez des blocs de code pour afficher des exemples :

```python
def example_function():
    """Fonction d'exemple"""
    return "Hello, Nav-data!"
```

#### Remarques importantes
> **Attention** : Les remarques importantes utilisent le format de citation.

**Avertissement** : Les messages d'avertissement utilisent le gras.

#### Liens et références
- Liens internes : [Guide d'installation](./guide/installation.md)
- Liens externes : [Site officiel de Python](https://python.org)
- Références de code : Utilisez le format `code` pour référencer le code
```

#### Guide de rédaction technique
1. **Clarté et concision** : Utilisez un langage simple et clair
2. **Structuration** : Organisez le contenu à l'aide de titres, de listes et de tableaux
3. **Exemples abondants** : Fournissez suffisamment d'exemples de code
4. **Convivialité** : Rédigez la documentation du point de vue de l'utilisateur
5. **Mises à jour régulières** : Maintenez la documentation synchronisée avec le code

### Documentation API
Rédigez une documentation détaillée pour toutes les API publiques :

```python
def process_csv_data(csv_file: str, output_format: str = "dat") -> Dict[str, Any]:
    """
    Traite les données de navigation au format CSV
    
    Cette fonction lit les données d'itinéraires au format CSV, les valide et les convertit,
    puis les exporte sous forme de fichier de données de navigation dans le format spécifié.
    
    Args:
        csv_file (str): Chemin du fichier CSV d'entrée
        output_format (str, optional): Format de sortie, supporte 'dat', 'json', 'xml'.
                                     Par défaut, 'dat'.
    
    Returns:
        Dict[str, Any]: Informations sur le résultat du traitement, contenant les clés suivantes :
            - 'success' (bool): Indique si le traitement a réussi
            - 'processed_count' (int): Nombre d'enregistrements traités avec succès
            - 'error_count' (int): Nombre d'enregistrements erronés
            - 'output_file' (str): Chemin du fichier de sortie
    
    Raises:
        FileNotFoundError: Soulevée lorsque le fichier d'entrée n'existe pas
        ValueError: Soulevée lorsque le format CSV est incorrect
        PermissionError: Soulevée lorsque l'écriture dans le fichier de sortie est impossible
    
    Example:
        Utilisation de base :
        
        >>> result = process_csv_data('airway_data.csv')
        >>> print(result['success'])
        True
        
        Spécifier le format de sortie :
        
        >>> result = process_csv_data('airway_data.csv', 'json')
        >>> print(result['output_file'])
        'airway_data.json'
    
    Note:
        - Le fichier CSV d'entrée doit contenir les champs de données d'itinéraire standard
        - L'intégrité des données est automatiquement vérifiée pendant le traitement
        - Prend en charge la reprise après interruption
    
    See Also:
        :func:`validate_csv_format`: Validation du format CSV
        :func:`convert_coordinate_format`: Conversion du format des coordonnées
    """
    pass
```

## 🔍 Revue de code

### Liste de contrôle de la revue

#### Fonctionnalité
- [ ] Le code implémente la fonctionnalité attendue
- [ ] Tous les cas limites sont traités
- [ ] La gestion des erreurs est appropriée
- [ ] Les performances répondent aux exigences

#### Qualité du code
- [ ] La structure du code est claire
- [ ] Le nommage est descriptif
- [ ] Les fonctions ont une responsabilité unique
- [ ] La duplication de code est évitée

#### Sécurité
- [ ] La validation des entrées est suffisante
- [ ] Aucune faille de sécurité
- [ ] Les informations sensibles sont traitées correctement
- [ ] Les contrôles de permissions sont appropriés

#### Tests
- [ ] La couverture des tests est suffisante
- [ ] Les cas de test sont exhaustifs
- [ ] Les tests d'intégration sont passés
- [ ] Les tests de performance répondent aux exigences

#### Documentation
- [ ] Les commentaires de code sont suffisants
- [ ] La documentation API est complète
- [ ] La documentation utilisateur est mise à jour
- [ ] Le journal des modifications est mis à jour

### Retour de revue
Fournissez des commentaires constructifs :

```markdown
**Évaluation générale**
Le code implémente la fonctionnalité attendue, la structure est claire et la couverture des tests est suffisante.

**Commentaires spécifiques**
1. **Structure du code** : La fonction `process_data` est trop longue, il est suggéré de la diviser en plusieurs petites fonctions
2. **Optimisation des performances** : La boucle à la ligne 45 pourrait être optimisée en utilisant une compréhension de liste
3. **Gestion des erreurs** : Il est suggéré d'ajouter un type d'exception spécifique à la ligne 78

**Modifications suggérées**
```python
# Il est suggéré de remplacer ce code
for item in data_list:
    if validate_item(item):
        processed_list.append(process_item(item))

# par
processed_list = [
    process_item(item) 
    for item in data_list 
    if validate_item(item)
]
```

**Autre**
La documentation a besoin d'exemples d'utilisation supplémentaires.
```

## 🚀 Processus de publication

### Conventions de numérotation de version
Utilisez le [versionnement sémantique](https://semver.org/lang/zh-CN/) (Semantic Versioning) :

- **Majeure** : Modifications incompatibles de l'API
- **Mineure** : Ajouts fonctionnels rétrocompatibles
- **Patch** : Corrections de problèmes rétrocompatibles

Exemple : `1.2.3`

### Liste de contrôle de publication
Avant la publication, assurez-vous que :
- [ ] Tous les tests sont passés
- [ ] La documentation est mise à jour
- [ ] Le journal des modifications est mis à jour
- [ ] Le numéro de version est mis à jour
- [ ] Les dépendances sont correctes
- [ ] La revue de sécurité est passée

## 🏆 Récompenses pour les contributeurs

### Mécanismes de reconnaissance
- **Contributeurs au code** : Liste de tous les contributeurs dans le README
- **Contributeurs à la documentation** : Informations sur les contributeurs annotées dans la documentation
- **Rapporteurs de problèmes** : Remerciements après la résolution des Issues
- **Contributeurs à long terme** : Invitation à devenir mainteneurs du projet

### Devenir mainteneur
Les contributeurs actifs à long terme peuvent être invités à devenir mainteneurs du projet et obtenir :
- Droits de push directs
- Droits de revoir les Pull Requests
- Droit de participer aux décisions du projet
- Remerciements spéciaux dans la présentation du projet

## 📞 Contact

### Obtenir de l'aide
- **GitHub Issues** : Signaler un problème ou demander une fonctionnalité
- **GitHub Discussions** : Discussions générales et questions-réponses
- **Documentation** : Consulter le guide d'utilisation détaillé
- **Commentaires de code** : Consulter les commentaires détaillés dans le code source

### Directives communautaires
Lorsque vous participez au projet, veuillez suivre les principes suivants :
- **Respect d'autrui** : Maintenez une attitude amicale et professionnelle
- **Discussions constructives** : Fournissez des commentaires et suggestions précieux
- **Inclusivité** : Accueillez les contributeurs de tous horizons
- **Orientation vers l'apprentissage** : Aidez les autres à apprendre et à grandir

## 🙏 Remerciements

Merci à tous les développeurs, testeurs, contributeurs à la documentation et utilisateurs qui ont contribué au projet Nav-data !

### Remerciements spéciaux
- Équipe de maintenance principale
- Contributeurs à long terme
- Rapporteurs de problèmes
- Traducteurs de documentation
- Supporters de la communauté

---

**Merci encore pour votre contribution !** 🎉 Votre participation rend Nav-data meilleur et fournit des outils de données de navigation de meilleure qualité à la communauté de la simulation aéronautique.
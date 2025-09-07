# 🤝 Guide de contribution au convertisseur de données de navigation TFDI

Bienvenue au projet de convertisseur de données de navigation TFDI ! Nous apprécions la participation de chaque contributeur, qu'il s'agisse de contributions de code, d'améliorations de la documentation, de rapports de bugs ou de suggestions de fonctionnalités.

## 🌟 Façons de contribuer

### 💻 Contributions de code
- 🐛 **Correction de bugs** - Résoudre les problèmes et défauts connus
- ✨ **Développement de nouvelles fonctionnalités** - Ajouter de nouvelles fonctionnalités de conversion ou des améliorations
- 📈 **Optimisation des performances** - Améliorer la vitesse de conversion et l'efficacité de l'utilisation de la mémoire
- 🧪 **Amélioration des tests** - Augmenter les cas de test et la couverture
- 📚 **Amélioration de la documentation** - Compléter la documentation API et les guides d'utilisation

### 📝 Contributions non-code
- 🐛 **Rapports de problèmes** - Signaler les bugs et les problèmes de compatibilité
- 💡 **Suggestions de fonctionnalités** - Proposer de nouvelles fonctionnalités et des améliorations
- 📖 **Rédaction de documentation** - Rédiger des tutoriels, des guides et des exemples
- 🌐 **Localisation** - Traduire l'interface et la documentation
- 🎓 **Support communautaire** - Aider les autres utilisateurs à résoudre leurs problèmes

## 🚀 Configuration de l'environnement de développement

### Exigences environnementales

```bash
# Exigences de version de Python
Python 3.8+ (3.9 ou 3.10 recommandé)

# Support du système d'exploitation
Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+)

# Exigences de mémoire
Minimum 4GB RAM (8GB+ recommandé)
```

### Démarrage rapide

#### 1. Cloner le projet
```bash
# Cloner le dépôt principal
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Ou cloner votre Fork
git clone https://github.com/your-username/tfdi-nav-converter.git
cd tfdi-nav-converter
```

#### 2. Configurer l'environnement de développement
```bash
# Créer un environnement virtuel
python -m venv venv

# Activer l'environnement virtuel
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Installer les dépendances de développement
pip install -r requirements-dev.txt
pip install -e .  # Installation éditable
```

#### 3. Vérifier l'installation
```bash
# Exécuter la suite de tests
pytest

# Exécuter les vérifications de qualité de code
flake8 src/
mypy src/
black --check src/

# Exécuter le convertisseur
python -m tfdi_converter --help
```

### Configuration des outils de développement

#### Configuration de l'IDE (VS Code recommandé)
```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./venv/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.mypyEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests/"]
}
```

#### Hooks de pré-commit
```bash
# Installer pre-commit
pip install pre-commit

# Installer les hooks
pre-commit install

# Exécuter manuellement tous les hooks
pre-commit run --all-files
```

## 📋 Processus de développement

### 1. Créer une branche de fonctionnalité

```bash
# S'assurer que la branche principale est à jour
git checkout main
git pull origin main

# Créer une nouvelle branche de fonctionnalité
git checkout -b feature/add-new-format-support

# Ou une branche de correction
git checkout -b fix/memory-leak-in-processor
```

### 2. Développement et tests

#### Développement du code
```bash
# Écrire le code
# ... Poursuivre le développement ...

# Ajouter des tests
# tests/test_new_feature.py

# Mettre à jour la documentation
# docs/api/new_feature.md
```

#### Exécuter les tests
```bash
# Exécuter tous les tests
pytest

# Exécuter un fichier de test spécifique
pytest tests/test_converter.py

# Exécuter et générer un rapport de couverture
pytest --cov=tfdi_converter --cov-report=html

# Exécuter les tests de performance
pytest tests/performance/ -m performance
```

#### Vérifications de la qualité du code
```bash
# Formater le code
black src/ tests/

# Trier les imports
isort src/ tests/

# Analyse statique
flake8 src/ tests/
mypy src/

# Vérification de sécurité
bandit -r src/
```

### 3. Commiter le code

#### Spécification des messages de commit
Utilisez la spécification [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types de commit :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Mise à jour de la documentation
- `style`: Ajustement du formatage du code
- `refactor`: Refactorisation du code
- `test`: Lié aux tests
- `chore`: Modifications du processus de build ou des outils auxiliaires
- `perf`: Amélioration des performances

**Exemples de commit :**
```bash
# Nouvelle fonctionnalité
git commit -m "feat(converter): add support for MSFS native format"

# Correction de bug
git commit -m "fix(parser): handle malformed coordinate data gracefully"

# Mise à jour de la documentation
git commit -m "docs(api): add examples for batch processing"

# Amélioration des performances
git commit -m "perf(processor): optimize memory usage in large dataset processing"
```

### 4. Pousser et créer une PR

```bash
# Pousser la branche vers le dépôt distant
git push origin feature/add-new-format-support

# Créer une Pull Request sur GitHub
# Remplir le modèle de PR
# Attendre la revue de code
```

## 📝 Conventions de code

### Conventions de codage Python

#### 1. Style de code
```python
# Utiliser les paramètres par défaut du formateur Black
# Longueur de ligne : 88 caractères
# Utiliser les guillemets doubles
# Deux lignes vides entre les fonctions

from typing import Dict, List, Optional, Union
import logging
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


@dataclass
class ConversionConfig:
    """Classe de configuration de conversion.
    
    Utilisée pour gérer les différents paramètres de configuration du convertisseur TFDI.
    
    Attributes:
        output_dir: Chemin du répertoire de sortie
        coordinate_precision: Précision des coordonnées
        enable_validation: Activer ou non la validation des données
    """
    output_dir: str = "Primary"
    coordinate_precision: int = 8
    enable_validation: bool = True


class FenixDataProcessor:
    """Processeur de données Fenix.
    
    Responsable de la lecture et du traitement des données de navigation depuis la base de données Fenix.
    """
    
    def __init__(self, config: ConversionConfig) -> None:
        """Initialise le processeur.
        
        Args:
            config: Objet de configuration de conversion
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def process_waypoints(
        self, 
        waypoint_data: List[Dict[str, Union[str, float]]]
    ) -> List[Dict[str, Union[str, float]]]:
        """Traite les données de points de cheminement.
        
        Args:
            waypoint_data: Liste des données brutes de points de cheminement
            
        Returns:
            Liste des données de points de cheminement traitées
            
        Raises:
            DataProcessingError: Une erreur est survenue pendant le traitement des données
        """
        try:
            processed_data = []
            
            for waypoint in waypoint_data:
                processed_waypoint = self._normalize_waypoint(waypoint)
                processed_data.append(processed_waypoint)
            
            self.logger.info(f"Successfully processed {len(processed_data)} waypoints")
            return processed_data
            
        except Exception as e:
            self.logger.error(f"Waypoint processing failed: {e}")
            raise DataProcessingError(f"Failed to process waypoint data: {e}") from e
    
    def _normalize_waypoint(
        self, waypoint: Dict[str, Union[str, float]]
    ) -> Dict[str, Union[str, float]]:
        """Normalise les données d'un point de cheminement unique."""
        # Implémenter la logique de normalisation
        normalized = waypoint.copy()
        
        # Normaliser la précision des coordonnées
        if "latitude" in normalized:
            normalized["latitude"] = round(
                float(normalized["latitude"]), 
                self.config.coordinate_precision
            )
        
        return normalized
```

#### 2. Indications de type
```python
from typing import (
    Any, Dict, List, Optional, Union, 
    Callable, Iterator, TypeVar, Generic
)

# Alias de type
ConfigDict = Dict[str, Any]
WaypointData = Dict[str, Union[str, float]]
ProcessingResult = List[WaypointData]

# Type générique
T = TypeVar('T')

class DataCache(Generic[T]):
    """Classe de cache de données générique"""
    
    def __init__(self) -> None:
        self._cache: Dict[str, T] = {}
    
    def get(self, key: str) -> Optional[T]:
        """Obtenir les données du cache"""
        return self._cache.get(key)
    
    def set(self, key: str, value: T) -> None:
        """Définir les données du cache"""
        self._cache[key] = value
```

#### 3. Gestion des erreurs
```python
class TFDIConverterError(Exception):
    """Classe d'exception de base du convertisseur"""
    pass


class DataValidationError(TFDIConverterError):
    """Exception de validation des données"""
    pass


class DatabaseConnectionError(TFDIConverterError):
    """Exception de connexion à la base de données"""
    pass


def safe_database_operation(operation: Callable[[], T]) -> Optional[T]:
    """Wrapper pour les opérations de base de données sécurisées"""
    try:
        return operation()
    except sqlite3.Error as e:
        logger.error(f"Database operation failed: {e}")
        raise DatabaseConnectionError(f"Database operation failed: {e}") from e
    except Exception as e:
        logger.error(f"Unknown error: {e}")
        return None
```

### Conventions de test

#### 1. Structure des tests
```python
# tests/test_converter.py
import pytest
from unittest.mock import Mock, patch
from pathlib import Path

from tfdi_converter.core.converter import FenixToTFDIConverter
from tfdi_converter.core.config import ConverterConfig
from tfdi_converter.exceptions import DataValidationError


class TestFenixToTFDIConverter:
    """Classe de test du convertisseur Fenix vers TFDI"""
    
    @pytest.fixture
    def sample_config(self) -> ConverterConfig:
        """Crée une configuration d'exemple"""
        return ConverterConfig(
            output_dir="test_output",
            coordinate_precision=6,
            enable_validation=True
        )
    
    @pytest.fixture
    def sample_database(self, tmp_path: Path) -> Path:
        """Crée une base de données d'exemple"""
        db_path = tmp_path / "test.db3"
        # Logique de création de la base de données de test
        return db_path
    
    def test_converter_initialization(self, sample_config):
        """Teste l'initialisation du convertisseur"""
        converter = FenixToTFDIConverter(sample_config)
        
        assert converter.config == sample_config
        assert converter.config.coordinate_precision == 6
    
    def test_database_validation_success(
        self, sample_config, sample_database
    ):
        """Teste le cas de succès de la validation de la base de données"""
        converter = FenixToTFDIConverter(sample_config)
        
        result = converter.validate_database(sample_database)
        
        assert result is True
    
    def test_database_validation_failure(self, sample_config):
        """Teste le cas d'échec de la validation de la base de données"""
        converter = FenixToTFDIConverter(sample_config)
        invalid_db = Path("nonexistent.db3")
        
        with pytest.raises(DataValidationError):
            converter.validate_database(invalid_db)
    
    @patch('tfdi_converter.core.converter.sqlite3.connect')
    def test_database_connection_error(
        self, mock_connect, sample_config, sample_database
    ):
        """Teste l'erreur de connexion à la base de données"""
        mock_connect.side_effect = sqlite3.Error("Connection failed")
        converter = FenixToTFDIConverter(sample_config)
        
        with pytest.raises(DatabaseConnectionError):
            converter.convert(sample_database, start_terminal_id=1000)
    
    @pytest.mark.performance
    def test_large_database_performance(
        self, sample_config, large_test_database
    ):
        """Teste les performances avec une grande base de données"""
        import time
        
        converter = FenixToTFDIConverter(sample_config)
        start_time = time.time()
        
        converter.convert(large_test_database, start_terminal_id=1000)
        
        elapsed_time = time.time() - start_time
        assert elapsed_time < 300  # Doit se terminer en moins de 5 minutes
```

#### 2. Gestion des données de test
```python
# tests/conftest.py
import pytest
import sqlite3
from pathlib import Path


@pytest.fixture(scope="session")
def test_data_dir() -> Path:
    """Répertoire des données de test"""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_fenix_database(tmp_path: Path) -> Path:
    """Crée une base de données Fenix d'exemple"""
    db_path = tmp_path / "sample_fenix.db3"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Créer la structure de la table de test
    cursor.execute("""
        CREATE TABLE Airports (
            AirportID TEXT PRIMARY KEY,
            AirportName TEXT,
            Latitude REAL,
            Longitude REAL
        )
    """)
    
    # Insérer les données de test
    cursor.execute("""
        INSERT INTO Airports VALUES 
        ('ZBAA', 'Beijing Capital', 40.080111, 116.584556),
        ('ZSPD', 'Shanghai Pudong', 31.143378, 121.805214)
    """)
    
    conn.commit()
    conn.close()
    
    return db_path
```

### Conventions de documentation

#### 1. Documentation API
```python
def convert_fenix_database(
    database_path: Path,
    output_dir: Path,
    config: Optional[ConverterConfig] = None
) -> ConversionResult:
    """Convertit une base de données Fenix au format TFDI.
    
    Cette fonction reçoit un fichier de base de données de navigation Fenix A320
    et le convertit en un ensemble de fichiers au format JSON compatible TFDI MD-11.
    
    Args:
        database_path: Chemin du fichier de base de données Fenix (fichier .db3)
        output_dir: Chemin du répertoire de sortie, les fichiers convertis y seront sauvegardés
        config: Objet de configuration de conversion optionnel, si non fourni, la configuration par défaut sera utilisée
    
    Returns:
        ConversionResult: Un objet contenant les résultats de conversion et les statistiques
        
    Raises:
        FileNotFoundError: Lorsque le fichier de base de données n'existe pas
        DataValidationError: Lorsque le format de la base de données est incorrect
        PermissionError: Lorsque les permissions d'écriture dans le répertoire de sortie sont insuffisantes
        
    Example:
        >>> from pathlib import Path
        >>> from tfdi_converter import convert_fenix_database
        >>> 
        >>> result = convert_fenix_database(
        ...     database_path=Path("fenix_nav.db3"),
        ...     output_dir=Path("./output")
        ... )
        >>> print(f"Conversion completed, {result.processed_records} records processed")
        
    Note:
        Le processus de conversion peut prendre plusieurs minutes, selon la taille de la base de données.
        Il est recommandé de sauvegarder les données originales avant la conversion.
        
    See Also:
        - :class:`ConverterConfig`: Options de configuration de conversion
        - :class:`ConversionResult`: Détails du résultat de la conversion
    """
    pass
```

#### 2. Documentation utilisateur
```markdown
# Exemples d'utilisation

## Conversion de base

```python
from tfdi_converter import FenixToTFDIConverter, ConverterConfig

# Créer la configuration
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8
)

# Initialiser le convertisseur
converter = FenixToTFDIConverter(config)

# Exécuter la conversion
result = converter.convert(
    database_path="path/to/fenix.db3",
    start_terminal_id=1000
)

print(f"Conversion terminée ! Fichier de sortie : {result.output_archive}")
```

## Configuration avancée

```python
# Configuration personnalisée
config = ConverterConfig(
    output_dir="Custom_Output",
    coordinate_precision=6,
    vnav_threshold=3.0,
    enable_faf_detection=True,
    compression_level=9
)
```
```

## 🧪 Guide de test

### Stratégie de test

#### 1. Tests unitaires
- **Objectif de couverture** : 90%+
- **Portée des tests** : Toutes les méthodes publiques et les méthodes privées clés
- **Stratégie de Mock** : Isoler les dépendances externes (bases de données, système de fichiers)

#### 2. Tests d'intégration
- **Intégration de la base de données** : Utiliser de vraies bases de données de test
- **Intégration du système de fichiers** : Tester les opérations réelles de lecture/écriture de fichiers
- **Tests de bout en bout** : Tests du processus de conversion complet

#### 3. Tests de performance
- **Tests de référence** : Enregistrer le temps de traitement pour différentes tailles de jeux de données
- **Tests de mémoire** : Surveiller l'utilisation de la mémoire et les fuites
- **Tests de concurrence** : Tester le multithreading et la sécurité de la concurrence

### Exécuter les tests

```bash
# Tests rapides (exclut les tests de performance)
pytest -m "not performance"

# Suite de tests complète
pytest

# Tests de module spécifique
pytest tests/test_converter.py

# Tests de couverture
pytest --cov=tfdi_converter --cov-report=term-missing

# Tests de performance de référence
pytest tests/performance/ --benchmark-only
```

## 📚 Contributions à la documentation

### Types de documentation

#### 1. Documentation utilisateur
- **Guide d'installation** : Étapes d'installation détaillées
- **Tutoriels d'utilisation** : Exemples d'utilisation, du basique à l'avancé
- **Dépannage** : Problèmes courants et solutions
- **Référence API** : Documentation API complète

#### 2. Documentation développeur
- **Conception architecturale** : Architecture système et principes de conception
- **Guide de contribution** : Ce document
- **Conventions de codage** : Style de code et meilleures pratiques
- **Processus de publication** : Processus de publication et de maintenance des versions

### Construction de la documentation

```bash
# Installer les dépendances de documentation
pip install -r docs/requirements.txt

# Construire la documentation
cd docs/
make html

# Prévisualisation en direct
make livehtml
```

## 🐛 Rapports de problèmes

### Modèle de rapport de problème

```markdown
**Description du problème**
Décrivez clairement et succinctement le problème rencontré.

**Étapes de reproduction**
1. Exécuter '...'
2. Entrer '...'
3. Voir l'erreur '...'

**Comportement attendu**
Décrivez ce que vous attendiez.

**Comportement réel**
Décrivez ce qui s'est réellement passé.

**Informations sur l'environnement**
- OS: [Ex. Windows 11, macOS 12.0, Ubuntu 20.04]
- Python: [Ex. 3.9.16]
- Version du convertisseur: [Ex. v1.0.0]
- Version Fenix: [Ex. v1.2.0]
- Version TFDI: [Ex. v1.1.0]

**Informations sur la base de données**
- Taille de la base de données: [Ex. 150 Mo]
- Nombre d'enregistrements: [Ex. ~50 000 enregistrements]
- Cycle AIRAC: [Ex. 2508]

**Informations de log**
```
Collez les informations de log pertinentes ou la pile d'erreurs
```

**Fichiers attachés**
- Fichier de configuration
- Capture d'écran de l'erreur
- Données d'exemple (si possible)
```

### Étiquettes de problèmes

Utilisez les étiquettes suivantes pour classer les problèmes :
- 🐛 `bug` - Rapport de bug
- ✨ `enhancement` - Demande de fonctionnalité
- 📚 `documentation` - Lié à la documentation
- ❓ `question` - Question d'utilisation
- 🔥 `urgent` - Problème urgent
- 🆕 `good first issue` - Adapté aux nouveaux contributeurs

## 🏆 Reconnaissance et récompenses

### Reconnaissance des contributeurs

#### 1. Contributeurs de code
- **Liste des commiteurs** : Liste des contributeurs dans le README et la documentation
- **Notes de version** : Remerciements spéciaux dans les notes de version
- **Statistiques GitHub** : Statistiques de contribution et badges d'accomplissement

#### 2. Contributeurs à la documentation
- **Crédit de documentation** : Attribution sur les pages de documentation pertinentes
- **Reconnaissance de traduction** : Liste des traducteurs pour les versions multilingues
- **Auteurs de tutoriels** : Reconnaissance des auteurs de tutoriels communautaires

#### 3. Contributeurs communautaires
- **Rapports de problèmes** : Remerciements spéciaux aux découvreurs de problèmes importants
- **Contributions aux tests** : Contributeurs aux tests Beta et à l'assurance qualité
- **Contributions promotionnelles** : Contributeurs à la promotion et à l'éducation de la communauté

### Récompenses spéciales pour les contributions

#### Contributeur du mois
- Sélection mensuelle des contributeurs exceptionnels
- Promotion sur la page d'accueil du projet et les médias sociaux
- Badges et titres GitHub spéciaux

#### Contributeur de l'année
- Sélection du meilleur contributeur de l'année
- Souvenirs et certificats personnalisés
- Invitation au comité de décision du projet

## 📞 Contact

### Contact de l'équipe de développement

- **Mainteneurs du projet** : @maintainer-username
- **Responsable technique** : @tech-lead-username  
- **Gestionnaire de communauté** : @community-manager-username

### Canaux de communication

- **GitHub Issues** : Problèmes techniques et demandes de fonctionnalités
- **GitHub Discussions** : Discussions générales et questions-réponses
- **Liste de diffusion** : dev@tfdi-converter.org
- **Discord** : [Lien d'invitation]

### Engagement sur le temps de réponse

- **Rapports de bugs** : Réponse sous 48 heures
- **Demandes de fonctionnalités** : Réponse sous 1 semaine
- **Pull Request** : Revue sous 3 jours ouvrables
- **Questions de la communauté** : Réponse sous 24 heures

---

**Merci d'avoir envisagé de contribuer au convertisseur de données de navigation TFDI !**

Nous sommes impatients de construire de meilleurs outils de simulation de vol avec vous. 🚁✨
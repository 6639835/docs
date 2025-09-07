# 🤝 Guide de contribution

Merci de votre intérêt pour le projet de convertisseur de données de navigation iFly ! Nous accueillons et apprécions toutes les formes de contribution.

## 🌟 Types de contribution

### 💻 Contributions de code
- 🐛 Correction de bugs
- ✨ Ajout de nouvelles fonctionnalités
- 📈 Optimisation des performances
- 🧪 Ajout de cas de test
- 📚 Amélioration de la documentation

### 📝 Contributions non-code
- 🐛 Signalement de problèmes (Bugs)
- 💡 Suggestion de fonctionnalités
- 📖 Amélioration de la documentation
- 🌐 Support de traduction
- 🎓 Création de tutoriels

## 🚀 Démarrage rapide

### 1. Préparation de l'environnement

```bash
# Cloner le dépôt
git clone https://github.com/your-username/ifly-nav-converter.git
cd ifly-nav-converter

# Créer un environnement virtuel
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Dépendances de développement
```

### 2. Configuration de l'environnement de développement

```bash
# Installer les hooks de pré-validation (pre-commit)
pre-commit install

# Exécuter les tests
pytest

# Vérification de la qualité du code
flake8 .
mypy .
black . --check
```

## 📋 Processus de développement

### 1. Création d'une branche de fonctionnalité

```bash
# Créer une nouvelle branche à partir de la branche principale
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Ou une branche de correction
git checkout -b fix/issue-description
```

### 2. Développement et tests

```bash
# Effectuer le développement
# ... Écrire du code ...

# Exécuter les tests
pytest tests/

# Vérifier la qualité du code
black .
flake8 .
mypy .
```

### 3. Soumission du code

```bash
# Ajouter les fichiers
git add .

# Valider (suivre la convention des messages de commit)
git commit -m "feat: add new feature description"

# Pousser vers la branche distante
git push origin feature/your-feature-name
```

### 4. Création d'une Pull Request

1. Créer une Pull Request sur GitHub
2. Remplir une description détaillée de la PR
3. S'assurer que toutes les vérifications sont passées
4. Attendre la revue de code

## 📝 Conventions de code

### Style de code Python

Nous utilisons les outils suivants pour garantir la qualité du code :

- **Black** : Formatage du code
- **Flake8** : Vérification du style de code
- **MyPy** : Vérification de type
- **isort** : Tri des importations

### Exemple de code

```python
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class NavigationDataConverter:
    """Classe principale du convertisseur de données de navigation.
    
    Cette classe est responsable de la conversion des données de navigation Fenix au format iFly.
    
    Attributs :
        config: Configuration du convertisseur
        logger: Enregistreur de logs
    """
    
    def __init__(self, config: ConverterConfig) -> None:
        """Initialise le convertisseur.
        
        Args :
            config: Objet de configuration du convertisseur
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def convert_data(
        self, 
        source_path: Path,
        target_path: Path,
        options: Optional[Dict[str, Any]] = None
    ) -> bool:
        """Convertit les données de navigation.
        
        Args :
            source_path: Chemin du fichier source
            target_path: Chemin du fichier cible  
            options: Options de conversion facultatives
            
        Returns :
            Indique si la conversion a réussi
            
        Raises :
            ConversionError: Erreur survenue pendant la conversion
        """
        try:
            # Implémenter la logique de conversion
            return True
        except Exception as e:
            self.logger.error(f"Échec de la conversion : {e}")
            raise ConversionError(f"Échec de la conversion des données : {e}") from e
```

### Conventions des messages de commit

Utiliser la spécification [Conventional Commits](https://www.conventionalcommits.org/) :

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Types d'identifiants :**
- `feat`: Nouvelle fonctionnalité
- `fix`: Correction de bug
- `docs`: Mise à jour de la documentation
- `style`: Ajustement du formatage du code
- `refactor`: Refactoring du code
- `test`: Cas de test
- `chore`: Modification du processus de construction ou des outils auxiliaires

**Exemple :**
```
feat(converter): add magnetic declination calculation

- Implement WMM-2025 model integration
- Add pygeomag dependency
- Improve calculation accuracy

Closes #123
```

## 🧪 Guide de test

### Structure des tests

```
tests/
├── unit/           # Tests unitaires
├── integration/    # Tests d'intégration
├── fixtures/       # Données de test
└── conftest.py     # Configuration des tests
```

### Rédaction des tests

```python
import pytest
from pathlib import Path
from ifly_converter.converter import NavigationDataConverter


class TestNavigationDataConverter:
    """Classe de test du convertisseur de données de navigation."""
    
    @pytest.fixture
    def converter(self):
        """Crée une instance de convertisseur pour les tests."""
        config = ConverterConfig(
            output_dir="test_output",
            coordinate_precision=8
        )
        return NavigationDataConverter(config)
    
    def test_convert_data_success(self, converter, tmp_path):
        """Teste le cas de succès de la conversion des données."""
        source = tmp_path / "source.db3"
        target = tmp_path / "target"
        
        # Créer les données de test
        source.touch()
        
        # Exécuter la conversion
        result = converter.convert_data(source, target)
        
        # Vérifier le résultat
        assert result is True
        assert target.exists()
    
    def test_convert_data_failure(self, converter):
        """Teste le cas d'échec de la conversion des données."""
        with pytest.raises(ConversionError):
            converter.convert_data(
                Path("nonexistent.db3"),
                Path("target")
            )
```

### Exécution des tests

```bash
# Exécuter tous les tests
pytest

# Exécuter un fichier de test spécifique
pytest tests/unit/test_converter.py

# Exécuter et générer un rapport de couverture
pytest --cov=ifly_converter --cov-report=html

# Exécuter les tests de performance
pytest tests/performance/ -m performance
```

## 📚 Contribution à la documentation

### Structure de la documentation

```
docs/
├── guide/          # Guide de l'utilisateur
├── api/            # Documentation API
├── examples/       # Exemples de code
└── deployment/     # Guide de déploiement
```

### Conventions de la documentation

- Utiliser le format **Markdown**
- Inclure des exemples de code
- Offrir un support multilingue
- Maintenir la documentation à jour

### Exemple de documentation

```markdown
## 🔧 Gestion de la configuration

### Configuration de base

Le convertisseur utilise la classe `ConverterConfig` pour gérer la configuration :

```python
from ifly_converter.config import ConverterConfig

# Créer une configuration par défaut
config = ConverterConfig()

# Configuration personnalisée
config = ConverterConfig(
    output_dir="custom_output",
    coordinate_precision=6,
    enable_validation=True
)
```

### Options de configuration

| Option | Type | Valeur par défaut | Description |
|------|------|--------|------|
| `output_dir` | str | "output" | Répertoire de sortie |
| `coordinate_precision` | int | 8 | Précision des coordonnées |
| `enable_validation` | bool | True | Activer la validation |
```

## 🐛 Signaler un problème

### Modèle de rapport de problème

Lorsque vous signalez un problème, veuillez fournir les informations suivantes :

```markdown
**Description du problème**
Décrivez clairement et succinctement le problème rencontré.

**Étapes pour reproduire**
1. Première étape '...'
2. Deuxième étape '...'
3. Troisième étape '...'
4. Erreur observée

**Comportement attendu**
Décrivez ce que vous attendiez.

**Comportement actuel**
Décrivez ce qui s'est réellement passé.

**Informations sur l'environnement**
- OS: [ex. Windows 10]
- Version de Python: [ex. 3.9.0]
- Version du projet: [ex. v2.0.0]

**Informations de log**
```
Collez les informations de log pertinentes ici
```

**Captures d'écran**
Si applicable, ajoutez des captures d'écran pour aider à expliquer le problème.

**Informations supplémentaires**
Ajoutez toute autre information contextuelle pertinente.
```

### Classification des problèmes

Utilisez les étiquettes suivantes pour classer les problèmes :

- 🐛 `bug` - Rapport d'erreur
- ✨ `enhancement` - Demande de fonctionnalité
- 📚 `documentation` - Lié à la documentation
- ❓ `question` - Question d'utilisation
- 🔥 `priority: high` - Haute priorité
- 🧹 `good first issue` - Bonne première tâche pour les débutants

## 📋 Demande de fonctionnalité

### Modèle de demande de fonctionnalité

```markdown
**Aperçu de la fonctionnalité**
Décrivez brièvement la fonctionnalité que vous souhaitez ajouter.

**Problème résolu**
Quel problème cette fonctionnalité résout-elle ?

**Description détaillée**
Décrivez en détail le fonctionnement de la fonctionnalité.

**Solutions alternatives**
Avez-vous envisagé d'autres solutions ?

**Informations additionnelles**
Ajoutez toute autre information pertinente, capture d'écran ou exemple.
```

## 🎯 Feuille de route de développement

### Objectifs à court terme (1-3 mois)
- [ ] Développement d'une interface graphique (GUI)
- [ ] Fonctionnalité de traitement par lots
- [ ] Amélioration des outils de validation de données
- [ ] Optimisation des performances

### Objectifs à moyen terme (3-6 mois)
- [ ] Support multiformat
- [ ] Traitement en cloud
- [ ] Interface REST API
- [ ] Système de plugins

### Objectifs à long terme (6-12 mois)
- [ ] Optimisation par apprentissage automatique
- [ ] Mise à jour des données en temps réel
- [ ] Support mobile
- [ ] Fonctionnalités de niveau entreprise

## 🏆 Contributeurs

Merci à tous les développeurs qui ont contribué au projet !

<!-- La liste des contributeurs sera mise à jour automatiquement -->

## 📞 Nous contacter

- 📧 **E-mail** : project@example.com
- 💬 **Discussions** : GitHub Discussions
- 🐛 **Problèmes** : GitHub Issues
- 🌐 **Site officiel** : https://ifly-converter.org

---

Encore une fois, merci pour votre contribution ! Ensemble, construisons un meilleur convertisseur de données de navigation iFly ! 🚀
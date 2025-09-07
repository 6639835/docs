# 🤝 Contribution Guide

Thank you for your interest in the iFly Navigation Data Converter project! We welcome and appreciate contributions of all forms.

## 🌟 Ways to Contribute

### 💻 Code Contributions
- 🐛 Fix Bugs
- ✨ Add New Features
- 📈 Optimize Performance
- 🧪 Add Test Cases
- 📚 Improve Documentation

### 📝 Non-Code Contributions
- 🐛 Report Issues
- 💡 Propose Feature Suggestions
- 📖 Enhance Documentation
- 🌐 Translation Support
- 🎓 Create Tutorials

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Clone the repository
git clone https://github.com/your-username/ifly-nav-converter.git
cd ifly-nav-converter

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Development dependencies
```

### 2. Development Environment Configuration

```bash
# Install pre-commit hooks
pre-commit install

# Run tests
pytest

# Code quality checks
flake8 .
mypy .
black . --check
```

## 📋 Development Workflow

### 1. Create a Feature Branch

```bash
# Create a new branch from the main branch
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# Or a fix branch
git checkout -b fix/issue-description
```

### 2. Development and Testing

```bash
# Proceed with development
# ... Write code ...

# Run tests
pytest tests/

# Check code quality
black .
flake8 .
mypy .
```

### 3. Commit Code

```bash
# Add files
git add .

# Commit (follow commit message conventions)
git commit -m "feat: add new feature description"

# Push to remote branch
git push origin feature/your-feature-name
```

### 4. Create a Pull Request

1. Create a Pull Request on GitHub
2. Fill out a detailed PR description
3. Ensure all checks pass
4. Wait for code review

## 📝 Code Standards

### Python Code Style

We use the following tools to ensure code quality:

- **Black**: Code formatting
- **Flake8**: Code style checks
- **MyPy**: Type checking
- **isort**: Import sorting

### Code Example

```python
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class NavigationDataConverter:
    """Main class for the navigation data converter.
    
    This class is responsible for converting Fenix navigation data to iFly format.
    
    Attributes:
        config: Converter configuration
        logger: Logger
    """
    
    def __init__(self, config: ConverterConfig) -> None:
        """Initializes the converter.
        
        Args:
            config: Converter configuration object
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def convert_data(
        self, 
        source_path: Path,
        target_path: Path,
        options: Optional[Dict[str, Any]] = None
    ) -> bool:
        """Converts navigation data.
        
        Args:
            source_path: Path to source data
            target_path: Path to target data  
            options: Optional conversion options
            
        Returns:
            Whether the conversion was successful
            
        Raises:
            ConversionError: An error occurred during conversion
        """
        try:
            # Implement conversion logic
            return True
        except Exception as e:
            self.logger.error(f"Conversion failed: {e}")
            raise ConversionError(f"Data conversion failed: {e}") from e
```

### Commit Message Conventions

Use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Type Identifiers:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code formatting adjustments
- `refactor`: Code refactoring
- `test`: Test cases
- `chore`: Changes to the build process or auxiliary tools

**Example:**
```
feat(converter): add magnetic declination calculation

- Implement WMM-2025 model integration
- Add pygeomag dependency
- Improve calculation accuracy

Closes #123
```

## 🧪 Testing Guide

### Test Structure

```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── fixtures/       # Test data
└── conftest.py     # Test configuration
```

### Writing Tests

```python
import pytest
from pathlib import Path
from ifly_converter.converter import NavigationDataConverter


class TestNavigationDataConverter:
    """Test class for the navigation data converter."""
    
    @pytest.fixture
    def converter(self):
        """Creates a converter instance for testing."""
        config = ConverterConfig(
            output_dir="test_output",
            coordinate_precision=8
        )
        return NavigationDataConverter(config)
    
    def test_convert_data_success(self, converter, tmp_path):
        """Tests the successful data conversion scenario."""
        source = tmp_path / "source.db3"
        target = tmp_path / "target"
        
        # Create test data
        source.touch()
        
        # Execute conversion
        result = converter.convert_data(source, target)
        
        # Verify result
        assert result is True
        assert target.exists()
    
    def test_convert_data_failure(self, converter):
        """Tests the data conversion failure scenario."""
        with pytest.raises(ConversionError):
            converter.convert_data(
                Path("nonexistent.db3"),
                Path("target")
            )
```

### Running Tests

```bash
# Run all tests
pytest

# Run a specific test file
pytest tests/unit/test_converter.py

# Run and generate coverage report
pytest --cov=ifly_converter --cov-report=html

# Run performance tests
pytest tests/performance/ -m performance
```

## 📚 Documentation Contributions

### Documentation Structure

```
docs/
├── guide/          # User Guide
├── api/            # API Documentation
├── examples/       # Example Code
└── deployment/     # Deployment Guide
```

### Documentation Standards

- Use **Markdown** format
- Include code examples
- Provide multilingual support
- Keep documentation updated

### Documentation Example

```markdown
## 🔧 Configuration Management

### Basic Configuration

The converter uses the `ConverterConfig` class to manage configuration:

```python
from ifly_converter.config import ConverterConfig

# Create default configuration
config = ConverterConfig()

# Custom configuration
config = ConverterConfig(
    output_dir="custom_output",
    coordinate_precision=6,
    enable_validation=True
)
```

### Configuration Options

| Option | Type | Default Value | Description |
|------|------|--------|------|
| `output_dir` | str | "output" | Output directory |
| `coordinate_precision` | int | 8 | Coordinate precision |
| `enable_validation` | bool | True | Enable validation |
```

## 🐛 Reporting Issues

### Issue Report Template

When reporting an issue, please provide the following information:

```markdown
**Problem Description**
Clearly and concisely describe the issue encountered.

**Steps to Reproduce**
1. First step '...'
2. Second step '...'
3. Third step '...'
4. Observe error

**Expected Behavior**
Describe what you expected to happen.

**Actual Behavior**
Describe what actually happened.

**Environment Information**
- OS: [e.g., Windows 10]
- Python Version: [e.g., 3.9.0]
- Project Version: [e.g., v2.0.0]

**Log Information**
```
Paste relevant log information
```

**Screenshots**
If applicable, add screenshots to help explain the issue.

**Additional Information**
Add any other relevant contextual information.
```

### Issue Categories

Use the following labels to categorize issues:

- 🐛 `bug` - Bug report
- ✨ `enhancement` - Feature request
- 📚 `documentation` - Documentation related
- ❓ `question` - Usage question
- 🔥 `priority: high` - High priority
- 🧹 `good first issue` - Suitable for newcomers

## 📋 Feature Requests

### Feature Request Template

```markdown
**Feature Overview**
Briefly describe the feature you would like to add.

**Problem Solved**
What problem does this feature solve?

**Detailed Description**
Describe in detail how the feature would work.

**Alternatives Considered**
Have you considered any alternative solutions?

**Additional Information**
Add any other relevant information, screenshots, or examples.
```

## 🎯 Development Roadmap

### Short-Term Goals (1-3 months)
- [ ] GUI interface development
- [ ] Batch processing functionality
- [ ] Data validation tool enhancements
- [ ] Performance optimization

### Mid-Term Goals (3-6 months)
- [ ] Multi-format support
- [ ] Cloud-based processing
- [ ] REST API interface
- [ ] Plugin system

### Long-Term Goals (6-12 months)
- [ ] Machine learning optimization
- [ ] Real-time data updates
- [ ] Mobile support
- [ ] Enterprise-level features

## 🏆 Contributors

Thanks to all developers who have contributed to the project!

<!-- The list of contributors will be updated automatically -->

## 📞 Contact Us

- 📧 **Email**: project@example.com
- 💬 **Discussions**: GitHub Discussions
- 🐛 **Issues**: GitHub Issues
- 🌐 **Official Website**: https://ifly-converter.org

---

Thank you again for your contributions! Let's work together to build a better iFly Navigation Data Converter! 🚀
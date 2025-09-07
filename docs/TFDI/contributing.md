# 🤝 TFDI Navigation Data Converter Contribution Guide

Welcome to the TFDI Navigation Data Converter project! We appreciate the participation of every contributor, whether through code contributions, documentation improvements, bug reports, or feature suggestions.

## 🌟 Ways to Contribute

### 💻 Code Contributions
- 🐛 **Bug Fixes** - Resolve known issues and defects
- ✨ **New Feature Development** - Add new conversion functionalities or improvements
- 📈 **Performance Optimization** - Enhance conversion speed and memory usage efficiency
- 🧪 **Test Enhancement** - Increase test cases and coverage
- 📚 **Documentation Improvement** - Improve API documentation and user guides

### 📝 Non-Code Contributions
- 🐛 **Issue Reporting** - Report bugs and compatibility issues
- 💡 **Feature Suggestions** - Propose new features and improvements
- 📖 **Documentation Writing** - Write tutorials, guides, and examples
- 🌐 **Localization** - Translate UI and documentation
- 🎓 **Community Support** - Help other users solve problems

## 🚀 Development Environment Setup

### Environment Requirements

```bash
# Python version requirement
Python 3.8+ (3.9 or 3.10 recommended)

# Operating system support
Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+)

# Memory requirements
Minimum 4GB RAM (8GB+ recommended)
```

### Quick Start

#### 1. Clone the Project
```bash
# Clone the main repository
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# Or clone your Fork
git clone https://github.com/your-username/tfdi-nav-converter.git
cd tfdi-nav-converter
```

#### 2. Set up Development Environment
```bash
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install development dependencies
pip install -r requirements-dev.txt
pip install -e .  # Editable install
```

#### 3. Verify Installation
```bash
# Run the test suite
pytest

# Run code quality checks
flake8 src/
mypy src/
black --check src/

# Run the converter
python -m tfdi_converter --help
```

### Development Tool Configuration

#### IDE Settings (VS Code Recommended)
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

#### Pre-commit Hooks
```bash
# Install pre-commit
pip install pre-commit

# Install hooks
pre-commit install

# Manually run all hooks
pre-commit run --all-files
```

## 📋 Development Workflow

### 1. Create a Feature Branch

```bash
# Ensure the main branch is up to date
git checkout main
git pull origin main

# Create a new feature branch
git checkout -b feature/add-new-format-support

# Or a fix branch
git checkout -b fix/memory-leak-in-processor
```

### 2. Develop and Test

#### Code Development
```bash
# Write code
# ... Proceed with development ...

# Add tests
# tests/test_new_feature.py

# Update documentation
# docs/api/new_feature.md
```

#### Run Tests
```bash
# Run all tests
pytest

# Run a specific test file
pytest tests/test_converter.py

# Run and generate coverage report
pytest --cov=tfdi_converter --cov-report=html

# Run performance tests
pytest tests/performance/ -m performance
```

#### Code Quality Checks
```bash
# Format code
black src/ tests/

# Sort imports
isort src/ tests/

# Static analysis
flake8 src/ tests/
mypy src/

# Security checks
bandit -r src/
```

### 3. Commit Code

#### Commit Message Guidelines
Use the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Commit Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code style adjustments
- `refactor`: Code refactoring
- `test`: Test related
- `chore`: Build process or auxiliary tool changes
- `perf`: Performance improvement

**Commit Examples:**
```bash
# New feature
git commit -m "feat(converter): add support for MSFS native format"

# Bug fix
git commit -m "fix(parser): handle malformed coordinate data gracefully"

# Documentation update
git commit -m "docs(api): add examples for batch processing"

# Performance improvement
git commit -m "perf(processor): optimize memory usage in large dataset processing"
```

### 4. Push and Create PR

```bash
# Push branch to remote
git push origin feature/add-new-format-support

# Create Pull Request on GitHub
# Fill out PR template
# Wait for code review
```

## 📝 Code Style Guide

### Python Coding Standards

#### 1. Code Style
```python
# Use Black formatter's default settings
# Line length: 88 characters
# Use double quotes
# Two blank lines between functions

from typing import Dict, List, Optional, Union
import logging
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


@dataclass
class ConversionConfig:
    """Conversion configuration class.
    
    Manages various configuration parameters for the TFDI converter.
    
    Attributes:
        output_dir: Output directory path
        coordinate_precision: Coordinate precision
        enable_validation: Whether to enable data validation
    """
    output_dir: str = "Primary"
    coordinate_precision: int = 8
    enable_validation: bool = True


class FenixDataProcessor:
    """Fenix data processor.
    
    Responsible for reading and processing navigation data from the Fenix database.
    """
    
    def __init__(self, config: ConversionConfig) -> None:
        """Initializes the processor.
        
        Args:
            config: Conversion configuration object
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def process_waypoints(
        self, 
        waypoint_data: List[Dict[str, Union[str, float]]]
    ) -> List[Dict[str, Union[str, float]]]:
        """Processes waypoint data.
        
        Args:
            waypoint_data: List of raw waypoint data
            
        Returns:
            List of processed waypoint data
            
        Raises:
            DataProcessingError: An error occurred during data processing
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
            raise DataProcessingError(f"Unable to process waypoint data: {e}") from e
    
    def _normalize_waypoint(
        self, waypoint: Dict[str, Union[str, float]]
    ) -> Dict[str, Union[str, float]]:
        """Normalizes a single waypoint data."""
        # Implement normalization logic
        normalized = waypoint.copy()
        
        # Normalize coordinate precision
        if "latitude" in normalized:
            normalized["latitude"] = round(
                float(normalized["latitude"]), 
                self.config.coordinate_precision
            )
        
        return normalized
```

#### 2. Type Hinting
```python
from typing import (
    Any, Dict, List, Optional, Union, 
    Callable, Iterator, TypeVar, Generic
)

# Type aliases
ConfigDict = Dict[str, Any]
WaypointData = Dict[str, Union[str, float]]
ProcessingResult = List[WaypointData]

# Generic type
T = TypeVar('T')

class DataCache(Generic[T]):
    """Generic data cache class"""
    
    def __init__(self) -> None:
        self._cache: Dict[str, T] = {}
    
    def get(self, key: str) -> Optional[T]:
        """Get cached data"""
        return self._cache.get(key)
    
    def set(self, key: str, value: T) -> None:
        """Set cached data"""
        self._cache[key] = value
```

#### 3. Error Handling
```python
class TFDIConverterError(Exception):
    """Base exception class for the converter"""
    pass


class DataValidationError(TFDIConverterError):
    """Data validation exception"""
    pass


class DatabaseConnectionError(TFDIConverterError):
    """Database connection exception"""
    pass


def safe_database_operation(operation: Callable[[], T]) -> Optional[T]:
    """Wrapper for safe database operations"""
    try:
        return operation()
    except sqlite3.Error as e:
        logger.error(f"Database operation failed: {e}")
        raise DatabaseConnectionError(f"Database operation failed: {e}") from e
    except Exception as e:
        logger.error(f"Unknown error: {e}")
        return None
```

### Testing Guidelines

#### 1. Test Structure
```python
# tests/test_converter.py
import pytest
from unittest.mock import Mock, patch
from pathlib import Path

from tfdi_converter.core.converter import FenixToTFDIConverter
from tfdi_converter.core.config import ConverterConfig
from tfdi_converter.exceptions import DataValidationError


class TestFenixToTFDIConverter:
    """Fenix to TFDI Converter Test Class"""
    
    @pytest.fixture
    def sample_config(self) -> ConverterConfig:
        """Create sample configuration"""
        return ConverterConfig(
            output_dir="test_output",
            coordinate_precision=6,
            enable_validation=True
        )
    
    @pytest.fixture
    def sample_database(self, tmp_path: Path) -> Path:
        """Create sample database"""
        db_path = tmp_path / "test.db3"
        # Logic to create test database
        return db_path
    
    def test_converter_initialization(self, sample_config):
        """Test converter initialization"""
        converter = FenixToTFDIConverter(sample_config)
        
        assert converter.config == sample_config
        assert converter.config.coordinate_precision == 6
    
    def test_database_validation_success(
        self, sample_config, sample_database
    ):
        """Test successful database validation"""
        converter = FenixToTFDIConverter(sample_config)
        
        result = converter.validate_database(sample_database)
        
        assert result is True
    
    def test_database_validation_failure(self, sample_config):
        """Test database validation failure"""
        converter = FenixToTFDIConverter(sample_config)
        invalid_db = Path("nonexistent.db3")
        
        with pytest.raises(DataValidationError):
            converter.validate_database(invalid_db)
    
    @patch('tfdi_converter.core.converter.sqlite3.connect')
    def test_database_connection_error(
        self, mock_connect, sample_config, sample_database
    ):
        """Test database connection error"""
        mock_connect.side_effect = sqlite3.Error("连接失败")
        converter = FenixToTFDIConverter(sample_config)
        
        with pytest.raises(DatabaseConnectionError):
            converter.convert(sample_database, start_terminal_id=1000)
    
    @pytest.mark.performance
    def test_large_database_performance(
        self, sample_config, large_test_database
    ):
        """Test large database performance"""
        import time
        
        converter = FenixToTFDIConverter(sample_config)
        start_time = time.time()
        
        converter.convert(large_test_database, start_terminal_id=1000)
        
        elapsed_time = time.time() - start_time
        assert elapsed_time < 300  # Should complete within 5 minutes
```

#### 2. Test Data Management
```python
# tests/conftest.py
import pytest
import sqlite3
from pathlib import Path


@pytest.fixture(scope="session")
def test_data_dir() -> Path:
    """Test data directory"""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_fenix_database(tmp_path: Path) -> Path:
    """Create sample Fenix database"""
    db_path = tmp_path / "sample_fenix.db3"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create test table structure
    cursor.execute("""
        CREATE TABLE Airports (
            AirportID TEXT PRIMARY KEY,
            AirportName TEXT,
            Latitude REAL,
            Longitude REAL
        )
    """)
    
    # Insert test data
    cursor.execute("""
        INSERT INTO Airports VALUES 
        ('ZBAA', 'Beijing Capital', 40.080111, 116.584556),
        ('ZSPD', 'Shanghai Pudong', 31.143378, 121.805214)
    """)
    
    conn.commit()
    conn.close()
    
    return db_path
```

### Documentation Guidelines

#### 1. API Documentation
```python
def convert_fenix_database(
    database_path: Path,
    output_dir: Path,
    config: Optional[ConverterConfig] = None
) -> ConversionResult:
    """Converts a Fenix database to TFDI format.
    
    This function takes a Fenix A320 navigation database file and converts it
    into a collection of TFDI MD-11 compatible JSON format files.
    
    Args:
        database_path: Path to the Fenix database file (.db3 file)
        output_dir: Output directory path where converted files will be saved
        config: Optional conversion configuration object; default configuration
                is used if not provided
    
    Returns:
        ConversionResult: An object containing conversion results and statistics
        
    Raises:
        FileNotFoundError: If the database file does not exist
        DataValidationError: If the database format is incorrect
        PermissionError: If there is no write permission for the output directory
        
    Example:
        >>> from pathlib import Path
        >>> from tfdi_converter import convert_fenix_database
        >>> 
        >>> result = convert_fenix_database(
        ...     database_path=Path("fenix_nav.db3"),
        ...     output_dir=Path("./output")
        ... )
        >>> print(f"Conversion complete, processed {result.processed_records} records")
        
    Note:
        The conversion process may take several minutes, depending on the database size.
        It is recommended to back up original data before conversion.
        
    See Also:
        - :class:`ConverterConfig`: Conversion configuration options
        - :class:`ConversionResult`: Conversion result details
    """
    pass
```

#### 2. User Documentation
```markdown
# Usage Examples

## Basic Conversion

```python
from tfdi_converter import FenixToTFDIConverter, ConverterConfig

# Create configuration
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8
)

# Initialize converter
converter = FenixToTFDIConverter(config)

# Execute conversion
result = converter.convert(
    database_path="path/to/fenix.db3",
    start_terminal_id=1000
)

print(f"Conversion complete! Output file: {result.output_archive}")
```

## Advanced Configuration

```python
# Custom configuration
config = ConverterConfig(
    output_dir="Custom_Output",
    coordinate_precision=6,
    vnav_threshold=3.0,
    enable_faf_detection=True,
    compression_level=9
)
```

## 🧪 Testing Guide

### Testing Strategy

#### 1. Unit Tests
- **Coverage Target**: 90%+
- **Test Scope**: All public methods and critical private methods
- **Mock Strategy**: Isolate external dependencies (databases, file systems)

#### 2. Integration Tests  
- **Database Integration**: Use real test databases
- **File System Integration**: Test actual file read/write operations
- **End-to-End Tests**: Complete conversion workflow tests

#### 3. Performance Tests
- **Benchmark Testing**: Record processing time for different dataset sizes
- **Memory Testing**: Monitor memory usage and leaks
- **Concurrency Testing**: Test multi-threading and concurrency safety

### Run Tests

```bash
# Quick tests (excluding performance tests)
pytest -m "not performance"

# Full test suite
pytest

# Specific module tests
pytest tests/test_converter.py

# Coverage tests
pytest --cov=tfdi_converter --cov-report=term-missing

# Performance benchmark tests
pytest tests/performance/ --benchmark-only
```

## 📚 Documentation Contributions

### Documentation Types

#### 1. User Documentation
- **Installation Guide**: Detailed installation steps
- **Usage Tutorials**: Basic to advanced usage examples
- **Troubleshooting**: Common issues and solutions
- **API Reference**: Complete API documentation

#### 2. Developer Documentation
- **Architecture Design**: System architecture and design philosophy
- **Contribution Guide**: This document
- **Coding Standards**: Code style and best practices
- **Release Process**: Version release and maintenance workflow

### Documentation Building

```bash
# Install documentation dependencies
pip install -r docs/requirements.txt

# Build documentation
cd docs/
make html

# Live preview
make livehtml
```

## 🐛 Issue Reporting

### Issue Report Template

```markdown
**Problem Description**
Clearly and concisely describe the problem encountered.

**Steps to Reproduce**
1. Perform '...'
2. Enter '...'
3. See error '...'

**Expected Behavior**
Describe what you expected to happen.

**Actual Behavior**
Describe what actually happened.

**Environment Information**
- OS: [e.g., Windows 11, macOS 12.0, Ubuntu 20.04]
- Python: [e.g., 3.9.16]
- Converter Version: [e.g., v1.0.0]
- Fenix Version: [e.g., v1.2.0]
- TFDI Version: [e.g., v1.1.0]

**Database Information**
- Database Size: [e.g., 150MB]
- Number of Records: [e.g., ~50,000]
- AIRAC Cycle: [e.g., 2508]

**Log Information**
```
Paste relevant log information or error stack
```

**Attachments**
- Configuration file
- Error screenshot
- Sample data (if possible)
```

### Issue Labels

Use the following labels to categorize issues:
- 🐛 `bug` - Bug report
- ✨ `enhancement` - Feature request
- 📚 `documentation` - Documentation related
- ❓ `question` - Usage question
- 🔥 `urgent` - Urgent issue
- 🆕 `good first issue` - Suitable for new contributors

## 🏆 Recognition and Rewards

### Contributor Recognition

#### 1. Code Contributors
- **Submitter List**: Contributor list in README and documentation
- **Release Notes**: Special thanks in version release notes
- **GitHub Statistics**: Contribution statistics and achievement badges

#### 2. Documentation Contributors
- **Document Attribution**: Attribution on relevant documentation pages
- **Translation Recognition**: Translator list for multi-language versions
- **Tutorial Authors**: Author recognition for community tutorials

#### 3. Community Contributors
- **Issue Reporting**: Special thanks to important issue discoverers
- **Testing Contributions**: Beta testing and quality assurance contributors
- **Promotion Contributions**: Community promotion and education contributors

### Special Contribution Awards

#### Monthly Contributor
- Outstanding contributors selected monthly
- Promoted on project homepage and social media
- Special GitHub badges and titles

#### Annual Contributor
- Annual best contributor selection
- Custom souvenirs and certificates
- Invitation to the project steering committee

## 📞 Contact Information

### Development Team Contacts

- **Project Maintainers**: @maintainer-username
- **Technical Lead**: @tech-lead-username  
- **Community Management**: @community-manager-username

### Communication Channels

- **GitHub Issues**: Technical issues and feature requests
- **GitHub Discussions**: General discussions and Q&A
- **Mailing List**: dev@tfdi-converter.org
- **Discord**: [邀请链接]

### Response Time Commitment

- **Bug Reports**: Response within 48 hours
- **Feature Requests**: Response within 1 week
- **Pull Requests**: Review within 3 business days
- **Community Questions**: Response within 24 hours

---

**Thank you for considering contributing to the TFDI Navigation Data Converter!** 

We look forward to building better flight simulation tools with you. 🚁✨
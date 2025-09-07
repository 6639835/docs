# 🤝 Contributing Guide

Welcome to contribute to the Nav-data project! This guide will help you understand how to participate in project development, submit code, and propose improvements.

## 🎯 Ways to Contribute

### 📝 You can contribute in the following ways:

-   **🐛 Report Bugs**: Discover issues and provide detailed reproduction steps
-   **💡 Feature Suggestions**: Propose new features or ideas to improve existing ones
-   **📖 Documentation Improvement**: Enhance documentation, correct errors, add examples
-   **🔧 Code Contribution**: Fix bugs, implement new features, optimize performance
-   **🧪 Testing Support**: Add test cases, improve test coverage
-   **🌐 Localization**: Translate documentation, support more languages and regions

## 🚀 Quick Start

### 📋 Development Environment Setup

1.  **Fork the Project Repository**
    ```bash
    # Fork the project on GitHub
    # Then clone it locally
    git clone https://github.com/Nav-data/docs.git
    cd docs
    ```

2.  **Set up Development Environment**
    ```bash
    # Create a virtual environment
    python -m venv venv
    
    # Activate the virtual environment
    # Windows:
    venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    
    # Install dependencies
    pip install -r requirements.txt
    pip install -r requirements-dev.txt  # Development dependencies
    ```

3.  **Install Git Hooks**
    ```bash
    # Install pre-commit hooks
    pre-commit install
    ```

### 🔄 Development Workflow

1.  **Create a Branch**
    ```bash
    git checkout -b feature/your-feature-name
    # Or
    git checkout -b fix/bug-description
    ```

2.  **Develop**
    -   Write code
    -   Add tests
    -   Update documentation
    -   Run tests to ensure they pass

3.  **Commit Code**
    ```bash
    git add .
    git commit -m "feat: add new navigation data processor"
    ```

4.  **Push and Create a PR**
    ```bash
    git push origin feature/your-feature-name
    # Create a Pull Request on GitHub
    ```

## 📋 Code Standards

### 🐍 Python Code Style

We follow [PEP 8](https://pep8.org/) standards and use the following tools:

#### **Code Formatting**
```bash
# Use black for code formatting
black *.py

# Use isort to sort imports
isort *.py
```

#### **Code Linting**
```bash
# Use flake8 for code checking
flake8 *.py

# Use pylint for static analysis
pylint *.py
```

### 📝 Code Standard Requirements

#### **1. Function and Class Naming**
```python
# ✅ Correct Naming
def process_airports(csv_file_path: str, db_path: str) -> None:
    """Processes airport data"""
    pass

class CoordinateCache:
    """Coordinate cache class"""
    pass

# ❌ Incorrect Naming
def processAirports(csvFile, dbPath):
    pass

class coordinateCache:
    pass
```

#### **2. Docstrings**
```python
def get_magnetic_variation(lat: float, lon: float) -> float:
    """
    Calculates magnetic variation for the given coordinates.
    
    Parameters:
        lat (float): Latitude (decimal degrees)
        lon (float): Longitude (decimal degrees)
    
    Returns:
        float: Magnetic variation (degrees), rounded to 1 decimal place.
    
    Example:
        >>> get_magnetic_variation(39.9042, 116.4074)
        -6.2
    """
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)
```

#### **3. Type Annotations**
```python
from typing import Dict, List, Optional, Tuple

def parse_dat_file(file_path: str) -> List[Dict[str, str]]:
    """Parses a DAT file and returns a list of records."""
    records = []
    # Processing logic
    return records

def find_coordinates(
    identifier: str, 
    icao_code: Optional[str] = None
) -> Tuple[float, float]:
    """Finds coordinates, returns a (latitude, longitude) tuple."""
    return lat, lon
```

#### **4. Error Handling**
```python
import logging

logger = logging.getLogger(__name__)

def process_data_file(file_path: str) -> bool:
    """
    Processes a data file.
    
    Returns:
        bool: True if processing was successful, False otherwise.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            # Processing logic
            data = file.read()
            
        logger.info(f"Successfully processed file: {file_path}")
        return True
        
    except FileNotFoundError:
        logger.error(f"File not found: {file_path}")
        return False
    except PermissionError:
        logger.error(f"Insufficient file permissions: {file_path}")
        return False
    except Exception as e:
        logger.error(f"An unknown error occurred while processing the file: {e}")
        return False
```

#### **5. Constant Definitions**
```python
# Define constants at the top of the module
SUPPORTED_ICAO_REGIONS = {
    'ZB', 'ZS', 'ZJ', 'ZG', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH',
    'VM', 'VH', 'RK'
}

DEFAULT_BATCH_SIZE = 1000
COORDINATE_PRECISION = 8
DATABASE_TIMEOUT = 30

# Used in function
def process_waypoints(icao_code: str) -> bool:
    if icao_code not in SUPPORTED_ICAO_REGIONS:
        logger.warning(f"Unsupported ICAO region: {icao_code}")
        return False
    # Processing logic
```

## 🧪 Testing Requirements

### 📊 Test Coverage

-   **Minimum requirement**: New code test coverage ≥ 80%
-   **Goal**: Overall project test coverage ≥ 90%

### 🛠️ Testing Tools

```bash
# Run all tests
pytest

# Run a specific test file
pytest tests/test_airports.py

# Generate coverage report
pytest --cov=. --cov-report=html

# View coverage report
open htmlcov/index.html
```

### ✅ Test Examples

#### **Unit Tests**
```python
import unittest
from unittest.mock import patch, MagicMock
from airports import get_magnetic_variation, convert_dms_to_decimal

class TestAirports(unittest.TestCase):
    
    def test_convert_dms_to_decimal_north(self):
        """Test North latitude DMS conversion"""
        result = convert_dms_to_decimal("N390842.12")
        self.assertAlmostEqual(result, 39.145033, places=6)
    
    def test_convert_dms_to_decimal_south(self):
        """Test South latitude DMS conversion"""
        result = convert_dms_to_decimal("S390842.12")
        self.assertAlmostEqual(result, -39.145033, places=6)
    
    @patch('airports.geo_mag')
    def test_get_magnetic_variation(self, mock_geomag):
        """Test magnetic variation calculation"""
        # Set mock return value
        mock_result = MagicMock()
        mock_result.d = -6.234
        mock_geomag.calculate.return_value = mock_result
        
        result = get_magnetic_variation(39.9042, 116.4074)
        
        self.assertEqual(result, -6.2)
        mock_geomag.calculate.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### **Integration Tests**
```python
import tempfile
import sqlite3
import os
from airports import process_airports

class TestAirportsIntegration(unittest.TestCase):
    
    def setUp(self):
        """Setup before tests"""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix='.db')
        self.temp_db.close()
        self.db_path = self.temp_db.name
    
    def tearDown(self):
        """Cleanup after tests"""
        os.unlink(self.db_path)
    
    def test_process_airports_integration(self):
        """Test airport data processing integration"""
        csv_file = "test_data/sample_airports.csv"
        lookup_file = "test_data/sample_icao.txt"
        
        # Execute processing
        process_airports(csv_file, lookup_file, self.db_path)
        
        # Verify results
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        
        self.assertGreater(count, 0)
        
        # Verify data quality
        cursor.execute("""
            SELECT COUNT(*) FROM tbl_airports 
            WHERE airport_latitude IS NULL OR airport_longitude IS NULL
        """)
        null_coords = cursor.fetchone()[0]
        
        self.assertEqual(null_coords, 0, "No null coordinates should exist")
        
        conn.close()
```

### 📝 Test Data

Test data should be placed in the`tests/test_data/` directory:

```
tests/
├── test_data/
│   ├── sample_airports.csv      # Sample airport data
│   ├── sample_runways.csv       # Sample runway data
│   ├── sample_earth_fix.dat     # Sample earth fix data
│   ├── sample_earth_nav.dat     # Sample earth nav data
│   └── sample_icao.txt          # Sample ICAO lookup table
├── test_airports.py             # Airport module tests
├── test_runways.py              # Runway module tests
├── test_waypoints.py            # Waypoint module tests
└── conftest.py                  # pytest configuration
```

## 🐛 Bug Reports

### 📋 Bug Report Template

Use the following template to report bugs:

```markdown
## Bug Description
Briefly describe the issue

## Reproduction Steps
1. Run command `python XP2INI_NDB_Converter.py`
2. Select configuration '...'
3. Observe error '...'

## Expected Behavior
Describe what you expected to happen

## Actual Behavior
Describe what actually happened

## Environment Information
- Operating System: Windows 11 22H2
- Python Version: 3.11.5
- MSFS Version: 2024
- Aircraft Addon: PMDG 777

## Error Log
```
Paste relevant error messages and logs
```

## Additional Information
Any other information that may help diagnose the issue
```

### 🔍 Bug Classification

| Priority | Label                 | Description                               |
| -------- | --------------------- | ----------------------------------------- |
| 🔴 Critical | `priority:critical`   | Causes program crash or data corruption   |
| 🟠 High   | `priority:high`       | Affects primary functionality, workaround available |
| 🟡 Medium  | `priority:medium`     | Affects minor functionality or user experience |
| 🟢 Low    | `priority:low`        | Minor issue, does not affect core functionality |

## 💡 Feature Suggestions

### 📋 Feature Suggestion Template

```markdown
## Feature Overview
Briefly describe the proposed feature

## Use Case
Describe the circumstances under which this feature is needed

## Detailed Description
Elaborate on how the feature would be implemented and its expected effects

## Alternatives Considered
Have you considered any alternative solutions?

## Additional Information
Any other information that helps understand the suggestion
```

### 🎯 Feature Classification

| Type           | Label                   | Description              |
| -------------- | ----------------------- | ------------------------ |
| ✨ Enhancement | `type:enhancement`      | Improve existing functionality |
| 🚀 Feature     | `type:feature`          | Brand new feature        |
| 📊 Performance | `type:performance`      | Performance optimization |
| 📖 Documentation | `type:documentation`    | Documentation improvement |

## 📖 Documentation Contributions

### 📝 Documentation Standards

1.  **Markdown Format**: Use standard Markdown syntax
2.  **VitePress Compatibility**: Ensure front matter is correct
3.  **Mixed Chinese and English**: Keep technical terms in English, explanations in Chinese
4.  **Code Examples**: Provide complete, runnable code examples

### 🎨 Documentation Style Guide

```markdown
---
title: Page Title
description: Page Description
---

# 🎯 Main Title

Introductory paragraph, explaining the purpose and scope of this document.

## 📋 Secondary Title

### Tertiary Title

Use appropriate emojis and hierarchical structure.

#### Code Example

```python
# Provide a complete code example
def example_function():
    return "Example"
```

#### Important Notes

> ⚠️ **Important Note**: Highlight important information using blockquotes

#### List Format

-   ✅ Enhance readability with emojis
-   📝 Keep list items concise and clear
-   🔗 Add internal links where appropriate
```

## 🔄 Pull Request Workflow

### 📋 PR Checklist

Before submitting your PR, please ensure:

-   [ ] 🧪 **All tests pass**: `pytest`
-   [ ] 📊 **Test coverage meets standards**: New code coverage ≥ 80%
-   [ ] 🎨 **Code is correctly formatted**: `black`, `isort`, `flake8`
-   [ ] 📖 **Documentation is updated**: API changes require documentation updates
-   [ ] 🏷️ **Commit message follows standards**: Adhere to Conventional Commits
-   [ ] 🔗 **Link relevant issues**: Reference in the PR description

### 📝 PR Template

```markdown
## Changes Overview
Briefly describe the purpose and main changes of this PR

## Change Type
- [ ] 🐛 Bug fix
- [ ] ✨ New feature
- [ ] 📖 Documentation update
- [ ] 🎨 Code refactor
- [ ] ⚡ Performance optimization
- [ ] 🧪 Test improvement

## Detailed Explanation
Describe the implementation method and technical details in detail

## Testing
Explain how these changes were tested

## Related Issue
Closes #123

## Checklist
- [ ] Tests pass
- [ ] Code formatted correctly
- [ ] Documentation updated
- [ ] Changelog updated
```

### 🏷️ Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```bash
# Feature addition
feat: add support for AIRAC 2024 data format

# Bug fix
fix: resolve coordinate conversion precision issue

# Documentation update
docs: update installation guide for Windows 11

# Performance optimization
perf: optimize magnetic variation calculation

# Code refactor
refactor: restructure database connection handling

# Test addition
test: add unit tests for waypoint processing

# Build-related
build: update dependencies to latest versions
```

## 🌟 Contributor Recognition

### 🏆 Contributor Tiers

| Tier                  | Requirements                     | Permissions             |
| --------------------- | -------------------------------- | ----------------------- |
| 👋 Contributor        | 1+ valid PR                      | Basic Contributor       |
| 🎖️ Regular Contributor | 5+ valid PRs                     | Prioritized code review |
| 🌟 Core Contributor   | 10+ valid PRs + long-term involvement | Issue triage permissions |
| 👑 Maintainer          | Core Developer                   | Full repository permissions |

### 📜 Contributor Roster

We maintain a list of contributors in the README, thanking everyone for their efforts!

```markdown
## 🙏 Thanks to Contributors

<a href="https://github.com/your-repo/nav-data/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/nav-data" />
</a>
```

## 🤔 Getting Help

### 💬 Communication Channels

-   **📧 Email**: project@nav-data.org
-   **💬 Discussions Forum**: GitHub Discussions
-   **🐛 Issue Reports**: GitHub Issues
-   **📖 Documentation Issues**: Submit PRs directly

### 📚 Learning Resources

-   [Python Official Documentation](https://docs.python.org/)
-   [SQLite Documentation](https://sqlite.org/docs.html)
-   [Principles of Aeronautical Navigation](https://www.faa.gov/air_traffic/publications/)
-   [ARINC 424 Standard](https://www.arinc.com/)

### 🎓 Newbie Guide

If you're participating in an open-source project for the first time:

1.  📖 **Read the code**: First, understand the project structure and core functionalities
2.  🐛 **Start small**: Begin by fixing documentation errors or minor bugs
3.  🤝 **Communicate actively**: Don't be afraid to ask questions and seek help
4.  📈 **Keep learning**: Stay updated with project developments and learn best practices

## 📄 Code of Conduct

### 🤝 Our Commitments

To foster an open and welcoming environment, we pledge:

-   **🌈 Inclusivity**: Welcome participants of diverse backgrounds and perspectives
-   **🤝 Respect**: Respect different opinions and experiences
-   **📚 Learning-oriented**: Help newcomers grow and learn
-   **🎯 Professionalism**: Focus on technical discussions and project improvements

### ❌ Unacceptable Behavior

-   Personal attacks or insulting remarks
-   Harassment or discriminatory behavior
-   Publishing others' private information
-   Other unprofessional or inappropriate conduct

### 📞 Reporting Mechanism

If you encounter any violations of the Code of Conduct, please contact the project maintainers:
-   📧 Email: conduct@nav-data.org
-   📱 Private Message: Contact maintainers via GitHub private message

---

Thank you for considering contributing to the Nav-data project! Every contribution makes the aviation simulation community better. 🛫
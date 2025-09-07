# Contributing Guide

Welcome to the Nav-data open-source project! We are very grateful for your contributions to the aviation navigation data conversion tool.

## 🤝 Ways to Contribute

### Reporting Issues (Issues)
- **Bug Reports**: Discover program errors or abnormal behavior
- **Feature Requests**: Suggest new features or improvements to existing ones
- **Documentation Improvements**: Point out errors or unclear parts in the documentation
- **Performance Issues**: Report performance bottlenecks or suggest optimizations

### Code Contributions (Pull Requests)
- **Fix Bugs**: Fix known issues
- **New Feature Development**: Implement new data processing functionalities
- **Performance Optimization**: Improve code execution efficiency
- **Code Refactoring**: Enhance code structure and maintainability

### Documentation Contributions
- **Technical Documentation**: Improve API documentation and architectural descriptions
- **User Guide**: Enhance usage instructions and tutorials
- **Example Code**: Provide more usage examples
- **Multi-language Translation**: Translate documentation into other languages

## 📋 Before You Start

### 1. Understand the Project
Before you start contributing, please:
- Review the [Architecture Description](./architecture.md)
- Understand the [Usage Guide](./guide/usage.md)
- Browse existing [Issues](https://github.com/your-repo/nav-data/issues)

### 2. Environment Setup
Ensure your development environment meets the requirements:
- Python 3.6+
- Git
- Required dependencies (see [Installation Guide](./guide/installation.md))

### 3. Fork the Project
1. Visit the [Nav-data GitHub page](https://github.com/your-repo/nav-data)
2. Click the "Fork" button in the top right corner
3. Clone your Fork locally:
   ```bash
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

## 🐛 Reporting Issues

### Bug Report Template

When reporting a Bug, please provide the following information:

```markdown
**Bug Description**
Briefly describe the problem encountered.

**Steps to Reproduce**
1. Execute '...' command
2. Use '...' data file
3. Observe '...' error

**Expected Behavior**
Describe what you expected to happen.

**Actual Behavior**
Describe what actually happened.

**Environment Information**
- Operating System: [e.g., macOS 12.0]
- Python Version: [e.g., 3.9.7]
- Nav-data Version: [e.g., v1.2.0]

**Additional Information**
- Error logs
- Relevant screenshots
- Sample data files (if applicable)
```

### Feature Request Template

```markdown
**Feature Description**
Briefly describe the feature you would like to add.

**Use Case**
Describe the specific problem this feature solves or its use case.

**Proposed Solution**
If you have specific implementation ideas, please describe them in detail.

**Alternatives Considered**
Describe other alternative solutions you have considered.

**Additional Information**
Any other relevant information or references.
```

## 💻 Code Contribution Workflow

### 1. Create a Branch
Create a new branch for your contribution:

```bash
# Ensure the main branch is up-to-date
git checkout main
git pull upstream main

# Create a new branch
git checkout -b feature/your-feature-name
# Or for bug fixes
git checkout -b fix/issue-number-description
```

### 2. Develop and Test
During development:

```bash
# Commit changes frequently
git add .
git commit -m "feat: add waypoint validation function"

# Run tests to ensure code quality
python -m pytest tests/
python -m flake8 .
python -m black . --check
```

### 3. Submit a Pull Request
After development is complete:

```bash
# Push the branch to your Fork
git push origin feature/your-feature-name
```

Then create a Pull Request on GitHub.

### Pull Request Template

```markdown
**Type of Change**
- [ ] Bug Fix
- [ ] New Feature
- [ ] Code Refactoring
- [ ] Documentation Update
- [ ] Performance Optimization

**Change Description**
Briefly describe the changes in this PR.

**Related Issue**
- Fixes #(issue number)
- Related to #(issue number)

**Testing**
- [ ] Added new test cases
- [ ] All existing tests passed
- [ ] Manual testing verified

**Checklist**
- [ ] Code follows project coding conventions
- [ ] Added necessary documentation
- [ ] Updated relevant README or configuration
- [ ] Backward compatibility considered
```

## 📝 Code Standards

### Python Coding Standards

#### 1. Code Style
Use [PEP 8](https://pep8.org/) as a foundation, and follow these supplementary guidelines:

```python
# Import order
import os  # Standard library
import sys

import pandas as pd  # Third-party libraries
import numpy as np

from .utils import helper_function  # Local imports

# Class definition
class NavigationDataProcessor:
    """
    Navigation Data Processor
    
    Processes aviation navigation data in various formats, including conversion
    between CSV, PDF, etc.
    
    Attributes:
        input_format (str): Input data format
        output_format (str): Output data format
    """
    
    def __init__(self, input_format: str, output_format: str):
        """
        Initializes the processor
        
        Args:
            input_format: Input data format ('csv', 'pdf', 'dat')
            output_format: Output data format ('dat', 'txt', 'json')
        """
        self.input_format = input_format
        self.output_format = output_format
    
    def process(self, data: Any) -> Any:
        """
        Main method for processing data
        
        Args:
            data: Input data
            
        Returns:
            Processed data
            
        Raises:
            ValueError: Raised when the input data format is not supported
        """
        if not self._validate_input(data):
            raise ValueError(f"Invalid input format: {type(data)}")
        
        return self._convert_data(data)
```

#### 2. Naming Conventions
```python
# Constants: ALL CAPS, underscore-separated
CHINA_AREAS = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW'}
MAX_RETRY_COUNT = 3

# Variables and functions: lowercase, underscore-separated
def process_waypoint_data(input_file: str) -> List[Dict]:
    waypoint_list = []
    error_count = 0
    return waypoint_list

# Class names: PascalCase
class CSVDataProcessor:
    pass

# Private methods: single underscore prefix
def _validate_coordinates(self, lat: float, lon: float) -> bool:
    pass

# Internal use: double underscore prefix
def __internal_helper(self) -> None:
    pass
```

#### 3. Type Annotations
All public functions must include type annotations:

```python
from typing import Dict, List, Optional, Union, Any

def convert_coordinates(
    input_coords: Union[str, Tuple[float, float]], 
    output_format: str = "decimal"
) -> Optional[Dict[str, float]]:
    """
    Convert coordinate format
    
    Args:
        input_coords: Input coordinates, supports string or tuple format
        output_format: Output format, supports 'decimal' or 'dms'
        
    Returns:
        Converted coordinate dictionary, returns None on failure
    """
    pass
```

#### 4. Docstrings
Use Google-style docstrings:

```python
def process_airway_csv(csv_file: str, output_file: str, 
                      excluded_areas: Set[str] = None) -> bool:
    """
    Process Airway CSV Data File
    
    Reads airway data from a CSV file, validates and converts it,
    then outputs it in X-Plane DAT format. Supports area filtering.
    
    Args:
        csv_file: Path to the input CSV file
        output_file: Path to the output DAT file
        excluded_areas: Set of area codes to exclude, defaults to None
        
    Returns:
        Returns True if processing is successful, False otherwise
        
    Raises:
        FileNotFoundError: Raised when the input file does not exist
        ValueError: Raised when the CSV format is incorrect
        
    Example:
        >>> process_airway_csv('routes.csv', 'earth_awy.dat', {'ZB', 'ZG'})
        True
        
    Note:
        The original output file is automatically backed up during processing.
    """
    pass
```

### Code Quality Tools

#### 1. Code Formatting
Use [Black](https://black.readthedocs.io/) for code formatting:

```bash
# Install
pip install black

# Format the entire project
black .

# Check format without modifying
black . --check

# Format a single file
black script.py
```

#### 2. Code Linting
Use [flake8](https://flake8.pycqa.org/) for code linting:

```bash
# Install
pip install flake8

# Lint the entire project
flake8 .

# Configuration file .flake8
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

#### 3. Type Checking
Use [mypy](http://mypy-lang.org/) for type checking:

```bash
# Install
pip install mypy

# Check types
mypy .

# Configuration file mypy.ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
```

### Git Commit Conventions

#### Commit Message Format
Use [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation update
- `style`: Code style (changes that do not affect code execution)
- `refactor`: Refactoring (code changes that are neither new features nor bug fixes)
- `perf`: Performance optimization
- `test`: Add tests
- `chore`: Changes to the build process or auxiliary tools

#### Examples
```bash
# New feature
git commit -m "feat(airway): add AIRAC cycle validation"

# Bug fix
git commit -m "fix(pdf): resolve coordinate parsing error for edge cases"

# Documentation update
git commit -m "docs: update installation guide for macOS"

# Refactoring
git commit -m "refactor(terminal): extract common validation logic"
```

## 🧪 Testing Guide

### Test Structure
```
tests/
├── unit/                   # Unit tests
│   ├── test_airway.py
│   ├── test_pdf_extract.py
│   └── test_terminal.py
├── integration/            # Integration tests
│   ├── test_full_pipeline.py
│   └── test_module_interaction.py
├── fixtures/               # Test data
│   ├── sample_data/
│   └── expected_outputs/
└── conftest.py            # pytest configuration
```

### Writing Tests

#### Unit Test Example
```python
import pytest
from unittest.mock import Mock, patch
from nav_data.airway import NavigationPoint, process_navigation_point

class TestNavigationPoint:
    """Navigation Point Test Class"""
    
    def test_navigation_point_creation(self):
        """Test navigation point creation"""
        point = NavigationPoint("ABCDE", "DESIGNATED_POINT", "ZB")
        
        assert point.identifier == "ABCDE"
        assert point.type.code_type == "DESIGNATED_POINT"
        assert point.area_code == "ZB"
    
    def test_navigation_point_invalid_type(self):
        """Test invalid navigation point type"""
        with pytest.raises(ValueError):
            NavigationPoint("ABCDE", "INVALID_TYPE", "ZB")
    
    @pytest.mark.parametrize("identifier,expected", [
        ("ABCDE", True),
        ("", False),
        (None, False),
    ])
    def test_navigation_point_validation(self, identifier, expected):
        """Parameterized test for navigation point validation"""
        result = validate_navigation_identifier(identifier)
        assert result == expected
```

#### Integration Test Example
```python
import tempfile
from pathlib import Path
from nav_data.pipeline import DataPipeline

class TestDataPipeline:
    """Data Pipeline Integration Test"""
    
    @pytest.fixture
    def temp_directory(self):
        """Temporary directory fixture"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def sample_csv_data(self):
        """Sample CSV data"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123"""
    
    def test_complete_pipeline(self, temp_directory, sample_csv_data):
        """Test complete data processing pipeline"""
        # Prepare test data
        input_file = temp_directory / "input.csv"
        input_file.write_text(sample_csv_data)
        output_file = temp_directory / "output.dat"
        
        # Execute pipeline
        pipeline = DataPipeline()
        result = pipeline.process(str(input_file), str(output_file))
        
        # Validate results
        assert result is True
        assert output_file.exists()
        
        output_content = output_file.read_text()
        assert "ABCDE" in output_content
        assert "FGHIJ" in output_content
```

### Running Tests
```bash
# Run all tests
pytest

# Run specific test file
pytest tests/unit/test_airway.py

# Run specific test method
pytest tests/unit/test_airway.py::TestNavigationPoint::test_navigation_point_creation

# Generate coverage report
pytest --cov=nav_data tests/

# Verbose output
pytest -v

# Stop at the first failure
pytest -x
```

## 📚 Documentation Contributions

### Documentation Structure
```
docs/
├── guide/                  # User Guide
│   ├── index.md           # Guide homepage
│   ├── installation.md    # Installation Guide
│   ├── configuration.md   # Configuration Description
│   └── usage.md           # Usage Guide
├── api/                    # API Documentation
│   ├── airway.md
│   ├── pdf_extract.md
│   └── terminal.md
├── architecture.md         # Architecture Description
├── contributing.md         # Contributing Guide
├── changelog.md           # Changelog
└── license.md             # License
```

### Documentation Writing Guidelines

#### Markdown Format
```markdown
---
title: Document Title
description: Document Description
---

# Level 1 Heading

Briefly introduce the document content.

## Level 2 Heading

### Level 3 Heading

Main content uses clear and concise language.

#### Code Example
Use code blocks to show examples:

```python
def example_function():
    """Example function"""
    return "Hello, Nav-data!"
```

#### Notes
> **Note**: Important tips use quote format.

**Warning**: Warning messages use bold.

#### Links and References
- Internal link: [Installation Guide](./guide/installation.md)
- External link: [Python Official Website](https://python.org)
- Code reference: use `code` format to reference code
```

#### Technical Writing Guide
1. **Clear and concise**: Use simple and direct language
2. **Structured**: Organize content using headings, lists, tables
3. **Rich with examples**: Provide sufficient code examples
4. **User-friendly**: Write documentation from a user's perspective
5. **Timely updates**: Keep documentation in sync with the code

### API Documentation
Write detailed documentation for all public APIs:

```python
def process_csv_data(csv_file: str, output_format: str = "dat") -> Dict[str, Any]:
    """
    Process CSV formatted navigation data
    
    This function reads airway data in CSV format, validates and converts it,
    and outputs it as a navigation data file in the specified format.
    
    Args:
        csv_file (str): Path to the input CSV file
        output_format (str, optional): Output format, supports 'dat', 'json', 'xml'.
                                     Defaults to 'dat'.
    
    Returns:
        Dict[str, Any]: Processing result information, including the following keys:
            - 'success' (bool): Whether processing was successful
            - 'processed_count' (int): Number of successfully processed records
            - 'error_count' (int): Number of error records
            - 'output_file' (str): Path to the output file
    
    Raises:
        FileNotFoundError: Raised when the input file does not exist
        ValueError: Raised when the CSV format is incorrect
        PermissionError: Raised when the output file cannot be written to
    
    Example:
        Basic usage:
        
        >>> result = process_csv_data('airway_data.csv')
        >>> print(result['success'])
        True
        
        Specify output format:
        
        >>> result = process_csv_data('airway_data.csv', 'json')
        >>> print(result['output_file'])
        'airway_data.json'
    
    Note:
        - Input CSV file must contain standard airway data fields
        - Data integrity is automatically validated during processing
        - Supports resume-from-interruption functionality
    
    See Also:
        :func:`validate_csv_format`: CSV format validation
        :func:`convert_coordinate_format`: Coordinate format conversion
    """
    pass
```

## 🔍 Code Review

### Review Checklist

#### Functionality
- [ ] Code implements expected functionality
- [ ] All edge cases are handled
- [ ] Error handling is appropriate
- [ ] Performance meets requirements

#### Code Quality
- [ ] Code structure is clear
- [ ] Naming is descriptive
- [ ] Functions have single responsibility
- [ ] Avoids code duplication

#### Security
- [ ] Input validation is sufficient
- [ ] No security vulnerabilities
- [ ] Sensitive information is handled properly
- [ ] Access control is appropriate

#### Testing
- [ ] Test coverage is sufficient
- [ ] Test cases are comprehensive
- [ ] Integration tests pass
- [ ] Performance tests meet requirements

#### Documentation
- [ ] Code comments are sufficient
- [ ] API documentation is complete
- [ ] User documentation is updated
- [ ] Changelog is updated

### Review Feedback
Provide constructive feedback:

```markdown
**Overall Assessment**
The code implements the expected functionality, has a clear structure, and sufficient test coverage.

**Specific Comments**
1. **Code Structure**: The `process_data` function is too long; consider splitting it into smaller functions.
2. **Performance Optimization**: The loop on line 45 could be optimized using a list comprehension.
3. **Error Handling**: Suggest adding a specific exception type on line 78.

**Suggested Changes**
```python
# Suggest changing this code
for item in data_list:
    if validate_item(item):
        processed_list.append(process_item(item))

# to
processed_list = [
    process_item(item) 
    for item in data_list 
    if validate_item(item)
]
```

**Other**
The documentation needs additional usage examples.
```

## 🚀 Release Process

### Version Numbering Convention
Use [Semantic Versioning](https://semver.org/lang/zh-CN/):

- **Major version number**: Incompatible API changes
- **Minor version number**: Backward-compatible feature additions
- **Patch version number**: Backward-compatible bug fixes

Example: `1.2.3`

### Release Checklist
Before releasing, ensure that:
- [ ] All tests pass
- [ ] Documentation is updated
- [ ] Changelog is updated
- [ ] Version number is updated
- [ ] Dependencies are correct
- [ ] Security review passed

## 🏆 Contributor Rewards

### Recognition Mechanism
- **Code contributors**: List all contributors in the README
- **Documentation contributors**: Annotate contributor information in the documentation
- **Issue reporters**: Express gratitude after the Issue is resolved
- **Long-term contributors**: Invite to become project maintainers

### Becoming a Maintainer
Long-term active contributors may be invited to become project maintainers, gaining:
- Direct push access
- Permission to review Pull Requests
- Right to participate in project decisions
- Special acknowledgement in project description

## 📞 Contact Information

### Getting Help
- **GitHub Issues**: Report problems or request features
- **GitHub Discussions**: General discussions and Q&A
- **Documentation**: View detailed usage guides
- **Code comments**: View detailed comments in the source code

### Community Guidelines
When participating in the project, please follow these principles:
- **Respect others**: Maintain a friendly and professional attitude
- **Constructive discussions**: Provide valuable feedback and suggestions
- **Inclusivity**: Welcome contributors from diverse backgrounds
- **Learning-oriented**: Help others learn and grow

## 🙏 Acknowledgements

Thank you to all developers, testers, documentation contributors, and users who have contributed to the Nav-data project!

### Special Thanks
- Core maintenance team
- Long-term contributors
- Issue reporters
- Documentation translators
- Community supporters

---

**Thank you again for your contributions!** 🎉 Your participation makes Nav-data better and provides higher-quality navigation data tools for the aviation simulation community.
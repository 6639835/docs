# 🤝 Contribution Guide

Welcome to the development of the Nav-data project! This guide will help you understand how to contribute to the project, including code standards, development workflow, and best practices.

## 🎯 Ways to Contribute

### We welcome the following types of contributions:

- **🐛 Bug Reports and Fixes** - Discover and fix issues in the project
- **✨ New Feature Development** - Add new data processing features or optimizations
- **📚 Documentation Improvements** - Enhance documentation, add examples, correct errors
- **🔧 Performance Optimization** - Improve data processing efficiency and memory usage
- **🧪 Test Cases** - Increase test coverage and improve code quality
- **🌍 Internationalization Support** - Add multi-language support or data for other regions
- **🎨 User Experience Improvements** - Optimize tool usability and output format

## 🚀 Quick Start

### 1. Environment Setup

```bash
# Fork the project to your GitHub account
# Clone your fork
git clone https://github.com/[您的用户名]/Nav-data.git
cd Nav-data

# Add upstream repository
git remote add upstream https://github.com/原作者/Nav-data.git

# Create virtual environment
python -m venv nav-data-dev
source nav-data-dev/bin/activate  # Linux/macOS
# Or nav-data-dev\Scripts\activate  # Windows

# Install development dependencies
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Development dependencies (if they exist)
```

### 2. Development Environment Verification

```bash
# Run basic tests
python -m pytest tests/ -v

# Check code style
flake8 *.py

# Run type checks (if used)
mypy *.py
```

## 📋 Development Standards

### Code Style

We follow Python community standards and best practices:

#### 1. PEP 8 Code Style

```python
# ✅ Good example
class AirportDataProcessor:
    """Airport Data Processor
    
    Processes NAIP-formatted airport data and converts it to PMDG-compatible format.
    """
    
    def __init__(self, csv_file_path: str, output_db_path: str):
        self.csv_file_path = csv_file_path
        self.output_db_path = output_db_path
        self.processed_count = 0
    
    def process_airport_data(self) -> ProcessingResult:
        """Main method for processing airport data
        
        Returns:
            ProcessingResult: Result object containing processing statistics
            
        Raises:
            FileNotFoundError: When the input file does not exist
            DatabaseError: When a database operation fails
        """
        try:
            data = self._load_csv_data()
            processed_data = self._transform_data(data)
            self._save_to_database(processed_data)
            
            return ProcessingResult(
                success=True,
                processed_count=self.processed_count,
                message="Airport data processing completed"
            )
        except Exception as e:
            logging.error(f"Error processing airport data: {e}")
            raise

# ❌ Avoid this style
def processAirports(file,db):  # Non-standard function name, unclear parameter types
    d=pd.read_csv(file)       # Unclear variable name
    for i in d.iterrows():    # No error handling
        # Processing logic...
        pass
```

#### 2. Type Annotations

```python
from typing import List, Dict, Optional, Union, Tuple
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """Processing Result Data Class"""
    success: bool
    processed_count: int
    failed_count: int = 0
    errors: List[str] = None
    message: Optional[str] = None

def convert_coordinates(
    dms_latitude: str, 
    dms_longitude: str
) -> Tuple[Optional[float], Optional[float]]:
    """Converts DMS-formatted coordinates to decimal degrees
    
    Args:
        dms_latitude: DMS format latitude string (e.g., N390308.00)
        dms_longitude: DMS format longitude string (e.g., E1162930.00)
    
    Returns:
        (Latitude, Longitude) tuple, returns (None, None) if conversion fails
    """
    try:
        lat = parse_dms_coordinate(dms_latitude, coord_type='latitude')
        lon = parse_dms_coordinate(dms_longitude, coord_type='longitude')
        return lat, lon
    except ValueError as e:
        logging.warning(f"Coordinate conversion failed: {e}")
        return None, None
```

#### 3. Error Handling and Logging

```python
import logging
from enum import Enum

class ProcessingError(Exception):
    """Base class for data processing related errors"""
    pass

class ValidationError(ProcessingError):
    """Data validation error"""
    pass

class CoordinateError(ValidationError):
    """Coordinate related error"""
    pass

def process_with_error_handling(data: Dict) -> bool:
    """Example of data processing with comprehensive error handling"""
    try:
        # Data validation
        if not validate_required_fields(data):
            raise ValidationError("Missing required fields")
        
        # Coordinate processing
        lat, lon = convert_coordinates(
            data.get('latitude'),
            data.get('longitude')
        )
        
        if lat is None or lon is None:
            raise CoordinateError("Coordinate conversion failed")
        
        # Data saving
        save_to_database(data)
        logging.info(f"Successfully processed record: {data.get('identifier')}")
        return True
        
    except ValidationError as e:
        logging.warning(f"Data validation failed: {e}")
        return False
    except CoordinateError as e:
        logging.error(f"Coordinate processing error: {e}")
        return False
    except Exception as e:
        logging.critical(f"Unexpected error: {e}")
        raise
```

### Documentation Standards

#### 1. Function and Class Documentation

```python
def parse_dat_file(
    file_path: str, 
    batch_size: int = 1000,
    encoding: str = 'utf-8'
) -> List[Dict[str, Any]]:
    """Parses X-Plane formatted DAT files
    
    This function reads X-Plane navigation data files, parses waypoint information,
    and returns a list of structured data. Supports batch processing for large files.
    
    Args:
        file_path: Full path to the DAT file
        batch_size: Batch size for memory optimization, default 1000
        encoding: File encoding, default utf-8
    
    Returns:
        A list of dictionaries containing waypoint information, each dictionary includes the following keys:
        - waypoint_identifier: Waypoint identifier
        - latitude: Latitude (decimal degrees)
        - longitude: Longitude (decimal degrees)
        - waypoint_type: Waypoint type
        - icao_code: ICAO region code
    
    Raises:
        FileNotFoundError: When the specified file does not exist
        ValueError: When the file format is incorrect
        MemoryError: When available memory is insufficient
    
    Examples:
        Basic usage:
        >>> waypoints = parse_dat_file('data/earth_fix.dat')
        >>> print(f"Parsed {len(waypoints)} waypoints")
        
        Large file processing:
        >>> waypoints = parse_dat_file(
        ...     'large_file.dat', 
        ...     batch_size=5000
        ... )
    
    Note:
        This function automatically skips comment lines at the beginning of the file,
        processing only valid data lines. For corrupted data lines, a warning log
        will be recorded, but processing will not be interrupted.
    """
    # Implementation...
```

#### 2. Module-Level Documentation

```python
"""
PMDG Airport Data Processing Module

This module is responsible for processing NAIP-formatted airport data,
converting it into PMDG-compatible SQLite database format. Key functions include:

- CSV file reading and parsing
- DMS coordinate format conversion
- Airport name lookup and matching
- Data validation and cleaning
- SQLite database writing

Supported input file formats:
- AD_HP.csv: Basic airport data (NAIP format)
- Airport.dat: Airport name lookup table

Output format:
- SQLite database, containing the tbl_airports table

Author: Nav-data Team
Version: 2.0.0
License: MIT

Examples:
    Command line usage:
    $ python PMDG_APT.py
    
    Programming interface:
    >>> from PMDG_APT import AirportProcessor
    >>> processor = AirportProcessor(
    ...     csv_path='data/AD_HP.csv',
    ...     output_path='output/airports.s3db'
    ... )
    >>> result = processor.process()
    >>> print(f"Processing complete: {result.processed_count} airports")
"""

import pandas as pd
import sqlite3
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path

# Module-level constants
DEFAULT_AREA_CODE = 'EEU'
DEFAULT_ENCODING = 'latin1'
SUPPORTED_ICAO_REGIONS = {'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW'}

# ... Remaining code
```

### Testing Standards

#### 1. Unit Tests

```python
import unittest
from unittest.mock import patch, mock_open
import pandas as pd
from PMDG_APT import AirportProcessor, convert_dms_to_decimal

class TestCoordinateConversion(unittest.TestCase):
    """Coordinate conversion functionality test"""
    
    def test_valid_north_latitude(self):
        """Test valid north latitude coordinate conversion"""
        result, error = convert_dms_to_decimal("N390308.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 39.0522222, places=6)
    
    def test_valid_east_longitude(self):
        """Test valid east longitude coordinate conversion"""
        result, error = convert_dms_to_decimal("E1162930.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 116.4916667, places=6)
    
    def test_invalid_format(self):
        """Test invalid coordinate format"""
        result, error = convert_dms_to_decimal("INVALID")
        self.assertIsNone(result)
        self.assertIsNotNone(error)
        self.assertIn("Invalid DMS format", error)
    
    def test_boundary_coordinates(self):
        """Test boundary coordinates"""
        # Test North Pole
        result, error = convert_dms_to_decimal("N900000.00")
        self.assertIsNone(error)
        self.assertEqual(result, 90.0)

class TestAirportProcessor(unittest.TestCase):
    """Airport Data Processor Test"""
    
    def setUp(self):
        """Test initialization"""
        self.processor = AirportProcessor(
            csv_file_path="test_data/AD_HP.csv",
            lookup_file_path="test_data/Airport.dat",
            output_db_path="test_output/test.s3db"
        )
    
    @patch('pandas.read_csv')
    def test_csv_loading(self, mock_read_csv):
        """Test CSV file loading"""
        # Simulate CSV data
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
        """Test database creation"""
        mock_connection = mock_connect.return_value
        mock_cursor = mock_connection.cursor.return_value
        
        self.processor._create_database_tables()
        
        # Verify table creation SQL is executed
        mock_cursor.execute.assert_called()
        create_table_calls = [call[0][0] for call in mock_cursor.execute.call_args_list]
        self.assertTrue(any('CREATE TABLE' in call for call in create_table_calls))
```

#### 2. Integration Tests

```python
import tempfile
import os
import sqlite3
from pathlib import Path

class TestIntegration(unittest.TestCase):
    """Integration Test"""
    
    def setUp(self):
        """Create temporary test environment"""
        self.test_dir = tempfile.mkdtemp()
        self.csv_file = Path(self.test_dir) / "test_airports.csv"
        self.lookup_file = Path(self.test_dir) / "airports.dat"
        self.output_db = Path(self.test_dir) / "output.s3db"
        
        # Create test data files
        self.create_test_csv()
        self.create_test_lookup()
    
    def tearDown(self):
        """Clean up test environment"""
        import shutil
        shutil.rmtree(self.test_dir)
    
    def create_test_csv(self):
        """Create test CSV file"""
        test_data = """CODE_ID,GEO_LAT_ACCURACY,GEO_LONG_ACCURACY
ZBAA,N390308.00,E1162930.00
ZSPD,N311133.00,E1211056.00"""
        
        with open(self.csv_file, 'w', encoding='latin1') as f:
            f.write(test_data)
    
    def create_test_lookup(self):
        """Create test lookup file"""
        lookup_data = """ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL"""
        
        with open(self.lookup_file, 'w') as f:
            f.write(lookup_data)
    
    def test_end_to_end_processing(self):
        """End-to-end processing test"""
        processor = AirportProcessor(
            csv_file_path=str(self.csv_file),
            lookup_file_path=str(self.lookup_file),
            output_db_path=str(self.output_db)
        )
        
        result = processor.process()
        
        # Verify processing results
        self.assertTrue(result.success)
        self.assertEqual(result.processed_count, 2)
        
        # Verify database content
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

## 🔄 Development Workflow

### Git Workflow

We use the **Git Flow** workflow:

```bash
# 1. Create a feature branch from the latest main branch
git checkout main
git pull upstream main
git checkout -b feature/航路处理优化

# 2. Perform development work
# Write code, add tests, update documentation

# 3. Commit changes
git add .
git commit -m "feat: Optimize waypoint data processing performance

- Implement batch processing to reduce memory usage
- Add progress bar to show processing status
- Optimize database write operations

Closes #123"

# 4. Push to your fork
git push origin feature/航路处理优化

# 5. Create a Pull Request
```

### Commit Message Specification

We use the **Conventional Commits** specification:

```bash
# Format: <type>(<scope>): <description>
#
# <optional body>
#
# <optional footer>

# Example:
git commit -m "feat(airport): Add automatic airport name lookup feature

Implemented automatic airport name lookup based on ICAO code,
supports retrieving airport name information from multiple data sources.

- Added AirportNameResolver class
- Supports caching to improve lookup performance
- Added corresponding unit tests

Closes #45"

# Type descriptions:
# feat: New feature
# fix: Bug fix
# docs: Documentation update
# style: Code format adjustment (does not affect functionality)
# refactor: Code refactoring
# perf: Performance optimization
# test: Add or modify tests
# chore: Build process or auxiliary tool changes
```

### Pull Request Workflow

#### 1. PR Checklist

Before submitting a PR, please ensure:

- [ ] Code adheres to project's coding standards
- [ ] Necessary test cases have been added
- [ ] All tests pass
- [ ] Relevant documentation has been updated
- [ ] Commit messages conform to the specification
- [ ] No new dependencies have been introduced (if any, explain in the PR)

#### 2. PR Template

```markdown
## 📝 Change Description
Briefly describe what changes this PR makes.

## 🔧 Change Type
- [ ] Bug fix
- [ ] New feature
- [ ] Performance optimization
- [ ] Code refactoring
- [ ] Documentation update
- [ ] Test improvement

## 🧪 Testing
Describe how these changes were tested:
- [ ] Added new unit tests
- [ ] Added integration tests
- [ ] Manual testing steps:
  1. Step 1
  2. Step 2

## 📸 Screenshots (if applicable)
If there are UI changes or output format changes, please add screenshots.

## 🔗 Related Issue
Fixes #123
Related to #456

## 📋 Checklist
- [ ] My code adheres to the project's coding standards
- [ ] I have self-reviewed my code
- [ ] I have added corresponding tests
- [ ] All new and existing tests pass
- [ ] I have updated relevant documentation

## 💬 Additional Notes
Add any other details that need clarification.
```

## 🐛 Issue Reporting

### Bug Report Template

When you find a problem, please use the following template to create an Issue:

```markdown
**🐛 Bug Description**
Briefly and clearly describe the problem that occurred.

**🔄 Reproduction Steps**
1. Go to '...'
2. Click '...'
3. Scroll to '...'
4. Observe error

**✅ Expected Behavior**
Describe what you expected to happen.

**💻 Environment Information**
- Operating System: [e.g., Windows 10, macOS 11.6, Ubuntu 20.04]
- Python Version: [e.g., 3.9.7]
- Nav-data Version: [e.g., 2.1.0]
- Other Relevant Software Versions:

**📄 Error Log**
If applicable, please add error logs or screenshots.

```
[Paste log content here]
```

**📁 Input Data**
If the issue is related to specific input data, please provide sample data (remove sensitive information).

**🔍 Additional Information**
Add any other information that helps diagnose the problem.
```

### Feature Request Template

```markdown
**🚀 Feature Description**
Briefly and clearly describe the feature you would like to add.

**💡 Use Case**
Describe what problem this feature solves or what process it improves.

**📋 Detailed Requirements**
- [ ] Requirement 1: Description
- [ ] Requirement 2: Description
- [ ] Requirement 3: Description

**🎨 Possible Implementation Approach**
If you have an implementation idea, please briefly describe it.

**📚 References**
Provide links to relevant documentation, standards, or reference materials.

**📊 Priority**
- [ ] Low - Do when time permits
- [ ] Medium - Important but not urgent
- [ ] High - Needs to be implemented as soon as possible
- [ ] Urgent - Blocks other work

**💬 Additional Notes**
Other details that need clarification.
```

## 📚 Development Environment Configuration

### IDE Configuration Suggestions

#### Visual Studio Code

Recommended Extensions:
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

Workspace Settings (`.vscode/settings.json`):
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

1. Configure Code Style:
   - File → Settings → Editor → Code Style → Python
   - Select "Black" preset

2. Configure Test Runner:
   - File → Settings → Tools → Python Integrated Tools
   - Default test runner: pytest

### Development Tool Configuration

#### pre-commit Hooks

Create `.pre-commit-config.yaml`:
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

Install and enable:
```bash
pip install pre-commit
pre-commit install
```

## 🏆 Best Practices

### Performance Optimization

1. **Memory Management**
   ```python
   # ✅ Good practice: Use generators to process large files
   def process_large_file(file_path):
       with open(file_path, 'r') as f:
           for line in f:
               yield process_line(line)
   
   # ❌ Avoid: Loading the entire file into memory at once
   def process_large_file_bad(file_path):
       with open(file_path, 'r') as f:
           lines = f.readlines()  # May consume a lot of memory
       return [process_line(line) for line in lines]
   ```

2. **Database Operation Optimization**
   ```python
   # ✅ Good practice: Batch insertion
   def insert_records_batch(connection, records, batch_size=1000):
       cursor = connection.cursor()
       for i in range(0, len(records), batch_size):
           batch = records[i:i + batch_size]
           cursor.executemany(
               "INSERT INTO table (col1, col2) VALUES (?, ?)", 
               batch
           )
           connection.commit()
   
   # ❌ Avoid: Inserting records one by one
   def insert_records_one_by_one(connection, records):
       cursor = connection.cursor()
       for record in records:
           cursor.execute("INSERT INTO table (col1, col2) VALUES (?, ?)", record)
           connection.commit()  # Committing every time affects performance
   ```

### Error Handling

```python
# ✅ Good error handling
def process_coordinate(dms_string: str) -> float:
    """Processes coordinate string, returns decimal degrees"""
    try:
        return convert_dms_to_decimal(dms_string)
    except ValueError as e:
        logging.warning(f"Coordinate format error: {dms_string}, Error: {e}")
        raise CoordinateError(f"Unable to parse coordinate: {dms_string}") from e
    except Exception as e:
        logging.error(f"Unknown error occurred during coordinate processing: {e}")
        raise

# ❌ Avoided error handling
def process_coordinate_bad(dms_string):
    try:
        return convert_dms_to_decimal(dms_string)
    except:  # Catches all exceptions, difficult to debug
        return None  # Loses error information
```

### Test Writing

```python
# ✅ Good test
class TestCoordinateProcessing(unittest.TestCase):
    def test_valid_north_latitude_conversion(self):
        """Test valid north latitude coordinate conversion"""
        # Given
        dms_input = "N390308.00"
        expected_decimal = 39.0522222
        
        # When
        result = convert_dms_to_decimal(dms_input)
        
        # Then
        self.assertAlmostEqual(result, expected_decimal, places=6)
    
    def test_invalid_format_raises_error(self):
        """Test invalid format raises appropriate error"""
        # Given
        invalid_input = "INVALID_FORMAT"
        
        # When/Then
        with self.assertRaises(CoordinateError) as context:
            convert_dms_to_decimal(invalid_input)
        
        self.assertIn("Unable to parse coordinate", str(context.exception))

# ❌ Avoided test
def test_coordinate():  # Unclear test name
    result = convert_dms_to_decimal("N390308.00")
    assert result == 39.0522222  # Floating point exact comparison may fail
```

## 📞 Getting Help

If you encounter problems during the contribution process:

1. **Consult Documentation** - First, check the project documentation and this contribution guide
2. **Search Existing Issues** - Check if someone has encountered a similar problem
3. **Participate in Discussions** - Ask questions in GitHub Discussions
4. **Contact Maintainers** - Contact project maintainers via GitHub Issues

### Community Guidelines

We are committed to creating an open and friendly community environment:

- **Respect Others** - Be polite and respectful to all participants
- **Constructive Feedback** - Provide helpful, constructive opinions and suggestions
- **Patient Learning** - Help newcomers learn, share knowledge and experience
- **Collaborative Spirit** - Work together to improve the project

## 🎉 Contributor Recognition

We recognize contributors in the following places:
- The contributors section of README.md
- Version update records in CHANGELOG.md
- Thank you list in GitHub Releases

Thank you for considering contributing to the Nav-data project! Every contribution makes this project better.

---

**Remember**: Good code is written for people to read, machines just happen to execute it.
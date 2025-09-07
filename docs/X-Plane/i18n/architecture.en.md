# Architecture Description

This document details the Nav-data project's system architecture, technical principles, and design philosophy.

## 🏗️ Overall Architecture

Nav-data adopts a modular design, consisting of four core modules, each operating independently and capable of flexible combination.

```mermaid
graph TB
    subgraph "Data Source Layer"
        A1[NAIP CSV Data]
        A2[PDF Procedure Files]
        A3[X-Plane Native Data]
    end
    
    subgraph "Processing Layer"
        B1[Airway Processing Module<br/>Airway]
        B2[PDF Extraction Module<br/>PDF Extract]
        B3[Terminal Patch Module<br/>Terminal Patch]
        B4[CIFP Generation Module<br/>X-Plane CIFP]
    end
    
    subgraph "Output Layer"
        C1[earth_awy.dat]
        C2[Procedure Database File]
        C3[Patched Terminal Data]
        C4[X-Plane CIFP File]
    end
    
    subgraph "Tools Layer"
        D1[Data Validation]
        D2[Format Conversion]
        D3[Coordinate Processing]
        D4[Logging System]
    end
    
    A1 --> B1
    A2 --> B2
    A3 --> B4
    B2 --> B3
    
    B1 --> C1
    B2 --> C2
    B3 --> C3
    B4 --> C4
    
    B1 -.-> D1
    B2 -.-> D2
    B3 -.-> D3
    B4 -.-> D4
```

## 📋 Design Principles

### 1. Modular Design
- **Independence**: Each module can operate independently, with no strong dependencies on other modules.
- **Composability**: Modules can be flexibly combined to form different processing workflows.
- **Extensibility**: New modules can be seamlessly integrated into the existing architecture.

### 2. Data Flow Driven
- **Unidirectional Data Flow**: Data flows from source to destination, avoiding circular dependencies.
- **Intermediate State Preservation**: Intermediate results are saved at each processing step for easy debugging and recovery.
- **Format Standardization**: Unified data format specifications ensure compatibility between modules.

### 3. Fault Tolerance and Recovery
- **Step-by-Step Processing**: Complex tasks are broken down into smaller steps to reduce the risk of failure.
- **Error Isolation**: Failure to process a single file does not affect the entire batch processing task.
- **State Preservation**: Critical state information is persisted, supporting resume from breakpoint.

### 4. Performance Optimization
- **Memory-Friendly**: Stream processing of large files to avoid out-of-memory errors.
- **Batch Operations**: Batch processing improves I/O efficiency.
- **Concurrency Support**: Supports multi-threaded/multi-process concurrent processing.

## 🛠️ Core Module Architecture

### Airway Processing Module (Airway)

```mermaid
graph TD
    A[CSV Input] --> B{Data Validation}
    B -->|Validation Passed| C[Parse CSV Fields]
    B -->|Validation Failed| X[Error Handling]
    
    C --> D[Load Reference Data]
    D --> E[earth_fix.dat]
    D --> F[earth_nav.dat]
    
    E --> G[Waypoint Matching]
    F --> G
    C --> G
    
    G --> H{Area Filtering}
    H -->|Chinese Airspace| I[Generate Airway Segments]
    H -->|Other Regions| J[Skip Processing]
    
    I --> K[Format Conversion]
    K --> L[X-Plane DAT Format]
    L --> M[Output Merging]
    M --> N[earth_awy.dat]
```

**Technical Features:**
- **Data Matching Algorithm**: Intelligent matching based on identifiers and coordinates
- **Area Filtering Mechanism**: Supports flexible geographical area filtering configuration
- **Format Conversion Engine**: Precise conversion from CSV to X-Plane DAT format
- **AIRAC Cycle Management**: Automatically calculates and manages aviation data validity cycles

**Core Classes and Interfaces:**
```python
class NavigationType(Enum):
    """Navigation Point Type Enum"""
    DESIGNATED_POINT = ('DESIGNATED_POINT', '11')
    VORDME = ('VORDME', '3') 
    NDB = ('NDB', '2')

@dataclass
class NavigationPoint:
    """Navigation Point Data Structure"""
    identifier: str
    type: NavigationType
    area_code: str

def process_navigation_point(identifier: str, code_type: str, 
                           earth_fix_data: Dict, earth_nav_data: Dict) -> Optional[NavigationPoint]:
    """Core algorithm for navigation point processing"""
    pass

def convert_csv_to_dat(csv_file: str, earth_fix_path: str, 
                      earth_nav_path: str, earth_awy_path: str) -> None:
    """Main conversion function"""
    pass
```

### PDF Extraction Module (PDF Extract)

```mermaid
graph TD
    A[PDF Input] --> B[PDF Parsing Engine]
    B --> C{Content Type}
    
    C -->|Procedure Data| D[Terminal Procedure Extraction]
    C -->|Coordinate Data| E[Waypoint Extraction]
    
    D --> F[Text Structure Analysis]
    F --> G[Procedure Segment Recognition]
    G --> H[Format Standardization]
    H --> I[Procedure Data Output]
    
    E --> J[Coordinate Format Recognition]
    J --> K[Degrees-Minutes-Seconds Conversion]
    K --> L[Precision Handling]
    L --> M[Coordinate Data Output]
    
    I --> N[Data Validation]
    M --> N
    N --> O[Quality Report]
```

**Technical Features:**
- **Multi-Level Parsing**: Supports various PDF elements like text, lines, and tables
- **Intelligent Recognition**: Automatically identifies coordinate formats and procedure structures
- **Fault Tolerance Mechanism**: Handles PDF format inconsistencies and missing data issues
- **Quality Control**: Built-in data quality check and reporting mechanism

**Core Components:**
```python
class Line:
    """Line Element Class"""
    def __init__(self, line: dict):
        self.is_horizontal = True if line["width"] > 5 else False
        self.top = line["top"]
        self.left = line["x0"]
        self.length = line["width"] if self.is_horizontal else line["height"]

class Word:
    """Text Element Class"""
    def __init__(self, info: dict):
        self.content = info["text"]
        self.center = ((info["x0"] + info["x1"]) / 2, (info["top"] + info["bottom"]) / 2)

class Unit:
    """Processing Unit Class"""
    def __init__(self):
        self.words = []
        self.lines = []
    
    def match_underline(self):
        """Underline Matching Algorithm"""
        pass

def extract(pdf: pdfplumber.PDF) -> List[str]:
    """Main PDF Extraction Function"""
    pass
```

### Terminal Patch Module (Terminal Patch)

```mermaid
graph TD
    A[Tdatabase Input] --> B[Format Check]
    B --> C{Encoding Type}
    
    C -->|Needs Encoding| D[Terminal Encoder]
    C -->|Needs Patching| E[Format Patcher]
    
    D --> F[IF Point Recognition]
    F --> G[Transition Segment Marking]
    G --> H[Procedure Encoding]
    H --> I[Encoded Output]
    
    E --> J[Rule Matching]
    J --> K{Patching Rules}
    K -->|APPCH GY M| L[Approach Patching]
    K -->|Pure Letter Rule| M[Identifier Patching]
    K -->|SID RW Rule| N[Departure Patching]
    
    L --> O[Patched Output]
    M --> O
    N --> O
    
    I --> P[Quality Validation]
    O --> P
    P --> Q[Final Output]
```

**Technical Features:**
- **Rule Engine**: Configuration-based patching rule engine
- **Pattern Recognition**: Intelligent recognition of different procedure types and identifiers
- **Batch Processing**: Supports folder-level batch patching
- **Backward Compatibility**: Maintains compatibility with existing data formats

**Patching Rule System:**
```python
class FixRule:
    """Base class for patching rules"""
    def __init__(self, name: str, pattern: str, action: callable):
        self.name = name
        self.pattern = pattern
        self.action = action
    
    def apply(self, line: str) -> str:
        """Apply patching rule"""
        pass

class RuleEngine:
    """Rule Engine"""
    def __init__(self):
        self.rules = []
    
    def add_rule(self, rule: FixRule):
        """Add patching rule"""
        self.rules.append(rule)
    
    def apply_rules(self, content: str) -> str:
        """Apply all rules"""
        pass

# Predefined patching rules
APPCH_GY_M_RULE = FixRule(
    name="APPCH_GY_M",
    pattern=r"APPCH.*GY M",
    action=lambda line: fix_appch_gy_m(line)
)
```

### X-Plane CIFP Module (X-Plane CIFP)

```mermaid
graph TD
    A[Multi-Source Input] --> B{Data Type}
    B -->|Navigation Aids| C[NavAid Processor]
    B -->|Waypoints| D[Waypoint Processor]
    B -->|Terminal Procedures| E[Terminal Processor]
    
    C --> F[VOR/NDB Conversion]
    F --> G[Frequency Processing]
    G --> H[Coordinate Conversion]
    H --> I[NavAid Output]
    
    D --> J[Waypoint Database]
    J --> K[Deduplication]
    K --> L[Area Encoding]
    L --> M[Waypoint Output]
    
    E --> N[Procedure Parsing]
    N --> O[SID/STAR/APPCH]
    O --> P[Segment Encoding]
    P --> Q[Runway Information Generation]
    Q --> R[CIFP Output]
    
    I --> S[Data Integration]
    M --> S
    R --> S
    S --> T[X-Plane Compatibility Check]
    T --> U[Final CIFP File]
```

**Technical Features:**
- **Multi-Source Data Integration**: Integrates multiple data sources such as NAIP, X-Plane native data
- **Intelligent Deduplication**: Intelligent deduplication algorithm based on coordinates and identifiers
- **Version Compatibility**: Supports X-Plane 11 and X-Plane 12 formats
- **Data Integrity**: Ensures generated CIFP data is complete and standard-compliant

**Core Data Structures:**
```python
class Waypoint:
    """Waypoint Class"""
    def __init__(self, la: float, long: float, ident: str, cat: int, 
                 airport: str = '', area: str = '', changeable: bool = True):
        self.latitude = la
        self.longitude = long
        self.ident = ident
        self.cat = cat  # -1:unavailable 1:waypoint 2:VHF 3:NDB
        self.airport = airport
        self.area = area
        self.changeable = changeable
    
    def is_same(self, fix: "Waypoint", change: bool = False) -> bool:
        """Checks if it's the same waypoint"""
        pass

class WaypointSystem:
    """Waypoint Management System"""
    def __init__(self):
        self.base = {}  # Main database
    
    def add_point(self, point: Waypoint):
        """Add waypoint"""
        pass
    
    def query(self, point: Waypoint, change: bool = False) -> int:
        """Query waypoint"""
        pass

class Procedure:
    """Procedure Class"""
    def __init__(self, ptype: int):
        self.ptype = "SID" if ptype == 1 else ("STAR" if ptype == 2 else "APPCH")
        self.airport = None
        self.runway = None
        self.name = None
        self.legs = []
    
    def encode(self):
        """Procedure encoding"""
        pass
    
    def output(self) -> str:
        """Output CIFP format"""
        pass
```

## 🔄 Data Flow Architecture

### Data Flow Diagram

```mermaid
flowchart LR
    subgraph "Source Data"
        A1[NAIP CSV]
        A2[PDF Files]
        A3[X-Plane Data]
    end
    
    subgraph "Preprocessing"
        B1[CSV Parsing]
        B2[PDF Extraction]
        B3[Data Loading]
    end
    
    subgraph "Core Processing"
        C1[Airway Conversion]
        C2[Procedure Standardization]
        C3[Format Patching]
        C4[CIFP Generation]
    end
    
    subgraph "Post-processing"
        D1[Data Validation]
        D2[Format Check]
        D3[Quality Control]
    end
    
    subgraph "Output"
        E1[DAT Files]
        E2[Database Files]
        E3[CIFP Files]
    end
    
    A1 --> B1 --> C1 --> D1 --> E1
    A2 --> B2 --> C2 --> D2 --> E2
    A3 --> B3 --> C4 --> D3 --> E3
    C2 --> C3 --> D2
```

### Data Format Conversion Chain

```mermaid
graph TD
    A[Raw PDF] -->|pdfplumber| B[Structured Text]
    B -->|Parser| C[Procedure Paragraphs]
    C -->|Encoder| D[Standardized Procedures]
    D -->|Patcher| E[CIFP Compatible Format]
    
    F[NAIP CSV] -->|pandas| G[Data Table]
    G -->|Validator| H[Valid Records]
    H -->|Converter| I[X-Plane DAT]
    
    J[Native X-Plane] -->|Loader| K[Reference Data]
    K -->|Matcher| L[Associated Information]
    L -->|Integrator| M[Complete Dataset]
```

## ⚙️ Technology Stack Architecture

### Core Technology Components

```mermaid
graph TB
    subgraph "Programming Language"
        A1[Python 3.6+]
    end
    
    subgraph "Data Processing"
        B1[pandas - Data Analysis]
        B2[numpy - Numerical Computation]
        B3[csv - CSV Processing]
    end
    
    subgraph "PDF Processing"
        C1[pdfplumber - PDF Parsing]
        C2[Regular Expressions - Pattern Matching]
    end
    
    subgraph "Geographic Calculation"
        D1[geopy - Geographic Distance Calculation]
        D2[Coordinate Conversion Algorithm]
    end
    
    subgraph "User Interface"
        E1[tqdm - Progress Bar]
        E2[colorama - Colored Output]
        E3[logging - Logging System]
    end
    
    subgraph "Database"
        F1[sqlite3 - Lightweight Database]
        F2[File System - Data Persistence]
    end
    
    A1 --> B1
    A1 --> B2
    A1 --> C1
    A1 --> D1
    A1 --> E1
    A1 --> F1
```

### Dependency Management

```python
# requirements.txt Dependency Hierarchy
# Core Dependencies
pandas>=1.3.0          # Data processing foundation
numpy>=1.21.0          # Numerical computation foundation

# PDF Processing
pdfplumber>=0.7.0      # PDF parsing engine

# User Experience
tqdm>=4.60.0           # Progress display
colorama>=0.4.4        # Colored output

# Geographic Calculation
geopy>=2.2.0           # Geographic distance calculation

# Chinese Processing
pypinyin>=0.44.0       # Chinese Pinyin conversion

# Development Tools (Optional)
pytest>=6.0.0          # Testing framework
black>=21.0.0          # Code formatting
flake8>=3.9.0          # Code linting
```

## 🏛️ Design Patterns

### 1. Factory Pattern
Used to create different types of data processors:

```python
class ProcessorFactory:
    """Data Processor Factory"""
    
    @staticmethod
    def create_processor(data_type: str):
        if data_type == "airway":
            return AirwayProcessor()
        elif data_type == "pdf":
            return PDFProcessor()
        elif data_type == "terminal":
            return TerminalProcessor()
        elif data_type == "cifp":
            return CIFPProcessor()
        else:
            raise ValueError(f"Unknown processor type: {data_type}")

# Usage Example
processor = ProcessorFactory.create_processor("airway")
result = processor.process(input_data)
```

### 2. Strategy Pattern
Used to implement different data conversion strategies:

```python
class ConversionStrategy:
    """Conversion Strategy Interface"""
    def convert(self, data): pass

class CSVToDAT(ConversionStrategy):
    """CSV to DAT Conversion Strategy"""
    def convert(self, csv_data):
        # CSV conversion logic
        pass

class PDFToText(ConversionStrategy):
    """PDF to Text Conversion Strategy"""
    def convert(self, pdf_data):
        # PDF conversion logic
        pass

class DataConverter:
    """Data Converter"""
    def __init__(self, strategy: ConversionStrategy):
        self.strategy = strategy
    
    def convert(self, data):
        return self.strategy.convert(data)
```

### 3. Observer Pattern
Used to implement processing progress monitoring:

```python
class ProgressObserver:
    """Progress Observer Interface"""
    def update(self, progress: float, message: str): pass

class ConsoleProgressObserver(ProgressObserver):
    """Console Progress Display"""
    def update(self, progress: float, message: str):
        print(f"Progress: {progress:.1%} - {message}")

class TqdmProgressObserver(ProgressObserver):
    """tqdm Progress Bar Display"""
    def __init__(self):
        self.pbar = None
    
    def update(self, progress: float, message: str):
        if self.pbar:
            self.pbar.set_description(message)
            self.pbar.update()

class DataProcessor:
    """Base Data Processor Class"""
    def __init__(self):
        self.observers = []
    
    def add_observer(self, observer: ProgressObserver):
        self.observers.append(observer)
    
    def notify_progress(self, progress: float, message: str):
        for observer in self.observers:
            observer.update(progress, message)
```

### 4. Chain of Responsibility
Used to implement a data validation chain:

```python
class ValidationHandler:
    """Validation Handler Interface"""
    def __init__(self):
        self.next_handler = None
    
    def set_next(self, handler):
        self.next_handler = handler
        return handler
    
    def handle(self, data):
        result = self.validate(data)
        if result and self.next_handler:
            return self.next_handler.handle(data)
        return result
    
    def validate(self, data):
        pass

class FormatValidator(ValidationHandler):
    """Format Validator"""
    def validate(self, data):
        # Format validation logic
        return True

class RangeValidator(ValidationHandler):
    """Range Validator"""
    def validate(self, data):
        # Range validation logic
        return True

class IntegrityValidator(ValidationHandler):
    """Integrity Validator"""
    def validate(self, data):
        # Integrity validation logic
        return True

# Build Validation Chain
format_validator = FormatValidator()
range_validator = RangeValidator()
integrity_validator = IntegrityValidator()

format_validator.set_next(range_validator).set_next(integrity_validator)

# Use Validation Chain
is_valid = format_validator.handle(input_data)
```

## 📊 Performance Architecture

### Memory Management Strategy

```mermaid
graph TD
    A[Large File Input] --> B{File Size}
    B -->|Less than Threshold| C[Direct Load]
    B -->|Exceeds Threshold| D[Stream Processing]
    
    C --> E[In-Memory Processing]
    D --> F[Chunked Reading]
    F --> G[Batch Processing]
    G --> H[Incremental Output]
    
    E --> I[Garbage Collection]
    H --> I
    I --> J[Memory Release]
```

**Memory Optimization Strategy:**
```python
import gc
from typing import Iterator, List

class MemoryEfficientProcessor:
    """Memory-efficient data processor"""
    
    def __init__(self, chunk_size: int = 1000):
        self.chunk_size = chunk_size
    
    def process_large_file(self, file_path: str) -> Iterator[List]:
        """Process large files in chunks"""
        chunk = []
        with open(file_path, 'r', encoding='utf-8') as f:
            for line in f:
                chunk.append(line.strip())
                
                if len(chunk) >= self.chunk_size:
                    yield self.process_chunk(chunk)
                    chunk.clear()
                    gc.collect()  # Force garbage collection
            
            if chunk:  # Process remaining data
                yield self.process_chunk(chunk)
    
    def process_chunk(self, chunk: List[str]) -> List[str]:
        """Process single data chunk"""
        # Data processing logic
        return [self.process_line(line) for line in chunk]
    
    def process_line(self, line: str) -> str:
        """Process single line of data"""
        # Specific processing logic
        return line
```

### Concurrent Processing Architecture

```python
import concurrent.futures
from multiprocessing import Pool
import threading

class ConcurrentProcessor:
    """Concurrent data processor"""
    
    def __init__(self, max_workers: int = 4):
        self.max_workers = max_workers
    
    def process_files_threaded(self, file_list: List[str]) -> List:
        """Process file list with multiple threads"""
        with concurrent.futures.ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            # Submit tasks
            future_to_file = {
                executor.submit(self.process_single_file, file): file 
                for file in file_list
            }
            
            results = []
            for future in concurrent.futures.as_completed(future_to_file):
                file = future_to_file[future]
                try:
                    result = future.result()
                    results.append(result)
                except Exception as exc:
                    print(f'File {file} generated an exception: {exc}')
            
            return results
    
    def process_files_multiprocess(self, file_list: List[str]) -> List:
        """Process file list with multiple processes"""
        with Pool(processes=self.max_workers) as pool:
            results = pool.map(self.process_single_file, file_list)
        return results
    
    def process_single_file(self, file_path: str):
        """Process single file"""
        # File processing logic
        pass
```

### Caching Architecture

```python
import functools
import hashlib
import pickle
from pathlib import Path

class CacheManager:
    """Cache Manager"""
    
    def __init__(self, cache_dir: str = "cache"):
        self.cache_dir = Path(cache_dir)
        self.cache_dir.mkdir(exist_ok=True)
    
    def get_cache_key(self, *args, **kwargs) -> str:
        """Generate cache key"""
        content = str(args) + str(sorted(kwargs.items()))
        return hashlib.md5(content.encode()).hexdigest()
    
    def get(self, key: str):
        """Get cache"""
        cache_file = self.cache_dir / f"{key}.cache"
        if cache_file.exists():
            with open(cache_file, 'rb') as f:
                return pickle.load(f)
        return None
    
    def set(self, key: str, value):
        """Set cache"""
        cache_file = self.cache_dir / f"{key}.cache"
        with open(cache_file, 'wb') as f:
            pickle.dump(value, f)
    
    def cached(self, ttl: int = 3600):
        """Cache decorator"""
        def decorator(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                cache_key = self.get_cache_key(func.__name__, *args, **kwargs)
                result = self.get(cache_key)
                
                if result is None:
                    result = func(*args, **kwargs)
                    self.set(cache_key, result)
                
                return result
            return wrapper
        return decorator

# Usage Example
cache_manager = CacheManager()

@cache_manager.cached(ttl=3600)
def expensive_processing(data):
    """Time-consuming data processing function"""
    # Complex processing logic
    return processed_data
```

## 🔒 Security Architecture

### Input Validation Layer

```python
import re
from pathlib import Path
from typing import Any, Dict

class InputValidator:
    """Input Validator"""
    
    # Safe file extensions
    SAFE_EXTENSIONS = {'.csv', '.dat', '.txt', '.pdf'}
    
    # Path restriction pattern
    SAFE_PATH_PATTERN = re.compile(r'^[a-zA-Z0-9._/\-\s]+$')
    
    @classmethod
    def validate_file_path(cls, file_path: str) -> bool:
        """Validate file path security"""
        path = Path(file_path)
        
        # Check file extension
        if path.suffix.lower() not in cls.SAFE_EXTENSIONS:
            raise ValueError(f"Unsafe file extension: {path.suffix}")
        
        # Check path characters
        if not cls.SAFE_PATH_PATTERN.match(file_path):
            raise ValueError(f"Unsafe characters in path: {file_path}")
        
        # Check for path traversal attacks
        if '..' in file_path or file_path.startswith('/'):
            raise ValueError(f"Path traversal detected: {file_path}")
        
        return True
    
    @classmethod
    def validate_coordinate(cls, lat: float, lon: float) -> bool:
        """Validate coordinate range"""
        if not (-90 <= lat <= 90):
            raise ValueError(f"Invalid latitude: {lat}")
        
        if not (-180 <= lon <= 180):
            raise ValueError(f"Invalid longitude: {lon}")
        
        return True
    
    @classmethod
    def sanitize_string(cls, input_str: str) -> str:
        """Sanitize input string"""
        # Remove potentially dangerous characters
        sanitized = re.sub(r'[<>"\';\\]', '', input_str)
        # Limit length
        return sanitized[:1000]
```

### Error Handling Architecture

```python
import logging
from enum import Enum
from typing import Optional

class ErrorLevel(Enum):
    """Error Level"""
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"

class NavDataError(Exception):
    """Nav-data custom exception base class"""
    def __init__(self, message: str, error_code: str = None, level: ErrorLevel = ErrorLevel.ERROR):
        super().__init__(message)
        self.message = message
        self.error_code = error_code
        self.level = level

class FileProcessingError(NavDataError):
    """File Processing Exception"""
    pass

class DataValidationError(NavDataError):
    """Data Validation Exception"""
    pass

class ErrorHandler:
    """Error Handler"""
    
    def __init__(self):
        self.logger = logging.getLogger(__name__)
    
    def handle_error(self, error: Exception, context: Optional[Dict] = None):
        """Handle exception"""
        if isinstance(error, NavDataError):
            self.handle_nav_data_error(error, context)
        else:
            self.handle_unexpected_error(error, context)
    
    def handle_nav_data_error(self, error: NavDataError, context: Optional[Dict] = None):
        """Handle custom exception"""
        log_message = f"[{error.error_code}] {error.message}"
        if context:
            log_message += f" Context: {context}"
        
        if error.level == ErrorLevel.WARNING:
            self.logger.warning(log_message)
        elif error.level == ErrorLevel.ERROR:
            self.logger.error(log_message)
        elif error.level == ErrorLevel.CRITICAL:
            self.logger.critical(log_message)
            # May require stopping program execution
    
    def handle_unexpected_error(self, error: Exception, context: Optional[Dict] = None):
        """Handle unexpected exception"""
        log_message = f"Unexpected error: {str(error)}"
        if context:
            log_message += f" Context: {context}"
        
        self.logger.error(log_message, exc_info=True)
```

## 🧪 Testing Architecture

### Testing Strategy

```mermaid
graph TD
    A[Test Pyramid] --> B[Unit Testing]
    A --> C[Integration Testing]
    A --> D[End-to-End Testing]
    
    B --> B1[Function Testing]
    B --> B2[Class Testing]
    B --> B3[Module Testing]
    
    C --> C1[Inter-module Interaction]
    C --> C2[Data Flow Testing]
    C --> C3[API Testing]
    
    D --> D1[Full Workflow Testing]
    D --> D2[User Scenario Testing]
    D --> D3[Performance Testing]
```

### Testing Framework Code

```python
import pytest
import tempfile
from pathlib import Path
from unittest.mock import Mock, patch

class TestDataFixtures:
    """Test Data Fixtures"""
    
    @pytest.fixture
    def sample_csv_data(self):
        """Sample CSV data"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123
KLMNO,NDB,PQRST,DESIGNATED_POINT,N,B456"""
    
    @pytest.fixture
    def temp_directory(self):
        """Temporary directory"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def mock_earth_fix_data(self):
        """Mock earth_fix data"""
        return {
            'ABCDE': 'ZB',
            'PQRST': 'ZG'
        }
    
    @pytest.fixture
    def mock_earth_nav_data(self):
        """Mock earth_nav data"""
        return {
            'FGHIJ': 'ZG',
            'KLMNO': 'ZB'
        }

class TestAirwayModule(TestDataFixtures):
    """Airway Module Test"""
    
    def test_navigation_type_enum(self):
        """Test navigation type enum"""
        from Airway.airway import NavigationType
        
        assert NavigationType.DESIGNATED_POINT.type_code == '11'
        assert NavigationType.VORDME.type_code == '3'
        assert NavigationType.NDB.type_code == '2'
    
    def test_process_navigation_point(self, mock_earth_fix_data, mock_earth_nav_data):
        """Test navigation point processing"""
        from Airway.airway import process_navigation_point
        
        # Test designated point processing
        result = process_navigation_point(
            'ABCDE', 'DESIGNATED_POINT', 
            mock_earth_fix_data, mock_earth_nav_data
        )
        
        assert result is not None
        assert result.identifier == 'ABCDE'
        assert result.area_code == 'ZB'
    
    @patch('Airway.airway.load_fixed_width_data')
    @patch('pandas.read_csv')
    def test_csv_to_dat_conversion(self, mock_read_csv, mock_load_data, 
                                 sample_csv_data, temp_directory):
        """Test CSV to DAT conversion"""
        # Set mock data
        mock_df = Mock()
        mock_read_csv.return_value = mock_df
        mock_load_data.return_value = {'ABCDE': 'ZB'}
        
        # Create temporary file
        csv_file = temp_directory / "test.csv"
        csv_file.write_text(sample_csv_data)
        
        # Test conversion functionality
        from Airway.airway import convert_csv_to_dat
        
        # Requires adjustment based on actual function signature here
        # convert_csv_to_dat(str(csv_file), ...)
        
        # Verify result
        assert True  # Assert based on actual result

class TestPDFModule(TestDataFixtures):
    """PDF Module Test"""
    
    @patch('pdfplumber.open')
    def test_pdf_extraction(self, mock_pdf_open):
        """Test PDF extraction functionality"""
        # Set mock PDF
        mock_pdf = Mock()
        mock_page = Mock()
        mock_page.extract_text_lines.return_value = [
            {'text': 'ZBAA N39°48\'35.6" E116°34\'46.7"'}
        ]
        mock_pdf.pages = [mock_page]
        mock_pdf_open.return_value.__enter__.return_value = mock_pdf
        
        # Test extraction functionality
        import sys
        sys.path.append('PDF extract')
        from waypoint_1_pdf import extract
        
        result = extract(mock_pdf)
        assert len(result) > 0
```

## 📈 Monitoring and Logging Architecture

### Logging System Design

```python
import logging
import logging.handlers
from enum import Enum
from pathlib import Path

class LogLevel(Enum):
    """Log Level"""
    DEBUG = logging.DEBUG
    INFO = logging.INFO
    WARNING = logging.WARNING
    ERROR = logging.ERROR
    CRITICAL = logging.CRITICAL

class StructuredLogger:
    """Structured Logger"""
    
    def __init__(self, name: str, log_dir: str = "logs"):
        self.logger = logging.getLogger(name)
        self.log_dir = Path(log_dir)
        self.log_dir.mkdir(exist_ok=True)
        
        self.setup_handlers()
    
    def setup_handlers(self):
        """Set up log handlers"""
        # Console handler
        console_handler = logging.StreamHandler()
        console_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
        )
        console_handler.setFormatter(console_formatter)
        
        # File handler (date-based rotation)
        file_handler = logging.handlers.TimedRotatingFileHandler(
            filename=self.log_dir / 'nav-data.log',
            when='midnight',
            interval=1,
            backupCount=30,
            encoding='utf-8'
        )
        file_formatter = logging.Formatter(
            '%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(message)s'
        )
        file_handler.setFormatter(file_formatter)
        
        # Error file handler
        error_handler = logging.FileHandler(
            filename=self.log_dir / 'errors.log',
            encoding='utf-8'
        )
        error_handler.setLevel(logging.ERROR)
        error_handler.setFormatter(file_formatter)
        
        # Add handlers
        self.logger.addHandler(console_handler)
        self.logger.addHandler(file_handler)
        self.logger.addHandler(error_handler)
        
        self.logger.setLevel(logging.INFO)
    
    def log_with_context(self, level: LogLevel, message: str, **context):
        """Logging with context"""
        if context:
            message = f"{message} | Context: {context}"
        
        self.logger.log(level.value, message)
    
    def log_performance(self, operation: str, duration: float, **metrics):
        """Performance log"""
        perf_message = f"Performance | Operation: {operation} | Duration: {duration:.3f}s"
        if metrics:
            perf_message += f" | Metrics: {metrics}"
        
        self.logger.info(perf_message)
```

### Performance Monitoring

```python
import time
import psutil
from contextlib import contextmanager
from typing import Dict, Any

class PerformanceMonitor:
    """Performance Monitor"""
    
    def __init__(self, logger: StructuredLogger):
        self.logger = logger
        self.metrics = {}
    
    @contextmanager
    def measure_time(self, operation_name: str):
        """Measure operation time"""
        start_time = time.time()
        start_memory = psutil.Process().memory_info().rss / 1024 / 1024  # MB
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.Process().memory_info().rss / 1024 / 1024  # MB
            
            duration = end_time - start_time
            memory_delta = end_memory - start_memory
            
            self.logger.log_performance(
                operation=operation_name,
                duration=duration,
                memory_start=start_memory,
                memory_end=end_memory,
                memory_delta=memory_delta
            )
    
    def collect_system_metrics(self) -> Dict[str, Any]:
        """Collect system metrics"""
        return {
            'cpu_percent': psutil.cpu_percent(),
            'memory_percent': psutil.virtual_memory().percent,
            'disk_usage': psutil.disk_usage('/').percent,
            'process_memory': psutil.Process().memory_info().rss / 1024 / 1024
        }

# Usage Example
logger = StructuredLogger("nav-data")
monitor = PerformanceMonitor(logger)

with monitor.measure_time("csv_processing"):
    # Execute CSV processing operation
    process_csv_file("large_file.csv")

# Log system metrics
system_metrics = monitor.collect_system_metrics()
logger.log_with_context(LogLevel.INFO, "System metrics collected", **system_metrics)
```

## 🔮 Extension Architecture

### Plugin System Design

```python
from abc import ABC, abstractmethod
from typing import Dict, Any, List
import importlib
import os

class Plugin(ABC):
    """Plugin Interface"""
    
    @property
    @abstractmethod
    def name(self) -> str:
        """Plugin name"""
        pass
    
    @property
    @abstractmethod
    def version(self) -> str:
        """Plugin version"""
        pass
    
    @abstractmethod
    def initialize(self, config: Dict[str, Any]):
        """Initialize plugin"""
        pass
    
    @abstractmethod
    def process(self, data: Any) -> Any:
        """Process data"""
        pass
    
    @abstractmethod
    def cleanup(self):
        """Clean up resources"""
        pass

class PluginManager:
    """Plugin Manager"""
    
    def __init__(self, plugin_dir: str = "plugins"):
        self.plugin_dir = plugin_dir
        self.plugins: Dict[str, Plugin] = {}
    
    def load_plugins(self):
        """Load all plugins"""
        if not os.path.exists(self.plugin_dir):
            return
        
        for filename in os.listdir(self.plugin_dir):
            if filename.endswith('.py') and not filename.startswith('__'):
                module_name = filename[:-3]
                try:
                    module = importlib.import_module(f"{self.plugin_dir}.{module_name}")
                    plugin_class = getattr(module, 'Plugin', None)
                    
                    if plugin_class and issubclass(plugin_class, Plugin):
                        plugin = plugin_class()
                        self.plugins[plugin.name] = plugin
                        print(f"Loaded plugin: {plugin.name} v{plugin.version}")
                
                except Exception as e:
                    print(f"Failed to load plugin {module_name}: {e}")
    
    def get_plugin(self, name: str) -> Plugin:
        """Get plugin"""
        return self.plugins.get(name)
    
    def list_plugins(self) -> List[str]:
        """List all plugins"""
        return list(self.plugins.keys())
    
    def execute_plugin(self, name: str, data: Any, config: Dict[str, Any] = None) -> Any:
        """Execute plugin"""
        plugin = self.get_plugin(name)
        if not plugin:
            raise ValueError(f"Plugin not found: {name}")
        
        try:
            if config:
                plugin.initialize(config)
            
            result = plugin.process(data)
            plugin.cleanup()
            return result
        
        except Exception as e:
            plugin.cleanup()
            raise e

# Example Plugin Implementation
class CustomDataProcessor(Plugin):
    """Custom Data Processing Plugin"""
    
    @property
    def name(self) -> str:
        return "custom_processor"
    
    @property
    def version(self) -> str:
        return "1.0.0"
    
    def initialize(self, config: Dict[str, Any]):
        self.config = config
    
    def process(self, data: Any) -> Any:
        # Custom processing logic
        return processed_data
    
    def cleanup(self):
        # Clean up resources
        pass
```

---

**Summary**: Nav-data adopts a modular, layered architectural design, ensuring system maintainability, extensibility, and performance. Through the application of appropriate design patterns, a robust error handling mechanism, and a monitoring system, it provides users with stable and reliable aviation navigation data conversion services. ✈️
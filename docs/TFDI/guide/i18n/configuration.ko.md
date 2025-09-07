# ⚙️ TFDI 항법 데이터 변환기 구성 가이드

이 가이드에서는 TFDI 항법 데이터 변환기의 다양한 구성 옵션을 자세히 설명하여 필요에 따라 변환 프로세스와 출력 결과를 최적화할 수 있도록 돕습니다.

## 🎯 구성 개요

TFDI 변환기는 다음과 같은 유연한 구성 시스템을 지원합니다.
- **📁 출력 구성** - 출력 디렉터리 및 파일 형식 사용자 지정
- **📊 데이터 처리 매개변수** - 좌표 정밀도 및 데이터 필터링 조정
- **⚡ 성능 최적화** - 메모리 관리 및 처리 속도 튜닝
- **🔍 유효성 검사 옵션** - 데이터 무결성 및 품질 관리 설정

## 📋 구성 방법

### 1. 기본 구성 (초보자 권장)
```python
# 기본 구성으로 실행
python Fenix2TFDINavDataConverter.py
# 변환기는 사전 설정된 최적의 구성을 사용합니다.
```

### 2. 코드 내 구성
```python
from dataclasses import dataclass

@dataclass
class ConverterConfig:
    """변환기 구성 클래스"""
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs" 
    archive_name: str = "Primary.7z"
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
```

### 3. 대화형 구성
```python
# 변환기 실행 시 대화형 구성
# 사용자는 실행 과정에서 핵심 매개변수를 설정할 수 있습니다.
```

## 🔧 핵심 구성 옵션

### 출력 경로 구성

#### 출력 디렉터리 설정
**매개변수명**: `output_dir`  
**기본값**: `"Primary"`  
**설명**: 모든 JSON 파일의 출력 디렉터리

**사용 예시:**
```python
config = ConverterConfig(
    output_dir="TFDI_NavData",  # 사용자 지정 출력 디렉터리 이름
)
```

**디렉터리 구조:**
```
TFDI_NavData/           # 주 출력 디렉터리
├── Airports.json       # 공항 데이터
├── Runways.json        # 활주로 데이터
├── Waypoints.json      # 웨이포인트 데이터
├── ...                 # 기타 JSON 파일
└── ProcedureLegs/      # 절차 구간 하위 디렉터리
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

#### 절차 구간 디렉터리
**매개변수명**: `procedure_legs_dir`  
**기본값**: `"Primary/ProcedureLegs"`  
**설명**: 터미널 절차 구간 파일의 출력 디렉터리

**구성 예시:**
```python
config = ConverterConfig(
    output_dir="NavData",
    procedure_legs_dir="NavData/Procedures",  # 사용자 지정 절차 구간 디렉터리
)
```

#### 압축 파일 이름
**매개변수명**: `archive_name`  
**기본값**: `"Primary.7z"`  
**설명**: 최종 생성될 압축 파일 이름

**명명 규칙:**
```python
# 타임스탬프를 포함한 이름 지정
import datetime
now = datetime.datetime.now()
config = ConverterConfig(
    archive_name=f"TFDI_NavData_{now.strftime('%Y%m%d_%H%M')}.7z"
)

# 버전 정보를 포함한 이름 지정
config = ConverterConfig(
    archive_name="TFDI_NavData_v1.0.7z"
)
```

### 데이터 처리 구성

#### 좌표 정밀도 설정
**매개변수명**: `coordinate_precision`  
**기본값**: `8`  
**범위**: `4 - 12`  
**설명**: 지리 좌표의 소수점 자릿수

**정밀도 비교표:**
| 정밀도 | 오차 범위 | 적용 시나리오 | 파일 크기 영향 |
|------|----------|----------|--------------|
| 4자리 | ~11 미터 | 기본 항법 | 최소 |
| 6자리 | ~1.1 미터 | 표준 항법 | 작음 |
| 8자리 | ~1.1 센티미터 | 고정밀 항법 | 기본 |
| 10자리 | ~1.1 밀리미터 | 초고정밀도 | 큼 |
| 12자리 | ~0.1 밀리미터 | 측량 등급 정밀도 | 최대 |

**구성 예시:**
```python
# 고정밀 구성 (권장)
config = ConverterConfig(coordinate_precision=8)

# 균형 구성 (파일 크기 감소)
config = ConverterConfig(coordinate_precision=6)

# 초고정밀 구성 (파일 크기 증가)
config = ConverterConfig(coordinate_precision=10)
```

#### VNAV 임계값 설정
**매개변수명**: `vnav_threshold`  
**기본값**: `2.5`  
**단위**: 도  
**설명**: FAF 지점 감지를 위한 VNAV 각도 임계값

**임계값 의미:**
```python
# 엄격한 FAF 감지 (더 적지만 더 정확한 FAF 지점)
config = ConverterConfig(vnav_threshold=2.0)

# 표준 FAF 감지 (정확성과 커버리지 균형)
config = ConverterConfig(vnav_threshold=2.5)

# 완화된 FAF 감지 (더 많은 FAF 지점, 오탐지 포함 가능성 있음)
config = ConverterConfig(vnav_threshold=3.0)
```

**FAF 감지 로직:**
```python
def is_faf_point(vnav_angle: float, vnav_threshold: float) -> bool:
    """FAF 지점인지 판단"""
    return (vnav_angle is not None and 
            vnav_angle <= vnav_threshold and 
            vnav_angle > 0)
```

## 🚀 성능 구성

### SQLite 데이터베이스 최적화

#### 데이터베이스 연결 설정
```python
# SQLite 성능 최적화 구성
sqlite_pragmas = {
    "journal_mode": "WAL",          # 쓰기 전 로그 모드
    "synchronous": "NORMAL",        # 성능 및 보안 균형
    "cache_size": "10000",          # 캐시 페이지 수 (약 40MB)
    "temp_store": "MEMORY",         # 임시 데이터 메모리 저장
    "mmap_size": "268435456",       # 메모리 매핑 크기 (256MB)
}

def optimize_database_connection(conn):
    """데이터베이스 연결 최적화"""
    for pragma, value in sqlite_pragmas.items():
        conn.execute(f"PRAGMA {pragma}={value}")
```

#### 배치 처리 설정
**매개변수**: 배치 처리 크기  
**기본값**: `1000`  
**설명**: 단일 처리의 레코드 수

**구성 전략:**
```python
import psutil

def get_optimal_batch_size():
    """시스템 메모리에 따라 배치 처리 크기 자동 조정"""
    available_memory_gb = psutil.virtual_memory().available / (1024**3)
    
    if available_memory_gb < 4:
        return 500      # 저사양 메모리 시스템
    elif available_memory_gb < 8:
        return 1000     # 표준 구성
    else:
        return 2000     # 고사양 메모리 시스템

# 사용 예시
batch_size = get_optimal_batch_size()
```

### 메모리 관리 구성

#### 메모리 모니터링 설정
```python
class MemoryMonitor:
    """메모리 모니터링 구성"""
    
    def __init__(self):
        self.memory_limit_gb = 6        # 메모리 사용 제한
        self.warning_threshold = 0.8    # 경고 임계값 (80%)
        self.critical_threshold = 0.9   # 위험 임계값 (90%)
    
    def check_memory_usage(self):
        """메모리 사용량 확인"""
        memory = psutil.virtual_memory()
        usage_ratio = memory.used / memory.total
        
        if usage_ratio > self.critical_threshold:
            return "CRITICAL"
        elif usage_ratio > self.warning_threshold:
            return "WARNING"
        else:
            return "NORMAL"
```

#### 가비지 컬렉션 구성
```python
import gc

def configure_garbage_collection():
    """가비지 컬렉션 구성"""
    # 가비지 컬렉션 임계값 설정
    gc.set_threshold(700, 10, 10)
    
    # 가비지 컬렉션 디버깅 활성화 (디버깅 시에만 사용)
    # gc.set_debug(gc.DEBUG_STATS)

def force_cleanup():
    """메모리 강제 정리"""
    gc.collect()
    gc.collect()  # 완전히 정리되도록 두 번 실행
    gc.collect()
```

## 🔍 유효성 검사 및 품질 관리

### 데이터 유효성 검사 구성

#### 유효성 검사 수준 설정
```python
class ValidationConfig:
    """데이터 유효성 검사 구성"""
    
    def __init__(self, level="standard"):
        self.level = level
        self.checks = self._get_checks_for_level(level)
    
    def _get_checks_for_level(self, level):
        """수준에 따라 검사 항목 가져오기"""
        base_checks = [
            "file_exists",
            "database_format", 
            "required_tables"
        ]
        
        if level == "basic":
            return base_checks
        
        elif level == "standard":
            return base_checks + [
                "coordinate_ranges",
                "data_types",
                "foreign_keys"
            ]
        
        elif level == "strict":
            return base_checks + [
                "coordinate_ranges",
                "data_types", 
                "foreign_keys",
                "data_consistency",
                "duplicate_detection",
                "business_rules"
            ]
```

#### 좌표 유효성 검사 구성
```python
class CoordinateValidator:
    """좌표 유효성 검사 구성"""
    
    def __init__(self):
        # 유효 좌표 범위
        self.lat_min = -90.0
        self.lat_max = 90.0
        self.lon_min = -180.0
        self.lon_max = 180.0
        
        # 의심스러운 좌표 범위 (오류 데이터일 수 있음)
        self.suspicious_zones = [
            {"lat": (0, 0), "lon": (0, 0)},      # 원점 좌표는 오류일 수 있음
            {"lat": (90, 90), "lon": (0, 0)},    # 극점 좌표는 특별한 확인 필요
        ]
    
    def validate_coordinate(self, lat, lon):
        """단일 좌표 유효성 검사"""
        # 기본 범위 확인
        if not (self.lat_min <= lat <= self.lat_max):
            return False, f"위도 범위를 벗어남: {lat}"
        
        if not (self.lon_min <= lon <= self.lon_max):
            return False, f"경도 범위를 벗어남: {lon}"
        
        # 의심스러운 좌표 확인
        for zone in self.suspicious_zones:
            if (zone["lat"][0] <= lat <= zone["lat"][1] and 
                zone["lon"][0] <= lon <= zone["lon"][1]):
                return True, f"의심스러운 좌표: ({lat}, {lon})"
        
        return True, "좌표 유효"
```

### 출력 품질 관리

#### 파일 형식 유효성 검사
```python
import json

class OutputValidator:
    """출력 파일 유효성 검사 구성"""
    
    def __init__(self):
        self.required_files = [
            "Airports.json",
            "Runways.json", 
            "Waypoints.json",
            "Navaids.json",
            "Airways.json",
            "AirwayLegs.json",
            "Terminals.json",
            "ILSes.json"
        ]
        
        self.min_file_sizes = {
            "Airports.json": 1024,      # 최소 1KB
            "Waypoints.json": 10240,    # 최소 10KB
        }
    
    def validate_json_file(self, file_path):
        """JSON 파일 형식 유효성 검사"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, (dict, list)):
                return False, "JSON 루트 객체는 딕셔너리 또는 리스트여야 합니다."
            
            if isinstance(data, dict) and len(data) == 0:
                return False, "JSON 객체가 비어 있습니다."
            
            return True, "JSON 형식이 유효합니다."
            
        except json.JSONDecodeError as e:
            return False, f"JSON 형식 오류: {e}"
        except Exception as e:
            return False, f"파일 읽기 오류: {e}"
```

## 🎛️ 고급 구성

### 로깅 구성

#### 로그 수준 및 형식
```python
import logging
from rich.logging import RichHandler

class LoggingConfig:
    """로깅 구성 클래스"""
    
    def __init__(self, level="INFO"):
        self.level = level
        self.format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        self.file_name = "tfdi_converter.log"
        self.max_file_size = 10 * 1024 * 1024  # 10MB
        self.backup_count = 3
    
    def setup_logging(self):
        """로깅 시스템 설정"""
        # 로거 생성
        logger = logging.getLogger("TFDIConverter")
        logger.setLevel(getattr(logging, self.level))
        
        # Rich 콘솔 핸들러
        console_handler = RichHandler(rich_tracebacks=True)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter("%(message)s")
        console_handler.setFormatter(console_formatter)
        
        # 파일 핸들러
        from logging.handlers import RotatingFileHandler
        file_handler = RotatingFileHandler(
            self.file_name, 
            maxBytes=self.max_file_size,
            backupCount=self.backup_count,
            encoding='utf-8'
        )
        file_handler.setLevel(logging.DEBUG)
        file_formatter = logging.Formatter(self.format)
        file_handler.setFormatter(file_formatter)
        
        # 핸들러 추가
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)
        
        return logger
```

### 압축 구성

#### 압축 수준 설정
```python
import py7zr

class CompressionConfig:
    """압축 구성 클래스"""
    
    def __init__(self):
        self.compression_level = 5      # 압축 수준 (1-9)
        self.method = "LZMA2"          # 압축 알고리즘
        self.solid = True              # 솔리드 압축
        self.multi_threading = True    # 멀티 스레딩 압축
    
    def create_archive(self, source_dir, archive_path):
        """압축 파일 생성"""
        filters = [
            {"id": py7zr.FILTER_LZMA2, "preset": self.compression_level}
        ]
        
        with py7zr.SevenZipFile(
            archive_path, 
            'w', 
            filters=filters,
            mp=self.multi_threading
        ) as archive:
            archive.writeall(source_dir, ".")
```

### 디버그 구성

#### 디버그 모드 설정
```python
class DebugConfig:
    """디버그 구성 클래스"""
    
    def __init__(self, debug_mode=False):
        self.debug_mode = debug_mode
        self.save_intermediate_files = debug_mode
        self.verbose_logging = debug_mode
        self.performance_profiling = debug_mode
        self.memory_tracking = debug_mode
    
    def enable_debug_features(self):
        """디버그 기능 활성화"""
        if self.debug_mode:
            # 상세 로깅 활성화
            logging.getLogger().setLevel(logging.DEBUG)
            
            # 성능 분석 활성화
            if self.performance_profiling:
                import cProfile
                self.profiler = cProfile.Profile()
                self.profiler.enable()
            
            # 메모리 추적 활성화
            if self.memory_tracking:
                import tracemalloc
                tracemalloc.start()
```

## 📝 전체 구성 예시

### 기본 구성 예시
```python
# 초보자에게 적합한 간단한 구성
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8,
    vnav_threshold=2.5
)
```

### 고성능 구성 예시
```python
# 고급 하드웨어에 적합한 성능 최적화 구성
config = ConverterConfig(
    output_dir="Primary_HighPerf",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# 성능 최적화 설정과 함께
batch_size = 2000
memory_limit_gb = 8
enable_multi_threading = True
```

### 고품질 구성 예시
```python
# 데이터 품질 요구사항이 매우 높은 시나리오에 적합한 구성
config = ConverterConfig(
    output_dir="Primary_HighQuality", 
    coordinate_precision=10,        # 더 높은 정밀도
    vnav_threshold=2.0             # 더 엄격한 FAF 감지
)

# 엄격한 유효성 검사와 함께
validation_level = "strict"
enable_duplicate_detection = True
enable_consistency_check = True
```

### 디버그 구성 예시
```python
# 개발 및 디버그용 구성
config = ConverterConfig(
    output_dir="Debug_Output",
    coordinate_precision=6,         # 처리 속도를 높이기 위해 정밀도 낮춤
    vnav_threshold=3.0             # 디버깅에 편리하도록 임계값 완화
)

# 디버그 옵션
debug_config = DebugConfig(debug_mode=True)
save_intermediate_files = True
verbose_logging = True
```

## 🔧 구성 파일 관리

### 구성 파일 형식
```python
# config.py
from dataclasses import dataclass, asdict
import json

@dataclass 
class TFDIConverterConfig:
    """TFDI 변환기 전체 구성"""
    # 출력 구성
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs"
    archive_name: str = "Primary.7z"
    
    # 데이터 처리 구성
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
    
    # 성능 구성
    batch_size: int = 1000
    memory_limit_gb: int = 6
    
    # 유효성 검사 구성
    validation_level: str = "standard"
    enable_coordinate_check: bool = True
    
    # 로깅 구성
    log_level: str = "INFO"
    log_file: str = "tfdi_converter.log"
    
    def save_to_file(self, file_path: str):
        """파일에 구성 저장"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(asdict(self), f, indent=2)
    
    @classmethod
    def load_from_file(cls, file_path: str):
        """파일에서 구성 로드"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls(**data)
```

### 구성 템플릿
```python
# 구성 템플릿 생성
def create_config_templates():
    """다양한 구성 템플릿 생성"""
    
    # 기본 구성
    default_config = TFDIConverterConfig()
    default_config.save_to_file("config_default.json")
    
    # 고성능 구성
    performance_config = TFDIConverterConfig(
        batch_size=2000,
        memory_limit_gb=8,
        coordinate_precision=6
    )
    performance_config.save_to_file("config_performance.json")
    
    # 고품질 구성
    quality_config = TFDIConverterConfig(
        coordinate_precision=10,
        vnav_threshold=2.0,
        validation_level="strict"
    )
    quality_config.save_to_file("config_quality.json")

# 구성 사용
config = TFDIConverterConfig.load_from_file("config_performance.json")
```

---

**다음 단계**: 구성 완료 후, [사용 설명](usage.md)을 확인하여 TFDI 데이터 변환을 시작하세요!🚁✨
# 구성 설명

이 문서는 Nav-data의 각 모듈에 대한 구성 옵션 및 매개변수 설정을 상세히 설명합니다.

## 📋 구성 파일 개요

### 주요 구성 파일
```
config/
├── main.conf           # 주 구성 파일
├── airway.conf         # 항로 처리 구성
├── pdf_extract.conf    # PDF 추출 구성
├── terminal.conf       # 터미널 프로그램 구성
└── paths.conf          # 경로 구성
```

### 환경 변수 구성
```bash
# .env 파일 예시
NAV_DATA_HOME=/path/to/nav-data
XPLANE_PATH=/path/to/X-Plane
LOG_LEVEL=INFO
```

## 🛣️ 항로 모듈 구성 (Airway)

### 구성 파일: `config/airway.conf`

```ini
[General]
# 상세 로깅 활성화
verbose_logging = true

# 진행률 표시
show_progress = true

# 배치 크기
batch_size = 1000

[Input]
# CSV 입력 파일 경로
csv_file = RTE_SEG.csv

# X-Plane 참조 데이터 파일
earth_fix_file = earth_fix.dat
earth_nav_file = earth_nav.dat
earth_awy_file = earth_awy.dat

[Output]
# 출력 파일 인코딩
output_encoding = utf-8

# 원본 파일 백업
create_backup = true

# 백업 파일 접미사
backup_suffix = .backup

[Filtering]
# 제외할 공역 지역 코드 (쉼표로 구분)
excluded_areas = ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU

# 최소 항로 구간 길이 (해리)
min_segment_length = 0.1

# 최대 항로 구간 길이 (해리)
max_segment_length = 999.9

[Validation]
# 데이터 유효성 검사 활성화
enable_validation = true

# 비행 경로점 허용 오차 (도)
coordinate_tolerance = 0.001

# 지역 코드 유효성 검사
validate_area_codes = true

[AIRAC]
# AIRAC 주기 자동 계산
auto_calculate_cycle = true

# AIRAC 주기 수동 지정 (형식: YYMM)
manual_cycle = 

# AIRAC 기준 날짜 (ISO 형식)
reference_date = 2025-01-23

# 기준 주기
reference_cycle = 2501
```

### 코드 내 구성 옵션

#### 항로 처리 메인 스크립트 구성
```python
# Airway/airway.py 구성 예시

# 중국 공역 코드 구성
CHINA_AREAS = {
    'ZB',  # 베이징 비행 정보 구역
    'ZG',  # 광저우 비행 정보 구역
    'ZY',  # 선양 비행 정보 구역
    'ZS',  # 상하이 비행 정보 구역
    'ZW',  # 우루무치 비행 정보 구역
    'ZJ',  # 싼야 비행 정보 구역
    'ZP',  # 란저우 비행 정보 구역
    'ZL',  # 쿤밍 비행 정보 구역
    'ZH',  # 우한 비행 정보 구역
    'ZU'   # 청두 비행 정보 구역
}

# 파일 경로 구성
FILE_PATHS = {
    'csv_input': 'RTE_SEG.csv',
    'earth_fix': 'earth_fix.dat',
    'earth_nav': 'earth_nav.dat',
    'earth_awy': 'earth_awy.dat'
}

# 비행 경로점 유형 매핑
NAVIGATION_TYPES = {
    'DESIGNATED_POINT': {'code': 'DESIGNATED_POINT', 'type_code': '11'},
    'VORDME': {'code': 'VORDME', 'type_code': '3'},
    'NDB': {'code': 'NDB', 'type_code': '2'}
}
```

## 📄 PDF 추출 모듈 구성

### 구성 파일: `config/pdf_extract.conf`

```ini
[General]
# 처리 모드: auto (자동), manual (수동)
processing_mode = auto

# 출력 형식: txt, json, csv
output_format = txt

# 문자 인코딩
encoding = utf-8

[PDF_Processing]
# PDF 파싱 엔진: pdfplumber, pypdf2
pdf_engine = pdfplumber

# 페이지 자르기 여백 (픽셀)
crop_margin_top = 50
crop_margin_bottom = 50
crop_margin_left = 30
crop_margin_right = 30

# 텍스트 추출 임계값
text_confidence_threshold = 0.8

# 선 감지 임계값
line_detection_threshold = 5

[Coordinate_Extraction]
# 좌표 형식 유효성 검사
coordinate_format_strict = true

# 좌표 정밀도 (소수점 이하 자릿수)
coordinate_precision = 8

# 좌표 범위 유효성 검사 (중국 지역)
latitude_min = 15.0
latitude_max = 55.0
longitude_min = 70.0
longitude_max = 140.0

[Error_Handling]
# 오류 발생 시 계속 처리
continue_on_error = true

# 오류 로그 상세 수준
error_detail_level = high

# 일반적인 오류 자동 수정
auto_fix_common_errors = true

[Output]
# 출력 파일 명명 패턴
# 변수: {airport}, {type}, {timestamp}
filename_pattern = {airport}_{type}.txt

# 출력 디렉터리 생성
create_output_dirs = true

# 기존 파일 덮어쓰기
overwrite_existing = false
```

### 코드 구성 예시

#### PDF 처리 구성
```python
# PDF extract/utils.py 구성

# 비행 경로점 카테고리 정의
WAYPOINT_CATEGORIES = {
    'ENRT': 1,      # 항로점
    'VHF': 2,       # VHF 항법 시설
    'NDB': 3,       # NDB 항법 시설
    'TERMINAL': 4   # 터미널 구역 비행 경로점
}

# 좌표 처리 정밀도
COORDINATE_PRECISION = 8

# 지역 코드 변환 테이블
AREA_CODE_TRANSLATION = {
    'KA': 'K1'  # 특수 지역 코드 변환
}

# 오류 메시지 색상 구성 (colorama 사용)
COLOR_CONFIG = {
    'error': Fore.RED,
    'warning': Fore.YELLOW,
    'info': Fore.GREEN,
    'debug': Fore.CYAN
}
```

#### 좌표 추출 구성
```python
# PDF extract/waypoint_1_pdf.py 구성

# 페이지 처리 설정
PAGE_PROCESSING = {
    'enable_text_lines': True,
    'debug_output': False,
    'max_lines_per_page': 1000
}

# 좌표 계산 설정
COORDINATE_CALCULATION = {
    'precision_digits': 8,
    'handle_number_prefix': True,
    'auto_format_detection': True
}

# 문자 처리 설정
CHARACTER_PROCESSING = {
    'degree_symbol_replacement': '°',
    'minute_symbol_replacement': "'",
    'second_symbol_replacement': '"',
    'special_char_mapping': {"¡ã": '°'}
}
```

## 🔧 터미널 프로그램 구성 (Terminal Patch)

### 구성 파일: `config/terminal.conf`

```ini
[Encoder]
# 기본 입력 경로
default_input_path = PDF extract/public

# 기본 출력 경로
default_output_path = PDF extract/output

# 파일 인코딩
file_encoding = utf-8

# 인코딩 유효성 검사 활성화
enable_encoding_validation = true

[Processing_Rules]
# IF 지점 식별 규칙
if_point_markers = c

# 인코딩 규칙
encoding_rules = {
    'if_line': 'E  A',
    'transition_middle': 'E   ',
    'transition_end': 'EE B',
    'main_approach_if': 'E  B',
    'faf_point': 'E  F',
    'missed_approach': 'E M ',
    'procedure_end': 'EE  ',
    'holding_end': 'EE H'
}

[ReEncoder]
# 지원되는 공항 코드 접두사
supported_airport_prefixes = ZB,ZG,ZL,ZU,ZW,ZY,ZJ,ZS,ZH,ZP

# 파일 인코딩 감지
auto_detect_encoding = true

# 인코딩 수정 규칙
fix_rules = {
    'appch_gy_m_rule': true,
    'pure_alpha_rule': true,
    'sid_runway_rule': true,
    'procedure_end_rule': true
}

[Validation]
# 형식 유효성 검사
validate_format = true

# 활주로 식별자 유효성 검사
validate_runway_identifiers = true

# 절차 유형 유효성 검사
validate_procedure_types = true
```

### 인코더 구성 예시

```python
# Terminal Patch/terminal_encoder.py 구성

# 절차 유형 식별자
PROCEDURE_MARKERS = {
    'approach': 'c',
    'departure': 'd',
    'arrival': 'a'
}

# 인코딩 매핑
ENCODING_MAPPINGS = {
    'IF_LINE': 'E  A',
    'TRANSITION_MIDDLE': 'E   ',
    'TRANSITION_END': 'EE B',
    'MAIN_APPROACH_IF': 'E  B', 
    'FAF_POINT': 'E  F',
    'MISSED_APPROACH_FIRST': 'E M ',
    'PROCEDURE_END': 'EE  ',
    'HOLDING_END': 'EE H'
}

# 파일 처리 설정
FILE_PROCESSING = {
    'batch_mode': True,
    'show_progress': True,
    'create_backup': False,
    'output_encoding': 'utf-8'
}
```

## 🛩️ X-Plane CIFP 모듈 구성

### 구성 파일: `config/cifp.conf`

```ini
[General]
# X-Plane 버전 호환성
xplane_version = 12

# CIFP 데이터 형식 버전
cifp_format_version = 1101

[Paths]
# 입력 데이터 경로
input_path = /Users/lujuncheng/Downloads/XP내비게이션데이터/인코딩재구축

# 출력 폴더
output_folder = /Users/lujuncheng/Downloads/XP내비게이션데이터/CIFP

# X-Plane 설치 경로
xplane_path = /Users/lujuncheng/Downloads/xplane12_native_2502

# CSV 데이터 폴더
csv_folder = /Users/lujuncheng/Downloads/NAIP2502

[Processing]
# 처리할 절차 유형
process_departures = true
process_arrivals = true
process_approaches = true

# 활주로 정보 처리
generate_runway_info = true

# 절차 혼합 모드
enable_procedure_mixing = true

[NavAid_Processing]
# VOR 데이터 파일
vor_data_file = VOR.csv

# NDB 데이터 파일  
ndb_data_file = NDB.csv

# 주파수 처리
frequency_conversion = true

# 고도 단위 변환 (미터 → 피트)
altitude_conversion_factor = 3.28

[Waypoint_Processing]
# 비행 경로점 유형 인코딩
waypoint_type_coding = true

# ARINC 424 호환성
arinc424_compatibility = true

# 지역 코드 처리
process_area_codes = true

[Validation]
# 좌표 유효성 검사 허용 오차
coordinate_tolerance = 0.2

# 비행 경로점 식별자 유효성 검사
validate_identifiers = true

# 절차 무결성 검사
validate_procedure_integrity = true
```

### 비행 경로점 시스템 구성

```python
# X-Plane CIFP/utils.py 구성

# 비행 경로점 카테고리 정의
WAYPOINT_CATEGORIES = {
    'UNAVAILABLE': -1,  # 상태를 사용할 수 없음
    'WAYPOINT': 1,      # 비행 경로점
    'VHF_NAVAID': 2,    # VHF 항법 장비
    'NDB_NAVAID': 3     # NDB 항법 장비
}

# 좌표 비교 허용 오차 (도)
COORDINATE_TOLERANCE = 0.2

# 지역 코드 매핑
AREA_CODE_MAPPING = {
    # 중국 비행 정보 구역 코드
    'ZBPE': 'ZB',  # 베이징
    'ZGZU': 'ZG',  # 광저우
    'ZYSH': 'ZY',  # 선양
    'ZSHA': 'ZS',  # 상하이
    'ZWUQ': 'ZW',  # 우루무치
    'ZJSA': 'ZJ',  # 싼야
    'ZLHW': 'ZL',  # 란저우
    'ZUCK': 'ZU',  # 청두
    'ZHWH': 'ZH'   # 우한
}
```

## 📊 데이터 처리 구성

### CSV 데이터 구성

```python
# 공통 CSV 처리 구성
CSV_CONFIG = {
    'encoding': 'gbk',          # 중국어 CSV는 일반적으로 GBK 인코딩 사용
    'delimiter': ',',
    'quotechar': '"',
    'skipinitialspace': True,
    'na_values': ['', 'N/A', 'NULL', '0.0']
}

# 필수 CSV 필드
REQUIRED_CSV_FIELDS = {
    'airway': [
        'CODE_POINT_START', 'CODE_TYPE_START',
        'CODE_POINT_END', 'CODE_TYPE_END', 
        'CODE_DIR', 'TXT_DESIG'
    ],
    'airport': [
        'CODE_AIRPORT', 'GEO_LAT', 'GEO_LONG', 
        'ELEVATION', 'TXT_NAME'
    ],
    'runway': [
        'CODE_AIRPORT', 'TXT_DESIG', 'GEO_LAT_START',
        'GEO_LONG_START', 'GEO_LAT_END', 'GEO_LONG_END'
    ]
}
```

### 데이터베이스 구성
```python
# X-Plane CIFP/데이터베이스.py 구성

DATABASE_CONFIG = {
    'connection_timeout': 30,
    'auto_commit': True,
    'encoding': 'utf-8',
    'journal_mode': 'WAL',  # SQLite 최적화
    'synchronous': 'NORMAL'
}

# 데이터 테이블 구조
TABLE_SCHEMAS = {
    'waypoints': {
        'id': 'INTEGER PRIMARY KEY',
        'ident': 'TEXT NOT NULL',
        'latitude': 'REAL NOT NULL', 
        'longitude': 'REAL NOT NULL',
        'type': 'INTEGER',
        'airport': 'TEXT',
        'area': 'TEXT'
    }
}
```

## 🔧 로깅 구성

### 로깅 구성 파일: `config/logging.conf`

```ini
[loggers]
keys=root,airway,pdf_extract,terminal,cifp

[handlers] 
keys=consoleHandler,fileHandler,rotatingFileHandler

[formatters]
keys=standardFormatter,detailedFormatter

[logger_root]
level=INFO
handlers=consoleHandler,rotatingFileHandler

[logger_airway]
level=DEBUG
handlers=fileHandler
qualname=airway
propagate=0

[logger_pdf_extract]
level=INFO
handlers=fileHandler
qualname=pdf_extract
propagate=0

[logger_terminal]
level=INFO
handlers=fileHandler
qualname=terminal
propagate=0

[logger_cifp]
level=DEBUG
handlers=fileHandler
qualname=cifp
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=standardFormatter
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=detailedFormatter
args=('logs/nav-data.log', 'a')

[handler_rotatingFileHandler]
class=handlers.RotatingFileHandler
level=INFO
formatter=standardFormatter
args=('logs/nav-data-rotating.log', 'a', 10485760, 5)

[formatter_standardFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=%Y-%m-%d %H:%M:%S

[formatter_detailedFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(funcName)s() - %(message)s
datefmt=%Y-%m-%d %H:%M:%S
```

### Python 로깅 구성 예시

```python
import logging
import logging.config
from pathlib import Path

# 로깅 구성 로드
def setup_logging(config_path='config/logging.conf'):
    """로깅 구성 설정"""
    if Path(config_path).exists():
        logging.config.fileConfig(config_path)
    else:
        # 기본 구성
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('logs/nav-data.log')
            ]
        )

# 각 모듈 로거
def get_logger(name):
    """모듈 전용 로거 가져오기"""
    return logging.getLogger(name)

# 사용 예시
logger = get_logger('airway')
logger.info('항로 처리 시작')
```

## ⚙️ 성능 최적화 구성

### 메모리 관리 구성
```python
# 메모리 사용 최적화
MEMORY_CONFIG = {
    'chunk_size': 10000,        # 청크 처리 크기
    'max_memory_usage': '2GB',  # 최대 메모리 사용량
    'garbage_collection': True, # 가비지 컬렉션 활성화
    'buffer_size': 8192        # 파일 읽기 버퍼
}

# 동시 처리 구성
CONCURRENCY_CONFIG = {
    'max_workers': 4,           # 최대 작업 스레드 수
    'enable_multiprocessing': False, # 다중 프로세스 처리
    'thread_pool_size': 2       # 스레드 풀 크기
}
```

### 캐시 구성
```python
# 캐시 설정
CACHE_CONFIG = {
    'enable_cache': True,
    'cache_size': 1000,
    'cache_ttl': 3600,          # 캐시 수명 (초)
    'cache_directory': 'cache/'
}
```

## 🔍 구성 유효성 검사

### 구성 유효성 검사 스크립트

`validate_config.py` 생성:

```python
#!/usr/bin/env python3
"""
구성 파일 유효성 검사 스크립트
"""
import configparser
import os
import sys
from pathlib import Path

def validate_airway_config(config_file):
    """항로 모듈 구성 유효성 검사"""
    config = configparser.ConfigParser()
    config.read(config_file)
    
    errors = []
    
    # 필수 섹션 확인
    required_sections = ['General', 'Input', 'Output', 'Filtering']
    for section in required_sections:
        if section not in config:
            errors.append(f"누락된 구성 섹션: [{section}]")
    
    # 파일 경로 확인
    if 'Input' in config:
        for key in ['csv_file', 'earth_fix_file', 'earth_nav_file']:
            if key in config['Input']:
                file_path = config['Input'][key]
                if not os.path.exists(file_path):
                    errors.append(f"파일이 존재하지 않습니다: {file_path}")
    
    return errors

def validate_all_configs():
    """모든 구성 파일 유효성 검사"""
    config_dir = Path('config')
    if not config_dir.exists():
        print("❌ 구성 디렉터리가 존재하지 않습니다")
        return False
    
    config_files = {
        'airway.conf': validate_airway_config,
        # 더 많은 구성 유효성 검사 함수를 추가할 수 있습니다
    }
    
    all_valid = True
    for config_file, validator in config_files.items():
        config_path = config_dir / config_file
        if config_path.exists():
            errors = validator(str(config_path))
            if errors:
                print(f"❌ {config_file} 구성 오류:")
                for error in errors:
                    print(f"   - {error}")
                all_valid = False
            else:
                print(f"✅ {config_file} 구성이 올바릅니다")
        else:
            print(f"⚠️  {config_file} 구성 파일이 존재하지 않습니다 (기본값 사용)")
    
    return all_valid

if __name__ == "__main__":
    if validate_all_configs():
        print("\n🎉 모든 구성 유효성 검사 통과!")
        sys.exit(0)
    else:
        print("\n❌ 구성 유효성 검사 실패, 위에 나열된 문제를 수정하십시오")
        sys.exit(1)
```

## 📚 구성 모범 사례

### 1. 구성 파일 관리
- 버전 제어를 사용하여 구성 파일 관리
- 다양한 환경에 대해 다른 구성 파일 생성
- 중요한 구성 정기적으로 백업

### 2. 보안 고려 사항
- 구성 파일에 민감한 정보 저장 금지
- 환경 변수를 사용하여 경로와 같은 가변 정보 저장
- 적절한 파일 권한 설정

### 3. 성능 최적화
- 시스템 리소스에 따라 배치 크기 조정
- 합리적인 메모리 사용 제한 설정
- 적절한 캐싱 메커니즘 활성화

### 4. 오류 처리
- 모든 주요 구성 항목에 기본값 설정
- 구성 유효성 검사 메커니즘 구현
- 명확한 오류 메시지 제공

---

**구성 완료!** 🎯 이제 특정 요구 사항에 따라 각 모듈의 구성 매개변수를 조정할 수 있습니다. 처음 사용하기 전에 구성 유효성 검사 스크립트를 실행하여 설정이 올바른지 확인하는 것이 좋습니다.
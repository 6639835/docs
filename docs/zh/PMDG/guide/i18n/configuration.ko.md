# ⚙️ 구성 설명

이 가이드는 Nav-data의 데이터 소스, 파일 경로 및 처리 매개변수를 구성하는 방법을 자세히 설명하여 도구가 항공 항법 데이터를 올바르게 처리할 수 있도록 합니다.

## 📋 구성 개요

Nav-data는 다음 유형의 데이터 소스를 구성해야 합니다.
- **NAIP 데이터** - 중국 민간 항공 정보 처리 시스템 데이터 (CSV 형식)
- **X-Plane 데이터** - X-Plane 항법 데이터 파일 (DAT 형식)
- **CIFP 데이터** - 코드화된 계기 비행 절차 데이터 (DAT 형식)
- **출력 구성** - 생성된 데이터베이스 및 로그 파일 위치

## 🗂️ 데이터 소스 상세 정보

### 1. NAIP 데이터 소스 (중국 민항 데이터)

NAIP (National Aeronautical Information Processing) 데이터에는 중국 지역의 공식 항공 정보가 포함되어 있습니다.

#### 필수 파일 목록
```
data/input/naip/
├── AD_HP.csv              # 공항 기본 데이터 (공항 위치, 자기 편차)
├── RWY_DIRECTION.csv      # 활주로 방향 정보
├── RWY.csv                # 활주로 상세 정보 (길이, 폭, 표면)
└── RTE_SEG.csv            # 항로 구간 데이터
```

#### 파일 형식 요구 사항
- **인코딩**: Latin-1 (ISO-8859-1)
- **구분 기호**: 쉼표 (,)
- **줄 바꿈 문자**: Windows (CRLF) 또는 Unix (LF)

#### 주요 필드 설명

**AD_HP.csv** - 공항 데이터:
- `CODE_ID`: 4자리 ICAO 코드 (예: ZBAA)
- `GEO_LAT_ACCURACY`: 위도 (DMS 형식: N390308.00)
- `GEO_LONG_ACCURACY`: 경도 (DMS 형식: E1162930.00)
- `VAL_MAG_VAR`: 자기 편차 값

**RWY.csv** - 활주로 데이터:
- `CODE_ID`: 공항 ICAO 코드
- `TXT_DESIG`: 활주로 식별자 (예: 18L/36R)
- `VAL_LEN`: 활주로 길이 (미터)
- `VAL_WID`: 활주로 폭 (미터)

**RTE_SEG.csv** - 항로 데이터:
- `TXT_DESIG`: 항로 식별자 (예: A1, G212)
- `CODE_POINT_START`: 시작점 식별자
- `CODE_TYPE_START`: 지점 유형 (DESIGNATED_POINT, VORDME, NDB)
- `VAL_MAG_TRACK`: 자기방위 (도)
- `VAL_LEN`: 항로 구간 길이 (킬로미터)

### 2. X-Plane 데이터 소스

X-Plane은 고품질 항법 데이터를 제공하며, 전 세계를 지원합니다.

#### 필수 파일
```
data/input/xplane/
├── earth_fix.dat          # 전 세계 항로점 데이터
└── earth_nav.dat          # VOR/DME/NDB/ILS 데이터
```

#### 데이터 형식 설명

**earth_fix.dat** 형식:
```
위도 경도 식별자 지역 코드 ICAO 코드 유형
39.051639 116.497222 ADNAP ZZZZ ZB DESIGNATED_POINT
```

**earth_nav.dat** 형식:
```
유형 위도 경도 고도 주파수 항속거리 자기 편차 식별자 지역 코드 ICAO 코드 이름 장비 유형
3 39.051639 116.497222 35 11030 130 -6.0 BJK ENRT ZB BEIJING VOR/DME
```

#### 지원되는 ICAO 지역 코드
```python
# 현재 지원되는 중국 지역 코드
VALID_ICAO_CODES = {
    'ZB',  # 화북 지역
    'ZG',  # 광저우 지역  
    'ZS',  # 상하이 지역
    'ZJ',  # 신장 지역
    'ZY',  # 중남 지역
    'ZL',  # 란저우 지역
    'ZH',  # 헤이룽장 지역
    'ZU',  # 우루무치 지역
    'ZP',  # 쿤밍 지역
    'ZW'   # 티베트 지역
}
```

### 3. CIFP 데이터 소스 (비행 절차)

CIFP (Coded Instrument Flight Procedures)에는 표준 계기 비행 절차가 포함됩니다.

#### 파일 구조
```
data/input/cifp/
├── ZBAA.dat              # 베이징 수도 공항 절차
├── ZSPD.dat              # 상하이 푸동 공항 절차
├── ZGGG.dat              # 광저우 바이윈 공항 절차
└── [공항 ICAO 코드].dat     # 기타 공항 절차 파일
```

#### 절차 유형
- **SID** - 표준 계기 이륙 절차
- **STAR** - 표준 터미널 도착 절차  
- **APPCH** - 계기 접근 절차

#### 데이터 형식 예시
```
SID:010,D,ABING1,T,ZBAA,ABING,ZB,001,IF,L,0.30,IF,,-6.0,ZBAA,0,0,0,270.0,0,D,+,1700,,,,,0.0,,ABING,,J
```

### 4. 참조 데이터 파일

#### 공항 이름 조회 파일
```
data/input/Airport.dat

형식:
ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL
ZGGG GUANGZHOU/BAIYUN INTL
```

## 🔧 구성 파일 설정

### 1. 경로 구성

각 Python 모듈에는 경로 구성이 포함되어 있으며, 실제 환경에 따라 조정해야 합니다.

#### PMDG_APT.py 구성 예시
```python
# 공항 데이터 처리 구성
csv_file_path = r'/path/to/naip/AD_HP.csv'
lookup_txt_file_path = r'/path/to/Airport.dat'
output_db_path = r'/path/to/output/e_dfd_PMDG.s3db'
missing_airports_path = r'/path/to/logs/missing_airports_data.txt'
```

#### PMDG_RUNWAY.py 구성 예시
```python
# 활주로 데이터 처리 구성
path_to_first_csv = r'/path/to/naip/RWY_DIRECTION.csv'
path_to_second_csv = r'/path/to/naip/RWY.csv'
path_to_magvar_csv = r'/path/to/naip/AD_HP.csv'
output_db3_path = r'/path/to/output/e_dfd_PMDG.s3db'
earth_nav_dat_path = r'/path/to/xplane/earth_nav.dat'
```

#### 절차 데이터 구성 예시
```python
# SID/STAR/APPCH 절차 구성
source_dat_directory = '/path/to/cifp/'
earth_fix_path = '/path/to/xplane/earth_fix.dat'
earth_nav_path = '/path/to/xplane/earth_nav.dat'
db_path = '/path/to/output/e_dfd_PMDG.s3db'
```

### 2. 구성 관리 스크립트 생성

관리를 용이하게 하기 위해 통합 구성 파일을 생성하는 것이 좋습니다.

```python
# config/paths.py
import os

# 기본 경로
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INPUT_DIR = os.path.join(DATA_DIR, 'input')
OUTPUT_DIR = os.path.join(DATA_DIR, 'output')
LOGS_DIR = os.path.join(BASE_DIR, 'logs')

# NAIP 데이터 경로
NAIP_DIR = os.path.join(INPUT_DIR, 'naip')
NAIP_FILES = {
    'airports': os.path.join(NAIP_DIR, 'AD_HP.csv'),
    'runway_direction': os.path.join(NAIP_DIR, 'RWY_DIRECTION.csv'),
    'runway_data': os.path.join(NAIP_DIR, 'RWY.csv'),
    'route_segments': os.path.join(NAIP_DIR, 'RTE_SEG.csv')
}

# X-Plane 데이터 경로
XPLANE_DIR = os.path.join(INPUT_DIR, 'xplane')
XPLANE_FILES = {
    'waypoints': os.path.join(XPLANE_DIR, 'earth_fix.dat'),
    'navigation': os.path.join(XPLANE_DIR, 'earth_nav.dat')
}

# CIFP 데이터 경로
CIFP_DIR = os.path.join(INPUT_DIR, 'cifp')

# 출력 파일 경로
OUTPUT_DATABASE = os.path.join(OUTPUT_DIR, 'e_dfd_PMDG.s3db')

# 참조 파일
AIRPORT_LOOKUP = os.path.join(INPUT_DIR, 'Airport.dat')

# 로그 파일 경로
LOG_FILES = {
    'missing_airports': os.path.join(LOGS_DIR, 'missing_airports_data.txt'),
    'ils_processing': os.path.join(LOGS_DIR, 'PMDG_ILS.log'),
    'airway_processing': os.path.join(LOGS_DIR, 'PMDG_AWY_NEW.log'),
    'validation': os.path.join(LOGS_DIR, 'db_validation.log')
}

# MSFS 설치 경로 (사용자 정의 필요)
MSFS_COMMUNITY_PATHS = {
    'microsoft_store': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community',
    'steam': r'C:\Users\{username}\AppData\Roaming\Microsoft Flight Simulator\Packages\Community',
    'xbox_gamepass': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community'
}
```

## ⚡ 성능 구성

### 1. 메모리 최적화 설정

대규모 데이터 세트의 경우 배치 처리 크기를 조정할 수 있습니다.

```python
# PMDG_TMA_WAYPOINT.py 의 배치 처리 구성
BATCH_SIZE = 1000  # 기본 배치 크기
MAX_MEMORY_MB = 2048  # 최대 메모리 사용량 (MB)

# 사용 가능한 메모리에 따라 조정
import psutil
available_memory = psutil.virtual_memory().available / (1024 * 1024)
if available_memory > 8192:  # 8GB+
    BATCH_SIZE = 5000
elif available_memory > 4096:  # 4GB+
    BATCH_SIZE = 2000
```

### 2. 동시 처리 구성

```python
# PMDG_AWY_FINAL.py 의 동시성 설정
MAX_WORKERS = 50  # 최대 동시 스레드 수

# CPU 코어 수에 따라 조정
import multiprocessing
cpu_count = multiprocessing.cpu_count()
MAX_WORKERS = min(50, cpu_count * 2)
```

### 3. 데이터베이스 최적화 설정

```python
# SQLite 성능 최적화 설정
DATABASE_PRAGMAS = {
    'journal_mode': 'DELETE',    # 호환 모드
    'synchronous': 'FULL',       # 완전 동기화
    'foreign_keys': 'ON',        # 외래 키 제약 조건 활성화
    'cache_size': 10000,         # 캐시 페이지 수
    'temp_store': 'MEMORY'       # 임시 테이블을 메모리에 저장
}
```

## 🗺️ 지리 좌표계 구성

### 1. 좌표 형식 변환

Nav-data는 다양한 좌표 형식 변환을 지원합니다.

```python
# DMS (도분초) 형식 변환 구성
DMS_FORMATS = {
    'latitude': 'NDDMMSS.ss',   # 예: N390308.00
    'longitude': 'EDDDMMSS.ss'  # 예: E1162930.00
}

# 정확도 구성
COORDINATE_PRECISION = 8  # 소수점 이하 자릿수
```

### 2. 자기 편차 계산 구성

```python
# 자기 편차 모델 구성
MAGNETIC_MODEL = {
    'coefficients_file': 'wmm/WMMHR_2025.COF',
    'high_resolution': True,
    'epoch': 2025.0
}
```

## 📊 데이터 유효성 검사 구성

### 1. 데이터 품질 검사

```python
# 데이터 유효성 검사 구성
VALIDATION_CONFIG = {
    'check_duplicates': True,
    'validate_coordinates': True,
    'check_icao_codes': True,
    'verify_references': True,
    'generate_reports': True
}

# ICAO 코드 유효성 검사
VALID_ICAO_PATTERN = r'^Z[BGJLHUPYW][A-Z]{2}$'

# 좌표 범위 유효성 검사 (중국 지역)
COORDINATE_BOUNDS = {
    'latitude': {'min': 15.0, 'max': 55.0},   # 북위 15°~55°
    'longitude': {'min': 70.0, 'max': 140.0}  # 동경 70°~140°
}
```

### 2. 오류 처리 구성

```python
# 오류 처리 전략
ERROR_HANDLING = {
    'missing_data': 'log',      # log | skip | raise
    'invalid_coordinates': 'skip',
    'duplicate_records': 'log',
    'reference_not_found': 'log'
}
```

## 🔍 디버깅 구성

### 1. 로그 레벨 설정

```python
# 로그 구성
LOGGING_CONFIG = {
    'level': 'INFO',            # DEBUG | INFO | WARNING | ERROR
    'format': '%(asctime)s - %(levelname)s - %(message)s',
    'file_size_mb': 10,         # 단일 로그 파일 크기
    'backup_count': 5,          # 보관할 백업 파일 수
    'encoding': 'utf-8'
}
```

### 2. 진행률 표시 구성

```python
# 진행률 표시줄 구성
PROGRESS_CONFIG = {
    'enable_progress_bar': True,
    'update_interval': 100,     # 업데이트 간격 (기록 수)
    'show_eta': True,           # 예상 완료 시간 표시
    'show_rate': True           # 처리 속도 표시
}
```

## ✅ 구성 유효성 검사

구성의 정확성을 확인하기 위해 구성 유효성 검사 스크립트를 생성합니다.

```python
# scripts/validate_config.py
import os
import sys
from config.paths import *

def validate_config():
    """구성 파일의 무결성과 정확성을 검증합니다."""
    
    print("🔍 구성 파일 검증 중...")
    
    # 필수 디렉터리 확인
    required_dirs = [DATA_DIR, INPUT_DIR, OUTPUT_DIR, LOGS_DIR]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ 누락된 디렉터리: {dir_path}")
            return False
        print(f"✅ 디렉터리 존재: {dir_path}")
    
    # 필수 입력 파일 확인
    required_files = []
    required_files.extend(NAIP_FILES.values())
    required_files.extend(XPLANE_FILES.values())
    required_files.append(AIRPORT_LOOKUP)
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✅ 파일 존재: {os.path.basename(file_path)}")
    
    if missing_files:
        print(f"❌ 필수 파일 누락:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ 구성 유효성 검사 통과!")
    return True

if __name__ == "__main__":
    if not validate_config():
        sys.exit(1)
```

## 📞 구성 문제 해결

### 일반적인 구성 문제

1.  **경로 구분 기호 문제**
    -   Windows: 백슬래시 `\` 또는 원시 문자열 `r'path'` 사용
    -   macOS/Linux: 슬래시 `/` 사용

2.  **파일 인코딩 문제**
    -   CSV 파일: Latin-1 인코딩 사용 확인
    -   DAT 파일: 일반적으로 UTF-8 인코딩

3.  **권한 문제**
    -   모든 구성 경로에 대한 읽기/쓰기 권한 확인
    -   Windows: 관리자 권한이 필요할 수 있음

4.  **경로 길이 제한**
    -   Windows: 총 경로 길이가 260자를 초과하지 않도록 함
    -   상대 경로를 사용하여 길이 단축

---

**다음 단계**: 데이터 변환 프로세스를 실행하는 방법을 알아보려면 [사용 설명서](usage.md)를 읽어보세요.
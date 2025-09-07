# ⚙️ iFly 항법 데이터 변환기 구성 가이드

이 가이드는 iFly 항법 데이터 변환기의 다양한 구성 옵션을 자세히 설명하여, 사용자의 요구사항에 따라 변환 프로세스를 최적화할 수 있도록 돕습니다.

## 🎯 구성 개요

변환기는 다음과 같은 유연한 구성 시스템을 제공합니다:
- **📁 경로 구성** - 입력 및 출력 경로 사용자 지정
- **📊 처리 매개변수** - 데이터 처리 정확도 및 범위 조정
- **⚡ 성능 최적화** - 메모리 및 처리 속도 최적화
- **🔍 검증 옵션** - 데이터 무결성 검증 설정

## 📋 구성 방법

### 1. 대화형 구성 (권장)
```bash
# 변환기를 실행하고, 지시에 따라 구성하십시오.
python main.py
```

### 2. 구성 파일
`config.json` 파일 생성:
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "ifly_path": "/path/to/ifly-aircraft-737max8",
    "terminal_id_start": 1000,
    "coordinate_precision": 8,
    "enable_validation": true
}
```

### 3. 환경 변수
```bash
export IFLY_FENIX_DB="/path/to/nd.db3"
export IFLY_CSV_FILE="/path/to/RTE_SEG.csv"
export IFLY_INSTALL_PATH="/path/to/ifly-aircraft-737max8"
```

## 🔧 핵심 구성 옵션

### 파일 경로 구성

#### Fenix 데이터베이스 경로
**매개변수명**: `fenix_db_path`  
**설명**: Fenix A320 항법 데이터베이스 파일 위치  
**기본값**: 자동 감지  

**일반적인 위치:**
```bash
# Windows
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# 사용자 지정 경로 예시
/Users/username/Documents/Fenix/navdata/nd.db3
```

**검증 방법:**
```python
import sqlite3
def validate_fenix_db(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        required_tables = ['Airports', 'Runways', 'Waypoints', 'Terminals']
        return all(table in tables for table in required_tables)
    except Exception as e:
        print(f"데이터베이스 검증 실패: {e}")
        return False
```

#### NAIP CSV 파일 경로
**매개변수명**: `csv_file_path`  
**설명**: 중국 민항 항로 구간 데이터 파일  
**형식 요구사항**: UTF-8 인코딩 CSV 파일  

**파일 구조 예시:**
```csv
ROUTE_ID,SEQUENCE_NUMBER,WAYPOINT_ID,LATITUDE,LONGITUDE,MAG_VARIATION
A1,1,ZSAM,39.916667,116.383333,7.2
A1,2,VOR01,39.833333,116.500000,7.1
```

**필수 열:**
- `WAYPOINT_ID`: 항로점 식별자
- `LATITUDE`: 위도 (십진도)
- `LONGITUDE`: 경도 (십진도)
- `ROUTE_ID`: 항로 식별자

#### iFly 설치 경로
**매개변수명**: `ifly_path`  
**설명**: iFly 737 MAX 8 설치 디렉터리  
**자동 감지**: 지원  

**감지 순서:**
1. Community 패키지: `Community\ifly-aircraft-737max8\`
2. Official 패키지: `Official\asobo-aircraft-ifly-737max8\`
3. 수동 경로 지정

## ⚙️ 처리 매개변수 구성

### 터미널 절차 ID 범위

#### 시작 ID 설정
**매개변수명**: `terminal_id_start`  
**설명**: 터미널 절차 시작 ID 번호  
**기본값**: `1000`  
**범위**: `1 - 9999`  

**설정 권장사항:**
```python
# 공항 수에 따라 설정
small_airports = 1000   # < 50 개 공항
medium_airports = 2000  # 50-200 개 공항
large_airports = 5000   # > 200 개 공항
```

#### ID 할당 전략
```python
def calculate_terminal_ids(airport_count, start_id=1000):
    """터미널 절차 ID 할당 계산"""
    # 각 공항에 20개 ID 할당
    id_per_airport = 20
    total_ids_needed = airport_count * id_per_airport

    if start_id + total_ids_needed > 9999:
        print("⚠️ 경고: ID 범위가 부족할 수 있습니다.")
        return start_id, 9999

    return start_id, start_id + total_ids_needed
```

### 좌표 정확도 구성

#### 정확도 설정
**매개변수명**: `coordinate_precision`  
**설명**: 좌표 소수점 자릿수  
**기본값**: `8`  
**범위**: `4 - 12`  

**정확도 비교:**
| 정확도 | 오차 범위 | 적용 시나리오 |
|------|----------|----------|
| 4 자리 | ~11 미터 | 기본 항법 |
| 6 자리 | ~1.1 미터 | 표준 항법 |
| 8 자리 | ~1.1 센티미터 | 고정밀 항법 |
| 10 자리 | ~1.1 밀리미터 | 초고정밀 |

**설정 예시:**
```python
# 다른 정확도의 좌표 예시
coord_4 = 39.9167  # 4 자리 정확도
coord_6 = 39.916667  # 6 자리 정확도
coord_8 = 39.91666700  # 8 자리 정확도
```

### 자편각 계산 구성

#### WMM 모델 매개변수
**모델 버전**: WMM-2025  
**업데이트 주기**: 매 5년  
**계산 정확도**: 0.1 도  

**계산 매개변수:**
```python
{
    "model_year": 2025,
    "altitude": 0,  # 해수면 고도 (미터)
    "calculation_date": "auto",  # 현재 날짜 자동 사용
    "use_local_time": true  # 현지 시간 사용
}
```

#### 자편각 검증
```python
def validate_magnetic_declination(declination):
    """자편각 값의 합리성 검증"""
    # 전 세계 자편각 범위는 약 -30° 에서 +30° 입니다.
    if -30.0 <= declination <= 30.0:
        return True
    else:
        print(f"⚠️ 비정상 자편각 값: {declination}°")
        return False
```

## 🚀 성능 최적화 구성

### 메모리 관리

#### 배치 처리 크기
**매개변수명**: `batch_size`  
**설명**: 단일 배치 처리의 기록 수  
**기본값**: `1000`  
**권장 설정:**

```python
# 사용 가능한 메모리에 따라 조정
import psutil

def get_optimal_batch_size():
    available_memory = psutil.virtual_memory().available
    memory_gb = available_memory / (1024**3)

    if memory_gb < 4:
        return 500   # 4GB 이하
    elif memory_gb < 8:
        return 1000  # 4-8GB
    else:
        return 2000  # 8GB 이상
```

#### 메모리 모니터링
```python
def monitor_memory_usage():
    """메모리 사용량 모니터링"""
    import psutil
    memory = psutil.virtual_memory()
    print(f"메모리 사용률: {memory.percent}%")
    print(f"사용 가능한 메모리: {memory.available / (1024**2):.1f} MB")
```

### 동시 처리 구성

#### 스레드 수 설정
**매개변수명**: `max_workers`  
**설명**: 최대 동시 스레드 수  
**기본값**: CPU 코어 수  

**설정 전략:**
```python
import os

def get_optimal_workers():
    cpu_count = os.cpu_count()

    # 시스템을 위해 하나의 코어 예약
    if cpu_count <= 2:
        return 1
    elif cpu_count <= 4:
        return cpu_count - 1
    else:
        return min(cpu_count - 2, 8)  # 최대 8개의 스레드
```

#### I/O 최적화
```python
{
    "use_ssd_optimization": true,    # SSD 최적화
    "buffer_size": 8192,            # 버퍼 크기 (바이트)
    "enable_compression": false,     # 임시 파일 압축
    "temp_dir": "/tmp"              # 임시 디렉터리
}
```

## 🔍 검증 및 품질 관리

### 데이터 검증 구성

#### 검증 수준
**매개변수명**: `validation_level`  
**설명**: 데이터 검증 강도  
**옵션**: `basic`, `standard`, `strict`  

**검증 내용:**
```python
validation_levels = {
    "basic": [
        "file_existence", # 파일 존재 여부
        "basic_format_check" # 기본 형식 확인
    ],
    "standard": [
        "file_existence", # 파일 존재 여부
        "format_validation", # 형식 검증
        "coordinate_range_check", # 좌표 범위 확인
        "database_integrity" # 데이터베이스 무결성
    ],
    "strict": [
        "file_existence", # 파일 존재 여부
        "format_validation", # 형식 검증
        "coordinate_range_check", # 좌표 범위 확인
        "database_integrity", # 데이터베이스 무결성
        "data_consistency_check", # 데이터 일관성 확인
        "cross_reference_validation" # 교차 참조 검증
    ]
}
```

#### 오류 처리 전략
**매개변수명**: `error_handling`  
**옵션**: `stop`, `skip`, `fix`  

```python
error_strategies = {
    "stop": "오류 발생 시 즉시 중지",
    "skip": "오류 기록 건너뛰고 계속 처리",
    "fix": "오류 자동 수정 시도"
}
```

### 출력 품질 관리

#### 파일 명명 규칙
```python
output_naming = {
    "use_timestamp": true,          # 타임스탬프 사용
    "include_version": true,        # 버전 번호 포함
    "airac_suffix": true,          # AIRAC 접미사 추가
    "backup_original": true        # 원본 파일 백업
}

# 생성된 파일 이름 예시:
# WPNAVRTE_2024-12-15_v2.0_2508.txt
# FMC_Ident_2024-12-15_v2.0_2508.txt
```

## 📅 AIRAC 주기 구성

### 자동 계산 설정
**매개변수명**: `airac_auto_calculate`  
**기본값**: `true`  
**시간대**: UTC+8 (베이징 시간)  

```python
airac_config = {
    "auto_calculate": true, # 자동 계산
    "timezone": "Asia/Shanghai", # 시간대
    "reference_date": "2024-01-11",  # AIRAC 2401 시작 날짜
    "cycle_days": 28,                # 표준 주기 일수
    "format": "YYWW"                # 형식: 연년주주
}
```

### 수동 설정
```python
# AIRAC 주기 수동 지정
manual_airac = {
    "cycle": "2508",
    "effective_date": "2025-02-20",
    "expiry_date": "2025-03-19"
}
```

## 🎛️ 고급 구성

### 로깅 구성
```python
logging_config = {
    "level": "INFO",               # DEBUG, INFO, WARNING, ERROR
    "file": "converter.log",       # 로그 파일명
    "max_size": "10MB",           # 최대 파일 크기
    "backup_count": 3,            # 백업 파일 수량
    "format": "%(asctime)s - %(levelname)s - %(message)s"
}
```

### UI 구성
```python
ui_config = {
    "theme": "dark",              # 테마: dark, light, auto
    "progress_style": "bar",      # 진행률 표시줄 스타일: bar, spinner
    "color_scheme": "rich",       # 색상 구성표
    "show_details": true,         # 세부 정보 표시
    "animation": true            # 애니메이션 효과 활성화
}
```

### 디버그 구성
```python
debug_config = {
    "enable_debug": false,        # 디버그 모드 활성화
    "save_intermediate": false,   # 중간 결과 저장
    "verbose_logging": false,     # 자세한 로깅
    "performance_profiling": false, # 성능 프로파일링
    "memory_tracking": false     # 메모리 추적
}
```

## 📝 구성 파일 템플릿

### 전체 구성 예시
```json
{
    "paths": {
        "fenix_db_path": "auto_detect",
        "csv_file_path": "./data/RTE_SEG.csv",
        "ifly_path": "auto_detect",
        "output_backup_dir": "./backup"
    },
    "processing": {
        "terminal_id_start": 1000,
        "coordinate_precision": 8,
        "batch_size": 1000,
        "max_workers": 4
    },
    "magnetic": {
        "model_year": 2025,
        "altitude": 0,
        "use_local_time": true
    },
    "airac": {
        "auto_calculate": true,
        "timezone": "Asia/Shanghai",
        "format": "YYWW"
    },
    "validation": {
        "validation_level": "standard",
        "error_handling": "skip",
        "enable_validation": true
    },
    "output": {
        "use_timestamp": true,
        "include_version": true,
        "airac_suffix": true,
        "backup_original": true
    },
    "logging": {
        "level": "INFO",
        "file": "converter.log",
        "max_size": "10MB",
        "backup_count": 3
    },
    "ui": {
        "theme": "dark",
        "progress_style": "bar",
        "show_details": true,
        "animation": true
    }
}
```

### 최소 구성 예시
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "terminal_id_start": 1000
}
```

## 🛠️ 구성 도구

### 구성 검증 스크립트
```python
def validate_config(config_path):
    """구성 파일 유효성 검증"""
    import json
    import jsonschema

    # 구성 스키마
    schema = {
        "type": "object",
        "properties": {
            "fenix_db_path": {"type": "string"},
            "csv_file_path": {"type": "string"},
            "terminal_id_start": {"type": "integer", "minimum": 1, "maximum": 9999}
        },
        "required": ["fenix_db_path", "csv_file_path"]
    }

    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)

        jsonschema.validate(config, schema)
        print("✅ 구성 검증 통과")
        return True
    except Exception as e:
        print(f"❌ 구성 검증 실패: {e}")
        return False
```

### 구성 생성기
```python
def generate_config_template():
    """구성 템플릿 생성"""
    template = {
        "fenix_db_path": "Fenix 데이터베이스 경로를 입력하십시오.",
        "csv_file_path": "CSV 파일 경로를 입력하십시오.",
        "ifly_path": "auto_detect",
        "terminal_id_start": 1000,
        "coordinate_precision": 8
    }

    with open('config_template.json', 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)

    print("구성 템플릿이 생성되었습니다: config_template.json")
```

---

**다음 단계**: 구성이 완료되면 [사용 설명서](usage.md)를 확인하여 첫 데이터 변환을 시작하십시오! 🚀

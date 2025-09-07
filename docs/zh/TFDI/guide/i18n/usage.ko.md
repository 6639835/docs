# 🚀 TFDI 항법 데이터 변환기 사용 가이드

본 가이드는 TFDI 항법 데이터 변환기를 사용하는 방법(기본 작업부터 고급 기능까지)을 자세히 설명하여 Fenix에서 TFDI로의 항법 데이터 변환을 순조롭게 완료할 수 있도록 돕습니다.

## 🎯 사용 전 준비사항

### 1. 환경 확인 체크리스트

변환을 시작하기 전에 다음 환경 요구 사항을 확인하십시오:

- ✅ **Python 환경**: 3.8+ 설치 및 구성 완료
- ✅ **종속성 패키지**: rich, pandas, py7zr 설치 완료
- ✅ **시스템 리소스**: 최소 4GB RAM, 1GB 사용 가능한 디스크 공간
- ✅ **Fenix 데이터베이스**: nd.db3 파일 준비 완료
- ✅ **TFDI MD-11**: Microsoft Flight Simulator에 설치 완료

### 2. 파일 준비

#### Fenix 데이터베이스 위치
```bash
# Windows 일반 경로
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# 파일 존재 확인
python -c "import pathlib; print('데이터베이스 존재함' if pathlib.Path('nd.db3').exists() else '데이터베이스 없음')"
```

#### 파일 무결성 검사
```python
import sqlite3
import os

def check_database_file(db_path):
    """데이터베이스 파일 무결성 검사"""
    print(f"🔍 데이터베이스 검사: {db_path}")
    
    # 파일 존재 확인
    if not os.path.exists(db_path):
        print("❌ 파일이 존재하지 않습니다")
        return False
    
    # 파일 크기 확인
    size_mb = os.path.getsize(db_path) / (1024 * 1024)
    print(f"📁 파일 크기: {size_mb:.1f} MB")
    
    if size_mb < 10:
        print("⚠️ 파일이 너무 작을 수 있습니다")
    
    # 데이터베이스 연결 확인
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        conn.close()
        
        print(f"✅ {len(tables)}개 테이블 포함")
        return True
        
    except sqlite3.Error as e:
        print(f"❌ 데이터베이스 오류: {e}")
        return False

# 사용 예시
check_database_file("path/to/nd.db3")
```

## 🖥️ 대화형 사용

### 변환기 시작

```bash
# 기본 시작
python Fenix2TFDINavDataConverter.py

# 디버그 정보와 함께 시작
python Fenix2TFDINavDataConverter.py --debug

# 도움말 정보 보기
python Fenix2TFDINavDataConverter.py --help
```

### 시작 화면

변환기가 시작되면 전문적인 시작 화면이 나타납니다:

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║           Fenix to TFDI Navigation Data Converter            ║
║     Converting Fenix navigation databases to TFDI-compatible ║
║                        JSON format                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

🔍 환경 확인 중...
✅ Python 3.9.16
✅ Rich 12.6.0
✅ Pandas 1.5.3
✅ py7zr 0.20.2
✅ 시스템 메모리: 16 GB
✅ 사용 가능한 디스크: 128 GB

🚀 변환 시작 준비 중...
```

## 📋 변환 프로세스 상세 설명

### 첫 번째 단계: 데이터베이스 파일 선택

```
╭─────────────────────────────────────── 📂 데이터베이스 파일 선택 ───────────────────────────────────────╮
│                                                                                                │
│ Fenix 항법 데이터베이스 파일 경로를 입력하십시오:                                                               │
│                                                                                                │
│ 💡 팁: 파일을 터미널로 직접 드래그하거나 전체 경로를 입력할 수 있습니다                                                 │
│                                                                                                │
│ 일반적인 위치:                                                                                      │
│ • %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\...\navdata\nd.db3              │
│                                                                                                │
╰────────────────────────────────────────────────────────────────────────────────────────────────╯

파일 경로를 입력하십시오: 
```

**입력 방식:**
```bash
# 방식 1: 직접 경로 입력
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# 방식 2: 파일을 터미널 창으로 드래그
# (시스템이 자동으로 경로를 채웁니다)

# 방식 3: 상대 경로 사용 (파일이 현재 디렉터리에 있는 경우)
./nd.db3
```

### 두 번째 단계: 데이터베이스 검증

```
╭─────────────────────────────────────── 🔍 데이터베이스 검증 ─────────────────────────────────────────╮
│                                                                                              │
│ 데이터베이스 파일 검증 중...                                                                        │
│                                                                                              │
│ ✅ 파일 존재: nd.db3 (142.5 MB)                                                               │
│ ✅ 데이터베이스 형식: SQLite 3.x                                                                    │
│ ✅ 인코딩 형식: UTF-8                                                                           │
│                                                                                              │
│ 🔍 데이터베이스 테이블 구조 확인 중...                                                                       │
│ ████████████████████████████████████████ 12/12 (100%)                                      │
│                                                                                              │
│ ✅ 모든 필수 테이블이 존재합니다                                                                          │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

**검증 항목:**
- ✅ 파일 존재 여부 및 읽기 가능 여부
- ✅ SQLite 데이터베이스 형식
- ✅ 필수 테이블 구조 무결성
- ✅ 데이터 인코딩 정확성
- ✅ 외래 키 관계 무결성

### 세 번째 단계: 터미널 ID 구성

```
╭─────────────────────────────────────── ⚙️ 변환 파라미터 구성 ───────────────────────────────────────╮
│                                                                                              │
│ 터미널 절차 시작 ID 설정                                                                          │
│                                                                                              │
│ 💡 설명: 터미널 ID는 TFDI 시스템에서 터미널 절차를 식별하는 데 사용됩니다                                               │
│                                                                                              │
│ 📊 권장 값:                                                                                   │
│ • 소형 데이터셋 (< 50 공항): 1000                                                               │
│ • 중형 데이터셋 (50-200 공항): 2000                                                             │
│ • 대형 데이터셋 (> 200 공항): 5000                                                              │
│                                                                                              │
│ ⚠️ 주의: 기존 TFDI 데이터와의 충돌을 피하십시오                                                            │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯

시작 터미널 ID를 입력하십시오 [기본값: 1000]: 
```

**구성 고려 사항:**
```python
def calculate_terminal_id_range(airport_count, start_id=1000):
    """터미널 ID 범위 계산"""
    # 각 공항에 예약된 ID 수
    ids_per_airport = 20
    
    # 필요한 총 ID 수 계산
    total_ids_needed = airport_count * ids_per_airport
    
    # 버퍼 추가 (20%)
    buffer = int(total_ids_needed * 0.2)
    total_with_buffer = total_ids_needed + buffer
    
    end_id = start_id + total_with_buffer
    
    print(f"📊 ID 할당 예측:")
    print(f"   공항 수: {airport_count}")
    print(f"   시작 ID: {start_id}")
    print(f"   종료 ID: {end_id}")
    print(f"   사용 가능 범위: {total_with_buffer}개 ID")
    
    return start_id, end_id
```

### 네 번째 단계: 변환 확인

```
┌─────────────────────────────────────── ✅ 변환 구성 확인 ───────────────────────────────────────┐
│                                                                                             │
│ 📂 입력 파일                                                                                  │
│ └─ 데이터베이스: nd.db3 (142.5 MB)                                                                │
│                                                                                             │
│ 📁 출력 구성                                                                                  │
│ ├─ 출력 디렉터리: Primary/                                                                        │
│ ├─ 절차 레그 디렉터리: Primary/ProcedureLegs/                                                        │
│ └─ 압축 파일: Primary.7z                                                                       │
│                                                                                             │
│ ⚙️ 변환 파라미터                                                                                  │
│ ├─ 시작 터미널 ID: 1000                                                                        │
│ ├─ 좌표 정밀도: 소수점 이하 8자리                                                                        │
│ ├─ VNAV 임계값: 2.5°                                                                          │
│ └─ FAF 감지: 활성화됨                                                                           │
│                                                                                             │
│ 📊 예상 처리                                                                                  │
│ ├─ 테이블 수: 12개                                                                          │
│ ├─ 예상 기록 수: ~156,000개                                                                    │
│ ├─ 예상 시간: 5-8분                                                                       │
│ └─ 출력 크기: ~15-25 MB                                                                      │
│                                                                                             │
└─────────────────────────────────────────────────────────────────────────────────────────────┘

변환을 시작하시겠습니까? [Y/n]: 
```

## 🔄 변환 과정 모니터링

### 데이터베이스 연결 및 최적화

```
╭─────────────────────────────────────── 🔗 데이터베이스 연결 ─────────────────────────────────────────╮
│                                                                                              │
│ 데이터베이스에 연결 중...                                                                            │
│                                                                                              │
│ 🔧 SQLite 최적화 설정 적용:                                                                     │
│ ├─ journal_mode = WAL                                                                        │
│ ├─ synchronous = NORMAL                                                                      │
│ ├─ cache_size = 10000                                                                        │
│ ├─ temp_store = MEMORY                                                                       │
│ └─ mmap_size = 256MB                                                                         │
│                                                                                              │
│ ✅ 데이터베이스 연결 성공, 성능 최적화 활성화됨                                                            │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 표준 데이터 테이블 처리

```
╭─────────────────────────────────────── 📊 표준 데이터 테이블 내보내기 ────────────────────────────────────────╮
│                                                                                               │
│ 표준 데이터 테이블 처리 중...                                                                         │
│                                                                                               │
│ ████████████████████████████████████████ 8/11 (73%) ⏱️ 0:03:42                             │
│                                                                                               │
│ 📋 완료됨:                                                                                    │
│ ✅ AirportLookup     (2,456개 기록) → AirportLookup.json     (156 KB)                       │
│ ✅ Airports          (15,234개 기록) → Airports.json          (2.3 MB)                       │
│ ✅ Runways          (28,456개 기록) → Runways.json           (3.1 MB)                        │
│ ✅ Waypoints        (89,123개 기록) → Waypoints.json         (8.7 MB)                        │
│ ✅ WaypointLookup   (89,123개 기록) → WaypointLookup.json    (4.2 MB)                       │
│ ✅ Navaids         (12,345개 기록) → Navaids.json           (1.8 MB)                         │
│ ✅ NavaidLookup     (12,345개 기록) → NavaidLookup.json     (685 KB)                         │
│ ✅ Airways          (1,234개 기록) → Airways.json            (145 KB)                        │
│                                                                                               │
│ 🔄 현재 처리 중: AirwayLegs → 항로 레그 데이터 변환                                                      │
│                                                                                               │
╰───────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 터미널 절차 처리

```
╭─────────────────────────────────────── 🎯 터미널 절차 처리 ───────────────────────────────────────╮
│                                                                                              │
│ 터미널 절차 데이터 처리 중...                                                                      │
│                                                                                              │
│ ████████████████████████████████████████ 245/350 (70%) ⏱️ 0:02:18                         │
│                                                                                              │
│ 📊 처리 통계:                                                                                 │
│ ├─ 공항 수: 145개                                                                          │
│ ├─ 터미널 절차: 245개                                                                          │
│ ├─ SID 절차: 89개                                                                           │
│ ├─ STAR 절차: 76개                                                                          │
│ ├─ APP 절차: 80개                                                                           │
│ └─ FAF 지점 감지: 234개                                                                        │
│                                                                                              │
│ 🔄 현재 처리 중: ZBAA (베이징 서우두) → SHUAY1A SID                                                   │
│ 📁 출력: ProcedureLegs/TermID_1245.json                                                     │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 데이터 검증

```
╭─────────────────────────────────────── 🔍 데이터 검증 ───────────────────────────────────────────╮
│                                                                                              │
│ 변환 결과 검증 중...                                                                          │
│                                                                                              │
│ ████████████████████████████████████████ 11/11 (100%) ⏱️ 0:00:45                          │
│                                                                                              │
│ ✅ JSON 형식 검증                                                                             │
│ ├─ 모든 파일 형식이 올바릅니다                                                                          │
│ ├─ 문자 인코딩: UTF-8                                                                          │
│ └─ 구문 검사 통과                                                                              │
│                                                                                              │
│ ✅ 데이터 무결성 검증                                                                            │
│ ├─ 좌표 범위 검사: 통과                                                                        │
│ ├─ 외래 키 관계 검사: 통과                                                                        │
│ ├─ 중복 데이터 검사: 중복 항목 3개 발견 (제거됨)                                                    │
│ └─ 비즈니스 규칙 검사: 통과                                                                        │
│                                                                                              │
│ ✅ FAF 지점 검증                                                                                │
│ ├─ FAF 지점 234개 감지됨                                                                     │
│ ├─ VNAV 각도 검증: 통과                                                                       │
│ └─ 접근 절차 연관성: 통과                                                                        │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

### 파일 압축 및 패키징

```
╭─────────────────────────────────────── 📦 압축 파일 생성 ─────────────────────────────────────────╮
│                                                                                              │
│ 7z 압축 파일 생성 중...                                                                        │
│                                                                                              │
│ 🗜️ 압축 설정:                                                                                │
│ ├─ 알고리즘: LZMA2                                                                              │
│ ├─ 레벨: 5 (표준)                                                                           │
│ ├─ 솔리드: 활성화됨                                                                               │
│ └─ 멀티스레드: 활성화됨                                                                             │
│                                                                                              │
│ ████████████████████████████████████████ 22.4/22.4 MB (100%) ⏱️ 0:01:23                   │
│                                                                                              │
│ ✅ 압축 완료: Primary.7z                                                                     │
│ 📊 압축 통계:                                                                                │
│ ├─ 원본 크기: 22.4 MB                                                                        │
│ ├─ 압축 후: 15.6 MB                                                                          │
│ ├─ 압축률: 69.6%                                                                            │
│ └─ 파일 수: 145개                                                                         │
│                                                                                              │
╰──────────────────────────────────────────────────────────────────────────────────────────────╯
```

## ✅ 변환 완료

### 성공 요약

```
╔══════════════════════════════════════════════════════════════╗
║                          변환 성공                           ║
║                                                              ║
║  ✓ 데이터 변환 성공적으로 완료!                                        ║
║                                                              ║
║  📊 처리 통계:                                                ║
║  • 내보낸 테이블: 11개                                          ║
║  • 처리된 기록: 156,789개                                      ║
║  • 터미널 절차: 350개                                         ║
║  • FAF 지점: 234개                                           ║
║  • 공항 수: 145개                                         ║
║                                                              ║
║  📁 출력 파일: Primary.7z (15.6 MB)                          ║
║  🕒 총 소요 시간: 6분 32초                                       ║
║                                                              ║
║  TFDI MD-11에서 이 파일을 사용하여 항법할 수 있습니다.                    ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

📋 생성된 파일 목록:
┌─────────────────────────────────────────┬─────────────┬─────────────┐
│ 파일 이름                                  │ 크기        │ 기록 수      │
├─────────────────────────────────────────┼─────────────┼─────────────┤
│ Primary.7z                              │ 15.6 MB     │ -           │
│ ├─ AirportLookup.json                   │ 156 KB      │ 2,456       │
│ ├─ Airports.json                        │ 2.3 MB      │ 15,234      │
│ ├─ AirwayLegs.json                      │ 4.2 MB      │ 23,456      │
│ ├─ Airways.json                         │ 145 KB      │ 1,234       │
│ ├─ Ilses.json                           │ 892 KB      │ 5,678       │
│ ├─ NavaidLookup.json                    │ 685 KB      │ 12,345      │
│ ├─ Navaids.json                         │ 1.8 MB      │ 12,345      │
│ ├─ Runways.json                         │ 3.1 MB      │ 28,456      │
│ ├─ Terminals.json                       │ 1.2 MB      │ 8,945       │
│ ├─ WaypointLookup.json                  │ 4.2 MB      │ 89,123      │
│ ├─ Waypoints.json                       │ 8.7 MB      │ 89,123      │
│ └─ ProcedureLegs/ (145개 절차 파일)       │ 2.1 MB      │ 12,340      │
└─────────────────────────────────────────┴─────────────┴─────────────┘

🔄 다음 단계 제안:
1. Primary.7z 파일 압축 해제
2. JSON 파일을 TFDI MD-11 항법 데이터 디렉터리에 설치
3. 시뮬레이터에서 항법 기능 테스트
4. 복구를 위해 원본 파일 백업

📝 사용 설명:
• 압축 파일 내용을 TFDI MD-11 항법 데이터 디렉터리에 복사
• Microsoft Flight Simulator 재시작
• TFDI MD-11에서 새 항법 데이터 확인
```

## 💻 프로그래밍 방식 사용

### 기본 사용 예시

```python
from Fenix2TFDINavDataConverter import FenixToTFDIConverter, ConverterConfig

# 구성 생성
config = ConverterConfig(
    output_dir="TFDI_NavData",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# 변환기 초기화
converter = FenixToTFDIConverter(config)

# 변환 실행
try:
    result = converter.convert(
        database_path="path/to/fenix_navdata.db3",
        start_terminal_id=1000
    )
    
    if result.success:
        print(f"✅ 변환 성공!")
        print(f"📁 출력 파일: {result.output_archive}")
        print(f"📊 처리 기록: {result.total_records}")
        print(f"⏱️ 소요 시간: {result.duration:.2f} 초")
    else:
        print(f"❌ 변환 실패: {result.error_message}")
        
except Exception as e:
    print(f"💥 변환 과정에서 예외 발생: {e}")
```

### 고급 구성 예시

```python
# 사용자 지정 구성
custom_config = ConverterConfig(
    output_dir="Custom_Output",
    procedure_legs_dir="Custom_Output/Procedures",
    archive_name="TFDI_MD11_NavData_20241224.7z",
    coordinate_precision=10,        # 고정밀 좌표
    vnav_threshold=2.0              # 엄격한 FAF 감지
)

# 콜백을 사용한 변환
def progress_callback(step, progress, message):
    """변환 진행 콜백 함수"""
    print(f"[{step}] {progress:.1f}% - {message}")

def validation_callback(validation_type, result, details):
    """검증 결과 콜백 함수"""
    status = "✅" if result else "❌"
    print(f"{status} {validation_type}: {details}")

converter = FenixToTFDIConverter(
    config=custom_config,
    progress_callback=progress_callback,
    validation_callback=validation_callback
)

result = converter.convert(
    database_path="fenix_navdata.db3",
    start_terminal_id=2000,
    validate_output=True,          # 출력 검증 활성화
    cleanup_temp_files=True        # 임시 파일 정리
)
```

### 일괄 처리 예시

```python
import os
from pathlib import Path

def batch_convert_databases():
    """여러 데이터베이스 일괄 변환"""
    
    database_files = [
        "fenix_navdata_2508.db3",
        "fenix_navdata_2509.db3", 
        "fenix_navdata_2510.db3"
    ]
    
    base_config = ConverterConfig(coordinate_precision=8)
    
    for i, db_file in enumerate(database_files):
        print(f"\n🔄 데이터베이스 처리 중 {i+1}/{len(database_files)}: {db_file}")
        
        # 각 데이터베이스에 대해 독립적인 출력 디렉터리 생성
        airac_cycle = db_file.split('_')[-1].replace('.db3', '')
        output_config = ConverterConfig(
            output_dir=f"TFDI_NavData_{airac_cycle}",
            archive_name=f"TFDI_MD11_{airac_cycle}.7z",
            coordinate_precision=base_config.coordinate_precision,
            vnav_threshold=base_config.vnav_threshold
        )
        
        converter = FenixToTFDIConverter(output_config)
        
        try:
            result = converter.convert(
                database_path=db_file,
                start_terminal_id=1000 + (i * 1000)  # ID 충돌 방지
            )
            
            if result.success:
                print(f"✅ {db_file} 변환 성공")
            else:
                print(f"❌ {db_file} 변환 실패: {result.error_message}")
                
        except Exception as e:
            print(f"💥 {db_file} 처리 중 예외 발생: {e}")

# 일괄 변환 실행
batch_convert_databases()
```

## 🧪 검증 및 테스트

### 출력 파일 검증

```python
def verify_conversion_output(archive_path):
    """변환 출력 검증"""
    import py7zr
    import json
    
    print(f"🔍 압축 파일 검증: {archive_path}")
    
    try:
        # 압축 파일 무결성 검증
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            file_list = archive.getnames()
            
        print(f"✅ 압축 파일에 {len(file_list)}개 파일 포함")
        
        # 필수 파일 검증
        required_files = [
            "Airports.json", "Runways.json", "Waypoints.json",
            "Navaids.json", "Airways.json", "AirwayLegs.json",
            "Terminals.json", "ILSes.json"
        ]
        
        missing_files = []
        for required_file in required_files:
            if required_file not in file_list:
                missing_files.append(required_file)
        
        if missing_files:
            print(f"❌ 필수 파일 누락: {missing_files}")
            return False
        else:
            print("✅ 모든 필수 파일이 존재합니다")
        
        # JSON 형식 검증
        with py7zr.SevenZipFile(archive_path, 'r') as archive:
            for file_name in required_files:
                try:
                    file_data = archive.read([file_name])
                    json_content = json.loads(file_data[file_name].read())
                    print(f"✅ {file_name}: JSON 형식이 유효합니다")
                except json.JSONDecodeError as e:
                    print(f"❌ {file_name}: JSON 형식 오류 - {e}")
                    return False
        
        print("🎉 출력 파일 검증 통과!")
        return True
        
    except Exception as e:
        print(f"❌ 검증 실패: {e}")
        return False

# 사용 예시
verify_conversion_output("Primary.7z")
```

### TFDI 호환성 테스트

```python
def test_tfdi_compatibility(json_file_path):
    """TFDI 호환성 테스트"""
    import json
    
    print(f"🧪 TFDI 호환성 테스트: {json_file_path}")
    
    try:
        with open(json_file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        # 데이터 구조 확인
        if isinstance(data, dict):
            print(f"✅ 데이터 구조: 딕셔너리 ({len(data)}개 항목)")
            
            # 좌표 형식 확인 (Waypoints 예시)
            if "Waypoints" in json_file_path or any(key for key in data.keys() if "latitude" in str(data[key]).lower()):
                coord_issues = []
                for key, value in list(data.items())[:5]:  # 상위 5개 항목 확인
                    if isinstance(value, dict):
                        if "Latitude" in value and "Longitude" in value:
                            lat = value["Latitude"]
                            lon = value["Longitude"]
                            
                            if not (-90 <= lat <= 90):
                                coord_issues.append(f"{key}: 위도 범위 초과 ({lat})")
                            if not (-180 <= lon <= 180):
                                coord_issues.append(f"{key}: 경도 범위 초과 ({lon})")
                
                if coord_issues:
                    print(f"⚠️ 좌표 문제: {coord_issues}")
                else:
                    print("✅ 좌표 형식 검사 통과")
        
        elif isinstance(data, list):
            print(f"✅ 데이터 구조: 목록 ({len(data)}개 요소)")
        
        else:
            print(f"⚠️ 알 수 없는 데이터 구조: {type(data)}")
        
        print("✅ TFDI 호환성 테스트 통과")
        return True
        
    except Exception as e:
        print(f"❌ 호환성 테스트 실패: {e}")
        return False

# 모든 출력 파일 테스트
output_files = [
    "Primary/Airports.json",
    "Primary/Waypoints.json", 
    "Primary/Navaids.json"
]

for file_path in output_files:
    test_tfdi_compatibility(file_path)
```

## ⚠️ 주의사항 및 모범 사례

### 중요 알림

1.  **데이터 백업**: 변환 전에 원본 Fenix 데이터 및 TFDI 데이터를 백업하십시오
2.  **버전 호환성**: Fenix, TFDI 및 변환기 버전이 호환되는지 확인하십시오
3.  **시스템 리소스**: 대규모 데이터베이스 변환에는 충분한 메모리와 디스크 공간이 필요합니다
4.  **권한 확인**: 충분한 파일 읽기/쓰기 권한이 있는지 확인하십시오

### 성능 최적화 제안

```python
# 시스템 최적화 확인
def check_system_optimization():
    """시스템 최적화 상태 확인"""
    import psutil
    
    print("🔧 시스템 최적화 확인:")
    
    # 메모리 확인
    memory = psutil.virtual_memory()
    if memory.available < 4 * 1024**3:  # 4GB
        print("⚠️ 사용 가능한 메모리가 부족합니다. 다른 프로그램을 닫는 것을 권장합니다")
    else:
        print("✅ 메모리 충분")
    
    # 디스크 유형 확인
    disk_info = psutil.disk_usage('.')
    print(f"💿 디스크 사용 가능 공간: {disk_info.free // 1024**3} GB")
    
    # CPU 확인
    cpu_count = psutil.cpu_count()
    print(f"🖥️ CPU 코어 수: {cpu_count}")
    
    if cpu_count >= 4:
        print("✅ 멀티스레드 처리 활성화를 권장합니다")
    else:
        print("⚠️ 단일 코어 처리이므로 변환이 느릴 수 있습니다")

check_system_optimization()
```

### 문제 해결 체크리스트

- [ ] ✅ Python 버전 ≥ 3.8
- [ ] ✅ 모든 종속성 패키지 설치 완료
- [ ] ✅ Fenix 데이터베이스 파일이 완전하고 읽기 가능
- [ ] ✅ 충분한 사용 가능 메모리 (4GB+)
- [ ] ✅ 충분한 디스크 공간 (1GB+)
- [ ] ✅ 출력 디렉터리에 쓰기 권한이 있음
- [ ] ✅ TFDI MD-11이 올바르게 설치됨

---

**학습을 완료하신 것을 축하드립니다!** 🎉

이제 TFDI 항법 데이터 변환기의 전체 사용 방법을 익히셨습니다. 문제가 발생하면 [문제 해결 가이드](../troubleshooting.md) 또는 [자주 묻는 질문](../faq.md)을 참조하십시오.

즐거운 비행 되십시오! 🚁✨
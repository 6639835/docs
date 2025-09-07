# 🛠️ TFDI 내비게이션 데이터 변환기 문제 해결

## 🚨 일반적인 오류 및 해결책

### 1. 환경 및 설치 문제

#### ❌ Python 환경 문제

**오류 메시지:**
```
ModuleNotFoundError: No module named 'rich'
ImportError: No module named 'pandas'
```

**해결책:**
```bash
# 1. Python 버전 확인
python --version  # 3.8 이상인지 확인

# 2. pip 업그레이드
python -m pip install --upgrade pip

# 3. 의존성 설치
pip install -r requirements.txt

# 4. 설치 확인
python -c "import rich, pandas; print('의존성 설치 성공')"
```

#### ❌ 권한 오류

**오류 메시지:**
```
PermissionError: [Errno 13] Permission denied
출력 디렉터리를 생성할 수 없습니다.
```

**해결책:**
```bash
# Windows - 관리자 권한으로 실행
# 명령 프롬프트 우클릭 → "관리자 권한으로 실행"

# macOS/Linux - sudo 사용 또는 권한 변경
sudo python converter.py
# 또는
chmod 755 /path/to/output/directory
```

### 2. 데이터베이스 접근 문제

#### ❌ 데이터베이스 파일 없음

**오류 메시지:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
Fenix 데이터베이스 파일을 찾을 수 없습니다.
```

**해결책:**
1.  **Fenix 설치 확인**:
    ```bash
    # 일반적인 경로
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\
    ```

2.  **파일 수동 찾기**:
    ```bash
    # Windows
    dir /s nd.db3
    
    # macOS/Linux
    find ~ -name "nd.db3" 2>/dev/null
    ```

3.  **데이터베이스 재생성**:
    -   MSFS 시작
    -   Fenix A320 로드
    -   내비게이션 데이터 로드 완료 대기

#### ❌ 데이터베이스 손상

**오류 메시지:**
```
sqlite3.DatabaseError: database disk image is malformed
데이터베이스 파일이 손상되었습니다.
```

**진단 방법:**
```python
import sqlite3

def check_database_integrity(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        if result[0] == "ok":
            print("✅ 데이터베이스 무결성 정상")
        else:
            print(f"❌ 데이터베이스 손상: {result[0]}")
    except Exception as e:
        print(f"❌ 데이터베이스에 접근할 수 없음: {e}")
    finally:
        conn.close()
```

**복구 방안:**
```bash
# 1. 손상된 데이터베이스 백업
cp nd.db3 nd.db3.backup

# 2. SQLite 복구 시도
sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3

# 3. 복구 실패 시, 데이터베이스 재획득
# 파일 삭제 후 Fenix 재시작
```

#### ❌ 데이터베이스 테이블 구조 비호환

**오류 메시지:**
```
sqlite3.OperationalError: no such table: Terminals
데이터베이스에 필수 테이블이 없습니다.
```

**검증 스크립트:**
```python
def validate_database_schema(db_path):
    required_tables = [
        'Airports', 'Runways', 'Waypoints', 'Navaids',
        'Airways', 'AirwayLegs', 'Terminals', 'TerminalLegs',
        'ILSes', 'AirportLookup', 'NavaidLookup', 'WaypointLookup'
    ]
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = {row[0] for row in cursor.fetchall()}
    
    missing_tables = set(required_tables) - existing_tables
    if missing_tables:
        print(f"❌ 누락된 테이블: {missing_tables}")
        return False
    
    print("✅ 데이터베이스 구조 검증 통과")
    return True
```

### 3. 메모리 및 성능 문제

#### ❌ 메모리 부족

**오류 메시지:**
```
MemoryError: Unable to allocate array
메모리 부족으로 데이터를 처리할 수 없습니다.
```

**메모리 사용량 모니터링:**
```python
import psutil
import gc

def monitor_memory_usage():
    memory = psutil.virtual_memory()
    print(f"총 메모리: {memory.total // 1024**3} GB")
    print(f"사용된 메모리: {memory.used // 1024**3} GB")
    print(f"사용 가능한 메모리: {memory.available // 1024**3} GB")
    print(f"사용률: {memory.percent}%")

def optimize_memory():
    # 강제 가비지 컬렉션
    gc.collect()
    
    # pandas 캐시 정리
    import pandas as pd
    pd.reset_option('all')
```

**해결책:**
```python
# 1. 배치 처리 크기 감소
config = ConverterConfig(
    batch_size=500,  # 기본 1000에서 감소
    coordinate_precision=6  # 정밀도 낮추기
)

# 2. 스트리밍 활성화
def process_large_table_streaming(table_name):
    chunk_size = 1000
    offset = 0
    
    while True:
        query = f"""
        SELECT * FROM {table_name} 
        LIMIT {chunk_size} OFFSET {offset}
        """
        
        chunk = pd.read_sql_query(query, conn)
        if chunk.empty:
            break
            
        process_chunk(chunk)
        del chunk  # 메모리 해제
        gc.collect()
        
        offset += chunk_size
```

#### ❌ 처리 속도 과도하게 느림

**증상:** 변환 과정이 특정 단계에서 오랫동안 멈춤

**성능 진단:**
```python
import time
import cProfile

def profile_conversion():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # 변환 실행
    converter.convert(db_path, terminal_id)
    
    profiler.disable()
    profiler.dump_stats('conversion_profile.prof')

# 성능 병목 현상 분석
# python -m cProfile -o profile.prof converter.py
# python -c "import pstats; pstats.Stats('profile.prof').sort_stats('cumulative').print_stats(10)"
```

**최적화 제안:**
```python
# 1. SQLite 성능 최적화
def optimize_sqlite_connection(conn):
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA cache_size=10000")
    conn.execute("PRAGMA temp_store=MEMORY")

# 2. 병렬 처리
from concurrent.futures import ThreadPoolExecutor

def parallel_table_processing():
    tables = ['Airports', 'Runways', 'Waypoints', 'Navaids']
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for table in tables:
            future = executor.submit(process_table, table)
            futures.append(future)
        
        # 모든 작업 완료 대기
        for future in futures:
            future.result()
```

### 4. 데이터 변환 문제

#### ❌ 좌표 데이터 이상

**오류 메시지:**
```
ValueError: Invalid coordinate value: latitude=91.5
좌표가 유효 범위를 벗어났습니다.
```

**검증 및 복구:**
```python
def validate_and_fix_coordinates(df):
    """좌표 데이터 검증 및 복구"""
    initial_count = len(df)
    
    # 위도 범위 [-90, 90] 확인
    invalid_lat = (df['Latitude'] < -90) | (df['Latitude'] > 90)
    if invalid_lat.any():
        print(f"발견 {invalid_lat.sum()}개의 유효하지 않은 위도 값을 발견했습니다.")
        df = df[~invalid_lat]
    
    # 경도 범위 [-180, 180] 확인
    invalid_lon = (df['Longitude'] < -180) | (df['Longitude'] > 180)
    if invalid_lon.any():
        print(f"발견 {invalid_lon.sum()}개의 유효하지 않은 경도 값을 발견했습니다.")
        df = df[~invalid_lon]
    
    removed_count = initial_count - len(df)
    if removed_count > 0:
        print(f"⚠️ 유효하지 않은 좌표 기록 {removed_count}개를 제거했습니다.")
    
    return df
```

#### ❌ JSON 직렬화 실패

**오류 메시지:**
```
TypeError: Object of type 'datetime' is not JSON serializable
JSON 직렬화 오류
```

**해결책:**
```python
import json
from datetime import datetime
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """사용자 지정 JSON 인코더"""
    
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# 사용자 지정 인코더 사용
def safe_json_dump(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=CustomJSONEncoder, 
                 ensure_ascii=False, indent=2)
```

#### ❌ 문자 인코딩 문제

**오류 메시지:**
```
UnicodeDecodeError: 'utf-8' codec can't decode byte
문자 인코딩 오류
```

**해결책:**
```python
import chardet

def detect_and_convert_encoding(file_path):
    """파일 인코딩 감지 및 변환"""
    # 인코딩 감지
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        encoding = chardet.detect(raw_data)['encoding']
    
    print(f"감지된 인코딩: {encoding}")
    
    # UTF-8로 변환
    with open(file_path, 'r', encoding=encoding) as f:
        content = f.read()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def safe_string_handling(text):
    """안전한 문자열 처리"""
    if isinstance(text, bytes):
        # 여러 인코딩 시도
        for encoding in ['utf-8', 'gbk', 'latin1']:
            try:
                return text.decode(encoding)
            except UnicodeDecodeError:
                continue
        # 모두 실패하면 오류 처리 사용
        return text.decode('utf-8', errors='replace')
    return str(text)
```

### 5. 출력 파일 문제

#### ❌ 압축 파일 생성 실패

**오류 메시지:**
```
py7zr.exceptions.Bad7zFile: not a 7z file
압축 파일 생성 실패
```

**해결책:**
```python
import py7zr
import shutil
from pathlib import Path

def safe_create_archive(source_dir, archive_path):
    """안전한 압축 파일 생성"""
    try:
        # 원본 디렉터리가 존재하는지 확인
        if not Path(source_dir).exists():
            raise FileNotFoundError(f"원본 디렉터리가 없습니다.: {source_dir}")
        
        # 기존 압축 파일 삭제
        if Path(archive_path).exists():
            Path(archive_path).unlink()
        
        # 압축 파일 생성
        with py7zr.SevenZipFile(archive_path, 'w') as archive:
            archive.writeall(source_dir, ".")
        
        print(f"✅ 압축 파일 생성 성공: {archive_path}")
        return True
        
    except Exception as e:
        print(f"❌ 압축 파일 생성 실패: {e}")
        
        # 대체 방안: ZIP 파일 생성
        try:
            shutil.make_archive(
                str(Path(archive_path).with_suffix('')), 
                'zip', 
                source_dir
            )
            print("✅ ZIP 형식 백업 파일이 생성되었습니다.")
            return True
        except Exception as zip_error:
            print(f"❌ ZIP 생성도 실패했습니다: {zip_error}")
            return False
```

#### ❌ 파일 크기 이상

**증상:** 출력 파일이 너무 작거나 너무 큼

**확인 방법:**
```python
def validate_output_files(output_dir):
    """출력 파일 검증"""
    expected_files = [
        'Airports.json', 'Runways.json', 'Waypoints.json',
        'Navaids.json', 'Airways.json', 'AirwayLegs.json',
        'Terminals.json', 'ILSes.json'
    ]
    
    file_info = {}
    for file_name in expected_files:
        file_path = Path(output_dir) / file_name
        if file_path.exists():
            size = file_path.stat().st_size
            file_info[file_name] = {
                'exists': True,
                'size_mb': size / 1024 / 1024,
                'empty': size == 0
            }
        else:
            file_info[file_name] = {'exists': False}
    
    # 파일 정보 출력
    print("📁 출력 파일 확인:")
    for file_name, info in file_info.items():
        if info['exists']:
            if info.get('empty', False):
                print(f"⚠️ {file_name}: 빈 파일")
            else:
                print(f"✅ {file_name}: {info['size_mb']:.2f} MB")
        else:
            print(f"❌ {file_name}: 파일 누락")
    
    return file_info
```

## 🔍 진단 도구

### 1. 시스템 환경 확인

```python
def system_diagnostics():
    """시스템 환경 진단"""
    import platform
    import sys
    import psutil
    
    print("🔍 시스템 환경 진단")
    print("=" * 50)
    
    # 운영 체제 정보
    print(f"운영 체제: {platform.system()} {platform.release()}")
    print(f"아키텍처: {platform.machine()}")
    
    # Python 환경
    print(f"Python 버전: {sys.version}")
    print(f"Python 경로: {sys.executable}")
    
    # 하드웨어 정보
    print(f"CPU 코어 수: {psutil.cpu_count()}")
    memory = psutil.virtual_memory()
    print(f"총 메모리: {memory.total // 1024**3} GB")
    print(f"사용 가능한 메모리: {memory.available // 1024**3} GB")
    
    # 디스크 공간
    disk = psutil.disk_usage('.')
    print(f"총 디스크 공간: {disk.total // 1024**3} GB")
    print(f"사용 가능한 디스크 공간: {disk.free // 1024**3} GB")
```

### 2. 의존성 패키지 검증

```python
def verify_dependencies():
    """의존성 패키지 검증"""
    required_packages = [
        'rich', 'pandas', 'py7zr', 'sqlite3'
    ]
    
    print("📦 의존성 패키지 검증")
    print("=" * 30)
    
    for package in required_packages:
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package}: {version}")
        except ImportError:
            print(f"❌ {package}: 설치되지 않음")
        except Exception as e:
            print(f"⚠️ {package}: 오류 - {e}")
```

### 3. 성능 모니터링 도구

```python
import time
import threading
from contextlib import contextmanager

class PerformanceMonitor:
    """성능 모니터"""
    
    def __init__(self):
        self.metrics = {}
        self.monitoring = False
    
    @contextmanager
    def measure(self, operation_name):
        """작업 소요 시간 측정"""
        start_time = time.time()
        start_memory = psutil.virtual_memory().used
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.virtual_memory().used
            
            self.metrics[operation_name] = {
                'duration': end_time - start_time,
                'memory_delta': end_memory - start_memory
            }
    
    def start_monitoring(self):
        """실시간 모니터링 시작"""
        self.monitoring = True
        
        def monitor():
            while self.monitoring:
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                
                print(f"\r🔄 CPU: {cpu_percent:5.1f}% | "
                      f"메모리: {memory.percent:5.1f}% | "
                      f"사용 가능: {memory.available//1024**2:,} MB", 
                      end='', flush=True)
                
                time.sleep(1)
        
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def stop_monitoring(self):
        """모니터링 중지"""
        self.monitoring = False
        print()  # 줄바꿈
    
    def print_summary(self):
        """성능 요약 출력"""
        print("\n📊 성능 요약:")
        print("-" * 40)
        
        for operation, metrics in self.metrics.items():
            duration = metrics['duration']
            memory_mb = metrics['memory_delta'] / 1024 / 1024
            
            print(f"{operation:20s}: {duration:8.2f}s | "
                  f"{memory_mb:+8.1f}MB")

# 사용 예시
monitor = PerformanceMonitor()
monitor.start_monitoring()

with monitor.measure("데이터베이스 검증"):
    validate_database(db_path)

with monitor.measure("데이터 변환"):
    convert_data()

monitor.stop_monitoring()
monitor.print_summary()
```

## 📋 문제 해결 체크리스트

### 🔧 변환 전 확인
- [ ] Python 버전 ≥ 3.8
- [ ] 모든 의존성 패키지가 설치되었으며 버전이 올바른지 확인
- [ ] Fenix 데이터베이스 파일이 존재하고 완전한지 확인
- [ ] 충분한 사용 가능 메모리 (권장 4GB 이상)
- [ ] 충분한 디스크 공간 (권장 1GB 이상)
- [ ] 출력 디렉터리에 쓰기 권한이 있는지 확인

### 📊 변환 과정 확인
- [ ] 데이터베이스 연결 성공
- [ ] 모든 필수 테이블이 존재하는지 확인
- [ ] 좌표 데이터가 유효 범위 내에 있는지 확인
- [ ] 메모리 사용량이 합리적인 범위 내에 있는지 확인
- [ ] 권한 오류가 발생하지 않았는지 확인
- [ ] 임시 파일이 정상적으로 생성되는지 확인

### 📁 변환 후 검증
- [ ] 모든 JSON 파일이 생성되었는지 확인
- [ ] 파일 크기가 합리적인지 (비어있지 않거나 비정상적으로 크지 않은지) 확인
- [ ] JSON 형식이 유효한지 확인
- [ ] 압축 파일 생성 성공
- [ ] 임시 파일이 정리되었는지 확인
- [ ] 로그에 심각한 오류가 없는지 확인

## 🆘 도움 받기

### 자가 진단
1.  **진단 도구 실행**:
    ```python
    from tfdi_converter.diagnostics import run_full_diagnostics
    run_full_diagnostics()
    ```

2.  **자세한 로그 확인**:
    ```bash
    tail -f converter.log
    grep -i error converter.log
    ```

3.  **시스템 리소스 확인**:
    ```bash
    # Windows
    taskmgr
    
    # macOS
    activity monitor
    
    # Linux
    top
    htop
    ```

### 커뮤니티 지원
-   **GitHub Issues**: 버그 및 기술 문제 보고
-   **GitHub Discussions**: 사용 문제 및 경험 공유
-   **프로젝트 문서**: 전체 사용 설명서 참조

### 문제 보고 시 다음 정보를 제공해 주십시오:
-   **전체 오류 로그**
-   **시스템 환경 정보**
-   **변환기 버전**
-   **데이터베이스 정보** (크기, AIRAC 등)
-   **재현 단계**
-   **관련 구성 파일**

---

**해결되지 않은 문제가 발생했나요?**

[GitHub Issues](https://github.com/your-org/tfdi-converter/issues) 에 새 이슈를 생성해 주시면, 최대한 빨리 해결을 도와드리겠습니다!🚁✨
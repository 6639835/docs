# 🛠️ iFly 내비게이션 데이터 변환기 문제 해결

## 🚨 일반적인 오류 및 해결책

### 1. 설치 및 환경 문제

#### ❌ Python 버전 비호환

**오류 메시지:**
```
SyntaxError: invalid syntax
TypeError: 'type' object is not subscriptable
```

**해결책:**
1. **Python 버전 확인**:`
   ```bash
   python --version
   ```
2. **Python 3.8+로 업그레이드**:`
   - Windows: python.org에서 최신 버전 다운로드
   - macOS: `brew install python`
   - Linux: `sudo apt-get install python3.9`

#### ❌ 의존성 패키지 설치 실패

**오류 메시지:**
```
ERROR: Could not find a version that satisfies the requirement
ModuleNotFoundError: No module named 'rich'
```

**해결책:**
1. **pip 업그레이드**:`
   ```bash
   python -m pip install --upgrade pip
   ```
2. **캐시 지우고 다시 설치**:`
   ```bash
   pip cache purge
   pip install -r requirements.txt --no-cache-dir
   ```
3. **국내 미러 서버 사용**:`
   ```bash
   pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
   ```

### 2. 파일 및 경로 문제

#### ❌ Fenix 데이터베이스 파일을 찾을 수 없음

**오류 메시지:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
```
데이터베이스 파일이 없거나 경로가 잘못되었습니다

**해결책:**
1. **파일 위치 확인**:`
   ```bash
   # 일반적인 위치
   %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\
   ```
2. **절대 경로 사용**:` 전체 파일 경로 입력
3. **파일 권한 확인**:` 파일이 읽기 가능한지 확인

#### ❌ iFly 설치 경로 감지 실패

**오류 메시지:**
```
未找到 iFly 737 MAX 8 安装路径
请手动指定 iFly 安装目录
```
iFly 737 MAX 8 설치 경로를 찾을 수 없습니다
iFly 설치 디렉터리를 수동으로 지정하십시오

**해결책:**
1. **경로 수동 입력**:`
   ```
   # Community 버전
   %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Community\ifly-aircraft-737max8\
   
   # Marketplace 버전
   %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Official\asobo-aircraft-ifly-737max8\
   ```
2. **경로 구조 확인**:`
   `Data\navdata\` 디렉터리 포함 여부 확인

#### ❌ 파일 쓰기 권한 부족

**오류 메시지:**
```
PermissionError: [Errno 13] Permission denied
```
파일에 쓸 수 없습니다

**해결책:**
1. **관리자 권한으로 실행**:`
   - Windows: 마우스 우클릭 → "관리자 권한으로 실행"
   - macOS/Linux: `sudo python main.py`
2. **파일 권한 변경**:`
   ```bash
   chmod 755 /path/to/ifly/directory
   ```
3. **파일이 사용 중인지 확인**:` MSFS 및 다른 관련 프로그램 종료

### 3. 데이터 처리 문제

#### ❌ CSV 파일 형식 오류

**오류 메시지:**
```
pandas.errors.EmptyDataError: No columns to parse from file
UnicodeDecodeError: 'utf-8' codec can't decode
```

**해결책:**
1. **파일 인코딩 확인**:`
   ```python
   # UTF-8로 변환
   import chardet
   with open('file.csv', 'rb') as f:
       encoding = chardet.detect(f.read())['encoding']
   ```
2. **CSV 형식 확인**:` 필수 열 포함 여부 확인
3. **데이터 다시 다운로드**:` 새 NAIP 데이터 파일 가져오기

#### ❌ 자기 편각 계산 실패

**오류 메시지:**
```
geomag.GeomagnticCalculationError: Invalid date or coordinates
```
자기 편각 계산 중 예외 발생

**해결책:**
1. **좌표 범위 확인**:`
   - 위도: -90° ~ +90°
   - 경도: -180° ~ +180°
2. **pygeomag 업데이트**:`
   ```bash
   pip install --upgrade pygeomag
   ```
3. **날짜 유효성 확인**:` AIRAC 날짜가 합리적인 범위 내에 있는지 확인

#### ❌ AIRAC 주기 계산 오류

**오류 메시지:**
```
ValueError: Invalid AIRAC cycle calculation
```
AIRAC 주기 계산 실패

**해결책:**
1. **시스템 시간 확인**:` 시스템 시간이 올바른지 확인
2. **주기 수동 설정**:`
   ```python
   # AIRAC 주기를 수동으로 지정
   airac_cycle = "2508"
   ```
3. **시간대 정보 업데이트**:` 올바른 시간대 설정 확인

### 4. 메모리 및 성능 문제

#### ❌ 메모리 부족

**오류 메시지:**
```
MemoryError: Unable to allocate array
```
메모리 부족으로 대용량 데이터 파일을 처리할 수 없습니다

**해결책:**
1. **가상 메모리 증가**:`
   - Windows: 제어판 → 시스템 → 고급 시스템 설정 → 성능 설정 → 가상 메모리
2. **일괄 처리**:`
   ```python
   # 데이터를 일괄적으로 읽기
   chunk_size = 1000
   for chunk in pd.read_csv(file, chunksize=chunk_size):
       process_chunk(chunk)
   ```
3. **다른 프로그램 종료**:` 시스템 메모리 확보

#### ❌ 처리 속도 과도하게 느림

**현상:** 자기 편각 계산 시간이 너무 오래 걸림

**최적화 방안:**
1. **하드웨어 최적화**:`
   - SSD 하드 드라이브 사용
   - RAM을 8GB 이상으로 늘리기
   - 다중 코어 CPU 사용
2. **소프트웨어 최적화**:`
   ```python
   # 병렬 처리
   from concurrent.futures import ThreadPoolExecutor
   with ThreadPoolExecutor(max_workers=4) as executor:
       results = executor.map(calculate_declination, coordinates)
   ```
3. **데이터 양 줄이기**:` 불필요한 웨이포인트 필터링

### 5. 출력 및 검증 문제

#### ❌ 변환된 데이터가 iFly에서 표시되지 않음

**가능한 원인:**
- 파일 형식이 올바르지 않음
- 데이터 덮어쓰기 규칙 문제
- iFly 캐시가 지워지지 않음

**해결책:**
1. **파일 형식 확인**:`
   ```bash
   # 파일 내용 확인
   head -n 10 WPNAVRTE.txt
   ```
2. **iFly 캐시 지우기**:`
   ```bash
   # 캐시 파일 삭제
   rm -rf "%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_*\LocalCache\*ifly*"
   ```
3. **시뮬레이터 재시작**:` MSFS를 완전히 종료하고 다시 시작

#### ❌ FMC에서 웨이포인트 비정상적으로 표시됨

**현상:** 웨이포인트 좌표 오프셋 또는 유형 오류

**확인 단계:**
1. **좌표 형식 확인**:`
   ```
   # 올바른 형식
   123.45678  # 경도 (°)
   -12.34567  # 위도 (°)
   ```
2. **웨이포인트 유형 확인**:`
   ```
   11 - DESIGNATED_POINT (지정점)
   3  - VOR/DME
   2  - NDB
   ```
3. **자기 편각 값 확인**:`
   ```
   # 합리적인 범위
   -30.0 ~ +30.0 도
   ```

## 🔍 진단 도구

### 1. 로그 분석

**상세 로그 보기:**
```bash
# 최신 로그 보기
tail -f converter.log

# 오류 메시지 검색
grep "ERROR" converter.log
grep "Exception" converter.log
```

**로그 레벨 설명:**
- `DEBUG`: 상세 디버그 정보
- `INFO`: 일반 정보
- `WARNING`: 경고 정보
- `ERROR`: 오류 정보
- `CRITICAL`: 심각한 오류

### 2. 데이터 검증 스크립트

**검증 스크립트 생성:**
```python
import pandas as pd
import sqlite3

def validate_database(db_path):
    """데이터베이스 무결성 검증"""
    conn = sqlite3.connect(db_path)
    
    # 필수 테이블 확인
    required_tables = [
        'Airports', 'Runways', 'Navaids', 
        'Waypoints', 'Terminals', 'TerminalLegs'
    ]
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    missing_tables = set(required_tables) - set(tables)
    if missing_tables:
        print(f"누락된 테이블: {missing_tables}")
        return False
    
    print("데이터베이스 검증 통과")
    return True

# 사용 예시
validate_database("path/to/nd.db3")
```

### 3. 시스템 정보 수집

**시스템 정보 보고서 생성:**
```python
import platform
import sys
import pkg_resources

def generate_system_report():
    """시스템 정보 보고서 생성"""
    report = []
    
    # 시스템 정보
    report.append("=== 시스템 정보 ===")
    report.append(f"운영 체제: {platform.system()} {platform.release()}")
    report.append(f"아키텍처: {platform.machine()}")
    report.append(f"Python 버전: {sys.version}")
    
    # 설치된 패키지
    report.append("\n=== 설치된 패키지 ===")
    installed_packages = [d for d in pkg_resources.working_set]
    for package in sorted(installed_packages, key=lambda x: x.key):
        report.append(f"{package.key}: {package.version}")
    
    return "\n".join(report)

# 보고서 생성
print(generate_system_report())
```

## 📋 문제 해결 체크리스트

### 🔧 기본 확인
- [ ] Python 버전 ≥ 3.8
- [ ] 모든 의존성 패키지 설치됨
- [ ] Fenix 데이터베이스 파일 존재 및 읽기 가능
- [ ] iFly 737 MAX 8이 올바르게 설치됨
- [ ] 충분한 디스크 공간 (≥ 100MB)
- [ ] 충분한 메모리 (≥ 4GB)

### 📁 경로 검증
- [ ] Fenix 데이터베이스 경로 올바름
- [ ] iFly 설치 경로 올바름
- [ ] CSV 데이터 파일 경로 올바름
- [ ] 출력 디렉터리에 쓰기 권한 있음

### 📊 데이터 확인
- [ ] CSV 파일 형식 올바름 (UTF-8 인코딩)
- [ ] 데이터베이스 테이블 구조 완전함
- [ ] 좌표 데이터가 유효 범위 내에 있음
- [ ] AIRAC 주기 계산 올바름

### 🔄 처리 검증
- [ ] 로그 파일에 ERROR 레벨 정보 없음
- [ ] 출력 파일 생성됨
- [ ] 파일 크기 합리적 (0이 아님)
- [ ] iFly에서 데이터 올바르게 표시됨

## 🆘 도움 받기

### 자체 해결
1. **문서 참조**:` 전체 사용자 가이드 읽기
2. **로그 검색**:` 특정 오류 메시지 찾기
3. **FAQ 확인**:` 자주 묻는 질문(FAQ) 확인
4. **문제 재현**:` 문제 재현 가능 여부 확인

### 커뮤니티 지원
1. **GitHub Issues**:` 기술 문제 보고
2. **토론 포럼**:` 커뮤니티 토론 참여
3. **QQ 그룹/위챗 그룹**:` 실시간 교류 및 답변

### 문제 보고 시 다음을 제공해 주십시오:
- **오류 로그**: 전체 오류 메시지
- **시스템 정보**: OS, Python 버전 등
- **재현 단계**: 상세한 작업 단계
- **파일 정보**: 관련 파일의 크기 및 경로
- **스크린샷**: 필요 시 인터페이스 스크린샷

---

**기억하십시오: 대부분의 문제에는 해결책이 있습니다!**

어려움에 부닥쳤을 때는, 먼저 심호흡을 하고 이 가이드에 따라 단계적으로 문제를 해결하십시오.🔧✨
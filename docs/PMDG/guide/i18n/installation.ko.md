# 📥 설치 가이드

본 가이드는 다양한 운영 체제에서 Nav-data 내비게이션 데이터 변환 도구를 설치하고 구성하는 방법에 대해 자세히 설명합니다.

## 🔧 시스템 요구 사항

### 최소 사양
- **Python**: 3.8 이상 버전
- **메모리**: 4GB RAM
- **저장 공간**: 2GB 사용 가능한 공간
- **네트워크**: 안정적인 인터넷 연결 (종속성 다운로드용)

### 권장 사양
- **Python**: 3.9+ (3.11 권장)
- **메모리**: 8GB RAM 이상
- **저장 공간**: 5GB 사용 가능한 공간
- **프로세서**: 멀티코어 CPU (병렬 처리용)

### 지원되는 운영 체제
- **Windows**: Windows 10/11 (64비트)
- **macOS**: macOS 10.15 Catalina 이상 버전
- **Linux**: Ubuntu 18.04+, CentOS 7+, 또는 기타 호환 배포판

## 📋 사전 준비

### 1. Python 설치

#### Windows
1. [Python 공식 웹사이트](https://www.python.org/downloads/windows/) 방문
2. 최신 Python 3.11.x 버전 다운로드
3. 설치 프로그램을 실행하고 "Add Python to PATH"를 반드시 체크하십시오.
4. 설치 확인:
```cmd
python --version
pip --version
```

#### macOS
Homebrew 사용 (권장):
```bash
# Homebrew 설치 (아직 설치되지 않은 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python 설치
brew install python@3.11

# 설치 확인
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# 패키지 관리자 업데이트
sudo apt update

# Python 및 pip 설치
sudo apt install python3.11 python3.11-pip python3.11-venv

# 설치 확인
python3.11 --version
pip3.11 --version
```

### 2. 프로젝트 코드 가져오기

#### 방법 A: Git 사용 (권장)
```bash
# 저장소 클론
git clone https://github.com/Nav-data/docs.git

# 프로젝트 디렉터리로 이동
cd docs
```

#### 방법 B: 압축 파일 다운로드
1. GitHub 저장소 페이지 방문
2. "Code" > "Download ZIP" 클릭
3. 대상 디렉터리에 압축 해제

## 🐍 Python 환경 설정

### 1. 가상 환경 생성

#### Windows
```cmd
# 프로젝트 디렉터리로 이동
cd Nav-data

# 가상 환경 생성
python -m venv nav-data-env

# 가상 환경 활성화
nav-data-env\Scripts\activate

# 가상 환경 확인
where python
```

#### macOS/Linux
```bash
# 프로젝트 디렉터리로 이동
cd Nav-data

# 가상 환경 생성
python3 -m venv nav-data-env

# 가상 환경 활성화
source nav-data-env/bin/activate

# 가상 환경 확인
which python
```

### 2. 프로젝트 종속성 설치

```bash
# 가상 환경이 활성화되었는지 확인
# pip 업그레이드
pip install --upgrade pip

# 프로젝트 종속성 설치
pip install -r requirements.txt
```

### 3. 종속성 설치 확인

```python
# Python 실행 및 임포트 테스트
python -c "
import pandas as pd
import sqlite3
import pygeomag
import tqdm
import chardet
print('모든 종속성 패키지가 성공적으로 설치되었습니다!')
"
```

## 📁 데이터 소스 구성

### 1. 데이터 디렉터리 구조 생성

```bash
# 데이터 디렉터리 생성
mkdir -p data/input/{naip,xplane,cifp}
mkdir -p data/output
mkdir -p logs
```

디렉터리 구조는 다음과 같아야 합니다:
```
Nav-data/
├── data/
│   ├── input/
│   │   ├── naip/          # NAIP CSV 데이터 파일
│   │   ├── xplane/        # X-Plane DAT 파일
│   │   └── cifp/          # CIFP 프로그램 데이터 파일
│   └── output/            # 생성된 데이터베이스 파일
├── logs/                  # 로그 파일
└── ...
```

### 2. 구성 파일 경로

구성 파일 복사 및 편집 (선택 사항):
```bash
# 예시 구성 파일 복사
cp config/paths.example.py config/paths.py

# 구성 파일 편집
nano config/paths.py  # Linux/macOS
notepad config/paths.py  # Windows
```

## 🛠️ Microsoft Flight Simulator 구성

### 1. MSFS Community 폴더 찾기

#### Microsoft Store 버전
```
C:\Users\[사용자 이름]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### Steam 버전
```
C:\Users\[사용자 이름]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

#### Xbox Game Pass 버전
```
C:\Users\[사용자 이름]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

### 2. PMDG 항공기 설치 확인

다음 디렉터리가 존재하는지 확인:
```
[Community 폴더]/
├── pmdg-aircraft-737/     # PMDG 737
├── pmdg-aircraft-738/     # PMDG 737-800
├── pmdg-aircraft-77w/     # PMDG 777-300ER
└── ...
```

### 3. 기존 내비게이션 데이터 백업

```bash
# 각 PMDG 항공기별로 기존 데이터 백업
# 예시: PMDG 737-800
cd "C:\Users\[사용자 이름]\...\Community\pmdg-aircraft-738\Config"
rename Navdata Navdata_backup_original
```

## ✅ 설치 확인

### 1. 기본 테스트 실행

```bash
# 가상 환경 활성화
source nav-data-env/bin/activate  # macOS/Linux
# 또는 nav-data-env\Scripts\activate  # Windows

# 기본 테스트 실행
python -c "
import sys
print(f'Python 버전: {sys.version}')

# 주요 종속성 테스트
import pandas as pd
print(f'Pandas 버전: {pd.__version__}')

import sqlite3
print('SQLite3: 사용 가능')

import pygeomag
print('PyGeoMag: 사용 가능')

print('✅ 모든 구성 요소가 성공적으로 설치되었습니다!')
"
```

### 2. 데이터베이스 생성 확인

```bash
# 데이터베이스 생성 기능 테스트
python -c "
import sqlite3
import os

# 테스트 데이터베이스 생성
test_db = 'data/output/test.s3db'
os.makedirs(os.path.dirname(test_db), exist_ok=True)

conn = sqlite3.connect(test_db)
cursor = conn.cursor()
cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY)')
conn.close()

print('✅ 데이터베이스 생성 기능이 정상입니다')
os.remove(test_db)
"
```

### 3. 파일 권한 확인

#### Windows
다음 디렉터리에 대한 쓰기 권한이 있는지 확인하십시오:
- 프로젝트 디렉터리 및 하위 디렉터리
- MSFS Community 폴더
- MSFS 캐시 디렉터리

#### macOS/Linux
```bash
# 프로젝트 디렉터리 권한 확인
ls -la Nav-data/

# 권한 수정이 필요한 경우
chmod -R 755 Nav-data/
```

## 🔍 문제 해결

### 일반적인 문제 및 해결책

#### 1. Python 버전 비호환
**문제**: "python: command not found" 또는 버전이 너무 낮습니다
**해결**: 
- Python 3.8+가 올바르게 설치되었는지 확인
- 일부 시스템에서는 `python` 대신 `python3` 사용

#### 2. pip 종속성 설치 실패
**문제**: 종속성 설치 시 컴파일 오류 발생
**해결**:
```bash
# 빌드 도구 업그레이드
pip install --upgrade pip setuptools wheel

# 특정 패키지 문제의 경우
pip install --no-cache-dir --force-reinstall [패키지 이름]
```

#### 3. pygeomag 설치 문제
**문제**: pygeomag 컴파일 실패
**해결**:
```bash
# Windows: Microsoft C++ 빌드 도구 설치
# macOS: Xcode 명령줄 도구 설치
xcode-select --install

# Linux: 컴파일 종속성 설치
sudo apt install build-essential python3-dev
```

#### 4. 권한 문제
**문제**: MSFS 디렉터리에 쓸 수 없음
**해결**:
- 관리자 권한으로 실행 (Windows)
- 디렉터리 권한 확인 (macOS/Linux)
- 안티바이러스 소프트웨어 실시간 보호 일시 중지

#### 5. 메모리 부족
**문제**: 대용량 데이터 파일 처리 시 메모리 부족
**해결**:
- 가상 메모리/스왑 공간 증가
- 다른 애플리케이션 종료
- 데이터 파일을 일괄 처리

### 로그 파일 위치

문제가 발생하면 다음 로그를 확인하십시오:
- `logs/PMDG_*.log` - 각 모듈 처리 로그
- `logs/db_validation.log` - 데이터베이스 유효성 검사 로그
- `data/output/missing_airports_data.txt` - 누락된 데이터 기록

## 📞 도움 받기

설치 중 문제가 발생하면:

1.  **오류 메시지 확인** - 터미널 출력 오류 메시지를 주의 깊게 읽으십시오.
2.  **시스템 요구 사항 확인** - 시스템이 최소 요구 사항을 충족하는지 확인하십시오.
3.  **문서 참조** - 이 가이드의 문제 해결 섹션을 참조하십시오.
4.  **이슈 제출** - GitHub 저장소에 상세한 문제 보고서를 제출하십시오.

---

**다음 단계**: [구성 설명](configuration.md)을 계속 읽고 데이터 소스를 구성하는 방법을 알아보십시오.
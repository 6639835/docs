# 🔧 iFly 항법 데이터 변환기 설치 가이드

이 가이드는 iFly 항법 데이터 변환기의 전체 설치 프로세스를 안내하여 시스템 환경이 올바르게 구성되고 모든 종속성이 설치되었는지 확인합니다.

## 📋 시스템 요구 사항

### 💻 하드웨어 요구 사항
| 구성 요소 | 최소 요구 사항 | 권장 사양 |
|------|----------|----------|
| **프로세서** | 듀얼 코어 2.0GHz | 쿼드 코어 3.0GHz+ |
| **메모리** | 4GB RAM | 8GB+ RAM |
| **저장 공간** | 500MB 사용 가능한 공간 | 2GB+ 사용 가능한 공간 |
| **네트워크** | 네트워크 연결 필요 없음 | 종속성 다운로드 시 필요 |

### 🖥️ 운영 체제 지원
- **Windows**: Windows 10 (1909+) / Windows 11
- **macOS**: macOS 10.15 Catalina 또는 그 이상
- **Linux**: Ubuntu 18.04+, CentOS 7+, 또는 기타 주요 배포판

### 🐍 Python 환경 요구 사항
- **Python 버전**: 3.8.0 또는 그 이상
- **권장 버전**: Python 3.9.x 또는 3.10.x
- **패키지 관리자**: pip 21.0+ (일반적으로 Python과 함께 설치됨)

## 🚀 빠른 설치

### Windows 사용자

#### 1️⃣ Python 설치

**방법 1: 공식 웹사이트에서 다운로드 (권장)**
```bash
# 1. https://www.python.org/downloads/ 방문
# 2. 최신 Python 3.9+ 버전 다운로드
# 3. 설치 프로그램을 실행하고 "Add Python to PATH"를 반드시 선택하십시오.
# 4. 설치 확인
python --version
pip --version
```

**방법 2: Microsoft Store 사용**
```bash
# 1. Microsoft Store 열기
# 2. "Python 3.9" 또는 "Python 3.10" 검색
# 3. 설치 클릭
# 4. 설치 확인
python --version
```

#### 2️⃣ 변환기 종속성 설치

```bash
# 명령 프롬프트 또는 PowerShell 열기
# 모든 필수 종속성 설치
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 설치 확인
python -c "import rich, pandas, pygeomag; print('종속성 설치 성공!')"
```

### macOS 사용자

#### 1️⃣ Python 설치

**방법 1: Homebrew 사용 (권장)**
```bash
# Homebrew 설치 (아직 설치되지 않은 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python 설치
brew install python@3.9

# 설치 확인
python3 --version
pip3 --version
```

**방법 2: 공식 웹사이트에서 다운로드**
```bash
# 1. https://www.python.org/downloads/macos/ 방문
# 2. macOS용 Python 설치 패키지 다운로드
# 3. .pkg 파일을 실행하여 설치
# 4. 설치 확인
python3 --version
```

#### 2️⃣ 변환기 종속성 설치

```bash
# pip3를 사용하여 종속성 설치
pip3 install rich pathlib typing pygeomag pandas tqdm geographiclib

# 설치 확인
python3 -c "import rich, pandas, pygeomag; print('종속성 설치 성공!')"
```

### Linux 사용자

#### 1️⃣ Python 설치

**Ubuntu/Debian:**
```bash
# 패키지 목록 업데이트
sudo apt update

# Python 3.9 및 pip 설치
sudo apt install python3.9 python3.9-pip python3.9-dev

# 심볼릭 링크 생성 (선택 사항)
sudo ln -sf /usr/bin/python3.9 /usr/bin/python
sudo ln -sf /usr/bin/pip3.9 /usr/bin/pip

# 설치 확인
python --version
pip --version
```

**CentOS/RHEL:**
```bash
# EPEL 저장소 설치
sudo yum install epel-release

# Python 3.9 설치
sudo yum install python39 python39-pip

# 설치 확인
python3.9 --version
pip3.9 --version
```

**Arch Linux:**
```bash
# Python 및 pip 설치
sudo pacman -S python python-pip

# 설치 확인
python --version
pip --version
```

#### 2️⃣ 변환기 종속성 설치

```bash
# 종속성 패키지 설치
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 권한 문제가 발생하면 사용자 설치를 사용하십시오
pip install --user rich pathlib typing pygeomag pandas tqdm geographiclib

# 설치 확인
python -c "import rich, pandas, pygeomag; print('종속성 설치 성공!')"
```

## 📦 자세한 종속성 설명

### 핵심 종속성 패키지

| 패키지 이름 | 버전 요구 사항 | 용도 | 라이선스 |
|------|----------|------|--------|
| **rich** | ≥ 12.0.0 | 현대적인 CLI 인터페이스 | MIT |
| **pandas** | ≥ 1.3.0 | 데이터 처리 및 분석 | BSD-3 |
| **pygeomag** | ≥ 0.4.2 | 자기 편각 계산 | MIT |
| **tqdm** | ≥ 4.60.0 | 진행률 표시줄 표시 | MPL-2.0 |
| **geographiclib** | ≥ 1.52 | 지리 좌표 계산 | MIT |

### 표준 라이브러리 종속성 (설치 필요 없음)

| 모듈 | 용도 |
|------|------|
| **pathlib** | 파일 경로 처리 |
| **typing** | 타입 힌트 지원 |
| **sqlite3** | SQLite 데이터베이스 액세스 |
| **csv** | CSV 파일 처리 |
| **datetime** | 날짜 및 시간 처리 |
| **logging** | 로깅 |

## 🔍 설치 확인

### 전체 확인 스크립트

확인 스크립트 `verify_installation.py` 생성:

```python
#!/usr/bin/env python3
"""
iFly 항법 데이터 변환기 설치 확인 스크립트
"""

import sys
import importlib
from pathlib import Path

def check_python_version():
    """Python 버전 확인"""
    version = sys.version_info
    print(f"🐍 Python 버전: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python 버전이 요구 사항을 충족합니다")
        return True
    else:
        print("❌ Python 버전이 너무 낮습니다. 3.8 또는 그 이상이 필요합니다")
        return False

def check_dependencies():
    """종속성 패키지 확인"""
    dependencies = [
        'rich',
        'pandas', 
        'pygeomag',
        'tqdm',
        'geographiclib'
    ]
    
    all_ok = True
    print("\n📦 종속성 패키지 확인:")
    
    for dep in dependencies:
        try:
            module = importlib.import_module(dep)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {dep}: {version}")
        except ImportError:
            print(f"❌ {dep}: 설치되지 않음")
            all_ok = False
    
    return all_ok

def check_system_resources():
    """시스템 리소스 확인"""
    import shutil
    
    print("\n💾 시스템 리소스 확인:")
    
    # 디스크 공간 확인
    total, used, free = shutil.disk_usage(Path.home())
    free_gb = free // (1024**3)
    print(f"📁 사용 가능한 디스크 공간: {free_gb} GB")
    
    if free_gb >= 1:
        print("✅ 디스크 공간이 충분합니다")
        disk_ok = True
    else:
        print("⚠️ 디스크 공간이 부족합니다. 최소 1GB를 권장합니다")
        disk_ok = False
    
    return disk_ok

def main():
    """주 확인 함수"""
    print("🔍 iFly 항법 데이터 변환기 설치 확인")
    print("=" * 50)
    
    # 확인 항목
    checks = [
        ("Python 버전", check_python_version),
        ("종속성 패키지", check_dependencies),
        ("시스템 리소스", check_system_resources),
    ]
    
    all_passed = True
    for name, check_func in checks:
        try:
            result = check_func()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} 확인 실패: {e}")
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 모든 확인을 통과했습니다! 이제 변환기를 사용할 수 있습니다.")
        return 0
    else:
        print("⚠️ 일부 확인을 통과하지 못했습니다. 위 지침에 따라 문제를 해결하십시오.")
        return 1

if __name__ == "__main__":
    exit(main())
```

확인 스크립트 실행:
```bash
python verify_installation.py
```

### 수동 확인 단계

```bash
# 1. Python 버전 확인
python --version

# 2. pip 버전 확인
pip --version

# 3. 핵심 종속성 확인
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import pygeomag; print('PyGeoMag: OK')"

# 4. Rich 인터페이스 테스트
python -c "from rich.console import Console; Console().print('Hello, World!', style='bold green')"

# 5. 자기 편각 계산 테스트
python -c "from pygeomag import GeoMag; gm = GeoMag(); print(f'자기 편각 계산 OK: {gm.GeoMag(39.9, 116.4, 0, 2024)}')"
```

## 🔧 일반적인 설치 문제

### 문제 1: Python 버전이 너무 낮음

**증상:**
```
SyntaxError: invalid syntax
```

**해결책:**
```bash
# 현재 버전 확인
python --version

# 버전이 3.8 미만인 경우 업그레이드하십시오
# Windows: python.org에서 새 버전 다운로드
# macOS: brew upgrade python
# Linux: 위 설치 가이드 참조
```

### 문제 2: pip 설치 실패

**증상:**
```
ERROR: Could not find a version that satisfies the requirement
```

**해결책:**
```bash
# pip 업그레이드
python -m pip install --upgrade pip

# 국내 미러 저장소 사용
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# 캐시를 지우고 다시 시도
pip cache purge
pip install rich pandas pygeomag tqdm geographiclib
```

### 문제 3: 권한 오류

**증상:**
```
PermissionError: [Errno 13] Permission denied
```

**해결책:**
```bash
# Windows: 관리자 권한으로 명령 프롬프트 실행
# macOS/Linux: 사용자 설치 사용
pip install --user rich pandas pygeomag tqdm geographiclib

# 또는 sudo 사용 (권장하지 않음)
sudo pip install rich pandas pygeomag tqdm geographiclib
```

### 문제 4: 네트워크 연결 문제

**증상:**
```
WARNING: Retrying... Connection broken
```

**해결책:**
```bash
# 국내 미러 저장소 사용
pip install -i https://mirrors.aliyun.com/pypi/simple/ rich pandas pygeomag tqdm geographiclib

# 또는 칭화 소스
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# 영구 미러 저장소 구성
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 🎯 설치 후 다음 단계

### 1. 필요한 파일 준비
- **Fenix 데이터베이스**: `nd.db3` 파일 가져오기
- **NAIP 데이터**: `RTE_SEG.csv` 항로 데이터 다운로드
- **iFly 설치**: iFly 737 MAX 8이 설치되었는지 확인

### 2. 작업 디렉토리 생성
```bash
# 전용 디렉토리 생성
mkdir ~/ifly-converter
cd ~/ifly-converter

# 변환기 스크립트 다운로드
# (프로젝트 저장소에서 main.py 가져오기)
```

### 3. 첫 번째 테스트 수행
```bash
# 변환기 실행
python main.py

# 인터페이스 지시에 따라 작동
```

## 📚 다음 단계

설치가 완료되면 다음을 계속 읽으십시오:

1. **[구성 설명](configuration.md)** - 자세한 구성 옵션 알아보기
2. **[사용 설명](usage.md)** - 첫 번째 데이터 변환 시작
3. **[문제 해결](../troubleshooting.md)** - 문제가 발생할 경우 확인

---

**설치 완료!** 🎉 이제 iFly 항법 데이터 변환기를 사용할 수 있습니다. 문제가 발생하면 [문제 해결 가이드](../troubleshooting.md)를 참조하거나 GitHub Issues에서 도움을 요청하십시오.
# 🔧 TFDI 내비게이션 데이터 변환기 설치 가이드

본 가이드는 TFDI 내비게이션 데이터 변환기를 설치하고 구성하는 방법을 자세히 설명하며, 사용자의 시스템 환경에서 변환기가 원활하게 실행되도록 보장합니다.

## 📋 시스템 요구 사항

### 💻 하드웨어 요구 사항
| 구성 요소 | 최소 요구 사항 | 권장 구성 |
|------|----------|----------|
| **프로세서** | 듀얼 코어 2.0GHz | 쿼드 코어 3.0GHz+ |
| **메모리** | 4GB RAM | 8GB+ RAM |
| **저장 공간** | 1GB 사용 가능 공간 | 5GB+ 사용 가능 공간 |
| **네트워크** | 다운로드 시에만 필요 | 안정적인 네트워크 연결 |

### 🖥️ 운영 체제 지원
- **Windows**: Windows 10 (2004+) / Windows 11
- **macOS**: macOS 10.15 Catalina 이상
- **Linux**: Ubuntu 18.04+, CentOS 8+, 또는 기타 주요 배포판

### 🐍 Python 환경 요구 사항
- **Python 버전**: 3.8.0 이상
- **권장 버전**: Python 3.9.x 또는 3.10.x
- **패키지 관리자**: pip 21.0+ (일반적으로 Python과 함께 설치됨)

## 🚀 빠른 설치

### Windows 사용자

#### 1️⃣ Python 설치

**방법 1: Microsoft Store (권장)**
```bash
# 1. Microsoft Store 열기
# 2. "Python 3.10" 검색
# 3. Python 3.10 설치 클릭
# 4. 설치 확인
python --version
pip --version
```

**방법 2: 공식 웹사이트 다운로드**
```bash
# 1. https://www.python.org/downloads/windows/ 방문
# 2. Python 3.10.x (64비트) 다운로드
# 3. 설치 프로그램 실행
#    ✅ "Add Python to PATH" 선택
#    ✅ "Install pip" 선택
# 4. 설치 확인
python --version
```

#### 2️⃣ 변환기 종속성 설치

```bash
# 명령 프롬프트 또는 PowerShell 열기
# pip 업그레이드
python -m pip install --upgrade pip

# 필수 종속성 설치
pip install rich pandas py7zr

# 설치 확인
python -c "import rich, pandas, py7zr; print('✅ 모든 종속성 설치 성공!')"
```

#### 3️⃣ 변환기 다운로드

```bash
# 방법 1: 릴리스 패키지 다운로드
# GitHub Releases 페이지에서 최신 버전 다운로드

# 방법 2: 소스 코드 클론 (Git 필요)
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 변환기 확인
python Fenix2TFDINavDataConverter.py --help
```

### macOS 사용자

#### 1️⃣ Python 설치

**방법 1: Homebrew (권장)**
```bash
# Homebrew 설치 (아직 설치되지 않은 경우)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Python 설치
brew install python@3.10

# 설치 확인
python3 --version
pip3 --version

# 심볼릭 링크 생성 (선택 사항)
ln -sf $(which python3) /usr/local/bin/python
ln -sf $(which pip3) /usr/local/bin/pip
```

**방법 2: 공식 웹사이트 다운로드**
```bash
# 1. https://www.python.org/downloads/macos/ 방문
# 2. macOS용 Python 3.10.x 다운로드
# 3. .pkg 파일 설치
# 4. 설치 확인
python3 --version
```

#### 2️⃣ 변환기 종속성 설치

```bash
# pip 업그레이드
python3 -m pip install --upgrade pip

# 종속성 설치
pip3 install rich pandas py7zr

# 설치 확인
python3 -c "import rich, pandas, py7zr; print('✅ 종속성 설치 완료!')"
```

#### 3️⃣ 변환기 다운로드 및 설정

```bash
# 변환기 다운로드
curl -L -o tfdi-converter.zip https://github.com/your-org/tfdi-converter/archive/main.zip
unzip tfdi-converter.zip
cd tfdi-converter-main

# 또는 Git 사용
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 설치 확인
python3 Fenix2TFDINavDataConverter.py --version
```

### Linux 사용자

#### 1️⃣ Python 설치

**Ubuntu/Debian:**
```bash
# 패키지 목록 업데이트
sudo apt update

# Python 3.10 및 관련 도구 설치
sudo apt install python3.10 python3.10-pip python3.10-venv python3.10-dev

# build-essential 설치 (일부 패키지는 컴파일 필요)
sudo apt install build-essential

# 심볼릭 링크 생성
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3.10 1
sudo update-alternatives --install /usr/bin/pip pip /usr/bin/pip3.10 1

# 설치 확인
python --version
pip --version
```

**CentOS/RHEL 8+:**
```bash
# PowerTools 저장소 활성화
sudo dnf config-manager --set-enabled powertools

# Python 3.10 설치
sudo dnf install python3.10 python3.10-pip python3.10-devel

# 개발 도구 설치
sudo dnf groupinstall "Development Tools"

# 설치 확인
python3.10 --version
pip3.10 --version
```

**Arch Linux:**
```bash
# Python 설치
sudo pacman -S python python-pip

# 개발 도구 설치
sudo pacman -S base-devel

# 설치 확인
python --version
pip --version
```

#### 2️⃣ 변환기 종속성 설치

```bash
# pip 업그레이드
python -m pip install --upgrade pip

# 종속성 설치
pip install rich pandas py7zr

# 권한 문제가 발생하면 사용자 설치 사용
pip install --user rich pandas py7zr

# 설치 확인
python -c "import rich, pandas, py7zr; print('✅ 종속성 설치 성공!')"
```

#### 3️⃣ 변환기 다운로드

```bash
# wget을 사용하여 다운로드
wget https://github.com/your-org/tfdi-converter/archive/main.zip
unzip main.zip
cd tfdi-converter-main

# 또는 git 사용
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 실행 권한 설정
chmod +x Fenix2TFDINavDataConverter.py

# 설치 확인
python Fenix2TFDINavDataConverter.py --version
```

## 📦 상세 종속성 설명

### 핵심 종속성 패키지

| 패키지 이름 | 버전 요구 사항 | 용도 | 설치 명령 |
|------|----------|------|----------|
| **rich** | ≥ 12.0.0 | 현대적인 CLI 인터페이스 | `pip install rich` |
| **pandas** | ≥ 1.3.0 | 데이터 처리 및 분석 | `pip install pandas` |
| **py7zr** | ≥ 0.18.0 | 7z 압축 파일 처리 | `pip install py7zr` |

### 표준 라이브러리 종속성 (추가 설치 불필요)

| 모듈 | 용도 |
|------|------|
| **sqlite3** | SQLite 데이터베이스 접근 |
| **json** | JSON 데이터 직렬화 |
| **pathlib** | 파일 경로 처리 |
| **logging** | 로그 기록 |
| **dataclasses** | 데이터 클래스 지원 |
| **concurrent.futures** | 동시 처리 |

### 선택적 종속성

```bash
# 개발 관련 종속성 (개발자에게만 필요)
pip install pytest flake8 mypy black pre-commit

# 성능 모니터링 종속성
pip install psutil

# 진행률 표시줄 개선
pip install tqdm
```

## 🔍 설치 검증

### 전체 검증 스크립트

검증 스크립트 `verify_tfdi_installation.py` 생성:

```python
#!/usr/bin/env python3
"""
TFDI 내비게이션 데이터 변환기 설치 검증 스크립트
시스템 환경, 종속성 패키지 및 변환기 기능 확인
"""

import sys
import importlib
import platform
from pathlib import Path

def check_python_version():
    """Python 버전 확인"""
    version = sys.version_info
    print(f"🐍 Python 버전: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ Python 버전 요구 사항 충족 (>= 3.8)")
        return True
    else:
        print("❌ Python 버전이 너무 낮습니다. 3.8 이상 버전이 필요합니다.")
        print("   Python을 업그레이드한 후 다시 시도하십시오.")
        return False

def check_dependencies():
    """필수 종속성 패키지 확인"""
    required_packages = {
        'rich': '현대적인 CLI 인터페이스',
        'pandas': '데이터 처리 라이브러리',
        'py7zr': '7z 압축 처리'
    }
    
    print("\n📦 종속성 패키지 확인:")
    all_ok = True
    
    for package, description in required_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"❌ {package:<10} 설치되지 않음    ({description})")
            all_ok = False
        except Exception as e:
            print(f"⚠️ {package:<10} 오류: {e}")
            all_ok = False
    
    return all_ok

def check_optional_dependencies():
    """선택적 종속성 확인"""
    optional_packages = {
        'psutil': '시스템 모니터링',
        'tqdm': '진행률 표시줄 개선'
    }
    
    print("\n🔧 선택적 종속성 확인:")
    for package, description in optional_packages.items():
        try:
            module = importlib.import_module(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package:<10} {version:<15} ({description})")
        except ImportError:
            print(f"⚪ {package:<10} 설치되지 않음    ({description}) - 선택 사항")

def check_system_resources():
    """시스템 리소스 확인"""
    print("\n💾 시스템 리소스 확인:")
    
    try:
        import psutil
        
        # 메모리 확인
        memory = psutil.virtual_memory()
        memory_gb = memory.total // (1024**3)
        print(f"💿 총 메모리: {memory_gb} GB")
        
        if memory_gb >= 4:
            print("✅ 메모리 충분 (>= 4GB)")
        else:
            print("⚠️ 메모리가 부족할 수 있습니다. 4GB+ 권장.")
        
        # 디스크 공간 확인
        disk = psutil.disk_usage('.')
        free_gb = disk.free // (1024**3)
        print(f"💿 사용 가능한 디스크 공간: {free_gb} GB")
        
        if free_gb >= 1:
            print("✅ 디스크 공간 충분 (>= 1GB)")
        else:
            print("⚠️ 디스크 공간 부족, 최소 1GB 필요.")
            
    except ImportError:
        print("⚪ 시스템 리소스를 확인할 수 없음 (psutil 설치되지 않음)")

def check_converter_accessibility():
    """변환기 파일 접근성 확인"""
    print("\n🔧 변환기 파일 확인:")
    
    converter_files = [
        'Fenix2TFDINavDataConverter.py',
        'README.md'
    ]
    
    for file_name in converter_files:
        file_path = Path(file_name)
        if file_path.exists():
            size_kb = file_path.stat().st_size // 1024
            print(f"✅ {file_name:<35} ({size_kb} KB)")
        else:
            print(f"⚠️ {file_name:<35} 파일이 존재하지 않음")

def test_basic_functionality():
    """기본 기능 테스트"""
    print("\n🧪 기본 기능 테스트:")
    
    try:
        # Rich 인터페이스 테스트
        from rich.console import Console
        console = Console()
        console.print("✅ Rich 인터페이스 테스트", style="green")
        
        # Pandas 데이터 처리 테스트
        import pandas as pd
        df = pd.DataFrame({'test': [1, 2, 3]})
        assert len(df) == 3
        print("✅ Pandas 데이터 처리 테스트 통과")
        
        # py7zr 압축 기능 테스트
        import py7zr
        print("✅ py7zr 압축 기능 사용 가능")
        
        # SQLite 연결 테스트
        import sqlite3
        conn = sqlite3.connect(':memory:')
        conn.close()
        print("✅ SQLite 데이터베이스 연결 테스트 통과")
        
        return True
        
    except Exception as e:
        print(f"❌ 기능 테스트 실패: {e}")
        return False

def main():
    """메인 검증 함수"""
    print("🔍 TFDI 내비게이션 데이터 변환기 설치 검증")
    print("=" * 60)
    
    # 검사 항목 목록
    checks = [
        ("Python 버전", check_python_version),
        ("필수 종속성", check_dependencies),
        ("선택적 종속성", check_optional_dependencies),
        ("시스템 리소스", check_system_resources),
        ("변환기 파일", check_converter_accessibility),
        ("기본 기능", test_basic_functionality),
    ]
    
    all_passed = True
    critical_passed = True
    
    for name, check_func in checks:
        try:
            result = check_func()
            if name in ["Python 버전", "필수 종속성", "기본 기능"]:
                if not result:
                    critical_passed = False
                    all_passed = False
            elif result is False:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} 검사 실패: {e}")
            if name in ["Python 버전", "필수 종속성"]:
                critical_passed = False
            all_passed = False
    
    print("\n" + "=" * 60)
    
    if critical_passed:
        if all_passed:
            print("🎉 모든 검사 통과! 변환기를 정상적으로 사용할 수 있습니다.")
            print("\n📝 다음 단계:")
            print("   1. Fenix 내비게이션 데이터베이스 파일 (nd.db3) 준비")
            print("   2. 변환기 실행: python Fenix2TFDINavDataConverter.py")
            return 0
        else:
            print("✅ 핵심 기능 사용 가능, 일부 선택적 기능은 제한될 수 있습니다.")
            print("   변환기를 정상적으로 사용할 수 있습니다. 누락된 선택적 종속성 설치를 권장합니다.")
            return 0
    else:
        print("❌ 주요 검사 통과 실패, 위에 나열된 문제를 해결한 후 다시 시도하십시오.")
        print("\n🔧 일반적인 해결책:")
        print("   • Python 버전 업그레이드: https://python.org/downloads")
        print("   • 종속성 설치: pip install rich pandas py7zr")
        print("   • 네트워크 연결 및 권한 설정 확인")
        return 1

if __name__ == "__main__":
    exit(main())
```

검증 스크립트 실행:
```bash
python verify_tfdi_installation.py
```

### 빠른 검증 명령

```bash
# 1. Python 버전 확인
python --version

# 2. pip 버전 확인  
pip --version

# 3. 핵심 종속성 확인
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import py7zr; print(f'py7zr: {py7zr.__version__}')"

# 4. Rich 인터페이스 테스트
python -c "from rich.console import Console; Console().print('🎉 Rich 테스트 성공!', style='bold green')"

# 5. 변환기 시작 테스트
python Fenix2TFDINavDataConverter.py --version
```

## 🔧 일반적인 설치 문제

### 문제 1: Python 버전이 너무 낮음

**증상:**
```
SyntaxError: invalid syntax (새로운 구문 기능 사용됨)
TypeError: 'type' object is not subscriptable
```

**해결책:**
```bash
# 현재 버전 확인
python --version

# 버전이 3.8 미만인 경우 업그레이드 필요
# Windows: python.org에서 새 버전 다운로드
# macOS: brew upgrade python  
# Linux: 위 설치 가이드를 참조하여 업데이트
```

### 문제 2: pip 설치 실패

**증상:**
```
ERROR: Could not find a version that satisfies the requirement
WARNING: Retrying... Connection broken
```

**해결책:**
```bash
# pip 업그레이드
python -m pip install --upgrade pip

# 국내 미러 서버 사용
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas py7zr

# 캐시 지우고 다시 시도
pip cache purge
pip install rich pandas py7zr

# 네트워크 연결 확인
ping pypi.org
```

### 문제 3: 권한 오류

**증상:**
```
PermissionError: [Errno 13] Permission denied
Could not install packages due to an PermissionError
```

**해결책:**
```bash
# Windows: 관리자 권한으로 실행
# 명령 프롬프트 마우스 우클릭 → "관리자 권한으로 실행"

# macOS/Linux: 사용자 설치 사용
pip install --user rich pandas py7zr

# 또는 sudo 사용 (권장하지 않음)
sudo pip install rich pandas py7zr
```

### 문제 4: 컴파일 오류

**증상:**
```
error: Microsoft Visual C++ 14.0 is required
error: building wheel for package failed
```

**해결책:**

**Windows:**
```bash
# Microsoft C++ 빌드 도구 설치
# 방문: https://visualstudio.microsoft.com/visual-cpp-build-tools/
# "Build Tools for Visual Studio" 다운로드 및 설치

# 또는 사전 컴파일된 패키지 사용
pip install --only-binary=all rich pandas py7zr
```

**Linux:**
```bash
# Ubuntu/Debian
sudo apt install build-essential python3-dev

# CentOS/RHEL
sudo dnf groupinstall "Development Tools"
sudo dnf install python3-devel
```

### 문제 5: 종속성 충돌

**증상:**
```
ERROR: pip's dependency resolver does not currently support multiple versions
```

**해결책:**
```bash
# 가상 환경 생성
python -m venv tfdi_env

# 가상 환경 활성화
# Windows:
tfdi_env\Scripts\activate
# macOS/Linux:
source tfdi_env/bin/activate

# 가상 환경에 설치
pip install rich pandas py7zr

# 설치 확인
python -c "import rich, pandas, py7zr; print('설치 성공!')"
```

## 🎯 설치 후 단계

### 1. 환경 설정

#### Windows 환경 변수 (선택 사항)
```batch
# Python Scripts 디렉터리를 PATH에 추가
set PATH=%PATH%;%USERPROFILE%\AppData\Local\Programs\Python\Python310\Scripts

# 변환기 디렉터리 설정
set TFDI_CONVERTER_HOME=C:\Users\%USERNAME%\tfdi-converter
```

#### macOS/Linux 환경 변수 (선택 사항)
```bash
# ~/.bashrc 또는 ~/.zshrc에 추가
export TFDI_CONVERTER_HOME="$HOME/tfdi-converter"
export PATH="$PATH:$TFDI_CONVERTER_HOME"

# 설정 다시 로드
source ~/.bashrc  # 또는 source ~/.zshrc
```

### 2. 데이터 파일 준비

```bash
# Fenix 데이터베이스 위치 확인
# Windows 일반 경로:
dir "%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320" /s | findstr nd.db3

# macOS/Linux:
find ~ -name "nd.db3" 2>/dev/null
```

### 3. 작업 디렉터리 생성

```bash
# 전용 작업 디렉터리 생성
mkdir ~/tfdi-conversion-workspace
cd ~/tfdi-conversion-workspace

# 하위 디렉터리 생성
mkdir input output logs backups

# 변환기를 작업 디렉터리로 복사 (선택 사항)
cp /path/to/Fenix2TFDINavDataConverter.py .
```

### 4. 첫 실행 테스트

```bash
# 변환기 도움말 실행
python Fenix2TFDINavDataConverter.py --help

# 기본 테스트 실행 (테스트 데이터가 있는 경우)
python Fenix2TFDINavDataConverter.py --test

# 버전 정보 확인
python Fenix2TFDINavDataConverter.py --version
```

## 📚 다음 단계

설치가 완료되면 다음을 계속 읽으십시오:

1.  **[구성 설명](configuration.md)** - 변환기 구성 옵션 이해
2.  **[사용 설명](usage.md)** - 첫 번째 데이터 변환 시작
3.  **[문제 해결](../troubleshooting.md)** - 문제가 발생하면 확인

### 빠른 시작 체크리스트

- [ ] ✅ Python 3.8+ 설치됨
- [ ] ✅ 필수 종속성 설치됨 (rich, pandas, py7zr)
- [ ] ✅ 변환기 파일 다운로드됨
- [ ] ✅ 설치 검증 통과
- [ ] ✅ Fenix 데이터베이스 파일 준비됨
- [ ] ✅ TFDI MD-11이 MSFS에 설치됨

---

**설치 완료!** 🎉 

이제 TFDI 내비게이션 데이터 변환기를 사용할 수 있습니다. 문제가 발생하면 [문제 해결 가이드](../troubleshooting.md)를 참조하거나 GitHub Issues에서 도움을 요청하십시오. 🚁✨
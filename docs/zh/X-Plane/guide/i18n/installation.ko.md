# 설치 가이드

이 가이드는 다양한 운영 체제에 Nav-data 도구를 올바르게 설치하고 구성하는 데 도움을 줄 것입니다.

## 📋 시스템 요구 사항

### 최소 시스템 요구 사항
- **운영 체제**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+ 또는 기타 주요 Linux 배포판
- **Python 버전**: Python 3.6 이상
- **메모리**: 4GB RAM 이상 권장
- **저장 공간**: 최소 2GB 사용 가능한 디스크 공간
- **네트워크**: 종속성 패키지 다운로드 및 데이터 업데이트에 필요

### 권장 시스템 구성
- **Python 버전**: Python 3.8+
- **메모리**: 8GB RAM 이상
- **저장 공간**: 10GB+ SSD 저장 공간
- **프로세서**: 멀티 코어 CPU (대용량 파일 일괄 처리에 사용)

## 🔧 설치 단계

### 1. Python 환경 설치

#### Windows 시스템
1. [Python 공식 웹사이트](https://www.python.org/downloads/)에 접속하여 최신 버전 다운로드
2. 설치 프로그램을 실행하고, **"Add Python to PATH"를 반드시 선택하십시오**
3. 설치 확인:
   ```cmd
   python --version
   pip --version
   ```

#### macOS 시스템
Homebrew 사용 (권장):
```bash
# 安装 Homebrew（如未安装）
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# 安装 Python
brew install python

# 验证安装
python3 --version
pip3 --version
```

#### Linux 시스템 (Ubuntu/Debian)
```bash
# 更新包管理器
sudo apt update

# 安装 Python 和 pip
sudo apt install python3 python3-pip python3-venv

# 验证安装
python3 --version
pip3 --version
```

### 2. 프로젝트 소스 코드 가져오기

#### 방법 1: Git 클론 (권장)
```bash
# 克隆项目仓库
git clone https://github.com/your-repo/nav-data.git

# 进入项目目录
cd nav-data
```

#### 방법 2: 압축 파일 다운로드
1. 프로젝트 GitHub 페이지에 접속
2. "Code" → "Download ZIP" 클릭
3. 대상 디렉터리에 압축 해제

### 3. 가상 환경 생성 (권장)

종속성 충돌을 방지하기 위해 독립적인 Python 가상 환경을 생성합니다:

```bash
# 创建虚拟环境
python -m venv nav-data-env

# 激活虚拟环境
# Windows:
nav-data-env\Scripts\activate

# macOS/Linux:
source nav-data-env/bin/activate

# 验证虚拟环境
which python  # 应显示虚拟环境路径
```

### 4. 종속성 패키지 설치

#### 핵심 종속성
```bash
# 安装基础依赖
pip install -r requirements.txt
```

#### 수동 종속성 설치 (requirements.txt가 없는 경우)
```bash
# 数据处理相关
pip install pandas numpy

# PDF 处理
pip install pdfplumber

# 进度条和用户界面
pip install tqdm colorama

# 地理计算
pip install geopy

# 中文处理（如需要）
pip install pypinyin

# 其他工具包
pip install typing-extensions dataclasses
```

#### 선택적 종속성
```bash
# Jupyter Notebook 支持（数据分析）
pip install jupyter

# 测试框架
pip install pytest pytest-cov

# 代码格式化
pip install black flake8
```

## 🗂️ 디렉터리 구조 구성

### 표준 디렉터리 레이아웃
```
nav-data/
├── Airway/                 # 항로 데이터 처리 모듈
│   ├── airway.py          # 주요 변환 스크립트
│   └── README.md          # 모듈 설명
├── PDF extract/           # PDF 데이터 추출 모듈
│   ├── 1_terminal_pdf.py  # PDF 원본 추출
│   ├── 2_terminal_encode.py # 데이터 인코딩
│   ├── 3_terminal_db.py   # 데이터베이스 생성
│   ├── waypoint_1_pdf.py  # 웨이포인트 추출
│   └── utils.py           # 유틸리티 함수
├── Terminal Patch/        # 데이터 복구 모듈
│   ├── terminal_encoder.py # 프로그램 인코더
│   └── terminal_reencode.py # 형식 복구
├── X-Plane CIFP/         # X-Plane CIFP 처리
│   ├── 1_navaid.py       # 항법 보조 장치 처리
│   ├── 2_waypoint.py     # 웨이포인트 처리
│   ├── 3_terminal.py     # 터미널 절차 처리
│   └── utils.py          # 유틸리티 함수
├── docs/                  # 프로젝트 문서
├── requirements.txt       # 종속성 목록
└── README.md             # 프로젝트 설명
```

### 작업 디렉터리 생성
```bash
# 데이터 입력 디렉터리 생성
mkdir -p data/input/{csv,pdf,raw}

# 데이터 출력 디렉터리 생성
mkdir -p data/output/{dat,txt,processed}

# 로그 디렉터리 생성
mkdir -p logs

# 구성 디렉터리 생성
mkdir -p config
```

## ⚙️ 환경 변수 구성

### 환경 구성 파일 생성
`.env` 파일 생성 (Windows 사용자는 `.env.txt`를 생성한 후 이름을 변경하십시오):

```bash
# X-Plane 설치 경로
XPLANE_PATH=/path/to/X-Plane

# 데이터 파일 경로
DATA_INPUT_PATH=./data/input
DATA_OUTPUT_PATH=./data/output

# 로그 구성
LOG_LEVEL=INFO
LOG_FILE=./logs/nav-data.log

# 처리 구성
BATCH_SIZE=1000
ENABLE_PROGRESS_BAR=true

# 중국 영공 코드 (사용자 지정 가능)
CHINA_AREAS=ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU
```

### Windows 시스템 환경 변수 설정
1. "내 PC" → "속성" → "고급 시스템 설정" 우클릭
2. "환경 변수" 클릭
3. "사용자 변수"에 추가:
   - 변수 이름: `NAV_DATA_HOME`
   - 변수 값: 프로젝트 설치 경로

### macOS/Linux 환경 변수 설정
`~/.bashrc` 또는 `~/.zshrc`에 추가:
```bash
export NAV_DATA_HOME="/path/to/nav-data"
export PATH="$NAV_DATA_HOME:$PATH"
```

## 🧪 설치 확인

### 1. 기본 기능 테스트
```bash
# 프로젝트 디렉터리로 이동
cd nav-data

# 항로 모듈 테스트
python -c "import Airway.airway; print('Airway module loaded successfully')"

# PDF 처리 모듈 테스트
python -c "import sys; sys.path.append('PDF extract'); import utils; print('PDF module loaded successfully')"

# 터미널 패치 모듈 테스트
python -c "import sys; sys.path.append('Terminal Patch'); print('Terminal Patch module available')"
```

### 2. 종속성 검사 스크립트
`check_installation.py` 생성:
```python
#!/usr/bin/env python3
"""
Nav-data 설치 검사 스크립트
"""
import sys
import importlib
import os

def check_python_version():
    """Python 버전 확인"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 6):
        print("❌ Python 버전이 너무 낮습니다. 3.6+가 필요합니다.")
        return False
    print(f"✅ Python 버전: {version.major}.{version.minor}.{version.micro}")
    return True

def check_dependencies():
    """종속성 패키지 확인"""
    required_packages = [
        'pandas', 'numpy', 'pdfplumber', 'tqdm', 
        'colorama', 'geopy', 'typing_extensions'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - 설치되지 않음")
            missing_packages.append(package)
    
    return len(missing_packages) == 0, missing_packages

def check_directories():
    """디렉터리 구조 확인"""
    required_dirs = [
        'Airway', 'PDF extract', 'Terminal Patch', 'X-Plane CIFP'
    ]
    
    missing_dirs = []
    for dirname in required_dirs:
        if os.path.exists(dirname):
            print(f"✅ {dirname}/")
        else:
            print(f"❌ {dirname}/ - 디렉터리 누락")
            missing_dirs.append(dirname)
    
    return len(missing_dirs) == 0, missing_dirs

def main():
    print("🔍 Nav-data 설치 확인")
    print("=" * 40)
    
    # Python 버전 확인
    print("\n📍 Python 버전 확인:")
    python_ok = check_python_version()
    
    # 종속성 확인
    print("\n📍 종속성 패키지 확인:")
    deps_ok, missing_deps = check_dependencies()
    
    # 디렉터리 확인
    print("\n📍 디렉터리 구조 확인:")
    dirs_ok, missing_dirs = check_directories()
    
    # 요약
    print("\n" + "=" * 40)
    if python_ok and deps_ok and dirs_ok:
        print("🎉 설치 확인 통과! Nav-data 준비 완료.")
        return 0
    else:
        print("⚠️  설치 확인 중 문제 발견:")
        if missing_deps:
            print(f"   누락된 종속성: {', '.join(missing_deps)}")
            print(f"   설치 명령: pip install {' '.join(missing_deps)}")
        if missing_dirs:
            print(f"   누락된 디렉터리: {', '.join(missing_dirs)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

검사 실행:
```bash
python check_installation.py
```

## 🔥 일반적인 설치 문제

### 문제 1: Python 버전 호환성
**증상**: 런타임에 구문 오류 또는 모듈 가져오기 오류 발생
**해결책**:
```bash
# Python 버전 확인
python --version

# 버전이 너무 낮으면 Python 업그레이드
# Windows: 새 버전 다시 다운로드 및 설치
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### 문제 2: 종속성 패키지 설치 실패
**증상**: `pip install` 명령 실패
**해결책**:
```bash
# pip 업그레이드
python -m pip install --upgrade pip

# 국내 미러 사용
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# 캐시 지우고 재시도
pip cache purge
pip install package_name
```

### 문제 3: 가상 환경 문제
**증상**: 가상 환경이 활성화되지 않거나 패키지를 찾을 수 없음
**해결책**:
```bash
# 이전 가상 환경 삭제
rm -rf nav-data-env

# 다시 생성
python -m venv nav-data-env

# 활성화 및 종속성 설치
source nav-data-env/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

### 문제 4: 파일 권한 문제 (Linux/macOS)
**증상**: 파일 또는 디렉터리를 생성할 수 없음
**해결책**:
```bash
# 디렉터리 권한 변경
chmod -R 755 nav-data/

# 또는 sudo 사용 (권장하지 않음)
sudo python script.py
```

### 문제 5: PDF 처리 모듈 문제
**증상**: pdfplumber 설치 또는 사용 실패
**해결책**:
```bash
# 시스템 종속성 설치 (Ubuntu/Debian)
sudo apt-get install python3-dev libpoppler-cpp-dev

# pdfplumber 재설치
pip uninstall pdfplumber
pip install pdfplumber
```

## 🚀 설치 완료

설치 완료 후 다음을 수행할 수 있습니다:

1.  **빠른 테스트 실행**:
    ```bash
    python check_installation.py
    ```

2.  **도움말 정보 확인**:
    ```bash
    python Airway/airway.py --help
    ```

3.  **데이터 변환 시작**:
    [사용 설명서](./usage.md)를 참조하여 첫 번째 데이터 변환을 수행하십시오

## 🔄 업데이트 및 업그레이드

### 프로젝트 코드 업데이트
```bash
# Git을 사용하는 경우
git pull origin main

# 또는 최신 버전 다시 다운로드
```

### 종속성 패키지 업데이트
```bash
# 가상 환경 활성화
source nav-data-env/bin/activate

# 모든 패키지 업데이트
pip install --upgrade -r requirements.txt

# 또는 특정 패키지 수동 업데이트
pip install --upgrade package_name
```

### 데이터 파일 업데이트
NAIP 데이터 소스를 주기적으로 확인하고 업데이트하여 탐색 데이터의 적시성을 보장하십시오.

---

**설치 완료!** 🎉 이제 Nav-data를 사용하여 탐색 데이터 변환을 시작할 수 있습니다. 문제가 발생하면 [문제 해결](#常见安装问题) 섹션을 확인하거나 GitHub Issue를 제출하십시오.
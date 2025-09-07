---
title: 자주 묻는 질문
description: Nav-data 사용자에게 자주 발생하는 문제 및 해결책
---

# 자주 묻는 질문 (FAQ)

이 문서는 사용자들이 Nav-data를 사용하면서 가장 자주 겪는 문제와 해결책을 모아 놓았습니다.

## 🚀 빠른 답변

### Q: Nav-data는 무엇인가요?
**A:** Nav-data는 오픈소스 항공 항법 데이터 변환 도구로, 중국 민항의 NAIP 데이터를 X-Plane 비행 시뮬레이터에서 사용할 수 있는 형식으로 변환하는 데 특화되어 있습니다. 이 도구는 항로 처리, PDF 추출, 터미널 복구, X-Plane CIFP 생성의 네 가지 주요 모듈을 포함합니다.

### Q: Nav-data를 사용하려면 무엇이 필요한가요?
**A:** 다음이 필요합니다:
- Python 3.6+ 환경
- 해당 내비게이션 데이터 원본 파일 (CSV, PDF 등)
- X-Plane 비행 시뮬레이터 (변환된 데이터 사용)
- 기본적인 명령줄 조작 지식

### Q: Nav-data는 무료인가요?
**A:** 네, Nav-data는 MIT 오픈소스 라이선스를 채택하여 상업적 용도를 포함해 완전히 무료로 사용할 수 있습니다.

## 📦 설치 관련 문제

### Q: 설치 시 "Python 버전이 너무 낮음"이라고 표시되면 어떻게 해야 하나요?
**A:** Nav-data는 Python 3.6 이상 버전이 필요합니다. 해결책:

```bash
# 현재 버전 확인
python --version

# 버전이 너무 낮으면 다음을 수행하십시오:
# Windows: python.org에서 최신 버전 다운로드
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### Q: pip install 명령이 실패하면 어떻게 해야 하나요?
**A:** 일반적인 해결책:

```bash
# 1. pip 업그레이드
python -m pip install --upgrade pip

# 2. 국내 미러 소스 사용
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# 3. 캐시 지우기
pip cache purge

# 4. 가상 환경 사용
python -m venv nav-data-env
source nav-data-env/bin/activate  # Linux/macOS
# 또는 nav-data-env\Scripts\activate  # Windows
```

### Q: 종속성 패키지 설치 실패, 권한 부족 메시지가 표시되면 어떻게 해야 하나요?
**A:** 해결책:

```bash
# 방법 1: 사용자 설치 사용 (권장)
pip install --user package_name

# 방법 2: 가상 환경 사용 (가장 권장)
python -m venv nav-data-env
source nav-data-env/bin/activate
pip install package_name

# 방법 3: sudo 사용 (권장하지 않음)
sudo pip install package_name
```

### Q: Windows에서 pdfplumber 설치에 실패하면 어떻게 해야 하나요?
**A:** 이는 일반적으로 Visual C++ 컴파일 환경 부족으로 인해 발생합니다:

1. Microsoft Visual C++ Build Tools 설치
2. 또는 미리 컴파일된 버전 사용:
   ```cmd
   pip install --only-binary=all pdfplumber
   ```

## 🗂️ 데이터 처리 문제

### Q: CSV 파일을 읽을 수 없고, 인코딩 오류가 표시되면 어떻게 해야 하나요?
**A:** 이는 중국어 CSV 파일에서 흔히 발생하는 문제입니다:

```python
# 파일 인코딩 확인
import chardet
with open('your_file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())
    print(encoding)

# 인코딩 변환
iconv -f gbk -t utf-8 input.csv > output.csv
```

### Q: 항로 변환 후 데이터가 불완전한가요?
**A:** 다음 항목을 확인하십시오:

1.  **CSV 파일 형식**: 필수 필드가 포함되어 있는지 확인
    ```
    CODE_POINT_START, CODE_TYPE_START, CODE_POINT_END, 
    CODE_TYPE_END, CODE_DIR, TXT_DESIG
    ```

2.  **영역 필터링 설정**: 필요한 데이터가 의도치 않게 필터링되었는지 확인
    ```python
    # airway.py에서 영역 설정 확인
    china_areas = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW', 'ZJ', 'ZP', 'ZL', 'ZH', 'ZU'}
    ```

3.  **참조 데이터 파일**: earth_fix.dat 및 earth_nav.dat가 존재하고 완전한지 확인

### Q: PDF 추출 좌표의 정확도가 충분하지 않나요?
**A:** 다음 해결책을 시도하십시오:

1.  **수동 추출 모드 사용**:
    ```bash
    python waypoint_2_edge.py
    ```

2.  **처리 매개변수 조정**:
    ```python
    # 스크립트에서 정밀도 설정 수정
    COORDINATE_PRECISION = 8
    crop_margin = 50  # 자르기 여백 증가
    ```

3.  **PDF 파일 사전 처리**:
    -   PDF가 스캔된 이미지가 아닌 텍스트 형식인지 확인
    -   Adobe Acrobat과 같은 도구를 사용하여 PDF 최적화

### Q: 좌표 변환 결과가 올바르지 않나요?
**A:** 좌표 형식 및 변환 설정을 확인하십시오:

```python
# 좌표 범위 확인 (중국 지역)
LAT_MIN, LAT_MAX = 15.0, 55.0
LON_MIN, LON_MAX = 70.0, 140.0

# 도분초 변환 확인
def dms_to_decimal(degrees, minutes, seconds):
    return degrees + minutes/60 + seconds/3600
```

## 🔧 프로그램 복구 문제

### Q: 터미널 절차 인코딩 후 형식이 올바르지 않나요?
**A:** 인코딩 규칙 구성을 확인하십시오:

```python
# 인코딩 규칙 설정 확인
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
```

### Q: 일괄 처리 시 일부 파일이 실패하면 어떻게 해야 하나요?
**A:** 오류 허용 처리 모드를 사용하십시오:

```python
# 처리 스크립트 수정, 예외 처리 추가
try:
    process_single_file(file_path)
    print(f"✅ 성공적으로 처리됨: {file_path}")
except Exception as e:
    print(f"❌ 처리 실패: {file_path} - {e}")
    continue  # 다음 파일 계속 처리
```

### Q: 복구 규칙이 적용되지 않나요?
**A:** 복구 규칙의 우선순위 및 일치 조건을 확인하십시오:

```python
# 규칙 일치 조건 확인
def check_rule_match(line, pattern):
    import re
    return re.search(pattern, line) is not None

# 특정 줄 테스트
test_line = "APPCH RW25L ABC123 GY M"
print(check_rule_match(test_line, r"APPCH.*GY M"))
```

## 🛩️ X-Plane 통합 문제

### Q: X-Plane이 변환된 데이터를 인식하지 못하나요?
**A:** 다음 항목을 확인하십시오:

1.  **파일 경로 정확성**:
    ```bash
    # X-Plane 11
    /path/to/X-Plane/Custom Data/
    
    # X-Plane 12
    /path/to/X-Plane/Output/FMS plans/
    ```

2.  **파일 형식 완전성**:
    ```bash
    # 파일이 "99"로 끝나는지 확인
    tail -n 5 earth_awy.dat
    ```

3.  **인코딩 형식**:
    ```bash
    # 파일 인코딩이 UTF-8인지 확인
    file -I earth_awy.dat
    ```

### Q: X-Plane에서 CIFP 데이터가 비정상적으로 표시되나요?
**A:** CIFP 형식 규격을 확인하십시오:

```python
# CIFP 줄 형식 확인
def validate_cifp_line(line):
    parts = line.split()
    if line.startswith(('SID', 'STAR', 'APPCH')):
        return len(parts) >= 15  # CIFP 표준 필드 수
    return True

# 일괄 검증
with open('airport.dat', 'r') as f:
    for i, line in enumerate(f, 1):
        if not validate_cifp_line(line.strip()):
            print(f"줄 {i} 형식 오류: {line.strip()}")
```

### Q: X-Plane에서 절차를 선택할 수 없나요?
**A:** 절차 이름과 활주로 식별자를 확인하십시오:

1.  **활주로 식별자 형식**: ICAO 표준(예: RW25L, RW03R)을 준수하는지 확인
2.  **절차 이름**: 특수 문자 및 너무 긴 이름 사용 피하기
3.  **공항 코드**: 올바른 ICAO 4글자 코드를 사용하는지 확인

## ⚡ 성능 문제

### Q: 대용량 파일 처리 시 속도가 느린가요?
**A:** 처리 성능 최적화:

```python
# 1. 배치 처리 크기 증가
BATCH_SIZE = 5000  # 기본값 1000

# 2. 다중 프로세스 처리 사용
from multiprocessing import Pool
with Pool(processes=4) as pool:
    results = pool.map(process_function, file_list)

# 3. 진행 캐시 활성화
USE_CACHE = True
CACHE_DIR = "cache/"
```

### Q: 메모리 사용량이 너무 높으면 어떻게 해야 하나요?
**A:** 메모리 최적화 전략:

```python
# 1. 대용량 파일 분할 처리
def process_large_file_chunked(file_path, chunk_size=1000):
    chunk = []
    with open(file_path, 'r') as f:
        for line in f:
            chunk.append(line)
            if len(chunk) >= chunk_size:
                yield process_chunk(chunk)
                chunk.clear()
                gc.collect()  # 강제 가비지 컬렉션

# 2. 필요 없는 변수 해제
del large_data_structure
gc.collect()

# 3. 리스트 대신 제너레이터 사용
def data_generator():
    for item in data_source:
        yield process_item(item)
```

## 🐛 오류 해결

### Q: 프로그램 실행 중 갑자기 충돌이 발생하나요?
**A:** 디버그 정보를 수집하십시오:

```python
# 1. 상세 로그 활성화
import logging
logging.basicConfig(level=logging.DEBUG)

# 2. 예외 처리 사용
try:
    main_processing_function()
except Exception as e:
    import traceback
    print(f"오류 세부 정보: {e}")
    print(f"호출 스택: {traceback.format_exc()}")

# 3. 시스템 리소스 확인
import psutil
print(f"메모리 사용: {psutil.virtual_memory().percent}%")
print(f"디스크 공간: {psutil.disk_usage('/').percent}%")
```

### Q: 출력 결과가 예상과 다른가요?
**A:** 단계별 디버그 프로세스:

```python
# 1. 중간 출력 추가
def debug_process_step(data, step_name):
    print(f"=== {step_name} ===")
    print(f"데이터 양: {len(data)}")
    print(f"예시 데이터: {data[:3]}")
    return data

# 2. 입력 및 출력 비교
print("입력 데이터 통계:")
analyze_data(input_data)
print("출력 데이터 통계:")
analyze_data(output_data)

# 3. 주요 단계 검증
assert len(processed_data) > 0, "처리된 데이터가 비어 있습니다"
assert all(validate_item(item) for item in processed_data), "데이터 검증 실패"
```

## 🌐 플랫폼별 문제

### Q: Windows에서 경로에 공백이 포함되어 오류가 발생하나요?
**A:** 파일 경로를 올바르게 처리하십시오:

```python
import os
from pathlib import Path

# pathlib 사용 (권장)
file_path = Path("C:/Program Files/Nav Data/input.csv")
if file_path.exists():
    process_file(str(file_path))

# 또는 따옴표 사용
import subprocess
subprocess.run(['python', 'script.py', '"C:/path with spaces/file.csv"'])
```

### Q: macOS에서 권한이 거부되나요?
**A:** 권한 문제를 해결하십시오:

```bash
# 1. 파일 권한 변경
chmod +x script.py
chmod 755 nav-data-directory/

# 2. 사용자 디렉토리 사용
mkdir ~/nav-data
cd ~/nav-data

# 3. sudo 사용 피하기
# 하지 마세요: sudo python script.py
# 사용하세요: python script.py
```

### Q: Linux에서 시스템 종속성이 부족한가요?
**A:** 필요한 시스템 패키지를 설치하십시오:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install python3-dev libpoppler-cpp-dev

# CentOS/RHEL
sudo yum install python3-devel poppler-cpp-devel

# 또는 conda 사용
conda install -c conda-forge pdfplumber
```

## 🔄 데이터 업데이트 문제

### Q: 최신 NAIP 데이터를 어떻게 얻을 수 있나요?
**A:** 데이터 업데이트 절차:

1.  **데이터 출처**: 민항국 공식 웹사이트에서 최신 NAIP 데이터 획득
2.  **AIRAC 주기**: 데이터가 올바른 AIRAC 주기에 해당하는지 확인
3.  **형식 검증**: 새 데이터는 형식 조정이 필요할 수 있습니다

```python
# AIRAC 주기 확인
from datetime import datetime
def get_current_airac():
    # AIRAC 계산 로직
    base_date = datetime(2025, 1, 23)  # 기준 날짜
    current_date = datetime.now()
    days_diff = (current_date - base_date).days
    cycle_number = (days_diff // 28) + 2501  # 28일마다 한 주기
    return cycle_number
```

### Q: 변환된 데이터가 만료되면 어떻게 해야 하나요?
**A:** 정기적으로 데이터 업데이트:

1.  **업데이트 알림 설정**: 28일마다 새로운 AIRAC 데이터 확인
2.  **오래된 데이터 백업**: 업데이트 전에 현재 사용 가능한 데이터 백업
3.  **점진적 업데이트**: 새 데이터를 먼저 테스트하고, 이상이 없음을 확인한 후 전체 업데이트

## 📞 추가 지원 받기

### Q: 기술 지원은 어디에서 받을 수 있나요?
**A:** 도움을 받을 수 있는 다양한 방법:

1.  **문서 자료**:
    -   [사용 가이드](./guide/usage.md)
    -   [문제 해결](./troubleshooting.md)
    -   [아키텍처 설명](./architecture.md)

2.  **커뮤니티 지원**:
    -   [GitHub Issues](https://github.com/your-repo/nav-data/issues)
    -   [GitHub Discussions](https://github.com/your-repo/nav-data/discussions)
    -   비행 시뮬레이션 커뮤니티 포럼

3.  **직접 문의**:
    -   상세 버그 보고서 제출
    -   오류 로그 및 시스템 정보 포함
    -   문제를 재현할 수 있는 예시 데이터 제공

### Q: 문제 또는 개선 사항을 어떻게 보고하나요?
**A:** 효과적인 문제 보고서에는 다음이 포함됩니다:

```markdown
**문제 설명**: 겪고 있는 문제에 대해 간략하게 설명하십시오
**재현 단계**: 
1. 사용된 명령 또는 작업
2. 입력 데이터 파일
3. 예상 결과 vs 실제 결과

**환경 정보**:
- 운영 체제: Windows 10 / macOS 12 / Ubuntu 20.04
- Python 버전: 3.9.7
- Nav-data 버전: v2.1.0

**추가 정보**:
- 오류 로그
- 관련 스크린샷  
- 예시 데이터 파일 (공유 가능한 경우)
```

### Q: 코드 또는 문서에 기여하고 싶으신가요?
**A:** 프로젝트 개발에 참여해 주셔서 감사합니다!

1.  **기여 가이드 확인**: [contributing.md](./contributing.md)
2.  **프로젝트 아키텍처 이해**: [architecture.md](./architecture.md)
3.  **코딩 표준 준수**: PEP 8 + 프로젝트 특정 표준
4.  **Pull Request 제출**: GitHub를 통해 기여 제출

---

## 💡 유용한 팁

### 빠른 진단 명령
```bash
# 환경 확인
python --version
pip list | grep -E "(pandas|pdfplumber|tqdm|colorama)"

# 데이터 파일 확인
ls -la *.csv *.dat *.pdf
file -I input_file.csv

# 시스템 리소스 확인
df -h  # 디스크 공간
free -h  # 메모리 사용량 (Linux)
```

### 디버그 스위치
스크립트에 디버그 모드 추가:
```python
DEBUG = True  # 디버그 출력을 활성화하려면 True로 설정

if DEBUG:
    print(f"파일 처리: {file_path}")
    print(f"데이터 줄 수: {len(data)}")
    print(f"처리 시간: {elapsed_time:.2f}s")
```

**만약 귀하의 문제가 위 목록에 없다면, 주저하지 말고 GitHub Issues를 통해 새로운 문제를 제기해 주십시오!** 우리는 이 FAQ 문서를 커뮤니티에 더 나은 서비스를 제공하기 위해 지속적으로 업데이트할 것입니다. ✈️
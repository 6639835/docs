---
title: 문제 해결 가이드
description: Nav-data 시스템 문제 진단 및 해결 방법
---

# 문제 해결 가이드

이 문서는 Nav-data 사용 중 발생하는 문제를 신속하게 파악하고 해결할 수 있도록 체계적인 문제 진단 방법과 해결책을 제공합니다.

## 🔍 빠른 진단 프로세스

### 첫 번째 단계: 환경 점검
```bash
# 1. Python 버전 확인
python --version
# Python 3.6+ 버전이 표시되어야 합니다

# 2. 종속성 패키지 설치 확인
pip list | grep -E "(pandas|numpy|pdfplumber|tqdm|colorama|geopy)"

# 3. 작업 디렉터리 확인
ls -la
# 프로젝트 파일 구조가 표시되어야 합니다

# 4. 시스템 리소스 확인
df -h          # 디스크 공간
free -h        # 메모리 (Linux/macOS)
# Windows: 작업 관리자에서 확인
```

### 두 번째 단계: 로그 분석
```bash
# 상세 로그 활성화
export NAV_DATA_DEBUG=1  # Linux/macOS
set NAV_DATA_DEBUG=1     # Windows

# 최근 오류 로그 보기
tail -n 50 logs/nav-data.log
```

### 세 번째 단계: 데이터 파일 유효성 검사
```bash
# 입력 파일 확인
file -I input_file.csv   # 인코딩 확인
head -n 5 input_file.csv # 처음 몇 줄 보기

# 파일 무결성 검증
wc -l input_file.csv     # 행 수 통계
```

## 🚨 일반적인 오류 패턴

### 오류 유형 분류

#### A. 환경 구성 오류
- Python 버전 비호환성
- 종속성 패키지 누락 또는 버전 충돌
- 경로 구성 오류
- 권한 문제

#### B. 데이터 형식 오류
- CSV 인코딩 문제
- PDF 형식 미지원
- 필드 누락 또는 형식 오류
- 좌표 형식 문제

#### C. 시스템 리소스 문제
- 메모리 부족
- 디스크 공간 부족
- 파일 핸들 초과
- 네트워크 연결 문제

#### D. 논리 처리 오류
- 데이터 유효성 검사 실패
- 변환 규칙 오류
- 출력 형식 부정확
- 동시 처리 충돌

## 🔧 상세 문제 해결

### 1. 설치 및 환경 문제

#### 문제: ModuleNotFoundError
```
오류 메시지: ModuleNotFoundError: No module named 'pandas'
```

**진단 단계:**
```bash
# 1. 현재 Python 환경 확인
which python
python -c "import sys; print(sys.path)"

# 2. 가상 환경 상태 확인
echo $VIRTUAL_ENV  # 가상 환경 경로가 표시되어야 합니다

# 3. 패키지 설치 검증
pip show pandas
```

**해결책:**
```bash
# 해결책 1: 종속성 재설치
pip install -r requirements.txt

# 해결책 2: 새 가상 환경 생성
python -m venv nav-data-env-new
source nav-data-env-new/bin/activate
pip install -r requirements.txt

# 해결책 3: conda 환경 사용
conda create -n nav-data python=3.8
conda activate nav-data
pip install -r requirements.txt
```

#### 문제: Permission Denied
```
오류 메시지: PermissionError: [Errno 13] Permission denied
```

**진단 단계:**
```bash
# 1. 파일 권한 확인
ls -la target_file

# 2. 디렉터리 권한 확인
ls -ld target_directory

# 3. 현재 사용자 확인
whoami
groups
```

**해결책:**
```bash
# 해결책 1: 파일 권한 수정
chmod 644 target_file    # 파일 권한
chmod 755 target_dir     # 디렉터리 권한

# 해결책 2: 소유자 변경 (필요한 경우)
sudo chown $USER:$USER target_file

# 해결책 3: 사용자 디렉터리 사용
mkdir ~/nav-data-workspace
cd ~/nav-data-workspace
```

#### 문제: Python 버전 충돌
```
오류 메시지: SyntaxError: invalid syntax (Python 2.7 detected)
```

**진단 단계:**
```bash
# 모든 Python 버전 확인
python --version
python3 --version
which python
which python3

# 기본 Python 확인
ls -la /usr/bin/python*
```

**해결책:**
```bash
# 해결책 1: python3로 명시적으로 호출
python3 script.py

# 해결책 2: 별칭 생성
echo "alias python=python3" >> ~/.bashrc
source ~/.bashrc

# 해결책 3: 시스템 기본값 업데이트 (주의하여 실행)
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### 2. 데이터 처리 문제

#### 문제: CSV 인코딩 오류
```
오류 메시지: UnicodeDecodeError: 'utf-8' codec can't decode
```

**진단 스크립트:**
```python
#!/usr/bin/env python3
"""
CSV 인코딩 진단 도구
"""
import chardet
import pandas as pd
from pathlib import Path

def diagnose_csv_encoding(file_path):
    """CSV 파일 인코딩 진단"""
    file_path = Path(file_path)
    
    print(f"🔍 진단 파일: {file_path}")
    
    # 1. 파일 기본 정보
    print(f"파일 크기: {file_path.stat().st_size} bytes")
    
    # 2. 자동 인코딩 감지
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)  # 처음 10KB 읽기
        encoding_info = chardet.detect(raw_data)
        print(f"감지된 인코딩: {encoding_info}")
    
    # 3. 다른 인코딩 시도
    encodings = ['utf-8', 'gbk', 'gb2312', 'utf-16', 'latin1']
    
    for encoding in encodings:
        try:
            df = pd.read_csv(file_path, encoding=encoding, nrows=5)
            print(f"✅ {encoding}: 성공적으로 읽음 {len(df)} 행")
            print(f"   열 이름: {list(df.columns)}")
            break
        except Exception as e:
            print(f"❌ {encoding}: {str(e)[:50]}...")
    
    return encoding_info['encoding']

# 사용 예시
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnosed_encoding = diagnose_csv_encoding(sys.argv[1])
        print(f"\n💡 권장 인코딩: {diagnosed_encoding}")
```

**해결책:**
```python
# 해결책 1: 올바른 인코딩 지정
import pandas as pd
df = pd.read_csv('file.csv', encoding='gbk')

# 해결책 2: 파일 인코딩 변환
import codecs
with codecs.open('input.csv', 'r', 'gbk') as f_in:
    with codecs.open('output.csv', 'w', 'utf-8') as f_out:
        f_out.write(f_in.read())

# 해결책 3: 자동 인코딩 감지
import chardet
with open('file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']
df = pd.read_csv('file.csv', encoding=encoding)
```

#### 문제: PDF 구문 분석 실패
```
오류 메시지: PDFSyntaxError: No /Root object found
```

**진단 도구:**
```python
#!/usr/bin/env python3
"""
PDF 파일 진단 도구
"""
import pdfplumber
from pathlib import Path

def diagnose_pdf_file(file_path):
    """PDF 파일 문제 진단"""
    file_path = Path(file_path)
    
    print(f"🔍 PDF 파일 진단: {file_path}")
    
    # 1. 파일 기본 정보
    print(f"파일 크기: {file_path.stat().st_size} bytes")
    
    # 2. PDF 열기 시도
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"✅ PDF 열기 성공")
            print(f"페이지 수: {len(pdf.pages)}")
            
            # 첫 페이지 확인
            if pdf.pages:
                first_page = pdf.pages[0]
                print(f"첫 페이지 크기: {first_page.width} x {first_page.height}")
                
                # 텍스트 추출 테스트
                text = first_page.extract_text()
                if text:
                    print(f"텍스트 추출 성공, 처음 100자: {text[:100]}...")
                else:
                    print("⚠️  텍스트를 추출할 수 없습니다. 스캔된 PDF일 수 있습니다")
                
                # 테이블 확인
                tables = first_page.extract_tables()
                print(f"감지됨 {len(tables)} 개의 테이블")
                
                # 이미지 확인
                images = first_page.images
                print(f"감지됨 {len(images)} 개의 이미지")
                
    except Exception as e:
        print(f"❌ PDF 열기 실패: {e}")
        
        # 복구 제안 시도
        print("\n💡 복구 제안:")
        print("1. PDF 파일 손상 여부 확인")
        print("2. Adobe Reader로 열어 확인 시도")
        print("3. PDF 복구 도구 사용")
        print("4. PDF 파일 재다운로드 또는 다시 가져오기")

# 사용 예시
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnose_pdf_file(sys.argv[1])
```

**해결책:**
```python
# 해결책 1: 더 유연한 구문 분석 옵션 사용
import pdfplumber
try:
    with pdfplumber.open(pdf_file, password="") as pdf:
        # 처리 로직
        pass
except Exception as e:
    print(f"PDF 구문 분석 실패: {e}")

# 해결책 2: 다른 PDF 라이브러리 시도
import pypdf2
try:
    with open(pdf_file, 'rb') as f:
        reader = pypdf2.PdfFileReader(f)
        # 처리 로직
except Exception as e:
    print(f"대체 PDF 라이브러리도 실패: {e}")

# 해결책 3: PDF 사전 처리
# pdftk와 같은 외부 도구를 사용하여 PDF 복구
import subprocess
subprocess.run(['pdftk', 'broken.pdf', 'output', 'fixed.pdf'])
```

#### 문제: 좌표 변환 오류
```
오류 메시지: ValueError: invalid literal for float()
```

**진단 도구:**
```python
#!/usr/bin/env python3
"""
좌표 데이터 진단 도구
"""
import re

def diagnose_coordinate_data(text):
    """좌표 데이터 형식 진단"""
    print(f"🔍 좌표 데이터 진단: {text[:50]}...")
    
    # 일반적인 좌표 형식 패턴
    patterns = {
        'decimal': r'[+-]?\d+\.\d+',
        'dms_with_symbols': r'\d+°\d+′\d+″',
        'dms_with_letters': r'\d+[°]\d+[\']\d+["]',
        'dms_spaces': r'\d+\s+\d+\s+\d+',
        'chinese_format': r'北纬|南纬|东经|西经',
    }
    
    found_patterns = []
    for name, pattern in patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            found_patterns.append((name, matches[:3]))  # 처음 3개 일치 항목 표시
    
    print("감지된 좌표 형식:")
    for name, matches in found_patterns:
        print(f"  {name}: {matches}")
    
    # 가능한 좌표 추출
    coord_candidates = re.findall(r'\d+[°′″\s\'"]+\d+[°′″\s\'"]*\d*', text)
    print(f"좌표 후보: {coord_candidates[:5]}")
    
    return found_patterns

def test_coordinate_conversion(coord_string):
    """좌표 변환 테스트"""
    print(f"\n🧪 변환 테스트: {coord_string}")
    
    try:
        # 다른 변환 방법 시도
        
        # 방법 1: 직접 부동소수점으로 변환
        try:
            result = float(coord_string)
            print(f"  직접 변환: {result}")
            return result
        except ValueError:
            pass
        
        # 방법 2: 도분초 변환
        dms_pattern = r'(\d+)[°]\s*(\d+)[′\']\s*(\d+(?:\.\d+)?)[″"]?'
        match = re.search(dms_pattern, coord_string)
        if match:
            degrees, minutes, seconds = map(float, match.groups())
            decimal = degrees + minutes/60 + seconds/3600
            print(f"  도분초 변환: {decimal}")
            return decimal
        
        # 방법 3: 특수 문자 정리 후 변환
        cleaned = re.sub(r'[^\d\.]', '', coord_string)
        if cleaned:
            result = float(cleaned)
            print(f"  정리 후 변환: {result}")
            return result
            
        print(f"  ❌ 변환 실패")
        return None
        
    except Exception as e:
        print(f"  ❌ 변환 예외: {e}")
        return None

# 사용 예시
if __name__ == "__main__":
    test_data = "北纬39°48'35.6\" 东经116°34'46.7\""
    diagnose_coordinate_data(test_data)
    test_coordinate_conversion("39°48'35.6\"")
```

### 3. 시스템 리소스 문제

#### 문제: 메모리 부족
```
오류 메시지: MemoryError: Unable to allocate array
```

**메모리 모니터링 스크립트:**
```python
#!/usr/bin/env python3
"""
메모리 사용량 모니터링 도구
"""
import psutil
import gc
import os
from functools import wraps

def monitor_memory(func):
    """메모리 모니터링 데코레이터"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 초기 메모리 상태 가져오기
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"🔍 실행 전 메모리: {initial_memory:.2f} MB")
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # 강제 가비지 컬렉션
            gc.collect()
            
            # 최종 메모리 상태 가져오기
            final_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_delta = final_memory - initial_memory
            
            print(f"🔍 실행 후 메모리: {final_memory:.2f} MB")
            print(f"🔍 메모리 변화: {memory_delta:+.2f} MB")
            
            # 메모리 경고
            if final_memory > 1000:  # 1GB 초과
                print("⚠️  메모리 사용량이 높습니다. 최적화하는 것이 좋습니다")
    
    return wrapper

def check_system_memory():
    """시스템 메모리 상태 확인"""
    memory = psutil.virtual_memory()
    
    print("💾 시스템 메모리 상태:")
    print(f"  총 메모리: {memory.total / 1024**3:.2f} GB")
    print(f"  사용 가능한 메모리: {memory.available / 1024**3:.2f} GB")
    print(f"  사용률: {memory.percent:.1f}%")
    
    if memory.percent > 80:
        print("⚠️  시스템 메모리 사용률이 너무 높습니다")
        return False
    return True

# 메모리 최적화 데이터 처리 함수
@monitor_memory
def memory_efficient_csv_processing(file_path, chunk_size=1000):
    """메모리 효율적인 CSV 처리"""
    import pandas as pd
    
    results = []
    
    # 대용량 파일 청크 단위로 읽기
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # 데이터 청크 처리
        processed_chunk = process_data_chunk(chunk)
        results.append(processed_chunk)
        
        # 메모리 정리
        del chunk
        gc.collect()
    
    return pd.concat(results, ignore_index=True)

def process_data_chunk(chunk):
    """단일 데이터 청크 처리"""
    # 실제 데이터 처리 로직
    return chunk  # 간소화된 예시
```

**해결책:**
```python
# 해결책 1: 청크 단위 처리
def process_large_file_in_chunks(file_path, chunk_size=1000):
    import pandas as pd
    
    processed_data = []
    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # 단일 청크 처리
        processed_chunk = your_processing_function(chunk)
        processed_data.append(processed_chunk)
        
        # 메모리 해제
        del chunk
        gc.collect()
    
    return pd.concat(processed_data, ignore_index=True)

# 해결책 2: 제너레이터 사용
def data_generator(file_path):
    """데이터 제너레이터, 메모리 절약"""
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

# 해결책 3: 가상 메모리 증설
# Linux/macOS:
# sudo fallocate -l 4G /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
```

#### 문제: 디스크 공간 부족
```
오류 메시지: OSError: [Errno 28] No space left on device
```

**디스크 공간 확인 스크립트:**
```python
#!/usr/bin/env python3
"""
디스크 공간 모니터링 도구
"""
import shutil
import os
from pathlib import Path

def check_disk_space(path="."):
    """디스크 공간 확인"""
    total, used, free = shutil.disk_usage(path)
    
    print(f"💽 디스크 공간 상태 ({path}):")
    print(f"  총 공간: {total / 1024**3:.2f} GB")
    print(f"  사용 중: {used / 1024**3:.2f} GB")
    print(f"  사용 가능한 공간: {free / 1024**3:.2f} GB")
    print(f"  사용률: {used/total*100:.1f}%")
    
    # 공간 부족 경고
    if free < 1024**3:  # 1GB 미만
        print("⚠️  디스크 공간이 부족합니다!")
        return False
    
    return True

def cleanup_temp_files():
    """임시 파일 정리"""
    temp_patterns = [
        "*.tmp",
        "*.temp", 
        "*.cache",
        "*.log",
        "__pycache__",
        ".pytest_cache"
    ]
    
    current_dir = Path(".")
    total_cleaned = 0
    
    for pattern in temp_patterns:
        for file_path in current_dir.rglob(pattern):
            try:
                if file_path.is_file():
                    size = file_path.stat().st_size
                    file_path.unlink()
                    total_cleaned += size
                    print(f"파일 삭제: {file_path}")
                elif file_path.is_dir():
                    import shutil
                    size = sum(f.stat().st_size for f in file_path.rglob('*') if f.is_file())
                    shutil.rmtree(file_path)
                    total_cleaned += size
                    print(f"디렉터리 삭제: {file_path}")
            except Exception as e:
                print(f"삭제할 수 없음 {file_path}: {e}")
    
    print(f"💾 총 {total_cleaned / 1024**2:.2f} MB 정리됨")

def estimate_output_size(input_file):
    """출력 파일 크기 예상"""
    input_size = Path(input_file).stat().st_size
    
    # 처리 유형에 따른 예상 (간소화된 예상)
    estimated_multiplier = {
        '.csv': 1.2,    # CSV를 DAT로 변환 시 일반적으로 약간 더 큼
        '.pdf': 0.1,    # PDF에서 텍스트 추출 시 일반적으로 훨씬 작음
        '.dat': 1.0,    # DAT 형식 복구 시 크기 변화 없음
    }
    
    suffix = Path(input_file).suffix.lower()
    multiplier = estimated_multiplier.get(suffix, 1.0)
    
    estimated_size = input_size * multiplier
    print(f"📊 예상 출력 크기: {estimated_size / 1024**2:.2f} MB")
    
    return estimated_size
```

### 4. 성능 최적화 문제 해결

#### 문제: 처리 속도 저하

**성능 분석 도구:**
```python
#!/usr/bin/env python3
"""
성능 분석 도구
"""
import time
import cProfile
import pstats
from functools import wraps

def profile_performance(func):
    """성능 분석 데코레이터"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # 성능 분석기 생성
        pr = cProfile.Profile()
        
        # 분석 시작
        pr.enable()
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # 분석 중지
            end_time = time.time()
            pr.disable()
            
            # 성능 보고서 출력
            print(f"⏱️  실행 시간: {end_time - start_time:.2f} 초")
            
            # 상세 보고서 저장
            stats = pstats.Stats(pr)
            stats.sort_stats('cumulative')
            
            print("\n🔍 성능 핫스팟 (상위 10개 함수):")
            stats.print_stats(10)
            
            # 파일로 보고서 저장
            stats.dump_stats(f'performance_profile_{int(time.time())}.prof')
    
    return wrapper

# 사용 예시
@profile_performance
def slow_function():
    """느린 함수 예시"""
    import pandas as pd
    
    # 느린 작업 시뮬레이션
    data = []
    for i in range(100000):
        data.append({'id': i, 'value': i**2})
    
    df = pd.DataFrame(data)
    return df.groupby('id').sum()

def benchmark_different_approaches():
    """다른 구현 방법의 성능 비교"""
    import pandas as pd
    
    # 테스트 데이터
    test_data = list(range(10000))
    
    # 방법 1: 일반 루프
    start_time = time.time()
    result1 = []
    for i in test_data:
        result1.append(i * 2)
    time1 = time.time() - start_time
    
    # 방법 2: 리스트 컴프리헨션
    start_time = time.time()
    result2 = [i * 2 for i in test_data]
    time2 = time.time() - start_time
    
    # 방법 3: NumPy
    import numpy as np
    start_time = time.time()
    result3 = (np.array(test_data) * 2).tolist()
    time3 = time.time() - start_time
    
    print("🏃 성능 비교:")
    print(f"  일반 루프: {time1:.4f} 초")
    print(f"  리스트 컴프리헨션: {time2:.4f} 초")
    print(f"  NumPy: {time3:.4f} 초")
    
    # 가장 빠른 방법 찾기
    times = {'일반 루프': time1, '리스트 컴프리헨션': time2, 'NumPy': time3}
    fastest = min(times, key=times.get)
    print(f"🏆 가장 빠른 방법: {fastest}")
```

## 🔬 고급 진단 도구

### 종합 진단 스크립트

`diagnose_nav_data.py` 생성:

```python
#!/usr/bin/env python3
"""
Nav-data 종합 진단 도구
"""
import sys
import os
import subprocess
import platform
from pathlib import Path
import importlib

class NavDataDiagnostic:
    """Nav-data 진단 도구 클래스"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.info = []
    
    def log_issue(self, message):
        """문제 기록"""
        self.issues.append(message)
        print(f"❌ {message}")
    
    def log_warning(self, message):
        """경고 기록"""
        self.warnings.append(message)
        print(f"⚠️  {message}")
    
    def log_info(self, message):
        """정보 기록"""
        self.info.append(message)
        print(f"ℹ️  {message}")
    
    def check_python_environment(self):
        """Python 환경 확인"""
        print("\n🐍 Python 환경 확인:")
        
        # Python 버전
        version = sys.version_info
        version_str = f"{version.major}.{version.minor}.{version.micro}"
        print(f"  Python 버전: {version_str}")
        
        if version.major < 3 or (version.major == 3 and version.minor < 6):
            self.log_issue(f"Python 버전이 너무 낮습니다 ({version_str}), 3.6+ 버전이 필요합니다")
        else:
            self.log_info(f"Python 버전이 요구 사항을 충족합니다 ({version_str})")
        
        # 가상 환경
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            self.log_info("가상 환경을 사용 중입니다")
        else:
            self.log_warning("가상 환경을 사용하지 않습니다. 가상 환경 사용을 권장합니다")
        
        # Python 경로
        print(f"  Python 경로: {sys.executable}")
        print(f"  패키지 검색 경로: {len(sys.path)} 개 경로")
    
    def check_dependencies(self):
        """종속성 패키지 확인"""
        print("\n📦 종속성 패키지 확인:")
        
        required_packages = {
            'pandas': '1.3.0',
            'numpy': '1.21.0',
            'pdfplumber': '0.7.0',
            'tqdm': '4.60.0',
            'colorama': '0.4.4',
            'geopy': '2.2.0'
        }
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                version = getattr(module, '__version__', '알 수 없음')
                print(f"  ✅ {package}: {version}")
                
                # TODO: 버전 비교 로직
                
            except ImportError:
                self.log_issue(f"종속성 패키지 누락: {package}")
    
    def check_system_resources(self):
        """시스템 리소스 확인"""
        print("\n💻 시스템 리소스 확인:")
        
        # 운영 체제
        system_info = platform.system()
        print(f"  운영 체제: {system_info} {platform.release()}")
        
        # 메모리 확인
        try:
            import psutil
            memory = psutil.virtual_memory()
            print(f"  총 메모리: {memory.total / 1024**3:.2f} GB")
            print(f"  사용 가능한 메모리: {memory.available / 1024**3:.2f} GB")
            
            if memory.available < 2 * 1024**3:  # 2GB 미만
                self.log_warning("사용 가능한 메모리가 적어 대용량 파일 처리에 영향을 줄 수 있습니다")
        except ImportError:
            self.log_warning("메모리 상태를 확인할 수 없습니다 (psutil 누락)")
        
        # 디스크 공간
        try:
            import shutil
            total, used, free = shutil.disk_usage('.')
            print(f"  디스크 공간: {free / 1024**3:.2f} GB 사용 가능")
            
            if free < 1024**3:  # 1GB 미만
                self.log_warning("디스크 공간 부족")
        except Exception as e:
            self.log_warning(f"디스크 공간을 확인할 수 없습니다: {e}")
    
    def check_project_structure(self):
        """프로젝트 구조 확인"""
        print("\n📁 프로젝트 구조 확인:")
        
        required_dirs = [
            'Airway',
            'PDF extract', 
            'Terminal Patch',
            'X-Plane CIFP'
        ]
        
        for dirname in required_dirs:
            if Path(dirname).exists():
                print(f"  ✅ {dirname}/")
            else:
                self.log_issue(f"디렉터리 누락: {dirname}/")
        
        # 주요 파일 확인
        key_files = [
            'Airway/airway.py',
            'PDF extract/utils.py',
            'Terminal Patch/terminal_encoder.py',
        ]
        
        for filepath in key_files:
            if Path(filepath).exists():
                print(f"  ✅ {filepath}")
            else:
                self.log_issue(f"파일 누락: {filepath}")
    
    def check_common_issues(self):
        """일반적인 문제 확인"""
        print("\n🔍 일반적인 문제 확인:")
        
        # 파일 인코딩 확인
        csv_files = list(Path('.').glob('**/*.csv'))
        if csv_files:
            print(f"  발견 {len(csv_files)} 개의 CSV 파일")
            # TODO: 인코딩 확인
        
        # 로그 파일 확인
        log_files = list(Path('.').glob('**/*.log'))
        if log_files:
            print(f"  발견 {len(log_files)} 개의 로그 파일")
            
            # 최근 오류 확인
            for log_file in log_files[-3:]:  # 최근 3개 로그 확인
                try:
                    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        error_lines = [line for line in lines[-50:] if 'ERROR' in line.upper()]
                        if error_lines:
                            print(f"    ⚠️  {log_file} 에서 발견 {len(error_lines)} 개의 오류")
                except Exception as e:
                    print(f"    읽을 수 없음 {log_file}: {e}")
    
    def generate_report(self):
        """진단 보고서 생성"""
        print("\n" + "="*50)
        print("📋 진단 보고서 요약")
        print("="*50)
        
        print(f"심각한 문제: {len(self.issues)} 개")
        for issue in self.issues:
            print(f"  ❌ {issue}")
        
        print(f"\n경고 메시지: {len(self.warnings)} 개")
        for warning in self.warnings:
            print(f"  ⚠️  {warning}")
        
        print(f"\n정보 알림: {len(self.info)} 개")
        for info in self.info:
            print(f"  ℹ️  {info}")
        
        # 전반적인 상태
        if not self.issues:
            if not self.warnings:
                print("\n🎉 시스템 상태 양호!")
            else:
                print("\n✅ 시스템은 대체로 정상이나, 경고 메시지에 주의하는 것이 좋습니다")
        else:
            print("\n🚨 심각한 문제가 발견되었습니다. 수정해야 정상적으로 사용할 수 있습니다")
        
        # 보고서 저장
        report_file = f"diagnostic_report_{int(time.time())}.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("Nav-data 진단 보고서\n")
            f.write("="*50 + "\n\n")
            
            f.write("심각한 문제:\n")
            for issue in self.issues:
                f.write(f"- {issue}\n")
            
            f.write("\n경고 메시지:\n")
            for warning in self.warnings:
                f.write(f"- {warning}\n")
            
            f.write("\n정보 알림:\n")
            for info in self.info:
                f.write(f"- {info}\n")
        
        print(f"\n📄 상세 보고서가 다음 위치에 저장되었습니다: {report_file}")
    
    def run_full_diagnostic(self):
        """전체 진단 실행"""
        print("🔬 Nav-data 시스템 진단")
        print("="*50)
        
        self.check_python_environment()
        self.check_dependencies()
        self.check_system_resources()
        self.check_project_structure()
        self.check_common_issues()
        self.generate_report()

def main():
    """메인 함수"""
    diagnostic = NavDataDiagnostic()
    
    try:
        diagnostic.run_full_diagnostic()
    except KeyboardInterrupt:
        print("\n\n사용자에 의해 진단이 중단되었습니다")
    except Exception as e:
        print(f"\n\n진단 과정에서 예외 발생: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import time
    main()
```

### 진단 도구 사용

```bash
# 전체 진단 실행
python diagnose_nav_data.py

# 진단 보고서 보기
cat diagnostic_report_*.txt

# 진단 결과에 따라 조치
# 심각한 문제가 있다면 보고서 권장 사항에 따라 수정하십시오
# 경고만 있다면 계속 사용할 수 있지만, 최적화를 권장합니다
```

## 📞 도움 요청

### 문제 보고 시 다음 정보를 제공하십시오:

1.  **전체 오류 메시지**
2.  **시스템 환경 정보** (진단 도구를 실행하여 얻음)
3.  **재현 단계**
4.  **입력 데이터 샘플** (공유 가능한 경우)
5.  **예상 결과 vs 실제 결과**

### 연락 채널:
- [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- [FAQ 문서](./faq.md)
- [커뮤니티 토론](https://github.com/your-repo/nav-data/discussions)

---

**기억하세요: 대부분의 문제에는 해결책이 있습니다!** 🛠️ 

체계적인 진단과 문제 해결을 통해 Nav-data 사용 중 발생하는 문제를 신속하게 해결할 수 있습니다. 문제가 계속 발생하면 주저하지 말고 커뮤니티에 도움을 요청하십시오.
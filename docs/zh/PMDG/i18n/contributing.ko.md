# 🤝 기여 가이드

Nav-data 프로젝트 개발에 참여해 주셔서 감사합니다! 이 가이드는 코드 표준, 개발 워크플로우, 모범 사례를 포함하여 프로젝트에 기여하는 방법을 이해하는 데 도움이 될 것입니다.

## 🎯 기여 방법

### 우리는 다음과 같은 유형의 기여를 환영합니다:

- **🐛 버그 보고 및 수정** - 프로젝트에서 문제를 발견하고 수정
- **✨ 새 기능 개발** - 새로운 데이터 처리 기능 또는 최적화 추가
- **📚 문서 개선** - 문서 개선, 예시 추가, 오류 수정
- **🔧 성능 최적화** - 데이터 처리 효율성 및 메모리 사용량 향상
- **🧪 테스트 케이스** - 테스트 커버리지 증가, 코드 품질 향상
- **🌍 국제화 지원** - 다국어 지원 또는 기타 지역 데이터 추가
- **🎨 사용자 경험 개선** - 도구의 사용 편의성 및 출력 형식 최적화

## 🚀 빠른 시작

### 1. 환경 준비

```bash
# GitHub 계정으로 프로젝트 Fork
# Fork한 프로젝트 복제
git clone https://github.com/[您的用户名]/Nav-data.git
cd Nav-data

# 업스트림 저장소 추가
git remote add upstream https://github.com/原作者/Nav-data.git

# 가상 환경 생성
python -m venv nav-data-dev
source nav-data-dev/bin/activate  # Linux/macOS
# 또는 nav-data-dev\Scripts\activate  # Windows

# 개발 종속성 설치
pip install -r requirements.txt
pip install -r requirements-dev.txt  # 개발 종속성 (있는 경우)
```

### 2. 개발 환경 검증

```bash
# 기본 테스트 실행
python -m pytest tests/ -v

# 코드 스타일 확인
flake8 *.py

# 타입 검사 실행 (사용하는 경우)
mypy *.py
```

## 📋 개발 표준

### 코드 스타일

우리는 Python 커뮤니티 표준과 모범 사례를 따릅니다:

#### 1. PEP 8 코드 스타일

```python
# ✅ 좋은 예시
class AirportDataProcessor:
    """공항 데이터 처리기
    
    NAIP 형식의 공항 데이터를 처리하여 PMDG 호환 형식으로 변환합니다.
    """
    
    def __init__(self, csv_file_path: str, output_db_path: str):
        self.csv_file_path = csv_file_path
        self.output_db_path = output_db_path
        self.processed_count = 0
    
    def process_airport_data(self) -> ProcessingResult:
        """공항 데이터를 처리하는 주요 메서드
        
        Returns:
            ProcessingResult: 처리 통계 정보가 포함된 결과 객체
            
        Raises:
            FileNotFoundError: 입력 파일이 존재하지 않을 때
            DatabaseError: 데이터베이스 작업 실패 시
        """
        try:
            data = self._load_csv_data()
            processed_data = self._transform_data(data)
            self._save_to_database(processed_data)
            
            return ProcessingResult(
                success=True,
                processed_count=self.processed_count,
                message="공항 데이터 처리 완료"
            )
        except Exception as e:
            logging.error(f"공항 데이터 처리 중 오류 발생: {e}")
            raise

# ❌ 피해야 할 작성법
def processAirports(file,db):  # 함수명 불규칙, 매개변수 타입 불분명
    d=pd.read_csv(file)       # 변수명 불분명
    for i in d.iterrows():    # 오류 처리 없음
        # 처리 로직...
        pass
```

#### 2. 타입 어노테이션

```python
from typing import List, Dict, Optional, Union, Tuple
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """처리 결과 데이터 클래스"""
    success: bool
    processed_count: int
    failed_count: int = 0
    errors: List[str] = None
    message: Optional[str] = None

def convert_coordinates(
    dms_latitude: str, 
    dms_longitude: str
) -> Tuple[Optional[float], Optional[float]]:
    """DMS 형식 좌표를 십진수로 변환
    
    Args:
        dms_latitude: DMS 형식 위도 문자열 (예: N390308.00)
        dms_longitude: DMS 형식 경도 문자열 (예: E1162930.00)
    
    Returns:
        (위도, 경도) 튜플, 변환 실패 시 (None, None) 반환
    """
    try:
        lat = parse_dms_coordinate(dms_latitude, coord_type='latitude')
        lon = parse_dms_coordinate(dms_longitude, coord_type='longitude')
        return lat, lon
    except ValueError as e:
        logging.warning(f"좌표 변환 실패: {e}")
        return None, None
```

#### 3. 오류 처리 및 로깅

```python
import logging
from enum import Enum

class ProcessingError(Exception):
    """데이터 처리 관련 오류의 기본 클래스"""
    pass

class ValidationError(ProcessingError):
    """데이터 검증 오류"""
    pass

class CoordinateError(ValidationError):
    """좌표 관련 오류"""
    pass

def process_with_error_handling(data: Dict) -> bool:
    """완전한 오류 처리가 포함된 데이터 처리 예시"""
    try:
        # 데이터 검증
        if not validate_required_fields(data):
            raise ValidationError("필수 필드 누락")
        
        # 좌표 처리
        lat, lon = convert_coordinates(
            data.get('latitude'),
            data.get('longitude')
        )
        
        if lat is None or lon is None:
            raise CoordinateError("좌표 변환 실패")
        
        # 데이터 저장
        save_to_database(data)
        logging.info(f"레코드 성공적으로 처리: {data.get('identifier')}")
        return True
        
    except ValidationError as e:
        logging.warning(f"데이터 검증 실패: {e}")
        return False
    except CoordinateError as e:
        logging.error(f"좌표 처리 오류: {e}")
        return False
    except Exception as e:
        logging.critical(f"예상치 못한 오류: {e}")
        raise
```

### 문서 표준

#### 1. 함수 및 클래스 문서

```python
def parse_dat_file(
    file_path: str, 
    batch_size: int = 1000,
    encoding: str = 'utf-8'
) -> List[Dict[str, Any]]:
    """X-Plane 형식의 DAT 파일 파싱
    
    이 함수는 X-Plane 항법 데이터 파일을 읽고, 웨이포인트 정보를 파싱하여
    구조화된 데이터 목록을 반환합니다. 대용량 파일의 배치 처리를 지원합니다.
    
    Args:
        file_path: DAT 파일의 전체 경로
        batch_size: 메모리 최적화를 위한 배치 처리 크기, 기본값 1000
        encoding: 파일 인코딩, 기본값 utf-8
    
    Returns:
        웨이포인트 정보가 포함된 사전 목록, 각 사전에는 다음 키가 포함됩니다:
        - waypoint_identifier: 웨이포인트 식별자
        - latitude: 위도 (십진수)
        - longitude: 경도 (십진수)
        - waypoint_type: 웨이포인트 타입
        - icao_code: ICAO 지역 코드
    
    Raises:
        FileNotFoundError: 지정된 파일이 존재하지 않을 때
        ValueError: 파일 형식이 올바르지 않을 때
        MemoryError: 사용 가능한 메모리가 부족할 때
    
    Examples:
        기본 사용법:
        >>> waypoints = parse_dat_file('data/earth_fix.dat')
        >>> print(f"파싱된 웨이포인트 수: {len(waypoints)}")
        
        대용량 파일 처리:
        >>> waypoints = parse_dat_file(
        ...     'large_file.dat', 
        ...     batch_size=5000
        ... )
    
    Note:
        이 함수는 파일 헤더의 주석 행을 자동으로 건너뛰고 유효한 데이터 행만 처리합니다.
        손상된 데이터 행의 경우 경고 로그를 기록하지만 처리를 중단하지는 않습니다.
    """
    # 구현...
```

#### 2. 모듈 수준 문서

```python
"""
PMDG 공항 데이터 처리 모듈

이 모듈은 NAIP 형식의 공항 데이터를 처리하여 PMDG 호환
SQLite 데이터베이스 형식으로 변환하는 역할을 담당합니다. 주요 기능은 다음과 같습니다:

- CSV 파일 읽기 및 파싱
- DMS 좌표 형식 변환
- 공항명 조회 및 매칭
- 데이터 검증 및 정리
- SQLite 데이터베이스 쓰기

지원되는 입력 파일 형식:
- AD_HP.csv: 공항 기본 데이터 (NAIP 형식)
- Airport.dat: 공항명 조회 테이블

출력 형식:
- SQLite 데이터베이스, tbl_airports 테이블 포함

Author: Nav-data Team
Version: 2.0.0
License: MIT

Examples:
    명령줄 사용법:
    $ python PMDG_APT.py
    
    프로그래밍 인터페이스:
    >>> from PMDG_APT import AirportProcessor
    >>> processor = AirportProcessor(
    ...     csv_path='data/AD_HP.csv',
    ...     output_path='output/airports.s3db'
    ... )
    >>> result = processor.process()
    >>> print(f"처리 완료: {result.processed_count} 개 공항")
"""

import pandas as pd
import sqlite3
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path

# 모듈 수준 상수
DEFAULT_AREA_CODE = 'EEU'
DEFAULT_ENCODING = 'latin1'
SUPPORTED_ICAO_REGIONS = {'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW'}

# ... 나머지 코드
```

### 테스트 표준

#### 1. 단위 테스트

```python
import unittest
from unittest.mock import patch, mock_open
import pandas as pd
from PMDG_APT import AirportProcessor, convert_dms_to_decimal

class TestCoordinateConversion(unittest.TestCase):
    """좌표 변환 기능 테스트"""
    
    def test_valid_north_latitude(self):
        """유효한 북위 좌표 변환 테스트"""
        result, error = convert_dms_to_decimal("N390308.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 39.0522222, places=6)
    
    def test_valid_east_longitude(self):
        """유효한 동경 좌표 변환 테스트"""
        result, error = convert_dms_to_decimal("E1162930.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 116.4916667, places=6)
    
    def test_invalid_format(self):
        """유효하지 않은 좌표 형식 테스트"""
        result, error = convert_dms_to_decimal("INVALID")
        self.assertIsNone(result)
        self.assertIsNotNone(error)
        self.assertIn("유효하지 않은 DMS 형식", error)
    
    def test_boundary_coordinates(self):
        """경계 좌표 테스트"""
        # 북극점 테스트
        result, error = convert_dms_to_decimal("N900000.00")
        self.assertIsNone(error)
        self.assertEqual(result, 90.0)

class TestAirportProcessor(unittest.TestCase):
    """공항 데이터 처리기 테스트"""
    
    def setUp(self):
        """테스트 초기화"""
        self.processor = AirportProcessor(
            csv_file_path="test_data/AD_HP.csv",
            lookup_file_path="test_data/Airport.dat",
            output_db_path="test_output/test.s3db"
        )
    
    @patch('pandas.read_csv')
    def test_csv_loading(self, mock_read_csv):
        """CSV 파일 로드 테스트"""
        # CSV 데이터 모의
        mock_data = pd.DataFrame({
            'CODE_ID': ['ZBAA', 'ZSPD'],
            'GEO_LAT_ACCURACY': ['N390308.00', 'N311133.00'],
            'GEO_LONG_ACCURACY': ['E1162930.00', 'E1211056.00']
        })
        mock_read_csv.return_value = mock_data
        
        result = self.processor._load_csv_data()
        self.assertEqual(len(result), 2)
        self.assertEqual(result.iloc[0]['CODE_ID'], 'ZBAA')
    
    @patch('sqlite3.connect')
    def test_database_creation(self, mock_connect):
        """데이터베이스 생성 테스트"""
        mock_connection = mock_connect.return_value
        mock_cursor = mock_connection.cursor.return_value
        
        self.processor._create_database_tables()
        
        # 테이블 생성 SQL 실행 검증
        mock_cursor.execute.assert_called()
        create_table_calls = [call[0][0] for call in mock_cursor.execute.call_args_list]
        self.assertTrue(any('CREATE TABLE' in call for call in create_table_calls))
```

#### 2. 통합 테스트

```python
import tempfile
import os
import sqlite3
from pathlib import Path

class TestIntegration(unittest.TestCase):
    """통합 테스트"""
    
    def setUp(self):
        """임시 테스트 환경 생성"""
        self.test_dir = tempfile.mkdtemp()
        self.csv_file = Path(self.test_dir) / "test_airports.csv"
        self.lookup_file = Path(self.test_dir) / "airports.dat"
        self.output_db = Path(self.test_dir) / "output.s3db"
        
        # 테스트 데이터 파일 생성
        self.create_test_csv()
        self.create_test_lookup()
    
    def tearDown(self):
        """테스트 환경 정리"""
        import shutil
        shutil.rmtree(self.test_dir)
    
    def create_test_csv(self):
        """테스트 CSV 파일 생성"""
        test_data = """CODE_ID,GEO_LAT_ACCURACY,GEO_LONG_ACCURACY
ZBAA,N390308.00,E1162930.00
ZSPD,N311133.00,E1211056.00"""
        
        with open(self.csv_file, 'w', encoding='latin1') as f:
            f.write(test_data)
    
    def create_test_lookup(self):
        """테스트 조회 파일 생성"""
        lookup_data = """ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL"""
        
        with open(self.lookup_file, 'w') as f:
            f.write(lookup_data)
    
    def test_end_to_end_processing(self):
        """종단 간 처리 테스트"""
        processor = AirportProcessor(
            csv_file_path=str(self.csv_file),
            lookup_file_path=str(self.lookup_file),
            output_db_path=str(self.output_db)
        )
        
        result = processor.process()
        
        # 처리 결과 검증
        self.assertTrue(result.success)
        self.assertEqual(result.processed_count, 2)
        
        # 데이터베이스 내용 검증
        self.assertTrue(self.output_db.exists())
        
        conn = sqlite3.connect(str(self.output_db))
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        self.assertEqual(count, 2)
        
        cursor.execute("SELECT airport_identifier, airport_name FROM tbl_airports ORDER BY airport_identifier")
        airports = cursor.fetchall()
        
        self.assertEqual(airports[0][0], 'ZBAA')
        self.assertEqual(airports[0][1], 'BEIJING/CAPITAL')
        
        conn.close()
```

## 🔄 개발 워크플로우

### Git 워크플로우

우리는 **Git Flow** 워크플로우를 사용합니다:

```bash
# 1. 최신 main 브랜치에서 기능 브랜치 생성
git checkout main
git pull upstream main
git checkout -b feature/航路处理优化

# 2. 개발 작업 수행
# 코드 작성, 테스트 추가, 문서 업데이트

# 3. 변경 사항 커밋
git add .
git commit -m "feat: 항로 데이터 처리 성능 최적화

- 메모리 사용량 감소를 위한 배치 처리 구현
- 처리 상태 표시를 위한 진행률 바 추가
- 데이터베이스 쓰기 작업 최적화

Closes #123"

# 4. Fork한 저장소로 푸시
git push origin feature/航路处理优化

# 5. Pull Request 생성
```

### 커밋 메시지 표준

우리는 **Conventional Commits** 표준을 사용합니다:

```bash
# 형식: <타입>(<범위>): <설명>
#
# <선택적 본문>
#
# <선택적 푸터>

# 예시:
git commit -m "feat(airport): 공항 이름 자동 조회 기능 추가

ICAO 코드를 기반으로 한 공항 이름 자동 조회를 구현했으며,
여러 데이터 소스에서 공항 이름 정보를 가져오는 것을 지원합니다.

- AirportNameResolver 클래스 추가
- 조회 성능 향상을 위한 캐싱 지원
- 관련 단위 테스트 추가

Closes #45"

# 타입 설명:
# feat: 새 기능
# fix: 버그 수정
# docs: 문서 업데이트
# style: 코드 형식 조정 (기능에 영향 없음)
# refactor: 코드 리팩토링
# perf: 성능 최적화
# test: 테스트 추가 또는 수정
# chore: 빌드 프로세스 또는 보조 도구 변경
```

### Pull Request 워크플로우

#### 1. PR 체크리스트

PR을 제출하기 전에 다음을 확인하십시오:

- [ ] 코드가 프로젝트의 코딩 표준을 준수하는지 확인
- [ ] 필요한 테스트 케이스를 추가했는지 확인
- [ ] 모든 테스트가 통과했는지 확인
- [ ] 관련 문서를 업데이트했는지 확인
- [ ] 커밋 메시지가 표준을 준수하는지 확인
- [ ] 새로운 종속성을 도입하지 않았는지 (있는 경우 PR에서 설명 필요) 확인

#### 2. PR 템플릿

```markdown
## 📝 변경 설명
이 PR이 어떤 변경 사항을 포함하는지 간략하게 설명합니다.

## 🔧 변경 유형
- [ ] 버그 수정
- [ ] 새 기능
- [ ] 성능 최적화
- [ ] 코드 리팩토링
- [ ] 문서 업데이트
- [ ] 테스트 개선

## 🧪 테스트
이러한 변경 사항을 테스트하는 방법을 설명합니다:
- [ ] 새 단위 테스트 추가
- [ ] 통합 테스트 추가
- [ ] 수동 테스트 단계:
  1. 단계1
  2. 단계2

## 📸 스크린샷 (해당하는 경우)
UI 변경 또는 출력 형식 변경이 있는 경우 스크린샷을 추가하십시오.

## 🔗 관련 이슈
Fixes #123
Related to #456

## 📋 체크리스트
- [ ] 내 코드는 프로젝트의 코딩 표준을 준수합니다.
- [ ] 내 코드를 자체 검토했습니다.
- [ ] 해당 테스트를 추가했습니다.
- [ ] 새로운 테스트 및 기존 테스트가 모두 통과했습니다.
- [ ] 관련 문서를 업데이트했습니다.

## 💬 추가 설명
추가 설명이 필요한 내용이 있다면 추가하십시오.
```

## 🐛 문제 보고

### 버그 보고 템플릿

문제를 발견하면 다음 템플릿을 사용하여 이슈를 생성하십시오:

```markdown
**🐛 버그 설명**
발생한 문제를 간결하고 명확하게 설명합니다.

**🔄 재현 단계**
1. '...'로 이동
2. '...' 클릭
3. '...'까지 스크롤
4. 오류 관찰

**✅ 예상 동작**
예상되는 동작을 설명합니다.

**💻 환경 정보**
- 운영체제: [예: Windows 10, macOS 11.6, Ubuntu 20.04]
- Python 버전: [예: 3.9.7]
- Nav-data 버전: [예: 2.1.0]
- 기타 관련 소프트웨어 버전:

**📄 오류 로그**
해당하는 경우, 오류 로그 또는 스크린샷을 추가하십시오.

```
[여기에 로그 내용 붙여넣기]
```

**📁 입력 데이터**
문제가 특정 입력 데이터와 관련된 경우, 예시 데이터를 제공하십시오 (민감 정보 제거).

**🔍 추가 정보**
문제 진단에 도움이 되는 기타 정보를 추가합니다.
```

### 기능 요청 템플릿

```markdown
**🚀 기능 설명**
추가하고자 하는 기능을 간결하고 명확하게 설명합니다.

**💡 사용 시나리오**
이 기능이 어떤 문제를 해결하거나 어떤 프로세스를 개선하는지 설명합니다.

**📋 상세 요구사항**
- [ ] 요구사항1: 설명
- [ ] 요구사항2: 설명
- [ ] 요구사항3: 설명

**🎨 가능한 구현 방안**
구현 아이디어가 있다면 간략하게 설명하십시오.

**📚 참고 자료**
관련 문서, 표준 또는 참고 자료 링크를 제공하십시오.

**📊 우선순위**
- [ ] 낮음 - 시간 여유가 있을 때 수행
- [ ] 중간 - 중요하지만 긴급하지 않음
- [ ] 높음 - 가능한 한 빨리 구현 필요
- [ ] 긴급 - 다른 작업을 방해함

**💬 추가 설명**
추가 설명이 필요한 내용이 있다면 추가하십시오.
```

## 📚 개발 환경 설정

### IDE 설정 권장 사항

#### Visual Studio Code

권장 확장 기능:
```json
{
    "recommendations": [
        "ms-python.python",
        "ms-python.flake8",
        "ms-python.pylint",
        "ms-python.black-formatter",
        "njpwerner.autodocstring",
        "ms-python.isort",
        "charliermarsh.ruff"
    ]
}
```

작업 공간 설정 (`.vscode/settings.json`):
```json
{
    "python.defaultInterpreterPath": "./nav-data-dev/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length=88"],
    "python.sortImports.args": ["--profile", "black"],
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    }
}
```

#### PyCharm

1. 코드 스타일 설정:
   - File → Settings → Editor → Code Style → Python
   - "Black" 프리셋 선택

2. 테스트 러너 설정:
   - File → Settings → Tools → Python Integrated Tools
   - 기본 테스트 러너: pytest

### 개발 도구 설정

#### pre-commit 훅

`.pre-commit-config.yaml` 생성:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
  
  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
        language_version: python3
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88, --extend-ignore=E203]
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: [--profile=black]
```

설치 및 활성화:
```bash
pip install pre-commit
pre-commit install
```

## 🏆 모범 사례

### 성능 최적화

1. **메모리 관리**
   ```python
   # ✅ 좋은 방법: 제너레이터를 사용하여 대용량 파일 처리
   def process_large_file(file_path):
       with open(file_path, 'r') as f:
           for line in f:
               yield process_line(line)
   
   # ❌ 피해야 할 방법: 전체 파일을 한 번에 메모리에 로드
   def process_large_file_bad(file_path):
       with open(file_path, 'r') as f:
           lines = f.readlines()  # 많은 메모리를 소비할 수 있음
       return [process_line(line) for line in lines]
   ```

2. **데이터베이스 작업 최적화**
   ```python
   # ✅ 좋은 방법: 배치 삽입
   def insert_records_batch(connection, records, batch_size=1000):
       cursor = connection.cursor()
       for i in range(0, len(records), batch_size):
           batch = records[i:i + batch_size]
           cursor.executemany(
               "INSERT INTO table (col1, col2) VALUES (?, ?)", 
               batch
           )
           connection.commit()
   
   # ❌ 피해야 할 방법: 레코드별 삽입
   def insert_records_one_by_one(connection, records):
       cursor = connection.cursor()
       for record in records:
           cursor.execute("INSERT INTO table (col1, col2) VALUES (?, ?)", record)
           connection.commit()  # 매번 커밋하여 성능에 영향
   ```

### 오류 처리

```python
# ✅ 좋은 오류 처리
def process_coordinate(dms_string: str) -> float:
    """좌표 문자열을 처리하고 십진수로 반환합니다"""
    try:
        return convert_dms_to_decimal(dms_string)
    except ValueError as e:
        logging.warning(f"좌표 형식 오류: {dms_string}, 오류: {e}")
        raise CoordinateError(f"좌표를 파싱할 수 없음: {dms_string}") from e
    except Exception as e:
        logging.error(f"좌표 처리 중 알 수 없는 오류 발생: {e}")
        raise

# ❌ 피해야 할 오류 처리
def process_coordinate_bad(dms_string):
    try:
        return convert_dms_to_decimal(dms_string)
    except:  # 모든 예외를 포착하여 디버깅 어려움
        return None  # 오류 정보 손실
```

### 테스트 작성

```python
# ✅ 좋은 테스트
class TestCoordinateProcessing(unittest.TestCase):
    def test_valid_north_latitude_conversion(self):
        """유효한 북위 좌표 변환 테스트"""
        # Given
        dms_input = "N390308.00"
        expected_decimal = 39.0522222
        
        # When
        result = convert_dms_to_decimal(dms_input)
        
        # Then
        self.assertAlmostEqual(result, expected_decimal, places=6)
    
    def test_invalid_format_raises_error(self):
        """유효하지 않은 형식에서 적절한 오류 발생 테스트"""
        # Given
        invalid_input = "INVALID_FORMAT"
        
        # When/Then
        with self.assertRaises(CoordinateError) as context:
            convert_dms_to_decimal(invalid_input)
        
        self.assertIn("좌표를 파싱할 수 없음", str(context.exception))

# ❌ 피해야 할 테스트
def test_coordinate():  # 테스트 이름 불분명
    result = convert_dms_to_decimal("N390308.00")
    assert result == 39.0522222  # 부동 소수점 정밀 비교는 실패할 수 있음
```

## 📞 도움 받기

기여 과정에서 문제가 발생하면:

1. **문서 참조** - 먼저 프로젝트 문서와 이 기여 가이드를 확인하십시오.
2. **기존 이슈 검색** - 유사한 문제가 발생한 적이 있는지 확인하십시오.
3. **토론 참여** - GitHub Discussions에서 질문하십시오.
4. **관리자에게 연락** - GitHub Issues를 통해 프로젝트 관리자에게 연락하십시오.

### 커뮤니티 가이드라인

우리는 개방적이고 친근한 커뮤니티 환경을 조성하기 위해 노력합니다:

- **타인 존중** - 모든 참여자에게 예의를 갖추고 존중하십시오.
- **건설적인 피드백** - 유용하고 건설적인 의견과 제안을 제공하십시오.
- **인내심 있는 학습** - 초보자가 배우도록 돕고 지식과 경험을 공유하십시오.
- **협력 정신** - 프로젝트 개선을 위해 함께 노력하십시오.

## 🎉 기여자 인정

우리는 다음 장소에서 기여자를 인정합니다:
- README.md의 기여자 섹션
- CHANGELOG.md의 버전 업데이트 기록
- GitHub Releases의 감사 명단

Nav-data 프로젝트에 기여해 주셔서 감사합니다! 모든 기여는 이 프로젝트를 더 좋게 만듭니다.

---

**기억하세요**: 좋은 코드는 사람이 읽기 좋게 작성되어야 하며, 기계는 단지 그것을 실행할 수 있을 뿐입니다.
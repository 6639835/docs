# 기여 가이드

Nav-data 오픈소스 프로젝트에 참여해 주셔서 감사합니다! 항공 항법 데이터 변환 도구에 대한 여러분의 기여에 깊이 감사드립니다.

## 🤝 참여 방법

### 문제 보고 (Issues)
- **버그 보고**: 프로그램 오류 또는 비정상적인 동작 발견 시
- **기능 요청**: 새로운 기능 제안 또는 기존 기능 개선
- **문서 개선**: 문서 내 오류나 불분명한 부분 지적
- **성능 문제**: 성능 병목 현상 보고 또는 최적화 제안

### 코드 기여 (Pull Requests)
- **버그 수정**: 알려진 문제 해결
- **신규 기능 개발**: 새로운 데이터 처리 기능 구현
- **성능 최적화**: 코드 실행 효율 향상
- **코드 리팩토링**: 코드 구조 및 유지보수성 개선

### 문서 기여
- **기술 문서**: API 문서 및 아키텍처 설명 보완
- **사용자 가이드**: 사용 설명 및 튜토리얼 개선
- **예제 코드**: 더 많은 사용 예제 제공
- **다국어 번역**: 문서를 다른 언어로 번역

## 📋 시작하기 전에

### 1. 프로젝트 이해
기여를 시작하기 전에 다음을 확인하십시오:
- [아키텍처 설명](./architecture.md) 보기
- [사용 설명](./guide/usage.md) 이해
- 기존 [Issues](https://github.com/your-repo/nav-data/issues) 둘러보기

### 2. 환경 준비
개발 환경이 다음 요구 사항을 충족하는지 확인하십시오:
- Python 3.6+
- Git
- 필수 종속성 패키지 ( [설치 가이드](./guide/installation.md) 참조)

### 3. 프로젝트 Fork
1. [Nav-data GitHub 페이지](https://github.com/your-repo/nav-data) 방문
2. 오른쪽 상단의 "Fork" 버튼 클릭
3. Fork한 저장소를 로컬로 클론:
   ```bash
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

## 🐛 문제 보고

### 버그 보고 템플릿
버그를 보고할 때 다음 정보를 제공하십시오:

```markdown
**버그 설명**
발견한 문제에 대해 간략하게 설명합니다.

**재현 단계**
1. '...' 명령 실행
2. '...' 데이터 파일 사용
3. '...' 오류 관찰

**예상 동작**
예상되는 상황을 설명합니다.

**실제 동작**
실제로 발생한 상황을 설명합니다.

**환경 정보**
- 운영체제: [예: macOS 12.0]
- Python 버전: [예: 3.9.7]
- Nav-data 버전: [예: v1.2.0]

**추가 정보**
- 오류 로그
- 관련 스크린샷
- 예제 데이터 파일 (해당하는 경우)
```

### 기능 요청 템플릿

```markdown
**기능 설명**
추가하고자 하는 기능에 대해 간략하게 설명합니다.

**사용 시나리오**
이 기능이 해결하는 구체적인 문제 또는 사용 시나리오를 설명합니다.

**제안하는 구현 방안**
구체적인 구현 아이디어가 있다면 상세하게 설명합니다.

**대안**
고려했던 다른 대안들을 설명합니다.

**추가 정보**
기타 관련 정보 또는 참조 자료.
```

## 💻 코드 기여 프로세스

### 1. 브랜치 생성
귀하의 기여를 위한 새로운 브랜치를 생성하십시오:

```bash
# 确保 main 分支是最新的
git checkout main
git pull upstream main

# 创建新分支
git checkout -b feature/your-feature-name
# 或对于 bug 修复
git checkout -b fix/issue-number-description
```

### 2. 개발 및 테스트
개발 과정에서:

```bash
# 频繁提交更改
git add .
git commit -m "feat: add waypoint validation function"

# 运行测试确保代码质量
python -m pytest tests/
python -m flake8 .
python -m black . --check
```

### 3. Pull Request 제출
개발 완료 후:

```bash
# 推送分支到您的 Fork
git push origin feature/your-feature-name
```

그런 다음 GitHub에서 Pull Request를 생성하십시오.

### Pull Request 템플릿

```markdown
**변경 유형**
- [ ] 버그 수정
- [ ] 신규 기능
- [ ] 코드 리팩토링
- [ ] 문서 업데이트
- [ ] 성능 최적화

**변경 설명**
이 PR의 변경 내용을 간략하게 설명합니다.

**관련 Issue**
- Fixes #(issue number)
- Related to #(issue number)

**테스트**
- [ ] 새로운 테스트 케이스 추가됨
- [ ] 모든 기존 테스트 통과
- [ ] 수동 테스트 검증 완료

**체크리스트**
- [ ] 코드가 프로젝트 코딩 규칙을 따릅니다
- [ ] 필요한 문서가 추가되었습니다
- [ ] 관련 README 또는 설정이 업데이트되었습니다
- [ ] 하위 호환성을 고려했습니다
```

## 📝 코드 규칙

### Python 코딩 표준

#### 1. 코드 스타일
[PEP 8](https://pep8.org/)을 기본으로 사용하며, 다음 추가 규칙을 따릅니다:

```python
# 임포트 순서
import os  # 표준 라이브러리
import sys

import pandas as pd  # 서드파티 라이브러리
import numpy as np

from .utils import helper_function  # 로컬 임포트

# 클래스 정의
class NavigationDataProcessor:
    """
    항법 데이터 처리기
    
    CSV, PDF 등 다양한 형식의 항공 항법 데이터 변환을 처리합니다.
    
    Attributes:
        input_format (str): 입력 데이터 형식
        output_format (str): 출력 데이터 형식
    """
    
    def __init__(self, input_format: str, output_format: str):
        """
        처리기 초기화
        
        Args:
            input_format: 입력 데이터 형식 ('csv', 'pdf', 'dat')
            output_format: 출력 데이터 형식 ('dat', 'txt', 'json')
        """
        self.input_format = input_format
        self.output_format = output_format
    
    def process(self, data: Any) -> Any:
        """
        데이터를 처리하는 주요 메서드
        
        Args:
            data: 입력 데이터
            
        Returns:
            처리된 데이터
            
        Raises:
            ValueError: 입력 데이터 형식이 지원되지 않을 때 발생
        """
        if not self._validate_input(data):
            raise ValueError(f"Invalid input format: {type(data)}")
        
        return self._convert_data(data)
```

#### 2. 명명 규칙
```python
# 상수: 전체 대문자, 밑줄로 구분
CHINA_AREAS = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW'}
MAX_RETRY_COUNT = 3

# 변수 및 함수: 소문자, 밑줄로 구분
def process_waypoint_data(input_file: str) -> List[Dict]:
    waypoint_list = []
    error_count = 0
    return waypoint_list

# 클래스 이름: 파스칼 표기법
class CSVDataProcessor:
    pass

# 비공개 메서드: 단일 밑줄 접두사
def _validate_coordinates(self, lat: float, lon: float) -> bool:
    pass

# 내부 사용: 이중 밑줄 접두사
def __internal_helper(self) -> None:
    pass
```

#### 3. 타입 어노테이션
모든 공개 함수는 타입 어노테이션을 포함해야 합니다:

```python
from typing import Dict, List, Optional, Union, Any

def convert_coordinates(
    input_coords: Union[str, Tuple[float, float]], 
    output_format: str = "decimal"
) -> Optional[Dict[str, float]]:
    """
    좌표 형식 변환
    
    Args:
        input_coords: 문자열 또는 튜플 형식의 입력 좌표
        output_format: 'decimal' 또는 'dms'를 지원하는 출력 형식
        
    Returns:
        변환된 좌표 딕셔너리, 실패 시 None 반환
    """
    pass
```

#### 4. 독스트링
Google 스타일의 독스트링을 사용합니다:

```python
def process_airway_csv(csv_file: str, output_file: str, 
                      excluded_areas: Set[str] = None) -> bool:
    """
    항로 CSV 데이터 파일 처리
    
    CSV 파일에서 항로 데이터를 읽고, 검증 및 변환하여
    X-Plane DAT 형식으로 출력합니다. 영역 필터링 기능을 지원합니다.
    
    Args:
        csv_file: 입력 CSV 파일 경로
        output_file: 출력 DAT 파일 경로  
        excluded_areas: 제외할 영역 코드 집합, 기본값은 None
        
    Returns:
        처리 성공 시 True, 실패 시 False 반환
        
    Raises:
        FileNotFoundError: 입력 파일이 존재하지 않을 때 발생
        ValueError: CSV 형식이 잘못되었을 때 발생
        
    Example:
        >>> process_airway_csv('routes.csv', 'earth_awy.dat', {'ZB', 'ZG'})
        True
        
    Note:
        처리 과정에서 원본 출력 파일이 자동으로 백업됩니다.
    """
    pass
```

### 코드 품질 도구

#### 1. 코드 포맷팅
[Black](https://black.readthedocs.io/)을 사용하여 코드를 포맷팅합니다:

```bash
# 설치
pip install black

# 전체 프로젝트 포맷팅
black .

# 포맷팅 확인 (수정하지 않음)
black . --check

# 단일 파일 포맷팅
black script.py
```

#### 2. 코드 검사
[flake8](https://flake8.pycqa.org/)을 사용하여 코드를 검사합니다:

```bash
# 설치
pip install flake8

# 전체 프로젝트 검사
flake8 .

# 설정 파일 .flake8
[flake8]
max-line-length = 88
ignore = E203, W503
exclude = 
    .git,
    __pycache__,
    build,
    dist,
    venv,
    .venv
```

#### 3. 타입 검사
[mypy](http://mypy-lang.org/)를 사용하여 타입을 검사합니다:

```bash
# 설치
pip install mypy

# 타입 검사
mypy .

# 설정 파일 mypy.ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
```

### Git 커밋 규칙

#### 커밋 메시지 형식
[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 사용합니다:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### 커밋 유형
- `feat`: 신규 기능
- `fix`: 버그 수정
- `docs`: 문서 업데이트
- `style`: 코드 형식 (코드 실행에 영향을 주지 않는 변경)
- `refactor`: 리팩토링 (신규 기능 추가도, 버그 수정도 아닌 코드 변경)
- `perf`: 성능 최적화
- `test`: 테스트 추가
- `chore`: 빌드 프로세스 또는 보조 도구 변경

#### 예시
```bash
# 신규 기능
git commit -m "feat(airway): add AIRAC cycle validation"

# 버그 수정
git commit -m "fix(pdf): resolve coordinate parsing error for edge cases"

# 문서 업데이트
git commit -m "docs: update installation guide for macOS"

# 리팩토링
git commit -m "refactor(terminal): extract common validation logic"
```

## 🧪 테스트 가이드

### 테스트 구조
```
tests/
├── unit/                   # 단위 테스트
│   ├── test_airway.py
│   ├── test_pdf_extract.py
│   └── test_terminal.py
├── integration/            # 통합 테스트
│   ├── test_full_pipeline.py
│   └── test_module_interaction.py
├── fixtures/               # 테스트 데이터
│   ├── sample_data/
│   └── expected_outputs/
└── conftest.py            # pytest 설정
```

### 테스트 작성

#### 단위 테스트 예시
```python
import pytest
from unittest.mock import Mock, patch
from nav_data.airway import NavigationPoint, process_navigation_point

class TestNavigationPoint:
    """항법점 테스트 클래스"""
    
    def test_navigation_point_creation(self):
        """항법점 생성 테스트"""
        point = NavigationPoint("ABCDE", "DESIGNATED_POINT", "ZB")
        
        assert point.identifier == "ABCDE"
        assert point.type.code_type == "DESIGNATED_POINT"
        assert point.area_code == "ZB"
    
    def test_navigation_point_invalid_type(self):
        """유효하지 않은 항법점 타입 테스트"""
        with pytest.raises(ValueError):
            NavigationPoint("ABCDE", "INVALID_TYPE", "ZB")
    
    @pytest.mark.parametrize("identifier,expected", [
        ("ABCDE", True),
        ("", False),
        (None, False),
    ])
    def test_navigation_point_validation(self, identifier, expected):
        """매개변수화된 항법점 유효성 검사 테스트"""
        result = validate_navigation_identifier(identifier)
        assert result == expected
```

#### 통합 테스트 예시
```python
import tempfile
from pathlib import Path
from nav_data.pipeline import DataPipeline

class TestDataPipeline:
    """데이터 파이프라인 통합 테스트"""
    
    @pytest.fixture
    def temp_directory(self):
        """임시 디렉토리 fixture"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def sample_csv_data(self):
        """예제 CSV 데이터"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123"""
    
    def test_complete_pipeline(self, temp_directory, sample_csv_data):
        """완전한 데이터 처리 파이프라인 테스트"""
        # 테스트 데이터 준비
        input_file = temp_directory / "input.csv"
        input_file.write_text(sample_csv_data)
        output_file = temp_directory / "output.dat"
        
        # 파이프라인 실행
        pipeline = DataPipeline()
        result = pipeline.process(str(input_file), str(output_file))
        
        # 결과 검증
        assert result is True
        assert output_file.exists()
        
        output_content = output_file.read_text()
        assert "ABCDE" in output_content
        assert "FGHIJ" in output_content
```

### 테스트 실행
```bash
# 모든 테스트 실행
pytest

# 특정 테스트 파일 실행
pytest tests/unit/test_airway.py

# 특정 테스트 메서드 실행
pytest tests/unit/test_airway.py::TestNavigationPoint::test_navigation_point_creation

# 커버리지 보고서 생성
pytest --cov=nav_data tests/

# 상세 출력
pytest -v

# 첫 번째 실패에서 중단
pytest -x
```

## 📚 문서 기여

### 문서 구조
```
docs/
├── guide/                  # 사용자 가이드
│   ├── index.md           # 가이드 홈
│   ├── installation.md    # 설치 가이드
│   ├── configuration.md   # 설정 설명
│   └── usage.md           # 사용 설명
├── api/                    # API 문서
│   ├── airway.md
│   ├── pdf_extract.md
│   └── terminal.md
├── architecture.md         # 아키텍처 설명
├── contributing.md         # 기여 가이드
├── changelog.md           # 변경 로그
└── license.md             # 라이선스
```

### 문서 작성 규칙

#### Markdown 형식
```markdown
---
title: 문서 제목
description: 문서 설명
---

# 1단계 제목

문서 내용을 간략하게 소개합니다.

## 2단계 제목

### 3단계 제목

본문 내용은 명확한 한국어로 작성합니다.

#### 코드 예시
코드 블록을 사용하여 예시를 보여줍니다:

```python
def example_function():
    """예시 함수"""
    return "Hello, Nav-data!"
```

#### 참고 사항
> **주의**: 중요한 팁은 인용 형식으로 사용합니다.

**경고**: 경고 메시지는 굵게 표시합니다.

#### 링크 및 참조
- 내부 링크: [설치 가이드](./guide/installation.md)
- 외부 링크: [Python 공식 웹사이트](https://python.org)
- 코드 참조: `code` 형식으로 코드 참조
```

#### 기술 문서 작성 가이드
1. **명확하고 간결하게**: 간결하고 명확한 언어 사용
2. **구조화**: 제목, 목록, 표를 사용하여 내용 구성
3. **풍부한 예시**: 충분한 코드 예시 제공
4. **사용자 친화적**: 사용자 관점에서 문서 작성
5. **적시 업데이트**: 문서와 코드 동기화 유지

### API 문서
모든 공개 API에 대해 상세한 문서를 작성합니다:

```python
def process_csv_data(csv_file: str, output_format: str = "dat") -> Dict[str, Any]:
    """
    CSV 형식의 항법 데이터 처리
    
    이 함수는 CSV 형식의 항로 데이터를 읽고, 검증 및 변환하여
    지정된 형식의 항법 데이터 파일로 출력합니다.
    
    Args:
        csv_file (str): 입력 CSV 파일 경로
        output_format (str, optional): 출력 형식으로 'dat', 'json', 'xml'을 지원합니다.
                                     기본값은 'dat'입니다.
    
    Returns:
        Dict[str, Any]: 처리 결과 정보로 다음 키를 포함합니다:
            - 'success' (bool): 처리 성공 여부
            - 'processed_count' (int): 성공적으로 처리된 레코드 수
            - 'error_count' (int): 오류 레코드 수
            - 'output_file' (str): 출력 파일 경로
    
    Raises:
        FileNotFoundError: 입력 파일이 존재하지 않을 때 발생
        ValueError: CSV 형식이 올바르지 않을 때 발생
        PermissionError: 출력 파일을 작성할 수 없을 때 발생
    
    Example:
        기본 사용:
        
        >>> result = process_csv_data('airway_data.csv')
        >>> print(result['success'])
        True
        
        출력 형식 지정:
        
        >>> result = process_csv_data('airway_data.csv', 'json')
        >>> print(result['output_file'])
        'airway_data.json'
    
    Note:
        - 입력 CSV 파일은 표준 항로 데이터 필드를 포함해야 합니다
        - 처리 과정에서 데이터 무결성이 자동으로 검증됩니다
        - 중단 후 이어서 처리하는 기능을 지원합니다
    
    See Also:
        :func:`validate_csv_format`: CSV 형식 검증
        :func:`convert_coordinate_format`: 좌표 형식 변환
    """
    pass
```

## 🔍 코드 리뷰

### 리뷰 체크리스트

#### 기능성
- [ ] 코드가 예상 기능을 구현했습니다
- [ ] 모든 경계 조건이 처리되었습니다
- [ ] 오류 처리가 적절합니다
- [ ] 성능 요구 사항을 충족합니다

#### 코드 품질
- [ ] 코드 구조가 명확합니다
- [ ] 명명 규칙이 설명적입니다
- [ ] 함수의 책임이 단일합니다
- [ ] 코드 중복을 피했습니다

#### 보안성
- [ ] 입력 유효성 검사가 충분합니다
- [ ] 보안 취약점이 없습니다
- [ ] 민감한 정보가 적절히 처리되었습니다
- [ ] 권한 제어가 적절합니다

#### 테스트
- [ ] 테스트 커버리지가 충분합니다
- [ ] 테스트 케이스가 포괄적입니다
- [ ] 통합 테스트 통과
- [ ] 성능 테스트 요구 사항 충족

#### 문서
- [ ] 코드 주석이 충분합니다
- [ ] API 문서가 완전합니다
- [ ] 사용자 문서 업데이트
- [ ] 변경 로그 업데이트

### 리뷰 피드백
건설적인 피드백 제공:

```markdown
**전반적인 평가**
코드가 예상 기능을 구현했으며, 구조가 명확하고 테스트 커버리지가 충분합니다.

**구체적인 의견**
1. **코드 구조**: `process_data` 함수가 너무 길어 여러 작은 함수로 분할하는 것을 제안합니다.
2. **성능 최적화**: 45번째 줄의 반복문을 리스트 컴프리헨션으로 최적화하는 것을 고려할 수 있습니다.
3. **오류 처리**: 78번째 줄에 구체적인 예외 유형을 추가하는 것을 제안합니다.

**권장 수정 사항**
```python
# 이 코드를
for item in data_list:
    if validate_item(item):
        processed_list.append(process_item(item))

# 다음과 같이 변경하는 것을 제안합니다
processed_list = [
    process_item(item) 
    for item in data_list 
    if validate_item(item)
]
```

**기타**
문서에 사용 예시를 추가해야 합니다.
```

## 🚀 릴리스 프로세스

### 버전 번호 규칙
[Semantic Versioning](https://semver.org/lang/zh-CN/) (의미론적 버전 관리)를 사용합니다:

- **메이저 버전**: 호환되지 않는 API 변경
- **마이너 버전**: 하위 호환성을 유지하는 기능 추가
- **패치 버전**: 하위 호환성을 유지하는 문제 수정

예시: `1.2.3`

### 릴리스 체크리스트
릴리스 전에 다음을 확인하십시오:
- [ ] 모든 테스트 통과
- [ ] 문서 업데이트 완료
- [ ] 변경 로그 업데이트 완료
- [ ] 버전 번호 업데이트 완료
- [ ] 종속성 올바름
- [ ] 보안 검토 통과

## 🏆 기여자 보상

### 인정 메커니즘
- **코드 기여자**: README에 모든 기여자 명단 포함
- **문서 기여자**: 문서에 기여자 정보 표시
- **문제 보고자**: Issue 해결 후 감사 표현
- **장기 기여자**: 프로젝트 관리자로 초대

### 관리자 되기
장기적으로 활동적인 기여자는 프로젝트 관리자로 초대될 수 있으며, 다음을 얻습니다:
- 직접 푸시 권한
- Pull Request 검토 권한
- 프로젝트 의사 결정 참여 권한
- 프로젝트 소개에서의 특별 감사

## 📞 연락 방법

### 도움 받기
- **GitHub Issues**: 문제 보고 또는 기능 요청
- **GitHub Discussions**: 일반적인 토론 및 Q&A
- **문서**: 상세 사용 가이드 보기
- **코드 주석**: 소스 코드의 상세 주석 보기

### 커뮤니티 가이드라인
프로젝트에 참여할 때 다음 원칙을 따르십시오:
- **타인 존중**: 친절하고 전문적인 태도 유지
- **건설적인 토론**: 가치 있는 피드백 및 제안 제공
- **포괄성**: 다양한 배경의 기여자 환영
- **학습 지향**: 다른 사람의 학습 및 성장에 도움

## 🙏 감사

Nav-data 프로젝트에 기여해 주신 모든 개발자, 테스터, 문서 기여자 및 사용자 여러분께 감사드립니다!

### 특별 감사
- 핵심 유지보수 팀
- 장기 기여자
- 문제 보고자
- 문서 번역가
- 커뮤니티 서포터

---

**다시 한번 기여에 감사드립니다!** 🎉 여러분의 참여가 Nav-data를 더욱 발전시키고, 항공 시뮬레이션 커뮤니티에 더 나은 항법 데이터 도구를 제공합니다.
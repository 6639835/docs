# 🤝 TFDI 내비게이션 데이터 변환기 기여 가이드라인

TFDI 내비게이션 데이터 변환기 프로젝트에 오신 것을 환영합니다! 코드 기여, 문서 개선, 오류 보고 또는 기능 제안 등 모든 기여자분들의 참여에 감사드립니다.

## 🌟 기여 방법

### 💻 코드 기여
- 🐛 **버그 수정** - 알려진 문제 및 결함 해결
- ✨ **새 기능 개발** - 새로운 변환 기능 추가 또는 개선
- 📈 **성능 최적화** - 변환 속도 및 메모리 사용 효율성 향상
- 🧪 **테스트 강화** - 테스트 케이스 및 커버리지 증가
- 📚 **문서 개선** - API 문서 및 사용자 가이드 완성

### 📝 비코드 기여
- 🐛 **문제 보고** - 버그 및 호환성 문제 보고
- 💡 **기능 제안** - 새로운 기능 및 개선 제안
- 📖 **문서 작성** - 튜토리얼, 가이드 및 예시 작성
- 🌐 **현지화** - 인터페이스 및 문서 번역
- 🎓 **커뮤니티 지원** - 다른 사용자 문제 해결 지원

## 🚀 개발 환경 설정

### 환경 요구 사항

```bash
# Python 버전 요구 사항
Python 3.8+ (권장 3.9 또는 3.10)

# 운영 체제 지원
Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+)

# 메모리 요구 사항
최소 4GB RAM (권장 8GB+)
```

### 빠른 시작

#### 1. 프로젝트 클론
```bash
# 메인 저장소 클론
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# 또는 포크한 저장소 클론
git clone https://github.com/your-username/tfdi-nav-converter.git
cd tfdi-nav-converter
```

#### 2. 개발 환경 설정
```bash
# 가상 환경 생성
python -m venv venv

# 가상 환경 활성화
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# 개발 종속성 설치
pip install -r requirements-dev.txt
pip install -e .  # 편집 가능한 설치
```

#### 3. 설치 확인
```bash
# 테스트 스위트 실행
pytest

# 코드 품질 검사 실행
flake8 src/
mypy src/
black --check src/

# 변환기 실행
python -m tfdi_converter --help
```

### 개발 도구 설정

#### IDE 설정 (VS Code 권장)
```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./venv/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.mypyEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests/"]
}
```

#### 사전 커밋 훅
```bash
# pre-commit 설치
pip install pre-commit

# 훅 설치
pre-commit install

# 모든 훅 수동 실행
pre-commit run --all-files
```

## 📋 개발 프로세스

### 1. 기능 브랜치 생성

```bash
# 메인 브랜치가 최신 상태인지 확인
git checkout main
git pull origin main

# 새 기능 브랜치 생성
git checkout -b feature/add-new-format-support

# 또는 수정 브랜치
git checkout -b fix/memory-leak-in-processor
```

### 2. 개발 및 테스트

#### 코드 개발
```bash
# 코드 작성
# ... 개발 진행 ...

# 테스트 추가
# tests/test_new_feature.py

# 문서 업데이트
# docs/api/new_feature.md
```

#### 테스트 실행
```bash
# 모든 테스트 실행
pytest

# 특정 테스트 파일 실행
pytest tests/test_converter.py

# 실행 및 커버리지 보고서 생성
pytest --cov=tfdi_converter --cov-report=html

# 성능 테스트 실행
pytest tests/performance/ -m performance
```

#### 코드 품질 검사
```bash
# 코드 포맷팅
black src/ tests/

# 임포트 정렬
isort src/ tests/

# 정적 분석
flake8 src/ tests/
mypy src/

# 보안 검사
bandit -r src/
```

### 3. 코드 커밋

#### 커밋 메시지 규칙
[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 사용합니다:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**커밋 유형:**
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서 업데이트
- `style`: 코드 형식 조정
- `refactor`: 코드 리팩토링
- `test`: 테스트 관련
- `chore`: 빌드 프로세스 또는 보조 도구 변경
- `perf`: 성능 개선

**커밋 예시:**
```bash
# 새 기능
git commit -m "feat(converter): add support for MSFS native format"

# 버그 수정
git commit -m "fix(parser): handle malformed coordinate data gracefully"

# 문서 업데이트
git commit -m "docs(api): add examples for batch processing"

# 성능 개선
git commit -m "perf(processor): optimize memory usage in large dataset processing"
```

### 4. 푸시 및 PR 생성

```bash
# 원격 저장소에 브랜치 푸시
git push origin feature/add-new-format-support

# GitHub에서 Pull Request 생성
# PR 템플릿 작성
# 코드 검토 대기
```

## 📝 코드 규칙

### Python 코딩 규칙

#### 1. 코드 스타일
```python
# Black 포맷터의 기본 설정 사용
# 줄 길이: 88자
# 이중 따옴표 사용
# 함수 사이에 두 줄 공백

from typing import Dict, List, Optional, Union
import logging
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


@dataclass
class ConversionConfig:
    """변환 구성 클래스.
    
    TFDI 변환기의 다양한 구성 매개변수를 관리합니다.
    
    Attributes:
        output_dir: 출력 디렉토리 경로
        coordinate_precision: 좌표 정밀도
        enable_validation: 데이터 유효성 검사 사용 여부
    """
    output_dir: str = "Primary"
    coordinate_precision: int = 8
    enable_validation: bool = True


class FenixDataProcessor:
    """Fenix 데이터 프로세서.
    
    Fenix 데이터베이스에서 내비게이션 데이터를 읽고 처리하는 역할을 합니다.
    """
    
    def __init__(self, config: ConversionConfig) -> None:
        """프로세서 초기화.
        
        Args:
            config: 변환 구성 객체
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def process_waypoints(
        self, 
        waypoint_data: List[Dict[str, Union[str, float]]]
    ) -> List[Dict[str, Union[str, float]]]:
        """항로점 데이터를 처리합니다.
        
        Args:
            waypoint_data: 원본 항로점 데이터 목록
            
        Returns:
            처리된 항로점 데이터 목록
            
        Raises:
            DataProcessingError: 데이터 처리 중 오류 발생
        """
        try:
            processed_data = []
            
            for waypoint in waypoint_data:
                processed_waypoint = self._normalize_waypoint(waypoint)
                processed_data.append(processed_waypoint)
            
            self.logger.info(f"성공적으로 {len(processed_data)}개의 항로점 처리")
            return processed_data
            
        except Exception as e:
            self.logger.error(f"항로점 처리 실패: {e}")
            raise DataProcessingError(f"항로점 데이터를 처리할 수 없습니다: {e}") from e
    
    def _normalize_waypoint(
        self, waypoint: Dict[str, Union[str, float]]
    ) -> Dict[str, Union[str, float]]:
        """단일 항로점 데이터를 표준화합니다."""
        # 표준화 로직 구현
        normalized = waypoint.copy()
        
        # 좌표 정밀도 표준화
        if "latitude" in normalized:
            normalized["latitude"] = round(
                float(normalized["latitude"]), 
                self.config.coordinate_precision
            )
        
        return normalized
```

#### 2. 타입 힌트
```python
from typing import (
    Any, Dict, List, Optional, Union, 
    Callable, Iterator, TypeVar, Generic
)

# 타입 별칭
ConfigDict = Dict[str, Any]
WaypointData = Dict[str, Union[str, float]]
ProcessingResult = List[WaypointData]

# 제네릭 타입
T = TypeVar('T')

class DataCache(Generic[T]):
    """제네릭 데이터 캐시 클래스"""
    
    def __init__(self) -> None:
        self._cache: Dict[str, T] = {}
    
    def get(self, key: str) -> Optional[T]:
        """캐시 데이터 가져오기"""
        return self._cache.get(key)
    
    def set(self, key: str, value: T) -> None:
        """캐시 데이터 설정"""
        self._cache[key] = value
```

#### 3. 오류 처리
```python
class TFDIConverterError(Exception):
    """변환기 기본 예외 클래스"""
    pass


class DataValidationError(TFDIConverterError):
    """데이터 유효성 검사 예외"""
    pass


class DatabaseConnectionError(TFDIConverterError):
    """데이터베이스 연결 예외"""
    pass


def safe_database_operation(operation: Callable[[], T]) -> Optional[T]:
    """안전한 데이터베이스 작업 래퍼"""
    try:
        return operation()
    except sqlite3.Error as e:
        logger.error(f"데이터베이스 작업 실패: {e}")
        raise DatabaseConnectionError(f"데이터베이스 작업 실패: {e}") from e
    except Exception as e:
        logger.error(f"알 수 없는 오류: {e}")
        return None
```

### 테스트 규칙

#### 1. 테스트 구조
```python
# tests/test_converter.py
import pytest
from unittest.mock import Mock, patch
from pathlib import Path

from tfdi_converter.core.converter import FenixToTFDIConverter
from tfdi_converter.core.config import ConverterConfig
from tfdi_converter.exceptions import DataValidationError


class TestFenixToTFDIConverter:
    """Fenix에서 TFDI 변환기 테스트 클래스"""
    
    @pytest.fixture
    def sample_config(self) -> ConverterConfig:
        """예시 구성 생성"""
        return ConverterConfig(
            output_dir="test_output",
            coordinate_precision=6,
            enable_validation=True
        )
    
    @pytest.fixture
    def sample_database(self, tmp_path: Path) -> Path:
        """예시 데이터베이스 생성"""
        db_path = tmp_path / "test.db3"
        # 테스트 데이터베이스 생성 로직
        return db_path
    
    def test_converter_initialization(self, sample_config):
        """변환기 초기화 테스트"""
        converter = FenixToTFDIConverter(sample_config)
        
        assert converter.config == sample_config
        assert converter.config.coordinate_precision == 6
    
    def test_database_validation_success(
        self, sample_config, sample_database
    ):
        """데이터베이스 유효성 검사 성공 사례 테스트"""
        converter = FenixToTFDIConverter(sample_config)
        
        result = converter.validate_database(sample_database)
        
        assert result is True
    
    def test_database_validation_failure(self, sample_config):
        """데이터베이스 유효성 검사 실패 사례 테스트"""
        converter = FenixToTFDIConverter(sample_config)
        invalid_db = Path("nonexistent.db3")
        
        with pytest.raises(DataValidationError):
            converter.validate_database(invalid_db)
    
    @patch('tfdi_converter.core.converter.sqlite3.connect')
    def test_database_connection_error(
        self, mock_connect, sample_config, sample_database
    ):
        """데이터베이스 연결 오류 테스트"""
        mock_connect.side_effect = sqlite3.Error("연결 실패")
        converter = FenixToTFDIConverter(sample_config)
        
        with pytest.raises(DatabaseConnectionError):
            converter.convert(sample_database, start_terminal_id=1000)
    
    @pytest.mark.performance
    def test_large_database_performance(
        self, sample_config, large_test_database
    ):
        """대규모 데이터베이스 성능 테스트"""
        import time
        
        converter = FenixToTFDIConverter(sample_config)
        start_time = time.time()
        
        converter.convert(large_test_database, start_terminal_id=1000)
        
        elapsed_time = time.time() - start_time
        assert elapsed_time < 300  # 5분 이내에 완료되어야 함
```

#### 2. 테스트 데이터 관리
```python
# tests/conftest.py
import pytest
import sqlite3
from pathlib import Path


@pytest.fixture(scope="session")
def test_data_dir() -> Path:
    """테스트 데이터 디렉토리"""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_fenix_database(tmp_path: Path) -> Path:
    """예시 Fenix 데이터베이스 생성"""
    db_path = tmp_path / "sample_fenix.db3"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # 테스트 테이블 구조 생성
    cursor.execute("""
        CREATE TABLE Airports (
            AirportID TEXT PRIMARY KEY,
            AirportName TEXT,
            Latitude REAL,
            Longitude REAL
        )
    """)
    
    # 테스트 데이터 삽입
    cursor.execute("""
        INSERT INTO Airports VALUES 
        ('ZBAA', 'Beijing Capital', 40.080111, 116.584556),
        ('ZSPD', 'Shanghai Pudong', 31.143378, 121.805214)
    """)
    
    conn.commit()
    conn.close()
    
    return db_path
```

### 문서 규칙

#### 1. API 문서
```python
def convert_fenix_database(
    database_path: Path,
    output_dir: Path,
    config: Optional[ConverterConfig] = None
) -> ConversionResult:
    """Fenix 데이터베이스를 TFDI 형식으로 변환합니다.
    
    이 함수는 Fenix A320 내비게이션 데이터베이스 파일을 받아
    TFDI MD-11 호환 JSON 형식 파일 집합으로 변환합니다.
    
    Args:
        database_path: Fenix 데이터베이스 파일 경로 (.db3 파일)
        output_dir: 출력 디렉토리 경로, 변환된 파일이 이 디렉토리에 저장됩니다
        config: 선택적 변환 구성 객체, 제공되지 않으면 기본 구성 사용
    
    Returns:
        ConversionResult: 변환 결과 및 통계 정보를 포함하는 객체
        
    Raises:
        FileNotFoundError: 데이터베이스 파일이 존재하지 않을 때
        DataValidationError: 데이터베이스 형식이 올바르지 않을 때
        PermissionError: 출력 디렉토리에 쓰기 권한이 없을 때
        
    Example:
        >>> from pathlib import Path
        >>> from tfdi_converter import convert_fenix_database
        >>> 
        >>> result = convert_fenix_database(
        ...     database_path=Path("fenix_nav.db3"),
        ...     output_dir=Path("./output")
        ... )
        >>> print(f"변환 완료, {result.processed_records}개의 기록 처리")
        
    Note:
        변환 과정은 데이터베이스 크기에 따라 몇 분이 소요될 수 있습니다.
        변환 전에 원본 데이터를 백업하는 것이 좋습니다.
        
    See Also:
        - :class:`ConverterConfig`: 변환 구성 옵션
        - :class:`ConversionResult`: 변환 결과 상세
    """
    pass
```

#### 2. 사용자 문서
```markdown
# 사용 예시

## 기본 변환

```python
from tfdi_converter import FenixToTFDIConverter, ConverterConfig

# 구성 생성
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8
)

# 변환기 초기화
converter = FenixToTFDIConverter(config)

# 변환 실행
result = converter.convert(
    database_path="path/to/fenix.db3",
    start_terminal_id=1000
)

print(f"변환 완료! 출력 파일: {result.output_archive}")
```

## 고급 구성

```python
# 사용자 지정 구성
config = ConverterConfig(
    output_dir="Custom_Output",
    coordinate_precision=6,
    vnav_threshold=3.0,
    enable_faf_detection=True,
    compression_level=9
)
```

## 🧪 테스트 가이드

### 테스트 전략

#### 1. 단위 테스트
- **커버리지 목표**: 90%+
- **테스트 범위**: 모든 공개 메서드 및 주요 비공개 메서드
- **Mock 전략**: 외부 종속성 격리 (데이터베이스, 파일 시스템)

#### 2. 통합 테스트  
- **데이터베이스 통합**: 실제 테스트 데이터베이스 사용
- **파일 시스템 통합**: 실제 파일 읽기/쓰기 작업 테스트
- **종단간 테스트**: 전체 변환 프로세스 테스트

#### 3. 성능 테스트
- **벤치마크 테스트**: 다양한 데이터셋 크기의 처리 시간 기록
- **메모리 테스트**: 메모리 사용량 및 누수 모니터링
- **동시성 테스트**: 멀티스레딩 및 동시성 안전성 테스트

### 테스트 실행

```bash
# 빠른 테스트 (성능 테스트 제외)
pytest -m "not performance"

# 전체 테스트 스위트
pytest

# 특정 모듈 테스트
pytest tests/test_converter.py

# 커버리지 테스트
pytest --cov=tfdi_converter --cov-report=term-missing

# 성능 벤치마크 테스트
pytest tests/performance/ --benchmark-only
```

## 📚 문서 기여

### 문서 유형

#### 1. 사용자 문서
- **설치 가이드**: 상세한 설치 단계
- **사용 튜토리얼**: 기초부터 고급까지의 사용 예시
- **문제 해결**: 자주 묻는 질문 및 해결책
- **API 참조**: 완전한 API 문서

#### 2. 개발자 문서
- **아키텍처 설계**: 시스템 아키텍처 및 설계 철학
- **기여 가이드라인**: 본 문서
- **코딩 규칙**: 코드 스타일 및 모범 사례
- **릴리스 프로세스**: 버전 릴리스 및 유지 보수 프로세스

### 문서 빌드

```bash
# 문서 종속성 설치
pip install -r docs/requirements.txt

# 문서 빌드
cd docs/
make html

# 실시간 미리보기
make livehtml
```

## 🐛 문제 보고

### 문제 보고 템플릿

```markdown
**문제 설명**
발생한 문제를 명확하고 간결하게 설명하십시오.

**재현 단계**
1. '...' 실행
2. '...' 입력
3. '...' 오류 확인

**예상 동작**
예상되는 상황을 설명하십시오.

**실제 동작**
실제로 발생한 상황을 설명하십시오.

**환경 정보**
- OS: [예: Windows 11, macOS 12.0, Ubuntu 20.04]
- Python: [예: 3.9.16]
- 변환기 버전: [예: v1.0.0]
- Fenix 버전: [예: v1.2.0]
- TFDI 버전: [예: v1.1.0]

**데이터베이스 정보**
- 데이터베이스 크기: [예: 150MB]
- 기록 수: [예: ~50,000개]
- AIRAC 주기: [예: 2508]

**로그 정보**
```
관련 로그 정보 또는 오류 스택 붙여넣기
```

**첨부 파일**
- 구성 파일
- 오류 스크린샷
- 예시 데이터 (가능한 경우)
```

### 문제 태그

다음 태그를 사용하여 문제를 분류하십시오:
- 🐛 `bug` - 오류 보고
- ✨ `enhancement` - 기능 요청
- 📚 `documentation` - 문서 관련
- ❓ `question` - 사용 문제
- 🔥 `urgent` - 긴급 문제
- 🆕 `good first issue` - 신규 기여자에게 적합

## 🏆 인정 및 보상

### 기여자 인정

#### 1. 코드 기여자
- **커밋자 목록**: README 및 문서 내 기여자 명단
- **릴리스 노트**: 버전 릴리스 노트에서 특별 감사
- **GitHub 통계**: 기여 통계 및 성과 배지

#### 2. 문서 기여자
- **문서 서명**: 관련 문서 페이지에 서명
- **번역 인정**: 다국어 버전의 번역자 명단
- **튜토리얼 작성자**: 커뮤니티 튜토리얼 작성자 인정

#### 3. 커뮤니티 기여자
- **문제 보고**: 중요 문제 발견자에 대한 특별 감사
- **테스트 기여**: 베타 테스트 및 품질 보증 기여자
- **홍보 기여**: 커뮤니티 홍보 및 교육 기여자

### 특별 기여 보상

#### 월간 기여자
- 매월 우수 기여자 선정
- 프로젝트 홈페이지 및 소셜 미디어 홍보
- 특별 GitHub 배지 및 타이틀

#### 연간 기여자
- 연간 최고 기여자 선정
- 맞춤 제작 기념품 및 인증서
- 프로젝트 의사결정 위원회 초대

## 📞 연락처

### 개발 팀 연락처

- **프로젝트 관리자**: @maintainer-username
- **기술 책임자**: @tech-lead-username  
- **커뮤니티 관리**: @community-manager-username

### 소통 채널

- **GitHub Issues**: 기술 문제 및 기능 요청
- **GitHub Discussions**: 일반 토론 및 Q&A
- **메일링 리스트**: dev@tfdi-converter.org
- **Discord**: [초대 링크]

### 응답 시간 약속

- **버그 보고**: 48시간 이내 응답
- **기능 요청**: 1주 이내 회신
- **Pull Request**: 3영업일 이내 검토
- **커뮤니티 문제**: 24시간 이내 회신

---

**TFDI 내비게이션 데이터 변환기에 기여해 주셔서 감사합니다!** 

더 나은 비행 시뮬레이션 도구를 함께 만들기를 기대합니다. 🚁✨

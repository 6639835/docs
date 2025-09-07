# 🤝 기여 가이드

iFly 내비게이션 데이터 변환기 프로젝트에 관심을 가져주셔서 감사합니다! 모든 형태의 기여를 환영하며 감사드립니다.

## 🌟 기여 방법

### 💻 코드 기여
- 🐛 버그 수정
- ✨ 새로운 기능 추가
- 📈 성능 최적화
- 🧪 테스트 케이스 추가
- 📚 문서 개선

### 📝 비코드 기여
- 🐛 문제 보고
- 💡 기능 제안
- 📖 문서 보완
- 🌐 번역 지원
- 🎓 튜토리얼 제작

## 🚀 빠르게 시작하기

### 1. 환경 준비

```bash
# 저장소 복제
git clone https://github.com/your-username/ifly-nav-converter.git
cd ifly-nav-converter

# 가상 환경 생성
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# 의존성 설치
pip install -r requirements.txt
pip install -r requirements-dev.txt  # 개발 의존성
```

### 2. 개발 환경 설정

```bash
# 프리 커밋 훅 설치
pre-commit install

# 테스트 실행
pytest

# 코드 품질 검사
flake8 .
mypy .
black . --check
```

## 📋 개발 흐름

### 1. 기능 브랜치 생성

```bash
# 메인 브랜치에서 새 브랜치 생성
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# 또는 수정 브랜치
git checkout -b fix/issue-description
```

### 2. 개발 및 테스트

```bash
# 개발 진행
# ... 코드 작성 ...

# 테스트 실행
pytest tests/

# 코드 품질 검사
black .
flake8 .
mypy .
```

### 3. 코드 커밋

```bash
# 파일 추가
git add .

# 커밋 (커밋 메시지 규칙 준수)
git commit -m "feat: add new feature description"

# 원격 브랜치로 푸시
git push origin feature/your-feature-name
```

### 4. Pull Request 생성

1. GitHub에서 Pull Request 생성
2. 상세한 PR 설명 작성
3. 모든 검사가 통과되었는지 확인
4. 코드 검토 대기

## 📝 코드 규칙

### Python 코드 스타일

코드 품질을 보장하기 위해 다음 도구를 사용합니다:

- **Black**: 코드 포맷팅
- **Flake8**: 코드 스타일 검사
- **MyPy**: 타입 검사
- **isort**: 임포트 정렬

### 코드 예시

```python
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class NavigationDataConverter:
    """내비게이션 데이터 변환기 메인 클래스.
    
    이 클래스는 Fenix 내비게이션 데이터를 iFly 형식으로 변환하는 역할을 합니다.
    
    Attributes:
        config: 변환기 설정
        logger: 로거
    """
    
    def __init__(self, config: ConverterConfig) -> None:
        """변환기를 초기화합니다.
        
        Args:
            config: 변환기 설정 객체
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def convert_data(
        self, 
        source_path: Path,
        target_path: Path,
        options: Optional[Dict[str, Any]] = None
    ) -> bool:
        """내비게이션 데이터를 변환합니다.
        
        Args:
            source_path: 원본 데이터 경로
            target_path: 대상 데이터 경로  
            options: 선택적 변환 옵션
            
        Returns:
            변환 성공 여부
            
        Raises:
            ConversionError: 변환 중 오류 발생
        """
        try:
            # 변환 로직 구현
            return True
        except Exception as e:
            self.logger.error(f"변환 실패: {e}")
            raise ConversionError(f"데이터 변환 실패: {e}") from e
```

### 커밋 메시지 규칙

[Conventional Commits](https://www.conventionalcommits.org/) 규칙을 사용합니다:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**타입 식별자:**
- `feat`: 새로운 기능
- `fix`: 버그 수정
- `docs`: 문서 업데이트
- `style`: 코드 형식 조정
- `refactor`: 코드 리팩토링
- `test`: 테스트 케이스
- `chore`: 빌드 프로세스 또는 보조 도구 변경

**예시:**
```
feat(converter): add magnetic declination calculation

- Implement WMM-2025 model integration
- Add pygeomag dependency
- Improve calculation accuracy

Closes #123
```

## 🧪 테스트 가이드

### 테스트 구조

```
tests/
├── unit/           # 단위 테스트
├── integration/    # 통합 테스트
├── fixtures/       # 테스트 데이터
└── conftest.py     # 테스트 설정
```

### 테스트 작성

```python
import pytest
from pathlib import Path
from ifly_converter.converter import NavigationDataConverter


class TestNavigationDataConverter:
    """내비게이션 데이터 변환기 테스트 클래스."""
    
    @pytest.fixture
    def converter(self):
        """테스트용 변환기 인스턴스를 생성합니다."""
        config = ConverterConfig(
            output_dir="test_output",
            coordinate_precision=8
        )
        return NavigationDataConverter(config)
    
    def test_convert_data_success(self, converter, tmp_path):
        """데이터 변환 성공 시나리오를 테스트합니다."""
        source = tmp_path / "source.db3"
        target = tmp_path / "target"
        
        # 테스트 데이터 생성
        source.touch()
        
        # 변환 실행
        result = converter.convert_data(source, target)
        
        # 결과 검증
        assert result is True
        assert target.exists()
    
    def test_convert_data_failure(self, converter):
        """데이터 변환 실패 시나리오를 테스트합니다."""
        with pytest.raises(ConversionError):
            converter.convert_data(
                Path("nonexistent.db3"),
                Path("target")
            )
```

### 테스트 실행

```bash
# 모든 테스트 실행
pytest

# 특정 테스트 파일 실행
pytest tests/unit/test_converter.py

# 실행 및 커버리지 보고서 생성
pytest --cov=ifly_converter --cov-report=html

# 성능 테스트 실행
pytest tests/performance/ -m performance
```

## 📚 문서 기여

### 문서 구조

```
docs/
├── guide/          # 사용자 가이드
├── api/            # API 문서
├── examples/       # 예시 코드
└── deployment/     # 배포 가이드
```

### 문서 규칙

- **Markdown** 형식 사용
- 코드 예시 포함
- 다국어 지원 제공
- 문서 업데이트 유지

### 문서 예시

```markdown
## 🔧 설정 관리

### 기본 설정

변환기는 `ConverterConfig` 클래스를 사용하여 설정을 관리합니다:

```python
from ifly_converter.config import ConverterConfig

# 기본 설정 생성
config = ConverterConfig()

# 사용자 지정 설정
config = ConverterConfig(
    output_dir="custom_output",
    coordinate_precision=6,
    enable_validation=True
)
```

### 설정 옵션

| 옵션 | 타입 | 기본값 | 설명 |
|------|------|--------|------|
| `output_dir` | str | "output" | 출력 디렉토리 |
| `coordinate_precision` | int | 8 | 좌표 정밀도 |
| `enable_validation` | bool | True | 유효성 검사 활성화 |
```

## 🐛 문제 보고

### 문제 보고 템플릿

문제를 보고할 때 다음 정보를 제공해주세요:

```markdown
**문제 설명**
발생한 문제를 명확하고 간결하게 설명합니다.

**재현 단계**
1. 첫 번째 단계 '...'
2. 두 번째 단계 '...'
3. 세 번째 단계 '...'
4. 오류 확인

**예상되는 동작**
기대하는 동작을 설명합니다.

**실제 동작**
실제로 발생한 동작을 설명합니다.

**환경 정보**
- OS: [예: Windows 10]
- Python 버전: [예: 3.9.0]
- 프로젝트 버전: [예: v2.0.0]

**로그 정보**
```
관련 로그 정보를 붙여넣으세요.
```

**스크린샷**
해당하는 경우, 문제를 설명하는 데 도움이 되는 스크린샷을 추가하세요.

**추가 정보**
기타 관련 컨텍스트 정보를 추가하세요.
```

### 문제 분류

다음 태그를 사용하여 문제를 분류합니다:

- 🐛 `bug` - 오류 보고
- ✨ `enhancement` - 기능 요청
- 📚 `documentation` - 문서 관련
- ❓ `question` - 사용 문제
- 🔥 `priority: high` - 높은 우선순위
- 🧹 `good first issue` - 초보자에게 적합

## 📋 기능 요청

### 기능 요청 템플릿

```markdown
**기능 개요**
추가하고 싶은 기능을 간략하게 설명합니다.

**해결하는 문제**
이 기능은 어떤 문제를 해결합니까?

**상세 설명**
기능이 어떻게 작동하는지 상세히 설명합니다.

**대안**
다른 해결책을 고려해 보셨습니까?

**추가 정보**
기타 관련 정보, 스크린샷 또는 예시를 추가하세요.
```

## 🎯 개발 로드맵

### 단기 목표 (1-3개월)
- [ ] GUI 인터페이스 개발
- [ ] 배치 처리 기능
- [ ] 데이터 유효성 검사 도구 강화
- [ ] 성능 최적화

### 중기 목표 (3-6개월)
- [ ] 다중 형식 지원
- [ ] 클라우드 처리
- [ ] REST API 인터페이스
- [ ] 플러그인 시스템

### 장기 목표 (6-12개월)
- [ ] 머신러닝 최적화
- [ ] 실시간 데이터 업데이트
- [ ] 모바일 지원
- [ ] 엔터프라이즈급 기능

## 🏆 기여자

프로젝트에 기여해주신 모든 개발자분들께 감사드립니다!

<!-- 贡献者列表将自动更新 -->

## 📞 문의하기

- 📧 **이메일**: project@example.com
- 💬 **토론**: GitHub Discussions
- 🐛 **문제**: GitHub Issues
- 🌐 **공식 웹사이트**: https://ifly-converter.org

---

다시 한번 기여에 감사드립니다! 함께 더 나은 iFly 내비게이션 데이터 변환기를 만들어 갑시다! 🚀
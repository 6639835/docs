# 🤝 기여 가이드

Nav-data 프로젝트에 기여해주셔서 감사합니다! 본 가이드는 프로젝트 개발 참여 방법, 코드 제출 및 개선 제안 방법을 이해하는 데 도움을 줄 것입니다.

## 🎯 기여 방법

### 📝 다음과 같은 방법으로 기여할 수 있습니다:

- **🐛 버그 보고**: 문제를 발견하고 상세한 재현 단계를 제공합니다.
- **💡 기능 제안**: 새로운 기능 또는 기존 기능 개선 아이디어를 제안합니다.
- **📖 문서 개선**: 문서를 완성하고, 오류를 수정하며, 예시를 추가합니다.
- **🔧 코드 기여**: 버그 수정, 새 기능 구현, 성능 최적화
- **🧪 테스트 지원**: 테스트 케이스 추가, 테스트 커버리지 개선
- **🌐 현지화**: 문서 번역, 더 많은 언어 및 지역 지원

## 🚀 빠른 시작

### 📋 개발 환경 설정

1.  **프로젝트 저장소 Fork**
    ```bash
    # GitHub에서 프로젝트 Fork
    # 그런 다음 로컬로 클론
    git clone https://github.com/Nav-data/docs.git
    cd docs
    ```

2.  **개발 환경 설정**
    ```bash
    # 가상 환경 생성
    python -m venv venv
    
    # 가상 환경 활성화
    # Windows:
    venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    
    # 의존성 설치
    pip install -r requirements.txt
    pip install -r requirements-dev.txt  # 개발 의존성
    ```

3.  **Git 훅 설치**
    ```bash
    # pre-commit 훅 설치
    pre-commit install
    ```

### 🔄 개발 워크플로우

1.  **브랜치 생성**
    ```bash
    git checkout -b feature/your-feature-name
    # 또는
    git checkout -b fix/bug-description
    ```

2.  **개발 진행**
    - 코드 작성
    - 테스트 추가
    - 문서 업데이트
    - 테스트를 실행하여 통과 확인

3.  **코드 커밋**
    ```bash
    git add .
    git commit -m "feat: add new navigation data processor"
    ```

4.  **푸시 및 PR 생성**
    ```bash
    git push origin feature/your-feature-name
    # GitHub에서 Pull Request 생성
    ```

## 📋 코드 규약

### 🐍 Python 코드 스타일

우리는 [PEP 8](https://pep8.org/) 표준을 따르며, 다음 도구를 사용합니다:

#### **코드 포맷팅**
```bash
# black을 사용하여 코드 포맷팅
black *.py

# isort를 사용하여 import 정리
isort *.py
```

#### **코드 검사**
```bash
# flake8을 사용하여 코드 검사
flake8 *.py

# pylint를 사용하여 정적 분석
pylint *.py
```

### 📝 코드 규약 요구 사항

#### **1. 함수 및 클래스 명명**
```python
# ✅ 올바른 명명
def process_airports(csv_file_path: str, db_path: str) -> None:
    """공항 데이터를 처리합니다"""
    pass

class CoordinateCache:
    """좌표 캐시 클래스"""
    pass

# ❌ 잘못된 명명
def processAirports(csvFile, dbPath):
    pass

class coordinateCache:
    pass
```

#### **2. 독스트링**
```python
def get_magnetic_variation(lat: float, lon: float) -> float:
    """
    지정된 좌표의 자편각을 계산합니다.
    
    매개변수:
        lat (float): 위도 (십진도)
        lon (float): 경도 (십진도)
    
    반환:
        float: 자편각 (도), 소수점 이하 첫째 자리까지 유지
    
    예시:
        >>> get_magnetic_variation(39.9042, 116.4074)
        -6.2
    """
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)
```

#### **3. 타입 어노테이션**
```python
from typing import Dict, List, Optional, Tuple

def parse_dat_file(file_path: str) -> List[Dict[str, str]]:
    """DAT 파일을 파싱하고 레코드 목록을 반환합니다"""
    records = []
    # 처리 로직
    return records

def find_coordinates(
    identifier: str, 
    icao_code: Optional[str] = None
) -> Tuple[float, float]:
    """좌표를 찾아 경위도 튜플을 반환합니다"""
    return lat, lon
```

#### **4. 오류 처리**
```python
import logging

logger = logging.getLogger(__name__)

def process_data_file(file_path: str) -> bool:
    """
    데이터 파일을 처리합니다.
    
    반환:
        bool: 처리 성공 여부
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            # 처리 로직
            data = file.read()
            
        logger.info(f"파일 처리 성공: {file_path}")
        return True
        
    except FileNotFoundError:
        logger.error(f"파일을 찾을 수 없음: {file_path}")
        return False
    except PermissionError:
        logger.error(f"파일 권한 부족: {file_path}")
        return False
    except Exception as e:
        logger.error(f"파일 처리 중 알 수 없는 오류 발생: {e}")
        return False
```

#### **5. 상수 정의**
```python
# 모듈 상단에 상수 정의
SUPPORTED_ICAO_REGIONS = {
    'ZB', 'ZS', 'ZJ', 'ZG', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH',
    'VM', 'VH', 'RK'
}

DEFAULT_BATCH_SIZE = 1000
COORDINATE_PRECISION = 8
DATABASE_TIMEOUT = 30

# 함수 내에서 사용
def process_waypoints(icao_code: str) -> bool:
    if icao_code not in SUPPORTED_ICAO_REGIONS:
        logger.warning(f"지원되지 않는 ICAO 지역: {icao_code}")
        return False
    # 처리 로직
```

## 🧪 테스트 요구 사항

### 📊 테스트 커버리지

-   **최소 요구 사항**: 새 코드 테스트 커버리지 ≥ 80%
-   **목표**: 전체 프로젝트 테스트 커버리지 ≥ 90%

### 🛠️ 테스트 도구

```bash
# 모든 테스트 실행
pytest

# 특정 테스트 파일 실행
pytest tests/test_airports.py

# 커버리지 보고서 생성
pytest --cov=. --cov-report=html

# 커버리지 보고서 보기
open htmlcov/index.html
```

### ✅ 테스트 예시

#### **단위 테스트**
```python
import unittest
from unittest.mock import patch, MagicMock
from airports import get_magnetic_variation, convert_dms_to_decimal

class TestAirports(unittest.TestCase):
    
    def test_convert_dms_to_decimal_north(self):
        """북위 DMS 변환 테스트"""
        result = convert_dms_to_decimal("N390842.12")
        self.assertAlmostEqual(result, 39.145033, places=6)
    
    def test_convert_dms_to_decimal_south(self):
        """남위 DMS 변환 테스트"""
        result = convert_dms_to_decimal("S390842.12")
        self.assertAlmostEqual(result, -39.145033, places=6)
    
    @patch('airports.geo_mag')
    def test_get_magnetic_variation(self, mock_geomag):
        """자편각 계산 테스트"""
        # 모의 반환값 설정
        mock_result = MagicMock()
        mock_result.d = -6.234
        mock_geomag.calculate.return_value = mock_result
        
        result = get_magnetic_variation(39.9042, 116.4074)
        
        self.assertEqual(result, -6.2)
        mock_geomag.calculate.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### **통합 테스트**
```python
import tempfile
import sqlite3
import os
from airports import process_airports

class TestAirportsIntegration(unittest.TestCase):
    
    def setUp(self):
        """테스트 전 설정"""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix='.db')
        self.temp_db.close()
        self.db_path = self.temp_db.name
    
    def tearDown(self):
        """테스트 후 정리"""
        os.unlink(self.db_path)
    
    def test_process_airports_integration(self):
        """공항 데이터 처리 통합 테스트"""
        csv_file = "test_data/sample_airports.csv"
        lookup_file = "test_data/sample_icao.txt"
        
        # 처리 실행
        process_airports(csv_file, lookup_file, self.db_path)
        
        # 결과 검증
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        
        self.assertGreater(count, 0)
        
        # 데이터 품질 검증
        cursor.execute("""
            SELECT COUNT(*) FROM tbl_airports 
            WHERE airport_latitude IS NULL OR airport_longitude IS NULL
        """)
        null_coords = cursor.fetchone()[0]
        
        self.assertEqual(null_coords, 0, "빈 좌표가 없어야 합니다")
        
        conn.close()
```

### 📝 테스트 데이터

테스트 데이터는 `tests/test_data/` 디렉터리에 위치해야 합니다:

```
tests/
├── test_data/
│   ├── sample_airports.csv      # 샘플 공항 데이터
│   ├── sample_runways.csv       # 샘플 활주로 데이터
│   ├── sample_earth_fix.dat     # 샘플 웨이포인트 데이터
│   ├── sample_earth_nav.dat     # 샘플 항법시설 데이터
│   └── sample_icao.txt          # 샘플 ICAO 조회표
├── test_airports.py             # 공항 모듈 테스트
├── test_runways.py              # 활주로 모듈 테스트
├── test_waypoints.py            # 웨이포인트 모듈 테스트
└── conftest.py                  # pytest 설정
```

## 🐛 버그 보고

### 📋 버그 보고 템플릿

다음 템플릿을 사용하여 버그를 보고하세요:

```markdown
## 버그 설명
문제에 대해 간결하게 설명

## 재현 단계
1. `python XP2INI_NDB_Converter.py` 명령 실행
2. '...' 구성 선택
3. '...' 오류 확인

## 예상 동작
예상되는 동작을 설명

## 실제 동작
실제로 발생한 동작을 설명

## 환경 정보
- 운영 체제: Windows 11 22H2
- Python 버전: 3.11.5
- MSFS 버전: 2024
- 항공기 애드온: PMDG 777

## 오류 로그
```
관련 오류 메시지 및 로그를 붙여넣기
```

## 기타 정보
문제 진단에 도움이 될 수 있는 기타 정보
```

### 🔍 버그 분류

| 우선순위 | 라벨 | 설명 |
|--------|------|------|
| 🔴 Critical | `priority:critical` | 프로그램 충돌 또는 데이터 손상을 유발 |
| 🟠 High | `priority:high` | 주요 기능에 영향을 미치지만 우회 방법이 있음 |
| 🟡 Medium | `priority:medium` | 보조 기능 또는 사용자 경험에 영향을 미침 |
| 🟢 Low | `priority:low` | 핵심 기능에 영향을 미치지 않는 사소한 문제 |

## 💡 기능 제안

### 📋 기능 제안 템플릿

```markdown
## 기능 개요
제안하는 기능에 대해 간략하게 설명

## 사용 시나리오
어떤 상황에서 이 기능이 필요한지 설명

## 상세 설명
기능 구현 방식과 예상 효과를 상세히 설명

## 대안
다른 해결책을 고려해 보셨습니까?

## 추가 정보
제안을 이해하는 데 도움이 될 수 있는 기타 정보
```

### 🎯 기능 분류

| 유형 | 라벨 | 설명 |
|------|------|------|
| ✨ Enhancement | `type:enhancement` | 기존 기능 개선 |
| 🚀 Feature | `type:feature` | 새로운 기능 |
| 📊 Performance | `type:performance` | 성능 최적화 |
| 📖 Documentation | `type:documentation` | 문서 개선 |

## 📖 문서 기여

### 📝 문서 규약

1.  **Markdown 형식**: 표준 Markdown 문법 사용
2.  **VitePress 호환**: front matter가 올바른지 확인
3.  **영한 혼용**: 기술 용어는 영어로 유지하고, 설명은 한국어로 작성
4.  **코드 예시**: 완전하고 실행 가능한 코드 예시 제공

### 🎨 문서 스타일 가이드

```markdown
---
title: 페이지 제목
description: 페이지 설명
---

# 🎯 주 제목

이 문서의 목적과 범위를 설명하는 소개 단락.

## 📋 보조 제목

### 삼차 제목

적절한 이모티콘과 계층 구조를 사용하세요.

#### 코드 예시

```python
# 완전한 코드 예시 제공
def example_function():
    return "예시"
```

#### 참고 사항

> ⚠️ **중요 알림**: 중요 정보는 인용 블록을 사용하여 강조하세요.

#### 목록 형식

- ✅ 이모티콘을 사용하여 가독성 향상
- 📝 목록 항목을 간결하고 명확하게 유지
- 🔗 적절하게 내부 링크 추가
```

## 🔄 Pull Request 프로세스

### 📋 PR 체크리스트

PR을 제출하기 전에 다음을 확인하세요:

-   [ ] 🧪 **모든 테스트 통과**: `pytest`
-   [ ] 📊 **테스트 커버리지 달성**: 새 코드 커버리지 ≥ 80%
-   [ ] 🎨 **코드 형식 올바름**: `black`, `isort`, `flake8`
-   [ ] 📖 **문서 업데이트 완료**: API 변경 시 문서 업데이트 필요
-   [ ] 🏷️ **커밋 메시지 규약 준수**: Conventional Commits 준수
-   [ ] 🔗 **관련 이슈 링크**: PR 설명에 참조

### 📝 PR 템플릿

```markdown
## 변경 개요
이번 PR의 목적과 주요 변경 사항을 간략하게 설명

## 변경 유형
- [ ] 🐛 버그 수정
- [ ] ✨ 새 기능
- [ ] 📖 문서 업데이트
- [ ] 🎨 코드 리팩토링
- [ ] ⚡ 성능 최적화
- [ ] 🧪 테스트 개선

## 상세 설명
구현 방식과 기술적 세부 사항을 상세히 설명

## 테스트
이러한 변경 사항을 테스트하는 방법을 설명

## 관련 이슈
#123 닫기

## 체크리스트
- [ ] 테스트 통과
- [ ] 코드 형식 올바름
- [ ] 문서 업데이트 완료
- [ ] 변경 로그 업데이트 완료
```

### 🏷️ 커밋 메시지 규약

[Conventional Commits](https://www.conventionalcommits.org/) 규약을 따르세요:

```bash
# 기능 추가
feat: add support for AIRAC 2024 data format

# 버그 수정
fix: resolve coordinate conversion precision issue

# 문서 업데이트
docs: update installation guide for Windows 11

# 성능 최적화
perf: optimize magnetic variation calculation

# 코드 리팩토링
refactor: restructure database connection handling

# 테스트 추가
test: add unit tests for waypoint processing

# 빌드 관련
build: update dependencies to latest versions
```

## 🌟 기여자 인정

### 🏆 기여자 등급

| 등급 | 요구 사항 | 권한 |
|------|------|------|
| 👋 Contributor | 1회 이상 유효한 PR | 기본 기여자 |
| 🎖️ Regular Contributor | 5회 이상 유효한 PR | 우선 코드 리뷰 |
| 🌟 Core Contributor | 10회 이상 유효한 PR + 장기적인 참여 | 이슈 분류 권한 |
| 👑 Maintainer | 핵심 개발자 | 전체 저장소 권한 |

### 📜 기여자 명단

README 파일에서 기여자 명단을 관리하며, 모든 기여자분들의 노력에 감사드립니다!

```markdown
## 🙏 기여자분들께 감사드립니다

<a href="https://github.com/your-repo/nav-data/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/nav-data" />
</a>
```

## 🤔 도움말 얻기

### 💬 소통 채널

-   **📧 이메일**: project@nav-data.org
-   **💬 토론 게시판**: GitHub Discussions
-   **🐛 문제 보고**: GitHub Issues
-   **📖 문서 문제**: 직접 PR 제출하여 수정

### 📚 학습 자료

-   [Python 공식 문서](https://docs.python.org/)
-   [SQLite 문서](https://sqlite.org/docs.html)
-   [항공 항법 원리](https://www.faa.gov/air_traffic/publications/)
-   [ARINC 424 표준](https://www.arinc.com/)

### 🎓 초보자 가이드

오픈 소스 프로젝트에 처음 참여한다면:

1.  📖 **코드 읽기**: 먼저 프로젝트 구조와 핵심 기능을 이해하세요.
2.  🐛 **작게 시작하기**: 문서 오류 수정이나 작은 버그 수정부터 시작하세요.
3.  🤝 **적극적으로 소통**: 질문하거나 도움을 요청하는 것을 두려워하지 마세요.
4.  📈 **지속적인 학습**: 프로젝트 동향에 관심을 기울이고 모범 사례를 배우세요.

## 📄 행동 강령

### 🤝 우리의 약속

개방적이고 환영하는 환경을 조성하기 위해 우리는 다음을 약속합니다:

-   **🌈 포용성**: 다양한 배경과 견해를 가진 참가자를 환영합니다.
-   **🤝 존중**: 다양한 의견과 경험을 존중합니다.
-   **📚 학습 지향**: 초보자가 성장하고 배우도록 돕습니다.
-   **🎯 전문성**: 기술 토론 및 프로젝트 개선에 집중합니다.

### ❌ 용납할 수 없는 행동

-   인신공격 또는 모욕적인 발언
-   괴롭힘 또는 차별 행위
-   타인의 개인 정보 게시
-   기타 비전문적이거나 부적절한 행동

### 📞 신고 메커니즘

행동 강령 위반 사례를 발견하면 프로젝트 관리자에게 문의하세요:
-   📧 이메일: conduct@nav-data.org
-   📱 개인 메시지: GitHub 개인 메시지를 통해 관리자에게 연락

---

Nav-data 프로젝트에 기여를 고려해주셔서 감사합니다! 모든 기여는 항공 시뮬레이션 커뮤니티를 더 나은 곳으로 만듭니다. 🛫
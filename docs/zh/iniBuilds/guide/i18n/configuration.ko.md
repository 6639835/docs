# ⚙️ 구성 설명

이 가이드에서는 Nav-data 변환 도구의 데이터 소스, 경로 설정 및 AIRAC 주기 관리를 구성하는 방법을 자세히 설명합니다.

## 📊 데이터 소스 개요

Nav-data 도구는 여러 업계 표준 항공 항법 데이터 소스를 지원하여 데이터의 신뢰성과 정확성을 보장합니다.

### 🔄 지원되는 데이터 형식

| 데이터 형식 | 출처 | 용도 | 표준 |
|---------|------|------|------|
| **NAIP CSV** | Navigraph/Aerosoft | 공항, 활주로, 항로 | ARINC 424 |
| **X-Plane DAT** | X-Plane 11/12 | 경유지, 항행 보조 시설 | X-Plane 형식 |
| **CIFP** | 공식 절차 데이터 | SID/STAR/접근 | ARINC 424 |
| **SQLite DB** | Fenix A320 | NDB 참조 데이터 | 사용자 지정 형식 |

## 🗃️ 필수 데이터 파일

### 📁 기본 디렉터리 구조

다음 디렉터리 구조를 생성하여 항법 데이터를 구성하십시오.

```
NavData_Workspace/
├── NAIP/                    # NAIP CSV 파일 디렉터리
│   ├── AD_HP.csv           # 공항 기본 데이터
│   ├── RWY.csv             # 활주로 정보
│   ├── RWY_DIRECTION.csv   # 활주로 방향 데이터
│   └── RTE_SEG.csv         # 항로 구간 데이터
│
├── X-Plane/                 # X-Plane 데이터 파일
│   ├── earth_fix.dat       # 경유지 데이터
│   └── earth_nav.dat       # 항행 보조 시설 데이터
│
├── CIFP/                    # CIFP 절차 데이터 디렉터리
│   ├── ZBAA.dat            # 베이징 수도 공항
│   ├── ZSSS.dat            # 상하이 푸동 공항
│   └── [其他机场].dat      # 각 공항 절차 파일
│
├── NDBs/                    # NDB 데이터베이스
│   └── nd.db3              # Fenix 항법 데이터베이스
│
└── Output/                  # 출력 디렉터리
    └── e_dfd_PMDG.s3db     # 변환된 데이터베이스
```

## 🌐 데이터 소스 획득 가이드

### 1️⃣ Navigraph 데이터 (권장)

**획득 단계:**
1.  [Navigraph 공식 웹사이트](https://navigraph.com/) 방문 및 계정 등록
2.  Navigraph Unlimited 또는 Charts + Data 서비스 구독
3.  Navigraph FMS Data Manager 다운로드
4.  FMS Data Manager에서 "Generic" 형식 선택
5.  NAIP 데이터 패키지 다운로드 및 압축 해제

**NAIP 파일 획득:**
```
Navigraph FMS Data Manager → 
Generic → 
NAIP Format → 
현재 AIRAC 주기 다운로드
```

### 2️⃣ Aerosoft NavDataPro

**획득 단계:**
1.  [Aerosoft NavDataPro](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) 구매
2.  NavDataPro 애플리케이션 다운로드
3.  로그인 후 NAIP 형식 데이터 다운로드
4.  NAIP 디렉터리에 압축 해제

### 3️⃣ X-Plane 데이터 파일

**출처 옵션:**
-   **옵션 A**: X-Plane 11/12 설치 디렉터리에서 복사
    ```
    [X-Plane安装目录]/Resources/default data/earth_fix.dat
    [X-Plane安装目录]/Resources/default data/earth_nav.dat
    ```

-   **옵션 B**: 이 프로젝트의 샘플 데이터에서 획득
    ```
    [项目目录]/sample_data/earth_fix.dat
    [项目目录]/sample_data/earth_nav.dat
    ```

### 4️⃣ CIFP 절차 데이터

**획득 방법:**
-   **공식 채널**: FAA 공식 웹사이트에서 무료 다운로드
-   **타사**: Navigraph에 포함된 CIFP 데이터
-   **프로젝트 제공**: 사전 처리된 중국 지역 CIFP 파일

### 5️⃣ NDB 데이터베이스

**획득 경로:**
```bash
# Fenix A320 설치 디렉터리에서 복사
[MSFS Community]/fenix-a320/Resources/NavData/nd.db3
```

## 🛠️ 경로 구성 마법사

### 자동 구성 모드

변환 도구를 실행하면 프로그램이 경로 구성을 안내합니다.

```bash
python XP2INI_NDB_Converter.py
```

**구성 절차:**
1.  **기본 디렉터리 선택**: 모든 데이터 파일을 포함하는 루트 디렉터리 선택
2.  **자동 감지**: 프로그램이 다양한 데이터 파일을 자동으로 스캔하고 확인합니다.
3.  **경로 확인**: 감지된 파일 경로를 표시하여 확인하도록 합니다.
4.  **수동 보충**: 찾을 수 없는 파일의 경우 수동으로 경로를 지정합니다.

### 🔍 경로 유효성 검사 목록

| 데이터 유형 | 파일 경로 | 검증 상태 |
|---------|---------|---------|
| NAIP 공항 데이터 | `NAIP/AD_HP.csv` | ✅ |
| NAIP 활주로 데이터 | `NAIP/RWY.csv` | ✅ |
| NAIP 활주로 방향 | `NAIP/RWY_DIRECTION.csv` | ✅ |
| NAIP 항로 데이터 | `NAIP/RTE_SEG.csv` | ✅ |
| X-Plane 경유지 | `X-Plane/earth_fix.dat` | ✅ |
| X-Plane 항행 보조 시설 | `X-Plane/earth_nav.dat` | ✅ |
| CIFP 절차 디렉터리 | `CIFP/` | ✅ |
| NDB 데이터베이스 | `NDBs/nd.db3` | ✅ |
| ICAO 조회 테이블 | `ICAO.txt` | ✅ |

## 📅 AIRAC 주기 관리

### 🗓️ AIRAC 주기 설명

**AIRAC (Aeronautical Information Regulation And Control)**은 국제민간항공기구(ICAO)가 정한 28일 항공 정보 업데이트 주기입니다.

-   **업데이트 빈도**: 28일마다
-   **글로벌 동기화**: 전 세계적으로 통일된 업데이트 시간
-   **중요성**: 조종사와 관제사가 동일한 항법 데이터를 사용하도록 보장

### 📊 현재 주기 조회

```python
# 현재 AIRAC 주기 조회
import datetime

def get_current_airac():
    # AIRAC 2023년 기준 날짜: 2023년 1월 5일
    base_date = datetime.date(2023, 1, 5)
    today = datetime.date.today()
    
    days_diff = (today - base_date).days
    cycle_number = (days_diff // 28) + 1
    
    return f"AIRAC {today.year}{cycle_number:02d}"

print(f"현재 주기: {get_current_airac()}")
```

### 🔄 데이터 업데이트 전략

#### 실시간 업데이트 사용자
-   **업데이트 빈도**: 각 AIRAC 주기
-   **권장 출처**: Navigraph (자동 업데이트)
-   **적용 시나리오**: 온라인 비행, 전문 용도

#### 일반 사용자
-   **업데이트 빈도**: 3-6개월
-   **권장 출처**: Aerosoft NavDataPro
-   **적용 시나리오**: 오프라인 비행, 엔터테인먼트 용도

## 🎛️ 고급 구성 옵션

### 📍 지역 필터링 구성

다양한 지역에 맞춰 데이터 처리 범위를 사용자 지정합니다.

```python
# 처리할 ICAO 지역 코드 구성
SUPPORTED_ICAO_REGIONS = {
    'ZB',  # 중국 북부 지역
    'ZS',  # 중국 동부 지역  
    'ZG',  # 중국 남부 지역
    'ZJ',  # 중국 화동 지역
    'ZY',  # 중국 중부 지역
    'ZL',  # 중국 서남 지역
    'ZU',  # 중국 서부 지역
    'ZW',  # 중국 서북 지역
    'ZP',  # 중국 화북 지역
    'ZH',  # 중국 화남 지역
    'VM',  # 베트남 지역
    'VH',  # 홍콩 지역
    'RK'   # 한국 지역
}
```

### 🎯 정확도 구성

좌표 및 계산 정확도 설정:

```python
# 좌표 정확도 구성
COORDINATE_PRECISION = 8  # 소수 자릿수
MAGNETIC_VARIATION_PRECISION = 1  # 자기 편차 정확도

# 거리 단위 변환
NM_TO_KM = 1.852  # 해리에서 킬로미터로
KM_TO_NM = 0.539957  # 킬로미터에서 해리로
```

### ⚡ 성능 최적화 구성

```python
# 병렬 처리 구성
MULTIPROCESS_WORKERS = 4  # 병렬 프로세스 수
BATCH_SIZE = 1000  # 배치 처리 크기
DATABASE_TIMEOUT = 30  # 데이터베이스 시간 초과 (초)

# 메모리 최적화
ENABLE_CACHE = True  # 좌표 캐시 활성화
CACHE_SIZE_LIMIT = 10000  # 캐시 크기 제한
```

## 🔧 구성 파일 템플릿

`config.json` 파일을 생성하여 자주 사용하는 구성을 저장합니다.

```json
{
  "data_sources": {
    "naip_path": "C:/NavData/NAIP",
    "xplane_path": "C:/NavData/X-Plane", 
    "cifp_path": "C:/NavData/CIFP",
    "ndb_path": "C:/NavData/NDBs/nd.db3",
    "icao_txt": "C:/NavData/ICAO.txt"
  },
  "output": {
    "database_path": "C:/NavData/Output/e_dfd_PMDG.s3db"
  },
  "processing": {
    "regions": ["ZB", "ZS", "ZJ", "ZG", "ZY", "ZL", "ZU", "ZW", "ZP", "ZH"],
    "coordinate_precision": 8,
    "enable_multiprocessing": true,
    "workers": 4
  },
  "airac": {
    "current_cycle": "2410",
    "auto_update_check": true
  }
}
```

## ✅ 구성 유효성 검사

### 🔍 구성 확인 스크립트

```python
#!/usr/bin/env python3
"""구성 유효성 검사 스크립트"""

import os
import json
from pathlib import Path

def validate_config():
    """구성 파일의 무결성을 검증합니다."""
    
    required_files = {
        'NAIP/AD_HP.csv': '공항 데이터',
        'NAIP/RWY.csv': '활주로 데이터', 
        'NAIP/RWY_DIRECTION.csv': '활주로 방향',
        'NAIP/RTE_SEG.csv': '항로 데이터',
        'X-Plane/earth_fix.dat': '경유지',
        'X-Plane/earth_nav.dat': '항행 보조 시설',
        'NDBs/nd.db3': 'NDB 데이터베이스'
    }
    
    print("🔍 구성 유효성 검사 시작...")
    
    for file_path, description in required_files.items():
        if os.path.exists(file_path):
            print(f"✅ {description}: {file_path}")
        else:
            print(f"❌ {description}: {file_path} (파일이 존재하지 않음)")
    
    print("🔍 유효성 검사 완료!")

if __name__ == "__main__":
    validate_config()
```

## 🚨 일반적인 구성 문제

### 경로 문제
```bash
# 문제: 경로에 중국어 문자가 포함되어 인코딩 오류 발생
# 해결: 영어 경로를 사용하고 특수 문자 피하기

# 잘못된 경로 예시
C:/导航数据/NAIP/

# 올바른 경로 예시  
C:/NavData/NAIP/
```

### 파일 권한 문제
```powershell
# 문제: 읽기 권한 없음
# 해결: 관리자 권한으로 실행하거나 파일 권한 수정
icacls "C:\NavData" /grant Everyone:F /T
```

### 데이터 무결성 문제
```bash
# 문제: NAIP 파일 불완전
# 해결: 완전한 AIRAC 데이터 패키지 다시 다운로드
# 모든 CSV 파일이 존재하고 비어 있지 않은지 확인
```

---

구성 완료! 다음 단계로 [**사용 설명서**](./usage.md)를 확인하여 데이터 변환 프로세스를 실행하십시오.
# 📥 설치 가이드

<div class="installation-header">
  <div class="header-content">
    <h2>Nav-data iniBuilds A350 설치 마법사</h2>
    <p>본 가이드는 Nav-data 항공 항법 데이터 변환 도구의 전체 설치 과정을 안내하여 시스템 환경이 올바르게 구성되도록 합니다.</p>
  </div>
  <div class="progress-indicator">
    <div class="step active" data-step="1">
      <div class="step-number">1</div>
      <div class="step-label">시스템 확인</div>
    </div>
    <div class="step" data-step="2">
      <div class="step-number">2</div>
      <div class="step-label">Python 환경</div>
    </div>
    <div class="step" data-step="3">
      <div class="step-number">3</div>
      <div class="step-label">MSFS 구성</div>
    </div>
    <div class="step" data-step="4">
      <div class="step-number">4</div>
      <div class="step-label">설치 완료 확인</div>
    </div>
  </div>
</div>

## 🖥️ 시스템 요구 사항

### 📋 구성 요구 사항 비교

<div class="requirements-comparison">
  <div class="req-column">
    <h4>🟡 최소 사양</h4>
    <div class="req-card minimal">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>운영 체제</strong>
          <span>Windows 10 1903+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Python 버전</strong>
          <span>Python 3.8+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>메모리</strong>
          <span>8GB RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>저장 공간</strong>
          <span>2GB 사용 가능 공간</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>네트워크</strong>
          <span>광대역 인터넷 연결</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="req-column">
    <h4>🟢 권장 사양</h4>
    <div class="req-card recommended">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>운영 체제</strong>
          <span>Windows 11 22H2+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Python 버전</strong>
          <span>Python 3.11+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>메모리</strong>
          <span>16GB+ RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>저장 공간</strong>
          <span>5GB+ 사용 가능 공간</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>네트워크</strong>
          <span>안정적인 고속 연결</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.installation-header {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.05));
  border: 1px solid rgba(30, 64, 175, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.header-content h2 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
}

.header-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1.6;
}

.progress-indicator {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;
}

.progress-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.requirements-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.req-column h4 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.req-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.req-card.minimal {
  border-color: rgba(245, 158, 11, 0.3);
}

.req-card.recommended {
  border-color: rgba(34, 197, 94, 0.3);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
}

.req-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.req-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.req-item:last-child {
  border-bottom: none;
}

.req-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.req-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.req-details strong {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.req-details span {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .progress-indicator {
    flex-direction: column;
    gap: 1rem;
  }
  
  .progress-indicator::before {
    display: none;
  }
  
  .step {
    flex-direction: row;
    justify-content: flex-start;
  }
  
  .requirements-comparison {
    grid-template-columns: 1fr;
  }
}
</style>

### ✈️ 필수 소프트웨어

- [**Microsoft Flight Simulator**](https://www.flightsimulator.com/) (2020 또는 2024 버전)
- [**Python 3.8+**](https://www.python.org/downloads/) 개발 환경
- 대상 항공기 애드온: [**iniBuilds A350**](https://www.inibuilds.com/) 또는 [**PMDG 737/777**](https://pmdg.com/)

### 📊 데이터 소스 구독 (하나 선택)

- [**Navigraph**](https://navigraph.com/) - 권장, 데이터 업데이트가 신속함
- [**Aerosoft NavDataPro**](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) - 합리적인 가격의 대안

## 🐍 Python 환경 설치

### 1단계: Python 다운로드 및 설치

1. [Python 공식 웹사이트](https://www.python.org/downloads/) 방문
2. 최신 Python 3.11 버전 다운로드 (권장)
3. **중요**: 설치 시 "Add Python to PATH" 옵션 체크

```powershell
# Python 설치 확인
python --version
# 표시되어야 함: Python 3.11.x

# pip 설치 확인
pip --version
# pip 버전 정보가 표시되어야 함
```

### 2단계: 프로젝트 종속성 설치

```bash
# 프로젝트를 로컬로 클론 또는 다운로드
cd /path/to/nav-data

# 필요한 종속성 패키지 설치
pip install -r requirements.txt
```

#### 종속성 패키지 설명

| 패키지 이름 | 버전 | 용도 |
|------|------|------|
| `pandas` | ≥1.3.0 | 데이터 처리 및 분석 |
| `requests` | ≥2.26.0 | HTTP 요청 처리 |
| `tqdm` | ≥4.62.0 | 진행률 표시 |
| `chardet` | ≥4.0.0 | 문자 인코딩 감지 |
| `ratelimit` | ≥2.2.1 | API 요청 제한 |
| `pygeomag` | ≥0.9.0 | 지자기 편각 계산 |

### 3단계: 설치 확인

```python
# 주요 종속성 테스트
python -c "import pandas, sqlite3, pygeomag; print('모든 종속성이 성공적으로 설치되었습니다!')"
```

## 🎮 Microsoft Flight Simulator 구성

### 🔍 MSFS 설치 위치 확인

MSFS 버전 및 구매 채널에 따라 Community 폴더 위치는 다음과 같습니다:

#### MSFS 2020

**Microsoft Store 버전**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam 버전**
```
%APPDATA%\Microsoft Flight Simulator\Packages\Community
```

#### MSFS 2024

**Microsoft Store 버전**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Steam 버전**
```
%APPDATA%\Microsoft Flight Simulator 2024\Packages\Community
```

### 🛠️ 빠른 경로 감지 스크립트

다음 PowerShell 스크립트를 생성하여 MSFS 설치를 자동으로 감지합니다:

```powershell
# detect_msfs.ps1 로 저장
$paths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator\Packages\Community",
    "$env:LOCALAPPDATA\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator 2024\Packages\Community"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "MSFS Community 폴더를 찾았습니다: $path" -ForegroundColor Green
    }
}
```

## ✈️ 항공기 애드온 확인

### iniBuilds A350 확인

다음 디렉터리가 존재하는지 확인하십시오:

```
[Community 폴더]\inibuilds-aircraft-a350\Config\NavigationData\
```

### PMDG 애드온 확인

다음 디렉터리가 존재하는지 확인하십시오 (PMDG 항공기 모델에 따라):

```
[Community 폴더]\pmdg-aircraft-737\Config\Navdata\
[Community 폴더]\pmdg-aircraft-738\Config\Navdata\
[Community 폴더]\pmdg-aircraft-77w\Config\Navdata\
[Community 폴더]\pmdg-aircraft-77f\Config\Navdata\
```

## 📁 프로젝트 디렉터리 구조

설치 완료 후 프로젝트 디렉터리는 다음과 같아야 합니다:

```
nav-data/
├── XP2INI_NDB_Converter.py    # 메인 변환 프로그램
├── requirements.txt           # Python 종속성 목록
├── README.md                 # 프로젝트 설명
├── LICENSE                   # 라이선스 파일
│
├── 데이터 처리 모듈/
│   ├── airports.py           # 공항 데이터 처리
│   ├── runways.py           # 활주로 데이터 처리
│   ├── vhfs.py              # VHF 항법 시설 처리
│   ├── ndbs.py              # NDB 항법 시설 처리
│   ├── enroute_waypoints.py # 항로 웨이포인트 처리
│   ├── terminal_waypoints.py# 터미널 웨이포인트 처리
│   ├── sids.py              # SID 절차 처리
│   ├── stars.py             # STAR 절차 처리
│   ├── iaps.py              # 접근 절차 처리
│   ├── airways.py           # 항로 처리
│   └── gs.py                # 착륙 유도 처리
│
└── docs/                    # 문서 디렉터리
    ├── guide/               # 사용 가이드
    └── ...                  # 기타 문서
```

## 🔧 환경 변수 구성 (선택 사항)

더 편리하게 사용하려면 다음 환경 변수를 설정할 수 있습니다:

```powershell
# MSFS Community 경로 설정
setx MSFS_COMMUNITY_PATH "C:\Users\[사용자 이름]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community"

# Nav-data 작업 디렉터리 설정
setx NAVDATA_WORKSPACE "C:\path\to\nav-data"
```

## ✅ 설치 확인 체크리스트

설치 완료 후 다음 항목을 확인하십시오:

- [ ] Python 3.8+가 올바르게 설치되었고 PATH에 추가되었는지 확인
- [ ] 모든 종속성 패키지가 성공적으로 설치되었는지 확인
- [ ] MSFS Community 폴더가 위치를 찾았는지 확인
- [ ] 대상 항공기 애드온이 설치되고 확인되었는지 확인
- [ ] 프로젝트 파일이 로컬 디렉터리에 다운로드되었는지 확인
- [ ] 충분한 디스크 공간(최소 2GB)이 있는지 확인

## 🚨 일반적인 설치 문제

### Python 관련 문제

**문제**: `'python'은 내부 또는 외부 명령이 아닙니다`
```bash
# 해결책: Python을 다시 설치하고 "Add to PATH"를 체크했는지 확인
# 또는 Python을 시스템 PATH에 수동으로 추가
```

**문제**: `'ModuleNotFoundError: No module named 'xxx''`
```bash
# 해결책: 종속성 재설치
pip install --upgrade -r requirements.txt
```

### 권한 문제

**문제**: MSFS 폴더에 액세스할 수 없습니다
```powershell
# 해결책: PowerShell/명령 프롬프트를 관리자 권한으로 실행
# 마우스 우클릭 → "관리자 권한으로 실행"
```

### 경로 문제

**문제**: 항공기 애드온 디렉터리를 찾을 수 없습니다
```bash
# 해결책:
# 1. 항공기 애드온이 올바르게 설치되었는지 확인
# 2. MSFS에서 항공기를 한 번 시작하여 필요한 디렉터리 생성
# 3. 애드온이 올바른 Community 폴더에 있는지 확인
```

## 🔄 업데이트 지침

Nav-data를 최신 버전으로 업데이트하려면:

```bash
# 최신 코드 가져오기
git pull origin main

# 종속성 패키지 업데이트
pip install --upgrade -r requirements.txt
```

---

설치 완료! 다음으로 [**구성 지침**](./configuration.md)을 참조하여 데이터 소스 및 AIRAC 주기를 설정하십시오.
# 🔄 사용 설명서

이 가이드는 데이터 변환부터 항공기 애드온 최종 배포까지 Nav-data 도구의 전체 사용 프로세스를 안내합니다.

## 🚀 빠른 시작

### ⚡ 원클릭 변환

설정을 완료했다면, 메인 프로그램을 직접 실행할 수 있습니다:

```bash
python XP2INI_NDB_Converter.py
```

프로그램이 전체 변환 과정을 자동으로 안내할 것입니다.

## 📝 상세 작업 절차

### 🎯 1단계: 데이터 준비 및 검증

변환을 시작하기 전에 모든 필수 데이터 파일이 준비되었는지 확인하십시오:

```bash
# 데이터 파일 무결성 검증
python -c "
import os
files = [
    'NAIP/AD_HP.csv',
    'NAIP/RWY.csv',
    'NAIP/RWY_DIRECTION.csv',
    'NAIP/RTE_SEG.csv',
    'X-Plane/earth_fix.dat',
    'X-Plane/earth_nav.dat',
    'NDBs/nd.db3'
]
for f in files:
    print(f'✅ {f}' if os.path.exists(f) else f'❌ {f}')
"
```

### 🔧 2단계: 변환 프로그램 시작

메인 변환 프로그램을 실행하고 프롬프트에 따라 진행하십시오:

```bash
python XP2INI_NDB_Converter.py
```

### 📂 3단계: 경로 구성 마법사

프로그램이 경로 구성을 안내할 것입니다:

#### 3.1 기본 디렉터리 설정
```
请输入基础目录路径（包含NAIP, NDBs和XP_Data文件夹）:
> C:\NavData\Workspace
```

#### 3.2 자동 경로 감지
프로그램이 자동으로 파일을 스캔하고 감지된 파일을 표시합니다:

```
================= 경로 구성 시작 =================
✅ NAIP_PATH: C:\NavData\Workspace\NAIP
✅ DB_OUTPUT_PATH: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
✅ FNX_NDB_PATH: C:\NavData\Workspace\NDBs\nd.db3
✅ CIFP_PATH: C:\NavData\Workspace\CIFP
✅ PATH_TO_FIX_DAT: C:\NavData\Workspace\X-Plane\earth_fix.dat
✅ PATH_TO_NAV_DAT: C:\NavData\Workspace\X-Plane\earth_nav.dat
✅ LOOKUP_TXT_PATH: C:\NavData\Workspace\ICAO.txt
```

#### 3.3 경로 확인
```
위의 경로가 모두 올바른지 확인하시겠습니까? (Y/N): Y
```

### ⚙️ 4단계: 데이터 처리 절차

변환 프로그램은 다음 순서로 다양한 데이터를 처리합니다:

#### 4.1 공항 데이터 처리
```
공항 데이터 처리 시작...
📍 공항 기본 정보 분석 중
🧭 공항 자기 편차 데이터 계산
✅ 공항 데이터 처리 완료 (156개 공항 처리됨)
```

#### 4.2 활주로 데이터 처리
```
활주로 데이터 처리 시작...
🛬 활주로 정보 처리 중
📐 활주로 방향 및 좌표 계산
✅ 활주로 데이터 처리 완료 (312개 활주로 처리됨)
```

#### 4.3 VHF 항행안전시설 처리
```
VHF 데이터 처리 시작...
📡 VOR/DME 항행안전시설 처리 중
🔢 항행안전시설 주파수 및 커버리지 계산
✅ VHF 데이터 처리 완료 (89개 항행안전시설 처리됨)
```

#### 4.4 GS 착륙 유도 시스템
```
GS 데이터 처리 시작...
🛬 ILS 착륙 시스템 처리 중
📐 활공 경사 및 위치 계산
✅ GS 데이터 처리 완료
```

#### 4.5 NDB 항행안전시설 처리
```
NDB 데이터 처리 시작...
📻 무지향성 비콘 처리 중
🧭 NDB 자기 편차 계산
✅ NDB 데이터 처리 완료 (45개 NDB 처리됨)
```

#### 4.6 경유지 데이터 처리
```
경유지 데이터 처리 시작...
🗺️ 항로 경유지 처리 중
✅ 경유지 데이터 처리 완료 (2,453개 지점 처리됨)
```

#### 4.7 터미널 구역 지점 처리
```
터미널 지점 데이터 처리 시작...
🏢 터미널 구역 경유지 처리 중
✅ 터미널 지점 데이터 처리 완료 (876개 지점 처리됨)
```

#### 4.8 SID 출발 절차 처리
```
출발 절차 처리 시작...
🛫 SID 절차 처리 중
📋 절차 경유지 및 제한 사항 분석
✅ 출발 절차 처리 완료 (234개 절차 처리됨)
```

#### 4.9 STAR 도착 절차 처리
```
도착 절차 처리 시작...
🛬 STAR 절차 처리 중
📋 절차 경유지 및 제한 사항 분석
✅ 도착 절차 처리 완료 (198개 절차 처리됨)
```

#### 4.10 IAP 접근 절차 처리
```
접근 절차 처리 시작...
🎯 접근 절차 처리 중
📋 접근 경유지 및 제한 사항 분석
✅ 접근 절차 처리 완료 (445개 절차 처리됨)
```

#### 4.11 항로 데이터 처리
```
항로 데이터 처리 시작...
🛣️ 고고도/저고도 항로 처리 중
🔗 경유지 연결 관계 설정
✅ 항로 데이터 처리 완료 (167개 항로 처리됨)
```

#### 4.12 데이터베이스 최적화
```
🗜️ 데이터베이스 압축 중...
📊 임시 인덱스 삭제 중...
✅ 데이터베이스 최적화 완료
```

### ⏱️ 5단계: 처리 완료

```
=====================================
🎉 데이터 처리 완료, 소요 시간 127.3초
📄 출력 파일: C:\NavData\Workspace\Output\e_dfd_PMDG.s3db
📊 데이터베이스 크기: 15.6 MB
📈 처리 통계:
   - 공항: 156개
   - 활주로: 312개
   - VHF 항행안전시설: 89개
   - NDB 항행안전시설: 45개
   - 경유지: 3,329개
   - SID 절차: 234개
   - STAR 절차: 198개
   - 접근 절차: 445개
   - 항로: 167개
=====================================
Enter 키를 눌러 종료...
```

## 🚁 데이터 배포 가이드

### 📁 대상 항공기 식별

사용하는 항공기 애드온에 따라 해당 배포 경로를 선택하십시오:

#### iniBuilds A350 시리즈
```
[MSFS Community 폴더]\inibuilds-aircraft-a350\work\NavigationData\
```

#### PMDG 737 시리즈
```
[MSFS Community 폴더]\pmdg-aircraft-737\Config\Navdata\
[MSFS Community 폴더]\pmdg-aircraft-738\Config\Navdata\
[MSFS Community 폴더]\pmdg-aircraft-739\Config\Navdata\
```

#### PMDG 777 시리즈
```
[MSFS Community 폴더]\pmdg-aircraft-77w\Config\Navdata\
[MSFS Community 폴더]\pmdg-aircraft-77f\Config\Navdata\
```

### 🔄 배포 절차

#### 1단계: 기존 데이터 백업

**중요**: 새 데이터를 배포하기 전에 항상 백업을 생성하십시오!

```powershell
# 기존 항법 데이터 백업
$targetDir = "C:\...\pmdg-aircraft-77w\Config\Navdata"
$backupDir = "$targetDir" + "_backup_" + (Get-Date -Format "yyyyMMdd")
Copy-Item $targetDir $backupDir -Recurse
Write-Host "백업 생성 완료: $backupDir"
```

#### 2단계: 캐시 디렉터리 비우기

MSFS의 항법 데이터 캐시를 비우십시오:

**MSFS 2020 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalState\packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2020 (Steam)**
```
%APPDATA%\Microsoft Flight Simulator\Packages\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Microsoft Store)**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalState\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

**MSFS 2024 (Steam)**
```
%APPDATA%\Microsoft Flight Simulator 2024\WASM\MSFS2024\[aircraft-folder]\work\NavigationData\
```

#### 3단계: 새 데이터 배포

변환된 데이터베이스 파일을 대상 위치로 복사하십시오:

```bash
# 데이터베이스 파일 복사
copy "C:\NavData\Workspace\Output\e_dfd_PMDG.s3db" "[대상 항법 데이터 디렉터리]\"
```

#### 4단계: 배포 확인

MSFS를 시작하고 항공기를 로드한 후 다음 항목을 확인하십시오:

- [ ] FMC가 정상적으로 시작되고 데이터베이스 오류가 없음
- [ ] 공항 정보(ICAO 코드)를 조회할 수 있음
- [ ] 항로를 계획할 수 있음(시작점부터 종점까지)
- [ ] SID/STAR 절차가 사용 가능하고 완전함
- [ ] 접근 절차를 선택할 수 있고 데이터가 정확함

## 🔧 고급 사용 팁

### 📊 일괄 처리 스크립트

자동화를 위한 배치 스크립트를 생성하십시오:

```batch
@echo off
echo ======================================
echo     Nav-data 자동 변환 스크립트
echo ======================================

cd /d "C:\NavData\iniBuilds"

echo 1. 데이터 변환 시작...
python XP2INI_NDB_Converter.py

echo 2. 기존 데이터 백업...
set BACKUP_DIR=C:\NavData\Backup\%date:~0,4%%date:~5,2%%date:~8,2%
mkdir "%BACKUP_DIR%"
xcopy "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData" "%BACKUP_DIR%" /E /I

echo 3. 캐시 비우기...
del /Q "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\*"

echo 4. 새 데이터 배포...
copy "Output\e_dfd_PMDG.s3db" "C:\Users\%USERNAME%\AppData\...\inibuilds-aircraft-a350\work\NavigationData\"

echo 5. 완료!
pause
```

### 🔄 정기 업데이트 워크플로

자동 업데이트 프로세스를 설정하십시오:

```python
#!/usr/bin/env python3
"""자동 업데이트 워크플로"""

import schedule
import time
import subprocess
from datetime import datetime

def update_navdata():
    """항법 데이터 업데이트 실행"""
    print(f"🔄 항법 데이터 업데이트 시작 - {datetime.now()}")

    try:
        # 변환 프로그램 실행
        result = subprocess.run(['python', 'XP2INI_NDB_Converter.py'],
                              capture_output=True, text=True)

        if result.returncode == 0:
            print("✅ 항법 데이터 업데이트 성공!")
            # 여기에 자동 배포 로직을 추가할 수 있습니다.
        else:
            print("❌ 업데이트 실패:", result.stderr)

    except Exception as e:
        print(f"❌ 업데이트 오류: {e}")

# 28일마다 한 번 실행 (AIRAC 주기)
schedule.every(28).days.do(update_navdata)

# 스크립트 실행 유지
print("📅 항법 데이터 자동 업데이트 스케줄러가 시작되었습니다.")
while True:
    schedule.run_pending()
    time.sleep(3600)  # 1시간마다 확인
```

### 🔍 데이터 품질 검증

출력 데이터 품질을 확인하는 검증 스크립트를 생성하십시오:

```python
#!/usr/bin/env python3
"""데이터 품질 검증 스크립트"""

import sqlite3
import os

def validate_database(db_path):
    """데이터베이스 무결성 및 데이터 품질 검증"""

    if not os.path.exists(db_path):
        print(f"❌ 데이터베이스 파일이 존재하지 않습니다: {db_path}")
        return False

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # 테이블 구조 확인
    tables = [
        'tbl_airports',
        'tbl_runways',
        'tbl_d_vhfnavaids',
        'tbl_db_enroute_ndbnavaids',
        'tbl_ea_enroute_waypoints',
        'tbl_pc_terminal_waypoints',
        'tbl_pd_sids',
        'tbl_er_enroute_airways'
    ]

    print("🔍 데이터베이스 검증 보고서")
    print("=" * 40)

    for table in tables:
        try:
            cursor.execute(f"SELECT COUNT(*) FROM {table}")
            count = cursor.fetchone()[0]
            print(f"✅ {table}: {count}개 레코드")
        except sqlite3.OperationalError as e:
            print(f"❌ {table}: 테이블이 존재하지 않거나 쿼리 실패")

    # 데이터 품질 확인
    print("\n📊 데이터 품질 검사")
    print("=" * 40)

    # Null 좌표 확인
    cursor.execute("""
        SELECT COUNT(*) FROM tbl_airports
        WHERE airport_latitude IS NULL OR airport_longitude IS NULL
    """)
    null_coords = cursor.fetchone()[0]

    if null_coords == 0:
        print("✅ 공항 좌표: Null 값 없음")
    else:
        print(f"⚠️ 공항 좌표: {null_coords}개 Null 값")

    conn.close()
    return True

if __name__ == "__main__":
    validate_database("Output/e_dfd_PMDG.s3db")
```

## 🚨 자주 묻는 사용 문제

### 변환 과정 문제

#### 문제: 프로그램이 중간에 멈춤
```bash
# 원인: 데이터 파일 손상 또는 경로 오류
# 해결: 모든 입력 파일의 무결성 확인
python -c "
import os
for f in ['NAIP/AD_HP.csv', 'X-Plane/earth_fix.dat']:
    if os.path.exists(f):
        print(f'{f}: {os.path.getsize(f)} bytes')
    else:
        print(f'{f}: 파일이 존재하지 않음')
"
```

#### 문제: 메모리 부족 오류
```python
# 해결: 배치 처리 크기 줄이기
# 설정에서 더 작은 BATCH_SIZE 설정
BATCH_SIZE = 500  # 500으로 줄임
```

#### 문제: 데이터베이스 잠금 오류
```bash
# 원인: 다른 프로그램이 데이터베이스를 사용 중임
# 해결: 모든 관련 프로그램을 닫은 후 다시 실행
taskkill /f /im "FlightSimulator.exe"
```

### 배포 문제

#### 문제: FMC에 "DB OUT OF DATE" 표시
```bash
# 원인:
# 1. 데이터베이스 파일이 올바르게 복사되지 않음
# 2. MSFS 캐시가 비워지지 않음
# 3. AIRAC 주기가 일치하지 않음

# 해결 단계:
# 1. 데이터베이스 파일이 올바른 위치에 있는지 확인
# 2. NavigationData 캐시 폴더 내용을 완전히 삭제
# 3. MSFS 재시작
```

#### 문제: 일부 경유지 또는 절차 누락
```bash
# 원인: CIFP 데이터 불완전
# 해결:
# 1. 완전한 CIFP 데이터 패키지 재다운로드
# 2. 대상 공항의 절차 파일이 존재하는지 확인
# 3. ICAO 지역 코드가 지원 범위 내에 있는지 확인
```

## 📈 성능 최적화

### 🚀 변환 속도 향상

```python
# 다중 프로세스 처리 활성화
MULTIPROCESS_WORKERS = 8  # CPU 코어 수에 따라 조정

# SSD 저장 사용
# 작업 디렉터리를 SSD에 설정하면 I/O 성능을 크게 향상시킬 수 있습니다.

# 사용 가능한 메모리 증가
# 불필요한 프로그램을 닫고 최소 8GB의 사용 가능한 메모리 확보
```

### 📊 리소스 사용 모니터링

```python
import psutil
import time

def monitor_performance():
    """시스템 리소스 사용 모니터링"""
    while True:
        cpu = psutil.cpu_percent()
        memory = psutil.virtual_memory().percent
        disk = psutil.disk_usage('.').percent

        print(f"CPU: {cpu}% | 메모리: {memory}% | 디스크: {disk}%")
        time.sleep(5)

# 변환 과정 중에 모니터링 실행
monitor_performance()
```

---

축하합니다! Nav-data 도구의 전체 사용 프로세스를 숙지하셨습니다.
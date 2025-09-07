# 🔧 문제 해결 가이드

본 가이드는 Nav-data PMDG 변환 도구를 사용할 때 발생할 수 있는 일반적인 문제와 그 해결책을 다룹니다. 문제 유형별로 분류되어 있어 빠르고 쉽게 문제를 파악하고 해결할 수 있습니다.

---

## 🚨 설치 문제

### ❌ Python 환경 문제

#### **문제**: `python: command not found` 또는 `'python'은(는) 내부 또는 외부 명령이 아닙니다`
**증상**:
```bash
'python' is not recognized as an internal or external command
```

**해결책**:
```bash
# 1. Python 설치 확인
python --version
# 또는
python3 --version

# 2. PATH 환경 변수 확인
echo $PATH  # Linux/macOS
echo %PATH%  # Windows

# 3. Python 재설치 (공식 웹사이트에서 다운로드 권장)
# https://www.python.org/downloads/
```

#### **문제**: 종속성 패키지 설치 실패
**증상**:
```bash
ERROR: Could not find a version that satisfies the requirement
```

**해결책**:
```bash
# 1. pip 업데이트
python -m pip install --upgrade pip

# 2. 국내 미러 소스 사용 (중국 사용자)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 3. pip 캐시 정리
pip cache purge

# 4. 가상 환경 사용
python -m venv nav_data_env
source nav_data_env/bin/activate  # Linux/macOS
nav_data_env\Scripts\activate     # Windows
```

### ❌ 권한 문제

#### **문제**: MSFS 디렉토리 접근 거부
**증상**:
```
PermissionError: [Errno 13] Permission denied
```

**해결책**:
```bash
# Windows 사용자
# 1. 관리자 권한으로 명령 프롬프트 실행
# 2. 또는 디렉토리 권한 수정
icacls "C:\Users\[사용자명]\AppData\Local\Packages" /grant Users:F /T

# MSFS 디렉토리 권한 확인
# 디렉토리 마우스 우클릭 -> 속성 -> 보안 -> 편집 -> 모든 권한 추가
```

---

## 🔄 변환 문제

### ❌ 데이터 파일 문제

#### **문제**: AIRAC 데이터 파일을 찾을 수 없음
**증상**:
```
FileNotFoundError: AIRAC data file not found
```

**진단 단계**:
```bash
# 1. 파일 경로 확인
ls -la ./input/AIRAC2024-01/  # Linux/macOS
dir .\input\AIRAC2024-01\     # Windows

# 2. 파일 권한 확인
ls -la *.dat *.txt *.xml      # 데이터 파일 확인
```

**해결책**:
```bash
# 1. 데이터 파일 형식 및 위치 확인
mkdir -p ./input/AIRAC2024-01
# AIRAC 데이터 파일을 올바른 디렉토리에 배치

# 2. 파일 무결성 확인
python validate_data.py --check-integrity --input-dir=./input/AIRAC2024-01
```

#### **문제**: 데이터 형식 호환 불가
**증상**:
```
ValueError: Unsupported data format or corrupted file
```

**해결책**:
```bash
# 1. 지원되는 형식 확인
python converter.py --list-supported-formats

# 2. 데이터 형식 변환
python format_converter.py --input=old_format.dat --output=new_format.xml --format=ARINC424

# 3. 디버그 모드를 사용하여 상세 정보 확인
python converter.py --debug --verbose --input=problematic_file.dat
```

### ❌ 변환 과정 오류

#### **문제**: 메모리 부족 오류
**증상**:
```
MemoryError: Unable to allocate array
```

**해결책**:
```bash
# 1. 대용량 데이터셋 분할 처리
python converter.py --batch-size=1000 --memory-limit=4GB

# 2. 데이터 스트림 처리 활성화
python converter.py --streaming-mode --temp-dir=/tmp/nav_data

# 3. 가상 메모리 증가 (Windows)
# 제어판 -> 시스템 -> 고급 시스템 설정 -> 가상 메모리

# 4. 시스템 리소스 최적화
# 불필요한 프로그램 닫기
# 임시 파일 정리
```

#### **문제**: 좌표 변환 오류
**증상**:
```
CoordinateTransformError: Invalid coordinate conversion
```

**해결책**:
```bash
# 1. 좌표계 설정 확인
python converter.py --coordinate-system=WGS84 --verify-coordinates

# 2. 대체 변환 방법 사용
python converter.py --coordinate-method=alternative --precision=8

# 3. 자기 편각 설정 확인
python converter.py --magnetic-model=WMM2020 --declination-check
```

---

## ⚙️ 구성 문제

### ❌ PMDG 통합 문제

#### **문제**: PMDG 항공기가 내비게이션 데이터를 인식하지 못함
**증상**: FMC에 "NAV DATA NOT FOUND" 표시 또는 항로점 로드 불가

**진단 단계**:
```bash
# 1. PMDG 데이터 디렉토리 확인
dir "C:\Users\%USERNAME%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\PMDG\"

# 2. 데이터베이스 파일 확인
python verify_pmdg_db.py --check-tables --check-indexes
```

**해결책**:
```bash
# 1. PMDG 데이터 경로 확인
python converter.py --pmdg-path="C:\Users\[사용자명]\AppData\Local\Packages\Microsoft.FlightSimulator_[ID]\LocalCache\PMDG"

# 2. 데이터베이스 인덱스 재생성
python rebuild_indexes.py --database=pmdg_nav.db

# 3. 파일 권한 확인
icacls "PMDG 데이터 디렉토리" /grant Users:F /T

# 4. MSFS 및 PMDG 항공기 재시작
```

#### **문제**: 데이터 버전 불일치
**증상**: PMDG가 이전 AIRAC 주기 표시 또는 데이터 미업데이트

**해결책**:
```bash
# 1. AIRAC 식별자 강제 업데이트
python converter.py --force-airac-update --airac-cycle=2024-01

# 2. 캐시 지우기
python clear_cache.py --pmdg-cache --nav-cache

# 3. AIRAC 주기 확인
python verify_airac.py --current-cycle --check-validity
```

---

## 🚀 성능 문제

### ❌ 느린 변환 속도

#### **문제**: 변환 과정이 비정상적으로 느림
**가능한 원인**:
- 하드 디스크 I/O 병목 현상
- 메모리 부족
- 낮은 CPU 사용률
- 네트워크 지연 (온라인 확인)

**최적화 방안**:
```bash
# 1. 다중 프로세스 처리 활성화
python converter.py --parallel=4 --workers=auto

# 2. SSD 임시 디렉토리 사용
python converter.py --temp-dir="D:\SSD_Temp" --keep-temp-files=false

# 3. 불필요한 유효성 검사 비활성화
python converter.py --skip-validation --no-online-check

# 4. I/O 작업 최적화
python converter.py --buffer-size=64MB --async-io
```

### ❌ 높은 메모리 사용량

#### **문제**: 변환 과정에서 많은 메모리 소모
**메모리 사용량 모니터링**:
```bash
# Windows
tasklist /fi "imagename eq python.exe"

# Linux/macOS
top -p $(pgrep python)
```

**해결책**:
```bash
# 1. 스트리밍 처리 활성화
python converter.py --streaming --chunk-size=10MB

# 2. 메모리 사용 제한
python converter.py --max-memory=2GB --gc-threshold=100MB

# 3. 단계별 처리
python converter.py --process-by-region --region-size=small
```

---

## 🔍 데이터 유효성 검사 문제

### ❌ 데이터 무결성 검사 실패

#### **문제**: 유효성 검사 도구가 데이터 불완전함을 보고함
**증상**:
```
ValidationError: Missing required navigation points
```

**진단 도구**:
```bash
# 1. 전체 유효성 검사 실행
python validate_data.py --comprehensive --output-report=validation_report.html

# 2. 특정 데이터 유형 확인
python validate_data.py --check-airports --check-navaids --check-airways

# 3. 참조 데이터와 비교
python compare_data.py --reference=official_data.xml --current=converted_data.db
```

**복구 방안**:
```bash
# 1. 원본 데이터 다시 다운로드
# AIRAC 데이터가 완전하고 최신 상태인지 확인

# 2. 복구 도구 사용
python repair_data.py --fix-missing --interpolate-gaps

# 3. 누락된 데이터 수동 보충
python manual_fix.py --add-missing-waypoints --config=fixes.json
```

### ❌ 좌표 정확도 문제

#### **문제**: 내비게이션 지점 위치 부정확
**확인 방법**:
```bash
# 1. 특정 웨이포인트 좌표 확인
python check_waypoint.py --icao=ZSPD --waypoint=SASAN

# 2. 여러 데이터 소스 비교
python compare_coordinates.py --sources=navigraph,aerosoft --output=coordinate_diff.csv

# 3. 편차 보고서 생성
python deviation_report.py --threshold=0.001 --output=deviations.html
```

---

## 📊 로그 분석

### 🔍 로그 파일 이해

#### **로그 레벨 설명**:
- **DEBUG**: 상세 디버그 정보
- **INFO**: 일반 처리 정보
- **WARNING**: 경고 정보, 기능에 영향 없음
- **ERROR**: 오류 정보, 주의 필요
- **CRITICAL**: 심각한 오류, 처리 중단

#### **일반적인 로그 패턴**:
```bash
# 오류 로그 찾기
grep "ERROR\|CRITICAL" converter.log

# 경고 개수 통계
grep -c "WARNING" converter.log

# 처리 시간 분석
grep "Processing time" converter.log | tail -10
```

### 🔧 로그 구성

#### **로그 상세도 증가**:
```bash
# 상세 로그 활성화
python converter.py --log-level=DEBUG --log-format=detailed

# 다른 유형의 로그 분리
python converter.py --log-split --error-log=errors.log --debug-log=debug.log
```

---

## 🆘 긴급 복구

### 🚨 데이터 손상 복구

#### **단계 1**: 즉시 백업
```bash
# 현재 상태 백업
cp -r ./output ./backup_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
xcopy .\output .\backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E /I  # Windows
```

#### **단계 2**: 백업에서 복원
```bash
# 가장 최근 유효한 백업 복원
python restore_backup.py --list-backups
python restore_backup.py --restore=backup_20240115_1430 --target=./output
```

#### **단계 3**: 복구 확인
```bash
# 복구된 데이터 확인
python validate_data.py --quick-check --report-only-errors
```

### 🚨 기본 상태로 재설정

#### **전체 재설정**:
```bash
# 경고: 모든 변환된 데이터를 삭제합니다
python reset_tool.py --full-reset --confirm

# 기본 구성 다시 다운로드
python setup.py --download-config --reset-settings

# 초기화 다시 실행
python init.py --first-time-setup
```

---

## 📞 추가 지원 받기

### 📝 문제 보고 시 다음 정보 제공

1.  **시스템 정보**:
    ```bash
    python --version
    python system_info.py --full-report
    ```

2.  **오류 로그**:
    - 전체 오류 스택 추적
    - 관련 경고 메시지
    - 처리 전후 로그 단편

3.  **환경 정보**:
    - 운영 체제 버전
    - MSFS 버전 및 설치 방식
    - PMDG 항공기 버전
    - 데이터 소스 및 AIRAC 주기

4.  **재현 단계**:
    - 상세 작업 단계
    - 입력한 명령 및 매개변수
    - 예상 결과 vs 실제 결과

### 🔗 연락처

-   **GitHub Issues**: [문제 보고서 제출](https://github.com/nav-data/docs/issues/new)
-   **커뮤니티 포럼**: [토론 참여](https://github.com/nav-data/docs/discussions)
-   **긴급 지원**: support@nav-data.org

---

## 🔄 예방 조치

### ✅ 모범 사례 체크리스트

-   [ ] 데이터 및 구성 **정기 백업**
-   [ ] **최신 버전**의 변환 도구 사용
-   [ ] 매 변환 후 **데이터 유효성 검사**
-   [ ] 잠재적 문제 파악을 위한 **로그 모니터링**
-   [ ] 환경을 깨끗하고 **최신 상태로 유지**
-   [ ] 사용자 지정 구성 **문서화**

### 📅 유지보수 계획

-   **매주**: 로그 파일 확인, 임시 파일 정리
-   **매월**: AIRAC 데이터 업데이트, 도구 버전 확인
-   **분기별**: 전체 시스템 점검, 성능 최적화
-   **중요 업데이트 시**: 전체 백업, 신중한 업그레이드

기억하세요: 예방이 치료보다 낫습니다! 정기적인 유지보수는 대부분의 문제 발생을 방지할 수 있습니다.
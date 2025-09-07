# 🔧 문제 해결 가이드

이 가이드는 Nav-data iniBuilds 변환 도구를 사용할 때 발생할 수 있는 일반적인 문제와 해결책을 다룹니다. 문제의 심각도와 유형별로 분류되어 있어 신속한 진단 및 해결에 용이합니다.

---

## 🚨 긴급 문제 (Critical Issues)

### ❌ 변환 도구 실행 불가

#### **문제**: Python 환경 문제로 도구 실행 불가
**증상**:
```bash
ModuleNotFoundError: No module named 'converter'
ImportError: cannot import name 'XP2INI_Converter'
```

**즉시 해결책**:
```bash
# 1. Python 환경 확인
python --version  # 3.8 이상이어야 함

# 2. 종속성 재설치
pip uninstall -r requirements.txt -y
pip install -r requirements.txt --force-reinstall

# 3. 작업 디렉터리 확인
pwd  # Linux/macOS
echo %cd%  # Windows

# 4. 저장소 재클론 (최후의 수단)
git clone https://github.com/nav-data/converter.git
cd converter
python setup.py install
```

#### **문제**: 주요 파일 누락
**증상**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'XP2INI_NDB_Converter.py'
```

**즉시 해결책**:
```bash
# 1. 파일 무결성 확인
ls -la *.py  # Linux/macOS
dir *.py     # Windows

# 2. 누락된 파일 재다운로드
wget https://raw.githubusercontent.com/nav-data/converter/main/XP2INI_NDB_Converter.py

# 3. 권한 확인
chmod +x *.py  # Linux/macOS
```

---

## ⚠️ 높은 우선순위 문제 (High Priority)

### ❌ A350 데이터 통합 실패

#### **문제**: iniBuilds A350이 항법 데이터를 인식하지 못함
**증상**: MCDU에 "NO NAV DATA"가 표시되거나 AIRAC이 비어 있음

**진단 단계**:
```bash
# 1. A350 설치 경로 확인
find /c/Users -name "*inibuilds*" -type d 2>/dev/null  # Windows (Git Bash)
find /Users -name "*inibuilds*" -type d 2>/dev/null    # macOS
find /home -name "*inibuilds*" -type d 2>/dev/null     # Linux

# 2. 커뮤니티 폴더 확인
ls "$MSFS_COMMUNITY_PATH/inibuilds-aircraft-a350/SimObjects/Airplanes/iniBuilds_A350_900/"

# 3. 데이터 파일 확인
ls -la *.db *.sqlite *.json  # A350 데이터 디렉터리에서
```

**해결책**:
```bash
# 1. A350 설치 경로 재지정
python converter.py --detect-aircraft --scan-community-folder

# 2. 수동으로 경로 지정
python converter.py --a350-path="/path/to/inibuilds-aircraft-a350" --force-install

# 3. 파일 권한 복구
# Windows
icacls "A350数据目录" /grant Users:F /T

# Linux/macOS  
chmod -R 755 /path/to/inibuilds-aircraft-a350/
chown -R $USER:$USER /path/to/inibuilds-aircraft-a350/

# 4. 설치 확인
python verify_installation.py --aircraft=a350 --verbose
```

#### **문제**: AIRAC 주기 불일치
**증상**: A350에 이전 또는 잘못된 AIRAC 주기가 표시됨

**해결책**:
```bash
# 1. AIRAC 식별자 강제 업데이트
python converter.py --force-airac --cycle=2024-01 --aircraft=a350

# 2. A350 캐시 삭제
# A350 캐시 파일 삭제
rm -f "$A350_PATH/work/NavData/cache/*"  # Linux/macOS
del "%A350_PATH%\work\NavData\cache\*"   # Windows

# 3. 항법 데이터베이스 재생성
python rebuild_navdb.py --aircraft=a350 --clean-rebuild

# 4. AIRAC 주기 확인
python check_airac.py --aircraft=a350 --expected-cycle=2024-01
```

---

## 🔄 설치 및 구성 문제

### ❌ 종속성 패키지 설치 실패

#### **문제**: 특정 패키지 설치 실패
**일반적인 오류**:
```bash
# 수학 라이브러리 종속성 문제
ERROR: Failed building wheel for numpy
ERROR: Failed building wheel for pandas

# 컴파일러 문제
Microsoft Visual C++ 14.0 is required
error: Microsoft Visual Studio 14.0 is required
```

**플랫폼별 해결**:

**Windows**:
```bash
# 1. Visual Studio Build Tools 설치
# 다운로드 및 설치: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# 2. 사전 컴파일된 패키지 사용
pip install numpy pandas -f https://www.lfd.uci.edu/~gohlke/pythonlibs/

# 3. conda 사용 (권장)
conda install numpy pandas sqlite3 lxml
```

**macOS**:
```bash
# 1. Xcode Command Line Tools 설치
xcode-select --install

# 2. Homebrew를 사용하여 종속성 설치
brew install python@3.9 sqlite3

# 3. Python 패키지 재설치
pip3 install -r requirements.txt
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3-dev python3-pip build-essential libsqlite3-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel sqlite-devel

# 패키지 재설치
pip3 install -r requirements.txt
```

### ❌ 데이터 소스 구성 문제

#### **문제**: 데이터 소스에 연결할 수 없음
**증상**:
```
ConnectionError: Failed to download AIRAC data
TimeoutError: Data source unreachable
```

**네트워크 진단**:
```bash
# 1. 네트워크 연결 테스트
ping navigraph.com
nslookup navigraph.com

# 2. 프록시 설정 확인
echo $HTTP_PROXY $HTTPS_PROXY  # Linux/macOS
echo %HTTP_PROXY% %HTTPS_PROXY%  # Windows

# 3. 포트 연결 테스트
telnet navigraph.com 443
nc -zv navigraph.com 443  # Linux/macOS
```

**해결책**:
```bash
# 1. 프록시 구성 (필요한 경우)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# Windows
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=https://proxy.company.com:8080

# 2. 오프라인 모드 사용
python converter.py --offline --local-data=/path/to/airac/data

# 3. 데이터 소스 변경
python converter.py --data-source=backup --mirror=asia
```

---

## 📊 데이터 처리 문제

### ❌ 메모리 관련 오류

#### **문제**: 메모리 부족으로 변환 실패
**증상**:
```
MemoryError: Unable to allocate memory
MemoryError: cannot allocate memory for array
OSError: [Errno 12] Cannot allocate memory
```

**메모리 모니터링**:
```bash
# 실시간 메모리 사용량 모니터링
# Linux
free -h
htop

# macOS
vm_stat
activity monitor

# Windows
tasklist /fi "imagename eq python.exe"
wmic process get name,processid,workingsetsize
```

**최적화 해결책**:
```bash
# 1. 스트리밍 모드 활성화
python converter.py --streaming --chunk-size=512KB --memory-limit=2GB

# 2. 지역별 처리
python converter.py --region=ZSPD --process-incrementally
python converter.py --region=ZBAA --process-incrementally  
python converter.py --region=ZGGG --process-incrementally

# 3. 시스템 메모리 최적화
# 불필요한 애플리케이션 종료
# 가상 메모리/스왑 공간 증가

# Linux - 스왑 공간 증가
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. 저메모리 모드 사용
python converter.py --low-memory --disable-cache --temp-cleanup
```

### ❌ 데이터 형식 오류

#### **문제**: 입력 데이터 형식이 호환되지 않음
**증상**:
```
ValueError: Invalid ARINC 424 format
ParseError: Malformed XML data
UnicodeDecodeError: codec can't decode byte
```

**데이터 유효성 검사**:
```bash
# 1. 파일 인코딩 확인
file input_data.dat
hexdump -C input_data.dat | head

# 2. 파일 무결성 확인
md5sum input_data.dat  # Linux/macOS
certUtil -hashfile input_data.dat MD5  # Windows

# 3. 파일 형식 확인
python validate_format.py --input=input_data.dat --format=arinc424
```

**복구 방안**:
```bash
# 1. 파일 인코딩 변환
iconv -f ISO-8859-1 -t UTF-8 input_data.dat > input_data_utf8.dat  # Linux/macOS

# Windows (PowerShell)
Get-Content input_data.dat -Encoding Default | Set-Content input_data_utf8.dat -Encoding UTF8

# 2. 형식 변환기 사용
python format_converter.py --input=input_data.dat --from=legacy --to=arinc424

# 3. 일반적인 문제 수동 복구
python repair_data.py --fix-encoding --fix-line-endings --input=input_data.dat
```

---

## 🚀 성능 문제

### ❌ 변환 속도 지연

#### **문제**: 변환 프로세스가 비정상적으로 느림
**가능한 원인 분석**:
- 디스크 I/O 병목 현상 (HDD vs SSD)
- 낮은 CPU 사용률 (단일 스레드 처리)
- 메모리 부족으로 인한 빈번한 스와핑
- 네트워크 지연 (온라인 검증)

**성능 진단**:
```bash
# 1. 시스템 리소스 모니터링
# Linux
iostat -x 1    # I/O 통계
top -p $(pgrep python)  # CPU 및 메모리

# macOS
iostat 1       # I/O 통계  
top -pid $(pgrep python)  # 프로세스 모니터링

# Windows
perfmon        # 성능 모니터
wmic process get name,processid,percentprocessortime
```

**성능 최적화**:
```bash
# 1. 멀티 프로세싱 활성화
python converter.py --parallel=auto --workers=$(nproc)

# 2. 더 빠른 저장소 사용
python converter.py --temp-dir=/path/to/ssd/temp --output-dir=/path/to/ssd/output

# 3. 불필요한 검사 비활성화
python converter.py --skip-validation --no-backup --fast-mode

# 4. 메모리 맵핑 모드 (대용량 파일)
python converter.py --memory-map --buffer-size=64MB

# 5. 출력 압축 (I/O 감소)
python converter.py --compress-output --compression=lz4
```

### ❌ CPU 사용률 과도함

#### **문제**: 변환 과정 중 CPU 점유율 100%, 시스템 응답 지연
**해결책**:
```bash
# 1. CPU 사용 제한
python converter.py --cpu-limit=75 --nice=10

# 2. 병렬 처리 수준 낮추기
python converter.py --parallel=2 --throttle=1000ms

# 3. 우선순위 제어 사용
# Linux/macOS
nice -n 19 python converter.py  # 최저 우선순위

# Windows  
start /low python converter.py
```

---

## 🔍 iniBuilds A350 전용 문제

### ❌ MCDU 항법 데이터 표시 문제

#### **문제**: MCDU에 항법 데이터가 부정확하거나 불완전하게 표시됨
**증상**:
- 웨이포인트(Waypoints)를 찾을 수 없음
- SID/STAR 절차 누락
- 주파수 정보 오류
- 좌표 오프셋

**진단 도구**:
```bash
# 1. A350 데이터베이스 무결성 확인
python check_a350_db.py --comprehensive --report=detailed

# 2. 특정 항법 지점 유효성 검사
python verify_waypoint.py --icao=ZSPD --waypoint=SASAN --aircraft=a350

# 3. 데이터 일관성 비교
python compare_data.py --source=navigraph --target=a350_db --threshold=0.001

# 4. 차이점 보고서 생성
python diff_report.py --original=source_data --converted=a350_data --format=html
```

**복구 단계**:
```bash
# 1. 항법 데이터베이스 재생성
python rebuild_navdb.py --aircraft=a350 --source=latest_airac

# 2. 주요 웨이포인트 수동 복구
python manual_fix.py --waypoints=critical_fixes.json --aircraft=a350

# 3. 주파수 데이터 업데이트
python update_frequencies.py --aircraft=a350 --source=official

# 4. 복구 결과 확인
python validate_fix.py --aircraft=a350 --quick-test
```

### ❌ FMS 항로 계획 문제

#### **문제**: A350 FMS가 항로를 올바르게 계획할 수 없음
**증상**:
- "NO ROUTE FOUND" 오류
- 항로 구간 연결 끊김
- 고도 제한 오류

**해결 단계**:
```bash
# 1. 항로 연결성 확인
python check_airways.py --from=ZSPD --to=ZBAA --aircraft=a350

# 2. 웨이포인트 연결 확인
python validate_connections.py --airway=A461 --aircraft=a350

# 3. 끊어진 항로 복구
python repair_airways.py --auto-fix --aircraft=a350 --region=china

# 4. 항로 네트워크 재구축
python rebuild_airways.py --aircraft=a350 --optimize-paths
```

---

## 📋 로그 분석 및 진단

### 🔍 오류 로그 이해

#### **일반적인 오류 패턴 및 의미**:

**데이터 변환 오류**:
```bash
# 좌표 변환 문제
ERROR: CoordinateTransformError: Invalid coordinate format
# -> 입력 데이터의 좌표 형식 확인

# 데이터베이스 쓰기 실패  
ERROR: DatabaseError: database is locked
# -> 데이터베이스에 접근하는 다른 프로그램 종료

# 파일 권한 문제
ERROR: PermissionError: [Errno 13] Permission denied
# -> 관리자 권한 사용 또는 파일 권한 수정
```

**네트워크 연결 오류**:
```bash
# 연결 시간 초과
ERROR: ConnectionTimeout: Failed to connect within 30 seconds
# -> 네트워크 연결 확인, 시간 초과 설정 증가

# DNS 해석 실패
ERROR: socket.gaierror: [Errno -2] Name or service not known  
# -> DNS 설정 확인, 보조 DNS 서버 사용
```

#### **로그 수준 상세 설명**:
- **CRITICAL**: 프로그램이 계속 실행할 수 없는 심각한 오류
- **ERROR**: 기능 실행 실패, 그러나 프로그램은 계속 실행 가능
- **WARNING**: 잠재적 문제, 현재 실행에는 영향 없음
- **INFO**: 일반 정보, 처리 진행 상황 등
- **DEBUG**: 문제 진단을 위한 상세 디버그 정보

### 🛠️ 고급 디버깅 기법

#### **상세 디버깅 활성화**:
```bash
# 1. 가장 상세한 로그
python converter.py --log-level=DEBUG --verbose --trace --profile

# 2. 다른 유형의 로그 분리
python converter.py --log-split \
  --error-log=errors.log \
  --warning-log=warnings.log \
  --debug-log=debug.log \
  --info-log=info.log

# 3. 실시간 로그 모니터링
tail -f converter.log | grep -E "(ERROR|CRITICAL)"  # Linux/macOS
```

#### **성능 분석**:
```bash
# 1. 성능 분석 활성화
python -m cProfile -o profile_output.prof converter.py

# 2. 성능 병목 현상 분석
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"

# 3. 메모리 사용량 분석
python -m memory_profiler converter.py --memory-profile
```

---

## 🆘 긴급 복구 절차

### 🚨 데이터 손상 복구

#### **신속 복구 단계**:
```bash
# 1. 모든 관련 프로세스 즉시 중지
pkill -f "python.*converter"  # Linux/macOS
taskkill /f /im python.exe    # Windows

# 2. 현재 상태 스냅샷 생성
cp -r output_data recovery_snapshot_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
robocopy output_data recovery_snapshot_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E  # Windows

# 3. 최신 백업에서 복원
python restore_backup.py --list-available
python restore_backup.py --restore=latest --confirm --target=output_data

# 4. 복구된 데이터 확인
python verify_data_integrity.py --comprehensive --fix-minor-issues
```

### 🔄 전체 재설정 절차

#### **모든 방법이 실패했을 때**:
```bash
# 경고: 이 작업은 모든 변환된 데이터와 구성을 삭제합니다.
echo "This will delete all converted data. Continue? (yes/no)"
read confirmation
if [ "$confirmation" = "yes" ]; then
    # 1. 사용자 구성 백업
    cp config.json config_backup_$(date +%Y%m%d).json
    
    # 2. 전체 정리
    python cleanup_all.py --nuclear-option --confirm-delete
    
    # 3. 재초기화
    python setup.py --fresh-install --default-config
    
    # 4. 사용자 구성 복원
    python merge_config.py --base=config.json --user=config_backup_*.json
fi
```

---

## 📞 전문 지원 받기

### 📝 지원 요청 준비

**지원팀에 문의하기 전에 다음 정보를 수집하십시오**:

```bash
# 1. 시스템 정보 보고서
python system_report.py --full > system_info.txt

# 2. 오류 로그 (최근 100줄)
tail -100 converter.log > recent_errors.log  # Linux/macOS
powershell "Get-Content converter.log -Tail 100" > recent_errors.log  # Windows

# 3. 구성 파일
cp config.json config_for_support.json

# 4. 버전 정보
python --version > version_info.txt
python converter.py --version >> version_info.txt
git log --oneline -5 >> version_info.txt
```

### 🔗 지원 채널

#### **긴급도에 따라 선택**:

**🚨 긴급 (24시간 이내 비행에 영향)**:
- 📧 **긴급 이메일**: emergency@nav-data.org
- 📱 **긴급 연락**: 위챗 그룹 "Nav-data紧急支援"

**⚠️ 중요 (1-3일 이내 답변)**:
- 🐛 **GitHub Issues**: [상세 문제 보고서 생성](https://github.com/nav-data/docs/issues/new?template=bug_report.md)
- 📧 **기술 지원**: technical@nav-data.org

**💬 일반 문제 (1주일 이내 답변)**:
- 🗣️ **커뮤니티 토론**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 📧 **일반 지원**: support@nav-data.org

#### **지원 요청 템플릿**:
```
제목: [iniBuilds] 간결한 문제 설명 - 영향 수준

환경 정보:
- 운영 체제: Windows 11 / macOS 12.6 / Ubuntu 22.04
- Python 버전: 3.9.7
- 도구 버전: v2.1.3
- iniBuilds A350 버전: v1.2.0
- MSFS 버전: 2024

문제 설명:
[문제 현상을 상세하게 설명]

재현 단계:
1. 첫 번째 단계...
2. 두 번째 단계...
3. 문제 발생

예상 결과:
[예상되는 올바른 동작 설명]

실제 결과:
[실제로 발생한 오류 동작 설명]

시도한 해결책:
- 해결책 A를 시도했으며, 결과는...
- 해결책 B를 시도했으며, 결과는...

첨부 파일:
- system_info.txt
- recent_errors.log
- config_for_support.json
```

---

## 🔄 예방적 유지보수

### ✅ 정기 유지보수 체크리스트

#### **주간 점검**:
- [ ] 로그 파일 확인, 잠재적 문제 식별
- [ ] 임시 파일 및 캐시 정리
- [ ] A350 데이터 로드 정상 여부 확인
- [ ] 디스크 공간 사용량 확인

```bash
# 주간 점검 자동화
python weekly_maintenance.py --clean-temp --check-logs --verify-data --disk-usage
```

#### **월간 점검**:
- [ ] AIRAC 데이터 업데이트
- [ ] 중요 구성 및 데이터 백업
- [ ] 도구 버전 업데이트 확인
- [ ] 성능 벤치마크 테스트

```bash
# 월간 유지보수 자동화
python monthly_maintenance.py --update-airac --backup-data --check-updates --benchmark
```

#### **주요 업데이트 전**:
- [ ] 전체 데이터 백업
- [ ] 테스트 환경 검증
- [ ] 버전 호환성 검사
- [ ] 롤백 계획 준비

### 📊 모니터링 및 경고

#### **자동 모니터링 설정**:
```bash
# 1. 모니터링 스크립트 생성
python create_monitor.py --check-interval=1h --alert-email=admin@your-domain.com

# 2. 시스템 서비스 설정 (Linux)
sudo systemctl enable nav-data-monitor
sudo systemctl start nav-data-monitor

# 3. 작업 스케줄러 설정 (Windows)
schtasks /create /tn "Nav-Data Monitor" /tr "python monitor.py" /sc hourly
```

기억하십시오: 능동적인 유지보수와 모니터링은 대부분의 문제 발생을 예방하며, 사후 복구보다 훨씬 효율적입니다!

---

**최종 업데이트**: 2024년 1월 15일  
**문서 버전**: v2.1  
**적용 도구 버전**: v2.1.0+
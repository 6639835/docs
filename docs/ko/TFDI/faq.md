# ❓ TFDI 내비게이션 데이터 변환기 FAQ

## 🔧 설치 및 구성

### Q: 변환기를 사용하려면 어떤 소프트웨어를 설치해야 하나요?

**A:** 다음 소프트웨어 환경이 필요합니다.
- **Python 3.8+** (3.9 버전 이상 권장)
- **TFDI MD-11**이(가) Microsoft Flight Simulator에 설치되어 있어야 함
- **Fenix A320** (내비게이션 데이터베이스 파일 획득용)
- 필수 Python 종속성 패키지(requirements.txt를 통해 설치)

### Q: Fenix 내비게이션 데이터베이스 파일은 어떻게 얻나요?

**A:** Fenix 데이터베이스 파일은 일반적으로 다음 위치에 있습니다.
```
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
```

**참고 사항:**
- Fenix A320이(가) 설치되어 있고 최소 한 번 실행되었는지 확인하십시오.
- 데이터베이스 파일 크기는 일반적으로 50-200MB입니다.
- 파일은 완전하고 손상되지 않은 SQLite 데이터베이스여야 합니다.

### Q: 변환기는 어떤 Fenix 및 TFDI 버전을 지원하나요?

**A:** 현재 지원 버전:
- **Fenix A320**: v1.0.x - v1.2.x
- **TFDI MD-11**: v1.0.x - v1.2.x
- **데이터베이스 형식**: SQLite 3.x

**버전 호환성:**
- ✅ 완벽 호환: Fenix v1.1.x + TFDI v1.1.x
- ⚠️ 확인 필요: 최신 버전은 호환성 업데이트를 기다려야 할 수 있습니다.
- ❌ 지원 안 함: 너무 오래된 베타 버전

## 📊 데이터 변환

### Q: 변환 프로세스는 얼마나 걸리나요?

**A:** 변환 시간은 데이터베이스 크기에 따라 다릅니다.
- **소형 데이터베이스** (< 50MB): 2-5분
- **중형 데이터베이스** (50-200MB): 5-15분
- **대형 데이터베이스** (200-500MB): 15-45분

**영향 요인:**
- 하드 드라이브 유형 (SSD가 HDD보다 2-3배 빠름)
- 사용 가능한 메모리 (8GB+ 권장)
- CPU 성능 (멀티 코어 유리)
- 시스템 로드 (불필요한 프로그램 닫기)

### Q: 터미널 ID란 무엇이며, 어떻게 설정하나요?

**A:** 터미널 ID는 TFDI 시스템에서 터미널 절차를 식별하는 데 사용되는 고유 번호입니다.

**설정 권장 사항:**
```
시작 ID: 1000 (기본값)
ID 범위: 1-999999
권장 범위: 1000-9000 (확장 공간 확보)
```

**할당 전략:**
- 각 공항에 20-50개의 ID 예약
- 지역별로 그룹화하여 할당 (예: 아시아 지역 1000-3000)
- 기존 TFDI 데이터와의 충돌 방지

### Q: 변환된 파일은 어디에 저장되나요?

**A:** 변환기는 다음을 포함하는 `Primary.7z` 압축 파일을 생성합니다.

```
Primary.7z
├── AirportLookup.json      # 공항 조회 데이터
├── Airports.json           # 공항 정보
├── AirwayLegs.json        # 항공로 구간 데이터
├── Airways.json           # 항공로 정의
├── Ilses.json             # ILS 접근 데이터
├── NavaidLookup.json      # 항법 시설 조회
├── Navaids.json           # 항법 시설 데이터
├── Runways.json           # 활주로 정보
├── Terminals.json         # 터미널 절차 데이터
├── WaypointLookup.json    # 웨이포인트 조회
├── Waypoints.json         # 웨이포인트 정의
└── ProcedureLegs/         # 절차 구간 디렉토리
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

### Q: FAF 지점 감지란 무엇이며, 왜 중요한가요?

**A:** FAF (Final Approach Fix)는 정밀 접근 절차에서 최종 접근 고정 지점입니다.

**중요성:**
- 정밀 접근의 시작 지점 표시
- VNAV 계산의 핵심 참조 지점
- 자동 조종 장치의 접근 모드에 영향

**감지 기준:**
- VNAV 각도 ≤ 2.5° (구성 가능)
- 접근 절차의 마지막 단계에 위치
- 고도 제한 정보 포함

## 🐛 문제 해결

### Q: "데이터베이스 파일 손상" 오류가 발생하면 어떻게 해야 하나요?

**오류 메시지:**
```
SQLite Error: database disk image is malformed
데이터베이스 파일이 손상되었을 수 있습니다.
```

**해결책:**
1. **데이터베이스 재획득**:
   ```bash
   # 손상되었을 수 있는 파일 삭제
   rm path/to/nd.db3
   
   # Fenix A320을 재시작하여 다시 생성
   ```

2. **파일 무결성 검증**:
   ```python
   import sqlite3
   
   try:
       conn = sqlite3.connect('nd.db3')
       conn.execute('PRAGMA integrity_check')
       print("데이터베이스 무결성 검사 통과")
   except Exception as e:
       print(f"데이터베이스 손상: {e}")
   ```

3. **데이터베이스 복구 도구 사용**:
   ```bash
   # SQLite 도구를 사용하여 복구 시도
   sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3
   ```

### Q: 변환기가 특정 단계에서 멈추면 어떻게 해야 하나요?

**자주 멈추는 단계:**
- 데이터베이스 검증 단계
- 대용량 테이블 데이터 처리 단계
- JSON 직렬화 단계
- 압축 단계

**문제 해결 방법:**
```bash
# 1. 시스템 리소스 확인
top  # Linux/macOS
# 또는 작업 관리자 (Windows)

# 2. 로그 파일 확인
tail -f converter.log

# 3. 디스크 공간 확인
df -h  # Linux/macOS
# 또는 Windows에서 드라이브 공간 확인
```

**해결책:**
1. **변환기 재시작**: 완전히 종료한 후 다시 시작
2. **메모리 증가**: 다른 프로그램을 종료하여 메모리 확보
3. **권한 확인**: 쓰기 권한이 있는지 확인
4. **단계별 디버깅**: 디버그 모드를 사용하여 자세한 정보 확인

### Q: 변환된 JSON 파일을 TFDI에서 인식할 수 없나요?

**가능한 원인:**
1. **버전 비호환성**: TFDI 버전과 JSON 형식 버전이 일치하지 않음
2. **파일 손상**: 압축 또는 전송 과정에서 파일이 손상됨
3. **형식 오류**: JSON 형식이 TFDI 표준을 충족하지 않음
4. **인코딩 문제**: 문자 인코딩이 올바르지 않음

**확인 단계:**
```bash
# 1. JSON 형식 확인
python -m json.tool Primary/Airports.json

# 2. 파일 크기 확인
ls -lh Primary/

# 3. 압축 파일 무결성 확인
7z t Primary.7z
```

**복구 방법:**
1. **재변환**: 출력 폴더를 삭제한 후 다시 변환
2. **수동 압축 해제**: 7z 파일의 압축을 해제하여 내용 확인
3. **버전 업데이트**: 최신 버전의 변환기를 사용하고 있는지 확인
4. **지원팀에 문의**: 문제가 지속되면 버그를 보고하십시오.

## 📈 성능 최적화

### Q: 변환 속도를 높이려면 어떻게 해야 하나요?

**하드웨어 최적화:**
- **SSD 사용**: 솔리드 스테이트 드라이브가 하드 디스크 드라이브보다 3-5배 빠름
- **메모리 증가**: 8GB+ RAM 권장
- **멀티 코어 CPU**: 병렬 처리 지원
- **백신 끄기**: 실시간 스캔을 일시적으로 비활성화

**소프트웨어 최적화:**
```python
# 구성 매개변수 조정
config = ConverterConfig(
    coordinate_precision=6,    # 정확도를 낮춰 속도 향상
    batch_size=2000,          # 배치 처리 크기 증가
    enable_compression=False,  # 실시간 압축 비활성화
    max_workers=4             # 병렬 스레드 수 설정
)
```

**환경 최적화:**
```bash
# 환경 변수 설정
export PYTHONOPTIMIZE=1       # 바이트코드 최적화 활성화
export SQLITE_TEMP_STORE=3    # 메모리 임시 저장 사용
```

### Q: 메모리 사용량이 너무 높으면 어떻게 해야 하나요?

**메모리 사용량 모니터링:**
```python
import psutil

def monitor_memory():
    memory = psutil.virtual_memory()
    print(f"메모리 사용률: {memory.percent}%")
    print(f"사용 가능한 메모리: {memory.available // 1024**2} MB")
```

**최적화 전략:**
1. **배치 처리 크기 감소**:
   ```python
   config.batch_size = 500  # 기본 1000에서 500으로 감소
   ```

2. **단계별 처리**:
   ```python
   # 대용량 테이블을 배치 처리
   tables = ['Airports', 'Runways', 'Waypoints']
   for table in tables:
       converter.process_table(table)
       gc.collect()  # 강제 가비지 컬렉션
   ```

3. **스트림 처리**: 대용량 파일 처리를 위해 스트림 처리 모드 활성화

### Q: 여러 변환기 인스턴스를 동시에 실행할 수 있나요?

**기술적으로는 가능하지만, 제한 사항이 있습니다:**
- **데이터베이스 잠금**: SQLite는 여러 쓰기 연결을 지원하지 않습니다.
- **리소스 경쟁**: 여러 인스턴스가 CPU와 메모리를 경쟁합니다.
- **디스크 I/O**: 디스크 병목 현상을 유발할 수 있습니다.

**권장 방법:**
```bash
# 여러 데이터베이스를 직렬로 처리
python converter.py --input db1.db3 --output output1/
python converter.py --input db2.db3 --output output2/

# 또는 배치 스크립트 사용
for db in *.db3; do
    python converter.py --input "$db" --output "output_${db%.*}/"
done
```

## 🔍 데이터 검증

### Q: 변환 결과의 정확성을 어떻게 검증하나요?

**자동 검증 도구:**
```python
# 내장 검증기 사용
from tfdi_converter.validation import DataValidator

validator = DataValidator()
result = validator.validate_output("Primary.7z")

if result.is_valid:
    print("✅ 검증 통과")
else:
    print("❌ 검증 실패:")
    for error in result.errors:
        print(f"  - {error}")
```

**수동 검증 체크리스트:**
- [ ] **파일 무결성**: 모든 필수 JSON 파일이 존재
- [ ] **데이터 수량**: 레코드 수가 합리적이고 비정상적인 감소 없음
- [ ] **좌표 범위**: 위도 [-90, 90], 경도 [-180, 180]
- [ ] **참조 무결성**: 외래 키 관계가 유지됨
- [ ] **특수 문자**: UTF-8 인코딩이 올바르게 처리됨

**TFDI에서 검증:**
1. 변환된 데이터 패키지 설치
2. 비행 계획을 생성하여 항로 테스트
3. FMC에서 절차 표시 확인
4. 내비게이션 시설 주파수 및 위치 검증

### Q: 변환 후 데이터 양이 현저히 감소하는 이유는 무엇인가요?

**가능한 원인:**
1. **데이터 필터링**: 변환기가 호환되지 않거나 유효하지 않은 데이터를 필터링함
2. **지역 제한**: 특정 지역의 데이터만 변환되었을 수 있음
3. **형식 제한**: 일부 Fenix 고유 형식은 변환할 수 없음
4. **버전 차이**: 다른 버전의 데이터 구조 차이

**확인 방법:**
```python
# 변환 전후 레코드 수 비교
def compare_record_counts(fenix_db, tfdi_json_dir):
    # Fenix 데이터베이스 레코드 집계
    fenix_counts = count_fenix_records(fenix_db)
    
    # TFDI JSON 레코드 집계
    tfdi_counts = count_tfdi_records(tfdi_json_dir)
    
    # 결과 비교
    for table, fenix_count in fenix_counts.items():
        tfdi_count = tfdi_counts.get(table, 0)
        ratio = tfdi_count / fenix_count if fenix_count > 0 else 0
        print(f"{table}: {fenix_count} → {tfdi_count} ({ratio:.1%})")
```

## 🆘 도움말

### Q: 기술 지원은 어디서 받을 수 있나요?

**공식 지원 채널:**
- **GitHub Issues**: 버그 보고 및 기능 요청
- **GitHub Discussions**: 사용 문제 및 일반 토론
- **프로젝트 문서**: 전체 사용자 가이드 참조
- **예제 코드**: 프로젝트 내 예제 참조

**커뮤니티 지원:**
- **비행 시뮬레이션 포럼**: 관련 비행 시뮬레이션 커뮤니티
- **Discord 그룹**: 실시간 교류 및 상호 지원
- **QQ/WeChat 그룹**: 중국어 사용자 교류 그룹

### Q: 문제 보고 또는 새 기능 제안은 어떻게 하나요?

**문제 보고 절차:**
1. **기존 문제 검색**: 중복 보고 방지
2. **정보 수집**:
   - 자세한 오류 설명
   - 전체 오류 로그
   - 시스템 환경 정보
   - 재현 단계
3. **Issue 생성**: 제공된 템플릿 사용
4. **예제 제공**: 가능하다면 최소 재현 예제 제공

**기능 제안:**
- 새 기능의 용도에 대해 자세히 설명
- 기능의 예상 동작 설명
- 기존 사용자에게 미치는 영향 고려
- 구현 제안 제공 (있는 경우)

### Q: 코드를 기여할 수 있나요? 개발에 어떻게 참여하나요?

**기여 방법:**
- **버그 수정**: 알려진 문제 해결
- **새 기능 개발**: 새로운 변환 기능 구현
- **성능 최적화**: 변환 속도 및 효율성 향상
- **문서 개선**: 사용자 문서 및 API 문서 완성
- **테스트 강화**: 테스트 케이스 및 커버리지 증가

**참여 단계:**
1. **프로젝트 Fork**: 자신만의 프로젝트 분기 생성
2. **개발 환경 설정**: 기여 가이드라인에 따라 구성
3. **작업 선택**: Issues에서 적합한 작업 선택
4. **개발 및 테스트**: 코드 작성 및 테스트 통과 확인
5. **PR 제출**: Pull Request 생성 및 검토 대기

**기여 요구 사항:**
- 프로젝트의 코딩 표준 준수
- 충분한 테스트 커버리지 제공
- 관련 문서 업데이트
- 명확한 커밋 메시지 사용

---

**답변을 찾을 수 없으신가요?** 

[GitHub Issues](https://github.com/your-org/tfdi-converter/issues)에서 검색하거나 새 질문을 생성해 주세요. 최대한 빨리 답변해 드리겠습니다! 🚁✨
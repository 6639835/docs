# 🙋 자주 묻는 질문 (FAQ)

## 📥 설치 관련

### Q1: 시스템 최소 요구 사항은 무엇인가요?
**A:** 
- **운영체제**: Windows 10/11, macOS 10.15+, Linux
- **Python 버전**: 3.8+ (3.9 또는 그 이상 버전 권장)
- **메모리**: 최소 4GB RAM (8GB+ 권장)
- **저장 공간**: 최소 2GB 여유 공간
- **MSFS 버전**: Microsoft Flight Simulator 2020 또는 2024

### Q2: 지원되는 Python 버전은 무엇인가요?
**A:** Python 3.8 및 그 이상 버전이 지원됩니다. 최적의 성능과 호환성을 위해 Python 3.9 또는 3.10 사용을 권장합니다.

### Q3: 관리자 권한이 필요한가요?
**A:** 예, Windows 시스템에서는 MSFS 설치 디렉터리에 접근하고 데이터 파일을 쓰기 위해 관리자 권한이 필요합니다.

### Q4: 가상 환경에 설치할 수 있나요?
**A:** 의존성 격리 및 다른 Python 프로젝트와의 충돌 방지를 위해 가상 환경(예: venv 또는 conda) 사용을 강력히 권장합니다.

## ⚙️ 구성 관련

### Q5: 유효한 AIRAC 데이터를 어떻게 얻을 수 있나요?
**A:** 다음 서비스 중 하나를 구독해야 합니다:
- **Navigraph**: 전 세계 완전한 항행 데이터를 제공합니다 (권장)
- **Aerosoft NavDataPro**: 유럽 및 일부 지역용
- **Jeppesen**: 상업용 항행 데이터 서비스

### Q6: AIRAC 주기는 무엇이며, 얼마나 자주 업데이트해야 하나요?
**A:** AIRAC(Aeronautical Information Regulation and Control)은 국제 표준 항공 정보 업데이트 주기이며, 28일마다 업데이트됩니다. 실제 세계의 AIRAC 주기와 동기화하는 것을 권장합니다.

### Q7: 데이터 파일은 어디에 저장해야 하나요?
**A:** 
```
권장 디렉터리 구조:
C:/Nav-data/
├── input/          # 원본 데이터 파일 입력
│   ├── AIRAC2024-01/
│   └── ...
├── output/         # 변환된 PMDG 형식 파일
└── backup/         # 데이터 백업
```

### Q8: 구성이 올바른지 어떻게 확인할 수 있나요?
**A:** 내장된 구성 확인 명령을 실행합니다:
```bash
python verify_config.py --check-all
```

## 🔄 사용 관련

### Q9: 변환 과정은 얼마나 걸리나요?
**A:** 데이터 양과 시스템 성능에 따라 다릅니다:
- **소규모 데이터 세트** (단일 공항): 1-2분
- **지역 데이터 세트**: 5-15분  
- **글로벌 데이터 세트**: 30-60분

### Q10: 특정 지역의 데이터만 변환할 수 있나요?
**A:** 예, 지역 필터링이 지원됩니다:
```bash
python converter.py --region ZSPD --include-sids --include-stars
```

### Q11: 기존 데이터를 어떻게 백업하나요?
**A:** 변환 전에 자동으로 백업이 생성되며, 수동으로도 백업할 수 있습니다:
```bash
python backup_tool.py --create-backup --date-suffix
```

### Q12: 변환된 데이터는 어디에 저장되나요?
**A:** 
- **기본 위치**: `%LOCALAPPDATA%/Lockheed Martin/Prepar3D v5/PMDG/Nav Data/`
- **Steam 버전 MSFS**: `C:/Users/[사용자명]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalCache/PMDG/`
- **Microsoft Store 버전**: Steam 버전과 유사하지만 ID가 다릅니다.

## ✈️ 호환성 관련

### Q13: 어떤 PMDG 항공기를 지원하나요?
**A:** 
- ✅ **PMDG 737-600/700/800/900** (전 시리즈)
- ✅ **PMDG 777-300ER**
- ✅ **PMDG 777F** (화물기 버전)
- 🔄 **PMDG 747-8** (지원 예정)

### Q14: MSFS 2024와 호환되나요?
**A:** 예, Microsoft Flight Simulator 2024와 완벽하게 호환됩니다. 최신 버전의 변환 도구를 사용하는지 확인하십시오.

### Q15: 다른 항행 데이터 도구와 동시에 사용할 수 있나요?
**A:** 여러 항행 데이터 도구를 동시에 사용하는 것은 권장하지 않습니다. 데이터 충돌이 발생할 수 있습니다. 사용하기 전에 다른 도구의 데이터를 백업하고 제거하십시오.

### Q16: 타사 공항 플러그인을 지원하나요?
**A:** 지원합니다. 하지만 다음 사항을 확인해야 합니다:
- 타사 공항이 표준 ICAO 코드를 사용하는지
- 항행 데이터에 해당 공항 정보가 포함되어 있는지
- 공항 플러그인이 PMDG 항공기와 호환되는지

## 🌍 데이터 관련

### Q17: 어떤 지역의 데이터를 지원하나요?
**A:** 주요 커버리지 지역:
- ✅ **중국 본토 전역** (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- ✅ **홍콩, 마카오** (VH, VM)
- ✅ **대만 지역** (RC)
- ✅ **동남아시아 일부** (VT, VH, WS)
- ⚠️ **기타 지역** (데이터 품질이 제한적일 수 있음)

### Q18: 데이터 정확성은 어떤가요?
**A:** 
- **AIRAC 표준**: 국제민간항공기구(ICAO) 표준을 엄격히 준수합니다
- **정확도 수준**: 8자리 소수점 정밀도 좌표를 지원합니다
- **검증 메커니즘**: 다단계 데이터 검증 및 무결성 검사 내장
- **업데이트 주기**: 공식 AIRAC 주기에 따라 업데이트됩니다

### Q19: 데이터 무결성을 어떻게 검증하나요?
**A:** 내장된 검증 도구를 사용하십시오:
```bash
python validate_data.py --comprehensive --output-report
```

### Q20: 데이터에 중국어 콘텐츠가 포함되어 있나요?
**A:** 예, 중국어를 지원합니다:
- 공항 영문/중문 명칭
- 항행 지점 영문/중문 식별자
- 절차명 현지화

## 🔧 기술 관련

### Q21: 디버그 모드를 어떻게 활성화하나요?
**A:** 
```bash
python converter.py --debug --verbose --log-file=debug.log
```

### Q22: 로그 파일은 어디에 있나요?
**A:** 
- **기본 위치**: `./logs/converter_[날짜].log`
- **디버그 로그**: `./logs/debug_[날짜].log`
- **오류 로그**: `./logs/error_[날짜].log`

### Q23: 변환 성능을 어떻게 최적화할 수 있나요?
**A:** 
- SSD 저장 장치 사용
- 메모리를 8GB 이상으로 증설
- 멀티 프로세스 처리 활성화: `--parallel=4`
- 불필요한 백그라운드 프로그램 종료

### Q24: 명령줄 배치 처리를 지원하나요?
**A:** 예, 완전한 명령줄 인터페이스를 지원합니다:
```bash
# 배치 변환
python converter.py --batch --config-file=batch_config.json

# 예약 작업
python scheduler.py --schedule-weekly --auto-update
```

## 🆘 도움 받기

### Q25: 문제가 발생했을 때 어떻게 지원을 받을 수 있나요?
**A:** 
1.  **로그 파일 확인** - 구체적인 오류 정보 파악
2.  **문서 확인** - 관련 섹션 설명 읽기
3.  **알려진 문제 검색** - [GitHub Issues](https://github.com/nav-data/docs/issues) 확인
4.  **새로운 문제 제출** - 완전한 로그 및 시스템 정보 포함
5.  **커뮤니티 토론** - [GitHub Discussions](https://github.com/nav-data/docs/discussions) 참여

### Q26: 버그를 어떻게 보고하나요?
**A:** 다음 정보를 포함하여 GitHub Issues에 보고해 주십시오:
- 상세한 오류 설명
- 전체 오류 로그
- 시스템 환경 정보
- 재현 단계
- 예상 결과 vs 실제 결과

### Q27: 코드에 기여할 수 있나요?
**A:** 물론 환영합니다! 다음을 참조하십시오:
- [기여 가이드라인](contributing.md)
- [코드 규약](contributing.md#코드规范)
- [제출 절차](contributing.md#提交流程)

---

## 🔍 답변을 찾을 수 없나요?

질문이 이 목록에 없다면 다음을 수행하십시오:

1.  📖 [문제 해결 가이드](troubleshooting.md) 확인
2.  🔍 페이지 상단의 검색 기능 사용
3.  💬 [GitHub Discussions](https://github.com/nav-data/docs/discussions)에서 질문하기
4.  📧 support@nav-data.org 로 이메일 보내기

저희는 이 FAQ를 계속 업데이트할 예정입니다. 피드백과 제안에 감사드립니다!
# 🙋 자주 묻는 질문 (FAQ)

## 📥 설치 관련

### Q1: 어떤 운영 체제를 지원하나요?
**A:**
- ✅ **Windows 10/11** (권장)
- ✅ **macOS 10.15 이상** (Catalina 및 이후 버전)
- ✅ **Ubuntu 20.04 이상 / Debian 11 이상**
- ✅ **기타 주요 Linux 배포판**

### Q2: Python 환경 요구사항은 무엇인가요?
**A:**
- **최소 버전**: Python 3.8
- **권장 버전**: Python 3.9 또는 3.10
- **지원 불가**: Python 3.7 및 이전 버전
- **가상 환경**: venv 또는 conda 사용을 강력히 권장합니다.

### Q3: 얼마나 많은 저장 공간이 필요한가요?
**A:**
- **도구 자체**: ~50MB
- **의존성 패키지**: ~200MB
- **임시 처리 공간**: 1-2GB
- **출력 데이터**: 500MB-1GB (적용 지역에 따라 다름)
- **총 권장량**: 최소 4GB의 사용 가능한 공간

### Q4: 메모리 요구사항은 어떻게 되나요?
**A:**
- **최소**: 4GB RAM
- **권장**: 8GB+ RAM
- **대규모 변환**: 16GB+ RAM
- **가상 메모리**: 물리 메모리의 1.5배로 설정하는 것을 권장합니다.

## ⚙️ 구성 관련

### Q5: 내비게이션 데이터는 어떻게 얻나요?
**A:** 권장 데이터 소스:
- **Navigraph** (선호) - 전 세계 적용, 28일 업데이트 주기
- **X-Plane 데이터** - 무료이지만 업데이트 빈도가 낮음
- **NAIP 데이터** - 아시아 지역에 최적화
- **사용자 정의 데이터 소스** - ARINC 424 형식 지원

### Q6: AIRAC 주기를 어떻게 이해해야 하나요?
**A:**
- **주기 길이**: 28일마다 한 주기
- **적용 시작일**: 매월 특정 날짜 (보통 목요일)
- **버전 형식**: YYYY-CC (예: 2024-01은 2024년 첫 번째 주기를 의미)
- **유효 기간**: 28일, 만료 후 업데이트를 권장합니다.

### Q7: 어떤 데이터 형식을 지원하나요?
**A:**
**입력 형식**:
- ✅ ARINC 424 (.dat, .txt)
- ✅ X-Plane (.dat, .txt)
- ✅ NAIP (.xml, .json)
- ✅ CIFP (.xml)

**출력 형식**:
- ✅ iniBuilds A350 네이티브 형식
- ✅ SQLite 데이터베이스
- ✅ JSON 구성 파일
- ✅ XML 내보내기 형식

### Q8: 데이터 소스 우선순위는 어떻게 설정하나요?
**A:** 구성 파일에서 설정합니다:
```json
{
  "data_sources": {
    "priority_order": ["navigraph", "naip", "xplane"],
    "fallback_enabled": true,
    "merge_strategy": "priority_override"
  }
}
```

## 🔄 사용 관련

### Q9: 변환 과정은 얼마나 걸리나요?
**A:** 처리 시간 추정:
- **단일 공항**: 30초 - 2분
- **도시 지역** (예: 베이징 주변): 5-10분
- **성급 지역** (예: 광둥성): 15-30분
- **국가 수준** (예: 중국 전역): 45-90분
- **전 세계 데이터**: 2-4시간

### Q10: 증분 업데이트가 가능한가요?
**A:** 지능형 증분 업데이트를 지원합니다:
```bash
# 仅更新变更的数据
python converter.py --incremental --since-date=2024-01-01

# 基于AIRAC周期更新
python converter.py --update-airac --from=2024-01 --to=2024-02
```

### Q11: 변환 결과를 어떻게 검증하나요?
**A:** 다단계 검증 기능이 내장되어 있습니다:
```bash
# 快速验证
python validate.py --quick-check

# 全面验证
python validate.py --comprehensive --report=html

# 与参考数据比较
python validate.py --compare-with=reference_data.db
```

### Q12: 일괄 처리를 지원하나요?
**A:** 여러 일괄 처리 모드를 지원합니다:
```bash
# 批量处理多个AIRAC周期
python batch_converter.py --airac-range=2024-01:2024-06

# 批量处理多个区域
python batch_converter.py --regions=ZSPD,ZBAA,ZGGG --parallel=4
```

## ✈️ iniBuilds 통합

### Q13: 어떤 iniBuilds 항공기를 지원하나요?
**A:** 현재 지원:
- ✅ **A350-900** - 모든 시스템 완벽 지원
- ✅ **A350-900ULR** - 초장거리 버전
- ✅ **A350-1000** - 확장 버전
- 🔄 **A320neo 시리즈** - 개발 중
- 🔄 **A330 시리즈** - 지원 예정

### Q14: 데이터는 어디에 설치되나요?
**A:** 설치 경로를 자동으로 감지합니다:
- **기본 경로**: `MSFS Community文件夹/inibuilds-aircraft-a350/SimObjects/`
- **Steam 버전**: `C:/Users/[사용자]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalState/packages/`
- **Microsoft Store 버전**: Steam 버전과 유사하지만 패키지 ID가 다름
- **사용자 정의 경로**: 구성에서 지정 가능

### Q15: 데이터가 올바르게 로드되었는지 어떻게 확인하나요?
**A:** 확인 단계:
1. **MCDU 표시**: AIRAC 주기가 올바른지 확인
2. **항로 계획**: 알려진 항로 계획 시도
3. **내비게이션 지점 검색**: 특정 내비게이션 지점 검색
4. **절차 로드**: SID/STAR 절차 로드

### Q16: 다른 내비게이션 데이터 도구와 호환되나요?
**A:**
- ⚠️ 다른 도구와 동시에 사용하는 것은 **권장하지 않습니다.**
- 🔄 **충돌 감지**: 도구가 자동으로 충돌을 감지하고 경고합니다.
- 🛠️ **정리 도구**: 다른 도구의 데이터를 원클릭으로 정리하는 기능을 제공합니다.
- 📋 **백업 복원**: 도구 전환 전에 자동 백업을 지원합니다.

## 🌍 지리적 적용 범위

### Q17: 주로 어떤 지역을 커버하나요?
**A:** 상세 적용 지역:
- 🇨🇳 **중국 본토**: 모든 ICAO 지역 (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- 🇭🇰 **홍콩**: VH 지역
- 🇲🇴 **마카오**: VM 지역
- 🇹🇼 **대만**: RC 지역
- 🇻🇳 **베트남**: VV 지역
- 🇰🇷 **한국**: RK 지역 (일부)
- 🌏 **기타 아시아 지역**: 지역에 따라 데이터 품질 상이

### Q18: 데이터 정확도는 어떤가요?
**A:** 정확도 사양:
- **좌표 정확도**: 소수점 이하 8자리 (약 1미터 정확도)
- **고도 정확도**: 1피트
- **주파수 정확도**: 0.01 MHz
- **자편각**: WMM2020 모델을 사용하여 실시간 계산
- **업데이트 빈도**: AIRAC 28일 주기를 따름

### Q19: 어떤 내비게이션 데이터 유형을 포함하나요?
**A:** 전체 데이터 유형:
- ✈️ **공항 정보**: ICAO 코드, 좌표, 자편각, 활주로 정보
- 📡 **내비게이션 장비**: VOR, DME, NDB, TACAN
- 📍 **웨이포인트**: 좌표, 지역 분류, 용도 식별
- 🛣️ **항로 네트워크**: 고고도/저고도 항로, 연결 관계
- 🛫 **출발 절차**: SID (표준 계기 출발)
- 🛬 **도착 절차**: STAR (표준 터미널 도착 경로)
- 📐 **접근 절차**: ILS, VOR, NDB, RNAV 등 다양한 접근 방식
- 📶 **착륙 시스템**: ILS/GLS 유도 정보

### Q20: 중국어 현지화 수준은 어떤가요?
**A:**
- ✅ **공항 이름**: 중국어-영어 대조
- ✅ **도시 이름**: 완전한 중국어 지원
- ✅ **웨이포인트 이름**: 병음 및 중국어 식별
- ✅ **절차 이름**: 현지화된 명명 규칙
- ✅ **사용자 인터페이스**: 완전한 중국어 인터페이스

## 🔧 기술 관련

### Q21: 상세 로그는 어떻게 활성화하나요?
**A:**
```bash
# 基本调试模式
python converter.py --debug

# 详细日志模式
python converter.py --verbose --log-level=DEBUG

# 保存日志到文件
python converter.py --log-file=debug_$(date +%Y%m%d).log
```

### Q22: 멀티스레드 처리를 지원하나요?
**A:** 지능형 병렬 처리:
```bash
# 自动检测CPU核心数
python converter.py --parallel=auto

# 指定线程数
python converter.py --parallel=4

# 内存限制下的并行
python converter.py --parallel=2 --memory-limit=4GB
```

### Q23: 변환 진행 상황은 어떻게 모니터링하나요?
**A:** 여러 진행 상황 모니터링 방법:
- **콘솔 진행률 표시줄**: 실시간 완료율 표시
- **Web 인터페이스**: 선택적 브라우저 모니터링 인터페이스
- **로그 파일**: 상세한 단계별 진행 기록
- **상태 API**: JSON 형식의 진행 상황 조회 인터페이스

### Q24: 자동 배포를 지원하나요?
**A:** 완전한 자동화 지원:
```bash
# 计划任务模式
python scheduler.py --schedule=weekly --auto-update

# CI/CD集成
python converter.py --batch --no-interaction --exit-on-error

# Docker容器部署
docker run nav-data/converter --config=/app/config.json
```

## 🔍 성능 최적화

### Q25: 변환 속도를 높이려면 어떻게 해야 하나요?
**A:** 성능 최적화 제안:
- 💾 **SSD 사용**: I/O 성능 대폭 향상
- 🧠 **메모리 증설**: 디스크 스와핑 감소
- ⚡ **병렬 처리 활성화**: 다중 코어 CPU 활용
- 🗜️ **데이터 압축**: 네트워크 전송 시간 감소
- 🎯 **지역 필터링**: 필요한 지역만 처리

### Q26: 메모리 사용량이 너무 높으면 어떻게 해야 하나요?
**A:** 메모리 최적화 전략:
```bash
# 启用流式处理
python converter.py --streaming --chunk-size=1MB

# 限制内存使用
python converter.py --max-memory=2GB

# 临时文件优化
python converter.py --temp-dir=/tmp --cleanup-temp
```

### Q27: 네트워크 문제는 어떻게 처리하나요?
**A:** 네트워크 최적화 방안:
- 🌐 **오프라인 모드**: 모든 데이터 사전 다운로드
- 🔄 **이어서 다운로드**: 네트워크 중단 후 자동 복구
- 🚀 **CDN 가속**: 가장 가까운 서버 사용
- 📦 **데이터 캐싱**: 중복 다운로드 감소

## 🛡️ 데이터 보안

### Q28: 데이터는 안전한가요?
**A:** 다중 보안 보장:
- 🔒 **전송 암호화**: HTTPS/TLS 1.3
- 🔐 **저장 암호화**: AES-256 파일 암호화
- ✅ **무결성 검증**: SHA-256 해시 검증
- 🔍 **출처 검증**: 디지털 서명 검증
- 🚫 **개인 정보 보호**: 개인 정보 미수집

### Q29: 백업 및 복원은 어떻게 하나요?
**A:** 전체 백업 솔루션:
```bash
# 创建完整备份
python backup.py --full --compress --encrypt

# 增量备份
python backup.py --incremental --since-date=2024-01-01

# 恢复备份
python restore.py --backup-id=20240115_143022 --verify
```

## 🆘 도움 받기

### Q30: 문제가 발생하면 어떻게 해야 하나요?
**A:** 전체 지원 체계:

**1. 자가 진단**:
```bash
# 运行系统诊断
python diagnostic.py --comprehensive --report=html

# 检查常见问题
python health_check.py --fix-common-issues
```

**2. 커뮤니티 지원**:
- 📖 [사용자 매뉴얼](guide/index.md)
- 🔧 [문제 해결 가이드](troubleshooting.md)
- 💬 [GitHub 토론](https://github.com/nav-data/docs/discussions)
- 🐛 [문제 보고](https://github.com/nav-data/docs/issues)

**3. 직접 문의**:
- 📧 **기술 지원**: technical@nav-data.org
- 🚨 **긴급 문제**: urgent@nav-data.org
- 💬 **일반 문의**: info@nav-data.org

### Q31: 기여 및 피드백은 어떻게 하나요?
**A:** 다양한 참여 방법:
- 🐛 **버그 보고**: GitHub Issues
- 💡 **기능 제안**: GitHub Discussions
- 📝 **문서 개선**: Pull Request
- 💻 **코드 기여**: [기여 가이드](contributing.md) 확인
- 🌐 **현지화**: 문서 번역 지원

### Q32: 교육 자료가 있나요?
**A:** 풍부한 학습 자료:
- 📹 **비디오 튜토리얼**: YouTube 채널 및 Bilibili
- 📚 **사용자 매뉴얼**: PDF 및 온라인 버전
- 🎓 **온라인 강좌**: 단계별 대화형 튜토리얼
- 📋 **빠른 시작 가이드**: 5분 만에 빠르게 시작
- 🔬 **고급 기술**: 전문가 수준의 사용 팁

---

## 🔍 답을 찾지 못하셨나요?

FAQ에서 질문에 대한 답을 찾지 못하셨다면 다음을 시도해 보세요:

1. 🔍 **검색 사용**: 페이지 상단의 검색 기능
2. 📖 **문서 확인**: [전체 사용자 가이드](guide/index.md)
3. 🛠️ **문제 해결**: [문제 해결 가이드](troubleshooting.md)
4. 💬 **커뮤니티 토론**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
5. 📧 **직접 문의**: support@nav-data.org

저희는 모든 기술 문의에 24시간 이내에 답변드릴 것을 약속드립니다. Nav-data를 선택해 주셔서 감사합니다!

---

## 📊 사용 통계

**자주 묻는 질문 순위** (사용자 피드백 기반):
1. **설치 구성 문제** - 35%
2. **데이터 형식 관련** - 22%
3. **성능 최적화** - 18%
4. **iniBuilds 통합** - 15%
5. **문제 해결** - 10%

**사용자 만족도**: ⭐⭐⭐⭐⭐ 4.8/5.0 (1,200명 이상 사용자 평가 기반)

**지속적인 개선**: 저희는 정보의 시기적절성과 정확성을 보장하기 위해 매월 FAQ 내용을 업데이트합니다.
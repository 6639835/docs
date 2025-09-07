# 📜 라이선스 정보

## MIT 라이선스

**Nav-data** 프로젝트는 간결하고 관대한 오픈 소스 라이선스인 MIT 라이선스를 기반으로 오픈 소스화되었습니다.

### 라이선스 전문

```
MIT License

Copyright (c) 2025 Justin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🔍 라이선스 해석

### ✅ 허용되는 사항
- **상업적 사용** - 상업적 환경에서 본 소프트웨어 사용
- **수정** - 소프트웨어 소스 코드 수정
- **배포** - 원본 또는 수정된 소프트웨어 배포
- **개인적 사용** - 개인적 목적으로 소프트웨어 사용
- **특허 사용** - 기여자가 소유한 특허권 사용

### ⚠️ 사용 조건
- **라이선스 포함** - 소프트웨어의 모든 복사본에 원본 라이선스 및 저작권 고지 포함 필수
- **저작권 고지 포함** - 원본 저작권 고지 유지 필수

### ❌ 제한 사항
- **책임** - 소프트웨어 저작자는 어떠한 책임도 지지 않습니다.
- **보증** - 소프트웨어는 어떠한 형태의 보증도 제공하지 않습니다.

## 📋 타사 종속성 라이선스

Nav-data는 다음 오픈 소스 라이브러리를 사용하며, 각 라이브러리는 자체 라이선스를 가집니다.

### Python 표준 라이브러리
- **Python** - [PSF License](https://docs.python.org/3/license.html)

### 데이터 처리 라이브러리
- **pandas** - BSD 3-Clause License
- **numpy** - BSD License
- **sqlite3** - Public Domain

### 과학 계산 라이브러리
- **pygeomag** - MIT License

### 사용자 인터페이스 라이브러리
- **tqdm** - MIT License + MPL-2.0 License

### 파일 처리 라이브러리
- **chardet** - LGPL 2.1 License

### HTTP 라이브러리
- **requests** - Apache 2.0 License

### 전체 종속성 목록

```yaml
핵심 종속성:
  pandas: ">=1.3.0"     # BSD 3-Clause
  requests: ">=2.26.0"  # Apache 2.0
  tqdm: ">=4.62.0"      # MIT + MPL-2.0
  chardet: ">=4.0.0"    # LGPL 2.1
  ratelimit: ">=2.2.1"  # MIT
  pygeomag: ">=0.9.0"   # MIT

개발 종속성:
  pytest: ">=6.0.0"     # MIT
  flake8: ">=4.0.0"     # MIT
  black: ">=22.0.0"     # MIT
  mypy: ">=0.910"       # MIT
```

### 라이선스 호환성

모든 타사 종속성 라이선스는 MIT 라이선스와 호환되며 다음을 보장합니다.
- 상업적 사용의 적법성
- 배포의 자유도
- 최소한의 법적 제약

## ⚖️ 법적 고지

### 면책 조항

**Nav-data 프로젝트는 시뮬레이션 비행 용도로만 제공됩니다. 다음 중요 고지 사항에 유의하십시오.**

#### 🛫 용도 제한
- **시뮬레이터 전용** - 본 소프트웨어 및 생성된 내비게이션 데이터는 비행 시뮬레이터에만 사용됩니다.
- **실제 내비게이션 아님** - 실제 항공기 내비게이션에는 사용이 금지됩니다.
- **교육 목적** - 교육, 훈련 및 엔터테인먼트 목적에 적합합니다.

#### 📊 데이터 출처
- **타사 데이터** - 내비게이션 데이터는 타사 공개 데이터 출처에서 제공됩니다.
- **데이터 정확성** - 데이터의 완전성, 정확성 또는 시기적절성을 보장하지 않습니다.
- **사용자 책임** - 사용자는 데이터의 적합성을 스스로 확인해야 합니다.

#### 🚫 책임 제한
본 소프트웨어의 개발자와 기여자들은 다음을 포함하되 이에 국한되지 않는 **어떠한 책임도 지지 않습니다**.
- 데이터 오류로 인한 손실
- 소프트웨어 결함으로 인한 영향
- 부적절한 사용으로 인한 문제
- 타사 데이터의 정확성 문제

### 규정 준수 사용

#### 📋 데이터 사용 규정
1. **현지 법률 준수** - 해당 지역의 법률 및 규정 준수 확인
2. **데이터 출처 존중** - 원본 데이터 제공자의 이용 약관 준수
3. **비상업적 제한** - 일부 데이터 출처는 비상업적 사용 제한을 가질 수 있습니다.
4. **출처 표기** - 데이터 출처 및 소프트웨어 저작자를 적절히 표기

#### 🔒 보안 사용
1. **데이터 백업** - 사용 전에 원본 내비게이션 데이터 백업
2. **테스트 및 검증** - 중요 사용 전에 충분한 테스트
3. **버전 관리** - 중요 애플리케이션에 안정적인 버전 사용
4. **업데이트 모니터링** - 보안 업데이트 및 수정 사항을 즉시 확인

## 🤝 기여자 계약

### 기여 라이선스
Nav-data 프로젝트에 코드를 기여함으로써 귀하는 다음 사항에 동의합니다.

1. **라이선스 부여** - 귀하의 기여는 MIT 라이선스에 따라 배포됩니다.
2. **저작권 귀속** - 기여물의 저작권은 프로젝트에 귀속됩니다.
3. **독창성** - 귀하는 기여물이 귀하의 독창적인 저작물임을 확인합니다.
4. **권리 소유** - 귀하는 이러한 권리를 부여할 법적 권한을 가집니다.

### 저작권 귀속
- **원본 저작자** - Nav-data 개발 팀
- **기여자** - 모든 코드 기여자는 자신의 기여에 대한 저작자 신분을 유지합니다.
- **집단 저작권** - 프로젝트는 전체로서 모든 기여자가 공동으로 소유합니다.

## 📞 법률 자문

### 문제 보고
라이선스 또는 법률 준수 문제를 발견하시면 다음을 수행하십시오.

1. **즉시 보고** - GitHub Issues를 통해 보고
2. **자세한 설명** - 구체적인 법적 우려 사항 제공
3. **유지 관리자에게 연락** - 프로젝트 유지 관리자에게 직접 연락
4. **전문가 조언** - 필요한 경우 전문 법률 자문 구함

### 상업적 자문
상업적 사용 또는 대규모 배포의 경우:

1. **위험 평가** - 내부 법률 위험 평가 수행 권장
2. **규정 준수 확인** - 조직의 규정 준수 요구 사항 충족 확인
3. **전문 의견** - 지적 재산권 변호사에게 자문 고려
4. **맞춤형 라이선스** - 특별한 라이선스 계약이 필요한 경우 당사에 문의하십시오.

## 🔗 관련 자료

### 라이선스 정보
- [MIT License 전문](https://opensource.org/licenses/MIT)
- [오픈 소스 라이선스 비교](https://choosealicense.com/)
- [GPL 호환성 가이드](https://www.gnu.org/licenses/license-compatibility.html)

### 규정 준수 가이드
- [기업 오픈 소스 규정 준수 모범 사례](https://www.linuxfoundation.org/resources/open-source-compliance-program)
- [지적 재산권 위험 관리](https://www.wipo.int/sme/en/ip_business/trade_secrets/trade_secrets.htm)

### 항공 데이터 규정
- [ICAO 부록 15 - 항공 정보 서비스](https://www.icao.int/safety/aviation-medicine/library/Documents/ICAO_Annex_15.pdf)
- [FAA 데이터 사용 정책](https://www.faa.gov/about/office_org/headquarters_offices/ato/service_units/techops/navservices/gnss/library/policy/)

---

**최종 업데이트**: 2024년12월24일

**참고**: 본 문서는 정보 제공 목적으로만 제공되며 법률 자문을 구성하지 않습니다. 구체적인 법률 문제가 있는 경우 전문 변호사와 상담하십시오.
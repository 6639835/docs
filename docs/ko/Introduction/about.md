# Nav-data 문서에 오신 것을 환영합니다 🚀

Nav-data는 항공 애호가들이 공동으로 유지 관리하는 데이터 변환 프로젝트로, Microsoft Flight Simulator와 같은 비행 시뮬레이터에 고품질 내비게이션 데이터 지원을 제공하는 데 전념합니다. 개발자, 조종사 또는 애호가이든 상관없이 여기에서 필요한 자료와 가이드를 찾을 수 있습니다.

## 🔄 데이터 변환 프로세스

```mermaid
graph TD
    A["📊 데이터 소스<br/>AIRAC/Navigraph"] --> B["🔄 Nav-data<br/>변환 도구"]
    B --> C["🛩️ PMDG<br/>SQLite 데이터베이스"]
    B --> D["✈️ iniBuilds<br/>A350 데이터 파일"]
    B --> E["🛫 X-Plane<br/>DAT 형식 파일"]
    
    F["🗂️ 원본 데이터"] --> G["📥 데이터 파싱"]
    G --> H["🔧 형식 변환"]
    H --> I["✅ 데이터 검증"]
    I --> J["📤 출력 파일"]
    
    style A fill:#e1f5fe,stroke:#0277bd,stroke-width:2px
    style B fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px
    style C fill:#e8f5e8,stroke:#388e3c,stroke-width:2px
    style D fill:#fff3e0,stroke:#f57c00,stroke-width:2px
    style E fill:#fce4ec,stroke:#c2185b,stroke-width:2px
    
    style F fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style G fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style H fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style I fill:#f1f8e9,stroke:#689f38,stroke-width:2px
    style J fill:#f1f8e9,stroke:#689f38,stroke-width:2px
```

---

## ✨ 프로젝트 특징

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">📦</div>
    <h3>다중 플랫폼 지원</h3>
    <p>PMDG, iniBuilds, X-Plane 등 주요 비행 시뮬레이터 플랫폼을 지원합니다</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛫</div>
    <h3>상세 가이드</h3>
    <p>완벽한 구성, 설치 및 사용 가이드를 제공하여 초보자도 쉽게 시작할 수 있습니다</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🗂️</div>
    <h3>명확한 구조</h3>
    <p>데이터 구조가 명확하여 확장 및 유지 관리가 용이하며, 사용자 정의 구성을 지원합니다</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>오픈 소스 협력</h3>
    <p>커뮤니티의 기여와 협력을 환영하며, 더 나은 내비게이션 데이터 도구를 함께 구축합니다</p>
  </div>
</div>

<style>
.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.feature-card {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.05), rgba(59, 130, 246, 0.05));
  border: 1px solid rgba(30, 64, 175, 0.2);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(30, 64, 175, 0.15);
  border-color: rgba(30, 64, 175, 0.3);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  display: block;
}

.feature-card h3 {
  color: var(--vp-c-brand-1);
  margin: 0.5rem 0;
  font-size: 1.1rem;
}

.feature-card p {
  color: var(--vp-c-text-2);
  margin: 0;
  line-height: 1.5;
}
</style>

---

## 🚀 빠른 시작
1. 플러그인을 선택하세요: [PMDG 가이드](/PMDG/guide/index) | [iniBuilds 가이드](/iniBuilds/guide/index)
2. 가이드에 따라 구성 및 설치를 진행하세요
3. 더 현실적인 비행 경험을 즐기세요!

---

## 🧭 빠른 탐색

### 📊 플랫폼 지원 비교

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>특징</th>
        <th>🛩️ PMDG</th>
        <th>✈️ iniBuilds</th>
        <th>🛫 X-Plane</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>지원 항공기</strong></td>
        <td>737 시리즈, 777 시리즈</td>
        <td>A350</td>
        <td>모든 X-Plane 항공기</td>
      </tr>
      <tr>
        <td><strong>데이터 형식</strong></td>
        <td>SQLite 데이터베이스</td>
        <td>전용 데이터 파일</td>
        <td>DAT 형식 파일</td>
      </tr>
      <tr>
        <td><strong>설치 난이도</strong></td>
        <td><StatusBadge type="warning" text="중간" icon="⚠️" /></td>
        <td><StatusBadge type="success" text="쉬움" icon="✅" /></td>
        <td><StatusBadge type="error" text="복잡함" icon="🔴" /></td>
      </tr>
      <tr>
        <td><strong>데이터 커버리지</strong></td>
        <td><StatusBadge type="success" text="완전함" icon="✅" /></td>
        <td><StatusBadge type="success" text="완전함" icon="✅" /></td>
        <td><StatusBadge type="warning" text="부분적" icon="⚠️" /></td>
      </tr>
      <tr>
        <td><strong>업데이트 빈도</strong></td>
        <td>AIRAC 주기</td>
        <td>AIRAC 주기</td>
        <td>요청 시 업데이트</td>
      </tr>
    </tbody>
  </table>
</div>

### 📚 사용 가이드
<div class="guide-links">
  <a href="/PMDG/guide/index" class="guide-link pmdg">
    <div class="guide-icon">🛩️</div>
    <div class="guide-content">
      <h3>PMDG 가이드</h3>
      <p>PMDG 항공기 내비게이션 데이터 변환 전체 튜토리얼</p>
    </div>
  </a>
  
  <a href="/iniBuilds/guide/index" class="guide-link inibuilds">
    <div class="guide-icon">✈️</div>
    <div class="guide-content">
      <h3>iniBuilds 가이드</h3>
      <p>iniBuilds A350 내비게이션 데이터 변환 가이드</p>
    </div>
  </a>
  
  <a href="/X-Plane/guide/index" class="guide-link xplane">
    <div class="guide-icon">🛫</div>
    <div class="guide-content">
      <h3>X-Plane 가이드</h3>
      <p>X-Plane 내비게이션 데이터 처리 전체 프로세스</p>
    </div>
  </a>
</div>

### 🆘 도움말 보기
<div class="help-section">
  <div class="help-category">
    <h4>🛩️ PMDG 지원</h4>
    <ul>
      <li><a href="/PMDG/faq">자주 묻는 질문 (FAQ)</a></li>
      <li><a href="/PMDG/troubleshooting">문제 해결 가이드</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>✈️ iniBuilds 지원</h4>
    <ul>
      <li><a href="/iniBuilds/faq">자주 묻는 질문 (FAQ)</a></li>
      <li><a href="/iniBuilds/troubleshooting">문제 해결 가이드</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>🛫 X-Plane 지원</h4>
    <ul>
      <li><a href="/X-Plane/faq">자주 묻는 질문 (FAQ)</a></li>
      <li><a href="/X-Plane/troubleshooting">문제 해결 가이드</a></li>
    </ul>
  </div>
</div>

### 🔧 기술 문서
<div class="tech-links">
  <a href="/iniBuilds/architecture" class="tech-link">
    <span class="tech-icon">🏗️</span>
    <span>프로젝트 아키텍처 설명</span>
  </a>
  <a href="/iniBuilds/contributing" class="tech-link">
    <span class="tech-icon">🤝</span>
    <span>기여 가이드</span>
  </a>
  <a href="/iniBuilds/changelog" class="tech-link">
    <span class="tech-icon">📋</span>
    <span>업데이트 로그</span>
  </a>
</div>

<style>
.comparison-table {
  margin: 2rem 0;
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.comparison-table th {
  background: linear-gradient(135deg, var(--vp-c-brand-1), var(--aviation-sky));
  color: white;
  padding: 1rem;
  text-align: left;
  font-weight: 600;
}

.comparison-table td {
  padding: 0.875rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.comparison-table tr:nth-child(even) {
  background: rgba(30, 64, 175, 0.03);
}

.difficulty {
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
}

.difficulty.easy {
  background: #dcfce7;
  color: #166534;
}

.difficulty.medium {
  background: #fef3c7;
  color: #92400e;
}

.difficulty.hard {
  background: #fee2e2;
  color: #991b1b;
}

.status {
  padding: 0.25rem 0.5rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 600;
}

.status.complete {
  background: #dcfce7;
  color: #166534;
}

.status.partial {
  background: #fef3c7;
  color: #92400e;
}

.guide-links {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin: 2rem 0;
}

.guide-link {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.4));
  border: 1px solid rgba(30, 64, 175, 0.1);
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.guide-link:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 24px rgba(30, 64, 175, 0.15);
  border-color: rgba(30, 64, 175, 0.3);
}

.guide-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
}

.guide-content h3 {
  margin: 0 0 0.5rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.1rem;
}

.guide-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.help-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.help-category h4 {
  color: var(--vp-c-brand-1);
  margin-bottom: 1rem;
  font-size: 1rem;
}

.help-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.help-category li {
  margin-bottom: 0.5rem;
}

.help-category a {
  color: var(--vp-c-text-2);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.help-category a:hover {
  color: var(--vp-c-brand-1);
}

.tech-links {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 2rem 0;
}

.tech-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  text-decoration: none;
  color: var(--vp-c-text-1);
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.tech-link:hover {
  background: var(--vp-c-brand-soft);
  border-color: var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
}

.tech-icon {
  font-size: 1.1rem;
}
</style>

---

## 🌍 참여 및 피드백
- GitHub: [nav-data](https://github.com/nav-data)
- 제안이나 질문이 있으신가요? [Issue](https://github.com/nav-data/nav-data/issues) 또는 이메일을 통해 저희에게 연락해 주세요!
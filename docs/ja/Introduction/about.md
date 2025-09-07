# Nav-data ドキュメントへようこそ 🚀

Nav-data は、航空愛好家によって共同でメンテナンスされているデータ変換プロジェクトで、Microsoft Flight Simulator などのフライトシミュレーター向けに高品質なナビゲーションデータサポートを提供することを目指しています。開発者、パイロット、愛好家を問わず、必要な資料やガイドをここで見つけることができます。

## 🔄 データ変換フロー

```mermaid
graph TD
    A["📊 データソース<br/>AIRAC/Navigraph"] --> B["🔄 Nav-data<br/>変換ツール"]
    B --> C["🛩️ PMDG<br/>SQLiteデータベース"]
    B --> D["✈️ iniBuilds<br/>A350データファイル"]
    B --> E["🛫 X-Plane<br/>DAT形式ファイル"]
    
    F["🗂️ 生データ"] --> G["📥 データ解析"]
    G --> H["🔧 形式変換"]
    H --> I["✅ データ検証"]
    I --> J["📤 出力ファイル"]
    
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

## ✨ プロジェクトの特徴

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">📦</div>
    <h3>マルチプラットフォーム対応</h3>
    <p>PMDG、iniBuilds、X-Plane など、主要なフライトシミュレータープラットフォームに対応</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛫</div>
    <h3>詳細ガイド</h3>
    <p>設定、インストール、使用に関する完全なガイドを提供し、初心者でも簡単に始められます</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🗂️</div>
    <h3>明確な構造</h3>
    <p>データ構造が明確で、拡張とメンテナンスが容易、カスタム設定もサポート</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>オープンソースコラボレーション</h3>
    <p>コミュニティからの貢献と協力を歓迎し、より良いナビゲーションデータツールを共に構築します</p>
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

## 🚀 クイックスタート
1. プラグインを選択： [PMDG ガイド](/PMDG/guide/index) | [iniBuilds ガイド](/iniBuilds/guide/index)
2. ガイドに従って設定とインストールを行います
3. よりリアルな飛行体験をお楽しみください！

---

## 🧭 クイックナビゲーション

### 📊 プラットフォーム対応比較

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>特徴</th>
        <th>🛩️ PMDG</th>
        <th>✈️ iniBuilds</th>
        <th>🛫 X-Plane</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>対応航空機</strong></td>
        <td>737シリーズ, 777シリーズ</td>
        <td>A350</td>
        <td>全てのX-Plane機</td>
      </tr>
      <tr>
        <td><strong>データ形式</strong></td>
        <td>SQLiteデータベース</td>
        <td>専用データファイル</td>
        <td>DAT形式ファイル</td>
      </tr>
      <tr>
        <td><strong>インストール難易度</strong></td>
        <td><StatusBadge type="warning" text="中" icon="⚠️" /></td>
        <td><StatusBadge type="success" text="簡単" icon="✅" /></td>
        <td><StatusBadge type="error" text="複雑" icon="🔴" /></td>
      </tr>
      <tr>
        <td><strong>データ網羅性</strong></td>
        <td><StatusBadge type="success" text="完全" icon="✅" /></td>
        <td><StatusBadge type="success" text="完全" icon="✅" /></td>
        <td><StatusBadge type="warning" text="一部" icon="⚠️" /></td>
      </tr>
      <tr>
        <td><strong>更新頻度</strong></td>
        <td>AIRACサイクル</td>
        <td>AIRACサイクル</td>
        <td>オンデマンド更新</td>
      </tr>
    </tbody>
  </table>
</div>

### 📚 利用ガイド
<div class="guide-links">
  <a href="/PMDG/guide/index" class="guide-link pmdg">
    <div class="guide-icon">🛩️</div>
    <div class="guide-content">
      <h3>PMDG ガイド</h3>
      <p>PMDG航空機向けナビゲーションデータ変換完全チュートリアル</p>
    </div>
  </a>
  
  <a href="/iniBuilds/guide/index" class="guide-link inibuilds">
    <div class="guide-icon">✈️</div>
    <div class="guide-content">
      <h3>iniBuilds ガイド</h3>
      <p>iniBuilds A350向けナビゲーションデータ変換ガイド</p>
    </div>
  </a>
  
  <a href="/X-Plane/guide/index" class="guide-link xplane">
    <div class="guide-icon">🛫</div>
    <div class="guide-content">
      <h3>X-Plane ガイド</h3>
      <p>X-Planeナビゲーションデータ処理の完全な流れ</p>
    </div>
  </a>
</div>

### 🆘 ヘルプ
<div class="help-section">
  <div class="help-category">
    <h4>🛩️ PMDG サポート</h4>
    <ul>
      <li><a href="/PMDG/faq">よくある質問 (FAQ)</a></li>
      <li><a href="/PMDG/troubleshooting">トラブルシューティングガイド</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>✈️ iniBuilds サポート</h4>
    <ul>
      <li><a href="/iniBuilds/faq">よくある質問 (FAQ)</a></li>
      <li><a href="/iniBuilds/troubleshooting">トラブルシューティングガイド</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>🛫 X-Plane サポート</h4>
    <ul>
      <li><a href="/X-Plane/faq">よくある質問 (FAQ)</a></li>
      <li><a href="/X-Plane/troubleshooting">トラブルシューティングガイド</a></li>
    </ul>
  </div>
</div>

### 🔧 技術ドキュメント
<div class="tech-links">
  <a href="/iniBuilds/architecture" class="tech-link">
    <span class="tech-icon">🏗️</span>
    <span>プロジェクトアーキテクチャ説明</span>
  </a>
  <a href="/iniBuilds/contributing" class="tech-link">
    <span class="tech-icon">🤝</span>
    <span>貢献ガイド</span>
  </a>
  <a href="/iniBuilds/changelog" class="tech-link">
    <span class="tech-icon">📋</span>
    <span>更新履歴</span>
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

## 🌍 参加とフィードバック
- GitHub: [nav-data](https://github.com/nav-data)
- ご提案やご質問がありますか？ [Issue](https://github.com/nav-data/nav-data/issues) またはメールでお気軽にお問い合わせください！
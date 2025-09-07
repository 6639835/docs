# Welcome to Nav-data Documentation 🚀

Nav-data is a data conversion project maintained collaboratively by aviation enthusiasts, dedicated to providing high-quality navigation data support for flight simulators (such as Microsoft Flight Simulator). Whether you are a developer, a pilot, or an enthusiast, you will find the resources and guides you need here.

## 🔄 Data Conversion Process

```mermaid
graph TD
    A["📊 Data Source<br/>AIRAC/Navigraph"] --> B["🔄 Nav-data<br/>Conversion Tool"]
    B --> C["🛩️ PMDG<br/>SQLite Database"]
    B --> D["✈️ iniBuilds<br/>A350 Data File"]
    B --> E["🛫 X-Plane<br/>DAT Format File"]
    
    F["🗂️ Raw Data"] --> G["📥 Data Parsing"]
    G --> H["🔧 Format Conversion"]
    H --> I["✅ Data Validation"]
    I --> J["📤 Output File"]
    
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

## ✨ Project Features

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">📦</div>
    <h3>Multi-Platform Support</h3>
    <p>Supports mainstream flight simulator platforms such as PMDG, iniBuilds, and X-Plane</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛫</div>
    <h3>Detailed Guides</h3>
    <p>Provides complete configuration, installation, and usage guides, making it easy for beginners to get started</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🗂️</div>
    <h3>Clear Structure</h3>
    <p>Clear data structure, easy to extend and maintain, supports custom configurations</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>Open Source Collaboration</h3>
    <p>Community contributions and collaboration are welcome to collectively build better navigation data tools</p>
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

## 🚀 Quick Start
1. Select your addon: [PMDG Guide](/PMDG/guide/index) | [iniBuilds Guide](/iniBuilds/guide/index)
2. Follow the guide for configuration and installation
3. Enjoy a more realistic flight experience!

---

## 🧭 Quick Navigation

### 📊 Platform Support Comparison

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>🛩️ PMDG</th>
        <th>✈️ iniBuilds</th>
        <th>🛫 X-Plane</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Supported Aircraft</strong></td>
        <td>737 series, 777 series</td>
        <td>A350</td>
        <td>All X-Plane aircraft</td>
      </tr>
      <tr>
        <td><strong>Data Format</strong></td>
        <td>SQLite Database</td>
        <td>Proprietary Data Files</td>
        <td>DAT Format Files</td>
      </tr>
      <tr>
        <td><strong>Installation Difficulty</strong></td>
        <td><StatusBadge type="warning" text="Medium" icon="⚠️" /></td>
        <td><StatusBadge type="success" text="Easy" icon="✅" /></td>
        <td><StatusBadge type="error" text="Complex" icon="🔴" /></td>
      </tr>
      <tr>
        <td><strong>Data Coverage</strong></td>
        <td><StatusBadge type="success" text="Complete" icon="✅" /></td>
        <td><StatusBadge type="success" text="Complete" icon="✅" /></td>
        <td><StatusBadge type="warning" text="Partial" icon="⚠️" /></td>
      </tr>
      <tr>
        <td><strong>Update Frequency</strong></td>
        <td>AIRAC Cycle</td>
        <td>AIRAC Cycle</td>
        <td>On-demand Updates</td>
      </tr>
    </tbody>
  </table>
</div>

### 📚 Usage Guides
<div class="guide-links">
  <a href="/PMDG/guide/index" class="guide-link pmdg">
    <div class="guide-icon">🛩️</div>
    <div class="guide-content">
      <h3>PMDG Guide</h3>
      <p>Complete tutorial for PMDG aircraft navigation data conversion</p>
    </div>
  </a>
  
  <a href="/iniBuilds/guide/index" class="guide-link inibuilds">
    <div class="guide-icon">✈️</div>
    <div class="guide-content">
      <h3>iniBuilds Guide</h3>
      <p>iniBuilds A350 navigation data conversion guide</p>
    </div>
  </a>
  
  <a href="/X-Plane/guide/index" class="guide-link xplane">
    <div class="guide-icon">🛫</div>
    <div class="guide-content">
      <h3>X-Plane Guide</h3>
      <p>Complete process for X-Plane navigation data handling</p>
    </div>
  </a>
</div>

### 🆘 Get Help
<div class="help-section">
  <div class="help-category">
    <h4>🛩️ PMDG Support</h4>
    <ul>
      <li><a href="/PMDG/faq">Frequently Asked Questions</a></li>
      <li><a href="/PMDG/troubleshooting">Troubleshooting Guide</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>✈️ iniBuilds Support</h4>
    <ul>
      <li><a href="/iniBuilds/faq">Frequently Asked Questions</a></li>
      <li><a href="/iniBuilds/troubleshooting">Troubleshooting Guide</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>🛫 X-Plane Support</h4>
    <ul>
      <li><a href="/X-Plane/faq">Frequently Asked Questions</a></li>
      <li><a href="/X-Plane/troubleshooting">Troubleshooting Guide</a></li>
    </ul>
  </div>
</div>

### 🔧 Technical Documentation
<div class="tech-links">
  <a href="/iniBuilds/architecture" class="tech-link">
    <span class="tech-icon">🏗️</span>
    <span>Project Architecture Explanation</span>
  </a>
  <a href="/iniBuilds/contributing" class="tech-link">
    <span class="tech-icon">🤝</span>
    <span>Contribution Guide</span>
  </a>
  <a href="/iniBuilds/changelog" class="tech-link">
    <span class="tech-icon">📋</span>
    <span>Changelog</span>
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

## 🌍 Join Us & Feedback
- GitHub: [nav-data](https://github.com/nav-data)
- Have suggestions or questions? Feel free to contact us via [Issue](https://github.com/nav-data/nav-data/issues) or email!
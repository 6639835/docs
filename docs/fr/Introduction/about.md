# Bienvenue dans la documentation Nav-data 🚀

Nav-data est un projet de conversion de données maintenu conjointement par des passionnés d'aviation, dédié à la fourniture d'un support de données de navigation de haute qualité pour les simulateurs de vol (tels que Microsoft Flight Simulator). Que vous soyez développeur, pilote ou passionné, vous trouverez ici les ressources et les guides dont vous avez besoin.

## 🔄 Flux de conversion des données

```mermaid
graph TD
    A["📊 Sources de données<br/>AIRAC/Navigraph"] --> B["🔄 Nav-data<br/>Outil de conversion"]
    B --> C["🛩️ PMDG<br/>Base de données SQLite"]
    B --> D["✈️ iniBuilds<br/>Fichiers de données A350"]
    B --> E["🛫 X-Plane<br/>Fichiers au format DAT"]
    
    F["🗂️ Données brutes"] --> G["📥 Analyse des données"]
    G --> H["🔧 Conversion de format"]
    H --> I["✅ Validation des données"]
    I --> J["📤 Fichiers de sortie"]
    
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

## ✨ Caractéristiques du projet

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">📦</div>
    <h3>Support multiplateforme</h3>
    <p>Prend en charge les principales plateformes de simulateurs de vol comme PMDG, iniBuilds, X-Plane, etc.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛫</div>
    <h3>Guides détaillés</h3>
    <p>Fournit des guides complets de configuration, d'installation et d'utilisation, pour une prise en main facile même pour les débutants.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🗂️</div>
    <h3>Structure claire</h3>
    <p>Structure des données claire, facile à étendre et à maintenir, prend en charge la configuration personnalisée.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>Collaboration open source</h3>
    <p>La contribution et la collaboration de la communauté sont les bienvenues pour construire ensemble de meilleurs outils de données de navigation.</p>
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

## 🚀 Démarrage rapide
1. Choisissez votre extension : [Guide PMDG](/PMDG/guide/index) | [Guide iniBuilds](/iniBuilds/guide/index)
2. Suivez le guide pour la configuration et l'installation.
3. Profitez d'une expérience de vol plus réaliste !

---

## 🧭 Navigation rapide

### 📊 Comparaison du support des plateformes

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>Caractéristique</th>
        <th>🛩️ PMDG</th>
        <th>✈️ iniBuilds</th>
        <th>🛫 X-Plane</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Avions supportés</strong></td>
        <td>Séries 737, séries 777</td>
        <td>A350</td>
        <td>Tous les avions X-Plane</td>
      </tr>
      <tr>
        <td><strong>Format des données</strong></td>
        <td>Base de données SQLite</td>
        <td>Fichier de données dédié</td>
        <td>Fichier au format DAT</td>
      </tr>
      <tr>
        <td><strong>Difficulté d'installation</strong></td>
        <td><StatusBadge type="warning" text="Moyenne" icon="⚠️" /></td>
        <td><StatusBadge type="success" text="Simple" icon="✅" /></td>
        <td><StatusBadge type="error" text="Complexe" icon="🔴" /></td>
      </tr>
      <tr>
        <td><strong>Couverture des données</strong></td>
        <td><StatusBadge type="success" text="Complète" icon="✅" /></td>
        <td><StatusBadge type="success" text="Complète" icon="✅" /></td>
        <td><StatusBadge type="warning" text="Partielle" icon="⚠️" /></td>
      </tr>
      <tr>
        <td><strong>Fréquence des mises à jour</strong></td>
        <td>Cycle AIRAC</td>
        <td>Cycle AIRAC</td>
        <td>Mises à jour à la demande</td>
      </tr>
    </tbody>
  </table>
</div>

### 📚 Guides d'utilisation
<div class="guide-links">
  <a href="/PMDG/guide/index" class="guide-link pmdg">
    <div class="guide-icon">🛩️</div>
    <div class="guide-content">
      <h3>Guide PMDG</h3>
      <p>Tutoriel complet sur la conversion des données de navigation pour les avions PMDG</p>
    </div>
  </a>
  
  <a href="/iniBuilds/guide/index" class="guide-link inibuilds">
    <div class="guide-icon">✈️</div>
    <div class="guide-content">
      <h3>Guide iniBuilds</h3>
      <p>Guide de conversion des données de navigation pour l'A350 d'iniBuilds</p>
    </div>
  </a>
  
  <a href="/X-Plane/guide/index" class="guide-link xplane">
    <div class="guide-icon">🛫</div>
    <div class="guide-content">
      <h3>Guide X-Plane</h3>
      <p>Processus complet de traitement des données de navigation pour X-Plane</p>
    </div>
  </a>
</div>

### 🆘 Obtenir de l'aide
<div class="help-section">
  <div class="help-category">
    <h4>🛩️ Support PMDG</h4>
    <ul>
      <li><a href="/PMDG/faq">Foire Aux Questions (FAQ)</a></li>
      <li><a href="/PMDG/troubleshooting">Guide de dépannage</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>✈️ Support iniBuilds</h4>
    <ul>
      <li><a href="/iniBuilds/faq">Foire Aux Questions (FAQ)</a></li>
      <li><a href="/iniBuilds/troubleshooting">Guide de dépannage</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>🛫 Support X-Plane</h4>
    <ul>
      <li><a href="/X-Plane/faq">Foire Aux Questions (FAQ)</a></li>
      <li><a href="/X-Plane/troubleshooting">Guide de dépannage</a></li>
    </ul>
  </div>
</div>

### 🔧 Documentation technique
<div class="tech-links">
  <a href="/iniBuilds/architecture" class="tech-link">
    <span class="tech-icon">🏗️</span>
    <span>Description de l'architecture du projet</span>
  </a>
  <a href="/iniBuilds/contributing" class="tech-link">
    <span class="tech-icon">🤝</span>
    <span>Guide de contribution</span>
  </a>
  <a href="/iniBuilds/changelog" class="tech-link">
    <span class="tech-icon">📋</span>
    <span>Journal des modifications</span>
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

## 🌍 Rejoignez-nous et laissez vos commentaires
- GitHub: [nav-data](https://github.com/nav-data)
- Des suggestions ou des questions ? Contactez-nous via un [Issue](https://github.com/nav-data/nav-data/issues) ou par e-mail !
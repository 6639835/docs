# Bienvenido a la documentación de Nav-data 🚀

Nav-data es un proyecto de conversión de datos mantenido por entusiastas de la aviación, dedicado a proporcionar soporte de datos de navegación de alta calidad para simuladores de vuelo (como Microsoft Flight Simulator). Ya seas desarrollador, piloto o aficionado, aquí encontrarás los recursos y guías que necesitas.

## 🔄 Proceso de conversión de datos

```mermaid
graph TD
    A["📊 Fuente de datos<br/>AIRAC/Navigraph"] --> B["🔄 Nav-data<br/>Herramienta de conversión"]
    B --> C["🛩️ PMDG<br/>Base de datos SQLite"]
    B --> D["✈️ iniBuilds<br/>Archivos de datos del A350"]
    B --> E["🛫 X-Plane<br/>Archivos de formato DAT"]
    
    F["🗂️ Datos originales"] --> G["📥 Análisis de datos"]
    G --> H["🔧 Conversión de formato"]
    H --> I["✅ Validación de datos"]
    I --> J["📤 Archivos de salida"]
    
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

## ✨ Características del proyecto

<div class="feature-grid">
  <div class="feature-card">
    <div class="feature-icon">📦</div>
    <h3>Soporte multiplataforma</h3>
    <p>Compatible con las principales plataformas de simuladores de vuelo como PMDG, iniBuilds, X-Plane, etc.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🛫</div>
    <h3>Guías detalladas</h3>
    <p>Ofrece guías completas de configuración, instalación y uso, para que los principiantes puedan empezar fácilmente.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🗂️</div>
    <h3>Estructura clara</h3>
    <p>Estructura de datos clara, fácil de extender y mantener, soporta configuración personalizada.</p>
  </div>
  
  <div class="feature-card">
    <div class="feature-icon">🤝</div>
    <h3>Colaboración de código abierto</h3>
    <p>Damos la bienvenida a las contribuciones y la colaboración de la comunidad para construir juntos mejores herramientas de datos de navegación.</p>
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

## 🚀 Inicio rápido
1. Selecciona tu complemento: [Guía PMDG](/PMDG/guide/index) | [Guía iniBuilds](/iniBuilds/guide/index)
2. Sigue la guía para la configuración e instalación
3. ¡Disfruta de una experiencia de vuelo más realista!

---

## 🧭 Navegación rápida

### 📊 Comparación de soporte de plataformas

<div class="comparison-table">
  <table>
    <thead>
      <tr>
        <th>Característica</th>
        <th>🛩️ PMDG</th>
        <th>✈️ iniBuilds</th>
        <th>🛫 X-Plane</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td><strong>Aviones soportados</strong></td>
        <td>Serie 737, Serie 777</td>
        <td>A350</td>
        <td>Todos los aviones de X-Plane</td>
      </tr>
      <tr>
        <td><strong>Formato de datos</strong></td>
        <td>Base de datos SQLite</td>
        <td>Archivo de datos dedicado</td>
        <td>Archivos de formato DAT</td>
      </tr>
      <tr>
        <td><strong>Dificultad de instalación</strong></td>
        <td><StatusBadge type="warning" text="Media" icon="⚠️" /></td>
        <td><StatusBadge type="success" text="Fácil" icon="✅" /></td>
        <td><StatusBadge type="error" text="Compleja" icon="🔴" /></td>
      </tr>
      <tr>
        <td><strong>Cobertura de datos</strong></td>
        <td><StatusBadge type="success" text="Completa" icon="✅" /></td>
        <td><StatusBadge type="success" text="Completa" icon="✅" /></td>
        <td><StatusBadge type="warning" text="Parcial" icon="⚠️" /></td>
      </tr>
      <tr>
        <td><strong>Frecuencia de actualización</strong></td>
        <td>Ciclo AIRAC</td>
        <td>Ciclo AIRAC</td>
        <td>Bajo demanda</td>
      </tr>
    </tbody>
  </table>
</div>

### 📚 Guías de uso
<div class="guide-links">
  <a href="/PMDG/guide/index" class="guide-link pmdg">
    <div class="guide-icon">🛩️</div>
    <div class="guide-content">
      <h3>Guía PMDG</h3>
      <p>Tutorial completo de conversión de datos de navegación para aviones PMDG</p>
    </div>
  </a>
  
  <a href="/iniBuilds/guide/index" class="guide-link inibuilds">
    <div class="guide-icon">✈️</div>
    <div class="guide-content">
      <h3>Guía iniBuilds</h3>
      <p>Guía de conversión de datos de navegación para iniBuilds A350</p>
    </div>
  </a>
  
  <a href="/X-Plane/guide/index" class="guide-link xplane">
    <div class="guide-icon">🛫</div>
    <div class="guide-content">
      <h3>Guía X-Plane</h3>
      <p>Proceso completo de procesamiento de datos de navegación para X-Plane</p>
    </div>
  </a>
</div>

### 🆘 Obtener ayuda
<div class="help-section">
  <div class="help-category">
    <h4>🛩️ Soporte PMDG</h4>
    <ul>
      <li><a href="/PMDG/faq">Preguntas frecuentes</a></li>
      <li><a href="/PMDG/troubleshooting">Guía de solución de problemas</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>✈️ Soporte iniBuilds</h4>
    <ul>
      <li><a href="/iniBuilds/faq">Preguntas frecuentes</a></li>
      <li><a href="/iniBuilds/troubleshooting">Guía de solución de problemas</a></li>
    </ul>
  </div>
  
  <div class="help-category">
    <h4>🛫 Soporte X-Plane</h4>
    <ul>
      <li><a href="/X-Plane/faq">Preguntas frecuentes</a></li>
      <li><a href="/X-Plane/troubleshooting">Guía de solución de problemas</a></li>
    </ul>
  </div>
</div>

### 🔧 Documentación técnica
<div class="tech-links">
  <a href="/iniBuilds/architecture" class="tech-link">
    <span class="tech-icon">🏗️</span>
    <span>Descripción de la arquitectura del proyecto</span>
  </a>
  <a href="/iniBuilds/contributing" class="tech-link">
    <span class="tech-icon">🤝</span>
    <span>Guía de contribución</span>
  </a>
  <a href="/iniBuilds/changelog" class="tech-link">
    <span class="tech-icon">📋</span>
    <span>Registro de cambios</span>
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

## 🌍 Únete a nosotros & Envía tus comentarios
- GitHub: [nav-data](https://github.com/nav-data)
- ¿Tienes sugerencias o preguntas? ¡Contáctanos a través de [Issue](https://github.com/nav-data/nav-data/issues) o por correo electrónico!

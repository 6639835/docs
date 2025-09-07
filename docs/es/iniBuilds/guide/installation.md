# 📥 Guía de instalación

<div class="installation-header">
  <div class="header-content">
    <h2>Asistente de instalación de Nav-data iniBuilds A350</h2>
    <p>Esta guía le ayudará a completar el proceso de instalación de la herramienta de conversión de datos de navegación aérea Nav-data, asegurando que el entorno del sistema esté configurado correctamente.</p>
  </div>
  <div class="progress-indicator">
    <div class="step active" data-step="1">
      <div class="step-number">1</div>
      <div class="step-label">Verificación del sistema</div>
    </div>
    <div class="step" data-step="2">
      <div class="step-number">2</div>
      <div class="step-label">Entorno Python</div>
    </div>
    <div class="step" data-step="3">
      <div class="step-number">3</div>
      <div class="step-label">Configuración de MSFS</div>
    </div>
    <div class="step" data-step="4">
      <div class="step-number">4</div>
      <div class="step-label">Verificación completada</div>
    </div>
  </div>
</div>

## 🖥️ Requisitos del sistema

### 📋 Comparación de requisitos de configuración

<div class="requirements-comparison">
  <div class="req-column">
    <h4>🟡 Configuración mínima</h4>
    <div class="req-card minimal">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Sistema operativo</strong>
          <span>Windows 10 1903+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Versión de Python</strong>
          <span>Python 3.8+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>Memoria RAM</strong>
          <span>8GB RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Espacio de almacenamiento</strong>
          <span>2GB de espacio disponible</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Red</strong>
          <span>Conexión a internet de banda ancha</span>
        </div>
      </div>
    </div>
  </div>
  
  <div class="req-column">
    <h4>🟢 Configuración recomendada</h4>
    <div class="req-card recommended">
      <div class="req-item">
        <span class="req-icon">💻</span>
        <div class="req-details">
          <strong>Sistema operativo</strong>
          <span>Windows 11 22H2+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🐍</span>
        <div class="req-details">
          <strong>Versión de Python</strong>
          <span>Python 3.11+</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🧠</span>
        <div class="req-details">
          <strong>Memoria RAM</strong>
          <span>16GB+ RAM</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">💾</span>
        <div class="req-details">
          <strong>Espacio de almacenamiento</strong>
          <span>5GB+ de espacio disponible</span>
        </div>
      </div>
      <div class="req-item">
        <span class="req-icon">🌐</span>
        <div class="req-details">
          <strong>Red</strong>
          <span>Conexión estable de alta velocidad</span>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
.installation-header {
  background: linear-gradient(135deg, rgba(30, 64, 175, 0.1), rgba(59, 130, 246, 0.05));
  border: 1px solid rgba(30, 64, 175, 0.2);
  border-radius: 16px;
  padding: 2rem;
  margin: 2rem 0;
}

.header-content h2 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-brand-1);
  font-size: 1.5rem;
}

.header-content p {
  margin: 0;
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
  line-height: 1.6;
}

.progress-indicator {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
  position: relative;
}

.progress-indicator::before {
  content: '';
  position: absolute;
  top: 20px;
  left: 10%;
  right: 10%;
  height: 2px;
  background: var(--vp-c-divider);
  z-index: 0;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  position: relative;
  z-index: 1;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--vp-c-bg-soft);
  border: 2px solid var(--vp-c-divider);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--vp-c-text-2);
  transition: all 0.3s ease;
}

.step.active .step-number {
  background: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
  color: white;
}

.step-label {
  font-size: 0.875rem;
  color: var(--vp-c-text-2);
  text-align: center;
  font-weight: 500;
}

.step.active .step-label {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.requirements-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.req-column h4 {
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.req-card {
  background: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 1.5rem;
  border: 2px solid transparent;
  transition: all 0.3s ease;
}

.req-card.minimal {
  border-color: rgba(245, 158, 11, 0.3);
}

.req-card.recommended {
  border-color: rgba(34, 197, 94, 0.3);
  background: linear-gradient(135deg, rgba(34, 197, 94, 0.05), rgba(34, 197, 94, 0.02));
}

.req-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.req-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.req-item:last-child {
  border-bottom: none;
}

.req-icon {
  font-size: 1.5rem;
  width: 2rem;
  text-align: center;
}

.req-details {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.req-details strong {
  color: var(--vp-c-text-1);
  font-size: 0.9rem;
}

.req-details span {
  color: var(--vp-c-text-2);
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .progress-indicator {
    flex-direction: column;
    gap: 1rem;
  }
  
  .progress-indicator::before {
    display: none;
  }
  
  .step {
    flex-direction: row;
    justify-content: flex-start;
  }
  
  .requirements-comparison {
    grid-template-columns: 1fr;
  }
}
</style>

### ✈️ Software requerido

- [**Microsoft Flight Simulator**](https://www.flightsimulator.com/) (versión 2020 o 2024)
- [**Python 3.8+**](https://www.python.org/downloads/) Entorno de desarrollo
- Complemento de aeronave objetivo: [**iniBuilds A350**](https://www.inibuilds.com/) o [**PMDG 737/777**](https://pmdg.com/)

### 📊 Suscripción a fuentes de datos (elija una)

- [**Navigraph**](https://navigraph.com/) - Recomendado, datos actualizados puntualmente
- [**Aerosoft NavDataPro**](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/) - Alternativa asequible

## 🐍 Instalación del entorno Python

### Paso 1: Descargar e instalar Python

1.  Visite el [sitio web oficial de Python](https://www.python.org/downloads/)
2.  Descargue la última versión de Python 3.11 (recomendado)
3.  **Importante**: Durante la instalación, marque la opción "Add Python to PATH"

```powershell
# Verificar la instalación de Python
python --version
# Debería mostrar: Python 3.11.x

# Verificar la instalación de pip
pip --version
# Debería mostrar información de la versión de pip
```

### Paso 2: Instalar dependencias del proyecto

```bash
# Clonar o descargar el proyecto localmente
cd /path/to/nav-data

# Instalar los paquetes de dependencias requeridos
pip install -r requirements.txt
```

#### Descripción de los paquetes de dependencia

| Nombre del paquete | Versión | Uso |
|--------------------|---------|--------------------------------------|
| `pandas`           | ≥1.3.0  | Procesamiento y análisis de datos    |
| `requests`         | ≥2.26.0 | Manejo de solicitudes HTTP           |
| `tqdm`             | ≥4.62.0 | Visualización de barra de progreso   |
| `chardet`          | ≥4.0.0  | Detección de codificación de caracteres |
| `ratelimit`        | ≥2.2.1  | Limitación de solicitudes API        |
| `pygeomag`         | ≥0.9.0  | Cálculo de declinación magnética     |

### Paso 3: Verificar la instalación

```python
# Probar dependencias clave
python -c "import pandas, sqlite3, pygeomag; print('¡Todas las dependencias instaladas correctamente!')"
```

## 🎮 Configuración de Microsoft Flight Simulator

### 🔍 Confirmar la ubicación de instalación de MSFS

Según su versión de MSFS y canal de compra, la ubicación de la carpeta Community es la siguiente:

#### MSFS 2020

**Versión de Microsoft Store**
```
%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Versión de Steam**
```
%APPDATA%\Microsoft Flight Simulator\Packages\Community
```

#### MSFS 2024

**Versión de Microsoft Store**
```
%LOCALAPPDATA%\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community
```

**Versión de Steam**
```
%APPDATA%\Microsoft Flight Simulator 2024\Packages\Community
```

### 🛠️ Script de detección rápida de rutas

Cree el siguiente script de PowerShell para detectar automáticamente su instalación de MSFS:

```powershell
# Guardar como detect_msfs.ps1
$paths = @(
    "$env:LOCALAPPDATA\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator\Packages\Community",
    "$env:LOCALAPPDATA\Packages\Microsoft.Limitless_8wekyb3d8bbwe\LocalCache\Packages\Community",
    "$env:APPDATA\Microsoft Flight Simulator 2024\Packages\Community"
)

foreach ($path in $paths) {
    if (Test-Path $path) {
        Write-Host "Carpeta Community de MSFS encontrada: $path" -ForegroundColor Green
    }
}
```

## ✈️ Verificación de complementos de aeronave

### Verificación de iniBuilds A350

Compruebe si existe el siguiente directorio:

```
[Carpeta Community]\inibuilds-aircraft-a350\Config\NavigationData\
```

### Verificación de complementos PMDG

Compruebe si existe el siguiente directorio (según su modelo de aeronave PMDG):

```
[Carpeta Community]\pmdg-aircraft-737\Config\Navdata\
[Carpeta Community]\pmdg-aircraft-738\Config\Navdata\
[Carpeta Community]\pmdg-aircraft-77w\Config\Navdata\
[Carpeta Community]\pmdg-aircraft-77f\Config\Navdata\
```

## 📁 Estructura del directorio del proyecto

Una vez completada la instalación, la estructura de su directorio de proyecto debería ser la siguiente:

```
nav-data/
├── XP2INI_NDB_Converter.py    # Programa de conversión principal
├── requirements.txt           # Lista de dependencias de Python
├── README.md                 # Descripción del proyecto
├── LICENSE                   # Archivo de licencia
│
├── 数据处理模块/
│   ├── airports.py           # Procesamiento de datos de aeropuertos
│   ├── runways.py           # Procesamiento de datos de pistas
│   ├── vhfs.py              # Procesamiento de balizas de navegación VHF
│   ├── ndbs.py              # Procesamiento de balizas NDB
│   ├── enroute_waypoints.py # Procesamiento de puntos de ruta en ruta
│   ├── terminal_waypoints.py# Procesamiento de puntos de ruta terminales
│   ├── sids.py              # Procesamiento de procedimientos SID
│   ├── stars.py             # Procesamiento de procedimientos STAR
│   ├── iaps.py              # Procesamiento de procedimientos de aproximación
│   ├── airways.py           # Procesamiento de aerovías
│   └── gs.py                # Procesamiento de guía de aterrizaje
│
└── docs/                    # Directorio de documentación
    ├── guide/               # Guía de uso
    └── ...                  # Otra documentación
```

## 🔧 Configuración de variables de entorno (Opcional)

Para un uso más conveniente, puede configurar las siguientes variables de entorno:

```powershell
# Establecer la ruta de MSFS Community
setx MSFS_COMMUNITY_PATH "C:\Users\[nombre de usuario]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community"

# Establecer el directorio de trabajo de Nav-data
setx NAVDATA_WORKSPACE "C:\path\to\nav-data"
```

## ✅ Lista de verificación de instalación

Después de completar la instalación, confirme los siguientes elementos:

-   [ ] Python 3.8+ instalado correctamente y añadido al PATH
-   [ ] Todos los paquetes de dependencias instalados con éxito
-   [ ] Carpeta Community de MSFS localizada
-   [ ] Complemento de aeronave objetivo instalado y verificado
-   [ ] Archivos del proyecto descargados al directorio local
-   [ ] Suficiente espacio en disco disponible (al menos 2GB)

## 🚨 Problemas comunes de instalación

### Problemas relacionados con Python

**Problema**: `'python' no se reconoce como un comando interno o externo`
```bash
# Solución: Reinstalar Python y asegurarse de marcar "Add to PATH"
# O añadir Python manualmente al PATH del sistema
```

**Problema**: `ModuleNotFoundError: No module named 'xxx'`
```bash
# Solución: Reinstalar dependencias
pip install --upgrade -r requirements.txt
```

### Problemas de permisos

**Problema**: No se puede acceder a la carpeta de MSFS
```powershell
# Solución: Ejecutar PowerShell/símbolo del sistema como administrador
# Clic derecho → "Ejecutar como administrador"
```

### Problemas de rutas

**Problema**: No se encuentra el directorio del complemento de la aeronave
```bash
# Solución:
# 1. Confirmar que el complemento de la aeronave está instalado correctamente
# 2. Iniciar la aeronave en MSFS al menos una vez para crear los directorios necesarios
# 3. Comprobar que el complemento está en la carpeta Community correcta
```

## 🔄 Instrucciones de actualización

Para actualizar Nav-data a la última versión:

```bash
# Obtener el código más reciente
git pull origin main

# Actualizar paquetes de dependencias
pip install --upgrade -r requirements.txt
```

---

¡Instalación completada! A continuación, consulte las [**Instrucciones de configuración**](./configuration.md) para configurar las fuentes de datos y el ciclo AIRAC.
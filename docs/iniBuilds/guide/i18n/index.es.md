# 🧭 Guía de Uso

¡Bienvenido a la herramienta de conversión de datos de navegación aeronáutica Nav-data! Esta guía le ayudará a dominar completamente este sistema profesional de procesamiento de datos de navegación aeronáutica.

## 📋 Navegación Rápida

### 🚀 Primeros Pasos
- [**Guía de Instalación**](./installation.md) - Requisitos del sistema y proceso de instalación completo
- [**Configuración**](./configuration.md) - Configuración de fuentes de datos y ajuste del ciclo AIRAC
- [**Instrucciones de Uso**](./usage.md) - Proceso completo de conversión y despliegue de datos

### 🆘 Ayuda y Soporte
- [**Preguntas Frecuentes**](../faq.md) - Respuestas a las preguntas más comunes de los usuarios
- [**Resolución de Problemas**](../troubleshooting.md) - Diagnóstico de problemas y soluciones

### 🔧 Temas Avanzados
- [**Descripción de la Arquitectura**](../architecture.md) - Arquitectura del sistema e implementación técnica

## 🎯 Descripción General del Proyecto

Nav-data es una herramienta profesional de conversión de datos de navegación aeronáutica, diseñada específicamente para proporcionar soporte de datos de navegación en tiempo real y precisos a los complementos avanzados de Microsoft Flight Simulator.

### 🏆 Ventajas Clave

#### ✈️ Precisión de Datos de Nivel Profesional
- **Compatibilidad con el estándar AIRAC**: Sigue estrictamente el ciclo AIRAC de 28 días de la Organización de Aviación Civil Internacional
- **Coordenadas de alta precisión**: Admite coordenadas geográficas con una precisión de 8 decimales
- **Cálculo de declinación magnética**: Utiliza el WMM (Modelo Magnético Mundial) para cálculos en tiempo real
- **Soporte multiestándar**: Compatible con los formatos de datos ARINC 424, X-Plane y NAIP

#### 🔄 Procesamiento Inteligente de Datos
- **Fusión de datos multisource**: Integra múltiples fuentes de datos como NAIP, X-Plane y CIFP
- **Validación inteligente de datos**: Detección y reparación automática de problemas de integridad de datos
- **Soporte de actualización incremental**: Mecanismo eficiente de actualización diferencial de datos
- **Optimización del procesamiento paralelo**: Procesamiento paralelo multiproceso para grandes conjuntos de datos

#### 🛫 Amplia Compatibilidad
- **MSFS 2020 y 2024**: Soporte completo para ambas versiones de Microsoft Flight Simulator
- **Múltiples plataformas de distribución**: Compatible con las versiones de Steam, Microsoft Store y Xbox
- **Soporte para complementos de primera línea**: Optimizado específicamente para complementos de alta gama de iniBuilds y PMDG

### 📊 Tipos de Datos de Navegación Compatibles

| Tipo de Dato | Nombre en Inglés | Código Estándar | Descripción |
|--------------|------------------|-----------------|-------------|
| Información de Aeropuertos | Airports | APT | Código ICAO del aeropuerto, coordenadas, declinación magnética |
| Datos de Pistas | Runways | RWY | Identificador de pista, dirección, longitud, tipo de superficie |
| Radioayudas VHF | VHF Navaids | VHF | Frecuencias de radioayudas VOR, DME, TACAN |
| Radioayudas NDB | NDB Navaids | NDB | Frecuencias y cobertura de balizas no direccionales |
| Puntos de Ruta | Waypoints | FIX | Coordenadas y clasificación de área de los puntos de ruta |
| Sistema de Aerovías | Airways | AWY | Aerovías de altitud alta, baja y sus conexiones |
| Procedimientos de Salida | SIDs | SID | Procedimientos estándar de salida instrumental |
| Procedimientos de Llegada | STARs | STAR | Rutas estándar de llegada terminal |
| Procedimientos de Aproximación | Approaches | IAP | Diversos tipos de procedimientos de aproximación instrumental |
| Sistemas de Aterrizaje | ILS/GLS | GS | Información de guía del sistema de aterrizaje instrumental |

### 🌍 Regiones Cubiertas

Esta herramienta cubre principalmente las siguientes regiones ICAO:

- **China Continental**: ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH
- **Sudeste Asiático**: VM (Vietnam), VH (Hong Kong)
- **Noreste Asiático**: RK (parte de Corea)

### 🎯 Complementos de Aeronaves Compatibles

#### Serie iniBuilds
- **Airbus A350-900** - Avión de pasajeros de fuselaje ancho de largo alcance
- **Airbus A350-900ULR** - Versión de ultra largo alcance
- **Airbus A350-1000** - Versión extendida

#### Serie PMDG
- **Boeing 737-600/700/800/900** - Serie de aviones de pasajeros de fuselaje estrecho
- **Boeing 777-300ER** - Avión de pasajeros de fuselaje ancho de largo alcance
- **Boeing 777F** - Versión de carga

## 🚦 Comenzar

### Verificación de Requisitos Previos

Antes de comenzar, asegúrese de tener:

- [ ] **Microsoft Flight Simulator 2020 o 2024** (cualquier versión)
- [ ] Entorno de desarrollo **Python 3.8+**
- [ ] **Suscripción válida a datos de navegación** (Navigraph o Aerosoft NavDataPro)
- [ ] **Complemento de aeronave objetivo** (iniBuilds A350 o PMDG 737/777)
- [ ] **Permisos de administrador** (para acceso al sistema de archivos)

### 📖 Ruta de Aprendizaje Recomendada

1.  **📥 Preparación del Entorno** → [Guía de Instalación](./installation.md)
2.  **⚙️ Configuración de Datos** → [Configuración](./configuration.md)
3.  **🔄 Ejecutar Conversión** → [Instrucciones de Uso](./usage.md)
4.  **🛠️ Comprensión Profunda** → [Descripción de la Arquitectura](../architecture.md)

## ⚡ Inicio Rápido

Si ya tiene experiencia, puede ir directamente a:

```bash
# Instalación rápida de dependencias
pip install -r requirements.txt

# Ejecutar la herramienta de conversión
python XP2INI_NDB_Converter.py
```

## 📞 Obtener Ayuda
- **💡 Sugerencias de funciones**: Consulte la [Guía de Contribución](../contributing.md)

---

¿Listo? ¡Comencemos su viaje con Nav-data desde la [Guía de Instalación](./installation.md)! 🚀
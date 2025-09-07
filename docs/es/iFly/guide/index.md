# 🛫 Guía del Usuario del Convertidor de Datos de Navegación de iFly

El Convertidor de Datos de Navegación de iFly es una herramienta profesional de conversión de datos de navegación aeronáutica, diseñada específicamente para transformar la base de datos de navegación del Fenix A320 al formato de la base de datos de navegación del iFly 737 MAX 8. Esta herramienta cuenta con una interfaz CLI moderna y capacidades de procesamiento de datos de alta precisión.

## 📖 Recorrido Rápido

### 🎯 Funcionalidades Principales
- **🎨 Interfaz Moderna** - Interfaz de terminal a color basada en la librería Rich, con visualización del progreso en tiempo real
- **🧭 Declinación Magnética de Alta Precisión** - Utiliza el modelo geomagnético WMM-2025 de pygeomag para cálculos locales
- **📅 Gestión Inteligente de AIRAC** - Cálculo y gestión dinámica de los ciclos de revisión de información aeronáutica
- **⚡ Optimización del Rendimiento** - Procesamiento concurrente y optimización de memoria, soporta archivos de datos grandes
- **🛡️ Calidad de Nivel Empresarial** - Sugerencias de tipo completas, manejo de errores y cobertura de pruebas

### ✈️ Modelos de Aeronaves Compatibles
- **iFly 737 MAX 8** - Boeing 737 MAX 8 de alta fidelidad en Microsoft Flight Simulator
- **Fuente de Datos** - Base de Datos de Navegación del Fenix A320 (nd.db3)
- **Datos de Ruta** - NAIP RTE_SEG.csv Datos de Segmentos de Ruta de Aviación Civil de China

### 📊 Cobertura de Tipos de Datos
- **🛣️ Datos de Ruta** - Rutas de alta/baja altitud, coordenadas de puntos de ruta, declinación magnética
- **🏢 Procedimientos Terminales** - SID, STAR, procedimientos de aproximación, procedimientos de salida
- **🧭 Equipos de Navegación** - Datos de VOR/DME, NDB, ILS
- **📅 Ciclo AIRAC** - Cálculo y gestión automática de la validez de los datos

## 🚀 Inicio Rápido

### 1️⃣ Verificación de Requisitos del Sistema
```bash
# Comprobar la versión de Python (requiere 3.8+)
python --version

# Comprobar la memoria disponible (se recomienda 4GB+)
# Windows: Administrador de tareas → Rendimiento → Memoria
# macOS: Monitor de Actividad → Memoria
# Linux: free -h
```

### 2️⃣ Preparación de Archivos Necesarios
- ✅ **Base de Datos de Navegación del Fenix** (`nd.db3`)
  ```
  %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  ```
- ✅ **Datos de Ruta NAIP** (`RTE_SEG.csv`)
  - Obtener del sitio web de servicios de datos de Aviación Civil de China
  - Asegurarse de que el archivo esté codificado en UTF-8
- ✅ **iFly 737 MAX 8** ya instalado en MSFS

### 3️⃣ Instalación y Ejecución Rápidas
```bash
# 1. Instalar paquetes de dependencias
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# 2. Ejecutar el convertidor
python main.py

# 3. Seguir las instrucciones de la interfaz
# → Seleccionar el archivo de la base de datos de Fenix
# → Seleccionar el archivo CSV de NAIP
# → Establecer el rango de ID de los procedimientos terminales
# → Esperar a que la conversión finalice
```

## 📚 Navegación por la Documentación

### 🚀 Uso Básico
1. **[Guía de Instalación](installation.md)** - Configuración detallada del entorno e instalación de dependencias
   - Configuración del entorno Python
   - Instalación de paquetes de dependencias
   - Verificación de requisitos del sistema
   - Resolución de problemas comunes de instalación

2. **[Descripción de la Configuración](configuration.md)** - Detalles de los archivos de configuración y parámetros
   - Opciones de configuración del convertidor
   - Guía de configuración de rutas
   - Configuración del ciclo AIRAC
   - Parámetros de optimización del rendimiento

3. **[Instrucciones de Uso](usage.md)** - Proceso operativo completo y ejemplos
   - Guía de operación interactiva
   - Métodos de procesamiento por lotes
   - Pasos de validación de datos
   - Descripción de los archivos de salida

### 🆘 Ayuda y Soporte
- **[Preguntas Frecuentes](../faq.md)** - Respuestas a las preguntas más frecuentes de los usuarios
- **[Solución de Problemas](../troubleshooting.md)** - Diagnóstico de problemas y soluciones

### 🔧 Contenido Avanzado
- **[Arquitectura Técnica](../architecture.md)** - Diseño del sistema y principios de funcionamiento
- **[Guía de Contribución](../contributing.md)** - Participación en el desarrollo y estándares de código
- **[Registro de Cambios](../changelog.md)** - Historial de versiones y nuevas funcionalidades
- **[Información de la Licencia](../license.md)** - Términos de uso y avisos legales

## 🎨 Vista Previa de la Interfaz

### Interfaz de Bienvenida
```
╔═══════════════════════════════════════ 🛩️  Herramienta de Conversión de Datos de Navegación Aeronáutica  ✈️ ═══════════════════════════════════════╗
║                                                                                                          ║
║                                      Convertidor de Datos de Navegación Aeronáutica de Fenix a iFly        ║
║                                          Experiencia de Conversión de Alta Calidad y Moderna                                         ║
║                                                                                                          ║
╚═══════════════════════════════════════ Powered by Rich • Versión 2.0 ═══════════════════════════════════════╝
```

### Visualización del Progreso
```
╭─────────────────────────────────────────────── 🔄 Procesando Datos de Ruta ────────────────────────────────────────────────╮
│ Calculando declinación magnética...                                                                            │
│ ████████████████████████████████████████ 1,247/1,500 (83%) 0:02:15                                        │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
```

### Resumen de Finalización
```
┌─────────────────────────────────────────── ✅ Conversión Completada ───────────────────────────────────────────────┐
│                                                                                                        │
│  🛣️  Datos de Ruta: 1,500 puntos de ruta procesados                                                                    │
│  🏢  Procedimientos Terminales: 245 procedimientos convertidos                                                                         │
│  📅  Ciclo AIRAC: 2508 (Válido hasta 2025-02-27)                                                             │
│  📁  Ubicación de Salida: Community\ifly-aircraft-737max8\Data\navdata\                                            │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

## ⚠️ Notas Importantes

### Cumplimiento Normativo de Datos
Esta herramienta está diseñada únicamente para propósitos de simulación de vuelo. Asegúrese de que su uso cumpla con las leyes y regulaciones pertinentes:
- **🎯 Solo para Simulación** - Estrictamente prohibido para la navegación aérea real
- **📋 Cumplir con los Acuerdos** - Confirmar la legalidad de las fuentes de datos
- **🔒 Uso No Comercial** - Solo para estudio personal y entretenimiento

### Requisitos Técnicos
- **🐍 Python 3.8+** - Se recomienda Python 3.9 o superior
- **💾 Requisitos de Memoria** - Al menos 4GB de RAM (8GB recomendados)
- **💿 Espacio de Almacenamiento** - Al menos 500MB de espacio disponible
- **🖥️ Sistema Operativo** - Windows 10/11, macOS 10.15+, Linux

### Seguridad de Datos
- **💾 Realizar Copias de Seguridad de los Datos Originales** - Haga una copia de seguridad de los datos de navegación originales de iFly antes de la conversión
- **🔍 Verificar Resultados** - Después de la conversión, valide la exactitud de los datos en el simulador
- **📅 Actualizaciones Regulares** - Se recomienda actualizar los datos AIRAC cada 28 días
- **🔒 Gestión de Permisos** - Asegurarse de que el programa tenga suficientes permisos de escritura de archivos

## 🎯 Casos de Uso

### 🎓 Entusiastas de la Simulación de Vuelo
- **✈️ Mejora de la Experiencia** - Obtener datos de navegación más precisos para el espacio aéreo chino
- **🎮 Vuelo Realista** - Experimentar procedimientos de vuelo basados en rutas reales
- **📚 Herramienta de Aprendizaje** - Comprender los sistemas de navegación aérea modernos

### 👨‍🏫 Enseñanza Aeronáutica
- **🎓 Propósitos de Formación** - Proporcionar datos de navegación precisos para la enseñanza
- **📊 Estandarización** - Cumple con los estándares de la Organización de Aviación Civil Internacional (OACI)
- **🔄 Actualización en Tiempo Real** - Basado en los datos del ciclo AIRAC más reciente

### 👨‍💻 Desarrolladores
- **🔧 Referencia de la API** - Estructura de código clara y documentación
- **🧩 Modularidad** - Diseño fácil de extender y personalizar
- **🧪 Pruebas Exhaustivas** - Cobertura de pruebas completa y garantía de calidad

## 🆘 Obtener Ayuda

Si encuentra problemas durante el uso:

1. **📚 Consultar la Documentación** - Primero, revise las instrucciones detalladas en las secciones relevantes
2. **🔍 Revisar el Registro** - Consulte el archivo `converter.log` generado
3. **🧪 Validar el Entorno** - Use la herramienta de validación incorporada para verificar la configuración del sistema
4. **💬 Soporte Comunitario** - Reporte problemas o participe en las discusiones en GitHub Issues

### Comandos de Diagnóstico Rápido
```bash
# Comprobar el entorno Python
python --version
python -c "import rich, pandas, pygeomag; print('Todas las dependencias están instaladas')"

# Verificar permisos de archivo
ls -la /path/to/ifly/navdata/

# Ver los últimos registros
tail -n 50 converter.log
```

---

**Siguiente paso**: Vaya a la [Guía de Instalación](installation.md) para comenzar a configurar su entorno de desarrollo, o consulte directamente las [Instrucciones de Uso](usage.md) para empezar rápidamente. 🚀
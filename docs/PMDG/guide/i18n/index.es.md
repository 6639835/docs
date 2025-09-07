# 🛫 Guía del Usuario de Nav-data

Nav-data es un conjunto de herramientas profesionales para la conversión de datos de navegación aérea, diseñado específicamente para proporcionar soporte de datos de navegación de alta calidad para las aeronaves PMDG en Microsoft Flight Simulator. Esta herramienta convierte varios formatos estándar de datos de aviación a un formato de base de datos SQLite compatible con PMDG.

## 📖 Recorrido Rápido

### 🎯 Características Principales
- **Integración de Datos de Múltiples Fuentes** - Soporta formatos estándar como AIRAC, ARINC 424, X-Plane
- **Conversión de Datos Profesional** - Conversión precisa de sistemas de coordenadas y cálculo de la declinación magnética
- **Garantía de Calidad** - Validación de datos y comprobaciones de integridad integradas
- **Optimización para la Región de China** - Optimizado específicamente para datos de aviación civil china

### ✈️ Modelos de Aeronaves Compatibles
- **Serie PMDG 737**: 737-600, 737-700, 737-800, 737-900
- **Serie PMDG 777**: 777-300ER, 777F

### 📊 Cobertura de Tipos de Datos
- **Datos de Aeropuertos** - Códigos ICAO, pistas, declinación magnética
- **Ayudas a la Navegación** - VOR/DME, NDB, ILS/GS
- **Red de Aerovías** - Aerovías de alta/baja altitud, puntos de ruta
- **Procedimientos de Vuelo** - SID, STAR, Procedimientos de Aproximación

## 📚 Navegación del Documento

### 🚀 Inicio Rápido
1. [Guía de Instalación](installation.md) - Configuración del entorno e instalación de dependencias
2. [Instrucciones de Configuración](configuration.md) - Configuración de fuentes de datos y ajustes de ruta
3. [Instrucciones de Uso](usage.md) - Proceso de conversión y pasos operativos

### 🆘 Ayuda y Soporte
- [Preguntas Frecuentes](../faq.md) - Respuestas a las preguntas más frecuentes de los usuarios
- [Solución de Problemas](../troubleshooting.md) - Diagnóstico de problemas y soluciones

### 🔧 Contenido Avanzado
- [Arquitectura Técnica](../architecture.md) - Diseño del sistema y principios de funcionamiento
- [Guía de Contribución](../contributing.md) - Participación en el desarrollo y estándares de código
- [Registro de Cambios](../changelog.md) - Historial de versiones y nuevas características
- [Información de Licencia](../license.md) - Términos de uso y avisos legales

## ⚠️ Aviso Importante

### Conformidad de Datos
Esta herramienta está destinada únicamente para fines de simulación de vuelo. Asegúrese de que sus fuentes de datos cumplan con las leyes y regulaciones pertinentes:
- Cumplir con los estándares de la Organización de Aviación Civil Internacional (ICAO)
- Confirmar la legalidad de las fuentes de datos
- Utilizar únicamente para simulación de vuelo con fines no comerciales

### Requisitos Técnicos
- **Python 3.8+** - Se recomienda usar Python 3.9 o superior
- **Requisitos de Memoria** - Al menos 4GB de RAM (8GB recomendados)
- **Espacio de Almacenamiento** - Al menos 2GB de espacio disponible
- **Sistema Operativo** - Windows 10/11, macOS 10.15+, Linux

### Frecuencia de Actualización de Datos
- **Ciclo AIRAC** - Se recomienda actualizar cada 28 días
- **Datos de Origen** - Asegúrese de utilizar los datos del ciclo AIRAC válidos más recientes
- **Compatibilidad de Versión** - Confirmar la compatibilidad con las versiones de aeronaves PMDG

## 🆘 Obtener Ayuda

Si encuentra problemas durante el uso:

1. **Consultar la Documentación** - Primero, consulte las explicaciones detalladas en las secciones relevantes.
2. **Revisar los Registros** - Vea los archivos de registro generados para comprender los errores específicos.
3. **Validar los Datos** - Utilice las herramientas de validación integradas para verificar la integridad de los datos.
4. **Soporte de la Comunidad** - Informe los problemas en GitHub Issues.

---

**Siguiente Paso**: Vaya a la [Guía de Instalación](installation.md) para comenzar a configurar su entorno de desarrollo.
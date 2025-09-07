# Guía de uso de Nav-data

Bienvenido a **Nav-data** - ¡su herramienta profesional para la conversión de datos de navegación aérea!

## 🛩️ Visión general del proyecto

Nav-data es una herramienta de código abierto para el procesamiento y la conversión de datos de navegación aérea, diseñada específicamente para el simulador de vuelo X-Plane. Esta herramienta es capaz de convertir los datos NAIP (National Aeronautical Information Publication) de la aviación civil china a un formato estándar reconocible por X-Plane, proporcionando datos de navegación precisos y completos del espacio aéreo chino para entusiastas de los simuladores de vuelo y profesionales de la aviación.

## ✨ Funcionalidades principales

### 🛣️ Procesamiento de datos de ruta
- **Conversión de CSV a DAT**: Convierte datos de ruta en formato CSV al formato DAT de X-Plane
- **Filtrado por región**: Filtra inteligentemente los datos del espacio aéreo chino (compatible con códigos de región como ZB, ZG, ZY, ZS, ZW, ZJ, ZP, ZL, ZH, ZU, entre otros)
- **Compatibilidad con tipos de puntos de navegación**:
  - DESIGNATED_POINT (Punto Designado) - Código de tipo 11
  - VOR/DME - Código de tipo 3
  - NDB - Código de tipo 2
- **Gestión de ciclos AIRAC**: Calcula y gestiona automáticamente el período de validez de los datos AIRAC

### 📄 Extracción de datos PDF
- **Procesamiento de procedimientos terminales**: Extrae y estandariza los datos de procedimientos aeronáuticos de archivos PDF
- **Extracción de coordenadas de puntos de ruta**: Extrae automáticamente la información de coordenadas geográficas de los puntos de ruta
- **Compatibilidad con múltiples formatos**: Admite el procesamiento de archivos PDF de origen en diferentes formatos
- **Validación de datos**: Verificación integrada de la integridad y precisión de los datos

### 🔧 Reparación y codificación de datos
- **Normalización de formato**: Repara y normaliza el formato de datos CIFP de X-Plane
- **Reparación de codificación**: Repara automáticamente los problemas de codificación de los datos de procedimientos de aproximación, SID y STAR
- **Garantía de calidad**: Múltiples verificaciones para asegurar que los datos de salida cumplen con los estándares de X-Plane

## 🎯 Usuarios objetivo

### Aficionados a los simuladores de vuelo
- Obtenga datos de navegación de alta calidad para el espacio aéreo chino
- Disfrute de una experiencia de vuelo más realista
- Compatible con todo tipo de aeronaves que utilizan los datos predeterminados de X-Plane

### Profesionales de la aviación
- Datos de navegación precisos para fines de formación y enseñanza
- Cumple con los estándares de la Organización de Aviación Civil Internacional (OACI)
- Basado en fuentes de datos NAIP autorizadas

### Desarrolladores
- Estructura de código clara y documentación API
- Diseño modular para facilitar la expansión
- Sistema completo de gestión de errores y registro

## 📊 Compatibilidad con estándares de datos

### Estándares internacionales
- **Estándar OACI**: Cumple con los estándares de datos de navegación de la Organización de Aviación Civil Internacional
- **ARINC 424**: Sigue el estándar de base de datos de navegación ARINC 424
- **Ciclo AIRAC**: Soporta el ciclo de actualización estándar de 28 días AIRAC

### Formatos de X-Plane
- **Datos CIFP**: Compatibilidad completa con el formato CIFP (Coded Instrument Flight Procedures) de X-Plane
- **Archivos DAT**: Salida en formato estándar X-Plane DAT
- **Compatibilidad**: Compatible con X-Plane 11 y X-Plane 12

## 🚀 Inicio rápido

### 1. Preparación del entorno
Asegúrese de que su sistema tenga Python 3.6+ y los paquetes de dependencias necesarios instalados.

### 2. Preparación de datos
Prepare sus archivos de datos de origen (datos de ruta en formato CSV o archivos de procedimientos en formato PDF).

### 3. Configuración
Configure las rutas de los archivos y los parámetros de procesamiento según sus necesidades.

### 4. Conversión de datos
Ejecute el script de conversión correspondiente para iniciar el procesamiento de datos.

## 📚 Navegación por la documentación

### Uso básico
- [Guía de instalación](./installation.md) - Instrucciones detalladas de instalación y configuración del entorno
- [Descripción de la configuración](./configuration.md) - Detalles de los archivos de configuración y parámetros
- [Instrucciones de uso](./usage.md) - Flujo de operación y ejemplos completos

### Detalles técnicos
- [Descripción de la arquitectura](../architecture.md) - Arquitectura del sistema y principios técnicos
- [Guía de contribución](../contributing.md) - Guía para participar en el desarrollo del proyecto
- [Registro de cambios](../changelog.md) - Registro de actualizaciones y mejoras de versiones

## ⚠️ Notas importantes

### Precisión de los datos
- Esta herramienta realiza conversiones basadas en datos NAIP disponibles públicamente
- Se recomienda verificar los datos de navegación clave antes de un vuelo real
- Actualice los datos regularmente para mantener la sincronización con el ciclo AIRAC

### Restricciones de uso
- Solo para fines de simulación de vuelo y enseñanza
- No debe utilizarse para navegación aérea real
- Cumpla con las leyes, regulaciones y acuerdos de uso de datos relevantes

### Soporte técnico
- Consulte las [FAQ (Preguntas Frecuentes)](./usage.md#faq)
- Envíe [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- Participe en la discusión de la comunidad

---

**¡Comience ahora su viaje de conversión de datos de navegación!** 📈

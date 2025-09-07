# 📝 Registro de cambios

Todos los cambios importantes en Nav-data se registran en este archivo.

El formato se basa en [Keep a Changelog](https://keepachangelog.com/zh-CN/1.0.0/),
y el proyecto sigue el [Control de versiones semántico](https://semver.org/lang/zh-CN/).

## [Sin publicar] - Próximamente

### 🚀 Novedades
- Nuevo informe de validación de datos visual
- Soporte para optimización de escritura en base de datos multihilo
- Monitoreo del progreso del procesamiento de datos

### 🔧 Mejoras
- Optimización del uso de memoria, soporte para conjuntos de datos más grandes
- Mejora de la legibilidad de los mensajes de error
- Validación de archivos de configuración mejorada

### 🐛 Correcciones
- Se solucionó un problema con el manejo de caracteres especiales en los nombres de los aeropuertos
- Se resolvió un problema de condición de carrera de datos durante el procesamiento concurrente

---

## [2.1.0] - 2024-12-24

### 🚀 Nuevas funcionalidades
- **Algoritmo inteligente de fusión de rutas** - Implementada lógica avanzada de fusión de datos de rutas, con detección automática de puntos de ruta comunes e inserción inteligente de segmentos faltantes.
- **Herramienta de validación de base de datos** - Se añadió `db_validator.py`, que proporciona una verificación completa de la integridad de la base de datos e informes de calidad.
- **Soporte para procesamiento concurrente** - Procesamiento multihilo para grandes conjuntos de datos, lo que mejora significativamente la velocidad de procesamiento.
- **Integración del cálculo de variación magnética** - Se integró la librería pygeomag para proporcionar cálculos precisos de declinación magnética.
- **Monitoreo de progreso** - Se añadió una barra de progreso tqdm para mostrar el progreso del procesamiento en tiempo real.

### 🔧 Mejoras y optimizaciones
- **Optimización de la gestión de memoria** - Implementado un mecanismo de procesamiento por lotes para reducir drásticamente el uso de memoria.
- **Precisión de la conversión de coordenadas** - Se mejoró la precisión de la conversión de DMS a grados decimales a 8 decimales.
- **Manejo de errores mejorado** - Registros de errores y mecanismos de manejo de excepciones más detallados.
- **Validación de datos reforzada** - Se añadió validación de rango de coordenadas y verificación del formato de códigos ICAO.
- **Modularización del código** - Se refactorizó la estructura del código para mejorar la mantenibilidad.

### 🐛 Problemas resueltos
- Se corrigió un problema de detección de codificación de archivos CSV, manejando correctamente la codificación Latin-1.
- Se resolvieron conflictos de restricciones de base de datos causados por registros duplicados.
- Se corrigió la pérdida de precisión de las coordenadas de los puntos de ruta.
- Se resolvió el problema de desbordamiento de memoria al procesar archivos grandes.
- Se corrigió un problema de compatibilidad con los separadores de ruta de Windows.

### 📚 Actualizaciones de documentación
- Documentación técnica completamente reescrita, incluyendo descripciones detalladas de la arquitectura.
- Se añadió una guía completa de instalación y configuración.
- Se incluyeron nuevas secciones de solución de problemas y preguntas frecuentes.
- Se actualizaron la documentación de la API y los ejemplos de código.

### 🔒 Mejoras de seguridad
- Se añadió validación de rutas de entrada para prevenir ataques de recorrido de ruta.
- Se mejoró el mecanismo de saneamiento de entrada SQL.
- Se mejoraron las verificaciones de permisos de archivo.

---

## [2.0.0] - 2024-11-15

### 🚀 Actualizaciones importantes
- **Motor de procesamiento de datos completamente refactorizado** - Arquitectura modular diseñada desde cero.
- **Soporte para PMDG 777** - Soporte extendido para PMDG 777-300ER y 777F.
- **Nueva arquitectura de base de datos** - Estructura de tabla optimizada, mejor rendimiento y compatibilidad.
- **Soporte especializado para datos de la región de China** - Optimización específica para datos de aviación civil china.

### 🔧 Mejoras técnicas
- **Soporte para Python 3.8+** - Actualización a versiones modernas de Python.
- **Anotaciones de tipo** - Adición completa de sugerencias de tipo para mejorar la calidad del código.
- **Procesamiento asíncrono** - Introducción de capacidad de procesamiento de datos asíncrono.
- **Gestión de configuración** - Nuevo sistema de configuración, soporte para archivos de configuración YAML.

### 📊 Mejoras en el procesamiento de datos
- **Integración de datos de múltiples fuentes** - Soporte para múltiples fuentes de datos: NAIP, X-Plane, CIFP.
- **Unificación del sistema de coordenadas** - Conversión y validación de coordenadas estandarizadas.
- **Garantía de calidad de datos** - Proceso completo de validación y limpieza de datos.

### 🛠️ Mejoras en herramientas
- **Optimización de la interfaz de línea de comandos (CLI)** - Herramienta CLI más amigable.
- **Soporte para procesamiento por lotes** - Soporte para procesamiento por lotes de múltiples archivos de datos.
- **Actualización del sistema de registro** - Registro estructurado, mejor soporte para depuración.

### 💔 Cambios disruptivos
- **Requisito de versión mínima de Python** - Se requiere Python 3.8 o superior.
- **Cambio de formato de archivo de configuración** - Nuevo formato de configuración YAML.
- **Refactorización de la interfaz API** - La interfaz de algunas funciones y clases ha cambiado.
- **Actualización de dependencias** - Se actualizaron varios paquetes de dependencia centrales.

### 🗑️ Funcionalidades eliminadas
- Se eliminó el soporte para Python 2.7.
- Se eliminó el soporte para el formato de configuración XML obsoleto.
- Se eliminó la funcionalidad experimental de fuente de datos de red.

---

## [1.5.2] - 2024-10-10

### 🐛 Correcciones
- Se corrigió un problema de compatibilidad de datos AIRAC 2410.
- Se resolvió un problema de ruta de la base de datos del PMDG 737-900.
- Se corrigió un problema de codificación del archivo de registro.

### 🔧 Mejoras
- Optimización de la gestión del pool de conexiones de la base de datos.
- Mejorada la visualización en chino de los mensajes de error.
- Se actualizó la base de datos de búsqueda de nombres de aeropuertos.

---

## [1.5.1] - 2024-09-28

### 🐛 Correcciones
- Se corrigió la detección de ruta para la versión Steam de MSFS.
- Se resolvió un problema de precisión en el cálculo de la dirección de la pista.
- Se corrigieron errores de análisis de CSV causados por caracteres especiales.

### 📚 Documentación
- Actualización de la descripción de la ruta de MSFS en la guía de instalación.
- Se añadieron soluciones a problemas comunes.

---

## [1.5.0] - 2024-09-15

### 🚀 Novedades
- **Soporte para AIRAC 2409** - Soporte para el último ciclo de regulación de información aeronáutica.
- **Mejoras en los datos de pista** - Se añadió información de tipo de superficie y pendiente de pista.
- **Funcionalidad de copia de seguridad automática** - Copia de seguridad automática de los datos de navegación originales.
- **Informe de validación de datos** - Generación de informes detallados de procesamiento de datos.

### 🔧 Mejoras
- Aumento de la velocidad de procesamiento de datos de grandes aeropuertos.
- Optimización de la eficiencia del uso de memoria.
- Mejora de la información de retroalimentación de la interfaz de usuario.

### 🐛 Correcciones
- Se corrigió un error en los datos de elevación de aeropuertos de gran altitud.
- Se resolvió un problema de manejo de códigos ICAO para ciertos aeropuertos especiales.
- Se corrigió un error de conversión de unidades de longitud de pista.

---

## [1.4.1] - 2024-08-20

### 🐛 Correcciones
- Se corrigió un problema de compatibilidad con Windows 11.
- Se resolvió un problema de bloqueo de base de datos.
- Se corrigió un error de procesamiento de rutas en chino.

### 🔧 Mejoras
- Mejora de la velocidad de inicio.
- Optimización de los mensajes de error.

---

## [1.4.0] - 2024-08-05

### 🚀 Novedades
- **Base de soporte multilingüe** - Se añadió un marco de internacionalización.
- **Funcionalidad de exportación de datos** - Soporte para exportación en múltiples formatos.
- **Monitoreo de rendimiento** - Adición de estadísticas de rendimiento de procesamiento.

### 🔧 Mejoras
- **Optimización de la base de datos** - Rediseño de la estructura de índices, aumento de la velocidad de consulta en un 40%.
- **Gestión de memoria** - Reducción del uso de memoria en un 30%.
- **Experiencia de usuario** - Mejora de los mensajes de error y la visualización de estado.

### 🐛 Correcciones
- Se corrigió un problema de puntos de ruta duplicados.
- Se resolvió un problema de precisión de frecuencia ILS.
- Se corrigió un error de procesamiento de zona horaria.

---

## [1.3.2] - 2024-07-12

### 🐛 Correcciones
- Se corrigió la compatibilidad con la serie PMDG 737 MAX.
- Se resolvió el impacto del horario de verano en las fechas AIRAC.
- Se corrigió un problema de visualización de frecuencia de ciertos equipos de navegación.

---

## [1.3.1] - 2024-06-28

### 🐛 Correcciones
- Se corrigió un problema de procesamiento de rutas en macOS.
- Se resolvió el problema del marcador BOM en archivos CSV.
- Se corrigió un error de validación de conexión de ruta.

### 🔧 Mejoras
- Aumento de la velocidad de lectura de archivos.
- Optimización del formato de salida del registro.

---

## [1.3.0] - 2024-06-15

### 🚀 Novedades
- **Soporte para Linux** - Soporte extendido para sistemas Linux.
- **Validación de configuración** - Se añadió verificación de sintaxis de archivos de configuración.
- **Estadísticas de datos** - Generación de estadísticas detalladas de procesamiento de datos.

### 🔧 Mejoras
- **Compatibilidad multiplataforma** - Unificación del comportamiento en diferentes sistemas operativos.
- **Recuperación de errores** - Mejora de la tolerancia a fallos del procesamiento de datos.
- **Calidad del código** - Refactorización de módulos centrales para mejorar la calidad del código.

### 🐛 Correcciones
- Se corrigió un problema de procesamiento de caracteres no ASCII.
- Se resolvió un problema de tiempo de espera agotado en el procesamiento de archivos grandes.
- Se corrigió un error en el procesamiento de transacciones de base de datos.

---

## [1.2.1] - 2024-05-20

### 🐛 Correcciones
- Se corrigió un error de cálculo de fecha AIRAC.
- Se resolvió un problema de conversión de coordenadas para ciertos aeropuertos.
- Se corrigió un problema de visualización de progreso inexacta.

---

## [1.2.0] - 2024-05-05

### 🚀 Novedades
- **Soporte para AIRAC 2405** - Soporte para el último ciclo de datos de navegación.
- **Modo de procesamiento por lotes** - Soporte para procesar múltiples archivos de datos.
- **Detección de diferencias de datos** - Comparación de diferencias entre datos de diferentes versiones.

### 🔧 Mejoras
- **Velocidad de procesamiento** - Aumento de la velocidad de procesamiento de datos en un 25%.
- **Optimización de memoria** - Optimización del uso de memoria para grandes conjuntos de datos.
- **Nivel de detalle del registro** - Proporciona registros de procesamiento más detallados.

### 🐛 Correcciones
- Se corrigió el manejo de restricciones de altitud de ruta.
- Se resolvió un problema de frecuencias VOR/DME duplicadas.
- Se corrigió la precisión de los datos de elevación del aeropuerto.

---

## [1.1.2] - 2024-04-18

### 🐛 Correcciones
- Se corrigió un problema de soporte de rutas largas en Windows.
- Se resolvió un error de codificación de caracteres especiales.
- Se corrigió un problema de tiempo de espera agotado en la conexión a la base de datos.

---

## [1.1.1] - 2024-04-05

### 🐛 Correcciones
- Se corrigió un problema de ruta de la base de datos del PMDG 737-800.
- Se resolvió un error de cálculo del ángulo de la senda de planeo ILS.
- Se corrigió un problema de puntos de ruta faltantes.

### 📚 Documentación
- Actualización de la guía de instalación.
- Se añadió una sección de solución de problemas.

---

## [1.1.0] - 2024-03-22

### 🚀 Novedades
- **Soporte para procedimientos STAR** - Se añadió procesamiento de procedimientos estándar de llegada terminal.
- **Procedimientos de aproximación** - Soporte para datos de procedimientos de aproximación por instrumentos.
- **Validación de datos mejorada** - Comprobaciones de integridad de datos más estrictas.

### 🔧 Mejoras
- **Optimización de procedimientos SID** - Mejora del procesamiento de procedimientos estándar de salida por instrumentos.
- **Precisión de coordenadas** - Aumento de la precisión del cálculo de coordenadas.
- **Manejo de errores** - Mejores mensajes de error y mecanismo de recuperación.

### 🐛 Correcciones
- Se corrigió la validación del rango de frecuencia NDB.
- Se resolvió un problema de desconexión de ruta.
- Se corrigió el cálculo del rumbo magnético de la pista.

---

## [1.0.0] - 2024-03-01

### 🎉 Primera versión oficial

#### 🚀 Características principales
- **Soporte completo para la serie PMDG 737** - Soporte para todas las variantes del PMDG 737.
- **Conversión completa de datos de navegación** - Datos de aeropuertos, pistas, equipos de navegación, rutas.
- **Optimización para la región de China** - Optimizado específicamente para datos de aviación civil de China.
- **Soporte para AIRAC 2403** - Soporte para el ciclo de información aeronáutica de marzo de 2024.

#### 🛠️ Características técnicas
- **Base de datos SQLite** - Formato de base de datos compatible con PMDG.
- **Soporte para datos de múltiples fuentes** - Soporte para fuentes de datos NAIP y X-Plane.
- **Procesamiento automatizado** - Proceso de conversión de datos con un solo clic.
- **Validación de datos** - Comprobación completa de la calidad de los datos.

#### 📊 Tipos de datos soportados
- Información básica del aeropuerto (Código ICAO, coordenadas, nombre)
- Datos de pista (Longitud, anchura, dirección, superficie)
- Equipos de navegación VOR/DME
- Balizas de navegación NDB
- Puntos de ruta y red de rutas
- Sistema de aterrizaje por instrumentos (ILS)

#### 🎯 Aeronaves soportadas
- PMDG 737-600
- PMDG 737-700
- PMDG 737-800
- PMDG 737-900

#### 🌍 Regiones soportadas
- China continental (Códigos ICAO ZB, ZG, ZS, ZJ, ZY, ZL, ZH, ZU, ZP, ZW)

---

## Planificación de versiones

### 🔮 Planificación de versiones futuras

#### v2.2.0 (Planificado para 2025 Q1)
- **Soporte para aeronaves iniBuilds** - Soporte extendido para la serie de aeronaves iniBuilds.
- **Actualización de datos en tiempo real** - Soporte para actualización de datos AIRAC en línea.
- **Interfaz gráfica de usuario (GUI)** - Adición de aplicación GUI de escritorio.
- **Fuente de datos en la nube** - Soporte para integración de fuentes de datos en la nube.

#### v2.3.0 (Planificado para 2025 Q2)
- **Soporte de datos global** - Extensión a datos de navegación de alcance global.
- **Sistema de plugins personalizado** - Soporte para desarrollo de plugins de terceros.
- **Herramientas de análisis de datos** - Análisis y visualización de datos integrados.
- **REST API** - Provisión de interfaz Web API.

#### v3.0.0 (Planificado para 2025 Q4)
- **Arquitectura de próxima generación** - Arquitectura distribuida basada en microservicios.
- **Optimización con aprendizaje automático** - Procesamiento y optimización inteligente de datos.
- **Soporte para múltiples simuladores** - Soporte para otros simuladores como P3D, FSX.
- **Funcionalidades de nivel empresarial** - Funcionalidades empresariales como alta disponibilidad, balanceo de carga.

---

## 📋 Notas de actualización

### 🔖 Reglas de numeración de versiones
Utilizamos el Control de versiones semántico (SemVer):
- **Número de versión principal** (X.y.z) - Modificaciones de API incompatibles.
- **Número de versión secundaria** (x.Y.z) - Nuevas funcionalidades retrocompatibles.
- **Número de revisión** (x.y.Z) - Correcciones de problemas retrocompatibles.

### 🏷️ Descripción de tipos de cambio
- **🚀 Novedades (Added)** - Nuevas funcionalidades
- **🔧 Mejoras (Changed)** - Modificaciones a funcionalidades existentes
- **🗑️ Obsoleto (Deprecated)** - Funcionalidades que serán eliminadas pronto
- **🗑️ Eliminado (Removed)** - Funcionalidades ya eliminadas
- **🐛 Correcciones (Fixed)** - Solución de problemas
- **🔒 Seguridad (Security)** - Correcciones relacionadas con la seguridad

### 📅 Ciclo de lanzamiento
- **Versión principal** - 1-2 actualizaciones importantes al año.
- **Versión secundaria** - Actualizaciones de funcionalidades trimestrales.
- **Versión de revisión** - Lanzamiento de correcciones de errores según sea necesario.

### 🔗 Obtener actualizaciones
- **GitHub Releases** - Obtener la última versión y el registro detallado de cambios.
- **Notificaciones automáticas** - Suscribirse a las notificaciones de lanzamiento para obtener las actualizaciones de inmediato.
- **Pruebas Beta** - Participar en el programa de pruebas Beta para experimentar nuevas funcionalidades.

---

**Nota**: Para ver los cambios detallados de una versión específica, visite la página de [GitHub Releases](https://github.com/Nav-data/releases).
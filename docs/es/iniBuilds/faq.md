# 🙋 Preguntas Frecuentes (FAQ)

## 📥 Relacionado con la Instalación

### Q1: ¿Qué sistemas operativos son compatibles?
**A:**
- ✅ **Windows 10/11** (Recomendado)
- ✅ **macOS 10.15+** (Catalina y superior)
- ✅ **Ubuntu 20.04+ / Debian 11+**
- ✅ **Otras distribuciones principales de Linux**

### Q2: ¿Cuáles son los requisitos del entorno Python?
**A:**
- **Versión mínima**: Python 3.8
- **Versión recomendada**: Python 3.9 o 3.10
- **No compatible**: Python 3.7 y versiones inferiores
- **Entornos virtuales**: Se recomienda encarecidamente utilizar venv o conda

### Q3: ¿Cuánto espacio de almacenamiento se necesita?
**A:**
- **Herramienta en sí**: ~50MB
- **Paquetes de dependencias**: ~200MB
- **Espacio de procesamiento temporal**: 1-2GB
- **Datos de salida**: 500MB-1GB (dependiendo del área de cobertura)
- **Total recomendado**: al menos 4GB de espacio disponible

### Q4: ¿Cuáles son los requisitos de memoria?
**A:**
- **Mínimo**: 4GB RAM
- **Recomendado**: 8GB+ RAM
- **Conversiones a gran escala**: 16GB+ RAM
- **Memoria virtual**: Se recomienda configurar a 1.5 veces la memoria física

## ⚙️ Relacionado con la Configuración

### Q5: ¿Cómo obtener datos de navegación?
**A:** Fuentes de datos recomendadas:
- **Navigraph** (Preferida) - Cobertura global, ciclo de actualización de 28 días
- **X-Plane datos** - Gratuito, pero con menor frecuencia de actualización
- **NAIP datos** - Optimizado para la región asiática
- **Fuentes de datos personalizadas** - Soporta formato ARINC 424

### Q6: ¿Cómo se entiende el ciclo AIRAC?
**A:**
- **Duración del ciclo**: Un ciclo cada 28 días
- **Fecha de entrada en vigor**: Una fecha específica cada mes (normalmente un jueves)
- **Formato de versión**: YYYY-CC (ej. 2024-01 indica el primer ciclo de 2024)
- **Validez**: 28 días, se recomienda actualizar después de la caducidad

### Q7: ¿Qué formatos de datos son compatibles?
**A:**
**Formatos de entrada**:
- ✅ ARINC 424 (.dat, .txt)
- ✅ X-Plane (.dat, .txt)
- ✅ NAIP (.xml, .json)
- ✅ CIFP (.xml)

**Formatos de salida**:
- ✅ iniBuilds A350 formato nativo
- ✅ Base de datos SQLite
- ✅ Archivos de configuración JSON
- ✅ Formato de exportación XML

### Q8: ¿Cómo configurar la prioridad de las fuentes de datos?
**A:** Configurar en el archivo de configuración:
```json
{
  "data_sources": {
    "priority_order": ["navigraph", "naip", "xplane"],
    "fallback_enabled": true,
    "merge_strategy": "priority_override"
  }
}
```

## 🔄 Relacionado con el Uso

### Q9: ¿Cuánto tiempo tarda el proceso de conversión?
**A:** Estimación del tiempo de procesamiento:
- **Aeropuerto individual**: 30 segundos - 2 minutos
- **Área urbana** (ej. alrededores de Beijing): 5-10 minutos
- **Área provincial** (ej. provincia de Guangdong): 15-30 minutos
- **Nivel nacional** (ej. toda China): 45-90 minutos
- **Datos globales**: 2-4 horas

### Q10: ¿Se pueden realizar actualizaciones incrementales?
**A:** Soporta actualizaciones incrementales inteligentes:
```bash
# Solo actualiza los datos modificados
python converter.py --incremental --since-date=2024-01-01

# Actualizar basado en el ciclo AIRAC
python converter.py --update-airac --from=2024-01 --to=2024-02
```

### Q11: ¿Cómo verificar los resultados de la conversión?
**A:** Verificación multicapa integrada:
```bash
# Verificación rápida
python validate.py --quick-check

# Verificación completa
python validate.py --comprehensive --report=html

# Comparar con datos de referencia
python validate.py --compare-with=reference_data.db
```

### Q12: ¿Soporta procesamiento por lotes?
**A:** Soporta varios modos de procesamiento por lotes:
```bash
# Procesar múltiples ciclos AIRAC en lote
python batch_converter.py --airac-range=2024-01:2024-06

# Procesar múltiples regiones en lote
python batch_converter.py --regions=ZSPD,ZBAA,ZGGG --parallel=4
```

## ✈️ Integración con iniBuilds

### Q13: ¿Qué aeronaves de iniBuilds son compatibles?
**A:** Actualmente compatibles:
- ✅ **A350-900** - Soporte completo para todos los sistemas
- ✅ **A350-900ULR** - Versión de ultra largo alcance
- ✅ **A350-1000** - Versión extendida
- 🔄 **Serie A320neo** - En desarrollo
- 🔄 **Serie A330** - Soporte planificado

### Q14: ¿Dónde se instalan los datos?
**A:** Detección automática de la ruta de instalación:
- **Ruta predeterminada**: `carpeta de la comunidad de MSFS/inibuilds-aircraft-a350/SimObjects/`
- **Versión Steam**: `C:/Users/[usuario]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalState/packages/`
- **Versión Microsoft Store**: Similar a la versión Steam, pero con un ID de paquete diferente
- **Ruta personalizada**: Se puede especificar en la configuración

### Q15: ¿Cómo confirmar que los datos se han cargado correctamente?
**A:** Pasos de verificación:
1. **Pantalla del MCDU**: Verificar si el ciclo AIRAC es correcto
2. **Planificación de rutas**: Intentar planificar una ruta conocida
3. **Recuperación de puntos de navegación**: Buscar un punto de navegación específico
4. **Carga de procedimientos**: Cargar procedimientos SID/STAR

### Q16: ¿Es compatible con otras herramientas de datos de navegación?
**A:**
- ⚠️ **No se recomienda** utilizar simultáneamente con otras herramientas
- 🔄 **Detección de conflictos**: La herramienta detectará y advertirá automáticamente sobre conflictos
- 🛠️ **Herramienta de limpieza**: Ofrece la función de limpiar datos de otras herramientas con un solo clic
- 📋 **Copia de seguridad y restauración**: Permite la copia de seguridad automática antes de cambiar de herramienta

## 🌍 Cobertura Geográfica

### Q17: ¿Qué regiones cubre principalmente?
**A:** Áreas de cobertura detalladas:
- 🇨🇳 **China continental**: Todas las regiones ICAO (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- 🇭🇰 **Hong Kong**: Región VH
- 🇲🇴 **Macao**: Región VM
- 🇹🇼 **Taiwán**: Región RC
- 🇻🇳 **Vietnam**: Región VV
- 🇰🇷 **Corea del Sur**: Región RK (parcial)
- 🌏 **Otras regiones asiáticas**: La calidad de los datos varía según la región

### Q18: ¿Cuál es la precisión de los datos?
**A:** Especificaciones de precisión:
- **Precisión de coordenadas**: 8 decimales (aproximadamente 1 metro de precisión)
- **Precisión de altitud**: 1 pie
- **Precisión de frecuencia**: 0.01 MHz
- **Declinación magnética**: Cálculo en tiempo real, utilizando el modelo WMM2020
- **Frecuencia de actualización**: Sigue el ciclo AIRAC de 28 días

### Q19: ¿Qué tipos de datos de navegación se incluyen?
**A:** Tipos de datos completos:
- ✈️ **Información de aeropuertos**: Código OACI, coordenadas, declinación magnética, información de pistas
- 📡 **Equipos de navegación**: VOR, DME, NDB, TACAN
- 📍 **Puntos de ruta (waypoints)**: Coordenadas, clasificación de área, identificador de uso
- 🛣️ **Red de rutas aéreas**: Rutas de alto/bajo nivel, relaciones de conexión
- 🛫 **Procedimientos de salida**: SID (Salida Instrumental Estándar)
- 🛬 **Procedimientos de llegada**: STAR (Ruta Estándar de Llegada Terminal)
- 📐 **Procedimientos de aproximación**: ILS, VOR, NDB, RNAV y otros tipos de aproximaciones
- 📶 **Sistemas de aterrizaje**: Información de guía ILS/GLS

### Q20: ¿Cuál es el nivel de localización al chino?
**A:**
- ✅ **Nombres de aeropuertos**: en chino e inglés
- ✅ **Nombres de ciudades**: Soporte completo para el chino
- ✅ **Nombres de puntos de ruta (waypoints)**: Identificadores Pinyin y chinos
- ✅ **Nombres de procedimientos**: Reglas de nomenclatura localizadas
- ✅ **Interfaz de usuario**: Interfaz completamente en chino

## 🔧 Relacionado con la Tecnología

### Q21: ¿Cómo habilitar el registro detallado?
**A:**
```bash
# Modo de depuración básico
python converter.py --debug

# Modo de registro detallado
python converter.py --verbose --log-level=DEBUG

# Guardar registro en archivo
python converter.py --log-file=debug_$(date +%Y%m%d).log
```

### Q22: ¿Soporta procesamiento multihilo?
**A:** Procesamiento paralelo inteligente:
```bash
# Detección automática del número de núcleos de CPU
python converter.py --parallel=auto

# Especificar número de hilos
python converter.py --parallel=4

# Paralelización con límite de memoria
python converter.py --parallel=2 --memory-limit=4GB
```

### Q23: ¿Cómo monitorear el progreso de la conversión?
**A:** Múltiples formas de monitorear el progreso:
- **Barra de progreso en consola**: Muestra el porcentaje de finalización en tiempo real
- **Interfaz web**: Interfaz de monitoreo en navegador opcional
- **Archivo de registro**: Registro detallado del progreso por etapas
- **API de estado**: Interfaz de consulta de progreso en formato JSON

### Q24: ¿Soporta implementación automatizada?
**A:** Soporte completo para la automatización:
```bash
# Modo de tarea programada
python scheduler.py --schedule=weekly --auto-update

# Integración CI/CD
python converter.py --batch --no-interaction --exit-on-error

# Despliegue en contenedor Docker
docker run nav-data/converter --config=/app/config.json
```

## 🔍 Optimización del Rendimiento

### Q25: ¿Cómo aumentar la velocidad de conversión?
**A:** Sugerencias para la optimización del rendimiento:
- 💾 **Usar SSD**: Mejora significativamente el rendimiento de E/S
- 🧠 **Aumentar la memoria RAM**: Reduce el intercambio de disco
- ⚡ **Habilitar paralelismo**: Aprovechar CPU multinúcleo
- 🗜️ **Compresión de datos**: Reduce el tiempo de transmisión de red
- 🎯 **Filtrado por región**: Solo procesar las regiones necesarias

### Q26: ¿Qué hacer si el uso de memoria es demasiado alto?
**A:** Estrategias de optimización de memoria:
```bash
# Habilitar procesamiento por streaming
python converter.py --streaming --chunk-size=1MB

# Limitar el uso de memoria
python converter.py --max-memory=2GB

# Optimización de archivos temporales
python converter.py --temp-dir=/tmp --cleanup-temp
```

### Q27: ¿Cómo manejar los problemas de red?
**A:** Soluciones de optimización de red:
- 🌐 **Modo sin conexión**: Descargar todos los datos previamente
- 🔄 **Reanudación de descarga**: Reanuda automáticamente después de una interrupción de red
- 🚀 **Aceleración CDN**: Usar servidores cercanos
- 📦 **Caché de datos**: Reduce las descargas repetidas

## 🛡️ Seguridad de Datos

### Q28: ¿Son seguros los datos?
**A:** Múltiples garantías de seguridad:
- 🔒 **Cifrado de transmisión**: HTTPS/TLS 1.3
- 🔐 **Cifrado de almacenamiento**: Cifrado de archivos AES-256
- ✅ **Verificación de integridad**: Verificación hash SHA-256
- 🔍 **Verificación de origen**: Verificación de firma digital
- 🚫 **Protección de privacidad**: No se recopila información personal

### Q29: ¿Cómo realizar copias de seguridad y restaurar?
**A:** Solución de copia de seguridad completa:
```bash
# Crear copia de seguridad completa
python backup.py --full --compress --encrypt

# Copia de seguridad incremental
python backup.py --incremental --since-date=2024-01-01

# Restaurar copia de seguridad
python restore.py --backup-id=20240115_143022 --verify
```

## 🆘 Obtener Ayuda

### Q30: ¿Qué hacer si encuentro un problema?
**A:** Sistema de soporte completo:

**1. Autodiagnóstico**:
```bash
# Ejecutar diagnóstico del sistema
python diagnostic.py --comprehensive --report=html

# Comprobar problemas comunes
python health_check.py --fix-common-issues
```

**2. Soporte de la comunidad**:
- 📖 [Manual de usuario](guide/index.md)
- 🔧 [Guía de solución de problemas](troubleshooting.md)
- 💬 [Debates de GitHub](https://github.com/nav-data/docs/discussions)
- 🐛 [Informes de problemas](https://github.com/nav-data/docs/issues)

**3. Contacto directo**:
- 📧 **Soporte técnico**: technical@nav-data.org
- 🚨 **Problemas urgentes**: urgent@nav-data.org
- 💬 **Consultas generales**: info@nav-data.org

### Q31: ¿Cómo contribuir y enviar comentarios?
**A:** Múltiples formas de participar:
- 🐛 **Informes de errores**: GitHub Issues
- 💡 **Sugerencias de características**: GitHub Discussions
- 📝 **Mejoras en la documentación**: Pull Request
- 💻 **Contribuciones de código**: Ver [Guía de contribución](contributing.md)
- 🌐 **Localización**: Ayudar a traducir la documentación

### Q32: ¿Hay material de capacitación disponible?
**A:** Amplios recursos de aprendizaje:
- 📹 **Tutoriales en video**: Canal de YouTube y Bilibili
- 📚 **Manual de usuario**: Versiones PDF y en línea
- 🎓 **Cursos en línea**: Tutoriales interactivos paso a paso
- 📋 **Guía rápida**: Inicio rápido en 5 minutos
- 🔬 **Consejos avanzados**: Técnicas de uso expertas

---

## 🔍 ¿No encuentras la respuesta?

Si tu pregunta no se encuentra en estas FAQ, por favor:

1. 🔍 **Utiliza la búsqueda**: función de búsqueda en la parte superior de la página
2. 📖 **Consulta la documentación**: [Guía de usuario completa](guide/index.md)
3. 🛠️ **Solución de problemas**: [Guía de resolución de problemas](troubleshooting.md)
4. 💬 **Debates de la comunidad**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
5. 📧 **Contacto directo**: support@nav-data.org

Nos comprometemos a responder a todas las consultas técnicas en un plazo de 24 horas. ¡Gracias por elegir Nav-data!

---

## 📊 Estadísticas de Uso

**Ranking de preguntas frecuentes** (basado en los comentarios de los usuarios):
1. **Problemas de instalación y configuración** - 35%
2. **Relacionado con los formatos de datos** - 22%
3. **Optimización del rendimiento** - 18%
4. **Integración con iniBuilds** - 15%
5. **Solución de problemas** - 10%

**Satisfacción del usuario**: ⭐⭐⭐⭐⭐ 4.8/5.0 (basado en más de 1,200 valoraciones de usuarios)

**Mejora continua**: Actualizamos el contenido de las FAQ mensualmente para garantizar la actualidad y precisión de la información.
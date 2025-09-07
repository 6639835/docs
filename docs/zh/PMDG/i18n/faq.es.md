# 🙋 Preguntas Frecuentes (FAQ)

## 📥 Relacionado con la Instalación

### Q1: ¿Cuáles son los requisitos mínimos del sistema?
**A:**
- **Sistema Operativo**: Windows 10/11, macOS 10.15+, Linux
- **Versión de Python**: 3.8+ (se recomienda 3.9 o superior)
- **RAM**: Al menos 4 GB de RAM (se recomienda 8 GB o más)
- **Espacio de Almacenamiento**: Al menos 2 GB de espacio disponible
- **Versión de MSFS**: Microsoft Flight Simulator 2020 o 2024

### Q2: ¿Qué versiones de Python son compatibles?
**A:** Se admiten las versiones de Python 3.8 y superiores. Se recomienda usar Python 3.9 o 3.10 para obtener el mejor rendimiento y compatibilidad.

### Q3: ¿Se requieren permisos de administrador?
**A:** Sí, en sistemas Windows se requieren permisos de administrador para acceder al directorio de instalación de MSFS y para escribir archivos de datos.

### Q4: ¿Se puede instalar en un entorno virtual?
**A:** Se recomienda encarecidamente utilizar un entorno virtual (como venv o conda) para aislar las dependencias y evitar conflictos con otros proyectos de Python.

## ⚙️ Relacionado con la Configuración

### Q5: ¿Cómo obtener datos AIRAC válidos?
**A:** Necesita suscribirse a uno de los siguientes servicios:
- **Navigraph**: Ofrece datos de navegación globales completos (recomendado)
- **Aerosoft NavDataPro**: Para Europa y algunas regiones
- **Jeppesen**: Servicio de datos de navegación de grado comercial

### Q6: ¿Qué es el ciclo AIRAC? ¿Con qué frecuencia se necesita actualizar?
**A:** AIRAC (Aeronautical Information Regulation and Control) es un ciclo de actualización de información aeronáutica estándar internacional, que se actualiza cada 28 días. Se recomienda mantenerse sincronizado con el ciclo AIRAC del mundo real.

### Q7: ¿Dónde se deben guardar los archivos de datos?
**A:**
```
Estructura de directorio recomendada:
C:/Nav-data/
├── input/          # Archivos de datos sin procesar de entrada
│   ├── AIRAC2024-01/
│   └── ...
├── output/         # Archivos convertidos en formato PMDG
└── backup/         # Copia de seguridad de los datos
```

### Q8: ¿Cómo verificar si la configuración es correcta?
**A:** Ejecute el comando de verificación de configuración incorporado:
```bash
python verify_config.py --check-all
```

## 🔄 Relacionado con el Uso

### Q9: ¿Cuánto tiempo lleva el proceso de conversión?
**A:** Dependiendo del volumen de datos y el rendimiento del sistema:
- **Conjuntos de datos pequeños** (un solo aeropuerto): 1-2 minutos
- **Conjuntos de datos regionales**: 5-15 minutos
- **Conjuntos de datos globales**: 30-60 minutos

### Q10: ¿Se pueden convertir solo los datos de una región específica?
**A:** Sí, se admite el filtrado por región:
```bash
python converter.py --region ZSPD --include-sids --include-stars
```

### Q11: ¿Cómo hacer una copia de seguridad de los datos existentes?
**A:** Se crea automáticamente una copia de seguridad antes de la conversión; también puede hacerla manualmente:
```bash
python backup_tool.py --create-backup --date-suffix
```

### Q12: ¿Dónde se almacenan los datos convertidos?
**A:**
- **Ubicación predeterminada**: `%LOCALAPPDATA%/Lockheed Martin/Prepar3D v5/PMDG/Nav Data/`
- **MSFS versión Steam**: `C:/Users/[nombre de usuario]/AppData/Local/Packages/Microsoft.FlightSimulator_[ID]/LocalCache/PMDG/`
- **Versión de Microsoft Store**: Similar a la versión de Steam, pero con un ID diferente

## ✈️ Relacionado con la Compatibilidad

### Q13: ¿Qué aeronaves PMDG son compatibles?
**A:**
- ✅ **PMDG 737-600/700/800/900** (toda la serie)
- ✅ **PMDG 777-300ER**
- ✅ **PMDG 777F** (versión carguero)
- 🔄 **PMDG 747-8** (soporte planificado)

### Q14: ¿Es compatible con MSFS 2024?
**A:** Sí, es totalmente compatible con Microsoft Flight Simulator 2024. Asegúrese de usar la última versión de la herramienta de conversión.

### Q15: ¿Se puede usar simultáneamente con otras herramientas de datos de navegación?
**A:** No se recomienda usar varias herramientas de datos de navegación simultáneamente, ya que podría provocar conflictos de datos. Antes de usar, haga una copia de seguridad y elimine los datos de otras herramientas.

### Q16: ¿Se admiten complementos de aeropuertos de terceros?
**A:** Sí, se admite, pero debe asegurarse de que:
- Los aeropuertos de terceros utilizan códigos ICAO estándar
- Los datos de navegación incluyen información sobre dicho aeropuerto
- El complemento del aeropuerto es compatible con la aeronave PMDG

## 🌍 Relacionado con los Datos

### Q17: ¿Qué datos de regiones son compatibles?
**A:** Regiones de cobertura principal:
- ✅ **Toda la China continental** (ZB, ZS, ZJ, ZG, ZY, ZL, ZU, ZW, ZP, ZH)
- ✅ **Hong Kong, Macao** (VH, VM)
- ✅ **Región de Taiwán** (RC)
- ✅ **Parte del Sudeste Asiático** (VT, VH, WS)
- ⚠️ **Otras regiones** (la calidad de los datos puede ser limitada)

### Q18: ¿Cuál es la precisión de los datos?
**A:**
- **Estándar AIRAC**: Sigue estrictamente los estándares de la OACI (Organización de Aviación Civil Internacional)
- **Nivel de precisión**: Soporta coordenadas con una precisión de 8 decimales
- **Mecanismo de verificación**: Verificación de datos multinivel e integridad incorporadas
- **Frecuencia de actualización**: Se actualiza siguiendo el ciclo AIRAC oficial

### Q19: ¿Cómo verificar la integridad de los datos?
**A:** Utilice la herramienta de verificación incorporada:
```bash
python validate_data.py --comprehensive --output-report
```

### Q20: ¿Los datos incluyen contenido en chino?
**A:** Sí, se admite el chino:
- Nombres de aeropuertos en chino e inglés
- Identificadores de puntos de navegación en chino e inglés
- Localización de nombres de procedimientos

## 🔧 Relacionado con la Tecnología

### Q21: ¿Cómo habilitar el modo de depuración?
**A:**
```bash
python converter.py --debug --verbose --log-file=debug.log
```

### Q22: ¿Dónde están los archivos de registro?
**A:**
- **Ubicación predeterminada**: `./logs/converter_[fecha].log`
- **Registro de depuración**: `./logs/debug_[fecha].log`
- **Registro de errores**: `./logs/error_[fecha].log`

### Q23: ¿Cómo optimizar el rendimiento de la conversión?
**A:**
- Usar almacenamiento SSD
- Aumentar la RAM a más de 8 GB
- Habilitar procesamiento multiproceso: `--parallel=4`
- Cerrar programas en segundo plano innecesarios

### Q24: ¿Se admite el procesamiento por lotes desde la línea de comandos?
**A:** Sí, se admite una interfaz de línea de comandos completa:
```bash
# Conversión por lotes
python converter.py --batch --config-file=batch_config.json

# Tarea programada
python scheduler.py --schedule-weekly --auto-update
```

## 🆘 Obtener Ayuda

### Q25: ¿Cómo obtener soporte si encuentro un problema?
**A:**
1. **Revisar los archivos de registro** - para comprender la información específica del error
2. **Consultar la documentación** - leer las descripciones de las secciones relevantes
3. **Buscar problemas conocidos** - ver [GitHub Issues](https://github.com/nav-data/docs/issues)
4. **Enviar un nuevo problema** - incluyendo registros completos e información del sistema
5. **Discusiones de la comunidad** - participar en [GitHub Discussions](https://github.com/nav-data/docs/discussions)

### Q26: ¿Cómo reportar un Bug?
**A:** Por favor, repórtelo en GitHub Issues, incluyendo:
- Descripción detallada del error
- Registro de errores completo
- Información del entorno del sistema
- Pasos para reproducir
- Resultado esperado vs. resultado real

### Q27: ¿Se puede contribuir con código?
**A:** ¡Por supuesto, es bienvenido! Por favor, consulte:
- [Guía de Contribución](contributing.md)
- [Estándares de Codificación](contributing.md#代码规范)
- [Proceso de Envío](contributing.md#提交流程)

---

## 🔍 ¿No encuentra la respuesta?

Si su pregunta no está en esta lista, por favor:

1. 📖 Consulte la [Guía de Solución de Problemas](troubleshooting.md)
2. 🔍 Use la función de búsqueda en la parte superior de la página
3. 💬 Pregunte en [GitHub Discussions](https://github.com/nav-data/docs/discussions)
4. 📧 Envíe un correo electrónico a: support@nav-data.org

Actualizaremos continuamente este FAQ, ¡agradecemos sus comentarios y sugerencias!
# Guía de configuración

Este documento detalla las opciones de configuración y los ajustes de parámetros para los diferentes módulos de Nav-data.

## 📋 Visión general de los archivos de configuración

### Archivos de configuración principales
```
config/
├── main.conf           # Archivo de configuración principal
├── airway.conf         # Configuración de procesamiento de aerovías
├── pdf_extract.conf    # Configuración de extracción de PDF
├── terminal.conf       # Configuración del programa de terminal
└── paths.conf          # Configuración de rutas
```

### Configuración de variables de entorno
```bash
# Ejemplo de archivo .env
NAV_DATA_HOME=/path/to/nav-data
XPLANE_PATH=/path/to/X-Plane
LOG_LEVEL=INFO
```

## 🛣️ Configuración del módulo de aerovías (Airway)

### Archivo de configuración: `config/airway.conf`

```ini
[General]
# Habilitar registro detallado
verbose_logging = true

# Mostrar barra de progreso
show_progress = true

# Tamaño de lote
batch_size = 1000

[Input]
# Ruta del archivo de entrada CSV
csv_file = RTE_SEG.csv

# Archivos de datos de referencia de X-Plane
earth_fix_file = earth_fix.dat
earth_nav_file = earth_nav.dat
earth_awy_file = earth_awy.dat

[Output]
# Codificación del archivo de salida
output_encoding = utf-8

# Crear copia de seguridad del archivo original
create_backup = true

# Sufijo del archivo de copia de seguridad
backup_suffix = .backup

[Filtering]
# Códigos de área de espacio aéreo excluidos (separados por comas)
excluded_areas = ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU

# Longitud mínima del segmento de aerovía (millas náuticas)
min_segment_length = 0.1

# Longitud máxima del segmento de aerovía (millas náuticas)
max_segment_length = 999.9

[Validation]
# Habilitar validación de datos
enable_validation = true

# Tolerancia de punto de navegación (grados)
coordinate_tolerance = 0.001

# Validación de códigos de área
validate_area_codes = true

[AIRAC]
# Calcular ciclo AIRAC automáticamente
auto_calculate_cycle = true

# Especificar ciclo AIRAC manualmente (formato: AAMM)
manual_cycle = 

# Fecha de referencia AIRAC (formato ISO)
reference_date = 2025-01-23

# Ciclo de referencia
reference_cycle = 2501
```

### Opciones de configuración en el código

#### Configuración del script principal de procesamiento de aerovías
```python
# Ejemplo de configuración de Airway/airway.py

# Configuración de códigos de espacio aéreo de China
CHINA_AREAS = {
    'ZB',  # FIR de Pekín
    'ZG',  # FIR de Cantón
    'ZY',  # FIR de Shenyang
    'ZS',  # FIR de Shanghái
    'ZW',  # FIR de Urumqi
    'ZJ',  # FIR de Sanya
    'ZP',  # FIR de Lanzhou
    'ZL',  # FIR de Kunming
    'ZH',  # FIR de Wuhan
    'ZU'   # FIR de Chengdu
}

# Configuración de rutas de archivo
FILE_PATHS = {
    'csv_input': 'RTE_SEG.csv',
    'earth_fix': 'earth_fix.dat',
    'earth_nav': 'earth_nav.dat',
    'earth_awy': 'earth_awy.dat'
}

# Mapeo de tipos de puntos de navegación
NAVIGATION_TYPES = {
    'DESIGNATED_POINT': {'code': 'DESIGNATED_POINT', 'type_code': '11'},
    'VORDME': {'code': 'VORDME', 'type_code': '3'},
    'NDB': {'code': 'NDB', 'type_code': '2'}
}
```

## 📄 Configuración del módulo de extracción de PDF

### Archivo de configuración: `config/pdf_extract.conf`

```ini
[General]
# Modo de procesamiento: auto (automático), manual (manual)
processing_mode = auto

# Formato de salida: txt, json, csv
output_format = txt

# Codificación de caracteres
encoding = utf-8

[PDF_Processing]
# Motor de análisis de PDF: pdfplumber, pypdf2
pdf_engine = pdfplumber

# Márgenes de recorte de página (píxeles)
crop_margin_top = 50
crop_margin_bottom = 50
crop_margin_left = 30
crop_margin_right = 30

# Umbral de confianza de extracción de texto
text_confidence_threshold = 0.8

# Umbral de detección de líneas
line_detection_threshold = 5

[Coordinate_Extraction]
# Validación de formato de coordenadas
coordinate_format_strict = true

# Precisión de coordenadas (número de decimales)
coordinate_precision = 8

# Validación de rango de coordenadas (región de China)
latitude_min = 15.0
latitude_max = 55.0
longitude_min = 70.0
longitude_max = 140.0

[Error_Handling]
# Continuar procesamiento al encontrar errores
continue_on_error = true

# Nivel de detalle del registro de errores
error_detail_level = high

# Reparar errores comunes automáticamente
auto_fix_common_errors = true

[Output]
# Patrón de nombres de archivos de salida
# Variables: {airport}, {type}, {timestamp}
filename_pattern = {airport}_{type}.txt

# Crear directorios de salida
create_output_dirs = true

# Sobrescribir archivos existentes
overwrite_existing = false
```

### Ejemplo de configuración de código

#### Configuración de procesamiento de PDF
```python
# Configuración de PDF extract/utils.py

# Definición de categorías de puntos de ruta
WAYPOINT_CATEGORIES = {
    'ENRT': 1,      # Punto de ruta
    'VHF': 2,       # Ayuda a la navegación VHF
    'NDB': 3,       # Ayuda a la navegación NDB
    'TERMINAL': 4   # Punto de ruta de área terminal
}

# Precisión de procesamiento de coordenadas
COORDINATE_PRECISION = 8

# Tabla de conversión de códigos de área
AREA_CODE_TRANSLATION = {
    'KA': 'K1'  # Conversión de código de área especial
}

# Configuración de color para mensajes de error (usando colorama)
COLOR_CONFIG = {
    'error': Fore.RED,
    'warning': Fore.YELLOW,
    'info': Fore.GREEN,
    'debug': Fore.CYAN
}
```

#### Configuración de extracción de coordenadas
```python
# Configuración de PDF extract/waypoint_1_pdf.py

# Configuración de procesamiento de páginas
PAGE_PROCESSING = {
    'enable_text_lines': True,
    'debug_output': False,
    'max_lines_per_page': 1000
}

# Configuración de cálculo de coordenadas
COORDINATE_CALCULATION = {
    'precision_digits': 8,
    'handle_number_prefix': True,
    'auto_format_detection': True
}

# Configuración de procesamiento de caracteres
CHARACTER_PROCESSING = {
    'degree_symbol_replacement': '°',
    'minute_symbol_replacement': "'",
    'second_symbol_replacement': '"',
    'special_char_mapping': {"¡ã": '°'}
}
```

## 🔧 Configuración del programa de terminal (Terminal Patch)

### Archivo de configuración: `config/terminal.conf`

```ini
[Encoder]
# Ruta de entrada predeterminada
default_input_path = PDF extract/public

# Ruta de salida predeterminada
default_output_path = PDF extract/output

# Codificación de archivo
file_encoding = utf-8

# Habilitar validación de codificación
enable_encoding_validation = true

[Processing_Rules]
# Regla de identificación de punto IF
if_point_markers = c

# Reglas de codificación
encoding_rules = {
    'if_line': 'E  A',
    'transition_middle': 'E   ',
    'transition_end': 'EE B',
    'main_approach_if': 'E  B',
    'faf_point': 'E  F',
    'missed_approach': 'E M ',
    'procedure_end': 'EE  ',
    'holding_end': 'EE H'
}

[ReEncoder]
# Prefijos de códigos de aeropuerto admitidos
supported_airport_prefixes = ZB,ZG,ZL,ZU,ZW,ZY,ZJ,ZS,ZH,ZP

# Detección de codificación de archivo
auto_detect_encoding = true

# Reglas de reparación de codificación
fix_rules = {
    'appch_gy_m_rule': true,
    'pure_alpha_rule': true,
    'sid_runway_rule': true,
    'procedure_end_rule': true
}

[Validation]
# Validación de formato
validate_format = true

# Validación de identificadores de pista
validate_runway_identifiers = true

# Validación de tipos de procedimiento
validate_procedure_types = true
```

### Ejemplo de configuración del codificador

```python
# Configuración de Terminal Patch/terminal_encoder.py

# Identificadores de tipo de procedimiento
PROCEDURE_MARKERS = {
    'approach': 'c',
    'departure': 'd',
    'arrival': 'a'
}

# Mapeos de codificación
ENCODING_MAPPINGS = {
    'IF_LINE': 'E  A',
    'TRANSITION_MIDDLE': 'E   ',
    'TRANSITION_END': 'EE B',
    'MAIN_APPROACH_IF': 'E  B', 
    'FAF_POINT': 'E  F',
    'MISSED_APPROACH_FIRST': 'E M ',
    'PROCEDURE_END': 'EE  ',
    'HOLDING_END': 'EE H'
}

# Configuración de procesamiento de archivos
FILE_PROCESSING = {
    'batch_mode': True,
    'show_progress': True,
    'create_backup': False,
    'output_encoding': 'utf-8'
}
```

## 🛩️ Configuración del módulo X-Plane CIFP

### Archivo de configuración: `config/cifp.conf`

```ini
[General]
# Compatibilidad de versión de X-Plane
xplane_version = 12

# Versión del formato de datos CIFP
cifp_format_version = 1101

[Paths]
# Ruta de datos de entrada
input_path = /Users/lujuncheng/Downloads/XP导航数据/编码重构

# Carpeta de salida
output_folder = /Users/lujuncheng/Downloads/XP导航数据/CIFP

# Ruta de instalación de X-Plane
xplane_path = /Users/lujuncheng/Downloads/xplane12_native_2502

# Carpeta de datos CSV
csv_folder = /Users/lujuncheng/Downloads/NAIP2502

[Processing]
# Procesar tipos de procedimiento
process_departures = true
process_arrivals = true
process_approaches = true

# Generar información de pista
generate_runway_info = true

# Habilitar modo de mezcla de procedimientos
enable_procedure_mixing = true

[NavAid_Processing]
# Archivo de datos VOR
vor_data_file = VOR.csv

# Archivo de datos NDB  
ndb_data_file = NDB.csv

# Conversión de frecuencia
frequency_conversion = true

# Factor de conversión de unidades de altitud (metros a pies)
altitude_conversion_factor = 3.28

[Waypoint_Processing]
# Codificación de tipo de punto de ruta
waypoint_type_coding = true

# Compatibilidad ARINC 424
arinc424_compatibility = true

# Procesar códigos de área
process_area_codes = true

[Validation]
# Tolerancia de validación de coordenadas
coordinate_tolerance = 0.2

# Validación de identificadores de punto de ruta
validate_identifiers = true

# Comprobación de integridad de procedimiento
validate_procedure_integrity = true
```

### Configuración del sistema de puntos de ruta

```python
# Configuración de X-Plane CIFP/utils.py

# Definición de categorías de puntos de ruta
WAYPOINT_CATEGORIES = {
    'UNAVAILABLE': -1,  # Estado no disponible
    'WAYPOINT': 1,      # Punto de ruta
    'VHF_NAVAID': 2,    # Equipo de navegación VHF
    'NDB_NAVAID': 3     # Equipo de navegación NDB
}

# Tolerancia de comparación de coordenadas (grados)
COORDINATE_TOLERANCE = 0.2

# Mapeo de códigos de área
AREA_CODE_MAPPING = {
    # Códigos FIR de China
    'ZBPE': 'ZB',  # Pekín
    'ZGZU': 'ZG',  # Cantón
    'ZYSH': 'ZY',  # Shenyang
    'ZSHA': 'ZS',  # Shanghái
    'ZWUQ': 'ZW',  # Urumqi
    'ZJSA': 'ZJ',  # Sanya
    'ZLHW': 'ZL',  # Lanzhou
    'ZUCK': 'ZU',  # Chengdu
    'ZHWH': 'ZH'   # Wuhan
}
```

## 📊 Configuración de procesamiento de datos

### Configuración de datos CSV

```python
# Configuración de procesamiento CSV general
CSV_CONFIG = {
    'encoding': 'gbk',          # Los CSV chinos suelen usar codificación GBK
    'delimiter': ',',
    'quotechar': '"',
    'skipinitialspace': True,
    'na_values': ['', 'N/A', 'NULL', '0.0']
}

# Campos CSV requeridos
REQUIRED_CSV_FIELDS = {
    'airway': [
        'CODE_POINT_START', 'CODE_TYPE_START',
        'CODE_POINT_END', 'CODE_TYPE_END', 
        'CODE_DIR', 'TXT_DESIG'
    ],
    'airport': [
        'CODE_AIRPORT', 'GEO_LAT', 'GEO_LONG', 
        'ELEVATION', 'TXT_NAME'
    ],
    'runway': [
        'CODE_AIRPORT', 'TXT_DESIG', 'GEO_LAT_START',
        'GEO_LONG_START', 'GEO_LAT_END', 'GEO_LONG_END'
    ]
}
```

### Configuración de base de datos
```python
# Configuración de X-Plane CIFP/database.py

DATABASE_CONFIG = {
    'connection_timeout': 30,
    'auto_commit': True,
    'encoding': 'utf-8',
    'journal_mode': 'WAL',  # Optimización SQLite
    'synchronous': 'NORMAL'
}

# Esquemas de tabla de datos
TABLE_SCHEMAS = {
    'waypoints': {
        'id': 'INTEGER PRIMARY KEY',
        'ident': 'TEXT NOT NULL',
        'latitude': 'REAL NOT NULL', 
        'longitude': 'REAL NOT NULL',
        'type': 'INTEGER',
        'airport': 'TEXT',
        'area': 'TEXT'
    }
}
```

## 🔧 Configuración de registro (logging)

### Archivo de configuración de registro: `config/logging.conf`

```ini
[loggers]
keys=root,airway,pdf_extract,terminal,cifp

[handlers] 
keys=consoleHandler,fileHandler,rotatingFileHandler

[formatters]
keys=standardFormatter,detailedFormatter

[logger_root]
level=INFO
handlers=consoleHandler,rotatingFileHandler

[logger_airway]
level=DEBUG
handlers=fileHandler
qualname=airway
propagate=0

[logger_pdf_extract]
level=INFO
handlers=fileHandler
qualname=pdf_extract
propagate=0

[logger_terminal]
level=INFO
handlers=fileHandler
qualname=terminal
propagate=0

[logger_cifp]
level=DEBUG
handlers=fileHandler
qualname=cifp
propagate=0

[handler_consoleHandler]
class=StreamHandler
level=INFO
formatter=standardFormatter
args=(sys.stdout,)

[handler_fileHandler]
class=FileHandler
level=DEBUG
formatter=detailedFormatter
args=('logs/nav-data.log', 'a')

[handler_rotatingFileHandler]
class=handlers.RotatingFileHandler
level=INFO
formatter=standardFormatter
args=('logs/nav-data-rotating.log', 'a', 10485760, 5)

[formatter_standardFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(message)s
datefmt=%Y-%m-%d %H:%M:%S

[formatter_detailedFormatter]
format=%(asctime)s - %(name)s - %(levelname)s - %(filename)s:%(lineno)d - %(funcName)s() - %(message)s
datefmt=%Y-%m-%d %H:%M:%S
```

### Ejemplo de configuración de registro de Python

```python
import logging
import logging.config
from pathlib import Path

# Cargar configuración de registro
def setup_logging(config_path='config/logging.conf'):
    """Establecer configuración de registro"""
    if Path(config_path).exists():
        logging.config.fileConfig(config_path)
    else:
        # Configuración predeterminada
        logging.basicConfig(
            level=logging.INFO,
            format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
            datefmt='%Y-%m-%d %H:%M:%S',
            handlers=[
                logging.StreamHandler(),
                logging.FileHandler('logs/nav-data.log')
            ]
        )

# Loggers por módulo
def get_logger(name):
    """Obtener logger específico del módulo"""
    return logging.getLogger(name)

# Ejemplo de uso
logger = get_logger('airway')
logger.info('Inicio del procesamiento de aerovías')
```

## ⚙️ Configuración de optimización de rendimiento

### Configuración de gestión de memoria
```python
# Optimización del uso de memoria
MEMORY_CONFIG = {
    'chunk_size': 10000,        # Tamaño de procesamiento por bloques
    'max_memory_usage': '2GB',  # Uso máximo de memoria
    'garbage_collection': True, # Habilitar recolección de basura
    'buffer_size': 8192        # Búfer de lectura de archivos
}

# Configuración de procesamiento concurrente
CONCURRENCY_CONFIG = {
    'max_workers': 4,           # Número máximo de hilos de trabajo
    'enable_multiprocessing': False, # Procesamiento multiproceso
    'thread_pool_size': 2       # Tamaño del pool de hilos
}
```

### Configuración de caché
```python
# Configuración de caché
CACHE_CONFIG = {
    'enable_cache': True,
    'cache_size': 1000,
    'cache_ttl': 3600,          # Tiempo de vida de la caché (segundos)
    'cache_directory': 'cache/'
}
```

## 🔍 Validación de configuración

### Script de validación de configuración

Crear `validate_config.py`:

```python
#!/usr/bin/env python3
"""
Script de validación de archivos de configuración
"""
import configparser
import os
import sys
from pathlib import Path

def validate_airway_config(config_file):
    """Validar configuración del módulo de aerovías"""
    config = configparser.ConfigParser()
    config.read(config_file)
    
    errors = []
    
    # Comprobar secciones requeridas
    required_sections = ['General', 'Input', 'Output', 'Filtering']
    for section in required_sections:
        if section not in config:
            errors.append(f"Sección de configuración faltante: [{section}]")
    
    # Comprobar rutas de archivo
    if 'Input' in config:
        for key in ['csv_file', 'earth_fix_file', 'earth_nav_file']:
            if key in config['Input']:
                file_path = config['Input'][key]
                if not os.path.exists(file_path):
                    errors.append(f"Archivo no existe: {file_path}")
    
    return errors

def validate_all_configs():
    """Validar todos los archivos de configuración"""
    config_dir = Path('config')
    if not config_dir.exists():
        print("❌ El directorio de configuración no existe")
        return False
    
    config_files = {
        'airway.conf': validate_airway_config,
        # Se pueden añadir más funciones de validación de configuración
    }
    
    all_valid = True
    for config_file, validator in config_files.items():
        config_path = config_dir / config_file
        if config_path.exists():
            errors = validator(str(config_path))
            if errors:
                print(f"❌ {config_file} Errores de configuración:")
                for error in errors:
                    print(f"   - {error}")
                all_valid = False
            else:
                print(f"✅ {config_file} Configuración correcta")
        else:
            print(f"⚠️  {config_file} Archivo de configuración no existe (se usarán valores predeterminados)")
    
    return all_valid

if __name__ == "__main__":
    if validate_all_configs():
        print("\n🎉 ¡Todas las configuraciones validadas correctamente!")
        sys.exit(0)
    else:
        print("\n❌ Fallo en la validación de la configuración, por favor, corrija los problemas anteriores")
        sys.exit(1)
```

## 📚 Mejores prácticas de configuración

### 1. Gestión de archivos de configuración
- Usar control de versiones para gestionar archivos de configuración
- Crear archivos de configuración diferentes para distintos entornos
- Realizar copias de seguridad periódicas de configuraciones importantes

### 2. Consideraciones de seguridad
- No almacenar información sensible en archivos de configuración
- Usar variables de entorno para almacenar información variable como rutas
- Establecer permisos de archivo adecuados

### 3. Optimización del rendimiento
- Ajustar el tamaño del lote según los recursos del sistema
- Establecer límites de uso de memoria razonables
- Habilitar mecanismos de caché apropiados

### 4. Manejo de errores
- Establecer valores predeterminados para todos los elementos de configuración clave
- Implementar un mecanismo de validación de configuración
- Proporcionar mensajes de error claros

---

**¡Configuración completada!** 🎯 Ahora puede ajustar los parámetros de configuración de cada módulo según sus necesidades específicas. Se recomienda ejecutar el script de validación de configuración antes del primer uso para asegurar que los ajustes sean correctos.
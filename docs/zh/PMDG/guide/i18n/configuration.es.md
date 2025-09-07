# ⚙️ Instrucciones de configuración

Esta guía detalla cómo configurar las fuentes de datos, las rutas de archivo y los parámetros de procesamiento de Nav-data para asegurar que la herramienta pueda manejar correctamente sus datos de navegación aérea.

## 📋 Visión general de la configuración

Nav-data requiere la configuración de los siguientes tipos de fuentes de datos:
- **Datos NAIP** - Datos del Sistema Nacional de Procesamiento de Información Aeronáutica de China (formato CSV)
- **Datos X-Plane** - Archivos de datos de navegación de X-Plane (formato DAT)
- **Datos CIFP** - Datos de Procedimientos de Vuelo Instrumental Codificados (formato DAT)
- **Configuración de salida** - Ubicación de la base de datos y los archivos de registro generados

## 🗂️ Detalles de las fuentes de datos

### 1. Fuente de datos NAIP (Datos de Aviación Civil de China)

Los datos NAIP (National Aeronautical Information Processing) contienen información aeronáutica oficial de la región de China:

#### Lista de archivos obligatorios
```
data/input/naip/
├── AD_HP.csv              # Datos básicos de aeropuerto (ubicación del aeropuerto, declinación magnética)
├── RWY_DIRECTION.csv      # Información de dirección de pista
├── RWY.csv                # Información detallada de pista (longitud, ancho, superficie)
└── RTE_SEG.csv            # Datos de segmentos de ruta
```

#### Requisitos de formato de archivo
- **Codificación**: Latin-1 (ISO-8859-1)
- **Separador**: coma (,)
- **Salto de línea**: Windows (CRLF) o Unix (LF)

#### Descripción de campos clave

**AD_HP.csv** - Datos de aeropuerto:
- `CODE_ID`: Código OACI de 4 letras (ej: ZBAA)
- `GEO_LAT_ACCURACY`: Latitud (formato DMS: N390308.00)
- `GEO_LONG_ACCURACY`: Longitud (formato DMS: E1162930.00)
- `VAL_MAG_VAR`: Valor de declinación magnética

**RWY.csv** - Datos de pista:
- `CODE_ID`: Código OACI del aeropuerto
- `TXT_DESIG`: Identificador de pista (ej: 18L/36R)
- `VAL_LEN`: Longitud de pista (metros)
- `VAL_WID`: Ancho de pista (metros)

**RTE_SEG.csv** - Datos de aerovía:
- `TXT_DESIG`: Identificador de aerovía (ej: A1, G212)
- `CODE_POINT_START`: Identificador de punto de inicio
- `CODE_TYPE_START`: Tipo de punto (DESIGNATED_POINT, VORDME, NDB)
- `VAL_MAG_TRACK`: Derrota magnética (grados)
- `VAL_LEN`: Longitud de segmento (kilómetros)

### 2. Fuente de datos X-Plane

X-Plane proporciona datos de navegación de alta calidad, con cobertura global:

#### Archivos obligatorios
```
data/input/xplane/
├── earth_fix.dat          # Datos de puntos de referencia globales
└── earth_nav.dat          # Datos VOR/DME/NDB/ILS
```

#### Descripción del formato de datos

**earth_fix.dat** formato:
```
Latitud Longitud Identificador Código de región Código OACI Tipo
39.051639 116.497222 ADNAP ZZZZ ZB DESIGNATED_POINT
```

**earth_nav.dat** formato:
```
Tipo Latitud Longitud Elevación Frecuencia Alcance Declinación magnética Identificador Código de región Código OACI Nombre Tipo de equipo
3 39.051639 116.497222 35 11030 130 -6.0 BJK ENRT ZB BEIJING VOR/DME
```

#### Códigos de región OACI admitidos
```python
# Códigos de región de China actualmente admitidos
VALID_ICAO_CODES = {
    'ZB',  # Región de China Septentrional
    'ZG',  # Región de Cantón
    'ZS',  # Región de Shanghái
    'ZJ',  # Región de Sinkiang
    'ZY',  # Región de China Central-Meridional
    'ZL',  # Región de Lanzhou
    'ZH',  # Región de Heilongjiang
    'ZU',  # Región de Urumqi
    'ZP',  # Región de Kunming
    'ZW'   # Región del Tíbet
}
```

### 3. Fuente de datos CIFP (Procedimientos de vuelo)

CIFP (Coded Instrument Flight Procedures) contiene procedimientos de vuelo instrumental estándar:

#### Estructura de archivos
```
data/input/cifp/
├── ZBAA.dat              # Procedimientos del Aeropuerto Internacional de Pekín-Capital
├── ZSPD.dat              # Procedimientos del Aeropuerto Internacional de Shanghái-Pudong
├── ZGGG.dat              # Procedimientos del Aeropuerto Internacional de Cantón-Baiyun
└── [Código OACI del aeropuerto].dat     # Otros archivos de procedimientos de aeropuerto
```

#### Tipos de procedimientos
- **SID** - Procedimientos estándar de salida instrumental
- **STAR** - Procedimientos estándar de llegada terminal
- **APPCH** - Procedimientos de aproximación instrumental

#### Ejemplo de formato de datos
```
SID:010,D,ABING1,T,ZBAA,ABING,ZB,001,IF,L,0.30,IF,,-6.0,ZBAA,0,0,0,270.0,0,D,+,1700,,,,,0.0,,ABING,,J
```

### 4. Archivos de datos de referencia

#### Archivo de búsqueda de nombres de aeropuerto
```
data/input/Airport.dat

Formato:
ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL
ZGGG GUANGZHOU/BAIYUN INTL
```

## 🔧 Ajustes del archivo de configuración

### 1. Configuración de rutas

Cada módulo de Python incluye una configuración de rutas que debe ajustarse a su entorno real:

#### Ejemplo de configuración de PMDG_APT.py
```python
# Configuración de procesamiento de datos de aeropuerto
csv_file_path = r'/path/to/naip/AD_HP.csv'
lookup_txt_file_path = r'/path/to/Airport.dat'
output_db_path = r'/path/to/output/e_dfd_PMDG.s3db'
missing_airports_path = r'/path/to/logs/missing_airports_data.txt'
```

#### Ejemplo de configuración de PMDG_RUNWAY.py
```python
# Configuración de procesamiento de datos de pista
path_to_first_csv = r'/path/to/naip/RWY_DIRECTION.csv'
path_to_second_csv = r'/path/to/naip/RWY.csv'
path_to_magvar_csv = r'/path/to/naip/AD_HP.csv'
output_db3_path = r'/path/to/output/e_dfd_PMDG.s3db'
earth_nav_dat_path = r'/path/to/xplane/earth_nav.dat'
```

#### Ejemplo de configuración de datos de procedimientos
```python
# Configuración de procedimientos SID/STAR/APPCH
source_dat_directory = '/path/to/cifp/'
earth_fix_path = '/path/to/xplane/earth_fix.dat'
earth_nav_path = '/path/to/xplane/earth_nav.dat'
db_path = '/path/to/output/e_dfd_PMDG.s3db'
```

### 2. Crear script de gestión de configuración

Para facilitar la gestión, se recomienda crear un archivo de configuración unificado:

```python
# config/paths.py
import os

# Ruta base
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, 'data')
INPUT_DIR = os.path.join(DATA_DIR, 'input')
OUTPUT_DIR = os.path.join(DATA_DIR, 'output')
LOGS_DIR = os.path.join(BASE_DIR, 'logs')

# Rutas de datos NAIP
NAIP_DIR = os.path.join(INPUT_DIR, 'naip')
NAIP_FILES = {
    'airports': os.path.join(NAIP_DIR, 'AD_HP.csv'),
    'runway_direction': os.path.join(NAIP_DIR, 'RWY_DIRECTION.csv'),
    'runway_data': os.path.join(NAIP_DIR, 'RWY.csv'),
    'route_segments': os.path.join(NAIP_DIR, 'RTE_SEG.csv')
}

# Rutas de datos X-Plane
XPLANE_DIR = os.path.join(INPUT_DIR, 'xplane')
XPLANE_FILES = {
    'waypoints': os.path.join(XPLANE_DIR, 'earth_fix.dat'),
    'navigation': os.path.join(XPLANE_DIR, 'earth_nav.dat')
}

# Rutas de datos CIFP
CIFP_DIR = os.path.join(INPUT_DIR, 'cifp')

# Rutas de archivos de salida
OUTPUT_DATABASE = os.path.join(OUTPUT_DIR, 'e_dfd_PMDG.s3db')

# Archivos de referencia
AIRPORT_LOOKUP = os.path.join(INPUT_DIR, 'Airport.dat')

# Rutas de archivos de registro
LOG_FILES = {
    'missing_airports': os.path.join(LOGS_DIR, 'missing_airports_data.txt'),
    'ils_processing': os.path.join(LOGS_DIR, 'PMDG_ILS.log'),
    'airway_processing': os.path.join(LOGS_DIR, 'PMDG_AWY_NEW.log'),
    'validation': os.path.join(LOGS_DIR, 'db_validation.log')
}

# Rutas de instalación de MSFS (requiere personalización por parte del usuario)
MSFS_COMMUNITY_PATHS = {
    'microsoft_store': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community',
    'steam': r'C:\Users\{username}\AppData\Roaming\Microsoft Flight Simulator\Packages\Community',
    'xbox_gamepass': r'C:\Users\{username}\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community'
}
```

## ⚡ Configuración de rendimiento

### 1. Ajustes de optimización de memoria

Para conjuntos de datos grandes, se puede ajustar el tamaño del lote:

```python
# Configuración de procesamiento por lotes en PMDG_TMA_WAYPOINT.py
BATCH_SIZE = 1000  # Tamaño de lote predeterminado
MAX_MEMORY_MB = 2048  # Uso máximo de memoria (MB)

# Ajustar según la memoria disponible
import psutil
available_memory = psutil.virtual_memory().available / (1024 * 1024)
if available_memory > 8192:  # 8GB+
    BATCH_SIZE = 5000
elif available_memory > 4096:  # 4GB+
    BATCH_SIZE = 2000
```

### 2. Configuración de procesamiento concurrente

```python
# Ajustes de concurrencia en PMDG_AWY_FINAL.py
MAX_WORKERS = 50  # Número máximo de hilos concurrentes

# Ajustar según el número de núcleos de CPU
import multiprocessing
cpu_count = multiprocessing.cpu_count()
MAX_WORKERS = min(50, cpu_count * 2)
```

### 3. Ajustes de optimización de base de datos

```python
# Ajustes de optimización de rendimiento de SQLite
DATABASE_PRAGMAS = {
    'journal_mode': 'DELETE',    # Modo de compatibilidad
    'synchronous': 'FULL',       # Sincronización completa
    'foreign_keys': 'ON',        # Habilitar restricciones de clave externa
    'cache_size': 10000,         # Número de páginas de caché
    'temp_store': 'MEMORY'       # Almacenamiento de tablas temporales en memoria
}
```

## 🗺️ Configuración del sistema de coordenadas geográficas

### 1. Conversión de formato de coordenadas

Nav-data admite la conversión de múltiples formatos de coordenadas:

```python
# Configuración de conversión de formato DMS (grados, minutos, segundos)
DMS_FORMATS = {
    'latitude': 'NDDMMSS.ss',   # Ej: N390308.00
    'longitude': 'EDDDMMSS.ss'  # Ej: E1162930.00
}

# Configuración de precisión
COORDINATE_PRECISION = 8  # Número de decimales
```

### 2. Configuración de cálculo de declinación magnética

```python
# Configuración del modelo de declinación magnética
MAGNETIC_MODEL = {
    'coefficients_file': 'wmm/WMMHR_2025.COF',
    'high_resolution': True,
    'epoch': 2025.0
}
```

## 📊 Configuración de validación de datos

### 1. Verificación de calidad de datos

```python
# Configuración de validación de datos
VALIDATION_CONFIG = {
    'check_duplicates': True,
    'validate_coordinates': True,
    'check_icao_codes': True,
    'verify_references': True,
    'generate_reports': True
}

# Validación de códigos OACI
VALID_ICAO_PATTERN = r'^Z[BGJLHUPYW][A-Z]{2}$'

# Validación de rango de coordenadas (región de China)
COORDINATE_BOUNDS = {
    'latitude': {'min': 15.0, 'max': 55.0},   # 15°-55° Latitud Norte
    'longitude': {'min': 70.0, 'max': 140.0}  # 70°-140° Longitud Este
}
```

### 2. Configuración de manejo de errores

```python
# Estrategia de manejo de errores
ERROR_HANDLING = {
    'missing_data': 'log',      # log | skip | raise
    'invalid_coordinates': 'skip',
    'duplicate_records': 'log',
    'reference_not_found': 'log'
}
```

## 🔍 Configuración de depuración

### 1. Configuración de nivel de registro

```python
# Configuración de registro
LOGGING_CONFIG = {
    'level': 'INFO',            # DEBUG | INFO | WARNING | ERROR
    'format': '%(asctime)s - %(levelname)s - %(message)s',
    'file_size_mb': 10,         # Tamaño de archivo de registro individual
    'backup_count': 5,          # Número de archivos de copia de seguridad a conservar
    'encoding': 'utf-8'
}
```

### 2. Configuración de visualización de progreso

```python
# Configuración de barra de progreso
PROGRESS_CONFIG = {
    'enable_progress_bar': True,
    'update_interval': 100,     # Intervalo de actualización (número de registros)
    'show_eta': True,           # Mostrar tiempo estimado de finalización
    'show_rate': True           # Mostrar tasa de procesamiento
}
```

## ✅ Validación de configuración

Cree un script de validación de configuración para verificar la exactitud de la misma:

```python
# scripts/validate_config.py
import os
import sys
from config.paths import *

def validate_config():
    """Verifica la integridad y exactitud de los archivos de configuración."""
    
    print("🔍 Validando archivos de configuración...")
    
    # Comprobar directorios obligatorios
    required_dirs = [DATA_DIR, INPUT_DIR, OUTPUT_DIR, LOGS_DIR]
    for dir_path in required_dirs:
        if not os.path.exists(dir_path):
            print(f"❌ Falta el directorio: {dir_path}")
            return False
        print(f"✅ Directorio existente: {dir_path}")
    
    # Comprobar archivos de entrada obligatorios
    required_files = []
    required_files.extend(NAIP_FILES.values())
    required_files.extend(XPLANE_FILES.values())
    required_files.append(AIRPORT_LOOKUP)
    
    missing_files = []
    for file_path in required_files:
        if not os.path.exists(file_path):
            missing_files.append(file_path)
        else:
            print(f"✅ Archivo existente: {os.path.basename(file_path)}")
    
    if missing_files:
        print(f"❌ Faltan archivos obligatorios:")
        for file_path in missing_files:
            print(f"   - {file_path}")
        return False
    
    print("✅ ¡Validación de configuración completada con éxito!")
    return True

if __name__ == "__main__":
    if not validate_config():
        sys.exit(1)
```

## 📞 Solución de problemas de configuración

### Problemas de configuración comunes

1.  **Problemas con el separador de rutas**
    - Windows: Usar barra invertida `\` o cadena raw `r'path'`
    - macOS/Linux: Usar barra inclinada `/`

2.  **Problemas de codificación de archivos**
    - Archivos CSV: Asegurarse de usar codificación Latin-1
    - Archivos DAT: Generalmente codificación UTF-8

3.  **Problemas de permisos**
    - Asegurarse de tener permisos de lectura y escritura para todas las rutas de configuración
    - Windows: Puede requerir permisos de administrador

4.  **Limitaciones de longitud de ruta**
    - Windows: La longitud total de la ruta no debe exceder los 260 caracteres
    - Usar rutas relativas para reducir la longitud

---

**Siguiente paso**: Lea las [instrucciones de uso](usage.md) para comprender cómo ejecutar el proceso de conversión de datos.
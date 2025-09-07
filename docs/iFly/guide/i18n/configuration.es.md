# ⚙️ Guía de Configuración del Conversor de Datos de Navegación iFly

Esta guía detalla las diversas opciones de configuración del conversor de datos de navegación iFly, para ayudarle a optimizar el proceso de conversión según sus necesidades.

## 🎯 Visión General de la Configuración

El conversor ofrece un sistema de configuración flexible que soporta:
- **📁 Configuración de Rutas** - rutas de entrada y salida personalizadas
- **📊 Parámetros de Procesamiento** - ajustar la precisión y el alcance del procesamiento de datos
- **⚡ Optimización del Rendimiento** - optimización de la memoria y la velocidad de procesamiento
- **🔍 Opciones de Validación** - configuración de validación de la integridad de los datos

## 📋 Métodos de Configuración

### 1. Configuración Interactiva (Recomendado)
```bash
# Ejecute el conversor, configure según las indicaciones
python main.py
```

### 2. Archivo de Configuración
Cree el archivo `config.json`:
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "ifly_path": "/path/to/ifly-aircraft-737max8",
    "terminal_id_start": 1000,
    "coordinate_precision": 8,
    "enable_validation": true
}
```

### 3. Variables de Entorno
```bash
export IFLY_FENIX_DB="/path/to/nd.db3"
export IFLY_CSV_FILE="/path/to/RTE_SEG.csv"
export IFLY_INSTALL_PATH="/path/to/ifly-aircraft-737max8"
```

## 🔧 Opciones Clave de Configuración

### Configuración de Rutas de Archivo

#### Ruta de la Base de Datos Fenix
**Nombre del Parámetro**: `fenix_db_path`  
**Descripción**: Ubicación del archivo de la base de datos de navegación Fenix A320  
**Valor por Defecto**: Detección automática  

**Ubicaciones comunes:**
```bash
# Windows
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# Ejemplo de ruta personalizada
/Users/username/Documents/Fenix/navdata/nd.db3
```

**Método de validación:**
```python
import sqlite3
def validate_fenix_db(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
        tables = [row[0] for row in cursor.fetchall()]
        required_tables = ['Airports', 'Runways', 'Waypoints', 'Terminals']
        return all(table in tables for table in required_tables)
    except Exception as e:
        print(f"Error de validación de la base de datos: {e}")
        return False
```

#### Ruta del archivo CSV NAIP
**Nombre del Parámetro**: `csv_file_path`  
**Descripción**: Archivo de datos de segmentos de ruta de la aviación civil china  
**Requisitos de formato**: Archivo CSV codificado en UTF-8  

**Ejemplo de estructura de archivo:**
```csv
ROUTE_ID,SEQUENCE_NUMBER,WAYPOINT_ID,LATITUDE,LONGITUDE,MAG_VARIATION
A1,1,ZSAM,39.916667,116.383333,7.2
A1,2,VOR01,39.833333,116.500000,7.1
```

**Columnas requeridas:**
- `WAYPOINT_ID`: Identificador de punto de ruta
- `LATITUDE`: Latitud (grados decimales)
- `LONGITUDE`: Longitud (grados decimales)
- `ROUTE_ID`: Identificador de ruta

#### Ruta de Instalación de iFly
**Nombre del Parámetro**: `ifly_path`  
**Descripción**: Directorio de instalación de iFly 737 MAX 8  
**Detección automática**: Soportado  

**Orden de detección:**
1. Paquete Community: `Community\ifly-aircraft-737max8\`
2. Paquete Official: `Official\asobo-aircraft-ifly-737max8\`
3. Ruta especificada manualmente

## ⚙️ Configuración de Parámetros de Procesamiento

### Rango de ID de Procedimiento Terminal

#### Configuración del ID de Inicio
**Nombre del Parámetro**: `terminal_id_start`  
**Descripción**: Número de ID de inicio del procedimiento terminal  
**Valor por Defecto**: `1000`  
**Rango**: `1 - 9999`  

**Sugerencias de configuración:**
```python
# Configurar según el número de aeropuertos
small_airports = 1000   # < 50 aeropuertos
medium_airports = 2000  # 50-200 aeropuertos  
large_airports = 5000   # > 200 aeropuertos
```

#### Estrategia de Asignación de ID
```python
def calculate_terminal_ids(airport_count, start_id=1000):
    """Calcula la asignación de ID de procedimiento terminal"""
    # Reservar 20 ID por aeropuerto
    id_per_airport = 20
    total_ids_needed = airport_count * id_per_airport
    
    if start_id + total_ids_needed > 9999:
        print("⚠️ Advertencia: El rango de ID podría ser insuficiente")
        return start_id, 9999
    
    return start_id, start_id + total_ids_needed
```

### Configuración de Precisión de Coordenadas

#### Configuración de Precisión
**Nombre del Parámetro**: `coordinate_precision`  
**Descripción**: Número de decimales de las coordenadas  
**Valor por Defecto**: `8`  
**Rango**: `4 - 12`  

**Comparación de Precisión:**
| Precisión | Rango de error | Escenario de aplicación |
|-----------|----------------|------------------------|
| 4 dígitos | ~11 metros     | Navegación básica      |
| 6 dígitos | ~1.1 metros    | Navegación estándar    |
| 8 dígitos | ~1.1 centímetros | Navegación de alta precisión |
| 10 dígitos | ~1.1 milímetros | Precisión extremadamente alta |

**Ejemplo de configuración:**
```python
# Ejemplo de coordenadas con diferente precisión
coord_4 = 39.9167  # 4 dígitos de precisión
coord_6 = 39.916667  # 6 dígitos de precisión  
coord_8 = 39.91666700  # 8 dígitos de precisión
```

### Configuración del Cálculo de la Declinación Magnética

#### Parámetros del Modelo WMM
**Versión del modelo**: WMM-2025  
**Frecuencia de actualización**: Cada 5 años  
**Precisión del cálculo**: 0.1 grados  

**Parámetros de cálculo:**
```python
{
    "model_year": 2025,
    "altitude": 0,  # Altitud sobre el nivel del mar (metros)
    "calculation_date": "auto",  # Usar la fecha actual automáticamente
    "use_local_time": true  # Usar la hora local
}
```

#### Validación de la Declinación Magnética
```python
def validate_magnetic_declination(declination):
    """Valida la razonabilidad del valor de la declinación magnética"""
    # El rango global de declinación magnética es aproximadamente de -30° a +30°
    if -30.0 <= declination <= 30.0:
        return True
    else:
        print(f"⚠️ Valor de declinación magnética anómala: {declination}°")
        return False
```

## 🚀 Configuración de Optimización del Rendimiento

### Gestión de Memoria

#### Tamaño del Lote de Procesamiento
**Nombre del Parámetro**: `batch_size`  
**Descripción**: Número de registros procesados en un solo lote  
**Valor por Defecto**: `1000`  
**Configuración sugerida:**

```python
# Ajustar según la memoria disponible
import psutil

def get_optimal_batch_size():
    available_memory = psutil.virtual_memory().available
    memory_gb = available_memory / (1024**3)
    
    if memory_gb < 4:
        return 500   # Menos de 4GB
    elif memory_gb < 8:
        return 1000  # 4-8GB
    else:
        return 2000  # Más de 8GB
```

#### Monitorización de Memoria
```python
def monitor_memory_usage():
    """Monitorea el uso de memoria"""
    import psutil
    memory = psutil.virtual_memory()
    print(f"Uso de memoria: {memory.percent}%")
    print(f"Memoria disponible: {memory.available / (1024**2):.1f} MB")
```

### Configuración de Procesamiento Concurrente

#### Configuración del Número de Hilos
**Nombre del Parámetro**: `max_workers`  
**Descripción**: Número máximo de hilos concurrentes  
**Valor por Defecto**: Número de núcleos de CPU  

**Estrategia de configuración:**
```python
import os

def get_optimal_workers():
    cpu_count = os.cpu_count()
    
    # Reservar un núcleo para el sistema
    if cpu_count <= 2:
        return 1
    elif cpu_count <= 4:
        return cpu_count - 1
    else:
        return min(cpu_count - 2, 8)  # Máximo 8 hilos
```

#### Optimización de E/S
```python
{
    "use_ssd_optimization": true,    # Optimización SSD
    "buffer_size": 8192,            # Tamaño del búfer (bytes)
    "enable_compression": false,     # Compresión de archivos temporales
    "temp_dir": "/tmp"              # Directorio temporal
}
```

## 🔍 Validación y Control de Calidad

### Configuración de Validación de Datos

#### Nivel de Validación
**Nombre del Parámetro**: `validation_level`  
**Descripción**: Intensidad de la validación de datos  
**Opciones**: `basic`, `standard`, `strict`  

**Contenido de la validación:**
```python
validation_levels = {
    "basic": [
        "file_existence",
        "basic_format_check"
    ],
    "standard": [
        "file_existence", 
        "format_validation",
        "coordinate_range_check",
        "database_integrity"
    ],
    "strict": [
        "file_existence",
        "format_validation", 
        "coordinate_range_check",
        "database_integrity",
        "data_consistency_check",
        "cross_reference_validation"
    ]
}
```

#### Estrategia de Manejo de Errores
**Nombre del Parámetro**: `error_handling`  
**Opciones**: `stop`, `skip`, `fix`  

```python
error_strategies = {
    "stop": "Detener inmediatamente al encontrar un error",
    "skip": "Omitir los registros erróneos y continuar procesando", 
    "fix": "Intentar reparar automáticamente los errores"
}
```

### Control de Calidad de Salida

#### Reglas de Nomenclatura de Archivos
```python
output_naming = {
    "use_timestamp": true,          # Usar marca de tiempo
    "include_version": true,        # Incluir número de versión
    "airac_suffix": true,          # Añadir sufijo AIRAC
    "backup_original": true        # Hacer copia de seguridad del archivo original
}

# Ejemplo de nombres de archivo generados:
# WPNAVRTE_2024-12-15_v2.0_2508.txt
# FMC_Ident_2024-12-15_v2.0_2508.txt
```

## 📅 Configuración del Ciclo AIRAC

### Configuración de Cálculo Automático
**Nombre del Parámetro**: `airac_auto_calculate`  
**Valor por Defecto**: `true`  
**Zona Horaria**: UTC+8 (Hora de Pekín)  

```python
airac_config = {
    "auto_calculate": true,
    "timezone": "Asia/Shanghai",
    "reference_date": "2024-01-11",  # Fecha de inicio del AIRAC 2401
    "cycle_days": 28,                # Días de ciclo estándar
    "format": "YYWW"                # Formato: AñoAñoSemanaSemana
}
```

### Configuración Manual
```python
# Especificar el ciclo AIRAC manualmente
manual_airac = {
    "cycle": "2508",
    "effective_date": "2025-02-20",
    "expiry_date": "2025-03-19"
}
```

## 🎛️ Configuración Avanzada

### Configuración de Registro (Logging)
```python
logging_config = {
    "level": "INFO",               # DEBUG, INFO, WARNING, ERROR
    "file": "converter.log",       # Nombre del archivo de registro
    "max_size": "10MB",           # Tamaño máximo del archivo
    "backup_count": 3,            # Número de archivos de copia de seguridad
    "format": "%(asctime)s - %(levelname)s - %(message)s"
}
```

### Configuración de la Interfaz de Usuario
```python
ui_config = {
    "theme": "dark",              # Tema: dark, light, auto
    "progress_style": "bar",      # Estilo de la barra de progreso: bar, spinner
    "color_scheme": "rich",       # Esquema de color
    "show_details": true,         # Mostrar detalles
    "animation": true            # Habilitar efectos de animación
}
```

### Configuración de Depuración
```python
debug_config = {
    "enable_debug": false,        # Habilitar modo de depuración
    "save_intermediate": false,   # Guardar resultados intermedios
    "verbose_logging": false,     # Registro detallado
    "performance_profiling": false, # Análisis de rendimiento
    "memory_tracking": false     # Seguimiento de memoria
}
```

## 📝 Plantilla de Archivo de Configuración

### Ejemplo de Configuración Completa
```json
{
    "paths": {
        "fenix_db_path": "auto_detect",
        "csv_file_path": "./data/RTE_SEG.csv",
        "ifly_path": "auto_detect",
        "output_backup_dir": "./backup"
    },
    "processing": {
        "terminal_id_start": 1000,
        "coordinate_precision": 8,
        "batch_size": 1000,
        "max_workers": 4
    },
    "magnetic": {
        "model_year": 2025,
        "altitude": 0,
        "use_local_time": true
    },
    "airac": {
        "auto_calculate": true,
        "timezone": "Asia/Shanghai",
        "format": "YYWW"
    },
    "validation": {
        "validation_level": "standard",
        "error_handling": "skip",
        "enable_validation": true
    },
    "output": {
        "use_timestamp": true,
        "include_version": true,
        "airac_suffix": true,
        "backup_original": true
    },
    "logging": {
        "level": "INFO",
        "file": "converter.log",
        "max_size": "10MB",
        "backup_count": 3
    },
    "ui": {
        "theme": "dark",
        "progress_style": "bar",
        "show_details": true,
        "animation": true
    }
}
```

### Ejemplo de Configuración Mínima
```json
{
    "fenix_db_path": "/path/to/nd.db3",
    "csv_file_path": "/path/to/RTE_SEG.csv",
    "terminal_id_start": 1000
}
```

## 🛠️ Herramientas de Configuración

### Script de Validación de Configuración
```python
def validate_config(config_path):
    """Valida la validez del archivo de configuración"""
    import json
    import jsonschema
    
    # Esquema de configuración
    schema = {
        "type": "object",
        "properties": {
            "fenix_db_path": {"type": "string"},
            "csv_file_path": {"type": "string"},
            "terminal_id_start": {"type": "integer", "minimum": 1, "maximum": 9999}
        },
        "required": ["fenix_db_path", "csv_file_path"]
    }
    
    try:
        with open(config_path, 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        jsonschema.validate(config, schema)
        print("✅ Configuración validada con éxito")
        return True
    except Exception as e:
        print(f"❌ Error de validación de la configuración: {e}")
        return False
```

### Generador de Configuración
```python
def generate_config_template():
    """Genera una plantilla de configuración"""
    template = {
        "fenix_db_path": "Por favor, introduzca la ruta de la base de datos Fenix",
        "csv_file_path": "Por favor, introduzca la ruta del archivo CSV", 
        "ifly_path": "auto_detect",
        "terminal_id_start": 1000,
        "coordinate_precision": 8
    }
    
    with open('config_template.json', 'w', encoding='utf-8') as f:
        json.dump(template, f, indent=2, ensure_ascii=False)
    
    print("Plantilla de configuración generada: config_template.json")
```

---

**Siguiente paso**: Una vez completada la configuración, consulte las [Instrucciones de Uso](usage.md) ¡para iniciar su primera conversión de datos! 🚀
# ⚙️ Guía de Configuración del Convertidor de Datos de Navegación TFDI

Esta guía detalla las diversas opciones de configuración del convertidor de datos de navegación TFDI, ayudándole a optimizar el proceso de conversión y los resultados de salida según sus necesidades.

## 🎯 Visión General de la Configuración

El convertidor TFDI utiliza un sistema de configuración flexible que soporta:
- **📁 Configuración de Salida** - personalizar el directorio de salida y el formato de archivo
- **📊 Parámetros de Procesamiento de Datos** - ajustar la precisión de las coordenadas y el filtrado de datos
- **⚡ Optimización del Rendimiento** - gestión de memoria y ajuste de la velocidad de procesamiento
- **🔍 Opciones de Validación** - configuración de integridad de datos y control de calidad

## 📋 Métodos de Configuración

### 1. Configuración Predeterminada (Recomendado para principiantes)
```python
# Ejecutar con configuración predeterminada
python Fenix2TFDINavDataConverter.py
# El convertidor utilizará la mejor configuración preestablecida
```

### 2. Configuración en Código
```python
from dataclasses import dataclass

@dataclass
class ConverterConfig:
    """Clase de configuración del convertidor"""
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs" 
    archive_name: str = "Primary.7z"
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
```

### 3. Configuración Interactiva
```python
# Configuración interactiva durante la ejecución del convertidor
# El usuario puede establecer parámetros clave durante la ejecución
```

## 🔧 Opciones de Configuración Clave

### Configuración de la Ruta de Salida

#### Configuración del Directorio de Salida
**Nombre del parámetro**: `output_dir`  
**Valor predeterminado**: `"Primary"`  
**Descripción**: Directorio de salida para todos los archivos JSON

**Ejemplo de uso:**
```python
config = ConverterConfig(
    output_dir="TFDI_NavData",  # Nombre del directorio de salida personalizado
)
```

**Estructura de Directorio:**
```
TFDI_NavData/           # Directorio de salida principal
├── Airports.json       # Datos de aeropuertos
├── Runways.json        # Datos de pistas
├── Waypoints.json      # Datos de waypoints
├── ...                 # Otros archivos JSON
└── ProcedureLegs/      # Subdirectorio de tramos de procedimiento
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

#### Directorio de Tramos de Procedimiento
**Nombre del parámetro**: `procedure_legs_dir`  
**Valor predeterminado**: `"Primary/ProcedureLegs"`  
**Descripción**: Directorio de salida para los archivos de tramos de procedimiento terminal

**Ejemplo de configuración:**
```python
config = ConverterConfig(
    output_dir="NavData",
    procedure_legs_dir="NavData/Procedures",  # Directorio de tramos de procedimiento personalizado
)
```

#### Nombre del Archivo Comprimido
**Nombre del parámetro**: `archive_name`  
**Valor predeterminado**: `"Primary.7z"`  
**Descripción**: Nombre del archivo comprimido final generado

**Convenciones de Nomenclatura:**
```python
# Nomenclatura con marca de tiempo
import datetime
now = datetime.datetime.now()
config = ConverterConfig(
    archive_name=f"TFDI_NavData_{now.strftime('%Y%m%d_%H%M')}.7z"
)

# Nomenclatura con información de versión
config = ConverterConfig(
    archive_name="TFDI_NavData_v1.0.7z"
)
```

### Configuración de Procesamiento de Datos

#### Configuración de Precisión de Coordenadas
**Nombre del parámetro**: `coordinate_precision`  
**Valor predeterminado**: `8`  
**Rango**: `4 - 12`  
**Descripción**: Número de decimales para las coordenadas geográficas

**Tabla Comparativa de Precisión:**
| Precisión | Rango de error | Casos de uso | Impacto en el tamaño del archivo |
|-----------|----------------|--------------|----------------------------------|
| 4 dígitos | ~11 metros     | Navegación básica | Mínimo |
| 6 dígitos | ~1.1 metros    | Navegación estándar | Pequeño |
| 8 dígitos | ~1.1 centímetros | Navegación de alta precisión | Predeterminado |
| 10 dígitos| ~1.1 milímetros | Precisión muy alta | Grande |
| 12 dígitos| ~0.1 milímetros | Precisión de grado topográfico | Máximo |

**Ejemplo de configuración:**
```python
# Configuración de alta precisión (recomendado)
config = ConverterConfig(coordinate_precision=8)

# Configuración equilibrada (archivo más pequeño)
config = ConverterConfig(coordinate_precision=6)

# Configuración de muy alta precisión (archivo más grande)
config = ConverterConfig(coordinate_precision=10)
```

#### Configuración del Umbral VNAV
**Nombre del parámetro**: `vnav_threshold`  
**Valor predeterminado**: `2.5`  
**Unidad**: grados  
**Descripción**: Umbral de ángulo VNAV para la detección de puntos FAF

**Significado del Umbral:**
```python
# Detección FAF estricta (menos puntos FAF, pero más precisos)
config = ConverterConfig(vnav_threshold=2.0)

# Detección FAF estándar (equilibrio entre precisión y cobertura)
config = ConverterConfig(vnav_threshold=2.5)

# Detección FAF laxa (más puntos FAF, puede incluir falsos positivos)
config = ConverterConfig(vnav_threshold=3.0)
```

**Lógica de Detección FAF:**
```python
def is_faf_point(vnav_angle: float, vnav_threshold: float) -> bool:
    """Determina si es un punto FAF"""
    return (vnav_angle is not None and 
            vnav_angle <= vnav_threshold and 
            vnav_angle > 0)
```

## 🚀 Configuración de Rendimiento

### Optimización de la Base de Datos SQLite

#### Configuración de Conexión a la Base de Datos
```python
# Configuración de optimización de rendimiento de SQLite
sqlite_pragmas = {
    "journal_mode": "WAL",          # Modo de registro de escritura anticipada
    "synchronous": "NORMAL",        # Equilibra rendimiento y seguridad
    "cache_size": "10000",          # Número de páginas en caché (aprox. 40MB)
    "temp_store": "MEMORY",         # Almacenamiento de datos temporales en memoria
    "mmap_size": "268435456",       # Tamaño del mapa de memoria (256MB)
}

def optimize_database_connection(conn):
    """Optimiza la conexión a la base de datos"""
    for pragma, value in sqlite_pragmas.items():
        conn.execute(f"PRAGMA {pragma}={value}")
```

#### Configuración de Procesamiento por Lotes
**Parámetro**: Tamaño del lote  
**Valor predeterminado**: `1000`  
**Descripción**: Número de registros procesados en una sola vez

**Estrategia de Configuración:**
```python
import psutil

def get_optimal_batch_size():
    """Ajusta automáticamente el tamaño del lote según la memoria del sistema"""
    available_memory_gb = psutil.virtual_memory().available / (1024**3)
    
    if available_memory_gb < 4:
        return 500      # Sistemas con poca memoria
    elif available_memory_gb < 8:
        return 1000     # Configuración estándar
    else:
        return 2000     # Sistemas con mucha memoria

# Ejemplo de uso
batch_size = get_optimal_batch_size()
```

### Configuración de Gestión de Memoria

#### Configuración de Monitorización de Memoria
```python
class MemoryMonitor:
    """Configuración de monitorización de memoria"""
    
    def __init__(self):
        self.memory_limit_gb = 6        # Límite de uso de memoria
        self.warning_threshold = 0.8    # Umbral de advertencia (80%)
        self.critical_threshold = 0.9   # Umbral crítico (90%)
    
    def check_memory_usage(self):
        """Comprueba el uso de memoria"""
        memory = psutil.virtual_memory()
        usage_ratio = memory.used / memory.total
        
        if usage_ratio > self.critical_threshold:
            return "CRITICAL"
        elif usage_ratio > self.warning_threshold:
            return "WARNING"
        else:
            return "NORMAL"
```

#### Configuración de Recolección de Basura
```python
import gc

def configure_garbage_collection():
    """Configura la recolección de basura"""
    # Establece el umbral de recolección de basura
    gc.set_threshold(700, 10, 10)
    
    # Habilita la depuración de recolección de basura (usar solo para depuración)
    # gc.set_debug(gc.DEBUG_STATS)

def force_cleanup():
    """Fuerza la limpieza de memoria"""
    gc.collect()
    gc.collect()  # Ejecutar dos veces para asegurar una limpieza completa
    gc.collect()
```

## 🔍 Validación y Control de Calidad

### Configuración de Validación de Datos

#### Configuración del Nivel de Validación
```python
class ValidationConfig:
    """Configuración de validación de datos"""
    
    def __init__(self, level="standard"):
        self.level = level
        self.checks = self._get_checks_for_level(level)
    
    def _get_checks_for_level(self, level):
        """Obtiene los elementos de verificación según el nivel"""
        base_checks = [
            "file_exists",
            "database_format", 
            "required_tables"
        ]
        
        if level == "basic":
            return base_checks
        
        elif level == "standard":
            return base_checks + [
                "coordinate_ranges",
                "data_types",
                "foreign_keys"
            ]
        
        elif level == "strict":
            return base_checks + [
                "coordinate_ranges",
                "data_types", 
                "foreign_keys",
                "data_consistency",
                "duplicate_detection",
                "business_rules"
            ]
```

#### Configuración de Validación de Coordenadas
```python
class CoordinateValidator:
    """Configuración de validación de coordenadas"""
    
    def __init__(self):
        # Rango de coordenadas válidas
        self.lat_min = -90.0
        self.lat_max = 90.0
        self.lon_min = -180.0
        self.lon_max = 180.0
        
        # Rango de coordenadas sospechosas (podrían ser datos erróneos)
        self.suspicious_zones = [
            {"lat": (0, 0), "lon": (0, 0)},      # Las coordenadas del origen pueden ser erróneas
            {"lat": (90, 90), "lon": (0, 0)},    # Las coordenadas polares requieren verificación especial
        ]
    
    def validate_coordinate(self, lat, lon):
        """Valida una única coordenada"""
        # Comprueba el rango básico
        if not (self.lat_min <= lat <= self.lat_max):
            return False, f"Latitud fuera de rango: {lat}"
        
        if not (self.lon_min <= lon <= self.lon_max):
            return False, f"Longitud fuera de rango: {lon}"
        
        # Comprueba coordenadas sospechosas
        for zone in self.suspicious_zones:
            if (zone["lat"][0] <= lat <= zone["lat"][1] and 
                zone["lon"][0] <= lon <= zone["lon"][1]):
                return True, f"Coordenada sospechosa: ({lat}, {lon})"
        
        return True, "Coordenada válida"
```

### Control de Calidad de Salida

#### Validación del Formato de Archivo
```python
import json

class OutputValidator:
    """Configuración de validación de archivos de salida"""
    
    def __init__(self):
        self.required_files = [
            "Airports.json",
            "Runways.json", 
            "Waypoints.json",
            "Navaids.json",
            "Airways.json",
            "AirwayLegs.json",
            "Terminals.json",
            "ILSes.json"
        ]
        
        self.min_file_sizes = {
            "Airports.json": 1024,      # Al menos 1KB
            "Waypoints.json": 10240,    # Al menos 10KB
        }
    
    def validate_json_file(self, file_path):
        """Valida el formato del archivo JSON"""
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                data = json.load(f)
            
            if not isinstance(data, (dict, list)):
                return False, "El objeto raíz de JSON debe ser un diccionario o una lista"
            
            if isinstance(data, dict) and len(data) == 0:
                return False, "El objeto JSON está vacío"
            
            return True, "Formato JSON válido"
            
        except json.JSONDecodeError as e:
            return False, f"Error de formato JSON: {e}"
        except Exception as e:
            return False, f"Error de lectura del archivo: {e}"
```

## 🎛️ Configuración Avanzada

### Configuración de Registro (Logging)

#### Nivel y Formato de Registro
```python
import logging
from rich.logging import RichHandler

class LoggingConfig:
    """Clase de configuración de registro"""
    
    def __init__(self, level="INFO"):
        self.level = level
        self.format = "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
        self.file_name = "tfdi_converter.log"
        self.max_file_size = 10 * 1024 * 1024  # 10MB
        self.backup_count = 3
    
    def setup_logging(self):
        """Configura el sistema de registro"""
        # Crea el logger
        logger = logging.getLogger("TFDIConverter")
        logger.setLevel(getattr(logging, self.level))
        
        # Manejador de consola Rich
        console_handler = RichHandler(rich_tracebacks=True)
        console_handler.setLevel(logging.INFO)
        console_formatter = logging.Formatter("%(message)s")
        console_handler.setFormatter(console_formatter)
        
        # Manejador de archivo
        from logging.handlers import RotatingFileHandler
        file_handler = RotatingFileHandler(
            self.file_name, 
            maxBytes=self.max_file_size,
            backupCount=self.backup_count,
            encoding='utf-8'
        )
        file_handler.setLevel(logging.DEBUG)
        file_formatter = logging.Formatter(self.format)
        file_handler.setFormatter(file_formatter)
        
        # Añade los manejadores
        logger.addHandler(console_handler)
        logger.addHandler(file_handler)
        
        return logger
```

### Configuración de Compresión

#### Configuración del Nivel de Compresión
```python
import py7zr

class CompressionConfig:
    """Clase de configuración de compresión"""
    
    def __init__(self):
        self.compression_level = 5      # Nivel de compresión (1-9)
        self.method = "LZMA2"          # Algoritmo de compresión
        self.solid = True              # Compresión sólida
        self.multi_threading = True    # Compresión multihilo
    
    def create_archive(self, source_dir, archive_path):
        """Crea el archivo comprimido"""
        filters = [
            {"id": py7zr.FILTER_LZMA2, "preset": self.compression_level}
        ]
        
        with py7zr.SevenZipFile(
            archive_path, 
            'w', 
            filters=filters,
            mp=self.multi_threading
        ) as archive:
            archive.writeall(source_dir, ".")
```

### Configuración de Depuración

#### Configuración del Modo de Depuración
```python
class DebugConfig:
    """Clase de configuración de depuración"""
    
    def __init__(self, debug_mode=False):
        self.debug_mode = debug_mode
        self.save_intermediate_files = debug_mode
        self.verbose_logging = debug_mode
        self.performance_profiling = debug_mode
        self.memory_tracking = debug_mode
    
    def enable_debug_features(self):
        """Habilita las funciones de depuración"""
        if self.debug_mode:
            # Habilitar registro detallado
            logging.getLogger().setLevel(logging.DEBUG)
            
            # Habilitar perfilado de rendimiento
            if self.performance_profiling:
                import cProfile
                self.profiler = cProfile.Profile()
                self.profiler.enable()
            
            # Habilitar seguimiento de memoria
            if self.memory_tracking:
                import tracemalloc
                tracemalloc.start()
```

## 📝 Ejemplos de Configuración Completa

### Ejemplo de Configuración Básica
```python
# Configuración simple para principiantes
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8,
    vnav_threshold=2.5
)
```

### Ejemplo de Configuración de Alto Rendimiento
```python
# Configuración de optimización de rendimiento para hardware de gama alta
config = ConverterConfig(
    output_dir="Primary_HighPerf",
    coordinate_precision=8,
    vnav_threshold=2.5
)

# Junto con la configuración de optimización de rendimiento
batch_size = 2000
memory_limit_gb = 8
enable_multi_threading = True
```

### Ejemplo de Configuración de Alta Calidad
```python
# Adecuado para escenarios con requisitos de calidad de datos extremadamente altos
config = ConverterConfig(
    output_dir="Primary_HighQuality", 
    coordinate_precision=10,        # Mayor precisión
    vnav_threshold=2.0             # Detección FAF más estricta
)

# Junto con una validación estricta
validation_level = "strict"
enable_duplicate_detection = True
enable_consistency_check = True
```

### Ejemplo de Configuración de Depuración
```python
# Configuración para desarrollo y depuración
config = ConverterConfig(
    output_dir="Debug_Output",
    coordinate_precision=6,         # Menor precisión para acelerar el procesamiento
    vnav_threshold=3.0             # Umbral laxo para facilitar la depuración
)

# Opciones de depuración
debug_config = DebugConfig(debug_mode=True)
save_intermediate_files = True
verbose_logging = True
```

## 🔧 Gestión de Archivos de Configuración

### Formato del Archivo de Configuración
```python
# config.py
from dataclasses import dataclass, asdict
import json

@dataclass 
class TFDIConverterConfig:
    """Configuración completa del convertidor TFDI"""
    # Configuración de salida
    output_dir: str = "Primary"
    procedure_legs_dir: str = "Primary/ProcedureLegs"
    archive_name: str = "Primary.7z"
    
    # Configuración de procesamiento de datos
    coordinate_precision: int = 8
    vnav_threshold: float = 2.5
    
    # Configuración de rendimiento
    batch_size: int = 1000
    memory_limit_gb: int = 6
    
    # Configuración de validación
    validation_level: str = "standard"
    enable_coordinate_check: bool = True
    
    # Configuración de registro
    log_level: str = "INFO"
    log_file: str = "tfdi_converter.log"
    
    def save_to_file(self, file_path: str):
        """Guarda la configuración en un archivo"""
        with open(file_path, 'w', encoding='utf-8') as f:
            json.dump(asdict(self), f, indent=2)
    
    @classmethod
    def load_from_file(cls, file_path: str):
        """Carga la configuración desde un archivo"""
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        return cls(**data)
```

### Plantillas de Configuración
```python
# Crea plantillas de configuración
def create_config_templates():
    """Crea varias plantillas de configuración"""
    
    # Configuración predeterminada
    default_config = TFDIConverterConfig()
    default_config.save_to_file("config_default.json")
    
    # Configuración de alto rendimiento
    performance_config = TFDIConverterConfig(
        batch_size=2000,
        memory_limit_gb=8,
        coordinate_precision=6
    )
    performance_config.save_to_file("config_performance.json")
    
    # Configuración de alta calidad
    quality_config = TFDIConverterConfig(
        coordinate_precision=10,
        vnav_threshold=2.0,
        validation_level="strict"
    )
    quality_config.save_to_file("config_quality.json")

# Usar configuración
config = TFDIConverterConfig.load_from_file("config_performance.json")
```

---

**Siguiente paso**: Una vez completada la configuración, consulte las [Instrucciones de uso](usage.md) para comenzar su conversión de datos TFDI. 🚁✨
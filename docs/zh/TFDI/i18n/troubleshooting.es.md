# 🛠️ Resolución de Problemas del Conversor de Datos de Navegación TFDI

## 🚨 Errores Comunes y Soluciones

### 1. Problemas de Entorno e Instalación

#### ❌ Problemas de Entorno de Python

**Mensaje de error:**
```
ModuleNotFoundError: No module named 'rich'
ImportError: No module named 'pandas'
```

**Solución:**
```bash
# 1. Verificar la versión de Python
python --version  # Asegurarse de que sea ≥ 3.8

# 2. Actualizar pip
python -m pip install --upgrade pip

# 3. Instalar dependencias
pip install -r requirements.txt

# 4. Verificar la instalación
python -c "import rich, pandas; print('Dependencias instaladas correctamente')"
```

#### ❌ Error de Permisos

**Mensaje de error:**
```
PermissionError: [Errno 13] Permission denied
No se pudo crear el directorio de salida
```

**Solución:**
```bash
# Windows - Ejecutar como administrador
# Clic derecho en el Símbolo del sistema → "Ejecutar como administrador"

# macOS/Linux - Usar sudo o modificar permisos
sudo python converter.py
# o
chmod 755 /path/to/output/directory
```

### 2. Problemas de Acceso a la Base de Datos

#### ❌ Archivo de Base de Datos Inexistente

**Mensaje de error:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
No se pudo encontrar el archivo de base de datos de Fenix
```

**Solución:**
1.  **Verificar la instalación de Fenix**:
    ```bash
    # Ruta común
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\
    ```

2.  **Localizar el archivo manualmente**:
    ```bash
    # Windows
    dir /s nd.db3
    
    # macOS/Linux
    find ~ -name "nd.db3" 2>/dev/null
    ```

3.  **Regenerar la base de datos**:
    -   Iniciar MSFS
    -   Cargar el Fenix A320
    -   Esperar a que se carguen los datos de navegación

#### ❌ Base de Datos Corrupta

**Mensaje de error:**
```
sqlite3.DatabaseError: database disk image is malformed
El archivo de la base de datos está corrupto
```

**Método de diagnóstico:**
```python
import sqlite3

def check_database_integrity(db_path):
    try:
        conn = sqlite3.connect(db_path)
        cursor = conn.cursor()
        cursor.execute("PRAGMA integrity_check")
        result = cursor.fetchone()
        if result[0] == "ok":
            print("✅ Integridad de la base de datos normal")
        else:
            print(f"❌ Base de datos corrupta: {result[0]}")
    except Exception as e:
        print(f"❌ No se puede acceder a la base de datos: {e}")
    finally:
        conn.close()
```

**Plan de reparación:**
```bash
# 1. Hacer una copia de seguridad de la base de datos corrupta
cp nd.db3 nd.db3.backup

# 2. Intentar reparar con SQLite
sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3

# 3. Si la reparación falla, obtener una nueva base de datos
# Eliminar el archivo y reiniciar Fenix
```

#### ❌ Estructura de Tabla de la Base de Datos Incompatible

**Mensaje de error:**
```
sqlite3.OperationalError: no such table: Terminals
La base de datos carece de tablas necesarias
```

**Script de validación:**
```python
def validate_database_schema(db_path):
    required_tables = [
        'Airports', 'Runways', 'Waypoints', 'Navaids',
        'Airways', 'AirwayLegs', 'Terminals', 'TerminalLegs',
        'ILSes', 'AirportLookup', 'NavaidLookup', 'WaypointLookup'
    ]
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    existing_tables = {row[0] for row in cursor.fetchall()}
    
    missing_tables = set(required_tables) - existing_tables
    if missing_tables:
        print(f"❌ Tablas faltantes: {missing_tables}")
        return False
    
    print("✅ Estructura de la base de datos validada correctamente")
    return True
```

### 3. Problemas de Memoria y Rendimiento

#### ❌ Memoria Insuficiente

**Mensaje de error:**
```
MemoryError: Unable to allocate array
Memoria insuficiente, no se pueden procesar los datos
```

**Monitorizar el uso de memoria:**
```python
import psutil
import gc

def monitor_memory_usage():
    memory = psutil.virtual_memory()
    print(f"Memoria total: {memory.total // 1024**3} GB")
    print(f"Memoria usada: {memory.used // 1024**3} GB")
    print(f"Memoria disponible: {memory.available // 1024**3} GB")
    print(f"Porcentaje de uso: {memory.percent}%")

def optimize_memory():
    # Forzar la recolección de basura
    gc.collect()
    
    # Limpiar la caché de pandas
    import pandas as pd
    pd.reset_option('all')
```

**Solución:**
```python
# 1. Reducir el tamaño del lote
config = ConverterConfig(
    batch_size=500,  # Reducir desde el valor predeterminado de 1000
    coordinate_precision=6  # Reducir la precisión
)

# 2. Habilitar el procesamiento por flujo
def process_large_table_streaming(table_name):
    chunk_size = 1000
    offset = 0
    
    while True:
        query = f"""
        SELECT * FROM {table_name} 
        LIMIT {chunk_size} OFFSET {offset}
        """
        
        chunk = pd.read_sql_query(query, conn)
        if chunk.empty:
            break
            
        process_chunk(chunk)
        del chunk  # Liberar memoria
        gc.collect()
        
        offset += chunk_size
```

#### ❌ Velocidad de Procesamiento Demasiado Lenta

**Síntoma:** El proceso de conversión se detiene en un paso durante mucho tiempo

**Diagnóstico de rendimiento:**
```python
import time
import cProfile

def profile_conversion():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # Ejecutar la conversión
    converter.convert(db_path, terminal_id)
    
    profiler.disable()
    profiler.dump_stats('conversion_profile.prof')

# Analizar cuellos de botella de rendimiento
# python -m cProfile -o profile.prof converter.py
# python -c "import pstats; pstats.Stats('profile.prof').sort_stats('cumulative').print_stats(10)"
```

**Sugerencias de optimización:**
```python
# 1. Optimización de rendimiento de SQLite
def optimize_sqlite_connection(conn):
    conn.execute("PRAGMA journal_mode=WAL")
    conn.execute("PRAGMA synchronous=NORMAL")
    conn.execute("PRAGMA cache_size=10000")
    conn.execute("PRAGMA temp_store=MEMORY")

# 2. Procesamiento paralelo
from concurrent.futures import ThreadPoolExecutor

def parallel_table_processing():
    tables = ['Airports', 'Runways', 'Waypoints', 'Navaids']
    
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = []
        for table in tables:
            future = executor.submit(process_table, table)
            futures.append(future)
        
        # Esperar a que todas las tareas se completen
        for future in futures:
            future.result()
```

### 4. Problemas de Conversión de Datos

#### ❌ Datos de Coordenadas Anómalos

**Mensaje de error:**
```
ValueError: Invalid coordinate value: latitude=91.5
Coordenadas fuera del rango válido
```

**Validación y reparación:**
```python
def validate_and_fix_coordinates(df):
    """Valida y repara los datos de coordenadas"""
    initial_count = len(df)
    
    # Verificar el rango de latitud [-90, 90]
    invalid_lat = (df['Latitude'] < -90) | (df['Latitude'] > 90)
    if invalid_lat.any():
        print(f"Se encontraron {invalid_lat.sum()} valores de latitud inválidos")
        df = df[~invalid_lat]
    
    # Verificar el rango de longitud [-180, 180]
    invalid_lon = (df['Longitude'] < -180) | (df['Longitude'] > 180)
    if invalid_lon.any():
        print(f"Se encontraron {invalid_lon.sum()} valores de longitud inválidos")
        df = df[~invalid_lon]
    
    removed_count = initial_count - len(df)
    if removed_count > 0:
        print(f"⚠️ Se eliminaron {removed_count} registros de coordenadas inválidas")
    
    return df
```

#### ❌ Fallo de Serialización JSON

**Mensaje de error:**
```
TypeError: Object of type 'datetime' is not JSON serializable
Error de serialización JSON
```

**Solución:**
```python
import json
from datetime import datetime
import numpy as np

class CustomJSONEncoder(json.JSONEncoder):
    """Codificador JSON personalizado"""
    
    def default(self, obj):
        if isinstance(obj, datetime):
            return obj.isoformat()
        elif isinstance(obj, np.integer):
            return int(obj)
        elif isinstance(obj, np.floating):
            return float(obj)
        elif isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)

# Usar el codificador personalizado
def safe_json_dump(data, file_path):
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(data, f, cls=CustomJSONEncoder, 
                 ensure_ascii=False, indent=2)
```

#### ❌ Problemas de Codificación de Caracteres

**Mensaje de error:**
```
UnicodeDecodeError: 'utf-8' codec can't decode byte
Error de codificación de caracteres
```

**Solución:**
```python
import chardet

def detect_and_convert_encoding(file_path):
    """Detecta y convierte la codificación del archivo"""
    # Detectar codificación
    with open(file_path, 'rb') as f:
        raw_data = f.read()
        encoding = chardet.detect(raw_data)['encoding']
    
    print(f"Codificación detectada: {encoding}")
    
    # Convertir a UTF-8
    with open(file_path, 'r', encoding=encoding) as f:
        content = f.read()
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(content)

def safe_string_handling(text):
    """Manejo seguro de cadenas"""
    if isinstance(text, bytes):
        # Intentar con múltiples codificaciones
        for encoding in ['utf-8', 'gbk', 'latin1']:
            try:
                return text.decode(encoding)
            except UnicodeDecodeError:
                continue
        # Si todas fallan, usar manejo de errores
        return text.decode('utf-8', errors='replace')
    return str(text)
```

### 5. Problemas de Archivos de Salida

#### ❌ Fallo al Crear el Archivo Comprimido

**Mensaje de error:**
```
py7zr.exceptions.Bad7zFile: not a 7z file
Fallo al crear el archivo comprimido
```

**Solución:**
```python
import py7zr
import shutil
from pathlib import Path

def safe_create_archive(source_dir, archive_path):
    """Crear archivo comprimido de forma segura"""
    try:
        # Asegurarse de que el directorio de origen existe
        if not Path(source_dir).exists():
            raise FileNotFoundError(f"El directorio de origen no existe: {source_dir}")
        
        # Eliminar el archivo comprimido existente
        if Path(archive_path).exists():
            Path(archive_path).unlink()
        
        # Crear el archivo comprimido
        with py7zr.SevenZipFile(archive_path, 'w') as archive:
            archive.writeall(source_dir, ".")
        
        print(f"✅ Archivo comprimido creado correctamente: {archive_path}")
        return True
        
    except Exception as e:
        print(f"❌ Fallo al crear el archivo comprimido: {e}")
        
        # Plan de contingencia: Crear archivo ZIP
        try:
            shutil.make_archive(
                str(Path(archive_path).with_suffix('')), 
                'zip', 
                source_dir
            )
            print("✅ Archivo de respaldo en formato ZIP creado")
            return True
        except Exception as zip_error:
            print(f"❌ La creación del ZIP también falló: {zip_error}")
            return False
```

#### ❌ Tamaño de Archivo Anómalo

**Síntoma:** El archivo de salida es demasiado pequeño o demasiado grande

**Método de verificación:**
```python
def validate_output_files(output_dir):
    """Valida los archivos de salida"""
    expected_files = [
        'Airports.json', 'Runways.json', 'Waypoints.json',
        'Navaids.json', 'Airways.json', 'AirwayLegs.json',
        'Terminals.json', 'ILSes.json'
    ]
    
    file_info = {}
    for file_name in expected_files:
        file_path = Path(output_dir) / file_name
        if file_path.exists():
            size = file_path.stat().st_size
            file_info[file_name] = {
                'exists': True,
                'size_mb': size / 1024 / 1024,
                'empty': size == 0
            }
        else:
            file_info[file_name] = {'exists': False}
    
    # Imprimir información del archivo
    print("📁 Verificación de archivos de salida:")
    for file_name, info in file_info.items():
        if info['exists']:
            if info.get('empty', False):
                print(f"⚠️ {file_name}: Archivo vacío")
            else:
                print(f"✅ {file_name}: {info['size_mb']:.2f} MB")
        else:
            print(f"❌ {file_name}: Archivo faltante")
    
    return file_info
```

## 🔍 Herramientas de Diagnóstico

### 1. Verificación del Entorno del Sistema

```python
def system_diagnostics():
    """Diagnóstico del entorno del sistema"""
    import platform
    import sys
    import psutil
    
    print("🔍 Diagnóstico del entorno del sistema")
    print("=" * 50)
    
    # Información del sistema operativo
    print(f"Sistema operativo: {platform.system()} {platform.release()}")
    print(f"Arquitectura: {platform.machine()}")
    
    # Entorno de Python
    print(f"Versión de Python: {sys.version}")
    print(f"Ruta de Python: {sys.executable}")
    
    # Información de hardware
    print(f"Número de núcleos de CPU: {psutil.cpu_count()}")
    memory = psutil.virtual_memory()
    print(f"Memoria total: {memory.total // 1024**3} GB")
    print(f"Memoria disponible: {memory.available // 1024**3} GB")
    
    # Espacio en disco
    disk = psutil.disk_usage('.')
    print(f"Espacio total en disco: {disk.total // 1024**3} GB")
    print(f"Espacio libre en disco: {disk.free // 1024**3} GB")
```

### 2. Verificación de Paquetes de Dependencia

```python
def verify_dependencies():
    """Verifica los paquetes de dependencia"""
    required_packages = [
        'rich', 'pandas', 'py7zr', 'sqlite3'
    ]
    
    print("📦 Verificación de paquetes de dependencia")
    print("=" * 30)
    
    for package in required_packages:
        try:
            module = __import__(package)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {package}: {version}")
        except ImportError:
            print(f"❌ {package}: No instalado")
        except Exception as e:
            print(f"⚠️ {package}: Error - {e}")
```

### 3. Herramienta de Monitoreo de Rendimiento

```python
import time
import threading
from contextlib import contextmanager

class PerformanceMonitor:
    """Monitor de rendimiento"""
    
    def __init__(self):
        self.metrics = {}
        self.monitoring = False
    
    @contextmanager
    def measure(self, operation_name):
        """Mide el tiempo de operación"""
        start_time = time.time()
        start_memory = psutil.virtual_memory().used
        
        try:
            yield
        finally:
            end_time = time.time()
            end_memory = psutil.virtual_memory().used
            
            self.metrics[operation_name] = {
                'duration': end_time - start_time,
                'memory_delta': end_memory - start_memory
            }
    
    def start_monitoring(self):
        """Comienza el monitoreo en tiempo real"""
        self.monitoring = True
        
        def monitor():
            while self.monitoring:
                cpu_percent = psutil.cpu_percent()
                memory = psutil.virtual_memory()
                
                print(f"\r🔄 CPU: {cpu_percent:5.1f}% | "
                      f"Memoria: {memory.percent:5.1f}% | "
                      f"Disponible: {memory.available//1024**2:,} MB", 
                      end='', flush=True)
                
                time.sleep(1)
        
        monitor_thread = threading.Thread(target=monitor, daemon=True)
        monitor_thread.start()
    
    def stop_monitoring(self):
        """Detiene el monitoreo"""
        self.monitoring = False
        print()  # Nueva línea
    
    def print_summary(self):
        """Imprime el resumen de rendimiento"""
        print("\n📊 Resumen de rendimiento:")
        print("-" * 40)
        
        for operation, metrics in self.metrics.items():
            duration = metrics['duration']
            memory_mb = metrics['memory_delta'] / 1024 / 1024
            
            print(f"{operation:20s}: {duration:8.2f}s | "
                  f"{memory_mb:+8.1f}MB")

# Ejemplo de uso
monitor = PerformanceMonitor()
monitor.start_monitoring()

with monitor.measure("Validación de base de datos"):
    validate_database(db_path)

with monitor.measure("Conversión de datos"):
    convert_data()

monitor.stop_monitoring()
monitor.print_summary()
```

## 📋 Lista de Verificación de Solución de Problemas

### 🔧 Verificaciones Pre-conversión
- [ ] Versión de Python ≥ 3.8
- [ ] Todos los paquetes de dependencia instalados y con la versión correcta
- [ ] El archivo de base de datos de Fenix existe y está completo
- [ ] Suficiente memoria disponible (se recomiendan 4GB+)
- [ ] Suficiente espacio en disco (se recomienda 1GB+)
- [ ] El directorio de salida tiene permisos de escritura

### 📊 Verificaciones del Proceso de Conversión
- [ ] Conexión a la base de datos exitosa
- [ ] Todas las tablas requeridas existen
- [ ] Los datos de coordenadas están dentro del rango válido
- [ ] El uso de memoria está dentro de un rango razonable
- [ ] No hay errores de permisos
- [ ] Los archivos temporales se crearon correctamente

### 📁 Validación Post-conversión
- [ ] Todos los archivos JSON han sido generados
- [ ] El tamaño de los archivos es razonable (no están vacíos o son anormalmente grandes)
- [ ] El formato JSON es válido
- [ ] El archivo comprimido se creó correctamente
- [ ] Los archivos temporales han sido limpiados
- [ ] No hay errores graves en los registros

## 🆘 Obtener Ayuda

### Autodiagnóstico
1.  **Ejecutar la herramienta de diagnóstico**:
    ```python
    from tfdi_converter.diagnostics import run_full_diagnostics
    run_full_diagnostics()
    ```

2.  **Ver registros detallados**:
    ```bash
    tail -f converter.log
    grep -i error converter.log
    ```

3.  **Verificar los recursos del sistema**:
    ```bash
    # Windows
    taskmgr
    
    # macOS
    activity monitor
    
    # Linux
    top
    htop
    ```

### Soporte de la Comunidad
-   **GitHub Issues**: Informar errores y problemas técnicos
-   **GitHub Discussions**: Compartir preguntas de uso y experiencias
-   **Documentación del proyecto**: Consultar la guía de uso completa

### Al informar un problema, por favor proporcione:
-   **Registro de errores completo**
-   **Información del entorno del sistema**
-   **Versión del conversor**
-   **Información de la base de datos** (tamaño, AIRAC, etc.)
-   **Pasos para reproducir**
-   **Archivos de configuración relevantes**

---

**¿Encontró un problema sin resolver?** 

Por favor, cree un nuevo problema en [GitHub Issues](https://github.com/your-org/tfdi-converter/issues) y le ayudaremos a resolverlo lo antes posible. 🚁✨
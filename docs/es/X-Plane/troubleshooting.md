---
title: Guía de solución de problemas
description: Diagnóstico sistemático de fallos del sistema Nav-data y soluciones
---

# Guía de solución de problemas

Este documento proporciona métodos sistemáticos de diagnóstico de fallos y soluciones para ayudar a los usuarios a identificar y resolver rápidamente los problemas encontrados durante el uso de Nav-data.

## 🔍 Proceso de diagnóstico rápido

### Paso uno: Verificación del entorno
```bash
# 1. Comprobar la versión de Python
python --version
# Debería mostrar la versión Python 3.6+

# 2. Comprobar la instalación de paquetes de dependencia
pip list | grep -E "(pandas|numpy|pdfplumber|tqdm|colorama|geopy)"

# 3. Comprobar el directorio de trabajo
ls -la
# Debería mostrar la estructura de archivos del proyecto

# 4. Comprobar los recursos del sistema
df -h          # Espacio en disco
free -h        # Memoria (Linux/macOS)
# Windows: Ver en el Administrador de tareas
```

### Paso dos: Análisis de registros
```bash
# Habilitar registros detallados
export NAV_DATA_DEBUG=1  # Linux/macOS
set NAV_DATA_DEBUG=1     # Windows

# Ver los registros de errores más recientes
tail -n 50 logs/nav-data.log
```

### Paso tres: Validación de archivos de datos
```bash
# Comprobar archivo de entrada
file -I input_file.csv   # Comprobar codificación
head -n 5 input_file.csv # Ver las primeras líneas

# Validar la integridad del archivo
wc -l input_file.csv     # Conteo de líneas
```

## 🚨 Patrones de error comunes

### Clasificación de tipos de error

#### A. Errores de configuración del entorno
- Versión de Python incompatible
- Paquetes de dependencia faltantes o conflictos de versión
- Errores de configuración de ruta
- Problemas de permisos

#### B. Errores de formato de datos
- Problemas de codificación CSV
- Formato PDF no compatible
- Campos faltantes o formato incorrecto
- Problemas de formato de coordenadas

#### C. Problemas de recursos del sistema
- Memoria insuficiente
- Espacio en disco insuficiente
- Límite de descriptores de archivo excedido
- Problemas de conexión de red

#### D. Errores de procesamiento lógico
- Fallo en la validación de datos
- Errores de reglas de conversión
- Formato de salida incorrecto
- Conflictos de procesamiento concurrente

## 🔧 Solución de problemas detallada

### 1. Problemas de instalación y entorno

#### Problema: ModuleNotFoundError
```
Error: ModuleNotFoundError: No module named 'pandas'
```

**Pasos de diagnóstico:**
```bash
# 1. Confirmar el entorno Python actual
which python
python -c "import sys; print(sys.path)"

# 2. Comprobar el estado del entorno virtual
echo $VIRTUAL_ENV  # Debería mostrar la ruta del entorno virtual

# 3. Verificar la instalación del paquete
pip show pandas
```

**Soluciones:**
```bash
# Solución 1: Reinstalar dependencias
pip install -r requirements.txt

# Solución 2: Crear un nuevo entorno virtual
python -m venv nav-data-env-new
source nav-data-env-new/bin/activate
pip install -r requirements.txt

# Solución 3: Usar entorno conda
conda create -n nav-data python=3.8
conda activate nav-data
pip install -r requirements.txt
```

#### Problema: Permission Denied
```
Error: PermissionError: [Errno 13] Permission denied
```

**Pasos de diagnóstico:**
```bash
# 1. Comprobar permisos del archivo
ls -la target_file

# 2. Comprobar permisos del directorio
ls -ld target_directory

# 3. Comprobar el usuario actual
whoami
groups
```

**Soluciones:**
```bash
# Solución 1: Modificar permisos del archivo
chmod 644 target_file    # Permisos de archivo
chmod 755 target_dir     # Permisos de directorio

# Solución 2: Cambiar propietario (si es necesario)
sudo chown $USER:$USER target_file

# Solución 3: Usar el directorio de usuario
mkdir ~/nav-data-workspace
cd ~/nav-data-workspace
```

#### Problema: Conflicto de versión de Python
```
Error: SyntaxError: invalid syntax (Python 2.7 detected)
```

**Pasos de diagnóstico:**
```bash
# Comprobar todas las versiones de Python
python --version
python3 --version
which python
which python3

# Comprobar el Python predeterminado
ls -la /usr/bin/python*
```

**Soluciones:**
```bash
# Solución 1: Llamada explícita con python3
python3 script.py

# Solución 2: Crear un alias
echo "alias python=python3" >> ~/.bashrc
source ~/.bashrc

# Solución 3: Actualizar el valor predeterminado del sistema (operar con precaución)
sudo update-alternatives --install /usr/bin/python python /usr/bin/python3 1
```

### 2. Problemas de procesamiento de datos

#### Problema: Error de codificación CSV
```
Error: UnicodeDecodeError: 'utf-8' codec can't decode
```

**Script de diagnóstico:**
```python
#!/usr/bin/env python3
"""
Herramienta de diagnóstico de codificación CSV
"""
import chardet
import pandas as pd
from pathlib import Path

def diagnose_csv_encoding(file_path):
    """Diagnostica la codificación de un archivo CSV"""
    file_path = Path(file_path)
    
    print(f"🔍 Diagnosticando archivo: {file_path}")
    
    # 1. Información básica del archivo
    print(f"Tamaño del archivo: {file_path.stat().st_size} bytes")
    
    # 2. Detección automática de codificación
    with open(file_path, 'rb') as f:
        raw_data = f.read(10000)  # Leer los primeros 10KB
        encoding_info = chardet.detect(raw_data)
        print(f"Codificación detectada: {encoding_info}")
    
    # 3. Intentar con diferentes codificaciones
    encodings = ['utf-8', 'gbk', 'gb2312', 'utf-16', 'latin1']
    
    for encoding in encodings:
        try:
            df = pd.read_csv(file_path, encoding=encoding, nrows=5)
            print(f"✅ {encoding}: Lectura exitosa de {len(df)} líneas")
            print(f"   Nombres de columna: {list(df.columns)}")
            break
        except Exception as e:
            print(f"❌ {encoding}: {str(e)[:50]}...")
    
    return encoding_info['encoding']

# Ejemplo de uso
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnosed_encoding = diagnose_csv_encoding(sys.argv[1])
        print(f"\n💡 Codificación recomendada: {diagnosed_encoding}")
```

**Soluciones:**
```python
# Solución 1: Especificar la codificación correcta
import pandas as pd
df = pd.read_csv('file.csv', encoding='gbk')

# Solución 2: Convertir codificación de archivo
import codecs
with codecs.open('input.csv', 'r', 'gbk') as f_in:
    with codecs.open('output.csv', 'w', 'utf-8') as f_out:
        f_out.write(f_in.read())

# Solución 3: Detección automática de codificación
import chardet
with open('file.csv', 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']
df = pd.read_csv('file.csv', encoding=encoding)
```

#### Problema: Fallo en el análisis de PDF
```
Error: PDFSyntaxError: No /Root object found
```

**Herramienta de diagnóstico:**
```python
#!/usr/bin/env python3
"""
Herramienta de diagnóstico de archivos PDF
"""
import pdfplumber
from pathlib import Path

def diagnose_pdf_file(file_path):
    """Diagnostica problemas en archivos PDF"""
    file_path = Path(file_path)
    
    print(f"🔍 Diagnosticando archivo PDF: {file_path}")
    
    # 1. Información básica del archivo
    print(f"Tamaño del archivo: {file_path.stat().st_size} bytes")
    
    # 2. Intentar abrir PDF
    try:
        with pdfplumber.open(file_path) as pdf:
            print(f"✅ Apertura de PDF exitosa")
            print(f"Número de páginas: {len(pdf.pages)}")
            
            # Comprobar la primera página
            if pdf.pages:
                first_page = pdf.pages[0]
                print(f"Dimensiones de la primera página: {first_page.width} x {first_page.height}")
                
                # Prueba de extracción de texto
                text = first_page.extract_text()
                if text:
                    print(f"Extracción de texto exitosa, primeros 100 caracteres: {text[:100]}...")
                else:
                    print("⚠️  No se puede extraer texto, podría ser un PDF escaneado")
                
                # Comprobar tablas
                tables = first_page.extract_tables()
                print(f"Se detectaron {len(tables)} tablas")
                
                # Comprobar imágenes
                images = first_page.images
                print(f"Se detectaron {len(images)} imágenes")
                
    except Exception as e:
        print(f"❌ Fallo al abrir PDF: {e}")
        
        # Sugerencias para intentar reparar
        print("\n💡 Sugerencias de reparación:")
        print("1. Comprobar si el archivo PDF está dañado")
        print("2. Intentar abrir con Adobe Reader para verificar")
        print("3. Usar una herramienta de reparación de PDF")
        print("4. Volver a descargar u obtener el archivo PDF")

# Ejemplo de uso
if __name__ == "__main__":
    import sys
    if len(sys.argv) > 1:
        diagnose_pdf_file(sys.argv[1])
```

**Soluciones:**
```python
# Solución 1: Usar opciones de análisis más permisivas
import pdfplumber
try:
    with pdfplumber.open(pdf_file, password="") as pdf:
        # Lógica de procesamiento
        pass
except Exception as e:
    print(f"Fallo en el análisis de PDF: {e}")

# Solución 2: Intentar con otras bibliotecas de PDF
import pypdf2
try:
    with open(pdf_file, 'rb') as f:
        reader = pypdf2.PdfFileReader(f)
        # Lógica de procesamiento
except Exception as e:
    print(f"La biblioteca de PDF alternativa también falló: {e}")

# Solución 3: Preprocesar PDF
# Usar herramientas externas como pdftk para reparar PDF
import subprocess
subprocess.run(['pdftk', 'broken.pdf', 'output', 'fixed.pdf'])
```

#### Problema: Error de conversión de coordenadas
```
Error: ValueError: invalid literal for float()
```

**Herramienta de diagnóstico:**
```python
#!/usr/bin/env python3
"""
Herramienta de diagnóstico de datos de coordenadas
"""
import re

def diagnose_coordinate_data(text):
    """Diagnostica el formato de los datos de coordenadas"""
    print(f"🔍 Diagnosticando datos de coordenadas: {text[:50]}...")
    
    # Patrones comunes de formato de coordenadas
    patterns = {
        'decimal': r'[+-]?\d+\.\d+',
        'dms_with_symbols': r'\d+°\d+′\d+″',
        'dms_with_letters': r'\d+[°]\d+[\']\d+["]',
        'dms_spaces': r'\d+\s+\d+\s+\d+',
        'chinese_format': r'北纬|南纬|东经|西经',
    }
    
    found_patterns = []
    for name, pattern in patterns.items():
        matches = re.findall(pattern, text)
        if matches:
            found_patterns.append((name, matches[:3]))  # Mostrar las 3 primeras coincidencias
    
    print("Formatos de coordenadas detectados:")
    for name, matches in found_patterns:
        print(f"  {name}: {matches}")
    
    # Extraer coordenadas posibles
    coord_candidates = re.findall(r'\d+[°′″\s\'"]+\d+[°′″\s\'"]*\d*', text)
    print(f"Candidatos a coordenadas: {coord_candidates[:5]}")
    
    return found_patterns

def test_coordinate_conversion(coord_string):
    """Prueba la conversión de coordenadas"""
    print(f"\n🧪 Probando conversión: {coord_string}")
    
    try:
        # Intentar diferentes métodos de conversión
        
        # Método 1: Convertir directamente a número de coma flotante
        try:
            result = float(coord_string)
            print(f"  Conversión directa: {result}")
            return result
        except ValueError:
            pass
        
        # Método 2: Conversión de grados, minutos y segundos
        dms_pattern = r'(\d+)[°]\s*(\d+)[′\']\s*(\d+(?:\.\d+)?)[″"]?'
        match = re.search(dms_pattern, coord_string)
        if match:
            degrees, minutes, seconds = map(float, match.groups())
            decimal = degrees + minutes/60 + seconds/3600
            print(f"  Conversión de grados, minutos y segundos: {decimal}")
            return decimal
        
        # Método 3: Convertir después de limpiar caracteres especiales
        cleaned = re.sub(r'[^\d\.]', '', coord_string)
        if cleaned:
            result = float(cleaned)
            print(f"  Conversión después de limpiar: {result}")
            return result
            
        print(f"  ❌ Fallo en la conversión")
        return None
        
    except Exception as e:
        print(f"  ❌ Excepción de conversión: {e}")
        return None

# Ejemplo de uso
if __name__ == "__main__":
    test_data = "北纬39°48'35.6\" 东经116°34'46.7\""
    diagnose_coordinate_data(test_data)
    test_coordinate_conversion("39°48'35.6\"")
```

### 3. Problemas de recursos del sistema

#### Problema: Memoria insuficiente
```
Error: MemoryError: Unable to allocate array
```

**Script de monitoreo de memoria:**
```python
#!/usr/bin/env python3
"""
Herramienta de monitoreo de uso de memoria
"""
import psutil
import gc
import os
from functools import wraps

def monitor_memory(func):
    """Decorador de monitoreo de memoria"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Obtener el estado inicial de la memoria
        process = psutil.Process(os.getpid())
        initial_memory = process.memory_info().rss / 1024 / 1024  # MB
        
        print(f"🔍 Memoria antes de la ejecución: {initial_memory:.2f} MB")
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Recolección de basura forzada
            gc.collect()
            
            # Obtener el estado final de la memoria
            final_memory = process.memory_info().rss / 1024 / 1024  # MB
            memory_delta = final_memory - initial_memory
            
            print(f"🔍 Memoria después de la ejecución: {final_memory:.2f} MB")
            print(f"🔍 Cambio de memoria: {memory_delta:+.2f} MB")
            
            # Advertencia de memoria
            if final_memory > 1000:  # Más de 1 GB
                print("⚠️  Uso de memoria alto, se recomienda optimizar")
    
    return wrapper

def check_system_memory():
    """Comprueba el estado de la memoria del sistema"""
    memory = psutil.virtual_memory()
    
    print("💾 Estado de la memoria del sistema:")
    print(f"  Memoria total: {memory.total / 1024**3:.2f} GB")
    print(f"  Memoria disponible: {memory.available / 1024**3:.2f} GB")
    print(f"  Tasa de uso: {memory.percent:.1f}%")
    
    if memory.percent > 80:
        print("⚠️  La tasa de uso de la memoria del sistema es demasiado alta")
        return False
    return True

# Función de procesamiento de datos optimizada para memoria
@monitor_memory
def memory_efficient_csv_processing(file_path, chunk_size=1000):
    """Procesamiento de CSV amigable con la memoria"""
    import pandas as pd
    
    results = []
    
    # Leer archivos grandes por bloques
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Procesar bloque de datos
        processed_chunk = process_data_chunk(chunk)
        results.append(processed_chunk)
        
        # Liberar memoria
        del chunk
        gc.collect()
    
    return pd.concat(results, ignore_index=True)

def process_data_chunk(chunk):
    """Procesa un solo bloque de datos"""
    # Lógica real de procesamiento de datos
    return chunk  # Ejemplo simplificado
```

**Soluciones:**
```python
# Solución 1: Procesamiento por bloques
def process_large_file_in_chunks(file_path, chunk_size=1000):
    import pandas as pd
    
    processed_data = []
    
    for chunk in pd.read_csv(file_path, chunksize=chunk_size):
        # Procesar un solo bloque
        processed_chunk = your_processing_function(chunk)
        processed_data.append(processed_chunk)
        
        # Liberar memoria
        del chunk
        gc.collect()
    
    return pd.concat(processed_data, ignore_index=True)

# Solución 2: Usar generadores
def data_generator(file_path):
    """Generador de datos, ahorra memoria"""
    with open(file_path, 'r') as f:
        for line in f:
            yield process_line(line)

# Solución 3: Aumentar la memoria virtual
# Linux/macOS:
# sudo fallocate -l 4G /swapfile
# sudo mkswap /swapfile
# sudo swapon /swapfile
```

#### Problema: Espacio en disco insuficiente
```
Error: OSError: [Errno 28] No space left on device
```

**Script de verificación de espacio en disco:**
```python
#!/usr/bin/env python3
"""
Herramienta de monitoreo de espacio en disco
"""
import shutil
import os
from pathlib import Path

def check_disk_space(path="."):
    """Comprueba el espacio en disco"""
    total, used, free = shutil.disk_usage(path)
    
    print(f"💽 Estado del espacio en disco ({path}):")
    print(f"  Espacio total: {total / 1024**3:.2f} GB")
    print(f"  Usado: {used / 1024**3:.2f} GB")
    print(f"  Espacio disponible: {free / 1024**3:.2f} GB")
    print(f"  Tasa de uso: {used/total*100:.1f}%")
    
    # Advertencia de espacio insuficiente
    if free < 1024**3:  # Menos de 1 GB
        print("⚠️  ¡Espacio en disco insuficiente!")
        return False
    
    return True

def cleanup_temp_files():
    """Limpia archivos temporales"""
    temp_patterns = [
        "*.tmp",
        "*.temp", 
        "*.cache",
        "*.log",
        "__pycache__",
        ".pytest_cache"
    ]
    
    current_dir = Path(".")
    total_cleaned = 0
    
    for pattern in temp_patterns:
        for file_path in current_dir.rglob(pattern):
            try:
                if file_path.is_file():
                    size = file_path.stat().st_size
                    file_path.unlink()
                    total_cleaned += size
                    print(f"Eliminado archivo: {file_path}")
                elif file_path.is_dir():
                    import shutil
                    size = sum(f.stat().st_size for f in file_path.rglob('*') if f.is_file())
                    shutil.rmtree(file_path)
                    total_cleaned += size
                    print(f"Eliminado directorio: {file_path}")
            except Exception as e:
                print(f"No se pudo eliminar {file_path}: {e}")
    
    print(f"💾 Se limpiaron un total de {total_cleaned / 1024**2:.2f} MB")

def estimate_output_size(input_file):
    """Estima el tamaño del archivo de salida"""
    input_size = Path(input_file).stat().st_size
    
    # Estimación basada en el tipo de procesamiento (esta es una estimación simplificada)
    estimated_multiplier = {
        '.csv': 1.2,    # CSV a DAT suele ser ligeramente más grande
        '.pdf': 0.1,    # La extracción de texto de PDF suele ser mucho más pequeña
        '.dat': 1.0,    # La reparación de formato DAT mantiene el tamaño
    }
    
    suffix = Path(input_file).suffix.lower()
    multiplier = estimated_multiplier.get(suffix, 1.0)
    
    estimated_size = input_size * multiplier
    print(f"📊 Tamaño de salida estimado: {estimated_size / 1024**2:.2f} MB")
    
    return estimated_size
```

### 4. Solución de problemas de optimización de rendimiento

#### Problema: Velocidad de procesamiento demasiado lenta

**Herramienta de análisis de rendimiento:**
```python
#!/usr/bin/env python3
"""
Herramienta de análisis de rendimiento
"""
import time
import cProfile
import pstats
from functools import wraps

def profile_performance(func):
    """Decorador de análisis de rendimiento"""
    @wraps(func)
    def wrapper(*args, **kwargs):
        # Crear perfilador de rendimiento
        pr = cProfile.Profile()
        
        # Iniciar análisis
        pr.enable()
        start_time = time.time()
        
        try:
            result = func(*args, **kwargs)
            return result
        finally:
            # Detener análisis
            end_time = time.time()
            pr.disable()
            
            # Generar informe de rendimiento
            print(f"⏱️  Tiempo de ejecución: {end_time - start_time:.2f} segundos")
            
            # Guardar informe detallado
            stats = pstats.Stats(pr)
            stats.sort_stats('cumulative')
            
            print("\n🔍 Puntos críticos de rendimiento (las 10 funciones principales):")
            stats.print_stats(10)
            
            # Guardar informe en archivo
            stats.dump_stats(f'performance_profile_{int(time.time())}.prof')
    
    return wrapper

# Ejemplo de función lenta
@profile_performance
def slow_function():
    """Función lenta de ejemplo"""
    import pandas as pd
    
    # Simular operación lenta
    data = []
    for i in range(100000):
        data.append({'id': i, 'value': i**2})
    
    df = pd.DataFrame(data)
    return df.groupby('id').sum()

def benchmark_different_approaches():
    """Compara el rendimiento de diferentes enfoques de implementación"""
    import pandas as pd
    
    # Datos de prueba
    test_data = list(range(10000))
    
    # Método 1: Bucle normal
    start_time = time.time()
    result1 = []
    for i in test_data:
        result1.append(i * 2)
    time1 = time.time() - start_time
    
    # Método 2: List comprehension
    start_time = time.time()
    result2 = [i * 2 for i in test_data]
    time2 = time.time() - start_time
    
    # Método 3: NumPy
    import numpy as np
    start_time = time.time()
    result3 = (np.array(test_data) * 2).tolist()
    time3 = time.time() - start_time
    
    print("🏃 Comparación de rendimiento:")
    print(f"  Bucle normal: {time1:.4f} segundos")
    print(f"  List comprehension: {time2:.4f} segundos")
    print(f"  NumPy: {time3:.4f} segundos")
    
    # Encontrar el método más rápido
    times = {'Bucle normal': time1, 'List comprehension': time2, 'NumPy': time3}
    fastest = min(times, key=times.get)
    print(f"🏆 Método más rápido: {fastest}")
```

## 🔬 Herramientas de diagnóstico avanzadas

### Script de diagnóstico completo

Crear `diagnose_nav_data.py`:

```python
#!/usr/bin/env python3
"""
Herramienta de diagnóstico integral de Nav-data
"""
import sys
import os
import subprocess
import platform
from pathlib import Path
import importlib

class NavDataDiagnostic:
    """Clase de herramienta de diagnóstico de Nav-data"""
    
    def __init__(self):
        self.issues = []
        self.warnings = []
        self.info = []
    
    def log_issue(self, message):
        """Registra un problema"""
        self.issues.append(message)
        print(f"❌ {message}")
    
    def log_warning(self, message):
        """Registra una advertencia"""
        self.warnings.append(message)
        print(f"⚠️  {message}")
    
    def log_info(self, message):
        """Registra información"""
        self.info.append(message)
        print(f"ℹ️  {message}")
    
    def check_python_environment(self):
        """Comprueba el entorno Python"""
        print("\n🐍 Verificación del entorno Python:")
        
        # Versión de Python
        version = sys.version_info
        version_str = f"{version.major}.{version.minor}.{version.micro}"
        print(f"  Versión de Python: {version_str}")
        
        if version.major < 3 or (version.major == 3 and version.minor < 6):
            self.log_issue(f"Versión de Python demasiado antigua ({version_str}), se requiere 3.6+")
        else:
            self.log_info(f"Versión de Python cumple los requisitos ({version_str})")
        
        # Entorno virtual
        if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
            self.log_info("Usando entorno virtual")
        else:
            self.log_warning("No se está usando un entorno virtual, se recomienda usar uno")
        
        # Ruta de Python
        print(f"  Ruta de Python: {sys.executable}")
        print(f"  Rutas de búsqueda de paquetes: {len(sys.path)} rutas")
    
    def check_dependencies(self):
        """Comprueba los paquetes de dependencia"""
        print("\n📦 Verificación de paquetes de dependencia:")
        
        required_packages = {
            'pandas': '1.3.0',
            'numpy': '1.21.0',
            'pdfplumber': '0.7.0',
            'tqdm': '4.60.0',
            'colorama': '0.4.4',
            'geopy': '2.2.0'
        }
        
        for package, min_version in required_packages.items():
            try:
                module = importlib.import_module(package)
                version = getattr(module, '__version__', 'Desconocida')
                print(f"  ✅ {package}: {version}")
                
                # TODO: Lógica de comparación de versiones
                
            except ImportError:
                self.log_issue(f"Falta el paquete de dependencia: {package}")
    
    def check_system_resources(self):
        """Comprueba los recursos del sistema"""
        print("\n💻 Verificación de recursos del sistema:")
        
        # Sistema operativo
        system_info = platform.system()
        print(f"  Sistema operativo: {system_info} {platform.release()}")
        
        # Verificación de memoria
        try:
            import psutil
            memory = psutil.virtual_memory()
            print(f"  Memoria total: {memory.total / 1024**3:.2f} GB")
            print(f"  Memoria disponible: {memory.available / 1024**3:.2f} GB")
            
            if memory.available < 2 * 1024**3:  # Menos de 2 GB
                self.log_warning("Poca memoria disponible, podría afectar el procesamiento de archivos grandes")
        except ImportError:
            self.log_warning("No se puede verificar el estado de la memoria (falta psutil)")
        
        # Espacio en disco
        try:
            import shutil
            total, used, free = shutil.disk_usage('.')
            print(f"  Espacio en disco: {free / 1024**3:.2f} GB disponible")
            
            if free < 1024**3:  # Menos de 1 GB
                self.log_warning("Espacio en disco insuficiente")
        except Exception as e:
            self.log_warning(f"No se puede verificar el espacio en disco: {e}")
    
    def check_project_structure(self):
        """Comprueba la estructura del proyecto"""
        print("\n📁 Verificación de la estructura del proyecto:")
        
        required_dirs = [
            'Airway',
            'PDF extract', 
            'Terminal Patch',
            'X-Plane CIFP'
        ]
        
        for dirname in required_dirs:
            if Path(dirname).exists():
                print(f"  ✅ {dirname}/")
            else:
                self.log_issue(f"Falta el directorio: {dirname}/")
        
        # Comprobar archivos clave
        key_files = [
            'Airway/airway.py',
            'PDF extract/utils.py',
            'Terminal Patch/terminal_encoder.py',
        ]
        
        for filepath in key_files:
            if Path(filepath).exists():
                print(f"  ✅ {filepath}")
            else:
                self.log_issue(f"Falta el archivo: {filepath}")
    
    def check_common_issues(self):
        """Comprueba problemas comunes"""
        print("\n🔍 Verificación de problemas comunes:")
        
        # Comprobar codificación de archivos
        csv_files = list(Path('.').glob('**/*.csv'))
        if csv_files:
            print(f"  Se encontraron {len(csv_files)} archivos CSV")
            # TODO: Comprobación de codificación
        
        # Comprobar archivos de registro
        log_files = list(Path('.').glob('**/*.log'))
        if log_files:
            print(f"  Se encontraron {len(log_files)} archivos de registro")
            
            # Comprobar errores recientes
            for log_file in log_files[-3:]:  # Comprobar los 3 registros más recientes
                try:
                    with open(log_file, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = f.readlines()
                        error_lines = [line for line in lines[-50:] if 'ERROR' in line.upper()]
                        if error_lines:
                            print(f"    ⚠️  Se encontraron {len(error_lines)} errores en {log_file}")
                except Exception as e:
                    print(f"    No se pudo leer {log_file}: {e}")
    
    def generate_report(self):
        """Genera un informe de diagnóstico"""
        print("\n" + "="*50)
        print("📋 Resumen del informe de diagnóstico")
        print("="*50)
        
        print(f"Problemas graves: {len(self.issues)}")
        for issue in self.issues:
            print(f"  ❌ {issue}")
        
        print(f"\nMensajes de advertencia: {len(self.warnings)}")
        for warning in self.warnings:
            print(f"  ⚠️  {warning}")
        
        print(f"\nMensajes informativos: {len(self.info)}")
        for info in self.info:
            print(f"  ℹ️  {info}")
        
        # Estado general
        if not self.issues:
            if not self.warnings:
                print("\n🎉 ¡El estado del sistema es bueno!")
            else:
                print("\n✅ El sistema es básicamente normal, se recomienda prestar atención a los mensajes de advertencia")
        else:
            print("\n🚨 Se encontraron problemas graves, se requiere reparación para un uso normal")
        
        # Guardar informe
        report_file = f"diagnostic_report_{int(time.time())}.txt"
        with open(report_file, 'w', encoding='utf-8') as f:
            f.write("Informe de diagnóstico de Nav-data\n")
            f.write("="*50 + "\n\n")
            
            f.write("Problemas graves:\n")
            for issue in self.issues:
                f.write(f"- {issue}\n")
            
            f.write("\nMensajes de advertencia:\n")
            for warning in self.warnings:
                f.write(f"- {warning}\n")
            
            f.write("\nMensajes informativos:\n")
            for info in self.info:
                f.write(f"- {info}\n")
        
        print(f"\n📄 Informe detallado guardado en: {report_file}")
    
    def run_full_diagnostic(self):
        """Ejecuta un diagnóstico completo"""
        print("🔬 Diagnóstico del sistema Nav-data")
        print("="*50)
        
        self.check_python_environment()
        self.check_dependencies()
        self.check_system_resources()
        self.check_project_structure()
        self.check_common_issues()
        self.generate_report()

def main():
    """Función principal"""
    diagnostic = NavDataDiagnostic()
    
    try:
        diagnostic.run_full_diagnostic()
    except KeyboardInterrupt:
        print("\n\nDiagnóstico interrumpido por el usuario")
    except Exception as e:
        print(f"\n\nExcepción durante el proceso de diagnóstico: {e}")
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    import time
    main()
```

### Uso de la herramienta de diagnóstico

```bash
# Ejecutar diagnóstico completo
python diagnose_nav_data.py

# Ver informe de diagnóstico
cat diagnostic_report_*.txt

# Actuar según los resultados del diagnóstico
# Si hay problemas graves, reparar según las sugerencias del informe
# Si solo hay advertencias, se puede seguir usando pero se recomienda optimizar
```

## 📞 Buscar ayuda

### Al informar un problema, por favor proporcione:

1.  **Mensaje de error completo**
2.  **Información del entorno del sistema** (obtener ejecutando la herramienta de diagnóstico)
3.  **Pasos para reproducir**
4.  **Ejemplo de datos de entrada** (si se puede compartir)
5.  **Resultado esperado vs. resultado real**

### Canales de contacto:
- [GitHub Issues](https://github.com/your-repo/nav-data/issues)
- [Documentación FAQ](./faq.md)
- [Debates de la comunidad](https://github.com/your-repo/nav-data/discussions)

---

**¡Recuerda: la mayoría de los problemas tienen solución!** 🛠️ 

A través del diagnóstico y la solución de problemas sistemáticos, podrá resolver rápidamente los problemas encontrados durante el uso de Nav-data. Si el problema persiste, no dude en buscar ayuda en la comunidad.
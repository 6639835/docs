# 🛠️ Solución de problemas del conversor de datos de navegación de iFly

## 🚨 Errores comunes y soluciones

### 1. Problemas de instalación y entorno

#### ❌ Versión de Python incompatible

**Mensaje de error:**
```
SyntaxError: invalid syntax
TypeError: 'type' object is not subscriptable
```

**Soluciones:**
1.  **Comprobar la versión de Python**:
    ```bash
    python --version
    ```
2.  **Actualizar a Python 3.8+**:
    *   Windows: Descargar la última versión desde python.org
    *   macOS: `brew install python`
    *   Linux: `sudo apt-get install python3.9`

#### ❌ Fallo en la instalación de paquetes de dependencias

**Mensaje de error:**
```
ERROR: Could not find a version that satisfies the requirement
ModuleNotFoundError: No module named 'rich'
```

**Soluciones:**
1.  **Actualizar pip**:
    ```bash
    python -m pip install --upgrade pip
    ```
2.  **Borrar caché y reinstalar**:
    ```bash
    pip cache purge
    pip install -r requirements.txt --no-cache-dir
    ```
3.  **Usar un repositorio de espejo nacional**:
    ```bash
    pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple/
    ```

### 2. Problemas de archivos y rutas

#### ❌ No se encuentra el archivo de base de datos de Fenix

**Mensaje de error:**
```
FileNotFoundError: [Errno 2] No such file or directory: 'nd.db3'
El archivo de base de datos no existe o la ruta es incorrecta
```

**Soluciones:**
1.  **Confirmar la ubicación del archivo**:
    ```bash
    # Ubicación común
    %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\
    ```
2.  **Usar ruta absoluta**: Introducir la ruta completa del archivo
3.  **Comprobar permisos del archivo**: Asegurarse de que el archivo sea legible

#### ❌ Fallo en la detección de la ruta de instalación de iFly

**Mensaje de error:**
```
No se encontró la ruta de instalación de iFly 737 MAX 8
Por favor, especifique manualmente el directorio de instalación de iFly
```

**Soluciones:**
1.  **Introducir la ruta manualmente**:
    ```
    # Versión Community
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Community\ifly-aircraft-737max8\
    
    # Versión Marketplace
    %USERPROFILE%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\Packages\Official\asobo-aircraft-ifly-737max8\
    ```
2.  **Verificar la estructura de la ruta**: Confirmar que incluye el directorio `Data\navdata\`

#### ❌ Permisos de escritura de archivo insuficientes

**Mensaje de error:**
```
PermissionError: [Errno 13] Permission denied
No se puede escribir en el archivo
```

**Soluciones:**
1.  **Ejecutar como administrador**:
    *   Windows: Clic derecho → "Ejecutar como administrador"
    *   macOS/Linux: `sudo python main.py`
2.  **Modificar permisos del archivo**:
    ```bash
    chmod 755 /path/to/ifly/directory
    ```
3.  **Comprobar si el archivo está en uso**: Cerrar MSFS y otros programas relacionados

### 3. Problemas de procesamiento de datos

#### ❌ Error de formato del archivo CSV

**Mensaje de error:**
```
pandas.errors.EmptyDataError: No columns to parse from file
UnicodeDecodeError: 'utf-8' codec can't decode
```

**Soluciones:**
1.  **Comprobar la codificación del archivo**:
    ```python
    # Convertir a UTF-8
    import chardet
    with open('file.csv', 'rb') as f:
        encoding = chardet.detect(f.read())['encoding']
    ```
2.  **Validar el formato CSV**: Asegurarse de que incluye las columnas necesarias
3.  **Volver a descargar los datos**: Obtener un nuevo archivo de datos NAIP

#### ❌ Fallo en el cálculo de la declinación magnética

**Mensaje de error:**
```
geomag.GeomagnticCalculationError: Invalid date or coordinates
Se produjo una excepción en el cálculo de la declinación magnética
```

**Soluciones:**
1.  **Comprobar el rango de coordenadas**:
    *   Latitud: -90° a +90°
    *   Longitud: -180° a +180°
2.  **Actualizar pygeomag**:
    ```bash
    pip install --upgrade pygeomag
    ```
3.  **Validar la validez de la fecha**: Asegurarse de que la fecha AIRAC está dentro de un rango razonable

#### ❌ Error en el cálculo del ciclo AIRAC

**Mensaje de error:**
```
ValueError: Invalid AIRAC cycle calculation
Falló el cálculo del ciclo AIRAC
```

**Soluciones:**
1.  **Comprobar la hora del sistema**: Asegurarse de que la hora del sistema es correcta
2.  **Establecer el ciclo manualmente**:
    ```python
    # Especificar el ciclo AIRAC manualmente
    airac_cycle = "2508"
    ```
3.  **Actualizar la información de la zona horaria**: Asegurarse de que la configuración de la zona horaria es correcta

### 4. Problemas de memoria y rendimiento

#### ❌ Memoria insuficiente

**Mensaje de error:**
```
MemoryError: Unable to allocate array
Memoria insuficiente, no se pueden procesar archivos de datos grandes
```

**Soluciones:**
1.  **Aumentar la memoria virtual**:
    *   Windows: Panel de control → Sistema → Configuración avanzada del sistema → Configuración de rendimiento → Memoria virtual
2.  **Procesar por lotes**:
    ```python
    # Leer datos por lotes
    chunk_size = 1000
    for chunk in pd.read_csv(file, chunksize=chunk_size):
        process_chunk(chunk)
    ```
3.  **Cerrar otros programas**: Liberar memoria del sistema

#### ❌ Velocidad de procesamiento demasiado lenta

**Fenómeno:** El cálculo de la declinación magnética lleva demasiado tiempo

**Solución de optimización:**
1.  **Optimización de hardware**:
    *   Usar un disco duro SSD
    *   Aumentar la RAM a 8GB+
    *   Usar una CPU multinúcleo
2.  **Optimización de software**:
    ```python
    # Procesamiento paralelo
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor(max_workers=4) as executor:
        results = executor.map(calculate_declination, coordinates)
    ```
3.  **Reducir el volumen de datos**: Filtrar los puntos de ruta innecesarios

### 5. Problemas de salida y validación

#### ❌ Los datos convertidos no se muestran en iFly

**Posibles causas:**
*   Formato de archivo incorrecto
*   Problema con la regla de sobrescritura de datos
*   Caché de iFly no borrada

**Soluciones:**
1.  **Validar el formato del archivo**:
    ```bash
    # Comprobar el contenido del archivo
    head -n 10 WPNAVRTE.txt
    ```
2.  **Borrar la caché de iFly**:
    ```bash
    # Eliminar los archivos de caché
    rm -rf "%LOCALAPPDATA%\Packages\Microsoft.FlightSimulator_*\LocalCache\*ifly*"
    ```
3.  **Reiniciar el simulador**: Salir completamente y reiniciar MSFS

#### ❌ Visualización anormal de puntos de ruta en el FMC

**Fenómeno:** Desplazamiento de coordenadas o error de tipo del punto de ruta

**Pasos de verificación:**
1.  **Validar el formato de las coordenadas**:
    ```
    # Formato correcto
    123.45678  # Longitud (°)
    -12.34567  # Latitud (°)
    ```
2.  **Comprobar el tipo de punto de ruta**:
    ```
    11 - DESIGNATED_POINT (punto designado)
    3  - VOR/DME
    2  - NDB
    ```
3.  **Validar el valor de la declinación magnética**:
    ```
    # Rango razonable
    -30.0 a +30.0 grados
    ```

## 🔍 Herramientas de diagnóstico

### 1. Análisis de registros

**Ver registros detallados:**
```bash
# Ver registros más recientes
tail -f converter.log

# Buscar mensajes de error
grep "ERROR" converter.log
grep "Exception" converter.log
```

**Descripción de los niveles de registro:**
*   `DEBUG`: Información de depuración detallada
*   `INFO`: Información general
*   `WARNING`: Información de advertencia
*   `ERROR`: Información de error
*   `CRITICAL`: Error crítico

### 2. Script de validación de datos

**Crear script de validación:**
```python
import pandas as pd
import sqlite3

def validate_database(db_path):
    """Validar la integridad de la base de datos"""
    conn = sqlite3.connect(db_path)
    
    # Comprobar las tablas necesarias
    required_tables = [
        'Airports', 'Runways', 'Navaids', 
        'Waypoints', 'Terminals', 'TerminalLegs'
    ]
    
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table'")
    tables = [row[0] for row in cursor.fetchall()]
    
    missing_tables = set(required_tables) - set(tables)
    if missing_tables:
        print(f"Tablas faltantes: {missing_tables}")
        return False
    
    print("Validación de la base de datos exitosa")
    return True

# Ejemplo de uso
validate_database("path/to/nd.db3")
```

### 3. Recopilación de información del sistema

**Crear informe de información del sistema:**
```python
import platform
import sys
import pkg_resources

def generate_system_report():
    """Generar informe de información del sistema"""
    report = []
    
    # Información del sistema
    report.append("=== Información del sistema ===")
    report.append(f"Sistema operativo: {platform.system()} {platform.release()}")
    report.append(f"Arquitectura: {platform.machine()}")
    report.append(f"Versión de Python: {sys.version}")
    
    # Paquetes instalados
    report.append("\n=== Paquetes instalados ===")
    installed_packages = [d for d in pkg_resources.working_set]
    for package in sorted(installed_packages, key=lambda x: x.key):
        report.append(f"{package.key}: {package.version}")
    
    return "\n".join(report)

# Generar informe
print(generate_system_report())
```

## 📋 Lista de verificación para la solución de problemas

### 🔧 Comprobación básica
- [ ] Versión de Python ≥ 3.8
- [ ] Todos los paquetes de dependencias instalados
- [ ] El archivo de base de datos de Fenix existe y es legible
- [ ] iFly 737 MAX 8 instalado correctamente
- [ ] Suficiente espacio en disco (≥ 100MB)
- [ ] Suficiente memoria (≥ 4GB)

### 📁 Validación de rutas
- [ ] Ruta de la base de datos de Fenix correcta
- [ ] Ruta de instalación de iFly correcta
- [ ] Ruta del archivo de datos CSV correcta
- [ ] El directorio de salida tiene permisos de escritura

### 📊 Comprobación de datos
- [ ] Formato de archivo CSV correcto (codificación UTF-8)
- [ ] Estructura de la tabla de la base de datos completa
- [ ] Datos de coordenadas dentro del rango válido
- [ ] Cálculo del ciclo AIRAC correcto

### 🔄 Validación del procesamiento
- [ ] El archivo de registro no tiene información de nivel ERROR
- [ ] Archivo de salida generado
- [ ] Tamaño de archivo razonable (no es 0)
- [ ] Datos mostrados correctamente en iFly

## 🆘 Obtener ayuda

### Autoayuda
1.  **Consultar la documentación**: Leer la guía de usuario completa
2.  **Buscar en los registros**: Buscar mensajes de error específicos
3.  **Consultar las Preguntas Frecuentes (FAQ)**: Ver preguntas y respuestas comunes
4.  **Reproducir el problema**: Confirmar que el problema es reproducible

### Soporte de la comunidad
1.  **GitHub Issues**: Reportar problemas técnicos
2.  **Foros de discusión**: Participar en la discusión de la comunidad
3.  **Grupos de QQ/WeChat**: Intercambio y respuestas en tiempo real

### Al informar un problema, por favor proporcione:
-   **Registros de errores**: Información de error completa
-   **Información del sistema**: SO, versión de Python, etc.
-   **Pasos para reproducir**: Pasos operativos detallados
-   **Información de archivo**: Tamaño y ruta de los archivos relevantes
-   **Capturas de pantalla**: Proporcionar capturas de pantalla de la interfaz si es necesario

---

**Recuerde: ¡la mayoría de los problemas tienen solución!**

Cuando encuentre dificultades, respire hondo y luego siga esta guía paso a paso para la solución de problemas.🔧✨
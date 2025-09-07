# 📥 Guía de instalación

Esta guía detallará cómo instalar y configurar la herramienta de conversión de datos de navegación Nav-data en diferentes sistemas operativos.

## 🔧 Requisitos del sistema

### Configuración mínima
- **Python**: 3.8 o superior
- **Memoria**: 4GB de RAM
- **Almacenamiento**: 2GB de espacio disponible
- **Red**: Conexión a internet estable (para descargar dependencias)

### Configuración recomendada
- **Python**: 3.9+ (3.11 recomendado)
- **Memoria**: 8GB de RAM o más
- **Almacenamiento**: 5GB de espacio disponible
- **Procesador**: CPU multinúcleo (para procesamiento paralelo)

### Sistemas operativos compatibles
- **Windows**: Windows 10/11 (64 bits)
- **macOS**: macOS 10.15 Catalina o superior
- **Linux**: Ubuntu 18.04+, CentOS 7+, u otras distribuciones compatibles

## 📋 Preparativos

### 1. Instalar Python

#### Windows
1. Visita la [web oficial de Python](https://www.python.org/downloads/windows/)
2. Descarga la última versión de Python 3.11.x
3. Ejecuta el instalador y asegúrate de marcar "Add Python to PATH"
4. Verifica la instalación:
```cmd
python --version
pip --version
```

#### macOS
Usa Homebrew (recomendado):
```bash
# Instalar Homebrew (si aún no está instalado)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Python
brew install python@3.11

# Verificar la instalación
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# Actualizar gestor de paquetes
sudo apt update

# Instalar Python y pip
sudo apt install python3.11 python3.11-pip python3.11-venv

# Verificar la instalación
python3.11 --version
pip3.11 --version
```

### 2. Obtener el código del proyecto

#### Método A: Usar Git (recomendado)
```bash
# Clonar repositorio
git clone https://github.com/Nav-data/docs.git

# Entrar al directorio del proyecto
cd docs
```

#### Método B: Descargar archivo comprimido
1. Visita la página del repositorio de GitHub
2. Haz clic en "Code" > "Download ZIP"
3. Descomprímelo en el directorio de destino

## 🐍 Configuración del entorno Python

### 1. Crear entorno virtual

#### Windows
```cmd
# Entrar al directorio del proyecto
cd Nav-data

# Crear entorno virtual
python -m venv nav-data-env

# Activar entorno virtual
nav-data-env\Scripts\activate

# Verificar entorno virtual
where python
```

#### macOS/Linux
```bash
# Entrar al directorio del proyecto
cd Nav-data

# Crear entorno virtual
python3 -m venv nav-data-env

# Activar entorno virtual
source nav-data-env/bin/activate

# Verificar entorno virtual
which python
```

### 2. Instalar dependencias del proyecto

```bash
# Asegúrate de que el entorno virtual esté activado
# Actualizar pip
pip install --upgrade pip

# Instalar dependencias del proyecto
pip install -r requirements.txt
```

### 3. Verificar instalación de dependencias

```python
# Ejecutar Python y probar importaciones
python -c "
import pandas as pd
import sqlite3
import pygeomag
import tqdm
import chardet
print('¡Todos los paquetes de dependencias instalados con éxito!')
"
```

## 📁 Configuración de fuentes de datos

### 1. Crear estructura de directorios de datos

```bash
# Crear directorios de datos
mkdir -p data/input/{naip,xplane,cifp}
mkdir -p data/output
mkdir -p logs
```

La estructura de directorios debería ser la siguiente:
```
Nav-data/
├── data/
│   ├── input/
│   │   ├── naip/          # Archivos de datos CSV NAIP
│   │   ├── xplane/        # Archivos DAT de X-Plane
│   │   └── cifp/          # Archivos de datos de procedimientos CIFP
│   └── output/            # Archivos de base de datos generados
├── logs/                  # Archivos de registro
└── ...
```

### 2. Rutas del archivo de configuración

Copia y edita el archivo de configuración (opcional):
```bash
# Copiar archivo de configuración de ejemplo
cp config/paths.example.py config/paths.py

# Editar archivo de configuración
nano config/paths.py  # Linux/macOS
notepad config/paths.py  # Windows
```

## 🛠️ Configuración de Microsoft Flight Simulator

### 1. Localizar la carpeta Community de MSFS

#### Versión de Microsoft Store
```
C:\Users\[nombre de usuario]\AppData\Local\Packages\Microsoft.FlightSimulator_8wekyb3d8bbwe\LocalCache\Packages\Community
```

#### Versión de Steam
```
C:\Users\[nombre de usuario]\AppData\Roaming\Microsoft Flight Simulator\Packages\Community
```

#### Versión de Xbox Game Pass
```
C:\Users\[nombre de usuario]\AppData\Local\Packages\Microsoft.FlightDashboard_8wekyb3d8bbwe\LocalCache\Packages\Community
```

### 2. Verificar la instalación de aviones PMDG

Confirma que los siguientes directorios existen:
```
[Carpeta Community]/
├── pmdg-aircraft-737/     # PMDG 737
├── pmdg-aircraft-738/     # PMDG 737-800
├── pmdg-aircraft-77w/     # PMDG 777-300ER
└── ...
```

### 3. Hacer copia de seguridad de los datos de navegación existentes

```bash
# Hacer copia de seguridad de los datos originales para cada avión PMDG
# Ejemplo: PMDG 737-800
cd "C:\Users\[nombre de usuario]\...\Community\pmdg-aircraft-738\Config"
rename Navdata Navdata_backup_original
```

## ✅ Verificación de la instalación

### 1. Ejecutar pruebas básicas

```bash
# Activar entorno virtual
source nav-data-env/bin/activate  # macOS/Linux
# O nav-data-env\Scripts\activate  # Windows

# Ejecutar pruebas básicas
python -c "
import sys
print(f'Versión de Python: {sys.version}')

# Probar dependencias clave
import pandas as pd
print(f'Versión de Pandas: {pd.__version__}')

import sqlite3
print('SQLite3: Disponible')

import pygeomag
print('PyGeoMag: Disponible')

print('✅ ¡Todos los componentes instalados con éxito!')
"
```

### 2. Verificar creación de la base de datos

```bash
# Probar la función de creación de base de datos
python -c "
import sqlite3
import os

# Crear base de datos de prueba
test_db = 'data/output/test.s3db'
os.makedirs(os.path.dirname(test_db), exist_ok=True)

conn = sqlite3.connect(test_db)
cursor = conn.cursor()
cursor.execute('CREATE TABLE test (id INTEGER PRIMARY KEY)')
conn.close()

print('✅ La función de creación de base de datos funciona correctamente')
os.remove(test_db)
"
```

### 3. Comprobar permisos de archivos

#### Windows
Asegúrate de tener permisos de escritura para los siguientes directorios:
- El directorio del proyecto y sus subdirectorios
- La carpeta Community de MSFS
- El directorio de caché de MSFS

#### macOS/Linux
```bash
# Comprobar permisos del directorio del proyecto
ls -la Nav-data/

# Si es necesario modificar los permisos
chmod -R 755 Nav-data/
```

## 🔍 Solución de problemas

### Problemas comunes y soluciones

#### 1. Versión de Python incompatible
**Problema**: "python: command not found" o versión demasiado antigua
**Solución**:
- Confirma que Python 3.8+ está correctamente instalado
- En algunos sistemas, usa `python3` en lugar de `python`

#### 2. Fallo en la instalación de dependencias con pip
**Problema**: Errores de compilación al instalar dependencias
**Solución**:
```bash
# Actualizar herramientas de compilación
pip install --upgrade pip setuptools wheel

# Para problemas con paquetes específicos
pip install --no-cache-dir --force-reinstall [nombre_del_paquete]
```

#### 3. Problemas de instalación de pygeomag
**Problema**: Fallo de compilación de pygeomag
**Solución**:
```bash
# Windows: Instalar Microsoft C++ Build Tools
# macOS: Instalar Xcode Command Line Tools
xcode-select --install

# Linux: Instalar dependencias de compilación
sudo apt install build-essential python3-dev
```

#### 4. Problemas de permisos
**Problema**: No se puede escribir en el directorio de MSFS
**Solución**:
- Ejecutar como administrador (Windows)
- Comprobar permisos del directorio (macOS/Linux)
- Desactivar temporalmente la protección en tiempo real del antivirus

#### 5. Memoria insuficiente
**Problema**: Memoria insuficiente al procesar archivos de datos grandes
**Solución**:
- Aumentar la memoria virtual/espacio de intercambio
- Cerrar otras aplicaciones
- Procesar archivos de datos en lotes

### Ubicación de los archivos de registro

Si encuentras problemas, revisa los siguientes registros:
- `logs/PMDG_*.log` - Registros de procesamiento de cada módulo
- `logs/db_validation.log` - Registro de validación de la base de datos
- `data/output/missing_airports_data.txt` - Registro de datos faltantes

## 📞 Obtener ayuda

Si encuentras problemas durante la instalación:

1. **Revisar mensajes de error** - Lee atentamente los mensajes de error en la salida de la terminal
2. **Comprobar requisitos del sistema** - Confirma que el sistema cumple con los requisitos mínimos
3. **Consultar la documentación** - Consulta la sección de solución de problemas de esta guía
4. **Enviar un Issue** - Envía un informe detallado del problema en el repositorio de GitHub

---

**Siguiente paso**: Continúa leyendo las [instrucciones de configuración](configuration.md) para aprender a configurar las fuentes de datos.
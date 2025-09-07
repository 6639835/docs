# Guía de Instalación

Esta guía le ayudará a instalar y configurar correctamente la herramienta Nav-data en diferentes sistemas operativos.

## 📋 Requisitos del Sistema

### Requisitos Mínimos del Sistema
- **Sistema Operativo**: Windows 10/11, macOS 10.15+, Ubuntu 18.04+ u otras distribuciones principales de Linux
- **Versión de Python**: Python 3.6 o superior
- **Memoria RAM**: Se recomienda 4GB RAM o superior
- **Espacio de Almacenamiento**: Al menos 2GB de espacio disponible en disco
- **Red**: Para descargar paquetes de dependencias y actualizar datos

### Configuración del Sistema Recomendada
- **Versión de Python**: Python 3.8+ 
- **Memoria RAM**: 8GB RAM o superior
- **Espacio de Almacenamiento**: 10GB+ de almacenamiento SSD
- **Procesador**: CPU multinúcleo (para procesamiento por lotes de archivos grandes)

## 🔧 Pasos de Instalación

### 1. Instalación del Entorno Python

#### Windows
1. Visite el [sitio web oficial de Python](https://www.python.org/downloads/) para descargar la última versión.
2. Ejecute el instalador y **asegúrese de marcar la casilla "Add Python to PATH"**.
3. Verifique la instalación:
   ```cmd
   python --version
   pip --version
   ```

#### macOS
Utilice Homebrew (recomendado):
```bash
# Instalar Homebrew (si no está instalado)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instalar Python
brew install python

# Verificar la instalación
python3 --version
pip3 --version
```

#### Linux (Ubuntu/Debian)
```bash
# Actualizar el gestor de paquetes
sudo apt update

# Instalar Python y pip
sudo apt install python3 python3-pip python3-venv

# Verificar la instalación
python3 --version
pip3 --version
```

### 2. Obtener el Código Fuente del Proyecto

#### Opción 1: Clonar con Git (recomendado)
```bash
# Clonar el repositorio del proyecto
git clone https://github.com/your-repo/nav-data.git

# Entrar al directorio del proyecto
cd nav-data
```

#### Opción 2: Descargar el archivo ZIP
1. Visite la página de GitHub del proyecto
2. Haga clic en "Code" → "Download ZIP"
3. Descomprima en el directorio de destino

### 3. Crear un Entorno Virtual (recomendado)

Cree un entorno virtual de Python independiente para evitar conflictos de dependencias:

```bash
# Crear entorno virtual
python -m venv nav-data-env

# Activar entorno virtual
# Windows:
nav-data-env\Scripts\activate

# macOS/Linux:
source nav-data-env/bin/activate

# Verificar entorno virtual
which python  # Debe mostrar la ruta del entorno virtual
```

### 4. Instalar Paquetes de Dependencias

#### Dependencias Principales
```bash
# Instalar dependencias básicas
pip install -r requirements.txt
```

#### Instalación manual de dependencias (si no hay requirements.txt)
```bash
# Relacionado con el procesamiento de datos
pip install pandas numpy

# Procesamiento de PDF
pip install pdfplumber

# Barras de progreso e interfaz de usuario
pip install tqdm colorama

# Cálculo geográfico
pip install geopy

# Procesamiento de chino (si es necesario)
pip install pypinyin

# Otros paquetes de herramientas
pip install typing-extensions dataclasses
```

#### Dependencias Opcionales
```bash
# Soporte para Jupyter Notebook (análisis de datos)
pip install jupyter

# Marco de pruebas
pip install pytest pytest-cov

# Formateo de código
pip install black flake8
```

## 🗂️ Configuración de la Estructura de Directorios

### Diseño de Directorios Estándar
```
nav-data/
├── Airway/                 # Módulo de procesamiento de datos de aerovías
│   ├── airway.py          # Script de conversión principal
│   └── README.md          # Descripción del módulo
├── PDF extract/           # Módulo de extracción de datos PDF
│   ├── 1_terminal_pdf.py  # Extracción original de PDF
│   ├── 2_terminal_encode.py # Codificación de datos
│   ├── 3_terminal_db.py   # Generación de base de datos
│   ├── waypoint_1_pdf.py  # Extracción de waypoints
│   └── utils.py           # Funciones de utilidad
├── Terminal Patch/        # Módulo de reparación de datos
│   ├── terminal_encoder.py # Codificador de programas
│   └── terminal_reencode.py # Reparación de formato
├── X-Plane CIFP/         # Procesamiento de CIFP de X-Plane
│   ├── 1_navaid.py       # Procesamiento de ayudas a la navegación
│   ├── 2_waypoint.py     # Procesamiento de waypoints
│   ├── 3_terminal.py     # Procesamiento de procedimientos de terminal
│   └── utils.py          # Funciones de utilidad
├── docs/                  # Documentación del proyecto
├── requirements.txt       # Lista de dependencias
└── README.md             # Descripción del proyecto
```

### Crear Directorios de Trabajo
```bash
# Crear directorios de entrada de datos
mkdir -p data/input/{csv,pdf,raw}

# Crear directorios de salida de datos
mkdir -p data/output/{dat,txt,processed}

# Crear directorio de logs
mkdir -p logs

# Crear directorio de configuración
mkdir -p config
```

## ⚙️ Configuración de Variables de Entorno

### Crear Archivo de Configuración del Entorno
Cree un archivo `.env` (los usuarios de Windows deben crear `.env.txt` y luego renombrarlo):

```bash
# Ruta de instalación de X-Plane
XPLANE_PATH=/path/to/X-Plane

# Ruta de los archivos de datos
DATA_INPUT_PATH=./data/input
DATA_OUTPUT_PATH=./data/output

# Configuración de logs
LOG_LEVEL=INFO
LOG_FILE=./logs/nav-data.log

# Configuración de procesamiento
BATCH_SIZE=1000
ENABLE_PROGRESS_BAR=true

# Códigos de espacio aéreo de China (personalizable)
CHINA_AREAS=ZB,ZG,ZY,ZS,ZW,ZJ,ZP,ZL,ZH,ZU
```

### Configuración de Variables de Entorno en Windows
1. Haga clic derecho en "Este equipo" → "Propiedades" → "Configuración avanzada del sistema"
2. Haga clic en "Variables de entorno"
3. En "Variables de usuario", añada:
   - Nombre de la variable: `NAV_DATA_HOME`
   - Valor de la variable: Ruta de instalación del proyecto

### Configuración de Variables de Entorno en macOS/Linux
Añada lo siguiente en `~/.bashrc` o `~/.zshrc`:
```bash
export NAV_DATA_HOME="/path/to/nav-data"
export PATH="$NAV_DATA_HOME:$PATH"
```

## 🧪 Verificación de la Instalación

### 1. Prueba de Funcionalidad Básica
```bash
# Entrar al directorio del proyecto
cd nav-data

# Probar módulo Airway
python -c "import Airway.airway; print('Airway module loaded successfully')"

# Probar módulo de procesamiento de PDF  
python -c "import sys; sys.path.append('PDF extract'); import utils; print('PDF module loaded successfully')"

# Probar módulo Terminal Patch
python -c "import sys; sys.path.append('Terminal Patch'); print('Terminal Patch module available')"
```

### 2. Script de Verificación de Dependencias
Cree `check_installation.py`:
```python
#!/usr/bin/env python3
"""
Script de verificación de la instalación de Nav-data
"""
import sys
import importlib
import os

def check_python_version():
    """Verifica la versión de Python"""
    version = sys.version_info
    if version.major < 3 or (version.major == 3 and version.minor < 6):
        print("❌ La versión de Python es demasiado antigua, se requiere 3.6+")
        return False
    print(f"✅ Versión de Python: {version.major}.{version.minor}.{version.micro}")
    return True

def check_dependencies():
    """Verifica los paquetes de dependencias"""
    required_packages = [
        'pandas', 'numpy', 'pdfplumber', 'tqdm', 
        'colorama', 'geopy', 'typing_extensions'
    ]
    
    missing_packages = []
    for package in required_packages:
        try:
            importlib.import_module(package)
            print(f"✅ {package}")
        except ImportError:
            print(f"❌ {package} - No instalado")
            missing_packages.append(package)
    
    return len(missing_packages) == 0, missing_packages

def check_directories():
    """Verifica la estructura de directorios"""
    required_dirs = [
        'Airway', 'PDF extract', 'Terminal Patch', 'X-Plane CIFP'
    ]
    
    missing_dirs = []
    for dirname in required_dirs:
        if os.path.exists(dirname):
            print(f"✅ {dirname}/")
        else:
            print(f"❌ {dirname}/ - Directorio faltante")
            missing_dirs.append(dirname)
    
    return len(missing_dirs) == 0, missing_dirs

def main():
    print("🔍 Verificación de la instalación de Nav-data")
    print("=" * 40)
    
    # Verificar la versión de Python
    print("\n📍 Verificación de la versión de Python:")
    python_ok = check_python_version()
    
    # Verificar dependencias
    print("\n📍 Verificación de paquetes de dependencias:")
    deps_ok, missing_deps = check_dependencies()
    
    # Verificar directorios
    print("\n📍 Verificación de la estructura de directorios:")
    dirs_ok, missing_dirs = check_directories()
    
    # Resumen
    print("\n" + "=" * 40)
    if python_ok and deps_ok and dirs_ok:
        print("🎉 ¡Verificación de la instalación completada con éxito! Nav-data está listo.")
        return 0
    else:
        print("⚠️  Se encontraron problemas durante la verificación de la instalación:")
        if missing_deps:
            print(f"   Dependencias faltantes: {', '.join(missing_deps)}")
            print(f"   Comando de instalación: pip install {' '.join(missing_deps)}")
        if missing_dirs:
            print(f"   Directorios faltantes: {', '.join(missing_dirs)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
```

Ejecutar verificación:
```bash
python check_installation.py
```

## 🔥 Problemas Comunes de Instalación

### Problema 1: Compatibilidad de la Versión de Python
**Síntomas**: Errores de sintaxis o errores de importación de módulos durante la ejecución
**Solución**:
```bash
# Verificar la versión de Python
python --version

# Si la versión es demasiado antigua, actualizar Python
# Windows: Volver a descargar e instalar la nueva versión
# macOS: brew upgrade python
# Linux: sudo apt update && sudo apt upgrade python3
```

### Problema 2: Fallo en la Instalación de Paquetes de Dependencias
**Síntomas**: El comando `pip install` falla
**Solución**:
```bash
# Actualizar pip
python -m pip install --upgrade pip

# Usar una fuente de espejo
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ package_name

# Limpiar caché y reintentar
pip cache purge
pip install package_name
```

### Problema 3: Problemas con el Entorno Virtual
**Síntomas**: El entorno virtual no se puede activar o no se encuentran los paquetes
**Solución**:
```bash
# Eliminar el entorno virtual antiguo
rm -rf nav-data-env

# Volver a crear
python -m venv nav-data-env

# Activar e instalar dependencias
source nav-data-env/bin/activate  # Linux/macOS
pip install -r requirements.txt
```

### Problema 4: Problemas de Permisos de Archivos (Linux/macOS)
**Síntomas**: No se pueden crear archivos o directorios
**Solución**:
```bash
# Modificar permisos del directorio
chmod -R 755 nav-data/

# O usar sudo (no recomendado)
sudo python script.py
```

### Problema 5: Problemas con el Módulo de Procesamiento de PDF
**Síntomas**: Fallo en la instalación o uso de pdfplumber
**Solución**:
```bash
# Instalar dependencias del sistema (Ubuntu/Debian)
sudo apt-get install python3-dev libpoppler-cpp-dev

# Volver a instalar pdfplumber
pip uninstall pdfplumber
pip install pdfplumber
```

## 🚀 Instalación Completada

Una vez completada la instalación, puede:

1. **Ejecutar una prueba rápida**:
   ```bash
   python check_installation.py
   ```

2. **Ver información de ayuda**:
   ```bash
   python Airway/airway.py --help
   ```

3. **Iniciar la conversión de datos**:
   Consulte las [Instrucciones de Uso](./usage.md) para su primera conversión de datos.

## 🔄 Actualización

### Actualizar Código del Proyecto
```bash
# Si usa Git
git pull origin main

# O volver a descargar la última versión
```

### Actualizar Paquetes de Dependencias
```bash
# Activar entorno virtual
source nav-data-env/bin/activate

# Actualizar todos los paquetes
pip install --upgrade -r requirements.txt

# O actualizar un paquete específico manualmente
pip install --upgrade package_name
```

### Actualización de Archivos de Datos
Revise y actualice periódicamente las fuentes de datos NAIP para asegurar la actualidad de los datos de navegación.

---

**¡Instalación completada!** 🎉 Ahora puede empezar a usar Nav-data para la conversión de datos de navegación. Si encuentra algún problema, consulte la sección [Solución de Problemas](#problemas-comunes-de-instalacion) o envíe un Issue en GitHub.
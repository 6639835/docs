# 🔧 Guía de Instalación del Convertidor de Datos de Navegación iFly

Esta guía le llevará a través del proceso completo de instalación del Convertidor de Datos de Navegación iFly, asegurándose de que su entorno de sistema esté configurado correctamente y de que todas las dependencias estén instaladas.

## 📋 Requisitos del Sistema

### 💻 Requisitos de Hardware
| Componente | Requisitos Mínimos | Configuración Recomendada |
|------|----------|----------|
| **Procesador** | Doble núcleo 2.0GHz | Cuatro núcleos 3.0GHz+ |
| **RAM** | 4GB RAM | 8GB+ RAM |
| **Almacenamiento** | 500MB Espacio disponible | 2GB+ Espacio disponible |
| **Red** | No se requiere conexión a la red | Necesario para descargar dependencias |

### 🖥️ Sistemas Operativos Compatibles
- **Windows**: Windows 10 (1909+) / Windows 11
- **macOS**: macOS 10.15 Catalina o superior
- **Linux**: Ubuntu 18.04+, CentOS 7+, o cualquier otra distribución principal

### 🐍 Requisitos del Entorno Python
- **Versión de Python**: 3.8.0 o superior
- **Versión recomendada**: Python 3.9.x o 3.10.x
- **Gestor de paquetes**: pip 21.0+ (normalmente se instala con Python)

## 🚀 Instalación Rápida

### Usuarios de Windows

#### 1️⃣ Instalar Python

**Método uno: Descargar desde el sitio web oficial (recomendado)**
```bash
# 1. Visite https://www.python.org/downloads/
# 2. Descargue la última versión de Python 3.9+
# 3. Ejecute el instalador, asegurándose de marcar "Add Python to PATH"
# 4. Verifique la instalación
python --version
pip --version
```

**Método dos: Usar Microsoft Store**
```bash
# 1. Abra Microsoft Store
# 2. Busque "Python 3.9" o "Python 3.10"
# 3. Haga clic en Instalar
# 4. Verifique la instalación
python --version
```

#### 2️⃣ Instalar dependencias del convertidor

```bash
# Abra el Símbolo del sistema o PowerShell
# Instale todas las dependencias requeridas
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# Verifique la instalación
python -c "import rich, pandas, pygeomag; print('¡Dependencias instaladas correctamente!')"
```

### Usuarios de macOS

#### 1️⃣ Instalar Python

**Método uno: Usar Homebrew (recomendado)**
```bash
# Instale Homebrew (si aún no está instalado)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Instale Python
brew install python@3.9

# Verifique la instalación
python3 --version
pip3 --version
```

**Método dos: Descargar desde el sitio web oficial**
```bash
# 1. Visite https://www.python.org/downloads/macos/
# 2. Descargue el paquete de instalación de Python para macOS
# 3. Ejecute el archivo .pkg para instalar
# 4. Verifique la instalación
python3 --version
```

#### 2️⃣ Instalar dependencias del convertidor

```bash
# Use pip3 para instalar las dependencias
pip3 install rich pathlib typing pygeomag pandas tqdm geographiclib

# Verifique la instalación
python3 -c "import rich, pandas, pygeomag; print('¡Dependencias instaladas correctamente!')"
```

### Usuarios de Linux

#### 1️⃣ Instalar Python

**Ubuntu/Debian:**
```bash
# Actualice la lista de paquetes
sudo apt update

# Instale Python 3.9 y pip
sudo apt install python3.9 python3.9-pip python3.9-dev

# Cree enlaces simbólicos (opcional)
sudo ln -sf /usr/bin/python3.9 /usr/bin/python
sudo ln -sf /usr/bin/pip3.9 /usr/bin/pip

# Verifique la instalación
python --version
pip --version
```

**CentOS/RHEL:**
```bash
# Instale el repositorio EPEL
sudo yum install epel-release

# Instale Python 3.9
sudo yum install python39 python39-pip

# Verifique la instalación
python3.9 --version
pip3.9 --version
```

**Arch Linux:**
```bash
# Instale Python y pip
sudo pacman -S python python-pip

# Verifique la instalación
python --version
pip --version
```

#### 2️⃣ Instalar dependencias del convertidor

```bash
# Instale los paquetes de dependencias
pip install rich pathlib typing pygeomag pandas tqdm geographiclib

# Si encuentra problemas de permisos, use la instalación de usuario
pip install --user rich pathlib typing pygeomag pandas tqdm geographiclib

# Verifique la instalación
python -c "import rich, pandas, pygeomag; print('¡Dependencias instaladas correctamente!')"
```

## 📦 Descripción Detallada de las Dependencias

### Paquetes de Dependencias Centrales

| Nombre del Paquete | Requisito de Versión | Propósito | Licencia |
|------|----------|------|--------|
| **rich** | ≥ 12.0.0 | Interfaz CLI moderna | MIT |
| **pandas** | ≥ 1.3.0 | Procesamiento y análisis de datos | BSD-3 |
| **pygeomag** | ≥ 0.4.2 | Cálculo de declinación magnética | MIT |
| **tqdm** | ≥ 4.60.0 | Visualización de barra de progreso | MPL-2.0 |
| **geographiclib** | ≥ 1.52 | Cálculo de coordenadas geográficas | MIT |

### Dependencias de la Librería Estándar (no requieren instalación)

| Módulo | Propósito |
|------|------|
| **pathlib** | Manejo de rutas de archivos |
| **typing** | Soporte para sugerencias de tipo |
| **sqlite3** | Acceso a base de datos SQLite |
| **csv** | Manejo de archivos CSV |
| **datetime** | Manejo de fecha y hora |
| **logging** | Registro de logs |

## 🔍 Verificación de la Instalación

### Script de Verificación Completa

Cree un script de verificación `verify_installation.py`:

```python
#!/usr/bin/env python3
"""
Script de Verificación de Instalación del Convertidor de Datos de Navegación iFly
"""

import sys
import importlib
from pathlib import Path

def check_python_version():
    """Verifica la versión de Python"""
    version = sys.version_info
    print(f"🐍 Versión de Python: {version.major}.{version.minor}.{version.micro}")
    
    if version >= (3, 8):
        print("✅ La versión de Python cumple los requisitos")
        return True
    else:
        print("❌ La versión de Python es demasiado antigua, se requiere 3.8 o superior")
        return False

def check_dependencies():
    """Verifica los paquetes de dependencias"""
    dependencies = [
        'rich',
        'pandas', 
        'pygeomag',
        'tqdm',
        'geographiclib'
    ]
    
    all_ok = True
    print("\n📦 Verificando paquetes de dependencias:")
    
    for dep in dependencies:
        try:
            module = importlib.import_module(dep)
            version = getattr(module, '__version__', 'Unknown')
            print(f"✅ {dep}: {version}")
        except ImportError:
            print(f"❌ {dep}: No instalado")
            all_ok = False
    
    return all_ok

def check_system_resources():
    """Verifica los recursos del sistema"""
    import shutil
    
    print("\n💾 Verificando recursos del sistema:")
    
    # Check disk space
    total, used, free = shutil.disk_usage(Path.home())
    free_gb = free // (1024**3)
    print(f"📁 Espacio en disco disponible: {free_gb} GB")
    
    if free_gb >= 1:
        print("✅ Espacio en disco suficiente")
        disk_ok = True
    else:
        print("⚠️ Espacio en disco insuficiente, se recomienda al menos 1GB")
        disk_ok = False
    
    return disk_ok

def main():
    """Función principal de verificación"""
    print("🔍 Verificación de Instalación del Convertidor de Datos de Navegación iFly")
    print("=" * 50)
    
    # Check items
    checks = [
        ("Versión de Python", check_python_version),
        ("Paquetes de dependencias", check_dependencies),
        ("Recursos del sistema", check_system_resources),
    ]
    
    all_passed = True
    for name, check_func in checks:
        try:
            result = check_func()
            if not result:
                all_passed = False
        except Exception as e:
            print(f"❌ {name} Verificación fallida: {e}")
            all_passed = False
    
    print("\n" + "=" * 50)
    if all_passed:
        print("🎉 ¡Todas las verificaciones pasaron! Ya puede empezar a usar el convertidor.")
        return 0
    else:
        print("⚠️ Algunas verificaciones no pasaron, por favor, resuelva los problemas siguiendo las indicaciones anteriores.")
        return 1

if __name__ == "__main__":
    exit(main())
```

Ejecute el script de verificación:
```bash
python verify_installation.py
```

### Pasos de Verificación Manual

```bash
# 1. Verifique la versión de Python
python --version

# 2. Verifique la versión de pip
pip --version

# 3. Verifique las dependencias centrales
python -c "import rich; print(f'Rich: {rich.__version__}')"
python -c "import pandas; print(f'Pandas: {pandas.__version__}')"
python -c "import pygeomag; print('PyGeoMag: OK')"

# 4. Pruebe la interfaz Rich
python -c "from rich.console import Console; Console().print('Hello, World!', style='bold green')"

# 5. Pruebe el cálculo de declinación magnética
python -c "from pygeomag import GeoMag; gm = GeoMag(); print(f'Cálculo de declinación magnética OK: {gm.GeoMag(39.9, 116.4, 0, 2024)}')"
```

## 🔧 Problemas Comunes de Instalación

### Problema 1: Versión de Python demasiado antigua

**Síntoma:**
```
SyntaxError: invalid syntax
```

**Solución:**
```bash
# Verifique la versión actual
python --version

# Si la versión es < 3.8, actualice
# Windows: Descargue la nueva versión desde python.org
# macOS: brew upgrade python
# Linux: Consulte la guía de instalación anterior
```

### Problema 2: Fallo en la instalación de pip

**Síntoma:**
```
ERROR: Could not find a version that satisfies the requirement
```

**Solución:**
```bash
# Actualice pip
python -m pip install --upgrade pip

# Use una fuente de espejo nacional
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Limpie la caché e intente de nuevo
pip cache purge
pip install rich pandas pygeomag tqdm geographiclib
```

### Problema 3: Error de permisos

**Síntoma:**
```
PermissionError: [Errno 13] Permission denied
```

**Solución:**
```bash
# Windows: Ejecute el Símbolo del sistema como administrador
# macOS/Linux: Use la instalación de usuario
pip install --user rich pandas pygeomag tqdm geographiclib

# O use sudo (no recomendado)
sudo pip install rich pandas pygeomag tqdm geographiclib
```

### Problema 4: Problemas de conexión de red

**Síntoma:**
```
WARNING: Retrying... Connection broken
```

**Solución:**
```bash
# Use una fuente de espejo nacional
pip install -i https://mirrors.aliyun.com/pypi/simple/ rich pandas pygeomag tqdm geographiclib

# o la fuente Tsinghua
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple/ rich pandas pygeomag tqdm geographiclib

# Configure una fuente de espejo permanente
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/
```

## 🎯 Pasos Posteriores a la Instalación

### 1. Prepare los archivos necesarios
- **Base de datos Fenix**: Obtenga el archivo `nd.db3`
- **Datos NAIP**: Descargue los datos de ruta `RTE_SEG.csv`
- **Instalación de iFly**: Confirme que iFly 737 MAX 8 está instalado

### 2. Cree un directorio de trabajo
```bash
# Cree un directorio dedicado
mkdir ~/ifly-converter
cd ~/ifly-converter

# Descargue el script del convertidor
# (Obtenga main.py del repositorio del proyecto)
```

### 3. Realice la primera prueba
```bash
# Ejecute el convertidor
python main.py

# Siga las indicaciones de la interfaz
```

## 📚 Siguientes Pasos

Una vez completada la instalación, por favor, continúe leyendo:

1.  **[Instrucciones de Configuración](configuration.md)** - Entienda las opciones de configuración detalladas
2.  **[Instrucciones de Uso](usage.md)** - Comience su primera conversión de datos
3.  **[Solución de Problemas](../troubleshooting.md)** - Consulte si encuentra problemas

---

**¡Instalación completa!** 🎉 Ahora puede empezar a usar el Convertidor de Datos de Navegación iFly. Si encuentra algún problema, consulte la [Guía de Solución de Problemas](../troubleshooting.md) o busque ayuda en GitHub Issues.
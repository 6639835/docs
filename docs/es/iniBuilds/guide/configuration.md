# ⚙️ Instrucciones de Configuración

Esta guía detallará cómo configurar la fuente de datos, la configuración de rutas y la gestión del ciclo AIRAC de la herramienta de conversión de Nav-data.

## 📊 Visión General de las Fuentes de Datos

La herramienta Nav-data es compatible con múltiples fuentes de datos de navegación aérea estándar de la industria, garantizando la autoridad y precisión de los datos.

### 🔄 Formatos de Datos Compatibles

| Formato de Datos | Fuente | Uso | Estándar |
|-----------------|--------|------|----------|
| **NAIP CSV**    | Navigraph/Aerosoft | Aeropuertos, pistas, aerovías | ARINC 424 |
| **X-Plane DAT** | X-Plane 11/12 | Puntos de ruta, radioayudas | Formato X-Plane |
| **CIFP**        | Datos de procedimientos oficiales | SID/STAR/Aproximaciones | ARINC 424 |
| **SQLite DB**   | Fenix A320 | Datos de referencia NDB | Formato personalizado |

## 🗃️ Archivos de Datos Obligatorios

### 📁 Estructura de Directorios Básica

Cree la siguiente estructura de directorios para organizar sus datos de navegación:

```
NavData_Workspace/
├── NAIP/                    # Directorio de archivos CSV NAIP
│   ├── AD_HP.csv           # Datos básicos de aeropuertos
│   ├── RWY.csv             # Información de pistas
│   ├── RWY_DIRECTION.csv   # Datos de dirección de pistas
│   └── RTE_SEG.csv         # Datos de segmentos de aerovías
│
├── X-Plane/                 # Archivos de datos de X-Plane
│   ├── earth_fix.dat       # Datos de puntos de ruta
│   └── earth_nav.dat       # Datos de radioayudas
│
├── CIFP/                    # Directorio de datos de procedimientos CIFP
│   ├── ZBAA.dat            # Aeropuerto Internacional de Pekín-Capital
│   ├── ZSSS.dat            # Aeropuerto Internacional de Shanghái-Pudong
│   └── [otros aeropuertos].dat # Archivos de procedimientos de varios aeropuertos
│
├── NDBs/                    # Base de datos NDB
│   └── nd.db3              # Base de datos de navegación Fenix
│
└── Output/                  # Directorio de salida
    └── e_dfd_PMDG.s3db     # Base de datos convertida
```

## 🌐 Guía de Adquisición de Fuentes de Datos

### 1️⃣ Datos de Navigraph (Recomendado)

**Pasos para la adquisición:**
1. Visite el [sitio web oficial de Navigraph](https://navigraph.com/) y regístrese para obtener una cuenta
2. Suscríbase a Navigraph Unlimited o al servicio Charts + Data
3. Descargue Navigraph FMS Data Manager
4. En FMS Data Manager, seleccione el formato "Generic"
5. Descargue y descomprima el paquete de datos NAIP

**Adquisición de archivos NAIP:**
```
Navigraph FMS Data Manager → 
Generic → 
NAIP Format → 
Descargar el ciclo AIRAC actual
```

### 2️⃣ Aerosoft NavDataPro

**Pasos para la adquisición:**
1. Compre [Aerosoft NavDataPro](https://www.aerosoft.com/en/microsoft-flight-simulator/msfs-tools/navigation-data/)
2. Descargue la aplicación NavDataPro
3. Inicie sesión y descargue los datos en formato NAIP
4. Descomprima en el directorio NAIP

### 3️⃣ Archivos de Datos de X-Plane

**Opciones de fuente:**
- **Opción A**: Copie desde el directorio de instalación de X-Plane 11/12
  ```
  [Directorio de instalación de X-Plane]/Resources/default data/earth_fix.dat
  [Directorio de instalación de X-Plane]/Resources/default data/earth_nav.dat
  ```

- **Opción B**: Obtenga de los datos de muestra de este proyecto
  ```
  [Directorio del proyecto]/sample_data/earth_fix.dat
  [Directorio del proyecto]/sample_data/earth_nav.dat
  ```

### 4️⃣ Datos de Procedimientos CIFP

**Métodos de adquisición:**
- **Canales oficiales**: Descarga gratuita desde el sitio web oficial de la FAA
- **Terceros**: Datos CIFP incluidos en Navigraph
- **Proporcionado por el proyecto**: Archivos CIFP preprocesados para la región de China

### 5️⃣ Base de Datos NDB

**Métodos de adquisición:**
```bash
# Copie desde el directorio de instalación de Fenix A320
[MSFS Community]/fenix-a320/Resources/NavData/nd.db3
```

## 🛠️ Asistente de Configuración de Rutas

### Modo de Configuración Automática

Al ejecutar la herramienta de conversión, el programa le guiará a través de la configuración de rutas:

```bash
python XP2INI_NDB_Converter.py
```

**Proceso de configuración:**
1. **Selección del directorio base**: Seleccione el directorio raíz que contiene todos los archivos de datos.
2. **Detección automática**: El programa escaneará y validará automáticamente varios tipos de archivos de datos.
3. **Confirmación de ruta**: Muestra las rutas de archivo detectadas para su confirmación.
4. **Suplemento manual**: Para los archivos no encontrados, especifique la ruta manualmente.

### 🔍 Lista de Verificación de Rutas

| Tipo de Datos | Ruta del Archivo | Estado de Validación |
|---------------|-------------------|----------------------|
| Datos de aeropuertos NAIP | `NAIP/AD_HP.csv` | ✅ |
| Datos de pistas NAIP | `NAIP/RWY.csv` | ✅ |
| Dirección de pistas NAIP | `NAIP/RWY_DIRECTION.csv` | ✅ |
| Datos de aerovías NAIP | `NAIP/RTE_SEG.csv` | ✅ |
| Puntos de ruta X-Plane | `X-Plane/earth_fix.dat` | ✅ |
| Radioayudas X-Plane | `X-Plane/earth_nav.dat` | ✅ |
| Directorio de procedimientos CIFP | `CIFP/` | ✅ |
| Base de datos NDB | `NDBs/nd.db3` | ✅ |
| Tabla de búsqueda ICAO | `ICAO.txt` | ✅ |

## 📅 Gestión del Ciclo AIRAC

### 🗓️ Descripción del Ciclo AIRAC

**AIRAC (Aeronautical Information Regulation And Control)** es el ciclo de actualización de información aeronáutica de 28 días establecido por la OACI (Organización de Aviación Civil Internacional).

- **Frecuencia de actualización**: Cada 28 días
- **Sincronización global**: Horario de actualización unificado en todo el mundo
- **Importancia**: Asegura que pilotos y controladores utilicen los mismos datos de navegación.

### 📊 Consulta del Ciclo Actual

```python
# Consulta del ciclo AIRAC actual
import datetime

def get_current_airac():
    # Fecha de referencia AIRAC 2023: 5 de enero de 2023
    base_date = datetime.date(2023, 1, 5)
    today = datetime.date.today()
    
    days_diff = (today - base_date).days
    cycle_number = (days_diff // 28) + 1
    
    return f"AIRAC {today.year}{cycle_number:02d}"

print(f"Ciclo actual：{get_current_airac()}")
```

### 🔄 Estrategia de Actualización de Datos

#### Usuarios con Actualización en Tiempo Real
- **Frecuencia de actualización**: Cada ciclo AIRAC
- **Fuente recomendada**: Navigraph (actualización automática)
- **Escenarios de uso**: Vuelo en línea, uso profesional

#### Usuarios Estándar
- **Frecuencia de actualización**: 3-6 meses
- **Fuente recomendada**: Aerosoft NavDataPro
- **Escenarios de uso**: Vuelo offline, uso recreativo

## 🎛️ Opciones de Configuración Avanzadas

### 📍 Configuración de Filtrado por Región

Personalice el alcance del procesamiento de datos para diferentes regiones:

```python
# Configure los códigos de región ICAO a procesar
SUPPORTED_ICAO_REGIONS = {
    'ZB',  # Región del Norte de China
    'ZS',  # Región del Este de China  
    'ZG',  # Región del Sur de China
    'ZJ',  # Región de China Oriental (Huadong)
    'ZY',  # Región Central de China
    'ZL',  # Región del Suroeste de China
    'ZU',  # Región del Oeste de China
    'ZW',  # Región del Noroeste de China
    'ZP',  # Región de China Septentrional (Huabei)
    'ZH',  # Región de China Meridional (Huanan)
    'VM',  # Región de Vietnam
    'VH',  # Región de Hong Kong
    'RK'   # Región de Corea del Sur
}
```

### 🎯 Configuración de Precisión

Configure la precisión de coordenadas y cálculos:

```python
# Configuración de precisión de coordenadas
COORDINATE_PRECISION = 8  # Número de decimales
MAGNETIC_VARIATION_PRECISION = 1  # Precisión de la variación magnética

# Conversión de unidades de distancia
NM_TO_KM = 1.852  # Millas náuticas a kilómetros
KM_TO_NM = 0.539957  # Kilómetros a millas náuticas
```

### ⚡ Configuración de Optimización de Rendimiento

```python
# Configuración de procesamiento paralelo
MULTIPROCESS_WORKERS = 4  # Número de procesos paralelos
BATCH_SIZE = 1000  # Tamaño del lote
DATABASE_TIMEOUT = 30  # Tiempo de espera de la base de datos (segundos)

# Optimización de memoria
ENABLE_CACHE = True  # Habilitar caché de coordenadas
CACHE_SIZE_LIMIT = 10000  # Límite de tamaño de caché
```

## 🔧 Plantilla de Archivo de Configuración

Cree el archivo `config.json` para guardar la configuración común:

```json
{
  "data_sources": {
    "naip_path": "C:/NavData/NAIP",
    "xplane_path": "C:/NavData/X-Plane", 
    "cifp_path": "C:/NavData/CIFP",
    "ndb_path": "C:/NavData/NDBs/nd.db3",
    "icao_txt": "C:/NavData/ICAO.txt"
  },
  "output": {
    "database_path": "C:/NavData/Output/e_dfd_PMDG.s3db"
  },
  "processing": {
    "regions": ["ZB", "ZS", "ZJ", "ZG", "ZY", "ZL", "ZU", "ZW", "ZP", "ZH"],
    "coordinate_precision": 8,
    "enable_multiprocessing": true,
    "workers": 4
  },
  "airac": {
    "current_cycle": "2410",
    "auto_update_check": true
  }
}
```

## ✅ Verificación de Configuración

### 🔍 Script de Verificación de Configuración

```python
#!/usr/bin/env python3
"""Script de verificación de configuración"""

import os
import json
from pathlib import Path

def validate_config():
    """Valida la integridad del archivo de configuración"""
    
    required_files = {
        'NAIP/AD_HP.csv': 'Datos de aeropuertos',
        'NAIP/RWY.csv': 'Datos de pistas', 
        'NAIP/RWY_DIRECTION.csv': 'Dirección de pistas',
        'NAIP/RTE_SEG.csv': 'Datos de aerovías',
        'X-Plane/earth_fix.dat': 'Puntos de ruta',
        'X-Plane/earth_nav.dat': 'Radioayudas',
        'NDBs/nd.db3': 'Base de datos NDB'
    }
    
    print("🔍 Iniciando verificación de configuración...")
    
    for file_path, description in required_files.items():
        if os.path.exists(file_path):
            print(f"✅ {description}: {file_path}")
        else:
            print(f"❌ {description}: {file_path} (archivo no encontrado)")
    
    print("🔍 Verificación completada!")

if __name__ == "__main__":
    validate_config()
```

## 🚨 Problemas Comunes de Configuración

### Problemas de Ruta
```bash
# Problema: La ruta contiene caracteres chinos, lo que causa errores de codificación.
# Solución: Use rutas en inglés, evite caracteres especiales.

# Ejemplo de ruta incorrecta
C:/导航数据/NAIP/

# Ejemplo de ruta correcta  
C:/NavData/NAIP/
```

### Problemas de Permisos de Archivo
```powershell
# Problema: No hay permisos de lectura.
# Solución: Ejecute como administrador o modifique los permisos del archivo.
icacls "C:\NavData" /grant Everyone:F /T
```

### Problemas de Integridad de Datos
```bash
# Problema: Archivos NAIP incompletos.
# Solución: Vuelva a descargar el paquete completo de datos AIRAC.
# Asegúrese de que todos los archivos CSV existan y no estén vacíos.
```

---

¡Configuración completada! A continuación, consulte las [**Instrucciones de uso**](./usage.md) para ejecutar el proceso de conversión de datos.
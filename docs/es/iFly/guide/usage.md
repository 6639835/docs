# 🚀 Guía de uso del Convertidor de Datos de Navegación de iFly

Esta guía detalla cómo usar el Convertidor de Datos de Navegación de iFly, desde operaciones básicas hasta funciones avanzadas, para ayudarle a completar la conversión de datos de navegación de Fenix a iFly.

## 🎯 Preparativos antes de usar

### 1. Lista de verificación de preparación de archivos

Antes de comenzar la conversión, asegúrese de tener los siguientes archivos listos:

- ✅ **Base de datos de navegación de Fenix** (`nd.db3`)
  ```
  Ubicación: %APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
  Tamaño: Generalmente entre 50-200MB
  Formato: Archivo de base de datos SQLite
  ```

- ✅ **Datos de rutas NAIP** (`RTE_SEG.csv`)
  ```
  Fuente: Sitio web de datos de aviación civil de China
  Codificación: UTF-8
  Tamaño: Generalmente entre 5-20MB
  Formato: Archivo CSV, que contiene información de segmentos de ruta
  ```

- ✅ **iFly 737 MAX 8** instalado y funcionando correctamente

### 2. Verificación del entorno

Ejecute el script de comprobación del entorno:
```bash
# Verificar el entorno Python
python --version  # Debería mostrar 3.8 o una versión posterior

# Verificar los paquetes de dependencia
python -c "import rich, pandas, pygeomag; print('¡Verificación de entorno completada!')"

# Comprobar la memoria disponible
python -c "import psutil; print(f'Memoria disponible: {psutil.virtual_memory().available // (1024**3)} GB')"
```

## 🖥️ Uso interactivo

### Iniciar el convertidor

```bash
# Entrar al directorio del proyecto
cd /path/to/ifly-converter

# Iniciar el convertidor
python main.py
```

### Interfaz de bienvenida

Una vez iniciado el convertidor, verá la moderna interfaz de bienvenida:

```
╔═══════════════════════════════════════ 🛩️  Herramienta de conversión de datos de navegación aérea  ✈️ ═══════════════════════════════════════╗
║                                                                                                          ║
║                                   Convertidor de datos de navegación aérea de Fenix a iFly                                   ║
║                                         Experiencia de conversión de alta calidad y moderna                                         ║
║                                                                                                          ║
╚═══════════════════════════════════════ Desarrollado por Rich • Versión 2.0 ═══════════════════════════════════════╝

🔍 Comprobando el sistema...
✅ Entorno Python: 3.9.16
✅ Paquetes de dependencia: Todos instalados
✅ Memoria disponible: 8.2 GB
✅ Espacio en disco: 125 GB

Preparando para iniciar el proceso de conversión...
```

## 📋 Detalle de los pasos de conversión

### Paso 1: Conectar la base de datos de Fenix

```
╭─────────────────────────────────────────────── 🔄 Paso 1/4 ────────────────────────────────────────────────╮
│ Conectar base de datos de Fenix                                                                                        │
│ Por favor, seleccione el archivo de base de datos de navegación de Fenix A320 (nd.db3)                                                                │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Por favor, introduzca la ruta del archivo de la base de datos de Fenix:
```

**Ejemplo de entrada:**
```bash
# Ruta de Windows
C:\Users\Username\AppData\Roaming\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3

# O simplemente presione Enter para usar la detección automática
[Presione Enter para usar la detección automática]
```

**Proceso de verificación:**
```
🔍 Verificando la base de datos...
✅ Archivo existente y legible
✅ Formato de base de datos correcto
✅ Tablas necesarias completas (11/11)
📊 Estadísticas de datos:
   • Aeropuertos: 15,234
   • Pistas: 28,456
   • Puntos de ruta: 156,789
   • Procedimientos terminales: 8,945
```

### Paso 2: Seleccionar archivo CSV

```
╭─────────────────────────────────────────────── 🔄 Paso 2/4 ────────────────────────────────────────────────╮
│ Seleccionar datos de rutas NAIP                                                                                        │
│ Por favor, seleccione el archivo RTE_SEG.csv de la aviación civil de China                                                                           │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Por favor, introduzca la ruta del archivo CSV:
```

**Proceso de verificación:**
```
🔍 Verificando el archivo CSV...
✅ Codificación de archivo: UTF-8
✅ Formato validado correctamente
✅ Columnas necesarias presentes
📊 Vista previa de datos:
   • Número total de registros: 12,456
   • Número de rutas: 345
   • Área de cobertura: China continental, Hong Kong, Macao
   • Vigencia de los datos: AIRAC 2508
```

### Paso 3: Localizar instalación de iFly

```
╭─────────────────────────────────────────────── 🔄 Paso 3/4 ────────────────────────────────────────────────╮
│ Localizar instalación de iFly                                                                                            │
│ Buscando la ubicación de instalación de iFly 737 MAX 8...                                                                       │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

🔍 Escaneando ubicaciones de instalación comunes...
✅ Instalación de iFly encontrada: Community\ifly-aircraft-737max8\
📁 Ruta de instalación: C:\Users\Username\AppData\Local\Packages\Microsoft.FlightSimulator_xxx\LocalCache\Packages\Community\ifly-aircraft-737max8\
📋 Verificación de la estructura de directorios:
   ✅ Data\navdata\Permanent\
   ✅ Data\navdata\Supplemental\
   ✅ Permisos de escritura normales
```

Si la detección automática falla, el sistema le pedirá que introduzca la ruta manualmente:
```
❌ Detección automática fallida
Por favor, introduzca manualmente la ruta de instalación de iFly 737 MAX 8:
```

### Paso 4: Configurar opciones de conversión

```
╭─────────────────────────────────────────────── 🔄 Paso 4/4 ────────────────────────────────────────────────╮
│ Configurar opciones de conversión                                                                                              │
│ Establecer parámetros de procesamiento de procedimientos terminales                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────────╯

Valor de inicio del ID de procedimiento terminal [Predeterminado: 1000]:
```

**Descripción de las opciones de configuración:**
```
📊 Configuración de ID de procedimiento terminal:
   • ID de inicio: 1000 (recomendado)
   • Rango de uso estimado: 1000-3500
   • Número total de IDs disponibles: 9000
   • Reserva sugerida: 20% de buffer

⚙️ Otras opciones:
   • Precisión de coordenadas: 8 decimales (predeterminado)
   • Cálculo de declinación magnética: Modelo WMM-2025
   • Ciclo AIRAC: Cálculo automático
```

## 🔄 Proceso de conversión

### Confirmación de configuración

Antes de iniciar la conversión, el sistema mostrará un resumen completo de la configuración:

```
┌────────────────────────────────── ✅ Confirmación de configuración de conversión ──────────────────────────────────┐
│                                                                                   │
│  📂 Configuración de la fuente de datos                                                                     │
│  ├─ Base de datos de Fenix: .../navdata/nd.db3 (142.5 MB)                                  │
│  ├─ Archivo NAIP CSV: .../RTE_SEG.csv (8.2 MB)                                      │
│  └─ Ruta de instalación de iFly: .../ifly-aircraft-737max8/                                    │
│                                                                                   │
│  ⚙️ Parámetros de procesamiento                                                                       │
│  ├─ ID de inicio de procedimiento terminal: 1000                                                          │
│  ├─ Precisión de coordenadas: 8 decimales                                                             │
│  ├─ Modelo de declinación magnética: WMM-2025                                                           │
│  └─ Ciclo AIRAC: 2508 (cálculo automático)                                                    │
│                                                                                   │
│  📊 Procesamiento estimado                                                                       │
│  ├─ Puntos de ruta: ~12,456                                                            │
│  ├─ Procedimientos terminales: ~350                                                             │
│  └─ Tiempo estimado: 5-10 minutos                                                           │
│                                                                                   │
└───────────────────────────────────────────────────────────────────────────────────┘

¿Confirmar el inicio de la conversión? [Y/n]:
```

### Procesamiento de datos de ruta

```
╭─────────────────────────────────────────── 🛣️ Procesando datos de ruta ───────────────────────────────────────────╮
│                                                                                                      │
│ Procesando datos de segmentos de ruta NAIP...                                                                          │
│                                                                                                      │
│ ████████████████████████████████████████ 12,456/12,456 (100%) ⏱️ 0:03:45                         │
│                                                                                                      │
│ Procesamiento actual: Ruta A1 → Segmento ZSAM-VOR01                                                                   │
│ Cálculo de declinación magnética: 39.917°N, 116.383°E → +7.2°                                                            │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Estadísticas de procesamiento de rutas:
✅ Procesados con éxito: 12,456 puntos de ruta
✅ Cálculos de declinación magnética: 12,456 veces (promedio 0.02s/vez)
✅ Archivo de salida: WPNAVRTE.txt (aumento de 2.3 MB)
⚠️ Registros omitidos: 23 (coordenadas anómalas)
```

### Procesamiento de procedimientos terminales

```
╭─────────────────────────────────────────── 🏢 Procesando procedimientos terminales ───────────────────────────────────────────╮
│                                                                                                      │
│ Convirtiendo datos de procedimientos terminales...                                                                              │
│                                                                                                      │
│ ████████████████████████████████████████ 350/350 (100%) ⏱️ 0:02:15                               │
│                                                                                                      │
│ Procesamiento actual: ZBAA (Pekín-Capital) → SID SHUAY1A                                                             │
│ Tipo de procedimiento: Procedimiento estándar de salida instrumental                                                                           │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

📊 Estadísticas de procedimientos terminales:
✅ Aeropuertos procesados: 145
✅ Procedimientos SID: 234
✅ Procedimientos STAR: 198  
✅ Procedimientos de aproximación: 312
✅ Archivos nuevos: 89
✅ Archivos actualizados: 56
```

### Gestión del ciclo AIRAC

```
╭─────────────────────────────────────────── 📅 Gestión del ciclo AIRAC ───────────────────────────────────────────╮
│                                                                                                      │
│ Calculando y configurando el ciclo AIRAC...                                                                         │
│                                                                                                      │
│ 🗓️ Información de cálculo                                                                                          │
│ ├─ Fecha de referencia: 2024-01-11 (AIRAC 2401)                                                               │
│ ├─ Fecha actual: 2024-12-24                                                                             │
│ ├─ Días transcurridos: 348 días                                                                                  │
│ ├─ Ciclos transcurridos: 12.43 → 12 ciclos completos                                                                   │
│ └─ Ciclo actual: 2508                                                                                    │
│                                                                                                      │
│ 📋 Detalles del ciclo                                                                                          │
│ ├─ Identificador AIRAC: 2508                                                                                 │
│ ├─ Fecha de entrada en vigor: 2024-12-19                                                                             │
│ ├─ Fecha de caducidad: 2025-01-16                                                                             │
│ └─ Días restantes: 23 días                                                                                   │
│                                                                                                      │
╰──────────────────────────────────────────────────────────────────────────────────────────────────────╯

✅ Archivo AIRAC generado: FMC_Ident.txt
```

## ✅ Conversión completada

### Resumen de éxito

```
┌─────────────────────────────────────────── ✅ Conversión completada ───────────────────────────────────────────────┐
│                                                                                                        │
│  🎉 ¡Enhorabuena! La conversión de datos de navegación se ha completado con éxito.                                                                          │
│                                                                                                        │
│  📊 Estadísticas de procesamiento                                                                                            │
│  ├─ 🛣️ Datos de ruta: 12,456 puntos de ruta                                                                       │
│  ├─ 🏢 Procedimientos terminales: 350 procedimientos (145 aeropuertos)                                                               │
│  ├─ 📅 Ciclo AIRAC: 2508                                                                               │
│  └─ ⏱️ Tiempo total: 6 minutos 32 segundos                                                                             │
│                                                                                                        │
│  📁 Archivos de salida                                                                                            │
│  ├─ WPNAVRTE.txt: Datos de ruta (+2.3 MB)                                                                  │
│  ├─ FMC_Ident.txt: Archivo identificador AIRAC                                                                     │
│  ├─ Supplemental: 89 archivos de nuevos procedimientos                                                                      │
│  └─ Registro de conversión: converter.log                                                                           │
│                                                                                                        │
│  🔄 Siguientes pasos sugeridos                                                                                          │
│  1. Reiniciar Microsoft Flight Simulator                                                                   │
│  2. Cargar el iFly 737 MAX 8                                                                               │
│  3. Verificar las nuevas rutas y procedimientos en el FMC                                                                        │
│  4. Guardar archivos de copia de seguridad para restaurar                                                                               │
│                                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

### Descripción de la ubicación de los archivos

Una vez completada la conversión, los archivos se colocarán en la siguiente ubicación:

```
📁 Directorio de datos de navegación de iFly:
Community\ifly-aircraft-737max8\Data\navdata\

├── Permanent\
│   ├── WPNAVRTE.txt        # Datos de ruta (actualizados)
│   └── Otros archivos originales...
│
├── Supplemental\
│   ├── ZBAA\              # Aeropuerto de Pekín-Capital
│   │   ├── SID\           # Salidas Instrumentales Estándar
│   │   ├── STAR\          # Rutas de Llegada Terminal Estándar
│   │   └── APP\           # Procedimientos de aproximación
│   ├── ZSPD\              # Aeropuerto de Shanghái-Pudong
│   └── ...Otros aeropuertos
│
└── FMC_Ident.txt          # Archivo identificador AIRAC
```

## 🧪 Verificar los resultados de la conversión

### 1. Verificación de archivos

```bash
# Comprobar si los archivos se han generado
ls -la "Community\ifly-aircraft-737max8\Data\navdata\"

# Comprobar el tamaño del archivo (debería ser mayor que antes de la conversión)
du -h "Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt"

# Verificar el identificador AIRAC
cat "Community\ifly-aircraft-737max8\Data\navdata\FMC_Ident.txt"
```

### 2. Verificación en el simulador

1.  **Reiniciar MSFS**: Cerrar completamente y reiniciar el simulador
2.  **Cargar iFly 737**: Seleccionar el iFly 737 MAX 8
3.  **Comprobar el FMC**:
    ```
    Página principal del FMC → INIT REF → Ver ciclo AIRAC
    Debería mostrar: AIRAC 2508
    ```
4.  **Probar rutas**:
    ```
    Página ROUTE → Introducir rutas chinas (ej. A1, B1)
    Debería mostrar correctamente los puntos de ruta y las distancias
    ```

### 3. Lista de verificación de funciones

- [ ] **Ciclo AIRAC mostrado correctamente**
- [ ] **Rutas chinas pueden cargarse** (A1, B1, G212, etc.)
- [ ] **Procedimientos de aeropuerto completos** (SID, STAR, APP)
- [ ] **Coordenadas de puntos de ruta precisas**
- [ ] **Cálculo de declinación magnética correcto**
- [ ] **Navegación del FMC normal**

## 🔧 Uso avanzado

### Modo de procesamiento por lotes

Aunque la versión actual no soporta directamente el procesamiento por lotes, se puede lograr mediante un script:

```python
# batch_convert.py
import subprocess
import os

databases = [
    "path/to/fenix_db1.db3",
    "path/to/fenix_db2.db3"
]

csv_file = "path/to/RTE_SEG.csv"

for db in databases:
    print(f"Procesando base de datos: {db}")
    # Aquí es necesario modificar main.py para que admita parámetros de línea de comandos.
    # subprocess.run(["python", "main.py", "--db", db, "--csv", csv_file])
```

### Archivos de configuración personalizados

Cree un archivo `config.json` para guardar configuraciones comunes:

```json
{
    "default_fenix_path": "C:\\Users\\Username\\AppData\\Roaming\\Microsoft Flight Simulator\\Packages\\fenix-a320\\SimObjects\\Airplanes\\FenixA320\\navdata\\nd.db3",
    "default_csv_path": "D:\\Nav-Data\\RTE_SEG.csv",
    "terminal_id_start": 1500,
    "coordinate_precision": 8,
    "enable_backup": true,
    "backup_directory": "D:\\Nav-Data\\Backups"
}
```

### Flujo de actualización de datos

Flujo de actualización periódica sugerido:

```bash
# 1. Hacer copia de seguridad de los datos actuales
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_$(date +%Y%m%d)"

# 2. Descargar los últimos datos NAIP
# (Descargar el nuevo RTE_SEG.csv desde el sitio web oficial)

# 3. Obtener la última base de datos de Fenix
# (Asegurarse de que Fenix A320 esté actualizado a la última versión)

# 4. Ejecutar el convertidor
python main.py

# 5. Verificar los resultados
# (Probar los nuevos datos en el simulador)
```

## ⚠️ Notas importantes

### Recordatorios importantes

1.  **Copia de seguridad de datos**: Siempre haga una copia de seguridad de los datos de navegación originales de iFly antes de la conversión.
2.  **Compatibilidad de versiones**: Asegúrese de usar las últimas versiones de Fenix A320 y iFly 737 MAX 8.
3.  **Vigencia**: Se recomienda actualizar los datos AIRAC cada 28 días.
4.  **Pruebas de verificación**: Realice vuelos de prueba en rutas clave después de la conversión.

### Optimización del rendimiento

1.  **Usar SSD**: Coloque los archivos de datos en un SSD para mejorar la velocidad de procesamiento.
2.  **Desactivar antivirus**: Desactive temporalmente el escaneo en tiempo real para evitar conflictos de acceso a archivos.
3.  **Memoria suficiente**: Asegúrese de tener al menos 4 GB de memoria disponible.
4.  **Fuente de alimentación estable**: Use un UPS o asegúrese de que la fuente de alimentación sea estable.

### Resolución de problemas

Si encuentra problemas durante el proceso de conversión:

1.  **Ver el registro**: Verifique el archivo `converter.log` para mensajes de error.
2.  **Reintentar la operación**: Algunos problemas de red o acceso a archivos pueden ser temporales.
3.  **Limpiar caché**: Intente de nuevo después de eliminar los archivos temporales.
4.  **Reducir la configuración**: Si la memoria es insuficiente, puede reducir el tamaño del lote.

---

**¡Felicidades por completar el aprendizaje!** 🎉 

Ahora ha dominado el uso completo del convertidor de datos de navegación de iFly. Si encuentra problemas, consulte la [Guía de resolución de problemas](../troubleshooting.md) o las [Preguntas frecuentes](../faq.md).

¡Le deseamos un feliz vuelo! ✈️
# 🔧 Guía de Solución de Problemas

Esta guía cubre los problemas comunes que pueden surgir al usar la herramienta de conversión Nav-data PMDG y sus soluciones. Se clasifican por tipo de problema para una identificación y resolución rápidas.

---

## 🚨 Problemas de Instalación

### ❌ Problemas del Entorno Python

#### **Problema**: `python: command not found` o `'python' no se reconoce como un comando interno o externo`
**Síntoma**:
```bash
'python' is not recognized as an internal or external command
```

**Solución**:
```bash
# 1. Verificar la instalación de Python
python --version
# O
python3 --version

# 2. Comprobar la variable de entorno PATH
echo $PATH  # Linux/macOS
echo %PATH%  # Windows

# 3. Reinstalar Python (se recomienda descargar desde el sitio web oficial)
# https://www.python.org/downloads/
```

#### **Problema**: Error al instalar paquetes de dependencia
**Síntoma**:
```bash
ERROR: Could not find a version that satisfies the requirement
```

**Solución**:
```bash
# 1. Actualizar pip
python -m pip install --upgrade pip

# 2. Usar una fuente de espejo nacional (para usuarios en China)
pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple

# 3. Limpiar la caché de pip
pip cache purge

# 4. Usar un entorno virtual
python -m venv nav_data_env
source nav_data_env/bin/activate  # Linux/macOS
nav_data_env\Scripts\activate     # Windows
```

### ❌ Problemas de Permisos

#### **Problema**: Acceso denegado al directorio de MSFS
**Síntoma**:
```
PermissionError: [Errno 13] Permission denied
```

**Solución**:
```bash
# Usuarios de Windows
# 1. Ejecutar el símbolo del sistema como administrador
# 2. O modificar los permisos del directorio
icacls "C:\Users\[用户名]\AppData\Local\Packages" /grant Users:F /T

# Verificar los permisos del directorio de MSFS
# Clic derecho en el directorio -> Propiedades -> Seguridad -> Editar -> Añadir permisos de control total
```

---

## 🔄 Problemas de Conversión

### ❌ Problemas con Archivos de Datos

#### **Problema**: No se encuentra el archivo de datos AIRAC
**Síntoma**:
```
FileNotFoundError: AIRAC data file not found
```

**Pasos de Diagnóstico**:
```bash
# 1. Verificar la ruta del archivo
ls -la ./input/AIRAC2024-01/  # Linux/macOS
dir .\input\AIRAC2024-01\     # Windows

# 2. Comprobar los permisos del archivo
ls -la *.dat *.txt *.xml      # Verificar archivos de datos
```

**Solución**:
```bash
# 1. Confirmar el formato y la ubicación del archivo de datos
mkdir -p ./input/AIRAC2024-01
# Colocar el archivo de datos AIRAC en el directorio correcto

# 2. Verificar la integridad del archivo
python validate_data.py --check-integrity --input-dir=./input/AIRAC2024-01
```

#### **Problema**: Formato de datos incompatible
**Síntoma**:
```
ValueError: Unsupported data format or corrupted file
```

**Solución**:
```bash
# 1. Verificar los formatos compatibles
python converter.py --list-supported-formats

# 2. Convertir el formato de datos
python format_converter.py --input=old_format.dat --output=new_format.xml --format=ARINC424

# 3. Usar el modo de depuración para obtener detalles
python converter.py --debug --verbose --input=problematic_file.dat
```

### ❌ Errores durante el Proceso de Conversión

#### **Problema**: Error de memoria insuficiente
**Síntoma**:
```
MemoryError: Unable to allocate array
```

**Solución**:
```bash
# 1. Procesar grandes conjuntos de datos en bloques
python converter.py --batch-size=1000 --memory-limit=4GB

# 2. Habilitar el procesamiento de flujo de datos
python converter.py --streaming-mode --temp-dir=/tmp/nav_data

# 3. Aumentar la memoria virtual (Windows)
# Panel de control -> Sistema -> Configuración avanzada del sistema -> Memoria virtual

# 4. Optimizar los recursos del sistema
# Cerrar programas innecesarios
# Limpiar archivos temporales
```

#### **Problema**: Error de conversión de coordenadas
**Síntoma**:
```
CoordinateTransformError: Invalid coordinate conversion
```

**Solución**:
```bash
# 1. Verificar la configuración del sistema de coordenadas
python converter.py --coordinate-system=WGS84 --verify-coordinates

# 2. Usar un método de conversión alternativo
python converter.py --coordinate-method=alternative --precision=8

# 3. Comprobar la configuración de la declinación magnética
python converter.py --magnetic-model=WMM2020 --declination-check
```

---

## ⚙️ Problemas de Configuración

### ❌ Problemas de Integración con PMDG

#### **Problema**: El avión PMDG no reconoce los datos de navegación
**Síntoma**: El FMC muestra "NAV DATA NOT FOUND" o los puntos de navegación no se cargan.

**Pasos de Diagnóstico**:
```bash
# 1. Comprobar el directorio de datos de PMDG
dir "C:\Users\%USERNAME%\AppData\Local\Packages\Microsoft.FlightSimulator_*\LocalCache\PMDG\"

# 2. Verificar el archivo de la base de datos
python verify_pmdg_db.py --check-tables --check-indexes
```

**Solución**:
```bash
# 1. Confirmar la ruta de datos de PMDG
python converter.py --pmdg-path="C:\Users\[用户名]\AppData\Local\Packages\Microsoft.FlightSimulator_[ID]\LocalCache\PMDG"

# 2. Regenerar el índice de la base de datos
python rebuild_indexes.py --database=pmdg_nav.db

# 3. Comprobar los permisos del archivo
icacls "PMDG数据目录" /grant Users:F /T

# 4. Reiniciar MSFS y el avión PMDG
```

#### **Problema**: Versión de datos no coincidente
**Síntoma**: PMDG muestra un ciclo AIRAC antiguo o los datos no se actualizan.

**Solución**:
```bash
# 1. Forzar la actualización del identificador AIRAC
python converter.py --force-airac-update --airac-cycle=2024-01

# 2. Limpiar la caché
python clear_cache.py --pmdg-cache --nav-cache

# 3. Verificar el ciclo AIRAC
python verify_airac.py --current-cycle --check-validity
```

---

## 🚀 Problemas de Rendimiento

### ❌ Velocidad de Conversión Lenta

#### **Problema**: El proceso de conversión es excepcionalmente lento
**Posibles causas**:
- Cuello de botella de E/S del disco duro
- Memoria insuficiente
- Bajo uso de CPU
- Latencia de red (verificación en línea)

**Soluciones de Optimización**:
```bash
# 1. Habilitar el procesamiento multiproceso
python converter.py --parallel=4 --workers=auto

# 2. Usar un directorio temporal en SSD
python converter.py --temp-dir="D:\SSD_Temp" --keep-temp-files=false

# 3. Deshabilitar validaciones innecesarias
python converter.py --skip-validation --no-online-check

# 4. Optimizar operaciones de E/S
python converter.py --buffer-size=64MB --async-io
```

### ❌ Uso Excesivo de Memoria

#### **Problema**: El proceso de conversión consume mucha memoria
**Monitorizar el uso de memoria**:
```bash
# Windows
tasklist /fi "imagename eq python.exe"

# Linux/macOS  
top -p $(pgrep python)
```

**Solución**:
```bash
# 1. Habilitar el procesamiento por flujo (streaming)
python converter.py --streaming --chunk-size=10MB

# 2. Limitar el uso de memoria
python converter.py --max-memory=2GB --gc-threshold=100MB

# 3. Procesar por etapas
python converter.py --process-by-region --region-size=small
```

---

## 🔍 Problemas de Validación de Datos

### ❌ Fallo en la Verificación de Integridad de Datos

#### **Problema**: La herramienta de validación informa datos incompletos
**Síntoma**:
```
ValidationError: Missing required navigation points
```

**Herramientas de Diagnóstico**:
```bash
# 1. Ejecutar validación completa
python validate_data.py --comprehensive --output-report=validation_report.html

# 2. Verificar tipos de datos específicos
python validate_data.py --check-airports --check-navaids --check-airways

# 3. Comparar con datos de referencia
python compare_data.py --reference=official_data.xml --current=converted_data.db
```

**Soluciones de Reparación**:
```bash
# 1. Volver a descargar los datos de origen
# Asegurarse de que los datos AIRAC estén completos y actualizados

# 2. Usar la herramienta de reparación
python repair_data.py --fix-missing --interpolate-gaps

# 3. Complementar manualmente los datos faltantes
python manual_fix.py --add-missing-waypoints --config=fixes.json
```

### ❌ Problemas de Precisión de Coordenadas

#### **Problema**: La posición de los puntos de navegación es inexacta
**Métodos de Verificación**:
```bash
# 1. Verificar las coordenadas de un waypoint específico
python check_waypoint.py --icao=ZSPD --waypoint=SASAN

# 2. Comparar con múltiples fuentes de datos
python compare_coordinates.py --sources=navigraph,aerosoft --output=coordinate_diff.csv

# 3. Generar informe de desviaciones
python deviation_report.py --threshold=0.001 --output=deviations.html
```

---

## 📊 Análisis de Registros (Logs)

### 🔍 Entendiendo los Archivos de Registro (Logs)

#### **Explicación de los Niveles de Registro (Log Levels)**:
- **DEBUG**: Información detallada de depuración
- **INFO**: Información general de procesamiento
- **WARNING**: Mensajes de advertencia, no afectan la funcionalidad
- **ERROR**: Mensajes de error, requieren atención
- **CRITICAL**: Errores críticos, interrupción del procesamiento

#### **Patrones Comunes de Registro (Log)**:
```bash
# Buscar logs de error
grep "ERROR\|CRITICAL" converter.log

# Contar el número de advertencias
grep -c "WARNING" converter.log

# Analizar el tiempo de procesamiento
grep "Processing time" converter.log | tail -10
```

### 🔧 Configuración de Registros (Logs)

#### **Aumentar el Nivel de Detalle de los Registros (Logs)**:
```bash
# Habilitar logs detallados
python converter.py --log-level=DEBUG --log-format=detailed

# Separar diferentes tipos de logs
python converter.py --log-split --error-log=errors.log --debug-log=debug.log
```

---

## 🆘 Reparación de Emergencia

### 🚨 Recuperación de Datos Corruptos

#### **Paso 1**: Realizar una copia de seguridad inmediatamente
```bash
# Hacer una copia de seguridad del estado actual
cp -r ./output ./backup_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
xcopy .\output .\backup_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E /I  # Windows
```

#### **Paso 2**: Restaurar desde la copia de seguridad
```bash
# Restaurar la copia de seguridad válida más reciente
python restore_backup.py --list-backups
python restore_backup.py --restore=backup_20240115_1430 --target=./output
```

#### **Paso 3**: Verificar la restauración
```bash
# Verificar los datos restaurados
python validate_data.py --quick-check --report-only-errors
```

### 🚨 Restablecer al Estado Predeterminado

#### **Restablecimiento Completo**:
```bash
# Advertencia: Esto eliminará todos los datos convertidos
python reset_tool.py --full-reset --confirm

# Volver a descargar la configuración predeterminada
python setup.py --download-config --reset-settings

# Volver a ejecutar la inicialización
python init.py --first-time-setup
```

---

## 📞 Obtener Ayuda Adicional

### 📝 Al Reportar un Problema, Proporcione

1.  **Información del Sistema**:
    ```bash
    python --version
    python system_info.py --full-report
    ```

2.  **Registros de Error (Error Logs)**:
    -   Rastreo completo de la pila de errores
    -   Mensajes de advertencia relevantes
    -   Fragmentos de registro (log) antes y después del procesamiento

3.  **Información del Entorno**:
    -   Versión del sistema operativo
    -   Versión y método de instalación de MSFS
    -   Versión del avión PMDG
    -   Fuente de datos y ciclo AIRAC

4.  **Pasos para Reproducir**:
    -   Pasos operativos detallados
    -   Comandos y parámetros ingresados
    -   Resultado esperado vs resultado real

### 🔗 Contacto

-   **GitHub Issues**: [Reportar un problema](https://github.com/nav-data/docs/issues/new)
-   **Foro de la Comunidad**: [Participar en la discusión](https://github.com/nav-data/docs/discussions)
-   **Soporte de Emergencia**: support@nav-data.org

---

## 🔄 Medidas Preventivas

### ✅ Lista de Mejores Prácticas

- [ ] **Realizar copias de seguridad regularmente** de datos y configuraciones
- [ ] **Usar la última versión** de la herramienta de conversión
- [ ] **Verificar los datos** después de cada conversión
- [ ] **Monitorizar los registros (logs)** para identificar problemas potenciales
- [ ] **Mantener el entorno** limpio y actualizado
- [ ] **Documentar** las configuraciones personalizadas

### 📅 Plan de Mantenimiento

- **Semanalmente**: Revisar archivos de registro (logs), limpiar archivos temporales
- **Mensualmente**: Actualizar datos AIRAC, verificar la versión de la herramienta
- **Trimestralmente**: Revisión completa del sistema, optimización del rendimiento
- **Al haber actualizaciones importantes**: Copia de seguridad completa, actualizar con precaución

Recuerde: ¡Más vale prevenir que curar! El mantenimiento regular puede evitar la mayoría de los problemas.
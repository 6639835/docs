# ❓ Preguntas Frecuentes del Convertidor de Datos de Navegación de TFDI

## 🔧 Instalación y Configuración

### Q: ¿Qué software necesito instalar para usar el convertidor?

**A:** Necesitas el siguiente entorno de software:
- **Python 3.8+** (se recomienda 3.9 o superior)
- **TFDI MD-11** instalado en Microsoft Flight Simulator
- **Fenix A320** (para obtener los archivos de la base de datos de navegación)
- Los paquetes de dependencia de Python necesarios (instalados a través de requirements.txt)

### Q: ¿Cómo obtengo los archivos de la base de datos de navegación de Fenix?

**A:** Los archivos de la base de datos de Fenix suelen encontrarse en:
```
%APPDATA%\Microsoft Flight Simulator\Packages\fenix-a320\SimObjects\Airplanes\FenixA320\navdata\nd.db3
```

**Notas:**
- Asegúrate de que Fenix A320 esté instalado y se haya ejecutado al menos una vez
- El tamaño del archivo de la base de datos suele ser de 50-200MB
- El archivo debe ser una base de datos SQLite completa y sin daños

### Q: ¿Qué versiones de Fenix y TFDI soporta el convertidor?

**A:** Versiones actualmente soportadas:
- **Fenix A320**: v1.0.x - v1.2.x
- **TFDI MD-11**: v1.0.x - v1.2.x
- **Formato de la base de datos**: SQLite 3.x

**Compatibilidad de versiones:**
- ✅ Totalmente compatible: Fenix v1.1.x + TFDI v1.1.x
- ⚠️ Requiere verificación: Las últimas versiones pueden necesitar una actualización de compatibilidad
- ❌ No soportado: Versiones Beta demasiado antiguas

## 📊 Conversión de Datos

### Q: ¿Cuánto tiempo tarda el proceso de conversión?

**A:** El tiempo de conversión depende del tamaño de la base de datos:
- **Bases de datos pequeñas** (< 50MB): 2-5 minutos
- **Bases de datos medianas** (50-200MB): 5-15 minutos
- **Bases de datos grandes** (200-500MB): 15-45 minutos

**Factores que influyen:**
- Tipo de disco duro (SSD es 2-3 veces más rápido que HDD)
- Memoria disponible (se recomienda 8GB+)
- Rendimiento de la CPU (los multinúcleo son ventajosos)
- Carga del sistema (cerrar programas innecesarios)

### Q: ¿Qué es el ID de Terminal y cómo se configura?

**A:** El ID de Terminal es un número de identificación único utilizado en el sistema TFDI para identificar programas de terminal.

**Sugerencias de configuración:**
```
ID inicial: 1000 (predeterminado)
Rango de ID: 1-999999
Rango recomendado: 1000-9000 (para dejar espacio de expansión)
```

**Estrategia de asignación:**
- Reservar 20-50 IDs para cada aeropuerto
- Asignar por grupos de región (ej. región de Asia 1000-3000)
- Evitar conflictos con datos TFDI existentes

### Q: ¿Dónde se guardan los archivos convertidos?

**A:** El convertidor generará un paquete comprimido `Primary.7z` que contiene:

```
Primary.7z
├── AirportLookup.json      # Datos de búsqueda de aeropuertos
├── Airports.json           # Información de aeropuertos
├── AirwayLegs.json        # Datos de tramos de aerovía
├── Airways.json           # Definiciones de aerovías
├── Ilses.json             # Datos de aproximación ILS
├── NavaidLookup.json      # Búsqueda de radioayudas
├── Navaids.json           # Datos de radioayudas
├── Runways.json           # Información de pistas
├── Terminals.json         # Datos de procedimientos de terminal
├── WaypointLookup.json    # Búsqueda de waypoints
├── Waypoints.json         # Definiciones de waypoints
└── ProcedureLegs/         # Directorio de tramos de procedimiento
    ├── TermID_1.json
    ├── TermID_2.json
    └── ...
```

### Q: ¿Qué es la detección de puntos FAF? ¿Por qué es importante?

**A:** FAF (Final Approach Fix) es el Punto de Fijación de Aproximación Final en un procedimiento de aproximación de precisión.

**Importancia:**
- Marca el punto de inicio de una aproximación de precisión
- Punto de referencia clave para los cálculos VNAV
- Influye en el modo de aproximación del piloto automático

**Criterios de detección:**
- Ángulo VNAV ≤ 2.5° (configurable)
- Ubicado en la fase final del procedimiento de aproximación
- Con información de restricción de altitud

## 🐛 Solución de Problemas

### Q: ¿Qué debo hacer si aparece el error "Base de datos dañada"?

**Mensaje de error:**
```
SQLite Error: database disk image is malformed
数据库文件可能已损坏 (El archivo de la base de datos puede estar dañado)
```

**Solución:**
1.  **Volver a obtener la base de datos**:
    ```bash
    # Eliminar el archivo posiblemente dañado
    rm path/to/nd.db3
    
    # Reiniciar Fenix A320 para que se regenere
    ```

2.  **Verificar la integridad del archivo**:
    ```python
    import sqlite3
    
    try:
        conn = sqlite3.connect('nd.db3')
        conn.execute('PRAGMA integrity_check')
        print("Comprobación de integridad de la base de datos aprobada")
    except Exception as e:
        print(f"Base de datos dañada: {e}")
    ```

3.  **Usar una herramienta de reparación de la base de datos**:
    ```bash
    # Usar la herramienta SQLite para intentar reparar
    sqlite3 nd.db3 ".dump" | sqlite3 nd_repaired.db3
    ```

### Q: ¿Qué hago si el convertidor se detiene en un paso?

**Pasos comunes donde se detiene:**
- Fase de validación de la base de datos
- Fase de procesamiento de datos de tablas grandes
- Fase de serialización JSON
- Fase de compresión y empaquetado

**Métodos de depuración:**
```bash
# 1. Comprobar los recursos del sistema
top  # Linux/macOS
# o Administrador de tareas (Windows)

# 2. Ver el archivo de registro
tail -f converter.log

# 3. Comprobar el espacio en disco
df -h  # Linux/macOS
# o comprobar el espacio de la unidad en Windows
```

**Solución:**
1.  **Reiniciar el convertidor**: Salir completamente y reiniciar
2.  **Aumentar la memoria**: Cerrar otros programas para liberar memoria
3.  **Comprobar permisos**: Asegurarse de tener permisos de escritura
4.  **Depuración paso a paso**: Usar el modo de depuración para ver información detallada

### Q: ¿Los archivos JSON convertidos no son reconocidos en TFDI?

**Posibles causas:**
1.  **Versión incompatible**: La versión de TFDI no coincide con la versión del formato JSON
2.  **Archivo dañado**: El archivo se dañó durante la compresión o transmisión
3.  **Error de formato**: El formato JSON no cumple con los estándares de TFDI
4.  **Problema de codificación**: La codificación de caracteres es incorrecta

**Pasos de verificación:**
```bash
# 1. Validar el formato JSON
python -m json.tool Primary/Airports.json

# 2. Comprobar el tamaño del archivo
ls -lh Primary/

# 3. Validar la integridad del paquete comprimido
7z t Primary.7z
```

**Métodos de reparación:**
1.  **Volver a convertir**: Eliminar la carpeta de salida y volver a convertir
2.  **Descomprimir manualmente**: Descomprimir el archivo 7z para comprobar el contenido
3.  **Actualización de versión**: Asegurarse de usar la última versión del convertidor
4.  **Contactar con soporte**: Si el problema persiste, por favor, informe del error

## 📈 Optimización del rendimiento

### Q: ¿Cómo aumentar la velocidad de conversión?

**Optimización del hardware:**
- **Usar SSD**: Los discos de estado sólido son 3-5 veces más rápidos que los discos duros mecánicos
- **Aumentar la memoria RAM**: Se recomienda 8GB+ de RAM
- **CPU multinúcleo**: Soporta procesamiento paralelo
- **Desactivar antivirus**: Desactivar temporalmente el escaneo en tiempo real

**Optimización del software:**
```python
# Ajustar parámetros de configuración
config = ConverterConfig(
    coordinate_precision=6,    # Reducir la precisión para aumentar la velocidad
    batch_size=2000,          # Aumentar el tamaño del lote
    enable_compression=False,  # Desactivar la compresión en tiempo real
    max_workers=4             # Establecer el número de hilos paralelos
)
```

**Optimización del entorno:**
```bash
# Establecer variables de entorno
export PYTHONOPTIMIZE=1       # Activar la optimización de bytecode
export SQLITE_TEMP_STORE=3    # Usar almacenamiento temporal en memoria
```

### Q: ¿Qué hacer si el uso de memoria es demasiado alto?

**Monitorizar el uso de memoria:**
```python
import psutil

def monitor_memory():
    memory = psutil.virtual_memory()
    print(f"Uso de memoria: {memory.percent}%")
    print(f"Memoria disponible: {memory.available // 1024**2} MB")
```

**Estrategias de optimización:**
1.  **Reducir el tamaño del lote**:
    ```python
    config.batch_size = 500  # Reducir de 1000 (predeterminado) a 500
    ```

2.  **Procesamiento por etapas**:
    ```python
    # Procesar tablas grandes en lotes
    tables = ['Airports', 'Runways', 'Waypoints']
    for table in tables:
        converter.process_table(table)
        gc.collect()  # Recolección de basura forzada
    ```

3.  **Procesamiento por streaming**: Habilitar el modo de procesamiento por streaming para archivos grandes

### Q: ¿Se pueden ejecutar varias instancias del convertidor simultáneamente?

**Técnicamente posible, pero con limitaciones:**
-   **Bloqueo de la base de datos**: SQLite no soporta múltiples conexiones de escritura
-   **Competencia de recursos**: Múltiples instancias competirán por CPU y memoria
-   **E/S de disco**: Puede causar cuellos de botella en el disco

**Práctica recomendada:**
```bash
# Procesar múltiples bases de datos en serie
python converter.py --input db1.db3 --output output1/
python converter.py --input db2.db3 --output output2/

# O usar un script por lotes
for db in *.db3; do
    python converter.py --input "$db" --output "output_${db%.*}/"
done
```

## 🔍 Validación de Datos

### Q: ¿Cómo verificar la exactitud de los resultados de la conversión?

**Herramienta de validación automática:**
```python
# Usar el validador integrado
from tfdi_converter.validation import DataValidator

validator = DataValidator()
result = validator.validate_output("Primary.7z")

if result.is_valid:
    print("✅ Validación exitosa")
else:
    print("❌ Validación fallida:")
    for error in result.errors:
        print(f"  - {error}")
```

**Lista de verificación manual:**
- [ ] **Integridad del archivo**: Todos los archivos JSON requeridos están presentes
- [ ] **Cantidad de datos**: El número de registros es razonable y no hay una reducción anómala
- [ ] **Rango de coordenadas**: Latitud [-90, 90], Longitud [-180, 180]
- [ ] **Integridad referencial**: Las relaciones de clave externa se mantienen intactas
- [ ] **Caracteres especiales**: Codificación UTF-8 procesada correctamente

**Verificación en TFDI:**
1.  Instalar el paquete de datos convertido
2.  Crear un plan de vuelo para probar la ruta
3.  Comprobar la visualización de los procedimientos en el FMC
4.  Verificar las frecuencias y posiciones de las radioayudas

### Q: ¿Por qué el volumen de datos convertidos se ha reducido significativamente?

**Posibles causas:**
1.  **Filtrado de datos**: El convertidor filtró datos incompatibles o no válidos
2.  **Restricción de área**: Puede que solo se hayan convertido datos de un área específica
3.  **Limitación de formato**: Algunos formatos específicos de Fenix no se pueden convertir
4.  **Diferencias de versión**: Diferencias en la estructura de datos entre versiones

**Método de verificación:**
```python
# Comparar el número de registros antes y después de la conversión
def compare_record_counts(fenix_db, tfdi_json_dir):
    # Contar los registros de la base de datos de Fenix
    fenix_counts = count_fenix_records(fenix_db)
    
    # Contar los registros JSON de TFDI
    tfdi_counts = count_tfdi_records(tfdi_json_dir)
    
    # Comparar resultados
    for table, fenix_count in fenix_counts.items():
        tfdi_count = tfdi_counts.get(table, 0)
        ratio = tfdi_count / fenix_count if fenix_count > 0 else 0
        print(f"{table}: {fenix_count} → {tfdi_count} ({ratio:.1%})")
```

## 🆘 Obtener Ayuda

### Q: ¿Dónde puedo obtener soporte técnico?

**Canales de soporte oficiales:**
- **GitHub Issues**: Informar de errores y solicitudes de características
- **GitHub Discussions**: Para preguntas y discusiones generales
- **Documentación del proyecto**: Consultar la guía de usuario completa
- **Código de ejemplo**: Referirse a los ejemplos del proyecto

**Soporte de la comunidad:**
- **Foros de simulación de vuelo**: Comunidades de simulación de vuelo relevantes
- **Grupos de Discord**: Comunicación y asistencia en tiempo real
- **Grupos de QQ/WeChat**: Grupos de chat para usuarios chinos

### Q: ¿Cómo informar de un problema o sugerir una nueva característica?

**Proceso de informe de problemas:**
1.  **Buscar problemas existentes**: Evitar informes duplicados
2.  **Recopilar información**:
    - Descripción detallada del error
    - Registro de errores completo
    - Información del entorno del sistema
    - Pasos para reproducir
3.  **Crear una Incidencia (Issue)**: Usar la plantilla proporcionada
4.  **Proporcionar ejemplos**: Si es posible, proporcionar un ejemplo mínimo reproducible

**Sugerencias de características:**
- Describir detalladamente el propósito de la nueva característica
- Explicar el comportamiento esperado de la característica
- Considerar el impacto en los usuarios existentes
- Proporcionar sugerencias de implementación (si las hay)

### Q: ¿Se puede contribuir con código? ¿Cómo participar en el desarrollo?

**Formas de contribuir:**
- **Corrección de errores**: Resolver problemas conocidos
- **Desarrollo de nuevas características**: Implementar nuevas funciones de conversión
- **Optimización del rendimiento**: Mejorar la velocidad y eficiencia de la conversión
- **Mejora de la documentación**: Perfeccionar la documentación de usuario y la documentación de la API
- **Mejora de las pruebas**: Aumentar los casos de prueba y la cobertura

**Pasos para participar:**
1.  **Hacer un fork del proyecto**: Crear tu propia rama del proyecto
2.  **Configurar el entorno de desarrollo**: Configurar según la guía de contribución
3.  **Seleccionar una tarea**: Seleccionar una tarea adecuada de las Incidencias (Issues)
4.  **Desarrollo y pruebas**: Escribir código y asegurar que las pruebas pasen
5.  **Enviar un PR (Pull Request)**: Crear un Pull Request y esperar la revisión

**Requisitos de contribución:**
- Seguir las directrices de codificación del proyecto
- Proporcionar una cobertura de pruebas adecuada
- Actualizar la documentación relevante
- Usar mensajes de commit claros

---

**¿No encuentras la respuesta?** 

Por favor, busca o crea una nueva incidencia en [GitHub Issues](https://github.com/your-org/tfdi-converter/issues), ¡y te responderemos lo antes posible! 🚁✨
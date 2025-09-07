Aquí tienes la traducción del texto al español, siguiendo todas las reglas especificadas:

# ❓ Preguntas Frecuentes del Conversor de Datos de Navegación de iFly

## 🔧 Instalación y Configuración

### Q: ¿Qué software necesito para ejecutar el conversor?

**A:** Necesita el siguiente software:
- **Python 3.8+** (se recomienda Python 3.9 o superior)
- **iFly 737 MAX 8** instalado en Microsoft Flight Simulator
- **Fenix A320** (para obtener la base de datos de navegación)
- **NAIP RTE_SEG.csv** archivo de datos de segmentos de aerovía

### Q: ¿Cómo instalar los paquetes de dependencias de Python necesarios?

**A:** Ejecute en el directorio del proyecto:
```bash
pip install rich pathlib typing pygeomag pandas tqdm geographiclib
```

O si tiene un archivo requirements.txt:
```bash
pip install -r requirements.txt
```

### Q: ¿Qué hacer si el programa indica que no encuentra la ruta de instalación de iFly?

**A:** Puede:
1.  **Especificar la ruta manualmente**: introduzca la ruta completa de instalación de iFly cuando el programa lo solicite
2.  **Verificar la ubicación de instalación**: confirme que iFly 737 MAX 8 está correctamente instalado en una de las siguientes ubicaciones:
    - `Community\ifly-aircraft-737max8\`
    - `Official\asobo-aircraft-ifly-737max8\`
3.  **Reinstalar iFly**: si la ruta es incorrecta, reinstale iFly 737 MAX 8

## 📊 Procesamiento de Datos

### Q: ¿Qué es el ciclo AIRAC? ¿Por qué es importante?

**A:** AIRAC (Aeronautical Information Regulation and Control) es el ciclo de actualización de información aeronáutica de 28 días establecido por la OACI (Organización de Aviación Civil Internacional). Cada ciclo tiene un identificador único de 4 dígitos (p. ej., 2508), lo que garantiza la actualidad y precisión de los datos de navegación.

### Q: ¿Cómo se calcula la declinación magnética?

**A:** El conversor utiliza el modelo geomagnético **WMM-2025** (World Magnetic Model) de la librería **pygeomag** para el cálculo de la declinación magnética con alta precisión:
- **Cálculo local**: no requiere conexión a internet
- **Alta precisión**: preciso a múltiples decimales
- **Actualización en tiempo real**: basado en la fecha y coordenadas actuales

### Q: ¿Por qué se necesita el archivo NAIP RTE_SEG.csv?

**A:** Este archivo contiene datos de segmentos de aerovía de la aviación civil china, utilizados para:
- complementar la información de aerovías chinas que falta en iFly
- proporcionar coordenadas precisas de puntos de ruta
- garantizar la coherencia con la red de aerovías real

### Q: ¿Dónde se almacenan los datos convertidos?

**A:** Los datos se colocarán en las siguientes ubicaciones:
- **Datos de aerovías**: `Community\ifly-aircraft-737max8\Data\navdata\Permanent\WPNAVRTE.txt`
- **Procedimientos terminales**: `Community\ifly-aircraft-737max8\Data\navdata\Supplemental\`
- **Identificador AIRAC**: `FMC_Ident.txt`

## 🐛 Solución de Problemas

### Q: ¿Aparece el error "fallo de conexión a la base de datos" al ejecutar el programa?

**A:** Por favor, verifique:
1.  **Ruta del archivo**: confirme que la ruta del archivo de la base de datos de Fenix es correcta
2.  **Permisos del archivo**: asegúrese de que el archivo sea legible
3.  **Integridad del archivo**: intente obtener el archivo de la base de datos de Fenix de nuevo
4.  **Espacio en disco**: asegúrese de tener suficiente espacio disponible

### Q: ¿Qué hacer si el cálculo de la declinación magnética es lento?

**A:** Esto suele ser normal:
- **Primera ejecución**: la inicialización del modelo geomagnético lleva tiempo
- **Grandes cantidades de datos**: el tiempo de cálculo es mayor cuando hay muchos puntos de ruta
- **Rendimiento del sistema**: el hardware más antiguo procesa a menor velocidad

Recomendaciones de optimización:
- Utilice una unidad SSD
- Asegúrese de tener suficiente memoria RAM (se recomienda 8GB+)
- Cierre los programas en segundo plano innecesarios

### Q: ¿No se ven los nuevos datos en iFly después de la conversión?

**A:** Por favor, intente:
1.  **Reiniciar el simulador**: salga completamente y reinicie MSFS
2.  **Verificar la ubicación de los archivos**: confirme que los archivos se escribieron en el directorio correcto
3.  **Limpiar caché**: elimine los archivos de caché de iFly
4.  **Verificar permisos**: asegúrese de que el programa tenga permisos para escribir en el directorio de iFly

### Q: ¿Qué hacer si aparece un error de codificación?

**A:** Esto suele estar relacionado con la codificación de caracteres:
1.  **Asegúrese de que su entorno Python sea compatible con UTF-8**
2.  **Verifique la codificación del archivo CSV**: confirme que esté en formato UTF-8
3.  **Actualice la versión de Python**: utilice la versión más reciente de Python

## 📈 Rendimiento y Optimización

### Q: ¿Cómo mejorar la velocidad de conversión?

**A:** Recomendaciones para la optimización del rendimiento:
- **Utilice una SSD**: Las unidades de estado sólido mejoran significativamente el rendimiento de E/S
- **Aumente la memoria**: se recomienda 8GB+ de RAM
- **Desactive el software antivirus**: desactive temporalmente el escaneo en tiempo real
- **Utilice una versión más reciente de Python**: Python 3.9+ ofrece mejor rendimiento

### Q: ¿Qué hacer si el uso de memoria es demasiado alto?

**A:** Soluciones de optimización de memoria:
1.  **Procesamiento por lotes**: utilice el modo por lotes al procesar archivos grandes
2.  **Cierre otros programas**: para liberar memoria del sistema
3.  **Verifique el tamaño de los datos**: confirme que el tamaño del archivo de datos es razonable
4.  **Utilice Python de 64 bits**: para evitar las limitaciones de memoria de 32 bits

### Q: ¿Es posible procesar múltiples bases de datos por lotes?

**A:** La versión actual no admite directamente el procesamiento por lotes, pero puede:
1.  **Ejecutar el programa varias veces**: procesar los archivos de la base de datos uno por uno
2.  **Escribir un script**: para crear un script de procesamiento por lotes automatizado
3.  **Esperar una actualización**: la v2.1.0 admitirá la función de procesamiento por lotes

## 🔄 Gestión de Datos

### Q: ¿Cómo hacer una copia de seguridad de los datos originales?

**A:** Se recomienda encarecidamente hacer una copia de seguridad antes de la conversión:
```bash
# Copia de seguridad de los datos originales de iFly
cp -r "Community\ifly-aircraft-737max8\Data\navdata" "backup_navdata"
```

### Q: ¿Cómo restaurar los datos originales?

**A:** Si necesita restaurar:
1.  **Elimine los archivos convertidos**
2.  **Restaure desde la copia de seguridad**:
    ```bash
    rm -r "Community\ifly-aircraft-737max8\Data\navdata"
    cp -r "backup_navdata" "Community\ifly-aircraft-737max8\Data\navdata"
    ```
3.  **Reinstalar iFly**: el método de restauración más completo

### Q: ¿Cómo verificar que la conversión de datos fue exitosa?

**A:** Métodos de verificación:
1.  **Verificar la existencia de los archivos**: confirme que los nuevos archivos se han generado
2.  **Comprobar el tamaño de los archivos**: los nuevos archivos deberían ser más grandes que los originales
3.  **Prueba en el simulador**: cargue el iFly 737 en MSFS para probar
4.  **Validación en el FMC**: verifique los datos de aerovías y procedimientos en el FMC

## 🆘 Soporte Técnico

### Q: ¿Dónde puedo obtener ayuda?

**A:** Canales para obtener ayuda:
1.  **Consultar el registro**: revise el archivo `converter.log`
2.  **Consultar la documentación**: lea la guía de uso completa
3.  **GitHub Issues**: informe de problemas en la página del proyecto
4.  **Foros de la comunidad**: participe en las discusiones de la comunidad de simulación de vuelo

### Q: ¿Cómo reportar un error (bug)?

**A:** Al reportar un problema, por favor proporcione:
- **Una descripción detallada del error**
- **El registro de errores completo**
- **Información del entorno del sistema** (SO, versión de Python, etc.)
- **Pasos para reproducir**
- **Capturas de pantalla o archivos relevantes**

### Q: ¿Es el proyecto de código abierto?

**A:** ¡Sí! El proyecto sigue una licencia de código abierto:
- **Ver el código fuente**: El repositorio de GitHub es público
- **Contribuir con código**: se aceptan Pull Requests
- **Sugerencias de funciones**: envíe solicitudes de funciones en Issues
- **Mejoras en la documentación**: ayude a mejorar la documentación

## 🔮 Características Futuras

### Q: ¿Qué nuevas características se planea añadir?

**A:** Próximas características:
- **Interfaz gráfica de usuario (GUI)** (v2.1.0)
- **Procesamiento por lotes** (v2.1.0)
- **Herramienta de validación de datos** (v2.2.0)
- **Procesamiento en la nube** (v3.0.0)
- **Soporte multiformato** (v3.0.0)

### Q: ¿Cómo obtener las actualizaciones de la versión?

**A:** Para mantenerse actualizado:
1.  **Siga en GitHub**: Marque el proyecto con una estrella para recibir notificaciones de actualización
2.  **Suscríbase a las publicaciones**: habilite las notificaciones de versiones
3.  **Revise periódicamente**: verifique nuevas versiones una vez al mes
4.  **Actualización automática**: las futuras versiones soportarán la actualización automática

---

**¿No encuentra la respuesta a su pregunta?** Por favor, consulte la [guía de solución de problemas](troubleshooting.md) o pregunte en GitHub Issues. 🆘
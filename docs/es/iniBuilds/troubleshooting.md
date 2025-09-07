# 🔧 Guía de solución de problemas

Esta guía cubre problemas comunes y sus soluciones que puedes encontrar al usar la herramienta de conversión Nav-data iniBuilds. Está clasificada por la gravedad y el tipo del problema para un diagnóstico y resolución rápidos.

---

## 🚨 Problemas críticos (Critical Issues)

### ❌ La herramienta de conversión no se inicia

#### **Problema**: La herramienta no puede ejecutarse debido a problemas con el entorno Python
**Síntomas**:
```bash
ModuleNotFoundError: No module named 'converter'
ImportError: cannot import name 'XP2INI_Converter'
```

**Solución inmediata**:
```bash
# 1. 验证Python环境
python --version  # 应该显示3.8+

# 2. 重新安装依赖
pip uninstall -r requirements.txt -y
pip install -r requirements.txt --force-reinstall

# 3. 检查工作目录
pwd  # Linux/macOS
echo %cd%  # Windows

# 4. 重新克隆仓库(最后手段)
git clone https://github.com/nav-data/converter.git
cd converter
python setup.py install
```

#### **Problema**: Faltan archivos clave
**Síntomas**:
```
FileNotFoundError: [Errno 2] No such file or directory: 'XP2INI_NDB_Converter.py'
```

**Solución inmediata**:
```bash
# 1. 验证文件完整性
ls -la *.py  # Linux/macOS
dir *.py     # Windows

# 2. 重新下载缺失文件
wget https://raw.githubusercontent.com/nav-data/converter/main/XP2INI_NDB_Converter.py

# 3. 检查权限
chmod +x *.py  # Linux/macOS
```

---

## ⚠️ Problemas de alta prioridad (High Priority)

### ❌ Fallo en la integración de datos del A350

#### **Problema**: El iniBuilds A350 no reconoce los datos de navegación
**Síntomas**: El MCDU muestra "NO NAV DATA" o el AIRAC aparece vacío

**Pasos de diagnóstico**:
```bash
# 1. 检查A350安装路径
find /c/Users -name "*inibuilds*" -type d 2>/dev/null  # Windows (Git Bash)
find /Users -name "*inibuilds*" -type d 2>/dev/null    # macOS
find /home -name "*inibuilds*" -type d 2>/dev/null     # Linux

# 2. 验证社区文件夹
ls "$MSFS_COMMUNITY_PATH/inibuilds-aircraft-a350/SimObjects/Airplanes/iniBuilds_A350_900/"

# 3. 检查数据文件
ls -la *.db *.sqlite *.json  # 在A350数据目录中
```

**Soluciones**:
```bash
# 1. 重新定位A350安装
python converter.py --detect-aircraft --scan-community-folder

# 2. 手动指定路径
python converter.py --a350-path="/path/to/inibuilds-aircraft-a350" --force-install

# 3. 修复文件权限
# Windows
icacls "A350数据目录" /grant Users:F /T

# Linux/macOS  
chmod -R 755 /path/to/inibuilds-aircraft-a350/
chown -R $USER:$USER /path/to/inibuilds-aircraft-a350/

# 4. 验证安装
python verify_installation.py --aircraft=a350 --verbose
```

#### **Problema**: Ciclo AIRAC no coincide
**Síntomas**: El A350 muestra un ciclo AIRAC antiguo o incorrecto

**Soluciones**:
```bash
# 1. 强制更新AIRAC标识
python converter.py --force-airac --cycle=2024-01 --aircraft=a350

# 2. 清除A350缓存
# 删除A350缓存文件
rm -f "$A350_PATH/work/NavData/cache/*"  # Linux/macOS
del "%A350_PATH%\work\NavData\cache\*"   # Windows

# 3. 重新生成导航数据库
python rebuild_navdb.py --aircraft=a350 --clean-rebuild

# 4. 验证AIRAC周期
python check_airac.py --aircraft=a350 --expected-cycle=2024-01
```

---

## 🔄 Problemas de instalación y configuración

### ❌ Fallo en la instalación de paquetes de dependencia

#### **Problema**: Fallo en la instalación de paquetes específicos
**Errores comunes**:
```bash
# 数学库依赖问题
ERROR: Failed building wheel for numpy
ERROR: Failed building wheel for pandas

# 编译器问题
Microsoft Visual C++ 14.0 is required
error: Microsoft Visual Studio 14.0 is required
```

**Solución por plataforma**:

**Windows**:
```bash
# 1. 安装Visual Studio Build Tools
# 下载并安装: https://visualstudio.microsoft.com/downloads/#build-tools-for-visual-studio-2022

# 2. 使用预编译包
pip install numpy pandas -f https://www.lfd.uci.edu/~gohlke/pythonlibs/

# 3. 使用conda (推荐)
conda install numpy pandas sqlite3 lxml
```

**macOS**:
```bash
# 1. 安装Xcode Command Line Tools
xcode-select --install

# 2. 使用Homebrew安装依赖
brew install python@3.9 sqlite3

# 3. 重新安装Python包
pip3 install -r requirements.txt
```

**Linux**:
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3-dev python3-pip build-essential libsqlite3-dev

# CentOS/RHEL
sudo yum groupinstall "Development Tools"
sudo yum install python3-devel sqlite-devel

# 重新安装包
pip3 install -r requirements.txt
```

### ❌ Problemas de configuración de la fuente de datos

#### **Problema**: No se puede conectar a la fuente de datos
**Síntomas**:
```
ConnectionError: Failed to download AIRAC data
TimeoutError: Data source unreachable
```

**Diagnóstico de red**:
```bash
# 1. 测试网络连接
ping navigraph.com
nslookup navigraph.com

# 2. 检查代理设置
echo $HTTP_PROXY $HTTPS_PROXY  # Linux/macOS
echo %HTTP_PROXY% %HTTPS_PROXY%  # Windows

# 3. 测试端口连通性
telnet navigraph.com 443
nc -zv navigraph.com 443  # Linux/macOS
```

**Soluciones**:
```bash
# 1. 配置代理 (如果需要)
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# Windows
set HTTP_PROXY=http://proxy.company.com:8080
set HTTPS_PROXY=https://proxy.company.com:8080

# 2. 使用离线模式
python converter.py --offline --local-data=/path/to/airac/data

# 3. 更换数据源
python converter.py --data-source=backup --mirror=asia
```

---

## 📊 Problemas de procesamiento de datos

### ❌ Errores relacionados con la memoria

#### **Problema**: Fallo en la conversión debido a memoria insuficiente
**Síntomas**:
```
MemoryError: Unable to allocate memory
MemoryError: cannot allocate memory for array
OSError: [Errno 12] Cannot allocate memory
```

**Monitoreo de memoria**:
```bash
# 实时监控内存使用
# Linux
free -h
htop

# macOS
vm_stat
activity monitor

# Windows
tasklist /fi "imagename eq python.exe"
wmic process get name,processid,workingsetsize
```

**Soluciones de optimización**:
```bash
# 1. 启用流式处理模式
python converter.py --streaming --chunk-size=512KB --memory-limit=2GB

# 2. 分区域处理
python converter.py --region=ZSPD --process-incrementally
python converter.py --region=ZBAA --process-incrementally  
python converter.py --region=ZGGG --process-incrementally

# 3. 优化系统内存
# 关闭不必要的应用程序
# 增加虚拟内存/交换空间

# Linux - 增加交换空间
sudo fallocate -l 4G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile

# 4. 使用低内存模式
python converter.py --low-memory --disable-cache --temp-cleanup
```

### ❌ Error de formato de datos

#### **Problema**: Formato de datos de entrada incompatible
**Síntomas**:
```
ValueError: Invalid ARINC 424 format
ParseError: Malformed XML data
UnicodeDecodeError: codec can't decode byte
```

**Validación de datos**:
```bash
# 1. 检查文件编码
file input_data.dat
hexdump -C input_data.dat | head

# 2. 验证文件完整性
md5sum input_data.dat  # Linux/macOS
certUtil -hashfile input_data.dat MD5  # Windows

# 3. 检查文件格式
python validate_format.py --input=input_data.dat --format=arinc424
```

**Soluciones de reparación**:
```bash
# 1. 转换文件编码
iconv -f ISO-8859-1 -t UTF-8 input_data.dat > input_data_utf8.dat  # Linux/macOS

# Windows (PowerShell)
Get-Content input_data.dat -Encoding Default | Set-Content input_data_utf8.dat -Encoding UTF8

# 2. 使用格式转换器
python format_converter.py --input=input_data.dat --from=legacy --to=arinc424

# 3. 手动修复常见问题
python repair_data.py --fix-encoding --fix-line-endings --input=input_data.dat
```

---

## 🚀 Problemas de rendimiento

### ❌ Velocidad de conversión demasiado lenta

#### **Problema**: El proceso de conversión es anormalmente lento
**Análisis de posibles causas**:
- Cuello de botella de E/S de disco (HDD vs SSD)
- Bajo uso de CPU (procesamiento de un solo hilo)
- Memoria insuficiente que provoca un intercambio frecuente
- Latencia de red (validación en línea)

**Diagnóstico de rendimiento**:
```bash
# 1. 监控系统资源
# Linux
iostat -x 1    # I/O统计
top -p $(pgrep python)  # CPU和内存

# macOS
iostat 1       # I/O统计  
top -pid $(pgrep python)  # 进程监控

# Windows
perfmon        # 性能监视器
wmic process get name,processid,percentprocessortime
```

**Optimización del rendimiento**:
```bash
# 1. 启用多进程处理
python converter.py --parallel=auto --workers=$(nproc)

# 2. 使用更快的存储
python converter.py --temp-dir=/path/to/ssd/temp --output-dir=/path/to/ssd/output

# 3. 禁用不必要的检查
python converter.py --skip-validation --no-backup --fast-mode

# 4. 内存映射模式 (大文件)
python converter.py --memory-map --buffer-size=64MB

# 5. 压缩输出 (减少I/O)
python converter.py --compress-output --compression=lz4
```

### ❌ Uso de CPU demasiado alto

#### **Problema**: El proceso de conversión consume el 100% de la CPU, la respuesta del sistema es lenta
**Soluciones**:
```bash
# 1. 限制CPU使用
python converter.py --cpu-limit=75 --nice=10

# 2. 降低并行度
python converter.py --parallel=2 --throttle=1000ms

# 3. 使用优先级控制
# Linux/macOS
nice -n 19 python converter.py  # 最低优先级

# Windows  
start /low python converter.py
```

---

## 🔍 Problemas específicos del iniBuilds A350

### ❌ Problemas de visualización de datos de navegación en el MCDU

#### **Problema**: Los datos de navegación en el MCDU son incorrectos o incompletos
**Síntomas**:
- Puntos de ruta no encontrados
- Faltan procedimientos SID/STAR
- Información de frecuencia incorrecta
- Desplazamiento de coordenadas

**Herramientas de diagnóstico**:
```bash
# 1. 检查A350数据库完整性
python check_a350_db.py --comprehensive --report=detailed

# 2. 验证特定导航点
python verify_waypoint.py --icao=ZSPD --waypoint=SASAN --aircraft=a350

# 3. 比较数据一致性
python compare_data.py --source=navigraph --target=a350_db --threshold=0.001

# 4. 生成差异报告
python diff_report.py --original=source_data --converted=a350_data --format=html
```

**Pasos de reparación**:
```bash
# 1. 重新生成导航数据库
python rebuild_navdb.py --aircraft=a350 --source=latest_airac

# 2. 手动修复关键航路点
python manual_fix.py --waypoints=critical_fixes.json --aircraft=a350

# 3. 更新频率数据
python update_frequencies.py --aircraft=a350 --source=official

# 4. 验证修复结果
python validate_fix.py --aircraft=a350 --quick-test
```

### ❌ Problemas de planificación de rutas FMS

#### **Problema**: El FMS del A350 no puede planificar rutas correctamente
**Síntomas**:
- Error "NO ROUTE FOUND"
- Conexiones de segmentos de ruta interrumpidas
- Errores de restricciones de altitud

**Pasos de resolución**:
```bash
# 1. 检查航路连接性
python check_airways.py --from=ZSPD --to=ZBAA --aircraft=a350

# 2. 验证航路点连接
python validate_connections.py --airway=A461 --aircraft=a350

# 3. 修复断开的航路
python repair_airways.py --auto-fix --aircraft=a350 --region=china

# 4. 重新构建航路网络
python rebuild_airways.py --aircraft=a350 --optimize-paths
```

---

## 📋 Análisis y diagnóstico de registros

### 🔍 Comprensión de los registros de error

#### **Patrones y significados de errores comunes**:

**Errores de conversión de datos**:
```bash
# 坐标转换问题
ERROR: CoordinateTransformError: Invalid coordinate format
# -> 检查输入数据的坐标格式

# 数据库写入失败  
ERROR: DatabaseError: database is locked
# -> 关闭其他访问数据库的程序的

# 文件权限问题
ERROR: PermissionError: [Errno 13] Permission denied
# -> 使用管理员权限或修改文件权限
```

**Errores de conexión de red**:
```bash
# 连接超时
ERROR: ConnectionTimeout: Failed to connect within 30 seconds
# -> 检查网络连接，增加超时时间

# DNS解析失败
ERROR: socket.gaierror: [Errno -2] Name or service not known  
# -> 检查DNS设置，使用备用DNS服务器
```

#### **Detalle de los niveles de registro**:
- **CRITICAL**: Errores graves que impiden que el programa continúe ejecutándose
- **ERROR**: Fallo en la ejecución de una función, pero el programa puede continuar
- **WARNING**: Problemas potenciales que no afectan la ejecución actual
- **INFO**: Información general, progreso del procesamiento, etc.
- **DEBUG**: Información detallada de depuración, utilizada para el diagnóstico de problemas

### 🛠️ Técnicas avanzadas de depuración

#### **Habilitar depuración detallada**:
```bash
# 1. 最详细的日志
python converter.py --log-level=DEBUG --verbose --trace --profile

# 2. 分离不同类型的日志
python converter.py --log-split \
  --error-log=errors.log \
  --warning-log=warnings.log \
  --debug-log=debug.log \
  --info-log=info.log

# 3. 实时监控日志
tail -f converter.log | grep -E "(ERROR|CRITICAL)"  # Linux/macOS
```

#### **Análisis de rendimiento**:
```bash
# 1. 启用性能分析
python -m cProfile -o profile_output.prof converter.py

# 2. 分析性能瓶颈
python -c "
import pstats
p = pstats.Stats('profile_output.prof')
p.sort_stats('cumulative').print_stats(20)
"

# 3. 内存使用分析
python -m memory_profiler converter.py --memory-profile
```

---

## 🆘 Procedimientos de recuperación de emergencia

### 🚨 Recuperación de datos corruptos

#### **Pasos de recuperación rápida**:
```bash
# 1. 立即停止所有相关进程
pkill -f "python.*converter"  # Linux/macOS
taskkill /f /im python.exe    # Windows

# 2. 创建当前状态快照
cp -r output_data recovery_snapshot_$(date +%Y%m%d_%H%M%S)  # Linux/macOS
robocopy output_data recovery_snapshot_%date:~0,4%%date:~5,2%%date:~8,2%_%time:~0,2%%time:~3,2% /E  # Windows

# 3. 从最近备份恢复
python restore_backup.py --list-available
python restore_backup.py --restore=latest --confirm --target=output_data

# 4. 验证恢复的数据
python verify_data_integrity.py --comprehensive --fix-minor-issues
```

### 🔄 Procedimiento de reinicio completo

#### **Cuando todos los métodos fallan**:
```bash
# 警告：这将删除所有转换数据和配置
echo "This will delete all converted data. Continue? (yes/no)"
read confirmation
if [ "$confirmation" = "yes" ]; then
    # 1. 备份用户配置
    cp config.json config_backup_$(date +%Y%m%d).json
    
    # 2. 完全清理
    python cleanup_all.py --nuclear-option --confirm-delete
    
    # 3. 重新初始化
    python setup.py --fresh-install --default-config
    
    # 4. 恢复用户配置
    python merge_config.py --base=config.json --user=config_backup_*.json
fi
```

---

## 📞 Obtener soporte profesional

### 📝 Preparar una solicitud de soporte

**Antes de contactar a soporte, por favor, recopila la siguiente información**:

```bash
# 1. 系统信息报告
python system_report.py --full > system_info.txt

# 2. 错误日志 (最近100行)
tail -100 converter.log > recent_errors.log  # Linux/macOS
powershell "Get-Content converter.log -Tail 100" > recent_errors.log  # Windows

# 3. 配置文件
cp config.json config_for_support.json

# 4. 版本信息
python --version > version_info.txt
python converter.py --version >> version_info.txt
git log --oneline -5 >> version_info.txt
```

### 🔗 Canales de soporte

#### **Selecciona según la urgencia**:

**🚨 Urgente (afecta al vuelo en 24 horas)**:
- 📧 **Correo electrónico de emergencia**: emergency@nav-data.org
- 📱 **Contacto urgente**: Grupo de WeChat "Nav-data紧急支援"

**⚠️ Importante (respuesta en 1-3 días)**:
- 🐛 **GitHub Issues**: [Crear un informe detallado del problema](https://github.com/nav-data/docs/issues/new?template=bug_report.md)
- 📧 **Soporte técnico**: technical@nav-data.org

**💬 Preguntas generales (respuesta en 1 semana)**:
- 🗣️ **Discusiones de la comunidad**: [GitHub Discussions](https://github.com/nav-data/docs/discussions)
- 📧 **Soporte general**: support@nav-data.org

#### **Plantilla de solicitud de soporte**:
```
Título: [iniBuilds] Breve descripción del problema - Nivel de impacto

Información del entorno:
- Sistema operativo: Windows 11 / macOS 12.6 / Ubuntu 22.04
- Versión de Python: 3.9.7
- Versión de la herramienta: v2.1.3
- Versión de iniBuilds A350: v1.2.0
- Versión de MSFS: 2024

Descripción del problema:
[Describe detalladamente el fenómeno del problema]

Pasos para reproducir:
1. Primer paso...
2. Segundo paso...
3. El problema ocurre

Resultado esperado:
[Describe el comportamiento correcto esperado]

Resultado real:
[Describe el comportamiento erróneo real]

Soluciones intentadas:
- Se intentó la solución A, resultado...
- Se intentó la solución B, resultado...

Adjuntos:
- system_info.txt
- recent_errors.log
- config_for_support.json
```

---

## 🔄 Mantenimiento preventivo

### ✅ Lista de verificación de mantenimiento regular

#### **Revisiones semanales**:
- [ ] Revisar archivos de registro para identificar problemas potenciales
- [ ] Limpiar archivos temporales y caché
- [ ] Verificar que los datos del A350 se cargan correctamente
- [ ] Comprobar el uso del espacio en disco

```bash
# 自动化每周检查
python weekly_maintenance.py --clean-temp --check-logs --verify-data --disk-usage
```

#### **Revisiones mensuales**:
- [ ] Actualizar datos AIRAC
- [ ] Realizar una copia de seguridad de la configuración y datos importantes
- [ ] Verificar actualizaciones de la versión de la herramienta
- [ ] Realizar pruebas de rendimiento

```bash
# 自动化每月维护
python monthly_maintenance.py --update-airac --backup-data --check-updates --benchmark
```

#### **Antes de una actualización importante**:
- [ ] Copia de seguridad completa de los datos
- [ ] Validación del entorno de prueba
- [ ] Verificación de compatibilidad de versiones
- [ ] Preparación del plan de reversión

### 📊 Monitoreo y alertas

#### **Configurar monitoreo automático**:
```bash
# 1. 创建监控脚本
python create_monitor.py --check-interval=1h --alert-email=admin@your-domain.com

# 2. 设置系统服务 (Linux)
sudo systemctl enable nav-data-monitor
sudo systemctl start nav-data-monitor

# 3. 设置任务计划 (Windows)
schtasks /create /tn "Nav-Data Monitor" /tr "python monitor.py" /sc hourly
```

Recuerda: ¡El mantenimiento y monitoreo proactivos pueden prevenir la mayoría de los problemas, siendo más eficientes que la reparación reactiva!

---

**Última actualización**: 15 de enero de 2024
**Versión del documento**: v2.1
**Versión de herramienta aplicable**: v2.1.0+
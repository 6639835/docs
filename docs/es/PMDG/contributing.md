# 🤝 Guía de Contribución

¡Bienvenido a la contribución al proyecto Nav-data! Esta guía le ayudará a comprender cómo contribuir al proyecto, incluyendo los estándares de código, el flujo de desarrollo y las mejores prácticas.

## 🎯 Formas de Contribución

### Damos la bienvenida a los siguientes tipos de contribuciones:

-   **🐛 Reportes y correcciones de bugs** - Descubrir y solucionar problemas en el proyecto
-   **✨ Desarrollo de nuevas funcionalidades** - Añadir nuevas funciones o optimizaciones de procesamiento de datos
-   **📚 Mejoras en la documentación** - Perfeccionar la documentación, añadir ejemplos, corregir errores
-   **🔧 Optimización del rendimiento** - Mejorar la eficiencia del procesamiento de datos y el uso de la memoria
-   **🧪 Casos de prueba** - Aumentar la cobertura de pruebas, mejorar la calidad del código
-   **🌍 Soporte de internacionalización** - Añadir soporte multi-idioma u otros datos regionales
-   **🎨 Mejoras en la experiencia de usuario** - Optimizar la facilidad de uso de la herramienta y el formato de salida

## 🚀 Inicio Rápido

### 1. Preparación del Entorno

```bash
# Fork 项目到您的 GitHub 账户
# 克隆您的 fork
git clone https://github.com/[您的用户名]/Nav-data.git
cd Nav-data

# 添加上游仓库
git remote add upstream https://github.com/原作者/Nav-data.git

# 创建虚拟环境
python -m venv nav-data-dev
source nav-data-dev/bin/activate  # Linux/macOS
# 或 nav-data-dev\Scripts\activate  # Windows

# 安装开发依赖
pip install -r requirements.txt
pip install -r requirements-dev.txt  # 开发依赖（如果存在）
```

### 2. Verificación del Entorno de Desarrollo

```bash
# 运行基础测试
python -m pytest tests/ -v

# 检查代码风格
flake8 *.py

# 运行类型检查（如果使用）
mypy *.py
```

## 📋 Estándares de Desarrollo

### Estilo de Código

Seguimos los estándares y las mejores prácticas de la comunidad Python:

#### 1. Estilo de Código PEP 8

```python
# ✅ 好的示例
class AirportDataProcessor:
    """机场数据处理器
    
    处理NAIP格式的机场数据，转换为PMDG兼容格式。
    """
    
    def __init__(self, csv_file_path: str, output_db_path: str):
        self.csv_file_path = csv_file_path
        self.output_db_path = output_db_path
        self.processed_count = 0
    
    def process_airport_data(self) -> ProcessingResult:
        """处理机场数据的主要方法
        
        Returns:
            ProcessingResult: 包含处理统计信息的结果对象
            
        Raises:
            FileNotFoundError: 当输入文件不存在时
            DatabaseError: 当数据库操作失败时
        """
        try:
            data = self._load_csv_data()
            processed_data = self._transform_data(data)
            self._save_to_database(processed_data)
            
            return ProcessingResult(
                success=True,
                processed_count=self.processed_count,
                message="机场数据处理完成"
            )
        except Exception as e:
            logging.error(f"处理机场数据时出错: {e}")
            raise

# ❌ 避免的写法
def processAirports(file,db):  # 函数名不规范，参数类型不明确
    d=pd.read_csv(file)       # 变量名不清晰
    for i in d.iterrows():    # 没有错误处理
        # 处理逻辑...
        pass
```

#### 2. Anotaciones de Tipo

```python
from typing import List, Dict, Optional, Union, Tuple
from dataclasses import dataclass

@dataclass
class ProcessingResult:
    """处理结果数据类"""
    success: bool
    processed_count: int
    failed_count: int = 0
    errors: List[str] = None
    message: Optional[str] = None

def convert_coordinates(
    dms_latitude: str, 
    dms_longitude: str
) -> Tuple[Optional[float], Optional[float]]:
    """转换DMS格式坐标为十进制度
    
    Args:
        dms_latitude: DMS格式纬度字符串 (如: N390308.00)
        dms_longitude: DMS格式经度字符串 (如: E1162930.00)
    
    Returns:
        (纬度, 经度) 元组，转换失败时返回 (None, None)
    """
    try:
        lat = parse_dms_coordinate(dms_latitude, coord_type='latitude')
        lon = parse_dms_coordinate(dms_longitude, coord_type='longitude')
        return lat, lon
    except ValueError as e:
        logging.warning(f"坐标转换失败: {e}")
        return None, None
```

#### 3. Manejo de Errores y Registro (Logging)

```python
import logging
from enum import Enum

class ProcessingError(Exception):
    """数据处理相关错误的基类"""
    pass

class ValidationError(ProcessingError):
    """数据验证错误"""
    pass

class CoordinateError(ValidationError):
    """坐标相关错误"""
    pass

def process_with_error_handling(data: Dict) -> bool:
    """带完整错误处理的数据处理示例"""
    try:
        # 数据验证
        if not validate_required_fields(data):
            raise ValidationError("缺少必需字段")
        
        # 坐标处理
        lat, lon = convert_coordinates(
            data.get('latitude'),
            data.get('longitude')
        )
        
        if lat is None or lon is None:
            raise CoordinateError("坐标转换失败")
        
        # 数据保存
        save_to_database(data)
        logging.info(f"成功处理记录: {data.get('identifier')}")
        return True
        
    except ValidationError as e:
        logging.warning(f"数据验证失败: {e}")
        return False
    except CoordinateError as e:
        logging.error(f"坐标处理错误: {e}")
        return False
    except Exception as e:
        logging.critical(f"未预期的错误: {e}")
        raise
```

### Estándares de Documentación

#### 1. Documentación de Funciones y Clases

```python
def parse_dat_file(
    file_path: str, 
    batch_size: int = 1000,
    encoding: str = 'utf-8'
) -> List[Dict[str, Any]]:
    """解析X-Plane格式的DAT文件
    
    该函数读取X-Plane导航数据文件，解析其中的航路点信息，
    并返回结构化的数据列表。支持大文件的批量处理。
    
    Args:
        file_path: DAT文件的完整路径
        batch_size: 批处理大小，用于内存优化，默认1000
        encoding: 文件编码，默认utf-8
    
    Returns:
        包含航路点信息的字典列表，每个字典包含以下键：
        - waypoint_identifier: 航路点标识符
        - latitude: 纬度（十进制度）
        - longitude: 经度（十进制度）
        - waypoint_type: 航路点类型
        - icao_code: ICAO地区代码
    
    Raises:
        FileNotFoundError: 当指定文件不存在时
        ValueError: 当文件格式不正确时
        MemoryError: 当可用内存不足时
    
    Examples:
        基本用法:
        >>> waypoints = parse_dat_file('data/earth_fix.dat')
        >>> print(f"解析了 {len(waypoints)} 个航路点")
        
        大文件处理:
        >>> waypoints = parse_dat_file(
        ...     'large_file.dat', 
        ...     batch_size=5000
        ... )
    
    Note:
        该函数会自动跳过文件头部的注释行，只处理有效的数据行。
        对于损坏的数据行，会记录警告日志但不中断处理。
    """
    # 实现...
```

#### 2. Documentación a Nivel de Módulo

```python
"""
PMDG机场数据处理模块

该模块负责处理NAIP格式的机场数据，将其转换为PMDG兼容的
SQLite数据库格式。主要功能包括：

- CSV文件读取和解析
- DMS坐标格式转换
- 机场名称查找和匹配
- 数据验证和清理
- SQLite数据库写入

支持的输入文件格式：
- AD_HP.csv: 机场基础数据（NAIP格式）
- Airport.dat: 机场名称查找表

输出格式：
- SQLite数据库，包含 tbl_airports 表

Author: Nav-data Team
Version: 2.0.0
License: MIT

Examples:
    命令行使用:
    $ python PMDG_APT.py
    
    编程接口:
    >>> from PMDG_APT import AirportProcessor
    >>> processor = AirportProcessor(
    ...     csv_path='data/AD_HP.csv',
    ...     output_path='output/airports.s3db'
    ... )
    >>> result = processor.process()
    >>> print(f"处理完成: {result.processed_count} 个机场")
"""

import pandas as pd
import sqlite3
import logging
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from pathlib import Path

# 模块级常量
DEFAULT_AREA_CODE = 'EEU'
DEFAULT_ENCODING = 'latin1'
SUPPORTED_ICAO_REGIONS = {'ZB', 'ZG', 'ZS', 'ZJ', 'ZY', 'ZL', 'ZH', 'ZU', 'ZP', 'ZW'}

# ... 其余代码
```

### Estándares de Prueba

#### 1. Pruebas Unitarias

```python
import unittest
from unittest.mock import patch, mock_open
import pandas as pd
from PMDG_APT import AirportProcessor, convert_dms_to_decimal

class TestCoordinateConversion(unittest.TestCase):
    """坐标转换功能测试"""
    
    def test_valid_north_latitude(self):
        """测试有效的北纬坐标转换"""
        result, error = convert_dms_to_decimal("N390308.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 39.0522222, places=6)
    
    def test_valid_east_longitude(self):
        """测试有效的东经坐标转换"""
        result, error = convert_dms_to_decimal("E1162930.00")
        self.assertIsNone(error)
        self.assertAlmostEqual(result, 116.4916667, places=6)
    
    def test_invalid_format(self):
        """测试无效的坐标格式"""
        result, error = convert_dms_to_decimal("INVALID")
        self.assertIsNone(result)
        self.assertIsNotNone(error)
        self.assertIn("无效的DMS格式", error)
    
    def test_boundary_coordinates(self):
        """测试边界坐标"""
        # 测试北极点
        result, error = convert_dms_to_decimal("N900000.00")
        self.assertIsNone(error)
        self.assertEqual(result, 90.0)

class TestAirportProcessor(unittest.TestCase):
    """机场数据处理器测试"""
    
    def setUp(self):
        """测试初始化"""
        self.processor = AirportProcessor(
            csv_file_path="test_data/AD_HP.csv",
            lookup_file_path="test_data/Airport.dat",
            output_db_path="test_output/test.s3db"
        )
    
    @patch('pandas.read_csv')
    def test_csv_loading(self, mock_read_csv):
        """测试CSV文件加载"""
        # 模拟CSV数据
        mock_data = pd.DataFrame({
            'CODE_ID': ['ZBAA', 'ZSPD'],
            'GEO_LAT_ACCURACY': ['N390308.00', 'N311133.00'],
            'GEO_LONG_ACCURACY': ['E1162930.00', 'E1211056.00']
        })
        mock_read_csv.return_value = mock_data
        
        result = self.processor._load_csv_data()
        self.assertEqual(len(result), 2)
        self.assertEqual(result.iloc[0]['CODE_ID'], 'ZBAA')
    
    @patch('sqlite3.connect')
    def test_database_creation(self, mock_connect):
        """测试数据库创建"""
        mock_connection = mock_connect.return_value
        mock_cursor = mock_connection.cursor.return_value
        
        self.processor._create_database_tables()
        
        # 验证表创建SQL被执行
        mock_cursor.execute.assert_called()
        create_table_calls = [call[0][0] for call in mock_cursor.execute.call_args_list]
        self.assertTrue(any('CREATE TABLE' in call for call in create_table_calls))
```

#### 2. Pruebas de Integración

```python
import tempfile
import os
import sqlite3
from pathlib import Path

class TestIntegration(unittest.TestCase):
    """集成测试"""
    
    def setUp(self):
        """创建临时测试环境"""
        self.test_dir = tempfile.mkdtemp()
        self.csv_file = Path(self.test_dir) / "test_airports.csv"
        self.lookup_file = Path(self.test_dir) / "airports.dat"
        self.output_db = Path(self.test_dir) / "output.s3db"
        
        # 创建测试数据文件
        self.create_test_csv()
        self.create_test_lookup()
    
    def tearDown(self):
        """清理测试环境"""
        import shutil
        shutil.rmtree(self.test_dir)
    
    def create_test_csv(self):
        """创建测试CSV文件"""
        test_data = """CODE_ID,GEO_LAT_ACCURACY,GEO_LONG_ACCURACY
ZBAA,N390308.00,E1162930.00
ZSPD,N311133.00,E1211056.00"""
        
        with open(self.csv_file, 'w', encoding='latin1') as f:
            f.write(test_data)
    
    def create_test_lookup(self):
        """创建测试查找文件"""
        lookup_data = """ZBAA BEIJING/CAPITAL
ZSPD SHANGHAI/PUDONG INTL"""
        
        with open(self.lookup_file, 'w') as f:
            f.write(lookup_data)
    
    def test_end_to_end_processing(self):
        """端到端处理测试"""
        processor = AirportProcessor(
            csv_file_path=str(self.csv_file),
            lookup_file_path=str(self.lookup_file),
            output_db_path=str(self.output_db)
        )
        
        result = processor.process()
        
        # 验证处理结果
        self.assertTrue(result.success)
        self.assertEqual(result.processed_count, 2)
        
        # 验证数据库内容
        self.assertTrue(self.output_db.exists())
        
        conn = sqlite3.connect(str(self.output_db))
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        self.assertEqual(count, 2)
        
        cursor.execute("SELECT airport_identifier, airport_name FROM tbl_airports ORDER BY airport_identifier")
        airports = cursor.fetchall()
        
        self.assertEqual(airports[0][0], 'ZBAA')
        self.assertEqual(airports[0][1], 'BEIJING/CAPITAL')
        
        conn.close()
```

## 🔄 Flujo de Desarrollo

### Flujo de Trabajo Git

Utilizamos el flujo de trabajo **Git Flow**:

```bash
# 1. 从最新的 main 分支创建功能分支
git checkout main
git pull upstream main
git checkout -b feature/航路处理优化

# 2. 进行开发工作
# 编写代码、添加测试、更新文档

# 3. 提交更改
git add .
git commit -m "feat: 优化航路数据处理性能

- 实现批量处理以减少内存使用
- 添加进度条显示处理状态
- 优化数据库写入操作

Closes #123"

# 4. 推送到您的 fork
git push origin feature/航路处理优化

# 5. 创建 Pull Request
```

### Convención de Mensajes de Commit

Utilizamos la convención **Conventional Commits**:

```bash
# 格式: <类型>(<范围>): <描述>
#
# <可选的正文>
#
# <可选的脚注>

# 示例:
git commit -m "feat(airport): 添加机场名称自动查找功能

实现了基于ICAO代码的机场名称自动查找，
支持从多个数据源获取机场名称信息。

- 添加了AirportNameResolver类
- 支持缓存以提高查找性能
- 添加了相应的单元测试

Closes #45"

# 类型说明:
# feat: 新功能
# fix: Bug修复
# docs: 文档更新
# style: 代码格式调整（不影响功能）
# refactor: 代码重构
# perf: 性能优化
# test: 添加或修改测试
# chore: 构建过程或辅助工具的变动
```

### Proceso de Pull Request

#### 1. Lista de Verificación de PR

Antes de enviar un PR, asegúrese de que:

-   [ ] El código sigue las convenciones de codificación del proyecto
-   [ ] Se han añadido los casos de prueba necesarios
-   [ ] Todas las pruebas han pasado
-   [ ] Se ha actualizado la documentación relevante
-   [ ] El mensaje de commit cumple con la convención
-   [ ] No se han introducido nuevas dependencias (si las hay, deben ser especificadas en el PR)

#### 2. Plantilla de PR

```markdown
## 📝 Descripción del Cambio
Describe brevemente qué cambios realiza este PR.

## 🔧 Tipo de Cambio
- [ ] Corrección de Bug
- [ ] Nueva Funcionalidad
- [ ] Optimización de Rendimiento
- [ ] Refactorización de Código
- [ ] Actualización de Documentación
- [ ] Mejora de Pruebas

## 🧪 Pruebas
Describe cómo probar estos cambios:
- [ ] Se han añadido nuevas pruebas unitarias
- [ ] Se han añadido pruebas de integración
- [ ] Pasos de prueba manuales:
  1. Paso 1
  2. Paso 2

## 📸 Capturas de Pantalla (si aplica)
Si hay cambios en la interfaz de usuario o en el formato de salida, por favor, añade capturas de pantalla.

## 🔗 Issue Relacionado
Fixes #123
Related to #456

## 📋 Lista de Verificación
- [ ] Mi código sigue las convenciones de codificación del proyecto
- [ ] He realizado una auto-revisión de mi propio código
- [ ] He añadido las pruebas correspondientes
- [ ] Todas las pruebas nuevas y existentes han pasado
- [ ] He actualizado la documentación relevante

## 💬 Notas Adicionales
Añade cualquier otro contenido que necesite ser aclarado.
```

## 🐛 Reporte de Problemas

### Plantilla de Reporte de Bug

Cuando encuentre un problema, utilice la siguiente plantilla para crear un Issue:

```markdown
**🐛 Descripción del Bug**
Describe de forma concisa y clara el problema que ocurre.

**🔄 Pasos para Reproducir**
1. Ir a '...'
2. Hacer clic en '...'
3. Desplazarse a '...'
4. Observar el error

**✅ Comportamiento Esperado**
Describe lo que esperas que suceda.

**💻 Información del Entorno**
- Sistema Operativo: [por ejemplo, Windows 10, macOS 11.6, Ubuntu 20.04]
- Versión de Python: [por ejemplo, 3.9.7]
- Versión de Nav-data: [por ejemplo, 2.1.0]
- Otras versiones de software relacionadas:

**📄 Registro de Errores**
Si aplica, por favor, añade el registro de errores o una captura de pantalla.

```
[在此粘贴日志内容]
```

**📁 Datos de Entrada**
Si el problema está relacionado con datos de entrada específicos, por favor, proporciona datos de ejemplo (eliminando información sensible).

**🔍 Información Adicional**
Añade cualquier otra información que pueda ayudar a diagnosticar el problema.
```

### Plantilla de Solicitud de Funcionalidad

```markdown
**🚀 Descripción de la Funcionalidad**
Describe de forma concisa y clara la funcionalidad que deseas añadir.

**💡 Escenario de Uso**
Describe qué problema resuelve o qué proceso mejora esta funcionalidad.

**📋 Requisitos Detallados**
- [ ] Requisito 1: Descripción
- [ ] Requisito 2: Descripción
- [ ] Requisito 3: Descripción

**🎨 Posible Solución de Implementación**
Si tienes alguna idea de implementación, descríbela brevemente.

**📚 Material de Referencia**
Proporciona enlaces a documentación, estándares o material de referencia relevantes.

**📊 Prioridad**
- [ ] Baja - Hacer cuando haya tiempo
- [ ] Media - Importante pero no urgente
- [ ] Alta - Necesita ser implementada lo antes posible
- [ ] Urgente - Bloquea otro trabajo

**💬 Notas Adicionales**
Cualquier otro contenido que necesite ser aclarado.
```

## 📚 Configuración del Entorno de Desarrollo

### Recomendaciones de Configuración del IDE

#### Visual Studio Code

Extensiones recomendadas:
```json
{
    "recommendations": [
        "ms-python.python",
        "ms-python.flake8",
        "ms-python.pylint",
        "ms-python.black-formatter",
        "njpwerner.autodocstring",
        "ms-python.isort",
        "charliermarsh.ruff"
    ]
}
```

Configuración del espacio de trabajo (`.vscode/settings.json`):
```json
{
    "python.defaultInterpreterPath": "./nav-data-dev/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.pylintEnabled": false,
    "python.formatting.provider": "black",
    "python.formatting.blackArgs": ["--line-length=88"],
    "python.sortImports.args": ["--profile", "black"],
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests"],
    "files.exclude": {
        "**/__pycache__": true,
        "**/*.pyc": true
    }
}
```

#### PyCharm

1.  Configurar el estilo de código:
    -   File → Settings → Editor → Code Style → Python
    -   Seleccionar el preset "Black"

2.  Configurar el ejecutor de pruebas:
    -   File → Settings → Tools → Python Integrated Tools
    -   Ejecutor de pruebas predeterminado: pytest

### Configuración de Herramientas de Desarrollo

#### Hooks de pre-commit

Crear `.pre-commit-config.yaml`:
```yaml
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.4.0
    hooks:
      - id: trailing-whitespace
      - id: end-of-file-fixer
      - id: check-yaml
      - id: check-added-large-files
      - id: check-merge-conflict
  
  - repo: https://github.com/psf/black
    rev: 22.12.0
    hooks:
      - id: black
        language_version: python3
  
  - repo: https://github.com/pycqa/flake8
    rev: 6.0.0
    hooks:
      - id: flake8
        args: [--max-line-length=88, --extend-ignore=E203]
  
  - repo: https://github.com/pycqa/isort
    rev: 5.12.0
    hooks:
      - id: isort
        args: [--profile=black]
```

Instalación y Activación:
```bash
pip install pre-commit
pre-commit install
```

## 🏆 Mejores Prácticas

### Optimización del Rendimiento

1.  **Gestión de Memoria**
    ```python
    # ✅ 好的做法：使用生成器处理大文件
    def process_large_file(file_path):
        with open(file_path, 'r') as f:
            for line in f:
                yield process_line(line)
    
    # ❌ 避免：一次性加载整个文件到内存
    def process_large_file_bad(file_path):
        with open(file_path, 'r') as f:
            lines = f.readlines()  # 可能消耗大量内存
        return [process_line(line) for line in lines]
    ```

2.  **Optimización de Operaciones de Base de Datos**
    ```python
    # ✅ 好的做法：批量插入
    def insert_records_batch(connection, records, batch_size=1000):
        cursor = connection.cursor()
        for i in range(0, len(records), batch_size):
            batch = records[i:i + batch_size]
            cursor.executemany(
                "INSERT INTO table (col1, col2) VALUES (?, ?)", 
                batch
            )
            connection.commit()
    
    # ❌ 避免：逐条插入
    def insert_records_one_by_one(connection, records):
        cursor = connection.cursor()
        for record in records:
            cursor.execute("INSERT INTO table (col1, col2) VALUES (?, ?)", record)
            connection.commit()  # 每次都提交，影响性能
    ```

### Manejo de Errores

```python
# ✅ 好的错误处理
def process_coordinate(dms_string: str) -> float:
    """处理坐标字符串，返回十进制度数"""
    try:
        return convert_dms_to_decimal(dms_string)
    except ValueError as e:
        logging.warning(f"坐标格式错误: {dms_string}, 错误: {e}")
        raise CoordinateError(f"无法解析坐标: {dms_string}") from e
    except Exception as e:
        logging.error(f"坐标处理时发生未知错误: {e}")
        raise

# ❌ 避免的错误处理
def process_coordinate_bad(dms_string):
    try:
        return convert_dms_to_decimal(dms_string)
    except:  # 捕获所有异常，难以调试
        return None  # 丢失错误信息
```

### Escritura de Pruebas

```python
# ✅ 好的测试
class TestCoordinateProcessing(unittest.TestCase):
    def test_valid_north_latitude_conversion(self):
        """测试有效北纬坐标转换"""
        # Given
        dms_input = "N390308.00"
        expected_decimal = 39.0522222
        
        # When
        result = convert_dms_to_decimal(dms_input)
        
        # Then
        self.assertAlmostEqual(result, expected_decimal, places=6)
    
    def test_invalid_format_raises_error(self):
        """测试无效格式抛出适当错误"""
        # Given
        invalid_input = "INVALID_FORMAT"
        
        # When/Then
        with self.assertRaises(CoordinateError) as context:
            convert_dms_to_decimal(invalid_input)
        
        self.assertIn("无法解析坐标", str(context.exception))

# ❌ 避免的测试
def test_coordinate():  # 测试名称不清晰
    result = convert_dms_to_decimal("N390308.00")
    assert result == 39.0522222  # 浮点数精确比较可能失败
```

## 📞 Obtener Ayuda

Si encuentra problemas durante el proceso de contribución:

1.  **Consultar la documentación** - Primero, revise la documentación del proyecto y esta guía de contribución
2.  **Buscar Issues existentes** - Verifique si alguien ya ha encontrado un problema similar
3.  **Participar en debates** - Realice preguntas en GitHub Discussions
4.  **Contactar a los mantenedores** - Contacte a los mantenedores del proyecto a través de GitHub Issues

### Directrices de la Comunidad

Nos comprometemos a crear un entorno comunitario abierto y amigable:

-   **Respeto a los demás** - Sea cortés y respetuoso con todos los participantes
-   **Comentarios constructivos** - Ofrezca opiniones y sugerencias útiles y constructivas
-   **Aprendizaje paciente** - Ayude a los principiantes a aprender, comparta conocimientos y experiencias
-   **Espíritu de colaboración** - Trabaje en conjunto para mejorar el proyecto

## 🎉 Reconocimiento de Contribuyentes

Reconocemos a los contribuyentes en los siguientes lugares:
-   La sección de contribuyentes de README.md
-   Los registros de actualización de versiones en CHANGELOG.md
-   La lista de agradecimientos en GitHub Releases

¡Gracias por considerar contribuir al proyecto Nav-data! Cada contribución hace que este proyecto sea mejor.

---

**Recuerde**: El buen código se escribe para las personas, la máquina simplemente lo ejecuta.
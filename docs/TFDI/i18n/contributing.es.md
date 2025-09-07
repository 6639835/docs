# 🤝 Guía de Contribución para el Conversor de Datos de Navegación TFDI

¡Bienvenido al proyecto del Conversor de Datos de Navegación TFDI! Agradecemos la participación de cada colaborador, ya sea mediante contribuciones de código, mejora de la documentación, informes de errores o sugerencias de funciones.

## 🌟 Formas de Contribución

### 💻 Contribución de Código
- 🐛 **Corrección de Bugs** - Resolver problemas y defectos conocidos
- ✨ **Desarrollo de Nuevas Funciones** - Añadir nuevas funciones o mejoras de conversión
- 📈 **Optimización del Rendimiento** - Mejorar la velocidad de conversión y la eficiencia del uso de la memoria
- 🧪 **Mejora de Pruebas** - Aumentar los casos de prueba y la cobertura
- 📚 **Mejora de la Documentación** - Perfeccionar la documentación de la API y las guías de usuario

### 📝 Contribución No Codificada
- 🐛 **Informe de Problemas** - Reportar bugs y problemas de compatibilidad
- 💡 **Sugerencias de Funciones** - Proponer nuevas funciones y mejoras
- 📖 **Redacción de Documentación** - Escribir tutoriales, guías y ejemplos
- 🌐 **Localización** - Traducir la interfaz y la documentación
- 🎓 **Soporte Comunitario** - Ayudar a otros usuarios a resolver problemas

## 🚀 Configuración del Entorno de Desarrollo

### Requisitos del Entorno

```bash
# Requisitos de la versión de Python
Python 3.8+ (recomendado 3.9 o 3.10)

# Soporte del sistema operativo
Windows 10/11, macOS 10.15+, Linux (Ubuntu 18.04+)

# Requisitos de memoria
Mínimo 4GB RAM (recomendado 8GB+)
```

### Inicio Rápido

#### 1. Clonar el Proyecto
```bash
# Clonar el repositorio principal
git clone https://github.com/your-org/tfdi-nav-converter.git
cd tfdi-nav-converter

# O clonar tu Fork
git clone https://github.com/your-username/tfdi-nav-converter.git
cd tfdi-nav-converter
```

#### 2. Configurar el Entorno de Desarrollo
```bash
# Crear un entorno virtual
python -m venv venv

# Activar el entorno virtual
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Instalar dependencias de desarrollo
pip install -r requirements-dev.txt
pip install -e .  # Instalación editable
```

#### 3. Verificar la Instalación
```bash
# Ejecutar el conjunto de pruebas
pytest

# Ejecutar comprobaciones de calidad del código
flake8 src/
mypy src/
black --check src/

# Ejecutar el conversor
python -m tfdi_converter --help
```

### Configuración de Herramientas de Desarrollo

#### Configuración del IDE (VS Code recomendado)
```json
// .vscode/settings.json
{
    "python.defaultInterpreterPath": "./venv/bin/python",
    "python.linting.enabled": true,
    "python.linting.flake8Enabled": true,
    "python.linting.mypyEnabled": true,
    "python.formatting.provider": "black",
    "python.testing.pytestEnabled": true,
    "python.testing.pytestArgs": ["tests/"]
}
```

#### Ganchos de Pre-commit
```bash
# Instalar pre-commit
pip install pre-commit

# Instalar los ganchos
pre-commit install

# Ejecutar manualmente todos los ganchos
pre-commit run --all-files
```

## 📋 Proceso de Desarrollo

### 1. Crear una Rama de Funcionalidad

```bash
# Asegurarse de que la rama principal esté actualizada
git checkout main
git pull origin main

# Crear una nueva rama de funcionalidad
git checkout -b feature/add-new-format-support

# O una rama de corrección
git checkout -b fix/memory-leak-in-processor
```

### 2. Desarrollar y Probar

#### Desarrollo de Código
```bash
# Escribir código
# ... Realizar el desarrollo ...

# Añadir pruebas
# tests/test_new_feature.py

# Actualizar la documentación
# docs/api/new_feature.md
```

#### Ejecutar Pruebas
```bash
# Ejecutar todas las pruebas
pytest

# Ejecutar un archivo de prueba específico
pytest tests/test_converter.py

# Ejecutar y generar informe de cobertura
pytest --cov=tfdi_converter --cov-report=html

# Ejecutar pruebas de rendimiento
pytest tests/performance/ -m performance
```

#### Comprobación de Calidad del Código
```bash
# Formatear código
black src/ tests/

# Ordenar importaciones
isort src/ tests/

# Análisis estático
flake8 src/ tests/
mypy src/

# Comprobación de seguridad
bandit -r src/
```

### 3. Confirmar Código

#### Convención de Mensajes de Confirmación
Utilizar la convención [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Tipos de confirmación:**
- `feat`: Nueva función
- `fix`: Corrección de bug
- `docs`: Actualización de documentación
- `style`: Ajuste de formato de código
- `refactor`: Refactorización de código
- `test`: Relacionado con pruebas
- `chore`: Cambios en el proceso de construcción o herramientas auxiliares
- `perf`: Mejora de rendimiento

**Ejemplos de confirmación:**
```bash
# Nueva función
git commit -m "feat(converter): add support for MSFS native format"

# Corrección de bug
git commit -m "fix(parser): handle malformed coordinate data gracefully"

# Actualización de documentación
git commit -m "docs(api): add examples for batch processing"

# Mejora de rendimiento
git commit -m "perf(processor): optimize memory usage in large dataset processing"
```

### 4. Enviar y Crear un PR

```bash
# Enviar la rama al remoto
git push origin feature/add-new-format-support

# Crear una Pull Request en GitHub
# Rellenar la plantilla de PR
# Esperar la revisión del código
```

## 📝 Estándares de Código

### Estándares de Codificación Python

#### 1. Estilo de Código
```python
# Usar la configuración predeterminada del formateador Black
# Longitud de línea: 88 caracteres
# Usar comillas dobles
# Dos líneas en blanco entre funciones

from typing import Dict, List, Optional, Union
import logging
from dataclasses import dataclass
from pathlib import Path

logger = logging.getLogger(__name__)


@dataclass
class ConversionConfig:
    """Clase de configuración de conversión.
    
    Utilizada para gestionar varios parámetros de configuración del conversor TFDI.
    
    Atributos:
        output_dir: Ruta del directorio de salida
        coordinate_precision: Precisión de las coordenadas
        enable_validation: Si se habilita la validación de datos
    """
    output_dir: str = "Primary"
    coordinate_precision: int = 8
    enable_validation: bool = True


class FenixDataProcessor:
    """Procesador de datos Fenix.
    
    Encargado de leer y procesar datos de navegación de la base de datos Fenix.
    """
    
    def __init__(self, config: ConversionConfig) -> None:
        """Inicializa el procesador.
        
        Args:
            config: Objeto de configuración de conversión
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def process_waypoints(
        self, 
        waypoint_data: List[Dict[str, Union[str, float]]]
    ) -> List[Dict[str, Union[str, float]]]:
        """Procesa los datos de los waypoints.
        
        Args:
            waypoint_data: Lista de datos de waypoints originales
            
        Returns:
            Lista de datos de waypoints procesados
            
        Raises:
            DataProcessingError: Ocurrió un error durante el procesamiento de datos
        """
        try:
            processed_data = []
            
            for waypoint in waypoint_data:
                processed_waypoint = self._normalize_waypoint(waypoint)
                processed_data.append(processed_waypoint)
            
            self.logger.info(f"Se procesaron {len(processed_data)} waypoints con éxito")
            return processed_data
            
        except Exception as e:
            self.logger.error(f"Fallo al procesar waypoints: {e}")
            raise DataProcessingError(f"No se pudieron procesar los datos de los waypoints: {e}") from e
    
    def _normalize_waypoint(
        self, waypoint: Dict[str, Union[str, float]]
    ) -> Dict[str, Union[str, float]]:
        """Normaliza los datos de un único waypoint."""
        # Implementar lógica de normalización
        normalized = waypoint.copy()
        
        # Normalizar la precisión de las coordenadas
        if "latitude" in normalized:
            normalized["latitude"] = round(
                float(normalized["latitude"]), 
                self.config.coordinate_precision
            )
        
        return normalized
```

#### 2. Sugerencias de Tipo
```python
from typing import (
    Any, Dict, List, Optional, Union, 
    Callable, Iterator, TypeVar, Generic
)

# Alias de tipo
ConfigDict = Dict[str, Any]
WaypointData = Dict[str, Union[str, float]]
ProcessingResult = List[WaypointData]

# Tipo genérico
T = TypeVar('T')

class DataCache(Generic[T]):
    """Clase de caché de datos genérica"""
    
    def __init__(self) -> None:
        self._cache: Dict[str, T] = {}
    
    def get(self, key: str) -> Optional[T]:
        """Obtener datos de caché"""
        return self._cache.get(key)
    
    def set(self, key: str, value: T) -> None:
        """Establecer datos de caché"""
        self._cache[key] = value
```

#### 3. Manejo de Errores
```python
class TFDIConverterError(Exception):
    """Clase base de excepción del conversor"""
    pass


class DataValidationError(TFDIConverterError):
    """Excepción de validación de datos"""
    pass


class DatabaseConnectionError(TFDIConverterError):
    """Excepción de conexión a la base de datos"""
    pass


def safe_database_operation(operation: Callable[[], T]) -> Optional[T]:
    """Envoltorio seguro para operaciones de base de datos"""
    try:
        return operation()
    except sqlite3.Error as e:
        logger.error(f"Fallo en la operación de base de datos: {e}")
        raise DatabaseConnectionError(f"Fallo en la operación de base de datos: {e}") from e
    except Exception as e:
        logger.error(f"Error desconocido: {e}")
        return None
```

### Estándares de Pruebas

#### 1. Estructura de Pruebas
```python
# tests/test_converter.py
import pytest
from unittest.mock import Mock, patch
from pathlib import Path

from tfdi_converter.core.converter import FenixToTFDIConverter
from tfdi_converter.core.config import ConverterConfig
from tfdi_converter.exceptions import DataValidationError


class TestFenixToTFDIConverter:
    """Clase de prueba para el conversor Fenix a TFDI"""
    
    @pytest.fixture
    def sample_config(self) -> ConverterConfig:
        """Crear configuración de ejemplo"""
        return ConverterConfig(
            output_dir="test_output",
            coordinate_precision=6,
            enable_validation=True
        )
    
    @pytest.fixture
    def sample_database(self, tmp_path: Path) -> Path:
        """Crear base de datos de ejemplo"""
        db_path = tmp_path / "test.db3"
        # Lógica para crear la base de datos de prueba
        return db_path
    
    def test_converter_initialization(self, sample_config):
        """Probar inicialización del conversor"""
        converter = FenixToTFDIConverter(sample_config)
        
        assert converter.config == sample_config
        assert converter.config.coordinate_precision == 6
    
    def test_database_validation_success(
        self, sample_config, sample_database
    ):
        """Probar caso de éxito de validación de base de datos"""
        converter = FenixToTFDIConverter(sample_config)
        
        result = converter.validate_database(sample_database)
        
        assert result is True
    
    def test_database_validation_failure(self, sample_config):
        """Probar caso de fallo de validación de base de datos"""
        converter = FenixToTFDIConverter(sample_config)
        invalid_db = Path("nonexistent.db3")
        
        with pytest.raises(DataValidationError):
            converter.validate_database(invalid_db)
    
    @patch('tfdi_converter.core.converter.sqlite3.connect')
    def test_database_connection_error(
        self, mock_connect, sample_config, sample_database
    ):
        """Probar error de conexión a la base de datos"""
        mock_connect.side_effect = sqlite3.Error("Conexión fallida")
        converter = FenixToTFDIConverter(sample_config)
        
        with pytest.raises(DatabaseConnectionError):
            converter.convert(sample_database, start_terminal_id=1000)
    
    @pytest.mark.performance
    def test_large_database_performance(
        self, sample_config, large_test_database
    ):
        """Probar rendimiento de base de datos grande"""
        import time
        
        converter = FenixToTFDIConverter(sample_config)
        start_time = time.time()
        
        converter.convert(large_test_database, start_terminal_id=1000)
        
        elapsed_time = time.time() - start_time
        assert elapsed_time < 300  # Debería completarse en 5 minutos
```

#### 2. Gestión de Datos de Prueba
```python
# tests/conftest.py
import pytest
import sqlite3
from pathlib import Path


@pytest.fixture(scope="session")
def test_data_dir() -> Path:
    """Directorio de datos de prueba"""
    return Path(__file__).parent / "data"


@pytest.fixture
def sample_fenix_database(tmp_path: Path) -> Path:
    """Crear una base de datos Fenix de ejemplo"""
    db_path = tmp_path / "sample_fenix.db3"
    
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Crear estructura de tabla de prueba
    cursor.execute("""
        CREATE TABLE Airports (
            AirportID TEXT PRIMARY KEY,
            AirportName TEXT,
            Latitude REAL,
            Longitude REAL
        )
    """)
    
    # Insertar datos de prueba
    cursor.execute("""
        INSERT INTO Airports VALUES 
        ('ZBAA', 'Beijing Capital', 40.080111, 116.584556),
        ('ZSPD', 'Shanghai Pudong', 31.143378, 121.805214)
    """)
    
    conn.commit()
    conn.close()
    
    return db_path
```

### Estándares de Documentación

#### 1. Documentación de la API
```python
def convert_fenix_database(
    database_path: Path,
    output_dir: Path,
    config: Optional[ConverterConfig] = None
) -> ConversionResult:
    """Convierte una base de datos Fenix al formato TFDI.
    
    Esta función recibe un archivo de base de datos de navegación Fenix A320 y lo convierte en
    un conjunto de archivos en formato JSON compatible con TFDI MD-11.
    
    Args:
        database_path: Ruta al archivo de la base de datos Fenix (archivo .db3)
        output_dir: Ruta del directorio de salida, los archivos convertidos se guardarán aquí
        config: Objeto de configuración de conversión opcional; si no se proporciona, se usa la configuración predeterminada
    
    Returns:
        ConversionResult: Objeto que contiene los resultados de la conversión y estadísticas
        
    Raises:
        FileNotFoundError: Cuando el archivo de la base de datos no existe
        DataValidationError: Cuando el formato de la base de datos es incorrecto
        PermissionError: Cuando no hay permisos de escritura en el directorio de salida
        
    Example:
        >>> from pathlib import Path
        >>> from tfdi_converter import convert_fenix_database
        >>> 
        >>> result = convert_fenix_database(
        ...     database_path=Path("fenix_nav.db3"),
        ...     output_dir=Path("./output")
        ... )
        >>> print(f"Conversión completada, se procesaron {result.processed_records} registros")
        
    Note:
        El proceso de conversión puede tardar varios minutos, dependiendo del tamaño de la base de datos.
        Se recomienda hacer una copia de seguridad de los datos originales antes de la conversión.
        
    See Also:
        - :class:`ConverterConfig`: Opciones de configuración de conversión
        - :class:`ConversionResult`: Detalles del resultado de la conversión
    """
    pass
```

#### 2. Documentación de Usuario
```markdown
# Ejemplos de Uso

## Conversión Básica

```python
from tfdi_converter import FenixToTFDIConverter, ConverterConfig

# Crear configuración
config = ConverterConfig(
    output_dir="TFDI_Output",
    coordinate_precision=8
)

# Inicializar el conversor
converter = FenixToTFDIConverter(config)

# Ejecutar la conversión
result = converter.convert(
    database_path="path/to/fenix.db3",
    start_terminal_id=1000
)

print(f"¡Conversión completada! Archivo de salida: {result.output_archive}")
```

## Configuración Avanzada

```python
# Configuración personalizada
config = ConverterConfig(
    output_dir="Custom_Output",
    coordinate_precision=6,
    vnav_threshold=3.0,
    enable_faf_detection=True,
    compression_level=9
)
```

## 🧪 Guía de Pruebas

### Estrategia de Pruebas

#### 1. Pruebas Unitarias
- **Objetivo de Cobertura**: 90%+
- **Alcance de la Prueba**: Todos los métodos públicos y métodos privados clave
- **Estrategia de Mock**: Aislar dependencias externas (bases de datos, sistema de archivos)

#### 2. Pruebas de Integración  
- **Integración con Bases de Datos**: Usar bases de datos de prueba reales
- **Integración con el Sistema de Archivos**: Probar operaciones reales de lectura/escritura de archivos
- **Pruebas de Extremo a Extremo**: Pruebas de flujo de conversión completo

#### 3. Pruebas de Rendimiento
- **Pruebas de Rendimiento**: Registrar el tiempo de procesamiento para diferentes tamaños de conjuntos de datos
- **Pruebas de Memoria**: Monitorizar el uso de memoria y las fugas
- **Pruebas de Concurrencia**: Probar la seguridad multihilo y concurrente

### Ejecutar Pruebas

```bash
# Pruebas rápidas (excluyendo pruebas de rendimiento)
pytest -m "not performance"

# Conjunto de pruebas completo
pytest

# Pruebas de módulo específico
pytest tests/test_converter.py

# Pruebas de cobertura
pytest --cov=tfdi_converter --cov-report=term-missing

# Pruebas de rendimiento de referencia
pytest tests/performance/ --benchmark-only
```

## 📚 Contribución a la Documentación

### Tipos de Documentación

#### 1. Documentación de Usuario
- **Guía de Instalación**: Pasos detallados de instalación
- **Tutoriales de Uso**: Ejemplos de uso desde básico hasta avanzado
- **Resolución de Problemas**: Preguntas frecuentes y soluciones
- **Referencia de la API**: Documentación completa de la API

#### 2. Documentación para Desarrolladores
- **Diseño de Arquitectura**: Arquitectura del sistema y filosofía de diseño
- **Guía de Contribución**: Este documento
- **Estándares de Codificación**: Estilo de código y mejores prácticas
- **Proceso de Lanzamiento**: Proceso de lanzamiento y mantenimiento de versiones

### Construcción de la Documentación

```bash
# Instalar dependencias de documentación
pip install -r docs/requirements.txt

# Construir documentación
cd docs/
make html

# Vista previa en tiempo real
make livehtml
```

## 🐛 Informe de Problemas

### Plantilla para Informe de Problemas

```markdown
**Descripción del Problema**
Describa de forma clara y concisa el problema encontrado.

**Pasos para Reproducir**
1. Ejecutar '...'
2. Introducir '...'
3. Ver el error '...'

**Comportamiento Esperado**
Describa lo que esperaba que sucediera.

**Comportamiento Actual**
Describa lo que realmente sucedió.

**Información del Entorno**
- SO: [ej. Windows 11, macOS 12.0, Ubuntu 20.04]
- Python: [ej. 3.9.16]
- Versión del conversor: [ej. v1.0.0]
- Versión de Fenix: [ej. v1.2.0]
- Versión de TFDI: [ej. v1.1.0]

**Información de la Base de Datos**
- Tamaño de la base de datos: [ej. 150MB]
- Número de registros: [ej. ~50.000]
- Ciclo AIRAC: [ej. 2508]

**Información de Registro**
```
Pegue la información de registro o la pila de errores relevante
```

**Archivos Adicionales**
- Archivos de configuración
- Capturas de pantalla del error
- Datos de ejemplo (si es posible)
```

### Etiquetas de Problemas

Usar las siguientes etiquetas para clasificar los problemas:
- 🐛 `bug` - Informe de error
- ✨ `enhancement` - Solicitud de función
- 📚 `documentation` - Relacionado con la documentación
- ❓ `question` - Pregunta de uso
- 🔥 `urgent` - Problema urgente
- 🆕 `good first issue` - Adecuado para nuevos colaboradores

## 🏆 Reconocimiento y Recompensas

### Reconocimiento de Colaboradores

#### 1. Colaboradores de Código
- **Lista de Commits**: Lista de colaboradores en el README y la documentación
- **Notas de Lanzamiento**: Agradecimiento especial en las notas de lanzamiento de la versión
- **Estadísticas de GitHub**: Estadísticas de contribución y distintivos de logros

#### 2. Colaboradores de Documentación
- **Autoría de Documentación**: Autoría en las páginas de documentación relevantes
- **Reconocimiento de Traducción**: Lista de traductores para versiones multilingües
- **Autores de Tutoriales**: Reconocimiento de autores de tutoriales de la comunidad

#### 3. Colaboradores de la Comunidad
- **Informes de Problemas**: Agradecimiento especial a los que encuentran problemas importantes
- **Contribuciones de Pruebas**: Colaboradores de pruebas beta y garantía de calidad
- **Contribuciones de Promoción**: Colaboradores en la promoción y educación de la comunidad

### Recompensas por Contribuciones Especiales

#### Colaborador del Mes
- Selección mensual de colaboradores destacados
- Promoción en la página principal del proyecto y redes sociales
- Insignias y títulos especiales de GitHub

#### Colaborador del Año
- Selección del mejor colaborador del año
- Souvenirs y certificados personalizados
- Invitación al comité de decisiones del proyecto

## 📞 Contacto

### Contacto del Equipo de Desarrollo

- **Mantenedor del Proyecto**: @maintainer-username
- **Líder Técnico**: @tech-lead-username  
- **Gestor de Comunidad**: @community-manager-username

### Canales de Comunicación

- **GitHub Issues**: Problemas técnicos y solicitudes de funciones
- **GitHub Discussions**: Discusiones generales y preguntas y respuestas
- **Lista de Correo**: dev@tfdi-converter.org
- **Discord**: [Enlace de invitación]

### Compromiso de Tiempo de Respuesta

- **Informes de Bugs**: Respuesta en 48 horas
- **Solicitudes de Funciones**: Respuesta en 1 semana
- **Pull Request**: Revisión en 3 días hábiles
- **Preguntas de la Comunidad**: Respuesta en 24 horas

---

**¡Gracias por considerar contribuir al Conversor de Datos de Navegación TFDI!** 

Esperamos construir mejores herramientas de simulación de vuelo con usted. 🚁✨
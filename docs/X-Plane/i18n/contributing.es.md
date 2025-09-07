# Guía de Contribución

¡Bienvenido/a al proyecto de código abierto Nav-data! Agradecemos enormemente tu contribución a esta herramienta de conversión de datos de navegación aérea.

## 🤝 Formas de Participar

### Reportar Problemas (Issues)
- **Reporte de Errores (Bugs)**: cuando encuentres errores de programa o comportamientos anómalos
- **Solicitud de Funciones**: sugerencias de nuevas funciones o mejoras a las existentes
- **Mejoras en la Documentación**: señalar errores o áreas poco claras en la documentación
- **Problemas de Rendimiento**: reportar cuellos de botella de rendimiento o sugerencias de optimización

### Contribuciones de Código (Pull Requests)
- **Corrección de Errores (Bugs)**: resolver problemas conocidos
- **Desarrollo de Nuevas Funciones**: implementar nuevas funciones de procesamiento de datos
- **Optimización del Rendimiento**: mejorar la eficiencia de ejecución del código
- **Refactorización de Código**: mejorar la estructura y mantenibilidad del código

### Contribuciones a la Documentación
- **Documentación Técnica**: completar la documentación de la API y las descripciones de arquitectura
- **Guías de Usuario**: mejorar las instrucciones de uso y tutoriales
- **Ejemplos de Código**: proporcionar más ejemplos de uso
- **Traducción a Varios Idiomas**: traducir la documentación a otros idiomas

## 📋 Antes de Empezar

### 1. Entender el Proyecto
Antes de empezar a contribuir, por favor:
- Consulta la [Descripción de la Arquitectura](./architecture.md)
- Revisa la [Guía de Uso](./guide/usage.md)
- Explora los [Issues](https://github.com/your-repo/nav-data/issues) existentes

### 2. Preparar el Entorno
Asegúrate de que tu entorno de desarrollo cumpla con los requisitos:
- Python 3.6+
- Git
- Paquetes de dependencias necesarios (ver [Guía de Instalación](./guide/installation.md))

### 3. Hacer un Fork del Proyecto
1. Visita la [página de GitHub de Nav-data](https://github.com/your-repo/nav-data)
2. Haz clic en el botón "Fork" en la esquina superior derecha
3. Clona tu Fork a nivel local:
   ```bash
   git clone https://github.com/Nav-data/docs.git
   cd docs
   ```

## 🐛 Reportar Problemas

### Plantilla para Reporte de Errores (Bugs)

Al reportar un error (bug), por favor, proporciona la siguiente información:

```markdown
**Descripción del Bug**
Describe brevemente el problema encontrado.

**Pasos para Reproducir**
1. Ejecuta el comando '...'
2. Utiliza el archivo de datos '...'
3. Observa el error '...'

**Comportamiento Esperado**
Describe lo que esperabas que sucediera.

**Comportamiento Actual**
Describe lo que realmente sucedió.

**Información del Entorno**
- Sistema Operativo: [ej. macOS 12.0]
- Versión de Python: [ej. 3.9.7]
- Versión de Nav-data: [ej. v1.2.0]

**Información Adicional**
- Registros de errores
- Capturas de pantalla relevantes
- Archivo de datos de ejemplo (si aplica)
```

### Plantilla para Solicitud de Funciones

```markdown
**Descripción de la Función**
Describe brevemente la función que deseas añadir.

**Escenario de Uso**
Describe el problema específico o el escenario de uso que esta función resuelve.

**Propuesta de Implementación**
Si tienes ideas concretas para la implementación, descríbelas en detalle.

**Alternativas Consideradas**
Describe otras alternativas que hayas considerado.

**Información Adicional**
Cualquier otra información relevante o material de referencia.
```

## 💻 Proceso de Contribución de Código

### 1. Crear una Rama
Crea una nueva rama para tu contribución:

```bash
# Asegúrate de que la rama main esté actualizada
git checkout main
git pull upstream main

# Crea una nueva rama
git checkout -b feature/your-feature-name
# O para corrección de errores (bug fixes)
git checkout -b fix/issue-number-description
```

### 2. Desarrollo y Pruebas
Durante el desarrollo:

```bash
# Realiza commits frecuentes
git add .
git commit -m "feat: add waypoint validation function"

# Ejecuta pruebas para asegurar la calidad del código
python -m pytest tests/
python -m flake8 .
python -m black . --check
```

### 3. Enviar un Pull Request
Una vez finalizado el desarrollo:

```bash
# Empuja la rama a tu Fork
git push origin feature/your-feature-name
```

Luego, crea un Pull Request en GitHub.

### Plantilla de Pull Request

```markdown
**Tipo de Cambio**
- [ ] Corrección de Errores (Bug Fix)
- [ ] Nueva Función
- [ ] Refactorización de Código
- [ ] Actualización de Documentación
- [ ] Optimización de Rendimiento

**Descripción del Cambio**
Describe brevemente el contenido de los cambios de este PR.

**Issue Relacionado**
- Fixes #(issue number)
- Related to #(issue number)

**Pruebas**
- [ ] Se han añadido nuevos casos de prueba
- [ ] Todas las pruebas existentes pasan
- [ ] Verificación con pruebas manuales

**Lista de Verificación**
- [ ] El código sigue las normas de codificación del proyecto
- [ ] Se ha añadido la documentación necesaria
- [ ] Se ha actualizado el README o la configuración correspondiente
- [ ] Se ha considerado la compatibilidad hacia atrás
```

## 📝 Estándares de Código

### Estándares de Codificación de Python

#### 1. Estilo de Código
Utiliza [PEP 8](https://pep8.org/) como base y sigue las siguientes normas adicionales:

```python
# Orden de importación
import os  # Librerías estándar
import sys

import pandas as pd  # Librerías de terceros
import numpy as np

from .utils import helper_function  # Importaciones locales

# Definición de clase
class NavigationDataProcessor:
    """
    Procesador de datos de navegación
    
    Procesa datos de navegación aérea en varios formatos, incluyendo la conversión entre CSV, PDF, etc.
    
    Attributes:
        input_format (str): Formato de datos de entrada
        output_format (str): Formato de datos de salida
    """
    
    def __init__(self, input_format: str, output_format: str):
        """
        Inicializa el procesador
        
        Args:
            input_format: Formato de datos de entrada ('csv', 'pdf', 'dat')
            output_format: Formato de datos de salida ('dat', 'txt', 'json')
        """
        self.input_format = input_format
        self.output_format = output_format
    
    def process(self, data: Any) -> Any:
        """
        Método principal para procesar datos
        
        Args:
            data: Datos de entrada
            
        Returns:
            Datos procesados
            
        Raises:
            ValueError: Se lanza si el formato de datos de entrada no es compatible
        """
        if not self._validate_input(data):
            raise ValueError(f"Invalid input format: {type(data)}")
        
        return self._convert_data(data)
```

#### 2. Convenciones de Nomenclatura
```python
# Constantes: TODO MAYÚSCULAS, separadas por guiones bajos
CHINA_AREAS = {'ZB', 'ZG', 'ZY', 'ZS', 'ZW'}
MAX_RETRY_COUNT = 3

# Variables y funciones: minúsculas, separadas por guiones bajos
def process_waypoint_data(input_file: str) -> List[Dict]:
    waypoint_list = []
    error_count = 0
    return waypoint_list

# Nombres de clases: CamelCase (PascalCase)
class CSVDataProcessor:
    pass

# Métodos privados: prefijo de un guion bajo
def _validate_coordinates(self, lat: float, lon: float) -> bool:
    pass

# Uso interno: prefijo de dos guiones bajos
def __internal_helper(self) -> None:
    pass
```

#### 3. Anotaciones de Tipo
Todas las funciones públicas deben incluir anotaciones de tipo:

```python
from typing import Dict, List, Optional, Union, Any

def convert_coordinates(
    input_coords: Union[str, Tuple[float, float]], 
    output_format: str = "decimal"
) -> Optional[Dict[str, float]]:
    """
    Convierte el formato de coordenadas
    
    Args:
        input_coords: Coordenadas de entrada, soporta formato de cadena o tupla
        output_format: Formato de salida, soporta 'decimal' o 'dms'
        
    Returns:
        Diccionario de coordenadas convertidas, devuelve None si falla
    """
    pass
```

#### 4. Docstrings
Utiliza docstrings estilo Google:

```python
def process_airway_csv(csv_file: str, output_file: str, 
                      excluded_areas: Set[str] = None) -> bool:
    """
    Procesa un archivo de datos CSV de aerovías
    
    Lee datos de aerovías de un archivo CSV, los valida y convierte, luego los exporta en formato DAT de X-Plane. Soporta la función de filtrado por área.
    
    Args:
        csv_file: Ruta del archivo CSV de entrada
        output_file: Ruta del archivo DAT de salida  
        excluded_areas: Conjunto de códigos de área a excluir, por defecto None
        
    Returns:
        Devuelve True si el procesamiento es exitoso, False si falla
        
    Raises:
        FileNotFoundError: Se lanza si el archivo de entrada no existe
        ValueError: Se lanza si el formato CSV es incorrecto
        
    Example:
        >>> process_airway_csv('routes.csv', 'earth_awy.dat', {'ZB', 'ZG'})
        True
        
    Note:
        Durante el procesamiento, se hará una copia de seguridad automática del archivo de salida original.
    """
    pass
```

### Herramientas de Calidad de Código

#### 1. Formateo de Código
Utiliza [Black](https://black.readthedocs.io/) para formatear el código:

```bash
# Instalar
pip install black

# Formatear todo el proyecto
black .

# Comprobar formato sin modificar
black . --check

# Formatear un solo archivo
black script.py
```

#### 2. Linting de Código
Utiliza [flake8](https://flake8.pycqa.org/) para el linting de código:

```bash
# Instalar
pip install flake8

# Linting de todo el proyecto
flake8 .

# Archivo de configuración .flake8
[flake8]
max-line-length = 88
ignore = E203, W503
exclude = 
    .git,
    __pycache__,
    build,
    dist,
    venv,
    .venv
```

#### 3. Comprobación de Tipos
Utiliza [mypy](http://mypy-lang.org/) para la comprobación de tipos:

```bash
# Instalar
pip install mypy

# Comprobar tipos
mypy .

# Archivo de configuración mypy.ini
[mypy]
python_version = 3.8
warn_return_any = True
warn_unused_configs = True
disallow_untyped_defs = True
```

### Convenciones de Commits de Git

#### Formato de Mensaje de Commit
Utiliza las convenciones de [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

#### Tipos de Commit
- `feat`: Nueva funcionalidad
- `fix`: Corrección de error (bug fix)
- `docs`: Actualización de documentación
- `style`: Estilo de código (cambios que no afectan la ejecución del código)
- `refactor`: Refactorización (cambios en el código que no son nuevas funciones ni correcciones de errores)
- `perf`: Mejora de rendimiento
- `test`: Añadir pruebas
- `chore`: Cambios en el proceso de construcción o herramientas auxiliares

#### Ejemplos
```bash
# Nueva funcionalidad
git commit -m "feat(airway): add AIRAC cycle validation"

# Corrección de error (bug fix)
git commit -m "fix(pdf): resolve coordinate parsing error for edge cases"

# Actualización de documentación
git commit -m "docs: update installation guide for macOS"

# Refactorización
git commit -m "refactor(terminal): extract common validation logic"
```

## 🧪 Guía de Pruebas

### Estructura de Pruebas
```
tests/
├── unit/                   # Pruebas unitarias
│   ├── test_airway.py
│   ├── test_pdf_extract.py
│   └── test_terminal.py
├── integration/            # Pruebas de integración
│   ├── test_full_pipeline.py
│   └── test_module_interaction.py
├── fixtures/               # Datos de prueba
│   ├── sample_data/
│   └── expected_outputs/
└── conftest.py            # Configuración de pytest
```

### Escribir Pruebas

#### Ejemplo de Prueba Unitaria
```python
import pytest
from unittest.mock import Mock, patch
from nav_data.airway import NavigationPoint, process_navigation_point

class TestNavigationPoint:
    """Clase de prueba para punto de navegación"""
    
    def test_navigation_point_creation(self):
        """Prueba la creación de un punto de navegación"""
        point = NavigationPoint("ABCDE", "DESIGNATED_POINT", "ZB")
        
        assert point.identifier == "ABCDE"
        assert point.type.code_type == "DESIGNATED_POINT"
        assert point.area_code == "ZB"
    
    def test_navigation_point_invalid_type(self):
        """Prueba un tipo de punto de navegación inválido"""
        with pytest.raises(ValueError):
            NavigationPoint("ABCDE", "INVALID_TYPE", "ZB")
    
    @pytest.mark.parametrize("identifier,expected", [
        ("ABCDE", True),
        ("", False),
        (None, False),
    ])
    def test_navigation_point_validation(self, identifier, expected):
        """Prueba parametrizada para la validación de puntos de navegación"""
        result = validate_navigation_identifier(identifier)
        assert result == expected
```

#### Ejemplo de Prueba de Integración
```python
import tempfile
from pathlib import Path
from nav_data.pipeline import DataPipeline

class TestDataPipeline:
    """Prueba de integración del pipeline de datos"""
    
    @pytest.fixture
    def temp_directory(self):
        """Fixture de directorio temporal"""
        with tempfile.TemporaryDirectory() as temp_dir:
            yield Path(temp_dir)
    
    @pytest.fixture
    def sample_csv_data(self):
        """Datos CSV de ejemplo"""
        return """CODE_POINT_START,CODE_TYPE_START,CODE_POINT_END,CODE_TYPE_END,CODE_DIR,TXT_DESIG
ABCDE,DESIGNATED_POINT,FGHIJ,VOR/DME,N,A123"""
    
    def test_complete_pipeline(self, temp_directory, sample_csv_data):
        """Prueba el pipeline completo de procesamiento de datos"""
        # Preparar datos de prueba
        input_file = temp_directory / "input.csv"
        input_file.write_text(sample_csv_data)
        output_file = temp_directory / "output.dat"
        
        # Ejecutar el pipeline
        pipeline = DataPipeline()
        result = pipeline.process(str(input_file), str(output_file))
        
        # Validar el resultado
        assert result is True
        assert output_file.exists()
        
        output_content = output_file.read_text()
        assert "ABCDE" in output_content
        assert "FGHIJ" in output_content
```

### Ejecutar Pruebas
```bash
# Ejecutar todas las pruebas
pytest

# Ejecutar un archivo de prueba específico
pytest tests/unit/test_airway.py

# Ejecutar un método de prueba específico
pytest tests/unit/test_airway.py::TestNavigationPoint::test_navigation_point_creation

# Generar informe de cobertura
pytest --cov=nav_data tests/

# Salida detallada
pytest -v

# Detener en el primer fallo
pytest -x
```

## 📚 Contribuciones a la Documentación

### Estructura de la Documentación
```
docs/
├── guide/                  # Guías de usuario
│   ├── index.md           # Página de inicio de la guía
│   ├── installation.md    # Guía de instalación
│   ├── configuration.md   # Descripción de la configuración
│   └── usage.md           # Guía de uso
├── api/                    # Documentación de la API
│   ├── airway.md
│   ├── pdf_extract.md
│   └── terminal.md
├── architecture.md         # Descripción de la arquitectura
├── contributing.md         # Guía de contribución
├── changelog.md           # Registro de cambios
└── license.md             # Licencia
```

### Convenciones para Escribir Documentación

#### Formato Markdown
```markdown
---
title: Título del documento
description: Descripción del documento
---

# Título de nivel 1

Introducción breve al contenido del documento.

## Título de nivel 2

### Título de nivel 3

El contenido del texto principal utiliza una expresión clara en español.

#### Ejemplo de Código
Usa bloques de código para mostrar ejemplos:

```python
def example_function():
    """Función de ejemplo"""
    return "Hello, Nav-data!"
```

#### Notas Importantes
> **Nota**: Los avisos importantes utilizan el formato de cita.

**Advertencia**: Los mensajes de advertencia se escriben en negrita.

#### Enlaces y Referencias
- Enlace interno: [Guía de instalación](./guide/installation.md)
- Enlace externo: [Sitio web oficial de Python](https://python.org)
- Referencia de código: Utiliza el formato `code` para referenciar código
```

#### Guía de Redacción Técnica
1. **Claridad y Concisión**: Utiliza un lenguaje sencillo y directo.
2. **Estructura**: Organiza el contenido con títulos, listas y tablas.
3. **Ejemplos Abundantes**: Proporciona suficientes ejemplos de código.
4. **Orientado al Usuario**: Redacta la documentación desde la perspectiva del usuario.
5. **Actualización Constante**: Mantén la documentación sincronizada con el código.

### Documentación de la API
Escribe documentación detallada para todas las APIs públicas:

```python
def process_csv_data(csv_file: str, output_format: str = "dat") -> Dict[str, Any]:
    """
    Procesa datos de navegación en formato CSV
    
    Esta función lee datos de aerovías en formato CSV, los valida y convierte, y luego los exporta como un archivo de datos de navegación en el formato especificado.
    
    Args:
        csv_file (str): Ruta del archivo CSV de entrada
        output_format (str, optional): Formato de salida, soporta 'dat', 'json', 'xml'.
                                     Por defecto es 'dat'.
    
    Returns:
        Dict[str, Any]: Información del resultado del procesamiento, contiene las siguientes claves:
            - 'success' (bool): Indica si el procesamiento fue exitoso
            - 'processed_count' (int): Número de registros procesados con éxito
            - 'error_count' (int): Número de registros con error
            - 'output_file' (str): Ruta del archivo de salida
    
    Raises:
        FileNotFoundError: Se lanza cuando el archivo de entrada no existe
        ValueError: Se lanza cuando el formato CSV es incorrecto
        PermissionError: Se lanza cuando no se puede escribir el archivo de salida
    
    Example:
        Uso básico:
        
        >>> result = process_csv_data('airway_data.csv')
        >>> print(result['success'])
        True
        
        Especificar formato de salida:
        
        >>> result = process_csv_data('airway_data.csv', 'json')
        >>> print(result['output_file'])
        'airway_data.json'
    
    Note:
        - El archivo CSV de entrada debe contener los campos de datos de aerovías estándar
        - Durante el procesamiento, se valida automáticamente la integridad de los datos
        - Soporta la función de reanudación después de una interrupción
    
    See Also:
        :func:`validate_csv_format`: Validación de formato CSV
        :func:`convert_coordinate_format`: Conversión de formato de coordenadas
    """
    pass
```

## 🔍 Revisión de Código

### Lista de Verificación de Revisión

#### Funcionalidad
- [ ] El código implementa la funcionalidad esperada
- [ ] Se han manejado todos los casos límite
- [ ] El manejo de errores es adecuado
- [ ] El rendimiento cumple con los requisitos

#### Calidad del Código
- [ ] La estructura del código es clara
- [ ] Los nombres son descriptivos
- [ ] Las funciones tienen una única responsabilidad
- [ ] Se evita la duplicación de código

#### Seguridad
- [ ] La validación de entrada es suficiente
- [ ] No hay vulnerabilidades de seguridad
- [ ] La información sensible se maneja adecuadamente
- [ ] El control de permisos es apropiado

#### Pruebas
- [ ] La cobertura de pruebas es suficiente
- [ ] Los casos de prueba son exhaustivos
- [ ] Las pruebas de integración pasan
- [ ] Las pruebas de rendimiento cumplen con los requisitos

#### Documentación
- [ ] Los comentarios en el código son suficientes
- [ ] La documentación de la API está completa
- [ ] La documentación del usuario está actualizada
- [ ] El registro de cambios está actualizado

### Retroalimentación de la Revisión
Proporciona retroalimentación constructiva:

```markdown
**Evaluación General**
El código implementa la funcionalidad esperada, la estructura es clara y la cobertura de pruebas es suficiente.

**Observaciones Específicas**
1. **Estructura del código**: La función `process_data` es demasiado larga, se recomienda dividirla en funciones más pequeñas
2. **Optimización del rendimiento**: El bucle en la línea 45 podría optimizarse utilizando una comprensión de lista (list comprehension)
3. **Manejo de errores**: Se sugiere añadir un tipo de excepción específico en la línea 78

**Modificación Sugerida**
```python
# Se sugiere que este código
for item in data_list:
    if validate_item(item):
        processed_list.append(process_item(item))

# se cambie a
processed_list = [
    process_item(item) 
    for item in data_list 
    if validate_item(item)
]
```

**Otros**
La documentación necesita ejemplos de uso adicionales.
```

## 🚀 Proceso de Lanzamiento

### Convenciones de Numeración de Versiones
Utiliza [Versionado Semántico](https://semver.org/lang/zh-CN/) (Semantic Versioning):

- **Versión Mayor**: Cambios incompatibles en la API
- **Versión Menor**: Nuevas funcionalidades compatibles hacia atrás
- **Versión de Parche**: Correcciones de problemas compatibles hacia atrás

Ejemplo: `1.2.3`

### Lista de Verificación de Lanzamiento
Antes de lanzar, asegúrate de que:
- [ ] Todas las pruebas pasen
- [ ] La documentación esté actualizada
- [ ] El registro de cambios esté actualizado
- [ ] El número de versión esté actualizado
- [ ] Las dependencias sean correctas
- [ ] La revisión de seguridad haya sido aprobada

## 🏆 Reconocimiento a los Contribuyentes

### Mecanismos de Reconocimiento
- **Contribuyentes de Código**: Listar a todos los contribuyentes en el README
- **Contribuyentes de Documentación**: Etiquetar la información de los contribuyentes en la documentación
- **Reportadores de Problemas**: Agradecer después de resolver un Issue
- **Contribuyentes a Largo Plazo**: Invitar a convertirse en mantenedores del proyecto

### Convertirse en Mantenedor
Los contribuyentes activos a largo plazo pueden ser invitados a convertirse en mantenedores del proyecto, obteniendo:
- Permiso de push directo
- Permiso para revisar Pull Requests
- Derecho a participar en las decisiones del proyecto
- Agradecimiento especial en la descripción del proyecto

## 📞 Contacto

### Obtener Ayuda
- **GitHub Issues**: Para reportar problemas o solicitar funciones
- **GitHub Discussions**: Para discusiones generales y preguntas y respuestas
- **Documentación**: Para consultar guías de uso detalladas
- **Comentarios en el Código**: Para revisar los comentarios detallados en el código fuente

### Directrices de la Comunidad
Al participar en el proyecto, por favor, sigue los siguientes principios:
- **Respeto mutuo**: Mantén una actitud amigable y profesional
- **Discusión constructiva**: Proporciona comentarios y sugerencias valiosas
- **Inclusión**: Da la bienvenida a contribuyentes de diferentes orígenes
- **Orientación al aprendizaje**: Ayuda a otros a aprender y crecer

## 🙏 Agradecimientos

¡Gracias a todos los desarrolladores, testers, contribuidores de documentación y usuarios que han contribuido al proyecto Nav-data!

### Agradecimientos Especiales
- Equipo de mantenimiento principal
- Contribuyentes a largo plazo
- Reportadores de problemas
- Traductores de documentación
- Patrocinadores de la comunidad

---

**¡Gracias de nuevo por tu contribución!** 🎉 Tu participación hace que Nav-data sea mejor, proporcionando herramientas de datos de navegación de mayor calidad para la comunidad de simulación aérea.
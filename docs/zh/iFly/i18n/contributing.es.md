# 🤝 Guía de Contribución

¡Gracias por su interés en el proyecto del convertidor de datos de navegación iFly! Damos la bienvenida y agradecemos todas las formas de contribución.

## 🌟 Formas de Contribución

### 💻 Contribuciones de Código
- 🐛 Corrección de Errores (Bug Fix)
- ✨ Adición de nuevas características (New Feature)
- 📈 Optimización del rendimiento (Performance Optimization)
- 🧪 Añadir casos de prueba (Add Test Cases)
- 📚 Mejora de la documentación (Improve Documentation)

### 📝 Contribuciones No Relacionadas con el Código
- 🐛 Informar problemas (Report Issues)
- 💡 Sugerir características (Propose Feature Suggestions)
- 📖 Mejorar la documentación (Refine Documentation)
- 🌐 Soporte de traducción (Translation Support)
- 🎓 Creación de tutoriales (Tutorial Creation)

## 🚀 Inicio Rápido

### 1. Preparación del Entorno

```bash
# Clonar el repositorio
git clone https://github.com/your-username/ifly-nav-converter.git
cd ifly-nav-converter

# Crear entorno virtual
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Instalar dependencias
pip install -r requirements.txt
pip install -r requirements-dev.txt  # Dependencias de desarrollo
```

### 2. Configuración del Entorno de Desarrollo

```bash
# Instalar ganchos de pre-commit
pre-commit install

# Ejecutar pruebas
pytest

# Verificación de la calidad del código
flake8 .
mypy .
black . --check
```

## 📋 Flujo de Desarrollo

### 1. Crear una rama de característica

```bash
# Crear una nueva rama desde la rama principal
git checkout main
git pull origin main
git checkout -b feature/your-feature-name

# O rama de corrección
git checkout -b fix/issue-description
```

### 2. Desarrollo y Pruebas

```bash
# Realizar el desarrollo
# ... Escribir código ...

# Ejecutar pruebas
pytest tests/

# Verificar la calidad del código
black .
flake8 .
mypy .
```

### 3. Confirmar Código

```bash
# Añadir archivos
git add .

# Confirmar (siguiendo las especificaciones del mensaje de commit)
git commit -m "feat: add new feature description"

# Enviar a la rama remota
git push origin feature/your-feature-name
```

### 4. Crear Pull Request

1.  Crear un Pull Request en GitHub
2.  Rellenar una descripción detallada del PR
3.  Asegurarse de que todas las comprobaciones pasen
4.  Esperar la revisión del código

## 📝 Estándares de Codificación

### Estilo de Código Python

Utilizamos las siguientes herramientas para asegurar la calidad del código:

-   **Black**: Formateo de código
-   **Flake8**: Verificación del estilo de código
-   **MyPy**: Verificación de tipos
-   **isort**: Ordenación de importaciones

### Ejemplo de Código

```python
from typing import List, Optional, Dict, Any
import logging
from pathlib import Path

logger = logging.getLogger(__name__)


class NavigationDataConverter:
    """Clase principal del convertidor de datos de navegación.
    
    Esta clase es responsable de convertir los datos de navegación de Fenix al formato iFly.
    
    Atributos:
        config: Configuración del convertidor
        logger: Registrador de logs
    """
    
    def __init__(self, config: ConverterConfig) -> None:
        """Inicializa el convertidor.
        
        Args:
            config: Objeto de configuración del convertidor
        """
        self.config = config
        self.logger = logging.getLogger(self.__class__.__name__)
    
    def convert_data(
        self, 
        source_path: Path,
        target_path: Path,
        options: Optional[Dict[str, Any]] = None
    ) -> bool:
        """Convierte los datos de navegación.
        
        Args:
            source_path: Ruta de los datos de origen
            target_path: Ruta de los datos de destino  
            options: Opciones de conversión opcionales
            
        Returns:
            Si la conversión fue exitosa
            
        Raises:
            ConversionError: Se produjo un error durante la conversión
        """
        try:
            # Implementar la lógica de conversión
            return True
        except Exception as e:
            self.logger.error(f"Fallo de conversión: {e}")
            raise ConversionError(f"Fallo de la conversión de datos: {e}") from e
```

### Especificación de Mensajes de Commit

Utilice la especificación [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Identificador de Tipo:**
-   `feat`: Nueva característica
-   `fix`: Corrección de error
-   `docs`: Actualización de documentación
-   `style`: Ajuste de formato de código
-   `refactor`: Refactorización de código
-   `test`: Casos de prueba
-   `chore`: Cambios en el proceso de construcción o herramientas auxiliares

**Ejemplo:**
```
feat(converter): add magnetic declination calculation

- Implement WMM-2025 model integration
- Add pygeomag dependency
- Improve calculation accuracy

Closes #123
```

## 🧪 Guía de Pruebas

### Estructura de Pruebas

```
tests/
├── unit/           # Pruebas unitarias
├── integration/    # Pruebas de integración
├── fixtures/       # Datos de prueba
└── conftest.py     # Configuración de pruebas
```

### Escribir Pruebas

```python
import pytest
from pathlib import Path
from ifly_converter.converter import NavigationDataConverter


class TestNavigationDataConverter:
    """Clase de prueba del convertidor de datos de navegación."""
    
    @pytest.fixture
    def converter(self):
        """Crea una instancia del convertidor para pruebas."""
        config = ConverterConfig(
            output_dir="test_output",
            coordinate_precision=8
        )
        return NavigationDataConverter(config)
    
    def test_convert_data_success(self, converter, tmp_path):
        """Prueba el caso de éxito de la conversión de datos."""
        source = tmp_path / "source.db3"
        target = tmp_path / "target"
        
        # Crear datos de prueba
        source.touch()
        
        # Ejecutar la conversión
        result = converter.convert_data(source, target)
        
        # Verificar el resultado
        assert result is True
        assert target.exists()
    
    def test_convert_data_failure(self, converter):
        """Prueba el caso de fallo de la conversión de datos."""
        with pytest.raises(ConversionError):
            converter.convert_data(
                Path("nonexistent.db3"),
                Path("target")
            )
```

### Ejecutar Pruebas

```bash
# Ejecutar todas las pruebas
pytest

# Ejecutar un archivo de prueba específico
pytest tests/unit/test_converter.py

# Ejecutar y generar informe de cobertura
pytest --cov=ifly_converter --cov-report=html

# Ejecutar pruebas de rendimiento
pytest tests/performance/ -m performance
```

## 📚 Contribución a la Documentación

### Estructura de la Documentación

```
docs/
├── guide/          # Guía de usuario
├── api/            # Documentación de la API
├── examples/       # Código de ejemplo
└── deployment/     # Guía de despliegue
```

### Estándares de Documentación

-   Usar formato **Markdown**
-   Incluir ejemplos de código
-   Ofrecer soporte multilingüe
-   Mantener la documentación actualizada

### Ejemplo de Documentación

```markdown
## 🔧 Gestión de Configuración

### Configuración Básica

El convertidor utiliza la clase `ConverterConfig` para gestionar la configuración:

```python
from ifly_converter.config import ConverterConfig

# Crear configuración predeterminada
config = ConverterConfig()

# Configuración personalizada
config = ConverterConfig(
    output_dir="custom_output",
    coordinate_precision=6,
    enable_validation=True
)
```

### Opciones de Configuración

| Opción | Tipo | Valor predeterminado | Descripción |
|------|------|--------|------|
| `output_dir` | str | "output" | Directorio de salida |
| `coordinate_precision` | int | 8 | Precisión de coordenadas |
| `enable_validation` | bool | True | Habilitar validación |
```

## 🐛 Informar Problemas

### Plantilla de Informe de Problemas

Al informar un problema, por favor proporcione la siguiente información:

```markdown
**Descripción del problema**
Describa el problema encontrado de forma clara y concisa.

**Pasos para reproducir**
1. Primer paso '...'
2. Segundo paso '...'
3. Tercer paso '...'
4. Error observado

**Comportamiento esperado**
Describa lo que esperaba que sucediera.

**Comportamiento real**
Describa lo que realmente sucedió.

**Información del entorno**
- OS: [ej. Windows 10]
- Versión de Python: [ej. 3.9.0]
- Versión del proyecto: [ej. v2.0.0]

**Información de registro**
```
Pegue la información de registro relevante
```

**Captura de pantalla**
Si aplica, añada capturas de pantalla para ayudar a explicar el problema.

**Información adicional**
Añada cualquier otra información contextual relevante.
```

### Clasificación de Problemas

Utilice las siguientes etiquetas para clasificar los problemas:

-   🐛 `bug` - Informe de error
-   ✨ `enhancement` - Solicitud de característica
-   📚 `documentation` - Relacionado con la documentación
-   ❓ `question` - Pregunta de uso
-   🔥 `priority: high` - Prioridad alta
-   🧹 `good first issue` - Buen primer problema

## 📋 Solicitudes de Características

### Plantilla de Solicitud de Característica

```markdown
**Resumen de la característica**
Describa brevemente la característica que desea añadir.

**Problema que resuelve**
¿Qué problema resuelve esta característica?

**Descripción detallada**
Describa detalladamente cómo funcionaría la característica.

**Alternativas**
¿Ha considerado otras soluciones?

**Información adicional**
Añada cualquier otra información, capturas de pantalla o ejemplos relevantes.
```

## 🎯 Hoja de Ruta de Desarrollo

### Objetivos a Corto Plazo (1-3 meses)
-   [ ] Desarrollo de interfaz GUI
-   [ ] Funcionalidad de procesamiento por lotes
-   [ ] Mejora de las herramientas de validación de datos
-   [ ] Optimización del rendimiento

### Objetivos a Medio Plazo (3-6 meses)
-   [ ] Soporte multiformato
-   [ ] Procesamiento en la nube
-   [ ] Interfaz REST API
-   [ ] Sistema de plugins

### Objetivos a Largo Plazo (6-12 meses)
-   [ ] Optimización con aprendizaje automático
-   [ ] Actualización de datos en tiempo real
-   [ ] Soporte móvil
-   [ ] Funciones de nivel empresarial

## 🏆 Contribuidores

¡Gracias a todos los desarrolladores que han contribuido al proyecto!

<!-- La lista de contribuidores se actualizará automáticamente -->

## 📞 Contáctenos

-   📧 **Correo electrónico**: project@example.com
-   💬 **Discusiones**: GitHub Discussions
-   🐛 **Problemas**: GitHub Issues
-   🌐 **Sitio web oficial**: https://ifly-converter.org

---

¡Gracias de nuevo por su contribución! ¡Juntos construiremos un mejor convertidor de datos de navegación iFly! 🚀
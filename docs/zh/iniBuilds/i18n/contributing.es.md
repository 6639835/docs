# 🤝 Guía de Contribución

¡Le damos la bienvenida a contribuir al proyecto Nav-data! Esta guía le ayudará a entender cómo participar en el desarrollo del proyecto, enviar código y proponer mejoras.

## 🎯 Formas de Contribución

### 📝 Puede contribuir de las siguientes maneras:

- **🐛 Reportar Bugs**：Descubrir problemas y proporcionar pasos detallados para reproducirlos.
- **💡 Sugerencias de Funcionalidades**：Proponer nuevas funcionalidades o ideas para mejorar las existentes.
- **📖 Mejoras en la Documentación**：Mejorar la documentación, corregir errores, añadir ejemplos.
- **🔧 Contribuciones de Código**：Corregir Bugs, implementar nuevas funcionalidades, optimizar el rendimiento.
- **🧪 Soporte de Pruebas**：Añadir casos de prueba, mejorar la cobertura de pruebas.
- **🌐 Localización**：Traducir documentación, soportar más idiomas y regiones.

## 🚀 Inicio Rápido

### 📋 Configuración del Entorno de Desarrollo

1.  **Forkear el repositorio del proyecto**
    ```bash
    # Forkear el proyecto en GitHub
    # Luego clonar localmente
    git clone https://github.com/Nav-data/docs.git
    cd docs
    ```

2.  **Configurar el entorno de desarrollo**
    ```bash
    # Crear entorno virtual
    python -m venv venv
    
    # Activar entorno virtual
    # Windows:
    venv\Scripts\activate
    # macOS/Linux:
    source venv/bin/activate
    
    # Instalar dependencias
    pip install -r requirements.txt
    pip install -r requirements-dev.txt  # Dependencias de desarrollo
    ```

3.  **Instalar ganchos de Git**
    ```bash
    # Instalar ganchos pre-commit
    pre-commit install
    ```

### 🔄 Flujo de trabajo de desarrollo

1.  **Crear una rama**
    ```bash
    git checkout -b feature/your-feature-name
    # O
    git checkout -b fix/bug-description
    ```

2.  **Desarrollar**
    -   Escribir código
    -   Añadir pruebas
    -   Actualizar la documentación
    -   Ejecutar las pruebas para asegurar que pasan

3.  **Commit del código**
    ```bash
    git add .
    git commit -m "feat: add new navigation data processor"
    ```

4.  **Push y crear PR**
    ```bash
    git push origin feature/your-feature-name
    # Crear un Pull Request en GitHub
    ```

## 📋 Estándares de Código

### 🐍 Estilo de Código Python

Seguimos el estándar [PEP 8](https://pep8.org/) y utilizamos las siguientes herramientas:

#### **Formateo de Código**
```bash
# Usar black para formatear el código
black *.py

# Usar isort para organizar los imports
isort *.py
```

#### **Inspección de Código**
```bash
# Usar flake8 para la inspección de código
flake8 *.py

# Usar pylint para el análisis estático
pylint *.py
```

### 📝 Requisitos de los Estándares de Código

#### **1. Nomenclatura de Funciones y Clases**
```python
# ✅ Nomenclatura correcta
def process_airports(csv_file_path: str, db_path: str) -> None:
    """Procesa datos de aeropuertos"""
    pass

class CoordinateCache:
    """Clase de caché de coordenadas"""
    pass

# ❌ Nomenclatura incorrecta
def processAirports(csvFile, dbPath):
    pass

class coordinateCache:
    pass
```

#### **2. Docstrings**
```python
def get_magnetic_variation(lat: float, lon: float) -> float:
    """
    Calcula la variación magnética para las coordenadas dadas
    
    Parámetros:
        lat (float): Latitud (grados decimales)
        lon (float): Longitud (grados decimales)
    
    Retorna:
        float: Variación magnética (grados), redondeado a 1 decimal
    
    Ejemplo:
        >>> get_magnetic_variation(39.9042, 116.4074)
        -6.2
    """
    result = geo_mag.calculate(glat=lat, glon=lon, alt=0, time=year_decimal)
    return round(result.d, 1)
```

#### **3. Anotaciones de Tipo**
```python
from typing import Dict, List, Optional, Tuple

def parse_dat_file(file_path: str) -> List[Dict[str, str]]:
    """Parsea un archivo DAT y devuelve una lista de registros"""
    records = []
    # Lógica de procesamiento
    return records

def find_coordinates(
    identifier: str, 
    icao_code: Optional[str] = None
) -> Tuple[float, float]:
    """Busca coordenadas y devuelve una tupla de latitud y longitud"""
    return lat, lon
```

#### **4. Manejo de Errores**
```python
import logging

logger = logging.getLogger(__name__)

def process_data_file(file_path: str) -> bool:
    """
    Procesa un archivo de datos
    
    Retorna:
        bool: Indica si el procesamiento fue exitoso
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            # Lógica de procesamiento
            data = file.read()
            
        logger.info(f"Archivo procesado exitosamente: {file_path}")
        return True
        
    except FileNotFoundError:
        logger.error(f"Archivo no encontrado: {file_path}")
        return False
    except PermissionError:
        logger.error(f"Permiso de archivo insuficiente: {file_path}")
        return False
    except Exception as e:
        logger.error(f"Ocurrió un error desconocido al procesar el archivo: {e}")
        return False
```

#### **5. Definición de Constantes**
```python
# Definir constantes en la parte superior del módulo
SUPPORTED_ICAO_REGIONS = {
    'ZB', 'ZS', 'ZJ', 'ZG', 'ZY', 'ZL', 'ZU', 'ZW', 'ZP', 'ZH',
    'VM', 'VH', 'RK'
}

DEFAULT_BATCH_SIZE = 1000
COORDINATE_PRECISION = 8
DATABASE_TIMEOUT = 30

# Uso en funciones
def process_waypoints(icao_code: str) -> bool:
    if icao_code not in SUPPORTED_ICAO_REGIONS:
        logger.warning(f"Región ICAO no soportada: {icao_code}")
        return False
    # Lógica de procesamiento
```

## 🧪 Requisitos de Pruebas

### 📊 Cobertura de Pruebas

-   **Requisito mínimo**：Cobertura de pruebas de código nuevo ≥ 80%
-   **Objetivo**：Cobertura de pruebas del proyecto global ≥ 90%

### 🛠️ Herramientas de Pruebas

```bash
# Ejecutar todas las pruebas
pytest

# Ejecutar un archivo de prueba específico
pytest tests/test_airports.py

# Generar informe de cobertura
pytest --cov=. --cov-report=html

# Ver informe de cobertura
open htmlcov/index.html
```

### ✅ Ejemplos de Pruebas

#### **Pruebas Unitarias**
```python
import unittest
from unittest.mock import patch, MagicMock
from airports import get_magnetic_variation, convert_dms_to_decimal

class TestAirports(unittest.TestCase):
    
    def test_convert_dms_to_decimal_north(self):
        """Prueba la conversión DMS de latitud norte"""
        result = convert_dms_to_decimal("N390842.12")
        self.assertAlmostEqual(result, 39.145033, places=6)
    
    def test_convert_dms_to_decimal_south(self):
        """Prueba la conversión DMS de latitud sur"""
        result = convert_dms_to_decimal("S390842.12")
        self.assertAlmostEqual(result, -39.145033, places=6)
    
    @patch('airports.geo_mag')
    def test_get_magnetic_variation(self, mock_geomag):
        """Prueba el cálculo de la variación magnética"""
        # Configurar valor de retorno simulado
        mock_result = MagicMock()
        mock_result.d = -6.234
        mock_geomag.calculate.return_value = mock_result
        
        result = get_magnetic_variation(39.9042, 116.4074)
        
        self.assertEqual(result, -6.2)
        mock_geomag.calculate.assert_called_once()

if __name__ == '__main__':
    unittest.main()
```

#### **Pruebas de Integración**
```python
import tempfile
import sqlite3
import os
from airports import process_airports

class TestAirportsIntegration(unittest.TestCase):
    
    def setUp(self):
        """Configuración antes de la prueba"""
        self.temp_db = tempfile.NamedTemporaryFile(delete=False, suffix='.db')
        self.temp_db.close()
        self.db_path = self.temp_db.name
    
    def tearDown(self):
        """Limpieza después de la prueba"""
        os.unlink(self.db_path)
    
    def test_process_airports_integration(self):
        """Prueba de integración del procesamiento de datos de aeropuertos"""
        csv_file = "test_data/sample_airports.csv"
        lookup_file = "test_data/sample_icao.txt"
        
        # Ejecutar procesamiento
        process_airports(csv_file, lookup_file, self.db_path)
        
        # Verificar resultados
        conn = sqlite3.connect(self.db_path)
        cursor = conn.cursor()
        
        cursor.execute("SELECT COUNT(*) FROM tbl_airports")
        count = cursor.fetchone()[0]
        
        self.assertGreater(count, 0)
        
        # Verificar calidad de los datos
        cursor.execute("""
            SELECT COUNT(*) FROM tbl_airports 
            WHERE airport_latitude IS NULL OR airport_longitude IS NULL
        """)
        null_coords = cursor.fetchone()[0]
        
        self.assertEqual(null_coords, 0, "No debería haber coordenadas nulas")
        
        conn.close()
```

### 📝 Datos de Prueba

Los datos de prueba deben ubicarse en el directorio `tests/test_data/`:

```
tests/
├── test_data/
│   ├── sample_airports.csv      # Datos de aeropuerto de muestra
│   ├── sample_runways.csv       # Datos de pista de muestra
│   ├── sample_earth_fix.dat     # Datos de puntos de ruta de muestra
│   ├── sample_earth_nav.dat     # Datos de radioayudas de muestra
│   └── sample_icao.txt          # Tabla de búsqueda ICAO de muestra
├── test_airports.py             # Pruebas del módulo de aeropuertos
├── test_runways.py              # Pruebas del módulo de pistas
├── test_waypoints.py            # Pruebas del módulo de puntos de ruta
└── conftest.py                  # Configuración de pytest
```

## 🐛 Reporte de Bugs

### 📋 Plantilla de Reporte de Bugs

Use la siguiente plantilla para reportar bugs:

```markdown
## Descripción del Bug
Describa el problema de forma concisa

## Pasos para Reproducir
1. Ejecutar comando `python XP2INI_NDB_Converter.py`
2. Seleccionar configuración '...'
3. Observar el error '...'

## Comportamiento Esperado
Describa lo que esperaba que ocurriera

## Comportamiento Actual
Describa lo que realmente ocurrió

## Información del Entorno
- Sistema Operativo: Windows 11 22H2
- Versión de Python: 3.11.5
- Versión de MSFS: 2024
- Add-on de Avión: PMDG 777

## Registro de Errores
```
Pegue la información y los registros de errores relevantes
```

## Otra Información
Cualquier otra información que ayude a diagnosticar el problema
```

### 🔍 Clasificación de Bugs

| Prioridad | Etiqueta | Descripción |
| :-------- | :------- | :---------- |
| 🔴 Critical | `priority:critical` | Causa el bloqueo del programa o la corrupción de datos |
| 🟠 High | `priority:high` | Afecta a la funcionalidad principal, pero hay una solución alternativa |
| 🟡 Medium | `priority:medium` | Afecta a funciones secundarias o a la experiencia del usuario |
| 🟢 Low | `priority:low` | Problema menor que no afecta a la funcionalidad central |

## 💡 Sugerencias de Funcionalidades

### 📋 Plantilla de Sugerencia de Funcionalidad

```markdown
## Resumen de la Funcionalidad
Describa brevemente la funcionalidad propuesta

## Escenario de Uso
Describa en qué situación se necesita esta funcionalidad

## Descripción Detallada
Describa en detalle cómo se implementaría la funcionalidad y el efecto esperado

## Alternativas
¿Se han considerado otras soluciones?

## Información Adicional
Cualquier otra información que ayude a comprender la sugerencia
```

### 🎯 Clasificación de Funcionalidades

| Tipo | Etiqueta | Descripción |
| :--------- | :-------------- | :---------------------------------- |
| ✨ Enhancement | `type:enhancement` | Mejora de una funcionalidad existente |
| 🚀 Feature | `type:feature` | Nueva funcionalidad |
| 📊 Performance | `type:performance` | Optimización del rendimiento |
| 📖 Documentation | `type:documentation` | Mejora de la documentación |

## 📖 Contribuciones a la Documentación

### 📝 Estándares de Documentación

1.  **Formato Markdown**：Usar sintaxis Markdown estándar
2.  **Compatibilidad con VitePress**：Asegurar que el front matter sea correcto
3.  **Mixto Chino-Inglés**：Mantener los términos técnicos en inglés, las explicaciones en chino.
4.  **Ejemplos de Código**：Proporcionar ejemplos de código completos y ejecutables.

### 🎨 Guía de Estilo de la Documentación

```markdown
---
title: Título de la página
description: Descripción de la página
---

# 🎯 Título Principal

Párrafo introductorio que explica el propósito y alcance de este documento.

## 📋 Título de Nivel Dos

### Título de Nivel Tres

Usar emojis y estructura jerárquica apropiados.

#### Ejemplo de Código

```python
# Proporcionar ejemplos de código completos
def example_function():
    return "Ejemplo"
```

#### Notas Importantes

> ⚠️ **Nota Importante**：Resaltar información importante usando bloques de cita

#### Formato de Lista

- ✅ Usar emojis para mejorar la legibilidad
- 📝 Mantener los elementos de la lista concisos y claros
- 🔗 Añadir enlaces internos cuando sea apropiado
```

## 🔄 Proceso de Pull Request

### 📋 Lista de Verificación de PR

Antes de enviar un PR, confirme lo siguiente:

-   [ ] 🧪 **Todas las pruebas pasan**：`pytest`
-   [ ] 📊 **Cobertura de pruebas suficiente**：Cobertura de código nuevo ≥ 80%
-   [ ] 🎨 **Formato de código correcto**：`black`、`isort`、`flake8`
-   [ ] 📖 **Documentación actualizada**：Los cambios en la API requieren actualización de la documentación
-   [ ] 🏷️ **Mensaje de commit estandarizado**：Seguir Conventional Commits
-   [ ] 🔗 **Enlazar Issue relacionado**：Referenciar en la descripción del PR

### 📝 Plantilla de PR

```markdown
## Resumen de los Cambios
Describa brevemente el propósito y los principales cambios de este PR

## Tipo de Cambio
- [ ] 🐛 Corrección de Bug
- [ ] ✨ Nueva Funcionalidad
- [ ] 📖 Actualización de Documentación
- [ ] 🎨 Refactorización de Código
- [ ] ⚡ Optimización de Rendimiento
- [ ] 🧪 Mejora de Pruebas

## Explicación Detallada
Describa en detalle la implementación y los detalles técnicos

## Pruebas
Explique cómo se probaron estos cambios

## Issue Relacionado
Cierra #123

## Lista de Verificación
- [ ] Pruebas superadas
- [ ] Formato de código correcto
- [ ] Documentación actualizada
- [ ] Registro de cambios actualizado
```

### 🏷️ Estándares de Mensajes de Commit

Seguir la especificación [Conventional Commits](https://www.conventionalcommits.org/):

```bash
# Adición de funcionalidad
feat: add support for AIRAC 2024 data format

# Corrección de Bug
fix: resolve coordinate conversion precision issue

# Actualización de documentación
docs: update installation guide for Windows 11

# Optimización de rendimiento
perf: optimize magnetic variation calculation

# Refactorización de código
refactor: restructure database connection handling

# Adición de pruebas
test: add unit tests for waypoint processing

# Relacionado con la construcción
build: update dependencies to latest versions
```

## 🌟 Reconocimiento a los Contribuidores

### 🏆 Niveles de Contribuidor

| Nivel | Requisitos | Permisos |
| :-------- | :------------------------------ | :--------------------------- |
| 👋 Contributor | 1+ PRs válidos | Contribuidor básico |
| 🎖️ Regular Contributor | 5+ PRs válidos | Revisión de código prioritaria |
| 🌟 Core Contributor | 10+ PRs válidos + Participación a largo plazo | Permiso de triage de Issues |
| 👑 Maintainer | Desarrollador principal | Permisos completos del repositorio |

### 📜 Lista de Contribuidores

Mantenemos una lista de contribuidores en el README, ¡agradecemos el esfuerzo de cada contribuidor!

```markdown
## 🙏 Agradecimientos a los Contribuidores

<a href="https://github.com/your-repo/nav-data/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=your-repo/nav-data" />
</a>
```

## 🤔 Obtener Ayuda

### 💬 Canales de Comunicación

-   **📧 Correo electrónico**：project@nav-data.org
-   **💬 Foro de discusión**：GitHub Discussions
-   **🐛 Reporte de Problemas**：GitHub Issues
-   **📖 Problemas de Documentación**：Abrir un PR directamente para modificar

### 📚 Recursos de Aprendizaje

-   [Documentación oficial de Python](https://docs.python.org/)
-   [Documentación de SQLite](https://sqlite.org/docs.html)
-   [Principios de Navegación Aérea](https://www.faa.gov/air_traffic/publications/)
-   [Estándar ARINC 424](https://www.arinc.com/)

### 🎓 Guía para Principiantes

Si es la primera vez que participa en un proyecto de código abierto:

1.  📖 **Leer el código**：Primero, entienda la estructura del proyecto y las funcionalidades clave
2.  🐛 **Comience poco a poco**：Empiece corrigiendo errores de documentación o pequeños bugs
3.  🤝 **Comuníquese activamente**：No dude en preguntar y buscar ayuda
4.  📈 **Aprendizaje continuo**：Siga las novedades del proyecto y aprenda las mejores prácticas

## 📄 Código de Conducta

### 🤝 Nuestro Compromiso

Para fomentar un ambiente abierto y acogedor, nos comprometemos a:

-   **🌈 Inclusividad**：Dar la bienvenida a participantes de diferentes orígenes y puntos de vista
-   **🤝 Respeto**：Respetar las diferentes opiniones y experiencias
-   **📚 Orientación al aprendizaje**：Ayudar a los recién llegados a crecer y aprender
-   **🎯 Profesionalismo**：Centrarse en las discusiones técnicas y las mejoras del proyecto

### ❌ Comportamientos Inaceptables

-   Ataques personales o comentarios insultantes
-   Acoso o discriminación
-   Publicación de información privada de otros
-   Otros comportamientos no profesionales o inapropiados

### 📞 Mecanismo de Denuncia

Si encuentra una violación del código de conducta, póngase en contacto con los mantenedores del proyecto:
-   📧 Correo electrónico：conduct@nav-data.org
-   📱 Mensaje privado：Mensaje privado en GitHub a los mantenedores

---

¡Gracias por considerar contribuir al proyecto Nav-data! Cada contribución hace que la comunidad de simulación aérea sea mejor. 🛫
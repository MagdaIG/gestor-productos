# Tienda en Línea - Gestión de Productos

Una aplicación web moderna para gestionar productos de una tienda en línea, desarrollada con Node.js y Express. La aplicación cuenta con un diseño responsivo e intuitivo utilizando la paleta de colores "Ibiza Sunset".

## Características

- **Gestión de Productos**: Agregar, ver y listar productos con información detallada
- **Persistencia de Datos**: Almacenamiento en archivos JSON para mantener los datos entre sesiones
- **Diseño Responsivo**: Interfaz adaptativa que funciona en dispositivos móviles y desktop
- **Manejo de Errores**: Sistema robusto de manejo de errores y validaciones
- **Interfaz Moderna**: Diseño atractivo con la paleta de colores "Ibiza Sunset"

## Tecnologías Utilizadas

- **Backend**: Node.js, Express.js
- **Frontend**: EJS (Embedded JavaScript), CSS3, JavaScript
- **Persistencia**: Sistema de archivos JSON
- **Dependencias**: body-parser, nodemon (desarrollo)

## Paleta de Colores

La aplicación utiliza la paleta "Ibiza Sunset" con los siguientes colores principales:

- **Rosa Principal**: `#ee0979` (RGB: 238, 9, 121)
- **Naranja Principal**: `#ff6a00` (RGB: 255, 106, 0)
- **Rosa Gradiente**: `#f42951` (RGB: 244, 41, 81)
- **Naranja Gradiente**: `#f94a28` (RGB: 249, 74, 40)
- **Fondo Oscuro**: `#2a0a4a` (RGB: 42, 10, 74)
- **Fondo de Tarjetas**: `#4a1a7a` (RGB: 74, 26, 122)

## Instalación y Configuración

### Prerrequisitos

- Node.js (versión 14.0.0 o superior)
- npm (incluido con Node.js)

### Pasos de Instalación

1. **Clonar o descargar el proyecto**
   ```bash
   # Si tienes el código en un repositorio
   git clone <url-del-repositorio>
   cd app-productos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Ejecutar la aplicación**
   ```bash
   # Para desarrollo (con reinicio automático)
   npm run dev
   
   # Para producción
   npm start
   ```

4. **Acceder a la aplicación**
   - Abrir el navegador en: `http://localhost:3000`

## Estructura del Proyecto

```
app-productos/
├── data/
│   └── productos.json          # Archivo de persistencia de datos
├── public/
│   ├── css/
│   │   └── style.css          # Estilos principales
│   └── js/
│       └── main.js            # JavaScript del cliente
├── views/
│   ├── partials/
│   │   ├── header.ejs         # Encabezado común
│   │   └── footer.ejs         # Pie de página común
│   ├── agregar-producto.ejs   # Formulario para agregar productos
│   ├── detalle-producto.ejs   # Vista de detalle de producto
│   ├── error.ejs              # Página de errores
│   ├── index.ejs              # Página principal
│   └── productos.ejs          # Lista de productos
├── package.json               # Configuración del proyecto
├── server.js                  # Servidor principal
└── README.md                  # Documentación
```

## Funcionalidades

### Rutas Disponibles

- **GET /** - Página principal con información de bienvenida
- **GET /productos** - Lista todos los productos disponibles
- **GET /agregar-producto** - Formulario para agregar un nuevo producto
- **POST /agregar-producto** - Procesa el formulario y guarda el producto
- **GET /producto/:id** - Muestra los detalles de un producto específico

### Gestión de Productos

Cada producto contiene la siguiente información:
- **ID**: Identificador único generado automáticamente
- **Nombre**: Nombre del producto
- **Descripción**: Descripción detallada del producto
- **Precio**: Precio en formato decimal
- **Fecha de Creación**: Timestamp de cuando se agregó el producto

### Persistencia de Datos

Los datos se almacenan en el archivo `data/productos.json` en formato JSON. El sistema:
- Crea automáticamente el archivo si no existe
- Lee los datos al iniciar la aplicación
- Escribe los datos cada vez que se agrega un producto
- Maneja errores de lectura/escritura de archivos

## Desarrollo

### Scripts Disponibles

```bash
# Iniciar en modo desarrollo (con nodemon)
npm run dev

# Iniciar en modo producción
npm start

# Ejecutar tests (cuando estén implementados)
npm test
```

### Dependencias

#### Dependencias de Producción
- **express**: Framework web para Node.js
- **ejs**: Motor de plantillas
- **body-parser**: Middleware para parsear datos del cuerpo de las peticiones
- **path**: Módulo nativo para manejo de rutas de archivos

#### Dependencias de Desarrollo
- **nodemon**: Herramienta para reiniciar automáticamente el servidor durante el desarrollo

### Manejo de Errores

La aplicación incluye un sistema robusto de manejo de errores:

1. **Errores 404**: Páginas no encontradas
2. **Errores 500**: Errores internos del servidor
3. **Validación de formularios**: Validación en cliente y servidor
4. **Manejo de archivos**: Gestión de errores de lectura/escritura

## Características del Diseño

### Responsividad
- Diseño adaptativo para móviles, tablets y desktop
- Menú hamburguesa en dispositivos móviles
- Grid system flexible para las tarjetas de productos

### Interactividad
- Animaciones suaves en hover
- Transiciones CSS para mejor experiencia de usuario
- Validación en tiempo real de formularios
- Efectos visuales con la paleta de colores

### Accesibilidad
- Contraste adecuado de colores
- Navegación por teclado
- Estructura semántica HTML
- Textos alternativos para iconos

## Pruebas

### Pruebas Manuales

1. **Navegación**
   - Verificar que todas las rutas funcionen correctamente
   - Probar la navegación entre páginas

2. **Gestión de Productos**
   - Agregar un nuevo producto
   - Verificar que se guarde correctamente
   - Comprobar que aparezca en la lista
   - Ver los detalles del producto

3. **Validaciones**
   - Intentar enviar formulario vacío
   - Probar con precios negativos
   - Verificar mensajes de error

4. **Responsividad**
   - Probar en diferentes tamaños de pantalla
   - Verificar el menú móvil
   - Comprobar la adaptación de las tarjetas

### Casos de Prueba

```bash
# 1. Iniciar el servidor
npm start

# 2. Abrir navegador en http://localhost:3000

# 3. Probar las siguientes funcionalidades:
#    - Navegar a /productos
#    - Agregar un producto desde /agregar-producto
#    - Verificar que aparezca en la lista
#    - Hacer clic en "Ver Detalles"
#    - Probar rutas inexistentes (debe mostrar error 404)
```

## Despliegue

### Entorno Local
```bash
# Instalar dependencias
npm install

# Iniciar servidor
npm start
```

### Variables de Entorno
La aplicación utiliza las siguientes variables de entorno:
- **PORT**: Puerto del servidor (por defecto: 3000)

### Consideraciones de Producción
- Configurar un servidor web (nginx, Apache) como proxy reverso
- Implementar HTTPS para seguridad
- Configurar logs de aplicación
- Implementar backup automático del archivo de datos
- Considerar migrar a una base de datos para mayor escalabilidad

## Contribución

Para contribuir al proyecto:

1. Fork el repositorio
2. Crear una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -am 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Contacto

Para preguntas o sugerencias sobre el proyecto, puedes contactar al desarrollador.

## Changelog

### Versión 1.0.0
- Implementación inicial de la aplicación
- Sistema básico de gestión de productos
- Diseño responsivo con paleta "Ibiza Sunset"
- Persistencia de datos en archivos JSON
- Manejo de errores básico
- Documentación completa


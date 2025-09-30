# Gestión de Productos - Backend Node.js

Una aplicación web completa para la gestión de productos de una tienda en línea, desarrollada con Node.js y Express. Este proyecto implementa un servidor backend robusto con persistencia de datos, manejo de archivos y operaciones CRUD completas.

## Características Principales

- **Servidor Express**: Configurado para servir contenido estático y dinámico
- **CRUD Completo**: Crear, leer, actualizar y eliminar productos
- **Persistencia de Datos**: Almacenamiento en archivos JSON con módulo fs
- **Gestión de Imágenes**: Sistema de subida y almacenamiento con Multer
- **Rutas Dinámicas**: API RESTful para operaciones de productos
- **Manejo de Errores**: Middleware para errores 404 y 500
- **Interfaz Responsive**: Diseño moderno con tema día/noche
- **Validación**: Validación de formularios y tipos de archivo

## Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web minimalista
- **EJS** - Motor de plantillas para renderizado
- **Multer** - Middleware para manejo de archivos
- **fs Module** - Módulo nativo para operaciones de archivos

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con variables CSS
- **JavaScript** - Interactividad y manipulación del DOM
- **Bootstrap** - Framework CSS para diseño responsive

### Herramientas
- **npm** - Gestor de paquetes y dependencias
- **nodemon** - Reinicio automático del servidor en desarrollo
- **body-parser** - Parsing de datos de formularios

## Estructura del Proyecto

```
app-productos/
├── data/
│   └── productos.json          # Base de datos de productos
├── public/
│   ├── css/
│   │   └── style.css          # Estilos principales
│   ├── js/
│   │   └── main.js            # JavaScript del frontend
│   └── uploads/
│       └── images/            # Imágenes subidas
├── views/
│   ├── partials/
│   │   ├── header.ejs         # Header reutilizable
│   │   └── footer.ejs         # Footer reutilizable
│   ├── agregar-producto.ejs   # Formulario de agregar
│   ├── detalle-producto.ejs   # Vista detallada
│   ├── editar-producto.ejs    # Formulario de editar
│   ├── index.ejs              # Página principal
│   ├── layout.ejs             # Layout base
│   └── productos.ejs          # Lista de productos
├── server.js                  # Servidor principal
├── package.json               # Configuración del proyecto
└── README.md                  # Documentación
```

## Instalación y Configuración

### Prerrequisitos
- Node.js (versión 14.0.0 o superior)
- npm (viene incluido con Node.js)

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/MagdaIG/gestor-productos.git
   cd gestor-productos
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Crear directorio de uploads**
   ```bash
   mkdir -p public/uploads/images
   ```

4. **Iniciar el servidor**
   ```bash
   npm start
   ```

5. **Acceder a la aplicación**
   ```
   http://localhost:3000
   ```

### Scripts Disponibles

- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor con nodemon (desarrollo)

## API Endpoints

### Rutas Principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página principal de bienvenida |
| GET | `/productos` | Lista todos los productos |
| GET | `/productos/agregar` | Formulario para agregar producto |
| POST | `/productos` | Crea un nuevo producto |
| GET | `/productos/:id` | Muestra detalles de un producto |
| GET | `/productos/:id/editar` | Formulario para editar producto |
| PUT | `/productos/:id` | Actualiza un producto existente |
| DELETE | `/productos/:id` | Elimina un producto |

### Estructura de Datos

```json
{
  "id": "1759198953261",
  "nombre": "Smartphone Samsung",
  "descripcion": "Teléfono inteligente con cámara de alta resolución",
  "precio": 599.99,
  "imagen": "producto-1759198953261.jpg",
  "fechaCreacion": "2025-09-30T02:22:33.261Z"
}
```

## Configuración del Servidor

### Variables de Entorno
- `PORT` - Puerto del servidor (por defecto: 3000)

### Configuración de Multer
- **Límite de archivo**: 5MB máximo
- **Tipos permitidos**: jpg, jpeg, png, gif
- **Directorio de destino**: `public/uploads/images/`
- **Nomenclatura**: `producto-{timestamp}-{random}.{extension}`

## Características de Diseño

### Tema Día/Noche
- Interfaz con modo claro y oscuro
- Persistencia de preferencias en localStorage
- Transiciones suaves entre temas
- Variables CSS dinámicas

### Responsive Design
- Adaptable a dispositivos móviles, tablets y escritorio
- Grid system flexible
- Navegación optimizada para móviles

## Manejo de Errores

### Middleware de Errores
- **404**: Páginas no encontradas
- **500**: Errores internos del servidor
- **Validación**: Errores de formularios
- **Archivos**: Errores de subida de imágenes

### Logging
- Errores del servidor registrados en consola
- Información de debugging para desarrollo

## Pruebas

### Funcionalidades Probadas
- Creación de productos
- Lectura y visualización
- Actualización de datos
- Eliminación de productos
- Subida de imágenes
- Persistencia de datos
- Manejo de errores
- Responsive design

## Mejoras Futuras

- [ ] Integración con base de datos (MongoDB/PostgreSQL)
- [ ] Autenticación de usuarios
- [ ] Sistema de categorías
- [ ] Búsqueda y filtros avanzados
- [ ] API REST completa
- [ ] Tests automatizados
- [ ] Dockerización
- [ ] Deploy en la nube

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

**Magdalena Inalaf**
- GitHub: [@MagdaIG](https://github.com/MagdaIG)
- LinkedIn: [Magdalena Inalaf](https://www.linkedin.com/in/minalaf/)
- Portfolio: [inalaf.ca](https://inalaf.ca)

## Agradecimientos

- Express.js por el framework web
- Bootstrap por los componentes UI
- La comunidad de Node.js por el ecosistema

---

**Desarrollado como parte del Bootcamp de JavaScript**

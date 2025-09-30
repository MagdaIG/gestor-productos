const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs').promises;
const multer = require('multer');

const app = express();
const PORT = process.env.PORT || 3000;
const PRODUCTS_FILE = path.join(__dirname, 'data', 'productos.json');
const UPLOADS_DIR = path.join(__dirname, 'public', 'uploads', 'images');

// Configuración de multer para subida de imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, UPLOADS_DIR);
  },
  filename: function (req, file, cb) {
    // Generar nombre único para el archivo
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'producto-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // Límite de 5MB
  },
  fileFilter: function (req, file, cb) {
    // Verificar que sea una imagen
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
});

// Middleware para manejar errores de multer
const handleMulterError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).render('agregar-producto', {
        title: 'Agregar Nuevo Producto',
        error: 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.'
      });
    }
  } else if (error.message === 'Solo se permiten archivos de imagen') {
    return res.status(400).render('agregar-producto', {
      title: 'Agregar Nuevo Producto',
      error: 'Solo se permiten archivos de imagen (JPG, PNG, GIF).'
    });
  }
  next(error);
};

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para forzar recarga de vistas
app.use((req, res, next) => {
  res.locals.timestamp = Date.now();
  next();
});

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Deshabilitar cache de vistas en desarrollo
app.set('view cache', false);
app.disable('view cache');

// Función para leer productos desde el archivo
async function readProducts() {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    // Si el archivo no existe, crear uno vacío
    if (error.code === 'ENOENT') {
      await fs.mkdir(path.dirname(PRODUCTS_FILE), { recursive: true });
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify([], null, 2));
      return [];
    }
    throw error;
  }
}

// Función para escribir productos al archivo
async function writeProducts(products) {
  await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
}

// Rutas
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Bienvenido a la Tienda en Línea',
    message: '¡Bienvenido a la tienda en línea!'
  });
});

app.get('/productos', async (req, res) => {
  try {
    const productos = await readProducts();
    res.render('productos', {
      title: 'Lista de Productos',
      productos: productos
    });
  } catch (error) {
    console.error('Error al leer productos:', error);
    res.status(500).render('error', {
      title: 'Error',
      error: 'Error al cargar los productos'
    });
  }
});

app.get('/agregar-producto', (req, res) => {
  res.render('agregar-producto', {
    title: 'Agregar Nuevo Producto'
  });
});

app.post('/agregar-producto', upload.single('imagen'), handleMulterError, async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;

    // Validación básica
    if (!nombre || !descripcion || !precio) {
      return res.status(400).render('agregar-producto', {
        title: 'Agregar Nuevo Producto',
        error: 'Todos los campos son obligatorios'
      });
    }

    const productos = await readProducts();
    const nuevoProducto = {
      id: Date.now().toString(),
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: parseInt(precio.replace(/[^0-9]/g, '')),
      imagen: req.file ? `/uploads/images/${req.file.filename}` : null,
      fechaCreacion: new Date().toISOString()
    };

    productos.push(nuevoProducto);
    await writeProducts(productos);

    res.redirect('/productos?success=true');
  } catch (error) {
    console.error('Error al agregar producto:', error);
    res.status(500).render('error', {
      title: 'Error',
      error: 'Error al agregar el producto'
    });
  }
});

app.get('/producto/:id', async (req, res) => {
  try {
    const productos = await readProducts();
    const producto = productos.find(p => p.id === req.params.id);

    if (!producto) {
      return res.status(404).render('error', {
        title: 'Producto No Encontrado',
        error: 'El producto solicitado no existe'
      });
    }

    res.render('detalle-producto', {
      title: producto.nombre,
      producto: producto
    });
  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).render('error', {
      title: 'Error',
      error: 'Error al cargar el producto'
    });
  }
});

// Ruta para editar producto (GET)
app.get('/editar-producto/:id', async (req, res) => {
  try {
    const productos = await readProducts();
    const producto = productos.find(p => p.id === req.params.id);

    if (!producto) {
      return res.status(404).render('error', {
        title: 'Producto No Encontrado',
        error: 'El producto solicitado no existe'
      });
    }

    res.render('editar-producto', {
      title: 'Editar Producto',
      producto: producto
    });
  } catch (error) {
    console.error('Error al obtener producto para editar:', error);
    res.status(500).render('error', {
      title: 'Error',
      error: 'Error al cargar el producto'
    });
  }
});

// Ruta para editar producto (POST)
app.post('/editar-producto/:id', upload.single('imagen'), handleMulterError, async (req, res) => {
  try {
    const { nombre, descripcion, precio } = req.body;
    const productoId = req.params.id;

    // Validación básica
    if (!nombre || !descripcion || !precio) {
      return res.status(400).render('editar-producto', {
        title: 'Editar Producto',
        producto: { id: productoId, nombre, descripcion, precio },
        error: 'Todos los campos son obligatorios'
      });
    }

    const productos = await readProducts();
    const productoIndex = productos.findIndex(p => p.id === productoId);

    if (productoIndex === -1) {
      return res.status(404).render('error', {
        title: 'Producto No Encontrado',
        error: 'El producto solicitado no existe'
      });
    }

    // Actualizar producto
    productos[productoIndex] = {
      ...productos[productoIndex],
      nombre: nombre.trim(),
      descripcion: descripcion.trim(),
      precio: parseInt(precio.replace(/[^0-9]/g, '')),
      imagen: req.file ? `/uploads/images/${req.file.filename}` : productos[productoIndex].imagen,
      fechaModificacion: new Date().toISOString()
    };

    await writeProducts(productos);
    res.redirect('/productos?success=edit');
  } catch (error) {
    console.error('Error al editar producto:', error);
    res.status(500).render('error', {
      title: 'Error',
      error: 'Error al editar el producto'
    });
  }
});

// Ruta para eliminar solo la imagen de un producto
app.post('/eliminar-imagen/:id', async (req, res) => {
  try {
    const productoId = req.params.id;
    const productos = await readProducts();
    const productoIndex = productos.findIndex(p => p.id === productoId);

    if (productoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    const producto = productos[productoIndex];

    if (!producto.imagen) {
      return res.status(400).json({
        success: false,
        message: 'El producto no tiene imagen para eliminar'
      });
    }

    // Eliminar imagen del servidor
    const imagePath = path.join(__dirname, 'public', producto.imagen);
    try {
      await fs.unlink(imagePath);
    } catch (err) {
      console.log('No se pudo eliminar la imagen:', err.message);
    }

    // Actualizar producto para remover la imagen
    productos[productoIndex] = {
      ...producto,
      imagen: null,
      fechaModificacion: new Date().toISOString()
    };

    await writeProducts(productos);

    res.json({
      success: true,
      message: 'Imagen eliminada exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar imagen:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar la imagen'
    });
  }
});

// Ruta para eliminar producto
app.post('/eliminar-producto/:id', async (req, res) => {
  try {
    const productoId = req.params.id;
    const productos = await readProducts();
    const productoIndex = productos.findIndex(p => p.id === productoId);

    if (productoIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado'
      });
    }

    // Eliminar imagen si existe
    const producto = productos[productoIndex];
    if (producto.imagen) {
      const imagePath = path.join(__dirname, 'public', producto.imagen);
      try {
        await fs.unlink(imagePath);
      } catch (err) {
        console.log('No se pudo eliminar la imagen:', err.message);
      }
    }

    // Eliminar producto del array
    productos.splice(productoIndex, 1);
    await writeProducts(productos);

    res.json({
      success: true,
      message: 'Producto eliminado exitosamente'
    });
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el producto'
    });
  }
});

// Middleware para manejar rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).render('error', {
    title: 'Página No Encontrada',
    error: 'La página que buscas no existe'
  });
});

// Middleware para manejo de errores generales
app.use((error, req, res, next) => {
  console.error('Error del servidor:', error);
  res.status(500).render('error', {
    title: 'Error del Servidor',
    error: 'Ha ocurrido un error interno del servidor'
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`Presiona Ctrl+C para detener el servidor`);
});

module.exports = app;

# Funcionalidad de Imágenes - Tienda en Línea

## Descripción

La aplicación ahora incluye funcionalidad completa para subir y mostrar imágenes de productos. Los productos pueden tener una imagen asociada o mostrar un mensaje de "Sin imagen disponible".

## Características Implementadas

### Subida de Imágenes
- **Campo de archivo**: Interfaz drag-and-drop moderna
- **Vista previa**: Muestra la imagen seleccionada antes de subir
- **Validación**: Solo acepta archivos de imagen (JPG, PNG, GIF)
- **Límite de tamaño**: Máximo 5MB por imagen
- **Nombres únicos**: Cada imagen se guarda con un nombre único

### Visualización de Imágenes
- **Lista de productos**: Muestra imagen o placeholder
- **Detalle de producto**: Imagen grande en la parte superior
- **Placeholder elegante**: "Sin imagen disponible" con icono

### Validaciones
- **Tipo de archivo**: Solo imágenes
- **Tamaño**: Máximo 5MB
- **Formato**: JPG, PNG, GIF
- **Mensajes de error**: Modales informativos

## Estructura de Archivos

```
public/
├── uploads/
│   └── images/          # Carpeta donde se almacenan las imágenes
│       └── producto-[timestamp]-[random].jpg
└── css/
    └── style.css        # Estilos para imágenes y upload
```

## Cómo Usar

### 1. Agregar Producto con Imagen
1. Ir a "Agregar Producto"
2. Completar nombre, descripción y precio
3. Hacer clic en "Seleccionar imagen" o arrastrar imagen
4. Ver vista previa de la imagen
5. Hacer clic en "Guardar Producto"

### 2. Agregar Producto sin Imagen
1. Completar solo los campos obligatorios
2. Dejar el campo de imagen vacío
3. El producto se guardará con "Sin imagen disponible"

### 3. Ver Productos
- **Con imagen**: Se muestra la imagen del producto
- **Sin imagen**: Se muestra placeholder con icono

## Especificaciones Técnicas

### Formatos Soportados
- **JPG/JPEG**: Imágenes comprimidas
- **PNG**: Imágenes con transparencia
- **GIF**: Imágenes animadas (se muestran como estáticas)

### Límites
- **Tamaño máximo**: 5MB
- **Resolución**: Sin límite (se redimensiona automáticamente)
- **Cantidad**: Una imagen por producto

### Almacenamiento
- **Ubicación**: `public/uploads/images/`
- **Nomenclatura**: `producto-[timestamp]-[random].[extensión]`
- **Acceso**: Directo via URL `/uploads/images/filename`

## Validaciones del Cliente

### JavaScript
```javascript
// Validación de tipo
if (!file.type.startsWith('image/')) {
    showModal('Error de Archivo', 'Solo se permiten archivos de imagen.');
}

// Validación de tamaño
if (file.size > 5 * 1024 * 1024) {
    showModal('Error de Archivo', 'La imagen es demasiado grande (máx. 5MB).');
}
```

### Servidor
```javascript
// Multer configuración
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: function (req, file, cb) {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Solo se permiten archivos de imagen'), false);
    }
  }
});
```

## Estilos CSS

### Upload Area
```css
.file-upload-label {
  border: 2px dashed var(--border-color);
  border-radius: var(--border-radius);
  padding: var(--spacing-xl);
  min-height: 120px;
  transition: all 0.3s ease;
}
```

### Imágenes de Productos
```css
.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}
```

## Ejemplos de Uso

### Producto con Imagen
```json
{
  "id": "1759199058461",
  "nombre": "Notebook HP",
  "descripcion": "Laptop para trabajo y estudio",
  "precio": 450000,
  "imagen": "/uploads/images/producto-1759199058461-123456789.jpg",
  "fechaCreacion": "2025-09-30T02:24:18.461Z"
}
```

### Producto sin Imagen
```json
{
  "id": "1759198576301",
  "nombre": "Laptop Gaming",
  "descripcion": "Laptop de alto rendimiento para gaming",
  "precio": 129999,
  "imagen": null,
  "fechaCreacion": "2025-09-30T02:16:16.301Z"
}
```

## Solución de Problemas

### Error: "Solo se permiten archivos de imagen"
- **Causa**: Archivo no es una imagen
- **Solución**: Seleccionar archivo JPG, PNG o GIF

### Error: "La imagen es demasiado grande"
- **Causa**: Archivo mayor a 5MB
- **Solución**: Comprimir la imagen o usar una más pequeña

### Imagen no se muestra
- **Causa**: Archivo no se subió correctamente
- **Solución**: Verificar permisos de la carpeta `uploads/images/`

### Vista previa no funciona
- **Causa**: JavaScript deshabilitado
- **Solución**: Habilitar JavaScript en el navegador

## Mejoras Futuras

- [ ] Redimensionamiento automático de imágenes
- [ ] Múltiples imágenes por producto
- [ ] Galería de imágenes
- [ ] Compresión automática
- [ ] Integración con servicios de almacenamiento en la nube
- [ ] Filtros y efectos de imagen


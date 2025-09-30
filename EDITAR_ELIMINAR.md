# Funcionalidades de Editar y Eliminar Productos

## Descripción

La aplicación ahora incluye funcionalidades completas para editar y eliminar productos existentes. Cada producto tiene botones de acción que permiten modificar su información o eliminarlo de la tienda.

## Características Implementadas

### Editar Productos
- **Botón de editar**: En cada tarjeta de producto
- **Formulario de edición**: Pre-llenado con datos actuales
- **Imagen actual**: Muestra la imagen existente o mensaje de "sin imagen"
- **Cambio de imagen**: Opcional, mantiene la actual si no se selecciona nueva
- **Validación**: Misma validación que el formulario de creación
- **Confirmación**: Modal de confirmación antes de guardar cambios

### Eliminar Productos
- **Botón de eliminar**: En cada tarjeta de producto
- **Confirmación**: Modal de confirmación con nombre del producto
- **Eliminación de imagen**: Borra la imagen del servidor si existe
- **Eliminación completa**: Remueve el producto del archivo JSON
- **Feedback**: Modal de éxito después de eliminar

## Rutas del Servidor

### Editar Producto
```javascript
// GET - Mostrar formulario de edición
GET /editar-producto/:id

// POST - Procesar cambios
POST /editar-producto/:id
```

### Eliminar Producto
```javascript
// POST - Eliminar producto
POST /eliminar-producto/:id
```

## Interfaz de Usuario

### Botones en Tarjetas de Productos
```html
<div class="product-actions">
    <a href="/producto/:id" class="btn btn-outline">
        <i class="fas fa-eye"></i>
        Ver Detalles
    </a>
    <a href="/editar-producto/:id" class="btn btn-secondary">
        <i class="fas fa-edit"></i>
        Editar
    </a>
    <button onclick="confirmDeleteProduct(':id', ':nombre')" class="btn btn-danger">
        <i class="fas fa-trash"></i>
        Eliminar
    </button>
</div>
```

### Formulario de Edición
- **Campos pre-llenados**: Nombre, descripción, precio
- **Imagen actual**: Muestra preview de la imagen existente
- **Nueva imagen**: Campo opcional para cambiar imagen
- **Validación**: Misma que formulario de creación
- **Confirmación**: Modal antes de guardar

## Funcionalidades JavaScript

### Confirmación de Eliminación
```javascript
function confirmDeleteProduct(productId, productName) {
    showConfirmModal(
        'Confirmar Eliminación',
        `¿Estás seguro de que quieres eliminar el producto "${productName}"? Esta acción no se puede deshacer.`,
        function() {
            deleteProduct(productId);
        }
    );
}
```

### Eliminación Asíncrona
```javascript
async function deleteProduct(productId) {
    const response = await fetch(`/eliminar-producto/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    
    if (result.success) {
        showModal('Producto Eliminado', 'El producto se ha eliminado exitosamente.', 'success');
        setTimeout(() => window.location.reload(), 1500);
    }
}
```

### Validación de Formularios
```javascript
// Detecta si es edición o creación
const isEdit = productForm.action.includes('/editar-producto/');
const confirmText = isEdit ? 
    '¿Estás seguro de que quieres guardar los cambios?' : 
    '¿Estás seguro de que quieres agregar este producto?';
```

## Procesamiento en el Servidor

### Edición de Producto
```javascript
// Actualizar producto existente
productos[productoIndex] = {
    ...productos[productoIndex],
    nombre: nombre.trim(),
    descripcion: descripcion.trim(),
    precio: parseInt(precio.replace(/[^0-9]/g, '')),
    imagen: req.file ? `/uploads/images/${req.file.filename}` : productos[productoIndex].imagen,
    fechaModificacion: new Date().toISOString()
};
```

### Eliminación de Producto
```javascript
// Eliminar imagen del servidor
if (producto.imagen) {
    const imagePath = path.join(__dirname, 'public', producto.imagen);
    await fs.unlink(imagePath);
}

// Eliminar del array
productos.splice(productoIndex, 1);
```

## Estilos CSS

### Botón de Eliminar
```css
.btn-danger {
    background: var(--error);
    color: var(--text-white);
    border: 1px solid var(--error);
}

.btn-danger:hover {
    background: #dc2626;
    border-color: #dc2626;
    transform: translateY(-1px);
    box-shadow: var(--shadow-md);
}
```

### Imagen Actual en Edición
```css
.current-image {
    margin-top: var(--spacing-md);
    padding: var(--spacing-md);
    background: var(--bg-tertiary);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
}

.current-image-preview {
    max-width: 150px;
    max-height: 150px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-sm);
    border: 1px solid var(--border-color);
}
```

## Flujo de Trabajo

### Editar Producto
1. **Usuario hace clic en "Editar"**
2. **Navegación a formulario**: `/editar-producto/:id`
3. **Formulario pre-llenado**: Con datos actuales
4. **Usuario modifica campos**: Nombre, descripción, precio, imagen
5. **Validación**: JavaScript valida campos
6. **Confirmación**: Modal de confirmación
7. **Envío**: POST a `/editar-producto/:id`
8. **Procesamiento**: Servidor actualiza producto
9. **Redirección**: A lista con mensaje de éxito

### Eliminar Producto
1. **Usuario hace clic en "Eliminar"**
2. **Confirmación**: Modal con nombre del producto
3. **Confirmación del usuario**: Clic en "Confirmar"
4. **Eliminación**: POST a `/eliminar-producto/:id`
5. **Procesamiento**: Servidor elimina producto e imagen
6. **Respuesta**: JSON con resultado
7. **Feedback**: Modal de éxito
8. **Recarga**: Página se actualiza automáticamente

## Validaciones

### Cliente (JavaScript)
- **Campos obligatorios**: Nombre, descripción, precio
- **Precio válido**: Número positivo en pesos chilenos
- **Confirmación**: Modal antes de enviar
- **Imagen**: Validación de tipo y tamaño

### Servidor (Node.js)
- **Producto existe**: Verificar que el ID existe
- **Campos válidos**: Validación de datos recibidos
- **Imagen**: Validación de multer (tipo y tamaño)
- **Eliminación segura**: Verificar permisos y existencia

## Mensajes de Éxito

### Edición
- **URL**: `/productos?success=edit`
- **Modal**: "Producto Editado - El producto se ha actualizado exitosamente."

### Eliminación
- **Modal**: "Producto Eliminado - El producto se ha eliminado exitosamente."
- **Recarga**: Automática después de 1.5 segundos

## Manejo de Errores

### Errores de Edición
- **Producto no encontrado**: 404 con mensaje
- **Validación fallida**: Formulario con error
- **Error de imagen**: Mensaje específico de multer
- **Error del servidor**: 500 con mensaje genérico

### Errores de Eliminación
- **Producto no encontrado**: JSON con error
- **Error de archivo**: Log en consola, continúa eliminación
- **Error del servidor**: JSON con mensaje de error

## Seguridad

### Validaciones
- **IDs válidos**: Verificar formato de ID
- **Datos sanitizados**: Trim y validación de campos
- **Archivos seguros**: Validación de tipo y tamaño
- **Rutas protegidas**: Verificar existencia de productos

### Eliminación Segura
- **Confirmación obligatoria**: Modal de confirmación
- **Eliminación de archivos**: Limpiar imágenes del servidor
- **Transacciones**: Operaciones atómicas
- **Logs**: Registro de operaciones importantes

## Ejemplos de Uso

### Editar Producto
```bash
# 1. Ir a lista de productos
GET /productos

# 2. Hacer clic en "Editar" de un producto
GET /editar-producto/1759198576301

# 3. Modificar campos y enviar
POST /editar-producto/1759198576301
Content-Type: application/x-www-form-urlencoded

nombre=Laptop Gaming Pro&descripcion=Laptop profesional&precio=1500000

# 4. Redirección con éxito
GET /productos?success=edit
```

### Eliminar Producto
```bash
# 1. Confirmar eliminación (JavaScript)
confirmDeleteProduct('1759198576301', 'Laptop Gaming Pro')

# 2. Enviar eliminación
POST /eliminar-producto/1759198576301
Content-Type: application/json

# 3. Respuesta
{"success":true,"message":"Producto eliminado exitosamente"}

# 4. Recarga automática de la página
```

## Mejoras Futuras

- [ ] **Eliminación masiva**: Seleccionar múltiples productos
- [ ] **Historial de cambios**: Log de modificaciones
- [ ] **Versiones**: Mantener versiones anteriores
- [ ] **Papelera**: Eliminación temporal con restauración
- [ ] **Permisos**: Control de acceso por usuario
- [ ] **Auditoría**: Registro detallado de operaciones


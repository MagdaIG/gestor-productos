# Gestión Avanzada de Imágenes

## Descripción

La aplicación ahora incluye funcionalidades avanzadas para la gestión de imágenes de productos, permitiendo no solo agregar y cambiar imágenes, sino también eliminarlas completamente de forma independiente.

## Características Implementadas

### Gestión Completa de Imágenes
- **Agregar imagen**: Al crear un nuevo producto
- **Cambiar imagen**: Al editar un producto existente
- **Eliminar imagen**: Botón específico para eliminar solo la imagen
- **Mantener imagen**: Opción de no cambiar la imagen actual

### Interfaz Intuitiva
- **Imagen actual**: Preview de la imagen existente
- **Botón de eliminar**: Acceso directo para eliminar imagen
- **Área de subida**: Para cambiar o agregar nueva imagen
- **Mensajes informativos**: Guías claras para el usuario

## Funcionalidades por Escenario

### Producto Sin Imagen
```
┌─────────────────────────────────────┐
│ Gestión de Imagen                   │
├─────────────────────────────────────┤
│ Este producto no tiene imagen       │
│    actualmente                      │
├─────────────────────────────────────┤
│ [Seleccionar imagen]                │
│ o arrastra una imagen aquí          │
└─────────────────────────────────────┘
```

### Producto Con Imagen
```
┌─────────────────────────────────────┐
│ Gestión de Imagen                   │
├─────────────────────────────────────┤
│ Imagen actual:        [Eliminar]     │
│ [Preview de imagen]                 │
│ Puedes cambiar la imagen seleccionan│
│ do una nueva abajo, o eliminarla    │
│ completamente.                      │
├─────────────────────────────────────┤
│ [Cambiar imagen]                    │
│ o arrastra una nueva imagen aquí    │
└─────────────────────────────────────┘
```

## Rutas del Servidor

### Eliminar Solo la Imagen
```javascript
POST /eliminar-imagen/:id
```

**Respuesta exitosa:**
```json
{
  "success": true,
  "message": "Imagen eliminada exitosamente"
}
```

**Respuesta de error:**
```json
{
  "success": false,
  "message": "El producto no tiene imagen para eliminar"
}
```

## Procesamiento en el Servidor

### Eliminación de Imagen
```javascript
// 1. Verificar que el producto existe
const producto = productos.find(p => p.id === productoId);

// 2. Verificar que tiene imagen
if (!producto.imagen) {
    return res.status(400).json({ 
        success: false, 
        message: 'El producto no tiene imagen para eliminar' 
    });
}

// 3. Eliminar archivo del servidor
const imagePath = path.join(__dirname, 'public', producto.imagen);
await fs.unlink(imagePath);

// 4. Actualizar producto (imagen = null)
productos[productoIndex] = {
    ...producto,
    imagen: null,
    fechaModificacion: new Date().toISOString()
};

// 5. Guardar cambios
await writeProducts(productos);
```

## Funcionalidades JavaScript

### Confirmación de Eliminación
```javascript
function confirmRemoveCurrentImage(productId) {
    showConfirmModal(
        'Eliminar Imagen',
        '¿Estás seguro de que quieres eliminar la imagen actual? Esta acción no se puede deshacer.',
        function() {
            removeCurrentImage(productId);
        }
    );
}
```

### Eliminación Asíncrona
```javascript
async function removeCurrentImage(productId) {
    const response = await fetch(`/eliminar-imagen/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    
    const result = await response.json();
    
    if (result.success) {
        showModal('Imagen Eliminada', 'La imagen se ha eliminado exitosamente.', 'success');
        setTimeout(() => window.location.reload(), 1500);
    }
}
```

## Interfaz de Usuario

### Formulario de Edición Mejorado
```html
<div class="form-group">
    <label for="imagen" class="form-label">Gestión de Imagen</label>
    
    <!-- Imagen actual (si existe) -->
    <div class="current-image">
        <div class="current-image-header">
            <h4>Imagen actual:</h4>
            <button onclick="confirmRemoveCurrentImage('ID')" class="btn btn-danger btn-sm">
                <i class="fas fa-trash"></i>
                Eliminar Imagen
            </button>
        </div>
        <img src="IMAGEN_ACTUAL" alt="Imagen actual" class="current-image-preview">
        <p class="image-options-text">
            Puedes cambiar la imagen seleccionando una nueva abajo, o eliminarla completamente.
        </p>
    </div>
    
    <!-- Área de subida -->
    <div class="file-upload-container">
        <input type="file" id="imagen" name="imagen" accept="image/*">
        <label for="imagen" class="file-upload-label">
            <i class="fas fa-cloud-upload-alt"></i>
            <span class="file-upload-text">Cambiar imagen</span>
            <span class="file-upload-hint">o arrastra una imagen aquí</span>
        </label>
    </div>
</div>
```

## Estilos CSS

### Botón Pequeño de Eliminar
```css
.btn-sm {
    padding: var(--spacing-xs) var(--spacing-sm);
    font-size: 0.75rem;
    border-radius: var(--border-radius);
}
```

### Header de Imagen Actual
```css
.current-image-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: var(--spacing-sm);
}
```

### Texto de Opciones
```css
.image-options-text {
    margin-top: var(--spacing-sm);
    font-size: 0.875rem;
    color: var(--text-secondary);
    font-style: italic;
}
```

## Flujo de Trabajo

### Eliminar Imagen de Producto
1. **Usuario en formulario de edición**
2. **Ve imagen actual con botón "Eliminar Imagen"**
3. **Hace clic en "Eliminar Imagen"**
4. **Modal de confirmación**: "¿Estás seguro de eliminar la imagen actual?"
5. **Usuario confirma**
6. **Eliminación**: POST a `/eliminar-imagen/:id`
7. **Procesamiento**: Servidor elimina archivo y actualiza producto
8. **Respuesta**: JSON con resultado
9. **Feedback**: Modal de éxito
10. **Recarga**: Página se actualiza automáticamente

### Cambiar Imagen de Producto
1. **Usuario en formulario de edición**
2. **Ve imagen actual**
3. **Selecciona nueva imagen** (opcional)
4. **Vista previa de nueva imagen**
5. **Envía formulario**
6. **Procesamiento**: Nueva imagen reemplaza la anterior
7. **Redirección**: A lista con mensaje de éxito

## Validaciones

### Cliente (JavaScript)
- **Confirmación obligatoria**: Modal antes de eliminar
- **Validación de archivo**: Tipo y tamaño de nueva imagen
- **Feedback visual**: Modales de éxito y error

### Servidor (Node.js)
- **Producto existe**: Verificar ID válido
- **Imagen existe**: Verificar que el producto tiene imagen
- **Eliminación segura**: Manejo de errores de archivo
- **Actualización atómica**: Operación completa o falla

## Manejo de Errores

### Errores de Eliminación
- **Producto no encontrado**: 404 con mensaje
- **Sin imagen**: 400 con mensaje específico
- **Error de archivo**: Log en consola, continúa operación
- **Error del servidor**: 500 con mensaje genérico

### Errores de Cambio
- **Validación de multer**: Tipo y tamaño de archivo
- **Error de escritura**: Manejo de permisos
- **Error de actualización**: Rollback de cambios

## Seguridad

### Validaciones de Seguridad
- **IDs válidos**: Verificar formato de ID
- **Permisos de archivo**: Verificar acceso a archivos
- **Límites de tamaño**: Prevenir archivos grandes
- **Tipos permitidos**: Solo imágenes válidas

### Eliminación Segura
- **Confirmación obligatoria**: Modal de confirmación
- **Eliminación de archivos**: Limpiar archivos del servidor
- **Transacciones**: Operaciones atómicas
- **Logs**: Registro de operaciones importantes

## Ejemplos de Uso

### Eliminar Imagen
```bash
# 1. Usuario en formulario de edición
GET /editar-producto/1759199058461

# 2. Hace clic en "Eliminar Imagen"
confirmRemoveCurrentImage('1759199058461')

# 3. Confirma en modal
# 4. Envío de eliminación
POST /eliminar-imagen/1759199058461
Content-Type: application/json

# 5. Respuesta
{"success":true,"message":"Imagen eliminada exitosamente"}

# 6. Recarga automática
```

### Cambiar Imagen
```bash
# 1. Usuario selecciona nueva imagen
# 2. Vista previa se muestra
# 3. Envía formulario
POST /editar-producto/1759199058461
Content-Type: multipart/form-data

nombre=Notebook HP&descripcion=...&precio=450000&imagen=[ARCHIVO]

# 4. Redirección con éxito
GET /productos?success=edit
```

## Casos de Uso

### Caso 1: Producto sin imagen
- **Estado inicial**: Sin imagen
- **Acción**: Agregar imagen
- **Resultado**: Producto con imagen

### Caso 2: Producto con imagen
- **Estado inicial**: Con imagen
- **Acción**: Eliminar imagen
- **Resultado**: Producto sin imagen

### Caso 3: Cambio de imagen
- **Estado inicial**: Con imagen A
- **Acción**: Cambiar por imagen B
- **Resultado**: Producto con imagen B

### Caso 4: Mantener imagen
- **Estado inicial**: Con imagen
- **Acción**: Editar otros campos
- **Resultado**: Producto con misma imagen

## Mejoras Futuras

- [ ] **Múltiples imágenes**: Galería de imágenes por producto
- [ ] **Redimensionamiento**: Automático de imágenes grandes
- [ ] **Compresión**: Optimización de archivos
- [ ] **CDN**: Almacenamiento en la nube
- [ ] **Historial**: Versiones de imágenes
- [ ] **Filtros**: Efectos y mejoras de imagen
- [ ] **Drag & Drop**: Reordenar imágenes
- [ ] **Vista previa**: Modal con imagen grande


// Funciones globales para modales
function showModal(title, message, type = 'info') {
    const modal = createModal(title, message, type);
    document.body.appendChild(modal);

    // Mostrar modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Cerrar modal al hacer clic en el botón de cerrar
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Función para mostrar modal de confirmación
function showConfirmModal(title, message, onConfirm) {
    const modal = createConfirmModal(title, message, onConfirm);
    document.body.appendChild(modal);

    // Mostrar modal
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);

    // Cerrar modal al hacer clic en el botón de cerrar
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => {
        closeModal(modal);
    });

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
}

// Función para crear modal
function createModal(title, message, type) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    const iconClass = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-circle',
        'warning': 'fas fa-exclamation-triangle',
        'info': 'fas fa-info-circle'
    }[type] || 'fas fa-info-circle';

    const colorClass = {
        'success': 'success',
        'error': 'error',
        'warning': 'warning',
        'info': 'info'
    }[type] || 'info';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon ${colorClass}">
                <i class="${iconClass}"></i>
            </div>
            <h3 class="modal-title">${title}</h3>
            <p class="modal-message">${message}</p>
            <button class="modal-close btn btn-primary">
                <i class="fas fa-check"></i>
                Aceptar
            </button>
        </div>
    `;

    return modal;
}

// Función para crear modal de confirmación
function createConfirmModal(title, message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'modal';

    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-icon warning">
                <i class="fas fa-exclamation-triangle"></i>
            </div>
            <h3 class="modal-title">${title}</h3>
            <p class="modal-message">${message}</p>
            <div class="modal-actions">
                <button class="modal-close btn btn-secondary">
                    <i class="fas fa-times"></i>
                    Cancelar
                </button>
                <button class="btn btn-danger" onclick="confirmAction()">
                    <i class="fas fa-check"></i>
                    Confirmar
                </button>
            </div>
        </div>
    `;

    // Guardar la función de confirmación en el modal
    modal._onConfirm = onConfirm;

    return modal;
}

// Función para cerrar modal
function closeModal(modal) {
    modal.classList.remove('show');
    setTimeout(() => {
        if (modal.parentNode) {
            modal.parentNode.removeChild(modal);
        }
    }, 300);
}

// Función para confirmar acción
function confirmAction() {
    const modal = document.querySelector('.modal.show');
    if (modal && modal._onConfirm) {
        modal._onConfirm();
        closeModal(modal);
    }
}

// Función para formatear precio en pesos chilenos
function formatChileanPeso(amount) {
    return new Intl.NumberFormat('es-CL', {
        style: 'currency',
        currency: 'CLP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// Función para remover imagen seleccionada
function removeImage() {
    const fileInput = document.getElementById('imagen');
    const filePreview = document.getElementById('file-preview');

    if (fileInput && filePreview) {
        fileInput.value = '';
        filePreview.style.display = 'none';
    }
}

// Función para confirmar eliminación de producto
function confirmDeleteProduct(productId, productName) {
    showConfirmModal(
        'Confirmar Eliminación',
        `¿Estás seguro de que quieres eliminar el producto "${productName}"? Esta acción no se puede deshacer.`,
        function() {
            deleteProduct(productId);
        }
    );
}

// Función para eliminar producto
async function deleteProduct(productId) {
    try {
        const response = await fetch(`/eliminar-producto/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();

        if (result.success) {
            showModal(
                'Producto Eliminado',
                'El producto se ha eliminado exitosamente.',
                'success'
            );

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showModal(
                'Error al Eliminar',
                result.message || 'No se pudo eliminar el producto.',
                'error'
            );
        }
    } catch (error) {
        console.error('Error al eliminar producto:', error);
        showModal(
            'Error de Conexión',
            'No se pudo conectar con el servidor. Inténtalo de nuevo.',
            'error'
        );
    }
}

// Función para confirmar eliminación de imagen actual
function confirmRemoveCurrentImage(productId) {
    showConfirmModal(
        'Eliminar Imagen',
        '¿Estás seguro de que quieres eliminar la imagen actual? Esta acción no se puede deshacer.',
        function() {
            removeCurrentImage(productId);
        }
    );
}

// Función para eliminar imagen actual
async function removeCurrentImage(productId) {
    try {
        const response = await fetch(`/eliminar-imagen/${productId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        const result = await response.json();

        if (result.success) {
            showModal(
                'Imagen Eliminada',
                'La imagen se ha eliminado exitosamente.',
                'success'
            );

            setTimeout(() => {
                window.location.reload();
            }, 1500);
        } else {
            showModal(
                'Error al Eliminar Imagen',
                result.message || 'No se pudo eliminar la imagen.',
                'error'
            );
        }
    } catch (error) {
        console.error('Error al eliminar imagen:', error);
        showModal(
            'Error de Conexión',
            'No se pudo conectar con el servidor. Inténtalo de nuevo.',
            'error'
        );
    }
}

// Funcionalidad principal de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Toggle del menú móvil
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav');

    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
        });
    }

    // Animaciones suaves para los botones
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Validación del formulario de productos
    const productForm = document.querySelector('.product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            const nombre = document.getElementById('nombre').value.trim();
            const descripcion = document.getElementById('descripcion').value.trim();
            const precio = document.getElementById('precio').value;

            if (!nombre || !descripcion || !precio) {
                e.preventDefault();
                showModal('Error de Validación', 'Todos los campos son obligatorios', 'error');
                return;
            }

            const precioNumero = parseInt(precio.replace(/[^0-9]/g, ''));
            if (isNaN(precioNumero) || precioNumero <= 0) {
                e.preventDefault();
                showModal('Error de Validación', 'El precio debe ser un número positivo en pesos chilenos', 'error');
                return;
            }

            // Determinar si es edición o creación
            const isEdit = productForm.action.includes('/editar-producto/');
            const actionText = isEdit ? 'actualizar' : 'agregar';
            const confirmText = isEdit ? '¿Estás seguro de que quieres guardar los cambios?' : '¿Estás seguro de que quieres agregar este producto?';

            e.preventDefault();
            showConfirmModal(
                `Confirmar ${actionText.charAt(0).toUpperCase() + actionText.slice(1)}`,
                confirmText,
                function() {
                    productForm.submit();
                }
            );
        });
    }

    // Función para mostrar modal de éxito
    function showSuccessModal() {
        const urlParams = new URLSearchParams(window.location.search);
        const success = urlParams.get('success');

        if (success === 'true') {
            showModal(
                'Producto Agregado',
                'El producto se ha agregado exitosamente.',
                'success'
            );
        } else if (success === 'edit') {
            showModal(
                'Producto Actualizado',
                'El producto se ha actualizado exitosamente.',
                'success'
            );
        }
    }

    // Mostrar modal de éxito si hay parámetro en la URL
    showSuccessModal();

    // Manejo de vista previa de imagen
    const fileInput = document.getElementById('imagen');
    const filePreview = document.getElementById('file-preview');
    const previewImage = document.getElementById('preview-image');

    if (fileInput && filePreview && previewImage) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Validar tipo de archivo
                if (!file.type.startsWith('image/')) {
                    showModal('Error de Archivo', 'Por favor selecciona un archivo de imagen válido.', 'error');
                    this.value = '';
                    return;
                }

                // Validar tamaño de archivo (5MB)
                if (file.size > 5 * 1024 * 1024) {
                    showModal('Error de Archivo', 'La imagen es demasiado grande. El tamaño máximo permitido es 5MB.', 'error');
                    this.value = '';
                    return;
                }

                // Mostrar vista previa
                const reader = new FileReader();
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    filePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Formateo automático del precio
    const precioInput = document.getElementById('precio');
    if (precioInput) {
        precioInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/[^0-9]/g, '');
            if (value) {
                e.target.value = value;
            }
        });
    }
});

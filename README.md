# Ejercicio de Angular

## Pruebas

Para poder ejecutar las pruebas debemos ejecutar el comando `ng test`, el cual ejecutará los archivos *.spec.ts*, donde están definidas las pruebas utilizando el framework **Jasmine**.

Los casos de pruebas son los siguientes:

### **Formulario de login**
- Validación de Creación del componente.
- Validación de Campos Email y Password.
- Validación de conexión con el servicio de login.
- Validación de la redirección en caso correcto de autenticación.

### **Página de login**
- Validación de Creación del componente.
- Validación de muestra del Formulario de login.

### **Servicio de login**
- Validación de Creación del servicio.
- Validación de la funcionalidad de las funciones Login y Logout.

### **Guard de login**
- Validación de Creación del Guard.

### **Interceptor de login**
- Validación de Creación del interceptor.
- Validación de funcionalidad validando el Email y Password dummy.

### **Página de Productos**
- Validación de Creación del componente.
- Validación de conexión con el servicio de productos.
- Validación de obtención de productos.

### **Detalle del Producto**
- Validación de Creación del componente.

### **Lista de Productos**
- Validación de Creación del componente.
- Validación de muestra de los productos en la tabla.

### **Servicio de Productos**
- Validación de Creación del servicio.
- Validación de la función para obtener los productos desde la API.

# Gestión de Proyectos - Componente Vue 3 + Pinia + TypeScript

Este componente Vue 3 con Composition API y TypeScript permite gestionar proyectos mediante la creación, edición y eliminación de registros. Utiliza Pinia como store global para el manejo del estado.

## Características
- Crear, editar y eliminar proyectos.
- Asociar cliente, ejecutivo y contacto a cada proyecto.
- Validaciones básicas en el formulario.
- Modal de confirmación para eliminar proyectos.
- Uso de `useFetch` para obtener usuarios desde una API externa.

## Tecnologías Utilizadas
- Vue 3
- TypeScript
- Pinia
- Composition API
- Fetch API

## Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/tu_usuario/tu_repositorio.git
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

## Uso

1. Ejecutar el entorno de desarrollo:

   ```bash
   npm run dev
   ```

2. Acceder a `http://localhost:3000` en el navegador.

## Estructura del Componente

### Template
- Formulario para crear o editar proyectos.
- Listado de proyectos en tabla con botones de editar y eliminar.
- Modal de confirmación al eliminar un proyecto.

### Script
- Definición de tipos `Proyecto` y `User`.
- Uso del store `useProyectoStore` con Pinia.
- Fetch de usuarios mediante `useFetch`.
- Funciones para crear, editar, eliminar y limpiar formulario.

## Datos Simulados
La API utilizada en este ejemplo:
```url
https://apidev.unabase.cc/app/users/findUsers/ByNames?name=miguel
```


## Estilos
Se incluye un bloque `style scoped` en el componente que define estilos básicos con `CSS` para el formulario, tabla y modal.


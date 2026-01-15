# Notas

## Integrantes
* Jesus Romero
* Bruno Yauripoma

## Requisitos de Ejecución
se requiere:

* **Node.js**: Versión 18 LTS o superior.
* **MongoDB**: Instancia local ejecutándose en el puerto 27017.
* **Git**: Para el clonado del repositorio.
* **Visual Studio Code**: Entorno de desarrollo recomendado.

## Instalación y Configuración

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/jesusromeroa/Notas-proyecto.git](https://github.com/jesusromeroa/Notas-proyecto.git)
   cd ucab-tasks

2. Instalar dependencias: Ejecute el siguiente comando para instalar los paquetes necesarios:

npm install

Configuración de Base de Datos: El proyecto conecta por defecto a mongodb://localhost:27017/ucab-tasks. Asegúrese de que el servicio de MongoDB Community Server esté activo antes de iniciar la aplicación.

3. Ejecución del Servidor
Para iniciar el proyecto en modo de desarrollo (con recarga automática)

npm run start:dev

4. Documentación de la API
Se ha integrado Swagger para documentar los endpoints requeridos. Puede visualizar la especificación interactiva y probar las peticiones en la siguiente ruta:

Swagger UI: http://localhost:3000/api

5. Endpoints Principales
GET /notes: Obtiene el listado general de notas (sin contenido, permite filtros y ordenamiento).

GET /notes/:id: Obtiene el detalle completo de una nota específica.

POST /notes: Crea una nueva nota.

PATCH /notes/:id: Actualiza el título o contenido de una nota.

DELETE /notes: Elimina notas (acepta múltiples IDs).

6. Pruebas
El servidor cuenta con pruebas unitarias implementadas con Jest. Para ejecutarlas:

npm run test
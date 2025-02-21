# API + BACKEND

Applicación creada en Laravel v11.42.1 (PHP v8.2.4).

El propósito de este proyecto es practicar los conceptos:

-   Creación de una API REST
-   Laravel
-   Arquitectura MVC

Se hizo uso de

-   Aplicaciones de control de versión (GIT / GitHub)
-   MySQL
-   Eloquent ORM
-   Lineamientos para diseño de API REStFUL
-   HTTP (GET, POST, PUT, DELETE, status codes)
-   Prueba de endpoints (Postman)

## Endpoints

| URL                               | Acción | Operación | Descripción                                 | Exito | Error     |
| --------------------------------- | ------ | --------- | ------------------------------------------- | ----- | --------- |
| /api/users                        | GET    | READ      | Lista todos los usuarios                    | 200   | 400 / 404 |
| /api/user                         | POST   | CREATE    | Crea nuevo usuario                          | 201   | 400       |
| /api/user/{id}                    | GET    | READ      | Obtener un usuario único                    | 200   | 400 / 404 |
| /api/user/{id}                    | PUT    | UPDATE    | Actualizar un usuario único                 | 204   |           |
| /api/user/{id}                    | DELETE | DELETE    | Eliminar un usuario único                   | 200   |           |
| /api/user/email/{email}           | GET    | READ      | Obtener un usuario único basado en su email | 200   | 400/404   |
| /api/user/{userId}/tasks          | GET    | READ      | Obtener recursos basados en un ID           | 200   | 400 / 404 |
| /api/user/{userId}/tasks          | POST   | CREATE    | Crear un nuevo recurso según ID             | 201   | 400       |
| /api/user/{userId}/tasks/{taskId} | GET    | READ      | Mostrar un recurso específico según ID      | 200   | 400       |
| /api/user/{userId}/tasks{taskId}/ | PUT    | UPDATE    | Actualizar recurso especíífico              | 204   |           |
| /api/user/{userId}/tasks/{taskId} | DELETE | DELETE    | Eliminar recurso específco                  | 200   |           |

## Ejecutar programa

-   Verificar .env para conectar con MySQL
-   `php artisan serve`

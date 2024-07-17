# `Taskflow`

## `Tecnologías utilizadas`

[![](https://skillicons.dev/icons?i=ts,nodejs,express,npm,docker,mysql)](https://skillicons.dev)

## `Setup del proyecto`

Para levantar una instancia de MySQL y probar el backend, basta con ejecutar el comando `docker compose up -d` en bash. Con esto se levantará un container con MySQL previamente configurado.

Debe crear un `.env` en la ruta raíz del proyecto igual a este para configurar variables de entorno y poder conectarse a la base de datos:

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=password
DB_NAME=taskflow
```

Finalmente, ejecutando en la consola `npm run dev` se podrá conectar y el backend estará levantado en el puerto 3000

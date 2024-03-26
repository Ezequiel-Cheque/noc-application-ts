# Proyecto NOC

El objetivo es crear una serie de tareas usando Arquitectura Limpia con TypeScript


# dev
1. Clonar el archivo env.template
2. Configurar las variables de entorno
3. ejecutar npm i
4. ejecutar docker compose
```
docker compose up -d
```
5. setup Prisma ORM
```
npx prisma init --datasource-provider PostgreSQL
```
6. migrate postgres db
```
npx prisma migrate dev --name init
```
6. ejecutar npm run dev
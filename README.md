# SKC Backend

## Descripción

Backend para la aplicación

## Instalación

1. Clonar el repositorio
2. Instalar las dependencias

```bash
npm install
```

3. Crear el archivo .env y agregar las variables de entorno

4. Generar el prisma client

```bash
npm run generate
```

5. Iniciar el servidor

```bash
npm start:server
```

## Manejo de Migraciones Prisma

### Crear Nueva Tabla o Modificar Existente

1. **Modificar el Schema**

   - Agregar o modificar los modelos en `schema.prisma`
   - npx prisma db push

2. **Crear Migration**

```bash
# Crea una nueva migración con nombre descriptivo
npx prisma migrate dev --name nombre_descriptivo_migracion

# Ejemplos:
npx prisma migrate dev --name create_locations_table
npx prisma migrate dev --name add_status_to_users
npx prisma migrate dev --name update_product_fields
```

3. **Verificar Migration**

   - Revisar el archivo generado en `prisma/migrations`
   - Confirmar que los cambios son correctos

4. **Aplicar Migration**

```bash
# Aplica las migraciones pendientes
npx prisma migrate deploy
```

5. **Generar Cliente Prisma**

```bash
# Actualiza el cliente de Prisma con los nuevos cambios
npx prisma generate
```

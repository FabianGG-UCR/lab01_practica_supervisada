# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /usr/src/app

# Copiar archivos de dependencias y tsconfig
COPY package*.json tsconfig.json ./

# Instalar dependencias (incluye devDependencies para compilar TS)
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Stage 2: Runtime
FROM node:20-alpine

WORKDIR /usr/src/app

# Copiar package.json y lockfile
COPY package*.json ./

# Instalar solo dependencias de producción
RUN npm install --only=production

# Copiar los artefactos compilados desde el builder
COPY --from=builder /usr/src/app/dist ./dist

# Copiar cualquier archivo de configuración necesario en runtime
# COPY .env ./

# Exponer el puerto de Express
EXPOSE 3000

# Usar el script definido en package.json
CMD ["npm", "start"]

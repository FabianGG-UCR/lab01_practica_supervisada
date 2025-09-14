# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /

# Copiar archivos de dependencias y tsconfig
COPY package*.json tsconfig.json ./

# Instalar dependencias (incluye devDependencies para compilar TS)
RUN npm install

# Copiar el resto del código
COPY . .

# Compilar TypeScript
RUN npm run build

# Exponer el puerto de Express
EXPOSE 3005

# Usar el script definido en package.json
CMD ["npm", "start"]

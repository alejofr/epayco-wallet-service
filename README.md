# Digital Wallet Service

Un servicio de billetera digital basado en NestJS.

## Prerrequisitos

- [Node.js](https://nodejs.org/) (se recomienda la última versión LTS)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) y Docker Compose

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone <https://github.com/alejofr/epayco-wallet-service.git>
   cd epayco-wallet-service
   ```

2. **Instalar dependencias**

   ```bash
   pnpm install
   ```

## Configuración

1. **Variables de Entorno**

   Crea un archivo `.env` en el directorio raíz copiando el archivo de ejemplo:

   ```bash
   cp .env.example .env
   ```

   Abre el archivo `.env` y configura las variables.

   **Configuración Estándar:**
   ```ini
   APP_ENV=local
   PORT_SERVER=3001

   # Configuración de Base de Datos (coincide con docker-compose)
   MONGO_DB_HOST=localhost
   MONGO_DB_PORT=27017
   MONGO_DB_DBNAME=epaycowallets
   MONGO_DB_USERNAME=
   MONGO_DB_PASSWORD=
   ```

2. **Generar API Key de Resend (Obligatorio para el envío de correos)**

   Para que el servicio pueda enviar correos electrónicos (como códigos OTP, confirmaciones, etc.), es **obligatorio** configurar una API Key de Resend válida.

   - Ve a [Resend.com](https://resend.com/) y regístrate o inicia sesión.
   - Navega a **API Keys** en el panel de control.
   - Haz clic en **Create API Key**.
   - Asigna un nombre a tu clave (ej: "Digital Wallet Dev") y selecciona **Full Access** o acceso restringido de envío.
   - Copia la API Key generada.
   - Pégala en tu archivo `.env`:

   ```ini
   API_KEY_RESEND=re_123456789...
   EMAIL_NOT_REPLY=onboarding@resend.dev
   ```

   > [!WARNING]
   > **Información Importante sobre el Plan Gratuito (Free Tier) de Resend:**
   >
   > Si estás utilizando una cuenta gratuita de Resend, **SOLO** puedes enviar correos electrónicos a la dirección de correo con la que te registraste en Resend.
   >
   > - **Restricción**: El envío a cualquier otro correo electrónico fallará y la API retornará un error de autorización (403 Forbidden o similar).
   > - **Solución para Pruebas**: Asegúrate de usar tu propio correo (el registrado en Resend) como destinatario cuando pruebes el registro de usuarios o el envío de OTPs.
   > - **Solución para Producción**: Para enviar correos a cualquier destinatario, debes verificar un dominio propio en Resend y actualizar la configuración DNS correspondiente.
   >
   > Si intentas enviar un correo a un usuario distinto con la API Key gratuita, **NO FUNCIONARÁ**.

   > **Nota sobre el remitente**: Si no tienes un dominio personalizado configurado, debes usar `onboarding@resend.dev` como la dirección `EMAIL_NOT_REPLY`, de lo contrario, el envío también fallará.

## Configuración de Base de Datos

Inicia la instancia de MongoDB usando Docker Compose:

```bash
docker-compose up -d
```

Esto iniciará MongoDB en el puerto `27017` como se define en `docker-compose.yml`.

## Ejecutando la Aplicación

1. **Modo Desarrollo**

   ```bash
   pnpm run start:dev
   ```

2. **Modo Producción**

   ```bash
   pnpm run build
   pnpm run start:prod
   ```

## Uso

Una vez en ejecución, el servicio estará disponible en `http://localhost:3001/api`.

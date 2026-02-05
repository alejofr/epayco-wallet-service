# Digital Wallet Service

A NestJS-based digital wallet service.

## Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [pnpm](https://pnpm.io/)
- [Docker](https://www.docker.com/) & Docker Compose

## Installation

1. **Clone the repository**

   ```bash
   git clone <https://github.com/alejofr/epayco-wallet-service.git>
   cd epayco-wallet-service
   ```

2. **Install dependencies**

   ```bash
   pnpm install
   ```

## Configuration

1. **Environment Variables**

   Create a `.env` file in the root directory by copying the example file:

   ```bash
   cp .env.example .env
   ```

   Open `.env` and configure the variables.

   **Standard Configuration:**
   ```ini
   APP_ENV=local
   PORT_SERVER=3001

   # Database Configuration (matches docker-compose)
   MONGO_DB_HOST=localhost
   MONGO_DB_PORT=27017
   MONGO_DB_DBNAME=epaycowallets
   MONGO_DB_USERNAME=
   MONGO_DB_PASSWORD=
   ```

2. **Generate Resend API Key**

   To send emails (OTP, etc.), you need a Resend API key.

   - Go to [Resend.com](https://resend.com/) and sign up or log in.
   - Navigate to **API Keys** in the dashboard.
   - Click **Create API Key**.
   - Name your key (e.g., "Digital Wallet Dev") and select **Full Access** or restricted sending access.
   - Copy the generated API Key.
   - Paste it into your `.env` file:

   ```ini
   API_KEY_RESEND=re_123456789...
   EMAIL_NOT_REPLY=onboarding@resend.dev
   ```
   > Note: If you don't have a custom domain set up in Resend, use `onboarding@resend.dev` as the `EMAIL_NOT_REPLY` address to send to your verified email.

## Database Setup

Start the MongoDB instance using Docker Compose:

```bash
docker-compose up -d
```

This will start MongoDB on port `27017` as defined in `docker-compose.yml`.

## Running the Application

1. **Development Mode**

   ```bash
   pnpm run start:dev
   ```

2. **Production Mode**

   ```bash
   pnpm run build
   pnpm run start:prod
   ```

## Usage

Once running, the service will be available at `http://localhost:3001/api`.

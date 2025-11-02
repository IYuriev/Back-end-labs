## 📋 Lab 3

**Group number:** 24

**Calculating variant:** 24 % 3 = 0

**Variant:** Облік доходів

## 🚀 Run Locally

1. Clone the repository:

```bash
git clone https://github.com/IYuriev/Back-end-labs.git

cd back-end-labs
```

2. Go to the desired branch

```bash
git checkout lab-3
```

3. Install dependencies

```bash
npm install
```

4. Set up environment variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=finance_db
PORT=3000
```

5. Start the database

```bash
docker-compose up db
```

6. Generate and run migrations (first time only)

```bash
# Generate initial migration based on entities
npm run migration:generate -- src/migrations/InitialMigration

# Run migrations
npm run migration:run
```

7. Run the server

```bash
npm run start:dev
```

8. Access the healthcheck endpoint: http://localhost:3000/healthcheck

##### Response example:

```
{
  "status": "ok",
  "date": "2025-10-05T12:00:00.000Z"
}
```

## 🐳 Run with Docker

1. Build and start the container:

```
docker-compose up --build
```

## 📊 Database Migrations

This project uses TypeORM migrations for database schema management.

### Available Commands

```bash
npm run migration:generate -- src/migrations/MigrationName

npm run migration:create -- src/migrations/MigrationName

npm run migration:run

npm run migration:revert

npm run migration:show
```

### How to work with migrations

1. **First time setup:**

   ```bash
   # Start database
   docker-compose up db

   # Generate initial migration
   npm run migration:generate -- src/migrations/InitialMigration

   # Run migration
   npm run migration:run

   # Start app
   npm run start:dev
   ```

## 🌐 Deployment

https://back-end-labs-j4ko.onrender.com/healthcheck

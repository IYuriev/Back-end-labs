## 🚀 Run Locally

1. Clone the repository:

```bash
git clone https://github.com/IYuriev/Back-end-labs.git

cd back-end-labs
```

2. Go to the desired branch 

```bash
git checkout lab-n
```

3. Install dependencies

```bash
npm install
```

4. Run the server

```bash
npm run start
```

5. Access the healthcheck endpoint: http://localhost:3000/healthcheck

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

## 🌐 Deployment

https://back-end-labs-j4ko.onrender.com/healthcheck
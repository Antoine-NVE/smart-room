# Smart Room

## Getting Started

### 1. Set Up Environment Variables

Copy the example environment files:

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
cp backend/.env.example backend/.env
```

The root `.env` file lets you adjust application ports and some Docker Compose settings.
Useful when configuring your local development environment.

---

### 2. Start the Stack

Start the full development stack:

```bash
docker compose up
```

By default, Docker will load `compose.local.yaml`, already configured for local development.

Default ports:

* **Frontend:** `5173` (or `4173` for Vite preview)
* **Backend:** `3000`
* **pgAdmin:** `5050`

All port mappings are defined in the root `.env`.

#### Frontend Preview (Vite)

If you want to run a Vite preview build:

##### 1. Make sure the container is running (`docker compose up`).
##### 2. Enter the frontend container:

```bash
docker exec -it <frontend-container> bash
```

##### 3. Run:

```bash
npm run build
npm run preview
```

The preview port is already defined in `.env`, and routed automatically via Docker.

---

### 3. Node Modules & the IDE

Your IDE may complain about missing dependencies because `node_modules` exist only inside the containers.

To provide editor support, install them locally:

```bash
cd frontend && npm install
cd ../backend && npm install
```

These local installations are *only* for your IDE — the app always uses the container versions.

---

## Installing New Packages

Always install new dependencies **inside the appropriate container**, not on your host machine.

### 1. List containers:

```bash
docker ps
```

### 2. Enter a container:

```bash
docker exec -it <container-name> bash
```

### 3. Install packages:

```bash
npm install <package-name>
```

---

## Optional: Custom Container Names

If you prefer simpler container names:

1. Create a `compose.override.yaml`.
2. Follow the instructions in `.env.example` to enable it.
3. Define custom container names:

```yaml
services:
  backend:
    container_name: backend
  frontend:
    container_name: frontend
```

Container names must be **unique on your machine**.

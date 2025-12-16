# Baasix Sample Application

This is a sample project demonstrating how to deploy Baasix using the `@tspvivek/baasix` npm package.

## Quick Start

```bash
# Install dependencies
npm install

# Copy environment file and configure
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm start
```

## Project Structure

```
my-baasix-app/
├── server.js              # Main entry point
├── package.json           # Dependencies
├── .env                   # Environment configuration
├── .env.example           # Example environment file
├── .env.production        # Production environment template
├── extensions/            # Custom extensions (optional)
│   ├── baasix-hook-*/     # Hook extensions
│   └── baasix-endpoint-*/ # Endpoint extensions
├── uploads/               # Local file storage (created automatically)
└── deployment/            # Deployment configurations
    ├── docker/            # Docker deployment files
    ├── pm2/               # PM2 deployment files
    └── k8s/               # Kubernetes deployment files
```

## Deployment Options

### 1. Manual Deployment
See `deployment/manual/README.md`

### 2. Docker Deployment
See `deployment/docker/README.md`

### 3. PM2 Deployment
See `deployment/pm2/README.md`

### 4. Kubernetes Deployment
See `deployment/k8s/README.md`

## Creating Extensions

### Hook Extension

Create `extensions/baasix-hook-example/index.js`:

```javascript
import { ItemsService } from "@tspvivek/baasix";

export default (hooksService, context) => {
  hooksService.registerHook("posts", "items.create", async ({ data, accountability }) => {
    data.created_by = accountability.user.id;
    data.created_at = new Date();
    return { data };
  });
};
```

### Endpoint Extension

Create `extensions/baasix-endpoint-example/index.js`:

```javascript
import { APIError } from "@tspvivek/baasix";

const registerEndpoint = (app, context) => {
  app.get("/custom-endpoint", async (req, res, next) => {
    try {
      if (!req.accountability || !req.accountability.user) {
        throw new APIError("Unauthorized", 401);
      }
      res.json({ message: "Hello from custom endpoint!" });
    } catch (error) {
      next(error);
    }
  });
};

export default {
  id: "custom-endpoint",
  handler: registerEndpoint,
};
```

## Environment Variables

See `.env.example` for all available configuration options.

## Documentation

For full documentation, visit: https://baasix.com/docs

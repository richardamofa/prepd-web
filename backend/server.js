require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const authRoutes = require("./src/routes/authRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");

const productsRoutes = require(
  "./src/routes/productsRoutes",
);

const customizationsRoutes = require(
  "./src/routes/customizationsRoutes",
);

const ordersRoutes = require(
  "./src/routes/ordersRoutes",
);

const app = express();



if (!process.env.JWT_SECRET) {
  throw new Error(
    "JWT_SECRET is missing from environment variables",
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is missing from environment variables",
  );
}

const allowedOrigins = process.env.FRONTEND_URL
  ? process.env.FRONTEND_URL.split(",").map((origin) =>
      origin.trim(),
    )
  : [];

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  }),
);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an origin.
      // Useful for Postman, server-to-server requests, etc.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS"),
      );
    },

    credentials: true,
  }),
);

app.use(
  express.json({
    limit: "10kb",
  }),
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10kb",
  }),
);


const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 10,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },

  standardHeaders: true,
  legacyHeaders: false,
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "PREP'D API is running",
  });
});

app.use(
  "/api/auth/login",
  loginLimiter,
);

/*console.log({
  authRoutes,
  productsRoutes,
  customizationsRoutes,
  ordersRoutes,
  errorMiddleware,
});*/

app.use(
  "/api/auth",
  authRoutes,
);

app.use(
  "/api/products",
  productsRoutes,
);

app.use(
  "/api/customizations",
  customizationsRoutes,
);

app.use(
  "/api/orders",
  ordersRoutes,
);

app.use(errorMiddleware);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `🕷️  Server running on port ${PORT}`,
  );
});

const gracefulShutdown = async (signal) => {
  console.log(
    `${signal} received. Shutting down gracefully...`,
  );

  server.close(async () => {
    const prisma = require("./src/config/prisma");

    await prisma.$disconnect();

    console.log("Server closed");

    process.exit(0);
  });
};

process.on(
  "SIGTERM",
  () => gracefulShutdown("SIGTERM"),
);

process.on(
  "SIGINT",
  () => gracefulShutdown("SIGINT"),
);
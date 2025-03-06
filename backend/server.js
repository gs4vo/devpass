require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD ? '********' : 'NÃO DEFINIDO');
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);

const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const authRoutes = require("./routes/authRoutes");
const passwordRoutes = require("./routes/passwordRoutes");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5003;

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Password Manager API",
      version: "1.0.0",
      description: "API para gerenciar senhas com funcionalidades de criação, leitura, atualização e remoção de senhas",
    },
    host: `localhost:${PORT}`,
    basePath: "/",
  },
  apis: ["./routes/*.js"], // Caminho para as rotas
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Usar Swagger como documentação da API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(bodyParser.json());

app.use("/auth", authRoutes);
app.use("/passwords", passwordRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

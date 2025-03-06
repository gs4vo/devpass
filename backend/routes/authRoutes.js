/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     description: Faz login de um usuário autenticado
 *     parameters:
 *       - in: body
 *         name: login
 *         description: Detalhes do login do usuário
 *         schema:
 *           type: object
 *           required:
 *             - username
 *             - password
 *           properties:
 *             username:
 *               type: string
 *               example: "usuario1"
 *             password:
 *               type: string
 *               example: "senha123"
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Erro de autenticação
 */

const express = require("express");
const router = express.Router();

// Exemplo de rota de login
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Lógica de autenticação aqui (simulada)
  if (username === "usuario1" && password === "senha123") {
    return res.status(200).json({ message: "Login realizado com sucesso!" });
  } else {
    return res.status(400).json({ message: "Erro de autenticação" });
  }
});

module.exports = router;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

const AuthController = {
  register: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.create(username, password);
      res
        .status(201)
        .json({ message: "Usuário registrado com sucesso.", user });
    } catch (error) {
      res.status(400).json({ error: "Erro ao registrar usuário." });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      console.log(user.password);
      console.log(password);

      const passwordA = user.password;

      const isMatch = await bcrypt.compare(password, passwordA);

      if (!isMatch) {
        return res.status(404).json({ error: "Credenciais inválidas." });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      return res.status(200).json({ message: "Login bem-sucedido.", token: token, user: user.username});
    } catch (error) {
      res.status(500).json({ error: "Erro ao realizar login." });
    }
  },
};

module.exports = AuthController;

const connection = require("../config/db");

const User = {
  create: (email, passwordHash, callback) => {
    const query = "INSERT INTO users (email, password_hash) VALUES (?, ?)";
    connection.query(query, [email, passwordHash], callback);
  },
  findByEmail: (email, callback) => {
    const query = "SELECT * FROM users WHERE email = ?";
    connection.query(query, [email], callback);
  },
};

module.exports = User;

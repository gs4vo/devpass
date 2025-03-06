const connection = require("../config/db");

const Password = {
  create: (userId, application, encryptedPassword, callback) => {
    const query = "INSERT INTO passwords (user_id, application, encrypted_password) VALUES (?, ?, ?)";
    connection.query(query, [userId, application, encryptedPassword], callback);
  },
  getAllByUserId: (userId, callback) => {
    const query = "SELECT * FROM passwords WHERE user_id = ?";
    connection.query(query, [userId], callback);
  },
};

module.exports = Password;

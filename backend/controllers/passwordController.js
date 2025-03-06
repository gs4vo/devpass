const argon2 = require("argon2");
const Password = require("../models/Password");
const aes256 = require("aes256");

const encryptPassword = (password, masterKey) => {
  const cipher = aes256.createCipher(masterKey);
  return cipher.encrypt(password);
};

const decryptPassword = (encryptedPassword, masterKey) => {
  const decipher = aes256.createDecipher(masterKey);
  return decipher.decrypt(encryptedPassword);
};

const storePassword = (req, res) => {
  const { application, password, masterKey } = req.body;

  const encryptedPassword = encryptPassword(password, masterKey);

  Password.create(req.user.id, application, encryptedPassword, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error storing password" });
    }
    res.status(201).json({ message: "Password saved successfully" });
  });
};

const getPasswords = (req, res) => {
  Password.getAllByUserId(req.user.id, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error retrieving passwords" });
    }

    const passwords = result.map((password) => ({
      application: password.application,
      password: decryptPassword(password.encrypted_password, req.user.masterKey),
    }));

    res.status(200).json(passwords);
  });
};

module.exports = { storePassword, getPasswords };

const mongoose = require("mongoose");

const LoginAdminSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
  },
  {
    collection: "LoginAdmin"
  }
);

module.exports = mongoose.model(
  "LoginAdmin",
  LoginAdminSchema
);
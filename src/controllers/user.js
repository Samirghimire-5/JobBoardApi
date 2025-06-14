const User = require("../models/user");

module.exports = {
  RegisterUser: async (req, res) => {
    try {
      const response = await User.Register(req.body);
      res.status(response.status).json({
        message: response.message,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },

  LoginUser: async (req, res) => {
    try {
      const response = await User.LoginUser(req.body);
      res.status(response.status).json({
        message: response.message,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  },
};

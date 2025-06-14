const User = require("../models/user");

module.exports = {
  RegisterUser: async (req, res) => {
    try {
      const response = await User.register(req.body);
      res.json({
        status: response.status,
        message: response.message,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  },

  LoginUser: async (req, res) => {
    try {
      const response = await User.login(req.body);
      res.json({
        status: response.status,
        message: response.message,
        token: response.token,
      });
    } catch (error) {
      res.json({
        status: error.status || 500,
        message: error.message,
      });
    }
  },
};

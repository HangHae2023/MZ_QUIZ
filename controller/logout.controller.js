






const LogoutService = require('../services/logout.service');
const { InvalidParamsError } = require('../exceptions/index.exception');

class LoginController {
  constructor() {
    this.logoutService = new LogoutService(); 
  }

  logout = async (req, res) => {
    try {
      const userId = req.user.id; // assuming the user ID is stored in the request object
      await this.authService.logout(userId);
      res.status(200).json({ message: "Logout successful" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
  };

}



module.exports = LoginController;
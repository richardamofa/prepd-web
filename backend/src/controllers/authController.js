const authService = require("../services/authService");
const activityService = require("../services/adminActivityService");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const result = await authService.loginAdmin(
      email,
      password,
    );

    await activityService.recordActivity({
      type: "ADMIN_LOGIN",
      title: "Admin signed in",
      description: `${result.admin.name || result.admin.email} signed in to the admin panel.`,
      adminId: result.admin.id,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentAdmin = async (req, res, next) => {
  try {
    const admin = await authService.getAdminById(
      req.admin.id,
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found",
      });
    }

    res.status(200).json({
      success: true,
      data: admin,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  login,
  getCurrentAdmin,
};
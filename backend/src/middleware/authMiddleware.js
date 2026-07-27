const {
  verifyToken,
} = require("../utils/jwt");

const prisma = require("../config/prisma");

const protect = async (
  req,
  res,
  next,
) => {
  try {
    const authHeader =
      req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer ",
      )
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }

    const token =
      authHeader.substring(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message:
          "Authentication required",
      });
    }

    const decoded =
      verifyToken(token);

    const admin =
      await prisma.adminUser.findUnique({
        where: {
          id: decoded.id,
        },

        select: {
          id: true,
          email: true,
          name: true,
        },
      });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message:
          "Admin account not found",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message:
        "Invalid or expired token",
    });
  }
};

module.exports = {
  protect,
};
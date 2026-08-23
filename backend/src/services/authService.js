const prisma = require("../config/prisma");

const {
  comparePassword,
} = require("../utils/password");

const {
  generateToken,
} = require("../utils/jwt");

const AppError = require("../utils/AppError");

const loginAdmin = async (
  email,
  password,
) => {
  const normalizedEmail =
    email.trim().toLowerCase();

  const admin =
    await prisma.adminUser.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

  if (!admin) {
    throw new AppError(
      "Invalid email or password",
      401,
    );
  }

  if (!admin.isActive) {
    throw new AppError("Invalid email or password", 401);
  }

  const passwordIsValid =
    await comparePassword(
      password,
      admin.password,
    );

  if (!passwordIsValid) {
    throw new AppError(
      "Invalid email or password",
      401,
    );
  }

  const token = generateToken(admin);

  return {
    token,

    admin: {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
  };
};

const getAdminById = async (
  adminId,
) => {
  return prisma.adminUser.findUnique({
    where: {
      id: adminId,
    },

    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
    },
  });
};

module.exports = {
  loginAdmin,
  getAdminById,
};
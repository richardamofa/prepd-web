const jwt = require("jsonwebtoken");

const generateToken = (admin) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured",
    );
  }

  return jwt.sign(
    {
      id: admin.id,
      email: admin.email,
    },

    process.env.JWT_SECRET,

    {
      expiresIn:
        process.env.JWT_EXPIRES_IN || "7d",

      issuer: "prepd-api",

      audience: "prepd-admin",
    },
  );
};

const verifyToken = (token) => {
  if (!process.env.JWT_SECRET) {
    throw new Error(
      "JWT_SECRET is not configured",
    );
  }

  return jwt.verify(
    token,
    process.env.JWT_SECRET,
    {
      issuer: "prepd-api",
      audience: "prepd-admin",
    },
  );
};

module.exports = {
  generateToken,
  verifyToken,
};
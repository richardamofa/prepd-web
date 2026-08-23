const AppError = require("./AppError");

const text = (value, field, { required = true, max = 500 } = {}) => {
  if (value === undefined || value === null || value === "") {
    if (required) throw new AppError(`${field} is required`, 400);
    return null;
  }
  if (typeof value !== "string" || value.trim().length > max) {
    throw new AppError(`${field} is invalid`, 400);
  }
  return value.trim();
};

const email = (value) => {
  const normalized = text(value, "Email", { max: 254 }).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new AppError("Email is invalid", 400);
  }
  return normalized;
};

const phone = (value, required = true) => {
  const normalized = text(value, "Phone", { required, max: 30 });
  if (normalized && !/^\+?[0-9\s().-]{7,30}$/.test(normalized)) {
    throw new AppError("Phone is invalid", 400);
  }
  return normalized;
};

const cuid = (value, field = "ID") => {
  const normalized = text(value, field, { max: 40 });
  if (!/^[a-zA-Z0-9_-]+$/.test(normalized)) throw new AppError(`${field} is invalid`, 400);
  return normalized;
};

const pagination = (query) => {
  const page = Math.max(1, Number.parseInt(query.page || "1", 10));
  const pageSize = Math.min(100, Math.max(1, Number.parseInt(query.pageSize || "20", 10)));
  if (!Number.isInteger(page) || !Number.isInteger(pageSize)) throw new AppError("Pagination is invalid", 400);
  return { page, pageSize, skip: (page - 1) * pageSize };
};

module.exports = { text, email, phone, cuid, pagination };
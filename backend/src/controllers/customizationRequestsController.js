const service = require("../services/customizationRequestsService");
const { Prisma } = require("@prisma/client");
const { text, email, phone, cuid, pagination } = require("../utils/validation");
const AppError = require("../utils/AppError");
const validStatuses = ["PENDING", "REVIEWING", "QUOTED", "APPROVED", "IN_PROGRESS", "COMPLETED", "REJECTED", "CANCELLED"];

const create = async (req, res, next) => {
  try {
    const body = req.body || {};
    const result = await service.createRequest({
      customerName: text(body.customerName, "Customer name", { max: 120 }),
      customerEmail: email(body.customerEmail),
      customerPhone: phone(body.customerPhone, false),
      productId: body.productId ? cuid(body.productId, "Product ID") : null,
      request: text(body.request, "Request", { max: 5000 }),
      budget: body.budget === undefined || body.budget === "" ? null : (() => {
        if (!/^\d+(\.\d{1,2})?$/.test(String(body.budget)) || Number(body.budget) > 100000000) throw new AppError("Budget is invalid", 400);
        return new Prisma.Decimal(body.budget);
      })(),
    });
    res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
};

const list = async (req, res, next) => {
  try {
    const { page, pageSize, skip } = pagination(req.query);
    const data = await service.listRequests({ page, pageSize, skip, search: req.query.search?.trim(), status: req.query.status, productId: req.query.productId });
    res.json({ success: true, ...data });
  } catch (error) { next(error); }
};

const get = async (req, res, next) => {
  try { const data = await service.getRequest(cuid(req.params.id)); if (!data) return res.status(404).json({ success: false, message: "Customization request not found" }); res.json({ success: true, data }); } catch (error) { next(error); }
};

const update = async (req, res, next) => {
  try {
    const data = {};
    if (req.body.status !== undefined) { if (!validStatuses.includes(req.body.status)) throw new AppError("Status is invalid", 400); data.status = req.body.status; }
    if (req.body.adminNotes !== undefined) data.adminNotes = req.body.adminNotes ? text(req.body.adminNotes, "Admin notes", { required: false, max: 5000 }) : null;
    if (req.body.assignedToId !== undefined) data.assignedToId = req.body.assignedToId ? cuid(req.body.assignedToId, "Assigned admin ID") : null;
    const result = await service.updateRequest(cuid(req.params.id), data);
    res.json({ success: true, data: result });
  } catch (error) { next(error); }
};

const remove = async (req, res, next) => { try { await service.deleteRequest(cuid(req.params.id)); res.json({ success: true, message: "Customization request deleted" }); } catch (error) { next(error); } };
module.exports = { create, list, get, update, remove };
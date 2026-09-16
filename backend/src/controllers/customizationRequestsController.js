const service = require("../services/customizationRequestsService");
const { sendCustomizationRequestConfirmationEmail, sendCustomizationCompletionEmail, sendAdminCustomizationRequestNotificationEmail } = require("../services/emailService");
const { Prisma } = require("@prisma/client");
const { text, email, phone, cuid, pagination } = require("../utils/validation");
const AppError = require("../utils/AppError");
const validStatuses = ["PENDING", "REVIEWING", "QUOTED", "APPROVED", "IN_PROGRESS", "COMPLETED", "REJECTED", "CANCELLED"];
const activityService = require("../services/adminActivityService");

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
    await activityService.recordActivity({ type: "CUSTOMIZATION_REQUEST_CREATED", title: "New customization request", description: `${result.reference} was submitted by ${result.customerName}.`, entityType: "customization-request", entityId: result.id });
    try {
      await sendCustomizationRequestConfirmationEmail(result);
    } catch (emailError) {
      console.error("Customization request confirmation email failed:", emailError);
    }
    try {
      await sendAdminCustomizationRequestNotificationEmail(result);
    } catch (emailError) {
      console.error("Admin customization request notification email failed:", emailError);
    }
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
    const updateResult = await service.updateRequest(cuid(req.params.id), data, { includeTransition: true });
    if (!updateResult) return res.status(404).json({ success: false, message: "Customization request not found" });
    if (updateResult.completionTransition) {
      try {
        await sendCustomizationCompletionEmail(updateResult.request);
      } catch (emailError) {
        console.error("Customization completion email failed:", emailError);
      }
    }
    res.json({ success: true, data: updateResult.request });
  } catch (error) { next(error); }
};

const remove = async (req, res, next) => { try { const id = cuid(req.params.id); await service.deleteRequest(id); await activityService.recordActivity({ type: "CUSTOMIZATION_REQUEST_DELETED", title: "Customization request deleted", description: `Customization request ${id} was deleted.`, entityType: "customization-request", entityId: id, adminId: req.admin.id }); res.json({ success: true, message: "Customization request deleted" }); } catch (error) { next(error); } };
module.exports = { create, list, get, update, remove };
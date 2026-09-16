const activityService = require("../services/adminActivityService");

const list = async (req, res, next) => {
  try {
    const data = await activityService.listActivities({ pageSize: req.query.limit });
    res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

module.exports = { list };
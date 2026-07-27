const customizationsService = require(
  "../services/customizationsService",
);

const getCustomizations = async (
  req,
  res,
  next,
) => {
  try {
    const customizations =
      await customizationsService
        .getAllCustomizations();

    res.status(200).json({
      success: true,
      data: customizations,
    });
  } catch (error) {
    next(error);
  }
};

const getCustomization = async (
  req,
  res,
  next,
) => {
  try {
    const customization =
      await customizationsService
        .getCustomizationById(req.params.id);

    if (!customization) {
      return res.status(404).json({
        success: false,
        message: "Customization item not found",
      });
    }

    res.status(200).json({
      success: true,
      data: customization,
    });
  } catch (error) {
    next(error);
  }
};

const createCustomization = async (
  req,
  res,
  next,
) => {
  try {
    const customization =
      await customizationsService
        .createCustomization(req.body);

    res.status(201).json({
      success: true,
      message:
        "Customization item created successfully",
      data: customization,
    });
  } catch (error) {
    next(error);
  }
};

const updateCustomization = async (
  req,
  res,
  next,
) => {
  try {
    const customization =
      await customizationsService
        .updateCustomization(
          req.params.id,
          req.body,
        );

    res.status(200).json({
      success: true,
      message:
        "Customization item updated successfully",
      data: customization,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCustomization = async (
  req,
  res,
  next,
) => {
  try {
    await customizationsService
      .deleteCustomization(req.params.id);

    res.status(200).json({
      success: true,
      message:
        "Customization item deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCustomizations,
  getCustomization,
  createCustomization,
  updateCustomization,
  deleteCustomization,
};
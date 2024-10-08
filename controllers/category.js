const Category = require('../models/category');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.categoryById = async (req, res, next, id) => {
  try {
    const category = await Category.findById(id).exec();
    if (!category) {
      return res.status(400).json({
        error: "Category doesn't exist",
      });
    }
    req.category = category;
    next();
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.create = async (req, res) => {
  const category = new Category(req.body);
  try {
    const data = await category.save();
    res.json({ data });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.read = (req, res) => {
  return res.json(req.category);
};

exports.update = async (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  try {
    const data = await category.save();
    res.json(data);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.remove = async (req, res) => {
  const category = req.category;
  try {
    await category.remove();
    res.json({
      message: 'Category deleted',
    });
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

exports.list = async (req, res) => {
  try {
    const data = await Category.find().exec();
    res.json(data);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler(err),
    });
  }
};

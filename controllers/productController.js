import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, sku } = req.body;

    if (!name || !sku) {
      return res.status(400).json({
        success: false,
        message: "Name and SKU are required.",
      });
    }

    const existingProduct = await Product.findOne({
      sku: sku.toUpperCase(),
    });

    if (existingProduct) {
      return res.status(409).json({
        success: false,
        message: "SKU already exists.",
      });
    }

    const product = await Product.create({
      name,
      sku: sku.toUpperCase(),
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    return res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }};
export const updateProduct = async (req, res) => {
  try {
    const { name, sku } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    if (sku && sku.toUpperCase() !== product.sku) {
      const existing = await Product.findOne({
        sku: sku.toUpperCase(),
      });

      if (existing) {
        return res.status(409).json({
          success: false,
          message: "SKU already exists.",
        });
      }
    }

    product.name = name || product.name;
    product.sku = sku ? sku.toUpperCase() : product.sku;

    await product.save();

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    await product.deleteOne();

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};





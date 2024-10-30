const { readJsonFile, writeJsonFile } = require("../utils/fileUtils");

const getAllProducts = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const products = data.products || [];

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const paginatedProducts = products.slice((page - 1) * limit, page * limit);
    const totalProducts = products.length;

    res.header(
      "Content-Range",
      `products ${page * limit - limit}-${Math.min(
        page * limit,
        totalProducts
      )}/${totalProducts}`
    );

    res.json({
      data: paginatedProducts,
      total: totalProducts,
    });
  } catch (err) {
    console.error("Error reading database file:", err);
    res.status(500).send("Error reading database file");
  }
};
// Get product by ID
const getProductById = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const products = data.products || [];
    const product = products.find((p) => p.id == req.params.id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).send("Error reading database file");
  }
};

// Add a new product
const createProduct = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const products = data.products || [];

    const newProduct = req.body;
    newProduct.id =
      products.length > 0 ? products[products.length - 1].id + 1 : 1;

    products.push(newProduct);
    data.products = products;

    await writeJsonFile("db.json", data);

    res.status(201).json(newProduct);
  } catch (err) {
    console.error("Error writing to JSON file:", err);
    res.status(500).send("Error writing to database file");
  }
};

const updateProduct = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const products = data.products || [];

    const productIndex = products.findIndex((p) => p.id == req.params.id);

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    const updatedProduct = { ...products[productIndex], ...req.body };

    products[productIndex] = updatedProduct;

    const updatedData = { ...data, products };

    await writeJsonFile("db.json", updatedData);

    res.json(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err); // Log the error
    res.status(500).send("Error updating product");
  }
};

const deleteProduct = async (req, res) => {
  try {
    const data = await readJsonFile("db.json");
    const products = data.products || [];

    const productIndex = products.findIndex((p) => p.id == req.params.id);

    if (productIndex === -1) {
      return res.status(404).json({ error: "Product not found" });
    }

    products.splice(productIndex, 1);

    await writeJsonFile("db.json", { ...data, products });

    res.status(204).send();
  } catch (err) {
    res.status(500).send("Error deleting product");
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

const express = require("express");
const cors = require("cors");
const app = express();
const productRoutes = require("./routes/product.route");
const userRoutes = require("./routes/user.route");

app.use(cors());
app.use(express.json());

app.use("/products", productRoutes);
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server is running on http://localhost:${PORT}`);
});

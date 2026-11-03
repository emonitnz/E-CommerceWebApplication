import express from "express";
import cors from "cors";

import productsRouter from "./resources/products.js";
import ordersRouter from "./resources/orders.js";

// Create the Express application.
const app = express();

// Allow the React frontend to communicate with this API.
app.use(cors());

// Convert incoming JSON request data into a format Express can read.
app.use(express.json());

// Connect the product and order routes to the main application.
app.use("/products", productsRouter);
app.use("/orders", ordersRouter);

// A simple route to check whether the API is running.
app.get("/", (req, res) => {
  res.send("Ecommerce API running");
});

// Start the server and listen for requests on port 3000.
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

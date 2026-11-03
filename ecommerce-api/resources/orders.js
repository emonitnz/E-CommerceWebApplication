import express from "express";
import fs from "fs";

const router = express.Router();

// Keep the location of the orders data file in one place.
const ORDERS_FILE = "./data/orders.json";

// Read existing orders from the JSON file.
function loadOrders() {
  const data = fs.readFileSync(ORDERS_FILE, "utf-8");
  return JSON.parse(data);
}

// Save the updated order list back to the JSON file.
function saveOrders(orders) {
  fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));
}

// Generate the next order ID based on the highest existing ID.
function getNextOrderId(orders) {
  if (orders.length === 0) {
    return 1;
  }

  const highestId = Math.max(...orders.map((order) => order.id));
  return highestId + 1;
}

// Return all orders currently stored in the JSON file.
router.get("/", (req, res) => {
  const orders = loadOrders();

  res.json(orders);
});

// Receive a new order from the checkout form and save it.
router.post("/", (req, res) => {
  const orders = loadOrders();

  // Create a new order using the customer and cart details
  // received from the frontend.
  const newOrder = {
    id: getNextOrderId(orders),
    customer: req.body.customer,
    items: req.body.items,
    total: req.body.total,
  };

  // Add the new order to the existing order list.
  orders.push(newOrder);

  // Save the updated list so the order is not lost.
  saveOrders(orders);

  // Return the newly created order with HTTP status 201.
  res.status(201).json(newOrder);
});

export default router;

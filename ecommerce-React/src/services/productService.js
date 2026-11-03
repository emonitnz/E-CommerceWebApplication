const API_URL = "http://localhost:3000"; //my server
/**
 * this method sends request to the server for the all products
 * @returns
 */
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`); //asks the API for products.

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return response.json();
}
/**
 * this methods requests the the server for all the categories
 * @returns
 */
export async function getCategories() {
  const response = await fetch(`${API_URL}/products/categories`);

  if (!response.ok) {
    throw new Error("Failed to load categories");
  }

  return response.json();
}
/**
 * this method sends the request of a product by productid as url...
 * @param {*} id
 * @returns
 */
export async function getProductById(id) {
  const response = await fetch(`${API_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error("Failed to load product details");
  }

  return response.json();
}

/**
 * this method sends data by post method to my backend api
 * @param {} order
 * @returns
 */
export async function createOrder(order) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(order),
  });

  if (!response.ok) {
    throw new Error("Failed to submit order");
  }

  return response.json();
}

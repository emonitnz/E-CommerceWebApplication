import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { useState } from "react";

function App() {
  const [cart, setCart] = useState([]); //creating cart state//when user click add to cart then [] this array will be json array [{id:1,titale:laptop}] like that because of set cart
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("default");
  const [sort, setSort] = useState("default");
  /**
   * this function adds a item in cart list by setcart state when function called by products page or product details page
   * @param {} product
   */
  function addToCart(product) {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      //if products already exists then increase the quantity of the product
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      //If product is new then add product with quantity: 1 in cart array
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  }
  function resetFilters() {
    setSearch("");
    setCategory("default");
    setSort("default");
  }
  /**
   * this function increae the quantity of product in cart
   * @param {*} productId
   */
  function increaseQuantity(productId) {
    setCart(
      cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  }
  /**
   * this method clears the cart
   */
  function clearCart() {
    setCart([]);
  }
  function removeFromCart(productId) {
    setCart(cart.filter((item) => item.id !== productId));
  }
  /**
   * this function decrease  the quantity of product in cart
   * @param {*} productId
   */
  function decreaseQuantity(productId) {
    setCart(
      cart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item,
        )
        .filter((item) => item.quantity > 0), //this .filter revoves the item if the item.quantity hits 0
    );
  }

  return (
    <>
      {/* Turning on routing for the app */}
      <BrowserRouter>
        {/* Displays the navigation bar on every page */}
        <Navbar
          cartCount={cart.reduce((total, item) => total + item.quantity, 0)}
          resetFilters={resetFilters}
        />
        {/* Container that holds all routes */}
        <Routes>
          <Route
            path="/"
            element={
              <ProductsPage
                addToCart={addToCart}
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                search={search}
                setSearch={setSearch}
                category={category}
                setCategory={setCategory}
                sort={sort}
                setSort={setSort}
              />
            }
          />
          {/**this way product page as the way o access cart set cart and addToCart() function by props */}
          {/* id is a URL parameter */}
          <Route
            path="/products/:id"
            element={
              <ProductDetailsPage
                cart={cart}
                addToCart={addToCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
              />
            }
          />
          {/* If URL is /cart show CartPage */}
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
                clearCart={clearCart}
              />
            }
          />
          <Route
            path="/checkout"
            element={<CheckoutPage cart={cart} clearCart={clearCart} />}
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

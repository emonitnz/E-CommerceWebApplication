import { useNavigate } from "react-router-dom";
function CartPage({
  cart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
}) {
  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const navigate = useNavigate();
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-5xl font-extrabold">Your Cart</h1>

      <p className="mt-3 text-gray-500">{itemCount} items in your cart.</p>
      <button
        onClick={clearCart}
        className="cursor-pointer rounded-xl border border-red-300 px-6 py-3 font-bold text-red-600 hover:bg-red-50"
      >
        Clear cart
      </button>
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-6 rounded-2xl bg-white p-6 shadow"
            >
              <div className="flex min-w-0 items-center gap-6">
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-24 w-24 shrink-0 object-contain"
                />

                <div>
                  <h2 className="text-2xl font-bold">{item.title}</h2>
                  <p className="text-gray-500">{item.category}</p>
                  <p className="mt-2 font-bold">${item.price}</p>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-2 cursor-pointer font-bold text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-4">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="cursor-pointer rounded-full bg-slate-400 px-4 py-2 font-bold hover:bg-slate-200"
                >
                  -
                </button>

                <span className="rounded-xl border px-8 py-3 font-bold">
                  {item.quantity}
                </span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="cursor-pointer rounded-full bg-fuchsia-950 px-4 py-2 font-bold text-white hover:bg-fuchsia-700"
                >
                  +
                </button>

                <p className="w-28 text-right text-2xl font-extrabold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="h-fit rounded-2xl bg-white p-6 shadow">
          <h2 className="text-3xl font-extrabold">Order Summary</h2>

          <div className="mt-8 space-y-4 text-lg">
            <div className="flex justify-between">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>

            <hr />

            <div className="flex justify-between text-2xl font-extrabold">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => navigate("/checkout")}
            className="mt-8 w-full cursor-pointer rounded-2xl bg-fuchsia-950 py-4 font-bold text-white hover:bg-fuchsia-800"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;

import { Link } from "react-router-dom"; //link the routes to different page
//Parent page sends one product into this card.
import { useState } from "react";
function ProductCard({
  product,
  addToCart,
  cart,
  increaseQuantity,
  decreaseQuantity,
}) {
  //here product is props instead of writing {prop} and then props.product.title
  const [showCartControls, setShowCartControls] = useState(true); //this will vanish toggle if continu shopping button is pressed
  const cartItem = cart.find((item) => item.id === product.id);
  return (
    <div className="flex h-full flex-col border rounded-lg border-emerald-300 p-4 shadow hover:bg-fuchsia-200">
      <img
        src={product.image}
        alt={product.title}
        className="h-40 w-full object-contain"
      />
      <p>{product.category}</p>
      <h2 className="text-lg font-bold">{product.title}</h2>
      <p className="text-3xl font-bold">${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>
      {/*shows stock quantity */}
      {cartItem &&
        showCartControls && ( //only show this toggle section if product is in cart means user click add to cart
          <div className="mt-3">
            <p className="rounded-sm bg-green-100 p-2 text-center font-bold text-green-700">
              Added to cart
            </p>

            <div className="mt-3 rounded-sm border p-1">
              <p className="text-center text-xs font-semibold text-gray-600">
                Quantity
              </p>

              <div className="flex items-center justify-between">
                <button
                  onClick={() => decreaseQuantity(product.id)}
                  className="cursor-pointer rounded-lg bg-rose-300 px-4 py-2 font-bold text-red-900 hover:bg-rose-200"
                >
                  -
                </button>

                <span className="text-xl font-bold">{cartItem.quantity}</span>

                <button
                  onClick={() => increaseQuantity(product.id)}
                  className="cursor-pointer rounded-lg bg-rose-700 px-4 py-2 font-bold text-white hover:bg-rose-400"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

      <div className="mt-4 flex gap-2">
        <Link
          to={`/products/${product.id}`}
          className=" rounded-sm bg-emerald-950 px-4 py-2 font-bold text-white hover:bg-emerald-800"
        >
          Details
        </Link>

        {cartItem && showCartControls ? ( //this ternary perator checking if user click add buuton or not
          <button
            onClick={() => setShowCartControls(false)}
            className="cursor-pointer rounded-sm bg-fuchsia-950 px-4 py-2 font-bold text-white hover:bg-fuchsia-800"
          >
            Keep Shopping
          </button>
        ) : (
          <button
            onClick={() => {
              addToCart(product);
              setShowCartControls(true);
            }}
            className="cursor-pointer flex-1 rounded-lg bg-fuchsia-950 px-4 py-2 font-bold text-white hover:bg-fuchsia-800"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;

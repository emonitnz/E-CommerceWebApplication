import { useParams } from "react-router-dom"; //gets the id from /products/:id
import { useQuery } from "@tanstack/react-query";
import { getProductById } from "../services/productService";

function ProductDetailsPage({
  cart,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
}) {
  const { id } = useParams(); //gets the id from /products/:id

  const {
    data: product,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  if (isPending) return <h1>Loading product...</h1>;

  if (isError) return <h1>{error.message}</h1>;
  const cartItem = cart.find((item) => item.id === product.id); //after product load checking if product exist in cart cz then we will show toggle
  return (
    <div className="p-6">
      <h1 className="text-3xl text-center font-bold font-extrabold tracking-widest text-yellow-700 mb-6">
        {product.title}
      </h1>
      <img
        src={product.image}
        alt={product.title}
        className="h-80 w-full object-contain mb-6"
      />
      <p className="text-lg font-bold">{product.description}</p>
      <p>Category: {product.category}</p>
      <p className="text-lg font-bold">Price: ${product.price}</p>
      <p>Rating: {product.rating}</p>
      <p>Stock: {product.stock}</p>

      {cartItem ? (
        <div className="mt-4">
          <p className="rounded-sm bg-green-100 p-2 text-center font-bold text-green-700">
            Added to cart
          </p>

          <div className="mt-3 rounded-sm border p-1">
            <p className="text-center text-xs font-semibold text-gray-600">
              Quantity
            </p>

            <div className="flex items-center justify-between">
              <button
                className="cursor-pointer rounded-lg bg-rose-300 px-4 py-2 font-bold text-red-900 hover:bg-rose-200"
                onClick={() => decreaseQuantity(product.id)}
              >
                -
              </button>
              <span>{cartItem.quantity}</span>
              <button
                className="cursor-pointer rounded-lg bg-rose-700 px-4 py-2 font-bold text-white hover:bg-rose-400"
                onClick={() => increaseQuantity(product.id)}
              >
                +
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => addToCart(product)}
          className="mt-4 rounded-sm bg-fuchsia-950 px-4 py-2 font-bold text-white"
        >
          Add
        </button>
      )}
    </div>
  );
}

export default ProductDetailsPage;

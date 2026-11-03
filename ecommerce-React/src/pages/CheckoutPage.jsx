import { useState } from "react"; //to store values
import { useMutation } from "@tanstack/react-query"; //Used for sending data to the API.
import { createOrder } from "../services/productService"; //function that sends POST /orders

function CheckoutPage({ cart, clearCart }) {
  const [formData, setFormData] = useState({
    //This stores what the user types in form
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    postcode: "",
  });

  const [errors, setErrors] = useState({}); //Stores validation errors.
  const [orderPlaced, setOrderPlaced] = useState(false); //At first no order is placedWhen order succeeds then success screen shows.

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0); //Adds all quantities.

  const totalPrice = cart.reduce(
    //Calculates total cost
    (total, item) => total + item.price * item.quantity,
    0,
  );
  const [orderReference, setOrderReference] = useState(null);
  //This sends order to API.
  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (createdOrder) => {
      clearCart();
      setOrderReference(createdOrder.id); //finds the order id in post request result
      setOrderPlaced(true);
    },
  });
  /**
   * this method checks if user filled the form properly  , and sends the order by post mutate
   */
  function handlePlaceOrder() {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.postcode.trim()) newErrors.postcode = "Postcode is required";

    setErrors(newErrors);
    //if there are no errors.
    if (Object.keys(newErrors).length === 0) {
      const order = {
        //creates order object:
        customer: formData,
        items: cart.map((item) => ({
          productId: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
        total: totalPrice,
      };

      orderMutation.mutate(order); //Sends it to API.
    }
  }

  if (orderPlaced) {
    //if order placed then placeordered success screen
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-8">
        <div className="w-full max-w-3xl rounded-2xl bg-white p-10 text-center shadow">
          <p className="font-bold text-green-700">
            Order submitted successfully
          </p>

          <h1 className="mt-3 text-5xl font-extrabold">
            Thank you, {formData.fullName}
          </h1>

          <p className="mt-4 text-gray-500">Your order has been submitted.</p>

          <p className="mt-2 text-gray-500">
            Order reference: #{orderReference}
          </p>
        </div>
      </div>
    );
  }
  //filling up the form
  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow lg:col-span-2">
          <h1 className="mb-6 text-3xl font-extrabold">
            Customer and delivery details
          </h1>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block font-semibold">Full name</label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
                className={`w-full rounded-lg border p-3 ${
                  errors.fullName ? "border-red-500" : ""
                }`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-semibold">Email address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className={`w-full rounded-lg border p-3 ${
                  errors.email ? "border-red-500" : ""
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-semibold">Phone number</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className={`w-full rounded-lg border p-3 ${
                  errors.phone ? "border-red-500" : ""
                }`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="mb-1 block font-semibold">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className={`w-full rounded-lg border p-3 ${
                  errors.city ? "border-red-500" : ""
                }`}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">{errors.city}</p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-1 block font-semibold">Delivery address</label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className={`w-full rounded-lg border p-3 ${
                errors.address ? "border-red-500" : ""
              }`}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-500">{errors.address}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="mb-1 block font-semibold">Postcode</label>
            <input
              type="text"
              value={formData.postcode}
              onChange={(e) =>
                setFormData({ ...formData, postcode: e.target.value })
              }
              className={`w-full rounded-lg border p-3 ${
                errors.postcode ? "border-red-500" : ""
              }`}
            />
            {errors.postcode && (
              <p className="mt-1 text-sm text-red-500">{errors.postcode}</p>
            )}
          </div>

          {orderMutation.isError && (
            <p className="mt-4 text-red-500">{orderMutation.error.message}</p>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={orderMutation.isPending}
            className="mt-8 w-full cursor-pointer rounded-2xl bg-fuchsia-950 py-4 font-bold text-white hover:bg-fuchsia-800 disabled:bg-gray-400"
          >
            {orderMutation.isPending ? "Submitting..." : "Place Order"}
          </button>
        </div>

        <div className="h-fit rounded-2xl bg-white p-6 shadow">
          <h2 className="text-3xl font-extrabold">Order Summary</h2>

          <div className="mt-8 space-y-4">
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
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;

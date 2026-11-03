import { useNavigate } from "react-router-dom";
function Navbar({ cartCount, resetFilters }) {
  //function Navbar Creates a React component
  const navigate = useNavigate();
  return (
    <>
      {/* Returns JSX (HTML-like UI) */}

      {/*nav is  HTML semantic tag for navigation */}
      <nav className="bg-gradient-to-r from-red-900 to-pink-800 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white text-2xl font-bold">COMPX322-Mart</h1>

          <div className="flex gap-3">
            <button
              onClick={() => {
                resetFilters();
                navigate("/");
              }}
              className="cursor-pointer bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-gray-400"
            >
              Products
            </button>

            <button
              onClick={() => {
                navigate("/cart");
              }}
              className="cursor-pointer bg-white text-black px-4 py-2 rounded-full font-semibold  hover:bg-gray-400"
            >
              Cart ({cartCount})
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

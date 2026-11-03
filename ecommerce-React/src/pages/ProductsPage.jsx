import { useQuery } from "@tanstack/react-query"; //Import the useQuery hook from TanStack Query.
import { getProducts, getCategories } from "../services/productService"; //imports the funtion getProduct from /service/productuctService
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

function ProductsPage({
  addToCart,
  cart,
  increaseQuantity,
  decreaseQuantity,
  search,
  setSearch,
  category,
  setCategory,
  sort,
  setSort,
}) {
  const {
    //runs usequery and extraccts all products
    data: products = [],
    isPending,
    isError,
    error,
  } = useQuery({
    //name of this query is poducts query AND ALL THE PRODUCT WILL BE STORED IN PRODUCTS
    queryKey: ["products"],
    queryFn: getProducts, //the function running for the query getproducts() that request for product
  });
  //runs usequery and extracts all category
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories, //function runing for query of geting the all catgories
  });

  if (isPending) return <h1>Loading products...</h1>; //when loading showing that meesage

  if (isError) return <h1>{error.message}</h1>; //if error

  //filters and sort product by user search
  let filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );
  //filters by category
  if (category !== "default") {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === category,
    );
  }
  //sorts by low to hig
  if (sort === "asc") {
    filteredProducts.sort((a, b) => a.price - b.price);
  }
  //sorts by high tolow
  if (sort === "desc") {
    filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div>
      {/**props that the FilterBar will use  and this datas will be sent by productspage*/}
      <FilterBar
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
        categories={categories}
      />
      <h1 className="mt-10 mb-10 text-center text-5xl font-extrabold tracking-widest text-yellow-700">
        Products Page
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {
          //loops through all product and for each product it creats <productCard component>
          //but now instead of showing all product it only will show filtered products
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              addToCart={addToCart}
              cart={cart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))
        }
      </div>
    </div>
  );
}

export default ProductsPage;

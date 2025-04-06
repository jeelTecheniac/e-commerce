import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, searchProducts } from "../redux/slices/productSlice";
import {
  selectFilteredProducts,
  selectProductStatus,
  selectProductError,
} from "../redux/slices/productSlice";
import ProductList from "../components/Products/ProductList";
import ProductCard from "../components/Products/ProductCard";

const ProductPage = () => {
  const dispatch = useDispatch();
  const filteredProducts = useSelector(selectFilteredProducts);
  const status = useSelector(selectProductStatus);
  const error = useSelector(selectProductError);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const debouncedSearch = useCallback(
    (() => {
      let timeoutId = null;
      return (value) => {
        if (timeoutId) {
          clearTimeout(timeoutId);
        }
        timeoutId = setTimeout(() => {
          dispatch(searchProducts(value));
        }, 500);
      };
    })(),
    [dispatch]
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto mb-8">
        <div
          className={`relative transition-all duration-300 ${
            searchFocused ? "scale-105" : "scale-100"
          }`}
        >
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className={`h-5 w-5 transition-colors duration-300 ${
                searchFocused ? "text-blue-500" : "text-gray-400"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className={`w-full pl-10 pr-10 py-3 md:py-4 border-2 rounded-full shadow-sm focus:outline-none transition-all duration-300 text-gray-700 placeholder-gray-400 ${
              searchFocused
                ? "border-blue-500 ring-2 ring-blue-200 shadow-lg"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onChange={handleSearch}
            value={searchTerm}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <div className="text-xs font-medium px-2 py-1 bg-gray-100 text-gray-500 rounded-full hidden md:block">
              {filteredProducts.length} items
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-500 mt-2 text-center">
          {status === "succeeded" &&
            `Showing ${filteredProducts.length} products`}
        </p>
      </div>

      {status === "loading" ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md my-6">
          <p className="font-bold">Error</p>
          <p>{error}</p>
        </div>
      ) : (
        <ProductList>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductList>
      )}
    </div>
  );
};

export default ProductPage;

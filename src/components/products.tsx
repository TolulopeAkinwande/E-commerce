import axios from "axios";
import { useEffect, useState } from "react";
import { Product } from "../lib/types";
import { FiShoppingCart, FiX } from "react-icons/fi";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(data.map((product) => {
          const updatedPrice = (0.022 * product.price) + product.price;
          return {
            ...product,
            price: Number(updatedPrice.toFixed(2)),
          }
        }));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  const addToCart = (product: Product) => {
    if (cartItems.some(item => item.id === product.id)) {
      alert("products already exist inside the cart");
      return;
    }
    try {
      setCartItems(prev => [...prev, product]);
      alert("product added to cart");
    }
    catch (error) {
      console.error("Add to cart error:, error");
      alert(
        "sorry, an error occurred  from our side while adding your products to the carts." + "we are currently working on it; kindly try again."
      );
    }
  };

  const removeFromCart = (productID: number) => {
    setCartItems(prev => prev.filter(item => item.id !== productID));
  }
  const merchandiseTotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const formattedTotal = merchandiseTotal.toFixed(2);
  
  const handleCheckOut = () => {
    setCartItems([])
    alert(
      "checkout successfull"
    );
  }
  
  return (
    <>
      <header className="bg-amber-950 px-4 sm:px-6 lg:px-10 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-cente">
          <h1 className="text-lg sm:text-xl font-bold text-white">MyStore</h1>
          <button onClick={toggleDiv} className="relative text-white text-2x1" aria-label="Open cart">
            <FiShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-500 text-xs px-1 rounded-full">
                {cartItems.length}
              </span>
            )}
          </button>
        </div>

        {isOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />

            <aside className="relative ml-auto w-full max-w-md bg-white h-full shadow-xl flex flex-col">
              <header className="flex items-center justify-between px-6 py-4 border-b">
                <div className="flex items-center space-x-2">
                  <FiShoppingCart className="text-2xl" />
                  <h2 className="text-lg font-semibold">My Cart</h2>
                </div>
                <button onClick={() => setIsOpen(false)} aria-label="Close cart">
                  <FiX className="text-2xl" />
                </button>
              </header>

              <div className="flex-1 overflow-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <p>Your cart is empty</p>
                  </div>

                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 border-b pb-4 last:border-none">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1 flex flex-col">
                        <p className="font-medium">{item.title}</p>
                        <span className="text-sm text-gray-500">
                          {item.category}
                        </span>
                        <p className="text-black font-bold mt-1">
                          ₦ {item.price.toFixed(2)}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="mt-2 text-sm text-red-500 hover:underline self-start"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <footer className="px-6 py-4 border-t">
                <dl className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <dt className="text-gray-700">Merchandise:</dt>
                    <dd className="font-medium">₦ {formattedTotal}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-700">Estimated shipping:</dt>
                    <dd className="font-medium">₦ 0.00</dd>
                  </div>
                </dl>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold">ORDER TOTAL</span>
                  <span className="text-xl font-bold">₦ {formattedTotal}</span>
                </div>

                <button onClick={handleCheckOut}
                  className="w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-amber-950 to-green-800 disabled:opacity-50"
                >
                  PROCEED TO CHECKOUT
                </button>
              </footer>
            </aside>
          </div>
        )}
      </header>

      <main className="bg-white py-4 px-6 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 rounded-lg p-3 flex flex-col"
              >
                <div className="w-full h-32 mb-3 flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain max-h-full"
                  />
                </div>

                <h2 className="text-sm font-medium mb-1 line-clamp-2">
                  {product.title}
                </h2>
                <p className="text-xs text-gray-500 uppercase mb-3">
                  {product.category}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <button onClick={() => addToCart(product)}
                    className="px-2 py-1 text-xs bg-amber-950 text-white rounded">
                    Add to cart
                  </button>
                  <span className="text-sm font-semibold text-amber-950">
                  ₦{product.price}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}


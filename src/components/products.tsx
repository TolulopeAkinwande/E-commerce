// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Product } from "../lib/types";
// // import { BsCart } from "react-icons/bs";

// export default function ProductList() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     async function fetchProducts() {
//       try {
//         const { data } = await axios.get<Product[]>(
//           "https://fakestoreapi.com/products"
//         );
//         setProducts(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     }
//     fetchProducts();
//   }, []);

//   return (
//     <>
//       {/* Header */}
//       <header className="bg-amber-950 px-4 sm:px-6 lg:px-10 py-3">
//         <div className="max-w-7xl mx-auto flex justify-between items-center">
//           <h1 className="text-lg sm:text-xl font-bold text-white">MyStore</h1>
//           <button className="text-white">
//             {/* <BsCart size={20} /> */}
//           </button>
//         </div>
//       </header>

//       <main className="bg-white py-4">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
//             {products.map((product) => (
//               <div
//                 key={product.id}
//                 className="border border-gray-200 rounded-lg p-3 flex flex-col"
//               >
//                 <div className="w-full h-32 mb-3 flex items-center justify-center">
//                   <img
//                     src={product.image}
//                     alt={product.title}
//                     className="object-contain max-h-full"
//                   />
//                 </div>

//                 <h2 className="text-sm font-medium mb-1 line-clamp-2">
//                   {product.title}
//                 </h2>
//                 <p className="text-xs text-gray-500 uppercase mb-3">
//                   {product.category}
//                 </p>

//                 <div className="mt-auto flex items-center justify-between">
//                   <button className="px-2 py-1 text-xs bg-amber-950 text-white rounded">
//                     Buy Now
//                   </button>
//                   <span className="text-sm font-semibold text-amber-950">
//                     ${product.price.toFixed(2)}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </>
//   );
// }

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Product } from "../lib/types";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get<Product[]>(
          "https://fakestoreapi.com/products"
        );
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <>
      {/* Header */}
      <header className="bg-amber-950 px-4 sm:px-6 lg:px-10 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold text-white">MyStore</h1>
        </div>
      </header>

      {/* Main Content */}
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
                  <button className="px-2 py-1 text-xs bg-amber-950 text-white rounded">
                    Buy Now
                  </button>
                  <span className="text-sm font-semibold text-amber-950">
                    ${product.price.toFixed(2)}
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

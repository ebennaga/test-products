// app/products/page.tsx
"use client";
import Link from "next/link";

import { useState, useEffect } from "react";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const pageSize = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const res = await fetch(
        `https://dummyjson.com/products?limit=${pageSize}&skip=${
          (page - 1) * pageSize
        }`
      );
      const data = await res.json();
      setProducts(data.products);
      setLoading(false);
    };
    fetchProducts();
  }, [page]);

  const sortedProducts = [...products].sort((a, b) =>
    sortOrder === "asc" ? a.price - b.price : b.price - a.price
  );

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as "asc" | "desc");
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">Products</h1>
      <div className="mb-4">
        <label htmlFor="sort" className="mr-2">
          Sort by price:
        </label>
        <select
          id="sort"
          value={sortOrder}
          onChange={handleSortChange}
          className="border p-2"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-300 p-4 rounded-lg shadow"
            >
              <Link href={`/products/${product.id}`}>
                <img
                  src={product.thumbnail}
                  alt={product.title}
                  className="w-full h-40 object-cover mb-4"
                />
                <h2 className="text-xl font-bold">{product.title}</h2>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-lg font-semibold">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
      <div className="mt-4 flex justify-center">
        <button
          className="border p-2 mx-2"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <button className="border p-2 mx-2" onClick={() => setPage(page + 1)}>
          Next
        </button>
      </div>
    </div>
  );
}

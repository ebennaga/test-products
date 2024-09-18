// app/products/[id]/page.tsx
import Image from "next/image";
import { notFound } from "next/navigation";

// Define TypeScript interface for the product
interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  stock: number;
}

// Function to fetch a single product based on the ID
async function getProduct(id: string): Promise<Product | null> {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  // Return null if no product is found
  if (!res.ok) {
    return null;
  }

  return res.json();
}

// Product page component
export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  if (!product) {
    // Handle 404 for product not found
    return notFound();
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-4">{product.title}</h1>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Product Images */}
        <div>
          <Image
            src={product.images[0]} // Show the first image as the main image
            alt={product.title}
            width={600}
            height={600}
            className="rounded-lg"
            priority
          />

          {/* Additional images (if any) */}
          <div className="mt-4 grid grid-cols-3 gap-4">
            {product.images.slice(1).map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={`${product.title} image ${index + 1}`}
                width={100}
                height={100}
                className="object-cover rounded"
              />
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-xl font-bold mb-4">${product.price}</p>

          {/* Stock Status */}
          <p
            className={`mt-2 text-sm ${
              product.stock > 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>

          {/* Add-to-Cart Button (can be handled with state or further features) */}
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-bold rounded hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

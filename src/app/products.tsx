import { client } from '../sanity/client';
import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { urlFor } from '../sanity/lib/image';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  stockQuantity: number;
  image: {
    asset: {
      _ref: string;
      _type: 'reference';
    };
  };
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await client.fetch(`*[_type == "product"]`);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <img src={urlFor(product.image).url()} alt={product.name} />
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
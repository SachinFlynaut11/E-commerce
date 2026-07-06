import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiStar, FiShoppingCart, FiPackage } from 'react-icons/fi';
import { productApi } from '../axios/apiCall';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await productApi.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      setAdding(true);
      await addToCart(product._id, quantity);
      alert('Added to cart successfully!');
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  if (loading) return <LoadingSpinner message="Loading product details..." />;

  if (error || !product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 text-center">
        <p className="text-red-600">{error || 'Product not found'}</p>
        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-2 text-indigo-600 hover:underline"
        >
          <FiArrowLeft /> Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        to="/products"
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600"
      >
        <FiArrowLeft /> Back to products
      </Link>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-square w-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <span className="inline-flex w-fit items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
            <FiPackage /> {product.category}
          </span>

          <h1 className="mt-4 text-3xl font-bold text-slate-900">{product.name}</h1>

          <div className="mt-3 flex items-center gap-2 text-amber-500">
            <FiStar className="fill-current text-lg" />
            <span className="font-semibold text-slate-700">{product.rating} / 5</span>
          </div>

          <p className="mt-6 text-4xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </p>

          <p className="mt-6 leading-relaxed text-slate-600">{product.description}</p>

          <p className="mt-4 text-sm text-slate-500">
            {product.stock > 0 ? (
              <span className="text-green-600 font-medium">{product.stock} in stock</span>
            ) : (
              <span className="text-red-600 font-medium">Out of stock</span>
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <div className="flex items-center rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="px-4 py-3 text-slate-600 transition hover:bg-slate-100"
              >
                -
              </button>
              <span className="min-w-[3rem] text-center font-semibold">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                disabled={quantity >= product.stock}
                className="px-4 py-3 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
              >
                +
              </button>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={adding || product.stock === 0}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
            >
              <FiShoppingCart className="text-lg" />
              {adding ? 'Adding...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

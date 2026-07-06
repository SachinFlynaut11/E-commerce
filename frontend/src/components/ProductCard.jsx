import { Link } from 'react-router-dom';
import { FiStar, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setAdding(true);
      await addToCart(product._id, 1);
    } catch (err) {
      alert(err.message);
    } finally {
      setAdding(false);
    }
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-indigo-600 backdrop-blur-sm">
          {product.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold text-slate-900 group-hover:text-indigo-600">
          {product.name}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-amber-500">
          <FiStar className="fill-current" />
          <span className="text-sm font-medium text-slate-600">{product.rating}</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="text-xl font-bold text-indigo-600">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={handleAddToCart}
            disabled={adding || product.stock === 0}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <FiShoppingCart />
            {adding ? 'Adding...' : product.stock === 0 ? 'Out of Stock' : 'Add'}
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

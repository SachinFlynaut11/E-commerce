import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useState } from 'react';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [updating, setUpdating] = useState(false);
  const product = item.product;

  if (!product) return null;

  const handleQuantityChange = async (newQty) => {
    if (newQty < 1) return;
    try {
      setUpdating(true);
      await updateQuantity(product._id, newQty);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    try {
      setUpdating(true);
      await removeFromCart(product._id);
    } catch (err) {
      alert(err.message);
    } finally {
      setUpdating(false);
    }
  };

  const itemTotal = (product.price * item.quantity).toFixed(2);

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
      <img
        src={product.image}
        alt={product.name}
        className="h-24 w-24 shrink-0 rounded-xl object-cover"
      />

      <div className="flex-1">
        <h3 className="font-semibold text-slate-900">{product.name}</h3>
        <p className="mt-1 text-sm text-slate-500">{product.category}</p>
        <p className="mt-2 text-lg font-bold text-indigo-600">
          ${product.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-xl border border-slate-200">
          <button
            type="button"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={updating || item.quantity <= 1}
            className="rounded-l-xl p-2 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <FiMinus />
          </button>
          <span className="min-w-[2.5rem] text-center font-semibold">
            {item.quantity}
          </span>
          <button
            type="button"
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={updating || item.quantity >= product.stock}
            className="rounded-r-xl p-2 text-slate-600 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <FiPlus />
          </button>
        </div>

        <p className="min-w-[5rem] text-right font-bold text-slate-900">
          ${itemTotal}
        </p>

        <button
          type="button"
          onClick={handleRemove}
          disabled={updating}
          className="rounded-xl p-2 text-red-500 transition hover:bg-red-50 disabled:opacity-50"
          title="Remove item"
        >
          <FiTrash2 className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;

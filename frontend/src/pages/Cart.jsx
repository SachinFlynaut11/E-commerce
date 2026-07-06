import { Link } from 'react-router-dom';
import { FiShoppingCart, FiArrowRight } from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import LoadingSpinner from '../components/LoadingSpinner';

const Cart = () => {
  const { cart, loading, clearCart } = useCart();

  const handleClearCart = async () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      await clearCart();
    }
  };

  if (loading) return <LoadingSpinner message="Loading cart..." />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
          <p className="mt-2 text-slate-500">
            {cart.totalItems} item{cart.totalItems !== 1 ? 's' : ''} in your cart
          </p>
        </div>
        {cart.items.length > 0 && (
          <button
            type="button"
            onClick={handleClearCart}
            className="text-sm font-medium text-red-500 transition hover:text-red-600"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20">
          <FiShoppingCart className="text-5xl text-slate-300" />
          <p className="mt-4 text-lg font-medium text-slate-600">Your cart is empty</p>
          <p className="mt-1 text-sm text-slate-400">Add some products to get started</p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
          >
            Browse Products <FiArrowRight />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <CartItem key={item.product._id} item={item} />
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-slate-600">Subtotal ({cart.totalItems} items)</span>
              <span className="text-lg font-semibold text-slate-900">
                ${cart.totalPrice.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between pt-4">
              <span className="text-xl font-bold text-slate-900">Total</span>
              <span className="text-2xl font-bold text-indigo-600">
                ${cart.totalPrice.toFixed(2)}
              </span>
            </div>
            <Link
              to="/products"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition-colors hover:bg-indigo-700"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

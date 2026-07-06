import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  FiShoppingBag,
  FiGrid,
  FiShoppingCart,
  FiLogOut,
  FiUser,
  FiHome,
} from 'react-icons/fi';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
      isActive(path)
        ? 'bg-indigo-50 text-indigo-600'
        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
    }`;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link to="/dashboard" className="flex items-center gap-2 text-xl font-bold text-indigo-600">
          <FiShoppingBag className="text-2xl" />
          <span>E-Shop</span>
        </Link>

        <nav className="flex items-center gap-2">
          <Link to="/dashboard" className={linkClass('/dashboard')}>
            <FiHome className="text-lg" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <Link to="/products" className={linkClass('/products')}>
            <FiGrid className="text-lg" />
            <span className="hidden sm:inline">Products</span>
          </Link>

          <Link to="/cart" className={`relative ${linkClass('/cart')}`}>
            <FiShoppingCart className="text-lg" />
            <span className="hidden sm:inline">Cart</span>
            {cart.totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">
                {cart.totalItems}
              </span>
            )}
          </Link>

          <span className="hidden items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 md:flex">
            <FiUser className="text-indigo-600" />
            {user?.name}
          </span>

          <button
            type="button"
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-red-50 hover:text-red-600"
          >
            <FiLogOut className="text-lg" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

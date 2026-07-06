import { Link } from 'react-router-dom';
import {
  FiShoppingBag,
  FiShoppingCart,
  FiPackage,
  FiUser,
  FiArrowRight,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Dashboard = () => {
  const { user } = useAuth();
  const { cart } = useCart();

  const cards = [
    {
      title: 'Browse Products',
      description: 'Explore our full catalog with filters and search',
      icon: FiPackage,
      link: '/products',
      color: 'bg-indigo-50 text-indigo-600',
    },
    {
      title: 'Shopping Cart',
      description: `${cart.totalItems} item${cart.totalItems !== 1 ? 's' : ''} in your cart`,
      icon: FiShoppingCart,
      link: '/cart',
      color: 'bg-emerald-50 text-emerald-600',
    },
    {
      title: 'Your Profile',
      description: user?.email || '',
      icon: FiUser,
      link: '/products',
      color: 'bg-amber-50 text-amber-600',
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-10 rounded-2xl bg-gradient-to-r from-indigo-600 to-indigo-700 p-8 text-white shadow-lg">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20">
            <FiShoppingBag className="text-2xl" />
          </div>
          <div>
            <p className="text-indigo-100">Welcome back,</p>
            <h1 className="text-3xl font-bold">{user?.name}</h1>
          </div>
        </div>
        <p className="mt-4 max-w-xl text-indigo-100">
          Manage your shopping from your dashboard. Browse products, update your cart, and checkout when ready.
        </p>
      </div>

      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Cart Items</p>
          <p className="mt-1 text-3xl font-bold text-slate-900">{cart.totalItems}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Cart Total</p>
          <p className="mt-1 text-3xl font-bold text-indigo-600">
            ${cart.totalPrice?.toFixed(2) || '0.00'}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Account</p>
          <p className="mt-1 truncate text-lg font-semibold text-slate-900">{user?.email}</p>
        </div>
      </div>

      <h2 className="mb-4 text-xl font-bold text-slate-900">Quick Actions</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.title}
            to={card.link}
            className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${card.color}`}>
              <card.icon className="text-xl" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-indigo-600">
              {card.title}
            </h3>
            <p className="mt-2 flex-1 text-sm text-slate-500">{card.description}</p>
            <span className="mt-4 flex items-center gap-1 text-sm font-medium text-indigo-600">
              Go <FiArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

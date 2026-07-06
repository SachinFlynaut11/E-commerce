import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import { ProtectedRoute, PublicRoute } from './components/ProtectedRoute';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';

const RootRedirect = () => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner message="Loading..." />;
  return <Navigate to={user ? '/dashboard' : '/login'} replace />;
};

const AppLayout = ({ children }) => (
  <div className="min-h-screen bg-slate-50">
    <Navbar />
    <main>{children}</main>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<RootRedirect />} />

            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/signup"
              element={
                <PublicRoute>
                  <Signup />
                </PublicRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Dashboard />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Home />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/product/:id"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <ProductDetails />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Cart />
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

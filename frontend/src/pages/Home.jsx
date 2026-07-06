import { useState, useEffect, useCallback } from 'react';
import { FiPackage } from 'react-icons/fi';
import { productApi } from '../axios/apiCall';
import ProductCard from '../components/ProductCard';
import Filters from '../components/Filters';
import LoadingSpinner from '../components/LoadingSpinner';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const params = {};
      if (search) params.search = search;
      if (category !== 'all') params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const response = await productApi.getProducts(params);
      setProducts(response.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [search, category, minPrice, maxPrice]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await productApi.getCategories();
      setCategories(response.data || []);
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Shop Products</h1>
        <p className="mt-2 text-slate-500">
          Browse our collection and find something you love
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Filters
            search={search}
            setSearch={setSearch}
            category={category}
            setCategory={setCategory}
            categories={categories}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
            onSearch={fetchProducts}
          />
        </div>

        <div className="lg:col-span-3">
          {loading ? (
            <LoadingSpinner message="Loading products..." />
          ) : error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
              <p className="text-red-600">{error}</p>
              <button
                type="button"
                onClick={fetchProducts}
                className="mt-4 rounded-xl bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                Retry
              </button>
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white py-20">
              <FiPackage className="text-5xl text-slate-300" />
              <p className="mt-4 text-lg font-medium text-slate-600">No products found</p>
              <p className="mt-1 text-sm text-slate-400">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <p className="mb-4 text-sm text-slate-500">
                Showing {products.length} product{products.length !== 1 ? 's' : ''}
              </p>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

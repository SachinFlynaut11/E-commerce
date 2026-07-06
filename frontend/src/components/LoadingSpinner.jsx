import { FiLoader } from 'react-icons/fi';

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center py-20">
    <FiLoader className="animate-spin text-4xl text-indigo-600" />
    <p className="mt-4 text-slate-500">{message}</p>
  </div>
);

export default LoadingSpinner;

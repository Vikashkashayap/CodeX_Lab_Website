import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import Header from '../Header';
// import Footer from '../Footer';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          await api.verifyToken();
          navigate('/admin/dashboard', { replace: true });
        } catch {
          localStorage.removeItem('adminToken');
        }
      }
    };
    checkAuth();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login(email, password);
      
      if (response && response.data && response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
        // Navigate immediately after setting token
        navigate('/admin/dashboard', { replace: true });
      } else {
        setError('Invalid response from server. Please try again.');
        setLoading(false);
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-black flex flex-col items-center justify-center px-4">
      <Header />
      <div className="w-full max-w-md">
        <div className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-electric-purple/10"></div>
          <div className="relative z-10">
            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2 text-center">
              Admin <span className="neon-text">Login</span>
            </h1>
            <p className="text-gray-400 text-center mb-8">
              Sign in to access the admin dashboard
            </p>

            {error && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neon-blue mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                  placeholder="admin@gmail.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-neon-blue mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-8 py-4 bg-neon-blue text-space-black rounded-xl font-semibold text-lg hover:shadow-neon-blue transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
              
              {loading && (
                <div className="text-center mt-4">
                  <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-neon-blue"></div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Login;

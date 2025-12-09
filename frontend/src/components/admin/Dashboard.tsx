import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../utils/api';
import PricingManagement from './PricingManagement';
import ServicesManagement from './ServicesManagement';
import ContentManagement from './ContentManagement';
import LeadsManagement from './LeadsManagement';
import Sidebar from './Sidebar';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<'pricing' | 'services' | 'content' | 'leads'>('pricing');
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/admin/login');
        return;
      }

      try {
        await api.verifyToken();
      } catch (error) {
        localStorage.removeItem('adminToken');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-space-black flex items-center justify-center">
        <div className="text-neon-blue text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-space-black flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="glass border-b border-neon-blue/20 sticky top-0 z-30">
          <div className="px-4 md:px-6 py-4">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden px-3 py-2 text-neon-blue hover:bg-neon-blue/10 rounded-lg transition-all"
                aria-label="Toggle sidebar"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="flex-1 lg:flex-none text-center lg:text-left">
                <h1 className="text-xl md:text-2xl font-heading font-bold neon-text">
                  Admin Dashboard
                </h1>
              </div>
              <button
                onClick={handleLogout}
                className="px-4 md:px-6 py-2 border-2 border-neon-blue text-neon-blue rounded-lg font-semibold hover:bg-neon-blue/10 transition-all text-sm md:text-base"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-4 md:p-6 lg:p-8">
          <div className="glass rounded-2xl p-6 md:p-8">
            {activeTab === 'pricing' && <PricingManagement />}
            {activeTab === 'services' && <ServicesManagement />}
            {activeTab === 'content' && <ContentManagement />}
            {activeTab === 'leads' && <LeadsManagement />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

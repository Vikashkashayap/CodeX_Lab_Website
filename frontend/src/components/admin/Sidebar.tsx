
interface SidebarProps {
  activeTab: 'pricing' | 'services' | 'content' | 'leads';
  onTabChange: (tab: 'pricing' | 'services' | 'content' | 'leads') => void;
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ activeTab, onTabChange, isOpen, onClose }: SidebarProps) => {
  const menuItems = [
    { id: 'pricing' as const, label: 'Pricing Plans', icon: '💰' },
    { id: 'services' as const, label: 'Services', icon: '🚀' },
    { id: 'content' as const, label: 'Content Sections', icon: '📝' },
    { id: 'leads' as const, label: 'Client Leads', icon: '📧' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 glass border-r border-neon-blue/20 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="p-6 border-b border-neon-blue/20">
            <h1 className="text-2xl font-heading font-bold neon-text">
              Admin Dashboard
            </h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/50'
                    : 'text-gray-400 hover:text-neon-blue hover:bg-cyber-navy/30'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;


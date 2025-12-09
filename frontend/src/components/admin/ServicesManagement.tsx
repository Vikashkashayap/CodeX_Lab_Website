import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useModal } from '../../hooks/useModal';

interface Service {
  _id?: string;
  icon: string;
  title: string;
  description: string;
  image: string;
  order: number;
}

const ServicesManagement = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<Service>({
    icon: '',
    title: '',
    description: '',
    image: '',
    order: 0,
  });
  const { showAlert, showConfirm, ModalComponent } = useModal();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.getServices();
      setServices(response.data);
    } catch (error: any) {
      await showAlert('Failed to fetch services: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingService?._id) {
        await api.updateService(editingService._id, formData);
      } else {
        await api.createService(formData);
      }
      await fetchServices();
      resetForm();
      await showAlert('Service saved successfully!');
    } catch (error: any) {
      await showAlert('Failed to save service: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm('Are you sure you want to delete this service?');
    if (!confirmed) return;
    
    try {
      await api.deleteService(id);
      await fetchServices();
      await showAlert('Service deleted successfully!');
    } catch (error: any) {
      await showAlert('Failed to delete service: ' + error.message);
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData(service);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      icon: '',
      title: '',
      description: '',
      image: '',
      order: 0,
    });
    setEditingService(null);
    setShowForm(false);
  };

  if (loading) {
    return <div className="text-neon-blue">Loading services...</div>;
  }

  return (
    <>
      <ModalComponent />
      <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-neon-blue">Services</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-neon-blue transition-all"
        >
          {showForm ? 'Cancel' : '+ Add Service'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 glass rounded-xl p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">Icon (Emoji)</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                required
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                placeholder="🚀"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neon-blue mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={3}
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-neon-blue mb-2">Image URL</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                required
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                placeholder="https://images.unsplash.com/..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">Order</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-neon-blue transition-all"
          >
            {editingService ? 'Update Service' : 'Create Service'}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            className="glass rounded-xl p-6 border border-neon-blue/20"
          >
            <div className="text-4xl mb-2">{service.icon}</div>
            <h3 className="text-xl font-heading font-bold text-neon-blue mb-2">{service.title}</h3>
            <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(service)}
                className="flex-1 px-4 py-2 border border-neon-blue text-neon-blue rounded-lg font-semibold hover:bg-neon-blue/10 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => service._id && handleDelete(service._id)}
                className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500/10 transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default ServicesManagement;

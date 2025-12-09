import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useModal } from '../../hooks/useModal';

interface PricingPlan {
  _id?: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  popular: boolean;
  order: number;
}

const PricingManagement = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<PricingPlan>({
    name: '',
    tagline: '',
    price: '',
    period: '',
    features: [],
    cta: 'Get Started',
    popular: false,
    order: 0,
  });
  const [featureInput, setFeatureInput] = useState('');
  const { showAlert, showConfirm, ModalComponent } = useModal();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await api.getPricing();
      setPlans(response.data);
    } catch (error: any) {
      await showAlert('Failed to fetch pricing plans: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPlan?._id) {
        await api.updatePricing(editingPlan._id, formData);
      } else {
        await api.createPricing(formData);
      }
      await fetchPlans();
      resetForm();
      await showAlert('Pricing plan saved successfully!');
    } catch (error: any) {
      await showAlert('Failed to save pricing plan: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm('Are you sure you want to delete this pricing plan?');
    if (!confirmed) return;
    
    try {
      await api.deletePricing(id);
      await fetchPlans();
      await showAlert('Pricing plan deleted successfully!');
    } catch (error: any) {
      await showAlert('Failed to delete pricing plan: ' + error.message);
    }
  };

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan);
    setFormData(plan);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      tagline: '',
      price: '',
      period: '',
      features: [],
      cta: 'Get Started',
      popular: false,
      order: 0,
    });
    setEditingPlan(null);
    setShowForm(false);
    setFeatureInput('');
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...formData.features, featureInput.trim()],
      });
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return <div className="text-neon-blue">Loading pricing plans...</div>;
  }

  return (
    <>
      <ModalComponent />
      <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-heading font-bold text-neon-blue">Pricing Plans</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-neon-blue transition-all"
        >
          {showForm ? 'Cancel' : '+ Add Plan'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-8 glass rounded-xl p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                required
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                placeholder="₹9,999"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">Period</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                placeholder="one-time or month"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neon-blue mb-2">CTA Text</label>
              <input
                type="text"
                value={formData.cta}
                onChange={(e) => setFormData({ ...formData, cta: e.target.value })}
                required
                className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
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

          <div>
            <label className="block text-sm font-semibold text-neon-blue mb-2">Features</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                className="flex-1 px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                placeholder="Add a feature"
              />
              <button
                type="button"
                onClick={addFeature}
                className="px-4 py-2 bg-neon-blue text-space-black rounded-lg font-semibold"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-lg flex items-center gap-2"
                >
                  {feature}
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="popular"
              checked={formData.popular}
              onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
              className="w-4 h-4"
            />
            <label htmlFor="popular" className="text-gray-300">Mark as Popular</label>
          </div>

          <button
            type="submit"
            className="px-6 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-neon-blue transition-all"
          >
            {editingPlan ? 'Update Plan' : 'Create Plan'}
          </button>
        </form>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="glass rounded-xl p-6 border border-neon-blue/20"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-neon-blue">{plan.name}</h3>
                <p className="text-gray-400 text-sm">{plan.tagline}</p>
              </div>
              {plan.popular && (
                <span className="px-2 py-1 bg-neon-blue text-space-black text-xs font-semibold rounded">
                  Popular
                </span>
              )}
            </div>
            <div className="mb-4">
              <span className="text-2xl font-bold text-white">{plan.price}</span>
              {plan.period && <span className="text-gray-400 ml-2">/ {plan.period}</span>}
            </div>
            <ul className="mb-4 space-y-2">
              {plan.features.slice(0, 3).map((feature, idx) => (
                <li key={idx} className="text-sm text-gray-300">✓ {feature}</li>
              ))}
              {plan.features.length > 3 && (
                <li className="text-sm text-gray-400">+{plan.features.length - 3} more</li>
              )}
            </ul>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(plan)}
                className="flex-1 px-4 py-2 border border-neon-blue text-neon-blue rounded-lg font-semibold hover:bg-neon-blue/10 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => plan._id && handleDelete(plan._id)}
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

export default PricingManagement;

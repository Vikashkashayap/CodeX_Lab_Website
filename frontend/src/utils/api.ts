const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = {
  async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('adminToken');
    
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  // Public request (no auth token)
  async publicRequest(endpoint: string, options: RequestInit = {}) {
    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Request failed');
    }

    return data;
  },

  // Pricing
  getPricing: () => api.request('/pricing'),
  createPricing: (data: any) => api.request('/pricing', { method: 'POST', body: JSON.stringify(data) }),
  updatePricing: (id: string, data: any) => api.request(`/pricing/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deletePricing: (id: string) => api.request(`/pricing/${id}`, { method: 'DELETE' }),

  // Services
  getServices: () => api.request('/content/services'),
  createService: (data: any) => api.request('/content/services', { method: 'POST', body: JSON.stringify(data) }),
  updateService: (id: string, data: any) => api.request(`/content/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteService: (id: string) => api.request(`/content/services/${id}`, { method: 'DELETE' }),

  // Content
  getContent: () => api.request('/content'),
  getContentBySection: (section: string) => api.request(`/content/section/${section}`),
  updateContent: (data: any) => api.request('/content/section', { method: 'POST', body: JSON.stringify(data) }),

  // Admin
  login: (email: string, password: string) => 
    api.request('/admin/login', { 
      method: 'POST', 
      body: JSON.stringify({ email, password }) 
    }),
  verifyToken: () => api.request('/admin/verify'),

  // Contact/Leads
  submitContact: (data: any) => 
    api.publicRequest('/contact/submit', { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }),
  getLeads: () => api.request('/contact/leads'),
  updateLeadStatus: (id: string, status: string) => 
    api.request(`/contact/leads/${id}/status`, { 
      method: 'PUT', 
      body: JSON.stringify({ status }) 
    }),
  deleteLead: (id: string) => api.request(`/contact/leads/${id}`, { method: 'DELETE' }),
};

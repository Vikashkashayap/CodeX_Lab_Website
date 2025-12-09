import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useModal } from '../../hooks/useModal';

interface Lead {
  _id: string;
  name: string;
  email: string;
  projectType: string;
  budgetRange: string;
  message: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  createdAt: string;
  updatedAt: string;
}

const LeadsManagement = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const { showAlert, showConfirm, ModalComponent } = useModal();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await api.getLeads();
      setLeads(response.data);
    } catch (error: any) {
      await showAlert('Failed to fetch leads: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await api.updateLeadStatus(id, newStatus);
      await fetchLeads();
      await showAlert('Lead status updated successfully!');
    } catch (error: any) {
      await showAlert('Failed to update lead status: ' + error.message);
    }
  };

  const handleDelete = async (id: string) => {
    const confirmed = await showConfirm('Are you sure you want to delete this lead?');
    if (!confirmed) return;
    
    try {
      await api.deleteLead(id);
      await fetchLeads();
      await showAlert('Lead deleted successfully!');
    } catch (error: any) {
      await showAlert('Failed to delete lead: ' + error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/50';
      case 'contacted':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50';
      case 'qualified':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/50';
      case 'converted':
        return 'bg-green-500/20 text-green-400 border-green-500/50';
      case 'lost':
        return 'bg-red-500/20 text-red-400 border-red-500/50';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/50';
    }
  };

  const filteredLeads = filterStatus === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filterStatus);

  if (loading) {
    return <div className="text-neon-blue">Loading leads...</div>;
  }

  return (
    <>
      <ModalComponent />
      <div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-heading font-bold text-neon-blue">Client Leads</h2>
        
        {/* Status Filter */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === 'all'
                ? 'bg-neon-blue text-space-black'
                : 'bg-cyber-navy/50 text-gray-400 hover:text-neon-blue border border-neon-blue/30'
            }`}
          >
            All ({leads.length})
          </button>
          <button
            onClick={() => setFilterStatus('new')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === 'new'
                ? 'bg-blue-500 text-white'
                : 'bg-cyber-navy/50 text-gray-400 hover:text-blue-400 border border-blue-500/30'
            }`}
          >
            New ({leads.filter(l => l.status === 'new').length})
          </button>
          <button
            onClick={() => setFilterStatus('contacted')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === 'contacted'
                ? 'bg-yellow-500 text-white'
                : 'bg-cyber-navy/50 text-gray-400 hover:text-yellow-400 border border-yellow-500/30'
            }`}
          >
            Contacted ({leads.filter(l => l.status === 'contacted').length})
          </button>
          <button
            onClick={() => setFilterStatus('qualified')}
            className={`px-4 py-2 rounded-lg font-semibold transition-all ${
              filterStatus === 'qualified'
                ? 'bg-purple-500 text-white'
                : 'bg-cyber-navy/50 text-gray-400 hover:text-purple-400 border border-purple-500/30'
            }`}
          >
            Qualified ({leads.filter(l => l.status === 'qualified').length})
          </button>
        </div>
      </div>

      {filteredLeads.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          <p className="text-lg">No leads found</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead._id}
              className="glass rounded-xl p-6 border border-neon-blue/20 hover:border-neon-blue/40 transition-all"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-heading font-bold text-neon-blue mb-1">
                        {lead.name}
                      </h3>
                      <p className="text-gray-400 text-sm">{lead.email}</p>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${getStatusColor(
                        lead.status
                      )}`}
                    >
                      {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Project Type:</span>
                      <span className="text-white ml-2 capitalize">{lead.projectType}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Budget:</span>
                      <span className="text-white ml-2">{lead.budgetRange}</span>
                    </div>
                  </div>

                  <div>
                    <span className="text-gray-500 text-sm">Message:</span>
                    <p className="text-gray-300 mt-1 text-sm">{lead.message}</p>
                  </div>

                  <div className="text-xs text-gray-500">
                    Submitted: {new Date(lead.createdAt).toLocaleString()}
                  </div>
                </div>

                <div className="flex flex-col gap-2 md:min-w-[200px]">
                  <label className="text-sm font-semibold text-neon-blue mb-1">
                    Update Status:
                  </label>
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                    className="px-3 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white text-sm focus:outline-none focus:border-neon-blue"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                  </select>
                  <button
                    onClick={() => handleDelete(lead._id)}
                    className="px-4 py-2 border border-red-500 text-red-500 rounded-lg font-semibold hover:bg-red-500/10 transition-all text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default LeadsManagement;


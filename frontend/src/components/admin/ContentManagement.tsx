import { useState, useEffect } from 'react';
import { api } from '../../utils/api';
import { useModal } from '../../hooks/useModal';

interface ContentSection {
  _id?: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  content?: any;
}

const sections = [
  { key: 'services', label: 'Services Section' },
  { key: 'features', label: 'Features Section' },
  { key: 'about', label: 'About Section' },
  { key: 'contact', label: 'Contact Section' },
];

const ContentManagement = () => {
  const [content, setContent] = useState<ContentSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<ContentSection>({
    section: '',
    title: '',
    subtitle: '',
    description: '',
  });
  const { showAlert, ModalComponent } = useModal();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.getContent();
      setContent(response.data.content || []);
    } catch (error: any) {
      await showAlert('Failed to fetch content: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (sectionKey: string) => {
    const existing = content.find((c) => c.section === sectionKey);
    if (existing) {
      setFormData(existing);
    } else {
      setFormData({
        section: sectionKey,
        title: '',
        subtitle: '',
        description: '',
      });
    }
    setEditingSection(sectionKey);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.updateContent(formData);
      await fetchContent();
      setEditingSection(null);
      await showAlert('Content updated successfully!');
    } catch (error: any) {
      await showAlert('Failed to update content: ' + error.message);
    }
  };

  if (loading) {
    return <div className="text-neon-blue">Loading content...</div>;
  }

  return (
    <>
      <ModalComponent />
      <div>
      <h2 className="text-2xl font-heading font-bold text-neon-blue mb-6">Content Sections</h2>

      <div className="space-y-6">
        {sections.map((section) => {
          const sectionContent = content.find((c) => c.section === section.key);
          const isEditing = editingSection === section.key;

          return (
            <div key={section.key} className="glass rounded-xl p-6 border border-neon-blue/20">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-heading font-semibold text-neon-blue">{section.label}</h3>
                <button
                  onClick={() => handleEdit(section.key)}
                  className="px-4 py-2 border border-neon-blue text-neon-blue rounded-lg font-semibold hover:bg-neon-blue/10 transition-all"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-neon-blue mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title || ''}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neon-blue mb-2">Subtitle</label>
                    <input
                      type="text"
                      value={formData.subtitle || ''}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-neon-blue mb-2">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-neon-blue transition-all"
                  >
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="text-gray-300 space-y-2">
                  {sectionContent?.title && (
                    <p className="text-lg font-semibold">{sectionContent.title}</p>
                  )}
                  {sectionContent?.subtitle && (
                    <p className="text-gray-400">{sectionContent.subtitle}</p>
                  )}
                  {sectionContent?.description && (
                    <p className="text-sm">{sectionContent.description}</p>
                  )}
                  {!sectionContent && (
                    <p className="text-gray-500 italic">No content set for this section</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </>
  );
};

export default ContentManagement;

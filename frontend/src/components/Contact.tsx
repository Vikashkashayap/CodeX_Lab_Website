import { useState } from 'react'
import { api } from '../utils/api'
import { useModal } from '../hooks/useModal'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budgetRange: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const { showAlert, ModalComponent } = useModal()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      const response = await api.submitContact(formData)
      await showAlert(response.message || 'Thank you for your inquiry! We will get back to you within 24 hours.')
      // Reset form
      setFormData({
        name: '',
        email: '',
        projectType: '',
        budgetRange: '',
        message: '',
      })
    } catch (error: any) {
      await showAlert(error.message || 'Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <ModalComponent />
      <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold mb-4">
            Let's Build Your <span className="neon-text">Next Big Thing</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Tell us about your project and get a personalized strategy in 24 hours.
          </p>
        </div>

        <div className="max-w-3xl mx-auto px-4">
          <div className="glass rounded-2xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 to-electric-purple/10"></div>
            <form onSubmit={handleSubmit} className="relative z-10 space-y-4 md:space-y-6">
              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neon-blue mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neon-blue mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-semibold text-neon-blue mb-2">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                  >
                    <option value="">Select project type</option>
                    <option value="saas">SaaS Development</option>
                    <option value="website">Website Development</option>
                    <option value="app">App Development</option>
                    <option value="ai">AI Integration</option>
                    <option value="dashboard">Dashboard & Admin Panel</option>
                    <option value="seo">SEO & Marketing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budgetRange" className="block text-sm font-semibold text-neon-blue mb-2">
                    Budget Range
                  </label>
                  <select
                    id="budgetRange"
                    name="budgetRange"
                    value={formData.budgetRange}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all"
                  >
                    <option value="">Select budget range</option>
                    <option value="5k-10k">₹5,000 - ₹10,000</option>
                    <option value="10k-25k">₹10,000 - ₹25,000</option>
                    <option value="25k-50k">₹25,000 - ₹50,000</option>
                    <option value="50k-100k">₹50,000 - ₹100,000</option>
                    <option value="100k+">₹100,000+</option>
                    <option value="custom">Custom Quote</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neon-blue mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-cyber-navy/50 border border-neon-blue/30 rounded-lg text-white focus:outline-none focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 transition-all resize-none"
                  placeholder="Tell us about your project requirements..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-neon-blue text-space-black rounded-lg font-semibold text-base hover:shadow-[0_0_20px_rgba(10,227,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {loading ? 'Sending...' : 'Get Started'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    </>
  )
}

export default Contact


const Hero = () => {
  // Hero dashboard image from Unsplash - futuristic tech dashboard
  const heroImage = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-bg"></div>
      
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(10, 227, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 227, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-neon-blue/10 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-electric-purple/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                <span className="text-white">Build, Automate & Scale</span>
                <br />
                <span className="neon-text">With Next-Gen AI-Powered</span>
                <br />
                <span className="text-white">SaaS Solutions</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
                We create world-class Websites, Apps, Dashboards & AI Systems designed for performance, automation, and growth.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const offset = 100;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 bg-neon-blue text-space-black rounded-lg font-semibold text-base hover:shadow-[0_0_20px_rgba(10,227,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Start Your Project
              </button>
              <button 
                onClick={() => {
                  const servicesSection = document.getElementById('services');
                  if (servicesSection) {
                    const offset = 100;
                    const elementPosition = servicesSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="px-6 py-3 border border-neon-blue text-neon-blue rounded-lg font-semibold text-base hover:bg-neon-blue/10 hover:shadow-[0_0_15px_rgba(10,227,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* Right - Dashboard Image */}
          <div className="relative">
            <div className="glass rounded-2xl p-8 shadow-neon-blue/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 to-electric-purple/20 opacity-50"></div>
              <img 
                src={heroImage} 
                alt="Futuristic AI Dashboard" 
                className="relative z-10 w-full h-auto rounded-lg object-cover"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-neon-blue/20 rounded-2xl blur-2xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero


import { useState, useEffect } from 'react'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("up")

  useEffect(() => {
    let lastScrollY = window.scrollY

    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down")
      } else {
        setScrollDirection("up")
      }

      // Check if user scrolled
      setScrolled(currentScrollY > 20)

      lastScrollY = currentScrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header
      className={`
        fixed z-50 transition-all duration-300 
        ${scrolled 
          ? 'glass shadow-neon-blue/20 mt-[8px] mx-[12px] rounded-2xl border border-white/10' 
          : 'bg-transparent mt-0 mx-0'
        }
        ${scrollDirection === "down" && scrolled ? 'translate-y-3' : 'translate-y-0'}
      `}
      style={{ width: scrolled ? "calc(100% - 24px)" : "100%" }}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <div className="text-2xl font-heading font-bold neon-text">
            NextGen SaaS
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="hover:text-neon-blue transition-colors">Services</a>
            <a href="#about" className="hover:text-neon-blue transition-colors">About</a>
            <a href="#pricing" className="hover:text-neon-blue transition-colors">Pricing</a>
            <a href="#contact" className="hover:text-neon-blue transition-colors">Contact</a>
            <button className="px-6 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-neon-blue transition-all duration-300 hover:scale-105">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-neon-blue z-50 relative"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`
          md:hidden fixed top-0 left-0 w-full h-screen 
          bg-space-black/95 backdrop-blur-lg 
          transition-all duration-300 z-40
          ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}>
          <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
            <a onClick={closeMenu} href="#services" className="text-2xl text-white hover:text-neon-blue">Services</a>
            <a onClick={closeMenu} href="#about" className="text-2xl text-white hover:text-neon-blue">About</a>
            <a onClick={closeMenu} href="#pricing" className="text-2xl text-white hover:text-neon-blue">Pricing</a>
            <a onClick={closeMenu} href="#contact" className="text-2xl text-white hover:text-neon-blue">Contact</a>

            <button 
              onClick={closeMenu}
              className="px-8 py-3 bg-neon-blue text-space-black text-lg rounded-lg font-semibold hover:shadow-neon-blue transition-all duration-300 hover:scale-105 mt-4"
            >
              Get Started
            </button>
          </div>
        </div>

      </nav>
    </header>
  )
}

export default Header

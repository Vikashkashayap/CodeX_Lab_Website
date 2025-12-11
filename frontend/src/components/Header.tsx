import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollDirection, setScrollDirection] = useState("up")
  const location = useLocation()

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

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const toggleMenu = () => setMenuOpen(!menuOpen)
  const closeMenu = () => setMenuOpen(false)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const id = href.replace('#', '')
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        closeMenu()
      }
    } else {
      closeMenu()
    }
  }

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300 
          ${scrolled 
            ? 'glass shadow-neon-blue/20 mt-2 mx-3 rounded-2xl border border-white/10 md:mt-[8px] md:mx-[12px]' 
            : 'bg-transparent mt-0 mx-0'
          }
          ${scrollDirection === "down" && scrolled ? 'translate-y-3' : 'translate-y-0'}
        `}
        style={{ width: scrolled ? "calc(100% - 24px)" : "100%" }}
      >
        <nav className="container mx-auto px-4 py-3 md:px-6 md:py-4">
          <div className="flex items-center justify-between">
            
            {/* Logo */}
            <Link 
              to="/" 
              onClick={() => {
                if (location.pathname === '/') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              className="text-xl md:text-2xl font-heading font-bold neon-text hover:scale-105 transition-transform duration-300"
            >
              NextGen SaaS
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-neon-blue transition-colors text-sm xl:text-base">Services</a>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-neon-blue transition-colors text-sm xl:text-base">About</a>
              <a href="#pricing" onClick={(e) => handleNavClick(e, '#pricing')} className="hover:text-neon-blue transition-colors text-sm xl:text-base">Pricing</a>
              <a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-neon-blue transition-colors text-sm xl:text-base">Contact</a>
              <Link 
                to="/admin/login" 
                className="px-4 py-2 text-neon-blue border border-neon-blue rounded-lg font-semibold hover:bg-neon-blue/10 hover:shadow-[0_0_15px_rgba(10,227,255,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 text-sm xl:text-base"
              >
                Login
              </Link>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    const offset = 100;
                    const elementPosition = contactSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                  }
                }}
                className="px-4 py-2 bg-neon-blue text-space-black rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(10,227,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95 text-sm xl:text-base"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={toggleMenu}
              className="lg:hidden text-neon-blue z-50 relative p-2"
              aria-label="Toggle menu"
              data-mobile-menu
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

          {/* Mobile Menu - Improved Design */}
          <div className={`
            lg:hidden fixed inset-0 w-full h-screen 
            bg-space-black/98 backdrop-blur-xl
            transition-all duration-300 ease-in-out z-40
            ${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}
          `}>
            {/* Close Button */}
            <div className="absolute top-4 right-4 z-50">
              <button
                onClick={closeMenu}
                className="p-3 text-neon-blue hover:bg-neon-blue/10 rounded-full transition-all"
                aria-label="Close menu"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col items-center justify-center h-full space-y-6 px-6 pt-20 pb-32">
              <a 
                onClick={(e) => handleNavClick(e, '#services')} 
                href="#services" 
                className="text-2xl md:text-3xl text-white hover:text-neon-blue transition-all duration-300 hover:scale-110 font-medium"
              >
                Services
              </a>
              <a 
                onClick={(e) => handleNavClick(e, '#about')} 
                href="#about" 
                className="text-2xl md:text-3xl text-white hover:text-neon-blue transition-all duration-300 hover:scale-110 font-medium"
              >
                About
              </a>
              <a 
                onClick={(e) => handleNavClick(e, '#pricing')} 
                href="#pricing" 
                className="text-2xl md:text-3xl text-white hover:text-neon-blue transition-all duration-300 hover:scale-110 font-medium"
              >
                Pricing
              </a>
              <a 
                onClick={(e) => handleNavClick(e, '#contact')} 
                href="#contact" 
                className="text-2xl md:text-3xl text-white hover:text-neon-blue transition-all duration-300 hover:scale-110 font-medium"
              >
                Contact
              </a>

              <div className="flex flex-col gap-3 w-full max-w-xs mt-8">
                <Link 
                  to="/admin/login"
                  onClick={closeMenu}
                  className="px-6 py-2.5 text-center text-neon-blue border border-neon-blue text-base rounded-lg font-semibold hover:bg-neon-blue/10 hover:border-neon-blue/80 transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(10,227,255,0.2)]"
                >
                  Login
                </Link>

                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      const offset = 100;
                      const elementPosition = contactSection.getBoundingClientRect().top;
                      const offsetPosition = elementPosition + window.pageYOffset - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                    closeMenu();
                  }}
                  className="px-6 py-2.5 bg-neon-blue text-space-black text-base rounded-lg font-semibold hover:shadow-[0_0_20px_rgba(10,227,255,0.6)] transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>

        </nav>
      </header>
    </>
  )
}

export default Header

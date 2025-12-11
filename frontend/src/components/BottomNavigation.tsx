import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNavigation = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [activeSection, setActiveSection] = useState('hero');

  // Don't show on admin pages
  if (location.pathname.includes('/admin')) {
    return null;
  }

  // Detect active section on scroll
  useEffect(() => {
    if (!isHomePage) {
      setActiveSection('hero');
      return;
    }

    const handleScroll = () => {
      const sections = ['hero', 'services', 'pricing', 'contact'];
      const scrollPosition = window.scrollY + 150; // Increased offset for better detection
      let current = 'hero';

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i]);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.pageYOffset;
          
          if (elementTop <= scrollPosition) {
            current = sections[i];
            break;
          }
        }
      }
      
      setActiveSection(current);
    };

    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [isHomePage]);

  const navItems = [
    {
      label: 'Home',
      href: '/#hero',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      label: 'Services',
      href: '/#services',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Pricing',
      href: '/#pricing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Contact',
      href: '/#contact',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      label: 'Login',
      href: '/admin/login',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      )
    }
  ];

  const handleClick = (href: string, e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('/#')) {
      e.preventDefault();
      const id = href.replace('/#', '');
      
      // Immediately update active section
      setActiveSection(id);
      
      if (id === 'hero') {
        // Scroll to top for home
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(id);
        if (element) {
          const offset = 100; // Header height + some padding
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          
          window.scrollTo({
            top: Math.max(0, offsetPosition),
            behavior: 'smooth'
          });
          
          // Update active section after scroll completes
          setTimeout(() => {
            setActiveSection(id);
          }, 500);
        }
      }
    }
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-neon-blue/20 bg-space-black/95 backdrop-blur-xl safe-area-inset-bottom">
      <div className="flex items-center justify-around h-14 px-1">
        {navItems.map((item) => {
          const sectionId = item.href.replace('/#', '').replace('/', '');
          const isActive = item.href.startsWith('/admin') 
            ? location.pathname === item.href
            : isHomePage && activeSection === sectionId;
          
          return item.href.startsWith('/admin') ? (
            <Link
              key={item.label}
              to={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative py-1 ${
                isActive ? 'text-neon-blue' : 'text-gray-400'
              } hover:text-neon-blue active:scale-95`}
            >
              <div className={`${isActive ? 'scale-110 text-neon-blue' : ''} transition-all duration-300 mb-0.5`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-neon-blue' : ''} transition-colors`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-neon-blue rounded-full shadow-[0_0_8px_rgba(10,227,255,0.8)]"></div>
              )}
            </Link>
          ) : (
            <a
              key={item.label}
              href={item.href}
              onClick={(e) => handleClick(item.href, e)}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-all duration-300 relative py-1 ${
                isActive ? 'text-neon-blue' : 'text-gray-400'
              } hover:text-neon-blue active:scale-95`}
            >
              <div className={`${isActive ? 'scale-110 text-neon-blue' : ''} transition-all duration-300 mb-0.5`}>
                {item.icon}
              </div>
              <span className={`text-[10px] font-medium ${isActive ? 'text-neon-blue' : ''} transition-colors`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-neon-blue rounded-full shadow-[0_0_8px_rgba(10,227,255,0.8)]"></div>
              )}
            </a>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNavigation;


import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', path: '/' },
    { name: 'THREAT ENGINE', path: '#threat-engine' },
    { name: 'FAQ', path: '#faq' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0A0A]/95 backdrop-blur-xl border-b border-[#D90429]/40 h-14 shadow-2xl shadow-black/80'
          : 'bg-transparent border-b border-[#2A2A2A]/40 h-20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
        {/* Industrial Brand Emblem */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center h-10 w-10 bg-[#171717] border border-[#2A2A2A] group-hover:border-[#D90429] transition-colors">
            <Shield className="h-5 w-5 text-[#D90429] group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 h-2 w-2 bg-[#D90429]" />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-sm tracking-widest text-[#F5F5F5] uppercase flex items-center gap-1.5">
              AEGIS <span className="text-[#D90429] font-mono text-xs">GUARDIAN AI</span>
            </span>
            <span className="text-[9px] text-[#888888] tracking-widest font-mono uppercase">Quaid-e-Azam Int. Hospital</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              className={`text-[11px] font-mono tracking-widest transition-all hover:text-[#D90429] ${
                isActive(link.path) ? 'text-[#D90429] font-bold' : 'text-[#888888]'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Industrial Action CTAs */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/login">
            <button className="px-4 py-2 text-xs font-mono tracking-wider text-[#F5F5F5] bg-[#171717] border border-[#2A2A2A] hover:border-[#D90429] hover:text-[#D90429] transition-all duration-300">
              OPERATOR LOGIN
            </button>
          </Link>
          <Link to="/register">
            <button className="group relative px-5 py-2 text-xs font-mono tracking-wider font-bold text-[#F5F5F5] bg-[#0A0A0A] border border-[#D90429] shadow-[0_0_15px_rgba(217,4,41,0.2)] hover:shadow-[0_0_25px_rgba(217,4,41,0.5)] transition-all duration-300 flex items-center gap-2">
              <span>PROTECT HOSPITAL</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#D90429] group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#F5F5F5] bg-[#171717] border border-[#2A2A2A] hover:border-[#D90429] focus:outline-none"
          >
            {mobileOpen ? <X className="h-5 w-5 text-[#D90429]" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-b border-[#2A2A2A] bg-[#0A0A0A] px-6 py-6 space-y-4 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={() => setMobileOpen(false)}
              className="block py-2 text-[#888888] hover:text-[#D90429] border-b border-[#171717]"
            >
              {link.name}
            </a>
          ))}
          <div className="pt-4 flex flex-col space-y-3">
            <Link to="/login" onClick={() => setMobileOpen(false)}>
              <button className="w-full py-2.5 text-xs text-[#F5F5F5] bg-[#171717] border border-[#2A2A2A]">
                OPERATOR LOGIN
              </button>
            </Link>
            <Link to="/register" onClick={() => setMobileOpen(false)}>
              <button className="w-full py-2.5 text-xs font-bold text-[#F5F5F5] bg-[#0A0A0A] border border-[#D90429]">
                START PROTECTING HOSPITAL
              </button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

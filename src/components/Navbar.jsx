import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const HOME_LINKS = [
  { href: '#about',    label: 'Hakkımda', anchor: true },
  { href: '#skills',   label: 'Beceriler', anchor: true },
  { href: '#projects', label: 'Projeler', anchor: true },
  { href: '#contact',  label: 'İletişim', anchor: true },
  { href: '/blog',     label: 'Blog',     anchor: false },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);
  const location = useLocation();
  const isBlog = location.pathname.startsWith('/blog');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [location]);

  const renderLink = ({ href, label, anchor }) => {
    if (!anchor || isBlog) {
      return (
        <Link
          to={anchor ? '/' + href : href}
          className={location.pathname === href ? 'active' : ''}
        >
          {label}
        </Link>
      );
    }
    return <a href={href}>{label}</a>;
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">gg.</Link>

        <ul className="nav-links">
          {HOME_LINKS.map(link => (
            <li key={link.href}>{renderLink(link)}</li>
          ))}
        </ul>

        <button
          className="nav-toggle"
          onClick={() => setOpen(v => !v)}
          aria-label="Menü"
        >
          <span /><span /><span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            className="nav-mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {HOME_LINKS.map(link => (
              <li key={link.href}>{renderLink(link)}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}

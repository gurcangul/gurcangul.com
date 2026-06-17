import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Gürcan Gül</p>
      <p className="footer-sub">React + Vite · Framer Motion</p>
    </footer>
  );
}

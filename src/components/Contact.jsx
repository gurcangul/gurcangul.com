import { motion } from 'framer-motion';
import './Contact.css';

const CARDS = [
  { href: 'mailto:ggurcangul@gmail.com',           icon: 'fas fa-envelope',  label: 'E-posta',  value: 'ggurcangul@gmail.com' },
  { href: 'https://github.com/gurcangul',           icon: 'fab fa-github',    label: 'GitHub',   value: 'github.com/gurcangul' },
  { href: 'https://www.linkedin.com/in/gurcangul',  icon: 'fab fa-linkedin',  label: 'LinkedIn', value: 'linkedin.com/in/gurcangul' },
];

export default function Contact() {
  return (
    <section id="contact">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          İletişim
        </motion.h2>
        <p className="section-sub">Bir proje fikriniz mi var? Konuşalım.</p>

        <div className="contact-grid">
          {CARDS.map(({ href, icon, label, value }, i) => (
            <motion.a
              key={label}
              className="contact-card"
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <i className={icon} />
              <div>
                <span className="contact-label">{label}</span>
                <span className="contact-value">{value}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

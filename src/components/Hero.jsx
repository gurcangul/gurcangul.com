import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Hero.css';

const TITLES = [
  'Full-Stack Developer',
  'React & Spring Boot',
  'TypeScript / Java',
  'Software Engineer',
];

function useTyped(titles, typingSpeed = 110, deletingSpeed = 60, pauseMs = 1800) {
  const [display, setDisplay] = useState('');
  const [idx, setIdx]         = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = titles[idx];
    const next = deleting
      ? current.slice(0, display.length - 1)
      : current.slice(0, display.length + 1);

    const delay = deleting ? deletingSpeed : typingSpeed;

    const timer = setTimeout(() => {
      setDisplay(next);
      if (!deleting && next === current) {
        setTimeout(() => setDeleting(true), pauseMs);
      } else if (deleting && next === '') {
        setDeleting(false);
        setIdx(i => (i + 1) % titles.length);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [display, deleting, idx]);

  return display;
}

const SOCIALS = [
  { href: 'https://github.com/gurcangul',           icon: 'fab fa-github',    label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/gurcangul',  icon: 'fab fa-linkedin',  label: 'LinkedIn' },
  { href: 'https://www.twitter.com/gurcangul',      icon: 'fab fa-x-twitter', label: 'Twitter' },
  { href: 'mailto:ggurcangul@gmail.com',            icon: 'fas fa-envelope',  label: 'Email' },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } };

export default function Hero() {
  const typed = useTyped(TITLES);

  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />

      <motion.div
        className="hero-content"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
      >
        <motion.p className="hero-greeting" variants={fadeUp}>
          Merhaba, ben
        </motion.p>

        <motion.h1 className="hero-name" variants={fadeUp}>
          Gürcan Gül
        </motion.h1>

        <motion.div className="hero-typed" variants={fadeUp}>
          <span>{typed}</span><span className="cursor">|</span>
        </motion.div>

        <motion.p className="hero-desc" variants={fadeUp}>
          Fintech dünyasında Full-Stack Software Engineer.
          React &amp; TypeScript ile kullanıcı deneyimi, Java &amp; Spring Boot ile sağlam backend sistemleri inşa ediyorum.
        </motion.p>

        <motion.div className="hero-actions" variants={fadeUp}>
          <a href="#projects" className="btn btn-primary">Projelerimi Gör</a>
          <a
            href="https://gurcangul.com/Gurcan-Gul-2026-01-Resume.pdf"
            target="_blank" rel="noopener"
            className="btn btn-outline"
          >
            <i className="fas fa-file-pdf" /> Resume
          </a>
          <a href="mailto:ggurcangul@gmail.com" className="btn btn-outline">
            İletişime Geç
          </a>
        </motion.div>

        <motion.div className="hero-socials" variants={fadeUp}>
          {SOCIALS.map(({ href, icon, label }) => (
            <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined}
               rel="noopener" aria-label={label}>
              <i className={icon} />
            </a>
          ))}
        </motion.div>
      </motion.div>

      <motion.a
        href="#about"
        className="scroll-down"
        aria-label="Aşağı kaydır"
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <i className="fas fa-chevron-down" />
      </motion.a>
    </section>
  );
}

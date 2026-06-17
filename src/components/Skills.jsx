import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Skills.css';

const CATEGORIES = ['Tümü', 'Frontend', 'Backend', 'DevOps & Araçlar'];

const SKILLS = [
  // Frontend
  { icon: 'fab fa-react',       color: '#61dafb', title: 'React',           desc: 'React 18, Hooks, Context, Redux, React Native', cat: 'Frontend' },
  { icon: 'fab fa-js-square',   color: '#f0db4f', title: 'TypeScript / JS', desc: 'TypeScript, ES2022+, async/await, DOM API',     cat: 'Frontend' },
  { icon: 'fas fa-palette',     color: '#cc6699', title: 'UI & Styling',    desc: 'Material UI, Ant Design, Framer Motion, CSS',   cat: 'Frontend' },

  // Backend
  { icon: 'fab fa-java',        color: '#b07219', title: 'Java',            desc: 'Java 17, OOP, Collections, Stream API',         cat: 'Backend'  },
  { icon: 'spring',             color: '#6db33f', title: 'Spring Boot',     desc: 'REST API, JPA, Security, Microservices',        cat: 'Backend'  },
  { icon: 'fas fa-database',    color: '#58a6ff', title: 'Veritabanı',      desc: 'Oracle, SQL, PL/SQL, Hibernate ORM, H2',        cat: 'Backend'  },

  // DevOps & Araçlar
  { icon: 'fab fa-git-alt',     color: '#f05030', title: 'Git & CI/CD',     desc: 'Git, GitHub, Jenkins, Docker, Gradle',          cat: 'DevOps & Araçlar' },
  { icon: 'fas fa-vial',        color: '#bc8cff', title: 'Test',            desc: 'JUnit 5, Mockito, SonarQube, Postman',          cat: 'DevOps & Araçlar' },
  { icon: 'fas fa-shield-halved', color: '#3fb950', title: 'Güvenlik & API', desc: 'Spring Security, JWT, OpenAPI/Swagger',         cat: 'DevOps & Araçlar' },
];

function SpringIcon({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill={color} width="36" height="36" aria-hidden="true">
      <path d="M21.8537 1.4158a4.9608 4.9608 0 0 1-1.5856 2.1965 11.5619 11.5619 0 0 0-4.8443-5.9566 10.8944 10.8944 0 0 0-10.8987.3555 10.9536 10.9536 0 0 0-4.9474 9.1855 11.0404 11.0404 0 0 0 5.7346 9.6454 10.6978 10.6978 0 0 0 10.5186-.4473 10.5921 10.5921 0 0 0 5.0434-9.2105 11.0532 11.0532 0 0 0-.0206-5.779zm-4.0635 15.3435a8.9148 8.9148 0 0 1-5.8673 2.1503 9.0572 9.0572 0 0 1-4.6876-1.3028 9.1576 9.1576 0 0 1-4.5948-7.9487 9.0928 9.0928 0 0 1 4.0967-7.6138 8.9721 8.9721 0 0 1 9.0296-.2518 9.6069 9.6069 0 0 1 3.9577 4.6154 12.4614 12.4614 0 0 0-1.5044-1.0477 7.5954 7.5954 0 0 0-3.7618-.9951 7.9487 7.9487 0 0 0-4.5867 1.5044 7.6562 7.6562 0 0 0-2.8786 4.3968 7.4886 7.4886 0 0 0 .3555 4.4712 7.5954 7.5954 0 0 0 2.9836 3.3184 7.8331 7.8331 0 0 0 4.168 1.1501 7.5498 7.5498 0 0 0 3.974-1.1025 7.7625 7.7625 0 0 0 2.9049-3.1621 7.4774 7.4774 0 0 0 .7397-3.2246 9.9438 9.9438 0 0 1 .0813 1.2625 8.9678 8.9678 0 0 1-4.0967 7.6469z"/>
    </svg>
  );
}

export default function Skills() {
  const [active, setActive] = useState('Tümü');

  const filtered = active === 'Tümü' ? SKILLS : SKILLS.filter(s => s.cat === active);

  return (
    <section id="skills">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Beceriler
        </motion.h2>

        <div className="skills-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
              onClick={() => setActive(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map(({ icon, color, title, desc, cat }, i) => (
              <motion.div
                key={title}
                className="skill-card"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className="skill-icon">
                  {icon === 'spring'
                    ? <SpringIcon color={color} />
                    : <i className={icon} style={{ color }} />}
                </div>
                <span className="skill-cat-badge">{cat}</span>
                <h3>{title}</h3>
                <p>{desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

import { motion } from 'framer-motion';
import { useGitHub } from '../hooks/useGitHub';
import './About.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function About() {
  const { stats } = useGitHub('gurcangul');

  return (
    <section id="about" className="about-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial="hidden" whileInView="visible"
          viewport={{ once: true }} variants={fadeUp}
        >
          Hakkımda
        </motion.h2>

        <div className="about-grid">
          <motion.div
            className="about-avatar"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="avatar-ring">
              <i className="fas fa-user" />
            </div>
          </motion.div>

          <motion.div
            className="about-text"
            initial="hidden" whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            <motion.p variants={fadeUp}>
              Bilgisayar Mühendisiyim. Backend sistemler, REST API'ler ve kurumsal uygulamalar
              geliştirmeye odaklanıyorum. <strong>Java</strong> ve <strong>Spring Boot</strong> ekosistemi
              benim ana çalışma alanım.
            </motion.p>
            <motion.p variants={fadeUp}>
              Yazılımı sadece bir meslek olarak değil, sürekli öğrenilen bir zanaat olarak görüyorum.
              Temiz kod, iyi tasarım ve test edilebilir mimari benim için vazgeçilmez.
            </motion.p>

            <motion.div className="about-stats" variants={fadeUp}>
              {[
                { value: stats.repoCount || '—', label: 'GitHub Repo' },
                { value: stats.stars     || '—', label: 'Toplam Yıldız' },
                { value: stats.languages || '—', label: 'Dil / Teknoloji' },
              ].map(({ value, label }) => (
                <div className="stat" key={label}>
                  <span className="stat-num">{value}</span>
                  <span className="stat-label">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

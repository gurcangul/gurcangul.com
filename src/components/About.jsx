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
              İzmir Yüksek Teknoloji Enstitüsü Bilgisayar Mühendisliği mezunuyum.
              Şu an <strong>Yapı Kredi Teknoloji</strong>'de Full-Stack Software Engineer olarak çalışıyorum.
            </motion.p>
            <motion.p variants={fadeUp}>
              Frontend'de <strong>React</strong>, <strong>TypeScript</strong> ve modern UI kütüphaneleriyle
              kullanıcı odaklı arayüzler geliştiriyorum. Backend'de <strong>Java</strong> ve{' '}
              <strong>Spring Boot</strong> ile ölçeklenebilir REST API'ler ve mikroservisler inşa ediyorum.
            </motion.p>
            <motion.p variants={fadeUp}>
              JotForm'da React/Redux ile Gantt Chart, Trampax'ta React Native ile mobil uygulama,
              TEB'de TypeScript/React ile kurumsal internet bankacılığı geliştirdim.
              Full-stack söz konusu olduğunda hem UI tasarımını hem de servis katmanını uçtan uca yazabilirim.
            </motion.p>

            <motion.div className="about-stats" variants={fadeUp}>
              {[
                { value: '4+',                  label: 'Yıl Deneyim' },
                { value: stats.repoCount || '—', label: 'GitHub Repo' },
                { value: stats.languages || '—', label: 'Teknoloji' },
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

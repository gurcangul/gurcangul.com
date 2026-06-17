import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGitHub } from '../hooks/useGitHub';
import './Projects.css';

const FILTERS = ['Tümü', 'Java', 'JavaScript', 'Python', 'Diğer'];

function RepoCard({ repo, langColors }) {
  const lang  = repo.language || '';
  const color = langColors[lang] || '#8b949e';
  const filterKey = ['Java', 'JavaScript', 'Python'].includes(lang) ? lang : 'Diğer';
  const updated   = new Date(repo.updated_at).toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });

  return (
    <motion.a
      className="repo-card"
      href={repo.html_url}
      target="_blank" rel="noopener"
      data-filter={filterKey}
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className="repo-header">
        <span className="repo-name">
          <i className="fas fa-book-open" />
          {repo.name}
        </span>
        <i className="fas fa-external-link-alt repo-ext" />
      </div>

      <p className="repo-desc">
        {repo.description
          ? repo.description.length > 120
            ? repo.description.slice(0, 117) + '…'
            : repo.description
          : 'Açıklama eklenmemiş.'}
      </p>

      <div className="repo-footer">
        {lang && (
          <span className="repo-lang">
            <span className="lang-dot" style={{ background: color }} />
            {lang}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="repo-meta"><i className="fas fa-star" />{repo.stargazers_count}</span>
        )}
        {repo.forks_count > 0 && (
          <span className="repo-meta"><i className="fas fa-code-fork" />{repo.forks_count}</span>
        )}
        <span className="repo-date">{updated}</span>
      </div>
    </motion.a>
  );
}

export default function Projects() {
  const { repos, loading, error, langColors } = useGitHub('gurcangul');
  const [active, setActive] = useState('Tümü');

  const filtered = useMemo(() => {
    if (active === 'Tümü') return repos;
    return repos.filter(r => {
      const lang = r.language || '';
      const key  = ['Java', 'JavaScript', 'Python'].includes(lang) ? lang : 'Diğer';
      return key === active;
    });
  }, [repos, active]);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Projeler
        </motion.h2>
        <p className="section-sub">GitHub'daki açık kaynak projelerim</p>

        <div className="projects-filter">
          {FILTERS.map(f => (
            <button
              key={f}
              className={`filter-btn ${active === f ? 'active' : ''}`}
              onClick={() => setActive(f)}
            >
              {f}
            </button>
          ))}
        </div>

        {loading && (
          <div className="projects-state">
            <i className="fas fa-spinner fa-spin" />
            <p>Projeler yükleniyor...</p>
          </div>
        )}

        {error && (
          <div className="projects-state error">
            <i className="fas fa-triangle-exclamation" />
            <p>Yüklenemedi: {error}</p>
            <a href="https://github.com/gurcangul?tab=repositories" target="_blank" rel="noopener">
              GitHub'da görüntüle →
            </a>
          </div>
        )}

        {!loading && !error && (
          <motion.div className="projects-grid" layout>
            <AnimatePresence mode="popLayout">
              {filtered.map(repo => (
                <RepoCard key={repo.id} repo={repo} langColors={langColors} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="projects-footer">
          <a
            href="https://github.com/gurcangul?tab=repositories"
            target="_blank" rel="noopener"
            className="btn btn-outline"
          >
            <i className="fab fa-github" /> Tüm Repoları Gör
          </a>
        </div>
      </div>
    </section>
  );
}

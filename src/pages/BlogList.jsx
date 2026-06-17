import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';
import './BlogList.css';

const ALL_TAGS = ['Tümü', ...new Set(BLOG_POSTS.flatMap(p => p.tags))];

const fadeUp = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function BlogList() {
  const [activeTag, setActiveTag] = useState('Tümü');

  const filtered = useMemo(() =>
    activeTag === 'Tümü'
      ? BLOG_POSTS
      : BLOG_POSTS.filter(p => p.tags.includes(activeTag)),
    [activeTag]
  );

  return (
    <div className="blog-page">
      <div className="container">
        <motion.div
          className="blog-header"
          initial="hidden" animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          <motion.p className="blog-eyebrow" variants={fadeUp}>yazılar</motion.p>
          <motion.h1 className="blog-title" variants={fadeUp}>Blog</motion.h1>
          <motion.p className="blog-subtitle" variants={fadeUp}>
            Design patterns, Java, Spring Boot ve yazılım mühendisliği üzerine notlar.
          </motion.p>
        </motion.div>

        <div className="blog-tags">
          {ALL_TAGS.map(tag => (
            <button
              key={tag}
              className={`filter-btn ${activeTag === tag ? 'active' : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              className="blog-card"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Link to={`/blog/${post.id}`} className="blog-card-link">
                <div className="blog-card-inner">
                  <div className="blog-card-tags">
                    {post.tags.map(t => (
                      <span key={t} className="blog-tag">{t}</span>
                    ))}
                  </div>
                  <h2 className="blog-card-title">{post.title}</h2>
                  <p className="blog-card-summary">{post.summary}</p>
                  <div className="blog-card-footer">
                    <span className="blog-date">
                      <i className="fas fa-calendar-alt" />
                      {new Date(post.date).toLocaleDateString('tr-TR', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                    {post.project && (
                      <span className="blog-project">
                        <i className="fab fa-github" /> {post.project}
                      </span>
                    )}
                    <span className="blog-read-more">
                      Oku <i className="fas fa-arrow-right" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOG_POSTS } from '../data/blogPosts';
import { useEffect } from 'react';
import './BlogPost.css';

/* ── Basit Markdown → HTML dönüştürücü ── */
function renderMarkdown(md) {
  return md
    // Kod blokları (``` ... ```)
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="code-block"><code class="lang-${lang}">${escHtml(code.trim())}</code></pre>`)
    // Satır içi kod
    .replace(/`([^`]+)`/g, (_, c) => `<code class="inline-code">${escHtml(c)}</code>`)
    // H2
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    // H3
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    // Kalın
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Tablo
    .replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g, (_, head, body) => {
      const ths = head.split('|').filter(Boolean).map(c => `<th>${c.trim()}</th>`).join('');
      const rows = body.trim().split('\n').map(row => {
        const tds = row.split('|').filter(Boolean).map(c => `<td>${c.trim()}</td>`).join('');
        return `<tr>${tds}</tr>`;
      }).join('');
      return `<table><thead><tr>${ths}</tr></thead><tbody>${rows}</tbody></table>`;
    })
    // Liste
    .replace(/^[✅❌-] (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, m => `<ul>${m}</ul>`)
    // Çizgili metin (~~)
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
    // Çift satır sonu → paragraf
    .replace(/\n\n(?!<)/g, '</p><p>')
    .replace(/^(?!<)/, '<p>').replace(/(?!>)$/, '</p>')
    // Boş paragrafları temizle
    .replace(/<p><\/p>/g, '');
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function BlogPost() {
  const { id } = useParams();
  const post = BLOG_POSTS.find(p => p.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!post) return <Navigate to="/blog" replace />;

  const postIndex = BLOG_POSTS.indexOf(post);
  const prev = BLOG_POSTS[postIndex + 1];
  const next = BLOG_POSTS[postIndex - 1];

  return (
    <div className="post-page">
      <div className="post-container">

        {/* Geri butonu */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link to="/blog" className="post-back">
            <i className="fas fa-arrow-left" /> Blog'a dön
          </Link>
        </motion.div>

        {/* Başlık */}
        <motion.header
          className="post-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="post-tags">
            {post.tags.map(t => <span key={t} className="blog-tag">{t}</span>)}
          </div>
          <h1>{post.title}</h1>
          <div className="post-meta">
            <span>
              <i className="fas fa-calendar-alt" />
              {new Date(post.date).toLocaleDateString('tr-TR', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
            {post.project && (
              <a
                href={post.projectUrl}
                target="_blank" rel="noopener"
                className="post-project-link"
              >
                <i className="fab fa-github" /> {post.project}
              </a>
            )}
          </div>
          <p className="post-lead">{post.summary}</p>
        </motion.header>

        {/* İçerik */}
        <motion.div
          className="post-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        {/* Önceki / Sonraki */}
        <nav className="post-nav">
          {next ? (
            <Link to={`/blog/${next.id}`} className="post-nav-btn">
              <span className="nav-label">← Yeni</span>
              <span className="nav-title">{next.title}</span>
            </Link>
          ) : <div />}
          {prev ? (
            <Link to={`/blog/${prev.id}`} className="post-nav-btn post-nav-right">
              <span className="nav-label">Eski →</span>
              <span className="nav-title">{prev.title}</span>
            </Link>
          ) : <div />}
        </nav>
      </div>
    </div>
  );
}

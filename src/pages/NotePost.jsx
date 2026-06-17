import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { NOTES, CATEGORIES } from '../data/notes';
import './NotePost.css';

const CATEGORY_COLORS = {
  doga:   { accent: '#4caf73', glow: 'rgba(76,175,115,.08)'  },
  teknik: { accent: '#d4a017', glow: 'rgba(212,160,23,.08)'  },
  hukuk:  { accent: '#9c66d2', glow: 'rgba(156,102,210,.08)' },
};

/* Basit markdown → HTML */
function renderMarkdown(md) {
  return md
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) =>
      `<pre class="code-block"><code>${escHtml(code.trim())}</code></pre>`)
    .replace(/`([^`]+)`/g, (_, c) => `<code class="inline-code">${escHtml(c)}</code>`)
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>\n?)+/gs, m => `<ul>${m}</ul>`)
    .replace(/\n\n(?!<)/g, '</p><p>')
    .replace(/^(?!<)/, '<p>').replace(/(?!>)$/, '</p>')
    .replace(/<p><\/p>/g, '');
}

function escHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function NotePost() {
  const { id } = useParams();
  const note = NOTES.find(n => n.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!note) return <Navigate to="/notes" replace />;

  const col = CATEGORY_COLORS[note.category];
  const cat = CATEGORIES.find(c => c.id === note.category);
  const idx = NOTES.indexOf(note);
  const prev = NOTES[idx + 1];
  const next = NOTES[idx - 1];

  return (
    <div className="note-post-page">
      <div className="note-post-container">

        <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
          <Link to="/notes" className="note-back">
            <i className="fas fa-arrow-left" /> Notlara dön
          </Link>
        </motion.div>

        <motion.header
          className="note-post-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ '--cat-accent': col.accent, '--cat-glow': col.glow }}
        >
          <span className="note-post-cat">
            <i className={cat?.icon} /> {cat?.label}
          </span>
          <h1>{note.title}</h1>
          <div className="note-post-meta">
            <span><i className="fas fa-calendar-alt" />
              {new Date(note.date).toLocaleDateString('tr-TR', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </span>
            <span><i className="fas fa-clock" /> {note.readMin} dk okuma</span>
          </div>
          <p className="note-post-lead">{note.summary}</p>
        </motion.header>

        <motion.div
          className="note-post-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ '--cat-accent': col.accent }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(note.content) }}
        />

        <nav className="note-post-nav">
          {next ? (
            <Link to={`/notes/${next.id}`} className="note-nav-btn">
              <span className="nav-label">← Yeni</span>
              <span className="nav-title">{next.title}</span>
            </Link>
          ) : <div />}
          {prev ? (
            <Link to={`/notes/${prev.id}`} className="note-nav-btn note-nav-right">
              <span className="nav-label">Eski →</span>
              <span className="nav-title">{prev.title}</span>
            </Link>
          ) : <div />}
        </nav>

      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { NOTES, CATEGORIES } from '../data/notes';
import './NotesList.css';

const CATEGORY_COLORS = {
  doga:   { bg: 'rgba(52,168,83,.12)',  border: 'rgba(52,168,83,.3)',  text: '#4caf73' },
  teknik: { bg: 'rgba(251,188,4,.1)',   border: 'rgba(251,188,4,.3)',  text: '#d4a017' },
  hukuk:  { bg: 'rgba(156,102,210,.1)', border: 'rgba(156,102,210,.3)',text: '#9c66d2' },
};

export default function NotesList() {
  const [active, setActive] = useState('all');

  const filtered = useMemo(() =>
    active === 'all' ? NOTES : NOTES.filter(n => n.category === active),
    [active]
  );

  return (
    <div className="notes-page">
      <div className="container">

        <motion.div
          className="notes-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="notes-eyebrow">kişisel notlar</p>
          <h1 className="notes-title">Notlar</h1>
          <p className="notes-subtitle">
            Yazılım dışı hayatımdan: doğa, tamir, hobiler ve fikirler.
          </p>
        </motion.div>

        {/* Kategori sekmeleri */}
        <div className="notes-tabs">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`notes-tab ${active === cat.id ? 'active' : ''}`}
              onClick={() => setActive(cat.id)}
            >
              <i className={cat.icon} />
              {cat.label}
            </button>
          ))}
        </div>

        {/* Kart grid */}
        <div className="notes-grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((note, i) => {
              const col = CATEGORY_COLORS[note.category];
              const cat = CATEGORIES.find(c => c.id === note.category);
              return (
                <motion.article
                  key={note.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: i * 0.06 }}
                  whileHover={{ y: -4, transition: { duration: 0.18 } }}
                  className="note-card"
                >
                  <Link to={`/notes/${note.id}`} className="note-card-link">
                    <div
                      className="note-cat-stripe"
                      style={{ background: col.border }}
                    />
                    <div className="note-card-body">
                      <span
                        className="note-cat-badge"
                        style={{ background: col.bg, border: `1px solid ${col.border}`, color: col.text }}
                      >
                        <i className={cat?.icon} /> {cat?.label}
                      </span>
                      <h2 className="note-card-title">{note.title}</h2>
                      <p className="note-card-summary">{note.summary}</p>
                      <div className="note-card-footer">
                        <span>
                          <i className="fas fa-calendar-alt" />
                          {new Date(note.date).toLocaleDateString('tr-TR', {
                            year: 'numeric', month: 'long', day: 'numeric'
                          })}
                        </span>
                        <span>
                          <i className="fas fa-clock" />
                          {note.readMin} dk okuma
                        </span>
                        <span className="note-read-more">
                          Oku <i className="fas fa-arrow-right" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';

const LANG_COLORS = {
  Java: '#b07219', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  Python: '#3572a5', HTML: '#e34c26', CSS: '#563d7c',
  Go: '#00add8', Rust: '#dea584', 'C++': '#f34b7d', Shell: '#89e051',
};

const CACHE_KEY = 'gh_repos_gurcangul';
const CACHE_TTL = 60 * 60 * 1000; // 1 saat

function readCache() {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const { ts, data } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) { localStorage.removeItem(CACHE_KEY); return null; }
    return data;
  } catch { return null; }
}

function writeCache(data) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), data })); } catch {}
}

export function useGitHub(username) {
  const [repos, setRepos]     = useState([]);
  const [stats, setStats]     = useState({ repoCount: 0, stars: 0, languages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      // 1. Cache'den dene
      const cached = readCache();
      if (cached) {
        if (!cancelled) {
          setRepos(cached.repos);
          setStats(cached.stats);
          setLoading(false);
        }
        return;
      }

      // 2. API'ye git
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );

        if (res.status === 403) {
          const resetTs = res.headers.get('X-RateLimit-Reset');
          const resetIn = resetTs
            ? Math.ceil((Number(resetTs) * 1000 - Date.now()) / 60000)
            : '?';
          throw new Error(`GitHub API rate limit aşıldı. ~${resetIn} dakika sonra tekrar dene.`);
        }
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);

        const data = await res.json();
        if (cancelled) return;

        const public_ = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        const langs = new Set(public_.map(r => r.language).filter(Boolean));
        const stars = public_.reduce((s, r) => s + r.stargazers_count, 0);
        const stats = { repoCount: public_.length, stars, languages: langs.size };

        writeCache({ repos: public_, stats });
        setRepos(public_);
        setStats(stats);
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [username]);

  return { repos, stats, loading, error, langColors: LANG_COLORS };
}

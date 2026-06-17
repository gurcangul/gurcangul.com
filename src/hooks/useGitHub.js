import { useState, useEffect } from 'react';

const LANG_COLORS = {
  Java: '#b07219', JavaScript: '#f1e05a', TypeScript: '#3178c6',
  Python: '#3572a5', HTML: '#e34c26', CSS: '#563d7c',
  Go: '#00add8', Rust: '#dea584', 'C++': '#f34b7d', Shell: '#89e051',
};

export function useGitHub(username) {
  const [repos, setRepos]   = useState([]);
  const [stats, setStats]   = useState({ repoCount: 0, stars: 0, languages: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetch_() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
          { headers: { Accept: 'application/vnd.github.v3+json' } }
        );
        if (!res.ok) throw new Error(`GitHub API ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        const public_ = data
          .filter(r => !r.fork)
          .sort((a, b) => b.stargazers_count - a.stargazers_count);

        const langs = new Set(public_.map(r => r.language).filter(Boolean));
        const stars = public_.reduce((s, r) => s + r.stargazers_count, 0);

        setRepos(public_);
        setStats({ repoCount: public_.length, stars, languages: langs.size });
      } catch (e) {
        if (!cancelled) setError(e.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch_();
    return () => { cancelled = true; };
  }, [username]);

  return { repos, stats, loading, error, langColors: LANG_COLORS };
}

import { useState, useEffect } from "react";

// Simple in-memory module-level cache to prevent spamming GitHub API
let cache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

const useGitHubRepos = (username = "DeveloperSRGonline") => {
  const [repos, setRepos] = useState(cache || []);
  const [loading, setLoading] = useState(!cache);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If cache is valid, skip fetching
    if (cache && cacheTimestamp && Date.now() - cacheTimestamp < CACHE_DURATION) {
      setLoading(false);
      return;
    }

    let isMounted = true;
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`
        );
        
        if (!response.ok) {
          if (response.status === 403) {
            throw new Error("GitHub API rate limit reached. Please try again later.");
          }
          throw new Error(`Failed to fetch repositories: ${response.statusText}`);
        }

        const data = await response.ok ? await response.json() : [];
        
        // Filter out fork repositories to only show owner's work
        const filteredRepos = Array.isArray(data)
          ? data
              .filter((repo) => !repo.fork)
              .map((repo) => ({
                id: repo.id,
                name: repo.name,
                description: repo.description,
                html_url: repo.html_url,
                topics: repo.topics || [],
                language: repo.language,
                stargazers_count: repo.stargazers_count,
                forks_count: repo.forks_count,
                updated_at: repo.updated_at,
              }))
          : [];

        if (isMounted) {
          cache = filteredRepos;
          cacheTimestamp = Date.now();
          setRepos(filteredRepos);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || "An error occurred while fetching repositories.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchRepos();

    return () => {
      isMounted = false;
    };
  }, [username]);

  const refetch = () => {
    cache = null;
    cacheTimestamp = null;
    // Trigger render to restart useEffect
    setRepos([]);
    setError(null);
    setLoading(true);
  };

  return { repos, loading, error, refetch };
};

export default useGitHubRepos;

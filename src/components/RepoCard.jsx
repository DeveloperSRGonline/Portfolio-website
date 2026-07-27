import React from "react";
import { Star, GitFork, ExternalLink, FolderGit } from "lucide-react";

const languageColors = {
  javascript: "#f1e05a",
  typescript: "#3178c6",
  html: "#e34c26",
  css: "#563d7c",
  python: "#3572a5",
  rust: "#dea584",
  go: "#00add8",
  c: "#555555",
  "c++": "#f34b7d",
  shell: "#89e051",
  php: "#4f5d95",
};

const RepoCard = ({ repo, onOpen }) => {
  const { name, description, html_url, topics, language, stargazers_count, forks_count } = repo;

  const getLanguageColor = (lang) => {
    if (!lang) return "#cccccc";
    const lowerLang = lang.toLowerCase();
    return languageColors[lowerLang] || "#858585";
  };

  const handleCardClick = (e) => {
    onOpen(html_url, name);
  };

  return (
    <div 
      className="repo-card group" 
      onClick={handleCardClick}
      title={`Open ${name} on GitHub`}
    >
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-2 truncate">
          <FolderGit className="size-4 text-blue-500 shrink-0 group-hover:scale-110 transition-transform" />
          <h4 className="repo-name font-semibold text-sm text-gray-800 dark:text-gray-100 truncate" title={name}>
            {name}
          </h4>
        </div>
        <div className="repo-meta flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400 text-[11px]" title="Stars">
            <Star className="size-3 text-amber-500 fill-amber-500" />
            <span>{stargazers_count}</span>
          </div>
          <div className="flex items-center gap-0.5 text-gray-500 dark:text-gray-400 text-[11px]" title="Forks">
            <GitFork className="size-3 text-gray-400 dark:text-gray-500" />
            <span>{forks_count}</span>
          </div>
        </div>
      </div>

      <p className="repo-desc text-xs text-gray-500 dark:text-gray-400 line-clamp-2 min-h-[2rem]">
        {description || "No description provided."}
      </p>

      {topics && topics.length > 0 && (
        <div className="repo-tags flex flex-wrap gap-1 mt-2">
          {topics.slice(0, 3).map((topic) => (
            <span key={topic} className="repo-tag text-[9px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
              {topic}
            </span>
          ))}
          {topics.length > 3 && (
            <span className="repo-tag text-[9px] px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded">
              +{topics.length - 3}
            </span>
          )}
        </div>
      )}

      <div className="flex justify-between items-center pt-2 mt-auto border-t border-gray-50 dark:border-gray-700">
        {language ? (
          <div className="repo-lang flex items-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
            <span 
              className="lang-dot size-2 rounded-full" 
              style={{ backgroundColor: getLanguageColor(language) }}
            />
            <span>{language}</span>
          </div>
        ) : (
          <div />
        )}
        <button 
          type="button"
          className="repo-open-btn text-[11px] text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-0.5 font-medium cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(html_url, name);
          }}
        >
          <span>View on GitHub</span>
          <ExternalLink className="size-2.5" />
        </button>
      </div>
    </div>
  );
};

export default RepoCard;

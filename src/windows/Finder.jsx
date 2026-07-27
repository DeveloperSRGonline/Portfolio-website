import { WindowControls, RepoCard } from '#components'
import { locations } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import useLocationStore from '#store/location';
import useWindowStore from '#store/window';
import clsx from 'clsx';
import { Search, Github, AlertCircle } from 'lucide-react'
import React from 'react'
import useGitHubRepos from '../hooks/useGitHubRepos'

const Finder = () => {
  const { openWindow } = useWindowStore()
  const { activeLocation, setActiveLocation } = useLocationStore()
  const { repos, loading, error, refetch } = useGitHubRepos()

  const openItem = (item) => {
    if(item.fileType === 'pdf') return openWindow("resume")
    if(item.kind === 'folder') return setActiveLocation(item)
    if(item.fileType === 'url' && item.href) return window.open(item.href,'_blank')
    if(item.fileType === 'fig' && item.href) return window.open(item.href,'_blank')

    openWindow(`${item.fileType}${item.kind}`,item)
  } 

  const handleRepoOpen = (url) => {
    window.open(url, '_blank')
  }

  const renderList = (name, items) => (
    <div className="">
      <h3>{name}</h3>
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={() => setActiveLocation(item)} className={clsx(item.id === activeLocation.id ? "active" : "not-active")}>
            <img className='w-4' src={item.icon} alt="" />
            <p className='text-sm font-medium truncate'>{item.name}</p>
          </li>
        ))}
      </ul>
    </div>
  )

  return (
    <>
      <div id="window-header">
        <WindowControls target="finder" />
        <Search className='icon' />
      </div>

      <div className="bg-white dark:bg-[#1c1c1e] flex h-full">
        <div className="sidebar">
          {renderList("Favorites", Object.values(locations))}
        </div>

        {activeLocation?.type === 'work' ? (
          <div className="github-content animate-fade-in-up" key={activeLocation?.id}>
            <div className="repos-header">
              <Github className="size-4 text-gray-700" />
              <h2>GitHub Projects</h2>
              {!loading && !error && <span>{repos.length} Repos</span>}
            </div>

            {loading ? (
              <div className="repos-grid">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="repo-skeleton">
                    <div className="skel-header">
                      <div className="skel-title" />
                      <div className="skel-meta" />
                    </div>
                    <div className="skel-desc">
                      <div className="skel-line w-full" />
                      <div className="skel-line w-5/6" />
                    </div>
                    <div className="skel-footer" />
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="error-container">
                <AlertCircle className="size-8 text-red-500" />
                <p>{error}</p>
                <button type="button" onClick={refetch}>Retry</button>
              </div>
            ) : (
              <div className="repos-grid">
                {repos.map((repo) => (
                  <RepoCard 
                    key={repo.id} 
                    repo={repo} 
                    onOpen={handleRepoOpen} 
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <ul className='content animate-fade-in-up' key={activeLocation?.id}>
            {activeLocation?.children?.map((item) => (
              <li key={item.id} className={item.position} onClick={() => openItem(item)}>
                <img src={item.icon} alt={item.name} />
                <p>{item.name}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
};

const FinderWindow = WindowWrapper(Finder, 'finder');

export default FinderWindow;
import { WindowControls } from '#components'
import { blogPosts, locations, safariBookmarks } from '#constants';
import WindowWrapper from '#hoc/WindowWrapper';
import useWindowStore from '#store/window';
import useLocationStore from '#store/location';
import { ChevronLeft, ChevronRight, Share, Plus, Copy, Search, ShieldHalf, RefreshCw, Lock, ArrowRight, ExternalLink, PanelLeft, FileText, Video, Sparkles, AlertCircle, ShieldAlert } from 'lucide-react';
import React, { useState, useEffect, useRef } from 'react'

const BLOG_CONTENTS = {
  1: {
    title: "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    date: "Sep 2, 2025",
    author: "Shivam Garade",
    content: [
      "JavaScript is great, but as applications grow, type safety becomes essential. TypeScript, a typed superset of JavaScript developed by Microsoft, has emerged as the standard for modern web application development.",
      "By adding static types, TypeScript helps developers catch bugs early in development rather than at runtime. It provides autocomplete, code navigation, and self-documenting code, which increases developer productivity and code reliability.",
      "Why it matters: In a traditional JavaScript codebase, small typos in object keys or function parameter order can make it to production unnoticed. TypeScript acts as a compile-time guard, refusing to build unless types match.",
      "How to master it: Start by adopting TypeScript incrementally. You don't have to define complex types immediately. Use simple interfaces, type unions, and gradually explore advanced topics like generics, utility types (Pick, Omit, Partial), and conditional types.",
    ]
  },
  2: {
    title: "The Ultimate Guide to Mastering Three.js for 3D Development",
    date: "Aug 28, 2025",
    author: "Shivam Garade",
    content: [
      "The web is no longer flat. With Three.js, developers can create interactive 3D experiences that run directly in any web browser without needing plugins.",
      "Three.js is a lightweight JavaScript library that wraps WebGL, making 3D math and rendering accessible. It provides a simple API for creating scenes, cameras, lights, geometries, and materials.",
      "Why it matters: Brands are increasingly using 3D landing pages, interactive product mockups, and virtual showrooms to engage users. Mastering Three.js sets you apart as a creative developer who can bring immersive elements to life.",
      "How to master it: Learn the fundamentals of rendering loops, requestAnimationFrame, camera projection matrices, and mesh configuration. Practice with materials like MeshStandardMaterial and lights like DirectionalLight, and eventually master post-processing effects and shaders.",
    ]
  },
  3: {
    title: "The Ultimate Guide to Mastering GSAP Animations",
    date: "Aug 15, 2025",
    author: "Shivam Garade",
    content: [
      "Animation can transform a good user interface into a memorable user experience. The GreenSock Animation Platform (GSAP) is the industry standard for high-performance web animations.",
      "GSAP bypasses the limitations of CSS transitions and keyframes, giving developers timeline-based control, scroll-driven triggers, and precise performance optimization.",
      "Why it matters: Smooth micro-interactions and scroll animations keep users engaged. GSAP makes it easy to sequence complex animations across multiple components without writing spaghetti code.",
      "How to master it: Start with basic tweens using gsap.to() and gsap.from(). Learn to chain animations using timelines (gsap.timeline). Use ScrollTrigger to bind animations to scroll progress, and leverage ScrollSmoother for premium page scrolling effects.",
    ]
  }
};

const getYoutubeEmbedUrl = (url) => {
  if (!url) return "";
  let videoId = "";
  if (url.includes("youtu.be/")) {
    videoId = url.split("youtu.be/")[1].split("?")[0];
  } else if (url.includes("v=")) {
    videoId = url.split("v=")[1].split("&")[0];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : "";
};

const isExternalUrl = (url) => {
  return url.startsWith("http://") || url.startsWith("https://");
};

const resolveUrl = (url) => {
  if (!url) return "start://";
  const trimmed = url.trim();
  const lowercase = trimmed.toLowerCase();
  
  if (lowercase.startsWith("start://") || 
      lowercase.startsWith("blog://") || 
      lowercase.startsWith("project://")) {
    return trimmed;
  }

  // Intercept portfolio specific links
  if (lowercase.includes("fzdtyswuzju") || lowercase.includes("nike.com") || lowercase === "nike") {
    return "project://5";
  }
  if (lowercase.includes("iyoz165wgkq") || lowercase.includes("ai-resume-analyzer.com") || lowercase === "analyzer" || lowercase === "ai-resume") {
    return "project://6";
  }
  if (lowercase.includes("lkrx390fjmw") || lowercase.includes("food-delivery-app.com") || lowercase === "food-delivery") {
    return "project://7";
  }

  if (lowercase.includes("typescript-explained") || lowercase === "blog://1") {
    return "blog://1";
  }
  if (lowercase.includes("mastering-three-js") || lowercase === "blog://2") {
    return "blog://2";
  }
  if (lowercase.includes("mastering-gsap-animations") || lowercase === "blog://3") {
    return "blog://3";
  }

  // Real URL mapping
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }

  // Has a TLD dot and no spaces
  if (trimmed.includes(".") && !trimmed.includes(" ")) {
    return `https://${trimmed}`;
  }

  // Fallback to Google Search
  return `https://www.google.com/search?igu=1&q=${encodeURIComponent(trimmed)}`;
};

const getTitleForUrl = (url) => {
  if (url.startsWith("start://")) return "Start Page";
  if (url.startsWith("blog://list")) return "Articles";
  if (url.startsWith("blog://")) {
    const id = parseInt(url.split("blog://")[1]);
    const post = blogPosts.find(p => p.id === id);
    return post ? post.title : "Reader View";
  }
  if (url.startsWith("project://")) {
    const id = parseInt(url.split("project://")[1]);
    const project = locations.work?.children?.find(p => p.id === id);
    return project ? project.name : "Project Info";
  }
  if (isExternalUrl(url)) {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("google.com") && urlObj.pathname.includes("search")) {
        const query = urlObj.searchParams.get("q");
        return query ? `Search: ${query}` : "Google";
      }
      return urlObj.hostname.replace("www.", "");
    } catch (e) {
      return "Web Page";
    }
  }
  return url;
};

// --- Sub-components (Inline Pages) ---

const StartPage = ({ onNavigate }) => {
  const { openWindow } = useWindowStore();
  const projects = locations.work?.children ?? [];

  const handleFavoriteClick = (fav) => {
    if (fav.url) {
      onNavigate(fav.url);
    } else if (fav.action) {
      openWindow(fav.action);
    }
  };

  return (
    <div className="start-page">
      <div>
        <h3>Favorites</h3>
        <div className="favorites-grid">
          {safariBookmarks.map((bookmark) => (
            <div key={bookmark.id} className="fav-item" onClick={() => handleFavoriteClick(bookmark)}>
              <div className="fav-icon" style={{ backgroundColor: `${bookmark.color}15` }}>
                <img src={bookmark.icon} alt={bookmark.name} />
              </div>
              <p>{bookmark.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3>Frequently Visited (Projects)</h3>
        </div>
        <div className="frequent-sites">
          {projects.map((project) => {
            const imgFile = project.children?.find(c => c.fileType === 'img');
            return (
              <div key={project.id} className="site-card" onClick={() => onNavigate(`project://${project.id}`)}>
                <img src={imgFile?.imageUrl || "/images/folder.png"} alt={project.name} />
                <p>{project.name}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h3>Reading List (Articles)</h3>
          <button className="text-xs text-blue-600 font-medium hover:underline" onClick={() => onNavigate("blog://list")}>Show All</button>
        </div>
        <div className="reading-list">
          {blogPosts.map((post) => (
            <div key={post.id} className="reading-item" onClick={() => onNavigate(`blog://${post.id}`)}>
              <img src={post.image} alt={post.title} />
              <div className="reading-info">
                <h4>{post.title}</h4>
                <p>{post.date} • Shivam Garade</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const BlogListPage = ({ onNavigate }) => {
  return (
    <div className="start-page">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-pink-600 size-5" />
        <h2 className="text-xl font-bold text-gray-800">Articles & Blog Posts</h2>
      </div>
      <div className="reading-list">
        {blogPosts.map((post) => (
          <div key={post.id} className="reading-item p-4 border border-gray-100 rounded-xl" onClick={() => onNavigate(`blog://${post.id}`)}>
            <img className="w-28 h-20 rounded-lg object-cover" src={post.image} alt={post.title} />
            <div className="reading-info">
              <h4 className="text-base font-semibold text-gray-800">{post.title}</h4>
              <p className="text-xs text-gray-400 mt-1">{post.date} • Shivam Garade</p>
              <p className="text-xs text-gray-500 mt-2 line-clamp-2">Learn about modern web development strategies, libraries, and principles in this comprehensive write-up.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReaderPage = ({ postId, onNavigate }) => {
  const post = BLOG_CONTENTS[postId] || BLOG_CONTENTS[1];
  const meta = blogPosts.find(p => p.id === postId) || blogPosts[0];

  return (
    <div className="reader-view">
      <button onClick={() => onNavigate("blog://list")} className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-4 select-none">
        ← Back to Reading List
      </button>
      <h2>{post.title}</h2>
      <div className="reader-meta">
        Published on {post.date} by {post.author}
      </div>
      <img className="reader-image" src={meta.image} alt={post.title} />
      <div className="reader-body">
        {post.content.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}
      </div>
      <a className="reader-link" href={meta.link} target="_blank" rel="noopener noreferrer">
        Read full original post on JS Mastery <ExternalLink className="size-3.5" />
      </a>
    </div>
  );
};

const ProjectPage = ({ projectId, onNavigate }) => {
  const project = locations.work?.children?.find(p => p.id === projectId);
  if (!project) return <div className="p-10 text-center">Project not found.</div>;

  const txtFile = project.children?.find(c => c.fileType === 'txt');
  const urlFile = project.children?.find(c => c.fileType === 'url');
  const imgFile = project.children?.find(c => c.fileType === 'img');
  
  const embedUrl = urlFile?.href ? getYoutubeEmbedUrl(urlFile.href) : "";

  return (
    <div className="project-view">
      <button onClick={() => onNavigate("start://")} className="text-xs text-blue-600 hover:underline flex items-center gap-1 mb-4 select-none">
        ← Back to Start Page
      </button>
      <h2>{project.name}</h2>
      
      {embedUrl ? (
        <div className="video-container">
          <iframe 
            src={embedUrl}
            title={`${project.name} demo`} 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            allowFullScreen
          ></iframe>
        </div>
      ) : imgFile?.imageUrl ? (
        <img className="w-full h-auto rounded-lg shadow-md max-h-80 object-cover" src={imgFile.imageUrl} alt={project.name} />
      ) : null}

      <div className="project-desc">
        {txtFile?.description?.map((p, idx) => (
          <p key={idx} className="text-gray-700 leading-relaxed">{p}</p>
        )) || <p className="text-gray-500">No project description available.</p>}
      </div>

      <div className="project-links pt-4 border-t border-gray-100 flex items-center justify-between">
        <div className="flex gap-3">
          {urlFile?.href && (
            <a href={urlFile.href} target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white hover:bg-blue-700 font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-1">
              Watch on YouTube <ExternalLink className="size-3.5" />
            </a>
          )}
          {project.name.toLowerCase().includes("design") && (
            <a href="https://figma.com" target="_blank" rel="noopener noreferrer" className="bg-gray-100 text-gray-700 hover:bg-gray-200 font-medium px-4 py-2 rounded-lg text-xs flex items-center gap-1">
              Figma Design <ExternalLink className="size-3.5" />
            </a>
          )}
        </div>
        <p className="text-xs text-gray-400">Double-click `.com` files in Finder to load them here anytime!</p>
      </div>
    </div>
  );
};

const LoadingOverlay = ({ url }) => {
  let domain = "Page";
  try {
    domain = new URL(url).hostname.replace("www.", "");
  } catch (e) {}
  return (
    <div className="safari-loading">
      <div className="safari-spinner" />
      <p>Connecting to {domain}...</p>
    </div>
  );
};

const BlockedSitePage = ({ url, onNavigate }) => {
  let domain = url;
  try {
    domain = new URL(url).hostname;
  } catch (e) {}

  return (
    <div className="safari-blocked">
      <div className="size-14 bg-red-100 rounded-full flex items-center justify-center mx-auto text-red-600">
        <ShieldAlert className="size-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-bold text-gray-800">Connection Restricted</h3>
        <p className="text-xs text-gray-400 break-all">{url}</p>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">
        Safari cannot embed <strong>{domain}</strong> inside an iframe due to the website's security policy (X-Frame-Options or Content-Security-Policy).
      </p>
      <div className="flex flex-col gap-2 pt-2">
        <a href={url} target="_blank" rel="noopener noreferrer" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg text-xs block w-full text-center">
          Open in New Browser Tab
        </a>
        <button onClick={() => onNavigate("start://")} className="text-xs text-gray-400 hover:text-gray-600 hover:underline">
          Go back to Start Page
        </button>
      </div>
    </div>
  );
};

const IframePage = ({ url, reloadKey, onNavigate }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isBlocked, setIsBlocked] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    setIsLoading(true);
    setIsBlocked(false);

    // Timeout: if page hasn't completed loading in 8s, assume iframe embedding is blocked
    timeoutRef.current = setTimeout(() => {
      setIsLoading(false);
      setIsBlocked(true);
    }, 8000);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [url, reloadKey]);

  const handleLoad = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsLoading(false);
    setIsBlocked(false);
  };

  if (isBlocked) {
    return <BlockedSitePage url={url} onNavigate={onNavigate} />;
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && <LoadingOverlay url={url} />}
      <iframe
        key={`${url}-${reloadKey}`}
        src={url}
        onLoad={handleLoad}
        className="safari-iframe w-full h-full border-0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-popups-to-escape-sandbox"
        referrerPolicy="no-referrer"
        title="Safari Browser Window"
      />
    </div>
  );
};

// --- Main Safari Window Component ---

const Safari = () => {
  const { windows } = useWindowStore();
  const safariData = windows.safari?.data;

  // Active tabs state
  const [tabs, setTabs] = useState([
    { id: 'initial', title: "Start Page", url: "start://", history: ["start://"], historyIndex: 0 }
  ]);
  const [activeTabId, setActiveTabId] = useState('initial');
  const [reloadKey, setReloadKey] = useState(0);

  const activeTab = tabs.find(t => t.id === activeTabId) || tabs[0];
  const [inputVal, setInputVal] = useState(activeTab.url);

  // Update input field value when active tab or tab url changes
  useEffect(() => {
    if (activeTab) {
      setInputVal(activeTab.url.startsWith("start://") ? "" : activeTab.url);
    }
  }, [activeTabId, activeTab?.url]);

  // Navigate function
  const navigate = (targetUrl, customTitle = null) => {
    const resolved = resolveUrl(targetUrl);
    const finalTitle = customTitle || getTitleForUrl(resolved);

    setTabs(prevTabs => prevTabs.map(tab => {
      if (tab.id !== activeTabId) return tab;
      
      const newHistory = tab.history.slice(0, tab.historyIndex + 1);
      newHistory.push(resolved);

      return {
        ...tab,
        title: finalTitle,
        url: resolved,
        history: newHistory,
        historyIndex: newHistory.length - 1
      };
    }));
  };

  // Listen to openWindow data payloads (e.g. from Finder)
  useEffect(() => {
    if (safariData?.url) {
      navigate(safariData.url, safariData.title || safariData.name);
    }
  }, [safariData]);

  // Back/Forward buttons handler
  const handleGoBack = () => {
    if (activeTab.historyIndex > 0) {
      setTabs(prevTabs => prevTabs.map(tab => {
        if (tab.id !== activeTabId) return tab;
        const newIndex = tab.historyIndex - 1;
        const backUrl = tab.history[newIndex];
        return {
          ...tab,
          historyIndex: newIndex,
          url: backUrl,
          title: getTitleForUrl(backUrl)
        };
      }));
    }
  };

  const handleGoForward = () => {
    if (activeTab.historyIndex < activeTab.history.length - 1) {
      setTabs(prevTabs => prevTabs.map(tab => {
        if (tab.id !== activeTabId) return tab;
        const newIndex = tab.historyIndex + 1;
        const forwardUrl = tab.history[newIndex];
        return {
          ...tab,
          historyIndex: newIndex,
          url: forwardUrl,
          title: getTitleForUrl(forwardUrl)
        };
      }));
    }
  };

  // Add/close tabs handlers
  const handleAddTab = () => {
    const newId = Date.now().toString();
    const newTab = {
      id: newId,
      title: "Start Page",
      url: "start://",
      history: ["start://"],
      historyIndex: 0
    };
    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newId);
  };

  const handleCloseTab = (tabId, e) => {
    e.stopPropagation();
    
    if (tabs.length === 1) {
      const { closeWindow } = useWindowStore.getState();
      closeWindow("safari");
      return;
    }

    const tabIndex = tabs.findIndex(t => t.id === tabId);
    const newTabs = tabs.filter(t => t.id !== tabId);
    setTabs(newTabs);

    if (activeTabId === tabId) {
      const nextActiveIndex = Math.max(0, tabIndex - 1);
      setActiveTabId(newTabs[nextActiveIndex].id);
    }
  };

  // Address Input submit
  const handleSubmit = (e) => {
    if (e.key === 'Enter' && inputVal.trim()) {
      navigate(inputVal);
    }
  };

  const handleReload = () => {
    if (isExternalUrl(activeTab.url)) {
      setReloadKey(prev => prev + 1);
    } else {
      navigate(activeTab.url, activeTab.title);
    }
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(activeTab.url);
    alert("URL copied to clipboard!");
  };

  const renderPage = (url) => {
    if (url.startsWith("start://"))          return <StartPage onNavigate={navigate} />;
    if (url.startsWith("blog://list"))       return <BlogListPage onNavigate={navigate} />;
    if (url.startsWith("blog://"))           return <ReaderPage postId={parseInt(url.split("blog://")[1] || "1")} onNavigate={navigate} />;
    if (url.startsWith("project://"))        return <ProjectPage projectId={parseInt(url.split("project://")[1] || "5")} onNavigate={navigate} />;
    
    // Real URLs (and Fallback) -> Render IframePage
    return <IframePage url={url} reloadKey={reloadKey} onNavigate={navigate} />;
  };

  return (
    <div className="flex flex-col h-full select-none bg-white">
      {/* 1. Header controls (Close, Minimize, Maximize & Panel) */}
      <div id='window-header'>
        <WindowControls target="safari" />

        <PanelLeft className='ml-10 icon opacity-40 cursor-not-allowed' />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft 
            className={`icon ${activeTab.historyIndex > 0 ? "cursor-default text-gray-700" : "opacity-30 cursor-not-allowed"}`} 
            onClick={handleGoBack}
          />
          <ChevronRight 
            className={`icon ${activeTab.historyIndex < activeTab.history.length - 1 ? "cursor-default text-gray-700" : "opacity-30 cursor-not-allowed"}`} 
            onClick={handleGoForward}
          />
        </div>

        <div className='flex-1 flex-center gap-3'>
          <ShieldHalf className='icon text-green-600 size-4' />

          <div className="search">
            <Lock className='size-3 text-gray-400' />
            <input 
              type="text"
              className='flex-1 bg-transparent border-none outline-none text-sm px-1' 
              placeholder='Search or enter website name' 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleSubmit}
            />
            <RefreshCw className="size-3 text-gray-400 hover:text-gray-600 cursor-pointer" onClick={handleReload} />
          </div>
        </div>
        
        <div className="flex items-center gap-5">
          <Share className='icon' onClick={handleCopyUrl} />
          <Plus className='icon' onClick={handleAddTab} />
          <Copy className='icon opacity-40 cursor-not-allowed' />
        </div>
      </div>

      {/* 2. Safari Custom Tabs Bar */}
      <div className="safari-tabs">
        {tabs.map((tab) => (
          <div 
            key={tab.id} 
            className={`safari-tab ${tab.id === activeTabId ? 'active' : ''}`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <span>{tab.title}</span>
            <span className="tab-close ml-2" onClick={(e) => handleCloseTab(tab.id, e)}>×</span>
          </div>
        ))}
        <div className="tab-add" onClick={handleAddTab}>
          <Plus className="size-3.5" />
        </div>
      </div>

      {/* 3. Render page body */}
      <div className="safari-body flex-1 overflow-y-auto">
        {renderPage(activeTab.url)}
      </div>
    </div>
  )
};

const SafariWindow = WindowWrapper(Safari, "safari")

export default SafariWindow
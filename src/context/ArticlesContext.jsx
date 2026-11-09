import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useAuth } from './AuthContext';

const ArticlesContext = createContext(null);
const STORAGE_KEY = 'newsreader_saved_articles_by_user';

function readSavedArticles() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function ArticlesProvider({ children }) {
  const { user } = useAuth();
  const [savedArticlesByUser, setSavedArticlesByUser] = useState(readSavedArticles);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedArticlesByUser));
  }, [savedArticlesByUser]);

  const username = user?.username;
  const getUserSavedArticles = () =>
    username ? (savedArticlesByUser[username] || []) : [];

  const saveArticle = (article) => {
    if (!username) return;
    setSavedArticlesByUser((previous) => {
      const current = previous[username] || [];
      if (current.some((saved) => saved.url === article.url)) return previous;
      return { ...previous, [username]: [...current, article] };
    });
  };

  const removeArticle = (url) => {
    if (!username) return;
    setSavedArticlesByUser((previous) => ({
      ...previous,
      [username]: (previous[username] || []).filter((article) => article.url !== url),
    }));
  };

  const isArticleSaved = (url) =>
    getUserSavedArticles().some((article) => article.url === url);

  const getAllUserArticles = () => savedArticlesByUser;

  const value = useMemo(() => ({
    savedArticles: getUserSavedArticles(),
    savedArticlesByUser,
    getUserSavedArticles,
    getAllUserArticles,
    saveArticle,
    removeArticle,
    isArticleSaved,
  }), [savedArticlesByUser, username]);

  return (
    <ArticlesContext.Provider value={value}>
      {children}
    </ArticlesContext.Provider>
  );
}

export function useArticles() {
  const context = useContext(ArticlesContext);
  if (!context) throw new Error('useArticles must be used within ArticlesProvider');
  return context;
}

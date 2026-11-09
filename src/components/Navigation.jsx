import { Link, useLocation } from 'react-router-dom';
import { useArticles } from '../context/ArticlesContext';
import { useAuth } from '../context/AuthContext';

function Navigation() {
  const location = useLocation();
  const { getUserSavedArticles } = useArticles();
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const savedCount = getUserSavedArticles().length;

  const linkClass = (path) =>
    `nav-link ${location.pathname === path ? 'active' : ''}`;

  return (
    <nav>
      <div className="nav-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>
            NewsReader
          </Link>
          <div className="nav-links">
            <Link to="/" className={linkClass('/')}>Home</Link>
            <Link to="/search" className={linkClass('/search')}>Search</Link>
            {isAuthenticated && (
              <Link to="/saved" className={linkClass('/saved')}>
                Saved Articles ({savedCount})
              </Link>
            )}
            {isAdmin() && <Link to="/admin" className={linkClass('/admin')}>Admin</Link>}
          </div>
        </div>
        <div className="nav-user">
          {isAuthenticated ? (
            <>
              <span>{user.username} ({user.role})</span>
              <button type="button" className="btn btn-secondary" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className={linkClass('/login')}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;

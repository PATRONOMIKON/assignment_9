import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ArticlesProvider } from './context/ArticlesContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './components/Login';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import SavedArticlesPage from './pages/SavedArticlesPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <AuthProvider>
      <ArticlesProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/saved"
                element={<ProtectedRoute><SavedArticlesPage /></ProtectedRoute>}
              />
              <Route
                path="/admin"
                element={<ProtectedRoute adminOnly><AdminPage /></ProtectedRoute>}
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ArticlesProvider>
    </AuthProvider>
  );
}

export default App;

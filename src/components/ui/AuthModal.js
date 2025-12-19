import React, { useState } from 'react';
import { auth } from '../../firebase/config';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInAnonymously 
} from 'firebase/auth';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'login') {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onClose();
      setEmail('');
      setPassword('');
    } catch (err) {
      console.error('Auth error:', err);
      let errorMessage = err.message;
      
      if (err.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication is not properly configured. Please contact support.';
      } else if (err.code === 'auth/invalid-email') {
        errorMessage = 'Invalid email address.';
      } else if (err.code === 'auth/user-not-found') {
        errorMessage = 'No account found with this email.';
      } else if (err.code === 'auth/wrong-password') {
        errorMessage = 'Incorrect password.';
      } else if (err.code === 'auth/email-already-in-use') {
        errorMessage = 'An account with this email already exists.';
      } else if (err.code === 'auth/weak-password') {
        errorMessage = 'Password should be at least 6 characters.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAnonymousLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await signInAnonymously(auth);
      onClose();
    } catch (err) {
      console.error('Anonymous login error:', err);
      let errorMessage = err.message;
      
      if (err.code === 'auth/configuration-not-found') {
        errorMessage = 'Firebase Authentication is not properly configured. Please contact support.';
      } else if (err.code === 'auth/operation-not-allowed') {
        errorMessage = 'Anonymous sign-in is not enabled. Please use email/password.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>
        
        <h2>{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
        <p className="auth-modal-subtitle">
          {mode === 'login' 
            ? 'Sign in to access your videos' 
            : 'Sign up to start uploading videos'}
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              minLength={6}
              disabled={loading}
            />
          </div>

          <button 
            type="submit" 
            className="btn-auth-submit"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (mode === 'login' ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="auth-divider">
          <span>or</span>
        </div>

        <button 
          className="btn-anonymous"
          onClick={handleAnonymousLogin}
          disabled={loading}
        >
          Continue as Guest
        </button>

        <p className="auth-toggle">
          {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
          <button onClick={toggleMode} className="link-button">
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

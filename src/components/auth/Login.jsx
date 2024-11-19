import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../../firebase';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Test account credentials
  const testEmail = 'test@blocklearner.com';
  const testPassword = 'Test123!';

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message || 'Failed to login. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleTestLogin = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('Attempting to login with test account...');
      try {
        // First try to login
        const userCredential = await signInWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('Test login successful:', userCredential.user);
      // eslint-disable-next-line no-unused-vars
      } catch (loginError) {
        console.log('Login failed, creating test account...');
        // If login fails, create account
        const userCredential = await createUserWithEmailAndPassword(auth, testEmail, testPassword);
        console.log('Test account created:', userCredential.user);
      }
      navigate('/');
    } catch (error) {
      console.error('Test account error:', error);
      setError(error.message || 'Error with test account. Please try regular login.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log('Google sign in successful:', result.user);
      navigate('/');
    } catch (error) {
      console.error('Google sign in error:', error);
      setError(error.message || 'Failed to sign in with Google');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Login to BlockLearner</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <button 
          onClick={handleTestLogin} 
          className="test-account-button"
          disabled={loading}
        >
          {loading ? 'Creating test account...' : 'Use Test Account'}
        </button>
        <div className="divider">
          <span>OR</span>
        </div>
        <button 
          onClick={handleGoogleSignIn} 
          className="google-button"
          disabled={loading}
        >
          <img src="/google-icon.png" alt="Google" />
          Sign in with Google
        </button>
        <p className="auth-link">
          Don t have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

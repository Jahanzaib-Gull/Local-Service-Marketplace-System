import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Assume `data` structure is what backend sends for user: { _id, name, email, role, token }
        login(data);
        // Also save token/user if needed but context will hold it for now
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex-center animate-fade-in" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <Card style={{ width: '100%', maxWidth: '440px', padding: '3.5rem 2.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
        </div>
        
        {error && (
          <div style={{ backgroundColor: 'var(--accent-red, #ffebee)', color: 'var(--accent-red-hover, #c62828)', padding: '0.75rem', borderRadius: '0.5rem', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex-col" style={{ gap: '1.5rem' }}>
          <Input 
            id="email"
            label="Email Address"
            type="email"
            icon={Mail}
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ marginBottom: '0.5rem' }}
          />

          <div>
            <div className="flex-between">
              <label className="form-label" htmlFor="password">Password</label>
              <a href="#" style={{ fontSize: '0.875rem', color: 'var(--accent-primary)', fontWeight: '500', marginBottom: '0.5rem' }}>Forgot?</a>
            </div>
            <Input 
              id="password"
              type="password"
              icon={Lock}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textAlign: 'center', marginTop: '-0.5rem' }}>
            Tip: Include "provider" in email to log in as Service Provider.
          </div>
          
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.85rem' }} disabled={isLoading}>
            {isLoading ? 'Authenticating...' : <><LogIn size={20} /> Sign In</>}
          </Button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Don't have an account? <a href="/register" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Create one now</a>
        </div>
      </Card>
    </div>
  );
};

export default Login;

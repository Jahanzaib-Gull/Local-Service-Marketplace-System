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
  const [role, setRole] = useState('owner'); // mock role for test
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name: 'User', role, email });
    setTimeout(() => {
      navigate('/dashboard');
    }, 500);
  };

  return (
    <div className="container flex-center animate-fade-in" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <Card style={{ width: '100%', maxWidth: '440px', padding: '3.5rem 2.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Welcome Back</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign in to your account</p>
        </div>
        
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

          <Input 
            id="role"
            label="Simulate Logging In As..."
            type="select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="owner">House Owner</option>
            <option value="provider">Service Provider</option>
          </Input>
          
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1.5rem', padding: '0.85rem' }}>
            <LogIn size={20} /> Sign In
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

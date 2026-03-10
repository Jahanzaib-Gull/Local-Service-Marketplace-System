import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Home as HomeIcon } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [role, setRole] = useState('owner');
  const [isLoading, setIsLoading] = useState(false);
  const [errorPrompt, setErrorPrompt] = useState(null);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorPrompt(null);
    
    try {
      await register({ name, email, password, role, phone, location });
      navigate('/dashboard');
    } catch (error) {
      setErrorPrompt(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex-center animate-fade-in" style={{ minHeight: 'calc(100vh - 150px)' }}>
      <Card style={{ width: '100%', maxWidth: '440px', padding: '3.5rem 2.5rem', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Create an Account</h2>
          <p style={{ color: 'var(--text-secondary)' }}>Sign up to get started</p>
        </div>
        
        <form onSubmit={handleRegister} className="flex-col" style={{ gap: '1.5rem' }}>
          <Input 
            id="name"
            label="Full Name"
            type="text"
            icon={User}
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ marginBottom: '0.5rem' }}
          />

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

          <Input 
            id="password"
            label="Password"
            type="password"
            icon={Lock}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ marginBottom: '0.5rem' }}
          />

          <div className="grid grid-cols-2" style={{ gap: '1.5rem', marginBottom: '0.5rem' }}>
            <Input 
              id="phone"
              label="Phone Number"
              type="text"
              placeholder="+1 (555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              style={{ marginBottom: 0 }}
            />
            <Input 
              id="location"
              label="Location"
              type="text"
              placeholder="City, State"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              style={{ marginBottom: 0 }}
            />
          </div>

          <div className="form-group" style={{ marginBottom: '0.5rem' }}>
            <label className="form-label">I am a...</label>
            <div className="grid grid-cols-2" style={{ gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
              <div 
                className={`card flex-col flex-center ${role === 'owner' ? 'active' : ''}`} 
                style={{ padding: '1.25rem 0.5rem', cursor: 'pointer', borderColor: role === 'owner' ? 'var(--accent-primary)' : 'var(--border-color)', borderWidth: role === 'owner' ? '2px' : '1px' }}
                onClick={() => setRole('owner')}
              >
                <HomeIcon size={24} color={role === 'owner' ? 'var(--accent-primary)' : 'var(--text-secondary)'} style={{ marginBottom: '0.5rem' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: role === 'owner' ? '600' : '500', color: role === 'owner' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>House Owner</span>
              </div>
              
              <div 
                className={`card flex-col flex-center ${role === 'provider' ? 'active' : ''}`} 
                style={{ padding: '1.25rem 0.5rem', cursor: 'pointer', borderColor: role === 'provider' ? 'var(--accent-primary)' : 'var(--border-color)', borderWidth: role === 'provider' ? '2px' : '1px' }}
                onClick={() => setRole('provider')}
              >
                <Briefcase size={24} color={role === 'provider' ? 'var(--accent-primary)' : 'var(--text-secondary)'} style={{ marginBottom: '0.5rem' }} />
                <span style={{ fontSize: '0.85rem', fontWeight: role === 'provider' ? '600' : '500', color: role === 'provider' ? 'var(--accent-primary)' : 'var(--text-secondary)' }}>Service Provider</span>
              </div>
            </div>
          </div>

          {errorPrompt && <div style={{ color: 'var(--error)', fontSize: '0.85rem', textAlign: 'center' }}>{errorPrompt}</div>}
          
          <Button type="submit" variant="primary" style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }} disabled={isLoading}>
            {isLoading ? 'Creating Account...' : 'Register Now'}
          </Button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '2.5rem', fontSize: '0.95rem', color: 'var(--text-secondary)' }}>
          Already have an account? <a href="/login" style={{ color: 'var(--accent-primary)', fontWeight: '600' }}>Log in</a>
        </div>
      </Card>
    </div>
  );
};

export default Register;

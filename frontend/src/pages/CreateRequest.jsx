import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { UploadCloud, CheckCircle, MapPin, AlignLeft } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';

const CreateRequest = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);

  if (!user || user.role !== 'HomeOwner') {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="container flex-col flex-center animate-fade-in" style={{ minHeight: '60vh', textAlign: 'center' }}>
        <CheckCircle size={80} color="var(--success)" style={{ marginBottom: '1.5rem', filter: 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.2))' }} />
        <h2>Request Submitted Successfully!</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '400px' }}>
          Your service request has been posted. Service providers will be able to review and accept your job shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="container animate-fade-in" style={{ padding: '0 2.5rem 2rem', maxWidth: '900px' }}>
      <div style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Post a New Job</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Provide the necessary details so we can match you with the best professionals.
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
            <Input 
              id="title" 
              label="Job Title" 
              placeholder="e.g. Broken Pipe Repair" 
              required 
            />
            
            <Input 
              id="category"
              label="Category"
              type="select"
              required
            >
              <option value="" disabled selected>Select a category</option>
              <option value="plumbing">Plumbing</option>
              <option value="electrical">Electrical</option>
              <option value="cleaning">Cleaning</option>
              <option value="hvac">HVAC Repair</option>
              <option value="appliance">Appliance Repair</option>
              <option value="other">Other</option>
            </Input>
          </div>

          <div style={{ marginTop: '1.5rem' }}>
            <Input 
              id="description"
              label="Job Description"
              type="textarea"
              icon={AlignLeft}
              rows="5"
              placeholder="Please describe the issue in detail..."
              required
            />
          </div>

          <div className="grid grid-cols-2" style={{ gap: '2rem', marginTop: '1.5rem' }}>
            <Input 
              id="location"
              label="Location"
              icon={MapPin}
              placeholder="Enter your address"
              required
            />
            
            <Input 
              id="schedule"
              label="Preferred Time"
              type="datetime-local"
              required
            />
          </div>

          <div className="form-group" style={{ marginTop: '2rem' }}>
            <label className="form-label">Attach Photos (Optional)</label>
            <div 
              style={{ 
                border: '2px dashed var(--border-color)', 
                borderRadius: 'var(--radius-lg)', 
                padding: '3rem', 
                textAlign: 'center', 
                cursor: 'pointer',
                background: 'var(--bg-primary)',
                transition: 'var(--transition)'
              }}
              onMouseOver={(e) => {e.currentTarget.style.borderColor = 'var(--accent-primary)'; e.currentTarget.style.background = 'rgba(79, 70, 229, 0.02)'}}
              onMouseOut={(e) => {e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.background = 'var(--bg-primary)'}}
            >
              <UploadCloud size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
              <p style={{ fontWeight: '600', marginBottom: '0.25rem', color: 'var(--text-primary)' }}>Click to upload or drag and drop</p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>PNG, JPG or GIF (max. 5MB)</p>
            </div>
          </div>

          <div className="flex-center" style={{ marginTop: '3.5rem' }}>
            <Button type="submit" variant="primary" style={{ padding: '1rem 4rem', fontSize: '1.05rem', boxShadow: '0 4px 10px rgba(79, 70, 229, 0.3)' }}>
              Publish Service Request
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default CreateRequest;

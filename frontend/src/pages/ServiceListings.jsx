import React, { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ServiceListings = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState('All Categories');
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  if (!user || user.role !== 'ServiceProvider') {
    return <Navigate to="/dashboard" replace />;
  }

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/requests', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setJobs(data);
      }
    } catch (err) {
      console.error('Failed to fetch jobs', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleAccept = async (id) => {
    if (!user) {
      navigate('/login');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/bookings/accept', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ requestId: id })
      });
      
      if (res.ok) {
        // Remove accepted job from listing or navigate to dashboard
        fetchJobs();
        navigate('/dashboard');
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to accept the request.');
      }
    } catch (err) {
      console.error('Failed to accept request', err);
    }
  };

  const categories = ['All Categories', 'Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Appliance', 'Painting'];

  const filteredJobs = jobs.filter(job => 
    (filter === 'All Categories' || job.category === filter) &&
    (search === '' || job.title?.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container animate-fade-in" style={{ padding: '0 2.5rem 2rem', maxWidth: '1200px' }}>
      <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ color: 'var(--text-primary)' }}>Available Jobs Near You</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
          Browse open service requests and connect with customers needing your expertise.
        </p>
      </div>

      <div className="flex-between" style={{ marginBottom: '2.5rem', gap: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ flex: '1', minWidth: '320px' }}>
          <Input 
            id="search"
            type="text"
            icon={Search}
            placeholder="Search for jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginBottom: 0 }}
          />
        </div>
        
        <div className="flex-center" style={{ gap: '0.75rem', minWidth: '220px' }}>
          <Filter size={20} color="var(--text-secondary)" />
          <Input 
            id="category-filter"
            type="select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{ marginBottom: 0, width: '100%' }}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </Input>
        </div>
      </div>

      {isLoading ? (
        <div className="flex-center" style={{ minHeight: '30vh' }}>Loading available jobs...</div>
      ) : (
        <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
          {filteredJobs.map((job, index) => (
            <Card key={job._id} className={`delay-${(index % 3) * 100} animate-slide-up`} style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
                <span className="badge badge-active">{job.category}</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                  {new Date(job.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{job.title}</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {job.description}
              </p>
              
              <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                  <MapPin size={18} color="var(--accent-primary)" />
                  {job.location}
                </div>
                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                  <Clock size={18} color="var(--accent-secondary)" />
                  Flexible Time
                </div>
                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                  <DollarSign size={18} color="var(--success)" />
                  ${job.budget}
                </div>
                <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500', cursor: 'pointer' }} onClick={() => handleAccept(job._id)}>
                  <Briefcase size={18} color="var(--warning)" />
                  Accept Now
                </div>
              </div>
              
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto' }}>
                <Button variant="primary" style={{ width: '100%' }} onClick={() => handleAccept(job._id)}>Accept Job</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {!isLoading && filteredJobs.length === 0 && (
        <Card style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>No jobs found for the selected category. Try a different filter or check back later.</p>
        </Card>
      )}
    </div>
  );
};

export default ServiceListings;

import React, { useState } from 'react';
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

  if (!user || user.role !== 'ServiceProvider') {
    return <Navigate to="/dashboard" replace />;
  }
  
  const jobs = [
    { id: 1, title: 'Emergency Pipe Leak Repair', category: 'Plumbing', location: 'Downtown', time: 'Urgent (Today)', budget: '$150-$250', desc: 'Water leaking heavily from kitchen sink drain pipe. Need immediate assistance.' },
    { id: 2, title: 'Full House Deep Cleaning', category: 'Cleaning', location: 'Westside', time: 'Tomorrow Morning', budget: '$100-$150', desc: 'Moving out cleaning required for a 3-bedroom apartment.' },
    { id: 3, title: 'Main Breaker Box Inspection', category: 'Electrical', location: 'North Hills', time: 'Within 3 Days', budget: '$80-$120', desc: 'Experiencing frequent power trips in the living room and kitchen areas.' },
    { id: 4, title: 'AC Not Cooling Correctly', category: 'HVAC', location: 'South End', time: 'Flexible', budget: '$100-$200', desc: 'Central AC system is running but blowing warm air.' },
    { id: 5, title: 'Washing Machine Repair', category: 'Appliance', location: 'City Center', time: 'Tomorrow Afternoon', budget: '$70-$100', desc: 'Washing machine stops halfway through the spin cycle and flashes error 4C.' },
    { id: 6, title: 'Install New Chandelier', category: 'Electrical', location: 'East Side', time: 'Weekend', budget: '$80-$150', desc: 'Need professional installation for a heavy crystal chandelier in the dining room.' }
  ];

  const categories = ['All Categories', 'Plumbing', 'Electrical', 'Cleaning', 'HVAC', 'Appliance'];

  const filteredJobs = jobs.filter(job => 
    (filter === 'All Categories' || job.category === filter) &&
    (search === '' || job.title.toLowerCase().includes(search.toLowerCase()))
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

      <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
        {filteredJobs.map((job, index) => (
          <Card key={job.id} className={`delay-${(index % 3) * 100} animate-slide-up`} style={{ display: 'flex', flexDirection: 'column' }}>
            <div className="flex-between" style={{ marginBottom: '1.25rem' }}>
              <span className="badge badge-active">{job.category}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: '500' }}>Posted 2h ago</span>
            </div>
            
            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{job.title}</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem', display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
              {job.desc}
            </p>
            
            <div className="grid" style={{ gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                <MapPin size={18} color="var(--accent-primary)" />
                {job.location}
              </div>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                <Clock size={18} color="var(--accent-secondary)" />
                {job.time}
              </div>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                <DollarSign size={18} color="var(--success)" />
                {job.budget}
              </div>
              <div className="flex-center" style={{ justifyContent: 'flex-start', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: '500' }}>
                <Briefcase size={18} color="var(--warning)" />
                Accept Now
              </div>
            </div>
            
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: 'auto' }}>
              <Button variant="primary" style={{ width: '100%' }}>View Job Details</Button>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredJobs.length === 0 && (
        <Card style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
          <p>No jobs found for the selected category. Try a different filter.</p>
        </Card>
      )}
    </div>
  );
};

export default ServiceListings;

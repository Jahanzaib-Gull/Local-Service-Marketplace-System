import React, { useState, useEffect } from 'react';
import { Briefcase, TrendingUp, Calendar, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';

const ProviderDashboard = () => {
  const { user } = useAuth();
  const [metrics, setMetrics] = useState({
    stats: { availableJobs: 0, activeJobs: 0, completedJobs: 0 },
    recentJobs: [],
    myRecentJobs: []
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchMetrics = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/dashboard/metrics', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (res.ok) {
        setMetrics(data);
      }
    } catch (err) {
      console.error('Failed to fetch dashboard metrics', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleAction = async (id, action) => {
    if (action === 'accept') {
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
          fetchMetrics(); // reload metrics after successful accept
        } else {
          const data = await res.json();
          alert(data.message || 'Failed to accept the request.');
        }
      } catch (err) {
        console.error('Failed to accept request', err);
      }
    } else {
      // For reject in local view, just remove from recentJobs array optimistically
      setMetrics(prev => ({
        ...prev,
        recentJobs: prev.recentJobs.filter(req => req._id !== id)
      }));
    }
  };

  if (isLoading) {
    return <div className="container flex-center" style={{ minHeight: '50vh' }}>Loading dashboard...</div>;
  }

  const { stats = { availableJobs: 0, activeJobs: 0, completedJobs: 0 }, recentJobs = [] } = metrics || {};

  return (
    <div className="container animate-fade-in" style={{ padding: '0 2.5rem 2rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.2rem', color: 'var(--text-primary)' }}>Provider Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Review new requests and manage your active jobs.</p>
        </div>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2.5rem' }}>
        <Card className="flex-between" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
          <div>
            <p className="form-label" style={{ marginBottom: '0.2rem' }}>Available Jobs</p>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{stats.availableJobs}</h2>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
            <Briefcase size={24} />
          </div>
        </Card>

        <Card className="flex-between" style={{ borderLeft: '4px solid var(--success)' }}>
          <div>
            <p className="form-label" style={{ marginBottom: '0.2rem' }}>Accepted Jobs</p>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{stats.activeJobs}</h2>
          </div>
          <div style={{ background: '#d1fae5', padding: '1rem', borderRadius: '50%', color: 'var(--success)' }}>
            <TrendingUp size={24} />
          </div>
        </Card>
      </div>

      <Card style={{ padding: '0' }}>
        <div className="flex-between" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Latest Service Requests</h3>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID & Title</th>
                <th>Category</th>
                <th>Location</th>
                <th>Budget</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentJobs && recentJobs.length > 0 ? recentJobs.map(req => (
                <tr key={req._id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{req.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{req._id.substring(0, 8)}</div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.category}</td>
                  <td>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{req.location}</div>
                  </td>
                  <td style={{ fontWeight: '500', color: 'var(--success)' }}>${req.budget}</td>
                  <td>
                    <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
                      <Button variant="primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => handleAction(req._id, 'accept')}>
                        <CheckCircle size={14} /> Accept
                      </Button>
                      <Button variant="danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => handleAction(req._id, 'reject')}>
                        <XCircle size={14} /> Reject
                      </Button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>No fresh requests right now.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default ProviderDashboard;

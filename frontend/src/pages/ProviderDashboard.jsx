import React, { useState } from 'react';
import { Briefcase, TrendingUp, Calendar, CheckCircle, XCircle } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';

const ProviderDashboard = () => {
  const [requests, setRequests] = useState([
    { id: 'REQ-015', title: 'Emergency Pipe Leak Repair', category: 'Plumbing', location: 'Downtown', time: 'Urgent (Today)', budget: '$150-$250', status: 'Pending' },
    { id: 'REQ-014', title: 'Main Breaker Box Inspection', category: 'Electrical', location: 'North Hills', time: 'Within 3 Days', budget: '$80-$120', status: 'Pending' },
    { id: 'REQ-013', title: 'AC Not Cooling Correctly', category: 'HVAC', location: 'South End', time: 'Flexible', budget: '$100-$200', status: 'Pending' }
  ]);

  const handleAction = (id, action) => {
    setRequests(requests.map(req => 
      req.id === id ? { ...req, status: action === 'accept' ? 'Accepted' : 'Rejected' } : req
    ));
  };

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
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{requests.filter(r => r.status === 'Pending').length}</h2>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
            <Briefcase size={24} />
          </div>
        </Card>

        <Card className="flex-between" style={{ borderLeft: '4px solid var(--success)' }}>
          <div>
            <p className="form-label" style={{ marginBottom: '0.2rem' }}>Accepted Jobs</p>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>{requests.filter(r => r.status === 'Accepted').length}</h2>
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
                <th>Location & Time</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(req => (
                <tr key={req.id}>
                  <td>
                    <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{req.title}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{req.id}</div>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.category}</td>
                  <td>
                    <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{req.location}</div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>{req.time}</div>
                  </td>
                  <td style={{ fontWeight: '500', color: 'var(--success)' }}>{req.budget}</td>
                  <td>
                    <span className={`badge badge-${req.status === 'Pending' ? 'pending' : req.status === 'Accepted' ? 'completed' : 'error'}`} style={{ backgroundColor: req.status === 'Rejected' ? '#fee2e2' : undefined, color: req.status === 'Rejected' ? '#ef4444' : undefined }}>
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === 'Pending' ? (
                      <div className="flex-center" style={{ gap: '0.5rem', justifyContent: 'flex-start' }}>
                        <Button variant="primary" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => handleAction(req.id, 'accept')}>
                          <CheckCircle size={14} /> Accept
                        </Button>
                        <Button variant="danger" style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }} onClick={() => handleAction(req.id, 'reject')}>
                          <XCircle size={14} /> Reject
                        </Button>
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>No actions</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {requests.length === 0 && (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-secondary)' }}>No fresh requests right now.</div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProviderDashboard;

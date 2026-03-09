import React from 'react';
import { Wrench, Bell, CheckCircle, MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';

const OwnerDashboard = () => {
  const recentRequests = [
    { id: 'REQ-012', title: 'Leaking Pipe in Kitchen', category: 'Plumbing', status: 'Active', date: '2026-03-09' },
    { id: 'REQ-011', title: 'AC Filter Replacement', category: 'HVAC', status: 'Completed', date: '2026-03-05' },
    { id: 'REQ-010', title: 'Living Room Repainting', category: 'Painting', status: 'Pending', date: '2026-03-01' },
    { id: 'REQ-009', title: 'Electrical Outlet Fix', category: 'Electrical', status: 'Completed', date: '2026-02-28' },
    { id: 'REQ-008', title: 'Deep Carpet Cleaning', category: 'Cleaning', status: 'Completed', date: '2026-02-25' },
  ];

  return (
    <div className="container animate-fade-in" style={{ padding: '0 2.5rem 2rem' }}>
      <div className="flex-between" style={{ marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ marginBottom: '0.2rem', color: 'var(--text-primary)' }}>Owner Dashboard</h1>
          <p style={{ color: 'var(--text-secondary)' }}>Track and manage your service requests effectively.</p>
        </div>
        <Link to="/create-request">
          <Button variant="primary" style={{ padding: '0.75rem 1.5rem' }}>
            + New Request
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-3" style={{ marginBottom: '2.5rem' }}>
        <Card className="flex-between" style={{ borderLeft: '4px solid var(--accent-primary)' }}>
          <div>
            <p className="form-label" style={{ marginBottom: '0.2rem' }}>Total Requests</p>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>14</h2>
          </div>
          <div style={{ background: 'var(--bg-primary)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-primary)' }}>
            <Wrench size={24} />
          </div>
        </Card>

        <Card className="flex-between" style={{ borderLeft: '4px solid #f59e0b' }}>
          <div>
            <p className="form-label" style={{ marginBottom: '0.2rem' }}>Active Jobs</p>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>1</h2>
          </div>
          <div style={{ background: '#fef3c7', padding: '1rem', borderRadius: '50%', color: '#d97706' }}>
            <Bell size={24} />
          </div>
        </Card>

        <Card className="flex-between" style={{ borderLeft: '4px solid var(--success)' }}>
          <div>
            <p className="form-label" style={{ marginBottom: '0.2rem' }}>Completed</p>
            <h2 style={{ margin: 0, fontSize: '2rem' }}>12</h2>
          </div>
          <div style={{ background: '#d1fae5', padding: '1rem', borderRadius: '50%', color: 'var(--success)' }}>
            <CheckCircle size={24} />
          </div>
        </Card>
      </div>

      <Card style={{ padding: '0' }}>
        <div className="flex-between" style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-primary)', borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0' }}>
          <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Recent Service Requests</h3>
          <Button variant="outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>View All</Button>
        </div>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Category</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentRequests.map(req => (
                <tr key={req.id}>
                  <td style={{ fontWeight: '600', color: 'var(--text-secondary)' }}>{req.id}</td>
                  <td style={{ fontWeight: '500' }}>{req.title}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.category}</td>
                  <td>
                    <span className={`badge badge-${req.status.toLowerCase()}`}>{req.status}</span>
                  </td>
                  <td style={{ color: 'var(--text-secondary)' }}>{req.date}</td>
                  <td>
                    <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default OwnerDashboard;

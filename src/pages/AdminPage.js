import React from 'react';
import AdminDashboard from '../components/ui/AdminDashboard';

const AdminPage = () => {
  return (
    <div className="page-container" style={{ 
      background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
      minHeight: '100vh',
      paddingTop: '80px'
    }}>
      <AdminDashboard />
    </div>
  );
};

export default AdminPage;

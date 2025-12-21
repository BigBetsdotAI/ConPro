import React, { useState, useEffect } from 'react';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    thisWeek: 0
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/get-data');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const result = await response.json();
      setData(result.data);
      calculateStats(result.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (dataArray) => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const weekAgo = new Date(today);
    weekAgo.setDate(weekAgo.getDate() - 7);

    const todayCount = dataArray.filter(item => {
      const itemDate = new Date(item.Timestamp);
      return itemDate >= today;
    }).length;

    const weekCount = dataArray.filter(item => {
      const itemDate = new Date(item.Timestamp);
      return itemDate >= weekAgo;
    }).length;

    setStats({
      total: dataArray.length,
      today: todayCount,
      thisWeek: weekCount
    });
  };

  const handleDownload = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/download-excel');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user_data.xlsx';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      alert('Failed to download Excel file');
      console.error('Download error:', err);
    }
  };

  const handleRefresh = () => {
    fetchData();
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error-message">
          <h2>⚠️ Error</h2>
          <p>{error}</p>
          <button onClick={handleRefresh} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>📊 Admin Dashboard</h1>
        <div className="header-actions">
          <button onClick={handleRefresh} className="action-button refresh-button">
            🔄 Refresh
          </button>
          <button onClick={handleDownload} className="action-button download-button">
            📥 Download Excel
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>Total Submissions</h3>
            <p className="stat-value">{stats.total}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>Today</h3>
            <p className="stat-value">{stats.today}</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-content">
            <h3>This Week</h3>
            <p className="stat-value">{stats.thisWeek}</p>
          </div>
        </div>
      </div>

      <div className="data-table-container">
        <h2>Recent Submissions</h2>
        {data.length === 0 ? (
          <div className="no-data">
            <p>No submissions yet</p>
          </div>
        ) : (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Timestamp</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Company</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.Timestamp}</td>
                    <td>{item.Name}</td>
                    <td>{item.Email}</td>
                    <td>{item.Phone}</td>
                    <td>{item.Company}</td>
                    <td>{item.Position}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;

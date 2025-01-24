import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@mui/material';
import './App.css';

function Sidebar({ onLogout }) {
  return (
    <Box sx={{ width: '200px', padding: '20px', backgroundColor: '#f0f0f0', height: '100vh' }}>
      <h3>Dashboard</h3>
      <nav>
        <Link to="/students">
          <Button fullWidth variant="contained" style={{ marginBottom: '10px' }}>Students Page</Button>
        </Link>
        <Button fullWidth variant="contained" color="error" onClick={onLogout}>Logout</Button>
      </nav>
    </Box>
  );
}

export default Sidebar;

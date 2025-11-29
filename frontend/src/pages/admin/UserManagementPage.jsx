import React from 'react';
import { Box, Typography } from '@mui/material';

const UserManagementPage = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>User Management</Typography>
      <Typography>Here you can view and manage users.</Typography>
      {/* TODO: Implement user list, view user details, manage roles, etc. */}
    </Box>
  );
};

export default UserManagementPage;
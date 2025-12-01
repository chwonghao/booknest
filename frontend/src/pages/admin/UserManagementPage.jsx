import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Alert,
  Avatar,
  Chip,
} from '@mui/material';
import { getAllUserApi } from '../../api/userApi';

// Helper to get initials from name for Avatar
const getInitials = (name = '') => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return initials.toUpperCase();
};

// Reusable User Table Component
const UserTable = ({ users, title }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom component="h2">{title}</Typography>
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '10%' }}>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Joined Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow hover key={user.id}>
              <TableCell>
                <Avatar src={user.imageUrl}>{getInitials(user.name)}</Avatar>
              </TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Chip label={user.role} color={user.role === 'ADMIN' ? 'secondary' : 'default'} size="small" />
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    {users.length === 0 && <Typography sx={{ mt: 2, textAlign: 'center' }}>No users found in this category.</Typography>}
  </Box>
);

const UserManagementPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllUserApi();
        setUsers(data || []);
      } catch (err) {
        setError('Failed to fetch users. Please try again.');
        setUsers([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const { staff, customers } = useMemo(() => {
    const staffList = users.filter(user => user.role === 'ADMIN');
    const customerList = users.filter(user => user.role === 'USER');
    return { staff: staffList, customers: customerList };
  }, [users]);

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <UserTable users={staff} title="Staff" />
          <UserTable users={customers} title="Customers" />
        </>
      )}
    </Paper>
  );
};

export default UserManagementPage;
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import { getAllUserApi, updateUserApi } from '../../api/userApi';


// Helper to get initials from name for Avatar
const getInitials = (name = '') => {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('');
  return initials.toUpperCase();
};

// Reusable User Table Component
const UserTable = ({ users, title, onRowClick }) => (
  <Box sx={{ mb: 4 }}>
    <Typography variant="h5" gutterBottom component="h2">{title}</Typography>
    <TableContainer>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: '10%' }}>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Joined Date</TableCell>
            <TableCell>Last Login</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow hover key={user.id} onClick={() => onRowClick(user)} sx={{ cursor: 'pointer' }}>
              <TableCell>
                <Avatar src={user.avatarUrl}></Avatar>
              </TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell align="center"><Chip label={user.status} color={user.status === 'ACTIVE' ? 'success' : 'default'} size="small" /></TableCell>
              <TableCell>
                <Chip label={user.role} color={user.role === 'ADMIN' ? 'secondary' : 'default'} size="small" />
              </TableCell>
              <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
              <TableCell>{user.lastLogin ? new Date(user.lastLogin).toLocaleString() : 'N/A'}</TableCell>
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

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

  useEffect(() => {
    fetchUsers();
  }, []);

  const { staff, customers } = useMemo(() => {
    const staffList = users.filter(user => user.role === 'ADMIN');
    const customerList = users.filter(user => user.role === 'USER');
    return { staff: staffList, customers: customerList };
  }, [users]);

  const handleRowClick = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingUser(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveUser = async () => {
    if (!editingUser) return;
    try {
      // Chỉ gửi những trường cần thiết để cập nhật
      const { id, role, status } = editingUser;
      await updateUserApi(id, { role, status });
      toast.success('User updated successfully!');
      handleCloseModal();
      fetchUsers(); // Tải lại danh sách người dùng
    } catch (apiError) {
      console.error('Failed to update user:', apiError);
      toast.error('Failed to update user.');
    }
  };

  return (
    <Paper sx={{ p: 3, m: 2 }}>
      <Typography variant="h4" gutterBottom>User Management</Typography>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress /></Box>
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <>
          <UserTable users={staff} title="Staff" onRowClick={handleRowClick} />
          <UserTable users={customers} title="Customers" onRowClick={handleRowClick} />
        </>
      )}

      {/* Edit User Modal */}
      <Dialog open={isModalOpen} onClose={handleCloseModal} maxWidth="sm" fullWidth disableScrollLock={true}>
        <DialogTitle>Edit User</DialogTitle>
        {editingUser && (
          <DialogContent>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField fullWidth label="Full Name" name="fullName" value={editingUser.fullName} disabled />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Email" name="email" value={editingUser.email} disabled />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Status</InputLabel>
                  <Select name="status" value={editingUser.status} label="Status" onChange={handleInputChange}>
                    <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                    <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                    <MenuItem value="BANNED">BANNED</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Role</InputLabel>
                  <Select name="role" value={editingUser.role} label="Role" onChange={handleInputChange}>
                    <MenuItem value="USER">USER</MenuItem>
                    <MenuItem value="ADMIN">ADMIN</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>
        )}
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSaveUser} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default UserManagementPage;
import React, { useState, useContext } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Box, Typography, TextField, Button, Paper, Alert, Grid } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const { t } = useTranslation();
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = t('login.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = t('login.validation.emailInvalid');
    }
    if (!password) {
      newErrors.password = t('login.validation.passwordRequired');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    const result = await login(email, password);
    if (result.success) {
      navigate(from, { replace: true }); // Chuyển về trang trước đó hoặc trang chủ
    } else {
      setErrors({ api: result.message });
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography component="h1" variant="h4" align="center" gutterBottom>
          {t('login.title')}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          {errors.api && <Alert severity="error" sx={{ mb: 2 }}>{errors.api}</Alert>}
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t('login.email')}
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label={t('login.password')}
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errors.password}
            helperText={errors.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {t('login.signIn')}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/register" variant="body2">
                {t('login.noAccount')}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;

import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const DashboardPage = () => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography variant="h4" gutterBottom>{t('admin.dashboard')}</Typography>
      <Typography variant="body1">
        {t('admin.welcome')}
      </Typography>
    </Box>
  );
};

export default DashboardPage;

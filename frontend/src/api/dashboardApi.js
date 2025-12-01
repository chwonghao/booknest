import client from "./client";

// Giả sử backend có các endpoint sau để cung cấp dữ liệu cho dashboard
const API_ENDPOINTS = {
    summary: '/admin/dashboard/summary',
    weeklySales: '/admin/dashboard/weekly-sales',
    recentOrders: '/admin/dashboard/recent-orders',
};

export const getDashboardSummaryApi = () => client.get(API_ENDPOINTS.summary);

export const getWeeklySalesApi = () => client.get(API_ENDPOINTS.weeklySales);

export const getRecentOrdersApi = (limit = 5) => client.get(`${API_ENDPOINTS.recentOrders}?limit=${limit}`);

export const getDashboardDataApi = () => client.get('/admin/dashboard');
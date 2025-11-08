import axios from 'axios';
import { API_CONFIG } from '@shared/constants';
import { NumberVerificationResult, APIResponse } from '@shared/types';

const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

export const verifyPhoneNumber = async (
  phoneNumber: string
): Promise<NumberVerificationResult> => {
  try {
    const response = await api.post<APIResponse<NumberVerificationResult>>(
      '/api/phones/verify',
      { phoneNumber }
    );

    if (response.data.success && response.data.data) {
      return response.data.data;
    }

    throw new Error(response.data.error || 'Verification failed');
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getBlockedNumbers = async () => {
  try {
    const response = await api.get('/api/phones/blocked');
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const reportPhoneNumber = async (
  phoneNumber: string,
  reason: string,
  description?: string
) => {
  try {
    const response = await api.post('/api/reports', {
      phoneNumber,
      reason,
      description,
    });
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const getUserSettings = async () => {
  try {
    const response = await api.get('/api/users/settings');
    return response.data.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export const updateUserSettings = async (settings: any) => {
  try {
    const response = await api.put('/api/users/settings', settings);
    return response.data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default api;

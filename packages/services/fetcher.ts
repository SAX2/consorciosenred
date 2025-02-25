import axios, { AxiosRequestConfig } from 'axios';
import axiosRetry from 'axios-retry';
import { getAuthHeaders } from 'app/services/config';
import https from 'https';

// Configuración de reintentos
axiosRetry(axios, { retries: 3 });

export const fetchWithAuth = async (endpoint: string, options: AxiosRequestConfig = {}) => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.request({
      url: `https://www.consorciosenred.com/cerDevelopment/${endpoint}`,
      timeout: 10000, // 10 segundos de timeout
      httpsAgent: new https.Agent({ rejectUnauthorized: false }), // Deshabilita validación SSL (solo en desarrollo)
      ...options,
      headers: {
        ...options.headers,
        ...headers,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error('Error fetching data:', error.message, error.code, error.config?.url);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(`Fetch request failed with status ${error.response.status}: ${error.response.data.message}`);
    } else {
      throw error;
    }
  }
};

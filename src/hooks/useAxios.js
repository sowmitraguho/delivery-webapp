// useAxios.js
import { useMemo } from 'react';
import axios from 'axios';

const useAxios = () => {
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: 'https://deliverywebappserver.onrender.com',
      // Add headers, interceptors etc. if needed
    });
  }, []);

  return axiosInstance;
};

export default useAxios;

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import routerConstants from '../utils/routerConstants';
const baseUrl = process.env.REACT_APP_BE_URL;

// create axios instance
export const axiosInstance = axios.create({
  baseURL: baseUrl,
});

const useAxiosPrivate = () => {
  const navigate = useNavigate();
  axiosInstance.interceptors.response.use(
    function (response) {
      return response;
    },
    function (error) {
      // check if token is expired or not and status code is 401
      if (error?.response?.status === 401 && (error?.response?.data === "jwt expired!")) {
        // logout();
        localStorage.clear();
        navigate(routerConstants.SIGN_IN);
      }
      return Promise.reject(error);
    }
  );
  return axiosInstance;
};

export default useAxiosPrivate;

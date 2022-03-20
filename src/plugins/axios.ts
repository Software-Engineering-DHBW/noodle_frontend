import axios from 'axios';
import AuthService from '@/services/AuthService';

axios.defaults.headers.common.Authorization = `Bearer ${AuthService.getToken()}`;

export default axios;

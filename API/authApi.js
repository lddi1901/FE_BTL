import createAxiosInstance from '../utils/axios-instance';
import { useAuthStore } from '../stores/authStore';

const axiosInstance = createAxiosInstance("/api/auth");

export const register = async ({ username, email, password, role }) => {
    try {
        const response = (await axiosInstance.post('/register', { username, email, password, role }));
        useAuthStore().setUser(response.data.user);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const login = async ({ email, password }) => {
    try {
        const response = (await axiosInstance.post('/login', { email, password }));
        useAuthStore().setUser(response.data.user);
        console.dir((useAuthStore()).user);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const logout = async () => {
    const response = (await axiosInstance.get('/logout')).data;
    useAuthStore().clearAuth();
    return response;
}

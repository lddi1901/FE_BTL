import createAxiosInstance from '../utils/axios-instance';

const axiosInstance = createAxiosInstance("/api/users");

export const getAllUsers = async () => {
    try {
        const response = (await axiosInstance.get('/')).data.users;
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const getSingleUser = async (userId) => {
    try {
        const response = (await axiosInstance.get(`/${userId}`)).data.user;
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const showMe = async () => {
    try {
        const response = await axiosInstance.get('/showMe');
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateUser = async (data) => {
    try {
        const response = await axiosInstance.patch('/updateUser', data);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const updateUserPassword = async (data) => {
    try {
        const response = (await axiosInstance.patch('/updateUserPassword', data)).data;
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const editSingleUser = async (userId, data) => {
    try {
        const response = await axiosInstance.patch(`/${userId}`, data);
        return response;
    } catch (error) {
        console.log(error);
    }
}
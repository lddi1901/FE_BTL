import createAxiosIntance from '../utils/axios-instance';

const axiosIntance = createAxiosIntance('/api/publishers');

export const getAllPublishers = async () => {
    const response = (await axiosIntance.get('/')).data.publishers;
    return response;
};

export const createPublisher = async (data) => {
    const response = (await axiosIntance.post('/', data)).data.publisher;
    return response;
};

export const getSinglePublisher = async (publisherId) => {
    const response = (await axiosIntance.get(`/${publisherId}`)).data.publisher;
    return response;
};

export const updatePublisher = async (publisherId, data) => {
    const response = await axiosIntance.patch(`/${publisherId}`, data);
    return response;
};

export const deletePublisher = async (publisherId) => {
    const response = (await axiosIntance.delete(`/${publisherId}`));
    return response;
}
import createAxiosIntance from '../utils/axios-instance';

const axiosIntance = createAxiosIntance('/api/borrowings');

export const getAllBorrowings = async () => {
    const response = (await axiosIntance.get('/')).data.borrowings;
    return response;
};

export const createBorrowings = async (data) => {
    const response = await axiosIntance.post('/', data);
    return response;
};

export const getCurrentBorrowings = async () => {
    const response = (await axiosIntance.get('/showAllMyBorrowings')).data.borrowings;
    return response;
}

export const updateBorrowing = async (borrowingId, data) => {
    const response = (await axiosIntance.patch(`/${borrowingId}`, data));
    return response;
} 
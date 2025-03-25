import createAxiosInstance from '../utils/axios-instance';
import createAxiosInstanceUpload from '../utils/axios-instance-upload';

const axiosInstance = createAxiosInstance('/api/books');
const axiosInstanceUpload = createAxiosInstanceUpload('/api/books');

export const createBook = async (data) => {
    const response = (await axiosInstance.post('/', data)).data.book;
    return response;
}

export const getAllBooks = async () => {
    const response = (await axiosInstance.get('/')).data.books;
    return response;
};

export const getSingleBook = async (bookId) => {
    const response = (await axiosInstance.get(`/${bookId}`)).data.book;
    return response;
};

export const updateBook = async (bookId, data) => {
    const response = (await axiosInstance.patch(`/${bookId}`, data)).data.book;
    return response;
};

export const uploadBookImage = async (file) => {
    const response = await axiosInstanceUpload.post('/uploadImage', { image: file });
};
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://api.imgur.com/3',
  headers: {
    Accept: '*/*',
    'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  }
})
axiosInstance.interceptors.response.use(({ data }) => data);

// 相簿
export const getAlbums = () => axiosInstance.get(`/account/${process.env.USER_USERNAME}/albums`);
export const createAlbum = (body) => axiosInstance.post('/album', body);
export const deleteAlbum = (albumId) => axiosInstance.delete(`/album/${albumId}`);

// 圖片
export const getAlbum = (albumId) => axiosInstance.get(`/album/${albumId}`);
export const uploadImage = (body) => axiosInstance.post('/image', body);
export const deleteImage = (imageId) => axiosInstance.delete(`/image/${imageId}`);
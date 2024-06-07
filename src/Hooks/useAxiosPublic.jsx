import axios from 'axios';
const axiosPublic = axios.create({
    baseURL: 'https://exam-server-7c41747804bf.herokuapp.com'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
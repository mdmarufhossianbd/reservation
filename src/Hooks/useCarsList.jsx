import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from './useAxiosPublic';

const useCarsList = () => {
    const axiosPublic = useAxiosPublic();
    const {data : carList = [], isLoading, refetch} = useQuery({
        queryKey: ['carList'],
        queryFn: async () => {
            const res = await axiosPublic.get('/carsList')
            return res.data.data;
        }
    });

    return [carList, isLoading, refetch]
};

export default useCarsList;
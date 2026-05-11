

import { useMutation } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUpdateProduct = () => {
    const axiosSecure = useAxiosSecure();

    return useMutation({
        mutationFn: async ({id, updatedProduct}) => {
            console.log("data and id ", updatedProduct, id)
            const { data } = await axiosSecure.put(`/products/${id}`, updatedProduct)
            return data;
        }
    })
};

export default useUpdateProduct;
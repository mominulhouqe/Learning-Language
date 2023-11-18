
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
import { useQuery } from 'react-query';
const useCart = () => {
    const { user, loading } = useAuth();
    // const token = localStorage.getItem('access-token');
    const [axiosSecure] = useAxiosSecure();
    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            return res.data;
        },
    })

    return {cart, refetch}

}
export default useCart;


// import { useContext } from 'react';
// import { useQuery } from 'react-query';
// import { AuthContext } from '../provider/AuthProvider';

// const useCart = () => {
//   const { user } = useContext(AuthContext);
//   // const token = localStorage.getItem('access-token');

//   const { refetch, data: cart=[] } = useQuery(['carts', user?.email], async () => {
//     const res = await fetch(`https://language-server-one.vercel.app/carts?email=${user?.email}`);
//     return res.json();
//   });


//   return {refetch, cart};
// };

// export default useCart;





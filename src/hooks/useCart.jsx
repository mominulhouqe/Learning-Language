// import { useQuery } from '@tanstack/react-query'
// import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';
// const useCart = () => {
//     const { user, loading } = useAuth();
//     // const token = localStorage.getItem('access-token');
//     const [axiosSecure] = useAxiosSecure();
//     const { refetch, data: cart = [] } = useQuery({
//         queryKey: ['carts', user?.email],
//         enabled: !loading,
//         queryFn: async () => {
//             const res = await axiosSecure(`/carts?email=${user?.email}`)
//             console.log('res from axios', res)
//             return res.data;
//         },
//     })

//     return [cart, refetch]

// }
// export default useCart;



import { useContext } from 'react';
import { useQuery } from 'react-query';
import { AuthContext } from '../provider/AuthProvider';


const useCart = () => {
  const { user } = useContext(AuthContext);
//   const token = localStorage.getItem('access-token');

  const { refetch, data: cart = [] } = useQuery(['carts', user?.email], async () => {
    const res = await fetch(`http://localhost:5000/carts?email=${user?.email}` 
    // {
    //   headers: {
    //     authorization: `Bearer ${token}` // Make sure to use 'Bearer' with a capital 'B'
    //   }
    // }
    );
    return res.json();
  });

  return [refetch, cart];
};

export default useCart;




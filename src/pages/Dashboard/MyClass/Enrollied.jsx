

import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';

const Enrollied = () => {
  const { user } = useContext(AuthContext);
  const [selectedClasses, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `https://language-server-one.vercel.app/users/myEnrol/${encodeURIComponent(user.email)}`
        );
        const data = await res.json();
        console.log(data);
        setEnrollments(data);
      } catch (error) {
        console.error('Error occurred while fetching data:', error);
      }
    };

    fetchUserData();
  }, [user.email]);

  return (
    
    <div>
       <h1 className="text-2xl font-bold mb-6">My Enrolled Classes</h1>
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
         {selectedClasses.map((cls) => (
           <div key={cls._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
             <div className="relative">
               <img src={cls?.cart?.image[0]} alt={cls?.cart?.image[0]} className="h-48 w-full object-cover" />
               <button className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-2">
                 <svg
                   xmlns="http://www.w3.org/2000/svg"
                   className="h-5 w-5"
                   viewBox="0 0 20 20"
                   fill="currentColor"
                 >
                   <path
                     fillRule="evenodd"
                     d="M17.707 6.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 13.586l7.293-7.293a1 1 0 011.414 0z"
                     clipRule="evenodd"
                   />
                 </svg>
               </button>
             </div>
             <div className="px-6 py-4">
               <h2 className="text-lg font-bold text-gray-800">{cls?.cart?.names[0]}</h2>
               <p className="text-gray-600">${cls.price}</p>
               <p className="text-gray-600">{cls.email}</p>
             </div>
           </div>
         ))}
       </div>
     </div>
  );
};

export default Enrollied;

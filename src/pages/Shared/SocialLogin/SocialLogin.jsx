import React, { useContext } from 'react';
import { AuthContext } from '../../../provider/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import Swal from 'sweetalert2';
import { useNavigate, useLocation } from 'react-router-dom';

const SocialLogin = () => {
  const { signInGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';


 const handleGoogleLogin = () => {
  signInGoogle()
    .then(result => {
      const loggedUser = result.user;

      const saveUser = { name:loggedUser.displayName, email: loggedUser.email, imgae:loggedUser.photoURL ,student:'44', role:'student'}
      console.log(saveUser);
      fetch('https://language-server-one.vercel.app/users', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(saveUser)
    })
    .then(res => res.json())
    .then(() =>{
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: `Logged in as ${loggedUser.email}`,
      });
      navigate(from, { replace: true });
    })


     // Redirect to the specified "from" route
      
    })
    .catch(error => {
      console.log(error.message);
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: error.message,
      });
    });
};
  return (
    <div>
      <button
        className="w-full btn btn-outline btn-primary px-4 py-2 cursor-pointer"
        onClick={handleGoogleLogin}
      >
        <FaGoogle /> Social Login
      </button>
    </div>
  );
};

export default SocialLogin;



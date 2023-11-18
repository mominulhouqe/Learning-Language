import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { Link, useLocation, useNavigate, } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';
import Swal from 'sweetalert2';
import SocialLogin from '../Shared/SocialLogin/SocialLogin';

const RegistrationForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { createUser, updatedUserProfiles } = useContext(AuthContext);

  const onSubmit = (data) => {
    // Handle registration logic here
    console.log(data);
    createUser(data.email, data.password)
      .then(result => {
        const loggedUser = result.user;

        updatedUserProfiles(data.name, data.photoURL)
          .then(() => {
            const saveUser = { name: data.name, email: data.email, imgae: data.photoURL, student: '44', role: 'student' }
            fetch('https://language-server-one.vercel.app/users', {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify(saveUser)
            })
              .then(res => res.json())
              .then(data => {
                if (data.insertedId) {
                  reset();
                  Swal.fire({
                    position: 'top-end',
                    icon: 'success',
                    title: 'Registration successfully.',
                    showConfirmButton: false,
                    timer: 1500
                  });
                  navigate('/')
                }
              })
          })
          .catch(error => console.log(error))
      })

      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Registration Failed',
          text: error.message,
        });
        console.log(error.message);
      });

  };

  return (
    <div className="rounded-xl mb-6 shadow-xl p-6 max-w-sm mx-auto">
      <form className='mt-24' onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-2xl">Please Register Here !!!</h1>
        <div className="mb-4">
          <label htmlFor="name" className="block mb-2 font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            {...register('name', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="photoUrl" className="block mb-2 font-medium">
            Photo URL
          </label>
          <input
            type="text"
            id="photoURL"
            {...register('photoURL')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2 font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register('email', { required: true })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <div className="mb-4 w-1/2">
            <label htmlFor="password" className="block mb-2 font-medium">
              Password
            </label>
            <input
              type="password"
              id="password"
              {...register('password', {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
              })}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors.password ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">
                Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
              </p>
            )}
          </div>
          <div className="mb-4 w-1/2">
            <label htmlFor="confirmPassword" className="block mb-2 font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              {...register('confirmPassword', {
                required: true,
                validate: (value) => value === document.getElementById('password').value,
              })}
              className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 ${errors.confirmPassword ? 'focus:ring-red-500' : 'focus:ring-blue-500'
                }`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
          </div>
        </div>
        <div className="my-4">
          <Link to="/login" className="text-blue-500 underline">
            Already have an account
          </Link>
        </div>

        {/* Social Login */}
        <div className="justify-between">
          <div className="mb-4">
            <input
              type="submit"
              value="Register"
              className="w-full px-4 py-2 btn btn-primary cursor-pointer"
            />
          </div>
        </div>
      </form>
      <div className="mb-4">
        <SocialLogin />
      </div>
    </div>
  );
};

export default RegistrationForm;

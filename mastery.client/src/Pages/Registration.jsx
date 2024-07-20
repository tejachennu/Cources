import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../slices/registerSlice'; // Assuming you have a registration slice
import { useNavigate } from 'react-router-dom';
import { reset } from '../slices/registerSlice';

const Registration = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.register);
  const [mobileNumber, setMobileNumber] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(`/OtpVerification?email=${encodeURIComponent(email)}`);
      dispatch(reset());
    }
  }, [isAuthenticated, navigate]);

  const validateMobileNumber = (number) => {
    const regex = /^[0-9]{10}$/;
    if (!regex.test(number)) {
      setMobileError('Mobile number must be 10 digits.');
      return false;
    }
    setMobileError('');
    return true;
  };

  const validateName = (name) => {
    if (name.trim().length === 0) {
      setNameError('Name is required.');
      return false;
    }
    setNameError('');
    return true;
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setEmailError('Invalid email format.');
      return false;
    }
    setEmailError('');
    return true;
  };

  const validatePassword = (password) => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isMobileValid = validateMobileNumber(mobileNumber);
    const isNameValid = validateName(name);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    if (isMobileValid && isNameValid && isEmailValid && isPasswordValid) {
      dispatch(registerUser({ mobileNumber, name, email, password }));
    }
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create your account
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleRegister}>
            <div>
              <label htmlFor="register-mobile" className="block mb-2 text-sm font-medium text-gray-900">Mobile Number</label>
              <input
                type="text"
                name="mobileNumber"
                id="register-mobile"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your mobile number"
                required
                onChange={(e) => setMobileNumber(e.target.value)}
                onBlur={() => validateMobileNumber(mobileNumber)}
                value={mobileNumber}
              />
              {mobileError && <p className="text-red-600">{mobileError}</p>}
            </div>
            <div>
              <label htmlFor="register-name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
              <input
                type="text"
                name="name"
                id="register-name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your name"
                required
                onChange={(e) => setName(e.target.value)}
                onBlur={() => validateName(name)}
                value={name}
              />
              {nameError && <p className="text-red-600">{nameError}</p>}
            </div>
            <div>
              <label htmlFor="register-email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
              <input
                type="email"
                name="email"
                id="register-email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => validateEmail(email)}
                value={email}
              />
              {emailError && <p className="text-red-600">{emailError}</p>}
            </div>
            <div>
              <label htmlFor="register-password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
              <input
                type="password"
                name="password"
                id="register-password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => validatePassword(password)}
                value={password}
              />
              {passwordError && <p className="text-red-600">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
            {error && <p className="mt-4 text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Registration;

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './NavLayout';
import { authenticateUser } from '../slices/authSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Alert from '../Components/Alert'


function Login() {
  const [showSuccess, setShowSuccess] = useState(true);
  const [showError, setShowError] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 4; 
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = !validateEmail(email) ? 'Invalid email address' : '';
    const passwordError = !validatePassword(password) ? 'Password must be at least 6 characters' : '';
    setErrors({ email: emailError, password: passwordError });

    if (!emailError && !passwordError) {
      dispatch(authenticateUser({ email, password }))
        .unwrap()
        .then((result) => {
          toast.success('Login successful');
        })
        .catch((error) => {
          toast.error('Please check the credentials', error);
        });
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <div className="flex flex-wrap w-screen text-slate-800">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex justify-center pt-12 md:justify-start md:pl-12">
            <a href="#" className="text-2xl font-bold text-blue-600">SkillMastery</a>
          </div>
          <div className="my-auto mx-auto flex flex-col justify-center px-6 pt-8 md:justify-start lg:w-[28rem]">
            <p className="text-3xl font-bold text-center md:leading-tight md:text-left md:text-5xl">
              Welcome back <br />
              to <span className="text-blue-600">Skill Mastery</span>
            </p>
            <p className="mt-6 font-medium text-center md:text-left">Sign in to your account below.</p>

            <form onSubmit={handleLogin} className="flex flex-col items-stretch pt-3 md:pt-8">
              <div className="flex flex-col pt-4">
                <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    id="login-email"
                    className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none"
                    placeholder="Email"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
              </div>
              <div className="flex flex-col pt-4 mb-4">
                <div className="relative flex overflow-hidden transition border-2 rounded-md focus-within:border-blue-600">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    id="login-password"
                    className="flex-shrink w-full px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-gray-300 appearance-none focus:outline-none"
                    placeholder="Password"
                  />
                </div>
                {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
              </div>
              <Link to="/forgotpassword" className="mb-6 text-sm font-medium text-center text-gray-600 md:text-left">Forgot password?</Link>
              <button type="submit" className="px-4 py-2 text-base font-semibold text-center text-white transition bg-blue-600 rounded-lg shadow-md outline-none ring-blue-500 ring-offset-2 hover:bg-blue-700 focus:ring-2 md:w-32" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}</button>
                        </form>
                        <div className="py-12 text-center">
                            <p className="text-gray-600">
                                Don't have an account?
                                <Link to="/register" className="font-semibold text-gray-900 underline whitespace-nowrap underline-offset-4">Sign up for free.</Link>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="relative hidden h-screen bg-blue-600 select-none bg-gradient-to-br md:block md:w-1/2">
                    <div className="py-16 px-8 text-white xl:w-[40rem]">
                        <span className="px-3 py-1 font-medium text-blue-600 bg-white rounded-full">New Feature</span>
                        <p className="my-6 text-3xl font-semibold leading-10">Create animations with <span className="py-2 abg-white whitespace-nowrap text-cyan-300">drag and drop</span>.</p>
                        <p className="mb-4">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Incidunt necessitatibus nostrum repellendus ab totam.</p>
                        <a href="#" className="font-semibold tracking-wide text-white underline underline-offset-4">Learn More</a>
                    </div>
                    <img className="object-cover w-11/12 max-w-lg ml-8 rounded-lg" src="/images/aaFKzowNcgxqSdxMw11na.png" />
                </div>
            </div>

        </div>        
    );
    
 
}

export default Login;
import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { sendOtp, resetPassword } from '../slices/passwordSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { reset } from '../slices/passwordSlice';
function ForgotPassword() {

  const navitate = useNavigate();
  const dispatch = useDispatch();
  const { otpSent, loading, error ,Sucess } = useSelector((state) => state.password);
  useEffect((e)=>{
    if(Sucess){
      toast.success("Passwored Updated");
      dispatch(reset());
      navitate('/');
    }
  },[Sucess,navitate])

  const formik = useFormik({
    initialValues: {
      email: '',
      otp: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      otp: Yup.string().when('otpSent', {
        is: true,
        then: Yup.string().required('Required'),
      }),
      password: Yup.string().when('otpSent', {
        is: true,
        then: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
      }),
      confirmPassword: Yup.string().when('otpSent', {
        is: true,
        then: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Required'),
      }),
    }),

  
    
    onSubmit: (values) => {
      if (!otpSent) {
        dispatch(sendOtp(values.email));
      } else {
        dispatch(resetPassword({
          Email: values.email,
          VerificationCode: values.otp,
          Password: values.password,
        }));
      }
    },
  });

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" />
          Flowbite
        </a>
        <div className="w-full p-6 bg-white rounded-lg shadow md:mt-0 sm:max-w-md sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={formik.handleSubmit}>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                placeholder="Enter the Email"
                required
                onChange={formik.handleChange}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-600">{formik.errors.email}</div>
              ) : null}
            </div>
            {otpSent && (
              <>
                <div>
                  <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900">OTP</label>
                  <input
                    type="text"
                    name="otp"
                    id="otp"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="Enter the OTP"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.otp}
                  />
                  {formik.touched.otp && formik.errors.otp ? (
                    <div className="text-red-600">{formik.errors.otp}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">New Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-600">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    required
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                  />
                  {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                    <div className="text-red-600">{formik.errors.confirmPassword}</div>
                  ) : null}
                </div>
              </>
            )}
            <button type="submit" className="w-full text-white bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
              {otpSent ? 'Reset Password' : 'Send OTP'}
            </button>
            {loading && <p>Sending Mail...</p>}
            {error && <p className="text-red-600">{error}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotPassword;

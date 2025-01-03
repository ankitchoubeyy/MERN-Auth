import React, { useState } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-emerald-600 mb-8">
          {isLogin ? 'Login' : 'Create Account'}
        </h2>
        <form>
          {!isLogin && (
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                placeholder="Your Name"
              />
            </div>
          )}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full mt-1 p-2 border border-gray-300 rounded-md"
              placeholder="Your Password"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-emerald-600 text-white p-2 rounded-md hover:bg-emerald-700 transition duration-300"
          >
            {isLogin ? 'Login' : 'Create Account'}
          </button>
        </form>
        <div className='flex justify-center gap-5 items-center'>
        <div className="mt-4 text-center">
          <button
            onClick={toggleForm}
            className="text-emerald-600 hover:underline hover:text-blue-400"
          >
            {isLogin ? 'Create an account' : 'Already have an account? Login'}
          </button>
        </div>
        <div className="mt-4 text-center">
          <button
            className="text-emerald-600 hover:underline hover:text-blue-400"
          >
            Forgot Password?
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import {useNavigate} from 'react-router-dom';

const Signup = ({setauth , setuid , setrole}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [roletype, setroletype] = useState('dev');
  const Navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    let a = {
      username : username , 
      password : password,

      role : roletype
    }
    console.log(a)
    const apiUrl = `http://localhost:3000/api/signup/`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(a),
      });

      if (response.ok) {
      const ur = await response.json()
      console.log(ur)
      try{
        if(ur.error) {
          setError('user already exists')
          return
        }
      }catch{
        console.log('new user')
      }
      setauth(true)
      setrole(ur.ur.roletype)
      setuid(ur.ur._id)
      Navigate(`/hi?uid=${ur.ur._id}`)
        console.log('Signup successful');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Error making API call:', error);
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Sign Up</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username (email)
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
            
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              Role
            </label>
            <select name="role" id="role" onChange={(e)=> setroletype(e.target.value)}>
              <option value="dev" >dev</option>
              <option value="recruiter">recruiter</option>
            </select>

          <button
            type="submit"
            className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={handleSubmit}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
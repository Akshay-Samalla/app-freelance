import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = ({ setauth, setuid, setrole }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const Navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setEmail(parsedUser.username);
        setPassword(parsedUser.password);
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = `http://localhost:3000/api/login?username=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;
    try {
      const response = await fetch(apiUrl);
      if (response.ok) {

        localStorage.setItem(
          "user",
          JSON.stringify({ username: email, password: password }),
        );
        console.log("Login successful");
        const ur = await response.json();
        setauth(true);
        setrole(ur.user.roletype);
        setuid(ur.user._id);
        Navigate(`/hi?uid=${ur.user._id}`);

      } else {
        // Handle other responses
        console.error("Login failed");
        setError("invalid credentials");
      }
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };
  function signin() {
    Navigate("/signup");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <p className="text-red-500">{error && error}</p>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-2 rounded-md"
          >
            Login
          </button>
          <span className="pt-3">
            not registered?{" "}
            <a className="text-blue-600 hover:cursor-pointer" onClick={signin}>
              sign up
            </a>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;

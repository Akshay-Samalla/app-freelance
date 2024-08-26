import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

function UserCard({ user }) {
  return (
    <div className="w-80 rounded overflow-hidden shadow-lg m-4 bg-white">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{user.username}</div>
        <p className="text-gray-700 text-base">{user.description}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center">
          <span className="font-bold">Email:</span>
          <span className="ml-2">{user.email}</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="font-bold">Phone:</span>
          <span className="ml-2">{user.phoneNumber}</span>
        </div>
        <div className="flex items-center mt-2">
          <span className="font-bold">GitHub:</span>
          <a href={user.githubRepo} className="ml-2 text-blue-500">{user.githubRepo}</a>
        </div>
        <div className="flex items-center mt-2">
          <span className="font-bold">LinkedIn:</span>
          <a href={user.linkedin} className="ml-2 text-blue-500">{user.linkedin}</a>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Skills</h3>
          <div className="mt-2">
            {user.skills.map((skill, index) => (
              <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {skill}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Best Projects</h3>
          <div className="mt-2">
            {user.bestProjects.map((project, index) => (
              <a key={index} href={project} className="block text-blue-500">
                {project}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-lg font-semibold">Competitions</h3>
          <div className="mt-2">
            {user.competitions.map((competition, index) => (
              <span key={index} className="block">
                {competition}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const Navbar = ({ role }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef();

  const fetchUsers = async () => {

    const response = await fetch(`http://localhost:3000/search?search=${searchTerm}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUsers(data['skillsArray']);
        setIsModalOpen(true);
      }).catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target) && !event.target.closest('.overflow-y-auto')) {
      setIsModalOpen(false);
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen]);

  return (
    <>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to='/hi'><div className="text-white text-lg font-bold">{'<'} HELLO DEV's {'>'}</div></Link>
          <div className="flex-grow flex justify-center">
            <div className="flex items-center space-x-4">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                onClick={fetchUsers}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Search
              </button>
            </div>
          </div>
          {role === 'dev' && (
            <div className="text-white">
              <Link to="/profile">Profile</Link>
            </div>
          )}
        </div>
      </nav>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center overflow-y-auto">
          <div ref={modalRef} className="bg-white p-4 rounded-lg shadow-lg max-w-7xl w-full max-h-screen overflow-y-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
            >
              Close
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {users.map((user, index) => (
                <UserCard key={index} user={user} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
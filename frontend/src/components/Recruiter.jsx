import React, { useState, useEffect } from "react";

function UserCard({ user }) {
  return (
    <div className="w-80 rounded overflow-hidden shadow-lg m-4">
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

function Recruiter() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/allprofiles')
      .then((response) => response.json())
      .then((data) => {
        console.log("Recruiter data:", data); // Log the fetched data
        setUsers(data['profiles']);
      })
      .catch((error) => {
        console.error("Error fetching recruiter data:", error);
      });
  }, []);

  return (
    <div className="flex flex-wrap justify-center">
      {users ? users.map((user) => (
        <UserCard key={user.uid} user={user} />
      )) : "No data available"}
    </div>
  );
}

export default Recruiter;
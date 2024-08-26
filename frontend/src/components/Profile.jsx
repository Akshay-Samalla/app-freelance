import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const defaultUser = {
  uid: 1,
  username: "user1",
  email: "user1@gmail.com",
  phoneNumber: "12345",
  password: "qwer",
  skills: "python|java|javasctip|zig|shap|cpp",
  githubRepo: "github.com/user1",
  linkedin: "linkedin.com/user1",
  bestProjects: "link1|link2|link3",
  competitions: "competetion1|competetion2",
  description: "hey how are you",
  userType: "dev",
};

function Profile({ uid }) {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [githubRepo, setGithubRepo] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [bestProjects, setBestProjects] = useState("");
  const [competitions, setCompetitions] = useState("");

  useEffect(() => {
    fetch(`http://localhost:3000/profile/${uid}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Profile data:", data);
        if (data.profile) {
          const profile = data.profile;
          setEmail(profile.email);
          setPhoneNumber(profile.phoneNumber);
          setDescription(profile.description);
          setSkills(profile.skills.join(", "));
          setGithubRepo(`https://${profile.githubRepo}`);
          setLinkedin(`https://${profile.linkedin}`);
          setBestProjects(profile.bestProjects.join("\n"));
          setCompetitions(profile.competitions.join("\n"));
        } 
        
    
      })
      .catch((error) => {
        console.error("Error fetching profile:", error);
          setEmail(defaultUser.email);
          setPhoneNumber(defaultUser.phoneNumber);
          setDescription(defaultUser.description);
          setSkills(defaultUser.skills.split("|").join(", "));
          setGithubRepo(`https://${defaultUser.githubRepo}`);
          setLinkedin(`https://${defaultUser.linkedin}`);
          setBestProjects(defaultUser.bestProjects.split("|").join("\n"));
          setCompetitions(defaultUser.competitions.split("|").join("\n"));
      });
  }, [uid]);

  const handleProfileChanges = () => {
    fetch(`http://localhost:3000/users/${uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        phoneNumber,
        description,
        skills: skills.split(",").join("|"),
        githubRepo: githubRepo.split("https://").join(""),
        linkedin: linkedin.split("https://").join(""),
        bestProjects: bestProjects.split("\n").join("|"),
        competitions: competitions.split("\n").join("|"),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Profile Updated Successfully");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 bg-background rounded-lg shadow-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-500">JD</span>
              </div>
              <div>
                <h2 className="text-2xl font-bold">{defaultUser.username}</h2>
                <p className="text-muted-foreground">{defaultUser.userType}</p>
              </div>
            </div>
            <div className="my-6 border-t border-gray-200"></div>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
          </div>
          <div className="col-span-2 bg-background rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="skills"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills
                </label>
                <input
                  id="skills"
                  type="text"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="github"
                  className="block text-sm font-medium text-gray-700"
                >
                  GitHub
                </label>
                <input
                  id="github"
                  type="text"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-700"
                >
                  LinkedIn
                </label>
                <input
                  id="linkedin"
                  type="text"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="projects"
                  className="block text-sm font-medium text-gray-700"
                >
                  Best Projects
                </label>
                <textarea
                  id="projects"
                  rows={3}
                  value={bestProjects}
                  onChange={(e) => setBestProjects(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="competitions"
                  className="block text-sm font-medium text-gray-700"
                >
                  Competition History
                </label>
                <textarea
                  id="competitions"
                  rows={3}
                  value={competitions}
                  onChange={(e) => setCompetitions(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                className="bg-indigo-600 text-white px-4 py-2 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleProfileChanges}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
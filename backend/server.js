const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const port = 3000;

app.use(express.json());
app.use(cors());
mongoose
  .connect(
    "MONGODB_URI",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("db connected"))
  .catch((err) => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  roletype: String,
});
const ProfileSchema = new mongoose.Schema({
  uid: String,
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String },
  skills: { type: [String] },
  githubRepo: { type: String },
  linkedin: { type: String },
  bestProjects: { type: [String] },
  competitions: { type: [String] },
  description: { type: String },
});
const Profile = mongoose.model("Profile", ProfileSchema);
const User = mongoose.model("User", userSchema);
app.get("/api/login", async (req, res) => {
  const { username, password } = req.query;
  try {
    const user = await User.findOne({ username: username, password: password });
    if (user) {
      res.status(200).send({ user });
    } else {
      console.log("no user");
      res.status(401).send("Login failed");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }

  console.log(
    `Login attempt with username: ${username} and password: ${password}`
  );
});
app.post("/api/signup", async (req, res) => {
  const { username, password, role } = req.body;
  console.log(username, password, role);
  try {
    const checker = await User.findOne({ username: username });
    if (checker) {
      res.status(200).send({ error: "user already exists" });
      return;
    }
    const user = await User.create({
      username: username,
      password: password,
      roletype: role,
    });
    const ur = await User.findOne({ username: username });
    console.log(ur);
    console.log(ur._id);
    console.log(ur.username);
    if (ur) {
      res.status(200).send({ ur });
    } else {
      console.log("no user");
      res.status(401).send("Signup failed");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});

app.get("/profile/:uid", async (req, res) => {
  console.log("get profile");
  const { uid } = req.params;
  try {
    const profile = await Profile.findOne({ uid: uid });
    if (profile) {
      res.status(200).send({ profile });
    } else {
      console.log("no profile");
      res.status(401).send({ message: "Profile not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Internal server error");
  }
});
app.put("/users/:uid", async (req, res) => {
  const { uid } = req.params;
  const {
    email,
    phoneNumber,
    description,
    skills,
    githubRepo,
    linkedin,
    bestProjects,
    competitions,
  } = req.body;

  try {
    const updatedProfile = await Profile.findOneAndUpdate(
      { uid: uid },
      {
        uid: uid,
        username: email.split("@")[0],
        email: email,
        phoneNumber: phoneNumber,
        skills: skills.split("|"),
        githubRepo: `https://${githubRepo}`,
        linkedin: `https://${linkedin}`,
        bestProjects: bestProjects.split("|"),
        competitions: competitions.split("|"),
        description: description,
      },
      { new: true }
    );
    if (!updatedProfile) {
      const createprofile = await Profile.create({
        uid: uid,
        username: email.split("@")[0],
        email: email,
        phoneNumber: phoneNumber,
        skills: skills.split("|"),
        githubRepo: `https://${githubRepo}`,
        linkedin: `https://${linkedin}`,
        bestProjects: bestProjects.split("|"),
        competitions: competitions.split("|"),
        description: description,
      });
    }

    res.status(200).send({ profile: updatedProfile });
    console.log("Profile updated");
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Internal server error");
  }
});
app.get("/allprofiles", async (req, res) => {
  try {
    const profiles = await Profile.find({});
    if (!profiles) {
      res.status(500).send("Internal server error");
    } else {
      res.status(200).send({ profiles });
    }
  } catch (error) {
    console.error("Error fetching profiles:", error);
    res.status(500).send("Internal server error");
  }
});
app.get("/search", async (req, res) => {
  const { search } = req.query;
  console.log(search);
  try {
    const skillsArray = await Profile.find({
      skills: { $in: search.split(",") },
    });
    res.status(200).send({ skillsArray });
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

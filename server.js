const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  console.error("❌ ERROR: JWT_SECRET is missing in .env file");
  process.exit(1);
}

const { body, validationResult } = require("express-validator");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static("public"));

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected"))
.catch(err => console.error(err));

const User = require("./models/User");

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
  userId: String  // Each note belongs to a user
});

const Note = mongoose.model("Note", noteSchema);

// Middleware to verify JWT Token
const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Signup Route
app.post("/signup", [
  body("username").isLength({ min: 3 }),
  body("password").isLength({ min: 6 })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User registered!" });
  } catch (err) {
    res.status(400).json({ message: "User already exists" });
  }
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(400).json({ message: "Invalid username or password" });

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) return res.status(400).json({ message: "Invalid username or password" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
});

// Create Note (Protected)
app.post("/notes", authMiddleware, async (req, res) => {
  const newNote = new Note({ ...req.body, userId: req.user.userId });
  await newNote.save();
  res.json(newNote);
});

// Get User Notes
app.get("/notes", authMiddleware, async (req, res) => {
  const notes = await Note.find({ userId: req.user.userId });
  res.json(notes);
});

// Delete a Note
app.delete("/notes/:id", authMiddleware, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  res.json({ message: "Note deleted" });
});

app.put("/notes/:id", authMiddleware, async (req, res) => {
    const { title, content } = req.body;
    const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    res.json(note);
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

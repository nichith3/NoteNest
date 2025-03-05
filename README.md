# 📝 NoteNest - A Simple Note-Taking App (Node.js + MongoDB)

NoteNest is a simple note-taking application built using **Node.js**, **Express.js**, and **MongoDB**.  
It allows users to **sign up, log in, create, edit, delete, and view notes** securely.

---

## 📌 Tech Stack
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (via MongoDB Atlas)
- **Authentication:** JWT (JSON Web Tokens)
- **Frontend:** HTML, CSS, JavaScript

---

## 🔧 Installation Guide

### **1️⃣ Install Node.js**
Before running this project, you need to install **Node.js**.

- Download **Node.js LTS version** from:  
  👉 [https://nodejs.org/](https://nodejs.org/)
- Install Node.js and verify installation:
  ```sh
  node -v
  npm -v

### **2️⃣ Cloning the Repo**
```
git clone https://github.com/yourusername/NoteNest.git
cd NoteNest
```
### **3️⃣ Install Dependencies**
```
npm install express mongoose dotenv jsonwebtoken bcrypt cors
```
1. express → Web framework for handling routes
2. mongoose → MongoDB ODM (for database interaction)
3. dotenv → Loads environment variables from .env
4. jsonwebtoken → Handles user authentication using JWT
5. bcrypt → Hashes passwords for security
6. cors → Allows cross-origin requests (useful if frontend is separate)


### **4️⃣ Set Up MongoDB (Database)**

This project uses MongoDB Atlas (a cloud database). Follow these steps:

📌 Create a MongoDB Atlas Database
1. Go to MongoDB Atlas and sign up.
2. Create a free cluster.
3. Click Connect → Drivers → Node.js.
4. Replace username and password in the connection string.


### **5️⃣ Configure .env File**

We store sensitive data like MongoDB credentials in a .env file.

1. Create a .env file in the root directory
2. Add the following content to .env

```
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/notesDB?retryWrites=true&w=majority
JWT_SECRET=your_secret_key
```

✅ Replace <username> and <password> with your MongoDB credentials.
✅ JWT_SECRET can be any random secret key (used for authentication security).


### **6️⃣ Start the Server**

Run the following command to start the Node.js server:

```
node server.js
```

If everything is set up correctly, you should see:
```
MongoDB Connected
Server running on port 5000
```

### **7️⃣ Open the App in Your Browser**
Once the server is running, open these URLs in your browser:
Notes Page: http://localhost:5000/

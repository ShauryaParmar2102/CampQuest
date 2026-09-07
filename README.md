# 🏕️ CampQuest

CampQuest is a full-stack campground web application where users can discover campgrounds, create their own campground listings, upload images, leave reviews, and manage their own content.

This project was built as a personal project to practise full-stack web development using Node.js, Express, MongoDB, Mongoose, EJS and authentication.

---

## ✨ Features

- 🏕️ Browse campground listings
- 🔐 User registration and login
- 👤 User authentication with Passport
- ➕ Create new campgrounds
- ✏️ Edit your own campgrounds
- 🗑️ Delete your own campgrounds
- 📸 Upload campground images with Cloudinary
- ⭐ Leave campground reviews and ratings
- 👤 Display the username of review authors
- 🗑️ Delete your own reviews
- ✅ Server-side validation with Joi
- 🛡️ Authentication and authorisation middleware
- 💬 Flash success and error messages
- 📱 Responsive Bootstrap interface
- 🗄️ MongoDB database with Mongoose

---

## 🛠️ Technologies Used

### Frontend

- 🌐 HTML
- 🎨 CSS
- 🅱️ Bootstrap
- 📄 EJS
- ⚡ JavaScript

### Backend

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB
- 🧩 Mongoose
- 🔐 Passport.js
- ✅ Joi
- ☁️ Cloudinary
- 📤 Multer

---
## 📁 Project Structure

```text
CampQuest/
│
├── 🎨 FRONTEND
│   │
│   ├── views/
│   │   ├── campgrounds/
│   │   │   ├── index.ejs
│   │   │   ├── show.ejs
│   │   │   ├── new.ejs
│   │   │   └── edit.ejs
│   │   │
│   │   ├── users/
│   │   │   ├── login.ejs
│   │   │   └── register.ejs
│   │   │
│   │   ├── layouts/
│   │   │   └── boilerplate.ejs
│   │   │
│   │   ├── partials/
│   │   │   ├── navbar.ejs
│   │   │   ├── flash.ejs
│   │   │   └── footer.ejs
│   │   │
│   │   ├── home.ejs
│   │   └── error.ejs
│   │
│   └── public/
│       ├── stylesheets/
│       ├── javascripts/
│       └── images/
│
├── ⚙️ BACKEND
│   │
│   ├── controllers/
│   │   ├── campgroundController.js
│   │   ├── reviewController.js
│   │   └── UserController.js
│   │
│   ├── models/
│   │   ├── campground.js
│   │   ├── review.js
│   │   └── user.js
│   │
│   ├── routes/
│   │   ├── campgrounds.js
│   │   ├── reviews.js
│   │   └── users.js
│   │
│   ├── cloudinary/
│   ├── utilities/
│   ├── seeds/
│   │
│   ├── server.js
│   ├── middlewares.js
│   └── schemasForJoi.js
│
├── 🔧 CONFIGURATION
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── package-lock.json
```

## 🚀 Running CampQuest Locally

### 📥 1. Download the Project

Download the CampQuest ZIP from GitHub and extract it.

Open the extracted folder in Visual Studio Code.

### 📦 2. Install Dependencies

Open the terminal in the CampQuest folder and run:

```bash
npm install
```

### ▶️ 3. Start CampQuest

```bash
npm run start
```

### 🌐 4. Open CampQuest

Go to:

```text
http://localhost:3000
```

> ⚠️ Make sure your `.env` file and MongoDB are configured before starting the application.

🔄 How CampQuest Works

CampQuest follows an MVC-style structure:

Browser
   ↓
Express Route
   ↓
Middleware
   ↓
Controller
   ↓
Mongoose Model
   ↓
MongoDB
   ↓
Controller
   ↓
EJS View
   ↓
Browser
Example

When a user opens the campgrounds page:

GET /campgrounds
        ↓
routes/campgrounds.js
        ↓
campgroundController.index
        ↓
campgroundModel.find({})
        ↓
MongoDB
        ↓
views/campgrounds/index.ejs
        ↓
Campgrounds displayed to the user
🗄️ Database

CampQuest uses MongoDB with Mongoose.

Main collections include:

🏕️ campgrounds

👤 users

⭐ reviews

Mongoose models define the structure and relationships between the application's data.

🔐 Authentication

CampQuest uses Passport.js and passport-local-mongoose for user authentication.

Authentication is used to protect actions such as:

Creating campgrounds

Editing campgrounds

Deleting campgrounds

Creating reviews

Deleting reviews

Authorisation middleware also prevents users from editing or deleting content belonging to another user.

---

## 📚 What I Learned

This project helped me practise:

- 🟢 Node.js and Express
- 🍃 MongoDB and Mongoose
- 📄 EJS templating
- 🏗️ MVC architecture
- 🔐 Authentication and authorisation
- ✅ Joi validation
- 📸 Image uploads
- 🛣️ Express routing
- 🧩 Middleware
- 🐛 Debugging and error handling
- 🎨 Frontend development with Bootstrap

---

## 🔐 Account & Environment Setup

Before running CampQuest, you need to create your own Cloudinary account and environment file.

### ☁️ 1. Create a Cloudinary Account

1. Go to Cloudinary and create a free account.

2. Log in to the Cloudinary Console.

3. Find your:
   - Cloud Name
   - API Key
   - API Secret
4. Keep these details private.

---

## 🔐 Environment Variables

Create a `.env` file in the main CampQuest folder and add:

```env
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_KEY=your_api_key
CLOUDINARY_SECRET=your_api_secret
SESSION_SECRET=your_session_secret


## 👨‍💻 Author

**Shaurya Parmar**



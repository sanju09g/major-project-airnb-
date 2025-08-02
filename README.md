🏕️ Wanderlust - Airbnb Clone

📌 Project Overview

Wanderlust is a full-stack hotel booking platform inspired by Airbnb. It allows users to browse listings, create their own, book stays, and post reviews. The project is built with Node.js, Express.js, and MongoDB, following the MVC architecture. User authentication and role-based authorization ensure a secure and seamless experience.

🚀 Features

- User Signup/Login with Passport.js (Local Strategy)

- Secure route access based on user roles

- Create, fetch, and manage:

🏡 Listings (Only by the listing owner)

⭐ Reviews (Only by the review author)

  
- Booking functionality

- Mongoose models for structured MongoDB storage

- RESTful APIs and server-side rendering with EJS

- Responsive design with Bootstrap 5 and custom CSS

- Image upload functionality with listings

🛠️ Technologies used

- Node.js
- Express.js
- MongoDB + Mongoose
- Passport.js (Authentication)
- EJS (Embedded JavaScript Templates)
- Bootstrap 5
- dotenv
- method-override
- connect-flash
- express-session
- node-cron
  

## 🌐 Live Demo  
👉 [Try it Live](https://major-project-airnb.onrender.com/listings)

## 📸 Screenshots

🔐 **Signup Page**  
![Signup](https://github.com/sanju09g/major-project-airnb-/raw/main/Screenshots/signup.png)

🏡 **Listings Page**  
![Home Page](https://github.com/sanju09g/major-project-airnb-/raw/main/Screenshots/home.png)

📝 **Show Listing Page**  
![Show Page](https://github.com/sanju09g/major-project-airnb-/raw/main/Screenshots/show.png)

⭐ **Review Section**  
![Review](https://github.com/sanju09g/major-project-airnb-/raw/main/Screenshots/review.png)

📁 View All Screenshots

📂 Project Structure
pgsql
Copy
Edit
Wanderlust/
│
├── models/
    ├── booking.js
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── init/
|   └── data.js
|   └── index.js
|  
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── views/
    ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── public/
|   |── rating.css
│   ├── CSS/
|   |     └── js
│   |        └── map.js
│   |        └── script.js
|   |── style.css

├── middleware/
│   └── authMiddleware.js
│
├── utils/
│   └── ExpressError.js
|    └── validateEmail.js
|    └── wrapAsync.js
|
│── crodRunner.js
├── error.js
├── middleware.js
├── app.js
├── cloudConfig.js
├── schema.js
├── package.json
├── package-lock.json
├── .gitignore
└── .env

👤 Author
Name: Sanjit Singh
GitHub: [@sanju09g](https://github.com/sanju09g/)
LinkedIn: [Sanjit Singh](https://www.linkedin.com/in/sanjitsingh004/)


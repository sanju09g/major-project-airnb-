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
  

🌐 Live Demo
👉 Try it Live ([Link](https://major-project-airnb.onrender.com/listings))

📸 Screenshots
🔐 Login Page
(Add Screenshot)

🏡 Listings Page
(Add Screenshot)

📝 Create Listing Page
(Add Screenshot)

⭐ Review Section
(Add Screenshot)

📁 View All Screenshots

📂 Project Structure
pgsql
Copy
Edit
Wanderlust/
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── controllers/
│   ├── listingController.js
│   ├── reviewController.js
│   └── userController.js
│
├── views/
│   ├── listings/
│   ├── reviews/
│   └── partials/
│
├── public/
│   ├── CSS/
│   └── images/
│
├── middleware/
│   └── authMiddleware.js
│
├── utils/
│   └── ExpressError.js
│
├── app.js
└── .env
🧑‍💻 Getting Started
Follow these steps to run the project locally:

1. Clone the repository
bash
Copy
Edit
git clone https://github.com/sanju09g/Wanderlust.git
cd Wanderlust
2. Install dependencies
bash
Copy
Edit
npm install
3. Create .env file in the root directory
env
Copy
Edit
DB_URL="your_mongodb_connection_string"
SECRET="your_secret_key"
4. Start the server
bash
Copy
Edit
node app.js
Then, open your browser and navigate to:

arduino
Copy
Edit
http://localhost:3000
👤 Author
Name: Sanjit Singh
GitHub: @sanju09g
LinkedIn: Sanjit Singh


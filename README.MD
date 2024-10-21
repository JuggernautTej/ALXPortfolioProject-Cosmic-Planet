
# Cosmic Planet - A Simple Blog Web App

![Cosmic Planet Logo](common/imgs/blog_logo2.jpeg)


Welcome to Cosmic Planet, a blog post web application designed for the space enthusiasts to curate their thoughts and ideas on what lies beyond Earth's atmosphere. easy and seamless shopping. Built with modern web technologies, this app offers a simple and easy way to create and manage blog posts with a touch of inspiration to spark the imagination of visitors.

## Table of Contents

-   Features
-   Tech Stack
-   Installation
-   Usage
-   Project Structure
-   Contributing

## Features


-   Responsive interface for mobile and desktop views
-   Search functionality
-   Paginated home page for blog post listings
-   Curator panel/dashboard to create, edit and delete posts
-   User authentication and access control to curator panel/dashboard
-   Slideshow section displaying latest imagery from NASA open API

## Tech Stack



-   Node.js
-   Express.js
-   Embedded JavaScript (EJS)
-   CSS
-   JavaScript
-   MongoDB
-   JSON Web Token (JWT)

## Installation



1.  Clone the repository:

		git clone https://github.com/JuggernautTej/ALXPortfolioProject-Cosmic-Planet.git

2.  Navigate to the project directory:

		cd ALXPortfolioProject-Cosmic-Planet

3. Initialize project:

		npm init -y

4.  Install the dependencies:

		npm i axios bcrypt connect-mongo cookie-parser dotenv ejs express express-ejs-layouts express-session jsonwebtoken method-override mongoose

5.  Install nodemon as a development tool for the project.:

		npm i nodemon --save-dev
6.  Add the app.js as the start script in the package.json ("start": "app.js") and ("dev": "nodemon app.js") for the development tool, if not already added.
7. Run the server

		npm run dev


## Usage

 

After running the development server, open your browser and navigate to:

http://localhost:5000  

You can now go through the web app, view web posts, sign in and manage posts.

## Project Structure



    ALXPortfolioProject-Cosmic-Planet/ 
    ├── common/ 
    │ ├── css/ 
    │ │ └── style.css 
    │ ├── imgs/ 
    │ │ └── logo1.png 
    │ │ └── logo2.png 
    │ └── js/
    │ │ └── universal.js 
    ├── server/ 
    │ ├── config/
    │ │ └── db.js 
    │ ├── helpers/ 
    │ │ └── routeHelpers.png 
    │ ├── routes/ 
    │ │ └── admin.js 
    │ │ └── main.js 
    │ └── tables/ 
    │ │ └── Post.js 
    │ │ └── Users.js 
    ├── views/ 
    │ ├── admin/ 
    │ │ └── add-post.ejs 
    │ │ └── dashboard.ejs 
    │ │ └── edit-post.ejs 
    │ │ └── login.ejs 
    │ ├── layouts/ 
    │ │ └── admin.ejs 
    │ │ └── main.ejs 
    │ ├── parts/ 
    │ │ └── adminHeader.ejs 
    │ │ └── header.ejs 
    │ │ └── footer.ejs 
    │ │ └── search.ejs 
    │ ├── index.ejs 
    │ ├── post.ejs 
    │ ├── search.ejs 
    │ └── about.ejs 
    ├── .env 
    ├── app.js 
    └── package.json
    └── README.md

## Contributing


Contributions are welcome! Please follow these steps to contribute:

1.  Fork the repository.
2.  Create a new branch (git checkout -b feature-name).
3.  Make your changes.
4.  Commit your changes (git commit -m 'Add new feature').
5.  Push to the branch (git push origin feature-name).
6.  Open a pull request.

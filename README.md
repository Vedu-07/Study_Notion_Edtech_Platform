# Introduction
StudyNotion aims to provide a seamless and interactive learning experience for students, making education more accessible and engaging. Additionally, the platform serves as a platform for instructors to showcase their expertise and connect with learners across the globe.

![Screenshot 2024-08-18 095003](https://github.com/user-attachments/assets/557c25d4-37de-4c96-921a-0596c1d6578b)

## System Architecture
The StudyNotion EdTech platform consists of three main components: the front-end, the back-end, and the database. The platform follows a client-server architecture, with the front-end serving as the client and the back-end and database serving as the server.

## Front-end
The front-end of the platform is built using ReactJS, which allows for the creation of dynamic and responsive user interfaces, crucial for providing an engaging learning experience to students. The front-end communicates with the back-end using RESTful API calls.

## Front End Pages
### For Students:

* Homepage: A brief introduction to the platform with links to the course list and user details.
* Course List: A list of all the courses available on the platform, along with their descriptions and ratings.
* Wishlist: Displays all the courses that a student has added to their wishlist.
* Cart Checkout: Allows the user to complete course purchases.
* Course Content: Presents the course content for a particular course, including videos and related material.
* User Details: Provides details about the student's account, including their name, email, and other relevant information.
* User Edit Details: Allows students to edit their account details.
  
For Instructors:

* Dashboard: Offers an overview of the instructor's courses, along with ratings and feedback for each course.
* Insights: Provides detailed insights into the instructor's courses, including the number of views, clicks, and other relevant metrics.
* Course Management Pages: Enables instructors to create, update, and delete courses, as well as manage course content and pricing.
* View and Edit Profile Details: Allows instructors to view and edit their account details.

## Front-end Tools and Libraries

To build the front-end, we use frameworks and libraries such as ReactJS, CSS, and Tailwind for styling, and Redux for state management.

## Back-end
The back-end of the platform is built using NodeJS and ExpressJS, providing APIs for the front-end to consume. These APIs include functionalities such as user authentication, course creation, and course consumption. The back-end also handles the logic for processing and storing the course content and user data.

### Back-end Features
* User Authentication and Authorization: Students and instructors can sign up and log in to the platform using their email addresses and passwords. The platform also supports OTP (One-Time Password) verification and forgot password functionality for added security.
* Course Management: Instructors can create, read, update, and delete courses, as well as manage course content and media. Students can view and rate courses.
* Payment Integration: Students will purchase and enroll in courses by completing the checkout flow, followed by Razorpay integration for payment handling.
* Cloud-based Media Management: StudyNotion uses Cloudinary, a cloud-based media management service, to store and manage all media content, including images, videos, and documents.
* Markdown Formatting: Course content in document format is stored in Markdown format, allowing for easier display and rendering on the front-end.
  
* Back-end Frameworks, Libraries, and Tools
The back-end of StudyNotion uses various frameworks, libraries, and tools to ensure its functionality and performance, including:

* Node.js: Used as the primary framework for the back-end.
* Express.js: Used as a web application framework, providing a range of features and tools for building web applications.
* MongoDB: Used as the primary database, providing a flexible and scalable data storage solution.
* JWT (JSON Web Tokens): Used for authentication and authorization, providing a secure and reliable way to manage user credentials.
* Bcrypt: Used for password hashing, adding an extra layer of security to user data.
* Mongoose: Used as an Object Data Modeling (ODM) library, providing a way to interact with MongoDB using JavaScript.
  
Data Models and Database Schema
The back-end of StudyNotion uses several data models and database schemas to manage data, including:

Student Schema: Includes fields such as name, email, password, and course details for each student.
Instructor Schema: Includes fields such as name, email, password, and course details for each instructor.
Course Schema: Includes fields such as course name, description, instructor details, and media content.

## Database
The database for the platform is built using MongoDB, a NoSQL database that provides a flexible and scalable data storage solution. MongoDB allows for the storage of unstructured and semi-structured data. The database stores the course content, user data, and other relevant information related to the platform.
## ER Diagram 

![Screenshot 2024-08-18 101002](https://github.com/user-attachments/assets/43565373-546b-40b1-8118-3b4760357f47)

## Architecture Diagram

![Screenshot 2024-08-18 100938](https://github.com/user-attachments/assets/0632ceaf-bfc6-4b3c-bcdf-3e0ef692c9b2)




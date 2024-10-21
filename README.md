
# Job-Board

This is a full-stack job board application built using the MERN stack (MongoDB, Express, React, Node.js). The application allows companies to post job posting and send notify candidates over email, It has features like OTP verification for registration, job notifications via email.

## Tech Stack

### Client
- **React**: JavaScript library for building user interfaces
- **Redux**: State management for React
- **Axios**: HTTP client for API requests
- **React Router**: For handling client-side routing

### Server
- **Node.js**: JavaScript runtime for the server-side
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **JSON Web Tokens (JWT)**: For user authentication and session management
- **Nodemailer**: For sending emails (e.g., verification, notifications)
- **Joi**: Validation library for request data

### Authentication
- **JWT (JSON Web Token)**: 
  - Implemented for secure user authentication. After login or registration, a JWT is issued to the user, which is then used to authenticate API requests and manage user sessions. This ensures stateless and secure communication between the client and server. In my case I am generating JWT token after verifying EMail OTP and rediercting user to dashboard to use the functionality of the Application.

### Verification Technologies
- **Email Verification**: 
  - Using **Nodemailer** for sending OTP to verify email addresses.
- **Mobile OTP Verification**:
  - Integrated with **MSG91** for mobile OTP verification.
  - Currently, mobile OTP functionality is limited due to the absence of a valid Template ID required by MSG91 for OTP services. The verification logic has been commented out, and only a success message is being sent for demonstration purposes.

**Note**: This project utilizes MSG91 for mobile OTP verification. I have implemented a helper function for mobile OTP verification via MSG91, but I am currently unable to use the full OTP verification functionality as I do not have a valid Template ID from MSG91. Since I do not possess a registered company or the necessary license to obtain the Template ID, the actual mobile OTP verification feature could not be fully integrated. As a workaround, the OTP verification logic has been commented out, and the system currently sends a default "OTP verified" success message for mobile OTPs. This is due to the lack of complete MSG91 credentials. I apologize for the inconvenience.
## Run Locally

### Clone the project

```bash
  git clone https://link-to-project
```
### Go to the project directory

```bash
  cd job-board-app
```
### Set up environment variables

#### Server
###### Create a .env file in the server directory:
```bash
  cd server
  touch .env
```
##### Add the following environment variables to the .env file:
```bash
  CLIENT_URL= http://localhost:3000
  JWT_SECRET= your_jwt_secret
  MONGO_URI= your_mongo_db_connection_string
  PORT= 5000
  SENDER_EMAIL= your_email_service_email
  SENDER_PASSWORD= your_email_service_password

```

###### Make sure to replace the values with your actual credentials.

#### Client
###### Create a .env file in the client directory:
```bash
  cd ../client
  touch .env
```
##### Add the following environment variables to the .env file:
```bash
  REACT_APP_API_URL=http://localhost:5000
```
###### Make sure to replace the values with your actual credentials.

### Install Dependency to Run the Project
##### Install Server Dependency
```bash
  cd server
  npm install
```
##### Install Client Dependency
```bash
  cd client
  npm install
```
### Run the Client and Server Both Individually
##### Run Client Server 
```bash
  cd client
  npm start
```
##### Run Server
```bash
  cd server
  npm run dev
```## Tech Stack

### Client
- **React**: JavaScript library for building user interfaces
- **Redux**: State management for React
- **Axios**: HTTP client for API requests
- **React Router**: For handling client-side routing

### Server
- **Node.js**: JavaScript runtime for the server-side
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing data
- **JSON Web Tokens (JWT)**: For user authentication and session management
- **Nodemailer**: For sending emails (e.g., verification, notifications)
- **Joi**: Validation library for request data

### Authentication
- **JWT (JSON Web Token)**: 
  - Implemented for secure user authentication. After login or registration, a JWT is issued to the user, which is then used to authenticate API requests and manage user sessions. This ensures stateless and secure communication between the client and server. In my case I am generating JWT token after verifying EMail OTP and rediercting user to dashboard to use the functionality of the Application.

### Verification Technologies
- **Email Verification**: 
  - Using **Nodemailer** for sending OTP to verify email addresses.
- **Mobile OTP Verification**:
  - Integrated with **MSG91** for mobile OTP verification.
  - Currently, mobile OTP functionality is limited due to the absence of a valid Template ID required by MSG91 for OTP services. The verification logic has been commented out, and only a success message is being sent for demonstration purposes.

**Note**: This project utilizes MSG91 for mobile OTP verification. I have implemented a helper function for mobile OTP verification via MSG91, but I am currently unable to use the full OTP verification functionality as I do not have a valid Template ID from MSG91. Since I do not possess a registered company or the necessary license to obtain the Template ID, the actual mobile OTP verification feature could not be fully integrated. As a workaround, the OTP verification logic has been commented out, and the system currently sends a default "OTP verified" success message for mobile OTPs. This is due to the lack of complete MSG91 credentials. I apologize for the inconvenience.

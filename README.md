# Financial Fortress 

This is a web application developed using Mean Stack that allows users to register, login, view their account balance, deposit or withdraw money, and view their transaction history.

## Installation

To use this application, you need to have Node.js and MongoDB installed on your machine.

1. Clone the repository to your local machine:

`https://github.com/sahil-github001/mean-financial-fortress.git`

2. Install the dependencies by running the following command in both the frontend and backend folders:

`npm install`

## Running the Application

To run the application, you need to start both the frontend and backend servers.

1. Start the backend server by running the following command in the backend folder:

`nodemon index.js`

2. Start the frontend server by running the following command in the frontend folder:

`ng serve`

3. Open your browser and navigate to http://localhost:4200 to access the application.

## Usage

### Register

To create a new account, click on the "Register" button on the login page and enter your account number, username, and password. If the account number is not already registered, a new user will be created and stored in the MongoDB database.

### Login

To log in to your account, enter your account number and password on the login page. If the account number exists and the password is correct, a token will be generated using JSON Web Token (JWT) and stored in local storage.

### Dashboard

After logging in, you will be redirected to the dashboard, where you can view your account balance and transaction history. You can also deposit or withdraw money by providing your account number, password, and the amount you want to deposit or withdraw. 

When a deposit or withdraw request is made, the backend verifies the JWT token as middleware to ensure that the user is authorized to make the request. If the token is valid, the requested transaction is completed and the account balance is updated. Otherwise, an error message is returned to the user.


## Acknowledgments

This application was developed as a learning project and is not intended for commercial use. It was built using Mean Stack (MongoDB, Express.js, Angular, and Node.js), and it utilizes JWT for authentication and authorization.
# final_mean

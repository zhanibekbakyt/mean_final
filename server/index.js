// Server Creation

// 1 import express
const express = require("express");
const dataService = require('./services/dataService');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// 2 Create an express app
const app = express();

//To get json file in javascript
app.use(express.json());

// give command to share data via cors
app.use(cors({
    origin:["http://localhost:4200", "http://127.0.0.1:8080"]
}))

// 3 Create port number
app.listen(3000,()=>{
    console.log('listenig on port 3000');
})
                                        
// Application specific middleware
const appMiddleware = (req, res, next)  => {
    console.log('Application specific middleware');
    next();
}
                                           
app.use(appMiddleware);
                        
//router specific middleware
const jwtRouterMiddleware = (req, res, next) => {
    try{
        console.log('Router specific middleware');
        const token = req.headers['x-access-token'];
        const data = jwt.verify(token, 'superkey2023');                 
        console.log(data);
        next();
    }
    catch{
        // 422 - unprocessable entity
        res.status(422).json({
            status:false,
            statusCode:422,               
            message:'please login'
        })
    }
}       


// Api call

// Register request
app.post('/register', (req, res) => {
    dataService.register(req.body.acno, req.body.username, req.body.password).then(
        result => {
        res.status(result.statusCode).json(result)
    })
})

// login request
app.post('/login', (req, res) => {
    dataService.login(req.body.acno, req.body.password).then(
        result => {
            res.status(result.statusCode).json(result);
        }
    ) 
})
     
// deposit request
app.post('/deposit',jwtRouterMiddleware, (req, res) => {
    dataService.deposit(req.body.acno, req.body.password, req.body.dAmt).then((result) => {
        res.status(result.statusCode).json(result);
    })
})

// withdraw request
app.post('/withdraw',jwtRouterMiddleware, (req, res) => {
    dataService.withdraw(req.body.acno, req.body.password, req.body.wAmt).then((result) => {
        res.status(result.statusCode).json(result);
    })
})

// transaction request
app.post('/transaction',jwtRouterMiddleware, (req, res) => {
    dataService.getTransaction(req.body.acno).then((result) => {
        res.status(result.statusCode).json(result);
    })
})

// delete request
app.delete('/deleteAcc/:acno', (req, res) => {
    dataService.deleteAcc(req.params.acno).then((result) => {
        res.status(result.statusCode).json(result);
    })
})

// get balance
app.post('/getBalance',(req, res) => {
    dataService.getBalance(req.body.acno).then((result) => {
        res.status(result.statusCode).json(result);
    })
})
     






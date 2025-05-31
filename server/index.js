const express = require("express");
const dataService = require('./services/dataService');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();

app.use(express.json());

app.use(cors({
    origin: ["https://mean-final-vdv9.vercel.app:4200", "https://mean-final-vdv9.vercel.app:8080"]
}));

app.listen(3000, () => {
    console.log('Listening on port 3000');
});

const appMiddleware = (req, res, next) => {
    console.log('Application specific middleware');
    next();
};

app.use(appMiddleware);

const jwtRouterMiddleware = (req, res, next) => {
    try {
        console.log('Router specific middleware');
        const token = req.headers['x-access-token'];
        if (!token) {
            return res.status(401).json({
                status: false,
                statusCode: 401,
                message: 'Access denied. No token provided.'
            });
        }
        const decodedData = jwt.verify(token, 'superkey2023');
        req.user = decodedData; 
        next();
    } catch (error) {
        return res.status(422).json({
            status: false,
            statusCode: 422,
            message: 'Please login'
        });
    }
};

app.post('/register', (req, res) => {
    dataService.register(req.body.acno, req.body.username, req.body.password).then(
        result => {
            res.status(result.statusCode).json(result);
        }
    );
});

app.post('/login', (req, res) => {
    dataService.login(req.body.acno, req.body.password).then(
        result => {
            res.status(result.statusCode).json(result);
        }
    );
});

app.get('/dashboard', jwtRouterMiddleware, (req, res) => {
    res.json({
        status: true,
        statusCode: 200,
        message: 'Welcome to your dashboard',
        data: {
            username: req.user.username,
            accountDetails: "Confidential account info here"
        }
    });
});

app.post('/deposit', jwtRouterMiddleware, (req, res) => {
    dataService.deposit(req.body.acno, req.body.password, req.body.dAmt).then(result => {
        res.status(result.statusCode).json(result);
    });
});

app.post('/withdraw', jwtRouterMiddleware, (req, res) => {
    dataService.withdraw(req.body.acno, req.body.password, req.body.wAmt).then(result => {
        res.status(result.statusCode).json(result);
    });
});

app.post('/transaction', jwtRouterMiddleware, (req, res) => {
    dataService.getTransaction(req.body.acno).then(result => {
        res.status(result.statusCode).json(result);
    });
});

app.delete('/deleteAcc/:acno', (req, res) => {
    dataService.deleteAcc(req.params.acno).then(result => {
        res.status(result.statusCode).json(result);
    });
});

app.post('/getBalance', (req, res) => {
    dataService.getBalance(req.body.acno).then(result => {
        res.status(result.statusCode).json(result);
    });
});

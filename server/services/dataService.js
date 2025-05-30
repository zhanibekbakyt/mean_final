const { json } = require("express")
const jwt = require('jsonwebtoken');

const db = require("./db");

userDetails = {
  1000: { acno: 1000, username: 'Amal', password: 1000, balance: 2000, transaction: [] },
  1001: { acno: 1001, username: 'Arun', password: 1001, balance: 2000, transaction: [] },
  1002: { acno: 1002, username: 'Akshay', password: 1002, balance: 2000, transaction: [] }
}

const register = (acno, username, password) => {
  return db.User.findOne({ acno }).then((user) => {
    if (user) {
      return {
        status: false,
        statusCode: 401,
        message: "User already registered"
      }
    }
    else {
      const newUser = new db.User({
        acno: acno,
        username: username,
        password: password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        status: true,
        statusCode: 200,
        message: "Register successfull"
      }
    }
  })
}


const login = (acno, password) => {
  return db.User.findOne({ acno, password }).then(
    user => {
      if (user) {
        const token = jwt.sign({ currenAcno: acno }, 'superkey2023');
        return {
          status: true,
          statusCode: 200,
          message: 'login successfull',
          token: token,
          currentUser: user.username,
          currentAcno: acno
        }
      } else {
        return {
          status: false,
          statusCode: 401,
          message: 'invalid userdetails'
        }
      }
    }
  )

  if (acno in userDetails) {
    if (password == userDetails[acno].password) {
      currentUser = userDetails[acno].username;
      currenAcno = acno;
      const token = jwt.sign({ currenAcno: acno }, 'superkey2023');
      return {
        status: true,
        statusCode: 200,
        message: 'login successfull',
        token: token
      }
    } else {
      return {
        status: false,
        statusCode: 401,
        message: 'wrong password'
      }
    }
  } else {
    return {
      status: false,
      statusCode: 401,
      message: 'Invalid user'
    }
  }
}

const deposit = (acno, password, dAmt) => {

  return db.User.findOne({ acno, password }).then((user) => {
    if (user) {
      if (password == user.password) {
        dAmt = parseInt(dAmt);
        user.balance += dAmt;

        user.transaction.push({
          type: 'Credit',
          amount: dAmt
        })
        user.save();
        return {
          status: true,
          statusCode: 200,
          message: `${dAmt} is credited to account ${acno} and balance is ${user.balance}`
        }
      } else {
        return {
          status: false,
          statusCode: 401,
          message: 'Invalid password'
        }
      }
    } else {
      return {
        status: false,
        statusCode: 401,
        message: 'Invalid user'
      }
    }
  })

  if (acno in userDetails) {
    if (password == userDetails[acno].password) {
      dAmt = parseInt(dAmt);
      userDetails[acno].balance += dAmt;

      userDetails[acno]['transaction'].push({
        type: 'Credit',
        amount: dAmt
      })
      return {
        status: true,
        statusCode: 200,
        message: `${dAmt} is credited to account ${acno} and balance is ${userDetails[acno].balance}`
      }
    } else {
      return {
        status: false,
        statusCode: 401,
        message: 'Invalid password'
      }
    }
  } else {
    return {
      status: false,
      statusCode: 401,
      message: 'Invalid user'
    }
  }
}

const withdraw = (acno, password, wAmt) => {

  return db.User.findOne({ acno, password }).then((user) => {
    if (user) {
      if (password == user.password) {
        if (user.balance > wAmt) {
          user.balance -= wAmt;

          user.transaction.push({
            type: 'Debit',
            amount: wAmt
          })
          user.save();

          return {
            status: true,
            statusCode: 200,
            message: `${wAmt} is debited to account ${acno} and balance is ${user.balance}`
          }
        } else {
          return {
            status: false,
            statusCode: 401,
            message: 'Insufficient balance'
          }
        }
      } else {
        return {
          status: false,
          statusCode: 401,
          message: 'Invalid password'
        }
      }
    } else {
      return {
        status: false,
        statusCode: 401,
        message: 'Invalid user'
      }
    }
  })

  const acno1 = acno;
  const pswd1 = password;
  if (acno1 in userDetails) {
    if (pswd1 == userDetails[acno1].password) {
      wAmt = parseInt(wAmt);
      if (userDetails[acno1].balance > wAmt) {
        userDetails[acno1].balance -= wAmt;

        userDetails[acno1]['transaction'].push({
          type: 'Debit',
          amount: wAmt
        })
        return {
          status: true,
          statusCode: 200,
          message: `${wAmt} is debited to account ${acno} and balance is ${userDetails[acno1].balance}`
        }
      } else {
        return {
          status: false,
          statusCode: 401,
          message: 'Insufficient balance'
        }
      }
    } else {
      return {
        status: false,
        statusCode: 401,
        message: 'Invalid password'
      }
    }
  } else {
    return {
      status: false,
      statusCode: 401,
      message: 'Invalid user'
    }
  }
}

const getTransaction = (acno) => {
  return db.User.findOne({ acno }).then((user) => {
    if (user) {
      return {
        status: true,
        statusCode: 200,
        transaction: user.transaction
      }
    } else {
      return {
        status: false,
        statusCode: 401,
        message: 'Invalid user'
      }
    }
  })

  if (acno in userDetails) {
    return {
      status: true,
      statusCode: 200,
      transaction: userDetails[acno].transaction
    }
  } else {
    return {
      status: false,
      statusCode: 401,
      message: 'Invalid user'
    }
  }
}

const deleteAcc = (acno) => {
  return db.User.findOneAndDelete({ acno }).then(
    (user) => {
      if (user) {
        return {
          status: true,
          statusCode: 200,
          message: 'Account Deleted'
        }
      } else {
        return {
          status: false,
          statusCode: 401,
          message: 'failed'
        }
      }
    }
  )
}

const getBalance = (acno) => {
  return db.User.findOne({ acno }).then(
    (result) => {
      if (result) {
        return {
          status: true,
          statusCode: 200,
          balance: result.balance
        }
      }
      else {
        return {
          status: false,
          statusCode: 401,
          message: 'user not found'
        }
      }
    }
  )
}

module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction,
  deleteAcc,
  getBalance
}
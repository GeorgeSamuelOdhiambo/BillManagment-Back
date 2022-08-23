const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = (req, res, next) => {
  const token = req.cookies.TOLOINUS;

  if (!token) {
    console.log('token not found');
    return res.status(500).json({ error: 'user unauthorized' })
  } else {
    try {
      const data = jwt.verify(token, process.env.SECREAT);
      req.userId = data.userId;
      req.userRole = data.email;
      return next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error })
    }
  }
  //{// const authHeader = req.get('Authorization');
  // if (!authHeader) {
  //   const error = new Error('Not authenticated.');
  //   error.statusCode = 401;
  //   throw error;
  // }
  //   const token = authHeader.split(' ')[1];
  //   let decodedToken;
  //   try {
  //       decodedToken = jwt.verify(token,process.env.SECREAT)
  //   } catch (err) {
  //       err.statuseCode = 500;
  //       throw err;
  //   }

  //   if (!decodedToken){
  //       const error = new Error('Empty token');
  //       error.statuseCode = 401;
  //       throw error;
  //   }

  //   req.userId = decodedToken.userId;
  // next();}
};

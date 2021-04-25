// import jwt from "jsonwebtoken";


// const auth = async (req, res, next) => {
//     try {

//         const token = req.headers.authorization.split("")[1];

//         // if token is less then then it is our token else it is google
//         const isCustomAuth = token.length < 500;

//         let decodeData;

//         if(token && isCustomAuth) {
//             decodeData = jwt.verify(token, 'test');
//         //    after verifying user we save id of user into req.userId
//             req.userId = jwt.decodeData?.id;
//         } else {

//             // this is for google auth
//             decodeData = jwt.decode(token);

//             // defrenciate the google user
//             req.userId = decodeData?.sub();
//         }
        
//         // next() is the function that allow user to do next if user passed the middleware mean correct user
//         // authenticated user then he have right to LIKE,DELETE,UPDATE,CREATE  post
//         next();
//     } catch (error) {
//         console.log(error);
        
//     }

// };

// export default auth;


import jwt from "jsonwebtoken";

const secret = 'test';

const auth = async (req, res, next) => {
 
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    

    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
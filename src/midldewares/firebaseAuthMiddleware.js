import {unauthorizedMessages} from '../utils/responseMessage.js'
import {firebaseApp} from "../config/firebase.js";

const firebaseAuthMiddleware = async (req, res, next) => {
  let token = req.headers.authorization
  token = token.split('Bearer ')[1];


  if (!token) {
    return res.status(401).json({
      status: 401,
      message: unauthorizedMessages.missingToken
    })
  }

  firebaseApp
      .auth()
      .verifyIdToken(token)
      .then((decodedToken) => {
        req.auth = decodedToken
        req.uid = decodedToken.uid
        next()
      })
      .catch(() => {
        return res.status(401).json({
          status: 401,
          message: unauthorizedMessages.tokenInvalid
        })
      })
}

export default firebaseAuthMiddleware

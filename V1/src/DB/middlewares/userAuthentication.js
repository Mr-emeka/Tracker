import jwt from 'jsonwebtoken';
import pool from '../models/db';
import dotenv from 'dotenv';
dotenv.config();



const userAuththentication = {
  /**
   * verify token 
   * @params {object} req
   * @params {object} res
   * @params {object} next
   * @return {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(404).json({
        'code': 404,
        'message': 'Token is not provided'
      });
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_KEY);
      // const text = 'SELECT * FROM users where id=$1';
      // const {
      //   rows
      // } = await pool.query(text, [decoded.userID]);
      // if (!rows[0]) {
      //   return res.status(400).json({
      //     "status": "fail",
      //     'message': 'The token you provided is invalid'
      //   });
      // }
      // console.log(decoded.userID);
      if (decoded.admin === true) {
        return res.status(401).json({
          "code": 401,
        })
      }
      if (decoded.userID) {
        req.user = {
          id: decoded.userID
        }
        return next();
      }
    } catch (e) {
      return res.status(400).json({
        'code': 400,
        'status': 'fail',
        "message": "Invalid authorization token"
      });
    }

  }
}

export default userAuththentication;
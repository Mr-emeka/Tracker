import jwt from 'jsonwebtoken';
import pool from '../models/db';
import dotenv from 'dotenv';

dotenv.config();
const adminAuthentication = {
  /**
   * verify token 
   * @params {object} req
   * @params {object} res
   * @params {object} next
   * @return {object|void} response object
   */

  async verifyAdmin(req, res, next) {
    let decoded = ''
    try {
      const token = req.headers['x-access-token'];
      decoded = jwt.verify(token, process.env.JWT_KEY);
      if (!token) {
        return res.status(404).json({
          "code": 404,
          "message": "page not found",
          "status": "fail"

        })
      }
      if (decoded.admin) {
        return next();
      } else {
        return res.status(401)
          .json({
            "status": 'fail',
            "code": 401,
            "message": 'Invalid authorization token',
          });
      }
    } catch (error) {
      return res.status(401)
        .json({
          "status": 'fail',
          "code": 401,
          "message": 'Invalid authorization token',
        });
    }
  }
}
export default adminAuthentication;
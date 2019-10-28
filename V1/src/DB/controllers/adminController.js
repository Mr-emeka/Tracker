import pool from '../models/db';

import Helper from '../helpers/helpers';


class authController {
  /**
   * create a user
   * @params {object} req
   * @params {object} res
   * @returns {object} user object
   */
  static async create(req, res) {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password) {
      return res.status(400).json({
        'message': 'some values are missing'
      });
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        'message': 'please enter a valid email'
      })
    }
    const hashPassword = Helper.hashPassword(req.body.password);
    const createQuery = `INSERT INTO users(firstname,lastname,email,password) VALUES($1,$2,$3,$4) returning *`;
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.email,
      hashPassword
    ];
    try {
      const {
        rows
      } = await pool.query(createQuery, values);
      const token = Helper.generateToken(rows[0].id, rows[0].admin);
      return res.status(200).json({
        "status": "success",
        'data': rows[0],
        token,
        "message": "User sign up successful"
      });
    } catch (e) {
      if (err.routine == '_bt_check_unique') {
        return res.status(400).json({
          "code":400,
          "status": "fail",
          "message": 'User With Email already exists'
        });
      }
    }
  }
  /**
   * login
   * @param {object} req 
   * @param {objec} res 
   * @returns {object} user object
   */
  static async login(req, res) {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        'message': 'some values are missing'
      })
    }
    if (!Helper.isValidEmail(req.body.email)) {
      return res.status(400).json({
        'message': 'please enter a valid email address'
      });
    }
    const text = 'SELECT * FROM users WHERE email= $1';
    try {
      const {
        rows
      } = await pool.query(text, [req.body.email]);
      if (!rows[0]) {
        return res.status(400).json({
          'message': 'The credentials you provided is incorrect'
        })
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        return res.status(400).json({
          'message': 'The credentials you provided is incorrect'
        })
      }
      const token = Helper.generateToken(rows[0].id, rows[0].admin);
      return res.status(200).json({
        "status": "success",
        token,
        "message": "user login successful"
      });
    } catch (e) {
      return res.status(400).json({
        "code":400,
        "status": "fail",
        "message": "User login failed, incorrect email or password"
      })
    }
  }
  /**
   * Delete A User
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 200 
   */
  static async delete(req, res) {
    const deleteQuery = 'DELETE FROM users WHERE id=$1 returning *';
    try {
      const {
        rows
      } = await pool.query(deleteQuery, [req.user.id]);
      return res.status(200).json({
        "code":200,
        "message": "deleted user successfully"
      });
    } catch (error) {
      return res.status(400).json({
        "code":400,
        "status":"fail"
      });
    }
  }
}

export default authController;
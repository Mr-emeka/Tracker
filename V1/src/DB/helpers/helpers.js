import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const Helper = {
  /**
   *hash password method
   *@params {string} password  
   *@returns {string} returns hashed password
   */
  hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  },
  /**
   * compare password
   * @params {string} hashPassword
   * @params {string} password
   * @returns {Boolean} true or false 
   */
  comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  },
  /**
   * isValidEmail Helper method
   * @param {string} email
   * @retuns {Boolean} true or false
   */
  isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  },
  /**
   * generate Token Method
   * @params {string} id
   * @returns {string} token
   */
  generateToken(id, admin) {
    const token = jwt.sign({
        userID: id,
        admin
      },
      process.env.JWT_KEY
    );
    return token;
  }
}

export default Helper;
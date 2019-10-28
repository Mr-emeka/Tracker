import moment from 'moment';
import uuid from 'uuid';

class user {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.users = [];
  }
  /**
   * 
   * @returns {object} user object
   */
  create(data) {

    const newUser = {
      id: uuid.v4(),
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      admin: false,
      createdDate: moment.now()
    };
    this.users.push(newUser);
    return newUser
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} user object
   */
  findOne(data) {
    return this.users.find(user => user.email === data.email && user.password === data.password);
  }
  findEmail(data) {
    this.users.find(user => {
      if (user.email === data.email) {
        return true;
      }
    });
  }
}
export default new user();
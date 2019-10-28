import userModel from '../models/user';

const authController = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object 
   * 
   */
  signup(req, res) {
    if (req.body.password.length < 5) {
      return res.status(400).send({
        'message': 'weak password try something greater than 5'
      });
    }
    if (userModel.findEmail === true) {
      return res.status(400).send({
        'message': 'user with email already exist'
      })
    }
    if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
      return res.status(400).send({
        'message': 'All fields are required'
      })
    }
    const user = userModel.create(req.body);
    return res.status(201).send({
      user,
      message: "successfull"
    });
  },

  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} user object
   */
  login(req, res) {
    const {
      email,
      password
    } = req.body;
    const user = userModel.findOne({
      email,
      password
    });
    if (!user) {
      return res.status(404).send({
        'message': 'user not found'
      });
    }
    return res.status(200).send(user);

  }
}

export default authController;
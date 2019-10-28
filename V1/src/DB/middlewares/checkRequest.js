import pool from '../models/db';

class checkRequest {

  /**
   * Checks if the request exists on the system and is still pending
   *
   * @param {object} req - The request object received
   * @param {object} res - The response object sent
   * @param {object} next - The next middleware
   */
  static async requestCheckPending(req, res, next) {
    const {
      requestId
    } = req.params;
    try {
      const queryString = 'SELECT * FROM requests WHERE id = $1 LIMIT 1;';
      const values = [requestId]

      const {
        rows
      } = await pool.query(queryString, values);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'Request does not exist'
        });
      }
      if (rows[0].status === 'pending') {
        return next();
      }
      return res.status(400)
        .send({
          message: 'Request can no longer be approved or disapproved',
        });
    } catch (err) {
      return res.status(400)
        .send(err);
    }
  };


  /**
   * Checks if the request exists on the system and is approved
   *
   * @param {object} req - The request object received
   * @param {object} res - The response object sent
   * @param {object} next - The next middleware
   */
  static async requestCheckApprove(req, res, next) {
    const {
      requestId
    } = req.params;
    try {
      const queryString = 'SELECT * FROM requests WHERE id = $1 LIMIT 1';
      const values = [requestId];
      const {
        rows
      } = await pool.query(queryString, values);
      if (!rows[0]) {
        return res.status(400).send({
          message: 'Request does not exist'
        });
      }
      if (rows[0].status === 'approved') {
        return next();
      }
      return res.status(400)
        .send({
          'message': 'You can only resolve an approved request',
        });
    } catch (err) {
      console.log(err);
    }
  }

}

export default checkRequest;
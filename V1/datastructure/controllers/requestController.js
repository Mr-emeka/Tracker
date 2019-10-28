import RequestModel from '../models/request';

const requestController = {
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} request object 
   * 
   */
  create(req, res) {
    if (!req.body.title || !req.body.type || !req.body.description) {
      return res.status(400).send({
        'message': 'All fields are required'
      })
    }
    const request = RequestModel.create(req.body);
    return res.status(201).send({
      request,
      'message': 'successfull'
    });
  },

  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} request array
   */
  getAll(req, res) {
    const requests = RequestModel.findAll();
    return res.status(200).send(requests);
  },
  /**
   * 
   * @param {object} req 
   * @param {object} res
   * @returns {object} request object
   */
  getOne(req, res) {
    const request = RequestModel.findOne(req.params.id);
    if (!request) {
      return res.status(404).send({
        'message': 'request not found'
      });
    }
    return res.status(200).send(request);

  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated request
   */
  update(req, res) {

    const request = RequestModel.findOne(req.params.id);
    if (!request) {
      return res.status(404).send({
        'message': 'request not found'
      });
    }
    const updatedRequest = RequestModel.update(req.params.id, req.body);
    return res.status(200).send(updatedRequest);

  },
  /**
   * 
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return status code 204 
   */
  delete(req, res) {
    const request = RequestModel.findOne(req.params.id);
    if (!request) {
      return res.status(404).send({
        'message': 'reflection not found'
      });
    }
    const ref = RequestModel.delete(req.params.id);
    return res.status(204).send(ref);
  }
}


export default requestController;
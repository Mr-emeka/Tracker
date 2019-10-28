import moment from 'moment';
import uuid from 'uuid';
class request {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.requests = [];
  }
  /**
   * 
   * @returns {object} request object
   */
  create(body) {
    // console.log(body);
    const newRequest = {
      id: uuid.v4(),
      title: body.title,
      type: body.type,
      description: body.description,
      createdDate: moment.now(),
      modifiedDate: moment.now()
    };
    this.requests.push(newRequest);
    return newRequest;
  }
  /**
   * 
   * @param {uuid} id
   * @returns {object} request object
   */
  findOne(id) {
    return this.requests.find(request => request.id === id);
  }
  /**
   * @returns {object} returns all requests
   */
  findAll() {
    return this.requests;
  }
  /**
   * 
   * @param {uuid} id
   * @param {object} data 
   */
  update(id, data) {
    const request = this.findOne(id);
    const index = this.requests.indexOf(request);
    this.requests[index].title = data['title'] || request.title;
    this.requests[index].type = data['type'] || request.type;
    this.requests[index].description = data['description'] || request.description;
    this.requests[index].modifiedDate = moment.now;
    this.requests[index].createdDate = moment.now;
    return this.requests[index];
  }
  /**
   * 
   * @param {uuid} id 
   */
  delete(id) {
    const request = this.findOne(id);
    const index = this.requests.indexOf(request);
    this.requests.splice(index, 1);
    return {};
  }
}
export default new request();
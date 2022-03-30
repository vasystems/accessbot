const axios = require('axios').default;
const VAMSYS_API_KEY = require('./../../config/vamsys');

class VamsysUser {
  #firstName;
  #lastName;
  #pilotId;

  constructor(response) {
    this.#firstName = response.first_name;
    this.#lastName = response.last_name;
    this.#pilotId = response.username;
  }

  get exists() {
    return this.#pilotId != null;
  }

  get possibleNames() {
    return [
      this.#firstName.toLowerCase(),
      `${this.#firstName} ${this.#lastName[0]}`.toLowerCase(),
      `${this.#firstName} ${this.#lastName}`.toLowerCase()
    ]
  }

  doesNameMatch(nameToCompare) {
    return this.possibleNames.indexOf(nameToCompare.toLowerCase()) !== -1;
  }

  static async fromPilotId(pilotId) {
    return axios.post('https://vamsys.io/api/bot', { api_key: VAMSYS_API_KEY, username: pilotId })
    .then(response => {
      return new VamsysUser(response.data);
    })
    .catch(error => {
      if (error.response.status === 401) return new VamsysUser({});
      console.log(error);
    })
  }
}

module.exports = VamsysUser;

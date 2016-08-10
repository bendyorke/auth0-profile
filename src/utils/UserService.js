export default class UserService {
  constructor(apiKey, domain) {
    this.key = apiKey
    this.domain = domain
  }

  fetch(url, options = {}) {
    return fetch('https://' + this.domain + '.auth0.com/api/v2' + url, {
      method: 'GET',
      ...options,
      headers: {
        ...options.headers,
        'Authorization': 'Bearer ' + this.key
      }
    })

  }
}

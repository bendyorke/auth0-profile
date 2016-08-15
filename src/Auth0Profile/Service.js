const USER_ATTRS = [
  'blocked',
  'email_verified',
  'email',
  'verify_email',
  'password',
  'phone_number',
  'phone_verified',
  'verify_password',
  'user_metadata',
  'app_metadata',
  'username',
  'connection',
  'client_id'
]

export default class Auth0ProfileService {
  constructor(jwt, domain) {
    this.jwt = jwt
    this.domain = domain
    this.url = `https://${this.domain}/api/v2`
  }

  buildInit(init) {
    const { headers = {}, ...overrides } = init

    return {
      method: 'GET',
      headers: { 'Authorization': 'Bearer ' + this.jwt, ...headers },
      ...overrides,
    }
  }

  parseJSON(res) {
    if (res.ok) return res.json()
    throw new Error(res.statusText)
  }

  fetch(path, init = {}) {
    return fetch(this.url + path, this.buildInit(init)).then(this.parseJSON)
  }

  userParams(user = {}) {
    return USER_ATTRS.reduce((coll, attr) => (
      user.hasOwnProperty(attr) ? {...coll, [attr]: user[attr]} : coll
    ), {})
  }

  getUser(id) {
    return this.fetch('/users/' + id)
  }

  updateUser(id, user) {
    return this.fetch('/users/' + id, {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.userParams(user))
    })
  }
}

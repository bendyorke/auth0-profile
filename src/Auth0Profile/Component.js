import React, { Component, PropTypes as T } from 'react'
import Auth0ProfileService from './Service.js'
import Auth0ProfileField from './Field.js'
import styles from './styles.module.css'

const DEFAULT = Symbol('clean')
const PENDING = Symbol('pending')
const SUCCESS = Symbol('success')
const FAILURE = Symbol('error')

export default class Auth0ProfileComponent extends Component {
  state = {
    profile: {},
    status: DEFAULT,
  }

  static propTypes = {
    userId: T.string.isRequired,
    api: T.instanceOf(Auth0ProfileService),
    form: T.object,
  }

  constructor(props, context) {
    super(props, context)
    this.refresh()
  }

  /**
   * Fetch new profile data from the server and update state.profile
   * with the return value.
   */
  refresh() {
    const { userId, api } = this.props

    api.getUser(userId).then(json => {
      this.setState({profile: json})
    })
  }

  /**
   * Provided an array of accessors, walk an object and update the final value.
   * If no object is provided, it will default to the profile.
   *
   * @param   [String]  [key, ...path] - an array of keys specifying the location
   * @param   Any       val            - value to set at the location
   * @param   coll      Object         - object on which to set the value
   * @return  Object
   */
  update = ([key, ...path], val, coll = this.state.profile) => {
    coll[key] = path.length ? this.update(path, val, coll[key]) : val
    return coll
  }

  /**
   * Restrict profile to attributes specified by the fields key in the form config
   */
  userParams() {
    const { profile } = this.state
    const { form } = this.props
    const keys = form
      .fields
      .reduce((a, b) => a.concat(b.name || b.names), [])
      .map(a => a.split('.')[0])

    return keys.reduce((coll, attr) => (
      profile.hasOwnProperty(attr) ? {...coll, [attr]: profile[attr]} : coll
    ), {})
  }

  handleChange = (name, val) => {
    this.setState({
      profile: this.update(name.split('.'), val),
      status: DEFAULT
    })
  }

  handleSubmit = () => {
    const { userId, api } = this.props

    this.setState({status: PENDING, error: null})
    api.updateUser(userId, this.userParams()).then(
      _ => this.setState({status: SUCCESS}),
      e => this.setState({status: FAILURE, error: e})
    )
  }

  render() {
    const { title, subtitle, fields } = this.props.form
    const { status, profile, error } = this.state

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          {title && <h1>{title}</h1>}
          {subtitle && <p>{subtitle}</p>}
        </div>


        <div className={styles.form}>
          {error &&
            <div className={styles.error}>{error.message}</div>
          }

          {fields.map((field, i) => (
            field.display !== false &&
              <Auth0ProfileField
                {...field}
                onChange={this.handleChange}
                profile={profile}
                key={i}
              />
          ))}
        </div>

        <div className={styles.footer} onClick={this.handleSubmit}>
          {status === DEFAULT && 'Submit'}
          {status === PENDING && 'Submitting'}
          {status === SUCCESS && 'Submitted'}
          {status === FAILURE && 'Error'}
        </div>
      </div>
    )
  }
}

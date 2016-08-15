import React, { PropTypes as T } from 'react'
import {Link} from 'react-router'
import {ButtonToolbar, Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'

export class Login extends React.Component {
  state = {
    loggedIn: false,
  }

  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state.loggedIn = props.auth.loggedIn()
  }

  componentDidMount() {
    this.props.auth.lock.on('authenticated', () => {
      this.setState({loggedIn: true})
    })
  }

  render() {
    const { auth } = this.props
    return (
      <div className={styles.root}>
        <h2>Login</h2>
        <ButtonToolbar className={styles.toolbar}>
          {this.state.loggedIn
           ? <Button><Link to="/home">Home</Link></Button>
           : <Button bsStyle="primary" onClick={auth.login.bind(this)}>Login</Button>
          }
        </ButtonToolbar>
      </div>
    )
  }
}

export default Login;

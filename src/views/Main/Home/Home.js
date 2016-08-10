import React, { PropTypes as T } from 'react'
import {Button} from 'react-bootstrap'
import AuthService from 'utils/AuthService'
import styles from './styles.module.css'
import UserService from 'utils/UserService'

const us = new UserService('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJHeEhUb1pJWkx4NE1LWnFiWW5CZ1dBYUlsYVZma2swcSIsInNjb3BlcyI6eyJ1c2VycyI6eyJhY3Rpb25zIjpbInJlYWQiLCJ1cGRhdGUiXX19LCJpYXQiOjE0NzA3NzE3NzAsImp0aSI6IjRjMWEyYzRjNjQ0MTY0Nzc4YTM2NWIxZTIxNTc1NGMxIn0.oyDHQvPT0KhPtD45dSJiy1LzfXwEgM4ZctrmbPaKm_A', 'bendyorke')

us.fetch('/users').then(res => res.json()).then(data => console.log(data))

export class Home extends React.Component {
  static contextTypes = {
    router: T.object
  }

  static propTypes = {
    auth: T.instanceOf(AuthService)
  }

  constructor(props, context) {
    super(props, context)
    this.state = {
      profile: props.auth.getProfile()
    }
    props.auth.on('profile_updated', (newProfile) => {
      this.setState({profile: newProfile})
    })
  }

  logout(){
    this.props.auth.logout()
    this.context.router.push('/login');
  }

  render(){
    const { profile } = this.state

    us.fetch('/users/' + profile.user_id)
      .then(res => res.json())
      .then(data => console.log(data))

    return (
      <div className={styles.root}>
        <h2>Home</h2>
        <p>Welcome {profile.name}!</p>
        <Button onClick={this.logout.bind(this)}>Logout</Button>
      </div>
    )
  }
}

export default Home;

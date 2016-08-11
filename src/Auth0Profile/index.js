import React from 'react'
import ReactDOM from 'react-dom'
import Auth0ProfileService from './Service.js'
import Auth0ProfileComponent from './Component.js'

const DEFAULT_FORM = {
  title: 'Name and Details',
  subtitle: 'Tell people a little bit about who you are.',
  fields: [
    {name: ['user_metadata.first_name', 'user_metadata.last_name'], label: 'First/Last Names', hint: 'Available publicly, but not shown on your profile'},
    {name: 'user_metadata.full_name', label: 'Full Name', hint: 'Available publicly, but not shown on your profile'},
    {name: 'user_metadata.display_name', label: 'Display Name', hint: 'Displayed on your profile and in other places as your name'},
    {name: 'user_metadata.location', label: 'Location', hint: 'Where in the world are you?'},
    {name: 'user_metadata.about_me', label: 'About Me', hint: 'Tell people a little about yourself'}
  ]
}

export default class Auth0Profile {
  constructor(jwt, domain, customForm = {}) {
    this.api = new Auth0ProfileService(jwt, domain)
    this.form = {...DEFAULT_FORM, customForm}
  }

  createElement(props) {
    return <Auth0ProfileComponent form={this.form} api={this.api} {...props}/>
  }

  render(userId, el) {
    return ReactDOM.render(this.createElement({userId}), document.querySelector(el))
  }
}

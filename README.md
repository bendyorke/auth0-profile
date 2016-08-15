## Development

To run the development server, first run `npm install`, then `npm start`.  The project will run on `127.0.0.1:3000`

## Instantiating a Profile Widget

```
var Profile = new Auth0Profile(jwt, domain[, fields])
```

Instantiating a new Profile Widget accepts 3 parameters:

- token: Either an ID Token, provided upon login, or a JSON Web Token for Auth0's v2 Management API.  ID Tokens are strongly recommended, as JSON Web Token's should not be accessible to clients.
- domain: Domain to make Auth0 api calls against (e.g. {tenant}.auth0.com).
- formConfig (optional) : Configuration object for the form. Currently accepts `title`, `subtitle`, and `fields`. `fields` is an array containing keys `name`, `label`, `hint`, `placeholder`, and `display`.

The formConfig for the sample is as follows:

```
{
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
```

## Rendering a Profile Widget

```
Profile.render(userId, elementSelector)
```

Rendering a Profile Widget can be done by calling the render method, which accepts 2 parameters:
- userId: a vaid Auth0 userId belonging to the provided domain
- elementSelector: CSS selector respresenting the container in which to render the widget

```
Profile.createElement({userId, ...props})
```

Creates and returns a React element for the Profile Widget. `userId` is the only required prop.

## Instantiating a Profile Widget

```
var Profile = new Auth0Profile(jwt, domain[, fields])
```

Instantiating a new Profile Widget accepts 3 parameters:

- jwt: A JSON Web Token for Auth0's v2 Management API (see here for details on how to get a jwt).
- domain: Subdomain to make Auth0 api calls against (e.g. {tenant}.auth0.com).
- fields (optional) : The fields and their configuration to use.  If this is omitted, or null, it will render default name and nickname fields.

Fields is an array, containing a hash of configuration parameters to be hashed out later.

## Rendering a Profile Widget

```
Profile.render(userId, elementSelector)
```

Rendering a Profile Widget can be done by calling the render method, which accepts 2 parameters:
- userId: a vaid Auth0 userId belonging to the subdomain
- elementSelector: CSS selector respresenting the container in which to render the widget

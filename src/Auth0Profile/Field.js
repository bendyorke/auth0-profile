import React, { Component, PropTypes as T } from 'react'
import styles from './styles.module.css'

export default class Auth0ProfileField extends Component {
  static propTypes = {
    profile: T.object,
    name: T.oneOfType([T.string, T.arrayOf(T.string)]),
    names: T.arrayOf(T.string),
    type: T.oneOfType([T.string, T.arrayOf(T.string)]),
    types: T.arrayOf(T.string),
    placeholder: T.oneOfType([T.string, T.arrayOf(T.string)]),
    placeholders: T.arrayOf(T.string),
    label: T.string,
    hint: T.string,
    onChange: T.func,
  }

  constructor(props, context) {
    super(props, context)
    this.buildFields(props)
  }

  componentWillReceiveProps(props) {
    this.buildFields(props)
  }

  fieldProps({name, names, type, types, placeholder, placeholders} = this.props) {
    return {
      names: [].concat(name || names),
      types: type || types,
      placeholders: placeholder || placeholder
    }
  }

  buildFields(props = this.props) {
    const { names, types, placeholders } = this.fieldProps(props)
    const variousTypes = types instanceof Array
    const variousPlaceholders = placeholders instanceof Array

    this.fields = names.map((name, i) => ({
      name,
      type: variousTypes ? types[i] : types,
      placeholder: variousPlaceholders ? placeholders[i] : placeholders
    }))
  }

  inputId(name = this.fields[0].name) {
    return 'a0profile-' + name
  }


  valueOf(name) {
    return name.split('.').reduce((coll, key) => {
      if (coll && coll[key]) return coll[key]
    }, this.props.profile)
  }

  handleChange = name => e => {
    const { type, onChange } = this.props
    switch(type) {
    case 'text':
    default:
      return onChange(name, e.target.value)
    }
  }

  renderInput = ({name, type, placeholder}, i) => {
    const value = this.valueOf(name)
    const id = this.inputId(name)

    // There is a bug in Safari causing both the value and placeholder
    // to render, so only render one for now
    const _placeholder = value && value !== 0 ? '' : placeholder

    switch(type) {
    case 'text':
    default:
      return (
        <input
          className={styles.input}
          id={id}
          key={id}
          type={type ? type : null}
          placeholder={_placeholder}
          value={value || value === 0 ? value : ''}
          onChange={this.handleChange(name)}
        />
      )
    }
  }

  render() {
    const { label, hint } = this.props

    return (
      <fieldset className={styles.fieldset}>
        {label &&
          <label htmlFor={this.inputId()} className={styles.label}>
            {label}
          </label>
        }

        <div className={styles.field}>
          <div className={styles.inputList}>
            {this.fields.map(this.renderInput)}
          </div>

          {hint &&
            <div className={styles.hint}>
              {hint}
            </div>
          }
        </div>
      </fieldset>
    )
  }
}

import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip, InputGroupAddon, InputGroup } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { login } from '../../store'
import { connect } from 'react-redux'
import { validateAppLogin } from '../../utils/utils'

const mapDispatchToProps = dispatch => ({
  handleAppLogin: bindActionCreators(login, dispatch)
})

class AppLoginForm extends Component {
  constructor() {
    super()

    this.state = { username: '', password: '', usernameFieldTypeText: false }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleUsernameFieldToggle = this.handleUsernameFieldToggle.bind(this)
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  async handleSubmit() {
    const { username, password } = this.state
    console.log(username, password)

    // handle authenticating user info
    const validLogin = await validateAppLogin(username, password)
    if (validLogin) {
      this.props.handleAppLogin()
      Router.push('/')
    }
    else {
      console.error('Error logging into app.')
    }
  }

  handleUsernameFieldToggle() {
    this.setState(prevState => ({
      usernameFieldTypeText: !prevState.usernameFieldTypeText
    }))
  }

  render() {
    const { username, password, usernameFieldTypeText } = this.state

    return (
      <Form>
        <FormGroup>
          <Label for="usernameEntry">Username</Label>
          <InputGroup>
            <Input type={usernameFieldTypeText ? "text" : "password"} name="username" id="usernameEntry" placeholder="Username" value={username} onChange={this.handleInputChange} />
            <InputGroupAddon addonType="append">
              <Button color="secondary" type="button" onClick={this.handleUsernameFieldToggle}>
                Show/Hide Username
              </Button>
            </InputGroupAddon>
          </InputGroup>

        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input type="password" name="password" id="passwordEntry" placeholder="Password" value={password} onChange={this.handleInputChange} />
        </FormGroup>
        <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

const AppLoginFormWrapper = (props) => (
  <div className="rounded border p-3">
    <h2>App Login</h2>
    <span className="text-muted">Enter your information to show the full application.</span>
    <hr />
    <AppLoginForm {...props} />
  </div>
)

export default connect(null, mapDispatchToProps)(AppLoginFormWrapper)

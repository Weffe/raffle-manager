import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { login } from '../../store'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => ({
  handleLogin: bindActionCreators(login, dispatch)
})

class AppLoginForm extends Component {
  constructor() {
    super()

    this._handleSubmit = this._handleSubmit.bind(this)
  }

  _handleSubmit() {
    // handle authenticating user info
    this.props.handleLogin()
    Router.push('/')
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="usernameEntry">Username</Label>
          <Input type="text" name="username" id="usernameEntry" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input type="password" name="password" id="passwordEntry" placeholder="Password" />
        </FormGroup>
        <Button color="primary" onClick={this._handleSubmit}>Submit</Button>
      </Form>
    )
  }
}

const AppLoginFormWrapper = (props) => (
  <div className="rounded border border-primary p-3">
    <h2>App Login</h2>
    <span className="text-muted">Enter your information to show the full application.</span>
    <hr />
    <AppLoginForm {...props} />
  </div>
)

export default connect(null, mapDispatchToProps)(AppLoginFormWrapper)

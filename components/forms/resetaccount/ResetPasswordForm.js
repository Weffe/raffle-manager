import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap'
import { resetPassword } from '../../../utils/utils'
import { toast } from 'react-toastify';
import Router from 'next/router'
import NProgress from 'nprogress'

class ResetPasswordForm extends Component {
  constructor() {
    super()
    this.state = { username: '', password: '', firstName: '', lastName: '', formSubmitted: false }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { firstName, lastName, username, password, formSubmitted } = this.state

    if (!formSubmitted) {
      this.setState(prevState => ({ formSubmitted: !prevState.formSubmitted }))
      NProgress.start()
      resetPassword(firstName.trim(), lastName.trim(), username.trim(), password)
        .then(res => {
          this.setState({ firstName: '', lastName: '', username: '', password: '' })
          toast.success(`${res.data} You can close this notification to be redirected to the home page.`, {
            onClose: () => { Router.push('/') }
          })
        })
        .catch(err => {
          toast.error(err.response.data)
        })
        .finally(() => {
          this.setState({ formSubmitted: false })
          NProgress.done();
        })
    }
  }

  render() {
    const { username, password, firstName, lastName } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="tab1-firstNameEntry">First Name</Label>
          <Input required type="text" name="firstName" id="tab1-firstNameEntry" placeholder="First Name" value={firstName} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="tab1-lastNameEntry">Last Name</Label>
          <Input required type="text" name="lastName" id="tab1-lastNameEntry" placeholder="Last Name" value={lastName} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="tab1-usernameEntry">Username</Label>
          <Input required type="text" name="username" id="tab1-usernameEntry" placeholder="Username" value={username} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="tab1-passwordEntry">New Password</Label>
          <Input required type="password" name="password" id="tab1-passwordEntry" placeholder="New Password" value={password} onChange={this.handleInputChange} />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    )
  }
}

const ResetPasswordFormWrapper = (props) => (
  <div className="rounded-bottom border border-top-0 p-3">
    <h2>Reset Password</h2>
    <span className="text-muted">Reset your account password.</span>
    <hr />
    <ResetPasswordForm {...props} />
  </div>
)

export default ResetPasswordFormWrapper

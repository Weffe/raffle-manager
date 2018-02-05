import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap'
import InfoOutlineIcon from 'react-icons/lib/md/info-outline'
import { resetUsername } from '../../../utils/utils'
import { toast } from 'react-toastify';
import Router from 'next/router'

class ResetUsernameForm extends Component {
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
      resetUsername(firstName, lastName, username, password)
        .then(res => {
          this.setState({ firstName: '', lastName: '', username: '', password: '', formSubmitted: false })
          toast.success(`${res.data} You can close this notification to be redirected to the home page.`, {
            onClose: () => { Router.push('/') }
          })
        })
        .catch(err => {
          toast.error(err.response.data)
          this.setState({ formSubmitted: false })
        })
    }
  }

  render() {
    const { username, password, firstName, lastName } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="tab2-firstNameEntry">First Name</Label>
          <Input required type="text" name="firstName" id="tab2-firstNameEntry" placeholder="First Name" value={firstName} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="tab2-lastNameEntry">Last Name</Label>
          <Input required type="text" name="lastName" id="tab2-lastNameEntry" placeholder="Last Name" value={lastName} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="tab2-usernameEntry">
            New Username

            <span id="UsernameTip" className="pl-1">
              <InfoOutlineIcon />
            </span>

            <UncontrolledTooltip placement="right" target="UsernameTip">
              Tip: It might be easier to remember your username if you use your CWID
            </UncontrolledTooltip >
          </Label>
          <Input required type="text" name="username" id="tab2-usernameEntry" placeholder="New Username" value={username} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="tab2-passwordEntry">Password</Label>
          <Input required type="password" name="password" id="tab2-passwordEntry" placeholder="Password" value={password} onChange={this.handleInputChange} />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    )
  }
}

const ResetUsernameFormWrapper = (props) => (
  <div className="rounded-bottom border border-top-0 p-3">
    <h2>Reset Username</h2>
    <span className="text-muted">Reset your account username.</span>
    <hr />
    <ResetUsernameForm {...props} />
  </div>
)

export default ResetUsernameFormWrapper

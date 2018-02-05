import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap'
import { func } from 'prop-types'

class DashboardAccessorForm extends Component {
  static propTypes = {
    /** called once the form submission is complete */
    onSubmitDone: func.isRequired
  }

  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    // handle authenticating user info
    const validAdmin = true

    // then pass the result to the passed in prop func
    this.props.onSubmitDone({ validAdmin: validAdmin })
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="usernameEntry">Username</Label>
          <Input required type="text" name="username" id="usernameEntry" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input required type="password" name="password" id="passwordEntry" placeholder="Password" />
        </FormGroup>
        <Button color="primary">Submit</Button>
      </Form>
    )
  }
}

const DashboardAccessorFormWrapper = (props) => (
  <div className="rounded border p-3">
    <h2>Dashboard</h2>
    <span className="text-muted">Enter your information to access the dashboard.</span>
    <hr />
    <DashboardAccessorForm {...props} />
  </div>
)

export default DashboardAccessorFormWrapper

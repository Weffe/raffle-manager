import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { func } from 'prop-types'
import { toast } from 'react-toastify'
import EyeSlashIcon from 'react-icons/lib/fa/eye-slash'
import EyeIcon from 'react-icons/lib/fa/eye'
import { handleDashboardLogin } from '../../utils/utils'

class DashboardAccessorForm extends Component {
  static propTypes = {
    /** called once the form submission is complete */
    onSubmitComplete: func.isRequired
  }

  constructor() {
    super()
    this.state = { username: '', password: '', formSubmitted: false, usernameFieldTypeText: false }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleUsernameFieldToggle = this.handleUsernameFieldToggle.bind(this)
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  handleUsernameFieldToggle() {
    this.setState(prevState => ({
      usernameFieldTypeText: !prevState.usernameFieldTypeText
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    const { username, password, formSubmitted } = this.state

    if (!formSubmitted) {
      this.setState(prevState => ({ formSubmitted: !prevState.formSubmitted }))
      handleDashboardLogin(username.trim(), password)
        .then(res => {
          this.setState({ username: '', password: '', formSubmitted: false })
          this.props.onSubmitComplete(res.data)
        })
        .catch(err => {
          toast.error(err.response.data)
          this.setState({ formSubmitted: false })
        })
    }
  }

  render() {
    const { username, password, usernameFieldTypeText } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="usernameEntry">Username</Label>
          <InputGroup>
            <Input required type={usernameFieldTypeText ? "text" : "password"} name="username" id="usernameEntry" placeholder="Username" value={username} onChange={this.handleInputChange} />
            <InputGroupAddon>
              <Button color="secondary" type="button" onClick={this.handleUsernameFieldToggle} title="view/hide username">
                {
                  usernameFieldTypeText ? <EyeSlashIcon /> : <EyeIcon />
                }
              </Button>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input required type="password" name="password" id="passwordEntry" placeholder="Password" value={password} onChange={this.handleInputChange} />
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

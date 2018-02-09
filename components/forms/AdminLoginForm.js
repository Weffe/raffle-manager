import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, InputGroupAddon, InputGroup } from 'reactstrap'
import Router from 'next/router'
import { bindActionCreators } from 'redux'
import { login } from '../../store'
import { connect } from 'react-redux'
import { handleAdminLogin } from '../../utils/utils'
import { toast } from 'react-toastify';
import EyeSlashIcon from 'react-icons/lib/fa/eye-slash'
import EyeIcon from 'react-icons/lib/fa/eye'
import NProgress from 'nprogress'

const mapDispatchToProps = dispatch => ({
  dispatchAdminLogin: bindActionCreators(login, dispatch)
})

class AdminLoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = { username: '', password: '', usernameFieldTypeText: false, formSubmitted: false }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      NProgress.start()
      handleAdminLogin(username.trim(), password)
        .then(res => {
          this.setState({ username: '', password: '' })
          this.props.dispatchAdminLogin()
          toast.success(`${res.data} You can close this notification to be redirected to the home page.`, {
            onClose: () => { Router.push('/') }
          })
        })
        .catch(err => {
          toast.error(err.response.data)
        })
        .finally(() => {
          NProgress.done();
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
        <Button color="primary" >Submit</Button>
      </Form>
    )
  }
}

const AdminLoginFormWrapper = (props) => (
  <div className="rounded border p-3">
    <h2>Admin Login</h2>
    <span className="text-muted">Enter your information to show the full application.</span>
    <hr />
    <AdminLoginForm {...props} />
  </div>
)

export default connect(null, mapDispatchToProps)(AdminLoginFormWrapper)

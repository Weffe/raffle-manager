import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap';
import InfoOutlineIcon from 'react-icons/lib/md/info-outline'
import Link from 'next/link'
import { handleRaffleEntry, firebaseFuncions } from '../../utils/utils'
import { toast } from 'react-toastify';
import NProgress from 'nprogress'

class RaffleEntryForm extends Component {
  constructor() {
    super()
    this.state = { username: '', password: '', formSubmitted: false }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { username, password, formSubmitted } = this.state

    if (!formSubmitted) {
      this.setState(prevState => ({ formSubmitted: !prevState.formSubmitted }))
      NProgress.start()
      // handle authenticating user info and incrementing ticket
      handleRaffleEntry(username.trim(), password)
        .then(res => {
          toast.success(res.data)
          // clear the input fields if it validates
          this.setState({ username: '', password: '' })
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
    const { username, password, formSubmitted } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup>
          <Label for="usernameEntry">Username</Label>
          <Input required type="text" name="username" id="usernameEntry" placeholder="Username" value={username} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input required type="password" name="password" id="passwordEntry" placeholder="Password" value={password} onChange={this.handleInputChange} />
        </FormGroup>

        <Button color="primary">Get Raffle Ticket</Button>
        <hr />
        <Link href="/forgotaccount" prefetch>
          <Button type="button" color="faded">Forgot my account</Button>
        </Link>
      </Form>
    )
  }
}

const RaffleEntryFormWrapper = () => (
  <div className="rounded border border-primary p-3">
    <h2>Raffle Entry</h2>
    <span className="text-muted">Enter your information to get your weekly raffle ticket</span>
    <hr />
    <RaffleEntryForm />
  </div>
)

export default RaffleEntryFormWrapper

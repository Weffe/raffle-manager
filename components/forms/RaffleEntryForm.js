import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap';
import InfoOutlineIcon from 'react-icons/lib/md/info-outline'
import Link from 'next/link'
import { handleRaffleEntry } from '../../utils/utils'

class RaffleEntryForm extends Component {
  constructor() {
    super()
    this.state = { username: '', password: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  async handleSubmit() {
    const { username, password } = this.state

    // handle authenticating user info and incrementing ticket
    try {
      await handleRaffleEntry(username, password)
      console.log('incremented ticket')
      // clear the input fields if it validates
      this.setState({ username: '', password: '' })
    }
    catch (err) {
      console.error(err)
    }
  }

  render() {
    const { username, password } = this.state

    return (
      <Form>
        <FormGroup>
          <Label for="usernameEntry">
            Username

            <span id="UsernameTip" className="pl-1">
              <InfoOutlineIcon />
            </span>

            <UncontrolledTooltip placement="right" target="UsernameTip">
              Tip: It might be easier to remember your username if you use your CWID
            </UncontrolledTooltip >

          </Label>
          <Input type="text" name="username" id="usernameEntry" placeholder="Username" value={username} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input type="password" name="password" id="passwordEntry" placeholder="Password" value={password} onChange={this.handleInputChange} />
        </FormGroup>

        <Button color="primary" onClick={this.handleSubmit}>Get Raffle Ticket</Button>
        <hr />
        <Link href="/forgotaccount" prefetch>
          <Button color="faded">Forgot my account</Button>
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

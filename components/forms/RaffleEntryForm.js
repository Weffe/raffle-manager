import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap';
import InfoOutlineIcon from 'react-icons/lib/md/info-outline'

class RaffleEntryForm extends Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit() {
    // handle authenticating user info and incrementing ticket
  }

  render() {
    return (
      <Form>
        <FormGroup>
          <Label for="usernameEntry">
            Username

            <span id="UsernameTip" className="pl-1">
              <InfoOutlineIcon />
            </span>

            <UncontrolledTooltip placement="right" target="UsernameTip">
              Tip: It might make it easier to remember your username if you use your CWID.
            </UncontrolledTooltip >

          </Label>
          <Input type="text" name="username" id="usernameEntry" placeholder="Username" />
        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input type="password" name="password" id="passwordEntry" placeholder="Password" />
        </FormGroup>

        <Button color="primary" onClick={this.handleSubmit}>Get Raffle Ticket</Button>
        <hr />
        <Button color="faded" onClick={this.handleSubmit}>Forgot my account</Button>
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

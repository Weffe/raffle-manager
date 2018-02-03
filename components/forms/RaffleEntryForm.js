import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap';
import InfoOutlineIcon from 'react-icons/lib/md/info-outline'
import Link from 'next/link'
import { handleRaffleEntry, firebaseFuncions } from '../../utils/utils'

class RaffleEntryForm extends Component {
  constructor() {
    super()
    this.state = { username: '', password: '' }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleMultiply = this.handleMultiply.bind(this)
  }

  handleInputChange({ target }) {
    this.setState({ [target.name]: target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    const { username, password } = this.state

    // firebaseFuncions.post('/handleRaffleEntry', {
    //   username: 'mana', password: 'mana'
    // })
    //   .then(res => {
    //     this.setState({ username: '', password: '' })
    //     console.log(res)
    //   })
    //   .catch(err => console.log(err))

    // handle authenticating user info and incrementing ticket
    handleRaffleEntry(username, password)
      .then(res => {
        console.log(res)
        // clear the input fields if it validates
        this.setState({ username: '', password: '' })
      })
      .catch(err => {
        console.error(JSON.stringify(err))
      })
  }

  handleMultiply() {
    firebaseFuncions.post('/multiply', {
      number: 5, multiplier: 4
    })
      .then(res => console.log(res.data.result))
      .catch(err => console.log(err))
  }

  render() {
    const { username, password } = this.state

    return (
      <Form onSubmit={this.handleSubmit}>
        <Button onClick={this.handleMultiply}>Multiply</Button>
        <FormGroup>
          <Label for="usernameEntry">Username</Label>
          <Input type="text" name="username" id="usernameEntry" placeholder="Username" value={username} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="passwordEntry">Password</Label>
          <Input type="password" name="password" id="passwordEntry" placeholder="Password" value={password} onChange={this.handleInputChange} />
        </FormGroup>

        <Button color="primary" onClick={this.handleSubmit} type="submit">Get Raffle Ticket</Button>
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

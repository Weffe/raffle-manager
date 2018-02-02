import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, UncontrolledTooltip } from 'reactstrap';
import InfoOutlineIcon from 'react-icons/lib/md/info-outline'
import Link from 'next/link'
import Router from 'next/router'
import { handleRaffleEntry } from '../../utils/utils'
import { database, createAccount, ticketsRef } from '../../utils/firebase'

class CreateAccountForm extends Component {
    constructor() {
        super()
        this.state = { username: '', password: '', firstName: '', lastName: '' }
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleInputChange({ target }) {
        this.setState({ [target.name]: target.value })
    }

    async handleSubmit(e) {
        e.preventDefault();
        const { firstName, lastName, username, password } = this.state
        try {
            await createAccount(firstName, lastName, username, password)
            Router.push('/')
        }
        catch (err) {
            console.error(err)
        }
    }

    render() {
        const { username, password, firstName, lastName } = this.state

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                    <Label for="firstNameEntry">First Name</Label>
                    <Input required type="text" name="firstName" id="firstNameEntry" placeholder="First Name" value={firstName} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="lastNameEntry">Last Name</Label>
                    <Input required type="text" name="lastName" id="lastNameEntry" placeholder="Last Name" value={lastName} onChange={this.handleInputChange} />
                </FormGroup>
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
                    <Input required type="text" name="username" id="usernameEntry" placeholder="Username" value={username} onChange={this.handleInputChange} />
                </FormGroup>
                <FormGroup>
                    <Label for="passwordEntry">Password</Label>
                    <Input required type="password" name="password" id="passwordEntry" placeholder="Password" value={password} onChange={this.handleInputChange} />
                </FormGroup>

                <Button type="submit" color="primary">Submit</Button>
            </Form>
        )
    }
}

const CreateAccountFormWrapper = () => (
    <div className="rounded border p-3">
        <h2>Account Creation</h2>
        <span className="text-muted">Create a free account and gain access to free prizes!</span>
        <hr />
        <CreateAccountForm />
    </div>
)

export default CreateAccountFormWrapper

import React, { Component } from 'react'
import { resetAllUserTickets, handleAdminLogin } from '../utils/utils'
import { toast } from 'react-toastify'
import { Button, Row, Col, Modal, ModalBody, ModalHeader, Form, FormGroup, InputGroupAddon, InputGroup, Label, Input } from 'reactstrap'
import NProgress from 'nprogress'
import EyeSlashIcon from 'react-icons/lib/fa/eye-slash'
import EyeIcon from 'react-icons/lib/fa/eye'

class AdditionalActions extends Component {
    constructor() {
        super()
        this.state = { username: '', password: '', usernameFieldTypeText: false, formSubmitted: false }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
    openModal() {
        this.setState({ modal: true })
    }
    closeModal() {
        this.setState({ modal: false })
    }

    handleSubmit(e) {
        e.preventDefault()
        const { username, password, formSubmitted } = this.state

        if (!formSubmitted) {
            this.setState(prevState => ({ formSubmitted: !prevState.formSubmitted }))
            NProgress.start()
            handleAdminLogin(username.trim(), password)
                .then(() => {
                    this.closeModal()
                    this.setState({ username: '', password: '' })
                    resetAllUserTickets()
                        .then(res => {
                            toast.success(res.data)
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
            <Row className="mb-4">
                <Col>
                    <Button color="danger" onClick={this.openModal}>Reset All User Tickets</Button>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                        <ModalHeader toggle={this.closeModal}>Admin Login (Confirmation)</ModalHeader>
                        <ModalBody>
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
                        </ModalBody>
                    </Modal>
                </Col>
            </Row>
        )
    }
}

export default AdditionalActions
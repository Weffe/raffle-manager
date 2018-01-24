import React, { Component } from 'react'
import Link from 'next/link'
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap'

const loggedin = true

class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.renderForgotAccountLink = this.renderForgotAccountLink.bind(this)
        this.renderLoginLink = this.renderLoginLink.bind(this)
        this.renderDashboardLink = this.renderDashboardLink.bind(this)
    }

    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    renderForgotAccountLink() {
        if (loggedin) {
            return (
                <NavItem>
                    <Link href="/forgotaccount" prefetch>
                        <NavLink href="#">Forgot Account</NavLink>
                    </Link>
                </NavItem>
            )
        }
    }

    renderDashboardLink() {
        if (loggedin) {
            return (
                <NavItem>
                    <Link href="/dashboard" prefetch>
                        <NavLink href="#">Dashboard</NavLink>
                    </Link>
                </NavItem>
            )
        }
    }

    renderLoginLink() {
        if (!loggedin) {
            return (
                <NavItem>
                    <Link href="/login" prefetch>
                        <NavLink href="#">Login</NavLink>
                    </Link>
                </NavItem>
            )
        }
    }

    render() {
        return (
            <Navbar light color="white">
                <NavbarBrand >Raffle Manager</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link href="/" prefetch>
                                <NavLink href="#">Home</NavLink>
                            </Link>
                        </NavItem>
                        {this.renderForgotAccountLink()}
                        {this.renderDashboardLink()}
                        {this.renderLoginLink()}
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}

export default NavMenu
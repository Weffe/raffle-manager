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
import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
    loggedin: state.loggedin,
})

class NavMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
        this.renderLoginLink = this.renderLoginLink.bind(this)
        this.renderLinkIfLoggedIn = this.renderLinkIfLoggedIn.bind(this)
    }

    toggle() {
        this.setState(prevState => ({
            isOpen: !prevState.isOpen
        }))
    }

    renderLinkIfLoggedIn({ href, name }) {
        const { loggedin } = this.props

        if (loggedin) {
            return (
                <NavItem>
                    <Link href={`/${href}`} prefetch>
                        <NavLink href="#">{name}</NavLink>
                    </Link>
                </NavItem>
            )
        }
    }

    renderLoginLink() {
        const { loggedin } = this.props

        if (!loggedin) {
            return (
                <NavItem>
                    <Link href="/login" prefetch>
                        <NavLink href="#">Admin Login</NavLink>
                    </Link>
                </NavItem>
            )
        }
    }

    render() {
        return (
            <Navbar light color="white" expand="md">
                <NavbarBrand>Raffle Manager</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link href="/" prefetch>
                                <NavLink href="#">Home</NavLink>
                            </Link>
                        </NavItem>
                        {this.renderLinkIfLoggedIn({ name: 'Register', href: 'register' })}
                        <NavItem>
                            <Link href="/forgotaccount" prefetch>
                                <NavLink href="#">Forgot Account</NavLink>
                            </Link>
                        </NavItem>
                        {this.renderLinkIfLoggedIn({ name: 'Dashboard', href: 'dashboard' })}
                        {this.renderLoginLink()}
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}
export default connect(mapStateToProps, null)(NavMenu)

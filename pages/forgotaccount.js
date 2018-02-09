import React, { Component } from 'react'
import { Container, Jumbotron, Nav, NavItem, NavLink, TabContent, TabPane, Alert } from 'reactstrap'
import SmileyIcon from 'react-icons/lib/fa/smile-o'
import Layout from '../containers/Layout'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'
import ResetPasswordForm from '../components/forms/resetaccount/ResetPasswordForm'
import ResetUsernameForm from '../components/forms/resetaccount/ResetUsernameForm'

const mapStateToProps = (state) => ({
  loggedin: state.loggedin,
})

class ForgotAccount extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: '1'
    };
    this.togglePane = this.togglePane.bind(this)
    this.renderNavbarTabs = this.renderNavbarTabs.bind(this)
  }

  togglePane(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  renderNavbarTabs() {
    const { activeTab } = this.state

    return (
      <Nav tabs>
        <NavItem>
          <NavLink
            href="#"
            active={activeTab === '1'}
            onClick={() => { this.togglePane('1') }}
          >
            Reset Password
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            active={activeTab === '2'}
            onClick={() => { this.togglePane('2') }}
          >
            Reset Username
          </NavLink>
        </NavItem>
      </Nav>
    )
  }

  render() {
    const { activeTab } = this.state

    if (!this.props.loggedin) {
      return (
        <Layout pageTitle="Dashboard" >
          <Container>
            <Alert color="danger">
              You do not have access to this page. Please login as an admin to gain access.
            </Alert>
          </Container>
        </Layout >
      )
    }

    return (
      <Layout pageTitle="Forgot Account" >
        <Container>
          <Jumbotron>
            <h1 className="display-4">Forgot your account?</h1>
            <p className="lead">
              That's okay, we got you covered here <SmileyIcon />
            </p>
          </Jumbotron>

          {this.renderNavbarTabs()}

          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ResetPasswordForm />
            </TabPane>
            <TabPane tabId="2">
              <ResetUsernameForm />
            </TabPane>
          </TabContent>
        </Container>
      </Layout>
    )
  }
}

export default withRedux(initStore, mapStateToProps, null)(ForgotAccount)

import React, { Component } from 'react'
import { Container, Alert } from 'reactstrap';
import Layout from '../containers/Layout'
import CreateAccountForm from '../components/forms/CreateAccountForm'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const mapStateToProps = (state) => ({
  loggedin: state.loggedin,
})

class Register extends Component {
  render() {
    if (!this.props.loggedin) {
      return (
        <Layout pageTitle="Register" >
          <Container>
            <Alert color="danger">
              You do not have access to this page. Please login as an admin to gain access.
            </Alert>
          </Container>
        </Layout >
      )
    }

    return (
      <Layout pageTitle="Register" >
        <Container>
          <CreateAccountForm />
        </Container>
      </Layout >
    )
  }
}

export default withRedux(initStore, mapStateToProps, null)(Register)

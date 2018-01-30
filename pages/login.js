import React, { Component } from 'react'
import { Container } from 'reactstrap';
import Layout from '../containers/Layout'
import AppLoginForm from '../components/forms/AppLoginForm'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const mapStateToProps = (state) => ({
  loggedin: state.loggedin,
})

class Login extends Component {
  render() {
    return (
      <Layout pageTitle="Login" >
        <Container>
          <AppLoginForm />
        </Container>
      </Layout >
    )
  }
}

export default withRedux(initStore, mapStateToProps, null)(Login)

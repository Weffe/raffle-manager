import React, { Component } from 'react'
import { Container } from 'reactstrap';
import Layout from '../containers/Layout'
import AppLoginForm from '../components/forms/AppLoginForm'

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

export default Login
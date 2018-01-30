import React, { Component } from 'react'
import Layout from '../containers/Layout'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const mapStateToProps = (state) => ({
  loggedin: state.loggedin,
})

class ForgotAccount extends Component {
  render() {
    return (
      <Layout pageTitle="Forgot Account" >
        Forgot Account Section!
      </Layout >
    )
  }
}

export default withRedux(initStore, mapStateToProps, null)(ForgotAccount)

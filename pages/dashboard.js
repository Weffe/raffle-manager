import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron, Alert } from 'reactstrap'
import Layout from '../containers/Layout'
import DashboardAccessorForm from '../components/forms/DashboardAccessorForm'
import DashboardManager from '../components/DashboardManager'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const mapStateToProps = (state) => ({
  loggedin: state.loggedin,
})

class Dashboard extends Component {
  constructor() {
    super()
    this.state = { dashboardVisible: false }
    this.handleOnSubmitDone = this.handleOnSubmitDone.bind(this)
    this.renderDashboardAccessorForm = this.renderDashboardAccessorForm.bind(this)
    this.renderDashboardManager = this.renderDashboardManager.bind(this)
  }

  handleOnSubmitDone({ validAdmin }) {
    if (validAdmin) {
      this.setState({ dashboardVisible: true })
    }
  }

  renderDashboardAccessorForm() {
    const { dashboardVisible } = this.state

    if (!dashboardVisible) {
      return (
        <DashboardAccessorForm onSubmitDone={this.handleOnSubmitDone} />
      )
    }
  }

  renderDashboardManager() {
    const { dashboardVisible } = this.state

    if (dashboardVisible) {
      return (
        <DashboardManager />
      )
    }
  }

  render() {
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
      <Layout pageTitle="Dashboard" >
        <Container>
          {this.renderDashboardAccessorForm()}
          {this.renderDashboardManager()}
        </Container>
      </Layout >
    )
  }
}

export default withRedux(initStore, mapStateToProps, null)(Dashboard)
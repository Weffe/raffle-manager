import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'reactstrap'
import Layout from '../containers/Layout'
import DashboardAccessorForm from '../components/forms/DashboardAccessorForm'
import DashboardManager from '../components/DashboardManager'

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

export default Dashboard
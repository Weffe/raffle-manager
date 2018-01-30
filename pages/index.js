import React, { Component } from 'react'
import { Container, Row, Col, Jumbotron } from 'reactstrap'
import Layout from '../containers/Layout'
import Leaderboard from '../components/Leaderboard'
import RaffleEntryForm from '../components/forms/RaffleEntryForm'
import { initStore } from '../store'
import withRedux from 'next-redux-wrapper'

const mapStateToProps = (state) => ({
  loggedin: state.loggedin,
})

class Home extends Component {
  constructor() {
    super()

    this.renderJumbotron = this.renderJumbotron.bind(this)
    this.renderHomeBody = this.renderHomeBody.bind(this)
  }

  renderJumbotron() {
    const { loggedin } = this.props
    if (loggedin) {
      return (
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-4">Welcome!</h1>
              <p className="lead">
                If you don't already have a free account then register for one!
            </p>
            </Jumbotron>
          </Col>
        </Row>
      )
    }
  }

  renderHomeBody() {
    const { loggedin } = this.props
    return (
      <Row>
        {loggedin && (
          <Col>
            <RaffleEntryForm />
          </Col>
        )}
        <Col>
          <h2>Leaderboard</h2>
          <Leaderboard />
        </Col>
      </Row>
    )
  }

  render() {
    return (
      <Layout pageTitle="Home">
        <Container>
          {this.renderJumbotron()}
          {this.renderHomeBody()}
        </Container>
      </Layout>
    )
  }
}
export default withRedux(initStore, mapStateToProps, null)(Home)
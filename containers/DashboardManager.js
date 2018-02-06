import React, { Component } from 'react'
import { Row, Col, Button } from 'reactstrap'
import DashboardUsersTable from '../components/DashboardUsersTable'

class DashboardManager extends Component {
  constructor() {
    super()

    this.state = {}
  }

  render() {
    return (
      <Row>
        <Col>
          <Row>
            <Col>
              <Button color="success" block>Choose a raffle winner</Button>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col>
              <p>Todo: Add account hard reset </p>
            </Col>
          </Row>
        </Col>
        <Col>
          <h2>Users</h2>
          <DashboardUsersTable />
        </Col>
      </Row>
    )
  }
}

export default DashboardManager
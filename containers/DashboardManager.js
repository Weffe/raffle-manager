import React, { Component } from 'react'
import { Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane, } from 'reactstrap'
import DashboardUsersTable from '../components/DashboardUsersTable'
import RaffleWinnersTable from '../components/RaffleWinnersTable'
import { getRandomRaffleWinner } from '../utils/utils'
import { toast } from 'react-toastify'
import capitalize from 'lodash.capitalize'
import RaffleWinnerPortal from '../components/RaffleWinnerPortal'

class DashboardManager extends Component {
  constructor() {
    super()

    this.state = {
      activeTab: '1',
      winners: [],
      newRaffleWinner: false,
      currentRaffleWinner: {}
    };
    this.handleRaffleButtonClick = this.handleRaffleButtonClick.bind(this)
    this.togglePane = this.togglePane.bind(this)
    this.renderNavbarTabs = this.renderNavbarTabs.bind(this)
    this.clearRaffleWinners = this.clearRaffleWinners.bind(this)
  }

  handleRaffleButtonClick() {
    getRandomRaffleWinner()
      .then(res => {
        const { winners } = this.state

        winners.forEach(winner => {
          // check if the new winner already exists in our current list
          if (winner._id === res.data._id) {
            const { firstName, lastName } = res.data
            this.setState({ newRaffleWinner: false })
            throw new Error(`${capitalize(firstName)} ${capitalize(lastName)} has already been selected as a potential winner.`)
          }
        })

        winners.push(res.data)
        this.setState({ winners, newRaffleWinner: true, currentRaffleWinner: res.data })
      })
      .catch(err => {
        let errorMsg
        if (err.response) {
          errorMsg = err.response.data
        }
        else {
          errorMsg = err.message
        }
        toast.error(errorMsg)
        console.error(errorMsg)
      })
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
            Pick A Raffle Winner
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            href="#"
            active={activeTab === '2'}
            onClick={() => { this.togglePane('2') }}
          >
            Users Table
          </NavLink>
        </NavItem>
      </Nav>
    )
  }

  clearRaffleWinners() {
    this.setState({ winners: [] })
  }

  render() {
    const { activeTab, winners, newRaffleWinner, currentRaffleWinner: { firstName, lastName } } = this.state

    return (
      <React.Fragment>
        {newRaffleWinner && <RaffleWinnerPortal firstName={firstName} lastName={lastName} />}
        <Row>
          <Col>
            {this.renderNavbarTabs()}
            <TabContent activeTab={activeTab} className="pt-2">
              <TabPane tabId="1">
                <Row className="mb-3">
                  <Col>
                    <Button color="success" size="lg" block onClick={this.handleRaffleButtonClick}>Pick a raffle winner</Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <h2>Raffle Winners</h2>
                    <RaffleWinnersTable data={winners} clearRaffleWinners={this.clearRaffleWinners} />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tabId="2" className="pt-2">
                <h2>Users Table</h2>
                <DashboardUsersTable />
              </TabPane>
            </TabContent>
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}

export default DashboardManager
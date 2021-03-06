import React, { Component } from 'react'
import ReactTable from 'react-table'
import { ticketsRef } from '../utils/firebase'
import { transformObjectToList } from '../utils/utils'

const columnsConfig = [
  {
    Header: 'First Name',
    accessor: 'firstName',
    className: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName',
    className: 'lastName'
  },
  {
    Header: 'Ticket Count',
    accessor: 'ticketCount',
  }
]

class Leaderboard extends Component {
  constructor() {
    super()

    this.state = {
      data: [],
    }
  }

  componentDidMount() {
    ticketsRef.on('value', snapshot => {
      const ticketsObject = snapshot.val()
      const ticketsList = transformObjectToList(ticketsObject)

      this.setState({ data: ticketsList })
    })
  }

  render() {
    const { data } = this.state

    return (
      <ReactTable
        data={data}
        columns={columnsConfig}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    )
  }
}

export default Leaderboard
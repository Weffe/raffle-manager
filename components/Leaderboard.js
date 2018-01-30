import React, { Component } from 'react'
import ReactTable from 'react-table'

const columnsConfig = [
  {
    Header: 'First Name',
    accessor: 'firstName'
  },
  {
    Header: 'Last Name',
    accessor: 'lastName'
  }
]

class Leaderboard extends Component {
  constructor() {
    super()

    this.state = {
      loading: false,
      data: [
        {
          firstName: 'Mike',
          lastName: 'Negrete'
        },
        {
          firstName: 'Joe',
          lastName: 'Doe'
        }
      ],
    }
  }

  render() {
    const { loading, data } = this.state

    return (
      <ReactTable
        loading={loading}
        data={data}
        columns={columnsConfig}
        defaultPageSize={10}
        className="-striped -highlight"
      />
    )
  }
}

export default Leaderboard
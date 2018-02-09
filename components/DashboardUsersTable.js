import React, { Component } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ReactTable from 'react-table'
import { Button } from 'reactstrap'
import { toast } from 'react-toastify'
import CopyIcon from 'react-icons/lib/md/content-copy'
import { getUsersForDashboard } from '../utils/utils'

const CustomToastMessage = ({ _id, firstName, lastName }) => (
    <div>
        ID copied for <span className="firstName">{firstName}</span> <span className="lastName">{lastName}</span>.
    </div>
)

const renderIDCell = ({ value }) => (
    <CopyToClipboard
        text={value._id}
        onCopy={() => toast.info(<CustomToastMessage {...value} />)} >
        <Button color="info" size="sm" title="Copy ID to clipboard">
            <CopyIcon />
        </Button>
    </CopyToClipboard >
)

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
        Header: 'Username',
        accessor: 'username',
    },
    {
        Header: 'ID',
        id: '_id',
        accessor: d => ({ _id: d._id, firstName: d.firstName, lastName: d.lastName }),
        Cell: renderIDCell,
        width: 43
    }
]

class DashboardUsersTable extends Component {
    constructor() {
        super()

        this.state = {
            data: [],
        }
    }

    componentDidMount() {
        getUsersForDashboard()
            .then(res => {
                const data = res.data
                this.setState({ data })
            })
            .catch(err => {
                console.error(err.response.data)
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

export default DashboardUsersTable
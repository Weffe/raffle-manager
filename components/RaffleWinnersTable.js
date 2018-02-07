import React, { Component } from 'react'
import ReactTable from 'react-table'
import { Button, Row, Col } from 'reactstrap'
import checkboxHOC from 'react-table/lib/hoc/selectTable';
import { toast } from 'react-toastify'
import { confirmRaffleWinners } from '../utils/utils'
import PropTypes from 'prop-types'

const CheckboxTable = checkboxHOC(ReactTable);

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
]

class RaffleWinnersTable extends Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    clearRaffleWinners: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props)

    this.state = {
      data: [],
      selection: [],
      selectAll: false,
    }

    this.toggleSelection = this.toggleSelection.bind(this)
    this.toggleAll = this.toggleAll.bind(this)
    this.isSelected = this.isSelected.bind(this)
    this.logSelection = this.logSelection.bind(this)
    this.handleRaffleWinnerConfirmation = this.handleRaffleWinnerConfirmation.bind(this)
  }

  toggleSelection(key, shift, row) {
    // start off with the existing state
    let selection = [
      ...this.state.selection
    ];
    const keyIndex = selection.indexOf(key);
    // check to see if the key exists
    if (keyIndex >= 0) {
      // it does exist so we will remove it using destructing
      selection = [
        ...selection.slice(0, keyIndex),
        ...selection.slice(keyIndex + 1)
      ]
    } else {
      // it does not exist so add it
      selection.push(key);
    }
    // update the state
    this.setState({ selection });
  }

  toggleAll() {
    const selectAll = this.state.selectAll ? false : true;
    const selection = [];
    if (selectAll) {
      // we need to get at the internals of ReactTable
      const wrappedInstance = this.checkboxTable.getWrappedInstance();
      // the 'sortedData' property contains the currently accessible records based on the filter and sort
      const currentRecords = wrappedInstance.getResolvedState().sortedData;
      // we just push all the IDs onto the selection array
      currentRecords.forEach((item) => {
        selection.push(item._original._id);
      })
    }
    this.setState({ selectAll, selection })
  }

  isSelected(key) {
    /*
      Instead of passing our external selection state we provide an 'isSelected'
      callback and detect the selection state ourselves. This allows any implementation
      for selection (either an array, object keys, or even a Javascript Set object).
    */
    return this.state.selection.includes(key);
  }

  logSelection() {
    console.log('selection:', this.state.selection);
  }

  handleRaffleWinnerConfirmation() {
    const raffleWinnerIDs = this.state.selection

    if (raffleWinnerIDs.length <= 0) {
      toast.error('No winners selected.')
      return
    }

    confirmRaffleWinners(raffleWinnerIDs)
      .then(res => {
        this.setState({ selection: [] })
        this.props.clearRaffleWinners()
        toast.success(res.data)
      })
      .catch(err => {
        toast.error(err.response.data)
        console.error(err.response.data)
      })
  }

  render() {
    const { toggleSelection, toggleAll, isSelected, logSelection, handleRaffleWinnerConfirmation } = this;
    const { columns, selectAll, } = this.state;
    const { data } = this.props

    const checkboxProps = {
      selectAll,
      isSelected,
      toggleSelection,
      toggleAll,
      selectType: 'checkbox',
    };

    return (
      <React.Fragment>
        <Row className="mb-4">
          <Col>
            <CheckboxTable
              ref={(r) => this.checkboxTable = r}
              data={data}
              columns={columnsConfig}
              defaultPageSize={10}
              className="-striped -highlight"
              {...checkboxProps}
            />
          </Col>
        </Row>
        <Row>
          <Col sm="3" lg="2">
            <Button onClick={logSelection}>Log Selection</Button>
          </Col>
          <Col sm="3" lg="2">
            <Button
              color="primary"
              onClick={handleRaffleWinnerConfirmation}
            >
              Confirm Selected Winners
            </Button>
          </Col>
        </Row >
      </React.Fragment>
    )
  }
}

export default RaffleWinnersTable
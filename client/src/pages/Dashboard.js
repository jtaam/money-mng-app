import React, { Component } from 'react'
import { connect } from 'react-redux'
import { loadTransactions, removeTransaction } from '../store/actions/transactionActions'
import CreateTransaction from '../components/transaction/CreateTransaction'
import UpdateTransaction from '../components/transaction/UpdateTransaction'

class Dashboard extends Component {

    state = {
        createModalOpen: false,
        updateModalOpen: false,
        id: ''
    }

    componentDidMount() {
        this.props.loadTransactions()
    }

    openCreateModal = () => {
        this.setState({
            createModalOpen: true
        })
    }

    closeCreateModal = () => {
        this.setState({
            createModalOpen: false
        })
    }

    openUpdateModal = (id) => {
        this.setState({
            updateModalOpen: true,
            id
        })
    }

    closeUpdateModal = () => {
        this.setState({
            updateModalOpen: false,
            id: ''
        })
    }

    render() {
        let { auth, transactions } = this.props
        return (
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    <h1>Welcome {auth.user.name}</h1>
                    <p>Your email is {auth.user.email}</p>

                    <button
                        className='btn btn-primary my-2'
                        onClick={this.openCreateModal}
                    >
                        Create New Transaction
                    </button>
                    <CreateTransaction
                        isOpen={this.state.createModalOpen}
                        close={this.closeCreateModal}
                    />

                    <br />
                    <h2>Transactions</h2>
                    <ul className="list-group">
                        {
                            transactions.map(transaction => (
                                <li
                                    key={transaction._id}
                                    className="list-group-item">
                                    <p>Type: {transaction.type}</p>
                                    <p>Amount: {transaction.amount}</p>
                                    {
                                        this.state.id === transaction._id ?
                                            <UpdateTransaction
                                                isOpen={this.state.updateModalOpen}
                                                close={this.closeUpdateModal}
                                                transaction={transaction}
                                            /> : null
                                    }
                                    <button
                                        className='btn btn-danger btn-sm'
                                        onClick={() => this.props.removeTransaction(transaction._id)}
                                    >Remove</button>
                                    <button
                                        className='btn btn-warning btn-sm ml-1'
                                        onClick={() => this.openUpdateModal(transaction._id)}
                                    >Update</button>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    transactions: state.transactions
})

export default connect(mapStateToProps, { loadTransactions, removeTransaction })(Dashboard)
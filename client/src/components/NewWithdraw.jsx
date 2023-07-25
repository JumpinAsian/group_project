import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

const NewWithdraw = (props) => {

    const [withdrawName, setWithdrawName] = useState('');
    const [withdrawAmount, setWithdrawAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const createWithdraw = (e) => {
        e.preventDefault();

        console.log(withdrawName);
        console.log(withdrawAmount);
        console.log(expenseDate);

        const newWithdraw = {
            withdrawName: withdrawName,
            withdrawAmount: withdrawAmount,
            expenseDate: expenseDate
        }

        axios.post('http://localhost:8000/api/newWithdraw', newWithdraw)
            .then((response) => {
                console.log("Client success");

                console.log(response.data);

                navigate(`/api/allWithdraws`);
            })
            .catch((err) => {
                console.log("Client error", err);
                setErrors(err.response.data.errors);
            })

        setWithdrawName('');
        setWithdrawAmount('');
        setExpenseDate('');
    }

    const cancelHandler = () => {
        navigate('/api/allWithdraws');
    }

    return (
        <div className='container'>

            <div className='navbar navbar-dark bg-dark mb-5 px-5'>
                <Link className='btn btn-success' to={'/api/allExpenses'}>Checking</Link>
                <Link className='btn btn-success' to={'/api/allDeposits'}>Deposits</Link>
                <Link className='btn btn-success' to={'/api/allWithdraws'}>Deductions</Link>
                <Link className='btn btn-success' to={'/api/newDeposit'}>New Deposit</Link>
                <Link className='btn btn-success' to={'/api/newWithdraw'}>New Deduction</Link>
            </div>

            <h1 className='text-white'>Add Deduction</h1><br></br>

            <form onSubmit={createWithdraw}>
                <label className='form-label text-white' htmlFor='withdrawName'>Name:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="text" onChange={(e) => setWithdrawName(e.target.value)} value={withdrawName} id='withdrawName' />
                {
                    errors.withdrawName ?
                        <p className='text-danger'>{errors.withdrawName.message}</p> :
                        null
                }

                <label className='form-label text-white' htmlFor='withdrawAmount'>Amount:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="number" onChange={(e) => setWithdrawAmount(e.target.value)} value={withdrawAmount} id='withdrawAmount' />
                {
                    errors.withdrawAmount ?
                        <p className='text-danger'>{errors.withdrawAmount.message}</p> :
                        null
                }

                <label className='form-label text-white' htmlFor='expenseDate'>Date:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="date" onChange={(e) => setExpenseDate(e.target.value)} value={expenseDate} id='expenseDate' />
                {
                    errors.expenseDate ?
                        <p className='text-danger'>{errors.expenseDate.message}</p> :
                        null
                }

                <button className='btn btn-secondary' onClick={cancelHandler}>Cancel</button> &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <button className='btn btn-danger'>Submit</button>
            </form>
        </div>
    )

}

export default NewWithdraw;
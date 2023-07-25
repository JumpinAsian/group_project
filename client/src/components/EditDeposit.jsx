import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';

const EditDeposit = (props) => {

    const [depositName, setDepositName] = useState('');
    const [depositAmount, setDepositAmount] = useState('');
    const [expenseDate, setExpenseDate] = useState('');
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8000/api/oneDeposit/${id}`)
            .then((response) => {
                console.log(response.data);

                setDepositName(response.data.depositName);
                setDepositAmount(response.data.depositAmount);
                setExpenseDate(response.data.expenseDate);
            })
            .catch((err) => {
                console.log("Client error", err);
            })
    }, [id])

    const updateDeposit = (e) => {
        e.preventDefault();

        console.log(depositName);
        console.log(depositAmount);
        console.log(expenseDate);

        const updatedDeposit = {
            depositName: depositName,
            depositAmount: depositAmount,
            expenseDate: expenseDate
        }

        axios.put(`http://localhost:8000/api/updateExpense/${id}`, updatedDeposit)
            .then((response) => {
                console.log("Client success");

                console.log(response.data);

                navigate(`/api/allDeposits`);
            })
            .catch((err) => {
                console.log("Client error", err);
                setErrors(err.response.data.errors);
            })

        setDepositName('');
        setDepositAmount('');
        setExpenseDate('');
    }

    const cancelHandler = () => {
        navigate('/api/allDeposits');
    }

    return (
        <div className="container">

            <div className='navbar mb-5'>
                <Link className='btn btn-success' to={'/api/allExpenses'}>Checking</Link>
                <Link className='btn btn-success' to={'/api/allDeposits'}>Deposits</Link>
                <Link className='btn btn-success' to={'/api/allWithdraws'}>Deductions</Link>
                <Link className='btn btn-success' to={'/api/newDeposit'}>New Deposit</Link>
                <Link className='btn btn-success' to={'/api/newWithdraw'}>New Deduction</Link>
            </div>

            <h1 className='text-white'>Edit Deposit</h1><br></br>

            <form onSubmit={updateDeposit}>
                <label className='form-label text-white' htmlFor='depositName'>Name:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="text" onChange={(e) => setDepositName(e.target.value)} value={depositName} id='depositName' />
                {
                    errors.depositName ?
                        <p className='text-danger'>{errors.depositName.message}</p> :
                        null
                }

                <label className='form-label text-white' htmlFor='depositAmount'>Amount:</label>
                <input className='form-control form-control mb-4 bg-dark text-white' type="number" onChange={(e) => setDepositAmount(e.target.value)} value={depositAmount} id='depositAmount' />
                {
                    errors.depositAmount ?
                        <p className='text-danger'>{errors.depositAmount.message}</p> :
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

export default EditDeposit;
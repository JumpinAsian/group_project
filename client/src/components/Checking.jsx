import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checking = (props) => {
    const [allExpenses, setAllExpenses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8000/api/allExpenses')
            .then((response) => {
                console.log(response);
                setAllExpenses(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // custom function that loops through all of the expenses,
    // and totals all of the numbers up of each deposit and withdraw
    let total = 0;
    for (let i = 0; i < allExpenses.length; i++) {
        if (allExpenses[i].depositAmount !== undefined) {
            total += allExpenses[i].depositAmount;
        }

        if (allExpenses[i].withdrawAmount !== undefined) {
            total -= allExpenses[i].withdrawAmount;
        }
    }
    console.log("Total: ", total);

    const updateExpenseButton = (updateID) => {
        console.log(updateID);

        navigate(`/oneExpense/${updateID}`);
    }

    const deleteExpenseButton = (deleteID) => {
        console.log(deleteID);

        axios.delete(`http://localhost:8000/api/deleteExpense/${deleteID}`)
            .then((response) => {
                console.log("Delete Success", response.data);

                setAllExpenses(allExpenses.filter((allExpenses) => allExpenses._id !== deleteID));
            })
            .catch((err) => {
                console.log("Client error", err);
            })
    }

    return (
        <div className="container">

            <div className='navbar navbar-dark bg-dark mb-5 px-5'>
                <Link className='btn btn-success ' to={'/api/allExpenses'}>Checking</Link>
                <Link className='btn btn-success' to={'/api/allDeposits'}>Deposits</Link>
                <Link className='btn btn-success' to={'/api/allWithdraws'}>Deductions</Link>
                <Link className='btn btn-success' to={'/api/newDeposit'}>New Deposit</Link>
                <Link className='btn btn-success' to={'/api/newWithdraw'}>New Deduction</Link>
            </div>

            <h1 className='text-white'>Checking</h1><br></br>

            <table className='table table-dark table-bordered table-hover'>
                <thead>
                    <tr>
                        <th >Deposits/Deductions</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allExpenses.map((eachExpense) => (
                            <tr>
                                <td>
                                    <Link className='bg-transparent text-white text-decoration-none' to={`/api/oneDeposit/${eachExpense._id}`}>{eachExpense.depositName}</Link>
                                    <Link className='bg-transparent text-white text-decoration-none' to={`/api/oneWithdraw/${eachExpense._id}`}>{eachExpense.withdrawName}</Link>
                                </td>
                                <td>${eachExpense.depositAmount}{eachExpense.withdrawAmount}</td>
                                <td>{eachExpense.expenseDate}</td>
                                <td><button className='btn btn-danger' onClick={() => deleteExpenseButton(eachExpense._id)}>Delete</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <h2 className='text-white'>Total: ${total}</h2>
        </div >
    )
}

export default Checking;
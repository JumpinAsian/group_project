const mongoose = require("mongoose");

const ExpenseSchema = new mongoose.Schema({
    depositName: {
        type: String,
        minLength: [2, 'The deposit name must be 2 or more characters.']
    },

    withdrawName: {
        type: String,
        minLength: [2, 'The withdraw name must be 1 or more characters.']
    },

    depositAmount: {
        type: Number,
        min: [1, 'The deposit amount must be at least 1$.']
    },

    withdrawAmount: {
        type: Number,
        min: [1, 'The withdraw amount must be 3 or more characters.']
    },

    expenseDate: {
        type: Date,
        required: [true, "Date is required"]
    }
}, { timestamps: true })

const Expense = mongoose.model("Expense", ExpenseSchema);
module.exports = Expense;
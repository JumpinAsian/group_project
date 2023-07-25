const Expense = require("../models/expense.model");

module.exports.readAll = (request, response) => {
    Expense.find()
        .then((allExpenses) => {
            response.json(allExpenses);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

module.exports.readOne = (request, response) => {
    Expense.findOne({ _id: request.params.id })
        .then((oneExpense) => {
            response.json(oneExpense);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

module.exports.create = (request, response) => {
    console.log(request.body);

    Expense.create(request.body)
        .then((newExpense) => {
            console.log("Server Success");
            response.json(newExpense);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

module.exports.update = (request, response) => {
    console.log("Updated ID: ", request.params.id);
    console.log("request.body: ", request.body);
    Expense.findOneAndUpdate(
        { _id: request.params.id },

        request.body,

        { new: true, runValidators: true }
    )
        .then((updatedExpense) => {
            response.json(updatedExpense);
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}

module.exports.delete = (request, response) => {
    Expense.deleteOne({ _id: request.params.id })
        .then((deleteExpense) => {
            response.json({ deleteExpense: deleteExpense })
        })
        .catch((err) => {
            console.log("Server Error");
            response.status(400).json(err);
        })
}
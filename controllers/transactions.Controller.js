import Transaction from "../models/transaction.model.js";

const createTransaction = async (req, res) => {

     try {

        const { title, amount, type, date, category } = req.body;

        const owner = req.payload._id;

        const newTransaction = await Transaction.create({
            title,
            amount,
            type,
            category,
            owner,           
        });

        res.status(201).json(newTransaction);

  } catch (error) {

    res.status(500).json({
        message: "Something went wrong.",
    });

  }

};

export { createTransaction };
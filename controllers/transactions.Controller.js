import Transaction from "../models/transaction.model.js";

// ==========================
// Create Transaction Controller
// ==========================
const createTransaction = async (req, res) => {
  try {
    const { title, amount, type, category } = req.body;

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

    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });

  }
};

// ==========================
// Get Transactions Controller
// ==========================
const getTransactions = async (req, res) => {
  try {

    const transactions = await Transaction.find({
      owner: req.payload._id,
    }).populate("category");

    res.status(200).json(transactions);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });

  }
};

// ==========================
// Update Transaction Controller
// ==========================
const updateTransaction = async (req, res) => {
  try {

    const { transactionId } = req.params;

    const { title, amount, type, category } = req.body;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }

    // Check if transaction belongs to logged user
    if (transaction.owner.toString() !== req.payload._id) {
      return res.status(403).json({
        message: "You are not authorized to update this transaction.",
      });
    }

    transaction.title = title;
    transaction.amount = amount;
    transaction.type = type;
    transaction.category = category;

    await transaction.save();

    res.status(200).json(transaction);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });

  }
};

// ==========================
// Delete Transaction Controller
// ==========================
const deleteTransaction = async (req, res) => {
  try {

    const { transactionId } = req.params;

    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(404).json({
        message: "Transaction not found.",
      });
    }

    // Check if transaction belongs to logged user
    if (transaction.owner.toString() !== req.payload._id) {
      return res.status(403).json({
        message: "You are not authorized to delete this transaction.",
      });
    }

    await transaction.deleteOne();

    res.status(200).json({
      message: "Transaction deleted successfully.",
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message: "Something went wrong.",
    });

  }
};

export {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};
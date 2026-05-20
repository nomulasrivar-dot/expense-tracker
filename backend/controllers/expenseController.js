import Expense from '../models/Expense.js';

// Get all expenses for logged in user
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add new expense
export const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res.status(400).json({ message: 'Please add all required fields' });
    }

    const expense = await Expense.create({
      user: req.user.id,
      title,
      amount,
      category,
      date: date || Date.now()
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete expense
export const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure the logged in user matches the expense user
    if (expense.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await expense.deleteOne();
    res.json({ id: req.params.id, message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

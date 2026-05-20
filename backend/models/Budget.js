import mongoose from 'mongoose';

const budgetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  amount: {
    type: Number,
    required: true,
  },
  month: {
    type: String, // e.g., "2026-05"
    required: true,
  }
}, { timestamps: true });

const Budget = mongoose.model('Budget', budgetSchema);
export default Budget;

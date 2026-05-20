import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import expenseRoutes from './routes/expense.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

app.get('/', (req, res) => {
  res.send('Expense Tracker API is running...');
});

// Database Connection & Server Start
if (!MONGODB_URI || MONGODB_URI === 'your_mongodb_connection_string_here') {
    console.log('⚠️ MongoDB URI is not configured yet in .env');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} (without database connection)`);
    });
} else {
    mongoose.connect(MONGODB_URI)
      .then(() => {
        console.log('✅ Connected to MongoDB');
        app.listen(PORT, () => {
          console.log(`Server running on port ${PORT}`);
        });
      })
      .catch((error) => {
        console.log('❌ Error connecting to MongoDB:', error.message);
      });
}

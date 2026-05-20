import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, Wallet, LogOut, Plus, PieChart as ChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('userInfo'));

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      fetchExpenses();
    }
  }, [navigate]);

  const fetchExpenses = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/expenses`, config);
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses', error);
    }
  };

  const handleAddExpense = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/expenses`, 
        { title, amount: Number(amount), category }, 
        config
      );
      setExpenses([data, ...expenses]);
      setTitle('');
      setAmount('');
    } catch (error) {
      alert('Error adding expense');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/login';
  };

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  // Group expenses by category for the chart
  const expensesByCategory = expenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
    return acc;
  }, {});

  const chartData = Object.keys(expensesByCategory).map(key => ({
    name: key,
    value: expensesByCategory[key]
  }));

  const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#64748b'];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <Wallet size={28} color="var(--primary-color)" />
          <span>FinTrack</span>
        </div>
        <div className="nav-item active">
          <LayoutDashboard size={20} />
          Dashboard
        </div>
        <div className="nav-item logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header">
          <div>
            <h1>Overview</h1>
            <p style={{ color: 'var(--text-muted)' }}>Welcome back, {user?.name}</p>
          </div>
          <div className="user-profile">
            <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>
          </div>
        </header>

        <div className="dashboard-grid">
          {/* Left Column: Stats & List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h3 className="card-title">Total Expenses</h3>
              <div className="stat-value">₹{totalExpenses.toFixed(2)}</div>
            </div>

            <div className="card" style={{ height: '300px' }}>
              <h3 className="card-title">
                Spending by Category
                <ChartIcon size={20} />
              </h3>
              {expenses.length === 0 ? (
                 <p style={{ color: 'var(--text-muted)' }}>No data for chart</p>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="45%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => `₹${value.toFixed(2)}`}
                      contentStyle={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--surface-color-light)', color: 'var(--text-main)', borderRadius: '8px' }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              )}
            </div>

            <div className="card">
              <h3 className="card-title">Recent Transactions</h3>
              <div className="expense-list">
                {expenses.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>No expenses yet. Add one!</p>
                ) : (
                  expenses.map((expense) => (
                    <div key={expense._id} className="expense-item">
                      <div className="expense-info">
                        <h4>{expense.title}</h4>
                        <p>{expense.category} • {new Date(expense.date).toLocaleDateString()}</p>
                      </div>
                      <div className="expense-amount">-₹{expense.amount.toFixed(2)}</div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Add Form */}
          <div>
            <div className="card">
              <h3 className="card-title">
                Add New Expense
                <Plus size={20} />
              </h3>
              <form onSubmit={handleAddExpense}>
                <div className="form-group">
                  <label className="form-label">Expense Title</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Groceries"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Amount (₹)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="form-input" 
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-input"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="Food">Food & Dining</option>
                    <option value="Transport">Transportation</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills & Utilities</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <button type="submit" className="btn-primary">Add Expense</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

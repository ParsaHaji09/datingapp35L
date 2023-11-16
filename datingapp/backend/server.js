const express = require('express');
const users = require('./data/users');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');

const app = express();
dotenv.config({ path: './backend/.env' });
connectDB();
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is running...");
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/users/:id', (req, res) => {
    const user = users.find((n) => n._id === req.params.id);
    res.send(user);
})

app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))
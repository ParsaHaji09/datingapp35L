const express = require('express');
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const app = express();
dotenv.config({ path: './backend/.env' });
connectDB();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',  // Change this to the origin of your React app
    credentials: true,
  }));
  

app.get('/', (req, res) => {
    res.send("API is running...");
})

// app.get('/api/users', (req, res) => {
//     res.json(users)
// })

// app.get('/api/users/:id', (req, res) => {
//     const user = users.find((n) => n._id === req.params.id);
//     res.send(user);
// })

// user opps
app.use('/api/users', userRoutes);

// errors
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))
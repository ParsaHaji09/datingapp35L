const express = require('express');
const users = require('./data/users');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

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

/* TO get the data, we can use AXIOS
import axios form "axios"
const fetchNotes = async() => {
    const data = await axios.get('api/notes');
}

 * 
 */

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on PORT ${PORT}`))
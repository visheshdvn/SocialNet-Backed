const express = require('express');
const connectDB = require('./config/db');
const path = require('path')


const app = express();

// Connect database
connectDB();

// INIT Middleware
app.use(express.json({extended: false}))

// define routes
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/profile', require('./routes/api/profile'))
app.use('/api/posts', require('./routes/api/posts'))

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server Started at port ${PORT}`))
const io = require('./socket').init(server)

io.on('connection', socket => {
    console.log('client connected');
})

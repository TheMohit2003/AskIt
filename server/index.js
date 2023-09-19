const express = require('express');
const app = express();
const connect = require('./config/db');
const port = 5000;
const cors = require('cors');
require('dotenv').config()
connect();
app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));
app.use('/api/questions', require('./routes/questions'));
app.use('/api/users', require('./routes/users'));
app.use('/api/search', require('./routes/search'));
app.use('/api/moderation', require('./routes/moderation'));


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

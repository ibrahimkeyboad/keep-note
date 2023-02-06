const express = require('express');
const notesRoutes = require('./routers/notesRouter');
const cors = require('cors');
const userRoutes = require('./routers/userRouter');
const globalError = require('./controllers/errorController');

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use('/api/notes', notesRoutes);
app.use('/api/users', userRoutes);

app.use(globalError);

module.exports = app;

const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv').config();
const app = require('./app');

const port = process.env.PORT;

const DB = process.env.DATA_BASE;

const connetDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATA_BASE);
    console.log(`MongoDB Conneted At ${conn.connection.host}`.cyan.underline);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

connetDB();

app.listen(port, () => console.log(`Server is running on port ${port}`.blue));

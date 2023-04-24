const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const studentsRoute = require('./Routes').studentsRoute;

mongoose
  .connect('mongodb://localhost:27017/apiDB')
  .then(() => {
    console.log('成功連結mongoose');
  })
  .catch((e) => {
    console.log(e);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use('/api/students', studentsRoute);

app.listen(8080, () => {
  console.log('伺服器正運行在port8080...');
});

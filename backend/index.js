const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const User = require('./User')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

mongoose.connect('mongodb://localhost:27017/coreuidb', {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
})
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

app.get('/Register', (req, res) => {
  
})
app.post('/Register', (req, res) => {
    console.log(req.data);
    const user = new User(req.body);
    console.log(user);
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const middleware = require('./middleware.js')
const formData = require('./formData')
const app = express()
require('dotenv').config();
app.use(cors({
  origin: '*'
}))
mongoose.connect(process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
).then(console.log('db connected yayy!'));

app.use(express.json());
app.use(express.urlencoded());
app.use(express.static('public'));
app.get('/', (req,res) => {
    res.sendFile(__dirname + '/pages/index.html')
})
// register a new user
app.post('/register', async (req, res) => {
  try {
      const { fname, email, lname, mobile, password, confirmPass } = req.body;
      const xist = await userModel.findOne({ email });
      if (xist) {
          return res.status(400).send('User already found');
      }
      if (password != confirmPass) {
          return res.status(403).send('Passwords not matched');
      }
      let newUser = new userModel({
        fname, email, lname, mobile, password
      });
      newUser.save().then(res.status(200).send('User registered'))
  } catch (error) {
      console.log(error);
      res.status(505).send(error);
    }
  }
)
// login an existing user
app.post('/login', async (req, res) => {

  const { email, password } = req.body;

  let exists = await userModel.findOne({ email });
  if (!exists) {
      res.status(300).send('user not found');

  }
  if (exists.password != password) {
      res.status(300).send('password invalid');

  }
  let payload = {
      user: {
          id: exists.id,
      }
  }


  jwt.sign(payload, 'jwtPass', { expiresIn: 360000000 },
      (err, token) => {
          if (err) throw (err);
          return res.json({ token })
      })
})
// get an appointment
app.post('/appointment', middleware, async (req, res) => {
    //res.json(req.body)
    // let {fname, lname} = req.body
    let data = new formData(req.body)
    const val = await data.save();
    res.json(val)
})

app.listen(5500, () => {console.log(process.env.YOYO)})
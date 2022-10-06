const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const User = require("./User");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost:27017/coreuidb", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

app.get("/Register", (req, res) => {});

app.post("/Register", async (req, res) => {
  const abc = User.findOne({ username: req.body.username }, (err, succ) => {
    if (succ === null) {
        const bcd = User.findOne({ email: req.body.email }, (err, succ) => {
            if (succ === null) {
                const user = new User(req.body);
                user.save();
                console.log(user);
            } else {
              console.log("Email already Exist");
            }
          });
    } else {
      console.log("User already Exist");
    }
  });
 
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

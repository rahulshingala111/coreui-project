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

const isAuthenticated = (req, res, next) => {
  const bearerHeader = req.get("Authorization");
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
};

app.get("/", (req, res) => {
  res.render("/");
});

app.get("/Register", (req, res) => {
  res.json({ text: "hi" });
});

app.post("/Register", async (req, res) => {
  const abc = User.findOne({ username: req.body.username }, (err, succ) => {
    if (succ === null) {
      const bcd = User.findOne({ email: req.body.email }, (err, succ) => {
        if (succ === null) {
          const user = new User(req.body);
          user.save();
          console.log(user);
          res.redirect("/Login");
        } else {
          console.log("Email already Exist");
        }
      });
    } else {
      console.log("User already Exist");
    }
  });
});

app.get("/Login", (req, res) => {});

app.post("/Login", (req, res) => {
  const abc = User.findOne({ username: req.body.username }, (err, succ) => {
    if (err) {
      console.log(err);
    } else {
      if (succ === null) {
        console.log("Username INCORRECT!!!");
      } else {
        const bcd = User.findOne({ passworsd: req.body.password }, (err, suc) => {
          if (succ === null) {
            console.log("Password INCORRECT!!!");
          } else {
            console.log("DATA CORRECT");
            if (succ) {
              const username = req.body.username;
              const password = req.body.password;
              const token = jwt.sign({ username, password }, "jwtSecret", {
                expiresIn: 300,
              });
              res.json({ auth: true, token: token }); //removed suc:suc from this line

              //return res.redirect("Dashbord");
            } else {
              res.json({
                auth: false,
                message: "Wrong username/password",
              });
            }
          }
        });
      }
    }
  });
});

app.get("/dashbord", isAuthenticated, (req, res) => {
  jwt.verify(req.token, "jwtSecret", (err, data) => {
    if (err) {
      res.json({
        message: "unauthorized",
        status: 403,
      });
    } else {
      res.json({
        text: "this is Protected",
        data: data,
      });
    }
  });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

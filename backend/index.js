const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie");
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

//-------------------------------------------------------

const ifUserExist = function (req, res, next) {
  const isUser = User.findOne({ username: req.body.username }, (err, succ) => {
    if (err) {
      res.sendStatus(401).message("ERROR!!");
    } else {
      if (succ === null) {
        res.send("Incorrect Username").status(401);
      } else {
        const isPassword = User.findOne({ passworsd: req.body.password }, (err, succ) => {
          if (succ === null) {
            res.send("Incorrect password").status(401);
          } else {
            next();
          }
        });
      }
    }
  });
};
app
.post("/Register", async (req, res) => {
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

app.post("/Login", ifUserExist, (req, res) => {
  console.log("In Login Post");
  res.sendStatus(200);
});

const isAuthenticated = (req, res, next) => {
  const Cookie = cookie.parse(req.headers.cookie);
  const TokeN = Cookie.token;

  if (typeof TokeN === "undefined") {
    res.sendStatus(403);
  } else {
    jwt.verify(TokeN, "jwtSecret", (err, data) => {
      if (err) {
        res.json({
          message: "unauthorized",
          status: 403,
        });
      } else {
        res.render("/dashbord");
      }
    });
    next();
  }
};
app.get("/dashbord", isAuthenticated, (req, res) => {
  //res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

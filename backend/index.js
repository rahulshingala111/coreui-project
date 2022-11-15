const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie");
const User = require("./User");
const jwt = require("jsonwebtoken");
const path = require("path");
const { redirect } = require("react-router-dom");

const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Request-Headers", "Set-Headers");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With,Set-Headers"
  );

  next();
});
app.use(express.static(path.join(__dirname, "..", "public")));
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
// app.get("/Register",(req,res)=>{
//   res.render("/Register");
// })
app.get("/Login", (req, res) => {
  res.render("/Login");
});
const ifUserExist = function (req, res, next) {
  const isUser = User.findOne({ username: req.body.username }, (err, succ) => {
    if (err) {
      res.sendStatus(401).message("ERROR!!");
    } else {
      if (succ === null) {
        res.sendStatus(401);
      } else {
        const isPassword = User.findOne({ passworsd: req.body.password }, (err, succ) => {
          if (succ === null) {
            res.sendStatus(401);
          } else {
            next();
          }
        });
      }
    }
  });
};
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

app.post("/Login", ifUserExist, (req, res) => {
  console.log("In Login Post");
  res.sendStatus(200);
});

const isAuthenticated = (req, res, next) => {
  let cookieHeader = req.headers.cookie;
  if (typeof cookieHeader !== "string") {
    cookieHeader = "";
  }
  let TokeN = cookie.parse(cookieHeader).token;
  console.log(TokeN);

  console.log("In isAuthenticated");
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
        // res.sendStatus(200);
        // window.location="/dashbord";
        next();
      }
    });
  }
};
app.get("/dashbord", isAuthenticated, (req, res) => {
  console.log("In Login Post");
  res.render("/dashbord");
});

app.get("/dashbord/showUser", (req, res) => {
  console.log("In shoeUser");
  const users = User.find({}, (err, succ) => {
    if (err) {
      console.log("error in finding all user");
    } else {
      console.log(succ);
      res.send(succ)
    }
  });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

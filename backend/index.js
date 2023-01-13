/* eslint-disable */
const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie");
const User = require("./schema/User"); //Scemma
const Empl = require("./schema/Employee"); //Scema
const jwt = require("jsonwebtoken");
const path = require("path");
const { log } = require("console");
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

//------------------

app.get("/Login", (req, res) => {
  res.render("/Login");
});

app.post("/Register", async (req, res) => {
  const abc = User.findOne({ username: req.body.username }, (err, succ) => {
    if (succ === null) {
      const bcd = User.findOne({ email: req.body.email }, (err, succ) => {
        if (succ === null) {
          const user = new User(req.body);
          user.save();
          console.log(user);
          res.sendStatus(200);
        } else {
          console.log("Email already Exist");
        }
      });
    } else {
      console.log("User already Exist");
    }
  });
});

app.post("/Login", (req, res) => {
  const isUser = User.find({ username: req.body.username }, (err, succ) => {
    if (err) {
      res.sendStatus(401).message("ERROR!!");
    } else {
      if (succ === null) {
        res.sendStatus(401);
      } else {
        const isPassword = User.find({ passworsd: req.body.password }, (err, succ) => {
          if (succ === null) {
            res.sendStatus(401);
          } else {
            res.sendStatus(200);
          }
        });
      }
    }
  });
  console.log("In Login Post");
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
        next();
      }
    });
  }
};
app.get("/dashbord", isAuthenticated, (req, res) => {
  console.log("In Login Post");
  res.sendStatus(200);
});

//--------dashboard api for table show

app.get("/dashbord/showUser", (req, res) => {
  console.log("Inside /dashbord/showUser api");
  const users = User.find({}, (err, succ) => {
    if (err) {
      console.log("error in finding all user");
    } else {
      res.send(succ);
    }
  });
});

app.get("/dashbord/employee/showUser", (req, res) => {
  Empl.aggregate([
    {
      $lookup: {
        from: "coreuiinstances",
        localField: "createdBy",
        foreignField: "_id",
        as: "result",
      },
    },
  ])
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//--------Dasboard API

app.get("/dashboard/addemployee", (req, res) => {
  res.sendStatus(200);
});
app.post("/dashboard/addemployee/registeremployee", (req, res) => {
  const abc = Empl.findOne({ password: req.body.password }, (err, succ) => {
    if (succ === null) {
      const bcd = Empl.findOne({ username: req.body.username }, (err, succ) => {
        if (succ === null) {
          const abcd = User.findOne({ username: req.body.createdBy }, (err, succ) => {
            if (err) {
              console.log(err);
            } else {
              const CreatedBy = succ._id;
              Empl.insertMany({
                contact: req.body.contact,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                createdBy: CreatedBy,
              });
              res.sendStatus(200);
            }
          });
        } else {
          console.log(err);
          res.sendStatus(401);
        }
      });
    } else {
      console.log(err);
      res.sendStatus(401);
    }
  });
});

const port = 5000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

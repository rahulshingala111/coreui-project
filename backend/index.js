const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie");
const User = require("./User");
const jwt = require("jsonwebtoken");

const app = express();

{
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  // app.use(helmet({ allowedHeaders: ["data_to_send"], exposedHeaders: ["data_to_send"] }));
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
}

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

app.post("/Login", async (req, res) => {
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

              const setCookie = cookie.serialize("token", token);

              res.setHeader(
                "Set-Cookie",
                cookie.serialize("token", token, {
                  httpOnly: true,
                  maxAge: 60 * 60 * 24 * 7, // 1 week
                })
              );

              res.end();
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
  res.render("/dashbord");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

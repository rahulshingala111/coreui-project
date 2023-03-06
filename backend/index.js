const express = require("express");
const mongoose = require("mongoose");
const cookie = require("cookie");
const User = require("./schema/User"); //Scemma
const Empl = require("./schema/Employee"); //Scema
const Cate = require("./schema/Category"); //Scema
const Prod = require("./schema/Product"); //Scema
const Cart = require('./schema/Cart'); //Scema
const jwt = require("jsonwebtoken");
const path = require("path");
const app = express();

// //-------- image upload
const multer = require("multer");
const { log } = require("console");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

//header origin
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Request-Headers", "Set-Headers");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers,myheader,X-RapidAPI-Key, Authorization, X-Requested-With,Set-Headers"
  );
  next();
});

// idk
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false, parameterLimit: 50000 }));

//mongoose
mongoose.set("strictQuery", true);
mongoose.connect("mongodb://0.0.0.0:27017/coreuidb", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  // useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

// Login Register

const checkUsername = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    } else if (succ !== null) {
      res.sendStatus(401);
      console.log("User Already Exist!!");
    } else {
      next();
    }
  });
};
const checkEmail = (req, res, next) => {
  User.findOne({ email: req.body.email }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    } else if (succ !== null) {
      res.sendStatus(401);
      console.log("Email Already Exist!!");
    } else {
      next();
    }
  });
};

app.post("/Register", checkUsername, checkEmail, (req, res) => {
  try {
    const user = new User(req.body);
    user.save();
    console.log(user);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(401);
  }
});
const checkUsername2 = (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    } else if (succ !== null) {
      next();
    } else {
      console.log(succ);
      res.sendStatus(401);
      console.log("User Already Exist!!");
    }
  });
};
const checkPassword2 = (req, res, next) => {
  User.findOne({ password: req.body.password }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    } else if (succ !== null) {
      next();
    } else {
      res.sendStatus(401);
      console.log("Password Wrong");
    }
  });
};

app.post("/login", checkUsername2, checkPassword2, (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(401);
    console.log(error);
  }
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
  User.find({}, (err, succ) => {
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

app.post("/dashboard/employee/editUser", (req, res) => {
  Empl.findById({ _id: req.body.id }, (err, succ) => {
    if (err) {
      res.sendStatus(401).message("ERROR finding user!!");
    } else {
      var myquery = { username: succ.username, email: succ.email, contact: succ.contact };
      var newvalues = {
        $set: { username: req.body.username, email: req.body.email, contact: req.body.contact },
      };
      Empl.updateMany(myquery, newvalues, (err, succ) => {
        if (err) {
          res.sendStatus(401).message("ERROR in updating user!!");
        } else {
          res.sendStatus(200);
          console.log("Updated successfuly");
        }
      });
    }
  });
});

//--------Dasboard API

app.get("/dashboard/addemployee", (req, res) => {
  res.sendStatus(200);
});
app.post("/dashboard/addemployee/registeremployee", (req, res) => {
  Empl.findOne({ password: req.body.password }, (err, succ) => {
    if (succ === null) {
      Empl.findOne({ username: req.body.username }, (err, succ) => {
        if (succ === null) {
          User.findOne({ username: req.body.createdBy }, (err, succ) => {
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

//------ Category and Product APIs
app.get("/dashboard/category/showCategory", (req, res) => {
  Cate.find({}, (err, succ) => {
    if (err) {
      console.log("error in finding all category");
    } else {
      res.send(succ);
    }
  });
});

app.post("/dashboard/category/addcategory", (req, res) => {
  Cate.findOne({ category: req.body.category }, (err, succ) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else if (succ !== null) {
      res.sendStatus(401);
    } else {
      Cate.insertMany({
        category: req.body.category,
      });
      res.sendStatus(200);
    }
  });
});

app.post("/dashboard/category/editcategory", (req, res) => {
  Cate.findById({ _id: req.body.id }, (err, succ) => {
    if (err) {
      res.sendStatus(401).message("ERROR finding user!!");
    } else {
      var myquery = { category: succ.category };
      var newvalues = {
        $set: { category: req.body.editedCategory },
      };
      Cate.updateMany(myquery, newvalues, (err, succ) => {
        if (err) {
          res.sendStatus(401).message("ERROR in updating user!!");
        } else {
          res.sendStatus(200);
          console.log("Updated successfuly");
        }
      });
    }
  });
});

app.post("/dashboard/category/deletecategory", async (req, res) => {
  Cate.findOneAndDelete({ category: req.body.category }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    } else {
      res.sendStatus(200);
      console.log("Deleted Successfuly");
    }
  });
});

app.get("/dashboard/product/showproduct", (req, res) => {
  Prod.find({}, (err, succ) => {
    if (err) {
      console.log("error in finding all category");
    } else {
      res.send(succ);
    }
  });
});
app.post("/dashboard/product/addproduct", upload.single("file"), (req, res) => {
  Prod.findOne({ itemname: req.body.itemname }, (err, succ) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else if (succ !== null) {
      res.sendStatus(401);
    } else {
      Prod.insertMany({
        itemname: req.body.itemname,
        category: req.body.category,
        description: req.body.description,
        image: req.body.file,
      });
      res.sendStatus(200);
    }
  });
});

app.post("/dashboard/product/editproduct", upload.single("file"), (req, res) => {
  Prod.findByIdAndUpdate({ _id: req.body.id }, { "itemname": req.body.itemname, "category": req.body.category, "description": req.body.description, "image": req.body.file }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    }
    else {
      res.sendStatus(200);
    }
  })
});

app.post("/dashboard/category/deleteproduct", (req, res) => {
  Prod.findByIdAndDelete({ _id: req.body.id }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    } else {
      res.sendStatus(200);
      console.log("Deleted Successfuly");
    }
  });
});

//------------------mennu and cart -----------------------------------

app.get("/dashboard/product/menu/showallitem", (req, res) => {
  Prod.find({}, (err, succ) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else {
      res.send(succ);
    }
  });
});


app.get("/dashbord/cart/showcartitem", (req, res) => {
  Cart.find({ userid: req.headers.myheader }, (err, succ) => {
    if (err) {
      console.log(err);
      res.sendStatus(401)
    }
    else {
      res.send(succ)
      console.log(succ);
    }
  })
});

app.post("/dashbord/cart/updatecartitem", (req, res) => {
  Cart.findOne({ productid: req.body.id }, (err, succ) => {
    if (err) {
      res.sendStatus(401);
      console.log(err);
    }
    else if (succ !== null) {
      res.sendStatus(401)
      console.log("Already in cart");
    } else {
      Cart.insertMany({
        productid: req.body.id,
        userid: req.body.userid,
        qty: 1,
      })
      res.sendStatus(200)
    }
  })
});
app.post("/dashbord/cart/deletecartitem", (req, res) => {
  Prod.findByIdAndUpdate({ _id: req.body.id }, { "isCart": false }, (err, succ) => {
    if (err) {
      console.log(err);
      res.sendStatus(401);
    } else {
      res.send(succ);
    }
  });
});


const port = 5000;
app.listen(port, () => {
  console.log(`Listening to Port ${port}`);
});

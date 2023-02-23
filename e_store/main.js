const port = 3000;

const express = require("express");
const session = require("express-session");
const multer = require('multer');
const userMethods = require("./methods/users_methods.js");
const productsMethods = require("./methods/products_methods.js");
const app = express();

const authCheck = require("./middelware/auth_check");

app.use(express.static("./public/static"));
app.use(express.static("./public/images"));
app.use(express.static("./public/uploads"));

// app.use(express.urlencoded({ "extended": true }));
app.use(express.json());

app.use(
  session({
    secret: "auth key",
    resave: false,
    saveUninitialized: true,
  })
);

app.set("view engine", "ejs");

const upload = multer({dest:'./public/uploads'})

app.route("/").get((req, res) => {
  if (req.session.is_logged_in) {
    if (req.session.is_mail_verified) res.redirect("/products");
    else res.redirect("/verifyMailFirst");
  } else {
    productsMethods.getProductsList(0, (productsList) => {
      res.render("main", {
        productsList: productsList,
      });
    });
  }
});

app.route("/get").get((req, res) => {
  userMethods.getUserList((userList) => {
    res.json(userList);
  });
});

app
  .route("/login")
  .get((req, res) => {
    res.render("auth/login");
  })
  .post((req, res) => {
    userMethods.login(req.body, function (msg) {
      if (!msg["err"]) {
        req.session.is_logged_in = true;
        req.session.is_mail_verified = true;
        req.session.email = req.body.email;
        req.session.name = msg["name"];
      }
      res.json(msg);
    });
  });

app
  .route("/signup")
  .get((req, res) => {
    res.render("auth/signup");
  })
  .post((req, res) => {
    userMethods.addUser(req.body, function (msg) {
      if (msg == "success") {
        req.session.is_logged_in = true;
        req.session.is_mail_verified = false;
        req.session.email = req.body.email;
        req.session.name = req.body.name;
      }
      res.json({ msg: msg });
    });
  });

app.get("/verifyMailFirst", (req, res) => {
  res.render("auth/email_verify", { msg: "Verify Your Emial First" });
});
app.get("/verifyMail/:token", (req, res) => {
  const { token } = req.params;
  userMethods.getUserList((userList) => {
    let index = -1;
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].token == token) {
        index = i;
        break;
      }
    }

    if (index == -1) res.render("auth/email_verify", { msg: "Invalid Token" });
    else {
      userList[index].emailVerified = true;
      req.session.is_logged_in = true;
      req.session.is_mail_verified = true;
      req.session.email = userList[index].email;
      req.session.name = userList[index].name;
      userMethods.setUserList(userList, () => {
        res.render("auth/email_verify", {
          msg: "Email Is Verified Login To Continue!!!",
        });
      });
    }
  });
});

app
  .route("/changePassword")
  .get(authCheck, (req, res) => {
    res.render("auth/change_password", { name: req.session.name });
  })
  .post((req, res) => {
    userMethods.changePassword(req.session.email, req.body.password, (msg) => {
      res.json(msg);
    });
  });

app
  .route("/forgotPassword")
  .get((req, res) => {
    res.render("auth/forgot_password");
  })
  .post((req, res) => {
    userMethods.forgotPassword(req.body.email, (msg) => {
      res.json(msg);
    });
  });

app.route("/verifyforgotPassword").get((req, res) => {
  let token = req.query.token;

  userMethods.getUserList((userList) => {
    let index = -1;
    for (let i = 0; i < userList.length; i++) {
      if (userList[i].token == token) {
        index = i;
        break;
      }
    }

    if (index == -1) res.render("auth/email_verify", { msg: "Invalid Token" });
    else {
      req.session.email = userList[index].email;
      res.render("auth/change_password", { name: userList[index].name });
    }
  });
});

app
  .route("/addProduct")
  .get((req, res) => {
    res.render("add_product");
  })
  .post(upload.single('image'),(req, res) => {
    let product ={
      id:Date.now(),
      name:req.body.name,
      description:req.body.description,
      price:req.body.price,
      stock:req.body.stock,
      image:req.file.filename
    }
    productsMethods.addProduct(product,(err,data)=>{
      if(err)
      res.json({msg:'error'});
      else
      res.json({msg:'done'});

    })
  });

app.route("/products").get(authCheck, (req, res) => {
  productsMethods.getProductsList(0, (productsList) => {
    res.render("products", {
      name: req.session.name,
      productsList: productsList,
    });
  });
});

app.post("/getMoreProducts", authCheck, (req, res) => {
  productsMethods.getProductsList(req.body.index, (productsList) => {
    res.json(productsList);
  });
});

app.post("/productDetails", authCheck, (req, res) => {
  productsMethods.getProduct(req.body.id, (product) => {
    if (product == null) {
      res.json({ err: "NO Product Found" });
    } else {
      res.json(product);
    }
  });
});

app.route("/logout").get(authCheck, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("*", (req, res) => {
  res.render("error");
});

app.listen(port, () => {
  console.log("Server Is running On  http://localhost:" + port);
});

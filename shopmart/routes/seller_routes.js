const express = require("express");
const multer = require("multer");

const authCheck = require('../middelware/auth_check')

const jsonMethods  =require('../json/methods')
const sqlMethods = require('../sql/methods')

const router = express.Router();
const dataSource = sqlMethods

const upload = multer({ dest: "./public/uploads" });


router.get("/", (req, res, next) => {
  res.render("auth/seller_signup");
});

router
  .route("/login")
  .get((req, res) => {
    res.render("auth/seller_login");
  })
  .post((req, res) => {
      let reqBody = req.body;
    let userObj = {
      email: reqBody.email,
      password: reqBody.password,
      userType:1,
    };
    dataSource.auth.login(userObj, function (msg) {
      if (!msg["err"]) {
        req.session.is_logged_in = true;
        req.session.is_mail_verified = true;
        req.session.email = userObj.email;
        req.session.name = msg["data"]["name"];
        req.session.uid = msg["data"]["uid"];
      }
      res.json(msg);
    });
  });

router
  .route("/signup")
  .get((req, res) => {
    res.render("auth/seller_signup");
  })
  .post((req, res) => {
    let reqBody = req.body;
    
    let userObj = {
      name:reqBody.name,
      email: reqBody.email,
      mobile:reqBody.mobile,
      password: reqBody.password,
      address:JSON.stringify(reqBody.address),
      userType:1,
      token :Date.now() 
    }
    dataSource.auth.signup(userObj, function (msg) {

      if (msg['data'] == "done") {
        req.session.is_logged_in = true;
        req.session.is_mail_verified = false;
        req.session.email = req.body.email;
        req.session.name = req.body.name;
      }
      res.json(msg);
    });
  });

  router
  .route("/addProduct")
  .get((req, res) => {
    res.render("seller/add_product",{name:req.session.name});
  })
  .post(upload.single("image"), (req, res) => {
    console.log('ddferf')
    let product = {
      id: Date.now(),
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      image: req.file.filename,
      uid:req.session.uid,
    };
    dataSource.product.addProduct(product, (msg) => {
      res.json(msg)
    });
  });

module.exports = router;

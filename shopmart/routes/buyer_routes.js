const express = require("express");

const authCheck = require("../middelware/auth_check");

const jsonMethods = require("../json/methods");
const sqlMethods = require("../sql/methods");

const router = express.Router();
const dataSource = sqlMethods;

router.route("/").get((req, res) => {
  if (req.session.is_logged_in) {
    if (req.session.is_mail_verified) res.render("buyer/products",{name:req.session.name});
    else res.redirect("/verifyMailFirst");
  } else {
    res.render("main", {
      productsList: [],
    });
  }
});

router.route("/get").get((req, res) => {
  dataSource.user.getUserList((userList) => {
    res.json(userList);
  });
});

router
  .route("/login")
  .get((req, res) => {
    res.render("auth/login");
  })
  .post((req, res) => {
    let reqBody = req.body;
    let userObj = {
      email: reqBody.email,
      password: reqBody.password,
      address: JSON.stringify({ address: [] }),
      userType: 2,
    };
    dataSource.auth.login(userObj, function (msg) {
      if (!msg["err"]) {
        req.session.is_logged_in = true;
        req.session.is_mail_verified = true;
        req.session.email = userObj.email;
        req.session.name =msg['data']['name'];
        req.session.uid = msg['data']['uid']
      }
      res.json(msg);
    });
  });

router
  .route("/signup")
  .get((req, res) => {
    res.render("auth/signup");
  })
  .post((req, res) => {
    let reqBody = req.body;
    let userObj = {
      name: reqBody.name,
      email: reqBody.email,
      mobile: reqBody.mobile,
      password: reqBody.password,
      address: {},
      userType: 2,
      token: Date.now(),
    };
    dataSource.auth.signup(userObj, function (msg) {
      if (msg["data"] == "done") {
        req.session.is_logged_in = true;
        req.session.is_mail_verified = false;
        req.session.email = req.body.email;
        req.session.name = req.body.name;
      }
      res.json(msg);
    });
  });

router.get("/verifyMailFirst", (req, res) => {
  res.render("auth/email_verify", { msg: "Verify Your Emial First" });
});
router.get("/verifyMail/:token", (req, res) => {
  const { token } = req.params;
  dataSource.user.getUserList((userList) => {
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
      dataSource.user.setUserList(userList, () => {
        res.render("auth/email_verify", {
          msg: "Email Is Verified Login To Continue!!!",
        });
      });
    }
  });
});

router
  .route("/changePassword")
  .get(authCheck, (req, res) => {
    res.render("auth/change_password", { name: req.session.name });
  })
  .post((req, res) => {
    dataSource.auth.changePassword(
      req.session.email,
      req.body.password,
      (msg) => {
        res.json(msg);
      }
    );
  });

router
  .route("/forgotPassword")
  .get((req, res) => {
    res.render("auth/forgot_password");
  })
  .post((req, res) => {
    dataSource.user.forgotPassword(req.body.email, (msg) => {
      res.json(msg);
    });
  });

router.route("/verifyforgotPassword").get((req, res) => {
  let token = req.query.token;

  dataSource.user.getUserList((userList) => {
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

router.route("/products").get(authCheck,(req, res) => {
  console.log(req.session)
  res.render("buyer/products" ,{name:req.session.name});

});

router.route("/cart").get((req,res)=>{
  dataSource.user.getCartList(req.session.uid,(msg)=>{
    let cartList=[];
      if(!msg['err'])
      {
        cartList=msg['data'];
      }
    res.render("buyer/cart" ,{name:req.session.name,cartList:cartList});
  })
})

router.route("/addToCart").post((req,res)=>{
 const uid = req.session.uid;
 const pid = req.body.id;
  dataSource.user.addToCart(uid,pid,(msg)=>{
    res.json(msg);
  })
})

router.route("/removeFromCart").post((req,res)=>{
  const uid =  req.session.uid;
  const pid = req.body.id;
   dataSource.user.removeFromCart(uid,pid,(msg)=>{
     res.json(msg);
   })
 })
 


router.route("/logout").get(authCheck, (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
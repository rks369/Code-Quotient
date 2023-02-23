const express = require("express");
const session = require("express-session");
const fs = require("fs");
const app = express();
const port = 3000;

app.use(express.static("./public/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: "auth key",
    resave: false,
    saveUninitialized: true,
  })
);

app.route("/").get(function (req, res) {
  console.log(req.session.is_logged_in);
  if (req.session.is_logged_in) {
    res.redirect("/myAccount");
  }
  res.sendFile(__dirname + "/public/screens/index.html");
});

app.route("/home").get(function (req, res) {
  res.sendFile(__dirname + "/public/screens/index.html");
});

app.get("/getUsres", function (req, res) {
  getUserList(function (userList) {
    res.json(userList);
  });
});

app
  .route("/login")
  .get(function (req, res) {
    res.sendFile(__dirname + "/public/screens/login.html");
  })
  .post(function (req, res) {
    console.log(req.body);
    res.json(req.body);
  });

app
  .route("/signup")
  .get(function (req, res) {
    res.sendFile(__dirname + "/public/screens/sign_up.html");
  })
  .post(function (req, res) {
    addUser(req.body, function (msg) {
      if (msg == "success") {
        req.session.is_logged_in = true;
      }
      res.json({ msg: msg });
    });
  });

app.route("/myAccount").get(function (req, res) {

    console.log(req.session.is_logged_in);
  if (req.session.is_logged_in) {
    res.sendFile(__dirname + "/public/screens/my_account.html");
  } else {
    res.sendFile(__dirname + "/public/screens/index.html");
  }
});

app.route("/logout").get(function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

function addUser(user, callback) {
  getUser(user.email, function (isUser) {
    if (isUser == null) {
      getUserList(function (userList) {
        userList.push(user);
        setUserList(userList);
        callback("success");
      });
    } else {
      callback("userexist");
    }
  });
}

function getUserList(callback) {
  fs.readFile("./users.json", "utf-8", function (err, data) {
    let userList;
    if (data.length == 0) {
      userList = [];
    } else {
      userList = JSON.parse(data);
    }
    callback(userList);
  });
}

function setUserList(userList) {
  fs.writeFile(
    "./users.json",
    JSON.stringify(userList),
    function (err, data) {}
  );
}

function getUser(email, callback) {
  getUserList(function (userList) {
    let index = -1;
    for (var i = 0; i < userList.length; i++) {
      if (userList[i].email == email) {
        index = i;
      }
    }
    if (index == -1) {
      callback(null);
    } else {
      callback(userList[index]);
    }
  });
}

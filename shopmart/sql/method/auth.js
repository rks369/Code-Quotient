const sql = require("../sql_config");
const sendMail = require("../../utils/send_mail");

const auth = {
  signup: async (user, callback) => {
    const is_user = await sql.executeQuery(
      `SELECT * FROM users WHERE email = '${user.email}' OR mobile = '${user.mobile} ';`
    );

    try {
      if (is_user.length == 0) {
        sendMail(
          user.name,
          user.email,
          "Verify Your Email",
          "Click The Link Below To Verify Your Mail",
          `<h1>Verify</h1><a href="http://localhost:3000/verifyEmail?token=${user.token} ">Verify Email</a>`,
          async (err, data) => {
            console.log("dwedfew", err, data);
            console.log(err, data);
            // if (err) {
            //   callback({ err: "Error With Email" });
            // } else
             {
              let q = `INSERT INTO users VALUES('${user.name}','${user.email}','${user.mobile}','${user.password}','${user.address}','${user.token}','${user.userType}','0');`;
              const result = await sql.executeQuery(q);

              callback({ data: "done" });
            }
          }
        );
      } else {
        if (is_user[0].email == user.email)
          callback({ err: "Email Already Exits!!!" });
        else callback({ err: "Mobile Already Exits!!!" });
      }
    } catch (err) {
      callback({ err: err });
    }
  },
  login: async (user, callback) => {
    const is_user = await sql.executeQuery(
      `SELECT * FROM users WHERE email = '${user.email}' AND role = ${user.userType};`
    );

    try {
      if (is_user.length == 0) callback({ err: "No User Exits" });
      else {
        if (is_user[0].password == user.password)
          callback({ data: is_user[0] });
        else callback({ err: "Credential Does Not Match !!!" });
      }
    } catch (err) {
      callback({ err: err });
    }
  },
  changePassword: async (email,password,callback) => {
    console.log(email,password);
    try{
      const result = await sql.executeQuery(`UPDATE users SET password='${password}' WHERE email = '${email}' `);
      callback({msg:"Done"})
    }catch(err)
    {console.log(err)
      callback({err:err});
    }
  },
  forgotPassword: () => {},
};

module.exports = auth;

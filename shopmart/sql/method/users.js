const fs = require("fs");
const sendMail = require("../../utils/send_mail");

const sql = require("../sql_config");

usersMethods = {
  getUserList: async (callback) => {
    const users = await sql.executeQuery("SELECT * FROM users;");
    callback(users);
  },
  getCartList: async (uid, callback) => {
    try {
      const cartList = await sql.executeQuery(
        `SELECT * FROM cart,products WHERE user_id='${uid}' AND cart.product_id = products.pid`
      );
      callback({ data: cartList });
    } catch (err) {
      callback({ err: err });
    }
  },
  addToCart: async (user_id, product_id, callback) => {
    try {
      const cart = await sql.executeQuery(
        `SELECT * FROM cart WHERE product_id= '${product_id}' AND user_id='${user_id}' `
      );

      if (cart.length == 0) {
        const result = await sql.executeQuery(
          `INSERT INTO cart VALUES('${user_id}','${product_id}','1')`
        );
        try {
          callback({ data: "Done" });
        } catch (err) {
          callback({ err: "Something Went Wrong !!!" });
        }
      } else {
        const result = await sql.executeQuery(
          `UPDATE cart SET quantity = '${
            cart[0].quantity + 1
          }' WHERE   product_id= '${product_id}' AND user_id='${user_id}'     `
        );
        callback({ data: "Done" });
      }
    } catch (err) {
      callback({ err: "Something Went Wrong !!!" });
    }
  },
  removeFromCart: async (user_id, product_id, callback) => {
    try {


      const cart = await sql.executeQuery(
        `SELECT * FROM cart WHERE product_id= '${product_id}' AND user_id='${user_id}' `
      );
        console.log(cart[0].quantity);
      if (cart[0].quantity != 1) {
        const result = await sql.executeQuery(
          `UPDATE cart SET quantity = '${
            cart[0].quantity - 1
          }' WHERE   product_id= '${product_id}' AND user_id='${user_id}'     `
        );
        callback({ data: "Done" });
      }else
      {

        const result = await sql.executeQuery(
          `DELETE  FROM cart WHERE product_id= '${product_id}' AND user_id='${user_id}'`
        );

        callback({ data: "Done" });
      }

    } catch (err) {
      callback({ err: "Something Went Wrong !!!" });
    }
  },
};

module.exports = usersMethods;

const { db } = require("../sql/database");

const sender = async (sql, data, feed) => {
  await db(sql, data, (err) => (err ? feed(err, false) : feed(err, true)));
};

exports.activeQueries = async (query, pd, pq, req, feed) => {
  try {
    let ud = req.session.passport ? req.session.passport.user : null;
    let sd = req.sessionID ? req.sessionID : null;
    if (query === "select") {
      req.session.checked ? req.session.checked = false : req.session.checked = true;
      sql = ud
        ? `UPDATE cart SET checked = ${req.session.checked} WHERE user_id = ${ud}`
        : `UPDATE cart SET checked = ${req.session.checked} WHERE session_id = "${sd}"`;
      return sender(sql, null, feed);
    } else {
      sql = ud
        ? `SELECT * FROM cart WHERE user_id = ${ud} AND product_id = ${pd}`
        : `SELECT * FROM cart WHERE session_id = "${sd}" AND product_id = ${pd}`;
      await db(sql, null, async (err, product) => {
        if (query == "insert" && product.length == 0) {
          sql = "INSERT INTO cart SET?";
          let data = {
            user_id: ud,
            session_id: sd,
            product_id: pd,
            product_qty: pq,
          };
          return sender(sql, data, feed);
        } else if (query === "delete") {
          sql = ud
            ? `DELETE FROM cart WHERE product_id = ${pd} AND user_id = ${ud}`
            : `DELETE FROM cart WHERE product_id = ${pd} AND session_id = "${sd}"`;
          return sender(sql, null, feed);
        } else if (query === "check") {
          let checked = product[0].checked ? false : true;
          sql = ud
            ? `UPDATE cart SET checked = ${checked} WHERE user_id = ${ud} AND product_id = ${pd}`
            : `UPDATE cart SET checked = ${checked} WHERE session_id = "${sd}" AND product_id = ${pd}`;
          return sender(sql, null, feed);
        } else if (query === "remove" || (query === "add" && product)) {
          let productQty =
            query === "remove"
              ? product[0].product_qty - 1
              : product[0].product_qty + 1;
          sql = ud
            ? `UPDATE cart SET product_qty = ${productQty} WHERE user_id = ${ud} AND product_id = ${pd}`
            : `UPDATE cart SET product_qty = ${productQty} WHERE session_id = "${sd}" AND product_id = ${pd}`;
          return sender(sql, null, feed);
        } else {
          console.log("pro", err);
          return feed(null, false);
        }
      });
    }
  } catch (err) {
    console.log("try", err);
  }
};

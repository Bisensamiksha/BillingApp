const sql = require("./db.js");


const Bill = function(bill) {
  this.code = bill.code;
  this.name = bill.name;
  this.category = bill.category;
  this.description = bill.description;
  this.price = bill.price;
  this.qty = bill.qty;
  this.total = bill.total;
};


Bill.findById = (code, result) => {
  sql.query(`SELECT * FROM bill WHERE code = ${code}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found product: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found account with the mobile no
    result({ kind: "not_found" }, null);
  });
};


Bill.updateById = (code, bill, result) => {
  sql.query(
    "UPDATE bill SET name = ?, category = ?, description = ?, price = ?, qty = ?, total = (qty * price) WHERE code = ?",
    [bill.name, bill.category, bill.description, bill.price, bill.qty, code],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found product with the code
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated bill: ", { code: code, ...bill });
      result(null, { code: code, ...bill });
    }
  );
};


module.exports = Bill;

const Bill = require("../models/bill.model.js");


// Find a single product with a code
exports.findOne = (req, res) => {
  Bill.findById(req.params.code, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found product with id ${req.params.code}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving product with code " + req.params.code
        });
      }
    } else res.send(data);
  });
};

// Update bill 
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Bill.updateById(
    req.params.code,
    new Bill(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found product with code ${req.params.code}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating product with code " + req.params.code
          });
        }
      } else res.send(data);
    }
  );
};

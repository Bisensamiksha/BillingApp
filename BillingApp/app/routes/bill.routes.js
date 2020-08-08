module.exports = app => {
  const bill = require("../controllers/bill.controller.js");

  // Retrieve a single Customer with customerId
  app.get("/bill/:code", bill.findOne);

  // Update a Customer with customerId
  app.put("/bill/:code", bill.update);

};

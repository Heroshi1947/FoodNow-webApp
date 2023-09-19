const express = require("express");
const router = express.Router();
const Order = require("../models/Orders");

router.post("/orderData", async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });

  //if email not exisitng in db then create: else: InsertMany()
  let eId = await Order.findOne({ email: req.body.email });
  console.log(eId);
  // below code implements if user Email is not in order history means its user's first order
  if (eId === null) {
    try {
      await Order.create({ email: req.body.email, order_data: [data] }).then(
        () => {
          res.json({ success: true });
        }
      );
    } catch (error) {
      console.log(error.message);
      res.send("Server Error", error.message);
    }
  }

  // below code runs if user has order history this code will update the order data
  else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      res.send("Server Error", error.message);
    }
  }
});

module.exports = router;

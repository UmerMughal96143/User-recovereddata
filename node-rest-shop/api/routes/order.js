const express = require('express');

const router = express.Router();

router.get('/',(req ,res, next) => {
    res.status(200).json({
        message : 'Orders were fetched'
    })
})
router.post("/", (req, res, next) => {
    const order ={
        orderId : req.body.orderId ,
        quantity : req.body.quantity
    }
  res.status(201).json({
    message: "Orders Details",
    order : order
  });
});
router.get("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Orders were fetched", orderId : req.params.orderId
  });
});
router.delete("/:orderId", (req, res, next) => {
  res.status(200).json({
    message: "Orders delteed",
    orderId: req.params.orderId,
  });
});



module.exports=router ; 
const Product = require("../modal/product"); 
const mongoose = require("mongoose");


exports.products_get_all = (req, res, next) => {
  Product.find()
    .select("productImage name price _id")
    .populate("products", "name")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        products: docs.map((doc) => {
          return {
            name: doc.name,
            price: doc.price,
            _id: doc._id,
            productImage: doc.productImage,
            request: {
              type: "GET",
              url: "http://localhost:4000/product/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        err: err,
      });
    });
};


exports.create_product = (req, res, next) => {
  console.log(req.file);
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage : req.file.path
  });

  product
    .save()
    .then((result) => {
    //   console.log(result);
      res.status(201).json({
        message: " Handling POST requests to /products",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          requested: {
            type: "GET",
            url: "http://localhost:4000/product/" + result._id,
          },
        },
      });
      return;
    })
    .catch((err) => console.log(err));
}
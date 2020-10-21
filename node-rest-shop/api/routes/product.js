const express= require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const productController = require('../controllers/product');
const checkAuth = require('../modal/middleware/check-auth');

const storagee = multer.diskStorage({
    destination : function(req,file ,cb){
        const path = require(`path`)

        console.log(path.resolve("./uploads/"));
        cb(null , './uploads/')
    } ,
    filename : function(req , file , cb){
        // console.log(new Date().toISOString() + file.originalname + ".jpg");
        cb(null ,file.originalname)
    }
})
const upload =multer({storage: storagee  , limits : {
    fileSize : 1024 * 1024* 5
}})

const Product = require('../modal/product'); 

router.get("/", productController.products_get_all);

router.post(
  "/",
  checkAuth,
  upload.single("productImage"),
  productController.create_product
);

router.get('/:productId' , (req , res ,next) => {
    const id = req.params.productId ;
    Product.findById(id)
      .select("name price _id productImage")
      .exec()
      .then((doc) => {
        console.log(doc);
        res.status(200).json({
          product: doc,
          requested: {
            type: "GET",
            description: "THIS_IS_GET_DATA",
            url: "http://localhost:4000/product/",
          },
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    
})
router.patch('/:productId',checkAuth, (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {} ;
    for(const ops of req.body){
        updateOps[ops.propName] =ops.value ;
    }
    Product.update({_id:id} , {$set: updateOps}).exec().then(result => {
        console.log(result)
        res.status(200).json(result);
    }).catch(err => {
        console.log(err); 
        res.status(500).json({
            error : err
        })
    })
});

router.delete("/:productId",checkAuth, (req, res, next) => {
 const id = req.params.productId ;
 Product.remove({_id : id }).exec().then(result => {
     res.status(200).json(result);
 }).catch(err => {
     res.status(500).json({
         error : 'Erorrrrrrrrrr'
     })
 })
});
module.exports = router ;
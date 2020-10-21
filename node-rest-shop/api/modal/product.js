const mongodb = require('mongoose');
const productSchema = mongodb.Schema({
    _id : mongodb.Schema.Types.ObjectId ,
    name : String ,
    price : {type : Number , required : true} ,
    productImage : {type : String , required : true}
})

module.exports = mongodb.model('Product' , productSchema);
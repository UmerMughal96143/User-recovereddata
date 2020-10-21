const {validationResult} = require('express-validator');
const Post = require('../models/post');



exports.getPosts = (req , res, next) => {
    Post.find()
    .then(posts => {
        res.status(200).json({message : 'Fetched Posts Successfully' , posts : posts})
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
   
}


exports.createPosts = (req , res , next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      const error = new Error('Validation failed, Entered data is incorrect');
      error.statusCode = 422 ;
      throw error;
    }
    if (!req.file) {
      const error = new Error("No image provided.");
      error.statusCode = 422;
      throw error;
    }
    const imageUrl = req.file.path;
    const title = req.body.title ;
    const content = req.body.content;

    const post  = new Post({
        title : title ,
        content : content ,
        imageUrl : imageUrl,
        creator : {name : 'Umer Mughal'},
        
    })
    post.save()
    .then(result => {
        res.status(201).json({
            post : result ,
            message : "Post Created Successfully"
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500 ;

        }
        next(err);
    })
    
}

exports.getSinglePost = (req , res , next) => {

    const postId = req.params.postId ;

    Post.findById(postId)
    .then(post => {
        if(!post){
            const error = new Error('Couldnt find post');
            error.statusCode = 404 ;
            throw error ;
        }
        res.status(200).json({
            message : 'Post Fetched' ,
            post  : post 
        })
    })
    .catch(err => {
        if (!err.statusCode) {
          err.statusCode = 500;
        }
        next(err);
    })
}
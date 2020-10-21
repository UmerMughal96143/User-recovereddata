const express = require('express');

const {body} = require('express-validator');

const router = express.Router();

const feeController = require('../controllers/feed');



router.get('/posts' , feeController.getPosts);
router.post("/post", [
    body('title').trim()
    .isLength({min : 7}),
    body('content').trim()
    .isLength({min : 5})
    
], feeController.createPosts);


router.get("/post/:postId", feeController.getSinglePost);

// router.post('/post/:postId' , feeController.updatePost)



module.exports = router ;
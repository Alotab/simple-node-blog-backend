const express = require('express');
const {fetchAllBlogs, addBlog} = require('../controllers/blog-controllers');
const authMiddleware = require('../middleware/auth-middleware')
// Create express router
const router = express.Router()



// all routes that are related to Blog only
router.get('/get', fetchAllBlogs);
router.post('/add', authMiddleware, addBlog);


module.exports = router;
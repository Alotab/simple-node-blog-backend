const express = require('express');
const {fetchAllBlogs, addBlog, getBlogById, updateBlog, deleteBlog } = require('../controllers/blog-controllers');
const authMiddleware = require('../middleware/auth-middleware')
// Create express router
const router = express.Router()



// all routes that are related to Blog only
router.get('/get', fetchAllBlogs);
router.post('/add', authMiddleware, addBlog);
router.get('/get/:id', getBlogById);
router.put('/update-blog/:id', authMiddleware, updateBlog);
router.delete('/delete/:id', authMiddleware, deleteBlog);


module.exports = router;
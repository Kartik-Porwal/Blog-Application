const express = require('express');
const upload = require('../middleware/fileUpload');
const router = express.Router();
const { getAllBlogs, addBlog, updateBlog , getById, deleteBlog, getByUserId} = require('../controllers/Blog.controller');

router.get('/', getAllBlogs)
router.post('/add', upload.single('image'), addBlog)
router.put('/update/:id', upload.single('image'), updateBlog)
router.get('/:id', getById)
router.delete('/:id', deleteBlog)
router.get('/user/:id', getByUserId)






module.exports = router
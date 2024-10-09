const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/post_controller');

router.get('/create', post_controller.createPost)

router.get('/:id', post_controller.getPostById)

router.get('/all', post_controller.allPosts)

router.get('/', post_controller.getDate)

module.exports = router;
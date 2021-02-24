// review route
const express = require('express');
const router = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const Review = require('../models/review');
const Campground = require('../models/campground');
const { isloggedIn, validateReview } = require('../middleware');

//controllers
const reviews = require('../controllers/reviews')


router.post('/', isloggedIn, validateReview, catchAsync(reviews.createReview))


// Delete comments
router.delete('/:reviewId', isloggedIn, catchAsync(reviews.deleteReview))

module.exports = router;

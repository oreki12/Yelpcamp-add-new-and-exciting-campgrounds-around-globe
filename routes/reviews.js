const express = require('express');
const router = express.Router({ mergeParams: true });
const reviews = require('../controllers/reviews')
const {isLoggedIn, validateReview, isReviewAuthor} = require('../middleware')
const catchAsync = require('../utils/catchAsync');

// all reviews code moved to controllers

router.post('/',isLoggedIn, validateReview, catchAsync(reviews.createReview))

router.delete('/:reviewId',isLoggedIn,catchAsync(reviews.updateReview))

module.exports = router;
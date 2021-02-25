const express = require('express');
const router = express.Router();
const User = require('../models/user');
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const users = require('../controllers/users')

// all users code moved to controllers
router.route('/register')
    .get(users.renderRegisterForm)
    .post( catchAsync(users.register))

// router.get('/register', users.renderRegisterForm)

// router.post('/register', catchAsync(users.register))

router.route('/login')
    .get( users.renderLoginForm)
    .post(passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), users.login)

// router.get('/login', users.renderLoginForm)

// router.post('/login',passport.authenticate('local', {failureFlash:true, failureRedirect:'/login'}), users.login)

router.get('/logout', users.logout)


module.exports = router;

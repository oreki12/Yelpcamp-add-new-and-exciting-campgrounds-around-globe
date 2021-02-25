const User = require('../models/user');


module.exports.renderRegisterForm = (req, res) => {
    res.render('users/register')
}

module.exports.register = async(req, res, next) => {
    // res.send(req.body)
    try{
    const{ username, email, password} = req.body;
    const user = new User({ email, username});
    const registeredUser = await User.register(user, password);
    // console.log(registeredUser);
    req.login(registeredUser, err => {
        if(err) return next(err);
        req.flash('success','Welcome to Yelpcamp');
        res.redirect('/campgrounds')
    })   
    } catch(e){
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login')
}

module.exports.login = (req, res) => {
    req.flash('success','welcome back');
    const redirectUrl = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo;
    res.redirect(redirectUrl )
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'goodbye!')
    res.redirect('/campgrounds');
}
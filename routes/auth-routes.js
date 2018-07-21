const router = require('express').Router();
const passport = require('passport');

//auth login

router.get('/login',(r,s)=>{
    s.render('login',{user: r.user});
});

//auth with google
router.get('/google',passport.authenticate('google',{
    scope: ['profile']
}))

//callback route to google
router.get(
    '/google/redirect',
    passport.authenticate('google'),
    (r,s)=>{
        // s.send(r.user)
        s.redirect('/profile');
})
//logour\
router.get('/logout',(r,s)=>{
    r.logout();
    s.redirect('/');
});

module.exports = router;
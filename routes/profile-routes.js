const router = require('express').Router();
const authCheck  = (r,s,n)=>{
    if(!r.user){
        s.redirect('/auth/login')
    }else{
        n();
    }
}
router.get('/',authCheck,(r,s)=>{
    s.render(
        'profile',
        {user : r.user}
    );
})

module.exports = router
let main = (req,res,next)=>{
    console.log(req.session);
    res.render('index.html',{
        user_id:req.session.uid,
        isLogin:req.session.isLogin // True
    });
}

module.exports.dd = main; // (뒤에가 함수)
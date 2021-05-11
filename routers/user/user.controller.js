
const {User} = require('../../models/index');

let join = async (req,res) => {
    //console.log(img);
    res.render('./user/join.html')
}

let login = (req,res,next) => {
    let flag = req.query.flag;
    res.render('./user/login.html',{flag});
}

let info = async (req,res,next) => {
    //, 'userdt']
    let userlist = await User.findAll({});
    res.render('./user/info.html',{
        userList: userlist,
    })
}

let join_success = async (req,res,next) =>{
    let user_id = req.body.user_id;
    let user_pw = req.body.user_pw;
    let user_name = req.body.user_name;
    let gender = req.body.gender;
    let userimage = req.file === undefined ? '' : req.file.path; // req.file -> Object , 이미지 하나에 대해서 처리

    try{
        let rst = await User.create({ user_id, user_pw, user_name, gender, userimage})
    } catch (e) {
        console.log(e);
    }
    res.render('./user/join_success.html',{ user_id, user_name });
}

let login_check = async (req,res) =>{
    let user_id = req.body.user_id;
    let user_pw = req.body.user_pw;
    try{
        let result = await User.findOne({
            where:{ user_id,user_pw }
        })
        if(result.dataValues.user_id == user_id){
            req.session.uid = user_id;
            req.session.isLogin = true;

            req.session.save(()=>{
                res.redirect('/');
            })
        }
    } catch(e){
        res.redirect('/user/login?flag=0');
    }
}

let logout = (req,res)=>{
    delete req.session.isLogin;
    delete req.session.uid;

    req.session.save(()=>{
        res.redirect('/');
    })
}

module.exports = {
    join:join,
    login:login,
    info:info,
    join_success:join_success,
    login_check:login_check,
    logout,
}

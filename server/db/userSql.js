const User = {
    // 查询账号
    queryUserTel(option) {
        return 'select * from user where tel = ' + option.userTel + '';
    },
    // 查询密码
    queryUserPwd(option) {
        return 'select * from user where (tel = ' + option.userTel + ') and pwd = ' + option.userPwd + '';
    },
    inserData(option) {
        let userTel = option.userTel
        let userPwd = option.userPwd || "111111"

        // 引入token包
        let jwt = require('jsonwebtoken')
        // 用户信息 
        let payload = { tel: userTel }
        // 口令
        let secret = 'zaizai'
        // 生成token
        let token = jwt.sign(payload, secret, {
            expiresIn: 60
        })

        return 'insert into user (`tel`,`pwd`,`avatar`,`nickname`,`token`) values ("' + userTel + '","' + userPwd + '","/images/user1.jpg","张楚岚","' + token + '")';
    }
}

exports = module.exports = User
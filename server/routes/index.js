var express = require('express');
var router = express.Router();
var connection = require('../db/sql')
var user = require('../db/userSql');

const cors = require('cors')
router.use(cors())

// 对接 sdk (手机验证码)
var QcloudSms = require("qcloudsms_js");

// 引入支付宝沙箱配置文件
const alipaySdk = require('../db/alipay')
const AlipayFormData = require('alipay-sdk/lib/form').default

// 引入token包
let jwt = require('jsonwebtoken');

// 引入axios
let axios = require('axios')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

// token 过期时间
function getTokenTime(exp) {
  let getTime = parseInt(new Date().getTime() / 1000)
  if (getTime - exp > 60) {
    return true
  }
}

// 首页 推荐
router.get('/api/index_list/0/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      topBar: [
        { id: 0, label: "推荐" },
        { id: 1, label: "大红袍" },
        { id: 2, label: "铁观音" },
        { id: 3, label: "绿茶" },
        { id: 4, label: "普洱" },
        { id: 5, label: "花茶" },
        { id: 6, label: "茶具" },
      ],
      data: [
        // swiper
        {
          id: 0,
          type: 'swiperList',
          data: [
            { id: 1, imgUrl: "/images/swiper1.jpeg", },
            { id: 2, imgUrl: "/images/swiper2.jpeg", },
            { id: 3, imgUrl: "/images/swiper3.jpeg", }
          ]
        },
        // icon
        {
          id: 1,
          type: 'iconList',
          data: [
            {
              id: 1,
              title: "自饮茶",
              imgUrl: "/images/icons1.png",
            },
            {
              id: 2,
              title: "品牌茶",
              imgUrl: "/images/icons2.png",
            },
            {
              id: 3,
              title: "茶具",
              imgUrl: "/images/icons3.png",
            },
            {
              id: 4,
              title: "领福利",
              imgUrl: "/images/icons4.png",
            },
            {
              id: 5,
              title: "官方验证",
              imgUrl: "/images/icons5.png",
            },
          ]
        },
        // 火爆推荐
        {
          id: 2,
          type: 'recommendList',
          data: [
            {
              id: 11,
              name: "龙井2號250g",
              content: "滋味鲜爽甘醇",
              price: "68",
              imgUrl: "/images/recommend1.jpeg",
            },
            {
              id: 22,
              name: "铁观音2號250g",
              content: "核心产区滋味正 ",
              price: "98",
              imgUrl: "/images/recommend2.jpeg",
            },
            {
              id: 33,
              name: "黑檀镂空六君子",
              content: "给生活一点精致的仪式感",
              price: "55",
              imgUrl: "/images/recommend3.jpeg",
            },
          ]
        },
        // 猜你喜欢
        {
          id: 3,
          type: 'likeList',
          data: [
            {
              id: 1,
              imgurl: "/images/like1.jpeg",
              name: "武夷山灰芽花香金骏眉3号",
              price: 399,
            },
            {
              id: 2,
              imgurl: "/images/like2.jpeg",
              name: "2023春茶明前龙井飞花",
              price: 99,
            },
            {
              id: 3,
              imgurl: "/images/like3.jpeg",
              name: "消青工艺浓香铁观音1号",
              price: 128,
            },
            {
              id: 4,
              imgurl: "/images/like4.jpeg",
              name: "云南凤庆高海拔古树滇红",
              price: 68,
            },
            {
              id: 5,
              imgurl: "/images/like5.jpeg",
              name: "雨前珍稀白茶1号",
              price: 68,
            },
            {
              id: 6,
              imgurl: "/images/like6.jpeg",
              name: "2022春茶明前龙井飞花",
              price: 128,
            },
            {
              id: 7,
              imgurl: "/images/like7.jpeg",
              name: "消青工艺浓香铁观音1号",
              price: 128,
            },
            {
              id: 8,
              imgurl: "/images/like8.jpeg",
              name: "2017寿宁高山枣香老贡眉",
              price: 118,
            },
            {
              id: 9,
              imgurl: "/images/like9.jpeg",
              name: "新会小青柑普洱铁罐装",
              price: 168,
            },
            {
              id: 10,
              imgurl: "/images/like10.jpeg",
              name: "2016南糯山古树普洱生茶",
              price: 98,
            },
          ]
        },
      ]
    }
  })
});

// 首页 大红袍
router.get('/api/index_list/1/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 0,
        type: 'dhpList',
        data: [
          {
            id: 1,
            imgUrl: "/images/dhp1.jpeg",
          },
          {
            id: 2,
            imgUrl: '/images/dhp2.jpeg'
          },
          {
            id: 3,
            imgUrl: '/images/dhp3.jpeg'
          },
          {
            id: 4,
            imgUrl: '/images/dhp4.jpeg'
          },
          {
            id: 5,
            imgUrl: '/images/dhp5.jpeg'
          },
          {
            id: 6,
            imgUrl: '/images/dhp6.jpeg'
          },
          {
            id: 7,
            imgUrl: '/images/dhp7.jpeg'
          },
        ]
      },
    ]
  })
});

// 首页 铁观音
router.get('/api/index_list/2/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 0,
        type: 'tgyList',
        data: [
          {
            id: 1,
            imgUrl: "./images/tgy1.jpeg",
          },
          {
            id: 2,
            imgUrl: './images/tgy2.jpeg'
          },
        ]
      },
      // icon
      {
        id: 1,
        type: 'iconList',
        data: [
          {
            id: 1,
            title: "自饮茶",
            imgUrl: "./images/icons1.png",
          },
          {
            id: 2,
            title: "品牌茶",
            imgUrl: "./images/icons2.png",
          },
          {
            id: 3,
            title: "茶具",
            imgUrl: "./images/icons3.png",
          },
          {
            id: 4,
            title: "领福利",
            imgUrl: "./images/icons4.png",
          },
          {
            id: 5,
            title: "官方验证",
            imgUrl: "./images/icons5.png",
          },
        ]
      },
      // 猜你喜欢
      {
        id: 1,
        type: 'likeList',
        data: [
          {
            id: 1,
            imgurl: "./images/like1.jpeg",
            name: "武夷山灰芽花香金骏眉3号",
            price: 399,
          },
          {
            id: 2,
            imgurl: "./images/like2.jpeg",
            name: "2023春茶明前龙井飞花,2023春茶明前龙井飞花",
            price: 99,
          },
          {
            id: 3,
            imgurl: "./images/like3.jpeg",
            name: "消青工艺浓香铁观音1号",
            price: 128,
          },
          {
            id: 4,
            imgurl: "./images/like4.jpeg",
            name: "云南凤庆高海拔古树滇红",
            price: 68,
          },
        ]
      },
    ]
  })
});

// 搜索
router.get('/api/goods/storeList', function (req, res, next) {
  // 接收前端传递过来要搜索的数据
  let [searchName, orderName] = Object.keys(req.query)
  // 接收前端传递过来要排序的数据
  let [name, order] = Object.values(req.query)

  connection.query('select * from good_list where name like "%' + name + '%" order by ' + orderName + ' ' + order + ' ', function (error, results) {
    if (error) throw error
    res.send({
      code: 0,
      data: results
    })
  })
});

// 分类数据
router.get('/api/list/getList', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      // 第一项
      {
        // 一级
        id: 0,
        name: "推荐",
        data: [
          {
            // 二级
            id: 0,
            name: '推荐',
            list: [
              // 三级
              {
                id: 0,
                name: '紫砂壶',
                imgUrl: "/images/list1.jpeg"
              },
              {
                id: 1,
                name: '铁观音',
                imgUrl: "/images/list2.jpeg"
              },
              {
                id: 2,
                name: '金骏眉',
                imgUrl: "/images/list3.jpeg"
              },
              {
                id: 3,
                name: '武夷岩茶',
                imgUrl: "/images/list4.jpeg"
              },
              {
                id: 4,
                name: '龙井',
                imgUrl: "/images/list5.jpeg"
              },
              {
                id: 5,
                name: '云南滇红',
                imgUrl: "/images/list6.jpeg"
              },
              {
                id: 6,
                name: '建盏',
                imgUrl: "/images/list7.jpeg"
              },
              {
                id: 7,
                name: '功夫茶具',
                imgUrl: "/images/list8.jpeg"
              },
            ]
          }
        ]
      },
      // 第二项
      {
        // 一级
        id: 1,
        name: "绿茶",
        data: [
          {
            // 二级
            id: 0,
            name: '绿茶',
            list: [
              // 三级
              {
                id: 0,
                name: '龙井',
                imgUrl: "/images/list9.jpeg"
              },
              {
                id: 1,
                name: '黄山毛峰',
                imgUrl: "/images/list10.jpeg"
              },
              {
                id: 2,
                name: '碧螺春',
                imgUrl: "/images/list11.jpeg"
              },
              {
                id: 3,
                name: '雀舌',
                imgUrl: "/images/list12.jpeg"
              },
              {
                id: 4,
                name: '太平猴魁',
                imgUrl: "/images/list13.jpeg"
              },
              {
                id: 5,
                name: '珍稀白茶',
                imgUrl: "/images/list14.jpeg"
              },
              {
                id: 6,
                name: '六安瓜片',
                imgUrl: "/images/list15.jpeg"
              },
            ]
          }
        ]
      },
      // 第三项
      {
        // 一级
        id: 2,
        name: "乌龙",
        data: [
          {
            // 二级
            id: 0,
            name: '乌龙',
            list: [
              // 三级
              {
                id: 0,
                name: '永春佛手',
                imgUrl: "/images/list16.jpeg"
              },
              {
                id: 1,
                name: '铁观音',
                imgUrl: "/images/list17.jpeg"
              },
              {
                id: 2,
                name: '武夷岩茶',
                imgUrl: "/images/list18.jpeg"
              },
              {
                id: 3,
                name: '漳平水仙',
                imgUrl: "/images/list19.jpeg"
              },
            ]
          }
        ]
      },
      // 第四项
      {
        // 一级
        id: 3,
        name: "红茶",
        data: [
          {
            // 二级
            id: 0,
            name: '红茶',
            list: [
              // 三级
              {
                id: 0,
                name: '英德红茶',
                imgUrl: "/images/list20.jpeg"
              },
              {
                id: 1,
                name: '坦洋工夫',
                imgUrl: "/images/list21.jpeg"
              },
              {
                id: 2,
                name: '金骏眉',
                imgUrl: "/images/list22.jpeg"
              },
              {
                id: 3,
                name: '正山小种',
                imgUrl: "/images/list23.jpeg"
              },
              {
                id: 4,
                name: '云南滇红',
                imgUrl: "/images/list24.jpeg"
              },
              {
                id: 5,
                name: '祁门红茶',
                imgUrl: "/images/list25.jpeg"
              },
            ]
          }
        ]
      },
      // 第五项
      {
        // 一级
        id: 4,
        name: "白茶",
        data: [
          {
            // 二级
            id: 0,
            name: '白茶',
            list: [
              // 三级
              {
                id: 0,
                name: '白牡丹',
                imgUrl: "/images/list26.jpeg"
              },
              {
                id: 1,
                name: '牡丹王',
                imgUrl: "/images/list27.jpeg"
              },
              {
                id: 2,
                name: '白毫银针',
                imgUrl: "/images/list28.jpeg"
              },
              {
                id: 3,
                name: '寿眉',
                imgUrl: "/images/list29.jpeg"
              },
            ]
          }
        ]
      },
      // 第六项
      {
        // 一级
        id: 5,
        name: "普洱",
        data: [
          {
            // 二级
            id: 0,
            name: '普洱',
            list: [
              // 三级
              {
                id: 0,
                name: '生茶',
                imgUrl: "/images/list30.jpeg"
              },
              {
                id: 1,
                name: '熟茶',
                imgUrl: "/images/list31.jpeg"
              },
            ]
          }
        ]
      },
      // 第七项
      {
        // 一级
        id: 6,
        name: "茶具",
        data: [
          {
            // 二级
            id: 0,
            name: '茶具',
            list: [
              // 三级
              {
                id: 0,
                name: '茶宠',
                imgUrl: "/images/list32.jpeg"
              },
              {
                id: 1,
                name: '茶具配件',
                imgUrl: "/images/list33.jpeg"
              },
              {
                id: 2,
                name: '主人杯',
                imgUrl: "/images/list34.jpeg"
              },
              {
                id: 3,
                name: '干泡茶具',
                imgUrl: "/images/list35.jpeg"
              },
              {
                id: 4,
                name: '旅行茶具',
                imgUrl: "/images/list36.jpeg"
              },
              {
                id: 5,
                name: '整套茶具',
                imgUrl: "/images/list37.jpeg"
              },
              {
                id: 6,
                name: '茶盘',
                imgUrl: "/images/list38.jpeg"
              },
            ]
          }
        ]
      },
    ]
  })
})

// 发现 
// 龙井
router.get('/api/find/0/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: {
      topBar: [
        { id: 0, label: "茶杯" },
        { id: 2, label: "碧螺春" },
        { id: 3, label: "绿茶" },
        { id: 4, label: "普洱" },
        { id: 5, label: "花茶" },
      ],
      data: [
        {
          id: 0,
          type: 'longList',
          data: [
            {
              id: 101,
              imgurl: "/images/wan1.jpeg",
              name: "紫滕花茶杯",
              price: 109,
            },
            {
              id: 102,
              imgurl: "/images/wan2.jpeg",
              name: "窑变紫茶杯",
              price: 80
            },
            {
              id: 103,
              imgurl: "/images/wan3.jpeg",
              name: "浮雕竹茶杯",
              price: 37,
            },
            {
              id: 104,
              imgurl: "/images/wan4.jpeg",
              name: "七碗茶诗杯",
              price: 30,
            },
            {
              id: 105,
              imgurl: "/images/wan5.jpeg",
              name: "萌猫茶杯",
              price: 30,
            },
            {
              id: 106,
              imgurl: "/images/wan6.jpeg",
              name: "梨花小茶杯",
              price: 27,
            },
            {
              id: 107,
              imgurl: "/images/wan7.jpeg",
              name: "诗文小茶杯",
              price: 24,
            },
            {
              id: 108,
              imgurl: "/images/wan8.jpeg",
              name: "兔毫-茶末釉玉毫杯",
              price: 110,
            },
            {
              id: 109,
              imgurl: "/images/wan9.jpeg",
              name: "油滴-茶抹釉钵口盏",
              price: 68,
            },
            {
              id: 110,
              imgurl: "/images/wan10.jpeg",
              name: "本山绿泥-茶禅杯",
              price: 108,
            },
          ]
        },
      ]
    }
  })
});
router.get('/api/find/1/data/1', function (req, res, next) {
  res.send({
    code: 0,
    data: [
      {
        id: 0,
        type: 'longList',
        data: [
          {
            id: 111,
            imgurl: "/images/blc1.jpeg",
            name: "雨前头采碧螺春1号散茶",
            price: 68,
          },
          {
            id: 222,
            imgurl: "/images/blc2.jpeg",
            name: "浙江花果香碧螺春2号",
            price: 88,
          },
          {
            id: 333,
            imgurl: "/images/blc3.jpeg",
            name: "浙江原产全芽碧螺春3号",
            price: 108,
          },
          {
            id: 444,
            imgurl: "/images/blc4.jpeg",
            name: "2022明前碧螺春",
            price: 138,
          },
          {
            id: 555,
            imgurl: "/images/blc5.jpeg",
            name: "生态原产雨前碧螺春",
            price: 198,
          },
        ]
      },
    ]
  })
});

// 查询详情商品的id数据
router.get('/api/detail_list/id', function (req, res, next) {
  let id = req.query.id
  connection.query('select * from detail_list where id = ' + id + '', function (error, results) {
    if (error) throw error
    res.json({
      code: 0,
      data: results
    })
  })
})

// 账号密码登录
router.post('/api/login', function (req, res, next) {
  // 接收前端传递过来的值
  let userAccount = {
    userTel: req.body.userTel,
    userPwd: req.body.userPwd
  };

  let userTel = userAccount.userTel
  let userPwd = userAccount.userPwd || "111111"

  // 用户信息 
  let payload = { tel: userTel }
  // 口令
  let secret = 'zaizai'
  // 生成token
  let token = jwt.sign(payload, secret, {
    expiresIn: 60
  })

  // 查询用户账号是否存在
  connection.query(user.queryUserTel(userAccount), function (error, results) {
    if (results.length > 0) {  // 账号存在 

      // 记录的id
      let id = results[0].id

      // 查询密码是否正确
      connection.query(user.queryUserPwd(userAccount), function (err, result) {
        if (result.length > 0) {  // 账号和密码都对

          // 每次登录都重新记录一下 token
          connection.query(`update user set token = '${token}' where id = ${id}`, function () {
            res.send({
              code: 200,
              data: {
                success: true,
                msg: '登录成功',
                data: result[0]
              }
            })
          })

        } else {
          // 密码不对
          res.send({
            code: 302,
            data: {
              success: false,
              msg: '密码不正确'
            }
          })
        }
      })

    } else {
      // 不存在
      res.send({
        code: 301,
        data: {
          success: false,
          msg: '账号不存在'
        }
      })
    }
  })
})

// 验证码
router.post('/api/code', function (req, res, next) {
  // 接收前端传递过来的值
  let phone = req.body.phone

  // 短信应用SDK AppID
  var appid = 1400187558;  // SDK AppID是1400开头

  // 短信应用SDK AppKey
  var appkey = "dc9dc3391896235ddc2325685047edc7";

  // 需要发送短信的手机号码
  var phoneNumbers = [phone];

  // 短信模板ID，需要在短信应用中申请
  var templateId = 285590;  // NOTE: 这里的模板ID`7839`只是一个示例，真实的模板ID需要在短信控制台中申请

  // 签名
  var smsSign = "三人行慕课";  // NOTE: 这里的签名只是示例，请使用真实的已申请的签名, 签名参数使用的是`签名内容`，而不是`签名ID`

  // 实例化QcloudSms
  var qcloudsms = QcloudSms(appid, appkey);

  // 设置请求回调处理, 这里只是演示，用户需要自定义相应处理回调
  function callback(err, ress, resData) {
    if (err) {
      console.log("err: ", err);
    } else {
      res.send({
        code: 200,
        data: {
          success: true,
          data: ress.req.body.params[0]
        }
      })
    }
  }

  // 指定模板ID单发短信
  var ssender = qcloudsms.SmsSingleSender();
  // 向手机发送的短信
  var params = [Math.floor(Math.random() * (9999 - 1000)) + 1000];
  ssender.sendWithParam(86, phoneNumbers[0], templateId,
    params, smsSign, "", "", callback);  // 签名参数不能为空串
})

// 新增用户
router.post('/api/addUser', function (req, res, next) {
  let userAccount = {
    userTel: req.body.phone
  }
  console.log("后台接收到的手机号码是：", userAccount.userTel);
  connection.query(user.queryUserTel(userAccount), function (error, results) {
    console.log("数据库返回的结果是：", results);
    if (error) throw error
    if (results.length > 0) { // 用户存在则登录成功
      res.send({
        code: 200,
        data: {
          success: true,
          msg: "登录成功",
          data: results[0]
        }
      })
    } else {
      // 用户不存在则新增一位用户
      connection.query(user.inserData(userAccount), function (error, results) {
        // 新增后再次查询返回前端
        connection.query(user.queryUserTel(userAccount), function (err, result) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: "登录成功",
              data: result[0]
            }
          })
        })
      })
    }
  })
})

// 注册用户
router.post('/api/register', function (req, res, next) {
  let userAccount = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }

  connection.query(user.queryUserTel(userAccount), function (error, results) {
    if (error) throw error
    if (results.length > 0) { // 用户存在则可以登录
      res.send({
        code: 200,
        data: {
          success: false,
          msg: "用户已存在",
          data: results[0]
        }
      })
    } else {
      // 用户不存在则新增一位用户
      connection.query(user.inserData(userAccount), function (error, results) {
        // 新增后再次查询返回前端
        connection.query(user.queryUserTel(userAccount), function (err, result) {
          res.send({
            code: 200,
            data: {
              success: true,
              msg: "注册成功",
              data: result[0]
            }
          })
        })
      })
    }
  })
})

// 找回密码验证手机号
router.post('/api/retrieve', function (req, res, next) {
  let findPassword = {
    userTel: req.body.phone
  }

  connection.query(user.queryUserTel(findPassword), function (error, results) {
    if (results.length > 0) {
      res.send({
        code: 200,
        data: {
          success: true,
        }
      })
    } else {
      res.send({
        code: 0,
        data: {
          success: false,
          msg: '该账号不存在'
        }
      })
    }
  })
})

// 找回密码修改新密码
router.post('/api/recovery', function (req, res, next) {
  let findPassword = {
    userTel: req.body.phone,
    userPwd: req.body.pwd
  }

  connection.query(user.queryUserTel(findPassword), function (error, results) {
    // 数据库的某一条数据id字段与pwd字段
    let id = results[0].id
    let pwd = results[0].pwd // 把pwd字段之前的密码替换成用户输入的密码
    connection.query(`update user set pwd = replace(pwd,'${pwd}','${findPassword.userPwd}') where id = ${id}`, function (err, result) {
      res.send({
        code: 200,
        data: {
          success: true,
          msg: "修改成功"
        }
      })
    })
  })

})

// 添加购物车
router.post('/api/addCart', function (req, res, next) {
  // 获取前端传递的id
  let goodsId = req.body.goodsId
  // 解析token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 如果执行，说明 token 已过期
  // if (getTokenTime(tokenObj.exp)) {
  //   res.send({
  //     data: {
  //       code: 1000
  //     }
  //   })
  // }

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let userId = results[0].id
    // 查询商品
    connection.query(`select * from detail_list where id = ${goodsId}`, function (err, result) {
      let detailName = result[0].name
      let detailPrice = result[0].price
      let detailImgUrl = result[0].imgUrl

      // 查询当前用户在之前是否添加过本商品
      connection.query(`select * from cart_list where uId = ${userId} and goods_id = ${goodsId}`, function (e, r) {
        // 用户之前是否添加过本商品
        if (r.length > 0) {
          // 原来商品的数量
          let num = r[0].goods_num
          connection.query(`update cart_list set goods_num = replace(goods_num,${num},${parseInt(num) + 1}) where id = ${r[0].id}`, function (e, r) {
            res.send({
              code: 200,
              data: {
                success: true,
                msg: "添加成功"
              }
            })
          })
        } else {
          connection.query(`insert into cart_list (uId,goods_id,goods_name,goods_price,goods_num,goods_imgUrl) values ("${userId}","${goodsId}","${detailName}", "${detailPrice}", "1", "${detailImgUrl}")`, function (e, r) {
            res.send({
              code: 200,
              data: {
                success: true,
                msg: "添加成功"
              }
            })
          })
        }
      })
    })
  })
})

// 查询购物车数据
router.post('/api/selectedCart', function (req, res, next) {
  // 解析token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    // 用户id
    let userId = results[0].id
    // 查询购物车
    connection.query(`select * from cart_list where uId = ${userId}`, function (err, result) {
      res.send({
        code: 200,
        data: {
          success: true,
          data: result
        }
      })
    })
  })
})

// 删除购物车数据
router.post('/api/deleteCart', function (req, res, next) {
  let arrId = req.body.arrId
  for (let i = 0; i < arrId.length; i++) {
    connection.query(`delete from cart_list where id = ${arrId[i]}`, function (error, results) {
      res.send({
        data: {
          code: 200,
          msg: '删除成功',
          success: true
        }
      })
    })
    return
  }
})

// 修改购物车数据
router.post('/api/updateCart', function (req, res, next) {
  let modifyNum = req.body.num
  let id = req.body.id

  connection.query(`select * from cart_list where id = ${id}`, function (error, results) {
    let num = results[0].goods_num
    connection.query(`update cart_list set goods_num = replace(goods_num,${num},${modifyNum}) where id = ${id}`, function (err, result) {
      res.send({
        data: {
          code: 200,
          msg: "更新成功",
          success: true
        }
      })
    })
  })

})

// 添加收货地址
router.post('/api/addAddress', function (req, res, next) {
  // 获取前端传递的值
  let { name, tel, province, city, county, addressDetail, isDefault, areaCode } = req.body

  // 解析token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let userId = results[0].id
    // 添加一条收货地址
    if (isDefault != 1) {
      connection.query(`insert into address (uId, name, tel, province, city, county, addressDetail, isDefault, areaCode) values (${userId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`, function (error, results) {
        res.send({
          data: {
            code: 200,
            msg: '添加成功',
            success: true
          }
        })
      })
    } else {
      connection.query(`select * from address where uId = ${userId} and isDefault = ${isDefault}`, function (error, results) {
        if (results.length > 0) {
          let addressId = results[0].id
          connection.query(`update address set isDefault = replace(isDefault,'1','0') where id = ${addressId}`, function (err, result) {
            connection.query(`insert into address (uId, name, tel, province, city, county, addressDetail, isDefault, areaCode) values (${userId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`, function (error, results) {
              res.send({
                data: {
                  code: 200,
                  msg: '添加成功',
                  success: true
                }
              })
            })
          })
        } else {
          connection.query(`insert into address (uId, name, tel, province, city, county, addressDetail, isDefault, areaCode) values (${userId},"${name}","${tel}","${province}","${city}","${county}","${addressDetail}","${isDefault}","${areaCode}")`, function (error, results) {
            res.send({
              data: {
                code: 200,
                msg: '添加成功',
                success: true
              }
            })
          })
        }
      })
    }
  })
})

// 查询展示收货地址
router.post('/api/selectedAddress', function (req, res, next) {
  // 解析token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let userId = results[0].id
    connection.query(`select * from address where uId = ${userId}`, function (err, result) {
      res.send({
        data: {
          code: 200,
          success: true,
          data: result
        }
      })
    })
  })

})

// 修改收货地址
router.post('/api/updateAddress', function (req, res, next) {
  // 获取前端传递的值
  let { id, name, tel, province, city, county, addressDetail, isDefault, areaCode } = req.body
  // 解析token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let userId = results[0].id
    connection.query(`select * from address where uId = ${userId} and isDefault = ${isDefault}`, function (err, result) {
      if (result.length > 0) {
        let addressId = result[0].id
        connection.query(`update address isDefault = replace(isDefault, 1, 0) where id = ${addressId}`, function (e, r) {
          let updateSql = `update address set uId = ? , name = ? , tel = ? , province = ? , city = ? , county = ? , addressDetail = ? , isDefault = ? , areaCode = ? where id = ${id}`
          connection.query(updateSql, [userId, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (es, rs) {
            res.send({
              data: {
                code: 200,
                msg: '修改成功',
                success: true
              }
            })
          })
        })
      } else {
        let updateSql = `update address set uId = ?, name = ?, tel = ?, province = ?, city = ?, county = ?, addressDetail = ?, isDefault = ?, areaCode = ? where id = ${id}`
        connection.query(updateSql, [userId, name, tel, province, city, county, addressDetail, isDefault, areaCode], function (es, rs) {
          res.send({
            data: {
              code: 200,
              msg: '修改成功',
              success: true
            }
          })
        })
      }
    })
  })
})

// 删除收货地址
router.post('/api/deleteAddress', function (req, res, next) {
  let id = req.body.id
  connection.query(`delete from address where id = ${id}`, function (error, results) {
    res.send({
      data: {
        code: 200,
        msg: '删除成功',
        success: true
      }
    })
  })
})

// 生成一个订单
router.post('/api/addOrder', function (req, res, next) {
  // 解析token
  let token = req.headers.token
  let tokenObj = jwt.decode(token)

  // 接收前端传递的数据
  let newList = req.body.newList

  // 生成订单号 order_id，规则：时间戳 + 6位随机数
  function setTimeDate(t) {
    return t < 10 ? '0' + t : t
  }

  function randomNumber() {
    const now = new Date()
    let month = now.getMonth() + 1;
    let date = now.getDate()
    let hour = now.getHours()
    let minutes = now.getMinutes()
    let seconds = now.getSeconds()
    month = setTimeDate(month)
    date = setTimeDate(date)
    hour = setTimeDate(hour)
    minutes = setTimeDate(minutes)
    seconds = setTimeDate(seconds)
    let orderCode = now.getFullYear().toString() + month.toString() + date + hour + minutes + seconds + (Math.round(Math.random() * 1000000)).toString()
    return orderCode
  }

  /* 
    订单状态
    未支付: 1
    待支付: 2
    支付成功: 3
    支付失败: 0
  */

  // 订单号
  let orderId = randomNumber()
  // 订单商品名称
  let goodsName = []
  // 订单商品总金额
  let goodsPrice = 0
  // 订单商品总数量
  let goodsNum = 0

  newList.forEach(item => {
    goodsName.push(item.goods_name)
    goodsPrice += item.goods_price * item.goods_num
    goodsNum += parseInt(item.goods_num)
  });

  // 存储数据 >>> 数据库
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    let userId = results[0].id
    connection.query(`insert into store_order (uId, order_id, goods_name, goods_price, goods_num, order_status) values ("${userId}" , "${orderId}" , "${goodsName}" , "${goodsPrice}" , "${goodsNum}" , '1')`, function () {
      // 查询订单并返回订单号给前端
      connection.query(`select * from store_order where uId = ${userId} and order_id = ${orderId}`, function (err, result) {
        res.send({
          data: {
            code: 200,
            data: result,
            success: true
          }
        })
      })
    })
  })

})

// 查询订单号
router.post('/api/selectOrder', function (req, res, next) {
  //接收前端给后端的订单号
  let order_id = req.body.order_id;

  // 查询订单号
  connection.query(`select * from store_order where order_id = '${order_id}'`, function (err, result) {
    res.send({
      data: {
        success: true,
        code: 200,
        data: result
      }
    })
  })
})

// 修改订单状态为待支付，清空购物车商品
router.post('/api/resetOrder', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);

  // 接收前端传递的数据
  let order_id = req.body.order_id;
  let selectList = req.body.selectList;

  //查询用户
  connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
    //用户id
    let userId = results[0].id;
    connection.query(`select * from store_order where uId = ${userId} and order_id = ${order_id}`, function (err, result) {
      //订单的数据库id
      let id = result[0].id;
      //修改订单状态 1==>2
      connection.query(`update store_order set order_status = replace(order_status,'1','2') where id = ${id}`, function (e, r) {
        //购物车数据删除
        selectList.forEach(v => {
          connection.query(`delete from cart_list where id = ${v}`, function () {

          })
        })
        res.send({
          data: {
            code: 200,
            success: true
          }
        })
      })
    })
  })

})

// 发起支付订单
router.post('/api/payment', function (req, res, next) {
  // 接收前端传递的数据
  let order_id = req.body.order_id
  let name = req.body.name
  let price = req.body.price

  // 1. 调用支付宝接口
  const formData = new AlipayFormData();
  // 2. 调用 setMethod 并传入 get，会返回可以跳转到支付页面的 url
  formData.setMethod('get');
  // 3. 支付时的信息
  formData.addField('bizContent', {
    outTradeNo: order_id, // 赋值订单号 
    productCode: 'FAST_INSTANT_TRADE_PAY', // 固定的
    totalAmount: price, // 赋值价格
    subject: name, // 赋值商品名称
    // body: '商品详情', // 可有可无
  });
  // 4. 支付成功 或 失败跳转的链接
  formData.addField('returnUrl', 'http://localhost:8080/payment');
  // 5. 返回Promise
  const result = alipaySdk.exec(
    'alipay.trade.page.pay',
    {},
    { formData: formData },
  );
  // 对接成功，支付宝方返回的数据
  result.then((resp) => {
    res.send({
      data: {
        code: 200,
        msg: '支付中',
        success: true,
        paymentUrl: resp
      }
    })
  })
})

// 支付状态
router.post('/api/paymentStatus', function (req, res, next) {
  // 解析token
  let token = req.headers.token;
  let tokenObj = jwt.decode(token);

  // 接收前端传递的数据
  let out_trade_no = req.body.out_trade_no;
  let trade_no = req.body.trade_no;

  // 支付宝配置
  const formData = new AlipayFormData();
  formData.setMethod('get');
  formData.addField('bizContent', {
    out_trade_no,
    trade_no
  });

  //返回promise
  const result = alipaySdk.exec(
    'alipay.trade.query',
    {},
    { formData: formData },
  );
  //后端请求支付宝
  result.then(resData => {
    axios({
      method: 'GET',
      url: resData
    }).then(data => {
      let responseCode = data.data.alipay_trade_query_response;
      if (responseCode.code == '10000') {
        switch (responseCode.trade_status) {
          case 'WAIT_BUYER_PAY':
            res.send({
              data: {
                code: 0,
                data: {
                  msg: '支付宝有交易记录，没付款'
                }
              }
            })
            break;

          case 'TRADE_CLOSED':
            res.send({
              data: {
                code: 1,
                data: {
                  msg: '交易关闭'
                }
              }
            })
            break;

          case 'TRADE_FINISHED':
            connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
              let uId = results[0].id;
              connection.query(`select * from store_order where uId = ${uId} and order_id = ${out_trade_no}`, function (err, result) {
                let id = result[0].id;
                // 修改订单状态 >>> 成功
                connection.query(`update store_order set order_status = replace(order_status,'2','3') where id = ${id}`, function () {
                  res.send({
                    data: {
                      code: 2,
                      data: {
                        msg: '交易完成，交易完成，不可退款'
                      }
                    }
                  })
                })
              })
            })
            break;

          case 'TRADE_SUCCESS':
            connection.query(`select * from user where tel = ${tokenObj.tel}`, function (error, results) {
              let uId = results[0].id;
              connection.query(`select * from store_order where uId = ${uId} and order_id = ${out_trade_no}`, function (err, result) {
                let id = result[0].id;
                // 修改订单状态 >>> 成功
                connection.query(`update store_order set order_status = replace(order_status,'2','3') where id = ${id}`, function () {
                  res.send({
                    data: {
                      code: 2,
                      data: {
                        msg: '交易完成'
                      }
                    }
                  })
                })
              })
            })
            break;
        }
      } else if (responseCode.code == '40004') {
        res.send({
          data: {
            code: 4,
            msg: '交易不存在'
          }
        })
      }
    }).catch(err => {
      res.send({
        data: {
          code: 400,
          msg: '交易失败',
          err
        }
      })
    })
  })
})

module.exports = router;

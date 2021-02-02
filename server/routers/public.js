const Router = require('koa-router')
const router = new Router({ prefix: '/api' })
const { User } = require('../models/model')
const jwt = require('jsonwebtoken')

// 公共路由接口

// 登录获取表单数据，判断用户名和密码是否存在并正确，正确生成 token 返回给前端
router.post('/login', async (ctx, next) => {
  // 使用 postman body row 的 json 格式测试获取数据
  const body = ctx.request.body
  const user = await User.findOne({ 
    where: {
      username: body.username,
      password: body.password
    }
  })
  if (user === null) {
    ctx.status = 0
    ctx.body = {
      code: 0,
      msg: '账号不存在或密码错误'
    }
  } else {
    ctx.session.username = body.username
    ctx.status = 200
    ctx.body = {
      code: 200,
      msg: '登录成功',
      token: jwt.sign({
        data: body.username,
        exp: Math.floor(Date.now() / 1000) + 60 * 60
      },
      'jwt_secret'
      )
    }
  }
})

module.exports = router

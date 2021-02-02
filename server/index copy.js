const koa = require('koa')
const jwt = require('koa-jwt')
const JWT = require('jsonwebtoken')
const router = require('koa-router')
const requireDirectory = require('require-directory')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const { User,Role } = require('./models/model')
const app = new koa()

// koa-bodyparser
app.use(bodyParser())

// koa-session
app.keys = ['some secret hurr']
const CONFIG = {
  key:'koa:sess',    /*cookie key (default is koa:sess)*/
  maxAge:86400000,   /*cookie 的过期时间maxAge in ms (default is 1 days)*/
  overwrite:true,   /*是否可以overwrite (默认default true)*/
  httpOnly:true,    /*cookie 是否只有服务器端可以访问httpOnly or not (default true)*/
  signed:true,    /*默认签名*/
  rolling:false,    /*在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）*/
  renew:true,    /*当cookie快过期时请求,会重置cookie的过期时间*/
}
app.use(session(CONFIG, app))

// koa-jwt
const unlessPath = ['/api/login', '/api/register']
app.use(jwt({
  secret: 'jwt_secret', passthrough: true }).unless({
    path: unlessPath
}))

// 全局路由拦截放在其他路由之前
app.use(async (ctx, next) => {
  // 对登录、注册等路由进行放行
  console.log(ctx)
  if (unlessPath.indexOf(ctx.url) !== -1){
    await next()
  } else {
    // 判断headers 中是否存在 authorization
    if (ctx.headers && ctx.headers.authorization === undefined) {
      ctx.status = 401
      ctx.body = {
        code: 401,
        msg: '没有访问权限'
      }
    } else {
      // 若存在，验证 token 是否等于当前登录用户的用户名，等于的话，再判断此用户的角色表中的 permission 字段
      // 是否存在 ctx.url ，是的话 next()，否则未授权
      // 在else中再深入判断它是否能够访问该接口的权限就是啦{验证token，判断用户是否有权限能访问此接口路径}
      try {
        let payload = JWT.verify(ctx.headers.authorization, 'jwt_secret') // 解密, 获取payload
        if (ctx.session.username === payload.data ) {
          const user_role = await User.findOne({
            where: {
              username: ctx.session.username
            },
            include: [Role]
          })
          const res = JSON.parse(user_role.role.permission).filter(item => {
            return new RegExp(item.path, 'g').test(ctx.url) && item.type.toUpperCase() === ctx.request.method.toUpperCase()
          })
          if (res.length === 0) {
            ctx.status = 401
            ctx.body = {
              code: 401,
              msg: '没有访问权限'
            }
          } else {
            await next()
          }
        } else {
          ctx.status = 500
          ctx.body = {
            code: 500,
            msg: '未登录'
          }
        }
      } catch (err) {
        // 捕获 jwt 的异常信息
        if (err.message === 'jwt expired') {
          ctx.status = 500
          ctx.body = {
            code: 500,
            msg: 'token 过期'
          }
        } else if (err.message === 'jwt malformed') {
          ctx.status = 500
          ctx.body = {
            code: 500,
            msg: '令牌无效'
          }
        } else {
          ctx.status = 500
          ctx.body = {
            code: 500,
            msg: err.message
          }
        }
      }
    }
  }
})

// require-directory 实现路由自动注册
// 第一个参数固定是 module，第二个参数是要注册的 router 的相对路径，第三个参数是注册每个路由之前执行的业务代码
const modules = requireDirectory(module, './routes', { visit: whenLoadModule })
function whenLoadModule (obj) {
  // 判断当前对象是否是一个 Router，这种判断方式只适用于导出时没有使用大括号的方式，
  if (obj instanceof router) {
    app.use(obj.routes() , obj.allowedMethods())
  }
}

app.listen(4000, () => {
  console.log('server is running to 4000')
})

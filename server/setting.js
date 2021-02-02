const Koa = require('koa')
const router = require('koa-router')
const bodyParser = require("koa-bodyparser")

const app = new Koa()

router.length('/home', async (ctx, next) => {
    ctx.response.status = 200
    ctx.response.body = 'home'
    await next()
})

app.use(router.routes())

app.listen(3000);
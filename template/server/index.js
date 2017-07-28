import Koa from 'koa'
import { Nuxt, Builder } from 'nuxt'

const app = new Koa()
const host = process.env.HOST || '127.0.0.1'
const port = process.env.PORT || 3000

// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(app.env === 'production')

const nuxt = new Nuxt(config)

if (config.dev) {
  const builder = new Builder(nuxt)
  builder.build()
}

app.use(async (ctx, next) => {
  ctx.status = 200
  await nuxt.render(ctx.req, ctx.res)
})

app.listen(port, host)

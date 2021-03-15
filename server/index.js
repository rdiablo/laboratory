import 'dotenv/config.js';
import Koa from 'koa';
import { ApolloServer,AuthenticationError } from 'apollo-server-koa';
import jwt from 'koa-jwt';
import 'babel-polyfill';
import schema from './schema/index.js';
import models from './models.js';
const app = new Koa();



app.use(jwt({ secret: process.env.JWT_SECRET, passthrough: true }));

// const context = ({ req }) => {
//   const token = req.headers.authorization || ''

//   try {
//     return { id, email } = jwt.verify(token.split(' ')[1], SECRET_KEY)
//   } catch (e) {
//     throw new AuthenticationError(
//       'Authentication token is invalid, please log in',
//     )
//   }
// }

// const ctk => (ctx) ({
//   const authHeader = ctx.request.headers.authorization || ''
//   const token = authHeader.split(' ')[1]
//   if (authHeader) {
//     jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, user) => {
//         if (err) {
//           return ctx.sendStatus(403);
//         }
//         ctx.user = user
//         console.log(user)
//         return user
//     });
//   } else {
//     ctx.sendStatus(401);
//   }
// })


const server = new ApolloServer({
  schema,
  context: ({ ctx: { state: user,request: body } }) => ({
    user,
    body,
    models,
  }),
  // context : ({ ctx }) => {
  //   const authHeader = ctx.request.headers.authorization || ''
  //   const token = authHeader.split(' ')[1]
  //   console.log(token)
  // },
  // context : ({ ctx: { state: user } }) => {
  //   const authHeader = ctx.request.headers.authorization || ''
  //   const token = authHeader.split(' ')[1]
  //   if (authHeader) {
  //     jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, users) => {
  //         if (err) {
  //           return ctx.sendStatus(403);
  //         }
  //         ctx.user = users
  //         return user
  //     });
  //   } else {
  //     ctx.sendStatus(401);
  //   }
    // try {
    //   return { id } = jsonwebtoken.verify(token.split(' ')[1], SECRET_KEY)
    // } catch (e) {
    //   throw new AuthenticationError(
    //     'Authentication token is invalid, please log in',
    //   )
    // }
  // },
  // context : ({ ctx }) => {
  //   const token = ctx.request.headers.authorization || ''
  //   // console.log(token.split(' ')[1])
  //   // console.log({ id } = jsonwebtoken.verify(token.split(' ')[1], process.env.JWT_SECRET))
  //   // const token = ctx
  //   // throw new Error(jwt.verify(token.split(' ')[1], process.env.JWT_SECRET));
  //   console.log(jsonwebtoken.verify(token.split(' ')[1], process.env.JWT_SECRET).id)
  //     return { state: user } = jsonwebtoken.verify(token.split(' ')[1], process.env.JWT_SECRET).id
    
  // },
  // introspection: true,
  // playground: true,
});
server.applyMiddleware({ app });

app.listen({ port: 4000 }, async () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`));
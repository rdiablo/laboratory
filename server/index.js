import 'dotenv/config.js';
import Koa from 'koa';
import { ApolloServer,AuthenticationError } from 'apollo-server-koa';
import jwt from 'koa-jwt';
import jsonwebtoken from 'jsonwebtoken';
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

const server = new ApolloServer({
  schema,
  context: ({ ctx: { state: user } }) => ({
    user,
    models,
  }),
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
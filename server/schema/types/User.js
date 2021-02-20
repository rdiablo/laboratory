import { gql,AuthenticationError } from 'apollo-server-koa';
import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';

export const typeDef = gql`
  type User {
    id: String!
    password: String!
    username: String
    token: String!
  }
  extend type Query {
    getUser(id: ID!): User
    getUserID(username: String!): ID
    cektoken(id: ID!, token: String!): String
  }
  extend type Mutation {
    login(id: ID!, password: String!): String
    signUp(id: ID!, password: String!): String
  }
`;

export const resolvers = {
  Query: {
    getUser: async (root, { id }, { models }) => {
      return models.User.findById({ id });
    },
    getUserID: async (root, { username }, { models }) => {
      return models.User.findOne({ username });
    },
    cektoken: async (root, { id },{ body, models }) => {
      const user = await models.User.findById({ id });
      if (!user) {
        throw new Error('No user with that id');
      }
      const authHeader = body.headers.authorization || ''
      const token = authHeader.split(' ')[1]
      console.log(token)
      const valid = await jsonwebtoken.verify(token, process.env.JWT_SECRET, (err, users) => {
        if (err) {
          throw new AuthenticationError('无效的 token');
        }
        return users
      });
      if (!valid) {
        throw new Error('Incorrect token');
      }
      return models.User.returnUser({ user,valid })
    },
  },
  Mutation: {
    signUp: async (root, { id, password }, { models }) => {
      const user = await models.User.create({
        id,
        password: await bcrypt.hash(password, 10),
      });

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
    },
    login: async (root, { id, password }, { models }) => {
      
      const user = await models.User.findById({ id });

      if (!user) {
        throw new Error('No user with that id');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      return jsonwebtoken.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
    }
  },
};
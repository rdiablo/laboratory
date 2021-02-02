import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Hello {
    _id: ID
    email: String
    lastIP: String
  }
  extend type Query {
    Hellos: [Hello]
  }
`;

export const resolvers = {
  // Hello: {
  //   email: () => '123456',
  // },
  Query: {
    Hellos: (root, args, { models }) => {
      return models.Hellos.findAll();
    },
  },
};
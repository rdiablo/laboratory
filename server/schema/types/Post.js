import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Post {
    id: ID
    title: String
    createdAt: String
  }
  extend type Query {
    Posts: [Post]
  }
`;

export const resolvers = {
  Post: {
    title: () => 'fake title',
  },
  Query: {
    Posts: (root, args, { user, models }) => {
      // console.log(JSON.stringify(user))
      //权限判断
      if (user.user.id != 7) {
        throw new Error('You are not authenticated!');
      }
        return models.Post.findAll();
      
      
    },
  },
};
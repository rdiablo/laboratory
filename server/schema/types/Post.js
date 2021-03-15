import { gql } from 'apollo-server-koa';

export const typeDef = gql`
  type Post {
    id: ID
    title: String
    createdAt: String
  }
  type Finance {
    id: ID
    ad: String
    name: String
    accdate: String
    item: String
    quantity: String
    price: String
    total: String
    itemid: Int
    discharge: String
  }
  extend type Query {
    Posts: [Post]
    getFinances(ad: String, name: String, accdate: String, item: String, quantity: String, price: String, total: String, itemid: Int, discharge: String): [Finance]
    getFdate(accdatestart: String, accdateend: String, datafilter:[String], undatafilter:[String]): [Finance]
  }
  extend type Mutation {
    updata(ad: String, name: String, accdate: String, item: String, quantity: String, price: String, total: String, itemid: Int, discharge: String): String
  }
`;

export const resolvers = {
  Post: {
    title: () => 'fake title',
  },
  Query: {
    Posts: (root, args, { user, models }) => {
      console.log(JSON.stringify(user))
      //权限判断
      if (user.user.id != 7) {
        throw new Error('You are not authenticated!');
      }
        return models.Post.findAll();
    },
    getFinances: async (root, args, { models }) => {
      return models.Post.finds(args)
    },
    getFdate: async (root, args, { models }) => {
      return models.Post.finddates(args)
    }
  },
  Mutation: {
    updata: async (root, { ad, name, accdate, item, quantity, price, total, itemid, discharge}, { models }) => {
      const user = await models.Post.create({
        ad,
        name,
        accdate,
        item,
        quantity,
        price,
        total,
        itemid,
        discharge
      });

      return 'true'
    },
  }
};
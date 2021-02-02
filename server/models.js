import knex from './sql/connector.js';
import { GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';

import mongoose from 'mongoose';
const db = mongoose.createConnection('mongodb://192.168.41.182:27021/test',{ useNewUrlParser: true, useUnifiedTopology: true});
if(db) {
	console.log('mongodb connected successfully');
	global.db = db;
}
const MySchema = mongoose.Schema({
	_id: String,
	email: String,
	lastIP: String,
});
const MyModel = db.model('Hello', MySchema);

// MyModel.find({}, function (err, docs) {
// 	if(err) {
// 		return err
// 	} else {
// 		return docs
// 	}
	
  // docs.forEach
// });
// const MyModel = connection.model('Hello', models);
// MyModel.find({ size: 'small' })
const HelloFields = {
  email: {
    type: GraphQLString
  },
  lastIP: {
    type: GraphQLString
  }
}
const HelloType = new GraphQLObjectType({
  name: 'Hello',
  fields: HelloFields
});
const myhello = {
	type: new GraphQLList(HelloType),
	async resolve (root, params, options) {
		// console.log(123)
		return MyModel.find();
	}
}
const models = {
	Hellos: {
		async findAll() {
			// console.log(MyModel.find({}))
			return MyModel.find({})
		}
	},
  Post: {
    async findAll() {
      return knex.select().from('Post');
    },
  },
  User: {
    async findById({ id }) {
      const users = await knex.select().from('User').where({ id });
      if (users && users.length !== 0) return users[0];
      return null;
    },
    async create(data) {
      return knex.insert(data).into('User');
    },
  },
};

export default models;
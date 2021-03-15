import knex from './sql/connector.js';
import { GraphQLList, GraphQLString, GraphQLObjectType } from 'graphql';

import mongoose from 'mongoose';
const db = mongoose.createConnection('mongodb://192.168.41.147:27021/test',{ useNewUrlParser: true, useUnifiedTopology: true});
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
	
//   docs.forEach
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
// const myhello = {
// 	type: new GraphQLList(HelloType),
// 	async resolve (root, params, options) {
// 		// console.log(123)
// 		return MyModel.find();
// 	}
// }
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
    async finds(data) {
      let datas =''
      if(isNaN(data.accdate)&&!isNaN(Date.parse(data.accdate)) && data.accdate == null) {
        datas = await knex.select().from('Finance').where(data);
      } else {
        datas = await knex.select().from('Finance').where('accdate','like','%'+ data.accdate +'%').limit(1);
      }
      if (datas) return datas;
      return null;
    },
    async finddates(data) {
      let datas
      if(data.undatafilter && !data.datafilter) {
        let arr = data.undatafilter.join("|")
        datas = await knex.select().from('Finance')
        .where('accdate','>=',data.accdatestart)
        .andWhere('accdate','<=',data.accdateend)
        .andWhereNot('item','regexp',arr);
      } else if (!data.undatafilter && data.datafilter) {
        let arr = data.datafilter.join("|")
        datas = await knex.select().from('Finance')
        .where('accdate','>=',data.accdatestart)
        .andWhere('accdate','<=',data.accdateend)
        .andWhere('item','regexp',arr);
      } else if (data.undatafilter && data.datafilter) {
        let arr1 = data.undatafilter.join("|")
        let arr2 = data.datafilter.join("|")
        datas = await knex.select().from('Finance')
        .where('accdate','>=',data.accdatestart)
        .andWhere('accdate','<=',data.accdateend)
        .andWhereNot('item','regexp',arr1)
        .andWhere('item','regexp',arr2);
      } else {
        datas = await knex.select().from('Finance')
        .where('accdate','>=',data.accdatestart)
        .andWhere('accdate','<=',data.accdateend);
      }
      console.log(datas.length)
      if (datas) return datas;
      return null;
    },
    async create(data) {
      return knex.insert(data).into('Finance');
    },
  },
  User: {
    async findById({ id }) {
      const users = await knex.select().from('User').where({ id });
      if (users && users.length !== 0) return users[0];
      return null;
    },
    async findOne({ username }) {
      const id = await knex.select().from('User').where({ username });
      if (id) return id[0].id;
      return null;
    },
    async create(data) {
      return knex.insert(data).into('User');
    },
    async returnUser(token) {
      console.log(JSON.stringify(token))
      return token.user.username
      // return JSON.stringify(token).toString()
    },
  },
};

export default models;
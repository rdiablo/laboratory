const { Sequelize } = require('sequelize')
const config = require('./mysql')

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: 'mysql',
  pool: {
    max: 5, // 连接池中最大连接数量
    min: 0, // 连接池中最小连接数量
    idle: 10000 // 如果一个线程 10 秒钟内没有被使用过的话，就释放线程
  },
  define: {
    timestamps: false, // 不自动创建时间字段
    freezeTableName: true  // 参数停止 Sequelize 执行自动复数化. 这样,Sequelize 将推断表名称等于模型名称,而无需进行任何修改
  }
})

//测试数据库链接
sequelize
  .authenticate().then(() => {
    console.log("数据库连接成功");
  })
  .catch((err) => {
    //数据库连接失败时打印输出
    console.error(err);
    throw err;
  });
  
// sequelize.sync({ force: false })

module.exports = sequelize

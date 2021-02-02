const { DataTypes } = require('sequelize')
const sequelize = require('../../config/db')

// user 模型
const User = sequelize.define('user', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '用户名'
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '密码'
  }
})

const Role = sequelize.define('role', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '角色名称'
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '角色描述'
  },
  menu: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '角色所属菜单',
    defaultValue: '[]'
  },
  permission: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '角色所属权限',
    defaultValue: '[]'
  }
})

const Permission = sequelize.define('permission', {
  // 在这里定义模型属性
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '接口名称'
  },
  path: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '接口地址'
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '接口类型'
  },
  basename: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '上级节点名称'
  },
  basepath: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '上级节点地址'
  },
  show: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '是否显示'
  },
  enable: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    allowNull: false,
    comment: '是否启用'
  }
})

/**
 * 用户User 和角色Role 对应关系
 * 一个用户 -> 一个角色
 * 一个角色 -> 多个用户
 */
Role.hasMany(User, {
  foreignKey: 'rid',
  sourceKey: 'id'
})
User.belongsTo(Role, {
  foreignKey: 'rid',
  targetKey: 'id'
})

module.exports = {
  User,
  Role,
  Permission
}

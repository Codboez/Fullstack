import { Model, DataTypes } from "sequelize"
import { sequelize } from "../util/db.js"

class Reading extends Model {}

Reading.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" }
  },
  blogId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "blogs", key: "id" }
  },
  read: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: false,
  modelName: 'reading'
})

export default Reading
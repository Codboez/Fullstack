import { DataTypes } from "sequelize"

export const up = async ({ context: queryInterface }) => {
  try {
    await queryInterface.createTable("readings", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" }
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" }
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    })
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  }
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("readings")
}
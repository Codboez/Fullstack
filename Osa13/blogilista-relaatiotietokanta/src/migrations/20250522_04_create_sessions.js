import { DataTypes } from "sequelize"

export const up = async ({ context: queryInterface }) => {
  try {
    await queryInterface.createTable("sessions", {
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
      token: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    })
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  }
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.dropTable("sessions")
}
import { DataTypes } from "sequelize"

export const up = async ({ context: queryInterface }) => {
  try {
    await queryInterface.addColumn("users", "disabled", {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    })
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  }
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("users", "disabled")
}
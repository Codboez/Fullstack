import { DataTypes } from "sequelize"

export const up = async ({ context: queryInterface }) => {
  try {
    await queryInterface.addColumn("blogs", "year", {
      type: DataTypes.INTEGER,
    })
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  }
}

export const down = async ({ context: queryInterface }) => {
  await queryInterface.removeColumn("blogs", "year")
}
import { Sequelize } from "sequelize"
import { DATABASE_URL } from "./config.js"
import { Umzug, SequelizeStorage } from "umzug"

export const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  logging: false
})

export const connectToDatabase = async () => {
  try {
    await sequelize.authenticate()
    await runMigrations()
    console.log('database connected')
  } catch (error) {
    console.log('connecting database failed')
    return process.exit(1)
  }

  return null
}

const migrationConf = {
  migrations: {
    glob: 'src/migrations/*.js',
  },
  storage: new SequelizeStorage({ sequelize, tableName: 'migrations' }),
  context: sequelize.getQueryInterface(),
  logger: console,
}

const runMigrations = async () => {
  const migrator = new Umzug(migrationConf)
  const migrations = await migrator.up()
  console.log('Migrations up to date', {
    files: migrations.map((mig) => mig.name),
  })
}

export const rollbackMigration = async () => {
  await sequelize.authenticate()
  const migrator = new Umzug(migrationConf)
  await migrator.down()
  return process.exit(0)
}
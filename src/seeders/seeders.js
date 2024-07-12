const db = require("../lib/db")
const PostSeeder = require("./posts.seeder")
const TagSeeder = require("./tags.seeder")

db.connect()
   .then(async () => {
      console.info("Init Seeder...")
      try {
         await TagSeeder.run()
         await PostSeeder.run()

         console.info("Finish Seeder...")
      } catch (error) {
         console.error("Error during seeding", error)
      } finally {
         process.exit(0);
      }
   })
   .catch(error => {
      console.error("DB connection error", error)
      process.exit(1);
   })

const mongoose = require('mongoose');

main().then(()=>console.log("Database succesfully connected")).catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
}

module.exports = main;
const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI'); // this get's from the default.json file

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false
    });
  } catch (err) {
    console.log(err);
    // exit processs with failure.
    process.exit(1);
  }
};

module.exports = connectDB;

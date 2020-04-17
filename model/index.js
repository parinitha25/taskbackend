const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('../model/user');

const mongod = new MongoMemoryServer();

/* Connect to the in-memory database.*/
connect = async () => {
  const uri = await mongod.getConnectionString();
  const mongooseOpts = {
    poolSize: 10,
    bufferMaxEntries: 0,
    reconnectTries: 10000,
    useNewUrlParser: true,
    useUnifiedTopology: true
  };
  await mongoose.connect(uri, mongooseOpts);
}

/* Drop database, close the connection and stop mongod.*/
closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}

/* Remove all the data for all db collections.*/
clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany();
  }
}
mongoose.Promise = global.Promise;
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/Users', {
  useCreateIndex: true,
  useNewUrlParser: true,
});

module.exports = { User, db, closeDatabase, connect, clearDatabase }

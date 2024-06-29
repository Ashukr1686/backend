// var keys = require('./keys');
const mongoose = require('mongoose');

// Replace connection uri
// `mongodb://${keys.mongo.username}:${keys.mongo.password}@${keys.mongo.cluster}.mongodb.net/${keys.mongo.database}?retryWrites=true&w=majority`,
mongoose.connect(
  'mongodb://localhost:27017',
  {
    maxPoolSize: 20,
    minPoolSize: 1,
    connectTimeoutMS: 20000,
    socketTimeoutMS: 20000,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

const db = mongoose.connection;
db.on('error', (error) => {
  console.error('MONGO_DB_CONNECTION_ERROR', error);
});
db.once('open', () => {
  console.log('MONGO_DB_CONNECTION_SUCCESSFUL');
});

module.exports = db;

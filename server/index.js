require('dotenv').config();
const app = require('./app');
const http = require('http');

// MONGODB_URI=osoite_tahan npm run watch
// Give this to Taikala for db access

/*
  if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
  }

  const password = process.argv[2]
*/

const server = http.createServer(app);

const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

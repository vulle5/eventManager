require('dotenv').config();
const app = require('./app');
const http = require('http');

// MONGODB_URI=osoite_tahan npm run watch
// Give this to Taikala for db access

const server = http.createServer(app);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

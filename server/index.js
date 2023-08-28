const server = require("./src/server.js");
const { conn } = require('./src/db.js');
const PORT = 3001;

conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))

////////////////////////////

// const server = require('./src/server.js');
// const { conn } = require('./src/db.js');

// // Syncing all the models at once.
// conn.sync({ force: false }).then(() => {  //true=borra tod0/ reinicia
//   server.listen(3001, () => {
//     console.log('%s listening at 3001'); // eslint-disable-line no-console
//   });
// });

//////////////////////


// const server = require("./src/server");
// const { conn } = require('./src/db.js');
// require( "dotenv" ).config();
// const { PORT } = process.env;

// // Syncing all the models at once.
// conn.sync({ altern: true }).then(() => {
//   server.listen( PORT, () => {
//     console.log( "%s listening at " + PORT ); // eslint-disable-line no-console
//   });
// }).catch(error => console.error(error))


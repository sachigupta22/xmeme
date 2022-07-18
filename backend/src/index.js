//Import database connect function
const mongooseConnect = require('./db/mongoose');

//Import app and swagger app
const app = require('./app');

const env = process.env.NODE_ENV;
const port = process.env.PORT || 8081;

//Call mongooseConnect
//If app gets connected to database.
mongooseConnect(app);

//If app gets connected to database successfully it emits ready and triggers the function
app.on('ready', () => {

  //Serve the app 
  app.listen(port, () => {
    console.log('Server is up on port '+ port)
  })
})
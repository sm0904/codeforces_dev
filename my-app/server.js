const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
const bodyParser = require("body-parser");
const cors = require('cors');


app.use(express.json())
app.use(cors());

// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/fetch', (req, res) => { //Line 9
  res.send({ test: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' }); //Line 10
}); //L


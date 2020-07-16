// Setup empty JS object to act as endpoint for all routes
var path = require('path')
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const requestPost=require('./request') ;
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// --------------Intialize the main project folder------------
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
})

//----------------GET route-------------------------------

 const projectData=[];
 app.get('/all', (req, res) => {
  res.send(projectData)
  console.log(projectData);
})
//----------------POST route-------------------------------

app.post('/travelApp', addPost);

function addPost(req, res) {
    const data = req.body;
 projectData['latitude'] = data['latitude'];
projectData['longitude'] = data['longitude'];
  projectData['country'] = data['country'];
   
    res.send(projectData)
    console.log('POST')
    console.log(projectData)
}
//-----------------------------------------------------
module.exports = app;

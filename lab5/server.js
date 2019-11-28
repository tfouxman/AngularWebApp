const express = require('express');
const bodyParser = require('body-parser');
const product = require('./routes/product.route'); // Imports routes for the products
const cors = require('cors');
const app = express();

// Set up mongoose connection
const mongoose = require('mongoose');
const uri = 'mongodb+srv://MyMongoDBUser:easyPassword@se3316-lab3-dloam.mongodb.net/Lab3?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});
console.log('Connected to the database (mongoose)');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use(expressValidator());
app.use('/products', product);


app.use(express.static('public'));

app.use('/', function(req, res){
    res.sendFile(__dirname + '/views/index.html');
});

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port ' + port);
});



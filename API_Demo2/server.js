//REST API demo in Node.js
var express = require('express'); // req the express framework
var app = express();
const PORT = 8080;
var fs = require('fs'); //req file system object


app.use(express.json())

// Get USER LIST
app.get('/getUsers', function(req, res){
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        console.log(data);
        res.end(data); 
    });
})

// Create a server to listen at port 8080
app.listen(
    PORT,
    () => console.log(` it's alive on http://localhost:${PORT}`)
);




//addUser by a new id
app.post('/addUser/:id', function(req, res){

    var user = req.body;
    //read existing users
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        data = JSON.parse(data);


        //add user above to list
        data[req.params.id] = user;
        // console.log(data);
        res.end(JSON.stringify(data));
        //update json file
        fs.writeFile( __dirname + "/" + "users.json",JSON.stringify(data, null, "\t"),function (err, data) {
            if (err) return console.log(err);
            console.log(res.end(JSON.stringify(data)));
        });
    });
    
})

//Endpoint to get a single user by id
app.get('/getusers/:id', function (req, res) {
    // First retrieve existing user list
    fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
       var users = JSON.parse( data );
       var user = users["user" + req.params.id] 
       console.log( user );
       
       res.end( JSON.stringify(user));
    
    });
    
 })

  //Code to delete a user by id
  app.delete('/deleteUser/:id', function (req, res) {
     // First retrieve existing users
     fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse( data );
        //Kill The User
        delete data["user" + req.params.id];
         
        // console.log( data );
        res.end( JSON.stringify(data));
        fs.writeFile( __dirname + "/" + "users.json",JSON.stringify(data, null, "\t"),function (err, data) {
            if (err) return console.log(err);
            console.log(JSON.stringify(data));
        });
     });
    
  })
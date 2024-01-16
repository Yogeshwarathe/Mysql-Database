var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var connection = mysql.createConnection({
    "host" : "127.0.0.1",
    "user" : "user name",
    "password" : 'xxxxxxxx28',
    "database" : "database name"
})



connection.connect(function(err){
    if(!err) {
        console.log('Database is connected ');

    }else {
        console.log('Error connecting database');
    };
});


let createTodos = 'create table if not exists firstTable(id int primary key auto_increment,name text,description text)';
connection.query(createTodos, function(err, results, fields) {
if (err) {
    console.log(err.message);
} else {
    console.log("table is created");
}

});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


var server = app.listen(3000, () => {
  var host = server.address().address       
  var port = server.address().port
  console.log("app listening",host,port);
}); 



app.get('/all_data', function (req, res) {
    connection.query('select * from firstTable', function (error, results) {
       if (error) {
           console.log(error);
       } else {
            res.end(JSON.stringify(results));
            console.log('get is working');

       }
     });
 });




app.get('/ng/:id', function (req, res) {
   //  var a = req.params.id
   // console.log(a);
   connection.query('select * from firstTable where id=?', [req.params.id], function (error, results) {
      if (error){
        console.log(error);
      } else {
      res.end(JSON.stringify(results));
    }
    });
});


app.post('/ng', function (req, res) {
    var postData  = req.body;
    connection.query('INSERT INTO firstTable SET ?', postData, function (error, results) {
       if (error){
           console.log(error);
           res.end(JSON.stringify("you got error"));
       } else {
            res.end(JSON.stringify(results));
            console.log('post is working');
       }
       
     });
 });


 app.put('/put_ng', function (req, res) {
     var id = req.body.id;
     var name = req.body.name;
     var description = req.body.description;
     // console.log(id,name,description);
    var sql = "UPDATE firstTable set name =? , description =?  WHERE id = ?";
    var query = connection.query(sql, [name, description, id], function(err, result) {
      if(!err) {
        res.end("updated sucseful")
        console.log("Record Updated!!");
      } else {

      }
    
    });


 });

 
 app.delete('/ng',(req,res)=> {
      var id = req.body.id;
      console.log(id);
      var sql = "DELETE FROM firstTable WHERE id = id";
      connection.query(sql,(err,result)=>{
        if (!err) {
            console.log("delete is working ");
        } else {
            console.log(err); 
        }
      })
 })



 


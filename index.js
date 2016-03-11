var FileStore = require('tebro-filestore');
var express = require('express');
var bodyParser = require('body-parser');

var fs = new FileStore('filestore', 10000);
var app = express();
app.set('view engine', 'jade');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.render('index', {});
});

app.post('/save', function(req, res) {
    var key = req.body.key;
    var value = req.body.value;
    var options = {
        path: '/' + key,
        value: value,
        content_type: "text/plain"
    };
    console.log(options);
    fs.storeData(options, (err, data) => {
      var msg = {msg: ""};
      if(err != null) {
          msg.msg = "Error: " + err.msg;
      }else {
          msg.msg = "Data saved";
      }
      res.render('index', msg);
    });
});

app.post('/load', (req, res) => {
    var key = req.body.key;
    fs.getData('/' + key, (err, data) => {
        var msg = {msg: ""};
        if(err != null) {
            msg.msg = "Error: " + err.msg;
        }else {
            msg.msg = "Your data: " + data;
        }
        res.render('index', msg);
    })
});

app.listen(80, function () {
      console.log('Example app listening on port 80!');
});

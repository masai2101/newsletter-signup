// npm init
// npm install body-parser express request
// Run server with nodemon
//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/", function(req,res) {
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req,res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;
  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  }

  var jsonData = JSON.stringify(data);

  //API key
  //32582a9022546587fd755a348a1d447f-us3
  //List ID
  //fb54222268
  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/fb54222268",
    method: "POST",
    headers: {
      "Authorization": "masai2101 32582a9022546587fd755a348a1d447f-us3"
    },
    body: jsonData
  }

  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000,function () {
  console.log("server started on port 3000");
});

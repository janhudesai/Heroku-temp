var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var axios = require ('axios');

var path ='http://18.216.104.202:3001/'
var path1 = 'http://54.193.112.16:3000/'


router.post('/', function(req, res) {
    console.log("Inside the signup service");

    console.log("Request Body : ", req.body)

    // API Call for the get user info
    console.log("req.body.username:"+req.body.username)
    console.log("req.body.password:"+req.body.password)

    var user_details = {
        "username": req.body.username,
        "password": req.body.password
    }


    axios.post(path+'signup',user_details)
        .then(function(response){
            console.log("response.data" , response)
            console.log("typeof response.data ",typeof response.data)
            console.log("condition",response.data==false)
            if(response.data==false)
            {
                console.log("user already exists signup")
                ejs.renderFile('./views/login.ejs',{data:"4"},function(err,result){
                    console.log(err)
                    if (!err) {
                        res.end(result);
                    }

                });
            }
            else{
                console.log("successful signup")
                console.log("signed up")

                console.log("response after sign up",response.data)

                axios.post(path1+'postuserinfo?uid='+response.data._id+'&username='+response.data.username)
                    .then(function(response){
                        console.log("response.data" , response.data)
});

                ejs.renderFile('./views/login.ejs',{data:"1"},function(err,result){
                    console.log("error ",err)
                    if (!err) {
                        res.status(200).send(result);
                    }

                })
            }
        });
});

module.exports = router;

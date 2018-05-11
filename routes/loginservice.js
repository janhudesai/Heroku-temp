var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var axios = require ('axios');

var path ='http://18.216.104.202:3001/'
var path1 = 'http://54.193.112.16:3000/'

/* GET home page. */
router.get('/services', function(req, res) {
    console.log("i got this request",req.query)
    var user_logged_in = {
        "ID" : req.query.uid,
        "USERNAME" : req.query.username,
        "PARENT_ID" : req.query.parentid,
        "IS_PARENT" : req.query.isparent,

    }
    ejs.renderFile('./views/services.ejs',{data:user_logged_in},function(err,result){

        console.log(err)
        if (!err) {
            res.end(result);
        }

    });
});

router.post('/', function(req, res) {
    console.log("Inside the login service");

    console.log("Request Body : ", req.body)

    // API Call for the get user info
    console.log("req.query.username:"+req.body.username)
    console.log("req.query.password:"+req.body.password)

    var user_details = {
        "username": req.body.username,
        "password": req.body.password
    }


    axios.post(path+'login',user_details)
        .then(function(response){
            console.log("response.data" , response.data)
            console.log("typeof response.data ",typeof response.data)
            var user_logged_in = {
                "ID" : response.data._id,
                "USERNAME" : response.data.username,
                "PARENT_ID" : "",
                "IS_PARENT" : "",

            }
            console.log("condition",response.data=='false\nnull\n')
            if(response.data=='false\nnull\n')
            {
                console.log("invalid login")
                ejs.renderFile('./views/login.ejs',{data:"3"},function(err,result){
                    console.log(err)
                    if (!err) {
                        res.end(result);
                    }

                });
            }
            else{
                console.log("successful login")
               // localStorage.setItem("user_details",user_logged_in)
               // console.log(" local storage data ",JSON.stringify(localStorage.getItem("user_details")))

                axios.get(path1+'getuserinfo?uid='+user_logged_in.ID)
                    .then(function(response){
                        console.log(response.data);
                        console.log("before ",user_logged_in)
                        user_logged_in.PARENT_ID=response.data.parentid
                        console.log("after ",user_logged_in)
                        ejs.renderFile('./views/services.ejs',{data:user_logged_in},function(err,result){
                            console.log("error ",err)
                            if (!err) {
                                res.status(200).send(result);
                            }

                        })


                        console.log("user information")

                    })

                console.log(" ")
                console.log("logged in")


            }
        });


});

module.exports = router;


//window.location = "/texiservice?No="+"2&userid="+document.getElementById('userid').value+"&clippercard="+document.getElementById('clippercard').value+"&username="+document.getElementById('username').value+"&password="+document.getElementById('password').value;
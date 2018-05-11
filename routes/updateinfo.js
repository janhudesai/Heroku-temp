var express = require('express');
var router = express.Router();
var ejs = require("ejs");

var axios = require ('axios');

router.get('/getUserdetails', function(req, res) {
    console.log("Inside user details");
    var uid = req.query.uid;
    console.log(uid);
   
     axios.get('http://54.193.112.16:3000/getuserinfo?uid='+uid)
          .then(function(response){
            console.log(response);
            ejs.renderFile('./views/updateinfo.ejs',{data:response.data},function(err,result){
                  if (!err) {
                      res.status(200).send(result);
                  }else{
                 console.log(err)
                 res.status(500).send(result);
              }
  
            });
          console.log("user information")
  
      })
  });


router.post('/changeUserdetails', function(req, res) {
    console.log("Inside user details");

    console.log("Request Body : ", req.body)
    if(typeof req.body.uid === 'undefined'){
        // The parameter is missing, example response...
        res.status(400).json({ error: 'missing parameter bar', data: null }); // Only an  example
        return;
      }
      var uid = req.body.uid;
      //console.log(uid);
      var pid = req.body.parentid;
      var uname = req.body.username;
      var em = req.body.email;
      var ph = req.body.phone;
      console.log(uname);
      console.log(em);
      console.log(ph);


    axios.post('http://54.193.112.16:3000/updateuserinfo?uid='+uid+'&parentid='+pid+'&username='+uname+'&email='+em+'&phone='+ph)
    .then(function(response){
        console.log("response.data" , response.data)

        ejs.renderFile('/',function(err,result){
            console.log("error ",err)
            if (!err) {
                res.status(200).json({ error: null, status:successfull});
            }

    })});

});

router.post('/childadd', function(req, res) {
    console.log("Inside adding child");

    console.log("Request Body : ", req.body)
    /* if(typeof req.body.uid === 'undefined'){
        // The parameter is missing, example response...
        res.status(400).json({ error: 'missing parameter bar', data: null }); // Only an  example
        return;
    } */
      var uid = req.body.uid;
      console.log(uid);
      //var pid = req.body.uid;
      //var uname = req.body.username;
      var chem = req.body.email;
      //console.log(uname);
      console.log(chem);


    axios.post('http://54.193.112.16:3000/updatechildemail?uid='+uid+'&email='+chem)
    .then(function(response){
        console.log("response.data" , response.data)

        ejs.renderFile('/',function(err,result){
            console.log("error ",err)
            if (!err) {
                res.status(200).json({ error: null, status:successfull});
            }

    })});

});

router.post('/childremove', function(req, res) {
    console.log("Inside removing child");

    console.log("Request Body : ", req.body)
    /* if(typeof req.body.uid === 'undefined'){
        // The parameter is missing, example response...
        res.status(400).json({ error: 'missing parameter bar', data: null }); // Only an  example
        return;
    } */
      var uid = req.body.uid;
      console.log(uid);
      //var pid = req.body.uid;
      //var uname = req.body.username;
      var chem = req.body.email;
      //console.log(uname);
      console.log(chem);


    axios.post('http://54.193.112.16:3000/updatechildemail?uid=&email='+chem)
    .then(function(response){
        console.log("response.data" , response.data)

        ejs.renderFile('/',function(err,result){
            console.log("error ",err)
            if (!err) {
                res.status(200).json({ error: null, status:successfull});
            }

    })});

});



router.get('/getchild', function(req, res) {
    console.log("Viewing all children");
    var uid = req.query.uid;  
    //console.log("gvsgv",req);
    console.log(uid); 

    axios.get('http://54.193.112.16:3000/getusers?uid='+uid)
          .then(function(response){
            console.log(response.data);
          
                 res.status(200).send(response.data);
           
          console.log("all children of this user")
  
      })
  });
module.exports = router;
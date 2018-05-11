var express = require('express');
var router = express.Router();
var ejs = require("ejs");

var axios = require ('axios');

var server = "http://localhost:3000/"


router.get('/getQrCode', function(req, res) {
  console.log("Inside getQrCode");
  var uid = req.body.uid;
  var pid = req.body.parentid;
   axios.get(server+'generate?uid='+uid+'&parentid='+pid)
        .then(function(response){
          console.log(response);
	      ejs.renderFile('./views/qrcode.ejs',{data:response.data},function(err,result){
    		    if (!err) {
       		     res.status(200).send(result);
    		    }else{
               console.log(err)
               res.status(500).send(result);
            }

	      });
        console.log("qr use updated")

    })
});

router.post('/scanQrCode', function(req, res) {

    axios.post(server+'scanned?qrid='+req.body.qrid)
        .then(function(response){
          ejs.renderFile('./views/qrcode0.ejs',{data:response.data},function(err,result){
              if (!err) {
                 res.status(200).send(result);
              }else{
                 console.log(err)
                 res.status(500).send(result);
              }

          });
    })
});

router.get('/getHistory', function(req, res) {

    var uid = req.body.uid;
    var pid = req.body.parentid;
    axios.get(server+'getQrCodeHistory?uid='+uid+'&parentid='+pid)
        .then(function(response){
          console.log("hostory got as "+response.data);
            ejs.renderFile('./views/qrcodehistory.ejs',{data:JSON.parse(response.data)},function(err,result){
        		    if (!err) {
           		     res.status(200).send(result);
        		    }else{
                  console.log(err);
                }
    	      });
    })
});

module.exports = router;


//window.location = "/texiservice?No="+"2&userid="+document.getElementById('userid').value+"&clippercard="+document.getElementById('clippercard').value+"&username="+document.getElementById('username').value+"&password="+document.getElementById('password').value;

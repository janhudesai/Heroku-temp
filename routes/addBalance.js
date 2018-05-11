var express = require('express');
var router = express.Router();
var ejs = require("ejs");
var axios = require ('axios');
var path ='http://localhost:3003/'


/* GET home page. */
router.get('/addBalance', function(req, res) {
    ejs.renderFile('./views/addBal.ejs',{data:""},function(err,result){
        
        console.log(err)
        if (!err) {
            res.end(result);
        }

    });
});

router.get('/getTranHistory', function(req, res) {
    var parentid=req.query.parentid;
    console.log(req);
    axios.get('http://52.15.69.237:3000/usageHistory?parentid='+parentid)
        .then(function(response){
            console.log("history got as "+response.data)
            ejs.renderFile('./views/transactionhistory.ejs',{data:response.data},function(err,result){
        		    if (!err) {
           		     res.status(200).send(result);
        		    }else{
                  console.log(err);
                }
    	      });
    })
});

router.post('/makeTransaction', function(req, res) {
    var parentid=req.body.parentid;
    console.log("INSIDE UPDATE BALANCE");
    console.log(parentid);
    axios.post('http://52.15.69.237:3000/updatePAmount?parentid='+parentid)
        .then(function(response){
            console.log("history got as "+response.data)
            
           		     res.status(200).send(result);
            
    	      });
    });


router.post('/changeBalance', function(req, res) {
    if(typeof req.body.amount === 'undefined'){
        // The parameter is missing, example response...
        res.status(400).json({ error: 'missing parameter bar', data: null }); // Only an  example
        return;
      }
    
      var amount = req.body.amount;
      var parentid=req.body.pid;
      console.log(parentid);
      console.log(amount);
      //res.status(200).json({ error: null, amount: amount,parentid:parentid });

    axios.post('http://52.15.69.237:3000/addAmount?parentid='+parentid+'&amt='+amount)
        .then(function(response){
            console.log("response.data" , response.data)

            ejs.renderFile('./views/addBal.ejs',{data:response.data},function(err,result){
                console.log("error ",err)
                if (!err) {
                    res.status(200).send(result);
                }

            })});
});

module.exports = router;


//window.location = "/texiservice?No="+"2&userid="+document.getElementById('userid').value+"&clippercard="+document.getElementById('clippercard').value+"&username="+document.getElementById('username').value+"&password="+document.getElementById('password').value;
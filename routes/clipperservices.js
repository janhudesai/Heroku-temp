var express = require('express');
var router = express.Router();
var ejs = require("ejs");

/* GET home page. */
router.get('/', function(req, res) {
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

module.exports = router;
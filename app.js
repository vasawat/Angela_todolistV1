const express = require("express");
const bodyparser = require("body-parser");
const date = require( __dirname + "/date.js");

const app = express();

app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine' , 'ejs');

let addlist = ["wake up at 9am.","work out 3 times in a week","learning online course"];
let worklist = [];

app.get("/",function(req,res){

    let day = date.getDay();

    
    res.render("list", {listtitle: day , newlist: addlist});

});

app.post("/", function(req,res){
console.log(req.body);
    let item = req.body.userinput ;

    if (req.body.list === "worklist"){
        worklist.push(item);
        res.redirect("/work");
    }
    else {
        addlist.push(item);
        res.redirect("/");
    }

    
})

app.get("/work",function(req,res){
    res.render("list" , {listtitle: "worklist", newlist: worklist});
})


app.listen(3000,function(){
    console.log("this server run on port 3000");
})
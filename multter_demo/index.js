const port = 3000

const express = require('express');
const { diskStorage } = require('multer');
const multer = require('multer');
const fs = require('fs');

const app = express();

app.use(express.static('./public'));
// app.use(express.json());
app.use(express.urlencoded({extended:true}));

const disk_storage = diskStorage({
    destination:function(req,res,callback){
      
        if(req.url=='/upload'){
            callback(null,'./uploads/single')
        }else if(req.url=='/uploads')
        {
            callback(null,'./uploads/multiple');
        }
    }
    ,filename:function(req,res,callback){
        let time =  Date.now();
        callback(null,time+'.png');
    }
})

const upload = multer({storage:disk_storage})

app.get('/',(req,res)=>{
})

app.post('/upload',(req,res)=>{
 
    console.log( req);
})

app.post('/uploads',upload.array('images',10),(req,res)=>{
    console.log(req.files,req.body);
})
app.listen(port,()=>{
    console.log('Server Is Running At Port ',port);
})
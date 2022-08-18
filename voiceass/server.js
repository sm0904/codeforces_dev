const express = require('express');
const app = express();

const port = process.env.PORT || 7000;
const path = require('path');
const cors = require('cors');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
}

app.use(express.static(__dirname));
app.use(cors(corsOptions));

app.get('/', function(req, res){
    //res.setHeader('Content-type' , 'text/event-stream');
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(port ,(err)=>{
    if(err){
        throw error;
    }else{
        console.log(`Express server listening on port ${port}`);
    }
});


const express =require('express');
const app =express();
const http =require('http');
const server=http.createServer(app);
const logger=require('morgan');
const cors= require('cors');

const users=require('./routes/userRoutes');


const port =process.env.PORT || 3000;

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.disable('x-powered-by');

app.set('port',port);

users(app);

server.listen(3000,'172.16.102.186'||'localhost',function(){
    console.log('aplicacion NodeJS id=>'+process.pid+' puerto =>'+port);
});



//manejo de errores
app.use((err,req,res,next)=>{
    console.log(err);
    res.status(err.status||500).send(err.stack);
});

module.exports={
    app:app,
    server:server
};


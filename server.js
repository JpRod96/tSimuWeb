const express=require('express');
const app=express();
app.use(express.static("public"));

app.use('/modules', express.static(__dirname + '/node_modules/'));

app.get('/',(req, res)=>{
    res.send('index.html');
});

function startServer() {
    app.listen(3000);
    console.log("Server is up and running.\nOpen http://localhost:3000 to start");
}

startServer();

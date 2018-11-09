const express=require('express');
const app=express();
app.use(express.static("public"));

app.use('/modules', express.static(__dirname + '/node_modules/'));

app.get('/',(req, res)=>{
    res.send('index.html');
});

function startServer() {
    let port = process.env.PORT;
    if (port == null || port == "") {
    port = 8000;
    }
    app.listen(port);
    console.log("Server is up and running.\nOpen http://localhost:3000 to start");
}

startServer();

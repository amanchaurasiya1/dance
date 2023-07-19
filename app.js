const express = require('express');
const path = require('path');
const fs = require('fs');
const body = require('body-parser');

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1/DanceWebsite');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
const DanceSchema = new mongoose.Schema({
    name: String,
    age : Number,
    email : String,
    mobile : Number
});
const Dance = mongoose.model('Dance', DanceSchema);


const app = express();
const port = 80;

// for serving static files
app.use('/static',express.static('static'));
app.use(express.urlencoded());

// pug specific stuffs
// set the template engine as pug
app.set('view engine', 'pug');
// set the virtual directory
app.set('views',path.join(__dirname,'views'));

app.get('/',(req,res)=>{
    const param = { }
    res.status(200).render('home.pug',param);
});
app.get('/contact',(req,res)=>{
    const param = { }
    res.status(200).render('contact.pug',param);
});
app.post('/contact',(req,res)=>{
    var myData = new Dance(req.body);
    myData.save().then(()=>{
        const param = "Data saved succesfully.";
        res.status(200).send(param);
    }).catch(()=>{
        res.status(400).send("failed to save");
    });
});

app.listen(port,()=>{
    console.log(`the application started succesfully at port ${port}`);
});
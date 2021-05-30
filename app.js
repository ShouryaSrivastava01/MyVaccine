const express= require('express')
const bodyparser=require('body-parser')
const Nexmo= require('nexmo')
const ejs= require('ejs');

const nexmo= new Nexmo({
    apiKey: 'bca2f1b2',
    apiSecret: 'DdoiCwA2y3ecAQwI'
},{ debug: true})

const app= express();

//EXPRESS STUFF
// app.use('/static', express.static('static'));   //for static file
app.use(express.static(__dirname + '/public'));

app.use('/static', express.static('static'));   //for static filer
app.set('view engine', 'html');  
app.engine('html', ejs.renderFile );   

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.render('index');
} )

// app.post('/', (req, res)=>{
//         // res.send(req.body)
//         // console.log(req.body)
//         const number= req.body.number
//         const text="hello"

//         nexmo.message.sendSms(
//             '123456', number, text, {type: 'unicode'}, 
//             (err, responseData)=>{
//                 if(err){
//                     console.log(err)
//                 }
//                 else{
//                     console.log(responseData)
//                 }
//             }
//         )
// })
app.listen(3000, ()=>{
    console.log('successful');
})
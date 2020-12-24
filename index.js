const log=console.log;
let express=require('express')
let path=require('path')
var router = express.Router();
//var db=require('./db');
let app=express();
let mongoose=require('mongoose');
let url="mongodb+srv://freakyluffy:Himanshu@2000@cluster0.vd8zb.mongodb.net/user?retryWrites=true&w=majority";
mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true});
let conn=mongoose.connection;
conn.on('error',console.error.bind(console,'Connection Error!'));
conn.once('open',()=>{

log('Connection success');
//conn.close();
});
let userschema=mongoose.Schema({

    firstname:String,
    lastname:String,
    rollno:String,
    studentno:String,
    gender:String,
    branch:String,
    phone:String,
    email:String
});
let user=mongoose.model('user',userschema);   
let bodyParser = require('body-parser');
const {check,validationResult}=require('express-validator');
const port=5000;
const urlencodedParser=bodyParser.urlencoded({extended:false});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.raw());
// app.use(expressvalidator());
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));

app.engine('ejs', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.get('/', function(req, res) {
    res.render('register.ejs',{
       title:'Registration Page',
       emailerr:'',
       phoneerr:'',
       lastnameerr:'',
       firsterr:'',
       studerr:'',
       rollerr:'',
       errors:{}

    });
});
app.listen(port,()=>{
    log(`Server is runnning on port ${port}`);  //bliss
});
//regex is lub
var validstring=new RegExp("[A-Za-z]*$");
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var validphone= /^[0]?[6789]\d{9}$/;
var validnum=new RegExp("^[0-9]+$");
var firsterr="";
var lastnameerr="";
var emailerr="";
var numerr="";
var phoneerr="";
var rollerr="";
var studerr="";
app.post('/register'

, function(req, res, next) {
    inputData ={

        // const {username,password,email,...rest} =req.body;  object destructing
        firstname: req.body.first_name,
        lastname: req.body.last_name,
        email: req.body.email,
        gender: req.body.gender,
        phone:req.body.phone,
        rollno:req.body.rollno, 
        branch:req.body.branch,
        studentno:req.body.studentno,
        hosteler:req.body.hosteler
    }
    if(!(validstring.test(inputData.firstname)))
    {
         firsterr="Enter a valid firstname";
    }
    if(!(validstring.test(inputData.lastname)))
    {
        lastnameerr="Enter a valid lastname";
    }
    if(!(re.test(inputData.email)))
    {
        emailerr="Enter a valid email id";
    }
    if(!(validphone.test(inputData.phone)))
    {
        phoneerr="Enter a valid phone number";
    }
    if(!(validnum.test(inputData.rollno)))
    {
        rollerr="Enter a valid roll number";
    }
    if(!(validnum.test(inputData.studentno)))
    {
        studerr="Enter a valid student number";
    }
        
    var newUser=new user({firstname:inputData.firstname, 
        lastname:inputData.lastname,
        email:inputData.email
        ,gender:inputData.gender,
        phone:inputData.phone,
        rollno:inputData.rollno,
        branch:inputData.branch,
        studentno:inputData.studentno,
        hosteler:inputData.hosteler
    });

    log(emailerr);
function validate()
{
    if(firsterr==="" && lastnameerr==="" && emailerr==="" && phoneerr==="" &&rollerr===""&& studerr==="")
    {
        return 1;
    }
    else {
        return 0;
    }
}
    let User= user.count({email: inputData.email}, function (err, count){ 
        if(count>0 ){
            //document exists });
            log('Email id already exists');
             emailerr="Email id already exists";
             res.render('register',{
                 emailerr:emailerr
                ,firsterr:firsterr,
                lastnameerr:lastnameerr,
                rollerr:rollerr,
                phoneerr:phoneerr,
                studerr:studerr
                , title:'Registartaion Page'})
        }
        else if(validate()){
            log('here');
            newUser.save((err,docs)=>{
                if(err)
                {
                    log(err);
                }
                else{
                    log(`${docs.firstname} documented inserted successfully`);
                    res.render('success');
                   // res.end();
                    conn.close();

                }
                });

        }
        else{
            res.render('register',{
                emailerr:emailerr
               ,firsterr:firsterr,
               lastnameerr:lastnameerr,
               rollerr:rollerr,
               phoneerr:phoneerr,
               studerr:studerr
               , title:'Registartaion Page'})
            log('Something went wrong');
        }
    });
});

//peace
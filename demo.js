const log=console.log;

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
let user=mongoose.model('user',userschema)


let user = await User.findOne({ email: req.body.email });
    if (user) {
        return res.status(400).send('That user already exisits!');
    } else {
        user1.save();
    }
//let user1=new user({firstname:'hima',lastname:'hima',rollno:'324244',studentno:'4353535',gender:'male',branch:'cs',phone:'34355',email:'sssd@gmail.com'});

// user1.save((err,docs)=>{
//      if(err)
//      {
//          log(err);
//      }
//      else{
//          log(`${docs.firstname} documented inserted successfully`);
//          conn.close();

//      }
// })
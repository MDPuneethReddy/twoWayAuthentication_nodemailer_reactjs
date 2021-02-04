import * as express from "express"
import * as cors from "cors"
import * as nodemailer from "nodemailer"
require('dotenv').config();
const users=[]
const otps=[]
const app=express()
app.use(cors())
app.use(express.json())
console.log(process.env.REACT_APP_EMAIL)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: process.env.REACT_APP_EMAIL,//host email
           pass: process.env.REACT_APP_PASS,//host pass
       }
   });
app.get("/api",(req,res)=>{
    res.send("Welcome to server")
})
app.post("/api/loginUser",(req,res)=>{
    console.log(req.body)
    console.log(users)
    const user=users.filter(user=>user.email===req.body.user.email && user.password===req.body.password)
    console.log(user)
    if(user.length===0){
        res.status(404).json({error:"Enter email or password is not correct"})
    }
    else{
    res.json({message:"userLogin successful"})
    }

})
app.post("/api/getOtp",(req,res)=>{
    let otp = Math.random();
    otp = otp * 1000000;
    otp=(Math.floor(otp));
    otps.push({
        email:req.body.email,
        otp:otp
    })
    console.log(otps)
    const mailOptions = {
        from: process.env.REACT_APP_EMAIL,// host address
        to: req.body.email, 
        subject: 'OTP', 
        html: "<h3>OTP for account verification is </h3>"  + "<h1 style='font-weight:bold;'>" + otp +"</h1>" 
      };
      console.log(mailOptions)
      transporter.sendMail(mailOptions,  (err, info)=> {
        if(err)
          res.status(400).send({error:"failed to send OTP"})
        else
          res.send({message:"Successfully sent OTP to email"})
     });
})
app.post("/api/verifyOtp",async (req,res)=>{
    const otp:Array<any>= otps.filter(otp=>
        otp.email===req.body.values.email && otp.otp.toString()===req.body.otp.toString()
        )
    if(otp.length!==0){
        res.send({message:"verfied successfully"})
        users.push(req.body.values)
        console.log(users)
    }
    else{
        res.status(400).send({message:"verfication not successfully"})
    }
})
app.listen(3333,()=>{
    console.log(`listening at port 3333/api`)
})
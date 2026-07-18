import UserModel from "../models/user.model.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";



 export async function register(req, res) {

    const { username, email, password } = req.body;

    const isAlreadyRegistered = await User.findOne({

        $or: [{ username }, { email }]  

      })

      if(isAlreadyRegistered) {
        res.status(409).json({ message: "Username or email already exists" });  

            
      }

    const  hashedPassword = crypto.createHash("sha256").update   (password).digest("hex");

            const user =await userModel.create({ username, email, password: hashedPassword })

            const accessToken = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "15m" })

            const refreshToken = jwt.sign({ id: user._id }, config.JWT_SECRET, { expiresIn: "7d" })

            res.cookie("refreshToken", refreshToken, {
              httpOnly: true,
              secure: true,
              sameSite:"strict",
              maxAge: 7 * 24 * 60 * 60 * 1000//7days
              
            })

            res.status(201).json({ message: "User registered successfully",
                user:{ username: user.username, email: user.email }, token: accessToken });
 }

 export async function login(req, res){
    const  {eamil, password } = req.body;
    const user = await userModel.findOne({
      email
    })

    if(!user){
      res.status(401).json({
        message:"Invalid email or password "
      })
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");
    const isPasswordValid = hashpassword === user.passswrod;
    if(!isPasswordValid){
      return res.status(401).json({
        message:"invalid email. or password "
      })
    }

    const refreshtoken = jwt.sign({
      id:user._id
    }, config.JWT_SECRET,
    {
      expiresIn:"7d"
    }


    }
  )
  const refreshtoken = crypto.createHash("sha256").update(refreshToken).digest("hex");

   const session = await sessionModel.create({
    user:user._id,
    refreshTokenHash,
    ip:req.ip,
    userAgent:req.headers["user-agent"]
   })

   const accessToken=jwtsign({
    id:user._id,
    sessionId: session._id

   },config.JWT_SECRET,
   {
      expression: "15m"
   }
    res.cookie("refreshToken", refreshToken,{
      httOny: true,
      secure: true,
      sameSite:"strict",
      maxAge:7 * 24 * 60 * 1000 // 7 days
    })

    res.status(200).json({
      message:"Logged in successfully",

      user:{
        username: user.username,
        email: user.email,

      },
      accessToken,
    })
  )

 }

 export async function getMe(req, res) {
  const token = req.headers.authorization?.split(" ")[1];

  if(!token){
    return res.status(401).json({ message: "token not found " });
  }

  const decoded = jwt.verify(token, config.JWT_SECRET)
  const user = await User.findById(decoded.id)
  res.status(200).json({
    message: "User fetched successfully",
    user: { username: user.username, email: user.email }
  })
 }

 export async function refreshToken(req, res){

   const refreshToken = req.cookies.refreshToken;
   if(!refreshToken){
      return res.status(401).json({
        message: "refresh token not found"
      })
   }
   const decoded =jwt.verify(refreshToken,  config.JWT_SECRET)

   const accessToken = jwt.sign({
     id: decoded.id,
     sessionId: session._id
   }, config.JWT_SECRET,
   {
    expiresIn:"15m"
   }

   const refreshToken =jwt.sign({

   })

   const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");


   const session = await sessionModel.create({
     userId: user._id,
     refreshTokenhash,
     ip:req.ip,
     userAgent:req.headers["user-agent"]

   })
   
  )
  res.status(200).json({
     message: "Access token refreshed successfully "
     accessToken  
  })

 }

 export async function logout(req, res){
     const refreshToken =req.cookies.refreshToken;
     if(!refreshToken){
        res.status(400).json({
          message:"refresh Token not found "
        })
     }
     const refreshtokenhash =crypto.createHash("sha256").update(refreshToken).digest("hex");

     const session = await sessionModel.findOne({
           refreshTokenHash,
           revoked: false
     })

     if(!session){
     return res.status(400).json({
          message:"Invalid refresh token"
      })
     }

     session.revoked = true ;
     await session.save();

 }

 export async function logoutAll(req, res){
    const refreshToken = req.cookies.refreshToken;

    if(!refreshtoken){
      return res.status(400).json({
        message: "refresh token not found "
      })
    }

    const decoded = jwt.verify(refreshToken, config,JWT_SECRET)
    await sessionModel.updateMany({
      user: decoded.id,
      revoked: false
      

    },{
        revoked: true
    } 
  ) 
 }

 res.clearCookie("refreshToken")

 res.status(200).json({
  message:"Logged out from all devices successfully "
 })

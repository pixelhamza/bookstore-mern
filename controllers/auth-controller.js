const User=require('../models/User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

const register=async (req,res)=>{
    try{ 
        const{username,password,role}=req.body; 

        const user =await User.findOne({username});
        if(user){
            return res.status(400).json({
                success:false, 
                message:"User already exists"
            })
        }
        //salt the pass
       const hashed = await bcrypt.hash(password, 10);


        const newUser=new User({
            username,
            password:hashed,
            role:role||'user'

        });
        await newUser.save();
        if(newUser){
            res.json({
                success:true, 
                message:"User created Successfully"
            });
        }


    }catch(e){
        console.log(e);
        res.status(500).json({ 
            success:false,
            message:"Something went wrong"
        });

    }
}

const login=async(req,res)=>{ 
    try{ 
        const {username,password}=  req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
                 });
                }
     

        const isMatch=await bcrypt.compare(password,user.password);//check credentials
        if(!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
                });}

         const accessToken=jwt.sign(
            {userId:user._id,role:user.role},
            process.env.JWT_SECRET,
            {expiresIn:"30m"},
        );
       
        res.status(200).json({
            success:true,
            message:"Successfully logged in ",
            accessToken
        });

        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Something went wrong"
            });
        }
};

module.exports={login,register};




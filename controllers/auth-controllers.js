const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res)=> {
    try{

        const {username, email, name, password, bio, role} = req.body;

        // Check if user already exists before hashing password
        const checkExistingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists. Please try again with different information.'
            }); 
        }

        //hash user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create a new user and save in the database
        const createUser = new User({
            username,
            email,
            name,
            password : hashedPassword,
            bio,
            role: role || 'user'
        });
        await createUser.save();

        return res.status(201).json({
            success : true,
            message : 'User registered successfully'
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            success :  false,
            message : 'Some error occured, Try again!'
        });
    }
};

const loginUser = async(req, res)=>{
    try{

        const { username, password } = req.body;

        // find if the current User exists in the database
        const user = await User.findOne({username});

        // check if the password is correct
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!user || !checkPassword){
            return res.status(400).json({
                success : false,
                message : 'Invalid credentials'
            });
        };

        // create user token
        const accessToken = jwt.sign({
            userId : user._id,
            username : user.username,
            role : user.role,
        }, process.env.JWT_SECRET_KEY, {
            expiresIn : '15m'
        });

        res.status(200).json({
            success : true,
            message : 'Logged in successfully',
            accessToken 
        });


    }catch(error){
        console.log(error);
        res.status(500).json({
            success :  false,
            message : 'Some error occured, Try again!'
        });
    }
};


const changePassword = async(req, res)=> {
    try{

        const userId = req.userInfo.userId;

        //extract old and old password
        const { oldPassword, newPassword} = req.body;

        // find the current user
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success : false,
                message : 'User not found'
            });
        }

        //check if old password is correct
        const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);

        if(!isPasswordMatch){
            return res.status(400).json({
                success : false,
                message : "Password doesn't match!. Please try again"
            })
        }

        // hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // update user password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({
            success : true,
            message : "Password changed successfully"
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            success :  false,
            message : 'Some error occured, Please try again!'
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    changePassword
}
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if(!token){
        res.status(401).json({
            success: false,
            message : "Access denied, No Token provided. Please Log in"
        })
    }


    // Decode the token from the headers
    try{
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(decodedTokenInfo);

        req.userInfo = verifyToken
        next();

    }catch(error){
        res.status(500).json({
            success : false,
            message : "Access denied, No Token provided. Please Log in"
        });
    }
}
module.exports = authMiddleware;
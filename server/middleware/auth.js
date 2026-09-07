const jwt = require('jsonwebtoken');
require('dotenv').config();


//auth
exports.auth = async (req, res, next) => {
    try {
        //extract token
        const token = req.cookies?.token || req.body?.token || req.header('Authorization')?.replace('Bearer ', '');

        //if token is missing
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Token Is Missing'
            });
        }

        //verify token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;

        } catch (error) {
            //verirfication - issue
            return res.status(401).json({
                success: false,
                message: 'Token Is Invalid',
            });
        }
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Something Went Wrong While Verifying Token',
        });
    }
}

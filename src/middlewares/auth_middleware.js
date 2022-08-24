import jwt from 'jsonwebtoken';

exports.auth = (req, res, next) => {
    try{
        
        const _token = req.headers.authorization.split(" ")[1];
        jwt.verify(_token, "sldfsd0fas9df809as8f");
        const _payload = jwt.decode(_token);
        req.payload = _payload;
        next();

    }catch(e){
        res.status(401).json({
            "statusCode": 401,
            "message": "Unauth­orized",
        });
    }
}
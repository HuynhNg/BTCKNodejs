import Authentication from "../Authentication/Authentication";

const verify = function(req, res, next) {
    let Token = req.headers.authorization;
    if (!Token) {
        return res.status(403).json({
            success: false,
            message: 'No token provided',
        });
    }
    Token = Token.split(' ')[1];
    try {
        const decode = Authentication.Verify(Token);
        req.decode = decode;
        next();
    } catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Token has expired',
        });
    }
}

export default verify;
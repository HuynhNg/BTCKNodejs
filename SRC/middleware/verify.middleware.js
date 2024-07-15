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
        if (decode) {
            req.decode = decode;
            next();
        }
    } catch (err) {
        throw err;
    }
}

export default verify;
import Authentication from "../Authentication/Authentication";

const verify = function(req, res, next) {
    let Token = req.headers.authorization;
    if (!Token) {
        return res.status(404).json({
            success: false,
            error: 'Token not found',
        });
    }
    Token = Token.split(' ')[1];
    try {
        const decode = Authentication.Verify(Token);
        req.decode = decode;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            error: 'Token has expired',
        });
    }
}

export default verify;
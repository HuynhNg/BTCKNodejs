import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
class Authentication {
    async Hash(pass) {
        try {
            const salt = await bcrypt.genSalt(parseInt(process.env.saltRounds));
            const hash = await bcrypt.hash(pass, salt);
            return hash;
        } catch (err) {
            console.log('ERR hashpassword: ', err);
            throw err;
        }
    }
    async Compare(hash, pass) {
        const result = await bcrypt.compare(pass, hash);
        return result;
    }
    async Sign(data){
        try {
            const token = await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
            return token;
        } catch (error) {
            console.error('Error in Sign:', error.message);
            throw new Error("Failed to sign JWT token");
        }
    }
    Verify(token) {
        // console.log(jwt.verify(token, process.env.JWT_SECRET));
        return jwt.verify(token, process.env.JWT_SECRET);
    }
}
export default new Authentication();

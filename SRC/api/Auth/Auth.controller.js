import AuthService from "./Auth.service";
import UserModel from "../../model/User.Model";
import Authentication from "../../Authentication/Authentication";
class AuthController{
    async Register(req,res,next){
        try{
            const check = await UserModel.getUserByEmail(req.body.Email);
            console.log(check);
            if(check){
                return res.status(409).json({
                    success: false,
                    message: "user already exist"
                });
            }
            const pass = await Authentication.Hash(req.body.Password);
            const NewUser = {
                Name : req.body.Name,
                Email: req.body.Email,
                Password: pass
            }
            await AuthService.RegisterUser(NewUser);
            return res.status(200).json({
                success: true,
                message: 'Created User'
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }
    async Login(req,res,next){
        try{
            const check = await UserModel.getUserByEmail(req.body.Email);
            if(!check){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            const User= {
                Email: req.body.Email,
                Password: req.body.Password
            }
            const pass = await AuthService.Login(User);
            if(pass== 0){
                return res.status(401).json({
                    success: false,
                    message: "Invalid password"
                })
            }
            const data = {
                UserID: pass
            }
            const token = await Authentication.Sign(data);
            const trich= Authentication.Verify(token);
            return res.status(200).json({
                success: true,
                token: token,
                message: trich
            })
        }
        catch(err){
            return res.status(500).json({
                success: false,
                message: "Internal Service Error"
            })
        }
    }
    async ForgetPassword(req,res,next){
        try{
            const check = await UserModel.getUserByEmail(req.body.Email);
            if(!check){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            await AuthService.ForgetPassword(req.body.Email);
            return res.status(200).json({
                success: true,
                message: "Send mail"
            })
        }
        catch(err){
            return res.status(500).json({
                success : false,
                message: "Internal Service Error"
            })
        }
    }
    async ResetPassword(req,res,next){
        try{
            const Time = Date.now();
            const token = req.headers.authorization.split(' ')[1];
            if(!token){
                return res.status(404).json({
                    success: false,
                    message: "Token not found"
                })
            }
            const check = await UserModel.getUserByToken(token);
            if(!check){
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                })
            }
            if(check.Expried < Time){
                return res.status(401).json({
                    success: false,
                    message: "Token has expired"
                })
            }
            AuthService.ResetPassword(check.UserID, req.body.Password);
            return res.status(200).json({
                success: true,
                message: "Reset oke"
            })
        }
        catch(err){
            return res.status(500).json({
                success : false,
                message: "Internal Service Error"
            })
        }
    }
}
export default new AuthController();
import UserModel from '../../model/User.Model';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Authentication from '../../Authentication/Authentication';
import mailService from '../../mail/mail.service';
dotenv.config();

class AuthService{
    async RegisterUser(NewUser){
        try{
            await UserModel.addUser(NewUser);
        }
        catch{
            console.log("ERR RegisterUser: ",err);
            throw new Error('Internal Service Error');
        }
    }
    async Login(User){
        try{
            const User_check= await UserModel.getUserByEmail(User.Email);
            const check = await Authentication.Compare( User_check.Password,User.Password);
            if(check)
            {
                // console.log(User_check.UserID);
                return User_check.UserID;
            }
            else return 0;
        }
        catch(err){
            console.log("ERR AuthService Login:",err);
            // throw new Error('Internal Service Error');
            throw err;
        }
    }
    async ForgetPassword(Email){
        try{
            const data={
                Email: Email
            }
            const TokenReset = await Authentication.Sign(data);
            await UserModel.SetTokenReset(TokenReset,Email);
            await mailService.sendEmail({
                emailFrom: process.env.Email_From,
                emailTo: Email,
                emailSubject: "TokenReset",
                emailText: TokenReset,
            });
        }
        catch(err){
            console.log("ERR AuthService ForgetPass: ",err);
            throw err;
        }
    }
    async ResetPassword(ID,Password){
        try{
            const pass =await Authentication.Hash(Password);
            await UserModel.UpdatePassword(ID,pass)
        }
        catch(err){
            console.log("ERR AuthService ResetPass: ",err);
            throw err;
        }
    }
}
export default new AuthService();
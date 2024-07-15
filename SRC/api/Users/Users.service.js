import UserModel from '../../model/User.Model';
import PollModel from '../../model/Poll.Model';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Authentication from '../../Authentication/Authentication';
import mailService from '../../mail/mail.service';
class UsersService{
    async CreatePool(NewPool){
        try{
            await PollModel.addPoll(NewPool);
        }catch(err){
            throw err;
        }
    }
}
export default new UsersService();
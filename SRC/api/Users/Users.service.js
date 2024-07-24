import UserModel from '../../model/User.Model';
import PollModel from '../../model/Poll.Model';
import OptionModel from '../../model/Option.Model';
import VoteModel from '../../model/Vote.Model';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import Authentication from '../../Authentication/Authentication';
import mailService from '../../mail/mail.service';
class UsersService{
    //Poll
    async GetPollByID(ID){
        try{
            console.log(ID);
            return await PollModel.getPollByID(ID);
        }
        catch(err){
            throw err;
        }
    }
    async CreatePoll(NewPoll){
        try{
           return  await PollModel.addPoll(NewPoll);
        }catch(err){
            throw err;
        }
    }
    async UpdatePoll(PollID,Title){
        try{
            return await PollModel.UpdatePoll(PollID,Title);
        }
        catch(err){
            throw err;
        }
    }


    //Option
    async CreateOption(NewOption){
        try{
            return await OptionModel.CreateOption(NewOption);
        }catch(err){
            throw err;
        }
    }

    // Vote
    async CreateVote(NewVote){
        try{
            await VoteModel.CreateVote(NewVote);
            const Option = await OptionModel.GetOptionByOptionID(NewVote.OptionID);
            const Quantity = Option.Quantity+1;
            await OptionModel.UpdateQuantity(NewVote.OptionID,Quantity);
            return;
        }catch(err){
            throw err;
        }
    }
    async DeleteVote(DelVote){
        try{
            await VoteModel.DeleteVote(DelVote);
            const Option = await OptionModel.GetOptionByOptionID(DelVote.OptionID);
            const Quantity = Option.Quantity-1;
            await OptionModel.UpdateQuantity(DelVote.OptionID,Quantity);
            return ;
        }catch(err){
            throw err;
        }
    }
    

    
}
export default new UsersService();